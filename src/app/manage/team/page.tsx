import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { setProfileRoleAction, setProfileActiveAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/manage/login");

  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (me?.role !== "admin") redirect("/manage");

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{dict.team.title}</h1>
      <div className="bg-panel border border-line rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {(profiles || []).map((p) => (
              <tr key={p.id} className="border-b border-line/60 last:border-0">
                <td className="p-4">
                  <div className="font-medium">{p.full_name || "—"}</div>
                  <div className="text-ink/40 text-xs">{p.email}</div>
                </td>
                <td className="p-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-ink/5 uppercase">{p.role}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      p.active ? "bg-green-500/10 text-green-700" : "bg-ink/5 text-ink/40"
                    }`}
                  >
                    {p.active ? dict.team.active : "—"}
                  </span>
                </td>
                <td className="p-4 text-end">
                  <div className="flex gap-3 justify-end flex-wrap">
                    {p.role === "admin" ? (
                      <form action={setProfileRoleAction.bind(null, p.id, "staff")}>
                        <button type="submit" className="text-xs text-ink/50 hover:text-ink">
                          {dict.team.makeStaff}
                        </button>
                      </form>
                    ) : (
                      <form action={setProfileRoleAction.bind(null, p.id, "admin")}>
                        <button type="submit" className="text-xs text-gold-ink hover:underline">
                          {dict.team.makeAdmin}
                        </button>
                      </form>
                    )}
                    <form action={setProfileActiveAction.bind(null, p.id, !p.active)}>
                      <button type="submit" className="text-xs text-red-600/80 hover:text-red-600">
                        {p.active ? dict.team.deactivate : dict.team.activate}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
