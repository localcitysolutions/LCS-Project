"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import { clientStatusValues, serviceTypeValues } from "@/lib/manage/schemas";
import type { getDict } from "@/lib/manage/lang";
import type { Client, Profile } from "@/types/manage";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

export default function ClientForm({
  dict,
  action,
  client,
  staff,
}: {
  dict: Dict;
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  client?: Client;
  staff: Pick<Profile, "id" | "full_name" | "email">[];
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const t = dict.clients;
  const field = (name: string) => state.fieldErrors?.[name];
  const inputClass =
    "w-full bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F5C518]/40";
  const labelClass = "block text-white/60 text-xs font-medium mb-1.5";

  return (
    <form action={formAction} className="max-w-xl space-y-4">
      <div>
        <label className={labelClass}>{t.name} *</label>
        <input name="name" defaultValue={client?.name} required className={inputClass} />
        {field("name") && <p className="text-red-400 text-xs mt-1">{field("name")}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.company}</label>
          <input name="company" defaultValue={client?.company || ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t.industry}</label>
          <input name="industry" defaultValue={client?.industry || ""} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.email}</label>
          <input name="email" type="email" defaultValue={client?.email || ""} className={inputClass} />
          {field("email") && <p className="text-red-400 text-xs mt-1">{field("email")}</p>}
        </div>
        <div>
          <label className={labelClass}>{t.phone}</label>
          <input name="phone" defaultValue={client?.phone || ""} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.whatsapp}</label>
          <input name="whatsapp" defaultValue={client?.whatsapp || ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t.status}</label>
          <select name="status" defaultValue={client?.status || "lead"} className={inputClass}>
            {clientStatusValues.map((s) => (
              <option key={s} value={s}>
                {t.statusLabels[s]}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.website}</label>
          <input
            name="website"
            placeholder="https://"
            defaultValue={client?.website || ""}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t.startDate}</label>
          <input name="start_date" type="date" defaultValue={client?.start_date || ""} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>{t.primaryService}</label>
        <select name="primary_service" defaultValue={client?.primary_service || ""} className={inputClass}>
          <option value="">{t.selectService}</option>
          {serviceTypeValues.map((s) => (
            <option key={s} value={s}>
              {t.serviceLabels[s]}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t.gmbName}</label>
          <input name="gmb_name" defaultValue={client?.gmb_name || ""} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t.gmbLocation}</label>
          <input name="gmb_location" defaultValue={client?.gmb_location || ""} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>{t.gmbLink}</label>
        <input
          name="gmb_link"
          placeholder="https://maps.google.com/..."
          defaultValue={client?.gmb_link || ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t.vatNumber}</label>
        <input
          name="vat_number"
          placeholder="3xxxxxxxxxxxxx3"
          defaultValue={client?.vat_number || ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t.tags}</label>
        <input
          name="tags"
          placeholder={t.tagsHint}
          defaultValue={client?.tags?.join(", ") || ""}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t.assignedTo}</label>
        <select name="assigned_to" defaultValue={client?.assigned_to || ""} className={inputClass}>
          <option value="">{t.unassigned}</option>
          {staff.map((s) => (
            <option key={s.id} value={s.id}>
              {s.full_name || s.email}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>{t.notes}</label>
        <textarea
          name="notes"
          rows={3}
          defaultValue={client?.notes || ""}
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
