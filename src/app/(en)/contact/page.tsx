import type { Metadata } from "next";
import CTABox from "@/components/CTABox";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Local City Solutions | Digital Marketing Agency Riyadh",
  description:
    "Get in touch with Local City Solutions. Call, WhatsApp, or email our Riyadh digital marketing team. Free consultation available.",
};

const contactItems = [
  {
    icon: (
      <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "+966 564 229 190",
    href: "tel:+966564229190",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "hello@localcitysolutions.com",
    href: "mailto:hello@localcitysolutions.com",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Riyadh, Saudi Arabia",
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Business Hours",
    value: "Sunday–Thursday, 9am–6pm KSA",
    href: null,
  },
];

const nextSteps = [
  {
    step: "01",
    title: "We Review Your Info",
    description:
      "Our team reviews your business details, website, and current digital presence to understand your starting point.",
  },
  {
    step: "02",
    title: "We Schedule a Call",
    description:
      "A senior strategist will reach out within 24 hours to learn about your goals and answer any questions you have.",
  },
  {
    step: "03",
    title: "You Receive Your Audit",
    description:
      "We deliver a personalised digital marketing audit with clear, actionable recommendations — completely free, no obligation.",
  },
];

export default function ContactPage() {
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
              Contact Us
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              Let&apos;s Grow Your Business{" "}
              <span className="text-[#F5C518]">Together</span>
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              Whether you have a specific project in mind or just want to explore your options, we are ready to listen. Reach out via WhatsApp, phone, or the form below — we respond fast.
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

      {/* Two-column contact layout */}
      <section className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* LEFT — Contact Info */}
            <div className="reveal">
              <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4">
                Get In Touch
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                We&apos;re Here to Help
              </h2>

              {/* WhatsApp CTA */}
              <div className="bg-[#0E1A2E] border border-[#25D366]/20 rounded-xl p-5 mb-5">
                <p className="text-white/60 text-sm mb-3">
                  The fastest way to reach us — our team responds on WhatsApp within minutes during business hours.
                </p>
                <a
                  href="https://wa.me/966564229190"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-sm hover:bg-[#1fb858] transition-all shadow-lg shadow-[#25D366]/25"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message Us on WhatsApp
                </a>
              </div>

              {/* Contact details */}
              <div className="space-y-3 mb-5">
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 bg-[#0E1A2E] border border-white/[0.06] rounded-xl px-4 py-3.5"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white/80 text-sm hover:text-[#F5C518] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white/80 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F5C518]/[0.05] border border-[#F5C518]/15 rounded-xl px-4 py-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F5C518] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-[#F5C518]/80 text-xs">
                  Fastest response: WhatsApp us directly — we reply within minutes.
                </p>
              </div>

              {/* Internal links */}
              <div className="mt-8 pt-6 border-t border-white/[0.05]">
                <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">Quick Links</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Our Services", href: "/services" },
                    { label: "Free Audit", href: "/free-audit" },
                    { label: "About Us", href: "/about" },
                    { label: "Digital Marketing", href: "/services/digital-marketing" },
                    { label: "Riyadh Coverage", href: "/riyadh" },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="px-3 py-1.5 rounded-full border border-white/15 text-white/50 text-xs hover:border-[#F5C518]/50 hover:text-[#F5C518] transition-all"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — Contact Form */}
            <div className="reveal delay-2">
              <div className="bg-[#0E1A2E] border border-white/[0.06] rounded-2xl p-6 md:p-8">
                <h2 className="text-white font-bold text-xl md:text-2xl mb-2">Send Us a Message</h2>
                <p className="text-white/45 text-sm mb-6">
                  Tell us about your business and goals. We&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-14 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              The Process
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
              What Happens Next
            </h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">
              From your first message to your free audit — here is exactly what to expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextSteps.map((item, i) => (
              <div
                key={item.step}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-7 hover:border-[#F5C518]/25 transition-all duration-300`}
              >
                <div className="text-4xl font-extrabold text-[#F5C518]/20 mb-4">{item.step}</div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABox
        heading="Prefer WhatsApp? Message Us Directly"
        subtitle="Skip the form — get a faster response on WhatsApp. We reply within minutes during business hours."
      />
    </main>
  );
}
