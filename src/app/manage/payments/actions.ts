"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  billingPlanSchema,
  paymentSchema,
  receiptSchema,
  VAT_RATE,
} from "@/lib/manage/schemas";
import {
  actionError,
  actionMessage,
  actionOk,
  fieldErrorsFromZod,
  type ActionResult,
} from "@/lib/manage/action-result";

/** A `<input type="month">` submits "2026-08"; Postgres `date` wants a day. */
function monthToDate(value: string) {
  if (!value) return null;
  return /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
}

function revalidateBilling(clientId: string) {
  revalidatePath("/manage");
  revalidatePath("/manage/payments");
  revalidatePath(`/manage/clients/${clientId}`);
}

/** Turns the database's own guard-rail messages into something readable. */
function friendlyDbError(message: string) {
  if (message.includes("payments_one_monthly_per_period")) {
    return "A monthly charge already exists for this client and month.";
  }
  if (message.includes("billing_plans_one_active")) {
    return "This client already has an active billing plan. Pause or end it first.";
  }
  return message;
}

// ── Charges ─────────────────────────────────────────────────────────────────

function parsePaymentForm(formData: FormData) {
  return paymentSchema.safeParse({
    client_id: formData.get("client_id"),
    kind: formData.get("kind") || "one_off",
    description: formData.get("description"),
    amount: formData.get("amount"),
    currency: formData.get("currency") || "SAR",
    due_date: formData.get("due_date"),
    period_month: formData.get("period_month"),
    vat_enabled: formData.get("vat_enabled"),
    invoice_number: formData.get("invoice_number"),
    notes: formData.get("notes"),
  });
}

function paymentRow(data: ReturnType<typeof paymentSchema.parse>) {
  return {
    client_id: data.client_id,
    kind: data.kind,
    description: data.description || null,
    amount: data.amount,
    // vat_amount and total are derived by the database, never sent from here.
    vat_rate: data.vat_enabled ? VAT_RATE : 0,
    currency: data.currency,
    due_date: data.due_date || null,
    period_month: data.kind === "monthly" ? monthToDate(data.period_month || "") : null,
    invoice_number: data.invoice_number || null,
    notes: data.notes || null,
  };
}

export async function createPaymentAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parsePaymentForm(formData);
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }
  if (parsed.data.kind === "monthly" && !parsed.data.period_month) {
    return actionError("Please fix the errors below.", {
      period_month: "Pick the month this charge is for.",
    });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("payments").insert(paymentRow(parsed.data));
  if (error) return actionError(friendlyDbError(error.message));

  // A new charge may be settleable straight away from an advance the client
  // has already paid.
  await supabase.rpc("apply_client_credit", { p_client_id: parsed.data.client_id });

  revalidateBilling(parsed.data.client_id);
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
  if (parsed.data.kind === "monthly" && !parsed.data.period_month) {
    return actionError("Please fix the errors below.", {
      period_month: "Pick the month this charge is for.",
    });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("payments")
    .update(paymentRow(parsed.data))
    .eq("id", paymentId);

  if (error) return actionError(friendlyDbError(error.message));

  revalidateBilling(parsed.data.client_id);
  redirect(`/manage/clients/${parsed.data.client_id}`);
}

export async function deletePaymentAction(paymentId: string, clientId: string) {
  const supabase = await createClient();
  await supabase.from("payments").delete().eq("id", paymentId);
  revalidateBilling(clientId);
  redirect(`/manage/clients/${clientId}`);
}

/** Shortcut for "they paid the whole thing" — records a receipt for exactly
 * the outstanding balance and applies it, so the books still show real money
 * rather than a status flipped by hand. */
export async function markPaymentPaidAction(paymentId: string, clientId: string) {
  const supabase = await createClient();

  const { data: charge } = await supabase
    .from("payments")
    .select("id, client_id, currency, total, amount_paid")
    .eq("id", paymentId)
    .maybeSingle();

  if (!charge) return;
  const balance = Number(charge.total) - Number(charge.amount_paid);
  if (balance <= 0) return;

  const { data: receipt } = await supabase
    .from("payment_receipts")
    .insert({
      client_id: charge.client_id,
      amount: balance,
      currency: charge.currency,
      method: "bank",
    })
    .select("id")
    .single();

  if (receipt) {
    await supabase
      .from("payment_allocations")
      .insert({ receipt_id: receipt.id, payment_id: charge.id, amount: balance });
  }

  revalidateBilling(clientId);
}

/** Runs the same generator the hourly cron runs. Idempotent by design. */
export async function generateChargesAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  void formData; // signature is fixed by useActionState; nothing to read here
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("generate_due_charges");
  if (error) return actionError(error.message);

  revalidatePath("/manage");
  revalidatePath("/manage/payments");
  revalidatePath("/manage/clients", "layout");

  const created = Number(data ?? 0);
  return created > 0
    ? actionMessage(`${created} charge(s) created`)
    : actionMessage("Everything is already generated.");
}

