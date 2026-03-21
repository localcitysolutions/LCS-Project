import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Riyadh | Local City Solutions",
  description:
    "Local City Solutions — Riyadh's leading digital marketing agency offering SEO, Google Ads, Meta Ads, Web Design, Google Business Profile, and Social Media Marketing for Saudi businesses.",
};

/* ─── DATA ─────────────────────────────────────────────────── */
const SERVICES = [
  { icon: "🚀", title: "Digital Marketing", slug: "digital-marketing", desc: "Full-stack digital marketing strategy for Riyadh businesses. From brand awareness to lead generation." },
  { icon: "🖥️", title: "Web Design & Development", slug: "web-design", desc: "Modern, fast, mobile-first websites built for conversions. Performance-optimized and SEO-ready." },
  { icon: "🔍", title: "SEO Services", slug: "seo", desc: "Local SEO, technical SEO, bilingual keyword strategy for Riyadh. Rank higher, get found faster." },
  { icon: "📢", title: "Google Ads", slug: "google-ads", desc: "Search, Display, Shopping, YouTube, and Maps Ads for Riyadh businesses. Maximum ROI." },
  { icon: "📱", title: "Meta Ads", slug: "meta-ads", desc: "Facebook and Instagram ads precisely targeting Riyadh customers. Creative campaigns that convert." },
  { icon: "📍", title: "Google Business Profile", slug: "google-business-profile", desc: "GBP creation, optimization, and Maps ranking. Be the first business customers find locally." },
  { icon: "💬", title: "Social Media Marketing", slug: "social-media", desc: "Content creation, community management, and growth strategies across all major platforms." },
  { icon: "🛒", title: "E-commerce Management", slug: "ecommerce", desc: "End-to-end e-commerce setup, optimization, and management for Saudi online stores." },
];

const WHY_ITEMS = [
  { icon: "🇸🇦", title: "Saudi Market Experts", desc: "Deep understanding of local consumer behavior, trends, and Saudi business culture." },
  { icon: "🌐", title: "AR/EN Fully Bilingual", desc: "All campaigns, content, and communication delivered fluently in Arabic and English." },
  { icon: "⏱️", title: "6+ Years Experience", desc: "Proven track record with 150+ Riyadh businesses across every major sector." },
  { icon: "📊", title: "Data-Driven Results", desc: "Every decision backed by analytics, conversion tracking, and clear monthly KPIs." },
];

const STEPS = [
  { num: "01", title: "Free Audit", desc: "We analyze your current digital presence and identify your biggest growth opportunities." },
  { num: "02", title: "Strategy", desc: "A custom growth roadmap tailored to your goals, budget, and Riyadh market position." },
  { num: "03", title: "Execute", desc: "We launch and actively manage all campaigns, ads, content, and digital assets." },
  { num: "04", title: "Report & Scale", desc: "Monthly reporting with clear KPIs. We double down on what works and scale fast." },
];

const INDUSTRIES = [
  { icon: "🍽️", name: "Restaurants & Cafes", slug: "restaurants" },
  { icon: "🏥", name: "Clinics & Healthcare", slug: "clinics" },
  { icon: "💇", name: "Salons & Beauty", slug: "salons" },
  { icon: "🏠", name: "Real Estate", slug: "real-estate" },
  { icon: "🛍️", name: "Retail & E-commerce", slug: "retail" },
  { icon: "🎓", name: "Education & Training", slug: "education" },
  { icon: "🚗", name: "Automotive", slug: "automotive" },
  { icon: "🏨", name: "Hotels & Hospitality", slug: "hotels" },
];

const DISTRICTS = [
  { name: "Al Olaya", slug: "al-olaya" },
  { name: "Al Malqa", slug: "al-malqa" },
  { name: "Al Nakheel", slug: "al-nakheel" },
  { name: "Al Yasmin", slug: "al-yasmin" },
  { name: "Hittin", slug: "hittin" },
  { name: "Al Sahafah", slug: "al-sahafah" },
  { name: "Al Worood", slug: "al-worood" },
  { name: "Al Sulaimaniyah", slug: "al-sulaimaniyah" },
  { name: "Al Rawdah", slug: "al-rawdah" },
  { name: "Al Murabba", slug: "al-murabba" },
  { name: "Al Shifa", slug: "al-shifa" },
  { name: "Al Naseem", slug: "al-naseem" },
  { name: "Al Aziziyah", slug: "al-aziziyah" },
  { name: "Ishbiliyah", slug: "ishbiliyah" },
  { name: "Al Narjis", slug: "al-narjis" },
  { name: "Tuwaiq", slug: "tuwaiq" },
  { name: "Diriyah", slug: "diriyah" },
  { name: "KAFD", slug: "kafd" },
  { name: "Al Arid", slug: "al-arid" },
  { name: "King Fahd District", slug: "king-fahd" },
];

