import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "SEO Services in Riyadh, Saudi Arabia | Local City Solutions",
  description:
    "Expert SEO services in Riyadh — local SEO, technical SEO, Arabic & English keyword strategy. Get found on Google by Riyadh customers.",
};

/* ─── DATA ─────────────────────────────────────────────────── */
const STATS = [
  { value: "46%", label: "of Google searches are local" },
  { value: "78%", label: "of local searches lead to purchase" },
  { value: "Top 3", label: "results get 75% of all clicks" },
];

const SEO_SERVICES = [
  {
    icon: "📍",
    title: "Local SEO",
    desc: "We optimise your Google Business Profile, build local citations across Saudi directories, and target neighbourhood-level keywords so customers searching 'near me' in Riyadh find you first. Includes Google Maps ranking strategy.",
  },
  {
    icon: "⚙️",
    title: "Technical SEO",
    desc: "A clean technical foundation is the prerequisite for every other SEO effort. We audit and fix crawlability, site architecture, Core Web Vitals, page speed, structured data (schema), mobile usability, and HTTPS security.",
  },
  {
    icon: "📝",
    title: "On-Page SEO",
    desc: "Every page on your site is optimised with the right keyword targeting, compelling meta titles and descriptions, proper heading hierarchy, internal linking, and content depth that matches search intent.",
  },
  {
    icon: "🔗",
    title: "Off-Page & Link Building",
    desc: "We acquire high-quality Arabic and English backlinks from authoritative Saudi websites, business directories, and regional publications — building the domain authority that Google needs to rank you above competitors.",
  },
  {
    icon: "🔤",
    title: "Arabic + English Keyword Strategy",
    desc: "We research and map keywords in both languages — capturing the full spectrum of Riyadh search demand. Many competitors only optimise for one language, leaving half the market untouched.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Site Audit",
    desc: "A comprehensive technical and content audit identifying every issue holding your site back in Google — from crawl errors to thin content to missing schema markup.",
  },
  {
    num: "02",
    title: "Keyword Research",
    desc: "Bilingual keyword mapping across Arabic and English, segmented by search intent (informational, commercial, transactional) and local signals specific to Riyadh.",
  },
  {
    num: "03",
    title: "On-Page Optimisation",
    desc: "Systematic implementation across your entire site — meta tags, headings, content expansion, internal linking, image alt text, and structured data for rich results.",
  },
  {
    num: "04",
    title: "Link Building & Reporting",
    desc: "Monthly white-hat link acquisition campaigns plus a clear ranking and traffic report showing exactly how your positions, clicks, and organic revenue are growing.",
  },
];

const DIFFERENTIATORS = [
  {
    icon: "🇸🇦",
    title: "Riyadh-Specific Keyword Intelligence",
    desc: "We have built keyword databases covering hundreds of high-intent search queries specific to Riyadh — from district-level 'near me' terms to Arabic product searches. Your competitors are not targeting these. You should be.",
  },
  {
    icon: "🌐",
    title: "Native Arabic SEO Expertise",
    desc: "Arabic search behaviour is fundamentally different from English. Morphology, dialects, and search phrasing require native-level understanding. Our Arabic SEO work is done by native speakers — not tools.",
  },
  {
    icon: "📊",
    title: "Transparent Monthly Reporting",
    desc: "Every month you receive a ranking report, organic traffic analysis, and a clear summary of work completed. No dashboards that require a data scientist to interpret — just straightforward numbers that show growth.",
  },
];

