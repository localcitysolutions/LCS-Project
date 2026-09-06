import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { updatePaymentAction, deletePaymentAction } from "../../actions";
import PaymentForm from "../../PaymentForm";

export default async function EditPaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const [{ data: payment }, { data: clients }] = await Promise.all([
    supabase.from("payments").select("*").eq("id", id).maybeSingle(),
    supabase.from("clients").select("id, name").order("name"),
  ]);
  if (!payment) notFound();

  const boundUpdate = updatePaymentAction.bind(null, id);
  const boundDelete = deletePaymentAction.bind(null, id, payment.client_id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {dict.common.edit} — {dict.payments.title}
        </h1>
        <form action={boundDelete}>
          <button type="submit" className="px-4 py-2 rounded-full bg-red-500/10 text-red-600 text-sm">
            {dict.clients.delete}
          </button>
        </form>
      </div>
      <PaymentForm dict={dict} action={boundUpdate} payment={payment} clients={clients || []} />
    </div>
  );
}
