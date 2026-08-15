import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import {
  deleteClientAction,
  addClientServiceAction,
  setClientServiceStatusAction,
  deleteClientServiceAction,
} from "../actions";
import AddServiceForm from "./AddServiceForm";
import type { ClientServiceStatus } from "@/types/manage";

export const dynamic = "force-dynamic";

function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const serviceStatusClasses: Record<ClientServiceStatus, string> = {
  active: "bg-green-500/15 text-green-400",
  completed: "bg-white/10 text-white/60",
  paused: "bg-amber-500/15 text-amber-400",
};

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

  const [{ data: services }, { data: payments }, { data: reminders }] = await Promise.all([
    supabase
      .from("client_services")
      .select("*")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
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

  const t = dict.clients;
  const sv = dict.services;
  const serviceLabel = (key: string | null) =>
    (key && (t.serviceLabels as Record<string, string>)[key]) || key || "—";

  const boundDelete = deleteClientAction.bind(null, id);
  const boundAddService = addClientServiceAction.bind(null, id);

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
              {t.delete}
            </button>
          </form>
        </div>
      </div>
      {client.company && <p className="text-white/50 mb-6">{client.company}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-sm">
        <div>
          <div className="text-white/40 text-xs">{t.email}</div>
          {client.email || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.phone}</div>
          {client.phone || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.whatsapp}</div>
          {client.whatsapp || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.status}</div>
          {t.statusLabels[client.status]}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.website}</div>
          {client.website ? (
            <a
              href={withProtocol(client.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5C518] hover:underline break-all"
            >
              {client.website}
            </a>
          ) : (
            "—"
          )}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.startDate}</div>
          {client.start_date || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.primaryService}</div>
          {serviceLabel(client.primary_service)}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.industry}</div>
          {client.industry || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.gmbName}</div>
          {client.gmb_name || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.gmbLocation}</div>
          {client.gmb_location || "—"}
        </div>
        <div>
          <div className="text-white/40 text-xs">{t.gmbLink}</div>
          {client.gmb_link ? (
            <a
              href={withProtocol(client.gmb_link)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5C518] hover:underline break-all"
            >
              {t.gmbLink}
            </a>
          ) : (
            "—"
          )}
        </div>
      </div>

      {client.notes && (
        <div className="mb-8">
          <div className="text-white/40 text-xs mb-1">{t.notes}</div>
          <p className="text-sm text-white/80 whitespace-pre-wrap">{client.notes}</p>
        </div>
      )}

      <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-4">{sv.title}</h2>
        <AddServiceForm dict={dict} action={boundAddService} />
        {!services || services.length === 0 ? (
          <p className="text-white/40 text-sm">{sv.empty}</p>
        ) : (
          <ul className="space-y-3">
            {services.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-white/5 pb-3 last:border-0 last:pb-0 text-sm"
              >
                <span className="font-medium">{serviceLabel(row.service)}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${serviceStatusClasses[row.status]}`}
                >
                  {sv.statusLabels[row.status]}
                </span>
                <span className="text-white/40 text-xs">
                  {row.started_at || "—"}
                  {row.ended_at ? ` → ${row.ended_at}` : ""}
                </span>
                {row.notes && <span className="text-white/50 text-xs">· {row.notes}</span>}
                <span className="flex gap-1 ms-auto">
                  {row.status !== "active" && (
                    <form action={setClientServiceStatusAction.bind(null, row.id, id, "active")}>
                      <button className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10">
                        {sv.markActive}
                      </button>
                    </form>
                  )}
                  {row.status !== "paused" && (
                    <form action={setClientServiceStatusAction.bind(null, row.id, id, "paused")}>
                      <button className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10">
                        {sv.markPaused}
                      </button>
                    </form>
                  )}
                  {row.status !== "completed" && (
                    <form action={setClientServiceStatusAction.bind(null, row.id, id, "completed")}>
                      <button className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10">
                        {sv.markCompleted}
                      </button>
                    </form>
                  )}
                  <form action={deleteClientServiceAction.bind(null, row.id, id)}>
                    <button className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
                      {sv.delete}
                    </button>
                  </form>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

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
