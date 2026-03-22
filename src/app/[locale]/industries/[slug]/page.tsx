import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

interface IndustryContent {
  metaTitle: string;
  metaDesc: string;
  tagline: string;
  heroDesc: string;
  features: { icon: string; title: string; desc: string }[];
  process: { num: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaSubtitle: string;
}

interface RelatedLink {
  label: string;
  href: string;
}

interface Industry {
  slug: string;
  icon: string;
  name: string;
  en: IndustryContent;
  relatedServices: RelatedLink[];
  relatedDistrict: RelatedLink;
}

const INDUSTRIES: Industry[] = [
  {
    slug: "restaurants",
    icon: "🍽️",
    name: "Restaurants & Cafes",
    en: {
      metaTitle: "Digital Marketing for Restaurants in Riyadh | Local City Solutions",
      metaDesc: "Specialized digital marketing for restaurants and cafes in Riyadh. Google Maps ranking, Instagram growth, delivery app integration, menu SEO, and Ramadan campaigns. Get found and get busy.",
      tagline: "Get found on Google Maps. Fill your tables. Grow your delivery orders.",
      heroDesc: "Google Maps is the #1 way Riyadh diners discover restaurants — 70% search before deciding where to eat. We help restaurants and cafes dominate local search, build a loyal social following, and grow delivery orders across HungerStation and Jahez.",
      features: [
        { icon: "📍", title: "Google Business Profile Optimization", desc: "Rank in the Maps 3-pack for 'restaurants near me', 'best café in Al Olaya', and every high-intent dining search in your area." },
        { icon: "📸", title: "Instagram & Visual Marketing", desc: "Food photography direction, Reels strategy, and content that makes people crave your dishes before they've stepped through the door." },
        { icon: "🛵", title: "Delivery App Integration", desc: "Optimize your HungerStation and Jahez listings for maximum visibility — menu photography, keyword-rich descriptions, and review management on both platforms." },
        { icon: "🔍", title: "Menu SEO & Website Optimization", desc: "Structured menu pages, schema markup, and keyword-optimized content so your restaurant appears for dish-specific searches like 'wagyu burger Riyadh'." },
        { icon: "⭐", title: "Review Management", desc: "Systematic strategies to generate a consistent stream of 5-star Google and Zomato reviews — and professional responses to every review, positive or negative." },
        { icon: "🌙", title: "Seasonal Campaigns", desc: "Ramadan iftar promotions, Eid offers, National Day campaigns — timed, targeted, and designed to pack your restaurant during every peak season." },
      ],
      process: [
        { num: "01", title: "Audit Your Presence", desc: "We assess your Google Maps ranking, delivery app visibility, social media performance, and competitor positioning in your area." },
        { num: "02", title: "Build Your Strategy", desc: "Custom plan targeting your biggest gaps — whether that's Maps ranking, social growth, delivery orders, or all three." },
        { num: "03", title: "Execute & Publish", desc: "GBP optimization, content creation, delivery listing improvements, and campaign launches — done for you, consistently." },
        { num: "04", title: "Track & Optimize", desc: "Monthly reports on foot traffic impact, Maps ranking changes, delivery order growth, and social reach." },
      ],
      faq: [
        { q: "How important is Google Maps for restaurants in Riyadh?", a: "Critically important. Google Maps is the #1 discovery channel for restaurants — more than Instagram or word of mouth for new customers. When someone searches 'restaurant near me' or 'best shawarma in Al Malqa', Google shows a 3-pack of map results above everything else. Not being in that 3-pack is equivalent to being invisible to an enormous pool of hungry, ready-to-spend customers." },
        { q: "Should I focus on Google or Instagram for my restaurant?", a: "Both, but for different purposes. Google Maps captures high-intent customers who are actively searching for somewhere to eat right now. Instagram builds brand awareness, showcases your food visually, and builds a loyal community that returns repeatedly. The most successful Riyadh restaurants invest in both — Google for discovery, Instagram for loyalty." },
        { q: "How do I get more orders on HungerStation and Jahez?", a: "Delivery app algorithms favor listings with high ratings, quality photos, keyword-rich menu descriptions, and consistent order completion rates. We optimize your listing content, manage your review profile on both platforms, and run targeted delivery campaigns to boost your visibility to app users searching in your delivery zone." },
      ],
      ctaHeading: "Fill More Tables. Grow Your Delivery Orders.",
      ctaSubtitle: "Get a free restaurant marketing audit and see exactly how your Riyadh location stacks up against competitors — and how to beat them.",
    },
    relatedServices: [
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Google Business Profile", href: "/en/services/google-business-profile" },
      { label: "Meta Ads", href: "/en/services/meta-ads" },
    ],
    relatedDistrict: { label: "Al Olaya District", href: "/en/riyadh/al-olaya" },
  },
  {
    slug: "clinics",
    icon: "🏥",
    name: "Clinics & Healthcare",
    en: {
      metaTitle: "Digital Marketing for Clinics & Healthcare in Riyadh | Local City Solutions",
      metaDesc: "Specialized digital marketing for clinics and healthcare providers in Riyadh. Medical SEO, doctor profiles, patient reviews, Google Ads for healthcare, and CBAHI-compliant content.",
      tagline: "More patients. Stronger reputation. Full appointment books.",
      heroDesc: "Patients in Riyadh search Google before booking any appointment. Whether they're looking for a dentist in Al Malqa or a dermatologist in Al Olaya, digital presence determines who gets the call. We help clinics and healthcare providers attract the right patients and build an unshakeable online reputation.",
      features: [
        { icon: "🔍", title: "Medical SEO", desc: "Rank on page one for high-value searches like 'dentist in Al Malqa', 'dermatologist Riyadh', and procedure-specific queries that bring in ready-to-book patients." },
        { icon: "👨‍⚕️", title: "Doctor & Specialist Profiles", desc: "Optimized profiles for individual doctors that build trust, showcase credentials, and make it easy for patients to choose your clinic over competitors." },
        { icon: "⭐", title: "Patient Review Management", desc: "Build a consistent 5-star review presence on Google and Doctorna. Respond professionally to all feedback. Reviews are the #1 factor patients use to choose a clinic." },
        { icon: "📅", title: "Appointment Booking Integration", desc: "Streamlined online booking via your website, WhatsApp Business, and Google's 'Book Online' feature — reducing no-shows and call volume simultaneously." },
        { icon: "📢", title: "Google Ads for Healthcare", desc: "Precision-targeted campaigns for specific procedures and specialties, appearing at the top of results when patients are actively searching for care." },
        { icon: "📍", title: "GBP for Clinics", desc: "Fully optimized Google Business Profile showing your specialties, doctors, hours, insurance accepted, and a steady stream of verified patient reviews." },
      ],
      process: [
        { num: "01", title: "Clinic Audit", desc: "Full review of your current search rankings, GBP quality, review profile, website speed, and competitor positioning in your specialty and area." },
        { num: "02", title: "Patient Journey Mapping", desc: "Identify how patients in your target area search for your specialty and where they convert — then optimize every touchpoint." },
        { num: "03", title: "Launch Campaigns", desc: "SEO optimization, Google Ads launch, GBP enhancement, and review generation strategy — all implemented within the first 30 days." },
        { num: "04", title: "Monthly Reporting", desc: "Clear reports on new patient inquiries, keyword rankings, review growth, and ad performance — so you know exactly what's working." },
      ],
      faq: [
        { q: "Is healthcare advertising regulated in Saudi Arabia?", a: "Yes. Saudi healthcare advertising must comply with Ministry of Health regulations and CBAHI guidelines — including restrictions on before/after images, guarantees of outcomes, and claims about treatments. All our healthcare content is created with full compliance awareness. We never run campaigns that risk your CBAHI accreditation or MOH standing." },
        { q: "Which specialties benefit most from digital marketing in Riyadh?", a: "Dental, dermatology, ophthalmology, and general practice see the strongest ROI from digital marketing because patients actively search for these services. Cosmetic procedures (laser, aesthetics), physiotherapy, and pediatrics also perform exceptionally well. Highly specialized fields rely more on GP referrals, but still benefit from strong GBP presence and doctor profiles." },
        { q: "How do I encourage patients to leave Google reviews?", a: "The most effective method is a simple, automated post-visit WhatsApp message with a direct Google review link — sent within 2 hours of the appointment while the experience is fresh. We set this up for every clinic we work with. Clinics using this system typically see 3–5x more monthly reviews within the first 60 days." },
      ],
      ctaHeading: "Grow Your Patient Base in Riyadh",
      ctaSubtitle: "Get a free clinic marketing audit and discover exactly how to attract more patients in your specialty and area.",
    },
    relatedServices: [
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Google Ads", href: "/en/services/google-ads" },
      { label: "Google Business Profile", href: "/en/services/google-business-profile" },
    ],
    relatedDistrict: { label: "Al Malqa District", href: "/en/riyadh/al-malqa" },
  },
  {
    slug: "salons",
    icon: "💇",
    name: "Salons & Beauty",
    en: {
      metaTitle: "Digital Marketing for Salons & Beauty in Riyadh | Local City Solutions",
      metaDesc: "Digital marketing for salons and beauty centers in Riyadh. Instagram visual marketing, Maps ranking, booking integration, Eid and wedding campaigns — built for Saudi beauty businesses.",
      tagline: "More bookings. A bigger Instagram following. A packed calendar.",
      heroDesc: "The Saudi beauty market is booming — and competition on Google Maps and Instagram has never been fiercer. Salons that win combine strong Maps visibility with a visually stunning social presence and seamless online booking. We build exactly that for salons and beauty centers across Riyadh.",
      features: [
        { icon: "📸", title: "Instagram Visual Marketing", desc: "Before/after galleries, Reels transformations, and a curated aesthetic that stops the scroll and converts followers into bookings." },
        { icon: "📍", title: "Google Maps Ranking", desc: "Dominate local searches like 'hair salon near me', 'nail salon in Hittin', and 'best ladies salon Riyadh' — where the majority of new bookings originate." },
        { icon: "📅", title: "Booking Integration", desc: "Frictionless appointment booking via Fresha, Booksy, or WhatsApp Business — directly from your Instagram profile, Google listing, and website." },
        { icon: "⭐", title: "Review Generation", desc: "Consistent 5-star reviews on Google and Treatwell, with professional responses that show new clients how much you care about every experience." },
        { icon: "🌙", title: "Seasonal Campaigns", desc: "Eid beauty packages, wedding season campaigns, Ramadan offers, and National Day promotions — designed and executed at exactly the right moment." },
        { icon: "🤳", title: "Influencer Marketing", desc: "Collaborate with Riyadh beauty influencers for authentic before/after content that reaches tens of thousands of your ideal clients." },
      ],
      process: [
        { num: "01", title: "Beauty Audit", desc: "Assess your Maps ranking, Instagram performance, booking system, review profile, and competitor positioning in your neighborhood." },
        { num: "02", title: "Visual Brand Strategy", desc: "Define your aesthetic, content pillars, and brand voice — the foundation that makes your salon instantly recognizable on social media." },
        { num: "03", title: "Execute & Grow", desc: "Content creation, posting schedule, GBP optimization, booking setup, and review campaigns — all handled for you." },
        { num: "04", title: "Scale & Report", desc: "Monthly reporting on new bookings sourced from digital, follower growth, Maps ranking movement, and campaign performance." },
      ],
      faq: [
        { q: "Is Instagram or Google Maps more important for salons in Riyadh?", a: "Both are essential but serve different roles. Google Maps captures high-intent searches — someone actively looking for a salon near them right now. Instagram builds brand desire and community — someone follows you, sees beautiful transformations repeatedly, and books when they're ready. The salons with the most packed calendars in Riyadh invest seriously in both channels simultaneously." },
        { q: "How can I get more 5-star Google reviews for my salon?", a: "The most effective trigger is timing. Send a WhatsApp message with your Google review link within 1–2 hours after a client's appointment — while they're still glowing from their treatment. Include their name and a photo of their finished look if you can. Salons using this approach consistently see review velocity increase 4–6x within 90 days." },
        { q: "What booking platforms work best for Riyadh salons?", a: "Fresha is the most popular globally and works well for Riyadh salons serving international clientele. For a majority-Saudi clientele, WhatsApp Business with a clear booking message flow often converts better because it's the communication channel they're most comfortable with. We set up and optimize whichever system fits your client profile." },
      ],
      ctaHeading: "Fill Your Appointment Book in Riyadh",
      ctaSubtitle: "Get a free salon marketing audit and discover exactly how to grow your bookings and social following in your area.",
    },
    relatedServices: [
      { label: "Meta Ads", href: "/en/services/meta-ads" },
      { label: "Google Business Profile", href: "/en/services/google-business-profile" },
      { label: "Social Media Marketing", href: "/en/services/social-media" },
    ],
    relatedDistrict: { label: "Hittin District", href: "/en/riyadh/hittin" },
  },
  {
    slug: "real-estate",
    icon: "🏠",
    name: "Real Estate",
    en: {
      metaTitle: "Digital Marketing for Real Estate in Riyadh | Local City Solutions",
      metaDesc: "Digital marketing for real estate companies in Riyadh. Property listing SEO, Google Ads for developers, virtual tours, Aqar.fm optimization, and lead generation under Vision 2030.",
      tagline: "More leads. More listings. More closings in Riyadh's booming market.",
      heroDesc: "Riyadh's real estate market is expanding at historic rates under Vision 2030 — new developments, rising demand, and an increasingly sophisticated buyer. We help real estate companies, developers, and agents capture buyers and investors at every stage of the search journey, from first Google search to signed contract.",
      features: [
        { icon: "🔍", title: "Property Listing SEO", desc: "Optimize property listings and development pages to rank for high-intent searches like 'apartments for sale in KAFD', 'villas in Al Narjis', and 'off-plan projects Riyadh'." },
        { icon: "📢", title: "Google Ads for Real Estate", desc: "Precision lead generation campaigns targeting serious buyers and investors searching for properties in specific Riyadh districts and price brackets." },
        { icon: "🎬", title: "Virtual Tours & Video Marketing", desc: "360° virtual tours, drone footage, and project showcase videos that sell the lifestyle before buyers visit in person." },
        { icon: "🏢", title: "Developer Project Launches", desc: "Full-funnel digital campaigns for new development launches — from awareness and interest generation to qualified lead capture and handover to sales teams." },
        { icon: "🔑", title: "Aqar.fm & Portal Optimization", desc: "Optimized listings on Aqar.fm, Bayut, and other Saudi property portals to maximize visibility and lead volume from portal traffic." },
        { icon: "📍", title: "GBP for Real Estate Offices", desc: "Google Business Profile optimization for agency offices and developer showrooms to capture walk-in and call traffic from local searches." },
      ],
      process: [
        { num: "01", title: "Market Analysis", desc: "Assess the competitive landscape for your property types, districts, and price points — identifying the highest-ROI digital channels for your inventory." },
        { num: "02", title: "Lead Generation Setup", desc: "Build landing pages, configure Google Ads campaigns, and create lead capture flows designed specifically for property buyers." },
        { num: "03", title: "Launch & Qualify", desc: "Go live across all channels with lead qualification criteria built in — so your sales team only speaks to serious buyers and investors." },
        { num: "04", title: "Optimize for Cost Per Lead", desc: "Continuous campaign optimization to reduce cost per qualified lead and increase the volume of sales-ready prospects." },
      ],
      faq: [
        { q: "What digital channels work best for real estate lead generation in Riyadh?", a: "Google Ads is the highest-intent channel — buyers actively searching for property right now. Meta Ads (Instagram/Facebook) works exceptionally well for off-plan and luxury projects where you're selling lifestyle and aspiration. For residential resale, strong Aqar.fm listings combined with GBP for your office consistently deliver high-quality local leads. The best results come from running all three simultaneously." },
        { q: "How do I market a new development launch in Riyadh?", a: "A successful launch requires a phased approach: 6–8 weeks pre-launch to build awareness and interest (Instagram content, teaser ads, landing page), a launch week push (Google Ads, Meta Ads, email/WhatsApp to captured leads), then sustained post-launch campaigns to keep the pipeline full. We manage this entire cycle for developer clients and consistently deliver oversubscribed launches." },
        { q: "Is Aqar.fm or Google Ads better for property leads in Saudi Arabia?", a: "They serve different intent levels. Aqar.fm attracts buyers already deep in their property search — high intent, close to decision. Google Ads captures buyers earlier in the journey and allows much more precise targeting by district, property type, and budget range. Meta Ads works best for building brand awareness and capturing early-stage interest. For maximum lead volume, use all three and let data tell you which channel delivers the best cost per qualified lead for your specific property type." },
      ],
      ctaHeading: "Capture More Real Estate Leads in Riyadh",
      ctaSubtitle: "Get a free real estate marketing audit and discover the fastest path to more qualified buyers for your properties.",
    },
    relatedServices: [
      { label: "Google Ads", href: "/en/services/google-ads" },
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Web Design", href: "/en/services/web-design" },
    ],
    relatedDistrict: { label: "KAFD District", href: "/en/riyadh/kafd" },
  },
];

const SLUGS = INDUSTRIES.map((ind) => ind.slug);

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((ind) => ind.slug === slug);
  if (!industry) return {};
  return {
    title: industry.en.metaTitle,
    description: industry.en.metaDesc,
    alternates: {
      languages: {
        en: `https://localcitysolutions.com/en/industries/${slug}`,
      },
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const industry = INDUSTRIES.find((ind) => ind.slug === slug);
  if (!industry) notFound();
  const c = industry.en;
  const p = `/${locale}`;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.08) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse" />
            <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-widest">Industry Expertise</span>
          </div>
          <div className="text-5xl mb-4">{industry.icon}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            Digital Marketing for {industry.name} in Riyadh
          </h1>
          <p className="text-[#F5C518] font-semibold text-base md:text-lg mb-4">{c.tagline}</p>
          <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">{c.heroDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#e6b800] transition-all shadow-xl shadow-[#F5C518]/20">
              Get Free Audit →
            </a>
            <Link href={`${p}/contact`} className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-all">
              Talk to Our Team →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">What We Offer</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Our {industry.name} Marketing Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal delay-1">
            {c.features.map((f, i) => (
              <div key={i} className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 hover:border-[#F5C518]/20 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">Our Process</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">How We Work</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal delay-1">
            {c.process.map((step, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] text-[#F5C518] font-black text-base md:text-xl mb-3 md:mb-4 mx-auto">{step.num}</div>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">Common Questions</h2>
          </div>
          <div className="space-y-4 reveal delay-1">
            {c.faq.map((item, i) => (
              <details key={i} className="group bg-[#0E1A2E] border border-white/5 rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-white font-semibold text-sm pr-4">{item.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518] text-sm font-bold group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 border-t border-white/5">
                  <p className="text-white/60 text-sm leading-relaxed pt-4">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="bg-[#080E1A] py-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Related Services</p>
              <div className="flex flex-wrap gap-2">
                {industry.relatedServices.map((link) => (
                  <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Key District</p>
              <Link href={industry.relatedDistrict.href} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all">
                {industry.relatedDistrict.label}
              </Link>
            </div>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">All Industries</p>
              <Link href={`${p}/industries`} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all">
                View All Industries →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABox heading={c.ctaHeading} subtitle={c.ctaSubtitle} locale="en" bg="dark" />
    </>
  );
}
