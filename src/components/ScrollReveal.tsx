"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    // Step 1: add js-ready so CSS hides .reveal elements
    document.documentElement.classList.add("js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );

    // Step 2: observe all .reveal elements (already hidden by js-ready)
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
