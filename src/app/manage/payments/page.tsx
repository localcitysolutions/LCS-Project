/* eslint-disable @next/next/no-html-link-for-pages --
 * The bulk-download links point at a route handler that returns a PDF
 * attachment, not a page. next/link would prefetch it and then try to
 * client-side navigate into a binary response instead of downloading it. */
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { paymentStatusValues } from "@/lib/manage/schemas";
import { money, monthLabel } from "@/lib/manage/money";
import GenerateChargesButton from "./GenerateChargesButton";
import type { PaymentStatus } from "@/types/manage";

function isPaymentStatus(value: string): value is PaymentStatus {
  return (paymentStatusValues as readonly string[]).includes(value);
}

const paymentStatusClasses: Record<PaymentStatus, string> = {
  unpaid: "bg-white/10 text-white/60",
  partial: "bg-amber-500/15 text-amber-400",
  paid: "bg-green-500/15 text-green-400",
};

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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">{dict.payments.title}</h1>
        <div className="flex flex-wrap items-center gap-3">
          <GenerateChargesButton dict={dict} />
          <a
            href="/manage/invoices/bulk"
            className="px-4 py-2 rounded-full bg-white/10 text-sm hover:bg-white/15 transition-all"
          >
            {dict.documents.bulkInvoices}
          </a>
          <a
            href="/manage/invoices/bulk?overdue=1"
            className="px-4 py-2 rounded-full bg-red-500/10 text-red-300 text-sm hover:bg-red-500/20 transition-all"
          >
            {dict.documents.bulkOverdue}
          </a>
          <Link
            href="/manage/payments/new"
            className="px-4 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm"
          >
            {dict.payments.new}
          </Link>
        </div>
      </div>

      <form className="flex flex-wrap items-center gap-4 mb-6" method="get">
        <select
          name="status"
          defaultValue={status || ""}
          className="bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2 text-sm"
        >
          <option value="">{dict.payments.status}</option>
          {paymentStatusValues.map((s) => (
            <option key={s} value={s}>
              {dict.payments.statusLabels[s]}
            </option>
          ))}
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
                    <div className="text-white/40 text-xs">
                      {dict.payments.kindLabels[p.kind]}
                      {p.period_month ? ` · ${monthLabel(p.period_month, lang)}` : ""}
                      {p.description ? ` · ${p.description}` : ""}
                      {p.is_ad_budget && (
                        <span className="ms-2 text-[11px] px-1.5 py-0.5 rounded-full bg-sky-500/15 text-sky-400">
                          {dict.payments.adBudgetShort}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {money(p.total, p.currency)}
                    {Number(p.vat_amount) > 0 && (
                      <div className="text-white/30 text-[11px]">
                        {dict.payments.vatAmount} {money(p.vat_amount, p.currency)}
                      </div>
                    )}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {Number(p.balance) > 0 ? (
                      <span className="text-amber-400">{money(p.balance, p.currency)}</span>
                    ) : (
                      <span className="text-white/30">—</span>
                    )}
                    {Number(p.amount_paid) > 0 && Number(p.balance) > 0 && (
                      <div className="text-white/30 text-[11px]">
                        {dict.payments.received} {money(p.amount_paid, p.currency)}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-white/60 whitespace-nowrap">{p.due_date || "—"}</td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${paymentStatusClasses[p.status]}`}
                    >
                      {dict.payments.statusLabels[p.status]}
                    </span>
                    {p.is_overdue && (
                      <span className="ms-1 text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-400">
                        {dict.payments.overdue}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href={`/manage/invoices/${p.id}`}
                      className="text-xs text-[#F5C518] hover:underline whitespace-nowrap"
                    >
                      {dict.documents.invoice} PDF
                    </a>
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
