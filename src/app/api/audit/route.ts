import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface Finding {
  check: string;
  status: "pass" | "warning" | "fail";
  detail: string;
  impact?: "high" | "medium" | "low";
}

interface CategoryResult {
  name: string;
  nameAr: string;
  icon: string;
  score: number;
  status: "good" | "warning" | "critical";
  findings: Finding[];
}

export const maxDuration = 30;

// Bilingual helper
const a = (isAr: boolean, ar: string, en: string) => (isAr ? ar : en);

export async function POST(request: Request) {
  const { url, competitorUrl, locale } = await request.json();
  const isAr = locale === "ar";

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  let targetUrl = url.trim();
  if (!targetUrl.startsWith("http")) targetUrl = "https://" + targetUrl;

  try {
    const [htmlResult, pageSpeedMobile, pageSpeedDesktop, sslResult, competitorResult] =
      await Promise.allSettled([
        fetchAndParseHTML(targetUrl),
        fetchPageSpeed(targetUrl, "mobile"),
        fetchPageSpeed(targetUrl, "desktop"),
        checkSSL(targetUrl),
        competitorUrl
          ? fetchAndParseHTML(
              competitorUrl.trim().startsWith("http")
                ? competitorUrl.trim()
                : "https://" + competitorUrl.trim()
            )
          : Promise.resolve(null),
      ]);

    const siteData = htmlResult.status === "fulfilled" ? htmlResult.value : null;
    const psMobile = pageSpeedMobile.status === "fulfilled" ? pageSpeedMobile.value : null;
    const psDesktop = pageSpeedDesktop.status === "fulfilled" ? pageSpeedDesktop.value : null;
    const ssl = sslResult.status === "fulfilled" ? sslResult.value : null;
    const competitor = competitorResult.status === "fulfilled" ? competitorResult.value : null;

    if (!siteData) {
      return NextResponse.json(
        { error: "Could not fetch website. Please check the URL and try again." },
        { status: 400 }
      );
    }

    const brokenLinks = await checkBrokenLinks(siteData.internalLinkUrls.slice(0, 20), targetUrl);

    const seoCategory = scoreSEO(siteData, isAr);
    const performanceCategory = scorePerformance(siteData, psMobile, psDesktop, isAr);
    const mobileCategory = scoreMobile(siteData, psMobile, isAr);
    const contentCategory = scoreContent(siteData, isAr);
    const localCategory = scoreLocalSEO(siteData, isAr);
    const socialCategory = scoreSocial(siteData, isAr);
    const securityCategory = scoreSecurity(siteData, ssl, isAr);
    const technicalCategory = scoreTechnical(siteData, brokenLinks, isAr);

    const categories: CategoryResult[] = [
      seoCategory,
      performanceCategory,
      mobileCategory,
      contentCategory,
      localCategory,
      socialCategory,
      securityCategory,
      technicalCategory,
    ];

    const overallScore = Math.round(
      seoCategory.score * 0.25 +
        performanceCategory.score * 0.15 +
        mobileCategory.score * 0.15 +
        contentCategory.score * 0.1 +
        localCategory.score * 0.1 +
        socialCategory.score * 0.08 +
        securityCategory.score * 0.07 +
        technicalCategory.score * 0.1
    );

    const allFindings = categories.flatMap((c) =>
      c.findings.map((f) => ({ ...f, category: isAr ? c.nameAr : c.name }))
    );

    const topPriorities = [
      ...allFindings.filter((f) => f.status === "fail" && f.impact === "high"),
      ...allFindings.filter((f) => f.status === "fail" && f.impact !== "high"),
      ...allFindings.filter((f) => f.status === "warning" && f.impact === "high"),
    ]
      .slice(0, 5)
      .map((f) => ({ category: f.category, detail: f.detail, impact: f.impact || "medium" }));

    const passCount = allFindings.filter((f) => f.status === "pass").length;
    const failCount = allFindings.filter((f) => f.status === "fail").length;
    const warnCount = allFindings.filter((f) => f.status === "warning").length;

    const grade = (s: number) =>
      s >= 80 ? "strong" : s >= 50 ? "needs improvement" : "needs urgent attention";
    const gradeAr = (s: number) =>
      s >= 80 ? "قوي" : s >= 50 ? "يحتاج تحسين" : "يحتاج اهتماماً عاجلاً";

    const summary = isAr
      ? `حصل موقعك على درجة ${overallScore}/١٠٠ بشكل عام، مع ${passCount} فحصاً ناجحاً، و${warnCount} تحذيراً، و${failCount} مشكلة حرجة. تحسين محركات البحث ${gradeAr(seoCategory.score)}، والأداء ${gradeAr(performanceCategory.score)}، وSEO المحلي ${gradeAr(localCategory.score)}.`
      : `Your website scored ${overallScore}/100 overall with ${passCount} checks passed, ${warnCount} warnings, and ${failCount} critical issues. SEO is ${grade(seoCategory.score)}, performance is ${grade(performanceCategory.score)}, and local SEO is ${grade(localCategory.score)}.`;

    const coreWebVitals = psMobile
      ? {
          lcp: psMobile.lcp,
          lcpMs: psMobile.lcpMs,
          fcp: psMobile.fcp,
          fcpMs: psMobile.fcpMs,
          cls: psMobile.cls,
          clsValue: psMobile.clsValue,
          tbt: psMobile.tbt,
          tbtMs: psMobile.tbtMs,
          si: psMobile.si,
          performanceScore: psMobile.performanceScore,
          accessibilityScore: psMobile.accessibilityScore,
          bestPracticesScore: psMobile.bestPracticesScore,
          seoScore: psMobile.seoScore,
          desktopScore: psDesktop?.performanceScore ?? null,
          screenshot: psMobile.screenshot,
        }
      : null;

    const technologies = detectTechnologies(siteData.html);

    let competitorComparison = null;
    if (competitor) {
      const cSeo = scoreSEO(competitor);
      const cContent = scoreContent(competitor);
      const cLocal = scoreLocalSEO(competitor);
      const cSocial = scoreSocial(competitor);
      competitorComparison = {
        url: competitorUrl,
        overallScore: Math.round(
          cSeo.score * 0.3 + cContent.score * 0.25 + cLocal.score * 0.25 + cSocial.score * 0.2
        ),
        seoScore: cSeo.score,
        contentScore: cContent.score,
        localScore: cLocal.score,
        socialScore: cSocial.score,
      };
    }

    return NextResponse.json({
      overallScore,
      url: siteData.finalUrl,
      statusCode: siteData.statusCode,
      loadTimeMs: siteData.loadTime,
      categories,
      topPriorities,
      summary,
      coreWebVitals,
      technologies,
      competitorComparison,
      totalChecks: allFindings.length,
      passed: passCount,
      warnings: warnCount,
      failed: failCount,
    });
  } catch (error: unknown) {
    console.error("Audit error:", error);
    const msg = error instanceof Error ? error.message : "Could not analyze website.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}

// ─── HTML Fetch & Parse ───────────────────────────────────────────────────────

async function fetchAndParseHTML(targetUrl: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const startTime = Date.now();
  const response = await fetch(targetUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9,ar;q=0.8",
    },
    signal: controller.signal,
    redirect: "follow",
  });
  clearTimeout(timeout);
  const loadTime = Date.now() - startTime;
  const html = await response.text();
  const $ = cheerio.load(html);

  const title = $("title").text().trim();
  const metaDesc = $('meta[name="description"]').attr("content")?.trim() || "";
  const metaKeywords = $('meta[name="keywords"]').attr("content")?.trim() || "";
  const h1Tags = $("h1").map((_, el) => $(el).text().trim()).get();
  const h2Tags = $("h2").map((_, el) => $(el).text().trim()).get();
  const h3Tags = $("h3").map((_, el) => $(el).text().trim()).get();
  const canonicalTag = $('link[rel="canonical"]').attr("href") || "";
  const robotsMeta = $('meta[name="robots"]').attr("content") || "";
  const hreflangTags = $("link[hreflang]")
    .map((_, el) => ({ lang: $(el).attr("hreflang"), href: $(el).attr("href") }))
    .get();

  const imgTags = $("img");
  const imgsWithAlt = $("img[alt]").filter(
    (_, el) => ($(el).attr("alt")?.trim() || "") !== ""
  );
  const imgsWithDimensions = $("img[width][height]").length;
  const imgsWithLazy = $('img[loading="lazy"]').length;

  const urlObj = new URL(targetUrl);
  const internalLinkUrls: string[] = [];
  const externalLinkUrls: string[] = [];

  $("a[href]").each((_, el) => {
    const href = $(el).attr("href") || "";
    if (href.startsWith("/") || href.includes(urlObj.hostname)) {
      const full = href.startsWith("/") ? `${urlObj.origin}${href}` : href;
      if (!internalLinkUrls.includes(full)) internalLinkUrls.push(full);
    } else if (href.startsWith("http")) {
      externalLinkUrls.push(href);
    }
  });

  const ogTitle = $('meta[property="og:title"]').attr("content") || "";
  const ogDesc = $('meta[property="og:description"]').attr("content") || "";
  const ogImage = $('meta[property="og:image"]').attr("content") || "";
  const twitterCard = $('meta[name="twitter:card"]').attr("content") || "";

  const schemaScripts = $('script[type="application/ld+json"]');
  const schemaTypes: string[] = [];
  schemaScripts.each((_, el) => {
    try {
      const json = JSON.parse($(el).html() || "{}");
      if (json["@type"]) schemaTypes.push(json["@type"]);
      if (json["@graph"])
        json["@graph"].forEach((item: Record<string, unknown>) => {
          if (item["@type"]) schemaTypes.push(item["@type"] as string);
        });
    } catch {}
  });

  const hasViewport = $('meta[name="viewport"]').length > 0;
  const viewportContent = $('meta[name="viewport"]').attr("content") || "";
  const hasFavicon =
    $('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').length > 0;
  const htmlLang = $("html").attr("lang") || "";
  const hasCharset = $("meta[charset]").length > 0 || html.includes("charset=");
  const htmlSizeKB = Math.round(html.length / 1024);
  const cssFiles = $('link[rel="stylesheet"]').length;
  const jsFiles = $("script[src]").length;
  const inlineStyles = $("[style]").length;
  const hasHttps = targetUrl.startsWith("https") || response.url.startsWith("https");
  const hasDeferScripts = $("script[defer]").length;
  const hasAsyncScripts = $("script[async]").length;
  const imgsWithLazyCount = imgsWithLazy;

  const hasGoogleAnalytics =
    /(gtag|google-analytics|googletagmanager|G-[A-Z0-9]+|GTM-[A-Z0-9]+)/i.test(html);
  const hasGoogleAds = /(AW-[0-9]+|google_conversion|googleads)/i.test(html);
  const hasMetaPixel = /(fbq|facebook\.com\/tr|connect\.facebook\.net)/i.test(html);
  const hasTikTokPixel = /(analytics\.tiktok|ttq\.load)/i.test(html);
  const hasSnapPixel = /(sc-static\.net\/scevent|snaptr)/i.test(html);
  const hasHotjar = /hotjar/i.test(html);
  const hasClarityMS = /clarity\.ms/i.test(html);

  const bodyText = $("body").text().replace(/\s+/g, " ").trim();
  const wordCount = bodyText.split(" ").filter((w) => w.length > 2).length;
  const paragraphs = $("p").length;
  const hasContactInfo =
    /(\+\d{1,3}[\s-]?\d+|email|phone|whatsapp|واتساب|هاتف|البريد)/i.test(html);
  const hasCTA =
    /(contact|call|whatsapp|get started|free|book|schedule|order|buy|sign up|register|احصل|تواصل|اتصل|مجان|اطلب|سجل)/i.test(
      html
    );
  const hasWhatsApp = /wa\.me|whatsapp|واتساب/i.test(html);
  const hasArabic = /[\u0600-\u06FF]{5,}/g.test(html);
  const hasPhoneNumber =
    /(\+?\d{1,3}[\s-]?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{3,4})/g.test(html);

  const socialLinks = {
    facebook: /facebook\.com\//i.test(html),
    instagram: /instagram\.com\//i.test(html),
    twitter: /(twitter\.com|x\.com)\//i.test(html),
    linkedin: /linkedin\.com\//i.test(html),
    youtube: /youtube\.com\//i.test(html),
    tiktok: /tiktok\.com\//i.test(html),
    snapchat: /snapchat\.com\//i.test(html),
  };

  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });

  return {
    html,
    finalUrl: response.url,
    statusCode: response.status,
    loadTime,
    title,
    metaDesc,
    metaKeywords,
    h1Tags,
    h2Tags,
    h3Tags,
    canonicalTag,
    robotsMeta,
    hreflangTags,
    imgCount: imgTags.length,
    imgsWithAlt: imgsWithAlt.length,
    imgsWithDimensions,
    imgsWithLazy: imgsWithLazyCount,
    internalLinkUrls,
    externalLinkUrls,
    internalLinkCount: internalLinkUrls.length,
    externalLinkCount: externalLinkUrls.length,
    ogTitle,
    ogDesc,
    ogImage,
    twitterCard,
    schemaTypes,
    hasViewport,
    viewportContent,
    hasFavicon,
    htmlLang,
    hasCharset,
    htmlSizeKB,
    cssFiles,
    jsFiles,
    inlineStyles,
    hasHttps,
    hasDeferScripts,
    hasAsyncScripts,
    hasGoogleAnalytics,
    hasGoogleAds,
    hasMetaPixel,
    hasTikTokPixel,
    hasSnapPixel,
    hasHotjar,
    hasClarityMS,
    wordCount,
    paragraphs,
    hasContactInfo,
    hasCTA,
    hasWhatsApp,
    hasArabic,
    hasPhoneNumber,
    socialLinks,
    headers,
  };
}

