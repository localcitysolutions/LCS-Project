"use client";

import { useActionState, useState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import type { getDict } from "@/lib/manage/lang";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

/**
 * Converting is the one irreversible step in the quotation flow, so it asks
 * before overwriting an existing monthly plan. The check lives in the database
 * function — it refuses and explains — and this panel simply surfaces that
 * refusal alongside the checkbox that authorises the overwrite.
 */
export default function ConvertPanel({
  dict,
  action,
  hasActivePlan,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  hasActivePlan: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [replace, setReplace] = useState(false);
  const t = dict.quotations;

  return (
    <form action={formAction} className="space-y-3">
      <p className="text-white/50 text-xs leading-relaxed">{t.convertHint}</p>

      {hasActivePlan && (
        <label className="flex items-start gap-2 text-xs text-amber-300/90">
          <input
            type="checkbox"
            name="replace_plan"
            checked={replace}
            onChange={(e) => setReplace(e.target.checked)}
            className="accent-[#F5C518] mt-0.5"
          />
          {t.convertReplace}
        </label>
      )}

      {state.error && <p className="text-red-400 text-xs leading-relaxed">{state.error}</p>}
      {state.message && <p className="text-green-400 text-xs">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="px-5 py-2 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all disabled:opacity-50"
      >
        {pending ? dict.common.loading : t.convert}
      </button>
    </form>
  );
}
