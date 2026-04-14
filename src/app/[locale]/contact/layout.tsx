import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "تواصل معنا — وكالة تسويق رقمي في الرياض | لوكال سيتي سولوشنز"
    : "Contact Us — Digital Marketing Agency Riyadh | Local City Solutions";
  const description = isAr
    ? "تواصل مع فريقنا في الرياض عبر واتساب أو اتصال أو نموذج. نرد خلال ساعة عمل. خدمات تسويق رقمي متخصصة للأعمال السعودية."
    : "Get in touch with our Riyadh digital marketing team. WhatsApp, call, or fill out a form. We respond within 1 business hour. Specialists in SEO, Google Ads & more.";
  return {
    title,
    description,
    alternates: {
      canonical: `https://localcitysolutions.com/${locale}/contact`,
      languages: {
        en: "https://localcitysolutions.com/en/contact",
        ar: "https://localcitysolutions.com/ar/contact",
        "x-default": "https://localcitysolutions.com/en/contact",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://localcitysolutions.com/${locale}/contact`,
      locale: isAr ? "ar_SA" : "en_US",
      images: [
        {
          url: "https://localcitysolutions.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isAr ? "تواصل مع لوكال سيتي سولوشنز" : "Contact Local City Solutions",
        },
      ],
    },
  };
}

export default function ContactLayout({ children }: Props) {
  return <>{children}</>;
}
