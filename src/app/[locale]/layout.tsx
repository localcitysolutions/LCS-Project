import type { Metadata } from "next";
import { DM_Sans, Almarai } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollReveal from "@/components/ScrollReveal";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-almarai",
  display: "swap",
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
    type: "website",
  },
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

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${dmSans.variable} ${almarai.variable}`}
    >
      <body className="min-h-screen bg-[#080E1A]">
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          <ScrollReveal />
          {children}
          <Footer locale={locale} />
          <WhatsAppFloat locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
