import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Website Design & Development in Riyadh | Local City Solutions",
  description:
    "Professional web design and development for Riyadh businesses. WordPress, e-commerce (Salla, Zid), landing pages, Arabic RTL support.",
};

/* ─── DATA ─────────────────────────────────────────────────── */
const WEBSITE_TYPES = [
  {
    icon: "🏢",
    title: "Business Website",
    desc: "Professional multi-page websites that establish credibility, communicate your services, and generate enquiries around the clock. Built on WordPress or Next.js with full Arabic and English content.",
  },
  {
    icon: "🛒",
    title: "E-commerce Store",
    desc: "Fully integrated online stores on Salla, Zid, WooCommerce, or Shopify — complete with product catalogue management, secure payment gateways, and Saudi shipping integrations.",
  },
  {
    icon: "🎯",
    title: "Landing Page",
    desc: "Single-focus, high-converting pages built for Google Ads and Meta Ads campaigns. A/B tested copy, heat-map optimised layouts, and call tracking included.",
  },
  {
    icon: "🌐",
    title: "Arabic/Bilingual Site",
    desc: "Full RTL Arabic layout with seamless language switching. Native Arabic typography, proper font rendering, and culturally appropriate design — not a translated afterthought.",
  },
];

const APPROACH_ITEMS = [
  {
    icon: "📱",
    title: "Mobile-First Design",
    desc: "Over 85% of Saudi users browse on mobile. Every website we build is designed on mobile screens first, then scaled up — not the reverse.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "We optimise images, minify code, leverage CDNs, and target sub-2-second load times. Google rewards fast sites with better rankings.",
  },
  {
    icon: "📈",
    title: "Conversion-Focused",
    desc: "Every page element — headlines, CTAs, form placement, trust signals — is designed with one goal: turning visitors into paying customers.",
  },
  {
    icon: "🔤",
    title: "Arabic RTL Ready",
    desc: "Full right-to-left layout support with proper Arabic font stacks, bidirectional text handling, and mirrored navigation — without hacky workarounds.",
  },
];

const PLATFORMS = [
  "WordPress",
  "Salla",
  "Zid",
  "WooCommerce",
  "Shopify",
  "Next.js",
  "React",
  "Webflow",
];

const WHATS_INCLUDED = [
  { label: "Custom design (no templates)", icon: "✓" },
  { label: "On-page SEO optimisation", icon: "✓" },
  { label: "Fully mobile responsive", icon: "✓" },
  { label: "Speed & Core Web Vitals optimisation", icon: "✓" },
  { label: "CMS training session", icon: "✓" },
  { label: "1 month post-launch support", icon: "✓" },
  { label: "Google Analytics & Search Console setup", icon: "✓" },
  { label: "SSL certificate & security hardening", icon: "✓" },
];

const FAQS = [
  {
    q: "How long does it take to build a website in Riyadh?",
    a: "A standard business website typically takes 3–4 weeks from kickoff to launch. E-commerce projects with large product catalogues run 5–8 weeks. Landing pages can be delivered in 7–10 business days. We provide a detailed timeline after the discovery call.",
  },
  {
    q: "Do you build websites in Arabic?",
    a: "Yes — full Arabic RTL support is a core part of our service. We handle proper right-to-left layouts, Arabic typography, bidirectional navigation, and bilingual language switching. Our copywriting team can produce the Arabic content or work with content you supply.",
  },
  {
    q: "Which platform should I choose for my Riyadh business?",
    a: "For content-heavy business sites, WordPress gives you the most flexibility. For Saudi e-commerce, Salla and Zid integrate natively with local payment gateways (Mada, Apple Pay, STC Pay) and shipping carriers. We advise on the best fit after understanding your specific requirements.",
  },
  {
    q: "Will my website rank on Google?",
    a: "All websites we build include foundational on-page SEO — proper heading structure, meta tags, schema markup, image optimisation, and fast load times. For ongoing ranking improvement, we offer dedicated SEO services that build on this foundation.",
  },
  {
    q: "What happens after my website launches?",
    a: "Every project includes one month of post-launch support for bug fixes and minor changes. We also offer ongoing website management retainers that cover content updates, security patches, speed monitoring, and SEO maintenance.",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function WebDesignPage() {
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
              Web Design
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Modern Website Design for Riyadh Businesses
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              Mobile-first, lightning-fast, and built to convert — our websites are engineered for the Saudi market. Every project includes Arabic RTL support, on-page SEO, and a design that reflects your brand&apos;s credibility.
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

      {/* ── Website Types ── */}
      <section className="py-12 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              What We Build
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Website Types We Build
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Every website is custom-designed for your specific goals — no template shortcuts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {WEBSITE_TYPES.map((type, i) => (
              <div
                key={type.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-3xl mb-4 leading-none">{type.icon}</div>
                <h3 className="text-white font-bold text-base md:text-xl mb-3">{type.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="py-12 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Our Approach
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Built on Four Core Principles
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              The principles that guide every design decision we make, from the first wireframe to the final pixel.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {APPROACH_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-3xl mb-4 leading-none">{item.icon}</div>
                <h3 className="text-white font-bold text-sm md:text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platforms & Technologies ── */}
      <section className="py-12 md:py-24 bg-[#0C1424]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal mb-8 md:mb-12">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Technology Stack
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              Platforms &amp; Technologies
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 text-xs md:text-base">
              We choose the right tool for your project — not the one we find easiest.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {PLATFORMS.map((platform, i) => (
              <span
                key={platform}
                className={`reveal delay-${(i % 6) + 1} px-5 py-2.5 rounded-full border border-[#F5C518]/25 bg-[#F5C518]/[0.06] text-[#F5C518] text-sm font-semibold`}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-12 md:py-24 bg-[#080E1A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Included
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              What&apos;s Included in Every Website
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 text-xs md:text-base">
              No add-on surprises. Everything below is standard across all of our website projects.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {WHATS_INCLUDED.map((item, i) => (
              <div
                key={item.label}
                className={`reveal delay-${(i % 4) + 1} flex items-center gap-3 bg-[#0E1A2E] border border-white/[0.06] rounded-xl px-5 py-4`}
              >
                <span className="w-6 h-6 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/30 flex items-center justify-center text-[#F5C518] text-xs font-bold shrink-0">
                  {item.icon}
                </span>
                <span className="text-white/75 text-sm font-medium">{item.label}</span>
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
              { label: "All Services", href: "/services" },
              { label: "SEO Services", href: "/services/seo" },
              { label: "E-commerce Management", href: "/services/ecommerce" },
              { label: "Digital Marketing", href: "/services/digital-marketing" },
              { label: "Contact Us", href: "/contact" },
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
