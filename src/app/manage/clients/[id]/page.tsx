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
import {
  saveBillingPlanAction,
  createReceiptAction,
  deleteReceiptAction,
  markPaymentPaidAction,
  deletePaymentAction,
} from "../../payments/actions";
import AddServiceForm from "./AddServiceForm";
import BillingPlanForm from "./BillingPlanForm";
import RecordPaymentForm, { type OpenCharge } from "./RecordPaymentForm";
import { money, riyadhToday, monthLabel } from "@/lib/manage/money";
import type { ClientServiceStatus, PaymentStatus } from "@/types/manage";

export const dynamic = "force-dynamic";

function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const serviceStatusClasses: Record<ClientServiceStatus, string> = {
  active: "bg-green-500/15 text-green-400",
  completed: "bg-white/10 text-white/60",
  paused: "bg-amber-500/15 text-amber-400",
};

const paymentStatusClasses: Record<PaymentStatus, string> = {
  unpaid: "bg-white/10 text-white/60",
  partial: "bg-amber-500/15 text-amber-400",
  paid: "bg-green-500/15 text-green-400",
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

  const [
    { data: services },
    { data: payments },
    { data: reminders },
    { data: plans },
    { data: balance },
    { data: receipts },
  ] = await Promise.all([
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
    supabase
      .from("billing_plans")
      .select("*")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
    supabase.from("client_balances").select("*").eq("client_id", id).maybeSingle(),
    supabase
      .from("payment_receipts")
      .select("*")
      .eq("client_id", id)
      .order("received_at", { ascending: false }),
  ]);

  // Prefer the active plan; fall back to the most recent one so a paused or
  // ended plan is still editable rather than disappearing from the UI.
  const plan = (plans || []).find((p) => p.status === "active") || (plans || [])[0] || null;

  // How much of each receipt is still sitting unapplied (i.e. is advance credit).
  const receiptIds = (receipts || []).map((r) => r.id);
  const { data: allocations } = receiptIds.length
    ? await supabase
        .from("payment_allocations")
        .select("receipt_id, amount")
        .in("receipt_id", receiptIds)
    : { data: [] as { receipt_id: string; amount: number }[] };

  const appliedByReceipt = new Map<string, number>();
  for (const a of allocations || []) {
    appliedByReceipt.set(a.receipt_id, (appliedByReceipt.get(a.receipt_id) || 0) + Number(a.amount));
  }

  const t = dict.clients;
  const sv = dict.services;
  const bl = dict.billing;
  const rc = dict.receipts;
  const pay = dict.payments;
  const today = riyadhToday();
  const planCurrency = plan?.currency || "SAR";

  const chargeLabel = (p: { kind: string; period_month: string | null; description: string | null }) =>
    p.kind === "monthly" && p.period_month
      ? `${pay.kindLabels.monthly} · ${monthLabel(p.period_month, lang)}`
      : p.description || pay.kindLabels[p.kind as keyof typeof pay.kindLabels] || "—";

  const openCharges: OpenCharge[] = (payments || [])
    .filter((p) => Number(p.balance) > 0)
    .map((p) => ({
      id: p.id,
      label: chargeLabel(p),
      balance: Number(p.balance),
      currency: p.currency,
    }));

  const boundSavePlan = saveBillingPlanAction.bind(null, id, plan?.id ?? null);
  const boundCreateReceipt = createReceiptAction.bind(null, id);
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
        <div>
          <div className="text-white/40 text-xs">{t.vatNumber}</div>
          {client.vat_number || "—"}
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#0E1A2E] border border-white/10 rounded-xl p-4">
          <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">
            {bl.totalCharged}
          </div>
          <div className="text-lg font-bold">
            {money(balance?.total_charged ?? 0, planCurrency)}
          </div>
        </div>
        <div className="bg-[#0E1A2E] border border-white/10 rounded-xl p-4">
          <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">
            {bl.totalReceived}
          </div>
          <div className="text-lg font-bold">
            {money(balance?.total_received ?? 0, planCurrency)}
          </div>
        </div>
        <div className="bg-[#0E1A2E] border border-white/10 rounded-xl p-4">
          <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">
            {bl.outstanding}
          </div>
          <div
            className={`text-lg font-bold ${
              Number(balance?.outstanding ?? 0) > 0 ? "text-red-400" : ""
            }`}
          >
            {money(balance?.outstanding ?? 0, planCurrency)}
          </div>
        </div>
        <div className="bg-[#0E1A2E] border border-white/10 rounded-xl p-4">
          <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">{bl.credit}</div>
          <div
            className={`text-lg font-bold ${
              Number(balance?.credit_balance ?? 0) > 0 ? "text-[#F5C518]" : ""
            }`}
          >
            {money(balance?.credit_balance ?? 0, planCurrency)}
          </div>
          {Number(balance?.credit_balance ?? 0) > 0 && (
            <p className="text-white/30 text-[11px] mt-1">{bl.creditHint}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{bl.title}</h2>
            {plan && plan.monthly_amount > 0 && (
              <span className="text-xs text-[#F5C518]">
                {money(plan.monthly_amount, plan.currency)}
                {bl.perMonth}
              </span>
            )}
          </div>
          {!plan && <p className="text-white/40 text-sm mb-4">{bl.none}</p>}
          <BillingPlanForm dict={dict} action={boundSavePlan} plan={plan} today={today} />
        </section>

        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{rc.title}</h2>
            {Number(balance?.outstanding ?? 0) > 0 && (
              <a
                href={`/manage/clients/${id}/statement`}
                className="text-xs text-[#F5C518] hover:underline"
                title={dict.documents.statementHint}
              >
                {dict.documents.statement} PDF
              </a>
            )}
          </div>
          <RecordPaymentForm
            dict={dict}
            action={boundCreateReceipt}
            openCharges={openCharges}
            currency={planCurrency}
            today={today}
          />
          {!receipts || receipts.length === 0 ? (
            <p className="text-white/40 text-sm">{rc.empty}</p>
          ) : (
            <ul className="space-y-3">
              {receipts.map((r) => {
                const unapplied = Number(r.amount) - (appliedByReceipt.get(r.id) || 0);
                return (
                  <li
                    key={r.id}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="font-medium">{money(r.amount, r.currency)}</span>
                    <span className="text-white/40 text-xs">{r.received_at}</span>
                    <span className="text-white/40 text-xs">{rc.methodLabels[r.method]}</span>
                    {r.reference && <span className="text-white/40 text-xs">#{r.reference}</span>}
                    <a
                      href={`/manage/receipts/${r.id}`}
                      className="text-xs text-[#F5C518] hover:underline"
                    >
                      {dict.documents.receipt} PDF
                    </a>
                    {unapplied > 0.005 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5C518]/15 text-[#F5C518]">
                        {money(unapplied, r.currency)} {rc.unapplied}
                      </span>
                    )}
                    <form action={deleteReceiptAction.bind(null, r.id, id)} className="ms-auto">
                      <button className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
                        {rc.delete}
                      </button>
                    </form>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{pay.title}</h2>
            <Link
              href={`/manage/payments/new?client_id=${id}`}
              className="text-xs text-[#F5C518] hover:underline"
            >
              {pay.new}
            </Link>
          </div>
          {!payments || payments.length === 0 ? (
            <p className="text-white/40 text-sm">{pay.empty}</p>
          ) : (
            <ul className="space-y-3">
              {payments.map((p) => (
                <li key={p.id} className="text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <Link
                      href={`/manage/payments/${p.id}/edit`}
                      className="font-medium hover:text-[#F5C518]"
                    >
                      {money(p.total, p.currency)}
                    </Link>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full ${
                        paymentStatusClasses[p.status]
                      }`}
                    >
                      {pay.statusLabels[p.status]}
                    </span>
                    {p.is_overdue && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
                        {pay.overdue}
                      </span>
                    )}
                    <span className="flex items-center gap-1 ms-auto">
                      <a
                        href={`/manage/invoices/${p.id}`}
                        className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[#F5C518]"
                      >
                        {dict.documents.invoice} PDF
                      </a>
                      {Number(p.balance) > 0 && (
                        <form action={markPaymentPaidAction.bind(null, p.id, id)}>
                          <button className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10">
                            {pay.markPaid}
                          </button>
                        </form>
                      )}
                      <form action={deletePaymentAction.bind(null, p.id, id)}>
                        <button className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
                          {t.delete}
                        </button>
                      </form>
                    </span>
                  </div>
                  <div className="text-white/40 text-xs mt-1">
                    {chargeLabel(p)}
                    {p.due_date ? ` · ${pay.dueDate}: ${p.due_date}` : ""}
                    {Number(p.vat_amount) > 0
                      ? ` · ${pay.vatAmount} ${money(p.vat_amount, p.currency)}`
                      : ""}
                  </div>
                  {Number(p.amount_paid) > 0 && Number(p.balance) > 0 && (
                    <div className="text-white/50 text-xs mt-0.5">
                      {pay.received}: {money(p.amount_paid, p.currency)} · {pay.balance}:{" "}
                      <span className="text-amber-400">{money(p.balance, p.currency)}</span>
                    </div>
                  )}
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
