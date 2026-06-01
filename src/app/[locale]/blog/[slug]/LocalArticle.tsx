import Link from "next/link";
import { type BlogPost, getRelatedPosts } from "@/data/blog-posts";
import CTABox from "@/components/CTABox";
import TrackableLink from "@/components/TrackableLink";
import Breadcrumbs from "@/components/Breadcrumbs";

type Locale = "en" | "ar";

const SERVICE_LABELS: Record<string, { en: string; ar: string }> = {
  seo: { en: "SEO Services", ar: "خدمات SEO" },
  "google-ads": { en: "Google Ads", ar: "إعلانات قوقل" },
  "social-media": { en: "Social Media Management", ar: "إدارة السوشل ميديا" },
  "meta-ads": { en: "Meta Ads", ar: "إعلانات ميتا" },
  "web-design": { en: "Web Design", ar: "تصميم مواقع" },
  "google-business-profile": { en: "Google Business Profile", ar: "ملف النشاط التجاري" },
};

const DISTRICT_LABELS: Record<string, { en: string; ar: string }> = {
  "al-olaya": { en: "Al Olaya", ar: "العليا" },
  "al-malqa": { en: "Al Malqa", ar: "الملقا" },
  "al-nakheel": { en: "Al Nakheel", ar: "النخيل" },
  "al-sulimaniyah": { en: "Al Sulimaniyah", ar: "السليمانية" },
  "al-wurud": { en: "Al Wurud", ar: "الورود" },
  "al-muruj": { en: "Al Muruj", ar: "المروج" },
};

interface Props {
  post: BlogPost;
  locale: Locale;
}

/**
 * Renders a TS-data BlogPost. Extracted verbatim from the previous
 * /[locale]/blog/[slug]/page.tsx so we can dispatch between local posts
 * (this component) and WordPress-sourced posts (<WpArticle />) at the page
 * level without changing the local rendering by a single pixel.
 */
