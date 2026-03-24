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
      title: { absolute: "الشروط والأحكام | لوكال سيتي سولوشنز" },
      description: "الشروط والأحكام لوكالة لوكال سيتي سولوشنز للتسويق الرقمي — شروط الخدمة والدفع والملكية الفكرية ومسؤوليات العميل.",
    };
  }
  return {
    title: { absolute: "Terms of Service | Local City Solutions" },
    description: "Terms of Service for Local City Solutions digital marketing agency — service terms, payment, intellectual property, and client responsibilities.",
  };
}

export default async function TermsPage({ params }: PageProps) {
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
              الشروط والأحكام
            </h1>
            <div className="inline-flex items-center gap-2 mt-2">
              <span className="bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] text-xs font-semibold px-3 py-1.5 rounded-full">
                آخر تحديث: ٢٤ مارس ٢٠٢٦
              </span>
            </div>
            <p className="text-white/50 text-sm mt-4">
              <Link href="/en/terms" className="text-[#F5C518]/70 hover:text-[#F5C518] transition-colors">
                View in English →
              </Link>
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="prose-custom space-y-12">

              {/* Intro */}
              <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 md:p-8 border-r-[3px] border-r-[#F5C518]/60">
                <p className="text-white/70 text-sm leading-relaxed">
                  تحكم شروط الخدمة هذه (&quot;الشروط&quot;) استخدامك لموقع <strong className="text-white">localcitysolutions.com</strong> وخدمات التسويق الرقمي المقدمة من <strong className="text-white">لوكال سيتي سولوشنز</strong> (&quot;نحن&quot; أو &quot;لنا&quot; أو &quot;الوكالة&quot;). بوصولك إلى موقعنا أو استخدامك لخدماتنا، فإنك توافق على الالتزام بهذه الشروط.
                </p>
                <p className="text-white/60 text-sm leading-relaxed mt-3">
                  يرجى قراءة هذه الشروط بعناية قبل استخدام موقعنا أو خدماتنا. إذا كنت لا توافق، يرجى عدم استخدام موقعنا أو الاستفادة من خدماتنا.
                </p>
              </div>

              {/* 1. Definitions */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ١. التعريفات
                </h2>
                <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5 space-y-4 text-sm text-white/60 leading-relaxed">
                  <p><strong className="text-white/90">&quot;العميل&quot;</strong> يشير إلى أي فرد أو كيان تجاري يتعاقد مع لوكال سيتي سولوشنز للحصول على خدمات التسويق الرقمي.</p>
                  <p><strong className="text-white/90">&quot;الخدمات&quot;</strong> تشير إلى جميع خدمات التسويق الرقمي التي تقدمها لوكال سيتي سولوشنز، بما في ذلك على سبيل المثال لا الحصر تحسين محركات البحث (SEO)، إدارة إعلانات قوقل، إدارة إعلانات ميتا، تصميم المواقع، إدارة السوشيال ميديا، تحسين ملف النشاط التجاري في قوقل، حلول التجارة الإلكترونية، وإنشاء المحتوى.</p>
                  <p><strong className="text-white/90">&quot;المُخرجات&quot;</strong> تشير إلى جميع منتجات العمل والتقارير والأصول الإبداعية والحملات والمواد التي تنتجها لوكال سيتي سولوشنز كجزء من الخدمات.</p>
                  <p><strong className="text-white/90">&quot;الاتفاقية&quot;</strong> تشير إلى أي عرض أو عقد أو اتفاقية خدمات موقعة بين لوكال سيتي سولوشنز والعميل، والتي تشكل مع هذه الشروط الاتفاقية الكاملة.</p>
                </div>
              </div>

              {/* 2. Services */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ٢. الخدمات
                </h2>
                <div className="text-white/60 text-sm leading-relaxed space-y-3">
                  <p>تقدم لوكال سيتي سولوشنز خدمات التسويق الرقمي للأعمال في الرياض، المملكة العربية السعودية والسوق السعودي الأوسع. يتم تحديد النطاق والجدول الزمني والتسعير المحدد للخدمات في اتفاقيات أو عروض الخدمة الفردية المقدمة لكل عميل.</p>
                  <p>نحتفظ بالحق في تعديل أو تعليق أو إيقاف أي جانب من خدماتنا في أي وقت مع إشعار معقول للعملاء النشطين.</p>
                </div>
              </div>

              {/* 3. Client Responsibilities */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ٣. مسؤوليات العميل
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-3">بالتعاقد على خدماتنا، يوافق العميل على:</p>
                <ul className="text-white/60 text-sm space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> تقديم معلومات تجارية دقيقة وكاملة لازمة لإعداد وتنفيذ الحملات</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> منح الوصول في الوقت المناسب إلى الحسابات والمنصات والأصول المطلوبة (إعلانات قوقل، مدير أعمال ميتا، نظام إدارة الموقع، ملف النشاط التجاري في قوقل، أدوات التحليل، إلخ)</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> مراجعة واعتماد المخرجات وإعلانات الحملات والمحتوى ضمن الجداول الزمنية المتفق عليها</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> الرد على التواصل في أوقات معقولة لتجنب التأخير في تنفيذ الحملات</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> التأكد من أن جميع المواد والمحتوى والمعلومات المقدمة لنا لا تنتهك حقوق الملكية الفكرية لأي طرف ثالث</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> الامتثال لجميع القوانين واللوائح السعودية المتعلقة بنشاطه التجاري وإعلاناته</li>
                </ul>
                <p className="text-white/50 text-xs mt-4 leading-relaxed">
                  التأخيرات الناتجة عن عدم تقديم العميل للوصول أو الموافقات أو المعلومات المطلوبة قد تؤثر على الجداول الزمنية والنتائج. لا تتحمل لوكال سيتي سولوشنز المسؤولية عن التأخيرات أو مشاكل الأداء الناشئة عن عدم تعاون العميل.
                </p>
              </div>

              {/* 4. Payment Terms */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ٤. شروط الدفع
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-3">يتم تحديد شروط الدفع في اتفاقيات الخدمة الفردية. تنطبق الشروط العامة التالية:</p>
                <ul className="text-white/60 text-sm space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> جميع الرسوم مُسعّرة بالريال السعودي (SAR) ما لم يُنص على خلاف ذلك</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> يستحق الدفع وفقاً للجدول المحدد في العرض أو الاتفاقية الموقعة</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> التأخر في الدفع لأكثر من <span dir="ltr" className="inline">١٥</span> يوماً قد يؤدي إلى تعليق الحملات والخدمات النشطة حتى استلام الدفع</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> ميزانيات الإنفاق الإعلاني (لإعلانات قوقل، إعلانات ميتا، إلخ) منفصلة عن رسوم خدمات الوكالة وتُفوتر مباشرة من المنصات المعنية أو بشكل منفصل حسب الاتفاق</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> لا تُقدم استردادات للخدمات المنجزة أو الإنفاق الإعلاني المُستهلك من قبل منصات الطرف الثالث</li>
                </ul>
              </div>

              {/* 5. Intellectual Property */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ٥. الملكية الفكرية
                </h2>
                <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5 space-y-4 text-sm text-white/60 leading-relaxed">
                  <p><strong className="text-white/90">الأعمال المُنشأة بواسطة لوكال سيتي سولوشنز:</strong> جميع المخرجات المخصصة المُنشأة للعميل (تصميمات المواقع، إعلانات إبداعية، محتوى، رسومات) تصبح ملكاً للعميل عند اكتمال الدفع. حتى اكتمال الدفع، تحتفظ لوكال سيتي سولوشنز بجميع الحقوق على المخرجات.</p>
                  <p><strong className="text-white/90">المواد الموجودة مسبقاً:</strong> أي أدوات أو قوالب أو أُطر أو مكتبات أكواد أو منهجيات مملوكة للوكال سيتي سولوشنز قبل أو بشكل مستقل عن التعاقد مع العميل تبقى ملكيتنا الفكرية. نمنح العميل ترخيصاً غير حصري لاستخدام هذه المواد كجزء من المشروع المُسلّم.</p>
                  <p><strong className="text-white/90">حقوق المحفظة:</strong> تحتفظ لوكال سيتي سولوشنز بالحق في عرض الأعمال المكتملة في محفظتنا ودراسات الحالة والمواد التسويقية، ما لم يطلب العميل السرية كتابياً.</p>
                  <p><strong className="text-white/90">مواد العميل:</strong> جميع المواد المقدمة من العميل (الشعارات، أصول العلامة التجارية، صور المنتجات، معلومات النشاط) تبقى ملكاً للعميل. نستخدمها فقط لتقديم الخدمات المتفق عليها.</p>
                </div>
              </div>

              {/* 6. Third-Party Platforms */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ٦. منصات الطرف الثالث
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  تتضمن خدماتنا استخدام منصات طرف ثالث تشمل على سبيل المثال لا الحصر إعلانات قوقل، Google Analytics، ملف النشاط التجاري في قوقل، ميتا (فيسبوك/إنستقرام)، سلة، زد، شوبيفاي، ومزودي استضافة متنوعين.
                </p>
                <ul className="text-white/60 text-sm space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> لا تتحمل لوكال سيتي سولوشنز المسؤولية عن التغييرات في سياسات أو خوارزميات أو تسعير أو توفر منصات الطرف الثالث</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> لسنا مسؤولين عن تعليق الحسابات أو رفض الإعلانات أو انتهاكات السياسات الناتجة عن تاريخ حساب العميل السابق أو محتواه</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> تنطبق شروط خدمة المنصات المحددة بالإضافة إلى هذه الشروط</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> يتأثر أداء الإعلانات بعوامل خارجة عن سيطرتنا تشمل المنافسة في السوق والموسمية وتغييرات خوارزميات المنصات وسلوك المستهلك</li>
                </ul>
              </div>

              {/* 7. Confidentiality */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ٧. السرية
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  يوافق الطرفان على الحفاظ على سرية أي معلومات ملكية يتم مشاركتها خلال مسار التعاقد. يشمل ذلك الاستراتيجيات التجارية وبيانات الحملات والمعلومات المالية وبيانات العملاء والأسرار التجارية.
                </p>
                <p className="text-white/60 text-sm leading-relaxed mt-2">
                  تستمر التزامات السرية بعد إنهاء اتفاقية الخدمة لمدة سنتين (٢).
                </p>
              </div>

              {/* 8. Limitation of Liability */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ٨. حدود المسؤولية
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  تقدم لوكال سيتي سولوشنز خدمات التسويق الرقمي على أساس بذل أفضل الجهود. بينما نسعى لتحقيق أفضل النتائج الممكنة، لا يمكننا ضمان نتائج محددة مثل ترتيب معين في محركات البحث أو حجم زيارات محدد أو معدلات تحويل مضمونة.
                </p>
                <p className="text-white/60 text-sm leading-relaxed mb-3">إلى أقصى حد يسمح به القانون:</p>
                <ul className="text-white/60 text-sm space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> لا تتجاوز مسؤوليتنا الإجمالية عن أي مطالبة ناشئة عن خدماتنا إجمالي الرسوم المدفوعة من العميل في الأشهر الثلاثة (٣) السابقة للمطالبة</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> لسنا مسؤولين عن الأضرار غير المباشرة أو العرضية أو التبعية أو العقابية، بما في ذلك الأرباح الفائتة أو الفرص التجارية الضائعة</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> لسنا مسؤولين عن الخسائر الناشئة عن تغييرات أو انقطاعات أو تطبيق سياسات منصات الطرف الثالث</li>
                </ul>
              </div>

              {/* 9. Term and Termination */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ٩. المدة والإنهاء
                </h2>
                <ul className="text-white/60 text-sm space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> تبدأ عقود الخدمة في التاريخ المحدد في الاتفاقية الموقعة وتستمر للمدة المتفق عليها</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> يجوز لأي طرف إنهاء الاتفاقية بإشعار كتابي مدته ٣٠ يوماً ما لم يُنص على خلاف ذلك في اتفاقية الخدمة</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> عند الإنهاء، يكون العميل مسؤولاً عن دفع جميع الخدمات المُنجزة والتكاليف المتكبدة حتى تاريخ الإنهاء</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> عند الإنهاء واكتمال الدفع، سنزود العميل بجميع المخرجات المكتملة حتى تاريخه ونقل الوصول إلى جميع الحسابات والأصول المملوكة للعميل</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> سيتم إيقاف أي حملات إعلانية نشطة عند الإنهاء. يكون العميل مسؤولاً عن إدارة أو إغلاق حسابات منصات الإعلان الخاصة به بعد التسليم</li>
                </ul>
              </div>

              {/* 10. Dispute Resolution */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ١٠. حل النزاعات
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-3">يتم حل أي نزاعات تنشأ عن هذه الشروط أو خدماتنا كما يلي:</p>
                <ul className="text-white/60 text-sm space-y-2 list-none">
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> يسعى الطرفان أولاً لحل النزاع من خلال التفاوض بحسن نية</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> إذا فشل التفاوض خلال ٣٠ يوماً، يُحال النزاع إلى الوساطة</li>
                  <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> إذا فشلت الوساطة، يخضع النزاع لاختصاص المحاكم المختصة في الرياض، المملكة العربية السعودية</li>
                </ul>
              </div>

              {/* 11. Governing Law */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ١١. القانون الحاكم
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  تخضع هذه الشروط وتُفسر وفقاً لقوانين المملكة العربية السعودية. أي مسائل لا تغطيها هذه الشروط تخضع للأنظمة السعودية المعمول بها والممارسات التجارية السارية.
                </p>
              </div>

              {/* 12. Modifications */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ١٢. التعديلات على هذه الشروط
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  قد نحدّث هذه الشروط من وقت لآخر. ستُنشر التغييرات على هذه الصفحة مع تحديث تاريخ &quot;آخر تحديث&quot;. يُعتبر استمرار استخدام موقعنا أو خدماتنا بعد التغييرات قبولاً للشروط المعدلة. بالنسبة للعملاء النشطين، سيتم التواصل بشأن التغييرات الجوهرية على هذه الشروط مباشرة.
                </p>
              </div>

              {/* 13. Severability */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ١٣. قابلية الفصل
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  إذا تبيّن أن أي بند من هذه الشروط غير صالح أو غير قابل للتنفيذ، تبقى البنود المتبقية سارية وقائمة بكامل قوتها.
                </p>
              </div>

              {/* 14. Contact */}
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                  ١٤. تواصل معنا
                </h2>
                <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5">
                  <p className="text-white/60 text-sm mb-4">إذا كانت لديك أسئلة حول شروط الخدمة هذه:</p>
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm font-semibold">لوكال سيتي سولوشنز</p>
                    <p className="text-white/60 text-sm">الرياض، المملكة العربية السعودية</p>
                    <a href="mailto:hello@localcitysolutions.com" className="text-[#F5C518] text-sm hover:underline block" dir="ltr">
                      hello@localcitysolutions.com
                    </a>
                    <a href="tel:+966564229190" className="text-[#F5C518] text-sm hover:underline block" dir="ltr">
                      +966 56 422 9190
                    </a>
                    <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="text-[#F5C518] text-sm hover:underline block" dir="ltr">
                      wa.me/966564229190
                    </a>
                    <a href="https://localcitysolutions.com" className="text-[#F5C518] text-sm hover:underline block" dir="ltr">
                      localcitysolutions.com
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
            Terms of Service
          </h1>
          <div className="inline-flex items-center gap-2 mt-2">
            <span className="bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] text-xs font-semibold px-3 py-1.5 rounded-full">
              Last Updated: March 24, 2026
            </span>
          </div>
          <p className="text-white/50 text-sm mt-4">
            <Link href="/ar/terms" className="text-[#F5C518]/70 hover:text-[#F5C518] transition-colors">
              اقرأ بالعربية ←
            </Link>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose-custom space-y-12">

            {/* Intro */}
            <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 md:p-8 border-l-[3px] border-l-[#F5C518]/60">
              <p className="text-white/70 text-sm leading-relaxed">
                These Terms of Service (&quot;Terms&quot;) govern your use of the website <strong className="text-white">localcitysolutions.com</strong> and the digital marketing services provided by <strong className="text-white">Local City Solutions</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing our website or engaging our services, you agree to be bound by these Terms.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                Please read these Terms carefully before using our website or services. If you do not agree, please do not use our website or engage our services.
              </p>
            </div>

            {/* 1. Definitions */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                1. Definitions
              </h2>
              <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5 space-y-4 text-sm text-white/60 leading-relaxed">
                <p><strong className="text-white/90">&quot;Client&quot;</strong> refers to any individual or business entity that engages Local City Solutions for digital marketing services.</p>
                <p><strong className="text-white/90">&quot;Services&quot;</strong> refers to all digital marketing services offered by Local City Solutions, including but not limited to SEO, Google Ads management, Meta Ads management, web design, social media management, Google Business Profile optimisation, e-commerce solutions, and content creation.</p>
                <p><strong className="text-white/90">&quot;Deliverables&quot;</strong> refers to all work products, reports, creative assets, campaigns, and materials produced by Local City Solutions as part of the Services.</p>
                <p><strong className="text-white/90">&quot;Agreement&quot;</strong> refers to any signed proposal, contract, or service agreement between Local City Solutions and the Client, which together with these Terms forms the complete agreement.</p>
              </div>
            </div>

            {/* 2. Services */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                2. Services
              </h2>
              <div className="text-white/60 text-sm leading-relaxed space-y-3">
                <p>Local City Solutions provides digital marketing services to businesses in Riyadh, Saudi Arabia and the broader KSA market. The specific scope, timeline, and pricing of Services are defined in individual service agreements or proposals provided to each Client.</p>
                <p>We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time with reasonable notice to active Clients.</p>
              </div>
            </div>

            {/* 3. Client Responsibilities */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                3. Client Responsibilities
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-3">By engaging our Services, the Client agrees to:</p>
              <ul className="text-white/60 text-sm space-y-2 list-none">
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Provide accurate and complete business information necessary for campaign setup and execution</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Grant timely access to required accounts, platforms, and assets (Google Ads, Meta Business Manager, website CMS, Google Business Profile, analytics tools, etc.)</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Review and approve deliverables, ad creatives, and content within agreed timelines</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Respond to communications within reasonable timeframes to avoid delays in campaign execution</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Ensure all materials, content, and information provided to us do not infringe on any third-party intellectual property rights</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Comply with all applicable Saudi laws and regulations related to their business and advertising</li>
              </ul>
              <p className="text-white/50 text-xs mt-4 leading-relaxed">
                Delays caused by the Client&apos;s failure to provide required access, approvals, or information may impact project timelines and results. Local City Solutions is not responsible for delays or performance issues arising from Client non-cooperation.
              </p>
            </div>

            {/* 4. Payment Terms */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                4. Payment Terms
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-3">Payment terms are specified in individual service agreements. The following general terms apply:</p>
              <ul className="text-white/60 text-sm space-y-2 list-none">
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> All fees are quoted in Saudi Riyals (SAR) unless otherwise specified</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Payment is due according to the schedule outlined in the signed proposal or agreement</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Late payments exceeding 15 days may result in suspension of active campaigns and services until payment is received</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Ad spend budgets (Google Ads, Meta Ads, etc.) are separate from agency service fees and are billed directly by the respective platforms or invoiced separately as agreed</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Refunds are not provided for services already rendered or ad spend already consumed by third-party platforms</li>
              </ul>
            </div>

            {/* 5. Intellectual Property */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                5. Intellectual Property
              </h2>
              <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5 space-y-4 text-sm text-white/60 leading-relaxed">
                <p><strong className="text-white/90">Work created by Local City Solutions:</strong> All custom deliverables created specifically for the Client (website designs, ad creatives, content, graphics) become the Client&apos;s property upon full payment. Until full payment is received, Local City Solutions retains all rights to the deliverables.</p>
                <p><strong className="text-white/90">Pre-existing materials:</strong> Any tools, templates, frameworks, code libraries, or methodologies owned by Local City Solutions prior to or independent of the Client engagement remain our intellectual property. We grant the Client a non-exclusive licence to use these materials as part of the delivered project.</p>
                <p><strong className="text-white/90">Portfolio rights:</strong> Local City Solutions reserves the right to display completed work in our portfolio, case studies, and marketing materials, unless the Client requests confidentiality in writing.</p>
                <p><strong className="text-white/90">Client materials:</strong> All materials provided by the Client (logos, brand assets, product images, business information) remain the Client&apos;s property. We use them solely for delivering the agreed Services.</p>
              </div>
            </div>

            {/* 6. Third-Party Platforms */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                6. Third-Party Platforms
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                Our Services involve the use of third-party platforms including but not limited to Google Ads, Google Analytics, Google Business Profile, Meta (Facebook/Instagram), Salla, Zid, Shopify, and various hosting providers.
              </p>
              <ul className="text-white/60 text-sm space-y-2 list-none">
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Local City Solutions is not responsible for changes to third-party platform policies, algorithms, pricing, or availability</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> We are not liable for account suspensions, ad disapprovals, or policy violations caused by the Client&apos;s pre-existing account history or content</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Platform-specific terms of service apply in addition to these Terms</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Ad performance is influenced by factors beyond our control including market competition, seasonality, platform algorithm changes, and consumer behaviour</li>
              </ul>
            </div>

            {/* 7. Confidentiality */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                7. Confidentiality
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Both parties agree to keep confidential any proprietary information shared during the course of the engagement. This includes business strategies, campaign data, financial information, customer data, and trade secrets.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mt-2">
                Confidentiality obligations survive the termination of the service agreement for a period of two (2) years.
              </p>
            </div>

            {/* 8. Limitation of Liability */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                8. Limitation of Liability
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-3">
                Local City Solutions provides digital marketing services on a best-effort basis. While we strive for the best possible results, we cannot guarantee specific outcomes such as exact search engine rankings, specific traffic volumes, or guaranteed conversion rates. Digital marketing results depend on numerous factors including market conditions, competition, platform algorithms, and consumer behaviour.
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-3">To the maximum extent permitted by law:</p>
              <ul className="text-white/60 text-sm space-y-2 list-none">
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Our total liability for any claim arising from our Services shall not exceed the total fees paid by the Client in the three (3) months preceding the claim</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> We are not liable for indirect, incidental, consequential, or punitive damages, including lost profits or business opportunities</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> We are not liable for losses arising from third-party platform changes, outages, or policy enforcement</li>
              </ul>
            </div>

            {/* 9. Term and Termination */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                9. Term and Termination
              </h2>
              <ul className="text-white/60 text-sm space-y-2 list-none">
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Service engagements begin on the date specified in the signed agreement and continue for the agreed term</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Either party may terminate the agreement with 30 days written notice unless otherwise specified in the service agreement</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Upon termination, the Client is responsible for payment of all Services rendered and costs incurred up to the termination date</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Upon termination and full payment, we will provide the Client with all deliverables completed to date and transfer access to all Client-owned accounts and assets</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Any active advertising campaigns will be paused upon termination. The Client is responsible for managing or closing their own ad platform accounts after handover</li>
              </ul>
            </div>

            {/* 10. Dispute Resolution */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                10. Dispute Resolution
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-3">Any disputes arising from these Terms or our Services shall be resolved as follows:</p>
              <ul className="text-white/60 text-sm space-y-2 list-none">
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> Both parties shall first attempt to resolve the dispute through good-faith negotiation</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> If negotiation fails within 30 days, the dispute shall be referred to mediation</li>
                <li className="flex items-start gap-2"><span className="text-[#F5C518] mt-0.5">—</span> If mediation fails, the dispute shall be subject to the jurisdiction of the competent courts in Riyadh, Kingdom of Saudi Arabia</li>
              </ul>
            </div>

            {/* 11. Governing Law */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                11. Governing Law
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. Any matters not covered by these Terms shall be governed by applicable Saudi regulations and commercial practices.
              </p>
            </div>

            {/* 12. Modifications */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                12. Modifications to These Terms
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                We may update these Terms from time to time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of our website or Services after changes constitutes acceptance of the revised Terms. For active Clients, material changes to these Terms will be communicated directly.
              </p>
            </div>

            {/* 13. Severability */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                13. Severability
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </div>

            {/* 14. Contact */}
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl mb-4 mt-12 pb-2 border-b border-white/[0.08]">
                14. Contact Us
              </h2>
              <div className="bg-[#0C1424] rounded-xl p-6 border border-white/5">
                <p className="text-white/60 text-sm mb-4">If you have questions about these Terms of Service, contact us at:</p>
                <div className="space-y-2">
                  <p className="text-white/80 text-sm font-semibold">Local City Solutions</p>
                  <p className="text-white/60 text-sm">Riyadh, Saudi Arabia</p>
                  <a href="mailto:hello@localcitysolutions.com" className="text-[#F5C518] text-sm hover:underline block">
                    hello@localcitysolutions.com
                  </a>
                  <a href="tel:+966564229190" className="text-[#F5C518] text-sm hover:underline block">
                    +966 56 422 9190
                  </a>
                  <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="text-[#F5C518] text-sm hover:underline block">
                    wa.me/966564229190
                  </a>
                  <a href="https://localcitysolutions.com" className="text-[#F5C518] text-sm hover:underline block">
                    localcitysolutions.com
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
