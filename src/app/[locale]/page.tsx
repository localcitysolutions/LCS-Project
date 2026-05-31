import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTABox from "@/components/CTABox";
import TrackableLink from "@/components/TrackableLink";
import { IMAGES, altFor } from "@/lib/images";

type Locale = "en" | "ar";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const CONTENT = {
  en: {
    meta: {
      title: "Digital Marketing Agency in Riyadh | Local City Solutions",
      description:
        "Full-service digital marketing agency in Riyadh. SEO, Google Ads, Meta Ads, web design & social media. Bilingual AR/EN team. 150+ projects. Free audit.",
    },
    hero: {
      badge: "Digital Marketing Agency — Riyadh, KSA",
      h1a: "We Help Riyadh Businesses",
      h1b: "Dominate Online",
      sub: "SEO, Google Ads, Meta Ads, web design, and Google Business Profile services built specifically for the Saudi market. More visibility. More leads. More revenue.",
      cta1: "Get Free Audit →",
      cta2: "Call +966 56 422 9190",
      stats: [
        { value: "5+", label: "Years Exp." },
        { value: "150+", label: "Projects" },
        { value: "EN/AR", label: "Bilingual" },
      ],
    },
    services: {
      label: "Our Services",
      heading: "Everything Your Riyadh Business Needs to Grow Online",
      sub: "From SEO to paid ads to web design — all under one Riyadh-focused agency.",
      learnMore: "Learn More →",
      viewAll: "View All Services →",
      badge: "Core",
    },
    why: {
      label: "Why Choose Us",
      heading: "The LCS Advantage",
      sub: "We are not a generic agency. We are Riyadh specialists.",
    },
    howWeWork: {
      label: "Our Process",
      heading: "How We Work",
    },
    industries: {
      label: "Industries We Serve",
      heading: "We Know Your Industry",
      sub: "Specialized digital marketing for every major sector in Riyadh.",
      viewAll: "View All Industries →",
    },
    districts: {
      label: "Local Coverage",
      heading: "We Serve All Riyadh Districts",
      sub: "Hyperlocal digital marketing for every neighbourhood in the capital.",
      viewAll: "View All Districts →",
    },
  },
  ar: {
    meta: {
      title: "وكالة تسويق رقمي في الرياض | لوكال سيتي سولوشنز",
      description:
        "لوكال سيتي سولوشنز — وكالة التسويق الرقمي الأولى في الرياض. SEO وإعلانات قوقل وميتا وتصميم مواقع وملف النشاط — مصممة للسوق السعودي.",
    },
    hero: {
      badge: "وكالة تسويق رقمي — الرياض، المملكة العربية السعودية",
      h1a: "نساعد أعمال الرياض",
      h1b: "تسيطر على الإنترنت",
      sub: "خدمات تحسين محركات البحث، إعلانات قوقل، إعلانات ميتا، تصميم مواقع، وملف النشاط التجاري — مصمّمة خصيصاً للسوق السعودي. ظهور أقوى. عملاء أكثر. إيرادات أعلى.",
      cta1: "احصل على تدقيق مجاني ←",
      cta2: "اتصل:",
      stats: [
        { value: "+٥", label: "سنوات خبرة" },
        { value: "+١٥٠", label: "مشروع" },
        { value: "ع/إن", label: "ثنائي اللغة" },
      ],
    },
    services: {
      label: "خدماتنا",
      heading: "كل ما يحتاجه نشاطك الرقمي في الرياض",
      sub: "من تحسين محركات البحث إلى الإعلانات المدفوعة وتصميم المواقع — كل شيء تحت سقف وكالة واحدة متخصصة في الرياض.",
      learnMore: "اعرف أكثر ←",
      viewAll: "شوف كل الخدمات ←",
      badge: "أساسي",
    },
    why: {
      label: "ليش تختارنا",
      heading: "ميزتنا في لوكال سيتي",
      sub: "مو وكالة عادية. نحن متخصصون في سوق الرياض.",
    },
    howWeWork: {
      label: "طريقة شغلنا",
      heading: "كيف نشتغل معك",
    },
    industries: {
      label: "القطاعات اللي نخدمها",
      heading: "نعرف قطاعك زين",
      sub: "تسويق رقمي متخصص لكل قطاع رئيسي في الرياض.",
      viewAll: "شوف كل القطاعات ←",
    },
    districts: {
      label: "التغطية الجغرافية",
      heading: "نخدم كل أحياء الرياض",
      sub: "تسويق رقمي محلي دقيق لكل حي في العاصمة.",
      viewAll: "شوف كل الأحياء ←",
    },
  },
};

