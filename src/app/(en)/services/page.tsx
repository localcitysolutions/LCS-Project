import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Digital Marketing Services in Riyadh | Local City Solutions",
  description:
    "Explore all digital marketing services by Local City Solutions — SEO, Google Ads, Meta Ads, Web Design, GBP, Social Media, and E-commerce for Riyadh businesses.",
};

/* ─── DATA ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "🚀",
    title: "Digital Marketing",
    slug: "digital-marketing",
    desc: "End-to-end digital marketing strategy and execution for Riyadh businesses. We build awareness, generate leads, and drive measurable revenue growth.",
  },
  {
    icon: "🖥️",
    title: "Web Design & Development",
    slug: "web-design",
    desc: "Mobile-first, conversion-optimised websites built for speed and SEO. From corporate sites to full Arabic/English bilingual experiences.",
  },
  {
    icon: "🔍",
    title: "SEO Services",
    slug: "seo",
    desc: "Local SEO, technical SEO, and bilingual keyword strategy that puts your business at the top of Google search results in Riyadh.",
  },
  {
    icon: "📢",
    title: "Google Ads",
    slug: "google-ads",
    desc: "Search, Display, Shopping, YouTube, and Maps campaigns precisely managed for maximum ROI in the Saudi market.",
  },
  {
    icon: "📱",
    title: "Meta Ads",
    slug: "meta-ads",
    desc: "Facebook and Instagram advertising that reaches Riyadh customers at every stage of the buying journey with creative that converts.",
  },
  {
    icon: "📍",
    title: "Google Business Profile",
    slug: "google-business-profile",
    desc: "GBP setup, optimisation, and Maps ranking so your business appears first when nearby customers search on Google.",
  },
  {
    icon: "💬",
    title: "Social Media Marketing",
    slug: "social-media",
    desc: "Content creation, community management, and platform growth strategies across Instagram, Snapchat, X, TikTok, and LinkedIn.",
  },
  {
    icon: "🛒",
    title: "E-commerce Management",
    slug: "ecommerce",
    desc: "Full-service e-commerce setup, catalogue management, and sales optimisation for Saudi online stores on Salla, Zid, and Shopify.",
  },
];

const WHY_ITEMS = [
  {
    icon: "🇸🇦",
    title: "Saudi-Focused Strategy",
    desc: "Every campaign is built around the Saudi consumer mindset, local buying habits, cultural nuances, and Vision 2030 market trends.",
  },
  {
    icon: "🌐",
    title: "Fully Bilingual (AR/EN)",
    desc: "All copy, ads, and content delivered fluently in both Arabic and English — giving you full reach across every segment of the Riyadh market.",
  },
  {
    icon: "📈",
    title: "Proven, Measurable Results",
    desc: "150+ Riyadh businesses served with clear KPIs, monthly reporting, and transparent ROI tracking from day one.",
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    desc: "No hidden fees, no lock-in contracts. Flat monthly retainers so you always know exactly what you are paying and what you are getting.",
  },
];

const INDUSTRIES = [
  { icon: "🍽️", name: "Restaurants & Cafes", slug: "restaurants" },
  { icon: "🏥", name: "Clinics & Healthcare", slug: "clinics" },
  { icon: "🏠", name: "Real Estate", slug: "real-estate" },
  { icon: "🛍️", name: "Retail & E-commerce", slug: "retail" },
];

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function ServicesPage() {
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
              Our Services
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Digital Marketing Services for Riyadh Businesses
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              From search engine optimisation to paid advertising, web design, and social media — we offer every digital marketing service your Riyadh business needs under one roof, with bilingual Arabic and English execution.
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

      {/* ── All 8 Services ── */}
      <section className="py-12 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              What We Do
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Everything You Need to Grow Online in Riyadh
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Eight specialist services, one cohesive strategy — all built for the Saudi market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {SERVICES.map((service, i) => (
              <article
                key={service.slug}
                className={`reveal delay-${(i % 4) + 1} group bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300 flex flex-col`}
              >
                <div className="text-3xl md:text-4xl mb-4 leading-none">{service.icon}</div>
                <h3 className="text-white font-bold text-base md:text-lg mb-2">{service.title}</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-5 flex-1">
                  {service.desc}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1 text-[#F5C518] text-xs md:text-sm font-semibold group-hover:gap-2 transition-all"
                >
                  Explore Service →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Our Services ── */}
      <section className="py-12 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Why Choose Our Services
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              We are not a generic global agency. Every service we offer is built around the reality of doing business in Riyadh.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {WHY_ITEMS.map((item, i) => (
              <div
                key={item.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-3xl md:text-4xl mb-4 leading-none">{item.icon}</div>
                <h3 className="text-white font-bold text-sm md:text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="py-12 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Industries
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white">Industries We Serve</h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-xl mx-auto text-xs md:text-base">
              Sector-specific digital marketing expertise for Riyadh&apos;s most competitive industries.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            {INDUSTRIES.map((ind, i) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className={`reveal delay-${i + 1} inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white/65 text-sm font-medium hover:border-[#F5C518]/50 hover:text-[#F5C518] hover:bg-[#F5C518]/[0.05] transition-all`}
              >
                <span>{ind.icon}</span>
                {ind.name}
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-[#F5C518] text-sm font-semibold hover:gap-3 transition-all"
            >
              View All Industries →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Internal Link Footer ── */}
      <section className="py-10 md:py-16 bg-[#080E1A] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            {[
              { label: "SEO Services", href: "/services/seo" },
              { label: "Google Ads", href: "/services/google-ads" },
              { label: "Web Design", href: "/services/web-design" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
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
