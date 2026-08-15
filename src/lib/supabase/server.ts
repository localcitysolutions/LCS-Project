import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/manage";

/** Server-side Supabase client bound to the current request's cookies — use
 * this in Server Components, Server Actions, and Route Handlers under
 * /manage. RLS (not this client) is what actually enforces access. */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Thrown when called from a Server Component render rather than
            // a Server Action/Route Handler — cookies() is read-only there.
            // Safe to ignore: manageAuthGuard() in middleware already
            // refreshes the session cookie on every request.
          }
        },
      },
    }
  );
}
