import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { createReminderAction } from "../actions";
import ReminderForm from "../ReminderForm";

export default async function NewReminderPage({
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
      <h1 className="text-2xl font-bold mb-6">{dict.reminders.new}</h1>
      <ReminderForm dict={dict} action={createReminderAction} clients={clients || []} defaultClientId={client_id} />
    </div>
  );
}
