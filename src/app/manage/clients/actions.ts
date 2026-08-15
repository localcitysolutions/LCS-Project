"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { clientSchema, clientServiceSchema } from "@/lib/manage/schemas";
import {
  actionError,
  actionOk,
  fieldErrorsFromZod,
  type ActionResult,
} from "@/lib/manage/action-result";
import type { ClientServiceStatus } from "@/types/manage";

function parseClientForm(formData: FormData) {
  return clientSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    industry: formData.get("industry"),
    status: formData.get("status"),
    website: formData.get("website"),
    start_date: formData.get("start_date"),
    primary_service: formData.get("primary_service"),
    gmb_name: formData.get("gmb_name"),
    gmb_location: formData.get("gmb_location"),
    gmb_link: formData.get("gmb_link"),
    notes: formData.get("notes"),
    assigned_to: formData.get("assigned_to"),
  });
}

function clientRow(data: ReturnType<typeof clientSchema.parse>) {
  return {
    name: data.name,
    status: data.status,
    company: data.company || null,
    email: data.email || null,
    phone: data.phone || null,
    whatsapp: data.whatsapp || null,
    industry: data.industry || null,
    website: data.website || null,
    start_date: data.start_date || null,
    primary_service: data.primary_service || null,
    gmb_name: data.gmb_name || null,
    gmb_location: data.gmb_location || null,
    gmb_link: data.gmb_link || null,
    notes: data.notes || null,
    assigned_to: data.assigned_to || null,
  };
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
    .insert(clientRow(parsed.data))
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
    .update(clientRow(parsed.data))
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

// ── Client services (history of what we've provided / are providing) ─────────

export async function addClientServiceAction(
  clientId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = clientServiceSchema.safeParse({
    service: formData.get("service"),
    status: formData.get("status") || "active",
    started_at: formData.get("started_at"),
    ended_at: formData.get("ended_at"),
    notes: formData.get("notes"),
  });
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("client_services").insert({
    client_id: clientId,
    service: parsed.data.service,
    status: parsed.data.status,
    started_at: parsed.data.started_at || null,
    ended_at: parsed.data.ended_at || null,
    notes: parsed.data.notes || null,
  });

  if (error) {
    return actionError(error.message);
  }

  revalidatePath(`/manage/clients/${clientId}`);
  return actionOk;
}

export async function setClientServiceStatusAction(
  serviceId: string,
  clientId: string,
  status: ClientServiceStatus
) {
  const supabase = await createClient();
  const patch: { status: ClientServiceStatus; ended_at?: string } = { status };
  if (status === "completed") {
    patch.ended_at = new Date().toISOString().slice(0, 10);
  }
  await supabase.from("client_services").update(patch).eq("id", serviceId);
  revalidatePath(`/manage/clients/${clientId}`);
}

export async function deleteClientServiceAction(serviceId: string, clientId: string) {
  const supabase = await createClient();
  await supabase.from("client_services").delete().eq("id", serviceId);
  revalidatePath(`/manage/clients/${clientId}`);
}
