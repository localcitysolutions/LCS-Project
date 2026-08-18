import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { QuotationDocument } from "@/lib/manage/pdf/documents";
import { pdfResponse, toPdfClient, toPdfCompany } from "@/lib/manage/pdf/render";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: quotation }, { data: items }, { data: companyRow }] = await Promise.all([
    supabase.from("quotations").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("quotation_items")
      .select("*")
      .eq("quotation_id", id)
      .order("position", { ascending: true }),
    supabase.from("company_settings").select("*").maybeSingle(),
  ]);

  if (!quotation) return new Response("Not found", { status: 404 });

  const { data: clientRow } = await supabase
    .from("clients")
    .select("name, company, email, phone, vat_number")
    .eq("id", quotation.client_id)
    .maybeSingle();

  if (!clientRow) return new Response("Not found", { status: 404 });

  const buffer = await renderToBuffer(
    QuotationDocument({
      company: toPdfCompany(companyRow),
      client: toPdfClient(clientRow),
      quotation: {
        quote_number: quotation.quote_number,
        title: quotation.title,
        issue_date: quotation.issue_date,
        valid_until: quotation.valid_until,
        currency: quotation.currency,
        discount: Number(quotation.discount),
        subtotal: Number(quotation.subtotal),
        vat_amount: Number(quotation.vat_amount),
        total: Number(quotation.total),
        monthly_total: Number(quotation.monthly_total),
        notes: quotation.notes,
        terms: quotation.terms,
      },
      items: (items || []).map((i) => ({
        id: i.id,
        position: i.position,
        description: i.description,
        kind: i.kind,
        quantity: Number(i.quantity),
        unit_price: Number(i.unit_price),
        line_total: Number(i.line_total),
      })),
    })
  );

  return pdfResponse(buffer, `Quotation-${quotation.quote_number || id}.pdf`);
}
