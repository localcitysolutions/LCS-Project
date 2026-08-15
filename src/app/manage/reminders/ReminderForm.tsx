"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { reminderChannelValues } from "@/lib/manage/schemas";
import type { getDict } from "@/lib/manage/lang";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

export default function ReminderForm({
  dict,
  action,
  clients,
  defaultClientId,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  clients: { id: string; name: string }[];
  defaultClientId?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = dict.reminders;
  const field = (name: string) => state.fieldErrors?.[name];
  const inputClass =
    "w-full bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F5C518]/40";

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{t.reminderTitle} *</label>
        <input name="title" required className={inputClass} />
        {field("title") && <p className="text-red-400 text-xs mt-1">{field("title")}</p>}
      </div>
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{t.client}</label>
        <select name="client_id" defaultValue={defaultClientId || ""} className={inputClass}>
          <option value="">—</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{t.dueAt} *</label>
        <input name="due_at" type="datetime-local" required className={inputClass} />
        {field("due_at") && <p className="text-red-400 text-xs mt-1">{field("due_at")}</p>}
      </div>
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{t.channels}</label>
        <div className="flex gap-4">
          {reminderChannelValues.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm text-white/70">
              <input type="checkbox" name="channels" value={c} defaultChecked={c === "dashboard"} />
              {t.channelLabels[c]}
            </label>
          ))}
        </div>
        {field("channels") && <p className="text-red-400 text-xs mt-1">{field("channels")}</p>}
      </div>
      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">{t.description}</label>
        <textarea name="description" rows={3} className={`${inputClass} resize-none`} />
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
