"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { quotationSchema } from "@/lib/manage/schemas";
import {
  actionError,
  actionMessage,
  fieldErrorsFromZod,
  type ActionResult,
} from "@/lib/manage/action-result";
import type { QuotationStatus } from "@/types/manage";

/** The line-item editor is a client component with its own add/remove state, so
 * it submits the rows as one JSON field rather than a fragile set of indexed
 * input names. Zod then validates the parsed array exactly as it would a form. */
function parseQuotationForm(formData: FormData) {
  let items: unknown = [];
  const raw = formData.get("items");
  if (typeof raw === "string" && raw.trim()) {
    try {
      items = JSON.parse(raw);
    } catch {
      return { ok: false as const, message: "Could not read the line items. Please try again." };
    }
  }

  const parsed = quotationSchema.safeParse({
    client_id: formData.get("client_id"),
    title: formData.get("title"),
    issue_date: formData.get("issue_date"),
    valid_until: formData.get("valid_until"),
    currency: formData.get("currency") || "SAR",
    vat_enabled: formData.get("vat_enabled"),
    discount: formData.get("discount") || 0,
    notes: formData.get("notes"),
    terms: formData.get("terms"),
    items,
  });

  return { ok: true as const, parsed };
}

function quotationRow(data: ReturnType<typeof quotationSchema.parse>) {
  return {
    client_id: data.client_id,
    title: data.title || null,
    issue_date: data.issue_date,
    valid_until: data.valid_until || null,
    currency: data.currency,
    vat_enabled: data.vat_enabled,
    discount: data.discount,
    notes: data.notes || null,
    terms: data.terms || null,
  };
}

function itemRows(quotationId: string, items: ReturnType<typeof quotationSchema.parse>["items"]) {
  return items.map((item, index) => ({
    quotation_id: quotationId,
    position: index + 1,
    service: item.service || null,
    description: item.description,
    kind: item.kind,
    quantity: item.quantity,
    unit_price: item.unit_price,
  }));
}

export async function createQuotationAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const result = parseQuotationForm(formData);
  if (!result.ok) return actionError(result.message);
  if (!result.parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(result.parsed.error));
  }
  const data = result.parsed.data;

  const supabase = await createClient();
  const { data: quote, error } = await supabase
    .from("quotations")
    .insert(quotationRow(data))
    .select("id")
    .single();

  if (error || !quote) return actionError(error?.message || "Could not create the quotation.");

  const { error: itemsError } = await supabase
    .from("quotation_items")
    .insert(itemRows(quote.id, data.items));

  if (itemsError) {
    // Don't leave a totals-less shell behind if the lines failed to save.
    await supabase.from("quotations").delete().eq("id", quote.id);
    return actionError(itemsError.message);
  }

  revalidatePath("/manage/quotations");
  redirect(`/manage/quotations/${quote.id}`);
}

export async function updateQuotationAction(
  quotationId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const result = parseQuotationForm(formData);
  if (!result.ok) return actionError(result.message);
  if (!result.parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(result.parsed.error));
  }
  const data = result.parsed.data;

  const supabase = await createClient();

  const { error } = await supabase
    .from("quotations")
    .update(quotationRow(data))
    .eq("id", quotationId);

  if (error) return actionError(error.message);

  // Replace the lines wholesale — reconciling row-by-row would be a lot of
  // machinery for a document that is edited a handful of times before it is
  // sent and then locked.
  const { error: deleteError } = await supabase
    .from("quotation_items")
    .delete()
    .eq("quotation_id", quotationId);
  if (deleteError) return actionError(deleteError.message);

  const { error: insertError } = await supabase
    .from("quotation_items")
    .insert(itemRows(quotationId, data.items));
  if (insertError) return actionError(insertError.message);

  revalidatePath("/manage/quotations");
  revalidatePath(`/manage/quotations/${quotationId}`);
  redirect(`/manage/quotations/${quotationId}`);
}

export async function setQuotationStatusAction(quotationId: string, status: QuotationStatus) {
  const supabase = await createClient();
  await supabase.from("quotations").update({ status }).eq("id", quotationId);
  revalidatePath("/manage/quotations");
  revalidatePath(`/manage/quotations/${quotationId}`);
}

export async function deleteQuotationAction(quotationId: string) {
  const supabase = await createClient();
  await supabase.from("quotations").delete().eq("id", quotationId);
  revalidatePath("/manage/quotations");
  redirect("/manage/quotations");
}

/** Copies a locked quotation into a fresh draft — the supported way to "edit"
 * something a client has already accepted. */
export async function duplicateQuotationAction(quotationId: string) {
  const supabase = await createClient();

  const [{ data: original }, { data: items }] = await Promise.all([
    supabase.from("quotations").select("*").eq("id", quotationId).maybeSingle(),
    supabase
      .from("quotation_items")
      .select("*")
      .eq("quotation_id", quotationId)
      .order("position", { ascending: true }),
  ]);

  if (!original) return;

  const { data: copy } = await supabase
    .from("quotations")
    .insert({
      client_id: original.client_id,
      title: original.title,
      currency: original.currency,
      vat_enabled: original.vat_enabled,
      discount: original.discount,
      notes: original.notes,
      terms: original.terms,
      valid_until: original.valid_until,
    })
    .select("id")
    .single();

  if (!copy) return;

  if (items?.length) {
    await supabase.from("quotation_items").insert(
      items.map((i) => ({
        quotation_id: copy.id,
        position: i.position,
        service: i.service,
        description: i.description,
        kind: i.kind,
        quantity: i.quantity,
        unit_price: i.unit_price,
      }))
    );
  }

  revalidatePath("/manage/quotations");
  redirect(`/manage/quotations/${copy.id}`);
}

/**
 * Hands the quotation to the billing system. `replacePlan` is passed straight
 * through: without it the database refuses to overwrite an existing monthly
 * plan and says so, which is what drives the confirmation in the UI.
 */
export async function convertQuotationAction(
  quotationId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const replacePlan = formData.get("replace_plan") === "on";
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("convert_quotation", {
    p_quotation_id: quotationId,
    p_replace_plan: replacePlan,
  });

  if (error) return actionError(error.message);

  revalidatePath("/manage");
  revalidatePath("/manage/payments");
  revalidatePath("/manage/quotations");
  revalidatePath(`/manage/quotations/${quotationId}`);
  revalidatePath("/manage/clients", "layout");

  return actionMessage(`${Number(data ?? 0)} charge(s) created from this quotation.`);
}
