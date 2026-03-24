import type { Metadata } from "next";
import Link from "next/link";

type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "ar") {
    return {
      title: { absolute: "سياسة الخصوصية | لوكال سيتي سولوشنز" },
      description: "سياسة الخصوصية الخاصة بلوكال سيتي سولوشنز — كيف نجمع معلوماتك ونستخدمها ونحميها.",
    };
  }
  return {
    title: { absolute: "Privacy Policy | Local City Solutions" },
    description: "Privacy Policy for Local City Solutions — how we collect, use, and protect your information.",
  };
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";

  if (isAr) {
    return (
      <div dir="rtl" className="bg-[#080E1A] min-h-screen">
        {/* Hero */}
        <section className="bg-[#080E1A] pt-28 md:pt-36 pb-12 md:pb-16 border-b border-white/[0.06]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <span className="inline-block text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              قانوني
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
              سياسة الخصوصية
            </h1>
            <div className="inline-flex items-center gap-2 mt-2">
              <span className="bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] text-xs font-semibold px-3 py-1.5 rounded-full">
                آخر تحديث: 24 مارس 2026
              </span>
            </div>
            <p className="text-white/50 text-sm mt-4">
              <Link href="/en/privacy-policy" className="text-[#F5C518]/70 hover:text-[#F5C518] transition-colors">
                View in English →
              </Link>
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="prose-custom space-y-12">

              <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 md:p-8 border-r-[3px] border-r-[#F5C518]/60">
                <p className="text-white/70 text-sm leading-relaxed">
                  في <strong className="text-white">لوكال سيتي سولوشنز</strong> (يُشار إليها بـ&quot;نحن&quot; أو &quot;الشركة&quot;)، نأخذ خصوصيتك بجدية تامة. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك الشخصية واستخدامها وحمايتها عند استخدامك لموقعنا الإلكتروني <strong className="text-white">localcitysolutions.com</strong> أو التواصل معنا بأي شكل من الأشكال.
                </p>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  1. المعلومات التي نجمعها
                </h2>
                <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5 space-y-4">
                  <div>
                    <h3 className="text-[#F5C518] font-semibold text-sm mb-2">المعلومات التي تقدمها مباشرةً</h3>
                    <ul className="text-white/60 text-sm space-y-1.5 list-none">
                      <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> الاسم الكامل وعنوان البريد الإلكتروني ورقم الهاتف</li>
                      <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> اسم الشركة وطبيعة النشاط التجاري</li>
                      <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> الرسائل المُرسَلة عبر نماذج التواصل أو البريد الإلكتروني أو واتساب</li>
                      <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> تفاصيل الطلب عند التقدم بطلب خدمة أو تدقيق مجاني</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[#F5C518] font-semibold text-sm mb-2">المعلومات التي تُجمع تلقائياً</h3>
                    <ul className="text-white/60 text-sm space-y-1.5 list-none">
                      <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> عنوان IP ونوع المتصفح ونظام التشغيل</li>
                      <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> الصفحات التي تزورها والمدة التي تقضيها فيها</li>
                      <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> مصدر الإحالة (كيف وصلت إلى موقعنا)</li>
                      <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> بيانات ملفات تعريف الارتباط (الكوكيز) وبيانات الجلسة</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  2. كيف نستخدم معلوماتك
                </h2>
                <div className="text-white/60 text-sm leading-relaxed space-y-3">
                  <p>نستخدم المعلومات التي نجمعها للأغراض التالية:</p>
                  <ul className="space-y-2 list-none">
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> الرد على استفساراتك وتقديم الخدمات المطلوبة</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> إرسال عروض التسعير والعروض التقديمية والتقارير</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> إدارة علاقتنا التجارية معك بفاعلية</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> تحسين محتوى موقعنا وتجربة المستخدم</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> الامتثال للمتطلبات القانونية والتنظيمية في المملكة العربية السعودية</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> إرسال تحديثات تسويقية ذات صلة (مع إمكانية إلغاء الاشتراك في أي وقت)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  3. ملفات تعريف الارتباط (الكوكيز)
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربتك. تشمل هذه الملفات: ملفات الجلسة الضرورية، وملفات التحليلات (Google Analytics)، وملفات الأداء الإعلاني (Google Ads، Meta Pixel). يمكنك ضبط إعدادات متصفحك لرفض ملفات تعريف الارتباط، مع الأخذ بعين الاعتبار أن بعض ميزات الموقع قد لا تعمل بشكل كامل.
                </p>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  4. مشاركة المعلومات
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة. قد نشارك بياناتك في الحالات التالية فقط:
                </p>
                <ul className="text-white/60 text-sm space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> <strong className="text-white/80">مزودو الخدمات:</strong> أدوات التحليل (Google Analytics)، منصات التسويق عبر البريد الإلكتروني، وأنظمة CRM — وهم ملزمون بالحفاظ على سرية بياناتك</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> <strong className="text-white/80">المتطلبات القانونية:</strong> عند وجود التزام قانوني أو أمر قضائي يستوجب ذلك</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> <strong className="text-white/80">حماية الحقوق:</strong> عند الضرورة لحماية حقوق الشركة أو أمانها أو ممتلكاتها</li>
                </ul>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  5. أمان البيانات
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  نطبّق تدابير أمنية تقنية وتنظيمية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو الإفصاح أو التغيير أو الإتلاف. يتضمن ذلك تشفير SSL لجميع نماذج الموقع، والوصول المقيد للبيانات الحساسة، ومراجعات أمنية دورية. غير أنه لا يوجد أي نظام نقل بيانات عبر الإنترنت آمن بشكل مطلق.
                </p>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  6. الاحتفاظ بالبيانات
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  نحتفظ ببياناتك الشخصية طوال فترة علاقتنا التجارية وبعدها لمدة لا تتجاوز 3 سنوات، وذلك لأغراض الامتثال القانوني وحل النزاعات. بيانات الاتصال للعملاء المحتملين الذين لم يتحولوا إلى عملاء فعليين تُحذف خلال 12 شهراً.
                </p>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  7. حقوقك
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-3">وفقاً للأنظمة المعمول بها، يحق لك:</p>
                <ul className="text-white/60 text-sm space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> الوصول إلى بياناتك الشخصية التي نحتفظ بها وطلب نسخة منها</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> تصحيح أي معلومات غير دقيقة أو غير مكتملة</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> طلب حذف بياناتك (مع مراعاة الالتزامات القانونية)</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> إلغاء الاشتراك في الاتصالات التسويقية في أي وقت</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> تقديم شكوى إلى الجهة التنظيمية المختصة</li>
                </ul>
                <p className="text-white/60 text-sm mt-3">
                  لممارسة أي من هذه الحقوق، تواصل معنا عبر:{" "}
                  <a href="mailto:hello@localcitysolutions.com" className="text-[#F5C518] hover:underline" dir="ltr">
                    hello@localcitysolutions.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  8. روابط المواقع الخارجية
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية الخاصة بهذه المواقع، وننصحك بمراجعة سياسات الخصوصية الخاصة بكل موقع تزوره.
                </p>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  9. خصوصية الأطفال
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  خدماتنا موجهة للشركات والمهنيين، ولا نجمع عمداً بيانات شخصية من أفراد دون سن 18 عاماً. إن اكتشفنا أننا جمعنا بيانات لشخص قاصر، نحذفها فوراً.
                </p>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  10. التغييرات على هذه السياسة
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  قد نحدّث سياسة الخصوصية هذه بشكل دوري. سنخطرك بأي تغييرات جوهرية عبر تحديث تاريخ &quot;آخر تحديث&quot; في أعلى الصفحة. ننصحك بمراجعة هذه السياسة بصفة دورية.
                </p>
              </div>

              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  11. تواصل معنا
                </h2>
                <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5">
                  <p className="text-white/60 text-sm mb-4">إذا كانت لديك أي أسئلة أو استفسارات بشأن سياسة الخصوصية هذه، تواصل معنا:</p>
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm font-semibold">لوكال سيتي سولوشنز</p>
                    <p className="text-white/60 text-sm">الرياض، المملكة العربية السعودية</p>
                    <a href="mailto:hello@localcitysolutions.com" className="text-[#F5C518] text-sm hover:underline block" dir="ltr">
                      hello@localcitysolutions.com
                    </a>
                    <a href="tel:+966564229190" className="text-[#F5C518] text-sm hover:underline block" dir="ltr">
                      +966 56 422 9190
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-16 bg-[#0E1A2E] border border-[#F5C518]/20 rounded-2xl p-8 text-center">
              <h2 className="text-white font-bold text-xl md:text-2xl mb-2">
                جاهز لتنمية أعمالك؟
              </h2>
              <p className="text-white/50 text-sm mb-6">
                احصل على تدقيق رقمي مجاني وابدأ رحلتك مع أفضل وكالة تسويق رقمي في الرياض.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/ar/free-audit"
                  className="px-6 py-2.5 bg-[#F5C518] text-[#080E1A] text-sm font-bold rounded-lg hover:bg-[#F5C518]/90 transition-all"
                >
                  احصل على تدقيق مجاني
                </Link>
                <Link
                  href="/ar/contact"
                  className="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // English
  return (
    <div dir="ltr" className="bg-[#080E1A] min-h-screen">
      {/* Hero */}
      <section className="bg-[#080E1A] pt-28 md:pt-36 pb-12 md:pb-16 border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Legal
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">
            Privacy Policy
          </h1>
          <div className="inline-flex items-center gap-2 mt-2">
            <span className="bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] text-xs font-semibold px-3 py-1.5 rounded-full">
              Last Updated: March 24, 2026
            </span>
          </div>
          <p className="text-white/50 text-sm mt-4">
            <Link href="/ar/privacy-policy" className="text-[#F5C518]/70 hover:text-[#F5C518] transition-colors">
              اقرأ بالعربية ←
            </Link>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose-custom space-y-12">

            <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 md:p-8 border-l-[3px] border-l-[#F5C518]/60">
              <p className="text-white/70 text-sm leading-relaxed">
                At <strong className="text-white">Local City Solutions</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;the Company&quot;), your privacy matters. This Privacy Policy explains how we collect, use, and protect your personal information when you visit <strong className="text-white">localcitysolutions.com</strong> or engage with us in any way.
              </p>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                1. Information We Collect
              </h2>
              <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5 space-y-4">
                <div>
                  <h3 className="text-[#F5C518] font-semibold text-sm mb-2">Information You Provide Directly</h3>
                  <ul className="text-white/60 text-sm space-y-1.5 list-none">
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Full name, email address, and phone number</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Company name and business type</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Messages sent via contact forms, email, or WhatsApp</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Request details when applying for a service or free audit</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[#F5C518] font-semibold text-sm mb-2">Information Collected Automatically</h3>
                  <ul className="text-white/60 text-sm space-y-1.5 list-none">
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> IP address, browser type, and operating system</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Pages visited and time spent on each page</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Referral source (how you arrived at our site)</li>
                    <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Cookie and session data</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                2. How We Use Your Information
              </h2>
              <div className="text-white/60 text-sm leading-relaxed space-y-3">
                <p>We use the information we collect to:</p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Respond to your enquiries and deliver requested services</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Send quotes, proposals, and campaign reports</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Manage our business relationship with you effectively</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Improve our website content and user experience</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Comply with legal and regulatory requirements in Saudi Arabia</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Send relevant marketing updates (you can opt out at any time)</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                3. Cookies
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Our website uses cookies to enhance your experience. These include essential session cookies, analytics cookies (Google Analytics), and advertising performance cookies (Google Ads, Meta Pixel). You can configure your browser to refuse cookies, though some site features may not function fully as a result.
              </p>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                4. Sharing Your Information
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                We do not sell your personal information to third parties. We may share your data only in the following circumstances:
              </p>
              <ul className="text-white/60 text-sm space-y-2 list-none">
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> <strong className="text-white/80">Service providers:</strong> Analytics tools (Google Analytics), email marketing platforms, and CRM systems — all bound by confidentiality obligations</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> <strong className="text-white/80">Legal requirements:</strong> When required by law or a valid court order</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> <strong className="text-white/80">Rights protection:</strong> When necessary to protect the rights, safety, or property of the Company</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                5. Data Security
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                We implement appropriate technical and organisational security measures to protect your information from unauthorised access, disclosure, alteration, or destruction. This includes SSL encryption on all site forms, restricted access to sensitive data, and periodic security reviews. No internet data transmission is completely secure, however.
              </p>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                6. Data Retention
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                We retain your personal data for the duration of our business relationship and for up to 3 years thereafter for legal compliance and dispute resolution purposes. Contact data for prospective clients who did not convert is deleted within 12 months.
              </p>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                7. Your Rights
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-3">Under applicable regulations, you have the right to:</p>
              <ul className="text-white/60 text-sm space-y-2 list-none">
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Access the personal data we hold about you and request a copy</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Correct any inaccurate or incomplete information</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Request deletion of your data (subject to legal obligations)</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Opt out of marketing communications at any time</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Lodge a complaint with the relevant supervisory authority</li>
              </ul>
              <p className="text-white/60 text-sm mt-3">
                To exercise any of these rights, contact us at:{" "}
                <a href="mailto:hello@localcitysolutions.com" className="text-[#F5C518] hover:underline">
                  hello@localcitysolutions.com
                </a>
              </p>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                8. Third-Party Links
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Our website may contain links to external sites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently.
              </p>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                9. Children&apos;s Privacy
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Our services are directed at businesses and professionals. We do not knowingly collect personal data from individuals under the age of 18. If we discover we have collected data from a minor, we will delete it immediately.
              </p>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                10. Changes to This Policy
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                We may update this Privacy Policy periodically. We will notify you of material changes by updating the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this policy from time to time.
              </p>
            </div>

            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                11. Contact Us
              </h2>
              <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5">
                <p className="text-white/60 text-sm mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="space-y-2">
                  <p className="text-white/80 text-sm font-semibold">Local City Solutions</p>
                  <p className="text-white/60 text-sm">Riyadh, Saudi Arabia</p>
                  <a href="mailto:hello@localcitysolutions.com" className="text-[#F5C518] text-sm hover:underline block">
                    hello@localcitysolutions.com
                  </a>
                  <a href="tel:+966564229190" className="text-[#F5C518] text-sm hover:underline block">
                    +966 56 422 9190
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#0E1A2E] border border-[#F5C518]/20 rounded-2xl p-8 text-center">
            <h2 className="text-white font-bold text-xl md:text-2xl mb-2">
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/50 text-sm mb-6">
              Get a free digital audit and see exactly what&apos;s holding your online presence back.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/en/free-audit"
                className="px-6 py-2.5 bg-[#F5C518] text-[#080E1A] text-sm font-bold rounded-lg hover:bg-[#F5C518]/90 transition-all"
              >
                Get Your Free Audit
              </Link>
              <Link
                href="/en/contact"
                className="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
