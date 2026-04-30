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
  "/business-setup-saudi-arabia-guide",
  "/business-setup-partner-saudi-arabia",
  "/business-license-registration-saudi-arabia",
  "/business-structures-saudi-arabia-expats-investors",
  // Phase 2 — medium priority (12)
  "/business-setup-women-saudi-arabia-2025",
  "/business-setup-tier-2-cities-saudi-arabia",
  "/cost-to-start-small-business-saudi-arabia",
  "/grow-small-business-saudi-arabia-2025",
  "/how-to-get-misa-investment-license-saudi-arabia",
  "/local-city-solutions-licensing-cr-misa-registration-saudi-arabia",
  "/new-business-laws-saudi-arabia-2025",
  "/real-cost-of-starting-business-saudi-arabia",
  "/register-business-in-saudi-arabia-remotely",
  "/set-up-company-saudi-arabia-no-sponsor",
  "/vision-2030-business-models-youth-startups",
  "/best-cities-to-start-business-saudi-arabia-2025",
  // Phase 2 — low priority root (14)
  "/can-have-multiple-business-licenses-saudi-arabia",
  "/freelancing-with-student-visa-saudi-arabia",
  "/holding-vs-operating-company-ksa",
  "/local-city-solutions-vs-traditional-legal-firms",
  "/multiple-crs-under-one-person-ksa",
  "/need-physical-office-register-company-ksa",
  "/open-company-branch-ksa-same-cr",
  "/register-business-while-employed-saudi-arabia",
  "/sagia-vs-misa-saudi-investment",
  "/strategies-to-succeed-in-saudi-arabia-market",
  "/top-mistakes-expats-starting-business-saudi-arabia",
  "/update-commercial-registration-saudi-arabia",
  "/virtual-address-saudi-business-registration",
  "/align-business-with-vision-2030",
  // Phase 2 — low priority /en/ legacy duplicates (6)
  "/en/how-to-get-freelance-visa-saudi-arabia",
  "/en/how-to-get-misa-investment-license-saudi-arabia",
  "/en/business-visa-vs-freelance-visa-in-saudi-arabia",
  "/en/top-10-profitable-legal-business-ideas-foreigners-saudi-arabia",
  "/en/foreign-ownership-saudi-arabia-misa-policy",
  "/en/register-business-in-saudi-arabia-remotely",
]);

export default function middleware(request: NextRequest) {
  // Normalise trailing slash so "/path/" and "/path" both match GONE_PATHS
  const pathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";

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
