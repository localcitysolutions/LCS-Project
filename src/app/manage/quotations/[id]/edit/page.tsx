import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { riyadhToday } from "@/lib/manage/money";
import QuotationForm from "../../QuotationForm";
import { updateQuotationAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditQuotationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const [{ data: quotation }, { data: items }, { data: clients }] = await Promise.all([
    supabase.from("quotations").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("quotation_items")
      .select("*")
      .eq("quotation_id", id)
      .order("position", { ascending: true }),
    supabase.from("clients").select("id, name, company").order("name", { ascending: true }),
  ]);

  if (!quotation) notFound();

  // The database refuses line-item changes on an accepted or converted quote,
  // so don't offer an editor that is guaranteed to fail on save.
  if (quotation.status === "accepted" || quotation.status === "converted") {
    redirect(`/manage/quotations/${id}`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">{dict.common.edit}</h1>
      <p className="text-ink/40 text-sm mb-6">{quotation.quote_number}</p>
      <QuotationForm
        dict={dict}
        action={updateQuotationAction.bind(null, id)}
        clients={clients || []}
        quotation={quotation}
        items={items || []}
        today={riyadhToday()}
        defaultValidUntil={quotation.valid_until || ""}
      />
    </div>
  );
}