// ─── Google PageSpeed API ─────────────────────────────────────────────────────

async function fetchPageSpeed(url: string, strategy: "mobile" | "desktop") {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (!apiKey) return null;

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${apiKey}&category=performance&category=accessibility&category=best-practices&category=seo`;
    const response = await fetch(apiUrl, { signal: AbortSignal.timeout(25000) });
    if (!response.ok) return null;

    const data = await response.json();
    const lhr = data.lighthouseResult;

    return {
      performanceScore: Math.round((lhr?.categories?.performance?.score || 0) * 100),
      accessibilityScore: Math.round((lhr?.categories?.accessibility?.score || 0) * 100),
      bestPracticesScore: Math.round((lhr?.categories?.["best-practices"]?.score || 0) * 100),
      seoScore: Math.round((lhr?.categories?.seo?.score || 0) * 100),
      lcp: lhr?.audits?.["largest-contentful-paint"]?.displayValue || "N/A",
      lcpMs: lhr?.audits?.["largest-contentful-paint"]?.numericValue || 0,
      fcp: lhr?.audits?.["first-contentful-paint"]?.displayValue || "N/A",
      fcpMs: lhr?.audits?.["first-contentful-paint"]?.numericValue || 0,
      cls: lhr?.audits?.["cumulative-layout-shift"]?.displayValue || "N/A",
      clsValue: lhr?.audits?.["cumulative-layout-shift"]?.numericValue || 0,
      tbt: lhr?.audits?.["total-blocking-time"]?.displayValue || "N/A",
      tbtMs: lhr?.audits?.["total-blocking-time"]?.numericValue || 0,
      si: lhr?.audits?.["speed-index"]?.displayValue || "N/A",
      siMs: lhr?.audits?.["speed-index"]?.numericValue || 0,
      screenshot: data.lighthouseResult?.audits?.["final-screenshot"]?.details?.data || "",
      strategy,
    };
  } catch {
    return null;
  }
}

// ─── SSL Check ────────────────────────────────────────────────────────────────

async function checkSSL(url: string) {
  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== "https:")
      return { valid: false, reason: "Site does not use HTTPS" };
    const response = await fetch(url, {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
      redirect: "follow",
    });
    return {
      valid: true,
      protocol: response.url.startsWith("https") ? "HTTPS" : "HTTP",
      redirectedTo: response.url !== url ? response.url : null,
    };
  } catch (error: unknown) {
    return { valid: false, reason: error instanceof Error ? error.message : "SSL check failed" };
  }
}

// ─── Broken Link Check ────────────────────────────────────────────────────────

async function checkBrokenLinks(urls: string[], baseUrl: string) {
  const results: Array<{ url: string; status: number | "error"; broken: boolean }> = [];
  const checks = urls.slice(0, 20).map(async (linkUrl) => {
    try {
      const fullUrl = linkUrl.startsWith("http") ? linkUrl : new URL(linkUrl, baseUrl).href;
      const res = await fetch(fullUrl, {
        method: "HEAD",
        signal: AbortSignal.timeout(5000),
        redirect: "follow",
        headers: { "User-Agent": "LCS-LinkChecker/1.0" },
      });
      results.push({ url: linkUrl, status: res.status, broken: res.status >= 400 });
    } catch {
      results.push({ url: linkUrl, status: "error", broken: true });
    }
  });
  await Promise.allSettled(checks);
  return results;
}

// ─── Technology Detection ─────────────────────────────────────────────────────

function detectTechnologies(html: string): string[] {
  const techs: string[] = [];
  if (/__next/i.test(html)) techs.push("Next.js");
  else if (/nuxt/i.test(html)) techs.push("Nuxt.js");
  else if (/gatsby/i.test(html)) techs.push("Gatsby");
  else if (/__react/i.test(html) || /react/i.test(html)) techs.push("React");
  else if (/v-if|v-for/i.test(html)) techs.push("Vue.js");
  else if (/ng-/i.test(html)) techs.push("Angular");

  if (/wp-content|wordpress/i.test(html)) techs.push("WordPress");
  if (/shopify/i.test(html)) techs.push("Shopify");
  if (/wix\.com/i.test(html)) techs.push("Wix");
  if (/squarespace/i.test(html)) techs.push("Squarespace");
  if (/webflow/i.test(html)) techs.push("Webflow");
  if (/salla\.sa|salla\.network/i.test(html)) techs.push("Salla");
  if (/zid\.sa|zid\.store/i.test(html)) techs.push("Zid");

  if (/tailwind/i.test(html)) techs.push("Tailwind CSS");
  if (/bootstrap/i.test(html)) techs.push("Bootstrap");
  if (/jquery/i.test(html)) techs.push("jQuery");

  if (/cloudflare/i.test(html)) techs.push("Cloudflare");
  if (/vercel/i.test(html)) techs.push("Vercel");
  if (/netlify/i.test(html)) techs.push("Netlify");
  if (/amazonaws/i.test(html)) techs.push("AWS");

  if (/gtag|googletagmanager/i.test(html)) techs.push("Google Tag Manager");
  if (/google-analytics|G-[A-Z0-9]+/i.test(html)) techs.push("Google Analytics");
  if (/hotjar/i.test(html)) techs.push("Hotjar");
  if (/clarity\.ms/i.test(html)) techs.push("Microsoft Clarity");
  if (/hubspot/i.test(html)) techs.push("HubSpot");
  if (/tawk\.to/i.test(html)) techs.push("Tawk.to");
  if (/crisp/i.test(html)) techs.push("Crisp Chat");

  return techs;
}

// ─── Scoring Functions ────────────────────────────────────────────────────────

function scoreSEO(data: ReturnType<typeof fetchAndParseHTML> extends Promise<infer T> ? T : never, isAr = false): CategoryResult {
  let score = 0;
  const findings: Finding[] = [];

  if (data.title && data.title.length >= 30 && data.title.length <= 60) {
    score += 12;
    findings.push({ check: a(isAr, "وسم العنوان", "Title Tag"), status: "pass", detail: a(isAr, `عنوان ممتاز (${data.title.length} حرفاً): "${data.title.substring(0, 60)}"`, `Good title (${data.title.length} chars): "${data.title.substring(0, 60)}"`), impact: "high" });
  } else if (data.title) {
    score += 5;
    findings.push({ check: a(isAr, "وسم العنوان", "Title Tag"), status: "warning", detail: a(isAr, `العنوان ${data.title.length} حرفاً — المثالي ٣٠–٦٠ حرفاً.`, `Title is ${data.title.length} chars — optimal is 30–60.`), impact: "high" });
  } else {
    findings.push({ check: a(isAr, "وسم العنوان", "Title Tag"), status: "fail", detail: a(isAr, "وسم العنوان مفقود — مهم جداً لترتيب الموقع في جوجل.", "Missing title tag — critical for search rankings."), impact: "high" });
  }

  if (data.metaDesc && data.metaDesc.length >= 120 && data.metaDesc.length <= 160) {
    score += 10;
    findings.push({ check: a(isAr, "الوصف التعريفي", "Meta Description"), status: "pass", detail: a(isAr, `وصف ممتاز (${data.metaDesc.length} حرفاً).`, `Good description (${data.metaDesc.length} chars).`), impact: "high" });
  } else if (data.metaDesc) {
    score += 4;
    findings.push({ check: a(isAr, "الوصف التعريفي", "Meta Description"), status: "warning", detail: a(isAr, `الوصف ${data.metaDesc.length} حرفاً — المثالي ١٢٠–١٦٠ حرفاً.`, `Description is ${data.metaDesc.length} chars — optimal is 120–160.`), impact: "high" });
  } else {
    findings.push({ check: a(isAr, "الوصف التعريفي", "Meta Description"), status: "fail", detail: a(isAr, "الوصف التعريفي مفقود — يظهر في نتائج جوجل.", "Missing meta description — shows in Google search results."), impact: "high" });
  }

  if (data.h1Tags.length === 1) {
    score += 10;
    findings.push({ check: a(isAr, "عنوان H1", "H1 Heading"), status: "pass", detail: a(isAr, `عنوان H1 واحد: "${data.h1Tags[0].substring(0, 50)}"`, `One H1: "${data.h1Tags[0].substring(0, 50)}"`), impact: "high" });
  } else if (data.h1Tags.length > 1) {
    score += 4;
    findings.push({ check: a(isAr, "عنوان H1", "H1 Heading"), status: "warning", detail: a(isAr, `وُجد ${data.h1Tags.length} عناوين H1 — يجب أن يكون واحداً فقط.`, `${data.h1Tags.length} H1 tags found — should be exactly one.`), impact: "medium" });
  } else {
    findings.push({ check: a(isAr, "عنوان H1", "H1 Heading"), status: "fail", detail: a(isAr, "لا يوجد عنوان H1. كل صفحة تحتاج عنواناً رئيسياً واحداً.", "No H1 heading. Every page needs one primary heading."), impact: "high" });
  }

  if (data.h2Tags.length >= 3) {
    score += 8;
    findings.push({ check: a(isAr, "بنية العناوين", "Heading Structure"), status: "pass", detail: a(isAr, `${data.h1Tags.length} H1، ${data.h2Tags.length} H2، ${data.h3Tags.length} H3.`, `${data.h1Tags.length} H1, ${data.h2Tags.length} H2, ${data.h3Tags.length} H3.`), impact: "medium" });
  } else if (data.h2Tags.length >= 1) {
    score += 4;
    findings.push({ check: a(isAr, "بنية العناوين", "Heading Structure"), status: "warning", detail: a(isAr, `${data.h2Tags.length} عناوين H2 فقط — أضف المزيد لتنظيم المحتوى.`, `Only ${data.h2Tags.length} H2 headings — add more to structure content.`), impact: "medium" });
  } else {
    findings.push({ check: a(isAr, "بنية العناوين", "Heading Structure"), status: "fail", detail: a(isAr, "لا توجد عناوين H2. استخدم العناوين لتنظيم المحتوى.", "No H2 headings. Use headings to organise content."), impact: "medium" });
  }

  if (data.imgCount === 0) {
    score += 4;
    findings.push({ check: a(isAr, "النصوص البديلة للصور", "Image Alt Tags"), status: "warning", detail: a(isAr, "لا توجد صور.", "No images found."), impact: "low" });
  } else {
    const missing = data.imgCount - data.imgsWithAlt;
    if (missing === 0) {
      score += 8;
      findings.push({ check: a(isAr, "النصوص البديلة للصور", "Image Alt Tags"), status: "pass", detail: a(isAr, `جميع ${data.imgCount} صور تحتوي على نص بديل.`, `All ${data.imgCount} images have alt text.`), impact: "medium" });
    } else {
      score += Math.round((data.imgsWithAlt / data.imgCount) * 8);
      findings.push({ check: a(isAr, "النصوص البديلة للصور", "Image Alt Tags"), status: missing > 3 ? "fail" : "warning", detail: a(isAr, `${missing} من ${data.imgCount} صور تفتقر للنص البديل.`, `${missing} of ${data.imgCount} images missing alt text.`), impact: "medium" });
    }
  }

  if (data.canonicalTag) {
    score += 8;
    findings.push({ check: a(isAr, "وسم Canonical", "Canonical Tag"), status: "pass", detail: a(isAr, "رابط Canonical محدد.", "Canonical URL set."), impact: "medium" });
  } else {
    score += 2;
    findings.push({ check: a(isAr, "وسم Canonical", "Canonical Tag"), status: "warning", detail: a(isAr, "لا يوجد وسم Canonical — أضفه لتجنب تكرار المحتوى.", "No canonical tag — add to prevent duplicate content."), impact: "medium" });
  }

  if (data.hasHttps) {
    score += 10;
    findings.push({ check: "HTTPS", status: "pass", detail: a(isAr, "اتصال HTTPS آمن.", "Secure HTTPS connection."), impact: "high" });
  } else {
    findings.push({ check: "HTTPS", status: "fail", detail: a(isAr, "لا يوجد HTTPS — مهم جداً للترتيب وثقة الزوار.", "No HTTPS — critical for rankings and user trust."), impact: "high" });
  }

  if (data.schemaTypes.length > 0) {
    score += 8;
    findings.push({ check: a(isAr, "البيانات المنظمة Schema", "Schema Markup"), status: "pass", detail: a(isAr, `بيانات منظمة: ${data.schemaTypes.join("، ")}.`, `Structured data: ${data.schemaTypes.join(", ")}.`), impact: "medium" });
  } else {
    score += 1;
    findings.push({ check: a(isAr, "البيانات المنظمة Schema", "Schema Markup"), status: "warning", detail: a(isAr, "لا توجد بيانات منظمة. أضف JSON-LD للنتائج المميزة في جوجل.", "No structured data. Add JSON-LD for rich search results."), impact: "medium" });
  }

  if (data.internalLinkCount >= 10) {
    score += 8;
    findings.push({ check: a(isAr, "الروابط الداخلية", "Internal Links"), status: "pass", detail: a(isAr, `${data.internalLinkCount} رابطاً داخلياً — هيكل موقع جيد.`, `${data.internalLinkCount} internal links — good site structure.`), impact: "medium" });
  } else if (data.internalLinkCount >= 3) {
    score += 4;
    findings.push({ check: a(isAr, "الروابط الداخلية", "Internal Links"), status: "warning", detail: a(isAr, `${data.internalLinkCount} روابط داخلية فقط.`, `Only ${data.internalLinkCount} internal links.`), impact: "medium" });
  } else {
    findings.push({ check: a(isAr, "الروابط الداخلية", "Internal Links"), status: "fail", detail: a(isAr, "روابط داخلية قليلة جداً — مهمة جداً لـ SEO.", "Very few internal links — critical for SEO."), impact: "high" });
  }

  if (data.hreflangTags.length > 0) {
    score += 6;
    findings.push({ check: a(isAr, "وسوم Hreflang", "Hreflang"), status: "pass", detail: a(isAr, `${data.hreflangTags.length} وسوم Hreflang — SEO متعدد اللغات مفعّل.`, `${data.hreflangTags.length} hreflang tags — multilingual SEO configured.`), impact: "medium" });
  } else {
    findings.push({ check: a(isAr, "وسوم Hreflang", "Hreflang"), status: "warning", detail: a(isAr, "لا توجد وسوم Hreflang. أضفها إذا كنت تخدم أكثر من لغة.", "No hreflang tags. Add if you serve multiple languages."), impact: "low" });
  }

  if (data.robotsMeta.includes("noindex")) {
    findings.push({ check: a(isAr, "وسم Robots", "Robots Meta"), status: "fail", detail: a(isAr, "الصفحة معيّنة على NOINDEX — لن تظهر في جوجل!", "Page is set to NOINDEX — it will NOT appear in Google!"), impact: "high" });
  } else {
    score += 5;
    findings.push({ check: a(isAr, "وسم Robots", "Robots Meta"), status: "pass", detail: a(isAr, "الصفحة قابلة للفهرسة في محركات البحث.", "Page is indexable by search engines."), impact: "high" });
  }

  if (data.title && data.metaDesc && data.h1Tags[0]) {
    score += 7;
    findings.push({ check: a(isAr, "تناسق المحتوى", "Content Alignment"), status: "pass", detail: a(isAr, "العنوان والوصف وH1 جميعها موجودة.", "Title, description, and H1 all present."), impact: "medium" });
  }

  return { name: "SEO", nameAr: "تحسين محركات البحث", icon: "🔍", score: Math.min(score, 100), status: score >= 70 ? "good" : score >= 40 ? "warning" : "critical", findings };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scorePerformance(data: any, psMobile: any, psDesktop: any, isAr = false): CategoryResult {
  let score = 0;
  const findings: Finding[] = [];

  if (psMobile) {
    const ps = psMobile.performanceScore;
    if (ps >= 90) { score += 35; findings.push({ check: a(isAr, "PageSpeed (جوال)", "PageSpeed (Mobile)"), status: "pass", detail: a(isAr, `ممتاز: ${ps}/١٠٠.`, `Excellent: ${ps}/100.`), impact: "high" }); }
    else if (ps >= 50) { score += 20; findings.push({ check: a(isAr, "PageSpeed (جوال)", "PageSpeed (Mobile)"), status: "warning", detail: a(isAr, `يحتاج تحسيناً: ${ps}/١٠٠. المستهدف ٩٠+.`, `Needs improvement: ${ps}/100. Target 90+.`), impact: "high" }); }
    else { score += 5; findings.push({ check: a(isAr, "PageSpeed (جوال)", "PageSpeed (Mobile)"), status: "fail", detail: a(isAr, `ضعيف: ${ps}/١٠٠ — مشاكل أداء خطيرة.`, `Poor: ${ps}/100 — serious performance issues.`), impact: "high" }); }

    if (psMobile.lcpMs < 2500) { score += 15; findings.push({ check: "LCP", status: "pass", detail: a(isAr, `LCP: ${psMobile.lcp} — تحميل سريع.`, `LCP: ${psMobile.lcp} — fast loading.`), impact: "high" }); }
    else if (psMobile.lcpMs < 4000) { score += 8; findings.push({ check: "LCP", status: "warning", detail: a(isAr, `LCP: ${psMobile.lcp} — المستهدف أقل من ٢.٥ ثانية.`, `LCP: ${psMobile.lcp} — target under 2.5s.`), impact: "high" }); }
    else { findings.push({ check: "LCP", status: "fail", detail: a(isAr, `LCP: ${psMobile.lcp} — بطيء جداً. الزوار يغادرون.`, `LCP: ${psMobile.lcp} — too slow. Users are leaving.`), impact: "high" }); }

    if (psMobile.fcpMs < 1800) { score += 10; findings.push({ check: "FCP", status: "pass", detail: `FCP: ${psMobile.fcp}.`, impact: "medium" }); }
    else if (psMobile.fcpMs < 3000) { score += 5; findings.push({ check: "FCP", status: "warning", detail: a(isAr, `FCP: ${psMobile.fcp} — المستهدف أقل من ١.٨ ثانية.`, `FCP: ${psMobile.fcp} — target under 1.8s.`), impact: "medium" }); }
    else { findings.push({ check: "FCP", status: "fail", detail: a(isAr, `FCP: ${psMobile.fcp} — بطيء جداً.`, `FCP: ${psMobile.fcp} — too slow.`), impact: "medium" }); }

    if (psMobile.clsValue < 0.1) { score += 10; findings.push({ check: "CLS", status: "pass", detail: a(isAr, `CLS: ${psMobile.cls} — تخطيط مستقر.`, `CLS: ${psMobile.cls} — stable layout.`), impact: "medium" }); }
    else if (psMobile.clsValue < 0.25) { score += 5; findings.push({ check: "CLS", status: "warning", detail: a(isAr, `CLS: ${psMobile.cls} — اهتزاز خفيف في التخطيط.`, `CLS: ${psMobile.cls} — some layout shift.`), impact: "medium" }); }
    else { findings.push({ check: "CLS", status: "fail", detail: a(isAr, `CLS: ${psMobile.cls} — اهتزاز كبير في التخطيط.`, `CLS: ${psMobile.cls} — significant layout shift.`), impact: "medium" }); }

    if (psMobile.tbtMs < 200) { score += 10; findings.push({ check: "TBT", status: "pass", detail: `TBT: ${psMobile.tbt}.`, impact: "medium" }); }
    else if (psMobile.tbtMs < 600) { score += 5; findings.push({ check: "TBT", status: "warning", detail: a(isAr, `TBT: ${psMobile.tbt} — قلل حجب JavaScript.`, `TBT: ${psMobile.tbt} — reduce JavaScript blocking.`), impact: "medium" }); }
    else { findings.push({ check: "TBT", status: "fail", detail: a(isAr, `TBT: ${psMobile.tbt} — حجب JavaScript شديد.`, `TBT: ${psMobile.tbt} — heavy JavaScript blocking.`), impact: "high" }); }

    if (psDesktop) {
      findings.push({ check: a(isAr, "PageSpeed (سطح المكتب)", "PageSpeed (Desktop)"), status: psDesktop.performanceScore >= 90 ? "pass" : psDesktop.performanceScore >= 50 ? "warning" : "fail", detail: a(isAr, `نتيجة سطح المكتب: ${psDesktop.performanceScore}/١٠٠.`, `Desktop score: ${psDesktop.performanceScore}/100.`), impact: "medium" });
      if (psDesktop.performanceScore >= 90) score += 5;
      else if (psDesktop.performanceScore >= 50) score += 2;
    }
  } else {
    if (data.loadTime < 2000) { score += 40; findings.push({ check: a(isAr, "استجابة الخادم", "Server Response"), status: "pass", detail: a(isAr, `وقت الاستجابة: ${data.loadTime} مللي ثانية.`, `Response: ${data.loadTime}ms.`), impact: "high" }); }
    else if (data.loadTime < 4000) { score += 20; findings.push({ check: a(isAr, "استجابة الخادم", "Server Response"), status: "warning", detail: a(isAr, `وقت الاستجابة: ${data.loadTime} مللي ثانية — المستهدف أقل من ٢ ثوانٍ.`, `Response: ${data.loadTime}ms — target under 2s.`), impact: "high" }); }
    else { findings.push({ check: a(isAr, "استجابة الخادم", "Server Response"), status: "fail", detail: a(isAr, `وقت الاستجابة: ${data.loadTime} مللي ثانية — بطيء جداً.`, `Response: ${data.loadTime}ms — too slow.`), impact: "high" }); }
    findings.push({ check: "PageSpeed API", status: "warning", detail: a(isAr, "بيانات PageSpeed غير متاحة — نستخدم وقت الاستجابة فقط.", "PageSpeed data unavailable — using server response time only."), impact: "low" });
  }

  if (data.htmlSizeKB < 100) { score += 5; findings.push({ check: a(isAr, "حجم الصفحة", "Page Size"), status: "pass", detail: a(isAr, `حجم HTML: ${data.htmlSizeKB} كيلوبايت — خفيف.`, `HTML: ${data.htmlSizeKB}KB — lightweight.`), impact: "medium" }); }
  else if (data.htmlSizeKB < 300) { score += 2; findings.push({ check: a(isAr, "حجم الصفحة", "Page Size"), status: "warning", detail: a(isAr, `حجم HTML: ${data.htmlSizeKB} كيلوبايت.`, `HTML: ${data.htmlSizeKB}KB.`), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "حجم الصفحة", "Page Size"), status: "fail", detail: a(isAr, `حجم HTML: ${data.htmlSizeKB} كيلوبايت — ثقيل جداً.`, `HTML: ${data.htmlSizeKB}KB — too heavy.`), impact: "medium" }); }

  const totalRes = data.cssFiles + data.jsFiles;
  if (totalRes <= 15) { score += 5; findings.push({ check: a(isAr, "عدد الملفات", "Resource Count"), status: "pass", detail: a(isAr, `${data.cssFiles} ملف CSS + ${data.jsFiles} ملف JavaScript.`, `${data.cssFiles} CSS + ${data.jsFiles} JS files.`), impact: "low" }); }
  else if (totalRes <= 30) { score += 2; findings.push({ check: a(isAr, "عدد الملفات", "Resource Count"), status: "warning", detail: a(isAr, `${totalRes} ملفاً — اجمع الملفات لتسريع الموقع.`, `${totalRes} total resources — consider bundling.`), impact: "low" }); }
  else { findings.push({ check: a(isAr, "عدد الملفات", "Resource Count"), status: "fail", detail: a(isAr, `${totalRes} ملفاً — طلبات HTTP كثيرة جداً.`, `${totalRes} resources — too many HTTP requests.`), impact: "medium" }); }

  return { name: "Performance", nameAr: "الأداء", icon: "⚡", score: Math.min(score, 100), status: score >= 70 ? "good" : score >= 40 ? "warning" : "critical", findings };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreMobile(data: any, psMobile: any, isAr = false): CategoryResult {
  let score = 0;
  const findings: Finding[] = [];

  if (data.hasViewport) { score += 25; findings.push({ check: a(isAr, "وسم Viewport", "Viewport Meta"), status: "pass", detail: a(isAr, "وسم Viewport موجود.", "Viewport tag present."), impact: "high" }); }
  else { findings.push({ check: a(isAr, "وسم Viewport", "Viewport Meta"), status: "fail", detail: a(isAr, "وسم Viewport مفقود — الصفحة لن تتكيف مع الجوال.", "Missing viewport tag — page won't scale on mobile."), impact: "high" }); }

  if (data.viewportContent.includes("width=device-width")) { score += 10; findings.push({ check: a(isAr, "عرض متجاوب", "Responsive Viewport"), status: "pass", detail: a(isAr, "Viewport مضبوط بشكل صحيح لعرض الجهاز.", "Viewport correctly set to device width."), impact: "high" }); }

  if (data.imgsWithLazy > 0) { score += 15; findings.push({ check: a(isAr, "التحميل الكسول", "Lazy Loading"), status: "pass", detail: a(isAr, `${data.imgsWithLazy} صور تستخدم التحميل الكسول.`, `${data.imgsWithLazy} images use lazy loading.`), impact: "medium" }); }
  else if (data.imgCount > 3) { findings.push({ check: a(isAr, "التحميل الكسول", "Lazy Loading"), status: "warning", detail: a(isAr, `${data.imgCount} صور بدون تحميل كسول.`, `${data.imgCount} images without lazy loading.`), impact: "medium" }); }
  else { score += 10; }

  if (data.imgsWithDimensions > 0) { score += 10; findings.push({ check: a(isAr, "أبعاد الصور", "Image Dimensions"), status: "pass", detail: a(isAr, "الصور لديها أبعاد محددة — يمنع اهتزاز التخطيط.", "Images have width/height — prevents layout shift."), impact: "medium" }); }
  else if (data.imgCount > 0) { findings.push({ check: a(isAr, "أبعاد الصور", "Image Dimensions"), status: "warning", detail: a(isAr, "الصور بدون أبعاد — يسبب اهتزاز التخطيط.", "Images missing width/height — causes layout shift."), impact: "medium" }); }

  if (data.hasFavicon) { score += 5; findings.push({ check: a(isAr, "أيقونة الموقع", "Favicon"), status: "pass", detail: a(isAr, "أيقونة الموقع موجودة.", "Favicon found."), impact: "low" }); }
  else { findings.push({ check: a(isAr, "أيقونة الموقع", "Favicon"), status: "warning", detail: a(isAr, "لا توجد أيقونة. أضفها لتمييز علامة التبويب.", "No favicon. Add for browser tab branding."), impact: "low" }); }

  if (data.htmlLang) { score += 5; findings.push({ check: a(isAr, "خاصية اللغة", "Language Attribute"), status: "pass", detail: `lang="${data.htmlLang}"`, impact: "low" }); }
  else { findings.push({ check: a(isAr, "خاصية اللغة", "Language Attribute"), status: "warning", detail: a(isAr, "لا توجد خاصية lang في وسم HTML.", "No lang attribute on HTML tag."), impact: "low" }); }

  if (data.hasCharset) { score += 5; findings.push({ check: a(isAr, "ترميز الأحرف", "Character Encoding"), status: "pass", detail: a(isAr, "ترميز الأحرف محدد.", "Charset declared."), impact: "low" }); }

  if (data.hasWhatsApp) { score += 10; findings.push({ check: a(isAr, "زر واتساب", "WhatsApp CTA"), status: "pass", detail: a(isAr, "رابط واتساب — تواصل سهل من الجوال.", "WhatsApp link — easy mobile contact."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "زر واتساب", "WhatsApp CTA"), status: "warning", detail: a(isAr, "لا يوجد واتساب — وسيلة التواصل الأولى في السعودية.", "No WhatsApp — #1 contact method on mobile in Saudi Arabia."), impact: "medium" }); }

  if (data.hasPhoneNumber) { score += 10; findings.push({ check: a(isAr, "الاتصال بنقرة", "Click-to-Call"), status: "pass", detail: a(isAr, "رقم الهاتف موجود — اتصل بنقرة.", "Phone number found — tap to call."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "الاتصال بنقرة", "Click-to-Call"), status: "warning", detail: a(isAr, "لا يوجد رقم هاتف للمستخدمين على الجوال.", "No phone number visible for mobile users."), impact: "medium" }); }

  if (psMobile) {
    if (psMobile.performanceScore >= 50) { score += 5; findings.push({ check: a(isAr, "PageSpeed (جوال)", "Mobile PageSpeed"), status: "pass", detail: a(isAr, `نتيجة الجوال: ${psMobile.performanceScore}/١٠٠.`, `Mobile score: ${psMobile.performanceScore}/100.`), impact: "high" }); }
    else { findings.push({ check: a(isAr, "PageSpeed (جوال)", "Mobile PageSpeed"), status: "fail", detail: a(isAr, `نتيجة الجوال: ${psMobile.performanceScore}/١٠٠ — تجربة جوال ضعيفة.`, `Mobile score: ${psMobile.performanceScore}/100 — poor mobile experience.`), impact: "high" }); }
  }

  return { name: "Mobile Friendliness", nameAr: "التوافق مع الجوال", icon: "📱", score: Math.min(score, 100), status: score >= 70 ? "good" : score >= 40 ? "warning" : "critical", findings };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreContent(data: any, isAr = false): CategoryResult {
  let score = 0;
  const findings: Finding[] = [];

  if (data.wordCount >= 800) { score += 20; findings.push({ check: a(isAr, "عدد الكلمات", "Word Count"), status: "pass", detail: a(isAr, `${data.wordCount} كلمة — محتوى متعمق ممتاز.`, `${data.wordCount} words — excellent depth.`), impact: "medium" }); }
  else if (data.wordCount >= 300) { score += 12; findings.push({ check: a(isAr, "عدد الكلمات", "Word Count"), status: "warning", detail: a(isAr, `${data.wordCount} كلمة — استهدف ٨٠٠+ كلمة لترتيب أفضل.`, `${data.wordCount} words — aim for 800+ for better rankings.`), impact: "medium" }); }
  else { score += 4; findings.push({ check: a(isAr, "عدد الكلمات", "Word Count"), status: "fail", detail: a(isAr, `${data.wordCount} كلمة فقط — المحتوى الخفيف يُرتَّب بشكل سيئ.`, `Only ${data.wordCount} words — thin content ranks poorly.`), impact: "high" }); }

  if (data.hasCTA) { score += 20; findings.push({ check: a(isAr, "دعوة للتصرف", "Call to Action"), status: "pass", detail: a(isAr, "عناصر دعوة للتصرف موجودة.", "CTA elements found."), impact: "high" }); }
  else { findings.push({ check: a(isAr, "دعوة للتصرف", "Call to Action"), status: "fail", detail: a(isAr, "لا توجد دعوة للتصرف. كل صفحة تحتاج توجيه الزوار.", "No call-to-action. Every page should guide visitors to act."), impact: "high" }); }

  if (data.hasContactInfo) { score += 15; findings.push({ check: a(isAr, "معلومات التواصل", "Contact Information"), status: "pass", detail: a(isAr, "معلومات التواصل ظاهرة.", "Contact info visible."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "معلومات التواصل", "Contact Information"), status: "warning", detail: a(isAr, "لا توجد معلومات تواصل ظاهرة.", "No visible contact info."), impact: "medium" }); }

  if (data.paragraphs >= 5) { score += 15; findings.push({ check: a(isAr, "بنية المحتوى", "Content Structure"), status: "pass", detail: a(isAr, `${data.paragraphs} فقرات — محتوى منظم جيداً.`, `${data.paragraphs} paragraphs — well structured.`), impact: "low" }); }
  else if (data.paragraphs >= 2) { score += 8; findings.push({ check: a(isAr, "بنية المحتوى", "Content Structure"), status: "warning", detail: a(isAr, `${data.paragraphs} فقرات فقط.`, `Only ${data.paragraphs} paragraphs.`), impact: "low" }); }
  else { findings.push({ check: a(isAr, "بنية المحتوى", "Content Structure"), status: "fail", detail: a(isAr, "محتوى منظم قليل جداً.", "Very little structured content."), impact: "medium" }); }

  if (data.imgCount >= 3) { score += 10; findings.push({ check: a(isAr, "المحتوى المرئي", "Visual Content"), status: "pass", detail: a(isAr, `${data.imgCount} صور.`, `${data.imgCount} images.`), impact: "low" }); }
  else if (data.imgCount >= 1) { score += 5; findings.push({ check: a(isAr, "المحتوى المرئي", "Visual Content"), status: "warning", detail: a(isAr, `${data.imgCount} صورة فقط.`, `Only ${data.imgCount} image(s).`), impact: "low" }); }
  else { findings.push({ check: a(isAr, "المحتوى المرئي", "Visual Content"), status: "warning", detail: a(isAr, "لا توجد صور. أضف مرئيات لتحسين التفاعل.", "No images. Add visuals to improve engagement."), impact: "low" }); }

  if (data.externalLinkCount >= 1) { score += 10; findings.push({ check: a(isAr, "الروابط الخارجية", "External Links"), status: "pass", detail: a(isAr, `${data.externalLinkCount} روابط خارجية.`, `${data.externalLinkCount} external links.`), impact: "low" }); }

  const tw = data.title ? data.title.split(" ").length : 0;
  if (tw >= 4 && tw <= 12) { score += 10; findings.push({ check: a(isAr, "وضوح العنوان", "Title Readability"), status: "pass", detail: a(isAr, `العنوان يحتوي ${tw} كلمات — سهل القراءة.`, `Title has ${tw} words — easy to read.`), impact: "low" }); }

  return { name: "Content Quality", nameAr: "جودة المحتوى", icon: "📝", score: Math.min(score, 100), status: score >= 70 ? "good" : score >= 40 ? "warning" : "critical", findings };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreLocalSEO(data: any, isAr = false): CategoryResult {
  let score = 0;
  const findings: Finding[] = [];

  if (data.hasPhoneNumber) { score += 15; findings.push({ check: a(isAr, "رقم الهاتف", "Phone Number"), status: "pass", detail: a(isAr, "رقم الهاتف ظاهر.", "Phone number visible."), impact: "high" }); }
  else { findings.push({ check: a(isAr, "رقم الهاتف", "Phone Number"), status: "fail", detail: a(isAr, "لا يوجد رقم هاتف — ضروري للأعمال المحلية.", "No phone number — essential for local businesses."), impact: "high" }); }

  const hasLocation =
    /(riyadh|jeddah|dammam|mecca|medina|saudi|ksa|الرياض|جدة|الدمام|مكة|المدينة|السعودية)/i.test(data.html);
  if (hasLocation) { score += 15; findings.push({ check: a(isAr, "ذكر الموقع الجغرافي", "Location Mentions"), status: "pass", detail: a(isAr, "ذكر المدينة أو الدولة موجود.", "City/country references found."), impact: "high" }); }
  else { findings.push({ check: a(isAr, "ذكر الموقع الجغرافي", "Location Mentions"), status: "warning", detail: a(isAr, "لا يوجد ذكر لموقع جغرافي. اذكر مدينتك لـ SEO المحلي.", "No location references. Mention your city for local SEO."), impact: "high" }); }

  const hasLocalSchema = data.schemaTypes.some((t: string) =>
    /(LocalBusiness|Organization|Restaurant|Store|Service|MedicalBusiness|RealEstateAgent|AutomotiveBusiness|LodgingBusiness|EducationalOrganization)/i.test(t)
  );
  if (hasLocalSchema) { score += 15; findings.push({ check: a(isAr, "Schema النشاط التجاري المحلي", "Local Business Schema"), status: "pass", detail: a(isAr, `Schema المحلي: ${data.schemaTypes.join("، ")}.`, `Local schema: ${data.schemaTypes.join(", ")}.`), impact: "high" }); }
  else if (data.schemaTypes.length > 0) { score += 5; findings.push({ check: a(isAr, "Schema النشاط التجاري المحلي", "Local Business Schema"), status: "warning", detail: a(isAr, "يوجد Schema لكن بدون نوع LocalBusiness.", "Schema found but no LocalBusiness type."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "Schema النشاط التجاري المحلي", "Local Business Schema"), status: "fail", detail: a(isAr, "لا يوجد Schema للنشاط المحلي — ضروري لخرائط جوجل.", "No local business schema — critical for Google Maps."), impact: "high" }); }

  if (data.hasWhatsApp) { score += 15; findings.push({ check: a(isAr, "واتساب", "WhatsApp"), status: "pass", detail: a(isAr, "تكامل واتساب موجود.", "WhatsApp integration found."), impact: "high" }); }
  else { findings.push({ check: a(isAr, "واتساب", "WhatsApp"), status: "warning", detail: a(isAr, "لا يوجد واتساب — القناة الأولى في السعودية.", "No WhatsApp — #1 channel in Saudi Arabia."), impact: "high" }); }

  if (data.hasArabic) { score += 15; findings.push({ check: a(isAr, "المحتوى العربي", "Arabic Content"), status: "pass", detail: a(isAr, "محتوى عربي موجود.", "Arabic content detected."), impact: "high" }); }
  else { findings.push({ check: a(isAr, "المحتوى العربي", "Arabic Content"), status: "warning", detail: a(isAr, "لا يوجد محتوى عربي. ٦٥٪ من بحث السعوديين باللغة العربية.", "No Arabic content. 65% of Saudi searches are in Arabic."), impact: "high" }); }

  if (data.hreflangTags.length > 0) { score += 10; findings.push({ check: a(isAr, "SEO متعدد اللغات", "Multilingual SEO"), status: "pass", detail: a(isAr, `${data.hreflangTags.length} وسوم Hreflang.`, `${data.hreflangTags.length} hreflang tags.`), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "SEO متعدد اللغات", "Multilingual SEO"), status: "warning", detail: a(isAr, "لا توجد وسوم Hreflang. أضفها للاستهداف ثنائي اللغة.", "No hreflang. Add for bilingual targeting."), impact: "medium" }); }

  const hasGBPLink = /(google\.com\/maps|goo\.gl\/maps|maps\.app\.goo)/i.test(data.html);
  if (hasGBPLink) { score += 10; findings.push({ check: a(isAr, "رابط خرائط جوجل", "Google Maps Link"), status: "pass", detail: a(isAr, "رابط خرائط جوجل موجود.", "Google Maps link found."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "رابط خرائط جوجل", "Google Maps Link"), status: "warning", detail: a(isAr, "لا يوجد رابط خرائط جوجل.", "No Google Maps link."), impact: "low" }); }

  const hasAddress =
    /(street|road|district|building|floor|office|حي|شارع|طريق|مبنى|مكتب)/i.test(data.html);
  if (hasAddress) { score += 5; findings.push({ check: a(isAr, "العنوان الفعلي", "Physical Address"), status: "pass", detail: a(isAr, "مؤشرات العنوان موجودة.", "Address indicators found."), impact: "medium" }); }

  return { name: "Local SEO", nameAr: "SEO المحلي", icon: "📍", score: Math.min(score, 100), status: score >= 70 ? "good" : score >= 40 ? "warning" : "critical", findings };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreSocial(data: any, isAr = false): CategoryResult {
  let score = 0;
  const findings: Finding[] = [];

  if (data.ogTitle) { score += 12; findings.push({ check: a(isAr, "عنوان Open Graph", "OG Title"), status: "pass", detail: a(isAr, "عنوان Open Graph محدد.", "Open Graph title set."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "عنوان Open Graph", "OG Title"), status: "fail", detail: a(isAr, "og:title مفقود — الروابط المشاركة تبدو غير احترافية.", "Missing og:title — shared links look unprofessional."), impact: "medium" }); }

  if (data.ogDesc) { score += 10; findings.push({ check: a(isAr, "وصف Open Graph", "OG Description"), status: "pass", detail: a(isAr, "وصف Open Graph محدد.", "OG description set."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "وصف Open Graph", "OG Description"), status: "fail", detail: a(isAr, "og:description مفقود.", "Missing og:description."), impact: "medium" }); }

  if (data.ogImage) { score += 15; findings.push({ check: a(isAr, "صورة Open Graph", "OG Image"), status: "pass", detail: a(isAr, "صورة المشاركة الاجتماعية محددة.", "Social sharing image set."), impact: "high" }); }
  else { findings.push({ check: a(isAr, "صورة Open Graph", "OG Image"), status: "fail", detail: a(isAr, "og:image مفقود — لا معاينة عند مشاركة الرابط.", "Missing og:image — no preview when link is shared."), impact: "high" }); }

  if (data.twitterCard) { score += 8; findings.push({ check: a(isAr, "بطاقة Twitter/X", "Twitter Card"), status: "pass", detail: a(isAr, `نوع البطاقة: ${data.twitterCard}.`, `Card type: ${data.twitterCard}.`), impact: "low" }); }
  else { findings.push({ check: a(isAr, "بطاقة Twitter/X", "Twitter Card"), status: "warning", detail: a(isAr, "لا توجد وسوم بطاقة Twitter.", "No Twitter card tags."), impact: "low" }); }

  if (data.hasGoogleAnalytics) { score += 12; findings.push({ check: "Google Analytics", status: "pass", detail: a(isAr, "تتبع Google Analytics موجود.", "Analytics tracking detected."), impact: "high" }); }
  else { findings.push({ check: "Google Analytics", status: "fail", detail: a(isAr, "لا يوجد تحليل. ما لا تقاسه لا تستطيع تحسينه.", "No analytics. You can't improve what you don't measure."), impact: "high" }); }

  if (data.hasGoogleAds) { score += 5; findings.push({ check: a(isAr, "وسم Google Ads", "Google Ads Tag"), status: "pass", detail: a(isAr, "تتبع تحويلات Google Ads موجود.", "Google Ads conversion tracking detected."), impact: "medium" }); }
  else { score += 1; findings.push({ check: a(isAr, "وسم Google Ads", "Google Ads Tag"), status: "warning", detail: a(isAr, "لا يوجد وسم Google Ads.", "No Google Ads tag."), impact: "low" }); }

  if (data.hasMetaPixel) { score += 5; findings.push({ check: "Meta Pixel", status: "pass", detail: a(isAr, "Meta Pixel موجود.", "Facebook/Meta Pixel detected."), impact: "low" }); }
  else { score += 1; findings.push({ check: "Meta Pixel", status: "warning", detail: a(isAr, "لا يوجد Meta Pixel.", "No Meta Pixel."), impact: "low" }); }

  const socialCount = Object.values(data.socialLinks).filter(Boolean).length;
  if (socialCount >= 4) { score += 15; findings.push({ check: a(isAr, "روابط التواصل الاجتماعي", "Social Media Links"), status: "pass", detail: a(isAr, `${socialCount} حسابات تواصل اجتماعي مرتبطة.`, `${socialCount} social media profiles linked.`), impact: "medium" }); }
  else if (socialCount >= 2) { score += 8; findings.push({ check: a(isAr, "روابط التواصل الاجتماعي", "Social Media Links"), status: "warning", detail: a(isAr, `${socialCount} حسابات تواصل اجتماعي فقط.`, `Only ${socialCount} social profiles.`), impact: "low" }); }
  else if (socialCount === 1) { score += 4; findings.push({ check: a(isAr, "روابط التواصل الاجتماعي", "Social Media Links"), status: "warning", detail: a(isAr, "رابط تواصل اجتماعي واحد فقط.", "Only 1 social link found."), impact: "low" }); }
  else { findings.push({ check: a(isAr, "روابط التواصل الاجتماعي", "Social Media Links"), status: "fail", detail: a(isAr, "لا توجد روابط تواصل اجتماعي.", "No social media links found."), impact: "medium" }); }

  const platforms = (Object.entries(data.socialLinks) as [string, boolean][]).filter(([, v]) => v).map(([k]) => k);
  if (platforms.length > 0) findings.push({ check: a(isAr, "المنصات النشطة", "Active Platforms"), status: "pass", detail: a(isAr, `الموجودة: ${platforms.join("، ")}.`, `Found: ${platforms.join(", ")}.`), impact: "low" });

  if (data.hasHotjar || data.hasClarityMS) { score += 5; findings.push({ check: a(isAr, "تحليل سلوك المستخدمين", "Behavior Analytics"), status: "pass", detail: a(isAr, `${data.hasHotjar ? "Hotjar" : "Microsoft Clarity"} موجود.`, `${data.hasHotjar ? "Hotjar" : "Microsoft Clarity"} detected.`), impact: "low" }); }
  else { score += 1; findings.push({ check: a(isAr, "تحليل سلوك المستخدمين", "Behavior Analytics"), status: "warning", detail: a(isAr, "لا توجد أداة خريطة حرارة. أضف Hotjar أو Clarity.", "No heatmap tool. Add Hotjar or Clarity."), impact: "low" }); }

  return { name: "Social & Presence", nameAr: "السوشيال والتواجد", icon: "📣", score: Math.min(score, 100), status: score >= 70 ? "good" : score >= 40 ? "warning" : "critical", findings };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreSecurity(data: any, ssl: any, isAr = false): CategoryResult {
  let score = 0;
  const findings: Finding[] = [];

  if (data.hasHttps) { score += 30; findings.push({ check: "HTTPS/SSL", status: "pass", detail: a(isAr, "الموقع يستخدم HTTPS.", "Site uses HTTPS."), impact: "high" }); }
  else { findings.push({ check: "HTTPS/SSL", status: "fail", detail: a(isAr, "لا يوجد HTTPS — مشكلة أمنية وSEO كبيرة.", "No HTTPS — major security and SEO issue."), impact: "high" }); }

  if (ssl?.valid) { score += 10; findings.push({ check: a(isAr, "شهادة SSL", "SSL Certificate"), status: "pass", detail: a(isAr, "شهادة SSL صالحة.", "SSL certificate valid."), impact: "high" }); }
  else if (ssl) { findings.push({ check: a(isAr, "شهادة SSL", "SSL Certificate"), status: "fail", detail: a(isAr, `مشكلة SSL: ${ssl.reason || "شهادة غير صالحة"}`, `SSL issue: ${ssl.reason || "Invalid certificate"}`), impact: "high" }); }

  const h = data.headers;
  if (h["strict-transport-security"]) { score += 10; findings.push({ check: a(isAr, "ترويسة HSTS", "HSTS Header"), status: "pass", detail: a(isAr, "HSTS مفعّل.", "HTTP Strict Transport Security enabled."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "ترويسة HSTS", "HSTS Header"), status: "warning", detail: a(isAr, "لا توجد ترويسة HSTS.", "No HSTS header."), impact: "medium" }); }

  if (h["x-content-type-options"]) { score += 8; findings.push({ check: "X-Content-Type-Options", status: "pass", detail: a(isAr, "حماية من استكشاف نوع المحتوى مفعّلة.", "Content type sniffing prevented."), impact: "low" }); }
  else { findings.push({ check: "X-Content-Type-Options", status: "warning", detail: a(isAr, "X-Content-Type-Options مفقود.", "Missing X-Content-Type-Options."), impact: "low" }); }

  if (h["x-frame-options"] || h["content-security-policy"]?.includes("frame-ancestors")) { score += 10; findings.push({ check: a(isAr, "الحماية من Clickjacking", "Clickjacking Protection"), status: "pass", detail: a(isAr, "حماية الإطارات مفعّلة.", "Frame protection enabled."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "الحماية من Clickjacking", "Clickjacking Protection"), status: "warning", detail: a(isAr, "لا يوجد X-Frame-Options — الموقع عرضة لـ Clickjacking.", "No X-Frame-Options — vulnerable to clickjacking."), impact: "medium" }); }

  if (h["content-security-policy"]) { score += 10; findings.push({ check: a(isAr, "سياسة أمان المحتوى", "Content Security Policy"), status: "pass", detail: a(isAr, "ترويسة CSP موجودة.", "CSP header found."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "سياسة أمان المحتوى", "Content Security Policy"), status: "warning", detail: a(isAr, "لا توجد سياسة أمان المحتوى.", "No Content Security Policy."), impact: "low" }); }

  if (h["referrer-policy"]) { score += 5; findings.push({ check: a(isAr, "سياسة المرجع", "Referrer Policy"), status: "pass", detail: a(isAr, `سياسة المرجع: ${h["referrer-policy"]}.`, `Referrer policy: ${h["referrer-policy"]}.`), impact: "low" }); }

  const hasMixedContent = data.hasHttps && /http:\/\/(?!localhost)/i.test(data.html.replace(/https:\/\//g, ""));
  if (!hasMixedContent) { score += 7; findings.push({ check: a(isAr, "المحتوى المختلط", "Mixed Content"), status: "pass", detail: a(isAr, "لا يوجد محتوى مختلط.", "No mixed content detected."), impact: "medium" }); }
  else { findings.push({ check: a(isAr, "المحتوى المختلط", "Mixed Content"), status: "warning", detail: a(isAr, "وُجد محتوى مختلط — بعض الملفات عبر HTTP.", "Mixed content found — some resources over HTTP."), impact: "medium" }); }

  return { name: "Security", nameAr: "الأمان", icon: "🔒", score: Math.min(score, 100), status: score >= 70 ? "good" : score >= 40 ? "warning" : "critical", findings };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreTechnical(data: any, brokenLinks: Array<{ url: string; status: number | "error"; broken: boolean }>, isAr = false): CategoryResult {
  let score = 0;
  const findings: Finding[] = [];

  const broken = brokenLinks.filter((l) => l.broken);
  if (broken.length === 0 && brokenLinks.length > 0) {
    score += 25;
    findings.push({ check: a(isAr, "الروابط المعطلة", "Broken Links"), status: "pass", detail: a(isAr, `جميع ${brokenLinks.length} روابط فعّالة.`, `All ${brokenLinks.length} checked links are working.`), impact: "high" });
  } else if (broken.length <= 2) {
    score += 12;
    findings.push({ check: a(isAr, "الروابط المعطلة", "Broken Links"), status: "warning", detail: a(isAr, `${broken.length} رابط معطل وُجد.`, `${broken.length} broken link(s) found.`), impact: "high" });
  } else {
    findings.push({ check: a(isAr, "الروابط المعطلة", "Broken Links"), status: "fail", detail: a(isAr, `${broken.length} روابط معطلة — أصلحها فوراً.`, `${broken.length} broken links found — fix immediately.`), impact: "high" });
  }

  if (data.hasDeferScripts > 0 || data.hasAsyncScripts > 0) {
    score += 15;
    findings.push({ check: a(isAr, "سكريبتات غير محجوبة", "Non-blocking Scripts"), status: "pass", detail: a(isAr, "السكريبتات تستخدم defer/async.", "Scripts use defer/async."), impact: "medium" });
  } else if (data.jsFiles > 0) {
    score += 5;
    findings.push({ check: a(isAr, "سكريبتات غير محجوبة", "Non-blocking Scripts"), status: "warning", detail: a(isAr, "السكريبتات قد تحجب التصيير. أضف defer/async.", "Scripts may be render-blocking. Add defer/async."), impact: "medium" });
  } else {
    score += 15;
  }

  if (data.hasCharset) { score += 5; findings.push({ check: a(isAr, "ترميز المحتوى", "Charset"), status: "pass", detail: a(isAr, "ترميز المحتوى محدد.", "Character encoding declared."), impact: "low" }); }
  else { findings.push({ check: a(isAr, "ترميز المحتوى", "Charset"), status: "warning", detail: a(isAr, "لا يوجد تحديد للترميز.", "No charset declaration."), impact: "low" }); }

  if (data.inlineStyles < 10) { score += 10; findings.push({ check: a(isAr, "جودة الكود", "Code Quality"), status: "pass", detail: a(isAr, `أنماط مضمّنة قليلة (${data.inlineStyles}).`, `Minimal inline styles (${data.inlineStyles}).`), impact: "low" }); }
  else { score += 3; findings.push({ check: a(isAr, "جودة الكود", "Code Quality"), status: "warning", detail: a(isAr, `${data.inlineStyles} أنماط مضمّنة — انقلها لملفات CSS.`, `${data.inlineStyles} inline styles — move to CSS files.`), impact: "low" }); }

  if (data.statusCode === 200) { score += 10; findings.push({ check: a(isAr, "رمز HTTP", "HTTP Status"), status: "pass", detail: a(isAr, "الحالة ٢٠٠ OK.", "Status 200 OK."), impact: "high" }); }
  else { findings.push({ check: a(isAr, "رمز HTTP", "HTTP Status"), status: "fail", detail: a(isAr, `الحالة ${data.statusCode} — رمز استجابة غير متوقع.`, `Status ${data.statusCode} — unexpected response code.`), impact: "high" }); }

  if (data.imgCount > 0 && data.imgsWithDimensions > data.imgCount / 2) {
    score += 10;
    findings.push({ check: a(isAr, "تحسين الصور", "Image Optimisation"), status: "pass", detail: a(isAr, "معظم الصور لها أبعاد محددة.", "Most images have explicit dimensions."), impact: "medium" });
  } else if (data.imgCount > 5 && data.imgsWithDimensions === 0) {
    findings.push({ check: a(isAr, "تحسين الصور", "Image Optimisation"), status: "warning", detail: a(isAr, "الصور بدون أبعاد — يسبب اهتزاز التخطيط.", "Images missing width/height — causes layout shift."), impact: "medium" });
  } else {
    score += 5;
  }

  if (!data.robotsMeta.includes("noindex") && !data.robotsMeta.includes("nofollow")) {
    score += 5;
    findings.push({ check: a(isAr, "قابلية الفهرسة", "Crawlability"), status: "pass", detail: a(isAr, "الصفحة قابلة للفهرسة بالكامل.", "Page is fully crawlable."), impact: "high" });
  } else if (data.robotsMeta.includes("nofollow")) {
    findings.push({ check: a(isAr, "قابلية الفهرسة", "Crawlability"), status: "warning", detail: a(isAr, "توجيه Nofollow يمنع نقل قوة الروابط.", "Nofollow directive prevents link equity passing."), impact: "medium" });
  }

  if (data.hasDeferScripts || data.hasAsyncScripts) {
    score += 5;
    findings.push({ check: a(isAr, "تحميل السكريبتات", "Script Loading"), status: "pass", detail: a(isAr, "سكريبتات async/deferred موجودة.", "Async/deferred scripts found."), impact: "medium" });
  }

  const loadStatus = data.loadTime < 3000 ? "pass" : data.loadTime < 6000 ? "warning" : "fail";
  findings.push({ check: a(isAr, "وقت التحميل", "Load Time"), status: loadStatus, detail: a(isAr, `استجابة الخادم: ${data.loadTime} مللي ثانية.`, `Server response: ${data.loadTime}ms.`), impact: "medium" });
  if (data.loadTime < 3000) score += 5;
  else if (data.loadTime < 6000) score += 2;

  return { name: "Technical", nameAr: "التقني", icon: "⚙️", score: Math.min(score, 100), status: score >= 70 ? "good" : score >= 40 ? "warning" : "critical", findings };
}