const FAQS = [
  {
    q: "How long does SEO take to show results in Riyadh?",
    a: "Most clients start seeing measurable ranking improvements within 60–90 days for low-competition keywords, and 4–6 months for competitive terms. Local SEO (Google Maps) typically shows results faster — often within 4–8 weeks. SEO is a compounding investment: the longer you do it, the more powerful the results.",
  },
  {
    q: "Do I need SEO if I am already running Google Ads?",
    a: "Yes — and they work better together. Google Ads give you immediate visibility, but the moment you stop paying, the traffic stops. SEO builds an asset that continues to generate free organic traffic indefinitely. Many of our clients run both: Ads for immediate leads, SEO for long-term cost reduction.",
  },
  {
    q: "Can you do SEO in Arabic?",
    a: "Absolutely — and this is one of our core strengths. We conduct keyword research in Arabic, optimise page content and meta tags in Arabic, and build Arabic-language backlinks. Most SEO agencies in the region ignore Arabic search demand entirely, which creates a significant opportunity for businesses that invest in it.",
  },
  {
    q: "What is local SEO and why does it matter for my Riyadh business?",
    a: "Local SEO focuses on ranking your business in Google's Map Pack and local search results for queries like 'dentist in Al Olaya' or 'restaurant near me in Riyadh.' It includes Google Business Profile optimisation, local citation building, and location-specific content. For businesses serving Riyadh customers, local SEO often delivers the fastest and most direct ROI.",
  },
  {
    q: "How is your SEO service different from what other Riyadh agencies offer?",
    a: "We do not outsource or rely on automated link schemes. Every deliverable — content, link outreach, technical fixes — is produced by our in-house team with native Arabic and English capability. We also provide fully transparent reporting so you always know exactly what was done and what impact it had.",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function SEOPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-20 bg-[#080E1A] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(245,197,24,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5C518]/25 bg-[#F5C518]/[0.08] text-[#F5C518] text-xs font-semibold mb-6 reveal">
              SEO Services
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Rank Higher in Riyadh with Expert SEO
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              When Riyadh customers search for your services, they should find you — not your competitors. We deliver bilingual Arabic and English SEO strategies that build lasting organic visibility and drive consistent, high-intent traffic to your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 reveal delay-3">
              <a
                href="https://wa.me/966564229190"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all shadow-lg shadow-[#F5C518]/20"
              >
                Get Free Audit →
              </a>
              <a
                href="tel:+966564229190"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-all"
              >
                Call +966 564 229 190
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-8 md:py-12 bg-[#0C1424] border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            {STATS.map((stat, i) => (
              <div key={i} className={`reveal delay-${i + 1}`}>
                <div className="text-3xl md:text-5xl font-extrabold text-[#F5C518] mb-1 md:mb-2">
                  {stat.value}
                </div>
                <p className="text-white/50 text-xs md:text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO Services ── */}
      <section className="py-12 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Services
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              SEO Services We Offer
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              A complete suite of SEO services covering every factor that determines where you rank on Google.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {SEO_SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`reveal delay-${(i % 3) + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300 ${i === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="text-3xl mb-4 leading-none">{service.icon}</div>
                <h3 className="text-white font-bold text-base md:text-lg mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our SEO Process ── */}
      <section className="py-12 md:py-24 bg-[#0C1424]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              How We Do It
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Our SEO Process
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-xl mx-auto text-xs md:text-base">
              A structured four-phase methodology that eliminates guesswork and builds compounding organic growth.
            </p>
          </div>
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="hidden md:block absolute top-8 left-[14%] right-[14%] h-px bg-gradient-to-r from-transparent via-[#F5C518]/20 to-transparent" />
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className={`reveal delay-${i + 1} text-center`}>
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] text-[#F5C518] font-black text-lg md:text-xl mb-4 mx-auto">
                  {step.num}
                </div>
                <h3 className="text-white font-bold text-sm md:text-base mb-2">{step.title}</h3>
                <p className="text-white/45 text-xs md:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Riyadh Businesses Choose Us ── */}
      <section className="py-12 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Why Us
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Why Riyadh Businesses Choose Us for SEO
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Three things that genuinely separate us from every other SEO agency in the Kingdom.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {DIFFERENTIATORS.map((item, i) => (
              <div
                key={item.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-10 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-4xl mb-5 leading-none">{item.icon}</div>
                <h3 className="text-white font-bold text-base md:text-xl mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 md:py-24 bg-[#0C1424]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 reveal">
            <span className="text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4 block">
              FAQ
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="reveal group bg-[#0E1A2E] border border-white/[0.06] rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none">
                  <h3 className="text-white font-semibold text-sm md:text-base pr-4">{faq.q}</h3>
                  <svg
                    className="w-5 h-5 text-[#F5C518] shrink-0 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-white/55 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="py-10 md:py-16 bg-[#080E1A] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            {[
              { label: "Google Business Profile", href: "/services/google-business-profile" },
              { label: "Google Ads", href: "/services/google-ads" },
              { label: "Digital Marketing", href: "/services/digital-marketing" },
              { label: "Web Design", href: "/services/web-design" },
              { label: "Riyadh Coverage", href: "/riyadh" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/45 hover:text-[#F5C518] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABox />
    </main>
  );
}
