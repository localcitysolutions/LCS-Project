import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { updateReminderStatusAction } from "./actions";
import { reminderStatusValues } from "@/lib/manage/schemas";
import type { ReminderStatus } from "@/types/manage";

export const dynamic = "force-dynamic";

// "sent" means an email/WhatsApp notification went out (see the cron route)
// — it is NOT a resolution state. A reminder still needs human attention
// until it's explicitly marked done or dismissed, so the default view
// (and the dashboard's) shows both pending and sent.
const OPEN_STATUSES = ["pending", "sent"] as const;

function isReminderStatus(value: string): value is ReminderStatus {
  return (reminderStatusValues as readonly string[]).includes(value);
}

export default async function RemindersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const { status } = await searchParams;
  const supabase = await createClient();

  const query = supabase.from("reminders").select("*").order("due_at", { ascending: true });
  const { data: reminders } = status && isReminderStatus(status)
    ? await query.eq("status", status)
    : await query.in("status", OPEN_STATUSES);

  const clientIds = [
    ...new Set((reminders || []).map((r) => r.client_id).filter((id): id is string => !!id)),
  ];
  const { data: clients } = clientIds.length
    ? await supabase.from("clients").select("id, name").in("id", clientIds)
    : { data: [] as { id: string; name: string }[] };
  const names = new Map((clients || []).map((c) => [c.id, c.name]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{dict.reminders.title}</h1>
        <Link
          href="/manage/reminders/new"
          className="px-4 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm"
        >
          {dict.reminders.new}
        </Link>
      </div>

      <form className="flex gap-3 mb-6" method="get">
        <select
          name="status"
          defaultValue={status || ""}
          className="bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">{dict.reminders.title}</option>
          {Object.entries(dict.reminders.statusLabels).map(([value, label]) => (
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
        {!reminders || reminders.length === 0 ? (
          <p className="p-6 text-white/40 text-sm">{dict.reminders.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {reminders.map((r) => (
                <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <div className="font-medium">{r.title}</div>
                    <div className="text-white/40 text-xs">
                      {r.client_id ? names.get(r.client_id) : null} ·{" "}
                      {new Date(r.due_at).toLocaleString(lang === "ar" ? "ar-SA" : "en-US")}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-white/5">
                      {dict.reminders.statusLabels[r.status]}
                    </span>
                  </td>
                  <td className="p-4 text-end">
                    {(r.status === "pending" || r.status === "sent") && (
                      <div className="flex gap-3 justify-end">
                        <form action={updateReminderStatusAction.bind(null, r.id, "done")}>
                          <button type="submit" className="text-xs text-[#F5C518] hover:underline">
                            {dict.reminders.markDone}
                          </button>
                        </form>
                        <form action={updateReminderStatusAction.bind(null, r.id, "dismissed")}>
                          <button type="submit" className="text-xs text-white/40 hover:text-white/70">
                            {dict.reminders.dismiss}
                          </button>
                        </form>
                      </div>
                    )}
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
