import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Block aggressive scrapers and SEO crawlers that ignore budgets
      { userAgent: "PetalBot", disallow: "/" },
      { userAgent: "ByteSpider", disallow: "/" },
      { userAgent: "YisouSpider", disallow: "/" },
      { userAgent: "Sogou", disallow: "/" },
      { userAgent: "Baiduspider", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "MegaIndex", disallow: "/" },
      { userAgent: "DataForSeoBot", disallow: "/" },
    ],
    sitemap: "https://localcitysolutions.com/sitemap.xml",
  };
}
