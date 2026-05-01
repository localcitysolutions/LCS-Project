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
  // Phase 4 — /en/<slug> mirrors of Phase 1 410s (4)
  "/en/business-setup-saudi-arabia-guide",
  "/en/business-setup-partner-saudi-arabia",
  "/en/business-license-registration-saudi-arabia",
  "/en/business-structures-saudi-arabia-expats-investors",
  // Phase 4 — /en/<slug> mirrors of Phase 2 medium-priority 410s (10, skip already-present /en/how-to-get-misa and /en/register-business)
  "/en/business-setup-women-saudi-arabia-2025",
  "/en/business-setup-tier-2-cities-saudi-arabia",
  "/en/cost-to-start-small-business-saudi-arabia",
  "/en/grow-small-business-saudi-arabia-2025",
  "/en/local-city-solutions-licensing-cr-misa-registration-saudi-arabia",
  "/en/new-business-laws-saudi-arabia-2025",
  "/en/real-cost-of-starting-business-saudi-arabia",
  "/en/set-up-company-saudi-arabia-no-sponsor",
  "/en/vision-2030-business-models-youth-startups",
  "/en/best-cities-to-start-business-saudi-arabia-2025",
  // Phase 4 — /en/<slug> mirrors of Phase 2 low-priority root 410s (14)
  "/en/can-have-multiple-business-licenses-saudi-arabia",
  "/en/freelancing-with-student-visa-saudi-arabia",
  "/en/holding-vs-operating-company-ksa",
  "/en/local-city-solutions-vs-traditional-legal-firms",
  "/en/multiple-crs-under-one-person-ksa",
  "/en/need-physical-office-register-company-ksa",
  "/en/open-company-branch-ksa-same-cr",
  "/en/register-business-while-employed-saudi-arabia",
  "/en/sagia-vs-misa-saudi-investment",
  "/en/strategies-to-succeed-in-saudi-arabia-market",
  "/en/top-mistakes-expats-starting-business-saudi-arabia",
  "/en/update-commercial-registration-saudi-arabia",
  "/en/virtual-address-saudi-business-registration",
  "/en/align-business-with-vision-2030",
  // Phase 5 — Arabic legacy paths (off-strategy: business setup, MISA, CR, legal)
  "/ar/ترخيص-ميسا-للاستثمار-في-السعودية",
  "/ar/حجز-اسم-تجاري-في-السعودية",
  "/ar/استخراج-رخصة-بلدية-في-السعودية",
  "/ar/أفكار-شغل-للأجانب-في-السعودية-2025",
  "/ar/التوسع-الذكي-للأعمال-حلول-المدينة-المحلية",
  "/ar/مقارنة-local-city-solutions-والمكاتب-القانونية-التقليدية",
  "/ar/تكلفة-بدء-مشروع-صغير-في-السعودية",
  // Phase 6 — /ar/<english-slug> mirrors of Phase 1 410s (4)
  "/ar/business-setup-saudi-arabia-guide",
  "/ar/business-setup-partner-saudi-arabia",
  "/ar/business-license-registration-saudi-arabia",
  "/ar/business-structures-saudi-arabia-expats-investors",
  // Phase 6 — /ar/<english-slug> mirrors of Phase 2 medium-priority 410s (12)
  "/ar/business-setup-women-saudi-arabia-2025",
  "/ar/business-setup-tier-2-cities-saudi-arabia",
  "/ar/cost-to-start-small-business-saudi-arabia",
  "/ar/grow-small-business-saudi-arabia-2025",
  "/ar/how-to-get-misa-investment-license-saudi-arabia",
  "/ar/local-city-solutions-licensing-cr-misa-registration-saudi-arabia",
  "/ar/new-business-laws-saudi-arabia-2025",
  "/ar/real-cost-of-starting-business-saudi-arabia",
  "/ar/register-business-in-saudi-arabia-remotely",
  "/ar/set-up-company-saudi-arabia-no-sponsor",
  "/ar/vision-2030-business-models-youth-startups",
  "/ar/best-cities-to-start-business-saudi-arabia-2025",
  // Phase 6 — /ar/<english-slug> mirrors of Phase 2 low-priority 410s (14)
  "/ar/can-have-multiple-business-licenses-saudi-arabia",
  "/ar/freelancing-with-student-visa-saudi-arabia",
  "/ar/holding-vs-operating-company-ksa",
  "/ar/local-city-solutions-vs-traditional-legal-firms",
  "/ar/multiple-crs-under-one-person-ksa",
  "/ar/need-physical-office-register-company-ksa",
  "/ar/open-company-branch-ksa-same-cr",
  "/ar/register-business-while-employed-saudi-arabia",
  "/ar/sagia-vs-misa-saudi-investment",
  "/ar/strategies-to-succeed-in-saudi-arabia-market",
  "/ar/top-mistakes-expats-starting-business-saudi-arabia",
  "/ar/update-commercial-registration-saudi-arabia",
  "/ar/virtual-address-saudi-business-registration",
  "/ar/align-business-with-vision-2030",
  // Phase 6 — extra-safety /ar/ mirrors of Phase 2 already-/en/-prefixed entries (4 unique;
  // 2 of the 6 spec'd entries duplicate Phase 6 medium-priority entries above — Set deduplicates).
  "/ar/how-to-get-freelance-visa-saudi-arabia",
  "/ar/business-visa-vs-freelance-visa-in-saudi-arabia",
  "/ar/top-10-profitable-legal-business-ideas-foreigners-saudi-arabia",
  "/ar/foreign-ownership-saudi-arabia-misa-policy",
]);

// Phase 5 — prefix-match safety net for truncated Arabic slugs.
// Google's index display sometimes truncates long URLs, so the indexed form
// may not match the full exact-match entry above. Catch any path beginning
// with one of these stems.
const GONE_PREFIXES = [
  "/ar/التوسع-الذكي-للأعمال-حلول-المدينة-",
  "/ar/مقارنة-local-city-solutions-والمكاتب-القانوني",
];

export default function middleware(request: NextRequest) {
  // Normalise trailing slash so "/path/" and "/path" both match GONE_PATHS.
  // Decode percent-encoded segments — request.nextUrl.pathname keeps non-ASCII
  // chars in their %XX form, so Set lookups against raw Arabic strings need
  // the decoded form to match.
  const rawPathname = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  let pathname = rawPathname;
  try {
    pathname = decodeURIComponent(rawPathname);
  } catch {
    // malformed percent-encoding — fall back to raw pathname
  }

  if (GONE_PATHS.has(pathname)) {
    return new NextResponse(null, { status: 410 });
  }

  if (GONE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
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
