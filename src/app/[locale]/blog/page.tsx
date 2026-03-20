import type { Metadata } from "next";
import Link from "next/link";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale }> }

const POSTS = {
  en: [
    { slug: "seo-riyadh-guide-2024", cat: "SEO", title: "The Complete SEO Guide for Riyadh Businesses in 2024", excerpt: "Everything you need to know about ranking on Google in Saudi Arabia — from keyword research to technical SEO to local optimization.", date: "Dec 15, 2024", readTime: "12 min read" },
    { slug: "google-ads-saudi-arabia", cat: "Google Ads", title: "How to Run Google Ads in Saudi Arabia: A Practical Guide", excerpt: "Learn how to set up, target, and optimize Google Ads campaigns specifically for the Saudi Arabian market.", date: "Nov 28, 2024", readTime: "9 min read" },
    { slug: "arabic-seo-tips", cat: "SEO", title: "Arabic SEO: Why Your Bilingual Strategy is Costing You Customers", excerpt: "Most Riyadh businesses underinvest in Arabic SEO. Here is what you are missing and how to fix it.", date: "Nov 10, 2024", readTime: "7 min read" },
    { slug: "snapchat-ads-saudi", cat: "Social Media", title: "Snapchat Advertising for Saudi Businesses: What Actually Works", excerpt: "Saudi Arabia is one of Snapchat's largest markets. Learn how to run campaigns that reach the Saudi audience effectively.", date: "Oct 22, 2024", readTime: "8 min read" },
    { slug: "google-business-profile-riyadh", cat: "Local SEO", title: "Google Business Profile for Riyadh Restaurants: The Complete Setup Guide", excerpt: "Step-by-step guide to setting up and optimizing your Google Business Profile to dominate local search in Riyadh.", date: "Oct 5, 2024", readTime: "10 min read" },
    { slug: "ecommerce-saudi-salla-zid", cat: "E-Commerce", title: "Salla vs Zid: Which Platform Is Right for Your Saudi E-Commerce Store?", excerpt: "A detailed comparison of Saudi Arabia's two leading e-commerce platforms to help you make the right choice.", date: "Sep 18, 2024", readTime: "11 min read" },
  ],
  ar: [
    { slug: "seo-riyadh-guide-2024", cat: "تحسين محركات البحث", title: "الدليل الشامل لتحسين محركات البحث لأعمال الرياض في ٢٠٢٤", excerpt: "كل ما تحتاج معرفته للتصدر على قوقل في السعودية — من بحث الكلمات المفتاحية إلى SEO التقني إلى التحسين المحلي.", date: "١٥ ديسمبر ٢٠٢٤", readTime: "١٢ دقيقة قراءة" },
    { slug: "google-ads-saudi-arabia", cat: "إعلانات قوقل", title: "كيف تشغّل إعلانات قوقل في السعودية: دليل عملي", excerpt: "تعلّم كيفية إعداد واستهداف وتحسين حملات إعلانات قوقل خصيصاً للسوق السعودي.", date: "٢٨ نوفمبر ٢٠٢٤", readTime: "٩ دقائق قراءة" },
    { slug: "arabic-seo-tips", cat: "تحسين محركات البحث", title: "SEO العربي: ليش استراتيجيتك ثنائية اللغة تكلّفك عملاء", excerpt: "معظم أعمال الرياض تستثمر أقل مما يجب في SEO العربي. إليك ما تفتقده وكيف تصلحه.", date: "١٠ نوفمبر ٢٠٢٤", readTime: "٧ دقائق قراءة" },
    { slug: "snapchat-ads-saudi", cat: "السوشيال ميديا", title: "إعلانات سناب شات للأعمال السعودية: ما الذي ينجح فعلاً", excerpt: "السعودية من أكبر أسواق سناب شات. تعلّم كيف تشغّل حملات تصل للجمهور السعودي بفاعلية.", date: "٢٢ أكتوبر ٢٠٢٤", readTime: "٨ دقائق قراءة" },
    { slug: "google-business-profile-riyadh", cat: "SEO المحلي", title: "ملف النشاط التجاري في قوقل لمطاعم الرياض: الدليل الكامل للإعداد", excerpt: "دليل خطوة بخطوة لإعداد وتحسين ملف نشاطك التجاري للتصدر في البحث المحلي بالرياض.", date: "٥ أكتوبر ٢٠٢٤", readTime: "١٠ دقائق قراءة" },
    { slug: "ecommerce-saudi-salla-zid", cat: "التجارة الإلكترونية", title: "سلة مقابل زد: أي المنصتين مناسبة لمتجرك الإلكتروني السعودي؟", excerpt: "مقارنة تفصيلية بين أبرز منصتي تجارة إلكترونية في السعودية لمساعدتك على اتخاذ القرار الصح.", date: "١٨ سبتمبر ٢٠٢٤", readTime: "١١ دقيقة قراءة" },
  ],
};

const CONTENT = {
  en: { meta: { title: "Digital Marketing Blog for Saudi Businesses | Local City Solutions", description: "Practical guides, tips, and insights on SEO, Google Ads, social media, and digital marketing for Riyadh and Saudi businesses." }, label: "Our Blog", h1: "Digital Marketing Insights for Saudi Businesses", sub: "Practical guides, strategies, and tips from Riyadh's digital marketing specialists.", allPosts: "All Posts", readMore: "Read More →" },
  ar: { meta: { title: "مدونة التسويق الرقمي للأعمال السعودية | لوكال سيتي سولوشنز", description: "أدلة عملية ونصائح ورؤى حول تحسين محركات البحث وإعلانات قوقل والسوشيال ميديا والتسويق الرقمي للأعمال في الرياض والسعودية." }, label: "مدونتنا", h1: "رؤى التسويق الرقمي للأعمال السعودية", sub: "أدلة واستراتيجيات ونصائح عملية من متخصصي التسويق الرقمي في الرياض.", allPosts: "كل المقالات", readMore: "اقرأ أكثر ←" },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = CONTENT[locale] || CONTENT.en;
  const posts = POSTS[locale] || POSTS.en;
  const p = isAr ? "/ar" : "";

  return (
    <>
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-4">{c.label}</span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{c.h1}</h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">{c.sub}</p>
        </div>
      </section>

      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <article key={post.slug} className={`reveal delay-${(i % 3) + 1} bg-[#0E1A2E] border border-white/5 rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all group`}>
                <div className="h-2 bg-gradient-to-r from-[#F5C518]/30 to-transparent" />
                <div className="p-6">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-bold uppercase tracking-widest mb-3">{post.cat}</span>
                  <h2 className={`text-white font-bold text-sm md:text-base mb-3 leading-snug group-hover:text-[#F5C518] transition-colors ${isAr ? "text-right" : ""}`}>{post.title}</h2>
                  <p className={`text-white/50 text-xs leading-relaxed mb-4 ${isAr ? "text-right" : ""}`}>{post.excerpt}</p>
                  <div className={`flex items-center justify-between text-white/30 text-[10px] ${isAr ? "flex-row-reverse" : ""}`}>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <Link href={`${p}/blog/${post.slug}`} className="text-[#F5C518] text-xs font-semibold hover:gap-2 transition-all">{c.readMore}</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
