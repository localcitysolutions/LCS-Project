/**
 * Headless-WordPress fetch utility for the blog.
 *
 * Reads the custom fields exposed by our "LCS Blog Translations" plugin:
 *   - `lcs_lang`             → "en" | "ar"
 *   - `lcs_translation_id`   → counterpart post ID, or null
 *   - `lcs_dir`              → "ltr" | "rtl"
 *   - `lcs_hreflang`         → { en, ar, "x-default" } where each entry is
 *                              { id, lang, hreflang, slug, permalink } or null
 *
 * The plugin's posts endpoint accepts `?lcs_lang=en|ar`. Arabic results
 * exclude posts without a valid English counterpart (enforced server-side
 * by the plugin), so we treat the response as authoritative for the locale.
 *
 * Design contract:
 *   - The MDX/TS-data blog in `src/data/blog-posts.ts` is the source of truth.
 *     Any WordPress post whose slug collides with an existing local post is
 *     dropped before merging. Local posts ALWAYS win.
 *   - Network errors and missing responses return [] / null — never throw.
 *     The blog pages must keep rendering when WP is down.
 */

import { BLOG_POSTS } from "@/data/blog-posts";

const WP_BASE = "https://cms.localcitysolutions.com";
const PER_PAGE = 50;

export type Locale = "en" | "ar";

// --- Raw WP shapes (as returned by the LCS plugin) --------------------------

export interface WpHreflangEntry {
  id: number;
  lang: Locale;
  hreflang: string;       // "en" | "ar" | "x-default"
  slug: string;
  permalink: string;      // absolute WP permalink (we don't use it for routing)
}

export interface WpHreflang {
  en: WpHreflangEntry | null;
  ar: WpHreflangEntry | null;
  "x-default": WpHreflangEntry | null;
}

export interface WpPost {
  id: number;
  slug: string;
  date: string;            // ISO
  modified: string;        // ISO
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  link: string;

  // Custom plugin fields
  lcs_lang: Locale;
  lcs_translation_id: number | null;
  lcs_dir: "ltr" | "rtl";
  lcs_hreflang: WpHreflang;
}

export interface WpMedia {
  id: number;
  source_url: string;
  alt_text?: string;
}

// --- Normalized shape consumed by the React layer ---------------------------

export interface NormalizedWpPost {
  id: number;
  slug: string;
  /** Raw HTML title from WP — strip with `stripHtml` before using as text. */
  titleHtml: string;
  excerptHtml: string;
  contentHtml: string;
  date: string;
  modified: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string;

  // From the LCS plugin
  lang: Locale;
  dir: "ltr" | "rtl";
  translationId: number | null;
  hreflang: WpHreflang;
}

// --- Internals ---------------------------------------------------------------

const RESERVED_SLUGS: ReadonlySet<string> = new Set(BLOG_POSTS.map((p) => p.slug));

