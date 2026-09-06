"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { paymentMethodValues } from "@/lib/manage/schemas";
import { money } from "@/lib/manage/money";
import type { getDict } from "@/lib/manage/lang";

type Dict = ReturnType<typeof getDict>;

export type OpenCharge = {
  id: string;
  label: string;
  balance: number;
  currency: string;
};

const initialState: ActionResult = {};

const inputClass =
  "w-full bg-field border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold";
const labelClass = "block text-ink/50 text-xs font-medium mb-1.5";

export default function RecordPaymentForm({
  dict,
  action,
  openCharges,
  currency,
  today,
  partners,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  openCharges: OpenCharge[];
  currency: string;
  today: string;
  /** Whose bank account can receive money. Empty list hides the picker. */
  partners: { id: string; name: string; is_default_account: boolean }[];
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = dict.receipts;
  const field = (name: string) => state.fieldErrors?.[name];

  return (
    <form action={formAction} className="space-y-3 mb-5 pb-5 border-b border-line">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.amount} *</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            required
            placeholder="500.00"
            className={inputClass}
          />
          {field("amount") && <p className="text-red-600 text-xs mt-1">{field("amount")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.receivedAt} *</label>
          <input
            name="received_at"
            type="date"
            required
            defaultValue={today}
            className={inputClass}
          />
          {field("received_at") && (
            <p className="text-red-600 text-xs mt-1">{field("received_at")}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.method}</label>
          <select name="method" defaultValue="bank" className={inputClass}>
            {paymentMethodValues.map((m) => (
              <option key={m} value={m}>
                {t.methodLabels[m]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{dict.payments.currency}</label>
          <input name="currency" defaultValue={currency} className={inputClass} />
        </div>
      </div>

      <div className={partners.length > 0 ? "grid grid-cols-2 gap-3" : ""}>
        <div>
          <label className={labelClass}>{t.applyTo}</label>
          <select name="apply_to" defaultValue="auto" className={inputClass}>
            <option value="auto">{t.applyAuto}</option>
            {openCharges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} — {money(c.balance, c.currency)}
              </option>
            ))}
            <option value="credit">{t.applyCredit}</option>
          </select>
        </div>
        {partners.length > 0 && (
          <div>
            <label className={labelClass}>{dict.partners.receivedIn}</label>
            <select
              name="received_by"
              defaultValue={partners.find((p) => p.is_default_account)?.id || partners[0].id}
              className={inputClass}
            >
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.reference}</label>
          <input name="reference" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t.notes}</label>
          <input name="notes" className={inputClass} />
        </div>
      </div>

      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-5 py-2 rounded-full bg-[#F5C518] text-ink font-bold text-sm hover:bg-[#F5C518]/90 transition-all disabled:opacity-50"
      >
        {pending ? dict.common.loading : t.save}
      </button>
    </form>
  );
}
