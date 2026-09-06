/* eslint-disable @next/next/no-html-link-for-pages --
 * The statement links point at a route handler that returns a PDF attachment,
 * not a page. next/link would prefetch it and then try to client-side navigate
 * into a binary response instead of downloading it. */
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { money, riyadhToday } from "@/lib/manage/money";
import { loadPartnerLedger, type LedgerEntry } from "@/lib/manage/partner-ledger";
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

export const dynamic = "force-dynamic";

/** How many ledger lines the page shows; the PDF statement has them all. */
const PAGE_ROWS = 60;

const kindClasses: Record<LedgerEntry["kind"], string> = {
  receipt: "bg-green-500/15 text-green-700",
  expense: "bg-red-500/15 text-red-600",
  transfer: "bg-[#F5C518]/15 text-gold-ink",
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
        <p className="text-amber-700/80 text-sm">{t.adminOnly}</p>
      </div>
    );
  }

  const ledger = await loadPartnerLedger(supabase, dict);
  const { pair, pairBalance, totals, netCash, profit, unspentAdBudget } = ledger;
  // Newest first on screen; the statement PDF keeps chronological order.
  const recent = [...ledger.entries].reverse().slice(0, PAGE_ROWS);

  const partnerOptions = ledger.positions.map((p) => ({
    id: p.partner_id,
    name: p.name,
    is_default_account: p.is_default_account,
    share_percent: Number(p.share_percent),
  }));
  const today = riyadhToday();

  const deleteFor = (e: LedgerEntry) =>
    e.kind === "expense"
      ? deleteExpenseAction.bind(null, e.id, e.clientId)
      : e.kind === "transfer"
        ? deleteTransferAction.bind(null, e.id)
        : null;

  const signed = (v: number) => (
    <span className={v > 0.005 ? "text-red-600" : v < -0.005 ? "text-green-700" : "text-ink/40"}>
      {v > 0.005 ? "+" : v < -0.005 ? "−" : ""}
      {money(Math.abs(v))}
    </span>
  );

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        {pair && (
          /* Route handler returning a PDF — plain <a> so the browser downloads it. */
          <a
            href="/manage/partners/statement"
            className="px-4 py-2 rounded-full bg-ink/8 hover:bg-ink/12 text-sm font-medium"
          >
            {dict.documents.statement} PDF
          </a>
        )}
      </div>
      <p className="text-ink/50 text-sm mb-6 max-w-3xl">{t.intro}</p>

      {/* Headline: who owes whom */}
      <section className="bg-panel border border-[#F5C518]/40 rounded-xl p-6 mb-6">
        {pair ? (
          <>
            {Math.abs(pairBalance) < 0.005 ? (
              <div className="text-xl font-bold text-green-700">{t.settled}</div>
            ) : (
              <div className="text-2xl font-bold">
                <span className="text-gold-ink">{pairBalance > 0 ? pair.A.name : pair.B.name}</span>{" "}
                <span className="text-ink/60 text-lg font-medium">{t.owes}</span>{" "}
                <span className="text-gold-ink">{pairBalance > 0 ? pair.B.name : pair.A.name}</span>{" "}
                <span className="text-red-600">{money(Math.abs(pairBalance))}</span>
              </div>
            )}
            <p className="text-ink/40 text-xs mt-2 max-w-2xl">{t.balanceHint}</p>
          </>
        ) : (
          <p className="text-ink/50 text-sm">{t.balanceHint}</p>
        )}
      </section>

      {/* Per-partner positions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {ledger.positions.map((p) => (
          <section key={p.partner_id} className="bg-panel border border-line rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">{p.name}</h2>
              <span className="text-xs text-ink/40">
                {t.share} {Number(p.share_percent)}%
                {p.is_default_account && (
                  <span className="ms-2 px-2 py-0.5 rounded-full bg-[#F5C518]/15 text-gold-ink">
                    {t.defaultAccount}
                  </span>
                )}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-ink/40">{t.received}</dt>
              <dd className="text-end">{money(p.received)}</dd>
              <dt className="text-ink/40">{t.expensesPaid}</dt>
              <dd className="text-end">{money(p.expenses_paid)}</dd>
              <dt className="text-ink/40">{t.transfersOut}</dt>
              <dd className="text-end">{money(p.transfers_out)}</dd>
              <dt className="text-ink/40">{t.transfersIn}</dt>
              <dd className="text-end">{money(p.transfers_in)}</dd>
              <dt className="text-ink/60 border-t border-line pt-2">{t.holding}</dt>
              <dd className="text-end border-t border-line pt-2 font-medium">{money(p.holding)}</dd>
              <dt className="text-ink/60">{t.fairShare}</dt>
              <dd className="text-end font-medium">{money(p.fairShare)}</dd>
              <dt className="text-ink/80 font-semibold">{t.balance}</dt>
              <dd className="text-end font-bold">{signed(p.balance)}</dd>
            </dl>
          </section>
        ))}
      </div>

      {/* Business totals */}
      <section className="bg-panel border border-line rounded-xl p-5 mb-6">
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
              <div className="text-ink/40 text-[11px] uppercase tracking-wide mb-1">{s.label}</div>
              <div
                className={`text-lg font-bold ${
                  s.accent ? "text-gold-ink" : s.muted ? "text-ink/70" : ""
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
        <section className="bg-panel border border-line rounded-xl p-5">
          <h2 className="font-semibold mb-4">{t.recordTransfer}</h2>
          <TransferForm dict={dict} action={addTransferAction} partners={partnerOptions} today={today} />
        </section>
        <section className="bg-panel border border-line rounded-xl p-5">
          <h2 className="font-semibold mb-4">{t.recordExpense}</h2>
          <ExpenseForm
            dict={dict}
            action={addExpenseAction}
            partners={partnerOptions}
            clients={ledger.clients}
            today={today}
            defaultClientId={defaultClientId}
          />
        </section>
      </div>

      {/* Account statement (ledger with running balance) */}
      <section className="bg-panel border border-line rounded-xl overflow-hidden mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 p-5 pb-3">
          <h2 className="font-semibold">
            {dict.documents.statement} · {t.ledger}
          </h2>
          {pair && (
            <span className="text-xs text-ink/40">
              {t.effect} / {t.balance}: {pair.A.name} {t.owes} {pair.B.name}
            </span>
          )}
        </div>
        {recent.length === 0 ? (
          <p className="px-5 pb-5 text-ink/40 text-sm">{t.empty}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-t border-line text-ink/40 text-xs">
                  <th className="p-3 ps-4 text-start font-medium">{t.date}</th>
                  <th className="p-3 text-start font-medium">{t.ledger}</th>
                  <th className="p-3 text-end font-medium">{t.amount}</th>
                  <th className="p-3 text-end font-medium">{t.effect}</th>
                  <th className="p-3 text-end font-medium">{t.balance}</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => {
                  const del = deleteFor(e);
                  return (
                    <tr key={`${e.kind}-${e.id}`} className="border-t border-line/60 hover:bg-ink/[0.03]">
                      <td className="p-3 ps-4 whitespace-nowrap text-ink/50 text-xs">{e.date}</td>
                      <td className="p-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${kindClasses[e.kind]}`}>
                          {e.title}
                        </span>
                        <div className="text-ink/50 text-xs mt-1">
                          {e.clientId ? (
                            <Link href={`/manage/clients/${e.clientId}`} className="hover:text-gold-ink">
                              {e.detail}
                            </Link>
                          ) : (
                            e.detail
                          )}
                        </div>
                      </td>
                      <td className="p-3 whitespace-nowrap text-end font-medium">
                        {money(e.amount, e.currency)}
                      </td>
                      <td className="p-3 whitespace-nowrap text-end">{pair && signed(e.effect)}</td>
                      <td className="p-3 whitespace-nowrap text-end font-semibold">
                        {pair && signed(e.balanceAfter)}
                      </td>
                      <td className="p-3 text-end">
                        {del && (
                          <ConfirmForm action={del} message={t.confirmDelete}>
                            <button className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-600 hover:bg-red-500/20">
                              {t.delete}
                            </button>
                          </ConfirmForm>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {ledger.entries.length > PAGE_ROWS && pair && (
          <p className="px-5 py-3 text-xs text-ink/40 border-t border-line/60">
            {recent.length} / {ledger.entries.length} ·{" "}
            <a href="/manage/partners/statement" className="text-gold-ink hover:underline">
              {dict.documents.statement} PDF
            </a>
          </p>
        )}
      </section>

      {/* Settings */}
      <section className="bg-panel border border-line rounded-xl p-5">
        <h2 className="font-semibold mb-1">{t.settings}</h2>
        <p className="text-ink/40 text-xs mb-4">{t.settingsHint}</p>
        <PartnerSettingsForm dict={dict} action={savePartnersAction} partners={partnerOptions} />
      </section>
    </div>
  );
}
