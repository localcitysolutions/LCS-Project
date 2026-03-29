"use client";

import Link from "next/link";

interface Props {
  locale: string;
}

const CATEGORIES = [
  {
    icon: "🔍",
    en: {
      title: "SEO Analysis",
      count: "12 Checks",
      desc: "We analyze title tags, meta descriptions, heading hierarchy, image alt attributes, canonical tags, schema markup, internal linking structure, HTTPS status, hreflang configuration, robots directives, and content-to-keyword alignment. These are the foundational elements that determine whether Google can understand, index, and rank your pages.",
    },
    ar: {
      title: "تحليل SEO",
      count: "١٢ فحص",
      desc: "نحلل علامات العنوان، الوصف التعريفي، تسلسل العناوين، خصائص alt للصور، الروابط الأساسية، schema markup، بنية الروابط الداخلية، حالة HTTPS، إعداد hreflang، توجيهات robots، والتوافق بين المحتوى والكلمات المفتاحية. هذه العناصر الأساسية تحدد ما إذا كان قوقل يستطيع فهم صفحاتك وفهرستها وترتيبها.",
    },
    serviceSlug: "seo",
  },
  {
    icon: "⚡",
    en: {
      title: "Performance & Core Web Vitals",
      count: "7 Checks",
      desc: "We pull real data directly from Google PageSpeed Insights API — the same data Google uses for ranking. You get actual Largest Contentful Paint, First Contentful Paint, Cumulative Layout Shift, Total Blocking Time, and Speed Index scores, plus page size and resource count. Slow sites lose 53% of mobile visitors before the page even loads.",
    },
    ar: {
      title: "الأداء ومؤشرات الويب الأساسية",
      count: "٧ فحوصات",
      desc: "نسحب بيانات حقيقية مباشرة من Google PageSpeed Insights API — نفس البيانات التي يستخدمها قوقل للترتيب. تحصل على نتائج Largest Contentful Paint وFirst Contentful Paint وCumulative Layout Shift وTotal Blocking Time وSpeed Index الفعلية، بالإضافة إلى حجم الصفحة وعدد الموارد. المواقع البطيئة تفقد ٥٣٪ من زوار الجوال قبل أن تكتمل الصفحة.",
    },
    serviceSlug: null,
  },
  {
    icon: "📱",
    en: {
      title: "Mobile Friendliness",
      count: "10 Checks",
      desc: "With 78% of Saudi internet traffic coming from mobile devices, your site must work flawlessly on phones. We check viewport configuration, responsive design, image lazy loading, image dimensions, favicon, language attributes, character encoding, mobile CTAs like WhatsApp and click-to-call, and your mobile PageSpeed score.",
    },
    ar: {
      title: "التوافق مع الجوال",
      count: "١٠ فحوصات",
      desc: "مع ٧٨٪ من حركة الإنترنت السعودية قادمة من الجوال، موقعك يجب أن يعمل بسلاسة على الهاتف. نفحص إعداد viewport، التصميم المتجاوب، التحميل الكسول للصور، أبعاد الصور، favicon، خصائص اللغة، ترميز الأحرف، أزرار الجوال مثل واتساب والاتصال، ونتيجة PageSpeed للجوال.",
    },
    serviceSlug: null,
  },
  {
    icon: "📝",
    en: {
      title: "Content Quality",
      count: "7 Checks",
      desc: "Thin content ranks poorly. We measure word count, call-to-action presence, visible contact information, content structure through paragraph analysis, visual content usage, external link credibility signals, and title readability. Google rewards pages that thoroughly answer user questions — we check if yours does.",
    },
    ar: {
      title: "جودة المحتوى",
      count: "٧ فحوصات",
      desc: "المحتوى الرقيق يُرتَّب بضعف. نقيس عدد الكلمات، وجود أزرار الدعوة للعمل، معلومات التواصل المرئية، بنية المحتوى من خلال تحليل الفقرات، استخدام المحتوى المرئي، إشارات مصداقية الروابط الخارجية، وقابلية قراءة العنوان. قوقل يكافئ الصفحات التي تجيب على أسئلة المستخدم بشكل شامل — نفحص إذا كانت صفحتك كذلك.",
    },
    serviceSlug: null,
  },
  {
    icon: "📍",
    en: {
      title: "Local SEO for Saudi Market",
      count: "8 Checks",
      desc: "Ranking locally in Riyadh requires specific signals. We check for visible phone numbers, city and location mentions in content, LocalBusiness schema for Google Maps visibility, WhatsApp integration (the #1 customer communication channel in Saudi Arabia), Arabic content presence (65% of Saudi searches happen in Arabic), hreflang multilingual setup, Google Maps links, and physical address indicators.",
    },
    ar: {
      title: "SEO المحلي للسوق السعودي",
      count: "٨ فحوصات",
      desc: "الترتيب محلياً في الرياض يتطلب إشارات محددة. نفحص أرقام الهاتف المرئية، ذكر المدينة والموقع في المحتوى، schema LocalBusiness لظهور قوقل ماب، تكامل واتساب (قناة التواصل الأولى في السعودية)، وجود محتوى عربي (٦٥٪ من البحث السعودي بالعربية)، إعداد hreflang، روابط قوقل ماب، ومؤشرات العنوان الفعلي.",
    },
    serviceSlug: null,
  },
  {
    icon: "📣",
    en: {
      title: "Social Media & Online Presence",
      count: "10 Checks",
      desc: "When someone shares your link on WhatsApp, Instagram, or LinkedIn, does it look professional? We check Open Graph title, description, and image tags, Twitter card markup, Google Analytics detection, Google Ads conversion tags, Meta Pixel presence, social profile links across 7 platforms (Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok, Snapchat), and behavior analytics tools like Hotjar or Microsoft Clarity.",
    },
    ar: {
      title: "السوشيال ميديا والتواجد الرقمي",
      count: "١٠ فحوصات",
      desc: "لما شخص يشارك رابطك على واتساب أو إنستقرام أو لينكدإن، هل يبدو احترافياً؟ نفحص عناوين ووصف وصور Open Graph، Twitter card markup، Google Analytics، علامات تحويل Google Ads، Meta Pixel، روابط ملفات التواصل على ٧ منصات (إنستقرام، فيسبوك، تويتر، لينكدإن، يوتيوب، تيك توك، سناب شات)، وأدوات تحليل السلوك مثل Hotjar أو Microsoft Clarity.",
    },
    serviceSlug: "social-media",
  },
  {
    icon: "🔒",
    en: {
      title: "Security Analysis",
      count: "8 Checks",
      desc: "Google penalizes insecure sites and users abandon them. We verify HTTPS and SSL certificate status, HTTP Strict Transport Security headers, content type sniffing protection, clickjacking protection through X-Frame-Options and Content Security Policy, XSS protection headers, referrer policy configuration, and mixed content detection.",
    },
    ar: {
      title: "تحليل الأمان",
      count: "٨ فحوصات",
      desc: "قوقل يعاقب المواقع غير الآمنة والمستخدمون يتركونها. نتحقق من حالة HTTPS وشهادة SSL، رؤوس HTTP Strict Transport Security، الحماية من استنشاق نوع المحتوى، الحماية من clickjacking عبر X-Frame-Options وContent Security Policy، رؤوس حماية XSS، إعداد سياسة الإحالة، واكتشاف المحتوى المختلط.",
    },
    serviceSlug: null,
  },
  {
    icon: "⚙️",
    en: {
      title: "Technical Health",
      count: "8 Checks",
      desc: "Under-the-hood issues silently kill rankings. We scan your top 20 internal links for broken 404 pages, check if JavaScript files use defer or async to prevent render-blocking, verify charset declaration, analyze inline style usage, confirm HTTP status codes, check image optimization attributes, verify crawlability through robots directives, and validate HTML5 DOCTYPE declaration.",
    },
    ar: {
      title: "الصحة التقنية",
      count: "٨ فحوصات",
      desc: "المشاكل التقنية الخفية تقتل ترتيبك بصمت. نفحص أعلى ٢٠ رابط داخلي بحثاً عن صفحات ٤٠٤ معطلة، نتحقق مما إذا كانت ملفات JavaScript تستخدم defer أو async لمنع حجب العرض، نتحقق من charset، نحلل استخدام الأنماط المضمّنة، نؤكد رموز HTTP، نفحص خصائص تحسين الصور، ونتحقق من قابلية الزحف وإعلان DOCTYPE.",
    },
    serviceSlug: null,
  },
];