/* ─── ICONS ─────────────────────────────────────────────────── */
function IconPhone() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" />
    </svg>
  );
}

/* ─── HERO ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080E1A] pt-14 md:pt-20" aria-label="Hero">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <div className="w-[500px] h-[500px] md:w-[680px] md:h-[680px] rounded-full border border-[#F5C518]/[0.07]" style={{ animation: "spin-slow 28s linear infinite" }} />
        <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-[#F5C518]/[0.05]" style={{ animation: "spin-slow-reverse 20s linear infinite" }} />
        <div className="absolute w-[200px] h-[200px] md:w-[290px] md:h-[290px] rounded-full border border-[#F5C518]/[0.06]" style={{ animation: "spin-slow 14s linear infinite" }} />
        <div className="absolute w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full" style={{ background: "radial-gradient(circle, rgba(245,197,24,0.11) 0%, transparent 70%)", animation: "pulse-glow 5s ease-in-out infinite" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-12 md:py-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5C518]/25 bg-[#F5C518]/[0.08] text-[#F5C518] text-xs md:text-sm font-semibold mb-6 md:mb-8" style={{ animation: "fade-in-up 0.6s ease both" }}>
          <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#F5C518] shrink-0 badge-dot" />
          Digital Marketing Agency — Riyadh, KSA
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-white leading-[1.1] tracking-tight mb-4 md:mb-6" style={{ animation: "fade-in-up 0.7s 0.08s ease both" }}>
          We Help Riyadh Businesses
          <br />
          <span className="text-[#F5C518]" style={{ textDecoration: "underline", textDecorationColor: "rgba(245,197,24,0.35)", textUnderlineOffset: "6px", textDecorationThickness: "2px" }}>
            Dominate Online
          </span>
        </h1>

        <p className="text-sm md:text-lg lg:text-xl text-white/55 max-w-2xl mx-auto mb-7 md:mb-10 leading-relaxed" style={{ animation: "fade-in-up 0.7s 0.16s ease both" }}>
          SEO, Google Ads, Meta Ads, web design, and Google Business Profile services built specifically for the Saudi market. More visibility. More leads. More revenue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 md:mb-14" style={{ animation: "fade-in-up 0.7s 0.24s ease both" }}>
          <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm md:text-base hover:bg-[#F5C518]/90 transition-all shadow-2xl shadow-[#F5C518]/25 hover:-translate-y-0.5">
            Get Free Audit →
          </a>
          <a href="tel:+966564229190" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 md:px-8 md:py-4 rounded-full border border-white/20 text-white font-medium text-sm md:text-base hover:border-white/40 hover:bg-white/[0.03] transition-all">
            <IconPhone /> Call +966 564 229 190
          </a>
        </div>

        <div className="flex flex-row items-center justify-center gap-6 sm:gap-12 md:gap-14" style={{ animation: "fade-in-up 0.7s 0.32s ease both" }}>
          {[{ value: "6+", label: "Years Exp." }, { value: "150+", label: "Projects" }, { value: "EN/AR", label: "Bilingual" }].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl md:text-3xl font-extrabold text-[#F5C518] leading-none mb-1">{stat.value}</div>
              <div className="text-[10px] md:text-sm text-white/40 font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080E1A] to-transparent pointer-events-none" />
    </section>
  );
}

/* ─── SERVICES ──────────────────────────────────────────────── */
function Services() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-[#080E1A]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14 reveal">
          <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">Our Services</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">Everything Your Riyadh Business<br className="hidden md:block" /> Needs to Grow Online</h2>
          <p className="text-white/45 mt-2 md:mt-4 text-xs md:text-base max-w-xl mx-auto">From SEO to paid ads to web design — all under one Riyadh-focused agency.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {SERVICES.map((service, i) => (
            <article key={service.slug} className={`reveal delay-${(i % 4) + 1} group relative bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 md:p-7 hover:-translate-y-1 hover:border-[#F5C518]/25 transition-all duration-300 overflow-hidden`}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C518] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="absolute top-3 right-4 text-5xl md:text-7xl font-black text-white/[0.025] select-none pointer-events-none leading-none">{String(i + 1).padStart(2, "0")}</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold text-[#F5C518] bg-[#F5C518]/10 mb-4">Core</span>
              <div className="flex items-center gap-3 mb-2 md:block">
                <div className="text-xl md:text-3xl leading-none md:mb-4">{service.icon}</div>
                <h3 className="text-white font-bold text-sm md:hidden leading-tight">{service.title}</h3>
              </div>
              <h3 className="hidden md:block text-white font-bold text-base md:text-lg mb-2">{service.title}</h3>
              <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">{service.desc}</p>
              <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-1 text-[#F5C518] text-xs md:text-sm font-semibold group-hover:gap-2 transition-all">Learn More →</Link>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-[#F5C518] text-sm font-semibold hover:gap-3 transition-all">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY LCS ───────────────────────────────────────────────── */
function WhyLCS() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-[#0C1424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14 reveal">
          <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">Why Choose Us</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">The LCS Advantage</h2>
          <p className="text-white/45 mt-2 md:mt-4 max-w-lg mx-auto text-xs md:text-base">We are not a generic agency. We are Riyadh specialists.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {WHY_ITEMS.map((item, i) => (
            <div key={item.title} className={`reveal delay-${i + 1} p-5 md:p-7 rounded-xl border border-white/[0.06] bg-[#0E1A2E] hover:border-[#F5C518]/20 hover:-translate-y-0.5 transition-all duration-300`}>
              <div className="flex items-center gap-3 md:flex-col md:items-center md:text-center">
                <div className="text-3xl md:text-4xl leading-none md:mb-4 shrink-0">{item.icon}</div>
                <div className="md:text-center">
                  <h3 className="text-white font-bold text-sm md:text-base md:mb-2">{item.title}</h3>
                  <p className="hidden md:block text-white/45 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <p className="md:hidden text-white/45 text-xs leading-relaxed mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW WE WORK ───────────────────────────────────────────── */
function HowWeWork() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-[#080E1A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14 reveal">
          <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">Our Process</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">How We Work</h2>
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="hidden md:block absolute top-[2rem] left-[14%] right-[14%] h-px bg-gradient-to-r from-transparent via-[#F5C518]/20 to-transparent" />
          {STEPS.map((step, i) => (
            <div key={step.num} className={`reveal delay-${i + 1} relative text-center`}>
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] text-[#F5C518] font-black text-base md:text-xl mb-3 md:mb-5 mx-auto">{step.num}</div>
              <h3 className="text-white font-bold text-sm md:text-base mb-1 md:mb-2">{step.title}</h3>
              <p className="text-white/45 text-xs md:text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── INDUSTRIES ────────────────────────────────────────────── */
function Industries() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-[#0C1424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-14 reveal">
          <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">Industries We Serve</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">We Know Your Industry</h2>
          <p className="text-white/45 mt-2 md:mt-4 max-w-xl mx-auto text-xs md:text-base">Specialized digital marketing for every major sector in Riyadh.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {INDUSTRIES.map((ind, i) => (
            <Link key={ind.slug} href={`/industries/${ind.slug}`} className={`reveal delay-${(i % 4) + 1} group flex flex-row md:flex-col items-center gap-3 p-4 md:p-7 rounded-xl bg-[#0E1A2E] border border-white/[0.06] hover:border-[#F5C518]/30 hover:-translate-y-1 transition-all duration-300`}>
              <span className="text-2xl md:text-4xl leading-none transition-transform duration-300 group-hover:scale-110 shrink-0 block">{ind.icon}</span>
              <span className="text-white/65 font-medium text-xs md:text-sm group-hover:text-white transition-colors md:text-center">{ind.name}</span>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/industries" className="inline-flex items-center gap-2 text-[#F5C518] text-sm font-semibold hover:gap-3 transition-all">View All Industries →</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── RIYADH DISTRICTS ──────────────────────────────────────── */
function RiyadhDistricts() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-[#080E1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal mb-8 md:mb-12">
          <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">Local Coverage</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">We Serve All Riyadh Districts</h2>
          <p className="text-white/45 mt-2 md:mt-4 text-xs md:text-base">Hyperlocal digital marketing for every neighbourhood in the capital.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {DISTRICTS.map((d, i) => (
            <Link key={d.slug} href={`/riyadh/${d.slug}`} className={`reveal delay-${(i % 6) + 1} px-3 py-1.5 md:px-5 md:py-2.5 rounded-full border border-white/10 text-white/55 text-[10px] md:text-sm font-medium hover:border-[#F5C518]/50 hover:text-[#F5C518] hover:bg-[#F5C518]/[0.05] transition-all`}>
              {d.name}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/riyadh" className="inline-flex items-center gap-2 text-[#F5C518] text-sm font-semibold hover:gap-3 transition-all">View All Districts →</Link>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <WhyLCS />
      <HowWeWork />
      <Industries />
      <RiyadhDistricts />
      <CTABox />
    </main>
  );
}
