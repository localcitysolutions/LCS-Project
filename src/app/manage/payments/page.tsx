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
  unpaid: "bg-ink/8 text-ink/60",
  partial: "bg-amber-500/15 text-amber-700",
  paid: "bg-green-500/15 text-green-700",
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
            className="px-4 py-2 rounded-full bg-ink/8 text-sm hover:bg-ink/12 transition-all"
          >
            {dict.documents.bulkInvoices}
          </a>
          <a
            href="/manage/invoices/bulk?overdue=1"
            className="px-4 py-2 rounded-full bg-red-500/10 text-red-600 text-sm hover:bg-red-500/20 transition-all"
          >
            {dict.documents.bulkOverdue}
          </a>
          <Link
            href="/manage/payments/new"
            className="px-4 py-2 rounded-full bg-[#F5C518] text-ink font-bold text-sm"
          >
            {dict.payments.new}
          </Link>
        </div>
      </div>

      <form className="flex flex-wrap items-center gap-4 mb-6" method="get">
        <select
          name="status"
          defaultValue={status || ""}
          className="bg-panel border border-line rounded-lg px-4 py-2 text-sm"
        >
          <option value="">{dict.payments.status}</option>
          {paymentStatusValues.map((s) => (
            <option key={s} value={s}>
              {dict.payments.statusLabels[s]}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-ink/60">
          <input type="checkbox" name="overdue" value="1" defaultChecked={overdue === "1"} />
          {dict.payments.overdue}
        </label>
        <button type="submit" className="px-4 py-2 rounded-lg bg-ink/8 text-sm">
          {dict.clients.search}
        </button>
      </form>

      <div className="bg-panel border border-line rounded-xl overflow-hidden">
        {!payments || payments.length === 0 ? (
          <p className="p-6 text-ink/40 text-sm">{dict.payments.empty}</p>
        ) : (
          <table className="w-full text-sm">
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-line/60 last:border-0 hover:bg-ink/[0.03]">
                  <td className="p-4">
                    <Link href={`/manage/payments/${p.id}/edit`} className="font-medium hover:text-gold-ink">
                      {names.get(p.client_id) || "—"}
                    </Link>
                    <div className="text-ink/40 text-xs">
                      {dict.payments.kindLabels[p.kind]}
                      {p.period_month ? ` · ${monthLabel(p.period_month, lang)}` : ""}
                      {p.description ? ` · ${p.description}` : ""}
                      {p.is_ad_budget && (
                        <span className="ms-2 text-[11px] px-1.5 py-0.5 rounded-full bg-sky-500/15 text-sky-700">
                          {dict.payments.adBudgetShort}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {money(p.total, p.currency)}
                    {Number(p.vat_amount) > 0 && (
                      <div className="text-ink/30 text-[11px]">
                        {dict.payments.vatAmount} {money(p.vat_amount, p.currency)}
                      </div>
                    )}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {Number(p.balance) > 0 ? (
                      <span className="text-amber-700">{money(p.balance, p.currency)}</span>
                    ) : (
                      <span className="text-ink/30">—</span>
                    )}
                    {Number(p.amount_paid) > 0 && Number(p.balance) > 0 && (
                      <div className="text-ink/30 text-[11px]">
                        {dict.payments.received} {money(p.amount_paid, p.currency)}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-ink/60 whitespace-nowrap">{p.due_date || "—"}</td>
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${paymentStatusClasses[p.status]}`}
                    >
                      {dict.payments.statusLabels[p.status]}
                    </span>
                    {p.is_overdue && (
                      <span className="ms-1 text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-600">
                        {dict.payments.overdue}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href={`/manage/invoices/${p.id}`}
                      className="text-xs text-gold-ink hover:underline whitespace-nowrap"
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
