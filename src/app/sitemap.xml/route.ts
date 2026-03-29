import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { BLOG_POSTS } from "@/data/blog-posts";

const BASE = "https://localcitysolutions.com";

// ── Priority / change-frequency helpers ──────────────────────────────────────

function getPriority(p: string): number {
  if (p === "" || p === "/en" || p === "/ar") return 1.0;
  if (/\/services\/[^/]+$/.test(p)) return 0.9;
  if (/\/services$/.test(p)) return 0.9;
  if (/\/industries\/[^/]+$/.test(p)) return 0.8;
  if (/\/industries$/.test(p)) return 0.8;
  if (/\/riyadh\/[^/]+$/.test(p)) return 0.7;
  if (/\/riyadh$/.test(p)) return 0.8;
  if (/\/blog\/[^/]+$/.test(p)) return 0.7;
  if (/\/blog$/.test(p)) return 0.8;
  if (/\/free-audit/.test(p)) return 0.8;
  if (/\/contact/.test(p)) return 0.7;
  if (/\/about/.test(p)) return 0.6;
  if (/\/privacy|\/terms/.test(p)) return 0.3;
  return 0.5;
}

function getChangeFreq(p: string): string {
  if (p === "" || p === "/en" || p === "/ar") return "weekly";
  if (/\/blog/.test(p)) return "weekly";
  if (/\/privacy|\/terms/.test(p)) return "yearly";
  return "monthly";
}

// ── Auto-discover static pages under [locale] ─────────────────────────────────
// Scans src/app/[locale]/ for direct subdirectories that have a page.tsx.
// Skips [slug] and special Next.js files. Expands to /en and /ar automatically.
// When you add a new static page (e.g. /en/case-studies), it's picked up here
// on next deploy — no manual editing needed.

function discoverLocalePaths(): string[] {
  const skip = new Set([
    "layout.tsx",
    "loading.tsx",
    "error.tsx",
    "not-found.tsx",
    "template.tsx",
    "default.tsx",
    "globals.css",
  ]);

  const localeDir = path.join(process.cwd(), "src", "app", "[locale]");
  const paths: string[] = [""]; // root page itself

  try {
    const items = fs.readdirSync(localeDir, { withFileTypes: true });
    for (const item of items) {
      if (!item.isDirectory()) continue;
      if (item.name.startsWith("[") || item.name.startsWith("_") || item.name.startsWith(".")) continue;
      if (skip.has(item.name)) continue;

      // Only include if there is a page.tsx directly inside (a hub/static page)
      const pageFile = path.join(localeDir, item.name, "page.tsx");
      if (fs.existsSync(pageFile)) {
        paths.push(`/${item.name}`);
      }
    }
  } catch {
    // Fallback — directory not readable (shouldn't happen on Vercel)
  }

  return paths;
}

// ── Known dynamic slugs (add new slugs here when you create new pages) ────────

const SERVICE_SLUGS = [
  "digital-marketing",
  "seo",
  "google-ads",
  "meta-ads",
  "web-design",
  "google-business-profile",
  "social-media",
  "ecommerce",
  "analytics-reporting",
  "whatsapp-marketing",
  "email-marketing",
];

const INDUSTRY_SLUGS = [
  "restaurants",
  "clinics",
  "salons",
  "real-estate",
  "retail",
  "education",
  "automotive",
  "hotels",
];

const DISTRICT_SLUGS = [
  "al-olaya",
  "al-malqa",
  "al-nakheel",
  "al-yasmin",
  "hittin",
  "al-sahafah",
  "al-worood",
  "al-sulaimaniyah",
  "al-rawdah",
  "al-murabba",
  "al-shifa",
  "al-naseem",
  "al-aziziyah",
  "ishbiliyah",
  "al-narjis",
  "tuwaiq",
  "diriyah",
  "kafd",
  "al-arid",
  "king-fahd-district",
];

// ── XML builder ───────────────────────────────────────────────────────────────

interface Entry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  alternates: { lang: string; href: string }[];
}

function buildEntry(
  urlPath: string,
  lastmod: string,
  enPath?: string,
  arPath?: string
): Entry {
  const resolvedEn = enPath ?? urlPath.replace(/^\/(ar)\//, "/en/");
  const resolvedAr = arPath ?? urlPath.replace(/^\/(en)\//, "/ar/");

  return {
    loc: `${BASE}${urlPath}`,
    lastmod,
    changefreq: getChangeFreq(urlPath),
    priority: getPriority(urlPath),
    alternates: [
      { lang: "en", href: `${BASE}${resolvedEn}` },
      { lang: "ar", href: `${BASE}${resolvedAr}` },
      { lang: "x-default", href: `${BASE}${resolvedEn}` },
    ],
  };
}

function pairPaths(
  enPath: string,
  arPath: string,
  lastmod: string
): Entry[] {
  return [
    buildEntry(enPath, lastmod),
    buildEntry(arPath, lastmod),
  ];
}

function toXml(entries: Entry[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n`;

  for (const e of entries) {
    xml += `  <url>\n`;
    xml += `    <loc>${e.loc}</loc>\n`;
    xml += `    <lastmod>${e.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${e.changefreq}</changefreq>\n`;
    xml += `    <priority>${e.priority.toFixed(1)}</priority>\n`;
    for (const alt of e.alternates) {
      xml += `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${alt.href}" />\n`;
    }
    xml += `  </url>\n\n`;
  }

  xml += `</urlset>`;
  return xml;
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const entries: Entry[] = [];

  // Root (redirect target) — points to /en as canonical
  entries.push(
    buildEntry("", today, "/en", "/ar"),
    ...pairPaths("/en", "/ar", today)
  );

  // ── Auto-discovered static pages under [locale] ──
  const localePaths = discoverLocalePaths();
  for (const p of localePaths) {
    if (p === "") continue; // already added above
    entries.push(...pairPaths(`/en${p}`, `/ar${p}`, today));
  }

  // ── Dynamic: services ──
  for (const slug of SERVICE_SLUGS) {
    entries.push(...pairPaths(`/en/services/${slug}`, `/ar/services/${slug}`, today));
  }

  // ── Dynamic: industries ──
  for (const slug of INDUSTRY_SLUGS) {
    entries.push(...pairPaths(`/en/industries/${slug}`, `/ar/industries/${slug}`, today));
  }

  // ── Dynamic: Riyadh districts ──
  for (const slug of DISTRICT_SLUGS) {
    entries.push(...pairPaths(`/en/riyadh/${slug}`, `/ar/riyadh/${slug}`, today));
  }

  // ── Dynamic: blog posts (fully auto — driven by BLOG_POSTS data file) ──
  for (const post of BLOG_POSTS) {
    const lastmod = post.updatedDate || post.publishDate || today;
    entries.push(
      ...pairPaths(`/en/blog/${post.slug}`, `/ar/blog/${post.slug}`, lastmod)
    );
  }

  // Sort: highest priority first, then alphabetically by URL
  entries.sort((a, b) =>
    b.priority !== a.priority
      ? b.priority - a.priority
      : a.loc.localeCompare(b.loc)
  );

  // Deduplicate (auto-discover + explicit lists might overlap for hub pages)
  const seen = new Set<string>();
  const deduped = entries.filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });

  return new NextResponse(toXml(deduped), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
