"use client";

import { useActionState, useState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { billingPlanStatusValues } from "@/lib/manage/schemas";
import type { getDict } from "@/lib/manage/lang";
import type { BillingPlan } from "@/types/manage";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

const inputClass =
  "w-full bg-[#0A1524] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5C518]/40";
const labelClass = "block text-white/50 text-xs font-medium mb-1.5";

export default function BillingPlanForm({
  dict,
  action,
  plan,
  today,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  plan?: BillingPlan | null;
  today: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = dict.billing;
  const field = (name: string) => state.fieldErrors?.[name];

  // Mirrored into state so the "already charged" hint can appear the moment a
  // setup fee is entered, without waiting for a round-trip.
  const [setupFee, setSetupFee] = useState(String(plan?.setup_fee ?? 0));

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.monthlyAmount}</label>
          <input
            name="monthly_amount"
            type="number"
            step="0.01"
            min="0"
            defaultValue={plan?.monthly_amount ?? ""}
            placeholder="500.00"
            className={inputClass}
          />
          {field("monthly_amount") && (
            <p className="text-red-400 text-xs mt-1">{field("monthly_amount")}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>{dict.payments.currency}</label>
          <input name="currency" defaultValue={plan?.currency || "SAR"} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t.adBudgetAmount}</label>
        <input
          name="ad_budget_amount"
          type="number"
          step="0.01"
          min="0"
          defaultValue={plan?.ad_budget_amount || ""}
          placeholder="0.00"
          className={inputClass}
        />
        <p className="text-white/30 text-[11px] mt-1">{t.adBudgetHint}</p>
        {field("ad_budget_amount") && (
          <p className="text-red-400 text-xs mt-1">{field("ad_budget_amount")}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.setupFee}</label>
          <input
            name="setup_fee"
            type="number"
            step="0.01"
            min="0"
            value={setupFee}
            onChange={(e) => setSetupFee(e.target.value)}
            placeholder="300.00"
            className={inputClass}
          />
          <p className="text-white/30 text-[11px] mt-1">{t.setupFeeHint}</p>
          {plan?.setup_fee_charged && Number(setupFee) > 0 && (
            <p className="text-amber-400/80 text-[11px] mt-1">{t.setupFeeCharged}</p>
          )}
          {field("setup_fee") && <p className="text-red-400 text-xs mt-1">{field("setup_fee")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.billingDay}</label>
          <input
            name="billing_day"
            type="number"
            min="1"
            max="28"
            defaultValue={plan?.billing_day ?? 1}
            className={inputClass}
          />
          <p className="text-white/30 text-[11px] mt-1">{t.billingDayHint}</p>
          {field("billing_day") && (
            <p className="text-red-400 text-xs mt-1">{field("billing_day")}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>{t.startDate} *</label>
          <input
            name="start_date"
            type="date"
            required
            defaultValue={plan?.start_date || today}
            className={inputClass}
          />
          {field("start_date") && (
            <p className="text-red-400 text-xs mt-1">{field("start_date")}</p>
          )}
        </div>
        <div>
          <label className={labelClass}>{t.endDate}</label>
          <input
            name="end_date"
            type="date"
            defaultValue={plan?.end_date || ""}
            className={inputClass}
          />
          {field("end_date") && <p className="text-red-400 text-xs mt-1">{field("end_date")}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 items-end">
        <div>
          <label className={labelClass}>{t.status}</label>
          <select name="status" defaultValue={plan?.status || "active"} className={inputClass}>
            {billingPlanStatusValues.map((s) => (
              <option key={s} value={s}>
                {t.statusLabels[s]}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-2 text-xs text-white/70 pb-2">
          <input
            type="checkbox"
            name="vat_enabled"
            defaultChecked={plan?.vat_enabled ?? false}
            className="accent-[#F5C518]"
          />
          {t.vatEnabled}
        </label>
      </div>

      <div>
        <label className={labelClass}>{dict.clients.notes}</label>
        <input name="notes" defaultValue={plan?.notes || ""} className={inputClass} />
      </div>

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