// ── Receipts (money actually received) ──────────────────────────────────────

export async function createReceiptAction(
  clientId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = receiptSchema.safeParse({
    client_id: clientId,
    amount: formData.get("amount"),
    currency: formData.get("currency") || "SAR",
    received_at: formData.get("received_at"),
    method: formData.get("method") || "bank",
    reference: formData.get("reference"),
    notes: formData.get("notes"),
    apply_to: formData.get("apply_to") || "auto",
  });
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const { data: receipt, error } = await supabase
    .from("payment_receipts")
    .insert({
      client_id: clientId,
      amount: parsed.data.amount,
      currency: parsed.data.currency,
      received_at: parsed.data.received_at,
      method: parsed.data.method,
      reference: parsed.data.reference || null,
      notes: parsed.data.notes || null,
    })
    .select("id")
    .single();

  if (error || !receipt) {
    return actionError(error?.message || "Could not save the payment.");
  }

  const applyTo = parsed.data.apply_to;

  if (applyTo === "auto") {
    const { error: applyError } = await supabase.rpc("apply_client_credit", {
      p_client_id: clientId,
    });
    if (applyError) return actionError(applyError.message);
  } else if (applyTo !== "credit") {
    // Applied to one specific charge. Anything above that charge's balance
    // stays on the client as advance credit rather than being rejected.
    const { data: charge } = await supabase
      .from("payments")
      .select("id, total, amount_paid")
      .eq("id", applyTo)
      .maybeSingle();

    if (!charge) return actionError("That charge no longer exists.");

    const balance = Number(charge.total) - Number(charge.amount_paid);
    const applied = Math.min(parsed.data.amount, balance);

    if (applied > 0) {
      const { error: allocError } = await supabase
        .from("payment_allocations")
        .insert({ receipt_id: receipt.id, payment_id: charge.id, amount: applied });
      if (allocError) return actionError(allocError.message);
    }
  }

  revalidateBilling(clientId);
  return actionOk;
}

export async function deleteReceiptAction(receiptId: string, clientId: string) {
  const supabase = await createClient();
  // Allocations cascade, which re-derives each affected charge's status.
  await supabase.from("payment_receipts").delete().eq("id", receiptId);
  revalidateBilling(clientId);
}

// ── Billing plans ───────────────────────────────────────────────────────────

function parsePlanForm(formData: FormData) {
  return billingPlanSchema.safeParse({
    monthly_amount: formData.get("monthly_amount") || 0,
    setup_fee: formData.get("setup_fee") || 0,
    currency: formData.get("currency") || "SAR",
    billing_day: formData.get("billing_day") || 1,
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    vat_enabled: formData.get("vat_enabled"),
    status: formData.get("status") || "active",
    notes: formData.get("notes"),
  });
}

export async function saveBillingPlanAction(
  clientId: string,
  planId: string | null,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parsePlanForm(formData);
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const row = {
    monthly_amount: parsed.data.monthly_amount,
    setup_fee: parsed.data.setup_fee,
    currency: parsed.data.currency,
    billing_day: parsed.data.billing_day,
    start_date: parsed.data.start_date,
    end_date: parsed.data.end_date || null,
    vat_enabled: parsed.data.vat_enabled,
    status: parsed.data.status,
    notes: parsed.data.notes || null,
  };

  const { error } = planId
    ? await supabase.from("billing_plans").update(row).eq("id", planId)
    : await supabase.from("billing_plans").insert({ client_id: clientId, ...row });

  if (error) return actionError(friendlyDbError(error.message));

  // Catch the plan up immediately — no waiting for the next cron tick.
  const { error: genError } = await supabase.rpc("generate_due_charges");
  if (genError) return actionError(genError.message);

  revalidateBilling(clientId);
  return actionOk;
}

export async function deleteBillingPlanAction(planId: string, clientId: string) {
  const supabase = await createClient();
  await supabase.from("billing_plans").delete().eq("id", planId);
  revalidateBilling(clientId);
}
