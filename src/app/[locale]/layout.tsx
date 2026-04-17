import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollReveal from "@/components/ScrollReveal";
import { DM_Sans, Almarai } from "next/font/google";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
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
    title: "Digital Marketing Agency in Riyadh | Local City Solutions",
    description:
      "Local City Solutions — Riyadh's leading digital marketing agency. SEO, Google Ads, Meta Ads, Web Design, Google Business Profile, and Social Media Marketing built for the Saudi market.",
    url: "https://localcitysolutions.com",
    images: [
      {
        url: "https://localcitysolutions.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Local City Solutions — Digital Marketing Agency in Riyadh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency in Riyadh | Local City Solutions",
    description:
      "Local City Solutions — Riyadh's leading digital marketing agency. SEO, Google Ads, Meta Ads, Web Design & more for the Saudi market.",
    images: ["https://localcitysolutions.com/og-image.jpg"],
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
    streetAddress: "Prince Saad bin Abdulrahman Al-Awwal Road",
    addressLocality: "As Saadah, Riyadh",
    postalCode: "14257",
    addressCountry: "SA",
  },
  sameAs: [
    "https://x.com/LocalCitySoluti",
    "https://www.instagram.com/localcitysolutions/",
    "https://www.facebook.com/localcitysolutions",
    "https://www.linkedin.com/company/local-city-solutions/",
    "https://www.youtube.com/@LocalCitySolutions",
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
    streetAddress: "Prince Saad bin Abdulrahman Al-Awwal Road",
    addressLocality: "As Saadah, Riyadh",
    postalCode: "14257",
    addressRegion: "Riyadh Province",
    addressCountry: "SA",
  },
  sameAs: [
    "https://x.com/LocalCitySoluti",
    "https://www.instagram.com/localcitysolutions/",
    "https://www.facebook.com/localcitysolutions",
    "https://www.linkedin.com/company/local-city-solutions/",
    "https://www.youtube.com/@LocalCitySolutions",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "22",
    bestRating: "5",
  },
  priceRange: "$$",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";
  const fontClass = isRTL ? almarai.className : dmSans.className;

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
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
      <body className={`min-h-screen bg-[#080E1A] ${fontClass}`}>
        <GoogleTagManager gtmId="GTM-KRFZ7HW2" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KRFZ7HW2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {process.env.NODE_ENV === "production" && (
          <Script
            id="ms-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "wd11qpmyd9");
              `,
            }}
          />
        )}
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <ScrollReveal />
          {children}
          <Footer locale={locale} />
          <WhatsAppFloat locale={locale} />
        </NextIntlClientProvider>
        <GoogleAnalytics gaId="G-H873GX8YSC" />
      </body>
    </html>
  );
}
