"use client";

import { useActionState, useEffect, useRef } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { expenseCategoryValues } from "@/lib/manage/schemas";
import type { getDict } from "@/lib/manage/lang";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

const inputClass =
  "w-full bg-field border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold";
const labelClass = "block text-ink/50 text-xs font-medium mb-1.5";

export default function ExpenseForm({
  dict,
  action,
  partners,
  clients,
  today,
  defaultClientId,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  partners: { id: string; name: string; is_default_account: boolean }[];
  clients: { id: string; name: string }[];
  today: string;
  defaultClientId?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const t = dict.partners;
  const field = (name: string) => state.fieldErrors?.[name];

  useEffect(() => {
    if (state !== initialState && !state.error) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.paidBy} *</label>
          <select
            name="paid_by"
            defaultValue={partners.find((p) => p.is_default_account)?.id || partners[0]?.id}
            className={inputClass}
          >
            {partners.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          {field("paid_by") && <p className="text-red-600 text-xs mt-1">{field("paid_by")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.category}</label>
          <select
            name="category"
            defaultValue={defaultClientId ? "ad_spend" : "other"}
            className={inputClass}
          >
            {expenseCategoryValues.map((c) => (
              <option key={c} value={c}>
                {t.categories[c]}
              </option>
            ))}
          </select>
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
          {field("amount") && <p className="text-red-600 text-xs mt-1">{field("amount")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.date} *</label>
          <input name="spent_at" type="date" required defaultValue={today} className={inputClass} />
          {field("spent_at") && <p className="text-red-600 text-xs mt-1">{field("spent_at")}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.client}</label>
        <select name="client_id" defaultValue={defaultClientId || ""} className={inputClass}>
          <option value="">{t.noClient}</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>{t.description}</label>
        <input name="description" className={inputClass} />
      </div>
      <input type="hidden" name="currency" value="SAR" />

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
