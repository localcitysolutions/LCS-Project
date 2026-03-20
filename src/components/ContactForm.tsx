"use client";

import { useState } from "react";

const SERVICES = [
  "Digital Marketing",
  "Web Design & Development",
  "SEO Services",
  "Google Ads",
  "Meta Ads",
  "Google Business Profile",
  "Social Media Marketing",
  "E-commerce Management",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-[#080E1A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#F5C518]/40 focus:bg-[#0E1A2E] transition-all";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/30 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
        <p className="text-white/50 text-sm mb-6">
          We&#39;ll get back to you within 24 hours. Or WhatsApp us for a faster response.
        </p>
        <a
          href="https://wa.me/966564229190"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-sm"
        >
          WhatsApp Us Now →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5">Full Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="Mohammed Al-Rashid"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-white/60 text-xs font-medium mb-1.5">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+966 5X XXX XXXX"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">Service Needed</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className={`${inputClass} cursor-pointer`}
        >
          <option value="">Select a service...</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white/60 text-xs font-medium mb-1.5">Message</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your business and goals..."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all shadow-lg shadow-[#F5C518]/20 hover:-translate-y-0.5"
      >
        Send Message →
      </button>
    </form>
  );
}
