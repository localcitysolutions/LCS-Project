"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { reminderSchema } from "@/lib/manage/schemas";
import { actionError, fieldErrorsFromZod, type ActionResult } from "@/lib/manage/action-result";

function parseReminderForm(formData: FormData) {
  return reminderSchema.safeParse({
    client_id: formData.get("client_id"),
    title: formData.get("title"),
    description: formData.get("description"),
    due_at: formData.get("due_at"),
    channels: formData.getAll("channels"),
    assigned_to: formData.get("assigned_to"),
  });
}

export async function createReminderAction(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const parsed = parseReminderForm(formData);
  if (!parsed.success) {
    return actionError("Please fix the errors below.", fieldErrorsFromZod(parsed.error));
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reminders").insert({
    client_id: parsed.data.client_id || null,
    title: parsed.data.title,
    description: parsed.data.description || null,
    due_at: new Date(parsed.data.due_at).toISOString(),
    channels: parsed.data.channels,
    assigned_to: parsed.data.assigned_to || null,
  });

  if (error) return actionError(error.message);

  revalidatePath("/manage/reminders");
  revalidatePath("/manage");
  if (parsed.data.client_id) revalidatePath(`/manage/clients/${parsed.data.client_id}`);
  redirect("/manage/reminders");
}

export async function updateReminderStatusAction(
  reminderId: string,
  status: "done" | "dismissed"
) {
  const supabase = await createClient();
  await supabase.from("reminders").update({ status }).eq("id", reminderId);
  revalidatePath("/manage/reminders");
  revalidatePath("/manage");
}

export async function deleteReminderAction(reminderId: string) {
  const supabase = await createClient();
  await supabase.from("reminders").delete().eq("id", reminderId);
  revalidatePath("/manage/reminders");
  revalidatePath("/manage");
}
