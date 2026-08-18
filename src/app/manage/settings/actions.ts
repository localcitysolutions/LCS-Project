"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { companySettingsSchema } from "@/lib/manage/schemas";
import {
  actionError,
  actionMessage,
  fieldErrorsFromZod,
  type ActionResult,
} from "@/lib/manage/action-result";

export async function saveCompanySettingsAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = companySettingsSchema.safeParse({
    name_en: formData.get("name_en"),
    name_ar: formData.get("name_ar"),
    vat_number: formData.get("vat_number"),
    cr_number: formData.get("cr_number"),
    address_en: formData.get("address_en"),
    address_ar: formData.get("address_ar"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    website: formData.get("website"),
    bank_name: formData.get("bank_name"),
    iban: formData.get("iban"),
    invoice_prefix: formData.get("invoice_prefix") || "INV",
    receipt_prefix: formData.get("receipt_prefix") || "RCT",
    payment_terms_en: formData.get("payment_terms_en"),
    payment_terms_ar: formData.get("payment_terms_ar"),
  });

  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const d = parsed.data;
  const supabase = await createClient();

  // There is exactly one settings row (the database enforces it), so this is an
  // update, never an insert. RLS restricts it to admins.
  const { error } = await supabase
    .from("company_settings")
    .update({
      name_en: d.name_en,
      name_ar: d.name_ar || "",
      vat_number: d.vat_number || null,
      cr_number: d.cr_number || null,
      address_en: d.address_en || null,
      address_ar: d.address_ar || null,
      phone: d.phone || null,
      email: d.email || null,
      website: d.website || null,
      bank_name: d.bank_name || null,
      iban: d.iban || null,
      invoice_prefix: d.invoice_prefix,
      receipt_prefix: d.receipt_prefix,
      payment_terms_en: d.payment_terms_en || null,
      payment_terms_ar: d.payment_terms_ar || null,
    })
    .eq("id", true);

  if (error) return actionError(error.message);

  revalidatePath("/manage/settings");
  return actionMessage("Settings saved.");
}
