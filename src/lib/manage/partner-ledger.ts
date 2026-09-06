// The partner reconciliation, in one place so the Partners page and the
// statement PDF can never disagree on who owes whom.
//
//   business net cash N = Σ receipts − Σ expenses
//   partner holding   H = receipts into their account − expenses they paid
//                         − transfers out + transfers in
//   partner balance     = H − N × share
//
// For a two-partner business the first partner's balance IS the number: it is
// exactly what they owe the second partner (negative → the other way round).
// Each ledger line carries its own effect on that number, and a running
// balance, so the statement reads like a bank statement.

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, PartnerPosition } from "@/types/manage";
import type { manageDict } from "./dict";

type Dict = (typeof manageDict)[keyof typeof manageDict];

export type LedgerEntry = {
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
  /** "A owes B" after this entry, chronologically. */
  balanceAfter: number;
  clientId: string | null;
};

export type PartnerWithBalance = PartnerPosition & {
  holding: number;
  fairShare: number;
  balance: number;
};

export type PartnerLedger = {
  positions: PartnerWithBalance[];
  /** Set only when exactly two active partners exist. */
  pair: { A: PartnerWithBalance; B: PartnerWithBalance } | null;
  pairBalance: number;
  totals: { received: number; adBudgetReceived: number; expenses: number; adSpend: number };
  netCash: number;
  profit: number;
  unspentAdBudget: number;
  /** Oldest first, with running balance. */
  entries: LedgerEntry[];
  clients: { id: string; name: string }[];
};

export async function loadPartnerLedger(
  supabase: SupabaseClient<Database>,
  dict: Dict
): Promise<PartnerLedger> {
  const t = dict.partners;

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
      .order("received_at")
      .order("created_at"),
    supabase.from("expenses").select("*").order("spent_at").order("created_at"),
    supabase.from("partner_transfers").select("*").order("transferred_at").order("created_at"),
    supabase.from("clients").select("id, name").order("name"),
  ]);

  const partners: PartnerPosition[] = positions || [];
  const clientName = new Map((clients || []).map((c) => [c.id, c.name]));
  const partnerName = (id: string | null) =>
    partners.find((p) => p.partner_id === id)?.name || "—";
  const share = (id: string | null) =>
    Number(partners.find((p) => p.partner_id === id)?.share_percent ?? 0) / 100;

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

  const withBalance: PartnerWithBalance[] = partners.map((p) => {
    const holding =
      Number(p.received) - Number(p.expenses_paid) - Number(p.transfers_out) + Number(p.transfers_in);
    const fairShare = netCash * (Number(p.share_percent) / 100);
    return { ...p, holding, fairShare, balance: holding - fairShare };
  });

  const pair =
    withBalance.length === 2 ? { A: withBalance[0], B: withBalance[1] } : null;
  const pairBalance = pair ? pair.A.balance : 0;

  // Receipts into A push "A owes B" up by B's share; expenses A paid pull it
  // down by B's share; A→B transfers pull it down one-for-one. Mirror for B.
  const effectOf = (direction: "in" | "out", partnerId: string | null, amount: number) => {
    if (!pair) return 0;
    const sign = direction === "in" ? 1 : -1;
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

  const raw: Omit<LedgerEntry, "balanceAfter">[] = [
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
    })),
  ].sort((a, b) => (a.date + a.createdAt).localeCompare(b.date + b.createdAt));

  let running = 0;
  const entries: LedgerEntry[] = raw.map((e) => {
    running += e.effect;
    return { ...e, balanceAfter: running };
  });

  return {
    positions: withBalance,
    pair,
    pairBalance,
    totals,
    netCash,
    profit,
    unspentAdBudget,
    entries,
    clients: clients || [],
  };
}
