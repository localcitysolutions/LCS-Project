import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://connect.facebook.net https://www.clarity.ms",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com https://localcitysolutions.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://api.web3forms.com https://pagespeedonline.googleapis.com https://www.clarity.ms",
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://api.web3forms.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // 301s: old WordPress blog slugs → new Next.js blog posts
      // Runs at the edge before locale middleware — safe for non-prefixed legacy paths
      {
        source: "/facebook-marketing-cost-in-saudi-arabia-2025",
        destination: "/en/blog/facebook-marketing-cost-saudi-arabia-2026",
        permanent: true,
      },
      {
        source: "/social-media-marketing-cost-in-saudi-arabia",
        destination: "/en/blog/social-media-marketing-cost-saudi-arabia",
        permanent: true,
      },
      {
        source: "/instagram-marketing-cost-in-saudi-arabia",
        destination: "/en/blog/instagram-marketing-cost-saudi-arabia",
        permanent: true,
      },
      // 301s: legacy WordPress service + blog URLs (high-priority phase 1)
      { source: "/best-seo-company", destination: "/en/services/seo", statusCode: 301 },
      { source: "/best-seo-company/", destination: "/en/services/seo", statusCode: 301 },
      { source: "/google-ads", destination: "/en/services/google-ads", statusCode: 301 },
      { source: "/google-ads/", destination: "/en/services/google-ads", statusCode: 301 },
      { source: "/google-my-business", destination: "/en/services/google-business-profile", statusCode: 301 },
      { source: "/google-my-business/", destination: "/en/services/google-business-profile", statusCode: 301 },
      { source: "/website-development", destination: "/en/services/web-design", statusCode: 301 },
      { source: "/website-development/", destination: "/en/services/web-design", statusCode: 301 },
      { source: "/social-media-marketing", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/social-media-marketing/", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/local-business-listing-agency-riyadh", destination: "/en/services/google-business-profile", statusCode: 301 },
      { source: "/local-business-listing-agency-riyadh/", destination: "/en/services/google-business-profile", statusCode: 301 },
      { source: "/blog-2", destination: "/en/blog", statusCode: 301 },
      { source: "/blog-2/", destination: "/en/blog", statusCode: 301 },
      // 301s: legacy WordPress service + blog URLs (phase 2 — medium/low priority)
      { source: "/social-media-marketing-services", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/social-media-marketing-services/", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/search-engine-optimization-services-2", destination: "/en/services/seo", statusCode: 301 },
      { source: "/search-engine-optimization-services-2/", destination: "/en/services/seo", statusCode: 301 },
      { source: "/seo-experts-saudi-arabia-local-city-solutions", destination: "/en/services/seo", statusCode: 301 },
      { source: "/seo-experts-saudi-arabia-local-city-solutions/", destination: "/en/services/seo", statusCode: 301 },
      { source: "/affordable-digital-marketing-services-saudi-arabia", destination: "/en/services", statusCode: 301 },
      { source: "/affordable-digital-marketing-services-saudi-arabia/", destination: "/en/services", statusCode: 301 },
      { source: "/blog-2/page/3", destination: "/en/blog", statusCode: 301 },
      { source: "/blog-2/page/3/", destination: "/en/blog", statusCode: 301 },
      // 301s: blog republish phase 3a
      { source: "/programmatic-seo-guide", destination: "/en/blog/programmatic-seo-guide", statusCode: 301 },
      { source: "/programmatic-seo-guide/", destination: "/en/blog/programmatic-seo-guide", statusCode: 301 },
    ];
  },
};

export default withNextIntl(nextConfig);
