import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale }> }

const INDUSTRIES = {
  en: [
    { icon: "🍽️", slug: "restaurants", title: "Restaurants & Cafes", desc: "Menu SEO, Google Maps optimization, Instagram growth, food delivery app marketing, and reservation campaigns for Riyadh's thriving F&B scene." },
    { icon: "🏥", slug: "clinics", title: "Clinics & Healthcare", desc: "Compliant medical SEO, patient acquisition campaigns, Google Business Profile for clinics, and reputation management for healthcare providers." },
    { icon: "💇", slug: "salons", title: "Salons & Beauty", desc: "Instagram growth, appointment booking optimization, influencer marketing, and local SEO for salons and beauty businesses." },
    { icon: "🏠", slug: "real-estate", title: "Real Estate", desc: "Property listing SEO, developer lead generation, Google Ads for real estate, and virtual tour marketing for Saudi property companies." },
    { icon: "🛍️", slug: "retail", title: "Retail & E-Commerce", desc: "Product SEO, Google Shopping campaigns, Salla/Zid optimization, and meta ads for retail and online stores in Saudi Arabia." },
    { icon: "🎓", slug: "education", title: "Education & Training", desc: "Enrollment campaigns, course marketing, LinkedIn ads for professional training, and SEO for educational institutions in Riyadh." },
    { icon: "🚗", slug: "automotive", title: "Automotive", desc: "Showroom traffic campaigns, used car marketplace optimization, Google Ads for auto services, and brand marketing for car businesses." },
    { icon: "🏨", slug: "hotels", title: "Hotels & Hospitality", desc: "Booking optimization, OTA ranking strategies, Google Hotel Ads, and content marketing for hospitality businesses in Saudi Arabia." },
  ],
  ar: [
    { icon: "🍽️", slug: "restaurants", title: "المطاعم والكافيهات", desc: "SEO للقوائم، تحسين قوقل ماب، نمو إنستقرام، تسويق تطبيقات التوصيل، وحملات الحجوزات لمشهد المطاعم المزدهر في الرياض." },
    { icon: "🏥", slug: "clinics", title: "العيادات والرعاية الصحية", desc: "SEO طبي متوافق، حملات اكتساب المرضى، ملف النشاط لعيادات قوقل، وإدارة السمعة لمقدمي الرعاية الصحية." },
    { icon: "💇", slug: "salons", title: "الصالونات والتجميل", desc: "نمو إنستقرام، تحسين حجوزات المواعيد، التسويق عبر المؤثرين، وSEO المحلي للصالونات وأعمال التجميل." },
    { icon: "🏠", slug: "real-estate", title: "العقارات", desc: "SEO لإدراج العقارات، توليد عملاء المطورين، إعلانات قوقل للعقارات، وتسويق الجولات الافتراضية لشركات العقار السعودية." },
    { icon: "🛍️", slug: "retail", title: "التجزئة والتجارة الإلكترونية", desc: "SEO المنتجات، حملات قوقل شوبينج، تحسين سلة وزد، وإعلانات ميتا للتجزئة والمتاجر الإلكترونية في السعودية." },
    { icon: "🎓", slug: "education", title: "التعليم والتدريب", desc: "حملات التسجيل، تسويق الدورات، إعلانات لينكدإن للتدريب المهني، وSEO للمؤسسات التعليمية في الرياض." },
    { icon: "🚗", slug: "automotive", title: "السيارات", desc: "حملات حركة المعارض، تحسين سوق السيارات المستعملة، إعلانات قوقل لخدمات السيارات، والتسويق الإعلامي لأعمال السيارات." },
    { icon: "🏨", slug: "hotels", title: "الفنادق والضيافة", desc: "تحسين الحجوزات، استراتيجيات ترتيب OTA، قوقل هوتيل آدز، وتسويق المحتوى لأعمال الضيافة في السعودية." },
  ],
};

const CONTENT = {
  en: { meta: { title: "Industries We Serve | Digital Marketing Riyadh", description: "Local City Solutions provides specialized digital marketing for restaurants, clinics, real estate, retail, education, and more in Riyadh." }, label: "Industries", h1: "We Know Your Industry Inside Out", sub: "Generic digital marketing doesn't work. We bring deep industry expertise to every client engagement — understanding what drives customers in your specific sector.", cta: { heading: "Ready to Dominate Your Industry in Riyadh?", subtitle: "Get a free audit tailored to your sector and see exactly how we'd grow your business." } },
  ar: { meta: { title: "القطاعات التي نخدمها — التسويق الرقمي لكل قطاع في الرياض", description: "لوكال سيتي سولوشنز تقدم تسويقاً رقمياً متخصصاً للمطاعم والعيادات والعقارات والتجزئة والتعليم والمزيد في الرياض." }, label: "القطاعات", h1: "نعرف قطاعك من الداخل", sub: "التسويق الرقمي العام لا يعمل. نجلب خبرة قطاعية عميقة لكل تعامل مع عميل — نفهم ما يحرك العملاء في قطاعك تحديداً.", cta: { heading: "حاضر تتصدر قطاعك في الرياض؟", subtitle: "احصل على تدقيق مجاني مخصص لقطاعك وشوف كيف سنزيد نشاطك." } },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  const isAr = locale === "ar";
  const pageTitle = isAr
    ? "القطاعات التي نخدمها | لوكال سيتي سولوشنز"
    : "Industries We Serve | Local City Solutions";
  return {
    title: { absolute: pageTitle },
    description: c.meta.description,
    alternates: {
      canonical: `https://localcitysolutions.com/${locale}/industries`,
      languages: {
        en: "https://localcitysolutions.com/en/industries",
        ar: "https://localcitysolutions.com/ar/industries",
        "x-default": "https://localcitysolutions.com/en/industries",
      },
    },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url: `https://localcitysolutions.com/${locale}/industries`,
      locale: isAr ? "ar_SA" : "en_US",
      images: [{ url: "https://localcitysolutions.com/og-image.jpg", width: 1200, height: 630, alt: c.meta.title }],
    },
  };
}

export default async function IndustriesPage({ params }: PageProps) {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  const industries = INDUSTRIES[locale] || INDUSTRIES.en;

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {industries.map((ind, i) => (
              <Link key={ind.slug} href={`/${locale}/industries/${ind.slug}`} className={`reveal delay-${(i % 4) + 1} bg-[#0E1A2E] border border-white/5 rounded-xl p-6 hover:border-[#F5C518]/20 transition-all group`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl shrink-0 mt-0.5">{ind.icon}</div>
                  <div>
                    <h2 className="text-white font-bold text-base mb-2 group-hover:text-[#F5C518] transition-colors">{ind.title}</h2>
                    <p className="text-white/50 text-sm leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABox heading={c.cta.heading} subtitle={c.cta.subtitle} locale={locale} bg="dark" />
    </>
  );
}
