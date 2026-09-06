"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import type { getDict } from "@/lib/manage/lang";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

const inputClass =
  "w-full bg-field border border-line rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold";

export default function PartnerSettingsForm({
  dict,
  action,
  partners,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  partners: { id: string; name: string; share_percent: number; is_default_account: boolean }[];
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = dict.partners;

  return (
    <form action={formAction} className="space-y-3">
      <div className="grid grid-cols-[1fr_100px_auto] gap-3 text-xs text-ink/40 px-1">
        <span>{t.name}</span>
        <span>{t.sharePercent}</span>
        <span>{t.defaultAccount}</span>
      </div>
      {partners.map((p) => (
        <div key={p.id} className="grid grid-cols-[1fr_100px_auto] gap-3 items-center">
          <input type="hidden" name="partner_id" value={p.id} />
          <input name={`name_${p.id}`} defaultValue={p.name} required className={inputClass} />
          <input
            name={`share_${p.id}`}
            type="number"
            step="0.01"
            min="0"
            max="100"
            defaultValue={p.share_percent}
            className={inputClass}
          />
          <label className="flex justify-center px-4">
            <input
              type="radio"
              name="default_account"
              value={p.id}
              defaultChecked={p.is_default_account}
              className="accent-[#F5C518]"
            />
          </label>
        </div>
      ))}

      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
      {state.message && <p className="text-green-700 text-sm">{t.saved}</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-5 py-2 rounded-full bg-ink/8 hover:bg-ink/12 text-sm font-medium disabled:opacity-50"
      >
        {pending ? dict.common.loading : t.saveSettings}
      </button>
    </form>
  );
}
