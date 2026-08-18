import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { InvoiceDocument } from "@/lib/manage/pdf/documents";
import {
  buildZatcaQr,
  pdfResponse,
  toPdfCharge,
  toPdfClient,
  toPdfCompany,
} from "@/lib/manage/pdf/render";

// react-pdf embeds fonts and rasterises the QR — both need Node, not Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ paymentId: string }> }
) {
  const { paymentId } = await params;
  const supabase = await createClient();

  // Every read below goes through the caller's session, so RLS decides what is
  // visible — a signed-out or deactivated user gets nothing, not a PDF.
  const [{ data: charge }, { data: companyRow }] = await Promise.all([
    supabase.from("payments_with_status").select("*").eq("id", paymentId).maybeSingle(),
    supabase.from("company_settings").select("*").maybeSingle(),
  ]);

  if (!charge) return new Response("Not found", { status: 404 });

  const { data: clientRow } = await supabase
    .from("clients")
    .select("name, company, email, phone, vat_number")
    .eq("id", charge.client_id)
    .maybeSingle();

  if (!clientRow) return new Response("Not found", { status: 404 });

  const company = toPdfCompany(companyRow);
  const pdfCharge = toPdfCharge(charge);
  const qr = await buildZatcaQr(company, {
    timestamp: charge.created_at,
    totalWithVat: pdfCharge.total,
    vatTotal: pdfCharge.vat_amount,
  });

  const buffer = await renderToBuffer(
    InvoiceDocument({ company, client: toPdfClient(clientRow), charge: pdfCharge, qr })
  );

  return pdfResponse(buffer, `Invoice-${pdfCharge.invoice_number || paymentId}.pdf`);
}
