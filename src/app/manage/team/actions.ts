"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// The real enforcement here — not the "admin-only" nav link, which a staff
// member could bypass by hitting this action's endpoint directly. profiles
// has no client-reachable RLS write policy at all (see the migration), so
// createAdminClient() is the only way these mutations happen; this check is
// what stops a non-admin from calling it.
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") throw new Error("Admins only");
}

export async function setProfileRoleAction(profileId: string, role: "admin" | "staff") {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.from("profiles").update({ role }).eq("id", profileId);
  revalidatePath("/manage/team");
}

export async function setProfileActiveAction(profileId: string, active: boolean) {
  await requireAdmin();
  const admin = createAdminClient();
  await admin.from("profiles").update({ active }).eq("id", profileId);
  revalidatePath("/manage/team");
}
