import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { BulkInvoicesDocument } from "@/lib/manage/pdf/documents";
import { riyadhToday } from "@/lib/manage/money";
import {
  buildZatcaQr,
  pdfResponse,
  toPdfCharge,
  toPdfClient,
  toPdfCompany,
} from "@/lib/manage/pdf/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Rendering a few hundred pages is well within this; the cap only exists so a
// runaway request fails loudly instead of hanging.
export const maxDuration = 60;

/** Hard ceiling on pages in one download. Past this the file gets unwieldy and
 * the request risks the function timeout — the response says so explicitly
 * rather than silently returning a partial set. */
const MAX_INVOICES = 150;

export async function GET(request: Request) {
  const supabase = await createClient();
  const overdueOnly = new URL(request.url).searchParams.get("overdue") === "1";

  const [{ data: companyRow }, { data: charges }] = await Promise.all([
    supabase.from("company_settings").select("*").maybeSingle(),
    supabase
      .from("payments_with_status")
      .select("*")
      .neq("status", "paid")
      .order("client_id", { ascending: true })
      .order("due_date", { ascending: true }),
  ]);

  let open = (charges || []).filter((c) => Number(c.balance) > 0.005);
  if (overdueOnly) open = open.filter((c) => c.is_overdue);

  if (open.length === 0) {
    return new Response("There are no outstanding charges to invoice.", { status: 404 });
  }

  const truncated = open.length > MAX_INVOICES;
  const selected = truncated ? open.slice(0, MAX_INVOICES) : open;

  const clientIds = [...new Set(selected.map((c) => c.client_id))];
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, company, email, phone, vat_number")
    .in("id", clientIds);

  const clientById = new Map((clients || []).map((c) => [c.id, c]));
  const company = toPdfCompany(companyRow);

  const items = [];
  for (const row of selected) {
    const clientRow = clientById.get(row.client_id);
    if (!clientRow) continue; // RLS hid the client — skip rather than leak a blank invoice
    const charge = toPdfCharge(row);
    items.push({
      client: toPdfClient(clientRow),
      charge,
      qr: await buildZatcaQr(company, {
        timestamp: row.created_at,
        totalWithVat: charge.total,
        vatTotal: charge.vat_amount,
      }),
    });
  }

  const buffer = await renderToBuffer(BulkInvoicesDocument({ company, items }));

  const name = `Outstanding-invoices-${riyadhToday()}${truncated ? `-first-${MAX_INVOICES}` : ""}.pdf`;
  return pdfResponse(buffer, name);
}
