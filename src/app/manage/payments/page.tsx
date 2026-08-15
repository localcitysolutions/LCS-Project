import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { paymentStatusValues } from "@/lib/manage/schemas";
import type { PaymentStatus } from "@/types/manage";

function isPaymentStatus(value: string): value is PaymentStatus {
  return (paymentStatusValues as readonly string[]).includes(value);
}

export const dynamic = "force-dynamic";

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; overdue?: string }>;
}) {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const { status, overdue } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("payments_with_status").select("*").order("due_date", { ascending: true });
  if (status && isPaymentStatus(status)) query = query.eq("status", status);
  if (overdue === "1") query = query.eq("is_overdue", true);

  const { data: payments } = await query;
  const clientIds = [...new Set((payments || []).map((p) => p.client_id))];
  const { data: clients } = clientIds.length
    ? await supabase.from("clients").select("id, name").in("id", clientIds)
    : { data: [] as { id: string; name: string }[] };
  const names = new Map((clients || []).map((c) => [c.id, c.name]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{dict.payments.title}</h1>
        <Link
          href="/manage/payments/new"
          className="px-4 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm"
        >
          {dict.payments.new}
        </Link>
      </div>

      <form className="flex flex-wrap items-center gap-4 mb-6" method="get">
        <select
          name="status"
          defaultValue={status || ""}
          className="bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">{dict.payments.status}</option>
          <option value="unpaid">{dict.payments.statusLabels.unpaid}</option>
          <option value="paid">{dict.payments.statusLabels.paid}</option>
        </select>
        <label className="flex items-center gap-2 text-sm text-white/60">
          <input type="checkbox" name="overdue" value="1" defaultChecked={overdue === "1"} />
          {dict.payments.overdue}
        </label>
        <button type="submit" className="px-4 py-2 rounded-lg bg-white/10 text-sm">
          {dict.clients.search}
        </button>
      </form>

      <div className="bg-[#0E1A2E] border border-white/10 rounded-xl overflow-hidden">
        {!payments || payments.length === 0 ? (
          <p className="p-6 text-white/40 text-sm">{dict.payments.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <Link href={`/manage/payments/${p.id}/edit`} className="font-medium hover:text-[#F5C518]">
                      {names.get(p.client_id) || "—"}
                    </Link>
                    <div className="text-white/40 text-xs">{p.description}</div>
                  </td>
                  <td className="p-4">
                    {p.amount} {p.currency}
                  </td>
                  <td className="p-4 text-white/60">{p.due_date || "—"}</td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        p.is_overdue ? "bg-red-500/10 text-red-400" : "bg-white/5"
                      }`}
                    >
                      {p.is_overdue ? dict.payments.overdue : dict.payments.statusLabels[p.status]}
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
