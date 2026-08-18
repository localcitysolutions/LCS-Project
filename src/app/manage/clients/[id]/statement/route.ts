import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { StatementDocument } from "@/lib/manage/pdf/documents";
import { riyadhToday } from "@/lib/manage/money";
import {
  pdfResponse,
  toPdfCharge,
  toPdfClient,
  toPdfCompany,
} from "@/lib/manage/pdf/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: clientRow }, { data: companyRow }, { data: charges }, { data: balance }] =
    await Promise.all([
      supabase
        .from("clients")
        .select("name, company, email, phone, vat_number")
        .eq("id", id)
        .maybeSingle(),
      supabase.from("company_settings").select("*").maybeSingle(),
      supabase
        .from("payments_with_status")
        .select("*")
        .eq("client_id", id)
        .neq("status", "paid")
        .order("due_date", { ascending: true }),
      supabase.from("client_balances").select("*").eq("client_id", id).maybeSingle(),
    ]);

  if (!clientRow) return new Response("Not found", { status: 404 });

  const open = (charges || []).filter((c) => Number(c.balance) > 0.005);
  const currency = open[0]?.currency || "SAR";

  const buffer = await renderToBuffer(
    StatementDocument({
      company: toPdfCompany(companyRow),
      client: toPdfClient(clientRow),
      charges: open.map(toPdfCharge),
      currency,
      outstanding: Number(balance?.outstanding ?? 0),
      credit: Number(balance?.credit_balance ?? 0),
      asOf: riyadhToday(),
    })
  );

  return pdfResponse(buffer, `Statement-${clientRow.company || clientRow.name}.pdf`);
}
