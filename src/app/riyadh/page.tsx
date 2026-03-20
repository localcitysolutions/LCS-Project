import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Digital Marketing Across All Riyadh Districts | Local City Solutions",
  description:
    "Local City Solutions serves all 20+ Riyadh districts. Hyperlocal SEO, Google Ads, and digital marketing for every neighborhood in the capital.",
};

const zones = [
  {
    name: "North Riyadh",
    color: "from-[#F5C518]/10 to-transparent",
    districts: [
      { name: "Al Malqa", slug: "al-malqa" },
      { name: "Al Nakheel", slug: "al-nakheel" },
      { name: "Al Yasmin", slug: "al-yasmin" },
      { name: "Hittin", slug: "hittin" },
      { name: "Al Narjis", slug: "al-narjis" },
      { name: "Al Arid", slug: "al-arid" },
      { name: "Al Worood", slug: "al-worood" },
    ],
  },
  {
    name: "Central Riyadh",
    color: "from-blue-500/10 to-transparent",
    districts: [
      { name: "Al Olaya", slug: "al-olaya" },
      { name: "Al Sulaimaniyah", slug: "al-sulaimaniyah" },
      { name: "Al Murabba", slug: "al-murabba" },
      { name: "Al Rawdah", slug: "al-rawdah" },
      { name: "KAFD", slug: "kafd" },
      { name: "King Fahd District", slug: "king-fahd-district" },
    ],
  },
  {
    name: "East Riyadh",
    color: "from-green-500/10 to-transparent",
    districts: [
      { name: "Al Naseem", slug: "al-naseem" },
      { name: "Ishbiliyah", slug: "ishbiliyah" },
      { name: "Al Aziziyah", slug: "al-aziziyah" },
    ],
  },
  {
    name: "West & South Riyadh",
    color: "from-purple-500/10 to-transparent",
    districts: [
      { name: "Al Sahafah", slug: "al-sahafah" },
      { name: "Al Shifa", slug: "al-shifa" },
      { name: "Tuwaiq", slug: "tuwaiq" },
      { name: "Diriyah", slug: "diriyah" },
    ],
  },
];

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Customers Search Locally",
    description:
      "Riyadh residents search for &quot;near me&quot; and district-specific terms constantly. Ranking in the right neighbourhood puts your business in front of buyers who are minutes away.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Demographics Differ by District",
    description:
      "Al Malqa and Hittin attract affluent North Riyadh families. Al Olaya targets corporate professionals. Al Aziziyah serves a different demographic entirely. Each district needs its own message.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Lower Ad Spend, Higher ROI",
    description:
      "Hyperlocal targeting reduces wasted ad impressions and lowers your cost per click. You pay only to reach customers in the districts where you actually do business.",
  },
];

const serviceLinks = [
  { label: "Local SEO", href: "/services/seo", icon: "🔍" },
  { label: "Google Ads", href: "/services/google-ads", icon: "📊" },
  { label: "Google Business Profile", href: "/services/google-business-profile", icon: "📍" },
  { label: "Meta Ads", href: "/services/meta-ads", icon: "📱" },
];

export default function RiyadhPage() {
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
              Riyadh Coverage
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              We Serve Every District{" "}
              <span className="text-[#F5C518]">in Riyadh</span>
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              Hyperlocal digital marketing for every neighbourhood, district, and zone in the Saudi capital. From Al Malqa in the north to Tuwaiq in the west — we know your customers&apos; streets as well as you do.
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

      {/* Intro */}
      <section className="py-10 md:py-16 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl reveal">
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Riyadh is not a monolith. The capital spans over 1,500 km² and encompasses dozens of distinct districts, each with its own character, demographics, and consumer behaviour. A clinic in Al Narjis serves a different patient profile than one in Al Shifa. A restaurant in KAFD competes differently from one in Al Aziziyah.
            </p>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4">
              That is why Local City Solutions builds hyperlocal marketing strategies — targeting the specific districts where your customers live, work, and spend. Whether you need to dominate your immediate neighbourhood or expand across multiple Riyadh zones, we have the local knowledge and the tools to make it happen. Explore our coverage below or{" "}
              <a href="/contact" className="text-[#F5C518] hover:underline">
                get in touch
              </a>{" "}
              to discuss your specific area.
            </p>
          </div>
        </div>
      </section>

      {/* Districts by Zone */}
      <section className="py-14 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              District Coverage
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Districts by Zone
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Click any district to learn about our hyperlocal marketing services for that area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {zones.map((zone, zi) => (
              <div
                key={zone.name}
                className={`reveal delay-${zi + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-7 hover:border-[#F5C518]/15 transition-all duration-300`}
              >
                <div className={`inline-block bg-gradient-to-r ${zone.color} rounded-lg px-3 py-1 mb-4`}>
                  <h3 className="text-white font-bold text-sm md:text-base">{zone.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {zone.districts.map((district) => (
                    <a
                      key={district.slug}
                      href={`/riyadh/${district.slug}`}
                      className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-[#F5C518]/50 hover:text-[#F5C518] transition-all"
                    >
                      {district.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Targeting Matters */}
      <section className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Why It Matters
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Why Local Targeting Matters in Riyadh
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Broad targeting wastes budget. Hyperlocal precision wins customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-7 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5C518]/10 flex items-center justify-center mb-5">
                  {reason.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{reason.title}</h3>
                <p
                  className="text-white/50 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: reason.description }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Riyadh Services */}
      <section className="py-14 md:py-20 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Our Services
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white">
              Our Riyadh Services
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-xl mx-auto text-xs md:text-base">
              Every service we offer is optimised for Riyadh businesses and Saudi search behaviour.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceLinks.map((service, i) => (
              <a
                key={service.href}
                href={service.href}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3`}
              >
                <span className="text-2xl">{service.icon}</span>
                <span className="text-white font-medium text-sm">{service.label}</span>
                <svg className="w-4 h-4 text-[#F5C518] ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
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

      <CTABox />
    </main>
  );
}
