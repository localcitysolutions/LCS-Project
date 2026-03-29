import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";

const BASE = "https://localcitysolutions.com";

type Frequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

function entry(
  path: string,
  priority: number,
  changeFrequency: Frequency,
  lastModified: string
): MetadataRoute.Sitemap[number] {
  const isEn = path.startsWith("/en");
  const isAr = path.startsWith("/ar");
  const altBase = isEn
    ? path.replace("/en", "/ar")
    : isAr
    ? path.replace("/ar", "/en")
    : null;

  return {
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
    ...(altBase && {
      alternates: {
        languages: {
          en: `${BASE}${isEn ? path : altBase}`,
          ar: `${BASE}${isAr ? path : altBase}`,
        },
      },
    }),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static pages ────────────────────────────────────────────────────────────
  const staticEntries: MetadataRoute.Sitemap = [
    // Homepages
    entry("", 1.0, "weekly", now),
    entry("/en", 1.0, "weekly", now),
    entry("/ar", 1.0, "weekly", now),

    // Services hub
    entry("/en/services", 0.9, "monthly", now),
    entry("/ar/services", 0.9, "monthly", now),

    // Individual services
    ...([
      "digital-marketing",
      "seo",
      "google-ads",
      "meta-ads",
      "web-design",
      "google-business-profile",
      "social-media",
      "ecommerce",
      "analytics-reporting",
      "whatsapp-marketing",
      "email-marketing",
    ] as const).flatMap((slug) => [
      entry(`/en/services/${slug}`, 0.9, "monthly", now),
      entry(`/ar/services/${slug}`, 0.9, "monthly", now),
    ]),

    // Industries hub
    entry("/en/industries", 0.8, "monthly", now),
    entry("/ar/industries", 0.8, "monthly", now),

    // Individual industries
    ...([
      "restaurants",
      "clinics",
      "salons",
      "real-estate",
      "retail",
      "education",
      "automotive",
      "hotels",
    ] as const).flatMap((slug) => [
      entry(`/en/industries/${slug}`, 0.8, "monthly", now),
      entry(`/ar/industries/${slug}`, 0.8, "monthly", now),
    ]),

    // Riyadh districts hub
    entry("/en/riyadh", 0.8, "monthly", now),
    entry("/ar/riyadh", 0.8, "monthly", now),

    // Individual districts
    ...([
      "al-olaya",
      "al-malqa",
      "al-nakheel",
      "al-yasmin",
      "hittin",
      "al-sahafah",
      "al-worood",
      "al-sulaimaniyah",
      "al-rawdah",
      "al-murabba",
      "al-shifa",
      "al-naseem",
      "al-aziziyah",
      "ishbiliyah",
      "al-narjis",
      "tuwaiq",
      "diriyah",
      "kafd",
      "al-arid",
      "king-fahd-district",
    ] as const).flatMap((slug) => [
      entry(`/en/riyadh/${slug}`, 0.7, "monthly", now),
      entry(`/ar/riyadh/${slug}`, 0.7, "monthly", now),
    ]),

    // Blog hub
    entry("/en/blog", 0.8, "weekly", now),
    entry("/ar/blog", 0.8, "weekly", now),

    // Free audit tool
    entry("/en/free-audit", 0.8, "monthly", now),
    entry("/ar/free-audit", 0.8, "monthly", now),

    // Company pages
    entry("/en/about", 0.6, "monthly", now),
    entry("/ar/about", 0.6, "monthly", now),
    entry("/en/contact", 0.7, "monthly", now),
    entry("/ar/contact", 0.7, "monthly", now),
    entry("/en/privacy-policy", 0.3, "yearly", now),
    entry("/ar/privacy-policy", 0.3, "yearly", now),
    entry("/en/terms", 0.3, "yearly", now),
    entry("/ar/terms", 0.3, "yearly", now),
  ];

  // ── Dynamic blog posts (auto-updates when blog-posts.ts changes) ────────────
  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) => [
    entry(
      `/en/blog/${post.slug}`,
      0.7,
      "monthly",
      post.updatedDate || post.publishDate || now
    ),
    entry(
      `/ar/blog/${post.slug}`,
      0.7,
      "monthly",
      post.updatedDate || post.publishDate || now
    ),
  ]);

  return [...staticEntries, ...blogEntries];
}
