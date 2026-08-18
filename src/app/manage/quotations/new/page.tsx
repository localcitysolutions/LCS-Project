import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { riyadhToday } from "@/lib/manage/money";
import QuotationForm from "../QuotationForm";
import { createQuotationAction } from "../actions";

export const dynamic = "force-dynamic";

function addDays(isoDate: string, days: number) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export default async function NewQuotationPage({
  searchParams,
}: {
  searchParams: Promise<{ client_id?: string }>;
}) {
  const { client_id } = await searchParams;
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const [{ data: clients }, { data: settings }] = await Promise.all([
    supabase.from("clients").select("id, name, company").order("name", { ascending: true }),
    supabase.from("company_settings").select("quote_validity_days").maybeSingle(),
  ]);

  const today = riyadhToday();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{dict.quotations.new}</h1>
      <QuotationForm
        dict={dict}
        action={createQuotationAction}
        clients={clients || []}
        today={today}
        defaultValidUntil={addDays(today, settings?.quote_validity_days ?? 14)}
        defaultClientId={client_id}
      />
    </div>
  );
}
