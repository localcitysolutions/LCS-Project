export type ServiceSlug =
  | "digital-marketing" | "web-design" | "seo" | "google-ads"
  | "meta-ads" | "google-business-profile" | "social-media" | "ecommerce";

export const SERVICE_META: Record<
  ServiceSlug,
  { nameEn: string; nameAr: string; descEn: string; descAr: string }
> = {
  "digital-marketing": {
    nameEn: "Digital Marketing",
    nameAr: "التسويق الرقمي",
    descEn: "Full-stack digital marketing strategy for Riyadh businesses — brand awareness, lead generation, and revenue growth built for the Saudi market.",
    descAr: "استراتيجية تسويق رقمي متكاملة لأعمال الرياض — بناء وعي بالعلامة التجارية وتوليد العملاء ونمو الإيرادات مصممة للسوق السعودي.",
  },
  "web-design": {
    nameEn: "Web Design & Development",
    nameAr: "تصميم وتطوير المواقع",
    descEn: "Modern, fast, mobile-first websites built for conversions. Performance-optimised and SEO-ready from day one for Saudi businesses.",
    descAr: "مواقع عصرية وسريعة ومحسّنة للجوال مصممة للتحويل. أداء عالٍ وجاهزة لمحركات البحث من اليوم الأول للأعمال السعودية.",
  },
  "seo": {
    nameEn: "SEO Services",
    nameAr: "خدمات تحسين محركات البحث",
    descEn: "Local SEO, technical SEO, and bilingual keyword strategy for Riyadh. Rank higher and get found faster by ready-to-buy customers in Saudi Arabia.",
    descAr: "SEO محلي وتقني واستراتيجية كلمات مفتاحية ثنائية اللغة للرياض. تصدّر النتائج وظهر أسرع للعملاء الجاهزين للشراء في السعودية.",
  },
  "google-ads": {
    nameEn: "Google Ads Management",
    nameAr: "إدارة إعلانات قوقل",
    descEn: "Search, Display, Shopping, and Maps Ads for Riyadh businesses. Maximum ROI from every Saudi riyal spent on Google Ads campaigns.",
    descAr: "إعلانات البحث والشبكة الإعلانية والتسوق والخرائط لأعمال الرياض. أعلى عائد من كل ريال سعودي تنفقه على حملات قوقل.",
  },
  "meta-ads": {
    nameEn: "Meta Ads Management",
    nameAr: "إدارة إعلانات ميتا",
    descEn: "Facebook and Instagram ads precisely targeting Riyadh customers. Creative campaigns built for Saudi social media behaviour and buying patterns.",
    descAr: "إعلانات فيسبوك وإنستقرام تستهدف بدقة عملاء الرياض. حملات إبداعية مبنية لسلوك السوشيال ميديا وأنماط الشراء السعودية.",
  },
  "google-business-profile": {
    nameEn: "Google Business Profile",
    nameAr: "إدارة ملف قوقل للأعمال",
    descEn: "GBP creation, optimisation, and Maps ranking for Riyadh businesses. Be the first business customers find when searching locally in Saudi Arabia.",
    descAr: "إنشاء وتحسين ملف النشاط التجاري والتصدر في قوقل ماب للأعمال في الرياض. كن أول نشاط يجده العملاء عند البحث المحلي في السعودية.",
  },
  "social-media": {
    nameEn: "Social Media Management",
    nameAr: "إدارة وسائل التواصل الاجتماعي",
    descEn: "Content creation, community management, and growth strategies across Instagram, Snapchat, TikTok, X, and LinkedIn for Saudi businesses.",
    descAr: "إنشاء المحتوى وإدارة المجتمع واستراتيجيات النمو عبر إنستقرام وسناب وتيك توك وتويتر ولينكدإن للأعمال السعودية.",
  },
  "ecommerce": {
    nameEn: "E-Commerce Marketing",
    nameAr: "تسويق المتاجر الإلكترونية",
    descEn: "End-to-end e-commerce setup, optimisation, and management for Saudi online stores on Salla, Zid, and Shopify platforms.",
    descAr: "إعداد وتحسين وإدارة متاجر إلكترونية سعودية من الألف إلى الياء على منصات سلة وزد وشوبيفاي.",
  },
};

export function buildServiceSchema(slug: ServiceSlug, locale: "en" | "ar") {
  const meta = SERVICE_META[slug];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://localcitysolutions.com/#service-${slug}`,
    name: locale === "ar" ? meta.nameAr : meta.nameEn,
    description: locale === "ar" ? meta.descAr : meta.descEn,
    url: `https://localcitysolutions.com/${locale}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Local City Solutions",
      url: "https://localcitysolutions.com",
    },
    areaServed: [
      { "@type": "City", name: "Riyadh", alternateName: "الرياض" },
      { "@type": "Country", name: "Saudi Arabia", alternateName: "المملكة العربية السعودية" },
    ],
    serviceType: meta.nameEn,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Small and Medium Businesses in Saudi Arabia",
    },
  };
}