const SERVICES = {
  en: [
    { icon: "🚀", title: "Digital Marketing", slug: "digital-marketing", desc: "Full-stack digital marketing strategy for Riyadh businesses. From brand awareness to lead generation." },
    { icon: "🖥️", title: "Web Design", slug: "web-design", desc: "Modern, fast, mobile-first websites built for conversions. Performance-optimized and SEO-ready." },
    { icon: "🔍", title: "SEO Services", slug: "seo", desc: "Local SEO, technical SEO, bilingual keyword strategy. Rank higher, get found faster in Riyadh." },
    { icon: "📢", title: "Google Ads", slug: "google-ads", desc: "Search, Display, Shopping, and Maps Ads for Riyadh businesses. Maximum ROI, minimum waste." },
    { icon: "📱", title: "Meta Ads", slug: "meta-ads", desc: "Facebook and Instagram ads precisely targeting Riyadh customers. Creative campaigns that convert." },
    { icon: "📍", title: "Google Business Profile", slug: "google-business-profile", desc: "GBP optimization and Maps ranking. Be the first business customers find locally." },
    { icon: "💬", title: "Social Media", slug: "social-media", desc: "Content creation, community management, and growth strategies across all major platforms." },
    { icon: "🛒", title: "E-Commerce", slug: "ecommerce", desc: "End-to-end e-commerce setup, optimization, and management for Saudi online stores." },
  ],
  ar: [
    { icon: "🚀", title: "التسويق الرقمي", slug: "digital-marketing", desc: "استراتيجية تسويق رقمي متكاملة لأعمال الرياض. من بناء الوعي بالعلامة التجارية إلى توليد العملاء." },
    { icon: "🖥️", title: "تصميم المواقع", slug: "web-design", desc: "مواقع عصرية وسريعة ومحسّنة للجوال، مصممة للتحويل. أداء عالٍ وجاهزة لتحسين محركات البحث." },
    { icon: "🔍", title: "تحسين محركات البحث", slug: "seo", desc: "SEO محلي، تقني، واستراتيجية كلمات مفتاحية ثنائية اللغة. ارتقِ في النتائج، وظهر أسرع في الرياض." },
    { icon: "📢", title: "إعلانات قوقل", slug: "google-ads", desc: "إعلانات البحث والشبكة الإعلانية والتسوق والخرائط لأعمال الرياض. أعلى عائد، أقل هدر." },
    { icon: "📱", title: "إعلانات ميتا", slug: "meta-ads", desc: "إعلانات فيسبوك وإنستقرام تستهدف بدقة عملاء الرياض. حملات إبداعية تحوّل وتبيع." },
    { icon: "📍", title: "ملف النشاط في قوقل", slug: "google-business-profile", desc: "تحسين ملف النشاط والتصدر في قوقل ماب. كن أول نشاط يجده العملاء عند البحث محلياً." },
    { icon: "💬", title: "السوشيال ميديا", slug: "social-media", desc: "إنشاء محتوى، إدارة المجتمع، واستراتيجيات نمو عبر كل المنصات الرئيسية." },
    { icon: "🛒", title: "التجارة الإلكترونية", slug: "ecommerce", desc: "إعداد وتحسين وإدارة متاجر إلكترونية سعودية من الألف إلى الياء." },
  ],
};

