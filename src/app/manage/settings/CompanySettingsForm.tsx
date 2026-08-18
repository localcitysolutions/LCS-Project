"use client";

import { useActionState } from "react";
import type { ActionResult } from "@/lib/manage/action-result";
import type { getDict } from "@/lib/manage/lang";
import type { CompanySettings } from "@/types/manage";
import { saveCompanySettingsAction } from "./actions";

type Dict = ReturnType<typeof getDict>;

const initialState: ActionResult = {};

const inputClass =
  "w-full bg-[#0E1A2E] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F5C518]/40 disabled:opacity-50";
const labelClass = "block text-white/60 text-xs font-medium mb-1.5";

export default function CompanySettingsForm({
  dict,
  settings,
  canEdit,
}: {
  dict: Dict;
  settings: CompanySettings | null;
  canEdit: boolean;
}) {
  const [state, formAction, pending] = useActionState(saveCompanySettingsAction, initialState);
  const t = dict.settings;
  const field = (name: string) => state.fieldErrors?.[name];

  return (
    <form action={formAction} className="max-w-3xl space-y-5">
      <fieldset disabled={!canEdit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.nameEn} *</label>
            <input
              name="name_en"
              defaultValue={settings?.name_en || ""}
              required
              className={inputClass}
            />
            {field("name_en") && <p className="text-red-400 text-xs mt-1">{field("name_en")}</p>}
          </div>
          <div>
            <label className={labelClass}>{t.nameAr}</label>
            <input
              name="name_ar"
              dir="rtl"
              defaultValue={settings?.name_ar || ""}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.vatNumber}</label>
            <input
              name="vat_number"
              defaultValue={settings?.vat_number || ""}
              placeholder="3xxxxxxxxxxxxx3"
              className={inputClass}
            />
            <p className="text-white/30 text-[11px] mt-1">{t.vatHint}</p>
          </div>
          <div>
            <label className={labelClass}>{t.crNumber}</label>
            <input name="cr_number" defaultValue={settings?.cr_number || ""} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.addressEn}</label>
            <input name="address_en" defaultValue={settings?.address_en || ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t.addressAr}</label>
            <input
              name="address_ar"
              dir="rtl"
              defaultValue={settings?.address_ar || ""}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>{t.phone}</label>
            <input name="phone" defaultValue={settings?.phone || ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t.email}</label>
            <input name="email" defaultValue={settings?.email || ""} className={inputClass} />
            {field("email") && <p className="text-red-400 text-xs mt-1">{field("email")}</p>}
          </div>
          <div>
            <label className={labelClass}>{t.website}</label>
            <input name="website" defaultValue={settings?.website || ""} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.bankName}</label>
            <input name="bank_name" defaultValue={settings?.bank_name || ""} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t.iban}</label>
            <input
              name="iban"
              defaultValue={settings?.iban || ""}
              placeholder="SA00 0000 0000 0000 0000 0000"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.invoicePrefix}</label>
            <input
              name="invoice_prefix"
              defaultValue={settings?.invoice_prefix || "INV"}
              maxLength={8}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t.receiptPrefix}</label>
            <input
              name="receipt_prefix"
              defaultValue={settings?.receipt_prefix || "RCT"}
              maxLength={8}
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-white/30 text-[11px] -mt-3">{t.prefixHint}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.paymentTermsEn}</label>
            <input
              name="payment_terms_en"
              defaultValue={settings?.payment_terms_en || ""}
              placeholder="Payment due within 7 days."
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t.paymentTermsAr}</label>
            <input
              name="payment_terms_ar"
              dir="rtl"
              defaultValue={settings?.payment_terms_ar || ""}
              className={inputClass}
            />
          </div>
        </div>

        {state.error && <p className="text-red-400 text-sm">{state.error}</p>}
        {state.message && <p className="text-green-400 text-sm">{state.message}</p>}

        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all disabled:opacity-50"
        >
          {pending ? dict.common.loading : t.save}
        </button>
      </fieldset>
    </form>
  );
}
