"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { paymentSchema } from "@/lib/manage/schemas";
import { actionError, fieldErrorsFromZod, type ActionResult } from "@/lib/manage/action-result";

function parsePaymentForm(formData: FormData) {
  return paymentSchema.safeParse({
    client_id: formData.get("client_id"),
    description: formData.get("description"),
    amount: formData.get("amount"),
    currency: formData.get("currency") || "SAR",
    due_date: formData.get("due_date"),
    status: formData.get("status"),
    invoice_number: formData.get("invoice_number"),
    notes: formData.get("notes"),
  });
}

export async function createPaymentAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parsePaymentForm(formData);
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("payments").insert({
    client_id: parsed.data.client_id,
    description: parsed.data.description || null,
    amount: parsed.data.amount,
    currency: parsed.data.currency,
    due_date: parsed.data.due_date || null,
    status: parsed.data.status,
    paid_at: parsed.data.status === "paid" ? new Date().toISOString() : null,
    invoice_number: parsed.data.invoice_number || null,
    notes: parsed.data.notes || null,
  });

  if (error) return actionError(error.message);

  revalidatePath("/manage/payments");
  revalidatePath(`/manage/clients/${parsed.data.client_id}`);
  redirect(`/manage/clients/${parsed.data.client_id}`);
}

export async function updatePaymentAction(
  paymentId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parsePaymentForm(formData);
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();

  // Preserve the original paid_at if it was already paid — only stamp a new
  // paid_at on the unpaid → paid transition, so re-saving an already-paid
  // invoice doesn't silently move its paid date.
  const { data: existing } = await supabase
    .from("payments")
    .select("status, paid_at")
    .eq("id", paymentId)
    .maybeSingle();

  const paidAt =
    parsed.data.status === "paid"
      ? existing?.status === "paid" && existing.paid_at
        ? existing.paid_at
        : new Date().toISOString()
      : null;

  const { error } = await supabase
    .from("payments")
    .update({
      client_id: parsed.data.client_id,
      description: parsed.data.description || null,
      amount: parsed.data.amount,
      currency: parsed.data.currency,
      due_date: parsed.data.due_date || null,
      status: parsed.data.status,
      paid_at: paidAt,
      invoice_number: parsed.data.invoice_number || null,
      notes: parsed.data.notes || null,
    })
    .eq("id", paymentId);

  if (error) return actionError(error.message);

  revalidatePath("/manage/payments");
  revalidatePath(`/manage/clients/${parsed.data.client_id}`);
  redirect(`/manage/clients/${parsed.data.client_id}`);
}

export async function deletePaymentAction(paymentId: string, clientId: string) {
  const supabase = await createClient();
  await supabase.from("payments").delete().eq("id", paymentId);
  revalidatePath("/manage/payments");
  revalidatePath(`/manage/clients/${clientId}`);
  redirect(`/manage/clients/${clientId}`);
}
