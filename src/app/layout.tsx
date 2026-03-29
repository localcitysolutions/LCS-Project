import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Digital Marketing Agency in Riyadh | Local City Solutions",
    template: "%s | Local City Solutions",
  },
  description:
    "Local City Solutions — Riyadh's leading digital marketing agency. SEO, Google Ads, Meta Ads, Web Design, Google Business Profile, and Social Media Marketing built for the Saudi market.",
  keywords:
    "digital marketing agency riyadh, seo riyadh, google ads saudi arabia, meta ads riyadh, web design riyadh",
  openGraph: {
    siteName: "Local City Solutions",
    locale: "en_US",
    type: "website",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Local City Solutions",
  alternateName: "لوكال سيتي سولوشنز",
  url: "https://localcitysolutions.com",
  logo: "https://localcitysolutions.com/logo.png",
  description: "Full-service digital marketing agency in Riyadh, Saudi Arabia",
  telephone: "+966564229190",
  email: "hello@localcitysolutions.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  sameAs: [
    "https://x.com/LocalCitySoluti",
    "https://www.instagram.com/localcitysolutions/",
    "https://www.facebook.com/localcitysolutions",
  ],
  areaServed: { "@type": "City", name: "Riyadh" },
  serviceType: [
    "SEO",
    "Google Ads",
    "Meta Ads",
    "Web Design",
    "Social Media Management",
    "Google Business Profile",
    "E-Commerce",
    "Digital Marketing",
  ],
};

const localBizSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Local City Solutions",
  description: "Full-service digital marketing agency in Riyadh, Saudi Arabia",
  url: "https://localcitysolutions.com",
  email: "hello@localcitysolutions.com",
  telephone: "+966564229190",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressRegion: "Riyadh Province",
    addressCountry: "SA",
  },
  sameAs: [
    "https://x.com/LocalCitySoluti",
    "https://www.instagram.com/localcitysolutions/",
    "https://www.facebook.com/localcitysolutions",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "22",
    bestRating: "5",
  },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#080E1A]">
        <GoogleTagManager gtmId="GTM-KRFZ7HW2" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRFZ7HW2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <GoogleAnalytics gaId="G-H873GX8YSC" />
      </body>
    </html>
  );
}
