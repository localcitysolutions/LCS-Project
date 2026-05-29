import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BLOG_POSTS } from "@/data/blog-posts";
import {
  getAllWpSlugs,
  getWpPostBySlug,
  hreflangAlternates,
  stripHtml,
} from "@/lib/wordpress";

import LocalArticle from "./LocalArticle";
import WpArticle from "@/components/WpArticle";

type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

// ISR: any WordPress post update is visible within 60s without redeploy.
export const revalidate = 60;
// New WordPress slugs that weren't in the build manifest still render via ISR.
export const dynamicParams = true;

/** Pre-render every local slug for both locales + every WP slug we know about
 *  at build time. Slugs colliding with local posts are filtered out by
 *  `getAllWpSlugs`, so the union is always disjoint. */
export async function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];

  const localParams = BLOG_POSTS.flatMap((post) =>
    locales.map((locale) => ({ locale, slug: post.slug }))
  );

  const wpParams = (
    await Promise.all(
      locales.map(async (locale) => {
        const slugs = await getAllWpSlugs(locale);
        return slugs.map((slug) => ({ locale, slug }));
      })
    )
  ).flat();

  return [...localParams, ...wpParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const canonicalUrl = `https://localcitysolutions.com/${locale}/blog/${slug}`;

  // 1. Local post wins. Keep the original metadata shape exactly.
  const local = BLOG_POSTS.find((p) => p.slug === slug);
  if (local) {
    const title = isAr ? local.title.ar : local.title.en;
    const description = isAr ? local.metaDescription.ar : local.metaDescription.en;
    return {
      title,
      description,
      alternates: {
        canonical: canonicalUrl,
        languages: {
          en: `https://localcitysolutions.com/en/blog/${slug}`,
          ar: `https://localcitysolutions.com/ar/blog/${slug}`,
          "x-default": `https://localcitysolutions.com/en/blog/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        type: "article",
        locale: isAr ? "ar_SA" : "en_US",
        images: [
          {
            url: "https://localcitysolutions.com/og-image.jpg",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
    };
  }

  // 2. Fall through to WordPress.
  const wp = await getWpPostBySlug(slug, locale);
  if (!wp) return {};

  const title = stripHtml(wp.titleHtml);
  const description = stripHtml(wp.excerptHtml).slice(0, 160);
  const ogImage = wp.featuredImageUrl || "https://localcitysolutions.com/og-image.jpg";

  // hreflang alternates straight from the plugin's lcs_hreflang map. Languages
  // without a counterpart are omitted, so we don't claim a translation that
  // doesn't exist (avoids "alternate hreflang implementation issues" in GSC).
  const languages = hreflangAlternates(wp);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...(Object.keys(languages).length ? { languages } : {}),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      locale: isAr ? "ar_SA" : "en_US",
      publishedTime: wp.date,
      modifiedTime: wp.modified || wp.date,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: wp.featuredImageAlt || title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const local = BLOG_POSTS.find((p) => p.slug === slug);
  if (local) return <LocalArticle post={local} locale={locale} />;

  const wp = await getWpPostBySlug(slug, locale);
  if (!wp) notFound();

  return <WpArticle post={wp} locale={locale} />;
}