const FAQ_EN = [
  {
    q: "Is this website audit really free?",
    a: (
      <>
        Yes, completely free with no hidden fees. You get the full 50+ check analysis, scored report, and PDF download without paying anything. We offer this as a service to the Riyadh business community. If you want our team to implement the recommendations, we are happy to discuss that separately.
      </>
    ),
  },
  {
    q: "How accurate is the audit?",
    a: (
      <>
        Very accurate. We pull real Core Web Vitals data directly from Google PageSpeed Insights API — the same data Google uses for ranking decisions. Our <Link href="/en/services/seo" className="text-[#F5C518] hover:underline">SEO</Link>, security, and technical checks analyze your actual HTML source code. The only limitation is that we audit the single URL you enter, not your entire site.
      </>
    ),
  },
  {
    q: "How long does the audit take?",
    a: (
      <>
        Between 30 and 60 seconds. We fetch your website, call the Google PageSpeed API for both mobile and desktop analysis, scan your top 20 internal links for broken pages, and run all 50+ checks. The comprehensive analysis takes slightly longer than basic audit tools, but the depth of insight is significantly greater.
      </>
    ),
  },
  {
    q: "What happens with my contact information?",
    a: (
      <>
        We use your contact information solely to send you your audit results and may follow up with helpful recommendations. We never sell or share your data with third parties. Read our full{" "}
        <Link href="/en/privacy-policy" className="text-[#F5C518] hover:underline">privacy policy</Link>.
      </>
    ),
  },
  {
    q: "Can I audit my competitor's website?",
    a: (
      <>
        Yes. The audit tool includes an optional competitor URL field. Enter your website and your competitor&apos;s URL and you will receive a side-by-side comparison showing where you lead, where they lead, and what to prioritize to overtake them in Riyadh search results.
      </>
    ),
  },
  {
    q: "I got a low score. What should I do?",
    a: (
      <>
        Do not panic — most websites score between 40 and 70 on their first audit. Focus on the Top Priorities section in your report, starting with high-impact items marked in red. If you want professional help implementing the fixes, our team at Local City Solutions specializes in exactly this.{" "}
        <Link href="/en/contact" className="text-[#F5C518] hover:underline">Contact us</Link> or WhatsApp us for a free consultation.
      </>
    ),
  },
  {
    q: "Does this audit check my Google Business Profile?",
    a: (
      <>
        This tool focuses on your website. For a dedicated Google Business Profile audit, check our{" "}
        <Link href="/en/services/google-business-profile" className="text-[#F5C518] hover:underline">GBP optimization service</Link>{" "}
        or contact us directly for a comprehensive local SEO review.
      </>
    ),
  },
  {
    q: "How often should I run this audit?",
    a: (
      <>
        We recommend running an audit after any major website change and at least once every 3 months to catch new issues. Google updates its algorithms regularly and your site health can change over time. Check our{" "}
        <Link href="/en/blog" className="text-[#F5C518] hover:underline">blog</Link>{" "}
        for the latest SEO tips and algorithm updates.
      </>
    ),
  },
];

