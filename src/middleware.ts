import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") || "";

  // Never redirect if already on a language path — URL is source of truth
  if (pathname.startsWith("/en") || pathname.startsWith("/ar")) {
    return NextResponse.next();
  }

  // Never redirect bots/crawlers — send them to English
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

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|fonts).*)",
  ],
};
