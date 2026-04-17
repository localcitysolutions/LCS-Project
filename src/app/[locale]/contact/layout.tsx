import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const title = isAr
    ? "تواصل معنا | لوكال سيتي سولوشنز"
    : "Contact Us | Local City Solutions";
  const ogTitle = isAr
    ? "تواصل مع لوكال سيتي سولوشنز — وكالة التسويق الرقمي في الرياض"
    : "Contact Local City Solutions — Digital Marketing Agency Riyadh";
  const description = isAr
    ? "تواصل معنا في لوكال سيتي سولوشنز. مكتبنا في السعادة، الرياض ١٤٢٥٧. واتساب أو اتصال أو نموذج. استشارة مجانية."
    : "Get in touch with Local City Solutions — your Riyadh digital marketing agency. Office in As Saadah, Riyadh 14257. Free consultation.";
  return {
    title: { absolute: title },
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
      title: ogTitle,
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
