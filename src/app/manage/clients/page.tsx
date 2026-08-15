import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { clientStatusValues } from "@/lib/manage/schemas";
import type { ClientStatus } from "@/types/manage";

function isClientStatus(value: string): value is ClientStatus {
  return (clientStatusValues as readonly string[]).includes(value);
}

export const dynamic = "force-dynamic";

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const { q, status } = await searchParams;

  const supabase = await createClient();
  let query = supabase
    .from("clients")
    .select("id, name, company, status, phone, email")
    .order("created_at", { ascending: false });
  if (status && isClientStatus(status)) query = query.eq("status", status);
  if (q) query = query.ilike("name", `%${q}%`);

  const { data: clients } = await query;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{dict.clients.title}</h1>
        <Link
          href="/manage/clients/new"
          className="px-4 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm"
        >
          {dict.clients.new}
        </Link>
      </div>

      <form className="flex flex-wrap gap-3 mb-6" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder={dict.clients.search}
          className="flex-1 min-w-[200px] bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2 text-sm"
        />
        <select
          name="status"
          defaultValue={status || ""}
          className="bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">{dict.clients.status}</option>
          {Object.entries(dict.clients.statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button type="submit" className="px-4 py-2 rounded-lg bg-white/10 text-sm">
          {dict.clients.search}
        </button>
      </form>

      <div className="bg-[#0E1A2E] border border-white/10 rounded-xl overflow-hidden">
        {!clients || clients.length === 0 ? (
          <p className="p-6 text-white/40 text-sm">{dict.clients.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {clients.map((c) => (
                <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <Link href={`/manage/clients/${c.id}`} className="font-medium hover:text-[#F5C518]">
                      {c.name}
                    </Link>
                    {c.company && <div className="text-white/40 text-xs">{c.company}</div>}
                  </td>
                  <td className="p-4 text-white/60">{c.email || c.phone || "—"}</td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                      {dict.clients.statusLabels[c.status as ClientStatus]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
