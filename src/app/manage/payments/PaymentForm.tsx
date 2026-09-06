"use client";

import { useActionState, useState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { paymentKindValues } from "@/lib/manage/schemas";
import { money } from "@/lib/manage/money";
import type { getDict } from "@/lib/manage/lang";
import type { Payment, PaymentKind } from "@/types/manage";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

export default function PaymentForm({
  dict,
  action,
  payment,
  clients,
  defaultClientId,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  payment?: Payment;
  clients: { id: string; name: string }[];
  defaultClientId?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = dict.payments;
  const field = (name: string) => state.fieldErrors?.[name];
  const inputClass =
    "w-full bg-panel border border-line rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-gold";

  // Kept in state purely so the live VAT/total preview and the month field can
  // react as you type — the real figures are always recomputed server-side.
  const [kind, setKind] = useState<PaymentKind>(payment?.kind || "one_off");
  const [amount, setAmount] = useState(String(payment?.amount ?? ""));
  const [vat, setVat] = useState(Number(payment?.vat_rate ?? 0) > 0);
  const [currency, setCurrency] = useState(payment?.currency || "SAR");

  const subtotal = Number(amount) || 0;
  const vatAmount = vat ? Math.round(subtotal * 15) / 100 : 0;

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div>
        <label className="block text-ink/60 text-xs font-medium mb-1.5">{t.client} *</label>
        <select
          name="client_id"
          defaultValue={payment?.client_id || defaultClientId || ""}
          required
          className={inputClass}
        >
          <option value="" disabled>
            {t.client}
          </option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {field("client_id") && <p className="text-red-600 text-xs mt-1">{field("client_id")}</p>}
      </div>
      <div>
        <label className="block text-ink/60 text-xs font-medium mb-1.5">{t.description}</label>
        <input name="description" defaultValue={payment?.description || ""} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-ink/60 text-xs font-medium mb-1.5">{t.amount} *</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className={inputClass}
          />
          {field("amount") && <p className="text-red-600 text-xs mt-1">{field("amount")}</p>}
        </div>
        <div>
          <label className="block text-ink/60 text-xs font-medium mb-1.5">{t.currency}</label>
          <input
            name="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          name="vat_enabled"
          checked={vat}
          onChange={(e) => setVat(e.target.checked)}
          className="accent-[#F5C518]"
        />
        {t.vat}
      </label>
      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          name="is_ad_budget"
          defaultChecked={payment?.is_ad_budget ?? false}
          className="accent-[#F5C518]"
        />
        {t.adBudget}
      </label>

      {vat && (
        <div className="rounded-lg bg-ink/[0.04] border border-line px-4 py-3 text-sm space-y-1">
          <div className="flex justify-between text-ink/60">
            <span>{t.subtotal}</span>
            <span>{money(subtotal, currency)}</span>
          </div>
          <div className="flex justify-between text-ink/60">
            <span>{t.vatAmount}</span>
            <span>{money(vatAmount, currency)}</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-line pt-1">
            <span>{t.total}</span>
            <span>{money(subtotal + vatAmount, currency)}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-ink/60 text-xs font-medium mb-1.5">{t.dueDate}</label>
          <input name="due_date" type="date" defaultValue={payment?.due_date || ""} className={inputClass} />
        </div>
        <div>
          <label className="block text-ink/60 text-xs font-medium mb-1.5">{t.kind}</label>
          <select
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value as PaymentKind)}
            className={inputClass}
          >
            {paymentKindValues.map((k) => (
              <option key={k} value={k}>
                {t.kindLabels[k]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {kind === "monthly" && (
        <div>
          <label className="block text-ink/60 text-xs font-medium mb-1.5">{t.period} *</label>
          <input
            name="period_month"
            type="month"
            defaultValue={payment?.period_month ? payment.period_month.slice(0, 7) : ""}
            className={inputClass}
          />
          <p className="text-ink/30 text-[11px] mt-1">{t.periodHint}</p>
          {field("period_month") && (
            <p className="text-red-600 text-xs mt-1">{field("period_month")}</p>
          )}
        </div>
      )}

      {payment && (
        <div className="rounded-lg bg-ink/[0.04] border border-line px-4 py-3 text-sm flex justify-between">
          <span className="text-ink/60">
            {t.received}: {money(payment.amount_paid, payment.currency)}
          </span>
          <span className="text-ink/60">
            {t.status}: {t.statusLabels[payment.status]}
          </span>
        </div>
      )}
      <div>
        <label className="block text-ink/60 text-xs font-medium mb-1.5">{t.invoiceNumber}</label>
        <input name="invoice_number" defaultValue={payment?.invoice_number || ""} className={inputClass} />
      </div>
      <div>
        <label className="block text-ink/60 text-xs font-medium mb-1.5">{dict.clients.notes}</label>
        <textarea
          name="notes"
          rows={3}
          defaultValue={payment?.notes || ""}
          className={`${inputClass} resize-none`}
        />
      </div>

      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-2.5 rounded-full bg-[#F5C518] text-ink font-bold text-sm hover:bg-[#F5C518]/90 transition-all disabled:opacity-50"
      >
        {pending ? dict.common.loading : t.save}
      </button>
    </form>
  );
}
