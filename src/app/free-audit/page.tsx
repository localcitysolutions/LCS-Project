import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Free Digital Marketing Audit | Local City Solutions Riyadh",
  description:
    "Get your free digital marketing audit from Local City Solutions. Website analysis, SEO score, GBP review, competitor check — all free for Riyadh businesses.",
};

const auditItems = [
  {
    title: "Website Performance Analysis",
    description:
      "We assess your site speed, mobile usability, technical health, and conversion rate signals that affect how Google ranks and how users convert.",
    icon: (
      <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Google Business Profile Review",
    description:
      "We audit your GBP completeness, review profile, photo quality, category selection, and how you appear in Google Maps for your target districts.",
    icon: (
      <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Local SEO Score",
    description:
      "We evaluate your keyword rankings, on-page SEO, backlink profile, and local citation consistency across Riyadh-relevant directories.",
    icon: (
      <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Competitor Landscape Check",
    description:
      "See how your top 3 competitors are ranking, what keywords they target, and where the gaps are that your business can exploit right now.",
    icon: (
      <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Social Media Presence Review",
    description:
      "We assess your Instagram, TikTok, and Snapchat profiles for completeness, posting frequency, engagement, and alignment with your target audience.",
    icon: (
      <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Personalised Recommendations",
    description:
      "Everything concludes with a clear, prioritised action plan tailored to your business — not a generic checklist, but a real roadmap for growth.",
    icon: (
      <svg className="w-5 h-5 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "01",
    title: "Tell Us About Your Business",
    description:
      "Fill the form below or WhatsApp us directly. Share your business name, website, and a brief description of your goals — that's all we need to get started.",
  },
  {
    number: "02",
    title: "We Analyse Your Digital Presence",
    description:
      "Our team reviews your website, GBP, search rankings, social media, and competitive landscape using professional tools and local market knowledge.",
  },
  {
    number: "03",
    title: "Receive Your Audit Report (Within 24h)",
    description:
      "You receive a personalised audit report with clear findings, priority actions, and honest recommendations. No jargon, no sales pressure — just real insights.",
  },
];

const whyAudit = [
  {
    title: "Identify Hidden Opportunities",
    description:
      "Most Riyadh businesses are leaving significant online visibility on the table. An audit reveals exactly which channels and tactics can drive immediate results for your business.",
  },
  {
    title: "Stop Wasting Budget",
    description:
      "If you're already spending on ads or marketing, an audit quickly reveals where your money is performing well and where it's being lost to poor targeting or weak landing pages.",
  },
  {
    title: "Get Clarity Before Committing",
    description:
      "An audit gives you an honest baseline before you invest in any agency or service. You'll understand exactly where you stand and what growth is realistically achievable.",
  },
];

const industries = [
  "Restaurant / Cafe",
  "Clinic / Healthcare",
  "Salon / Beauty",
  "Real Estate",
  "Retail / E-commerce",
  "Education / Training",
  "Automotive",
  "Hotel / Hospitality",
  "Other",
];

export default function FreeAuditPage() {
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
              Free Audit
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Get Your Free Digital{" "}
              <span className="text-[#F5C518]">Marketing Audit</span>
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              No obligation, no jargon — just clear insights on how to grow your business online. We analyse your website, SEO, Google Business Profile, competitors, and social media for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 reveal delay-3">
              <a
                href="#get-audit"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all shadow-lg shadow-[#F5C518]/20"
              >
                Claim Free Audit →
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

      {/* What Your Free Audit Includes */}
      <section className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              What&apos;s Included
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              What Your Free Audit Includes
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              A comprehensive review of your entire digital presence — six areas analysed, zero cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {auditItems.map((item, i) => (
              <div
                key={item.title}
                className={`reveal delay-${(i % 6) + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 md:p-7 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#F5C518]/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base mb-1.5">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              The Process
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              How It Works
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Simple, fast, and completely free — your audit report arrives within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-[#F5C518]/25 transition-all duration-300 relative`}
              >
                <div className="text-5xl font-extrabold text-[#F5C518]/15 mb-4 leading-none">
                  {step.number}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-[#F5C518]/30 z-10">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Your Audit */}
      <section id="get-audit" className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Get Started
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Get Your Free Audit Now
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Two ways to request your audit — choose whichever is easiest for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Option A — Form */}
            <div className="reveal bg-[#0E1A2E] border border-white/[0.06] rounded-2xl p-6 md:p-8">
              <h3 className="text-white font-bold text-lg mb-1">Option A: Fill the Form</h3>
              <p className="text-white/45 text-sm mb-6">We&apos;ll review your details and send your audit within 24 hours.</p>

              <form
                action="https://wa.me/966564229190"
                method="get"
                target="_blank"
                rel="noopener noreferrer"
                className="space-y-4"
              >
                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="business"
                    required
                    placeholder="e.g. Al Nakheel Café"
                    className="w-full bg-[#080E1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#F5C518]/40 focus:bg-[#080E1A] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="website"
                    placeholder="https://yourbusiness.com"
                    className="w-full bg-[#080E1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#F5C518]/40 focus:bg-[#080E1A] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+966 5X XXX XXXX"
                      className="w-full bg-[#080E1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#F5C518]/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      className="w-full bg-[#080E1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#F5C518]/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5">
                    Industry
                  </label>
                  <select
                    name="industry"
                    className="w-full bg-[#080E1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F5C518]/40 transition-all cursor-pointer"
                  >
                    <option value="">Select your industry...</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-medium mb-1.5">
                    City / District
                  </label>
                  <input
                    type="text"
                    name="district"
                    placeholder="e.g. Al Malqa, North Riyadh"
                    className="w-full bg-[#080E1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#F5C518]/40 transition-all"
                  />
                </div>

                <a
                  href="https://wa.me/966564229190?text=Hi%2C%20I%27d%20like%20a%20free%20digital%20marketing%20audit%20for%20my%20business."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all shadow-lg shadow-[#F5C518]/20 hover:-translate-y-0.5"
                >
                  Submit via WhatsApp →
                </a>
              </form>
            </div>

            {/* Option B — WhatsApp Direct */}
            <div className="reveal delay-2 flex flex-col gap-5">
              <div className="bg-[#0E1A2E] border border-[#25D366]/20 rounded-2xl p-6 md:p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl mb-2">Option B: WhatsApp Us Directly</h3>
                <p className="text-white/50 text-sm mb-6 max-w-xs mx-auto">
                  Skip the form entirely — message us on WhatsApp and we&apos;ll get your audit started immediately. Fastest response guaranteed.
                </p>
                <a
                  href="https://wa.me/966564229190?text=Hi%2C%20I%27d%20like%20a%20free%20digital%20marketing%20audit%20for%20my%20business%20in%20Riyadh."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-[#25D366] text-white font-bold text-base hover:bg-[#1fb858] transition-all shadow-xl shadow-[#25D366]/30 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp for Free Audit
                </a>
                <p className="text-white/30 text-xs mt-4">We reply within minutes during business hours.</p>
              </div>

              <div className="bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 flex items-center gap-3">
                <svg className="w-5 h-5 text-[#F5C518] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-white/60 text-sm">
                  100% free. No credit card. No obligation. No sales pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Get an Audit? */}
      <section className="py-14 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Why Bother?
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Why Get an Audit?
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Every Riyadh business that has requested a free audit has walked away with at least one insight they immediately acted on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyAudit.map((reason, i) => (
              <div
                key={reason.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-7 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#F5C518]/10 flex items-center justify-center mb-4">
                  <span className="text-[#F5C518] font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{reason.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10 bg-[#0C1424] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/40 text-xs mb-4 font-semibold uppercase tracking-widest">Explore More</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Our Services", href: "/services" },
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "SEO Services", href: "/services/seo" },
              { label: "Google Business Profile", href: "/services/google-business-profile" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-[#F5C518]/50 hover:text-[#F5C518] transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABox
        heading="Still Have Questions? Let's Chat"
        subtitle="WhatsApp us anytime — we reply within minutes."
      />
    </main>
  );
}
