import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";

export const dynamic = "force-dynamic";

async function clientNameMap(
  supabase: Awaited<ReturnType<typeof createClient>>,
  clientIds: string[]
) {
  const ids = [...new Set(clientIds)];
  if (ids.length === 0) return new Map<string, string>();
  const { data } = await supabase.from("clients").select("id, name").in("id", ids);
  return new Map((data || []).map((c) => [c.id, c.name]));
}

export default async function DashboardPage() {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const supabase = await createClient();

  const in7Days = new Date();
  in7Days.setDate(in7Days.getDate() + 7);

  const [remindersRes, overdueRes, clientCountRes] = await Promise.all([
    supabase
      .from("reminders")
      .select("id, title, due_at, client_id")
      .in("status", ["pending", "sent"]) // "sent" = notified, not yet resolved by a human
      .lte("due_at", in7Days.toISOString())
      .order("due_at", { ascending: true })
      .limit(10),
    supabase
      .from("payments_with_status")
      .select("id, description, amount, currency, due_date, client_id")
      .eq("is_overdue", true)
      .order("due_date", { ascending: true })
      .limit(10),
    supabase.from("clients").select("id", { count: "exact", head: true }),
  ]);

  const reminders = remindersRes.data || [];
  const overduePayments = overdueRes.data || [];
  const clientCount = clientCountRes.count || 0;

  const names = await clientNameMap(supabase, [
    ...reminders.map((r) => r.client_id).filter((id): id is string => !!id),
    ...overduePayments.map((p) => p.client_id),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{dict.dashboard.title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="text-white/50 text-xs uppercase tracking-wide mb-1">
            {dict.dashboard.totalClients}
          </div>
          <div className="text-3xl font-bold">{clientCount}</div>
        </div>
        <div className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="text-white/50 text-xs uppercase tracking-wide mb-1">
            {dict.dashboard.upcomingReminders}
          </div>
          <div className="text-3xl font-bold">{reminders.length}</div>
        </div>
        <div className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="text-white/50 text-xs uppercase tracking-wide mb-1">
            {dict.dashboard.overduePayments}
          </div>
          <div className="text-3xl font-bold text-red-400">{overduePayments.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{dict.dashboard.upcomingReminders}</h2>
            <Link href="/manage/reminders" className="text-xs text-[#F5C518] hover:underline">
              {dict.dashboard.viewAll}
            </Link>
          </div>
          {reminders.length === 0 ? (
            <p className="text-white/40 text-sm">{dict.dashboard.noReminders}</p>
          ) : (
            <ul className="space-y-3">
              {reminders.map((r) => (
                <li key={r.id} className="text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="font-medium">{r.title}</div>
                  <div className="text-white/40 text-xs mt-0.5">
                    {r.client_id ? names.get(r.client_id) : null} ·{" "}
                    {new Date(r.due_at).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{dict.dashboard.overduePayments}</h2>
            <Link href="/manage/payments" className="text-xs text-[#F5C518] hover:underline">
              {dict.dashboard.viewAll}
            </Link>
          </div>
          {overduePayments.length === 0 ? (
            <p className="text-white/40 text-sm">{dict.dashboard.noOverdue}</p>
          ) : (
            <ul className="space-y-3">
              {overduePayments.map((p) => (
                <li key={p.id} className="text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="font-medium">
                    {names.get(p.client_id) || "—"} — {p.amount} {p.currency}
                  </div>
                  <div className="text-white/40 text-xs mt-0.5">
                    {p.description} · {dict.payments.dueDate}: {p.due_date}
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
