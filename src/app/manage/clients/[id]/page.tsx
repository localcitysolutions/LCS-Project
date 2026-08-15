import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { deleteClientAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const { data: client } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (!client) notFound();

  const [{ data: payments }, { data: reminders }] = await Promise.all([
    supabase
      .from("payments_with_status")
      .select("*")
      .eq("client_id", id)
      .order("due_date", { ascending: false }),
    supabase
      .from("reminders")
      .select("*")
      .eq("client_id", id)
      .order("due_at", { ascending: false }),
  ]);

  const boundDelete = deleteClientAction.bind(null, id);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <div className="flex gap-2">
          <Link href={`/manage/clients/${id}/edit`} className="px-4 py-2 rounded-full bg-white/10 text-sm">
            {dict.common.edit}
          </Link>
          <form action={boundDelete}>
            <button type="submit" className="px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm">
              {dict.clients.delete}
            </button>
          </form>
        </div>
      </div>
      {client.company && <p className="text-white/50 mb-6">{client.company}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
        <div>
          <div className="text-white/40 text-xs">{dict.clients.email}</div>
          {client.email || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{dict.clients.phone}</div>
          {client.phone || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{dict.clients.whatsapp}</div>
          {client.whatsapp || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{dict.clients.status}</div>
          {dict.clients.statusLabels[client.status]}
        </div>
      </div>

      {client.notes && (
        <div className="mb-8">
          <div className="text-white/40 text-xs mb-1">{dict.clients.notes}</div>
          <p className="text-sm text-white/80 whitespace-pre-wrap">{client.notes}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{dict.payments.title}</h2>
            <Link
              href={`/manage/payments/new?client_id=${id}`}
              className="text-xs text-[#F5C518] hover:underline"
            >
              {dict.payments.new}
            </Link>
          </div>
          {!payments || payments.length === 0 ? (
            <p className="text-white/40 text-sm">{dict.payments.empty}</p>
          ) : (
            <ul className="space-y-3">
              {payments.map((p) => (
                <li key={p.id} className="text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <Link href={`/manage/payments/${p.id}/edit`} className="font-medium hover:text-[#F5C518]">
                    {p.amount} {p.currency} — {dict.payments.statusLabels[p.status]}
                    {p.is_overdue && <span className="text-red-400"> · {dict.payments.overdue}</span>}
                  </Link>
                  <div className="text-white/40 text-xs mt-0.5">{p.description}</div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{dict.reminders.title}</h2>
            <Link
              href={`/manage/reminders/new?client_id=${id}`}
              className="text-xs text-[#F5C518] hover:underline"
            >
              {dict.reminders.new}
            </Link>
          </div>
          {!reminders || reminders.length === 0 ? (
            <p className="text-white/40 text-sm">{dict.reminders.empty}</p>
          ) : (
            <ul className="space-y-3">
              {reminders.map((r) => (
                <li key={r.id} className="text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-white/40 text-xs mt-0.5">
                    {new Date(r.due_at).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")} ·{" "}
                    {dict.reminders.statusLabels[r.status]}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
