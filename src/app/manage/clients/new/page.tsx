import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { createClientAction } from "../actions";
import ClientForm from "../ClientForm";

export default async function NewClientPage() {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();
  const { data: staff } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .eq("active", true);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{dict.clients.new}</h1>
      <ClientForm dict={dict} action={createClientAction} staff={staff || []} />
    </div>
  );
}
