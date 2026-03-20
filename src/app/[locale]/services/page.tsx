import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale }> }

const SERVICES = {
  en: [
    { icon: "🚀", slug: "digital-marketing", title: "Digital Marketing", desc: "Full-stack digital marketing strategy for Riyadh businesses. From brand awareness to lead generation and revenue growth." },
    { icon: "🖥️", slug: "web-design", title: "Web Design & Development", desc: "Modern, fast, mobile-first websites built for conversions. Performance-optimized and SEO-ready from day one." },
    { icon: "🔍", slug: "seo", title: "SEO Services", desc: "Local SEO, technical SEO, bilingual keyword strategy for Riyadh. Rank higher, get found faster by ready-to-buy customers." },
    { icon: "📢", slug: "google-ads", title: "Google Ads", desc: "Search, Display, Shopping, YouTube, and Maps Ads for Riyadh businesses. Maximum ROI from every riyal you spend." },
    { icon: "📱", slug: "meta-ads", title: "Meta Ads", desc: "Facebook and Instagram ads precisely targeting Riyadh customers. Creative campaigns built for Saudi social media behavior." },
    { icon: "📍", slug: "google-business-profile", title: "Google Business Profile", desc: "GBP creation, optimization, and Maps ranking. Be the first business customers find when searching locally in Riyadh." },
    { icon: "💬", slug: "social-media", title: "Social Media Marketing", desc: "Content creation, community management, and growth strategies across Instagram, Snapchat, TikTok, X, and LinkedIn." },
    { icon: "🛒", slug: "ecommerce", title: "E-Commerce Marketing", desc: "End-to-end e-commerce setup, optimization, and management for Saudi online stores on Salla, Zid, and Shopify." },
  ],
  ar: [
    { icon: "🚀", slug: "digital-marketing", title: "التسويق الرقمي", desc: "استراتيجية تسويق رقمي متكاملة لأعمال الرياض. من بناء الوعي بالعلامة التجارية إلى توليد العملاء ونمو الإيرادات." },
    { icon: "🖥️", slug: "web-design", title: "تصميم المواقع", desc: "مواقع عصرية وسريعة ومحسّنة للجوال، مصممة للتحويل. أداء عالٍ وجاهزة لتحسين محركات البحث من اليوم الأول." },
    { icon: "🔍", slug: "seo", title: "تحسين محركات البحث", desc: "SEO محلي وتقني واستراتيجية كلمات مفتاحية ثنائية اللغة للرياض. ارتقِ في النتائج، وظهر أسرع للعملاء الجاهزين للشراء." },
    { icon: "📢", slug: "google-ads", title: "إعلانات قوقل", desc: "إعلانات البحث والشبكة الإعلانية والتسوق واليوتيوب والخرائط لأعمال الرياض. أعلى عائد من كل ريال تنفقه." },
    { icon: "📱", slug: "meta-ads", title: "إعلانات ميتا", desc: "إعلانات فيسبوك وإنستقرام تستهدف بدقة عملاء الرياض. حملات إبداعية مبنية لسلوك السوشيال ميديا السعودي." },
    { icon: "📍", slug: "google-business-profile", title: "ملف النشاط في قوقل", desc: "إنشاء وتحسين ملف النشاط والتصدر في قوقل ماب. كن أول نشاط يجده العملاء عند البحث محلياً في الرياض." },
    { icon: "💬", slug: "social-media", title: "السوشيال ميديا", desc: "إنشاء محتوى وإدارة المجتمع واستراتيجيات النمو عبر إنستقرام وسناب وتيك توك وتويتر ولينكدإن." },
    { icon: "🛒", slug: "ecommerce", title: "التجارة الإلكترونية", desc: "إعداد وتحسين وإدارة متاجر إلكترونية سعودية من الألف إلى الياء على سلة وزد وشوبيفاي." },
  ],
};

const CONTENT = {
  en: {
    meta: { title: "Digital Marketing Services in Riyadh | Local City Solutions", description: "Full digital marketing services for Riyadh businesses: SEO, Google Ads, Meta Ads, Web Design, Google Business Profile, Social Media, and E-Commerce." },
    label: "Our Services", h1: "Digital Marketing Services Tailored for the Saudi Market", sub: "From local SEO to paid ads to world-class web design — every service we offer is built around the Riyadh market, Saudi consumer behavior, and your business goals.",
    cta: { heading: "Not Sure Which Service You Need?", subtitle: "Get a free consultation and we'll recommend the exact mix of services to maximize your growth in Riyadh." },
    learnMore: "Learn More →",
  },
  ar: {
    meta: { title: "خدمات التسويق الرقمي في الرياض | لوكال سيتي سولوشنز", description: "خدمات تسويق رقمي متكاملة لأعمال الرياض: SEO وإعلانات قوقل وإعلانات ميتا وتصميم مواقع وملف النشاط والسوشيال ميديا والتجارة الإلكترونية." },
    label: "خدماتنا", h1: "خدمات التسويق الرقمي المصمّمة للسوق السعودي", sub: "من SEO المحلي إلى الإعلانات المدفوعة إلى تصميم المواقع العالمي المستوى — كل خدمة نقدمها مبنية حول سوق الرياض وسلوك المستهلك السعودي وأهداف نشاطك.",
    cta: { heading: "مو متأكد أي خدمة تحتاجها؟", subtitle: "احصل على استشارة مجانية وسنوصي بالمزيج الصح من الخدمات لتحقيق أقصى نمو لك في الرياض." },
    learnMore: "اعرف أكثر ←",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = CONTENT[locale] || CONTENT.en;
  const services = SERVICES[locale] || SERVICES.en;
  const p = isAr ? "/ar" : "";

  return (
    <>
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-4">{c.label}</span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{c.h1}</h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">{c.sub}</p>
        </div>
      </section>

      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <article key={service.slug} className={`reveal delay-${(i % 4) + 1} group relative bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-7 hover:-translate-y-1 hover:border-[#F5C518]/25 transition-all duration-300 overflow-hidden`}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C518] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="text-3xl mb-4">{service.icon}</div>
                <h2 className="text-white font-bold text-base mb-2">{service.title}</h2>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{service.desc}</p>
                <Link href={`${p}/services/${service.slug}`} className="inline-flex items-center gap-1 text-[#F5C518] text-xs font-semibold group-hover:gap-2 transition-all">{c.learnMore}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABox heading={c.cta.heading} subtitle={c.cta.subtitle} locale={locale} bg="dark" />
    </>
  );
}
