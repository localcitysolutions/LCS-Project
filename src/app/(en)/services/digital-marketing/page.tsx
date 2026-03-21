import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Digital Marketing Agency in Riyadh | Local City Solutions",
  description:
    "Full-stack digital marketing for Riyadh businesses. Strategy, execution, and reporting across SEO, Ads, Social Media, and Web Design.",
};

/* ─── DATA ─────────────────────────────────────────────────── */
const WHAT_WE_OFFER = [
  {
    icon: "🗺️",
    title: "Strategy & Planning",
    desc: "We start with a deep audit of your current digital presence, competitive landscape, and market position. The result is a custom growth roadmap with clear targets, channel priorities, and a realistic budget allocation tailored to Riyadh.",
  },
  {
    icon: "⚡",
    title: "Campaign Execution",
    desc: "Our in-house team handles every aspect of execution — ad copy, creative assets, landing pages, SEO on-page work, and social content — all produced in both Arabic and English to maximise reach.",
  },
  {
    icon: "📊",
    title: "Performance Tracking",
    desc: "We set up comprehensive conversion tracking across Google Analytics, Meta Pixel, and call tracking so you can see exactly which channels are generating leads and sales, not just clicks.",
  },
  {
    icon: "🔄",
    title: "Ongoing Optimisation",
    desc: "Digital marketing is never set-and-forget. We run continuous A/B tests, optimise bids and budgets weekly, and send you a clear monthly report showing growth versus your KPIs.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Audit",
    desc: "We analyse your website, existing ad accounts, SEO rankings, social presence, and competitor strategies to identify your highest-value growth opportunities.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Based on the audit findings, we build a 90-day digital marketing roadmap with channel mix, budget recommendations, content calendar, and measurable KPIs.",
  },
  {
    num: "03",
    title: "Launch",
    desc: "Campaigns go live across your priority channels. We handle all technical setup, creative production, and Arabic/English copywriting in-house.",
  },
  {
    num: "04",
    title: "Optimise",
    desc: "Weekly performance reviews, monthly strategy calls, and ongoing creative refreshes ensure your budget is always working harder month over month.",
  },
];

const CHANNELS = [
  { icon: "🔍", title: "SEO", desc: "Rank organically for high-intent Riyadh keywords.", href: "/services/seo" },
  { icon: "📢", title: "Google Ads", desc: "Pay-per-click campaigns with instant visibility.", href: "/services/google-ads" },
  { icon: "📱", title: "Meta Ads", desc: "Facebook & Instagram ads targeting Riyadh audiences.", href: "/services/meta-ads" },
  { icon: "🖥️", title: "Web Design", desc: "Conversion-focused websites that turn visitors into leads.", href: "/services/web-design" },
  { icon: "📍", title: "Google Business Profile", desc: "Local Maps presence that drives foot traffic and calls.", href: "/services/google-business-profile" },
  { icon: "💬", title: "Social Media", desc: "Organic content and community growth across all platforms.", href: "/services/social-media" },
];

const FAQS = [
  {
    q: "What does 'full-stack digital marketing' mean for my Riyadh business?",
    a: "Full-stack means we handle every layer of your online presence — from the technical foundation (website speed, SEO structure) to the top of the funnel (paid ads, social media) and the conversion layer (landing pages, lead tracking). You get one cohesive strategy rather than disconnected vendors working against each other.",
  },
  {
    q: "Do you create content in Arabic?",
    a: "Yes, all content — ad copy, social posts, blog articles, web pages — is produced natively in both Arabic and English by our bilingual team. We never rely on machine translation for client-facing material.",
  },
  {
    q: "How long does it take to see results from digital marketing in Riyadh?",
    a: "Paid channels (Google Ads, Meta Ads) typically produce leads within the first two weeks of launch. SEO results build over 3–6 months as rankings climb. Social media growth is usually visible within 30–60 days. We set realistic timelines during your onboarding call.",
  },
  {
    q: "How is your agency different from other digital marketing agencies in Riyadh?",
    a: "We focus exclusively on the Saudi market, which means our keyword research, ad targeting, creative direction, and reporting are all calibrated for Riyadh consumers. We also offer transparent flat-fee pricing — no retainer lock-ins and no hidden costs.",
  },
  {
    q: "What budget do I need to get started?",
    a: "Our management fees start at SAR 2,000/month. Ad spend budgets vary by channel and goal — we recommend a minimum of SAR 3,000/month for Google Ads and SAR 2,000/month for Meta Ads to gather enough data for meaningful optimisation. We advise based on your specific goals, not generic minimums.",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────── */
export default function DigitalMarketingPage() {
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
              Digital Marketing
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Full-Stack Digital Marketing in Riyadh
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              Strategy, creative, execution, and reporting — all under one roof. We build integrated digital marketing systems that consistently generate leads and revenue for Riyadh businesses, in both Arabic and English.
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

      {/* ── What We Offer ── */}
      <section className="py-12 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Our Scope
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">What We Offer</h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Four pillars that cover the full lifecycle of your digital marketing — from first click to loyal customer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {WHAT_WE_OFFER.map((item, i) => (
              <div
                key={item.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-3xl mb-4 leading-none">{item.icon}</div>
                <h3 className="text-white font-bold text-base md:text-xl mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-12 md:py-24 bg-[#080E1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              How We Work
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Digital Marketing Process
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-xl mx-auto text-xs md:text-base">
              A repeatable four-stage system that removes guesswork and delivers consistent growth.
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

      {/* ── Channels We Master ── */}
      <section className="py-12 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Channels
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Channels We Master
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              We activate the right mix of channels for your business — and manage them as an integrated system, not siloed campaigns.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {CHANNELS.map((ch, i) => (
              <Link
                key={ch.href}
                href={ch.href}
                className={`reveal delay-${(i % 3) + 1} group bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-8 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="text-3xl mb-3 leading-none">{ch.icon}</div>
                <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#F5C518] transition-colors">
                  {ch.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-3">{ch.desc}</p>
                <span className="text-[#F5C518] text-xs font-semibold group-hover:gap-2 transition-all">
                  Learn more →
                </span>
              </Link>
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
              { label: "Google Ads", href: "/services/google-ads" },
              { label: "Meta Ads", href: "/services/meta-ads" },
              { label: "About Us", href: "/about" },
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
