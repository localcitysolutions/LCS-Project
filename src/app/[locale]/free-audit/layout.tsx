import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: {
      absolute: isAr
        ? "أداة تدقيق المواقع المجانية — ٥٠+ فحص SEO وتسويق | لوكال سيتي سولوشنز"
        : "Free Website Audit Tool — 50+ SEO & Marketing Checks | Local City Solutions",
    },
    description: isAr
      ? "شغّل تدقيق مجاني فوري لموقعك مع ٥٠+ فحص احترافي. بيانات PageSpeed حقيقية من قوقل، تحليل SEO، فحص روابط معطلة، تدقيق أمان، فحص جوال وتقرير PDF. مصمم لأعمال السعودية."
      : "Run a free instant website audit with 50+ professional checks. Real Google PageSpeed data, SEO analysis, broken link scan, security audit, mobile check & PDF report. Built for Saudi businesses.",
    alternates: {
      canonical: `https://localcitysolutions.com/${locale}/free-audit`,
      languages: {
        en: "https://localcitysolutions.com/en/free-audit",
        ar: "https://localcitysolutions.com/ar/free-audit",
      },
    },
  };
}

export default async function FreeAuditLayout({ children, params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isAr ? "أداة تدقيق المواقع المجانية" : "Free Website Audit Tool",
    description: isAr
      ? "أداة تدقيق مواقع مع أكثر من ٥٠ فحص احترافي عبر SEO والأداء والجوال والأمان وSEO المحلي."
      : "AI-powered website audit tool with 50+ professional checks across SEO, performance, mobile, security, and local SEO.",
    url: `https://localcitysolutions.com/${locale}/free-audit`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "SAR" },
    creator: {
      "@type": "Organization",
      name: "Local City Solutions",
      url: "https://localcitysolutions.com",
    },
  };

  const faqItems = isAr
    ? [
        { q: "هل التدقيق مجاني فعلاً؟", a: "نعم، مجاني بالكامل بدون رسوم مخفية. تحصل على التحليل الكامل لأكثر من ٥٠ فحص، التقرير المُحكّم، وتحميل PDF بدون دفع أي شيء. نقدم هذه الخدمة للمجتمع التجاري في الرياض. إذا أردت فريقنا ينفذ التوصيات، يسعدنا نناقش ذلك بشكل منفصل." },
        { q: "ما مدى دقة التدقيق؟", a: "دقيق جداً. نسحب بيانات Core Web Vitals الحقيقية مباشرة من Google PageSpeed Insights API — نفس البيانات التي يستخدمها قوقل في قرارات الترتيب. الفحوصات تحلل كود HTML الفعلي لموقعك. الحد الوحيد هو أننا ندقق الرابط المحدد الذي تدخله، لا الموقع بأكمله." },
        { q: "كم يستغرق التدقيق؟", a: "بين ٣٠ و٦٠ ثانية. نجلب موقعك، نستدعي Google PageSpeed API لتحليل الجوال وسطح المكتب، نفحص أعلى ٢٠ رابط داخلي بحثاً عن صفحات معطلة، ونشغّل جميع الفحوصات الـ ٥٠+." },
        { q: "ماذا يحدث بمعلومات التواصل التي أدخلها؟", a: "نستخدم معلوماتك فقط لإرسال نتائج التدقيق وقد نتابع بتوصيات مفيدة. لا نبيع أو نشارك بياناتك مع أطراف ثالثة. اقرأ سياسة الخصوصية الكاملة على localcitysolutions.com/ar/privacy-policy." },
        { q: "هل أقدر أدقق موقع منافسي؟", a: "نعم. أداة التدقيق تتضمن حقل رابط منافس اختياري. أدخل موقعك ورابط منافسك وستحصل على مقارنة جانبية توضح أين تتفوق، أين يتفوق، وما الذي تحتاج تطوير." },
        { q: "حصلت على نتيجة منخفضة — ماذا أفعل؟", a: "لا تقلق — معظم المواقع تحصل على نتيجة بين ٤٠ و٧٠ في أول تدقيق. ركّز على قسم أهم الأولويات في تقريرك، وابدأ بالعناصر ذات التأثير العالي. إذا أردت مساعدة احترافية، فريقنا في لوكال سيتي سولوشنز متخصص في هذا بالضبط." },
        { q: "هل يفحص هذا التدقيق ملف نشاطي على قوقل؟", a: "هذه الأداة تركز على موقعك. لتدقيق ملف نشاط قوقل المخصص، تحقق من خدمة تحسين ملف النشاط التجاري على قوقل أو تواصل معنا مباشرة لمراجعة SEO محلي شاملة." },
        { q: "كم مرة يجب أن أشغّل التدقيق؟", a: "نوصي بتشغيل التدقيق بعد أي تغيير رئيسي على الموقع ومرة واحدة على الأقل كل ٣ أشهر لاكتشاف المشاكل الجديدة. قوقل يحدث خوارزمياته بانتظام وصحة موقعك قد تتغير مع مرور الوقت." },
      ]
    : [
        { q: "Is this website audit really free?", a: "Yes, completely free with no hidden fees. You get the full 50+ check analysis, scored report, and PDF download without paying anything. We offer this as a service to the Riyadh business community. If you want our team to implement the recommendations, we are happy to discuss that separately." },
        { q: "How accurate is the audit?", a: "Very accurate. We pull real Core Web Vitals data directly from Google PageSpeed Insights API — the same data Google uses for ranking decisions. Our SEO, security, and technical checks analyze your actual HTML source code. The only limitation is that we audit the single URL you enter, not your entire site." },
        { q: "How long does the audit take?", a: "Between 30 and 60 seconds. We fetch your website, call the Google PageSpeed API for both mobile and desktop analysis, scan your top 20 internal links for broken pages, and run all 50+ checks. The comprehensive analysis takes slightly longer than basic audit tools, but the depth of insight is significantly greater." },
        { q: "What happens with my contact information?", a: "We use your contact information solely to send you your audit results and may follow up with helpful recommendations. We never sell or share your data with third parties. Read our full privacy policy at localcitysolutions.com/en/privacy-policy." },
        { q: "Can I audit my competitor's website?", a: "Yes. The audit tool includes an optional competitor URL field. Enter your website and your competitor's URL and you will receive a side-by-side comparison showing where you lead, where they lead, and what to prioritize." },
        { q: "I got a low score. What should I do?", a: "Do not panic — most websites score between 40 and 70 on their first audit. Focus on the Top Priorities section in your report, starting with high-impact items marked in red. If you want professional help implementing the fixes, our team at Local City Solutions specializes in exactly this. WhatsApp us or call for a free consultation." },
        { q: "Does this audit check my Google Business Profile?", a: "This tool focuses on your website. For a dedicated Google Business Profile audit, check our GBP optimization service or contact us directly for a comprehensive local SEO review." },
        { q: "How often should I run this audit?", a: "We recommend running an audit after any major website change and at least once every 3 months to catch new issues. Google updates its algorithms regularly and your site health can change over time." },
      ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
