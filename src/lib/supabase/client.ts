import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/manage";

/** Browser-side Supabase client — used by the /manage login form and any
 * client component that needs the current session. Uses the public anon key
 * only; all real authorization is enforced by Postgres RLS. */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
