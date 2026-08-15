import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/manage";

/**
 * Service-role Supabase client — bypasses Row Level Security entirely.
 *
 * `profiles` deliberately has no client-reachable insert/update policy (see
 * supabase/migrations/0001_init.sql), so role/active changes and full_name
 * edits can ONLY happen through this client, from a Server Action.
 *
 * NEVER import this file from a Client Component, and never let
 * SUPABASE_SERVICE_ROLE_KEY reach the browser bundle — it is a server-only
 * env var (no NEXT_PUBLIC_ prefix) for that reason.
 */
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
