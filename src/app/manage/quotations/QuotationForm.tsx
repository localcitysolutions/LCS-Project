"use client";

import { useActionState, useMemo, useState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { paymentKindValues } from "@/lib/manage/schemas";
import { money } from "@/lib/manage/money";
import type { getDict } from "@/lib/manage/lang";
import type { PaymentKind, Quotation, QuotationItem } from "@/types/manage";

type Dict = ReturnType<typeof getDict>;

type Row = {
  key: string;
  description: string;
  kind: PaymentKind;
  quantity: string;
  unit_price: string;
};

const initialState: ActionResult = {};

const inputClass =
  "w-full bg-[#0A1524] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5C518]/40";
const labelClass = "block text-white/50 text-xs font-medium mb-1.5";

let keySeed = 0;
const nextKey = () => `row-${keySeed++}`;

function blankRow(): Row {
  return { key: nextKey(), description: "", kind: "one_off", quantity: "1", unit_price: "" };
}

export default function QuotationForm({
  dict,
  action,
  clients,
  quotation,
  items,
  today,
  defaultValidUntil,
  defaultClientId,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  clients: { id: string; name: string; company: string | null }[];
  quotation?: Quotation;
  items?: QuotationItem[];
  today: string;
  defaultValidUntil: string;
  defaultClientId?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = dict.quotations;
  const field = (name: string) => state.fieldErrors?.[name];

  const [rows, setRows] = useState<Row[]>(() =>
    items?.length
      ? items.map((i) => ({
          key: nextKey(),
          description: i.description,
          kind: i.kind,
          quantity: String(i.quantity),
          unit_price: String(i.unit_price),
        }))
      : [blankRow()]
  );
  const [vat, setVat] = useState(quotation?.vat_enabled ?? false);
  const [discount, setDiscount] = useState(String(quotation?.discount ?? 0));
  const [currency, setCurrency] = useState(quotation?.currency || "SAR");

  const update = (key: string, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  // Mirrors the database's own arithmetic so the figures on screen match the
  // ones that will be stored, before anything is saved.
  const totals = useMemo(() => {
    const lineTotal = (r: Row) => (Number(r.quantity) || 0) * (Number(r.unit_price) || 0);
    const oneOff = rows.filter((r) => r.kind !== "monthly").reduce((s, r) => s + lineTotal(r), 0);
    const monthly = rows.filter((r) => r.kind === "monthly").reduce((s, r) => s + lineTotal(r), 0);
    const disc = Math.min(Number(discount) || 0, oneOff);
    const net = Math.max(oneOff - disc, 0);
    const vatAmount = vat ? Math.round(net * 15) / 100 : 0;
    return { oneOff, monthly, disc, net, vatAmount, total: net + vatAmount, lineTotal };
  }, [rows, discount, vat]);

  const payload = JSON.stringify(
    rows.map((r) => ({
      description: r.description,
      kind: r.kind,
      quantity: Number(r.quantity) || 0,
      unit_price: Number(r.unit_price) || 0,
    }))
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="items" value={payload} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.client} *</label>
          <select
            name="client_id"
            defaultValue={quotation?.client_id || defaultClientId || ""}
            required
            className={inputClass}
          >
            <option value="" disabled>
              {t.client}
            </option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.company ? `${c.company} — ${c.name}` : c.name}
              </option>
            ))}
          </select>
          {field("client_id") && <p className="text-red-400 text-xs mt-1">{field("client_id")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.quoteTitle}</label>
          <input
            name="title"
            defaultValue={quotation?.title || ""}
            placeholder="Digital growth package"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className={labelClass}>{t.issueDate} *</label>
          <input
            name="issue_date"
            type="date"
            required
            defaultValue={quotation?.issue_date || today}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.validUntil}</label>
          <input
            name="valid_until"
            type="date"
            defaultValue={quotation?.valid_until || defaultValidUntil}
            className={inputClass}
          />
          {field("valid_until") && (
            <p className="text-red-400 text-xs mt-1">{field("valid_until")}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>{t.currency}</label>
          <input
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.discount}</label>
          <input
            name="discount"
            type="number"
            step="0.01"
            min="0"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className={inputClass}
          />
          {field("discount") && <p className="text-red-400 text-xs mt-1">{field("discount")}</p>}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-white/70">
        <input
          type="checkbox"
          name="vat_enabled"
          checked={vat}
          onChange={(e) => setVat(e.target.checked)}
          className="accent-[#F5C518]"
        />
        {t.vat}
      </label>

      {/* ── Line items ─────────────────────────────────────────────── */}
      <div className="bg-[#0E1A2E] border border-white/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">{t.items}</h2>
          <button
            type="button"
            onClick={() => setRows((prev) => [...prev, blankRow()])}
            className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15"
          >
            + {t.addItem}
          </button>
        </div>

        <div className="hidden md:grid grid-cols-12 gap-2 text-[11px] text-white/40 px-1 mb-1">
          <div className="col-span-5">{t.description}</div>
          <div className="col-span-2">{t.kind}</div>
          <div className="col-span-1 text-right">{t.quantity}</div>
          <div className="col-span-2 text-right">{t.unitPrice}</div>
          <div className="col-span-2 text-right">{t.lineTotal}</div>
        </div>

        <div className="space-y-2">
          {rows.map((row) => (
            <div key={row.key} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
              <input
                value={row.description}
                onChange={(e) => update(row.key, { description: e.target.value })}
                placeholder="GMB profile creation & verification"
                className={`${inputClass} md:col-span-5`}
              />
              <select
                value={row.kind}
                onChange={(e) => update(row.key, { kind: e.target.value as PaymentKind })}
                className={`${inputClass} md:col-span-2`}
              >
                {paymentKindValues.map((k) => (
                  <option key={k} value={k}>
                    {t.kindLabels[k]}
                  </option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={row.quantity}
                onChange={(e) => update(row.key, { quantity: e.target.value })}
                className={`${inputClass} md:col-span-1 text-right`}
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={row.unit_price}
                onChange={(e) => update(row.key, { unit_price: e.target.value })}
                placeholder="0.00"
                className={`${inputClass} md:col-span-2 text-right`}
              />
              <div className="md:col-span-2 flex items-center justify-end gap-2">
                <span className="text-sm tabular-nums">
                  {money(totals.lineTotal(row), currency)}
                </span>
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setRows((prev) => prev.filter((r) => r.key !== row.key))}
                    className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    aria-label={t.removeItem}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {field("items") && <p className="text-red-400 text-xs mt-2">{field("items")}</p>}

        {/* ── Live totals ──────────────────────────────────────────── */}
        <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
          <div className="w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between text-white/60">
              <span>{t.subtotal}</span>
              <span>{money(totals.oneOff, currency)}</span>
            </div>
            {totals.disc > 0 && (
              <div className="flex justify-between text-white/60">
                <span>{t.discount}</span>
                <span>− {money(totals.disc, currency)}</span>
              </div>
            )}
            {vat && (
              <div className="flex justify-between text-white/60">
                <span>{t.vatAmount}</span>
                <span>{money(totals.vatAmount, currency)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-base pt-1 border-t border-white/10">
              <span>{t.total}</span>
              <span className="text-[#F5C518]">{money(totals.total, currency)}</span>
            </div>
            {totals.monthly > 0 && (
              <>
                <div className="flex justify-between pt-2">
                  <span className="text-white/60">{t.monthlyTotal}</span>
                  <span className="font-semibold">{money(totals.monthly, currency)}</span>
                </div>
                <p className="text-white/30 text-[11px]">{t.monthlyHint}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.notes}</label>
          <textarea
            name="notes"
            rows={3}
            defaultValue={quotation?.notes || ""}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label className={labelClass}>{t.terms}</label>
          <textarea
            name="terms"
            rows={3}
            defaultValue={quotation?.terms || ""}
            placeholder="50% advance, balance on delivery."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {state.error && <p className="text-red-400 text-sm">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-2.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all disabled:opacity-50"
      >
        {pending ? dict.common.loading : t.save}
      </button>
    </form>
  );
}
