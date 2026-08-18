import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { ReceiptDocument } from "@/lib/manage/pdf/documents";
import { monthLabel } from "@/lib/manage/money";
import {
  buildZatcaQr,
  pdfResponse,
  toPdfClient,
  toPdfCompany,
} from "@/lib/manage/pdf/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ receiptId: string }> }
) {
  const { receiptId } = await params;
  const supabase = await createClient();

  const [{ data: receipt }, { data: companyRow }] = await Promise.all([
    supabase.from("payment_receipts").select("*").eq("id", receiptId).maybeSingle(),
    supabase.from("company_settings").select("*").maybeSingle(),
  ]);

  if (!receipt) return new Response("Not found", { status: 404 });

  const [{ data: clientRow }, { data: allocations }] = await Promise.all([
    supabase
      .from("clients")
      .select("name, company, email, phone, vat_number")
      .eq("id", receipt.client_id)
      .maybeSingle(),
    supabase.from("payment_allocations").select("payment_id, amount").eq("receipt_id", receiptId),
  ]);

  if (!clientRow) return new Response("Not found", { status: 404 });

  // Name each settled charge on the receipt, so the client can see exactly
  // which month(s) their money cleared rather than just a lump sum.
  const chargeIds = (allocations || []).map((a) => a.payment_id);
  const { data: charges } = chargeIds.length
    ? await supabase
        .from("payments")
        .select("id, invoice_number, kind, description, period_month, vat_amount")
        .in("id", chargeIds)
    : { data: [] as {
        id: string;
        invoice_number: string | null;
        kind: string;
        description: string | null;
        period_month: string | null;
        vat_amount: number;
      }[] };

  const chargeById = new Map((charges || []).map((c) => [c.id, c]));

  const lines = (allocations || []).map((a) => {
    const c = chargeById.get(a.payment_id);
    const base =
      c?.description ||
      (c?.kind === "setup"
        ? "Setup fee"
        : c?.period_month
          ? `Monthly service — ${monthLabel(c.period_month)}`
          : "Service charge");
    return {
      label: c?.invoice_number ? `${base} (${c.invoice_number})` : base,
      amount: Number(a.amount),
    };
  });

  const applied = lines.reduce((sum, l) => sum + l.amount, 0);
  const unapplied = Number(receipt.amount) - applied;

  const company = toPdfCompany(companyRow);

  // A receipt's VAT share is whatever VAT sat inside the charges it settled.
  const vatShare = (allocations || []).reduce((sum, a) => {
    const c = chargeById.get(a.payment_id);
    return sum + (c && Number(c.vat_amount) > 0 ? Number(a.amount) - Number(a.amount) / 1.15 : 0);
  }, 0);

  const qr = await buildZatcaQr(company, {
    timestamp: receipt.created_at,
    totalWithVat: Number(receipt.amount),
    vatTotal: Math.round(vatShare * 100) / 100,
  });

  const buffer = await renderToBuffer(
    ReceiptDocument({
      company,
      client: toPdfClient(clientRow),
      receipt: {
        receipt_number: receipt.receipt_number,
        amount: Number(receipt.amount),
        currency: receipt.currency,
        received_at: receipt.received_at,
        method: receipt.method,
        reference: receipt.reference,
        allocations: lines,
        unapplied,
      },
      qr,
    })
  );

  return pdfResponse(buffer, `Receipt-${receipt.receipt_number || receiptId}.pdf`);
}
