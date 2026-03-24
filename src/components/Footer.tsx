import Link from "next/link";

interface FooterProps {
  locale: string;
}

const FOOTER_SERVICES = [
  { label: { en: "Digital Marketing", ar: "التسويق الرقمي" }, slug: "digital-marketing" },
  { label: { en: "Web Design", ar: "تصميم المواقع" }, slug: "web-design" },
  { label: { en: "SEO", ar: "تحسين محركات البحث" }, slug: "seo" },
  { label: { en: "Google Ads", ar: "إعلانات قوقل" }, slug: "google-ads" },
  { label: { en: "Meta Ads", ar: "إعلانات ميتا" }, slug: "meta-ads" },
  { label: { en: "Google Business Profile", ar: "ملف النشاط في قوقل" }, slug: "google-business-profile" },
  { label: { en: "Social Media", ar: "السوشيال ميديا" }, slug: "social-media" },
  { label: { en: "E-Commerce", ar: "التجارة الإلكترونية" }, slug: "ecommerce" },
];

const DISTRICTS = [
  { name: { en: "Al Olaya", ar: "العليا" }, slug: "al-olaya" },
  { name: { en: "Al Malqa", ar: "الملقا" }, slug: "al-malqa" },
  { name: { en: "Al Nakheel", ar: "النخيل" }, slug: "al-nakheel" },
  { name: { en: "Al Sulaimaniyah", ar: "السليمانية" }, slug: "al-sulaimaniyah" },
  { name: { en: "Hittin", ar: "حطين" }, slug: "hittin" },
  { name: { en: "Al Yasmin", ar: "الياسمين" }, slug: "al-yasmin" },
  { name: { en: "KAFD", ar: "مركز الملك عبدالله المالي" }, slug: "kafd" },
  { name: { en: "Diriyah", ar: "الدرعية" }, slug: "diriyah" },
];

const COMPANY_LINKS = [
  { label: { en: "About", ar: "عنّا" }, href: "about" },
  { label: { en: "Blog", ar: "المدونة" }, href: "blog" },
  { label: { en: "Contact", ar: "تواصل معنا" }, href: "contact" },
  { label: { en: "Free Audit", ar: "تدقيق مجاني" }, href: "free-audit" },
  { label: { en: "Industries", ar: "القطاعات" }, href: "industries" },
];

