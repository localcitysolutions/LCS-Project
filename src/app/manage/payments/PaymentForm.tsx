"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { paymentStatusValues } from "@/lib/manage/schemas";
import type { getDict } from "@/lib/manage/lang";
import type { Payment } from "@/types/manage";

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
    "w-full bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F5C518]/40";

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{t.client} *</label>
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
        {field("client_id") && <p className="text-red-400 text-xs mt-1">{field("client_id")}</p>}
      </div>
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{t.description}</label>
        <input name="description" defaultValue={payment?.description || ""} className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5">{t.amount} *</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            min="0"
            defaultValue={payment?.amount ?? ""}
            required
            className={inputClass}
          />
          {field("amount") && <p className="text-red-400 text-xs mt-1">{field("amount")}</p>}
        </div>
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5">{t.currency}</label>
          <input name="currency" defaultValue={payment?.currency || "SAR"} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5">{t.dueDate}</label>
          <input name="due_date" type="date" defaultValue={payment?.due_date || ""} className={inputClass} />
        </div>
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5">{t.status}</label>
          <select name="status" defaultValue={payment?.status || "unpaid"} className={inputClass}>
            {paymentStatusValues.map((s) => (
              <option key={s} value={s}>
                {t.statusLabels[s]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{t.invoiceNumber}</label>
        <input name="invoice_number" defaultValue={payment?.invoice_number || ""} className={inputClass} />
      </div>
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{dict.clients.notes}</label>
        <textarea
          name="notes"
          rows={3}
          defaultValue={payment?.notes || ""}
          className={`${inputClass} resize-none`}
        />
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
