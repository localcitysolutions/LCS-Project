"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { serviceTypeValues, clientServiceStatusValues } from "@/lib/manage/schemas";
import type { getDict } from "@/lib/manage/lang";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

export default function AddServiceForm({
  dict,
  action,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = dict.clients;
  const s = dict.services;
  const inputClass =
    "w-full bg-[#0B1524] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5C518]/40";
  const labelClass = "block text-white/40 text-xs mb-1";

  return (
    <form action={formAction} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
      <div>
        <label className={labelClass}>{s.service}</label>
        <select name="service" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            {t.selectService}
          </option>
          {serviceTypeValues.map((v) => (
            <option key={v} value={v}>
              {t.serviceLabels[v]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>{s.status}</label>
        <select name="status" defaultValue="active" className={inputClass}>
          {clientServiceStatusValues.map((v) => (
            <option key={v} value={v}>
              {s.statusLabels[v]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>{s.startedAt}</label>
        <input name="started_at" type="date" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>{s.endedAt}</label>
        <input name="ended_at" type="date" className={inputClass} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>{s.notes}</label>
        <input name="notes" className={inputClass} />
      </div>
      {state.error && <p className="text-red-400 text-xs sm:col-span-2">{state.error}</p>}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="px-4 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-xs hover:bg-[#F5C518]/90 transition-all disabled:opacity-50"
        >
          {pending ? dict.common.loading : s.add}
        </button>
      </div>
    </form>
  );
}
