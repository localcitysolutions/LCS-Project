import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { updateClientAction } from "../../actions";
import ClientForm from "../../ClientForm";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const [{ data: client }, { data: staff }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).maybeSingle(),
    supabase.from("profiles").select("id, full_name, email").eq("active", true),
  ]);
  if (!client) notFound();

  const boundAction = updateClientAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {dict.common.edit} — {client.name}
      </h1>
      <ClientForm dict={dict} action={boundAction} client={client} staff={staff || []} />
    </div>
  );
}
