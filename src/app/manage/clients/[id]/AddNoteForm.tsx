"use client";

import { useActionState, useEffect, useRef } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import type { getDict } from "@/lib/manage/lang";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

export default function AddNoteForm({
  dict,
  action,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const t = dict.clientNotes;

  // Clear the textarea once the note lands, so the next one starts blank.
  // The action returns a fresh object on every success, so reference
  // inequality is enough to tell "just succeeded" apart from the mount state.
  useEffect(() => {
    if (state !== initialState && !state.error) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="mb-4">
      <textarea
        name="body"
        rows={2}
        placeholder={t.placeholder}
        className="w-full bg-[#0A1524] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F5C518]/40 resize-none"
      />
      {(state.fieldErrors?.body || state.error) && (
        <p className="text-red-400 text-xs mt-1">{state.fieldErrors?.body || state.error}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-medium disabled:opacity-50"
      >
        {pending ? dict.common.loading : t.save}
      </button>
    </form>
  );
}
