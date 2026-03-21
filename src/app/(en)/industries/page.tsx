import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Industries We Serve in Riyadh | Local City Solutions",
  description:
    "Digital marketing specialists for restaurants, clinics, salons, real estate, retail, education, automotive, and hotels in Riyadh.",
};

const industries = [
  {
    slug: "restaurants",
    emoji: "🍽️",
    name: "Restaurants & Cafes",
    description:
      "Attract diners on Google Maps, Instagram, and delivery apps. We drive foot traffic and online orders for Riyadh restaurants and cafes.",
  },
  {
    slug: "clinics",
    emoji: "🏥",
    name: "Clinics & Healthcare",
    description:
      "Help patients find your clinic online through SEO, GBP, and targeted ads. Compliant marketing for Riyadh's healthcare sector.",
  },
  {
    slug: "salons",
    emoji: "✂️",
    name: "Salons & Beauty",
    description:
      "Fill your appointment book with Instagram Ads, GBP optimisation, and local SEO. Perfect for ladies' and men's salons in Riyadh.",
  },
  {
    slug: "real-estate",
    emoji: "🏢",
    name: "Real Estate",
    description:
      "Generate qualified buyer and seller leads with targeted digital campaigns. We understand Riyadh's property market inside and out.",
  },
  {
    slug: "retail",
    emoji: "🛍️",
    name: "Retail & E-commerce",
    description:
      "Drive in-store and online sales with Google Shopping, Meta Ads, and SEO. We optimise for Riyadh's competitive retail landscape.",
  },
  {
    slug: "education",
    emoji: "🎓",
    name: "Education & Training",
    description:
      "Attract students and boost enrolment with targeted campaigns across Google and social media platforms popular with Saudi families.",
  },
  {
    slug: "automotive",
    emoji: "🚗",
    name: "Automotive",
    description:
      "Generate leads for car sales, service centres, and dealerships. We reach Riyadh's car-loving audience effectively and efficiently.",
  },
  {
    slug: "hotels",
    emoji: "🏨",
    name: "Hotels & Hospitality",
    description:
      "Boost bookings and brand awareness for Riyadh hotels and hospitality businesses with multi-channel digital marketing strategies.",
  },
];

export default function IndustriesPage() {
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
              Industries
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Digital Marketing for{" "}
              <span className="text-[#F5C518]">Every Industry in Riyadh</span>
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              From restaurants to real estate, clinics to car dealerships — we build industry-specific digital marketing strategies that match how Saudi customers actually search and buy.
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

      {/* Industry Cards */}
      <section className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Our Specialisations
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              8 Industries, One Agency
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Sector-specific strategies built on years of Riyadh market data and real campaign results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((industry, i) => (
              <div
                key={industry.slug}
                className={`reveal delay-${(i % 6) + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 md:p-7 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300 flex flex-col`}
              >
                <div className="text-4xl mb-4">{industry.emoji}</div>
                <h3 className="text-white font-bold text-base md:text-lg mb-3 leading-snug">
                  {industry.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">
                  {industry.description}
                </p>
                <a
                  href={`/industries/${industry.slug}`}
                  className="inline-flex items-center gap-1 text-[#F5C518] text-xs font-semibold hover:gap-2 transition-all"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Industry-Specific Marketing Matters */}
      <section className="py-14 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal">
              <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Our Approach
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Why Industry-Specific Marketing Matters
              </h2>
              <div className="space-y-4 text-white/60 text-sm md:text-base leading-relaxed">
                <p>
                  A one-size-fits-all approach to digital marketing is one of the most expensive mistakes a Riyadh business can make. The keywords a restaurant should target are completely different from those a clinic or real estate agency needs. The bidding strategy that works for a luxury hotel bears no resemblance to what drives results for a neighbourhood salon.
                </p>
                <p>
                  Consumer intent also varies dramatically between sectors. Someone searching for &quot;dental clinic Al Malqa&quot; is ready to book an appointment today. Someone searching for &quot;apartments for rent Riyadh&quot; may be weeks into a research journey. Each scenario demands a different funnel, a different ad format, and a different message.
                </p>
                <p>
                  At Local City Solutions, we do not recycle generic campaign templates. Every strategy we build starts with your industry&apos;s specific customer journey, competitive landscape, and seasonal patterns — then layers in our deep knowledge of how Riyadh&apos;s consumers behave. The result is marketing that feels relevant, converts better, and delivers a higher return on every riyal you invest.
                </p>
              </div>
            </div>

            <div className="reveal delay-2 grid grid-cols-1 gap-4">
              {[
                {
                  title: "Industry-Tailored Keywords",
                  description: "We research the exact search terms your customers use — not generic phrases that waste budget.",
                },
                {
                  title: "Sector-Specific Ad Creative",
                  description: "Visuals and copy that resonate with your industry's audience and pass Saudi cultural expectations.",
                },
                {
                  title: "Relevant Competitor Analysis",
                  description: "We benchmark against your actual competitors, not unrelated businesses in different sectors.",
                },
                {
                  title: "Seasonal Campaign Planning",
                  description: "We plan around your industry's peaks — Ramadan for F&B, Hajj season for hospitality, school year for education.",
                },
              ].map((point) => (
                <div
                  key={point.title}
                  className="bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 hover:border-[#F5C518]/25 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F5C518]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4 text-[#F5C518]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{point.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
              { label: "Riyadh Coverage", href: "/riyadh" },
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "SEO Services", href: "/services/seo" },
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

      <CTABox />
    </main>
  );
}
