"use client";

import { useActionState } from "react";
import { signIn } from "./actions";
import type { ActionResult } from "@/lib/manage/action-result";
import { manageDict, type ManageLang } from "@/lib/manage/dict";

const initialState: ActionResult = {};

export default function LoginForm({ lang, next }: { lang: ManageLang; next: string }) {
  const dict = manageDict[lang];
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="w-full max-w-sm bg-panel border border-line rounded-2xl p-8">
      <h1 className="text-xl font-bold text-ink mb-6">{dict.login.title}</h1>
      <input type="hidden" name="next" value={next} />
      <div className="space-y-4">
        <div>
          <label className="block text-ink/60 text-xs font-medium mb-1.5">{dict.login.email}</label>
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            className="w-full bg-page border border-line rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block text-ink/60 text-xs font-medium mb-1.5">{dict.login.password}</label>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full bg-page border border-line rounded-lg px-4 py-3 text-ink text-sm focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {state?.error && <p className="text-red-600 text-sm mt-4">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full mt-6 py-3 rounded-full bg-[#F5C518] text-ink font-bold text-sm hover:bg-[#F5C518]/90 transition-all disabled:opacity-50"
      >
        {pending ? dict.common.loading : dict.login.submit}
      </button>
    </form>
  );
}
