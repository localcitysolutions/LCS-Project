"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import type { getDict } from "@/lib/manage/lang";
import { generateChargesAction } from "./actions";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

/** Runs the same generator the hourly cron runs, for when you don't want to
 * wait for the next tick. Safe to press repeatedly — it only creates charges
 * that don't exist yet. */
export default function GenerateChargesButton({ dict }: { dict: Dict }) {
  const [state, formAction, pending] = useActionState(generateChargesAction, initialState);
  const t = dict.payments;

  return (
    <form action={formAction} className="flex items-center gap-3">
      <button
        type="submit"
        disabled={pending}
        title={t.generateHint}
        className="px-4 py-2 rounded-full bg-white/10 text-sm hover:bg-white/15 transition-all disabled:opacity-50"
      >
        {pending ? dict.common.loading : t.generate}
      </button>
      {state.message && <span className="text-xs text-[#F5C518]">{state.message}</span>}
      {state.error && <span className="text-xs text-red-400">{state.error}</span>}
    </form>
  );
}
