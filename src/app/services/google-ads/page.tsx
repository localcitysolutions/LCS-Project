import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Google Ads Management in Riyadh | Local City Solutions",
  description:
    "Expert Google Ads management for Riyadh businesses. Search, Display, Shopping, YouTube, Maps Ads. Bilingual campaigns with Saudi market expertise.",
};

const campaignTypes = [
  {
    title: "Search Ads",
    desc: "Appear at the top of Google when customers search for your services in Riyadh. Capture high-intent buyers at the exact moment they need you.",
  },
  {
    title: "Display Ads",
    desc: "Reach potential customers across millions of websites with eye-catching banner ads. Build brand awareness throughout the Saudi market.",
  },
  {
    title: "Shopping Ads",
    desc: "Showcase your products with images, prices, and ratings directly in Google search results. Ideal for Saudi e-commerce stores.",
  },
  {
    title: "YouTube Ads",
    desc: "Advertise on YouTube — one of Saudi Arabia's most-watched platforms. Video ads that stop the scroll and drive real action.",
  },
  {
    title: "Google Maps Ads",
    desc: "Pin your business at the top of Google Maps results in Riyadh. Drive walk-ins and calls from customers nearby.",
  },
  {
    title: "Call-Only Ads",
    desc: "Generate direct phone calls from motivated customers. Perfect for service businesses that close deals over the phone.",
  },
];

const approach = [
  {
    title: "Bilingual Arabic / English Ads",
    desc: "We write compelling ad copy in both Arabic and English to reach Riyadh's diverse audience effectively.",
  },
  {
    title: "District-Level Geo-Targeting",
    desc: "Narrow your ad spend to specific Riyadh districts — Al Olaya, Al Malaz, Diplomatic Quarter, and beyond.",
  },
  {
    title: "Ramadan & Saudi Holiday Adjustments",
    desc: "We adapt budgets, schedules, and creatives around Ramadan, Eid, and Saudi National Day to capitalise on peak spending periods.",
  },
  {
    title: "Local Competitor Analysis",
    desc: "We research what your Riyadh competitors are bidding on and craft strategies to outperform them without overspending.",
  },
];

const steps = [
  { num: "01", title: "Account Audit", desc: "We review your existing Google Ads account — or set one up from scratch — identifying wasted spend and missed opportunities." },
  { num: "02", title: "Keyword Research", desc: "Deep research into Arabic and English search terms your Riyadh customers actually use, including seasonal and local intent keywords." },
  { num: "03", title: "Campaign Build", desc: "Structured campaigns with tight ad groups, compelling copy, and conversion-optimised landing pages tailored to the Saudi market." },
  { num: "04", title: "Optimize & Scale", desc: "Continuous A/B testing, bid management, and scaling of what works — with transparent monthly reporting in Arabic or English." },
];

const faqs = [
  {
    q: "Is there a minimum ad spend for Google Ads in Riyadh?",
    a: "We recommend a minimum monthly ad budget of SAR 3,000 to generate meaningful data and results in the Riyadh market. Our management fee is separate from your ad spend paid directly to Google.",
  },
  {
    q: "How long before I see results from Google Ads?",
    a: "Search campaigns can generate clicks and leads within 24–48 hours of launch. However, we typically need 4–6 weeks of optimisation data to consistently lower your cost-per-lead and maximise ROI.",
  },
  {
    q: "What is the difference between Google Ads and SEO?",
    a: "Google Ads delivers immediate paid visibility at the top of search results. SEO builds organic (free) rankings over months. We recommend running both in tandem — Ads for immediate leads, SEO for long-term growth.",
  },
  {
    q: "Can you target Arabic keywords specifically?",
    a: "Absolutely. Our team writes native Arabic ad copy and builds Arabic keyword lists tailored to how Saudis actually search — including colloquial terms and Najdi dialect variations.",
  },
  {
    q: "What reporting do I receive?",
    a: "You receive a detailed monthly report covering impressions, clicks, conversions, cost-per-click, and ROI. We also offer real-time dashboard access and a monthly strategy call to review performance.",
  },
];

export default function GoogleAdsPage() {
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
              Google Ads
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Get Customers Today with Google Ads in Riyadh
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              We manage high-performance Google Ads campaigns for Riyadh businesses. Bilingual strategy, local expertise, and measurable ROI — you only pay when customers click.
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
              { stat: "3.5B+", label: "Searches happen on Google every day" },
              { stat: "4x ROI", label: "Average return Riyadh businesses see" },
              { stat: "Pay-Per-Click", label: "You only pay when someone clicks" },
            ].map((item) => (
              <div key={item.label} className="reveal">
                <p className="text-[#F5C518] text-3xl md:text-4xl font-extrabold mb-1">{item.stat}</p>
                <p className="text-white/50 text-xs md:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Types */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              What We Run
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Campaign Types We Manage
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              From search to video, we cover every Google Ads format that drives results for Riyadh businesses.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campaignTypes.map((item, i) => (
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

      {/* Riyadh-Specific Approach */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Local Expertise
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Riyadh-Specific Approach
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Generic Google Ads agencies don't understand the Saudi market. We do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {approach.map((item, i) => (
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
              How It Works
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Google Ads Process
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              A proven four-step framework that gets your campaigns live and profitable fast.
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
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Explore More Services</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 reveal delay-1">
            {[
              { label: "Meta Ads", href: "/services/meta-ads" },
              { label: "SEO", href: "/services/seo" },
              { label: "Digital Marketing", href: "/services/digital-marketing" },
              { label: "Google Business Profile", href: "/services/google-business-profile" },
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
