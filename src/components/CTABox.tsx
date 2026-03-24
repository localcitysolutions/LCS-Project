"use client";

import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

interface CTABoxProps {
  heading?: string;
  subtitle?: string;
  bg?: "navy" | "dark";
  locale?: string;
}

export default function CTABox({
  heading,
  subtitle,
  bg = "navy",
  locale = "en",
}: CTABoxProps) {
  const isAr = locale === "ar";

  const defaultHeading = isAr
    ? "حاضر تنمي نشاطك في الرياض؟"
    : "Ready to Grow Your Business in Riyadh?";
  const defaultSubtitle = isAr
    ? "احصل على تدقيق مجاني واكتشف كيف نقدر نزيد ظهورك، عملاءك، وإيراداتك في السوق السعودي."
    : "Get a free audit and discover exactly how we can grow your visibility, leads, and revenue in the Saudi market.";
  const label = isAr ? "ابدأ الحين" : "Get Started Today";
  const waLabel = isAr ? "تواصل واتساب" : "WhatsApp Us";
  const callLabel = isAr ? "اتصل بنا" : "Call +966 56 422 9190";

  return (
    <section className={`py-12 md:py-20 ${bg === "dark" ? "bg-[#080E1A]" : "bg-[#0C1424]"}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden border border-[#F5C518]/15 p-6 md:p-12 text-center reveal">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E1A2E] via-[#0E1A2E] to-[#080E1A]" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(245,197,24,0.07) 0%, transparent 65%)" }}
          />
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#F5C518]/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#F5C518]/20 rounded-br-2xl" />

          <div className="relative z-10">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-3 md:mb-5">
              {label}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
              {heading || defaultHeading}
            </h2>
            <p className="text-white/50 mb-6 md:mb-8 text-xs md:text-base max-w-md mx-auto">
              {subtitle || defaultSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/966564229190"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1fb858] transition-all shadow-xl shadow-[#25D366]/25 hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {waLabel}
              </a>
              <a
                href="tel:+966564229190"
                onClick={() => trackPhoneClick()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm hover:border-white/40 hover:bg-white/[0.03] transition-all"
              >
                {callLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
