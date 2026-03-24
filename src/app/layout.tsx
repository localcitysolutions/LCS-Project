import type { Metadata } from "next";
import { DM_Sans, Almarai } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-almarai",
  display: "swap",
  preload: false,
});

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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Local City Solutions",
  description: "Riyadh's leading digital marketing agency — SEO, Google Ads, Meta Ads, Web Design, and Google Business Profile built for the Saudi market.",
  url: "https://localcitysolutions.com",
  email: "hello@localcitysolutions.com",
  telephone: "+966564229190",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  sameAs: [
    "https://www.facebook.com/localcitysolutions",
    "https://www.instagram.com/localcitysolutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${almarai.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
