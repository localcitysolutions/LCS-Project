import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import {
  deleteClientAction,
  addClientServiceAction,
  setClientServiceStatusAction,
  deleteClientServiceAction,
  addClientNoteAction,
  setClientNotePinnedAction,
  deleteClientNoteAction,
} from "../actions";
import {
  saveBillingPlanAction,
  createReceiptAction,
  deleteReceiptAction,
  markPaymentPaidAction,
  deletePaymentAction,
} from "../../payments/actions";
import AddServiceForm from "./AddServiceForm";
import AddNoteForm from "./AddNoteForm";
import BillingPlanForm from "./BillingPlanForm";
import RecordPaymentForm, { type OpenCharge } from "./RecordPaymentForm";
import ConfirmForm from "../../ConfirmForm";
import { money, riyadhToday, monthLabel } from "@/lib/manage/money";
import type {
  ClientActivity,
  ClientServiceStatus,
  ClientStatus,
  PaymentStatus,
  QuotationStatus,
} from "@/types/manage";

export const dynamic = "force-dynamic";

function withProtocol(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const clientStatusClasses: Record<ClientStatus, string> = {
  lead: "bg-sky-500/15 text-sky-400",
  active: "bg-green-500/15 text-green-400",
  paused: "bg-amber-500/15 text-amber-400",
  churned: "bg-white/10 text-white/50",
};

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

const quotationStatusClasses: Record<QuotationStatus, string> = {
  draft: "bg-white/10 text-white/60",
  sent: "bg-sky-500/15 text-sky-400",
  accepted: "bg-green-500/15 text-green-400",
  declined: "bg-red-500/15 text-red-400",
  expired: "bg-white/10 text-white/50",
  converted: "bg-[#F5C518]/15 text-[#F5C518]",
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
    { data: notes },
    { data: activity },
    { data: quotations },
    { data: profiles },
    { data: partners },
    { data: expenses },
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
    supabase
      .from("client_notes")
      .select("*")
      .eq("client_id", id)
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase
      .from("client_activity")
      .select("*")
      .eq("client_id", id)
      .order("created_at", { ascending: false })
      .limit(30),
    supabase
      .from("quotations")
      .select("id, quote_number, title, status, issue_date, total, monthly_total, currency")
      .eq("client_id", id)
      .order("issue_date", { ascending: false }),
    // All profiles (not just active) so notes/activity by deactivated staff
    // still show a name.
    supabase.from("profiles").select("id, full_name, email"),
    supabase
      .from("partners")
      .select("id, name, is_default_account")
      .eq("active", true)
      .order("sort_order"),
    // Admin-only table: staff simply get an empty list here.
    supabase
      .from("expenses")
      .select("id, category, amount, currency, spent_at, paid_by")
      .eq("client_id", id),
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
  const nt = dict.clientNotes;
  const act = dict.activity;
  const today = riyadhToday();
  const planCurrency = plan?.currency || "SAR";

  const profileName = (pid: string | null) => {
    const p = pid ? (profiles || []).find((row) => row.id === pid) : null;
    return p ? p.full_name || p.email || "—" : null;
  };
  const partnerName = (pid: string | null) =>
    (pid && (partners || []).find((p) => p.id === pid)?.name) || null;

  // Ads: the client's ad money passing through us. Billed vs actually received
  // vs what we've paid out to the ad platform on their behalf.
  const adCharges = (payments || []).filter((p) => p.is_ad_budget);
  const adBudgetBilled = adCharges.reduce((sum, p) => sum + Number(p.total), 0);
  const adBudgetPaid = adCharges.reduce((sum, p) => sum + Number(p.amount_paid), 0);
  const adSpend = (expenses || [])
    .filter((e) => e.category === "ad_spend")
    .reduce((sum, e) => sum + Number(e.amount), 0);
  const showAds = adCharges.length > 0 || adSpend > 0 || Number(plan?.ad_budget_amount ?? 0) > 0;
  const dateTime = (iso: string) =>
    new Date(iso).toLocaleString(lang === "ar" ? "ar-SA" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

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
  const boundAddNote = addClientNoteAction.bind(null, id);

  // Renders the details half of an activity row from its trigger-written meta.
  const metaStr = (a: ClientActivity, key: string) => {
    const v = a.meta[key];
    return typeof v === "string" ? v : "";
  };
  const metaNum = (a: ClientActivity, key: string) => {
    const v = a.meta[key];
    return typeof v === "number" ? v : Number(v) || 0;
  };
  const lookup = (labels: Record<string, string>, key: string) => labels[key] || key || "—";
  const activityDetail = (a: ClientActivity): string => {
    const currency = metaStr(a, "currency") || "SAR";
    switch (a.kind) {
      case "status_changed":
        return `${lookup(t.statusLabels, metaStr(a, "from"))} → ${lookup(t.statusLabels, metaStr(a, "to"))}`;
      case "service_added":
      case "service_removed":
        return serviceLabel(metaStr(a, "service"));
      case "service_status":
        return `${serviceLabel(metaStr(a, "service"))}: ${lookup(sv.statusLabels, metaStr(a, "from"))} → ${lookup(sv.statusLabels, metaStr(a, "to"))}`;
      case "plan_created":
      case "plan_updated":
        return `${money(metaNum(a, "monthly_amount"), currency)}${bl.perMonth} · ${lookup(bl.statusLabels, metaStr(a, "status"))}`;
      case "charge_created":
      case "charge_deleted":
        return `${lookup(pay.kindLabels, metaStr(a, "kind"))} · ${money(metaNum(a, "total"), currency)}`;
      case "payment_received":
        return `${money(metaNum(a, "amount"), currency)} · ${lookup(rc.methodLabels, metaStr(a, "method"))}`;
      case "receipt_deleted":
        return money(metaNum(a, "amount"), currency);
      case "expense_added":
      case "expense_deleted":
        return `${lookup(dict.partners.categories, metaStr(a, "category"))} · ${money(
          metaNum(a, "amount"),
          currency
        )}`;
      case "quotation_created":
      case "quotation_status": {
        const parts = [metaStr(a, "quote_number") || metaStr(a, "title")];
        if (a.kind === "quotation_status") {
          parts.push(
            `${lookup(dict.quotations.statusLabels, metaStr(a, "from"))} → ${lookup(
              dict.quotations.statusLabels,
              metaStr(a, "to")
            )}`
          );
        }
        return parts.filter(Boolean).join(" · ");
      }
      default:
        return "";
    }
  };

  const whatsappDigits = (client.whatsapp || client.phone || "").replace(/\D/g, "");

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <span
          className={`text-xs px-2 py-1 rounded-full ${clientStatusClasses[client.status]}`}
        >
          {t.statusLabels[client.status]}
        </span>
        {(client.tags || []).map((tag) => (
          <Link
            key={tag}
            href={`/manage/clients?tag=${encodeURIComponent(tag)}`}
            className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/60 hover:bg-white/10"
          >
            {tag}
          </Link>
        ))}
        <div className="flex gap-2 ms-auto">
          <Link
            href={`/manage/quotations/new?client_id=${id}`}
            className="px-4 py-2 rounded-full bg-white/10 text-sm"
          >
            {dict.quotations.new}
          </Link>
          <a
            href={`/manage/clients/${id}/statement`}
            className="px-4 py-2 rounded-full bg-white/10 text-sm"
            title={dict.documents.statementHint}
          >
            {dict.documents.statement} PDF
          </a>
          <Link href={`/manage/clients/${id}/edit`} className="px-4 py-2 rounded-full bg-white/10 text-sm">
            {dict.common.edit}
          </Link>
          <ConfirmForm action={boundDelete} message={t.confirmDelete}>
            <button type="submit" className="px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm">
              {t.delete}
            </button>
          </ConfirmForm>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/50 mb-6">
        {client.company && <span>{client.company}</span>}
        {client.phone && (
          <a href={`tel:${client.phone}`} className="hover:text-[#F5C518]">
            {client.phone}
          </a>
        )}
        {client.email && (
          <a href={`mailto:${client.email}`} className="hover:text-[#F5C518]">
            {client.email}
          </a>
        )}
        {whatsappDigits && (
          <a
            href={`https://wa.me/${whatsappDigits}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F5C518]"
          >
            WhatsApp
          </a>
        )}
        {client.assigned_to && profileName(client.assigned_to) && (
          <span>
            {t.assignedTo}: {profileName(client.assigned_to)}
          </span>
        )}
        <span className="text-white/30">
          {t.added}: {client.created_at.slice(0, 10)}
        </span>
      </div>

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
                  <ConfirmForm
                    action={deleteClientServiceAction.bind(null, row.id, id)}
                    message={sv.confirmDelete}
                  >
                    <button className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
                      {sv.delete}
                    </button>
                  </ConfirmForm>
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

      {showAds && (
        <section className="bg-[#0E1A2E] border border-sky-500/20 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">{dict.partners.adsTitle}</h2>
            <Link
              href={`/manage/partners?client_id=${id}`}
              className="text-xs text-[#F5C518] hover:underline"
            >
              {dict.partners.recordExpense}
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">
                {dict.partners.adBudgetBilled}
              </div>
              <div className="text-lg font-bold">{money(adBudgetBilled, planCurrency)}</div>
            </div>
            <div>
              <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">
                {dict.partners.adBudgetPaid}
              </div>
              <div className="text-lg font-bold">{money(adBudgetPaid, planCurrency)}</div>
            </div>
            <div>
              <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">
                {dict.partners.adSpendForClient}
              </div>
              <div className="text-lg font-bold">{money(adSpend, planCurrency)}</div>
            </div>
            <div>
              <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">
                {dict.partners.unspentAdBudget}
              </div>
              <div
                className={`text-lg font-bold ${
                  adBudgetPaid - adSpend > 0.005 ? "text-sky-400" : ""
                }`}
              >
                {money(adBudgetPaid - adSpend, planCurrency)}
              </div>
            </div>
          </div>
          <p className="text-white/30 text-[11px] mt-3">{dict.partners.adsHint}</p>
        </section>
      )}

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
          </div>
          <RecordPaymentForm
            dict={dict}
            action={boundCreateReceipt}
            openCharges={openCharges}
            currency={planCurrency}
            today={today}
            partners={partners || []}
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
                    {partnerName(r.received_by) && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                        {partnerName(r.received_by)}
                      </span>
                    )}
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
                    <ConfirmForm
                      action={deleteReceiptAction.bind(null, r.id, id)}
                      message={rc.confirmDelete}
                      className="ms-auto"
                    >
                      <button className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
                        {rc.delete}
                      </button>
                    </ConfirmForm>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
                    {p.is_ad_budget && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400">
                        {pay.adBudgetShort}
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
                      <ConfirmForm
                        action={deletePaymentAction.bind(null, p.id, id)}
                        message={pay.confirmDelete}
                      >
                        <button className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
                          {t.delete}
                        </button>
                      </ConfirmForm>
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
            <h2 className="font-semibold">{dict.quotations.title}</h2>
            <Link
              href={`/manage/quotations/new?client_id=${id}`}
              className="text-xs text-[#F5C518] hover:underline"
            >
              {dict.quotations.new}
            </Link>
          </div>
          {!quotations || quotations.length === 0 ? (
            <p className="text-white/40 text-sm">{dict.quotations.empty}</p>
          ) : (
            <ul className="space-y-3">
              {quotations.map((q) => (
                <li
                  key={q.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0"
                >
                  <Link
                    href={`/manage/quotations/${q.id}`}
                    className="font-medium hover:text-[#F5C518]"
                  >
                    {q.quote_number || q.title || dict.quotations.title}
                  </Link>
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full ${
                      quotationStatusClasses[q.status]
                    }`}
                  >
                    {dict.quotations.statusLabels[q.status]}
                  </span>
                  <span className="text-white/40 text-xs">{q.issue_date}</span>
                  <span className="ms-auto text-xs text-white/60">
                    {money(q.total, q.currency)}
                    {Number(q.monthly_total) > 0 && (
                      <span className="text-[#F5C518]">
                        {" "}
                        + {money(q.monthly_total, q.currency)}
                        {bl.perMonth}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <h2 className="font-semibold mb-4">{nt.title}</h2>
          <AddNoteForm dict={dict} action={boundAddNote} />
          {!notes || notes.length === 0 ? (
            <p className="text-white/40 text-sm">{nt.empty}</p>
          ) : (
            <ul className="space-y-3">
              {notes.map((n) => (
                <li
                  key={n.id}
                  className={`text-sm border-b border-white/5 pb-3 last:border-0 last:pb-0 ${
                    n.pinned ? "bg-[#F5C518]/[0.04] -mx-2 px-2 rounded-lg" : ""
                  }`}
                >
                  <p className="whitespace-pre-wrap text-white/80">{n.body}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-white/40">
                    {n.pinned && <span className="text-[#F5C518]">📌</span>}
                    {profileName(n.created_by) && <span>{profileName(n.created_by)}</span>}
                    <span>{dateTime(n.created_at)}</span>
                    <span className="flex gap-1 ms-auto">
                      <form action={setClientNotePinnedAction.bind(null, n.id, id, !n.pinned)}>
                        <button className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10">
                          {n.pinned ? nt.unpin : nt.pin}
                        </button>
                      </form>
                      <ConfirmForm
                        action={deleteClientNoteAction.bind(null, n.id, id)}
                        message={nt.confirmDelete}
                      >
                        <button className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
                          {nt.delete}
                        </button>
                      </ConfirmForm>
                    </span>
                  </div>
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

      <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
        <h2 className="font-semibold mb-4">{act.title}</h2>
        {!activity || activity.length === 0 ? (
          <p className="text-white/40 text-sm">{act.empty}</p>
        ) : (
          <ul className="space-y-0">
            {activity.map((a, i) => (
              <li key={a.id} className="flex gap-3 text-sm">
                <span className="flex flex-col items-center">
                  <span className="w-2 h-2 rounded-full bg-[#F5C518]/60 mt-1.5 shrink-0" />
                  {i < activity.length - 1 && <span className="w-px flex-1 bg-white/10" />}
                </span>
                <span className="pb-4 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-medium">
                    {(act.kindLabels as Record<string, string>)[a.kind] || a.kind}
                  </span>
                  {activityDetail(a) && (
                    <span className="text-white/60 text-xs">{activityDetail(a)}</span>
                  )}
                  <span className="text-white/30 text-xs">
                    {dateTime(a.created_at)}
                    {profileName(a.actor) ? ` · ${profileName(a.actor)}` : ""}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
