import Link from "next/link";
import { IBM_Plex_Sans_Arabic, Noto_Naskh_Arabic, Poppins } from "next/font/google";

import Breadcrumbs from "@/components/Breadcrumbs";
import CTABox from "@/components/CTABox";
import { sanitizeWordpressHtml } from "@/lib/sanitize-html";
import { stripHtml, type NormalizedWpPost } from "@/lib/wordpress";

// Article-scoped fonts. These only load on /blog/[slug] pages that fall through
// to a WordPress post; the rest of the site keeps DM_Sans / Almarai untouched.
const ibmPlexAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-ar",
});
const notoNaskhAr = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-naskh-ar",
});
const poppinsEn = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

type Locale = "en" | "ar";

interface Props {
  post: NormalizedWpPost;
  locale: Locale;
}

export default function WpArticle({ post, locale }: Props) {
  const isAr = locale === "ar";
  const titleText = stripHtml(post.titleHtml);
  const safeHtml = sanitizeWordpressHtml(post.contentHtml);

  const formattedDate = new Intl.DateTimeFormat(isAr ? "ar-SA" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.date));

  const ui = isAr
    ? {
        backToBlog: "→ كل المقالات",
        toggleLang: "Read in English",
        toggleHref: `/en/blog/${post.slug}`,
        ctaHeading: "حاضر تزيد نشاطك في الرياض؟",
        ctaSubtitle: "احصل على تدقيق مجاني وخطة تسويقية مخصصة لقطاعك.",
        homeLabel: "الرئيسية",
        blogLabel: "المدونة",
      }
    : {
        backToBlog: "← All Articles",
        toggleLang: "اقرأ بالعربي",
        toggleHref: `/ar/blog/${post.slug}`,
        ctaHeading: "Ready to Grow Your Riyadh Business?",
        ctaSubtitle:
          "Get a free audit and tailored digital marketing plan for your industry.",
        homeLabel: "Home",
        blogLabel: "Blog",
      };

  const shareUrl = `https://localcitysolutions.com/${locale}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: titleText,
    description: stripHtml(post.excerptHtml),
    url: shareUrl,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Organization",
      name: "Local City Solutions",
      url: "https://localcitysolutions.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Local City Solutions",
      url: "https://localcitysolutions.com",
      logo: {
        "@type": "ImageObject",
        url: "https://localcitysolutions.com/logo.png",
      },
    },
    inLanguage: isAr ? "ar" : "en",
    image:
      post.featuredImageUrl || "https://localcitysolutions.com/og-image.jpg",
  };

  return (
    <>
      {/* Plain <script> for JSON-LD — next/script is for executable JS and
          can mis-handle non-JS types during SSR. Matches LocalArticle.tsx. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div
        dir={isAr ? "rtl" : "ltr"}
        className={`${ibmPlexAr.variable} ${notoNaskhAr.variable} ${poppinsEn.variable} ${
          isAr ? "wp-article-ar" : "wp-article-en"
        }`}
      >
        <Breadcrumbs
          items={[
            { label: ui.homeLabel, href: `/${locale}` },
            { label: ui.blogLabel, href: `/${locale}/blog` },
            { label: titleText },
          ]}
        />

        {/* Hero */}
        <section className="relative bg-[#080E1A] pt-6 md:pt-10 pb-12 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <div
              className={`flex items-center justify-between mb-8 ${
                isAr ? "flex-row-reverse" : ""
              }`}
            >
              <Link
                href={`/${locale}/blog`}
                className="text-white/40 text-xs hover:text-white/70 transition-colors"
              >
                {ui.backToBlog}
              </Link>
              <Link
                href={ui.toggleHref}
                className="text-[#F5C518]/70 text-xs hover:text-[#F5C518] transition-colors border border-[#F5C518]/20 rounded-full px-3 py-1"
              >
                {ui.toggleLang}
              </Link>
            </div>

            <h1
              className={`wp-article-title text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 ${
                isAr ? "text-right" : ""
              }`}
            >
              {titleText}
            </h1>

            <p className="text-white/30 text-xs">
              <time dateTime={post.date}>{formattedDate}</time>
            </p>
          </div>
        </section>

        {/* Featured image */}
        {post.featuredImageUrl && (
          <section className="bg-[#0C1424] pt-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <figure className="rounded-xl overflow-hidden border border-white/5">
                {/* Plain <img>: WP returns optimized URLs already, and avoiding
                    next/image here skips a remotePatterns config dance. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImageUrl}
                  alt={post.featuredImageAlt || titleText}
                  className="w-full h-auto block"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </section>
        )}

        {/* Body */}
        <section className="bg-[#0C1424] py-12 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <article
              className={`wp-article-body ${
                isAr
                  ? "wp-article-body--ar text-right"
                  : "wp-article-body--en"
              }`}
              dangerouslySetInnerHTML={{ __html: safeHtml }}
            />
          </div>
        </section>

        <CTABox
          heading={ui.ctaHeading}
          subtitle={ui.ctaSubtitle}
          locale={locale}
          bg="dark"
        />
      </div>
    </>
  );
}
