import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Block aggressive scrapers that ignore crawl budgets
      { userAgent: "PetalBot", disallow: "/" },
      { userAgent: "ByteSpider", disallow: "/" },
      { userAgent: "YisouSpider", disallow: "/" },
      { userAgent: "Sogou", disallow: "/" },
      { userAgent: "Baiduspider", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "MegaIndex", disallow: "/" },
      { userAgent: "DataForSeoBot", disallow: "/" },
      // Note: SemrushBot and AhrefsBot are allowed — needed for SEO monitoring and competitive analysis
    ],
    sitemap: "https://localcitysolutions.com/sitemap.xml",
  };
}