const FAQ_AR = [
  {
    q: "هل التدقيق مجاني فعلاً؟",
    a: (
      <>
        نعم، مجاني بالكامل بدون رسوم مخفية. تحصل على التحليل الكامل لأكثر من ٥٠ فحص، التقرير المُحكّم، وتحميل PDF بدون دفع أي شيء. نقدم هذه الخدمة للمجتمع التجاري في الرياض. إذا أردت فريقنا ينفذ التوصيات، يسعدنا نناقش ذلك بشكل منفصل.
      </>
    ),
  },
  {
    q: "ما مدى دقة التدقيق؟",
    a: (
      <>
        دقيق جداً. نسحب بيانات Core Web Vitals الحقيقية مباشرة من Google PageSpeed Insights API — نفس البيانات التي يستخدمها قوقل في قرارات الترتيب. فحوصات{" "}
        <Link href="/ar/services/seo" className="text-[#F5C518] hover:underline">SEO</Link>، الأمان، والتقنية تحلل كود HTML الفعلي لموقعك. الحد الوحيد هو أننا ندقق الرابط المحدد الذي تدخله، لا الموقع بأكمله.
      </>
    ),
  },
  {
    q: "كم يستغرق التدقيق؟",
    a: (
      <>
        بين ٣٠ و٦٠ ثانية. نجلب موقعك، نستدعي Google PageSpeed API لتحليل الجوال وسطح المكتب، نفحص أعلى ٢٠ رابط داخلي بحثاً عن صفحات معطلة، ونشغّل جميع الفحوصات الـ ٥٠+. التحليل الشامل يستغرق وقتاً أطول من الأدوات البسيطة، لكن عمق الرؤى أكبر بكثير.
      </>
    ),
  },
  {
    q: "ماذا يحدث بمعلومات التواصل التي أدخلها؟",
    a: (
      <>
        نستخدم معلوماتك فقط لإرسال نتائج التدقيق وقد نتابع بتوصيات مفيدة. لا نبيع أو نشارك بياناتك مع أطراف ثالثة. اقرأ{" "}
        <Link href="/ar/privacy-policy" className="text-[#F5C518] hover:underline">سياسة الخصوصية الكاملة</Link>.
      </>
    ),
  },
  {
    q: "هل أقدر أدقق موقع منافسي؟",
    a: (
      <>
        نعم. أداة التدقيق تتضمن حقل رابط منافس اختياري. أدخل موقعك ورابط منافسك وستحصل على مقارنة جانبية توضح أين تتفوق، أين يتفوق، وما الذي تحتاج تطوير للتفوق عليه في نتائج بحث الرياض.
      </>
    ),
  },
  {
    q: "حصلت على نتيجة منخفضة — ماذا أفعل؟",
    a: (
      <>
        لا تقلق — معظم المواقع تحصل على نتيجة بين ٤٠ و٧٠ في أول تدقيق. ركّز على قسم أهم الأولويات في تقريرك، وابدأ بالعناصر ذات التأثير العالي المحددة باللون الأحمر. إذا أردت مساعدة احترافية في التطبيق، فريقنا في لوكال سيتي سولوشنز متخصص في هذا بالضبط.{" "}
        <Link href="/ar/contact" className="text-[#F5C518] hover:underline">تواصل معنا</Link> أو واتساب لاستشارة مجانية.
      </>
    ),
  },
  {
    q: "هل يفحص هذا التدقيق ملف نشاطي على قوقل؟",
    a: (
      <>
        هذه الأداة تركز على موقعك. لتدقيق ملف نشاط قوقل المخصص، تحقق من{" "}
        <Link href="/ar/services/google-business-profile" className="text-[#F5C518] hover:underline">خدمة تحسين ملف النشاط التجاري</Link>{" "}
        أو تواصل معنا مباشرة لمراجعة SEO محلي شاملة.
      </>
    ),
  },
  {
    q: "كم مرة يجب أن أشغّل التدقيق؟",
    a: (
      <>
        نوصي بتشغيل التدقيق بعد أي تغيير رئيسي على الموقع ومرة واحدة على الأقل كل ٣ أشهر لاكتشاف المشاكل الجديدة. قوقل يحدث خوارزمياته بانتظام. تابع{" "}
        <Link href="/ar/blog" className="text-[#F5C518] hover:underline">مدونتنا</Link>{" "}
        لأحدث نصائح SEO وتحديثات الخوارزميات.
      </>
    ),
  },
];

