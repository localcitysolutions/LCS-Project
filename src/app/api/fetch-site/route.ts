import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "LCS-Audit-Bot/1.0 (+https://localcitysolutions.com)",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const html = await response.text();

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const metaDescMatch =
      html.match(
        /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
      ) ||
      html.match(
        /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i
      );
    const h1Matches = html.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
    const h2Matches = html.match(/<h2[^>]*>[\s\S]*?<\/h2>/gi);
    const imgMatches = html.match(/<img[^>]*>/gi);
    const imgsWithAlt = html.match(/<img[^>]*alt=["'][^"']+["'][^>]*>/gi);
    const hasOgTitle = /og:title/i.test(html);
    const hasOgDesc = /og:description/i.test(html);
    const hasOgImage = /og:image/i.test(html);
    const hasTwitterCard = /twitter:card/i.test(html);
    const hasSchema = /application\/ld\+json/i.test(html);
    const hasViewport = /name=["']viewport["']/i.test(html);
    const hasCanonical = /rel=["']canonical["']/i.test(html);
    const hasHreflang = /hreflang/i.test(html);
    const hasRobotsMeta = /name=["']robots["']/i.test(html);
    const hasSitemap = /sitemap/i.test(html);
    const langAttr = html.match(/<html[^>]*lang=["']([^"']*)["'][^>]*/i);
    const hasHttps = url.startsWith("https");
    const cssFiles = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi);
    const jsFiles = html.match(/<script[^>]*src=["'][^"']*["'][^>]*>/gi);
    const hasGoogleAnalytics =
      /gtag|google-analytics|googletagmanager/i.test(html);
    const hasFavicon =
      /rel=["']icon["']|rel=["']shortcut icon["']/i.test(html);

    return NextResponse.json({
      title: titleMatch?.[1]?.trim() || "",
      metaDescription: metaDescMatch?.[1]?.trim() || "",
      h1Count: h1Matches?.length || 0,
      h2Count: h2Matches?.length || 0,
      imageCount: imgMatches?.length || 0,
      imagesWithAlt: imgsWithAlt?.length || 0,
      hasOgTitle,
      hasOgDesc,
      hasOgImage,
      hasTwitterCard,
      hasSchema,
      hasViewport,
      hasCanonical,
      hasHreflang,
      hasRobotsMeta,
      hasSitemap,
      language: langAttr?.[1] || "",
      hasHttps,
      cssFileCount: cssFiles?.length || 0,
      jsFileCount: jsFiles?.length || 0,
      hasGoogleAnalytics,
      hasFavicon,
      htmlSize: Math.round(html.length / 1024),
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Could not fetch website";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
