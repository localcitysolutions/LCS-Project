"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Mark as JS-ready so CSS reveal transitions activate
    document.documentElement.classList.add("js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );

    // Wait one animation frame so new page DOM is fully painted
    const rafId = requestAnimationFrame(() => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [pathname]); // Re-run on every client-side navigation

  return null;
}
