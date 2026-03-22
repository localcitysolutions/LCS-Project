import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getRelatedPosts } from "@/data/blog-posts";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.flatMap((post) => [
    { locale: "en", slug: post.slug },
    { locale: "ar", slug: post.slug },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const isAr = locale === "ar";
  const title = isAr ? post.title.ar : post.title.en;
  const description = isAr ? post.metaDescription.ar : post.metaDescription.en;
  const otherLocale = isAr ? "en" : "ar";
  return {
    title,
    description,
    alternates: {
      languages: {
        [locale]: `/${locale}/blog/${slug}`,
        [otherLocale]: `/${otherLocale}/blog/${slug}`,
      },
    },
  };
}

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

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const isAr = locale === "ar";
  const title = isAr ? post.title.ar : post.title.en;
  const content = isAr ? post.content.ar : post.content.en;
  const otherLocale = isAr ? "en" : "ar";

  const relatedPosts = getRelatedPosts(post.relatedPosts);

  const ui = isAr
    ? {
        author: "محمد فرحان",
        authorRole: "متخصص تسويق رقمي — لوكال سيتي سولوشنز",
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
        author: "Muhammad Farhan",
        authorRole: "Digital Marketing Specialist — LCS Agency",
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

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-12 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back + toggle */}
          <div className={`flex items-center justify-between mb-8 ${isAr ? "flex-row-reverse" : ""}`}>
            <Link href={`/${locale}/blog`} className="text-white/40 text-xs hover:text-white/70 transition-colors">
              {ui.backToBlog}
            </Link>
            <Link href={ui.toggleHref} className="text-[#F5C518]/70 text-xs hover:text-[#F5C518] transition-colors border border-[#F5C518]/20 rounded-full px-3 py-1">
              {ui.toggleLang}
            </Link>
          </div>

          {/* Category + meta */}
          <div className={`flex items-center gap-3 mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-bold uppercase tracking-widest">
              {isAr ? post.categoryLabel.ar : post.categoryLabel.en}
            </span>
            <span className="text-white/30 text-xs">{post.publishDate}</span>
            <span className="text-white/30 text-xs">{post.readingTime} {ui.minRead}</span>
          </div>

          <h1 className={`text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 ${isAr ? "text-right" : ""}`}>
            {title}
          </h1>

          {/* Author row */}
          <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
            <div className="w-9 h-9 rounded-full bg-[#F5C518]/20 flex items-center justify-center text-[#F5C518] font-bold text-sm shrink-0">
              MF
            </div>
            <div>
              <p className="text-white text-xs font-semibold">{ui.author}</p>
              <p className="text-white/40 text-[10px]">{ui.authorRole}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area */}
      <section className="bg-[#0C1424] py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`flex gap-10 ${isAr ? "flex-row-reverse" : ""}`}>

            {/* Article body — 70% */}
            <div className="flex-1 min-w-0">
              <div
                className={`prose prose-invert prose-sm md:prose-base max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-base prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-white/70 prose-li:leading-relaxed
                  prose-ul:my-4 prose-ol:my-4
                  prose-strong:text-white prose-strong:font-semibold
                  prose-a:text-[#F5C518] prose-a:no-underline hover:prose-a:underline
                  ${isAr ? "text-right" : ""}
                `}
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags */}
              <div className={`flex flex-wrap gap-2 mt-10 pt-6 border-t border-white/10 ${isAr ? "flex-row-reverse" : ""}`}>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs text-white/40 border border-white/10 rounded px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share buttons */}
              <div className={`mt-8 flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                <span className="text-white/40 text-xs">{ui.share}:</span>
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
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs font-semibold hover:bg-white/10 transition-all"
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
              <div className={`mt-10 p-6 bg-[#0E1A2E] border border-white/5 rounded-xl flex gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                <div className="w-12 h-12 rounded-full bg-[#F5C518]/20 flex items-center justify-center text-[#F5C518] font-black text-lg shrink-0">
                  MF
                </div>
                <div className={isAr ? "text-right" : ""}>
                  <p className="text-white font-bold text-sm">{ui.author}</p>
                  <p className="text-[#F5C518] text-xs mb-2">{ui.authorRole}</p>
                  <p className="text-white/50 text-xs leading-relaxed">
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
                  <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-5">
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-4">{ui.toc}</p>
                    <ul className="space-y-2">
                      {post.toc.map((item) => (
                        <li key={item.id} className={item.level === 3 ? (isAr ? "pr-4" : "pl-4") : ""}>
                          <a
                            href={`#${item.id}`}
                            className={`text-white/50 text-xs hover:text-[#F5C518] transition-colors leading-relaxed block ${isAr ? "text-right" : ""}`}
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
                  <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-5">
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-4">{ui.relatedServices}</p>
                    <ul className="space-y-2">
                      {post.relatedServices.map((svc) => {
                        const label = SERVICE_LABELS[svc];
                        return (
                          <li key={svc}>
                            <Link
                              href={`/${locale}/services/${svc}`}
                              className={`text-white/60 text-xs hover:text-[#F5C518] transition-colors flex items-center gap-1 ${isAr ? "flex-row-reverse" : ""}`}
                            >
                              <span className="text-[#F5C518]/50">{isAr ? "←" : "→"}</span>
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
                  <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-5">
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-4">{ui.relatedDistricts}</p>
                    <ul className="space-y-2">
                      {post.relatedDistricts.map((d) => {
                        const label = DISTRICT_LABELS[d];
                        return (
                          <li key={d}>
                            <Link
                              href={`/${locale}/riyadh/${d}`}
                              className={`text-white/60 text-xs hover:text-[#F5C518] transition-colors flex items-center gap-1 ${isAr ? "flex-row-reverse" : ""}`}
                            >
                              <span className="text-[#F5C518]/50">{isAr ? "←" : "→"}</span>
                              {label ? (isAr ? label.ar : label.en) : d}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* WhatsApp CTA */}
                <div className="bg-gradient-to-br from-[#F5C518]/10 to-transparent border border-[#F5C518]/20 rounded-xl p-5 text-center">
                  <p className="text-white font-bold text-sm mb-2">
                    {isAr ? "محتاج مساعدة؟" : "Need Help?"}
                  </p>
                  <p className="text-white/50 text-xs mb-4">
                    {isAr ? "تكلم مع فريقنا على واتساب." : "Chat with our team on WhatsApp."}
                  </p>
                  <a
                    href="https://wa.me/966564229190"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full py-2 bg-[#F5C518] text-[#080E1A] font-bold text-xs rounded-lg hover:bg-[#F5C518]/90 transition-all"
                  >
                    {isAr ? "واتساب" : "WhatsApp Us"}
                  </a>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#080E1A] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className={`text-white font-black text-xl md:text-2xl mb-8 ${isAr ? "text-right" : ""}`}>
              {ui.relatedPosts}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((rp, i) => (
                <article
                  key={rp.slug}
                  className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/5 rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all group`}
                >
                  <div className="h-1.5 bg-gradient-to-r from-[#F5C518]/40 to-transparent" />
                  <div className="p-5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#F5C518]/10 text-[#F5C518] text-[9px] font-bold uppercase tracking-widest mb-3">
                      {isAr ? rp.categoryLabel.ar : rp.categoryLabel.en}
                    </span>
                    <h3 className={`text-white font-bold text-sm mb-3 leading-snug group-hover:text-[#F5C518] transition-colors ${isAr ? "text-right" : ""}`}>
                      {isAr ? rp.title.ar : rp.title.en}
                    </h3>
                    <div className={`flex items-center justify-between text-white/30 text-[10px] mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                      <span>{rp.publishDate}</span>
                      <span>{rp.readingTime} {ui.minRead}</span>
                    </div>
                    <Link
                      href={`/${locale}/blog/${rp.slug}`}
                      className="text-[#F5C518] text-xs font-semibold hover:underline"
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
  );
}
