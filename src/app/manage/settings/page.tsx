import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import CompanySettingsForm from "./CompanySettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: settings }, { data: profile }] = await Promise.all([
    supabase.from("company_settings").select("*").maybeSingle(),
    user
      ? supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  // The form renders for everyone so staff can see what goes on their invoices,
  // but only admins can submit — matching the RLS policy rather than hiding a
  // restriction the database would enforce anyway.
  const canEdit = profile?.role === "admin";

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{dict.settings.title}</h1>
      <p className="text-white/50 text-sm mb-6">{dict.settings.intro}</p>
      {!canEdit && <p className="text-amber-400/80 text-sm mb-4">{dict.settings.adminOnly}</p>}
      <CompanySettingsForm dict={dict} settings={settings ?? null} canEdit={canEdit} />
    </div>
  );
}
