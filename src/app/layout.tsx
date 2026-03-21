import type { Metadata } from "next";
import { DM_Sans, Almarai } from "next/font/google";
import "./globals.css";
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
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${almarai.variable}`}>
      <body className="min-h-screen bg-[#080E1A]">
        <Header locale="en" />
        <ScrollReveal />
        {children}
        <Footer locale="en" />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
