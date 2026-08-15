"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { clientSchema } from "@/lib/manage/schemas";
import { actionError, fieldErrorsFromZod, type ActionResult } from "@/lib/manage/action-result";

function parseClientForm(formData: FormData) {
  return clientSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    industry: formData.get("industry"),
    status: formData.get("status"),
    notes: formData.get("notes"),
    assigned_to: formData.get("assigned_to"),
  });
}

export async function createClientAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parseClientForm(formData);
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clients")
    .insert({
      name: parsed.data.name,
      status: parsed.data.status,
      company: parsed.data.company || null,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      whatsapp: parsed.data.whatsapp || null,
      industry: parsed.data.industry || null,
      notes: parsed.data.notes || null,
      assigned_to: parsed.data.assigned_to || null,
    })
    .select("id")
    .single();

  if (error || !data) {
    return actionError(error?.message || "Could not create client.");
  }

  revalidatePath("/manage/clients");
  redirect(`/manage/clients/${data.id}`);
}

export async function updateClientAction(
  clientId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parseClientForm(formData);
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .update({
      name: parsed.data.name,
      status: parsed.data.status,
      company: parsed.data.company || null,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      whatsapp: parsed.data.whatsapp || null,
      industry: parsed.data.industry || null,
      notes: parsed.data.notes || null,
      assigned_to: parsed.data.assigned_to || null,
    })
    .eq("id", clientId);

  if (error) {
    return actionError(error.message);
  }

  revalidatePath("/manage/clients");
  revalidatePath(`/manage/clients/${clientId}`);
  redirect(`/manage/clients/${clientId}`);
}

export async function deleteClientAction(clientId: string) {
  const supabase = await createClient();
  await supabase.from("clients").delete().eq("id", clientId);
  revalidatePath("/manage/clients");
  redirect("/manage/clients");
}