const WHY_ITEMS = {
  en: [
    { icon: "🇸🇦", title: "Saudi Market Experts", desc: "Deep understanding of local consumer behavior, trends, and Saudi business culture." },
    { icon: "🌐", title: "AR/EN Fully Bilingual", desc: "All campaigns, content, and communication delivered fluently in Arabic and English." },
    { icon: "⏱️", title: "5+ Years Experience", desc: "Proven track record with 150+ Riyadh businesses across every major sector." },
    { icon: "📊", title: "Data-Driven Results", desc: "Every decision backed by analytics, conversion tracking, and clear monthly KPIs." },
  ],
  ar: [
    { icon: "🇸🇦", title: "خبراء السوق السعودي", desc: "فهم عميق لسلوك المستهلك المحلي والتوجهات وثقافة الأعمال السعودية." },
    { icon: "🌐", title: "ثنائي اللغة: عربي وإنجليزي", desc: "كل الحملات والمحتوى والتواصل يُقدَّم بطلاقة بالعربية والإنجليزية." },
    { icon: "⏱️", title: "+٥ سنوات خبرة", desc: "سجل حافل مع أكثر من ١٥٠ نشاط تجاري في الرياض عبر كل القطاعات الرئيسية." },
    { icon: "📊", title: "نتائج مبنية على البيانات", desc: "كل قرار مدعوم بالتحليلات وتتبع التحويلات ومؤشرات أداء واضحة شهرياً." },
  ],
};

const STEPS = {
  en: [
    { num: "01", title: "Free Audit", desc: "We analyze your current digital presence and identify your biggest growth opportunities." },
    { num: "02", title: "Strategy", desc: "A custom growth roadmap tailored to your goals, budget, and Riyadh market position." },
    { num: "03", title: "Execute", desc: "We launch and actively manage all campaigns, ads, content, and digital assets." },
    { num: "04", title: "Report & Scale", desc: "Monthly reporting with clear KPIs. We double down on what works and scale fast." },
  ],
  ar: [
    { num: "٠١", title: "تدقيق مجاني", desc: "نحلل وضعك الرقمي الحالي ونحدد أكبر فرص النمو المتاحة لك." },
    { num: "٠٢", title: "الاستراتيجية", desc: "خارطة طريق نمو مخصصة تناسب أهدافك وميزانيتك وموقعك في سوق الرياض." },
    { num: "٠٣", title: "التنفيذ", desc: "نطلق ونُدير بفاعلية كل الحملات والإعلانات والمحتوى والأصول الرقمية." },
    { num: "٠٤", title: "التقارير والتوسع", desc: "تقارير شهرية بمؤشرات أداء واضحة. نضاعف ما ينجح ونتوسع بسرعة." },
  ],
};

const INDUSTRIES = {
  en: [
    { icon: "🍽️", name: "Restaurants & Cafes", slug: "restaurants" },
    { icon: "🏥", name: "Clinics & Healthcare", slug: "clinics" },
    { icon: "💇", name: "Salons & Beauty", slug: "salons" },
    { icon: "🏠", name: "Real Estate", slug: "real-estate" },
    { icon: "🛍️", name: "Retail & E-commerce", slug: "retail" },
    { icon: "🎓", name: "Education & Training", slug: "education" },
    { icon: "🚗", name: "Automotive", slug: "automotive" },
    { icon: "🏨", name: "Hotels & Hospitality", slug: "hotels" },
  ],
  ar: [
    { icon: "🍽️", name: "المطاعم والكافيهات", slug: "restaurants" },
    { icon: "🏥", name: "العيادات والرعاية الصحية", slug: "clinics" },
    { icon: "💇", name: "الصالونات والتجميل", slug: "salons" },
    { icon: "🏠", name: "العقارات", slug: "real-estate" },
    { icon: "🛍️", name: "التجزئة والتجارة الإلكترونية", slug: "retail" },
    { icon: "🎓", name: "التعليم والتدريب", slug: "education" },
    { icon: "🚗", name: "السيارات", slug: "automotive" },
    { icon: "🏨", name: "الفنادق والضيافة", slug: "hotels" },
  ],
};

const TESTIMONIALS_LABELS = {
  en: { label: "Testimonials", heading: "What Riyadh Businesses Say", sub: "Real feedback from Saudi business owners we've worked with." },
  ar: { label: "آراء العملاء", heading: "وش يقولون أعمال الرياض", sub: "آراء حقيقية من أصحاب أعمال سعوديين اشتغلنا معاهم." },
};

