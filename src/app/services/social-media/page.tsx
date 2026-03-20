import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Social Media Marketing in Riyadh | Local City Solutions",
  description:
    "Social media management for Riyadh businesses. Instagram, Snapchat, TikTok, Facebook, LinkedIn content creation and community management.",
};

const platforms = [
  {
    name: "Instagram",
    desc: "The dominant visual platform in Saudi Arabia. We manage your feed, Reels, and Stories with Arabic and English content designed to build followers and drive enquiries.",
  },
  {
    name: "Facebook",
    desc: "Reach Saudi Arabia's 21M+ Facebook users with consistent branded content, community engagement, and event promotion tailored to your audience.",
  },
  {
    name: "Snapchat",
    desc: "Saudi Arabia has one of the highest Snapchat penetration rates in the world. We create Snaps and Stories that reach Saudi youth and young professionals where they are most active.",
  },
  {
    name: "TikTok",
    desc: "Short-form video is exploding in KSA. We produce TikTok content that showcases your brand authentically and taps into trending Saudi topics and sounds.",
  },
  {
    name: "LinkedIn",
    desc: "Essential for B2B brands, consultancies, and professional services. We position your business as a thought leader in the Riyadh corporate community.",
  },
  {
    name: "X (Twitter)",
    desc: "Saudi Arabia has one of the most active Twitter/X user bases in the Arab world. We craft timely, culturally aware content that drives engagement and brand conversations.",
  },
];

const services = [
  {
    title: "Content Strategy",
    desc: "A monthly content calendar built around your brand voice, business goals, and Saudi cultural calendar — including Ramadan, Saudi National Day, and Founding Day campaigns.",
  },
  {
    title: "Arabic & English Content Creation",
    desc: "Bilingual graphics, video, and copy produced by our in-house creative team. Every asset is designed for Saudi aesthetics and native Arabic communication.",
  },
  {
    title: "Community Management",
    desc: "We respond to comments, messages, and mentions in Arabic and English — keeping your audience engaged and your brand reputation protected around the clock.",
  },
  {
    title: "Analytics & Reporting",
    desc: "Monthly performance reports covering followers, reach, engagement rate, and content insights. We tell you what's working and why, and adjust strategy accordingly.",
  },
];

const saudiFacts = [
  {
    title: "Saudi Arabia Is Among the Most Social Nations on Earth",
    desc: "Saudi internet users spend an average of 3 hours per day on social media — above the global average. Social media is not optional for Saudi businesses; it is the primary channel for brand discovery.",
  },
  {
    title: "Arabic Content Outperforms English by 3x in Engagement",
    desc: "Saudi audiences engage significantly more with brands that communicate in Arabic. Our bilingual approach ensures you connect with the full breadth of Riyadh's consumer market.",
  },
  {
    title: "Snapchat and TikTok Are Saudi-Specific Opportunities",
    desc: "Platforms like Snapchat and TikTok are uniquely dominant in Saudi Arabia compared to global averages. Businesses that capitalise on these platforms early gain a significant advantage over competitors.",
  },
];

const faqs = [
  {
    q: "How many posts per month do you create?",
    a: "Our packages typically include 12–20 posts per month per platform, depending on the plan. We tailor the content mix — graphics, Reels, Stories, carousels — to each platform's best-performing formats.",
  },
  {
    q: "Do you create content in Arabic?",
    a: "Yes. All our social media content is available in both Arabic and English. Our Arabic content is written by native speakers who understand Saudi culture, not translated by software.",
  },
  {
    q: "Can you grow my follower count?",
    a: "We focus on organic, engaged follower growth through consistent quality content and community management. We do not use bots or fake followers — only real Saudi users who are genuinely interested in your brand.",
  },
  {
    q: "Do you handle Ramadan and seasonal campaigns?",
    a: "Absolutely. We plan ahead for Ramadan, Eid, Saudi National Day, Founding Day, and other key moments in the Saudi calendar — creating culturally appropriate campaigns that resonate deeply with Saudi audiences.",
  },
];

export default function SocialMediaPage() {
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
              Social Media Marketing
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Grow Your Brand on Social Media in Riyadh
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              We manage your social media presence across every major platform in Saudi Arabia. Bilingual content, cultural expertise, and consistent posting — so you can focus on running your business.
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

      {/* Platforms We Manage */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Platforms
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Platforms We Manage
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              From Instagram to Snapchat, we manage every platform Saudi consumers use daily.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {platforms.map((platform, i) => (
              <div
                key={platform.name}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <h3 className="text-[#F5C518] font-bold text-lg mb-2">{platform.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              What We Deliver
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Our Social Media Services
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              A full-service social media management offering — strategy, creation, management, and reporting.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((item, i) => (
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

      {/* Why Social Media in Saudi Arabia */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              The Saudi Opportunity
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Why Social Media Matters in Saudi Arabia
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Saudi Arabia is one of the world's most engaged social media markets. Here's why that matters for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {saudiFacts.map((fact, i) => (
              <div
                key={fact.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-8 h-8 rounded-full bg-[#F5C518]/10 flex items-center justify-center mb-4">
                  <span className="text-[#F5C518] font-bold text-sm">{i + 1}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{fact.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{fact.desc}</p>
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
              { label: "Meta Ads", href: "/services/meta-ads" },
              { label: "Digital Marketing", href: "/services/digital-marketing" },
              { label: "All Services", href: "/services" },
              { label: "Industries We Serve", href: "/industries" },
              { label: "Contact Us", href: "/contact" },
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
