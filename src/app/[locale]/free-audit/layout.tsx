import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "ar") {
    return {
      title: { absolute: "أداة تدقيق المواقع المجانية | لوكال سيتي سولوشنز" },
      description:
        "احصل على تدقيق مجاني بالذكاء الاصطناعي لموقعك — SEO، الأداء، وجاهزية التسويق. نتائج فورية من أفضل وكالة تسويق رقمي في الرياض.",
    };
  }
  return {
    title: { absolute: "Free Website Audit Tool | Local City Solutions" },
    description:
      "Get a free AI-powered audit of your website's SEO, performance, and marketing readiness. Instant results from Riyadh's leading digital marketing agency.",
  };
}

export default function FreeAuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
