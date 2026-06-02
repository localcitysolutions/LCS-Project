export type ImageMeta = {
  src: string;
  width: number;
  height: number;
  altEn: string;
  altAr: string;
};

export const IMAGES = {
  hero: {
    src: "/images/hero.webp",
    width: 1600,
    height: 900,
    altEn: "Digital marketing agency team working with Riyadh businesses",
    altAr: "فريق وكالة تسويق رقمي يعمل مع أعمال الرياض",
  },
  aboutTeam: {
    src: "/images/about-team.webp",
    width: 800,
    height: 600,
    altEn: "Local City Solutions team — Riyadh digital marketing experts",
    altAr: "فريق لوكال سيتي سولوشنز — خبراء التسويق الرقمي في الرياض",
  },
  brandStrategy: {
    src: "/images/brand-strategy.webp",
    width: 800,
    height: 600,
    altEn: "Brand strategy consulting for Saudi businesses",
    altAr: "استشارات استراتيجية العلامة التجارية للأعمال السعودية",
  },
  ctaBg: {
    src: "/images/cta-bg.webp",
    width: 1920,
    height: 600,
    altEn: "",
    altAr: "",
  },
  statsBg: {
    src: "/images/stats-bg.webp",
    width: 2244,
    height: 701,
    altEn: "",
    altAr: "",
  },
  services: {
    seo: {
      src: "/images/seo.webp",
      width: 800,
      height: 600,
      altEn: "SEO services for Riyadh businesses — rank higher on Google",
      altAr: "خدمات تحسين محركات البحث لأعمال الرياض — تصدر نتائج قوقل",
    },
    "google-ads": {
      src: "/images/google-ads.webp",
      width: 800,
      height: 600,
      altEn: "Google Ads management for Saudi Arabia businesses",
      altAr: "إدارة إعلانات قوقل لأعمال السعودية",
    },
    "meta-ads": {
      src: "/images/meta-ads.webp",
      width: 800,
      height: 600,
      altEn: "Meta Ads (Facebook and Instagram) management in Saudi Arabia",
      altAr: "إدارة إعلانات ميتا (فيسبوك وإنستغرام) في السعودية",
    },
    "web-design": {
      src: "/images/web-design.webp",
      width: 800,
      height: 600,
      altEn: "Web design and development for Saudi businesses",
      altAr: "تصميم وتطوير مواقع الأعمال السعودية",
    },
    "social-media": {
      src: "/images/social-media.webp",
      width: 800,
      height: 600,
      altEn: "Social media marketing in Riyadh and Saudi Arabia",
      altAr: "التسويق عبر وسائل التواصل في الرياض والسعودية",
    },
    ecommerce: {
      src: "/images/ecommerce.webp",
      width: 800,
      height: 600,
      altEn: "E-commerce marketing for Saudi online stores",
      altAr: "تسويق المتاجر الإلكترونية السعودية",
    },
    "email-marketing": {
      src: "/images/email-marketing.webp",
      width: 800,
      height: 600,
      altEn: "Email marketing campaigns for Saudi businesses",
      altAr: "حملات التسويق بالبريد الإلكتروني للأعمال السعودية",
    },
    "ai-marketing": {
      src: "/images/ai-marketing.webp",
      width: 800,
      height: 600,
      altEn: "AI-powered marketing strategies for Riyadh businesses",
      altAr: "استراتيجيات التسويق المدعومة بالذكاء الاصطناعي لأعمال الرياض",
    },
    // Aliases: image set doesn't ship dedicated assets for these two service slugs,
    // so they reuse the closest-fit WebP file with service-specific alt text.
    "digital-marketing": {
      src: "/images/ai-marketing.webp",
      width: 800,
      height: 600,
      altEn: "Full-stack digital marketing strategy for Riyadh businesses",
      altAr: "استراتيجية تسويق رقمي متكاملة لأعمال الرياض",
    },
    "google-business-profile": {
      src: "/images/seo.webp",
      width: 800,
      height: 600,
      altEn: "Google Business Profile optimization for Riyadh businesses",
      altAr: "تحسين ملف النشاط في قوقل لأعمال الرياض",
    },
  },
  avatars: [
    {
      src: "/images/avatar-1.webp",
      width: 200,
      height: 200,
      altEn: "Riyadh client testimonial photo",
      altAr: "صورة شهادة عميل من الرياض",
    },
    {
      src: "/images/avatar-2.webp",
      width: 200,
      height: 200,
      altEn: "Saudi business owner testimonial photo",
      altAr: "صورة شهادة صاحب عمل سعودي",
    },
    {
      src: "/images/avatar-3.webp",
      width: 200,
      height: 200,
      altEn: "Local City Solutions client testimonial photo",
      altAr: "صورة شهادة عميل لوكال سيتي سولوشنز",
    },
  ],
} as const;

export type ServiceImageKey = keyof typeof IMAGES.services;

export function altFor(
  meta: { altEn: string; altAr: string },
  locale: string
): string {
  return locale === "ar" ? meta.altAr : meta.altEn;
}
