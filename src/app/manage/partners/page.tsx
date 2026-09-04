import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { money, riyadhToday } from "@/lib/manage/money";
import ConfirmForm from "../ConfirmForm";
import ExpenseForm from "./ExpenseForm";
import TransferForm from "./TransferForm";
import PartnerSettingsForm from "./PartnerSettingsForm";
import {
  addExpenseAction,
  deleteExpenseAction,
  addTransferAction,
  deleteTransferAction,
  savePartnersAction,
} from "./actions";
import type { PartnerPosition } from "@/types/manage";

export const dynamic = "force-dynamic";

const LEDGER_LIMIT = 150;

type LedgerEntry = {
  id: string;
  kind: "receipt" | "expense" | "transfer";
  date: string;
  createdAt: string;
  title: string;
  detail: string;
  amount: number;
  currency: string;
  /** Change to "A owes B" caused by this entry; positive = A owes more. */
  effect: number;
  clientId: string | null;
  deleteAction?: () => Promise<void>;
};

export default async function PartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ client_id?: string }>;
}) {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const t = dict.partners;
  const { client_id: defaultClientId } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    : { data: null };

  if (profile?.role !== "admin") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-amber-400/80 text-sm">{t.adminOnly}</p>
      </div>
    );
  }

  const [
    { data: positions },
    { data: receipts },
    { data: expenses },
    { data: transfers },
    { data: clients },
  ] = await Promise.all([
    supabase.from("partner_positions").select("*").eq("active", true).order("sort_order"),
    supabase
      .from("payment_receipts")
      .select("id, client_id, amount, currency, received_at, method, reference, received_by, created_at")
      .order("received_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(LEDGER_LIMIT),
    supabase
      .from("expenses")
      .select("*")
      .order("spent_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(LEDGER_LIMIT),
    supabase
      .from("partner_transfers")
      .select("*")
      .order("transferred_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(LEDGER_LIMIT),
    supabase.from("clients").select("id, name").order("name"),
  ]);

  const partners: PartnerPosition[] = positions || [];
  const clientName = new Map((clients || []).map((c) => [c.id, c.name]));
  const partnerName = (id: string | null) =>
    partners.find((p) => p.partner_id === id)?.name || "—";
  const share = (id: string | null) =>
    Number(partners.find((p) => p.partner_id === id)?.share_percent ?? 0) / 100;

  // ── Reconciliation ────────────────────────────────────────────────────────
  const totals = partners.reduce(
    (acc, p) => ({
      received: acc.received + Number(p.received),
      adBudgetReceived: acc.adBudgetReceived + Number(p.ad_budget_received),
      expenses: acc.expenses + Number(p.expenses_paid),
      adSpend: acc.adSpend + Number(p.ad_spend_paid),
    }),
    { received: 0, adBudgetReceived: 0, expenses: 0, adSpend: 0 }
  );
  const netCash = totals.received - totals.expenses;
  const profit = totals.received - totals.adBudgetReceived - (totals.expenses - totals.adSpend);
  const unspentAdBudget = totals.adBudgetReceived - totals.adSpend;

  const positionsWithBalance = partners.map((p) => {
    const holding =
      Number(p.received) - Number(p.expenses_paid) - Number(p.transfers_out) + Number(p.transfers_in);
    const fairShare = netCash * (Number(p.share_percent) / 100);
    return { ...p, holding, fairShare, balance: holding - fairShare };
  });

  // The headline only makes sense for a two-partner business: A's surplus over
  // their fair share is exactly what they owe B.
  const [A, B] = positionsWithBalance;
  const pair = A && B && positionsWithBalance.length === 2 ? { A, B } : null;
  const pairBalance = pair ? pair.A.balance : 0;

  // ── Unified ledger ────────────────────────────────────────────────────────
  // Each entry's effect on "A owes B": receipts into A's account push it up by
  // B's share; expenses A paid pull it down by B's share; transfers A→B pull it
  // down one-for-one. Mirror for B. Summing every effect reproduces pairBalance.
  const effectOf = (kind: "in" | "out", partnerId: string | null, amount: number) => {
    if (!pair) return 0;
    const sign = kind === "in" ? 1 : -1;
    if (partnerId === pair.A.partner_id) return sign * amount * share(pair.B.partner_id);
    if (partnerId === pair.B.partner_id) return -sign * amount * share(pair.A.partner_id);
    return 0;
  };
  const transferEffect = (from: string, to: string, amount: number) => {
    if (!pair) return 0;
    if (from === pair.A.partner_id && to === pair.B.partner_id) return -amount;
    if (from === pair.B.partner_id && to === pair.A.partner_id) return amount;
    return 0;
  };

  const entries: LedgerEntry[] = [
    ...(receipts || []).map((r) => ({
      id: r.id,
      kind: "receipt" as const,
      date: r.received_at,
      createdAt: r.created_at,
      title: t.entryReceipt,
      detail: `${clientName.get(r.client_id) || "—"} · ${t.into} ${partnerName(r.received_by)} · ${
        dict.receipts.methodLabels[r.method]
      }${r.reference ? ` #${r.reference}` : ""}`,
      amount: Number(r.amount),
      currency: r.currency,
      effect: effectOf("in", r.received_by, Number(r.amount)),
      clientId: r.client_id,
    })),
    ...(expenses || []).map((e) => ({
      id: e.id,
      kind: "expense" as const,
      date: e.spent_at,
      createdAt: e.created_at,
      title: t.entryExpense,
      detail: `${t.categories[e.category]} · ${t.paidBy} ${partnerName(e.paid_by)}${
        e.client_id ? ` · ${clientName.get(e.client_id) || "—"}` : ""
      }${e.description ? ` · ${e.description}` : ""}`,
      amount: Number(e.amount),
      currency: e.currency,
      effect: effectOf("out", e.paid_by, Number(e.amount)),
      clientId: e.client_id,
      deleteAction: deleteExpenseAction.bind(null, e.id, e.client_id),
    })),
    ...(transfers || []).map((tr) => ({
      id: tr.id,
      kind: "transfer" as const,
      date: tr.transferred_at,
      createdAt: tr.created_at,
      title: t.entryTransfer,
      detail: `${partnerName(tr.from_partner)} → ${partnerName(tr.to_partner)} · ${
        t.transferKinds[tr.kind]
      }${tr.note ? ` · ${tr.note}` : ""}`,
      amount: Number(tr.amount),
      currency: tr.currency,
      effect: transferEffect(tr.from_partner, tr.to_partner, Number(tr.amount)),
      clientId: null,
      deleteAction: deleteTransferAction.bind(null, tr.id),
    })),
  ]
    .sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt))
    .slice(0, LEDGER_LIMIT);

  const partnerOptions = partners.map((p) => ({
    id: p.partner_id,
    name: p.name,
    is_default_account: p.is_default_account,
    share_percent: Number(p.share_percent),
  }));
  const today = riyadhToday();

  const kindClasses: Record<LedgerEntry["kind"], string> = {
    receipt: "bg-green-500/15 text-green-400",
    expense: "bg-red-500/15 text-red-400",
    transfer: "bg-[#F5C518]/15 text-[#F5C518]",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
      <p className="text-white/50 text-sm mb-6 max-w-3xl">{t.intro}</p>

      {/* Headline: who owes whom */}
      <section className="bg-[#0E1A2E] border border-[#F5C518]/30 rounded-xl p-6 mb-6">
        {pair ? (
          <>
            {Math.abs(pairBalance) < 0.005 ? (
              <div className="text-xl font-bold text-green-400">{t.settled}</div>
            ) : (
              <div className="text-2xl font-bold">
                <span className="text-[#F5C518]">
                  {pairBalance > 0 ? pair.A.name : pair.B.name}
                </span>{" "}
                <span className="text-white/60 text-lg font-medium">{t.owes}</span>{" "}
                <span className="text-[#F5C518]">
                  {pairBalance > 0 ? pair.B.name : pair.A.name}
                </span>{" "}
                <span className="text-red-400">{money(Math.abs(pairBalance))}</span>
              </div>
            )}
            <p className="text-white/40 text-xs mt-2 max-w-2xl">{t.balanceHint}</p>
          </>
        ) : (
          <p className="text-white/50 text-sm">{t.balanceHint}</p>
        )}
      </section>

      {/* Per-partner positions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {positionsWithBalance.map((p) => (
          <section key={p.partner_id} className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">{p.name}</h2>
              <span className="text-xs text-white/40">
                {t.share} {Number(p.share_percent)}%
                {p.is_default_account && (
                  <span className="ms-2 px-2 py-0.5 rounded-full bg-[#F5C518]/15 text-[#F5C518]">
                    {t.defaultAccount}
                  </span>
                )}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-white/40">{t.received}</dt>
              <dd className="text-end">{money(p.received)}</dd>
              <dt className="text-white/40">{t.expensesPaid}</dt>
              <dd className="text-end">{money(p.expenses_paid)}</dd>
              <dt className="text-white/40">{t.transfersOut}</dt>
              <dd className="text-end">{money(p.transfers_out)}</dd>
              <dt className="text-white/40">{t.transfersIn}</dt>
              <dd className="text-end">{money(p.transfers_in)}</dd>
              <dt className="text-white/60 border-t border-white/10 pt-2">{t.holding}</dt>
              <dd className="text-end border-t border-white/10 pt-2 font-medium">{money(p.holding)}</dd>
              <dt className="text-white/60">{t.fairShare}</dt>
              <dd className="text-end font-medium">{money(p.fairShare)}</dd>
              <dt className="text-white/80 font-semibold">{t.balance}</dt>
              <dd
                className={`text-end font-bold ${
                  p.balance > 0.005 ? "text-red-400" : p.balance < -0.005 ? "text-green-400" : ""
                }`}
              >
                {p.balance > 0 ? "+" : ""}
                {money(p.balance)}
              </dd>
            </dl>
          </section>
        ))}
      </div>

      {/* Business totals */}
      <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5 mb-6">
        <h2 className="font-semibold mb-4">{t.business}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: t.totalReceived, value: totals.received },
            { label: t.adBudgetReceived, value: totals.adBudgetReceived, muted: true },
            { label: t.totalExpenses, value: totals.expenses },
            { label: t.adSpend, value: totals.adSpend, muted: true },
            { label: t.profit, value: profit, accent: true },
            { label: t.unspentAdBudget, value: unspentAdBudget, muted: true },
            { label: t.netCash, value: netCash },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-white/40 text-[11px] uppercase tracking-wide mb-1">{s.label}</div>
              <div
                className={`text-lg font-bold ${
                  s.accent ? "text-[#F5C518]" : s.muted ? "text-white/70" : ""
                }`}
              >
                {money(s.value)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <h2 className="font-semibold mb-4">{t.recordTransfer}</h2>
          <TransferForm dict={dict} action={addTransferAction} partners={partnerOptions} today={today} />
        </section>
        <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
          <h2 className="font-semibold mb-4">{t.recordExpense}</h2>
          <ExpenseForm
            dict={dict}
            action={addExpenseAction}
            partners={partnerOptions}
            clients={clients || []}
            today={today}
            defaultClientId={defaultClientId}
          />
        </section>
      </div>

      {/* Ledger */}
      <section className="bg-[#0E1A2E] border border-white/10 rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between p-5 pb-3">
          <h2 className="font-semibold">{t.ledger}</h2>
          {pair && (
            <span className="text-xs text-white/40">
              {t.effect}: {pair.A.name} {t.owes} {pair.B.name}
            </span>
          )}
        </div>
        {entries.length === 0 ? (
          <p className="px-5 pb-5 text-white/40 text-sm">{t.empty}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                {entries.map((e) => (
                  <tr key={`${e.kind}-${e.id}`} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="p-4 whitespace-nowrap text-white/50 text-xs">{e.date}</td>
                    <td className="p-4">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full ${kindClasses[e.kind]}`}>
                        {e.title}
                      </span>
                      <div className="text-white/50 text-xs mt-1">
                        {e.clientId ? (
                          <Link href={`/manage/clients/${e.clientId}`} className="hover:text-[#F5C518]">
                            {e.detail}
                          </Link>
                        ) : (
                          e.detail
                        )}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap font-medium">{money(e.amount, e.currency)}</td>
                    <td className="p-4 whitespace-nowrap text-end">
                      {pair && Math.abs(e.effect) > 0.005 && (
                        <span className={e.effect > 0 ? "text-red-400" : "text-green-400"}>
                          {e.effect > 0 ? "+" : "−"}
                          {money(Math.abs(e.effect), e.currency)}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-end">
                      {e.deleteAction && (
                        <ConfirmForm action={e.deleteAction} message={t.confirmDelete}>
                          <button className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20">
                            {t.delete}
                          </button>
                        </ConfirmForm>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Settings */}
      <section className="bg-[#0E1A2E] border border-white/10 rounded-xl p-5">
        <h2 className="font-semibold mb-1">{t.settings}</h2>
        <p className="text-white/40 text-xs mb-4">{t.settingsHint}</p>
        <PartnerSettingsForm dict={dict} action={savePartnersAction} partners={partnerOptions} />
      </section>
    </div>
  );
}
