"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackPhoneClick, trackFreeAuditClick } from "@/lib/analytics";

interface HeaderProps {
  locale: string;
}

const NAV = {
  en: {
    services: "Services",
    riyadh: "Riyadh",
    industries: "Industries",
    blog: "Blog",
    about: "About",
    langToggle: "عربي",
    freeAudit: "Free Audit",
  },
  ar: {
    services: "خدماتنا",
    riyadh: "الرياض",
    industries: "القطاعات",
    blog: "المدونة",
    about: "من نحن",
    langToggle: "English",
    freeAudit: "تدقيق مجاني",
  },
} as const;

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = locale === "ar";
  const t = NAV[isRTL ? "ar" : "en"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const prefix = isRTL ? "/ar" : "/en";
  const navLinks = [
    { label: t.services, href: `${prefix}/services` },
    { label: t.riyadh, href: `${prefix}/riyadh` },
    { label: t.industries, href: `${prefix}/industries` },
    { label: t.blog, href: `${prefix}/blog` },
    { label: t.about, href: `${prefix}/about` },
  ];

  const toggleHref = isRTL
    ? pathname.replace(/^\/ar/, "/en") || "/en"
    : pathname.replace(/^\/en/, "/ar") || "/ar";

  const targetLang = isRTL ? "en" : "ar";
  function setLangCookie() {
    document.cookie = `preferred-lang=${targetLang}; max-age=31536000; path=/; samesite=lax`;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F7F9F8]/95 backdrop-blur-xl border-b border-[#D8E4DF] shadow-2xl shadow-[#14211F]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20">

          {/* Logo */}
          <Link
            href={isRTL ? "/ar" : "/en"}
            onClick={() => setMenuOpen(false)}
            dir="ltr"
            className="flex items-center gap-2 md:gap-3 min-w-0 max-w-[13rem] md:max-w-none"
            aria-label="Local City Solutions — Digital Marketing Agency in Riyadh"
          >
            <Image
              src="/logo.webp"
              alt="Local City Solutions logo"
              width={256}
              height={256}
              priority
              sizes="(max-width: 768px) 36px, 48px"
              style={{ height: "auto" }}
              className="h-9 md:h-12 w-auto shrink-0"
            />
            <span className="min-w-0 truncate text-[#14211F] font-bold text-sm md:text-lg tracking-tight leading-tight whitespace-nowrap">
              Local <span className="text-[#B89112]">City</span> Solutions
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main navigation">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#566A65] hover:text-[#14211F] text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href={toggleHref}
              onClick={setLangCookie}
              className="px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-[#C6D5D0] text-[#566A65] text-xs md:text-sm font-medium hover:border-[#B89112]/40 hover:text-[#B89112] transition-all duration-200"
            >
              {t.langToggle}
            </Link>
            <Link
              href={`/${locale}/free-audit`}
              onClick={() => trackFreeAuditClick()}
              className="hidden md:inline-flex px-5 py-2 rounded-full bg-[#B89112] text-[#F7F9F8] text-sm font-bold hover:bg-[#B89112]/90 transition-all duration-200 shadow-lg shadow-[#B89112]/20"
            >
              {t.freeAudit}
            </Link>
            <button
              className="md:hidden text-[#14211F] p-1 -mr-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div
        className={`md:hidden fixed inset-0 top-14 z-40 bg-[#F7F9F8] transition-all duration-300 overflow-y-auto ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-4 py-6 flex flex-col gap-1">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 text-[#3D514D] hover:text-[#14211F] hover:bg-[#14211F]/[0.03] rounded-lg text-base font-medium transition-colors ${isRTL ? "text-right" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-[#D8E4DF] flex flex-col gap-3">
            <Link
              href={`/${locale}/free-audit`}
              onClick={() => { setMenuOpen(false); trackFreeAuditClick(); }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#B89112] text-[#F7F9F8] font-bold text-sm"
            >
              {t.freeAudit}
            </Link>
            <a
              href="tel:+966564229190"
              onClick={() => trackPhoneClick()}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-[#C6D5D0] text-[#14211F] font-medium text-sm"
            >
              +966 56 422 9190
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
