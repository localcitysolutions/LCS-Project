import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Google Business Profile Management in Riyadh | Local City Solutions",
  description:
    "Professional Google Business Profile setup, optimization, and management for Riyadh businesses. Rank higher on Google Maps.",
};

const gbpServices = [
  {
    title: "Profile Creation",
    desc: "We set up your Google Business Profile from scratch with all essential information — business name, category, address, phone, website, and operating hours — optimised from day one.",
  },
  {
    title: "Profile Optimisation",
    desc: "We write keyword-rich descriptions in Arabic and English, upload professional photos, add services/products, and ensure every field is complete to maximise your Maps ranking.",
  },
  {
    title: "Monthly Management",
    desc: "Regular posts, Q&A management, photo updates, and profile health monitoring keep your listing active and signals to Google that your business is current and trustworthy.",
  },
  {
    title: "Maps Ranking",
    desc: "Through citation building, category optimisation, and proximity-based strategies, we work to push your business into the coveted Google Maps 3-Pack in Riyadh.",
  },
  {
    title: "Review Management",
    desc: "We help you build a review generation system, respond to reviews professionally in both Arabic and English, and manage your online reputation on Google.",
  },
];

const whyGBP = [
  {
    title: "Saudis Search Google First",
    desc: "Whether looking for a restaurant in Al Olaya or a clinic in Al Malaz, Riyadh residents overwhelmingly start with Google Maps. A missing or incomplete GBP means invisible business.",
  },
  {
    title: "Arabic Business Listings Drive More Calls",
    desc: "Customers trust businesses that communicate in their language. An optimised Arabic-language GBP profile generates significantly more calls and direction requests from Saudi users.",
  },
  {
    title: "Competes With Large Businesses at No Ad Cost",
    desc: "GBP is free. A well-optimised profile lets small and medium Riyadh businesses rank above large competitors in local search — without spending a single riyal on ads.",
  },
];

const steps = [
  {
    num: "01",
    title: "Audit",
    desc: "We assess your current GBP status — or confirm one doesn't exist — and identify exactly what needs to be fixed or built.",
  },
  {
    num: "02",
    title: "Setup & Optimise",
    desc: "Full profile build-out with bilingual content, category selection, service areas, photo upload, and attributes tailored to your Riyadh business.",
  },
  {
    num: "03",
    title: "Manage",
    desc: "Ongoing monthly posts, Q&A monitoring, review responses, and profile updates to keep your listing active and high-ranking.",
  },
  {
    num: "04",
    title: "Rank & Grow",
    desc: "Citation building, local SEO alignment, and competitor tracking to progressively improve your position in Google Maps for Riyadh searches.",
  },
];

const faqs = [
  {
    q: "Is Google Business Profile free?",
    a: "Yes — Google Business Profile is a free tool from Google. You pay nothing to Google for the listing itself. Our fee covers the professional setup, optimisation, and ongoing management of your profile.",
  },
  {
    q: "How long does it take to see results?",
    a: "Initial improvements in profile completeness and visibility can be seen within 2–4 weeks. Ranking improvements in Google Maps typically take 2–4 months of consistent management and optimisation.",
  },
  {
    q: "What information do I need to provide to get started?",
    a: "We need your business name, address, phone number, website, business hours, a brief description, and photos of your business. We guide you through the entire process.",
  },
  {
    q: "Can you help me get more Google reviews?",
    a: "Yes. We build a review generation strategy tailored to your business — including review request messaging in Arabic and English — to help you consistently earn positive reviews from satisfied customers.",
  },
  {
    q: "Can you manage GBP for multiple business locations?",
    a: "Absolutely. We manage Google Business Profiles for businesses with multiple branches across Riyadh or across Saudi Arabia. Each location gets individual attention and optimisation.",
  },
];

export default function GoogleBusinessProfilePage() {
  return (
    <main className="bg-[#080E1A] min-h-screen">
      {/* Hero */}
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
              Google Business Profile
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Get Found First on Google Maps in Riyadh
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              We set up, optimise, and manage your Google Business Profile so Riyadh customers find you — and choose you — on Google Maps. No ad spend required.
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

      {/* Stats Bar */}
      <section className="bg-[#0C1424] border-y border-white/[0.06] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 text-center">
            {[
              { stat: "46%", label: "Of all Google searches have local intent" },
              { stat: "88%", label: "Of people call a business after finding it on Maps" },
              { stat: "7x", label: "More clicks for businesses with complete GBP listings" },
            ].map((item) => (
              <div key={item.label} className="reveal">
                <p className="text-[#F5C518] text-3xl md:text-4xl font-extrabold mb-1">{item.stat}</p>
                <p className="text-white/50 text-xs md:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GBP Services */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              What We Do
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Our GBP Services
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              From initial setup to long-term ranking — everything your Google Business Profile needs to dominate Riyadh local search.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gbpServices.map((item, i) => (
              <div
                key={item.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why GBP Matters for Riyadh */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Local Advantage
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Why GBP Matters for Riyadh Businesses
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Google Maps is how Riyadh finds local businesses. Your profile is your most important local asset.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyGBP.map((item, i) => (
              <div
                key={item.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-8 h-8 rounded-full bg-[#F5C518]/10 flex items-center justify-center mb-4">
                  <span className="text-[#F5C518] font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              How We Do It
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Our 4-Step GBP Process
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              A structured approach that gets your business ranking on Google Maps — and keeps it there.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 hover:border-[#F5C518]/25 transition-all duration-300`}
              >
                <p className="text-[#F5C518] text-3xl font-extrabold mb-3">{step.num}</p>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              FAQ
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Common Questions
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
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

      {/* Internal Links */}
      <section className="py-12 md:py-16 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 reveal">
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Related Services</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 reveal delay-1">
            {[
              { label: "SEO", href: "/services/seo" },
              { label: "Google Ads", href: "/services/google-ads" },
              { label: "Riyadh Local Marketing", href: "/riyadh" },
              { label: "Digital Marketing", href: "/services/digital-marketing" },
              { label: "About Us", href: "/about" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 rounded-full border border-white/10 text-white/60 text-sm hover:border-[#F5C518]/40 hover:text-[#F5C518] transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABox />
    </main>
  );
}