const TESTIMONIALS = [
  {
    avatarIdx: 0,
    nameEn: "Restaurant Owner, Al Malqa",
    nameAr: "صاحب مطعم، الملقا",
    quoteEn: "Reservations went up 40% in 3 months. Their Reels strategy actually understands Saudi food culture.",
    quoteAr: "الحجوزات زادت ٤٠٪ في ٣ شهور. استراتيجيتهم في الريلز تفهم ثقافة الأكل السعودي.",
  },
  {
    avatarIdx: 1,
    nameEn: "Clinic Manager, Al Sulaimaniyah",
    nameAr: "مدير عيادة، السليمانية",
    quoteEn: "They built our Google Ads from zero. Now we get 8 patient bookings per week from search.",
    quoteAr: "بنوا لنا إعلانات قوقل من الصفر. الحين نستقبل ٨ حجوزات مرضى أسبوعياً من البحث.",
  },
  {
    avatarIdx: 2,
    nameEn: "E-commerce Founder, KAFD",
    nameAr: "مؤسس متجر إلكتروني، كافد",
    quoteEn: "Honest pricing, real results. They know the Saudi market — that matters.",
    quoteAr: "أسعار شفافة ونتائج حقيقية. يعرفون السوق السعودي — وهذا اللي يفرق.",
  },
];

