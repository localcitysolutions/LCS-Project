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
      // 301s: blog republish phase 3b
      { source: "/local-link-building-strategy", destination: "/en/blog/local-link-building-strategy", statusCode: 301 },
      { source: "/local-link-building-strategy/", destination: "/en/blog/local-link-building-strategy", statusCode: 301 },
      // 301s: blog republish phase 3c (slug year refresh: 2025 → 2026)
      { source: "/google-ads-mistakes-2025", destination: "/en/blog/google-ads-mistakes-2026", statusCode: 301 },
      { source: "/google-ads-mistakes-2025/", destination: "/en/blog/google-ads-mistakes-2026", statusCode: 301 },
      // 301s: blog republish phase 3d (slug rescoped: small-business-2025 → saudi-arabia evergreen)
      { source: "/google-ads-cost-small-business-2025", destination: "/en/blog/google-ads-cost-saudi-arabia", statusCode: 301 },
      { source: "/google-ads-cost-small-business-2025/", destination: "/en/blog/google-ads-cost-saudi-arabia", statusCode: 301 },
      // 301s: phase 4 — /en/<slug> mirrors of Phase 1 service slugs (7 pairs)
      { source: "/en/best-seo-company", destination: "/en/services/seo", statusCode: 301 },
      { source: "/en/best-seo-company/", destination: "/en/services/seo", statusCode: 301 },
      { source: "/en/google-ads", destination: "/en/services/google-ads", statusCode: 301 },
      { source: "/en/google-ads/", destination: "/en/services/google-ads", statusCode: 301 },
      { source: "/en/google-my-business", destination: "/en/services/google-business-profile", statusCode: 301 },
      { source: "/en/google-my-business/", destination: "/en/services/google-business-profile", statusCode: 301 },
      { source: "/en/website-development", destination: "/en/services/web-design", statusCode: 301 },
      { source: "/en/website-development/", destination: "/en/services/web-design", statusCode: 301 },
      { source: "/en/social-media-marketing", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/en/social-media-marketing/", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/en/local-business-listing-agency-riyadh", destination: "/en/services/google-business-profile", statusCode: 301 },
      { source: "/en/local-business-listing-agency-riyadh/", destination: "/en/services/google-business-profile", statusCode: 301 },
      { source: "/en/blog-2", destination: "/en/blog", statusCode: 301 },
      { source: "/en/blog-2/", destination: "/en/blog", statusCode: 301 },
      // 301s: phase 4 — /en/<slug> mirrors of Phase 2 service slugs (5 pairs)
      { source: "/en/social-media-marketing-services", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/en/social-media-marketing-services/", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/en/search-engine-optimization-services-2", destination: "/en/services/seo", statusCode: 301 },
      { source: "/en/search-engine-optimization-services-2/", destination: "/en/services/seo", statusCode: 301 },
      { source: "/en/seo-experts-saudi-arabia-local-city-solutions", destination: "/en/services/seo", statusCode: 301 },
      { source: "/en/seo-experts-saudi-arabia-local-city-solutions/", destination: "/en/services/seo", statusCode: 301 },
      { source: "/en/affordable-digital-marketing-services-saudi-arabia", destination: "/en/services", statusCode: 301 },
      { source: "/en/affordable-digital-marketing-services-saudi-arabia/", destination: "/en/services", statusCode: 301 },
      { source: "/en/blog-2/page/3", destination: "/en/blog", statusCode: 301 },
      { source: "/en/blog-2/page/3/", destination: "/en/blog", statusCode: 301 },
      // 301s: phase 4 — /en/<slug> mirrors of Phase 3 blog reposts (4 pairs, slug mismatches intentional)
      { source: "/en/programmatic-seo-guide", destination: "/en/blog/programmatic-seo-guide", statusCode: 301 },
      { source: "/en/programmatic-seo-guide/", destination: "/en/blog/programmatic-seo-guide", statusCode: 301 },
      { source: "/en/local-link-building-strategy", destination: "/en/blog/local-link-building-strategy", statusCode: 301 },
      { source: "/en/local-link-building-strategy/", destination: "/en/blog/local-link-building-strategy", statusCode: 301 },
      { source: "/en/google-ads-mistakes-2025", destination: "/en/blog/google-ads-mistakes-2026", statusCode: 301 },
      { source: "/en/google-ads-mistakes-2025/", destination: "/en/blog/google-ads-mistakes-2026", statusCode: 301 },
      { source: "/en/google-ads-cost-small-business-2025", destination: "/en/blog/google-ads-cost-saudi-arabia", statusCode: 301 },
      { source: "/en/google-ads-cost-small-business-2025/", destination: "/en/blog/google-ads-cost-saudi-arabia", statusCode: 301 },
      // 301s: phase 4 — /contact-2 regression fix
      { source: "/contact-2", destination: "/en/contact", statusCode: 301 },
      { source: "/contact-2/", destination: "/en/contact", statusCode: 301 },
      { source: "/en/contact-2", destination: "/en/contact", statusCode: 301 },
      { source: "/en/contact-2/", destination: "/en/contact", statusCode: 301 },
      // 301s: phase 5 — Arabic legacy slugs (5 pairs)
      // Sources are URL-encoded because Next.js redirects() matches against the
      // raw encoded URL pathname; raw Arabic chars in `source` would not match
      // incoming requests like /ar/%D9%86%D9%8A%D8%A9-... that browsers send.
      // /ar/نية-البحث
      { source: "/ar/%D9%86%D9%8A%D8%A9-%D8%A7%D9%84%D8%A8%D8%AD%D8%AB", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/ar/%D9%86%D9%8A%D8%A9-%D8%A7%D9%84%D8%A8%D8%AD%D8%AB/", destination: "/ar/services/seo", statusCode: 301 },
      // /ar/تحسين-محركات-البحث
      { source: "/ar/%D8%AA%D8%AD%D8%B3%D9%8A%D9%86-%D9%85%D8%AD%D8%B1%D9%83%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D8%AD%D8%AB", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/ar/%D8%AA%D8%AD%D8%B3%D9%8A%D9%86-%D9%85%D8%AD%D8%B1%D9%83%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D8%AD%D8%AB/", destination: "/ar/services/seo", statusCode: 301 },
      // /ar/اهمية-التسويق-في-السوشيال-ميديا-للبزنس
      { source: "/ar/%D8%A7%D9%87%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D9%88%D8%B4%D9%8A%D8%A7%D9%84-%D9%85%D9%8A%D8%AF%D9%8A%D8%A7-%D9%84%D9%84%D8%A8%D8%B2%D9%86%D8%B3", destination: "/ar/services/social-media", statusCode: 301 },
      { source: "/ar/%D8%A7%D9%87%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D9%88%D8%B4%D9%8A%D8%A7%D9%84-%D9%85%D9%8A%D8%AF%D9%8A%D8%A7-%D9%84%D9%84%D8%A8%D8%B2%D9%86%D8%B3/", destination: "/ar/services/social-media", statusCode: 301 },
      // /ar/أفضل-10-شركات-التسويق-الرقمي-في-المملكة
      { source: "/ar/%D8%A3%D9%81%D8%B6%D9%84-10-%D8%B4%D8%B1%D9%83%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A-%D9%81%D9%8A-%D8%A7%D9%84%D9%85%D9%85%D9%84%D9%83%D8%A9", destination: "/ar/services", statusCode: 301 },
      { source: "/ar/%D8%A3%D9%81%D8%B6%D9%84-10-%D8%B4%D8%B1%D9%83%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A-%D9%81%D9%8A-%D8%A7%D9%84%D9%85%D9%85%D9%84%D9%83%D8%A9/", destination: "/ar/services", statusCode: 301 },
      // /ar/اعلانات-فيسبوك-مقابل-اعلانات-تيك-توك-2025
      { source: "/ar/%D8%A7%D8%B9%D9%84%D8%A7%D9%86%D8%A7%D8%AA-%D9%81%D9%8A%D8%B3%D8%A8%D9%88%D9%83-%D9%85%D9%82%D8%A7%D8%A8%D9%84-%D8%A7%D8%B9%D9%84%D8%A7%D9%86%D8%A7%D8%AA-%D8%AA%D9%8A%D9%83-%D8%AA%D9%88%D9%83-2025", destination: "/ar/services/meta-ads", statusCode: 301 },
      { source: "/ar/%D8%A7%D8%B9%D9%84%D8%A7%D9%86%D8%A7%D8%AA-%D9%81%D9%8A%D8%B3%D8%A8%D9%88%D9%83-%D9%85%D9%82%D8%A7%D8%A8%D9%84-%D8%A7%D8%B9%D9%84%D8%A7%D9%86%D8%A7%D8%AA-%D8%AA%D9%8A%D9%83-%D8%AA%D9%88%D9%83-2025/", destination: "/ar/services/meta-ads", statusCode: 301 },
      // 301s: phase 6 — /ar/<english-slug> mirrors of Phase 1 service slugs (7 pairs)
      { source: "/ar/best-seo-company", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/ar/best-seo-company/", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/ar/google-ads", destination: "/ar/services/google-ads", statusCode: 301 },
      { source: "/ar/google-ads/", destination: "/ar/services/google-ads", statusCode: 301 },
      { source: "/ar/google-my-business", destination: "/ar/services/google-business-profile", statusCode: 301 },
      { source: "/ar/google-my-business/", destination: "/ar/services/google-business-profile", statusCode: 301 },
      { source: "/ar/website-development", destination: "/ar/services/web-design", statusCode: 301 },
      { source: "/ar/website-development/", destination: "/ar/services/web-design", statusCode: 301 },
      { source: "/ar/social-media-marketing", destination: "/ar/services/social-media", statusCode: 301 },
      { source: "/ar/social-media-marketing/", destination: "/ar/services/social-media", statusCode: 301 },
      { source: "/ar/local-business-listing-agency-riyadh", destination: "/ar/services/google-business-profile", statusCode: 301 },
      { source: "/ar/local-business-listing-agency-riyadh/", destination: "/ar/services/google-business-profile", statusCode: 301 },
      { source: "/ar/blog-2", destination: "/ar/blog", statusCode: 301 },
      { source: "/ar/blog-2/", destination: "/ar/blog", statusCode: 301 },
      // 301s: phase 6 — /ar/<english-slug> mirrors of Phase 2 service slugs (5 pairs)
      { source: "/ar/social-media-marketing-services", destination: "/ar/services/social-media", statusCode: 301 },
      { source: "/ar/social-media-marketing-services/", destination: "/ar/services/social-media", statusCode: 301 },
      { source: "/ar/search-engine-optimization-services-2", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/ar/search-engine-optimization-services-2/", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/ar/seo-experts-saudi-arabia-local-city-solutions", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/ar/seo-experts-saudi-arabia-local-city-solutions/", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/ar/affordable-digital-marketing-services-saudi-arabia", destination: "/ar/services", statusCode: 301 },
      { source: "/ar/affordable-digital-marketing-services-saudi-arabia/", destination: "/ar/services", statusCode: 301 },
      { source: "/ar/blog-2/page/3", destination: "/ar/blog", statusCode: 301 },
      { source: "/ar/blog-2/page/3/", destination: "/ar/blog", statusCode: 301 },
      // 301s: phase 6 — /ar/<english-slug> mirrors of Phase 3 blog reposts (4 pairs, slug mismatches intentional)
      { source: "/ar/programmatic-seo-guide", destination: "/ar/blog/programmatic-seo-guide", statusCode: 301 },
      { source: "/ar/programmatic-seo-guide/", destination: "/ar/blog/programmatic-seo-guide", statusCode: 301 },
      { source: "/ar/local-link-building-strategy", destination: "/ar/blog/local-link-building-strategy", statusCode: 301 },
      { source: "/ar/local-link-building-strategy/", destination: "/ar/blog/local-link-building-strategy", statusCode: 301 },
      { source: "/ar/google-ads-mistakes-2025", destination: "/ar/blog/google-ads-mistakes-2026", statusCode: 301 },
      { source: "/ar/google-ads-mistakes-2025/", destination: "/ar/blog/google-ads-mistakes-2026", statusCode: 301 },
      { source: "/ar/google-ads-cost-small-business-2025", destination: "/ar/blog/google-ads-cost-saudi-arabia", statusCode: 301 },
      { source: "/ar/google-ads-cost-small-business-2025/", destination: "/ar/blog/google-ads-cost-saudi-arabia", statusCode: 301 },
      // 301s: phase 6 — /ar/contact-2 mirror
      { source: "/ar/contact-2", destination: "/ar/contact", statusCode: 301 },
      { source: "/ar/contact-2/", destination: "/ar/contact", statusCode: 301 },
      // 301s: phase 6 — Arabic slug truncation fix.
      // Google's index shows /ar/اهمية-التسويق-في-السوشيال-ميديا-للبزن (no trailing س).
      // The full-form Phase 5 rule above stays; this catches the truncated indexed form.
      // Source uses URL-encoded form for the same reason as the Phase 5 rules — Next.js
      // matches redirects() against the raw encoded request URL.
      { source: "/ar/%D8%A7%D9%87%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D9%88%D8%B4%D9%8A%D8%A7%D9%84-%D9%85%D9%8A%D8%AF%D9%8A%D8%A7-%D9%84%D9%84%D8%A8%D8%B2%D9%86", destination: "/ar/services/social-media", statusCode: 301 },
      // 301s: phase 6 — interim destinations for deferred Rewrite items (3 families × 3 variants).
      // Email-marketing redirects route to /services/digital-marketing because no dedicated
      // email-marketing service hub exists. Update destinations when Rewrite content lands.
      { source: "/start-email-marketing-2025", destination: "/en/services/digital-marketing", statusCode: 301 },
      { source: "/en/start-email-marketing-2025", destination: "/en/services/digital-marketing", statusCode: 301 },
      { source: "/ar/start-email-marketing-2025", destination: "/ar/services/digital-marketing", statusCode: 301 },
      { source: "/on-page-seo-agency-dammam", destination: "/en/services/seo", statusCode: 301 },
      { source: "/en/on-page-seo-agency-dammam", destination: "/en/services/seo", statusCode: 301 },
      { source: "/ar/on-page-seo-agency-dammam", destination: "/ar/services/seo", statusCode: 301 },
      { source: "/social-media-marketing-strategy-2025-guide", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/en/social-media-marketing-strategy-2025-guide", destination: "/en/services/social-media", statusCode: 301 },
      { source: "/ar/social-media-marketing-strategy-2025-guide", destination: "/ar/services/social-media", statusCode: 301 },
    ];
  },
};

export default withNextIntl(nextConfig);
