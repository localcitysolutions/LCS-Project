import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_MANAGE_PATHS = new Set(["/manage/login"]);

/**
 * Auth gate for the /manage route tree, called from src/proxy.ts.
 *
 * Owns its own NextResponse end-to-end and never falls through to
 * next-intl's middleware — merging the two would risk silently dropping the
 * Supabase session-refresh cookie next-intl doesn't know about.
 */
export async function manageAuthGuard(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() (not getSession()) revalidates the JWT against the auth server
  // instead of trusting the cookie unverified — this is the real security
  // boundary that every RLS policy's auth.uid() ultimately depends on.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isLoginPage = PUBLIC_MANAGE_PATHS.has(pathname);

  if (!user && !isLoginPage) {
    const loginUrl = new URL("/manage/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL("/manage", request.url));
  }

  return response;
}
