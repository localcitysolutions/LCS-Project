import { renderToBuffer } from "@react-pdf/renderer";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { loadPartnerLedger } from "@/lib/manage/partner-ledger";
import { PartnerStatementDocument } from "@/lib/manage/pdf/documents";
import { pdfResponse, toPdfCompany } from "@/lib/manage/pdf/render";
import { riyadhToday } from "@/lib/manage/money";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();

  // RLS would already hide the admin-only tables from staff, but that would
  // produce a misleading empty statement rather than a clear refusal.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    : { data: null };
  if (profile?.role !== "admin") return new Response("Forbidden", { status: 403 });

  const lang = await getManageLang();
  const dict = getDict(lang);

  const [ledger, { data: companyRow }] = await Promise.all([
    loadPartnerLedger(supabase, dict),
    supabase.from("company_settings").select("*").maybeSingle(),
  ]);

  if (!ledger.pair) {
    return new Response("The statement needs exactly two active partners.", { status: 400 });
  }

  const buffer = await renderToBuffer(
    PartnerStatementDocument({
      company: toPdfCompany(companyRow),
      partnerA: ledger.pair.A.name,
      partnerB: ledger.pair.B.name,
      entries: ledger.entries,
      finalBalance: ledger.pairBalance,
      currency: ledger.entries[0]?.currency || "SAR",
      asOf: riyadhToday(),
    })
  );

  return pdfResponse(buffer, `Partner-Statement-${riyadhToday()}.pdf`);
}
