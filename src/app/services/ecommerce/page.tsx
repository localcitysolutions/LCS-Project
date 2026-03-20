import type { Metadata } from "next";
import CTABox from "@/components/CTABox";

export const metadata: Metadata = {
  title: "E-commerce Management in Saudi Arabia | Local City Solutions",
  description:
    "E-commerce setup and management for Saudi businesses. Salla, Zid, WooCommerce, Shopify. Mada, STC Pay, Apple Pay integration.",
};

const platforms = [
  {
    name: "Salla",
    tag: "Saudi-Native",
    desc: "Saudi Arabia's leading e-commerce platform, built specifically for the Saudi market. Includes native Arabic RTL support, local payment gateways, and VAT compliance built in. Ideal for most Saudi retailers.",
  },
  {
    name: "Zid",
    tag: "Saudi-Native",
    desc: "Another Saudi-built platform optimised for the Kingdom's regulations and consumer behaviour. Zid offers excellent integration with Saudi logistics providers and local payment methods.",
  },
  {
    name: "WooCommerce",
    tag: "WordPress",
    desc: "A powerful, flexible open-source platform ideal for businesses that want full control over their store. We build and customise WooCommerce stores with Arabic support and Saudi payment gateway integration.",
  },
  {
    name: "Shopify",
    tag: "Global",
    desc: "A globally trusted platform with a strong ecosystem of apps and themes. We set up and optimise Shopify stores for Saudi businesses, including Arabic translations and local payment methods.",
  },
];

const ecomServices = [
  {
    title: "Store Setup & Design",
    desc: "We design and build your online store from the ground up — a professional, mobile-first Arabic and English storefront that converts visitors into buyers on any platform.",
  },
  {
    title: "Product Management",
    desc: "We handle product listings, descriptions, pricing, categories, and inventory management in both Arabic and English — keeping your catalogue accurate and optimised for search.",
  },
  {
    title: "Payment Integration",
    desc: "We integrate all major Saudi payment methods — Mada, STC Pay, Apple Pay, Tabby (buy now, pay later), Tamara, PayTabs, and Moyasar — so Saudi customers can pay the way they prefer.",
  },
  {
    title: "SEO & Marketing",
    desc: "We optimise your store for Google and drive traffic through search, social, and paid campaigns — turning your store into a 24/7 sales engine for the Saudi market.",
  },
];

const paymentMethods = [
  "Mada",
  "STC Pay",
  "Apple Pay",
  "Tabby",
  "Tamara",
  "PayTabs",
  "Moyasar",
];

const faqs = [
  {
    q: "Which e-commerce platform is best for a Saudi business?",
    a: "For most Saudi businesses, we recommend Salla or Zid — they are built specifically for the Saudi market with native Arabic support, VAT compliance, and local payment gateways out of the box. For businesses with complex requirements or international ambitions, WooCommerce or Shopify may be more appropriate. We advise on the best fit during your free consultation.",
  },
  {
    q: "Can you migrate my existing store to a new platform?",
    a: "Yes. We handle full store migrations including products, categories, customer data, and order history. We ensure your new store is live with zero data loss and minimal downtime.",
  },
  {
    q: "Do you handle VAT setup for Saudi e-commerce?",
    a: "Yes. We configure your store with the correct Saudi VAT (15%) settings, VAT-compliant invoicing, and ZATCA requirements — so you are fully compliant with Saudi tax regulations from day one.",
  },
  {
    q: "Can you integrate buy-now-pay-later options like Tabby or Tamara?",
    a: "Absolutely. Buy-now-pay-later options like Tabby and Tamara are increasingly popular in Saudi Arabia and can significantly increase average order value. We integrate both into any compatible platform.",
  },
];

export default function EcommercePage() {
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
              E-commerce
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Sell More Online in Saudi Arabia
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              We build, manage, and grow e-commerce stores for Saudi businesses on Salla, Zid, WooCommerce, and Shopify. Full Arabic support, local payment integration, and VAT compliance — all handled for you.
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

      {/* Platforms */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Platforms
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Platforms We Work With
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              From Saudi-native platforms to global leaders — we build and manage stores on the right platform for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {platforms.map((platform, i) => (
              <div
                key={platform.name}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-white font-bold text-lg">{platform.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-semibold border border-[#F5C518]/20">
                    {platform.tag}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-commerce Services */}
      <section className="py-16 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              What We Do
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Our E-commerce Services
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              Everything you need to launch, run, and grow a successful online store in Saudi Arabia.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ecomServices.map((item, i) => (
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

      {/* Payment Methods */}
      <section className="py-16 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              Payments
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              Saudi Payment Methods We Integrate
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              We integrate every major Saudi payment gateway so your customers can pay the way they prefer — increasing checkout conversion and reducing cart abandonment.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 reveal delay-1">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-5 py-2.5 rounded-full bg-[#0E1A2E] border border-[#F5C518]/20 text-[#F5C518] text-sm font-semibold hover:bg-[#F5C518]/10 transition-all"
              >
                {method}
              </span>
            ))}
          </div>
          <p className="text-center text-white/35 text-xs mt-8 reveal delay-2">
            Mada is Saudi Arabia's national debit network and the most-used payment method in the Kingdom. STC Pay, Apple Pay, Tabby, and Tamara are all essential for maximising checkout completion rates.
          </p>
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
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Related Services</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 reveal delay-1">
            {[
              { label: "Web Design", href: "/services/web-design" },
              { label: "Google Ads", href: "/services/google-ads" },
              { label: "SEO", href: "/services/seo" },
              { label: "Digital Marketing", href: "/services/digital-marketing" },
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