const DISTRICTS = [
  { en: "Al Olaya", ar: "العليا", slug: "al-olaya" },
  { en: "Al Malqa", ar: "الملقا", slug: "al-malqa" },
  { en: "Al Nakheel", ar: "النخيل", slug: "al-nakheel" },
  { en: "Al Yasmin", ar: "الياسمين", slug: "al-yasmin" },
  { en: "Hittin", ar: "حطين", slug: "hittin" },
  { en: "Al Sahafah", ar: "الصحافة", slug: "al-sahafah" },
  { en: "Al Worood", ar: "الورود", slug: "al-worood" },
  { en: "Al Sulaimaniyah", ar: "السليمانية", slug: "al-sulaimaniyah" },
];


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  const isAr = locale === "ar";
  return {
    title: { absolute: c.meta.title },
    description: c.meta.description,
    alternates: {
      canonical: `https://localcitysolutions.com/${locale}`,
      languages: {
        en: "https://localcitysolutions.com/en",
        ar: "https://localcitysolutions.com/ar",
        "x-default": "https://localcitysolutions.com/en",
      },
    },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url: `https://localcitysolutions.com/${locale}`,
      locale: isAr ? "ar_SA" : "en_US",
      images: [{ url: "https://localcitysolutions.com/og-image.jpg", width: 1200, height: 630, alt: c.meta.title }],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = CONTENT[locale] || CONTENT.en;
  const services = SERVICES[locale] || SERVICES.en;
  const whyItems = WHY_ITEMS[locale] || WHY_ITEMS.en;
  const steps = STEPS[locale] || STEPS.en;
  const industries = INDUSTRIES[locale] || INDUSTRIES.en;
  const p = `/${locale}`;

  return (
    <main dir={isAr ? "rtl" : "ltr"}>
      {/* HERO — background image with dark gradient overlay.
          `isolate` creates a local stacking context so the -z-10 image + overlay
          stay scoped inside the section instead of being pushed behind document body. */}
      <section className="relative isolate min-h-[85vh] flex items-center justify-center overflow-hidden pt-16 md:pt-20">
        <Image
          src={IMAGES.hero.src}
          alt={altFor(IMAGES.hero, locale)}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover -z-10"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A1628]/80 via-[#0A1628]/70 to-[#0A1628]/90"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-12 md:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5C518]/25 bg-[#F5C518]/[0.08] text-[#F5C518] text-xs md:text-sm font-semibold mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#F5C518] shrink-0 badge-dot" />
            {c.hero.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-4 md:mb-6">
            {c.hero.h1a}
            <br />
            <span className="text-[#F5C518]" style={{ textDecoration: "underline", textDecorationColor: "rgba(245,197,24,0.35)", textUnderlineOffset: "6px", textDecorationThickness: "2px" }}>
              {c.hero.h1b}
            </span>
          </h1>

          <p className="text-sm md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto mb-7 md:mb-10 leading-relaxed">
            {c.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <TrackableLink href={`${p}/free-audit`} track="free-audit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-[#F5C518] text-[#0A1628] font-bold text-sm md:text-base hover:bg-[#F5C518]/90 transition-all shadow-2xl shadow-[#F5C518]/25 hover:-translate-y-0.5">
              {c.hero.cta1}
            </TrackableLink>
            <TrackableLink href="tel:+966564229190" track="phone" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 md:px-8 md:py-4 rounded-full border border-white/30 text-white font-medium text-sm md:text-base hover:border-white/50 hover:bg-white/[0.05] transition-all">
              {isAr ? <>{c.hero.cta2} <span dir="ltr">+966 56 422 9190</span></> : c.hero.cta2}
            </TrackableLink>
          </div>
        </div>
      </section>

      {/* STATS — background image with dark overlay */}
      <section className="relative isolate py-16 md:py-24 overflow-hidden">
        <Image
          src={IMAGES.statsBg.src}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover -z-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0A1628]/92 via-[#0A1628]/85 to-[#0A1628]/92" aria-hidden="true" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 md:gap-10">
            {c.hero.stats.map((stat, i) => (
              <div key={i} className={`reveal delay-${i + 1} text-center`}>
                <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#F5C518] leading-none mb-2 md:mb-3">{stat.value}</div>
                <div className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.18em] text-white/70 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 md:py-20 bg-[#080E1A]" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">{c.services.label}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{c.services.heading}</h2>
            <p className="text-white/45 mt-2 md:mt-4 text-xs md:text-base max-w-xl mx-auto">{c.services.sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const img = IMAGES.services[service.slug as keyof typeof IMAGES.services];
              return (
              <article key={service.slug} className={`reveal delay-${(i % 4) + 1} group relative bg-[#0E1A2E] border border-white/[0.06] rounded-xl hover:-translate-y-1 hover:border-[#F5C518]/25 transition-all duration-300 overflow-hidden h-full flex flex-col`}>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C518] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
                {img ? (
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={img.src}
                      alt={altFor(img, locale)}
                      width={img.width}
                      height={img.height}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E1A2E] via-[#0E1A2E]/30 to-transparent" aria-hidden="true" />
                  </div>
                ) : null}
                <div className="relative p-5 md:p-7 flex-1 flex flex-col">
                  <span className="absolute top-3 right-4 text-5xl md:text-7xl font-black text-white/[0.025] select-none pointer-events-none leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <span className="inline-flex items-center self-start px-2 py-0.5 rounded-md text-[10px] font-bold text-[#F5C518] bg-[#F5C518]/10 mb-4">{c.services.badge}</span>
                  {!img ? (
                    <div className="text-xl md:text-3xl leading-none mb-3 md:mb-4">{service.icon}</div>
                  ) : null}
                  <h3 className="text-white font-bold text-sm md:text-lg mb-2 leading-tight">{service.title}</h3>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 flex-1">{service.desc}</p>
                  <Link href={`${p}/services/${service.slug}`} className="inline-flex items-center gap-1 text-[#F5C518] text-xs md:text-sm font-semibold group-hover:gap-2 transition-all mt-auto self-start">{c.services.learnMore}</Link>
                </div>
              </article>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link href={`${p}/services`} className="inline-flex items-center gap-2 text-[#F5C518] text-sm font-semibold hover:gap-3 transition-all">{c.services.viewAll}</Link>
          </div>
        </div>
      </section>

      {/* WHY LCS */}
      <section className="py-12 md:py-20 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">{c.why.label}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{c.why.heading}</h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-lg mx-auto text-xs md:text-base">{c.why.sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <div key={item.title} className={`reveal delay-${i + 1} p-5 md:p-7 rounded-xl border border-white/[0.06] bg-[#0E1A2E] hover:border-[#F5C518]/20 hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col`}>
                <div className="text-3xl md:text-4xl leading-none mb-3 md:mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-sm md:text-base mb-2">{item.title}</h3>
                <p className="text-white/45 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="py-12 md:py-20 bg-[#080E1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">{c.howWeWork.label}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{c.howWeWork.heading}</h2>
          </div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="hidden md:block absolute top-[2rem] left-[14%] right-[14%] h-px bg-gradient-to-r from-transparent via-[#F5C518]/20 to-transparent" />
            {steps.map((step, i) => (
              <div key={step.num} className={`reveal delay-${i + 1} relative text-center`}>
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] text-[#F5C518] font-black text-base md:text-xl mb-3 md:mb-5 mx-auto">{step.num}</div>
                <h3 className="text-white font-bold text-sm md:text-base mb-1 md:mb-2">{step.title}</h3>
                <p className="text-white/45 text-xs md:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-12 md:py-20 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">{c.industries.label}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{c.industries.heading}</h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-xl mx-auto text-xs md:text-base">{c.industries.sub}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {industries.map((ind, i) => (
              <Link key={ind.slug} href={`${p}/industries/${ind.slug}`} className={`reveal delay-${(i % 4) + 1} group flex flex-row md:flex-col items-center gap-3 p-4 md:p-7 rounded-xl bg-[#0E1A2E] border border-white/[0.06] hover:border-[#F5C518]/30 hover:-translate-y-1 transition-all duration-300`}>
                <span className="text-2xl md:text-4xl leading-none transition-transform duration-300 group-hover:scale-110 shrink-0 block">{ind.icon}</span>
                <span className="text-white/65 font-medium text-xs md:text-sm group-hover:text-white transition-colors">{ind.name}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`${p}/industries`} className="inline-flex items-center gap-2 text-[#F5C518] text-sm font-semibold hover:gap-3 transition-all">{c.industries.viewAll}</Link>
          </div>
        </div>
      </section>

      {/* RIYADH DISTRICTS */}
      <section className="py-12 md:py-20 bg-[#080E1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal mb-8 md:mb-12">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">{c.districts.label}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{c.districts.heading}</h2>
            <p className="text-white/45 mt-2 md:mt-4 text-xs md:text-base">{c.districts.sub}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {DISTRICTS.map((d, i) => (
              <Link key={d.slug} href={`${p}/riyadh/${d.slug}`} className={`reveal delay-${(i % 6) + 1} px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border border-white/10 text-white/55 text-[10px] md:text-sm font-medium hover:border-[#F5C518]/50 hover:text-[#F5C518] hover:bg-[#F5C518]/[0.05] transition-all`}>
                {isAr ? d.ar : d.en}
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href={`${p}/riyadh`} className="inline-flex items-center gap-2 text-[#F5C518] text-sm font-semibold hover:gap-3 transition-all">{c.districts.viewAll}</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 md:py-20 bg-[#0C1424]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">{(TESTIMONIALS_LABELS[locale] || TESTIMONIALS_LABELS.en).label}</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{(TESTIMONIALS_LABELS[locale] || TESTIMONIALS_LABELS.en).heading}</h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-xl mx-auto text-xs md:text-base">{(TESTIMONIALS_LABELS[locale] || TESTIMONIALS_LABELS.en).sub}</p>
          </div>
          {/* Mobile: snap-scroll carousel (~85% width per card so the next one
              peeks ~15% as a swipe affordance). Desktop (md+): regular 3-col
              grid, scroll/snap disabled. RTL is automatic — overflow-x scrolls
              right-to-left when the parent <main> carries dir="rtl". */}
          <div className="-mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0 flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-3 md:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {TESTIMONIALS.map((t, i) => {
              const avatar = IMAGES.avatars[t.avatarIdx];
              const name = isAr ? t.nameAr : t.nameEn;
              const quote = isAr ? t.quoteAr : t.quoteEn;
              return (
                <figure key={i} className={`reveal delay-${i + 1} shrink-0 basis-[85%] sm:basis-[55%] md:basis-auto md:shrink snap-center relative bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-7 hover:border-[#F5C518]/20 transition-all h-full flex flex-col`}>
                  <div className="text-[#F5C518] text-3xl leading-none mb-3 select-none" aria-hidden="true">&ldquo;</div>
                  <blockquote className="text-white/80 text-sm md:text-base leading-relaxed mb-5 flex-1">{quote}</blockquote>
                  <figcaption className="flex items-center gap-3 mt-auto">
                    <Image
                      src={avatar.src}
                      alt={altFor(avatar, locale)}
                      width={avatar.width}
                      height={avatar.height}
                      loading="lazy"
                      sizes="48px"
                      className="rounded-full w-12 h-12 object-cover border border-white/10"
                    />
                    <span className="text-white/70 font-semibold text-xs md:text-sm">{name}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <CTABox locale={locale} />
    </main>
  );
}
