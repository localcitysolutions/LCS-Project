// Bilingual anchor text for each blog post
export const BLOG_CATALOG: Record<string, { en: string; ar: string }> = {
  "google-maps-ranking-restaurants-riyadh": {
    en: "Google Maps Ranking for Riyadh Restaurants",
    ar: "تصدر قوقل ماب للمطاعم في الرياض",
  },
  "google-ads-vs-meta-ads": {
    en: "Google Ads vs. Meta Ads for Saudi Businesses",
    ar: "إعلانات قوقل مقابل ميتا للأعمال السعودية",
  },
  "google-business-profile-guide": {
    en: "Complete Google Business Profile Guide for Riyadh",
    ar: "دليل ملف النشاط التجاري لأعمال الرياض",
  },
  "instagram-marketing-salons-riyadh": {
    en: "Instagram Marketing for Salons in Riyadh",
    ar: "تسويق إنستقرام للصالونات في الرياض",
  },
  "web-design-saudi-ecommerce": {
    en: "Web Design for Saudi E-Commerce Stores",
    ar: "تصميم مواقع للمتاجر الإلكترونية السعودية",
  },
  "ramadan-marketing-riyadh": {
    en: "Ramadan Marketing Strategy for Riyadh Businesses",
    ar: "استراتيجية تسويق رمضان لأعمال الرياض",
  },
  "what-is-seo-riyadh-businesses": {
    en: "What Is SEO? A Guide for Riyadh Businesses",
    ar: "ما هو الـ SEO؟ دليل لأعمال الرياض",
  },
  "on-page-seo-complete-guide": {
    en: "On-Page SEO Complete Guide",
    ar: "دليل تحسين الصفحة الشامل",
  },
  "off-page-seo-strategies-saudi": {
    en: "Off-Page SEO Strategies for Saudi Businesses",
    ar: "استراتيجيات SEO خارج الصفحة للأعمال السعودية",
  },
  "local-seo-dominate-riyadh-search": {
    en: "Local SEO: Dominate Riyadh Search Results",
    ar: "SEO المحلي: تصدّر نتائج البحث في الرياض",
  },
  "technical-seo-audit-checklist": {
    en: "Technical SEO Audit Checklist",
    ar: "قائمة تدقيق السيو التقني",
  },
};

// Blog posts most relevant per service
export const SERVICE_BLOG_MAP: Record<string, string[]> = {
  seo: [
    "what-is-seo-riyadh-businesses",
    "local-seo-dominate-riyadh-search",
    "on-page-seo-complete-guide",
  ],
  "google-ads": ["google-ads-vs-meta-ads", "ramadan-marketing-riyadh"],
  "meta-ads": ["google-ads-vs-meta-ads", "instagram-marketing-salons-riyadh"],
  "google-business-profile": [
    "google-business-profile-guide",
    "google-maps-ranking-restaurants-riyadh",
    "local-seo-dominate-riyadh-search",
  ],
  "social-media": ["instagram-marketing-salons-riyadh", "ramadan-marketing-riyadh"],
  "web-design": ["web-design-saudi-ecommerce"],
  ecommerce: ["web-design-saudi-ecommerce", "google-ads-vs-meta-ads"],
  "digital-marketing": [
    "google-ads-vs-meta-ads",
    "ramadan-marketing-riyadh",
    "what-is-seo-riyadh-businesses",
  ],
};

// Industries most relevant per service
export const SERVICE_INDUSTRY_MAP: Record<string, string[]> = {
  seo: ["restaurants", "clinics", "real-estate", "retail"],
  "google-ads": ["restaurants", "clinics", "automotive", "retail"],
  "meta-ads": ["restaurants", "salons", "retail", "hotels"],
  "google-business-profile": ["restaurants", "clinics", "salons", "automotive"],
  "social-media": ["restaurants", "salons", "retail", "hotels"],
  "web-design": ["retail", "real-estate", "education", "hotels"],
  ecommerce: ["retail", "restaurants", "automotive"],
  "digital-marketing": ["restaurants", "clinics", "salons", "real-estate", "retail"],
};

// Blog posts most relevant to district pages (local-SEO focused)
export const DISTRICT_BLOG_SLUGS = [
  "local-seo-dominate-riyadh-search",
  "google-business-profile-guide",
  "what-is-seo-riyadh-businesses",
];

// Industry display catalog
export const INDUSTRY_CATALOG: Record<string, { nameEn: string; nameAr: string }> = {
  restaurants: { nameEn: "Restaurants & Cafés", nameAr: "المطاعم والكافيهات" },
  clinics: { nameEn: "Clinics & Healthcare", nameAr: "العيادات والرعاية الصحية" },
  salons: { nameEn: "Salons & Beauty", nameAr: "الصالونات والتجميل" },
  "real-estate": { nameEn: "Real Estate", nameAr: "العقارات" },
  retail: { nameEn: "Retail & E-Commerce", nameAr: "التجزئة والتجارة الإلكترونية" },
  education: { nameEn: "Education & Training", nameAr: "التعليم والتدريب" },
  automotive: { nameEn: "Automotive", nameAr: "السيارات" },
  hotels: { nameEn: "Hotels & Hospitality", nameAr: "الفنادق والضيافة" },
};

// Keyword → industry slug mapping (for district industry name matching)
const INDUSTRY_KEYWORDS: [string, string][] = [
  ["restaurant", "restaurants"],
  ["dining", "restaurants"],
  ["café", "restaurants"],
  ["cafe", "restaurants"],
  ["food", "restaurants"],
  ["clinic", "clinics"],
  ["medical", "clinics"],
  ["health", "clinics"],
  ["salon", "salons"],
  ["beauty", "salons"],
  ["real estate", "real-estate"],
  ["property", "real-estate"],
  ["retail", "retail"],
  ["shop", "retail"],
  ["ecommerce", "retail"],
  ["e-commerce", "retail"],
  ["education", "education"],
  ["training", "education"],
  ["school", "education"],
  ["automotive", "automotive"],
  ["car ", "automotive"],
  ["auto", "automotive"],
  ["hotel", "hotels"],
  ["hospitality", "hotels"],
];

/** Map a district industry display name to its slug, or null if no match */
export function industryNameToSlug(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [keyword, slug] of INDUSTRY_KEYWORDS) {
    if (lower.includes(keyword)) return slug;
  }
  return null;
}

// Top cross-link districts for service pages
export const TOP_CROSS_DISTRICTS = [
  { slug: "al-olaya", nameEn: "Digital Marketing in Al Olaya", nameAr: "تسويق رقمي في العليا" },
  { slug: "kafd", nameEn: "Digital Marketing in KAFD", nameAr: "تسويق رقمي في كافد" },
  { slug: "king-fahd-district", nameEn: "Digital Marketing in King Fahd District", nameAr: "تسويق رقمي في حي الملك فهد" },
  { slug: "al-malqa", nameEn: "Digital Marketing in Al Malqa", nameAr: "تسويق رقمي في الملقا" },
  { slug: "al-narjis", nameEn: "Digital Marketing in Al Narjis", nameAr: "تسويق رقمي في النرجس" },
];