export default function AuditPageSEO({ locale }: Props) {
  const isAr = locale === "ar";
  const p = isAr ? "/ar" : "/en";
  const faqItems = isAr ? FAQ_AR : FAQ_EN;

  const scrollToTop = () => {
    document.getElementById("audit-hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="bg-[#080E1A]">

      {/* ─── Section 1: How It Works ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">
              {isAr ? "كيف يعمل" : "How It Works"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {isAr ? "كيف يشتغل التدقيق المجاني" : "How Our Free Website Audit Works"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal delay-1">
            {[
              {
                num: isAr ? "٠١" : "01",
                title: isAr ? "أدخل رابط موقعك" : "Enter Your URL",
                desc: isAr
                  ? "الصق رابط موقعك في النموذج أعلاه. بدون تسجيل، بدون بطاقة ائتمان، بدون أي التزامات. فقط رابطك ومعلومات تواصل بسيطة حتى نرسل لك التقرير الكامل."
                  : "You paste your website address into the form above. No signup, no credit card, no strings attached. Just your URL and basic contact info so we can send you the full report.",
              },
              {
                num: isAr ? "٠٢" : "02",
                title: isAr ? "نشغّل أكثر من ٥٠ فحص احترافي" : "We Run 50+ Professional Checks",
                desc: isAr
                  ? "محرك التدقيق يجلب موقعك ويحلله مقابل أكثر من ٥٠ نقطة تفتيش احترافية عبر ٨ فئات. نسحب بيانات حقيقية من Google PageSpeed Insights API، نفحص أعلى ٢٠ رابط داخلي بحثاً عن صفحات معطلة، ونحلل رؤوس الأمان والتقنيات. يستغرق التحليل ٣٠ إلى ٦٠ ثانية."
                  : "Our audit engine fetches your website and analyzes it against 50+ professional checkpoints across 8 critical categories. We pull real data from Google PageSpeed Insights API, scan your top 20 internal links for broken pages, analyze your security headers, and detect technologies. The entire analysis takes 30 to 60 seconds.",
              },
              {
                num: isAr ? "٠٣" : "03",
                title: isAr ? "احصل على تقريرك مع PDF" : "Get Your Scored Report with PDF",
                desc: isAr
                  ? "تحصل على تقرير مفصل مع نتيجة صحة شاملة من ١٠٠، تفصيل فئة بفئة، نتائج فردية لكل فحص، أهم ٥ أولويات مرتبة حسب التأثير، وPDF مميز يمكنك تحميله ومشاركته مع فريقك."
                  : "You receive a detailed audit report with an overall health score out of 100, category-by-category breakdown, individual pass/warning/fail results for every check, your top 5 priorities ranked by impact, and a branded PDF you can download and share with your team.",
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line — desktop only */}
                {i < 2 && (
                  <div className={`hidden md:block absolute top-8 w-full border-t border-dashed border-white/10 ${isAr ? "right-1/2" : "left-1/2"}`} />
                )}
                <div className="relative bg-[#0E1A2E] border border-white/[0.07] rounded-xl p-6 hover:border-[#F5C518]/20 transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/20 flex items-center justify-center text-[#F5C518] font-black text-lg mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 2: 8 Category Cards ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">
              {isAr ? "ما نفحصه" : "What We Check"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {isAr ? "أكثر من ٥٠ فحص في ٨ فئات" : "50+ Checks Across 8 Critical Categories"}
            </h2>
            <p className="text-white/50 text-sm max-w-2xl mx-auto">
              {isAr
                ? "كل فحص مصمم ليكتشف المشاكل اللي تأثر على ترتيبك في قوقل وتجربة المستخدم وقدرتك على جذب العملاء في السوق السعودي."
                : "Every check is designed to find issues that directly impact your Google rankings, user experience, and ability to generate leads in the Saudi market."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal delay-1">
            {CATEGORIES.map((cat) => {
              const c = isAr ? cat.ar : cat.en;
              const serviceLink = cat.serviceSlug ? `${p}/services/${cat.serviceSlug}` : null;
              return (
                <div
                  key={cat.en.title}
                  className="bg-[#0E1A2E] border border-white/[0.07] rounded-xl p-5 hover:border-[#F5C518]/20 transition-all flex flex-col gap-3"
                >
                  <div className="text-3xl">{cat.icon}</div>
                  <div>
                    {serviceLink ? (
                      <Link href={serviceLink} className="text-white font-bold text-sm hover:text-[#F5C518] transition-colors">
                        {c.title}
                      </Link>
                    ) : (
                      <h3 className="text-white font-bold text-sm">{c.title}</h3>
                    )}
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F5C518]/10 text-[#F5C518]">
                      {c.count}
                    </span>
                  </div>
                  <p className="text-white/45 text-xs leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Bonus Features ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">
              {isAr ? "مميزات إضافية" : "Bonus Features"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {isAr ? "أكثر من مجرد تدقيق" : "More Than Just an Audit"}
            </h2>
            <p className="text-white/50 text-sm">
              {isAr ? "مميزات لن تجدها في معظم الأدوات المجانية." : "Features you won't find in most free tools."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal delay-1">
            {[
              {
                icon: "📊",
                en: {
                  title: "Real Google PageSpeed Data",
                  desc: "Not simulated, not estimated. We call Google PageSpeed Insights API directly and return the exact same Core Web Vitals data that Google uses in its ranking algorithm. LCP, FCP, CLS, TBT, and Speed Index — straight from Google.",
                },
                ar: {
                  title: "بيانات Google PageSpeed حقيقية",
                  desc: "مش محاكاة ولا تقديرات. نستدعي Google PageSpeed Insights API مباشرة ونُرجع نفس بيانات Core Web Vitals التي يستخدمها قوقل في خوارزمية الترتيب. LCP وFCP وCLS وTBT وSpeed Index — مباشرة من قوقل.",
                },
              },
              {
                icon: "🔭",
                en: {
                  title: "Technology Detection",
                  desc: "We identify 25+ technologies running on your site including WordPress, Shopify, Salla, Zid, React, Next.js, Vue, Angular, Tailwind, Bootstrap, jQuery, Google Tag Manager, Google Analytics, Hotjar, Microsoft Clarity, HubSpot, Cloudflare, Vercel, AWS, and more.",
                },
                ar: {
                  title: "اكتشاف التقنيات",
                  desc: "نحدد أكثر من ٢٥ تقنية تعمل على موقعك بما فيها WordPress وShopify وسلّة وزد وReact وNext.js وVue وAngular وTailwind وBootstrap وjQuery وGoogle Tag Manager وGoogle Analytics وHotjar وMicrosoft Clarity وHubSpot وCloudflare وVercel وAWS والمزيد.",
                },
              },
              {
                icon: "⚔️",
                en: {
                  title: "Competitor Comparison",
                  desc: "Enter a competitor URL alongside yours and get a side-by-side score comparison across all categories. See exactly where you lead, where you trail, and what to prioritize to overtake them in Riyadh search results.",
                },
                ar: {
                  title: "مقارنة المنافسين",
                  desc: "أدخل رابط منافسك مع رابطك واحصل على مقارنة جانبية للنتائج عبر جميع الفئات. اعرف بالضبط أين تتفوق، أين يتفوق، وما الذي تحتاج تطوير للتفوق عليه في نتائج بحث الرياض.",
                },
              },
            ].map((f) => {
              const c = isAr ? f.ar : f.en;
              return (
                <div key={f.en.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5C518]/10 flex items-center justify-center text-2xl shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm mb-2">{c.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Who Is This For ──────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">
              {isAr ? "لمن هذه الأداة" : "Who Is This For"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {isAr
                ? "مصمم لأصحاب الأعمال وفرق التسويق في الرياض"
                : "Built for Riyadh Business Owners & Marketing Teams"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal delay-1">
            {[
              {
                icon: "🏢",
                en: {
                  title: "Business Owners",
                  desc: "You know your business needs better online presence but you're not sure what's wrong with your current website. This audit gives you a clear health score and specific priorities without any technical jargon.",
                },
                ar: {
                  title: "أصحاب الأعمال",
                  desc: "تعرف أن نشاطك يحتاج حضور رقمي أفضل لكنك مش متأكد ما المشكلة في موقعك الحالي. هذا التدقيق يعطيك نتيجة صحة واضحة وأولويات محددة بدون أي مصطلحات تقنية.",
                },
              },
              {
                icon: "📈",
                en: {
                  title: "Marketing Managers",
                  desc: "You need data to justify budget requests or evaluate your current agency performance. Download the PDF report and share it with stakeholders as evidence for your recommendations.",
                },
                ar: {
                  title: "مدراء التسويق",
                  desc: "تحتاج بيانات لتبرير طلبات الميزانية أو تقييم أداء وكالتك الحالية. حمّل تقرير PDF وشاركه مع صناع القرار كدليل لتوصياتك.",
                },
              },
              {
                icon: "🚀",
                en: {
                  title: "New Businesses",
                  desc: "You just launched a website and want to make sure everything is set up correctly before investing in Google Ads or SEO. Catch problems early before they cost you money.",
                },
                ar: {
                  title: "الأعمال الجديدة",
                  desc: "أطلقت موقعك للتو وتريد التأكد من إعداد كل شيء بشكل صحيح قبل الاستثمار في إعلانات قوقل أو SEO. اكتشف المشاكل مبكراً قبل أن تكلفك مالاً.",
                },
              },
              {
                icon: "🔄",
                en: {
                  title: "Businesses Switching Agencies",
                  desc: "You're evaluating a new digital marketing agency and want an independent assessment of your current website health. Our audit is unbiased, data-driven, and instant.",
                },
                ar: {
                  title: "الأعمال التي تغيّر وكالتها",
                  desc: "تقيّم وكالة تسويق رقمي جديدة وتريد تقييماً مستقلاً لصحة موقعك الحالي. تدقيقنا محايد ومبني على البيانات وفوري.",
                },
              },
            ].map((persona) => {
              const c = isAr ? persona.ar : persona.en;
              return (
                <div
                  key={persona.en.title}
                  className="bg-[#0E1A2E] border border-white/[0.07] rounded-xl p-6 hover:border-[#F5C518]/20 transition-all flex gap-4"
                >
                  <div className="text-3xl shrink-0 mt-0.5">{persona.icon}</div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-2">{c.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Section 5: FAQ ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">
              {isAr ? "الأسئلة الشائعة" : "FAQ"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
          </div>

          <div className="space-y-3 reveal delay-1">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="group bg-[#0E1A2E] border border-white/[0.07] rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all"
              >
                <summary className={`flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none ${isAr ? "flex-row-reverse" : ""}`}>
                  <span className="text-white font-semibold text-sm leading-snug">{item.q}</span>
                  <svg
                    className="w-4 h-4 text-white/30 shrink-0 transition-transform duration-200 group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className={`px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/[0.05] pt-4 ${isAr ? "text-right" : ""}`}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 6: Final CTA ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center reveal">
          <div
            className="relative rounded-2xl border border-[#F5C518]/15 p-8 md:p-12 overflow-hidden"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,197,24,0.06) 0%, transparent 70%), #0E1A2E" }}
          >
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
              {isAr ? "نتيجة صحة موقعك بانتظارك" : "Your Website's Health Score Is Waiting"}
            </h2>
            <p className="text-white/55 text-sm md:text-base mb-8 max-w-xl mx-auto">
              {isAr
                ? "انضم لأكثر من ٥٠٠ نشاط سعودي استخدموا أداة التدقيق المجانية لاكتشاف وإصلاح مشاكل مواقعهم. ٦٠ ثانية، مجاناً بالكامل، وممكن تغيّر كل شيء."
                : "Join 500+ Saudi businesses who have used our free audit tool to identify and fix their website issues. Takes 60 seconds, costs nothing, and could change everything."}
            </p>
            <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${isAr ? "sm:flex-row-reverse" : ""}`}>
              <button
                onClick={scrollToTop}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all shadow-xl shadow-[#F5C518]/20"
              >
                {isAr ? "ابدأ التدقيق المجاني ↑" : "Run Free Audit ↑"}
              </button>
              <a
                href="https://wa.me/966564229190"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-all"
              >
                {isAr ? "أو واتساب ←" : "Or WhatsApp Us →"}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
