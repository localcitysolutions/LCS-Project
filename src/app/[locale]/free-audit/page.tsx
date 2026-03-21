import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale }> }

const AUDIT_ITEMS = {
  en: [
    { icon: "🔍", title: "Google Rankings Audit", desc: "Where you rank for your most important keywords. What you're missing and what's within reach." },
    { icon: "📍", title: "Google Business Profile Review", desc: "Is your GBP optimized? Are you in the Maps 3-pack for your target searches?" },
    { icon: "📱", title: "Website Performance Check", desc: "Page speed, mobile experience, and Core Web Vitals — the factors that affect both UX and ranking." },
    { icon: "📢", title: "Paid Ads Assessment", desc: "If you're running ads, we'll review your campaigns for wasted spend and missed targeting opportunities." },
    { icon: "💬", title: "Social Media Audit", desc: "Profile quality, content consistency, engagement rate, and competitor comparison across all platforms." },
    { icon: "🏆", title: "Competitor Analysis", desc: "What your top 3 competitors are doing digitally that you're not — and how to surpass them." },
  ],
  ar: [
    { icon: "🔍", title: "تدقيق ترتيب قوقل", desc: "أين تظهر في الكلمات المفتاحية الأهم. ما تفتقده وما هو في متناولك." },
    { icon: "📍", title: "مراجعة ملف النشاط في قوقل", desc: "هل ملفك محسّن؟ هل تظهر في المجموعة الثلاثية لعمليات البحث المستهدفة؟" },
    { icon: "📱", title: "فحص أداء الموقع", desc: "سرعة الصفحة وتجربة الجوال ومؤشرات Core Web Vitals — العوامل التي تؤثر على تجربة المستخدم والترتيب معاً." },
    { icon: "📢", title: "تقييم الإعلانات المدفوعة", desc: "إذا كنت تشغّل إعلانات، سنراجع حملاتك للكشف عن الإنفاق المهدر وفرص الاستهداف الفائتة." },
    { icon: "💬", title: "تدقيق السوشيال ميديا", desc: "جودة الملف الشخصي، واتساق المحتوى، ومعدل التفاعل، ومقارنة المنافسين عبر كل المنصات." },
    { icon: "🏆", title: "تحليل المنافسين", desc: "ما يفعله أبرز ٣ منافسين رقمياً ولا تفعله أنت — وكيف تتفوق عليهم." },
  ],
};

const STEPS = {
  en: [
    { num: "01", title: "Request Your Audit", desc: "WhatsApp us or fill out the form. No payment required — just your website URL and business info." },
    { num: "02", title: "We Analyze", desc: "Our team runs a comprehensive analysis of your digital presence against your competitors." },
    { num: "03", title: "Get Your Report", desc: "Within 48 hours, you'll receive a detailed report with specific, actionable recommendations." },
    { num: "04", title: "Strategy Call", desc: "We'll walk you through the findings and outline a growth plan — no obligation to work with us." },
  ],
  ar: [
    { num: "٠١", title: "اطلب تدقيقك", desc: "راسلنا على واتساب أو اعبئ النموذج. لا دفع مطلوب — فقط رابط موقعك ومعلومات نشاطك." },
    { num: "٠٢", title: "نحلل", desc: "فريقنا يُجري تحليلاً شاملاً لحضورك الرقمي مقارنةً بمنافسيك." },
    { num: "٠٣", title: "احصل على تقريرك", desc: "خلال ٤٨ ساعة ستحصل على تقرير مفصل بتوصيات محددة وقابلة للتنفيذ." },
    { num: "٠٤", title: "مكالمة الاستراتيجية", desc: "نأخذك عبر النتائج ونضع خطة نمو — بدون أي إلزام بالعمل معنا." },
  ],
};

const CONTENT = {
  en: { meta: { title: "Free Digital Marketing Audit for Riyadh Businesses", description: "Get a free, comprehensive digital marketing audit for your Riyadh business. Covers SEO, Google Ads, Google Business Profile, social media, and competitors. No strings attached." }, label: "Free Audit", h1: "Get Your Free Digital Marketing Audit", sub: "No fluff. No sales pitch. Just a genuine, detailed analysis of where your Riyadh business stands online — and exactly what to do to improve it.", whatLabel: "What's Included", whatH2: "A Comprehensive Look at Your Digital Presence", howLabel: "How It Works", howH2: "Simple, Fast, and No Obligation", cta: { heading: "Claim Your Free Audit Now", subtitle: "Limited spots available. Request yours today and get a clear picture of your digital growth opportunity in Riyadh." } },
  ar: { meta: { title: "تدقيق تسويق رقمي مجاني لأعمال الرياض", description: "احصل على تدقيق تسويق رقمي شامل ومجاني لنشاطك في الرياض. يغطي SEO وإعلانات قوقل وملف النشاط والسوشيال ميديا والمنافسين. بدون أي التزامات." }, label: "تدقيق مجاني", h1: "احصل على تدقيقك التسويق الرقمي المجاني", sub: "بدون كلام فاضي، ولا عرض مبيعات. فقط تحليل حقيقي ومفصل لأين يقف نشاطك في الرياض رقمياً — وبالضبط ماذا تفعل لتحسينه.", whatLabel: "ما يتضمنه التدقيق", whatH2: "نظرة شاملة على حضورك الرقمي", howLabel: "كيف يعمل", howH2: "بسيط وسريع وبدون إلزام", cta: { heading: "اطلب تدقيقك المجاني الآن", subtitle: "أماكن محدودة. اطلب تدقيقك اليوم واحصل على صورة واضحة لفرصة نموك الرقمي في الرياض." } },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function FreeAuditPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = CONTENT[locale] || CONTENT.en;
  const auditItems = AUDIT_ITEMS[locale] || AUDIT_ITEMS.en;
  const steps = STEPS[locale] || STEPS.en;

  return (
    <>
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-4">{c.label}</span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{c.h1}</h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8">{c.sub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1fb858] transition-all shadow-xl shadow-[#25D366]/25">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              {isAr ? "اطلب تدقيقك عبر واتساب" : "Request Audit via WhatsApp"}
            </a>
            <a href="tel:+966564229190" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-all">
              {isAr ? "أو اتصل بنا" : "Or Call Us"}
            </a>
            <a href="mailto:hello@localcitysolutions.com" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:border-white/40 transition-all">
              {isAr ? "أو راسلنا بالإيميل" : "Or Email Us"}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.whatLabel}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.whatH2}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal delay-1">
            {auditItems.map((item) => (
              <div key={item.title} className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 hover:border-[#F5C518]/20 transition-all">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.howLabel}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.howH2}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal delay-1">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] text-[#F5C518] font-black text-base md:text-xl mb-3 md:mb-4 mx-auto">{step.num}</div>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABox heading={c.cta.heading} subtitle={c.cta.subtitle} locale={locale} bg="dark" />
    </>
  );
}
