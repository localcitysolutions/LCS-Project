import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { createPaymentAction } from "../actions";
import PaymentForm from "../PaymentForm";

export default async function NewPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ client_id?: string }>;
}) {
  const { client_id } = await searchParams;
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();
  const { data: clients } = await supabase.from("clients").select("id, name").order("name");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{dict.payments.new}</h1>
      <PaymentForm dict={dict} action={createPaymentAction} clients={clients || []} defaultClientId={client_id} />
    </div>
  );
}