async function wpFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_BASE}${path}`, {
      // ISR: cache responses for 60s. New posts appear within a minute without
      // a redeploy.
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function resolveFeaturedMedia(
  mediaId: number
): Promise<{ url: string | null; alt: string }> {
  if (!mediaId) return { url: null, alt: "" };
  const m = await wpFetch<WpMedia>(`/wp-json/wp/v2/media/${mediaId}`);
  if (!m) return { url: null, alt: "" };
  return { url: m.source_url || null, alt: m.alt_text || "" };
}

function normalize(
  post: WpPost,
  fallbackLang: Locale,
  media: { url: string | null; alt: string }
): NormalizedWpPost {
  return {
    id: post.id,
    slug: post.slug,
    titleHtml: post.title?.rendered ?? "",
    excerptHtml: post.excerpt?.rendered ?? "",
    contentHtml: post.content?.rendered ?? "",
    date: post.date,
    modified: post.modified,
    featuredImageUrl: media.url,
    featuredImageAlt: media.alt,
    // Prefer the plugin's authoritative values; fall back to the query lang
    // and a sensible direction default if the plugin ever returns null/missing.
    lang: (post.lcs_lang as Locale) || fallbackLang,
    dir: post.lcs_dir || (fallbackLang === "ar" ? "rtl" : "ltr"),
    translationId: post.lcs_translation_id ?? null,
    hreflang: post.lcs_hreflang ?? { en: null, ar: null, "x-default": null },
  };
}

// --- Public API --------------------------------------------------------------

/**
 * All WordPress posts for a locale, sorted newest first, with slugs colliding
 * with local BLOG_POSTS filtered OUT. Returns [] on any error or empty source.
 *
 * The plugin already excludes Arabic posts that don't have an English
 * counterpart — we trust that filtering.
 */
export async function getAllWpPosts(lang: Locale): Promise<NormalizedWpPost[]> {
  const posts = await wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?per_page=${PER_PAGE}&lcs_lang=${lang}&orderby=date&order=desc&status=publish`
  );
  if (!posts || posts.length === 0) return [];

  const filtered = posts.filter((p) => !RESERVED_SLUGS.has(p.slug));
  if (filtered.length === 0) return [];

  return Promise.all(
    filtered.map(async (p) => {
      const media = await resolveFeaturedMedia(p.featured_media);
      return normalize(p, lang, media);
    })
  );
}

/**
 * Fetch one WordPress post by slug for a given locale. Returns null if
 * missing OR if the slug collides with a local post (callers should still
 * check local first anyway).
 */
export async function getWpPostBySlug(
  slug: string,
  lang: Locale
): Promise<NormalizedWpPost | null> {
  if (RESERVED_SLUGS.has(slug)) return null;
  const posts = await wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&lcs_lang=${lang}&status=publish`
  );
  if (!posts || posts.length === 0) return null;
  const p = posts[0];
  const media = await resolveFeaturedMedia(p.featured_media);
  return normalize(p, lang, media);
}

/**
 * Slug list for generateStaticParams. Collision-filtered against BLOG_POSTS.
 * Returns [] on any error so build can't break because WP is down.
 */
export async function getAllWpSlugs(lang: Locale): Promise<string[]> {
  const posts = await wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?per_page=${PER_PAGE}&lcs_lang=${lang}&_fields=slug&status=publish`
  );
  if (!posts) return [];
  return posts.map((p) => p.slug).filter((s) => !RESERVED_SLUGS.has(s));
}

// --- Helpers for the routing/SEO layer --------------------------------------

const SITE = "https://localcitysolutions.com";

/**
 * Build the Next.js route for the counterpart translation of this post, or
 * `null` if no counterpart exists (i.e. show a disabled/hidden toggle).
 */
export function counterpartHref(post: NormalizedWpPost): string | null {
  const otherLang: Locale = post.lang === "en" ? "ar" : "en";
  const entry = post.hreflang?.[otherLang];
  if (!entry || !entry.slug) return null;
  return `/${otherLang}/blog/${entry.slug}`;
}

/**
 * Build the `alternates.languages` object for Next.js Metadata from the
 * plugin's hreflang map. Always includes whichever languages exist plus
 * x-default; missing entries are omitted (Next emits no tag for them).
 */
export function hreflangAlternates(
  post: NormalizedWpPost
): Record<string, string> {
  const out: Record<string, string> = {};
  const h = post.hreflang;
  if (h?.en?.slug) out["en"] = `${SITE}/en/blog/${h.en.slug}`;
  if (h?.ar?.slug) out["ar"] = `${SITE}/ar/blog/${h.ar.slug}`;
  if (h?.["x-default"]?.slug) {
    out["x-default"] = `${SITE}/${h["x-default"].lang}/blog/${h["x-default"].slug}`;
  }
  return out;
}

/** Strip HTML tags safely for text-only contexts (titles, meta description). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}
