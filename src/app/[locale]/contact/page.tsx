import type { Metadata } from "next";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale }> }

const CONTENT = {
  en: {
    meta: { title: "Contact Local City Solutions — Riyadh Digital Marketing Agency", description: "Get in touch with our Riyadh digital marketing team. WhatsApp, call, or fill out a form. We respond within 1 business hour." },
    hero: { label: "Contact Us", h1: "Let's Talk About Growing Your Business", sub: "WhatsApp us, call, or fill out the form and we'll respond within one business hour." },
    methods: [
      { icon: "💬", title: "WhatsApp", desc: "Fastest way to reach us. We respond immediately during business hours.", action: "Message Us", href: "https://wa.me/966564229190" },
      { icon: "📞", title: "Phone", desc: "Prefer a call? Reach our Riyadh team directly.", action: "Call Now", href: "tel:+966564229190" },
      { icon: "📧", title: "Email", desc: "For formal inquiries, proposals, and documentation.", action: "hello@localcitysolutions.com", href: "mailto:hello@localcitysolutions.com" },
    ],
    form: { name: "Full Name", email: "Email Address", phone: "Phone Number", service: "Service You're Interested In", message: "Tell us about your business and goals", submit: "Send Message →", placeholder: { name: "Muhammad Al-Ahmad", email: "email@company.com", phone: "+966 5X XXX XXXX", message: "I run a restaurant in Al Olaya and want to grow my Google presence..." }, services: ["SEO", "Google Ads", "Meta Ads", "Web Design", "Google Business Profile", "Social Media", "E-Commerce", "Full Digital Marketing"] },
    hours: { title: "Business Hours", items: ["Sun–Thu: 9:00 AM – 6:00 PM", "Fri: Closed", "Sat: 10:00 AM – 4:00 PM", "WhatsApp: 24/7"] },
  },
  ar: {
    meta: { title: "تواصل مع لوكال سيتي سولوشنز — وكالة التسويق الرقمي بالرياض", description: "تواصل مع فريقنا في الرياض. واتساب أو اتصال أو ملء نموذج. نرد خلال ساعة عمل واحدة." },
    hero: { label: "تواصل معنا", h1: "لنتحدث عن تنمية نشاطك", sub: "راسلنا على واتساب أو اتصل بنا أو املأ النموذج وسنرد خلال ساعة عمل واحدة." },
    methods: [
      { icon: "💬", title: "واتساب", desc: "أسرع طريقة للتواصل معنا. نرد فوراً خلال ساعات العمل.", action: "راسلنا", href: "https://wa.me/966564229190" },
      { icon: "📞", title: "هاتف", desc: "تفضّل مكالمة؟ تواصل مع فريق الرياض مباشرة.", action: "اتصل الآن", href: "tel:+966564229190" },
      { icon: "📧", title: "بريد إلكتروني", desc: "للاستفسارات الرسمية والعروض والوثائق.", action: "hello@localcitysolutions.com", href: "mailto:hello@localcitysolutions.com" },
    ],
    form: { name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الجوال", service: "الخدمة التي تهمك", message: "أخبرنا عن نشاطك وأهدافك", submit: "أرسل الرسالة ←", placeholder: { name: "محمد الأحمد", email: "email@company.com", phone: "+966 5X XXX XXXX", message: "عندي مطعم في العليا وأبغى أزيد ظهوري على قوقل..." }, services: ["تحسين محركات البحث", "إعلانات قوقل", "إعلانات ميتا", "تصميم المواقع", "ملف النشاط في قوقل", "السوشيال ميديا", "التجارة الإلكترونية", "تسويق رقمي متكامل"] },
    hours: { title: "ساعات العمل", items: ["الأحد–الخميس: ٩:٠٠ صباحاً – ٦:٠٠ مساءً", "الجمعة: مغلق", "السبت: ١٠:٠٠ صباحاً – ٤:٠٠ مساءً", "واتساب: ٢٤/٧"] },
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = CONTENT[locale] || CONTENT.en;

  return (
    <>
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-4">{c.hero.label}</span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{c.hero.h1}</h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">{c.hero.sub}</p>
        </div>
      </section>

      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14 reveal">
            {c.methods.map((m) => (
              <a key={m.title} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined} className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 text-center hover:border-[#F5C518]/20 transition-all group">
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{m.title}</h3>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">{m.desc}</p>
                <span className="inline-block text-[#F5C518] text-xs font-semibold group-hover:underline">{m.action}</span>
              </a>
            ))}
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 reveal delay-1`}>
            {/* Form */}
            <div className="lg:col-span-2 bg-[#0E1A2E] border border-white/5 rounded-xl p-6 md:p-8">
              <h2 className={`text-white font-bold text-xl mb-6 ${isAr ? "text-right" : ""}`}>
                {isAr ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: c.form.name, placeholder: c.form.placeholder.name, type: "text" },
                    { label: c.form.email, placeholder: c.form.placeholder.email, type: "email" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} className={`w-full bg-[#080E1A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 focus:border-[#F5C518]/40 focus:outline-none transition-colors ${isAr ? "text-right" : ""}`} />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{c.form.phone}</label>
                    <input type="tel" placeholder={c.form.placeholder.phone} className={`w-full bg-[#080E1A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 focus:border-[#F5C518]/40 focus:outline-none transition-colors ${isAr ? "text-right" : ""}`} />
                  </div>
                  <div>
                    <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{c.form.service}</label>
                    <select className={`w-full bg-[#080E1A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-[#F5C518]/40 focus:outline-none transition-colors ${isAr ? "text-right" : ""}`}>
                      {c.form.services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{c.form.message}</label>
                  <textarea rows={4} placeholder={c.form.placeholder.message} className={`w-full bg-[#080E1A] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 focus:border-[#F5C518]/40 focus:outline-none transition-colors resize-none ${isAr ? "text-right" : ""}`} />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#e6b800] transition-all shadow-xl shadow-[#F5C518]/20">
                  {c.form.submit}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6">
                <h3 className={`text-white font-bold text-sm mb-4 ${isAr ? "text-right" : ""}`}>{c.hours.title}</h3>
                <ul className="space-y-2">
                  {c.hours.items.map((h) => (
                    <li key={h} className={`text-white/50 text-xs ${isAr ? "text-right" : ""}`}>{h}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#0E1A2E] border border-[#25D366]/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="#25D366" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-sm">{isAr ? "واتساب" : "WhatsApp"}</span>
                </div>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">{isAr ? "الطريقة الأسرع. نرد عادةً في دقائق." : "Fastest way to reach us. We usually respond within minutes."}</p>
                <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="block text-center py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#1fb858] transition-all">
                  {isAr ? "ابدأ المحادثة" : "Start Chat"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