export default function Footer({ locale }: FooterProps) {
  const isAr = locale === "ar";
  const p = isAr ? "/ar" : "/en";
  const L = (o: { en: string; ar: string }) => (isAr ? o.ar : o.en);

  const tagline = isAr
    ? "وكالة التسويق الرقمي الأولى في الرياض — مصمّمة خصيصاً للسوق السعودي."
    : "Riyadh's premier digital marketing agency — built for the Saudi market.";
  const copyright = isAr
    ? "© 2026 لوكال سيتي سولوشنز. جميع الحقوق محفوظة."
    : "© 2026 Local City Solutions. All rights reserved.";

  return (
    <footer
      dir={isAr ? "rtl" : "ltr"}
      className="bg-[#050B15] border-t border-white/[0.06] pt-10 md:pt-16 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/*
          Grid layout:
          mobile  (base): 2-col  — Brand full-width, Services+Company side-by-side, Districts full-width
          tablet  (md):   3-col  — Brand | Services | Company, Districts full-width below
          desktop (lg):   4-col  — Brand | Services | Company | Districts
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mb-8 md:mb-14">

          {/* ── Brand ─────────────────────────── col-span-2 on mobile → 1 col on md+ */}
          <div className="col-span-2 md:col-span-1">
            <Link href={isAr ? "/ar" : "/en"} className="text-white font-bold text-lg tracking-tight">
              Local <span className="text-[#F5C518]">City</span> Solutions
            </Link>
            <p className={`text-white/40 text-xs leading-relaxed mt-2 max-w-xs ${isAr ? "text-right" : ""}`}>
              {tagline}
            </p>

            {/* Social icons */}
            <div className={`flex items-center gap-2.5 mt-3 ${isAr ? "flex-row-reverse" : ""}`}>
              {[
                { label: "Facebook", d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                { label: "Instagram", d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" },
                { label: "X", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-[#F5C518] hover:bg-[#F5C518]/10 transition-all"
                >
                  <svg
                    className="w-3 h-3"
                    fill={s.label === "X" ? "currentColor" : "none"}
                    stroke={s.label !== "X" ? "currentColor" : undefined}
                    strokeWidth={s.label !== "X" ? 2 : undefined}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap={s.label !== "X" ? "round" : undefined}
                      strokeLinejoin={s.label !== "X" ? "round" : undefined}
                      d={s.d}
                    />
                  </svg>
                </a>
              ))}
              <a
                href="https://wa.me/966564229190"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-7 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {/* Contact info */}
            <div className="mt-3 space-y-1.5">
              <a
                href="tel:+966564229190"
                className={`inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors ${isAr ? "flex-row-reverse" : ""}`}
              >
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span dir="ltr">+966 56 422 9190</span>
              </a>
              <a
                href="mailto:hello@localcitysolutions.com"
                className={`inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors ${isAr ? "flex-row-reverse" : ""}`}
              >
                <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span dir="ltr">hello@localcitysolutions.com</span>
              </a>
            </div>
          </div>

          {/* ── Services ──────────────────────── col-span-1 at all sizes */}
          <div>
            <h3 className={`text-white font-bold text-sm mb-3 ${isAr ? "text-right" : ""}`}>
              {isAr ? "الخدمات" : "Services"}
            </h3>
            <ul className="space-y-2">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`${p}/services/${s.slug}`}
                    className={`text-white/40 hover:text-white text-xs transition-colors block ${isAr ? "text-right" : ""}`}
                  >
                    {L(s.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ───────────────────────── col-span-1 at all sizes */}
          <div>
            <h3 className={`text-white font-bold text-sm mb-3 ${isAr ? "text-right" : ""}`}>
              {isAr ? "الشركة" : "Company"}
            </h3>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((c) => (
                <li key={c.href}>
                  <Link
                    href={`${p}/${c.href}`}
                    className={`text-white/40 hover:text-white text-xs transition-colors block ${isAr ? "text-right" : ""}`}
                  >
                    {L(c.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Riyadh Districts ──────────────── col-span-2 on mobile, col-span-3 on md, col-span-1 on lg */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">

            {/* Mobile: collapsible <details> — hidden on md+ */}
            <details className="group md:hidden">
              <summary className={`flex items-center justify-between cursor-pointer list-none select-none ${isAr ? "flex-row-reverse" : ""}`}>
                <h3 className="text-white font-bold text-sm">
                  {isAr ? "أحياء الرياض" : "Riyadh Districts"}
                </h3>
                <svg
                  className="w-4 h-4 text-white/40 transition-transform duration-200 group-open:rotate-180 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>

              {/* Mobile: top 4 districts only */}
              <ul className={`mt-3 grid grid-cols-2 gap-x-4 gap-y-2 ${isAr ? "text-right" : ""}`}>
                {DISTRICTS.slice(0, 4).map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`${p}/riyadh/${d.slug}`}
                      className="text-white/40 hover:text-white text-xs transition-colors block"
                    >
                      {L(d.name)}
                    </Link>
                  </li>
                ))}
                <li className="col-span-2">
                  <Link
                    href={`${p}/riyadh`}
                    className={`text-[#F5C518]/60 hover:text-[#F5C518] text-xs transition-colors block mt-1 ${isAr ? "text-right" : ""}`}
                  >
                    {isAr ? "كل الأحياء ←" : "All Districts →"}
                  </Link>
                </li>
              </ul>
            </details>

            {/* md tablet: horizontal list across full width — hidden on mobile and lg */}
            <div className="hidden md:block lg:hidden">
              <h3 className={`text-white font-bold text-sm mb-3 ${isAr ? "text-right" : ""}`}>
                {isAr ? "أحياء الرياض" : "Riyadh Districts"}
              </h3>
              <ul className={`grid grid-cols-4 gap-x-4 gap-y-2 ${isAr ? "text-right" : ""}`}>
                {DISTRICTS.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`${p}/riyadh/${d.slug}`}
                      className="text-white/40 hover:text-white text-xs transition-colors block"
                    >
                      {L(d.name)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`${p}/riyadh`}
                    className="text-[#F5C518]/60 hover:text-[#F5C518] text-xs transition-colors block"
                  >
                    {isAr ? "كل الأحياء ←" : "All Districts →"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop: single column list — hidden on mobile and md */}
            <div className="hidden lg:block">
              <h3 className={`text-white font-bold text-sm mb-3 ${isAr ? "text-right" : ""}`}>
                {isAr ? "أحياء الرياض" : "Riyadh Districts"}
              </h3>
              <ul className="space-y-2">
                {DISTRICTS.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`${p}/riyadh/${d.slug}`}
                      className={`text-white/40 hover:text-white text-xs transition-colors block ${isAr ? "text-right" : ""}`}
                    >
                      {L(d.name)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`${p}/riyadh`}
                    className={`text-[#F5C518]/60 hover:text-[#F5C518] text-xs transition-colors block ${isAr ? "text-right" : ""}`}
                  >
                    {isAr ? "كل الأحياء ←" : "All Districts →"}
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className={`border-t border-white/[0.06] pt-5 flex flex-col sm:flex-row items-center gap-3 ${isAr ? "sm:flex-row-reverse" : "sm:justify-between"}`}>
          <p className="text-white/25 text-xs">{copyright}</p>
          <div className="flex items-center gap-4">
            {[
              { label: isAr ? "سياسة الخصوصية" : "Privacy Policy", href: "#" },
              { label: isAr ? "الشروط والأحكام" : "Terms of Service", href: "#" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="text-white/25 hover:text-white/50 text-xs transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
