/**
 * Headless-WordPress fetch utility for the blog.
 *
 * Design contract:
 *   - The TS-data blog in `src/data/blog-posts.ts` is the source of truth.
 *     Any WordPress post whose slug collides with an existing local post is
 *     dropped before merging. Local posts ALWAYS win.
 *   - Polylang on this WP install (free edition) does NOT currently expose the
 *     `lang` field over REST, nor does it honor the `?lang=` query param.
 *     We still pass `?lang=<en|ar>` here so the moment Polylang Pro (or a
 *     mu-plugin that registers `register_rest_field('post','lang',...)`) is
 *     added, filtering starts working without any code change.
 *   - Network errors and missing responses return [] / null — never throw.
 *     The blog pages must keep rendering when WP is down.
 */

import { BLOG_POSTS } from "@/data/blog-posts";

const WP_BASE = "https://cms.localcitysolutions.com";
const PER_PAGE = 50;

export type Locale = "en" | "ar";

// --- Raw WP shapes -----------------------------------------------------------

export interface WpPost {
  id: number;
  slug: string;
  date: string;            // ISO
  modified: string;        // ISO
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;  // 0 when none
  link: string;
  // Polylang Pro / mu-plugin fields (defensively typed, currently absent):
  lang?: string;
  translations?: Record<string, number>;
}

export interface WpMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

// --- Normalized shape consumed by the React layer ---------------------------

export interface NormalizedWpPost {
  id: number;
  slug: string;
  /** Raw HTML title from WP (use as text after stripping tags). */
  titleHtml: string;
  excerptHtml: string;
  contentHtml: string;
  date: string;
  modified: string;
  featuredImageUrl: string | null;
  featuredImageAlt: string;
  /** The locale this post was queried under. Best-effort until Polylang exposes `lang`. */
  lang: Locale;
}

// --- Internals ---------------------------------------------------------------

const RESERVED_SLUGS: ReadonlySet<string> = new Set(BLOG_POSTS.map((p) => p.slug));

async function wpFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${WP_BASE}${path}`, {
      // ISR: cache responses for 60s. New posts appear within a minute without
      // a redeploy. Override per-call by passing { cache: 'no-store' } in dev.
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
  lang: Locale,
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
    lang,
  };
}

// --- Public API --------------------------------------------------------------

/**
 * All WordPress posts for a locale, sorted newest first, with slugs colliding
 * with local BLOG_POSTS filtered OUT. Returns [] on any error or empty source.
 */
export async function getAllWpPosts(lang: Locale): Promise<NormalizedWpPost[]> {
  const posts = await wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?per_page=${PER_PAGE}&lang=${lang}&orderby=date&order=desc&status=publish`
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
 * Fetch one WordPress post by slug. Returns null if missing OR if the slug
 * collides with a local post (callers should still check local first anyway).
 */
export async function getWpPostBySlug(
  slug: string,
  lang: Locale
): Promise<NormalizedWpPost | null> {
  if (RESERVED_SLUGS.has(slug)) return null;
  const posts = await wpFetch<WpPost[]>(
    `/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&lang=${lang}&status=publish`
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
    `/wp-json/wp/v2/posts?per_page=${PER_PAGE}&lang=${lang}&_fields=slug&status=publish`
  );
  if (!posts) return [];
  return posts.map((p) => p.slug).filter((s) => !RESERVED_SLUGS.has(s));
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
