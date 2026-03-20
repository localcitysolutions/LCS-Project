import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "Digital Marketing Blog for Saudi Businesses | Local City Solutions",
  description:
    "Digital marketing insights, guides, and tips for Saudi businesses. SEO, Google Ads, Meta Ads, and local marketing advice for Riyadh.",
};

const posts = [
  {
    slug: "rank-on-google-maps-riyadh",
    title: "How to Rank on Google Maps in Riyadh (2026 Guide)",
    excerpt:
      "Ranking on Google Maps is the single highest-ROI move for any local business in Riyadh. This guide walks through Google Business Profile optimisation, review generation, and local citation building that actually moves the needle in Saudi search results.",
    date: "March 15, 2026",
    category: "SEO",
    readTime: "8 min read",
  },
  {
    slug: "google-ads-riyadh-guide",
    title: "Google Ads for Riyadh Businesses: Complete Beginner's Guide",
    excerpt:
      "Thinking about running Google Ads but not sure where to start? This beginner's guide covers campaign types, keyword research for Saudi audiences, budget setting, and the biggest mistakes Riyadh businesses make when advertising on Google.",
    date: "March 8, 2026",
    category: "Google Ads",
    readTime: "10 min read",
  },
  {
    slug: "local-seo-saudi-arabia",
    title: "Local SEO in Saudi Arabia: Everything You Need to Know",
    excerpt:
      "Local SEO in Saudi Arabia has its own rules. From Arabic keyword research and bilingual content strategy to building local backlinks from Saudi directories, this comprehensive guide covers every factor that affects your ranking in the Kingdom.",
    date: "February 28, 2026",
    category: "SEO",
    readTime: "12 min read",
  },
  {
    slug: "google-business-profile-saudi",
    title: "Why Every Saudi Business Needs a Google Business Profile",
    excerpt:
      "Over 70% of consumers in Saudi Arabia use Google to find local businesses before making a purchase decision. A well-optimised Google Business Profile puts your business in front of ready-to-buy customers at exactly the right moment — for free.",
    date: "February 20, 2026",
    category: "GBP",
    readTime: "6 min read",
  },
  {
    slug: "meta-ads-vs-google-ads-saudi",
    title: "Meta Ads vs Google Ads: Which is Better for Saudi Businesses?",
    excerpt:
      "Saudi Arabia has one of the world's highest social media usage rates, yet Google remains the dominant search engine. So which ad platform should your Riyadh business invest in? The honest answer depends on your industry, funnel, and goals — we break it all down.",
    date: "February 12, 2026",
    category: "Ads",
    readTime: "9 min read",
  },
  {
    slug: "web-design-trends-saudi-2026",
    title: "Website Design Trends for Saudi Businesses in 2026",
    excerpt:
      "Saudi consumers judge your credibility in under 3 seconds. This year's top web design trends — from RTL-first layouts and mobile performance to trust signals and Arabic typography — help Riyadh businesses convert visitors into paying customers.",
    date: "February 5, 2026",
    category: "Web Design",
    readTime: "7 min read",
  },
];

const categoryColors: Record<string, string> = {
  SEO: "bg-[#F5C518]/10 text-[#F5C518] border-[#F5C518]/20",
  "Google Ads": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  GBP: "bg-green-500/10 text-green-400 border-green-500/20",
  Ads: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Web Design": "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function BlogPage() {
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
              Blog
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Digital Marketing Insights{" "}
              <span className="text-[#F5C518]">for Saudi Businesses</span>
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              Actionable guides, practical tips, and up-to-date strategies for growing your business online in Riyadh and across Saudi Arabia. No filler — just what works in the Kingdom.
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

      {/* Blog Grid */}
      <section className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Latest Articles
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Learn, Grow, Dominate
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Written by our Riyadh-based digital marketing team with real Saudi market experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className={`reveal delay-${(i % 6) + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl overflow-hidden hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300 flex flex-col`}
              >
                {/* Category & read time */}
                <div className="px-5 pt-5 flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                      categoryColors[post.category] || "bg-[#F5C518]/10 text-[#F5C518] border-[#F5C518]/20"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-white/30 text-[10px]">{post.readTime}</span>
                </div>

                <div className="px-5 pb-5 flex flex-col flex-1">
                  <h2 className="text-white font-bold text-base md:text-lg leading-snug mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="text-white/30 text-xs">{post.date}</span>
                    <a
                      href={`/blog/${post.slug}`}
                      className="text-[#F5C518] text-xs font-semibold hover:underline"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Updated */}
      <section className="py-14 md:py-20 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0E1A2E] border border-white/[0.06] rounded-2xl p-8 md:p-12 text-center reveal">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h2 className="text-white font-bold text-2xl md:text-3xl mb-3">Stay Updated</h2>
            <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto mb-6">
              Get the latest digital marketing tips and Saudi market insights delivered straight to your WhatsApp. No spam — just value.
            </p>
            <a
              href="https://wa.me/966564229190?text=Hi%2C%20I%27d%20like%20to%20receive%20marketing%20tips%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1fb858] transition-all shadow-xl shadow-[#25D366]/25"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp for Latest Tips
            </a>
          </div>
        </div>
      </section>

      {/* Service links */}
      <section className="py-10 bg-[#0C1424] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/40 text-xs mb-4 font-semibold uppercase tracking-widest">Our Services</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "SEO Services", href: "/services/seo" },
              { label: "Google Ads", href: "/services/google-ads" },
              { label: "Google Business Profile", href: "/services/google-business-profile" },
              { label: "Meta Ads", href: "/services/meta-ads" },
              { label: "Web Design", href: "/services/web-design" },
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
