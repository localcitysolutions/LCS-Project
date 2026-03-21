import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Meta Ads (Facebook & Instagram) in Riyadh | Local City Solutions",
  description:
    "Facebook and Instagram advertising for Riyadh businesses. Precise Saudi market targeting, Arabic creative, retargeting, lookalike audiences.",
};

const adServices = [
  {
    title: "Facebook Ads",
    desc: "Target Riyadh residents by age, interests, job title, and behaviours. Facebook's depth of data makes it one of the most precise ad platforms available in Saudi Arabia.",
  },
  {
    title: "Instagram Ads",
    desc: "Saudi Arabia's most visually engaged platform. We craft stunning Stories, Reels, and feed ads in Arabic and English that stop the scroll and convert.",
  },
  {
    title: "Retargeting Campaigns",
    desc: "Re-engage visitors who viewed your website or social profiles without converting. Retargeting campaigns typically deliver 3–5x lower cost-per-lead.",
  },
  {
    title: "Lookalike Audience Targeting",
    desc: "We build lookalike audiences from your best customers to find thousands of similar prospects across the Saudi market — at scale, automatically.",
  },
];

const additionalPlatforms = [
  {
    name: "Snapchat",
    note: "Extremely popular in Saudi Arabia — Snapchat has one of the highest penetration rates globally among Saudi youth.",
  },
  {
    name: "TikTok",
    note: "Rapidly growing in KSA with a highly engaged younger demographic. Ideal for brand awareness and product launches.",
  },
  {
    name: "LinkedIn",
    note: "Essential for B2B brands targeting decision-makers, executives, and professionals in Riyadh's corporate sector.",
  },
];

const whyMeta = [
  {
    title: "Unmatched Platform Reach",
    desc: "With over 23 million Saudis on Instagram and 21 million on Facebook, Meta platforms reach the majority of Saudi Arabia's active internet users.",
  },
  {
    title: "Native Arabic Language Support",
    desc: "Meta's full right-to-left Arabic interface means our creative, copy, and targeting can be delivered natively — not as an afterthought.",
  },
  {
    title: "A Highly Visual Culture",
    desc: "Saudi consumers are image and video-first. Meta's visual formats — Reels, Stories, Carousels — align perfectly with how Saudis engage online.",
  },
];

const steps = [
  { num: "01", title: "Audience Research", desc: "We map out your ideal Saudi customer — demographics, interests, online behaviours, and competitor audiences." },
  { num: "02", title: "Creative Production", desc: "Bilingual ad creatives — static, video, and carousel — designed to resonate with Saudi aesthetics and cultural nuances." },
  { num: "03", title: "Campaign Launch", desc: "Structured campaigns with proper pixel setup, conversion tracking, and A/B testing from day one." },
  { num: "04", title: "Scale & Report", desc: "We continuously optimise bids, audiences, and creatives — and deliver transparent monthly reports with clear KPIs." },
];

const faqs = [
  {
    q: "How much should I budget for Meta Ads in Saudi Arabia?",
    a: "We recommend a minimum monthly ad budget of SAR 2,500 for meaningful reach and testing. Higher budgets allow faster learning and scaling. Our management fee is quoted separately.",
  },
  {
    q: "Can you run ads in Arabic?",
    a: "Yes — all our creative and copy is available in native Arabic. We have Arabic-speaking strategists and designers who understand Saudi cultural preferences and communication styles.",
  },
  {
    q: "How do you measure Meta Ads success?",
    a: "We track reach, engagement, link clicks, leads, and cost-per-result. For e-commerce, we measure ROAS (return on ad spend). You receive a detailed monthly report with all key metrics.",
  },
  {
    q: "Do you manage Snapchat and TikTok ads too?",
    a: "Yes. We manage ad campaigns across Snapchat, TikTok, and LinkedIn in addition to Meta. Snapchat in particular has exceptional penetration in Saudi Arabia and is often underutilised by local businesses.",
  },
  {
    q: "How quickly can campaigns go live?",
    a: "Once we have your brief, brand assets, and ad account access, we typically launch within 5–7 business days. Urgent launches can be accommodated — contact us to discuss your timeline.",
  },
];

export default function MetaAdsPage() {
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
              Meta Ads
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Reach Riyadh Customers on Facebook &amp; Instagram
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              We build and manage Meta ad campaigns that connect Riyadh businesses with Saudi customers. Bilingual creative, precise targeting, and campaigns that convert — not just get clicks.
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

      {/* Saudi Social Stats */}
      <section className="bg-[#0C1424] border-y border-white/[0.06] py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 text-center">
            {[
              { stat: "23M+", label: "Saudis active on Instagram" },
              { stat: "21M+", label: "Saudi users on Facebook" },
              { stat: "3 hrs/day", label: "Average time Saudis spend on social media" },
            ].map((item) => (
              <div key={item.label} className="reveal">
                <p className="text-[#F5C518] text-3xl md:text-4xl font-extrabold mb-1">{item.stat}</p>
                <p className="text-white/50 text-xs md:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meta Ad Services */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Our Services
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Meta Ad Services
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              End-to-end management across every Meta ad format — from awareness to conversion.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {adServices.map((item, i) => (
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

      {/* Platform Coverage */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Beyond Meta
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Platform Coverage
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              We manage paid social across all major platforms in Saudi Arabia — not just Facebook and Instagram.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {additionalPlatforms.map((platform, i) => (
              <div
                key={platform.name}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <h3 className="text-[#F5C518] font-bold text-lg mb-2">{platform.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{platform.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Meta Ads Work in Saudi */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Why It Works
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Why Meta Ads Work in Saudi Arabia
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              The Saudi market is uniquely well-suited to Meta advertising.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {whyMeta.map((item, i) => (
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
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Our Process
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              How We Run Your Campaigns
            </h2>
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
      <section className="py-16 md:py-24 bg-[#080E1A]">
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
      <section className="py-12 md:py-16 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 reveal">
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Explore More</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 reveal delay-1">
            {[
              { label: "Google Ads", href: "/services/google-ads" },
              { label: "Social Media", href: "/services/social-media" },
              { label: "Digital Marketing", href: "/services/digital-marketing" },
              { label: "All Services", href: "/services" },
              { label: "Industries We Serve", href: "/industries" },
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