export default function LocalArticle({ post, locale }: Props) {
  const isAr = locale === "ar";
  const title = isAr ? post.title.ar : post.title.en;
  const content = isAr ? post.content.ar : post.content.en;
  const slug = post.slug;

  const relatedPosts = getRelatedPosts(post.relatedPosts);

  const ui = isAr
    ? {
        author: "فريق لوكال سيتي سولوشنز",
        authorRole: "رؤى تسويقية رقمية من وكالة التسويق الرقمي المتخصصة في الرياض.",
        toc: "محتويات المقال",
        relatedServices: "خدمات ذات صلة",
        relatedDistricts: "أحياء في الرياض",
        relatedPosts: "مقالات ذات صلة",
        share: "شارك المقال",
        minRead: "دقيقة قراءة",
        readMore: "اقرأ ←",
        toggleLang: "Read in English",
        toggleHref: `/en/blog/${slug}`,
        backToBlog: "→ كل المقالات",
        ctaHeading: "حاضر تزيد نشاطك في الرياض؟",
        ctaSubtitle: "احصل على تدقيق مجاني وخطة تسويقية مخصصة لقطاعك.",
      }
    : {
        author: "Local City Solutions Team",
        authorRole: "Digital marketing insights from Riyadh's specialist digital marketing agency.",
        toc: "Table of Contents",
        relatedServices: "Related Services",
        relatedDistricts: "Riyadh Districts",
        relatedPosts: "Related Articles",
        share: "Share Article",
        minRead: "min read",
        readMore: "Read →",
        toggleLang: "اقرأ بالعربي",
        toggleHref: `/ar/blog/${slug}`,
        backToBlog: "← All Articles",
        ctaHeading: "Ready to Grow Your Riyadh Business?",
        ctaSubtitle: "Get a free audit and tailored digital marketing plan for your industry.",
      };

  const shareUrl = `https://localcitysolutions.com/${locale}/blog/${slug}`;
  const shareTitle = encodeURIComponent(title);
  const waShare = `https://wa.me/?text=${shareTitle}%20${encodeURIComponent(shareUrl)}`;
  const twitterShare = `https://x.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: isAr ? post.metaDescription.ar : post.metaDescription.en,
    url: shareUrl,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: {
      "@type": "Organization",
      name: "Local City Solutions",
      url: "https://localcitysolutions.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Local City Solutions",
      url: "https://localcitysolutions.com",
      logo: { "@type": "ImageObject", url: "https://localcitysolutions.com/logo.png" },
    },
    inLanguage: isAr ? "ar" : "en",
    image: "https://localcitysolutions.com/og-image.jpg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    <div dir={isAr ? "rtl" : "ltr"}>
      <Breadcrumbs
        items={[
          { label: isAr ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isAr ? "المدونة" : "Blog", href: `/${locale}/blog` },
          { label: isAr ? post.title.ar : post.title.en },
        ]}
      />
      {/* Hero */}
      <section className="relative bg-[#F7F9F8] pt-6 md:pt-10 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(184,145,18,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back + toggle */}
          <div className={`flex items-center justify-between mb-8 ${isAr ? "flex-row-reverse" : ""}`}>
            <Link href={`/${locale}/blog`} className="text-[#748781] text-xs hover:text-[#3D514D] transition-colors">
              {ui.backToBlog}
            </Link>
            <Link href={ui.toggleHref} className="text-[#B89112]/70 text-xs hover:text-[#B89112] transition-colors border border-[#B89112]/20 rounded-full px-3 py-1">
              {ui.toggleLang}
            </Link>
          </div>

          {/* Category + meta */}
          <div className={`flex items-center gap-3 mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#B89112]/10 text-[#B89112] text-[10px] font-bold uppercase tracking-widest">
              {isAr ? post.categoryLabel.ar : post.categoryLabel.en}
            </span>
            <span className="text-[#8A9B96] text-xs">{post.publishDate}</span>
            <span className="text-[#8A9B96] text-xs">{post.readingTime} {ui.minRead}</span>
          </div>

          <h1 className={`text-2xl md:text-4xl lg:text-5xl font-black text-[#14211F] leading-tight mb-6 ${isAr ? "text-right" : ""}`}>
            {title}
          </h1>

          {/* Author row */}
          <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-[#B89112]/20 flex items-center justify-center text-[#B89112] font-bold text-sm shrink-0">
              MF
            </div>
            <div>
              <p className="text-[#14211F] text-xs font-semibold">{ui.author}</p>
              <p className="text-[#748781] text-[10px]">{ui.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area */}
      <section className="bg-[#EEF5F2] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`flex gap-10 ${isAr ? "flex-row-reverse" : ""}`}>

            {/* Article body — 70% */}
            <div className="flex-1 min-w-0">
              <div
                className={`prose prose-invert prose-sm md:prose-base max-w-none
                  prose-headings:text-[#14211F] prose-headings:font-bold
                  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-[#3D514D] prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-[#3D514D] prose-li:leading-relaxed
                  prose-ul:my-4 prose-ol:my-4
                  prose-strong:text-[#14211F] prose-strong:font-semibold
                  prose-a:text-[#B89112] prose-a:no-underline hover:prose-a:underline
                  ${isAr ? "text-right" : ""}
                `}
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags */}
              <div className={`flex flex-wrap gap-2 mt-10 pt-6 border-t border-[#D8E4DF] ${isAr ? "flex-row-reverse" : ""}`}>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-[#748781] border border-[#D8E4DF] rounded px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share buttons */}
              <div className={`mt-8 flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="text-[#748781] text-xs">{ui.share}:</span>
                <a
                  href={waShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-all"
                >
                  WhatsApp
                </a>
                <a
                  href={twitterShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#14211F]/[0.04] border border-[#D8E4DF] rounded-lg text-[#566A65] text-xs font-semibold hover:bg-[#14211F]/[0.08] transition-all"
                >
                  X / Twitter
                </a>
                <a
                  href={linkedinShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2]/10 border border-[#0A66C2]/20 rounded-lg text-[#0A66C2]/80 text-xs font-semibold hover:bg-[#0A66C2]/20 transition-all"
                >
                  LinkedIn
                </a>
              </div>

              {/* Author box */}
              <div className={`mt-10 p-6 bg-[#FFFFFF] border border-[#E2EAE7] rounded-xl flex gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-[#B89112]/20 flex items-center justify-center text-[#B89112] font-black text-lg shrink-0">
                  MF
                </div>
                <div className={isAr ? "text-right" : ""}>
                  <p className="text-[#14211F] font-bold text-sm">{ui.author}</p>
                  <p className="text-[#B89112] text-xs mb-2">{ui.authorRole}</p>
                  <p className="text-[#657872] text-xs leading-relaxed">
                    {isAr
                      ? "متخصص في التسويق الرقمي للأعمال السعودية — SEO وإعلانات قوقل والسوشل ميديا. يساعد العملاء في الرياض على زيادة ظهورهم الرقمي وتحقيق نتائج قابلة للقياس."
                      : "Digital marketing specialist focused on Saudi businesses — SEO, Google Ads, and social media. Helps Riyadh clients grow their online presence and achieve measurable results."}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar — 30% */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-28 space-y-6">

                {/* Table of Contents */}
                {post.toc.length > 0 && (
                  <div className="bg-[#FFFFFF] border border-[#E2EAE7] rounded-xl p-5">
                    <p className="text-[#657872] text-[10px] font-bold uppercase tracking-widest mb-4">{ui.toc}</p>
                    <ul className="space-y-2">
                      {post.toc.map((item) => (
                        <li key={item.id} className={item.level === 3 ? (isAr ? "pr-4" : "pl-4") : ""}>
                          <a
                            href={`#${item.id}`}
                            className={`text-[#657872] text-xs hover:text-[#B89112] transition-colors leading-relaxed block ${isAr ? "text-right" : ""}`}
                          >
                            {isAr ? item.text.ar : item.text.en}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Services */}
                {post.relatedServices.length > 0 && (
                  <div className="bg-[#FFFFFF] border border-[#E2EAE7] rounded-xl p-5">
                    <p className="text-[#657872] text-[10px] font-bold uppercase tracking-widest mb-4">{ui.relatedServices}</p>
                    <ul className="space-y-2">
                      {post.relatedServices.map((svc) => {
                        const label = SERVICE_LABELS[svc];
                        return (
                          <li key={svc}>
                            <Link
                              href={`/${locale}/services/${svc}`}
                              className={`text-[#566A65] text-xs hover:text-[#B89112] transition-colors flex items-center gap-1 ${isAr ? "flex-row-reverse" : ""}`}
                            >
                              <span className="text-[#B89112]/50">{isAr ? "←" : "→"}</span>
                              {label ? (isAr ? label.ar : label.en) : svc}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Related Districts */}
                {post.relatedDistricts.length > 0 && (
                  <div className="bg-[#FFFFFF] border border-[#E2EAE7] rounded-xl p-5">
                    <p className="text-[#657872] text-[10px] font-bold uppercase tracking-widest mb-4">{ui.relatedDistricts}</p>
                    <ul className="space-y-2">
                      {post.relatedDistricts.map((d) => {
                        const label = DISTRICT_LABELS[d];
                        return (
                          <li key={d}>
                            <Link
                              href={`/${locale}/riyadh/${d}`}
                              className={`text-[#566A65] text-xs hover:text-[#B89112] transition-colors flex items-center gap-1 ${isAr ? "flex-row-reverse" : ""}`}
                            >
                              <span className="text-[#B89112]/50">{isAr ? "←" : "→"}</span>
                              {label ? (isAr ? label.ar : label.en) : d}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <div className="bg-gradient-to-br from-[#B89112]/10 to-transparent border border-[#B89112]/20 rounded-xl p-5 text-center">
                  <p className="text-[#14211F] font-bold text-sm mb-2">
                    {isAr ? "محتاج مساعدة؟" : "Need Help?"}
                  </p>
                  <p className="text-[#657872] text-xs mb-4">
                    {isAr ? "تكلم مع فريقنا على واتساب." : "Chat with our team on WhatsApp."}
                  </p>
                  <TrackableLink
                    href="https://wa.me/966564229190"
                    track="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full py-2 bg-[#B89112] text-[#F7F9F8] font-bold text-xs rounded-lg hover:bg-[#B89112]/90 transition-all"
                  >
                    {isAr ? "واتساب" : "WhatsApp Us"}
                  </TrackableLink>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F7F9F8] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className={`text-[#14211F] font-black text-xl md:text-2xl mb-8 ${isAr ? "text-right" : ""}`}>
              {ui.relatedPosts}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((rp, i) => (
                <article
                  key={rp.slug}
                  className={`reveal delay-${i + 1} bg-[#FFFFFF] border border-[#E2EAE7] rounded-xl overflow-hidden hover:border-[#B89112]/20 transition-all group`}
                >
                  <div className="h-1.5 bg-gradient-to-r from-[#B89112]/40 to-transparent" />
                  <div className="p-5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#B89112]/10 text-[#B89112] text-[9px] font-bold uppercase tracking-widest mb-3">
                      {isAr ? rp.categoryLabel.ar : rp.categoryLabel.en}
                    </span>
                    <h3 className={`text-[#14211F] font-bold text-sm mb-3 leading-snug group-hover:text-[#B89112] transition-colors ${isAr ? "text-right" : ""}`}>
                      {isAr ? rp.title.ar : rp.title.en}
                    </h3>
                    <div className={`flex items-center justify-between text-[#8A9B96] text-[10px] mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                      <span>{rp.publishDate}</span>
                      <span>{rp.readingTime} {ui.minRead}</span>
                    </div>
                    <Link
                      href={`/${locale}/blog/${rp.slug}`}
                      className="text-[#B89112] text-xs font-semibold hover:underline"
                    >
                      {ui.readMore}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABox heading={ui.ctaHeading} subtitle={ui.ctaSubtitle} locale={locale} bg="dark" />
    </div>
    </>
  );
}
