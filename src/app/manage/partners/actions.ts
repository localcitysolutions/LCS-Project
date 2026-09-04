"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { expenseSchema, transferSchema, partnerRowSchema } from "@/lib/manage/schemas";
import {
  actionError,
  actionMessage,
  actionOk,
  fieldErrorsFromZod,
  type ActionResult,
} from "@/lib/manage/action-result";

function revalidateLedger(clientId?: string | null) {
  revalidatePath("/manage/partners");
  revalidatePath("/manage");
  if (clientId) revalidatePath(`/manage/clients/${clientId}`);
}

// ── Expenses ────────────────────────────────────────────────────────────────

export async function addExpenseAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = expenseSchema.safeParse({
    paid_by: formData.get("paid_by"),
    category: formData.get("category") || "other",
    amount: formData.get("amount"),
    currency: formData.get("currency") || "SAR",
    spent_at: formData.get("spent_at"),
    client_id: formData.get("client_id"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("expenses").insert({
    paid_by: parsed.data.paid_by,
    category: parsed.data.category,
    amount: parsed.data.amount,
    currency: parsed.data.currency,
    spent_at: parsed.data.spent_at,
    client_id: parsed.data.client_id || null,
    description: parsed.data.description || null,
  });
  if (error) return actionError(error.message);

  revalidateLedger(parsed.data.client_id || null);
  // Fresh object so the form can detect success by reference and reset.
  return { ...actionOk };
}

export async function deleteExpenseAction(expenseId: string, clientId: string | null) {
  const supabase = await createClient();
  await supabase.from("expenses").delete().eq("id", expenseId);
  revalidateLedger(clientId);
}

// ── Transfers between partners ──────────────────────────────────────────────

export async function addTransferAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = transferSchema.safeParse({
    from_partner: formData.get("from_partner"),
    to_partner: formData.get("to_partner"),
    amount: formData.get("amount"),
    currency: formData.get("currency") || "SAR",
    transferred_at: formData.get("transferred_at"),
    kind: formData.get("kind") || "settlement",
    note: formData.get("note"),
  });
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("partner_transfers").insert({
    from_partner: parsed.data.from_partner,
    to_partner: parsed.data.to_partner,
    amount: parsed.data.amount,
    currency: parsed.data.currency,
    transferred_at: parsed.data.transferred_at,
    kind: parsed.data.kind,
    note: parsed.data.note || null,
  });
  if (error) return actionError(error.message);

  revalidateLedger();
  return { ...actionOk };
}

export async function deleteTransferAction(transferId: string) {
  const supabase = await createClient();
  await supabase.from("partner_transfers").delete().eq("id", transferId);
  revalidateLedger();
}

// ── Partner settings (names, shares, default account) ───────────────────────

export async function savePartnersAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const ids = formData.getAll("partner_id").map(String);
  const defaultId = String(formData.get("default_account") || "");
  if (ids.length === 0) return actionError("No partners to save.");

  const rows = [];
  for (const id of ids) {
    const parsed = partnerRowSchema.safeParse({
      id,
      name: formData.get(`name_${id}`),
      share_percent: formData.get(`share_${id}`),
    });
    if (!parsed.success) {
      return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
    }
    rows.push(parsed.data);
  }

  const totalShare = rows.reduce((sum, r) => sum + r.share_percent, 0);
  if (Math.abs(totalShare - 100) > 0.01) {
    return actionError("Shares must add up to 100%.");
  }
  if (!ids.includes(defaultId)) {
    return actionError("Pick which account receives payments by default.");
  }

  const supabase = await createClient();

  // Clear the old default first — the unique index allows only one at a time,
  // so flipping the new one on before the old one is off would be rejected.
  const { error: clearError } = await supabase
    .from("partners")
    .update({ is_default_account: false })
    .neq("id", defaultId);
  if (clearError) return actionError(clearError.message);

  for (const row of rows) {
    const { error } = await supabase
      .from("partners")
      .update({
        name: row.name,
        share_percent: row.share_percent,
        is_default_account: row.id === defaultId,
      })
      .eq("id", row.id);
    if (error) return actionError(error.message);
  }

  revalidateLedger();
  revalidatePath("/manage/clients", "layout");
  return actionMessage("Saved.");
}
