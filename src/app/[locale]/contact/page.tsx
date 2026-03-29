"use client";

import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { trackFormSubmit, trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

type Locale = "en" | "ar";

const CONTENT = {
  en: {
    meta: { title: "Contact Us", description: "Get in touch with our Riyadh digital marketing team. WhatsApp, call, or fill out a form. We respond within 1 business hour." },
    hero: { label: "Contact Us", h1: "Let's Talk About Growing Your Business", sub: "WhatsApp us, call, or fill out the form and we'll respond within one business hour." },
    methods: [
      { icon: "💬", title: "WhatsApp", desc: "Fastest way to reach us. We respond immediately during business hours.", action: "Message Us", href: "https://wa.me/966564229190" },
      { icon: "📞", title: "Phone", desc: "Prefer a call? Reach our Riyadh team directly.", action: "+966 56 422 9190", href: "tel:+966564229190" },
      { icon: "📧", title: "Email", desc: "For formal inquiries, proposals, and documentation.", action: "hello@localcitysolutions.com", href: "mailto:hello@localcitysolutions.com" },
    ],
    form: {
      heading: "Send Us a Message",
      name: "Full Name", email: "Email Address", phone: "Phone Number",
      service: "Service You're Interested In", message: "Tell us about your business and goals",
      submit: "Send Message →", submitting: "Sending...",
      placeholder: {
        name: "Muhammad Al-Ahmad", email: "email@company.com",
        phone: "+966 5X XXX XXXX",
        message: "I run a restaurant in Al Olaya and want to grow my Google presence...",
      },
      services: ["SEO", "Google Ads", "Meta Ads", "Web Design", "Google Business Profile", "Social Media", "E-Commerce", "Full Digital Marketing"],
      errors: {
        name: "Please enter your full name.",
        email: "Please enter a valid email address.",
        service: "Please select a service.",
        message: "Please enter a message (minimum 10 characters).",
      },
    },
    hours: { title: "Business Hours", items: ["Sun–Thu: 9:00 AM – 6:00 PM", "Fri: Closed", "Sat: 10:00 AM – 4:00 PM", "WhatsApp: 24/7"] },
    success: {
      heading: "Message Sent Successfully!",
      text: "Thank you for reaching out. We will respond within one business hour during Sun–Thu, 9 AM – 6 PM Riyadh time.",
      reset: "Send Another Message",
      whatsapp: "Or WhatsApp Us",
    },
    error: "Something went wrong. Please try again or",
    errorLink: "message us on WhatsApp",
  },
  ar: {
    meta: { title: "تواصل معنا", description: "تواصل مع فريقنا في الرياض. واتساب أو اتصال أو ملء نموذج. نرد خلال ساعة عمل واحدة." },
    hero: { label: "تواصل معنا", h1: "لنتحدث عن تنمية نشاطك", sub: "راسلنا على واتساب أو اتصل بنا أو املأ النموذج وسنرد خلال ساعة عمل واحدة." },
    methods: [
      { icon: "💬", title: "واتساب", desc: "أسرع طريقة للتواصل معنا. نرد فوراً خلال ساعات العمل.", action: "راسلنا", href: "https://wa.me/966564229190" },
      { icon: "📞", title: "هاتف", desc: "تفضّل مكالمة؟ تواصل مع فريق الرياض مباشرة.", action: "+966 56 422 9190", href: "tel:+966564229190" },
      { icon: "📧", title: "بريد إلكتروني", desc: "للاستفسارات الرسمية والعروض والوثائق.", action: "hello@localcitysolutions.com", href: "mailto:hello@localcitysolutions.com" },
    ],
    form: {
      heading: "أرسل لنا رسالة",
      name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "رقم الجوال",
      service: "الخدمة التي تهمك", message: "أخبرنا عن نشاطك وأهدافك",
      submit: "أرسل الرسالة ←", submitting: "جاري الإرسال...",
      placeholder: {
        name: "محمد الأحمد", email: "email@company.com",
        phone: "+966 5X XXX XXXX",
        message: "عندي مطعم في العليا وأبغى أزيد ظهوري على قوقل...",
      },
      services: ["تحسين محركات البحث", "إعلانات قوقل", "إعلانات ميتا", "تصميم المواقع", "ملف النشاط في قوقل", "السوشيال ميديا", "التجارة الإلكترونية", "تسويق رقمي متكامل"],
      errors: {
        name: "يرجى إدخال الاسم الكامل.",
        email: "يرجى إدخال بريد إلكتروني صحيح.",
        service: "يرجى اختيار خدمة.",
        message: "يرجى إدخال رسالة (١٠ أحرف على الأقل).",
      },
    },
    hours: { title: "ساعات العمل", items: ["الأحد–الخميس: ٩:٠٠ صباحاً – ٦:٠٠ مساءً", "الجمعة: مغلق", "السبت: ١٠:٠٠ صباحاً – ٤:٠٠ مساءً", "واتساب: ٢٤/٧"] },
    success: {
      heading: "تم إرسال رسالتك بنجاح!",
      text: "شكراً لتواصلك معنا. سنرد عليك خلال ساعة عمل واحدة خلال أيام الأحد إلى الخميس، ٩ ص إلى ٦ م بتوقيت الرياض.",
      reset: "إرسال رسالة أخرى",
      whatsapp: "أو تواصل عبر واتساب",
    },
    error: "حدث خطأ. يرجى المحاولة مرة أخرى أو",
    errorLink: "تواصل معنا عبر واتساب",
  },
};

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as Locale) || "en";
  const isAr = locale === "ar";
  const c = CONTENT[locale] || CONTENT.en;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [replyToEmail, setReplyToEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    const name = (data.get("name") as string || "").trim();
    const email = (data.get("email") as string || "").trim();
    const service = (data.get("service") as string || "").trim();
    const message = (data.get("message") as string || "").trim();
    if (!name) errs.name = c.form.errors.name;
    if (!email || !email.includes("@") || !email.includes(".")) errs.email = c.form.errors.email;
    if (!service) errs.service = c.form.errors.service;
    if (!message || message.length < 10) errs.message = c.form.errors.message;
    return errs;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      const el = formRef.current?.querySelector(`[name="${firstKey}"]`) as HTMLElement | null;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        formRef.current?.reset();
        setReplyToEmail("");
        trackFormSubmit((formData.get("service") as string) || "not specified");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-[#080E1A] border rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none transition-colors ${isAr ? "text-right" : ""} ${
      errors[field] ? "border-[#EF4444]/60 focus:border-[#EF4444]" : "border-white/10 focus:border-[#F5C518]/40"
    }`;

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
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
          {/* Contact method cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {c.methods.map((m) => (
              <a key={m.title} href={m.href} target={m.href.startsWith("http") ? "_blank" : undefined} rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => { if (m.href.includes("wa.me")) trackWhatsAppClick(); else if (m.href.includes("tel:")) trackPhoneClick(); }}
                className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 text-center hover:border-[#F5C518]/20 transition-all group">
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{m.title}</h3>
                <p className="text-white/50 text-xs mb-4 leading-relaxed">{m.desc}</p>
                <span dir="ltr" className="inline-block text-[#F5C518] text-xs font-semibold group-hover:underline">{m.action}</span>
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form column */}
            <div className="lg:col-span-2 bg-[#0E1A2E] border border-white/5 rounded-xl p-6 md:p-8">
              <h2 className={`text-white font-bold text-xl mb-6 ${isAr ? "text-right" : ""}`}>
                {c.form.heading}
              </h2>

              {/* Success state */}
              {submitStatus === "success" ? (
                <div className="flex flex-col items-center text-center py-10 px-4">
                  <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mb-5">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{c.success.heading}</h3>
                  <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-8">{c.success.text}</p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="flex-1 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                    >
                      {c.success.reset}
                    </button>
                    <a
                      href="https://wa.me/966564229190"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-bold text-center hover:bg-[#1fb858] transition-all"
                    >
                      {c.success.whatsapp}
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {/* Error banner */}
                  {submitStatus === "error" && (
                    <div className="mb-5 px-4 py-3 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg text-sm text-[#EF4444] flex flex-wrap items-center gap-1">
                      <span>{c.error}</span>
                      <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                        {c.errorLink}
                      </a>
                      <span>.</span>
                    </div>
                  )}

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" dir={isAr ? "rtl" : "ltr"} noValidate>
                    {/* Hidden Web3Forms fields */}
                    <input type="hidden" name="access_key" value="f3331300-e0d7-4572-9c9d-69ce21d88b26" />
                    <input type="hidden" name="subject" value="New Lead — LCS Contact Form" />
                    <input type="hidden" name="from_name" value="LCS Website" />
                    <input type="hidden" name="replyto" value={replyToEmail} />
                    <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{c.form.name} *</label>
                        <input
                          type="text" name="name" required
                          placeholder={c.form.placeholder.name}
                          className={inputClass("name")}
                          onChange={() => errors.name && setErrors((p) => ({ ...p, name: "" }))}
                        />
                        {errors.name && <p className="mt-1 text-[#EF4444] text-xs">{errors.name}</p>}
                      </div>
                      <div>
                        <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{c.form.email} *</label>
                        <input
                          type="email" name="email" required
                          placeholder={c.form.placeholder.email}
                          className={inputClass("email")}
                          value={replyToEmail}
                          onChange={(e) => {
                            setReplyToEmail(e.target.value);
                            if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                          }}
                        />
                        {errors.email && <p className="mt-1 text-[#EF4444] text-xs">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{c.form.phone}</label>
                        <input
                          type="tel" name="phone"
                          placeholder={c.form.placeholder.phone}
                          className={inputClass("phone")}
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{c.form.service} *</label>
                        <select
                          name="service" required
                          className={inputClass("service")}
                          onChange={() => errors.service && setErrors((p) => ({ ...p, service: "" }))}
                          defaultValue=""
                        >
                          <option value="" disabled>{isAr ? "اختر خدمة..." : "Select a service..."}</option>
                          {c.form.services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.service && <p className="mt-1 text-[#EF4444] text-xs">{errors.service}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className={`block text-white/60 text-xs font-medium mb-1.5 ${isAr ? "text-right" : ""}`}>{c.form.message} *</label>
                      <textarea
                        rows={4} name="message" required minLength={10}
                        placeholder={c.form.placeholder.message}
                        className={inputClass("message") + " resize-none"}
                        onChange={() => errors.message && setErrors((p) => ({ ...p, message: "" }))}
                      />
                      {errors.message && <p className="mt-1 text-[#EF4444] text-xs">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#e6b800] transition-all shadow-xl shadow-[#F5C518]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {c.form.submitting}
                        </>
                      ) : c.form.submit}
                    </button>
                  </form>
                </>
              )}
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
                <div className={`flex items-center gap-3 mb-3 ${isAr ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="#25D366" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="text-white font-bold text-sm">{isAr ? "واتساب" : "WhatsApp"}</span>
                </div>
                <p className={`text-white/50 text-xs mb-4 leading-relaxed ${isAr ? "text-right" : ""}`}>
                  {isAr ? "الطريقة الأسرع. نرد عادةً في دقائق." : "Fastest way to reach us. We usually respond within minutes."}
                </p>
                <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer"
                  className="block text-center py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#1fb858] transition-all">
                  {isAr ? "ابدأ المحادثة" : "Start Chat"}
                </a>
              </div>

              {/* Social links */}
              <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6">
                <h3 className={`text-white font-bold text-sm mb-4 ${isAr ? "text-right" : ""}`}>
                  {isAr ? "تابعنا" : "Find Us Online"}
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "X (Twitter)", href: "https://x.com/LocalCitySoluti", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z", fill: true },
                    { label: "Instagram", href: "https://www.instagram.com/localcitysolutions/", d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z", fill: false },
                    { label: "Facebook", href: "https://www.facebook.com/localcitysolutions", d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z", fill: false },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`flex items-center gap-3 text-white/50 hover:text-[#F5C518] text-xs transition-colors ${isAr ? "flex-row-reverse" : ""}`}
                    >
                      <span className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5" fill={s.fill ? "currentColor" : "none"} stroke={s.fill ? undefined : "currentColor"} strokeWidth={s.fill ? undefined : 2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <path d={s.d} />
                        </svg>
                      </span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
