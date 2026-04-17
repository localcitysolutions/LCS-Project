import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

// Off-niche legacy paths — return 410 Gone so Google removes them from index
// These must be checked BEFORE intlMiddleware runs, otherwise next-intl
// prefixes them with /en/ and the app returns 404 instead of 410.
const GONE_PATHS = new Set([
  "/how-to-get-freelance-visa-saudi-arabia",
  "/web-hosting-riyadh",
  "/graphic-design-riyadh",
  "/logo-design-riyadh",
  "/video-production-riyadh",
]);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (GONE_PATHS.has(pathname)) {
    return new NextResponse(null, { status: 410 });
  }
  const userAgent = request.headers.get("user-agent") || "";

  // Only apply language detection on the bare root path "/"
  if (pathname === "/") {
    // Never redirect bots — send them to English
    const isBot =
      /googlebot|bingbot|facebookexternalhit|whatsapp|linkedinbot|twitterbot|applebot|yandexbot|slurp|duckduckbot|baidu|msnbot/i.test(
        userAgent
      );
    if (isBot) {
      return NextResponse.redirect(new URL("/en", request.url));
    }

    // Respect existing language preference cookie
    const langCookie = request.cookies.get("preferred-lang")?.value;
    if (langCookie === "ar" || langCookie === "en") {
      return NextResponse.redirect(new URL(`/${langCookie}`, request.url));
    }

    // Detect browser language from Accept-Language header
    const acceptLanguage = request.headers.get("accept-language") || "";
    const al = acceptLanguage.toLowerCase();
    const isArabic =
      al.startsWith("ar") ||
      al.includes("ar-sa") ||
      al.includes("ar-ae") ||
      al.includes("ar-kw") ||
      al.includes("ar-bh") ||
      al.includes("ar-qa") ||
      al.includes("ar-om");

    const detectedLang = isArabic ? "ar" : "en";

    const response = NextResponse.redirect(
      new URL(`/${detectedLang}`, request.url)
    );
    response.cookies.set("preferred-lang", detectedLang, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
      sameSite: "lax",
    });

    return response;
  }

  // For all other paths, let next-intl handle locale routing
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except static files, api, _next
    "/((?!api|_next|_vercel|favicon.ico|.*\\..*).*)",
  ],
};
