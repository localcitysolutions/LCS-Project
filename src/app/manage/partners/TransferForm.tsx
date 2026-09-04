"use client";

import { useActionState, useEffect, useRef } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { transferKindValues } from "@/lib/manage/schemas";
import type { getDict } from "@/lib/manage/lang";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

const inputClass =
  "w-full bg-[#0A1524] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5C518]/40";
const labelClass = "block text-white/50 text-xs font-medium mb-1.5";

export default function TransferForm({
  dict,
  action,
  partners,
  today,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  partners: { id: string; name: string; is_default_account: boolean }[];
  today: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const t = dict.partners;
  const field = (name: string) => state.fieldErrors?.[name];

  useEffect(() => {
    if (state !== initialState && !state.error) formRef.current?.reset();
  }, [state]);

  // The usual direction is the default-account holder paying the other
  // partner their share, so pre-select that.
  const defaultFrom = partners.find((p) => p.is_default_account)?.id || partners[0]?.id;
  const defaultTo = partners.find((p) => p.id !== defaultFrom)?.id || partners[0]?.id;

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.from} *</label>
          <select name="from_partner" defaultValue={defaultFrom} className={inputClass}>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t.to} *</label>
          <select name="to_partner" defaultValue={defaultTo} className={inputClass}>
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {field("to_partner") && (
            <p className="text-red-400 text-xs mt-1">{field("to_partner")}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.amount} *</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            required
            placeholder="0.00"
            className={inputClass}
          />
          {field("amount") && <p className="text-red-400 text-xs mt-1">{field("amount")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.date} *</label>
          <input
            name="transferred_at"
            type="date"
            required
            defaultValue={today}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.transferKind}</label>
          <select name="kind" defaultValue="settlement" className={inputClass}>
            {transferKindValues.map((k) => (
              <option key={k} value={k}>
                {t.transferKinds[k]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>{t.description}</label>
          <input name="note" className={inputClass} />
        </div>
      </div>
      <input type="hidden" name="currency" value="SAR" />

      {state.error && <p className="text-red-400 text-sm">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-5 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all disabled:opacity-50"
      >
        {pending ? dict.common.loading : t.save}
      </button>
    </form>
  );
}
