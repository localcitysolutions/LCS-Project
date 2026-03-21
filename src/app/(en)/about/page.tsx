import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "About Local City Solutions | Digital Marketing Agency Riyadh",
  description:
    "Meet the team behind Local City Solutions — Riyadh's trusted digital marketing agency with 6+ years of Saudi market experience.",
};

const stats = [
  { value: "6+", label: "Years in Saudi Market" },
  { value: "150+", label: "Projects Delivered" },
  { value: "2", label: "Languages (AR & EN)" },
  { value: "8", label: "Core Services" },
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Results-First",
    description:
      "Every campaign is measured by real business outcomes — leads, bookings, calls, and revenue. Vanity metrics have no place in our reporting.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Full Transparency",
    description:
      "You see exactly where your budget goes. We provide clear dashboards, honest reporting, and zero hidden fees — always.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: "Saudi Market Expertise",
    description:
      "We understand local consumer behaviour, seasonal trends like Ramadan and National Day, and the nuances of marketing in the Kingdom.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    title: "Bilingual Excellence",
    description:
      "Our team crafts compelling content and campaigns in both Arabic and English — connecting your brand with Riyadh's diverse audience.",
  },
];

const differentiators = [
  {
    us: "Deep knowledge of Riyadh's districts, consumer habits, and seasonal market cycles",
    them: "Generic strategies copied from Western playbooks with no local context",
    label: "Local Market Knowledge",
  },
  {
    us: "Bilingual Arabic-English team that understands cultural nuance in messaging",
    them: "English-only agencies using machine-translated Arabic copy",
    label: "True Bilingual Capability",
  },
  {
    us: "Dedicated account manager, transparent reporting, and direct WhatsApp access",
    them: "Ticket-based support, generic monthly PDFs, and slow response times",
    label: "Client Communication",
  },
];

export default function AboutPage() {
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
              About Us
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Your Digital Marketing Partner{" "}
              <span className="text-[#F5C518]">in Riyadh</span>
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              With 6+ years of hands-on experience in the Saudi market, we help Riyadh businesses attract more customers, generate more leads, and grow their digital presence with strategies that actually work here.
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

      {/* Our Story */}
      <section className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">
            {/* Narrative */}
            <div className="lg:col-span-2 reveal">
              <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Our Story
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Built for Riyadh. Grown with Riyadh.
              </h2>
              <div className="space-y-4 text-white/60 text-sm md:text-base leading-relaxed">
                <p>
                  Local City Solutions was founded with a single conviction: that Riyadh&apos;s rapidly growing business community deserved a digital marketing agency that truly understood the Saudi market — not one applying copy-pasted Western strategies to a very different audience.
                </p>
                <p>
                  Over the past six years, we have partnered with restaurants in Al Olaya, clinics in Al Malqa, salons in Al Sahafah, and e-commerce brands serving the entire Kingdom. Each engagement has deepened our understanding of what resonates with Saudi consumers, how to navigate seasonal peaks like Ramadan, Eid, and National Day, and how to convert Arabic-speaking audiences at every stage of the funnel.
                </p>
                <p>
                  Our bilingual Arabic-English team bridges the cultural and linguistic gap that trips up international agencies. We write authentic Arabic copy, manage Google Business Profiles correctly for Saudi search behaviour, and run ads that feel native — not foreign.
                </p>
                <p>
                  Today, Local City Solutions is a full-service digital marketing agency offering{" "}
                  <a href="/services/seo" className="text-[#F5C518] hover:underline">
                    SEO
                  </a>
                  ,{" "}
                  <a href="/services/google-ads" className="text-[#F5C518] hover:underline">
                    Google Ads
                  </a>
                  , Meta Ads, web design, Google Business Profile management, and more — all from our base in{" "}
                  <a href="/riyadh" className="text-[#F5C518] hover:underline">
                    Riyadh
                  </a>
                  . Explore our{" "}
                  <a href="/services" className="text-[#F5C518] hover:underline">
                    full services
                  </a>{" "}
                  or{" "}
                  <a href="/contact" className="text-[#F5C518] hover:underline">
                    get in touch
                  </a>{" "}
                  to start the conversation.
                </p>
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="grid grid-cols-2 gap-4 reveal delay-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 text-center hover:border-[#F5C518]/25 transition-all duration-300"
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-[#F5C518] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-xs leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-14 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Our Values
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              How We Work
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Four principles that guide every campaign, every client relationship, and every result we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 md:p-7 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-11 h-11 rounded-lg bg-[#F5C518]/10 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{value.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Our Team
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              The People Behind the Results
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              A dedicated team of bilingual digital marketing specialists with deep roots in the Saudi market.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="reveal bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-7 md:p-10 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300 max-w-sm w-full text-center">
              {/* Avatar — colored initials */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F5C518]/20 to-[#F5C518]/5 border border-[#F5C518]/25 flex items-center justify-center mx-auto mb-5">
                <span className="text-[#F5C518] font-extrabold text-2xl">MF</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-1">Muhammad Farhan</h3>
              <p className="text-[#F5C518] text-xs font-semibold uppercase tracking-widest mb-4">
                Founder &amp; CEO
              </p>
              <p className="text-white/55 text-sm leading-relaxed">
                Digital marketing strategist with 6+ years specializing in the Saudi market. Leads overall strategy, client relationships, and campaign performance — ensuring every business we work with achieves measurable growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-14 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Why Choose Us
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              What Makes Us Different
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Generic agencies apply global templates. We build strategies around Riyadh&apos;s unique market reality.
            </p>
          </div>
          <div className="space-y-5">
            {differentiators.map((item, i) => (
              <div
                key={item.label}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 md:p-7 hover:border-[#F5C518]/25 transition-all duration-300`}
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="md:w-48 flex-shrink-0">
                    <span className="inline-block text-[#F5C518] text-[10px] font-bold uppercase tracking-[0.15em]">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#F5C518]/15 border border-[#F5C518]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-[#F5C518]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#F5C518]/70 font-semibold uppercase tracking-wider mb-1">Local City Solutions</p>
                        <p className="text-white/70 text-sm leading-relaxed">{item.us}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/5 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">Generic Agencies</p>
                        <p className="text-white/35 text-sm leading-relaxed">{item.them}</p>
                      </div>
                    </div>
                  </div>
                </div>
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
              { label: "Contact Us", href: "/contact" },
              { label: "Free Audit", href: "/free-audit" },
              { label: "SEO Services", href: "/services/seo" },
              { label: "Google Ads", href: "/services/google-ads" },
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

      <CTABox heading="Ready to Work with Riyadh's Top Digital Marketing Team?" />
    </main>
  );
}
