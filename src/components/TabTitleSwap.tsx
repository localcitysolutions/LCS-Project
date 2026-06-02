"use client";

import { useEffect } from "react";

interface Props {
  locale: string;
}

const HIDDEN_TITLE = {
  en: "👋 Come Here Habibi!",
  ar: "👋 تعال هنا يا حبيبي!",
} as const;

export default function TabTitleSwap({ locale }: Props) {
  useEffect(() => {
    let originalTitle = document.title;

    // Refresh "originalTitle" if Next.js updates it during nav
    const titleObserver = new MutationObserver(() => {
      if (!document.hidden) {
        originalTitle = document.title;
      }
    });
    const titleEl = document.querySelector("title");
    if (titleEl) {
      titleObserver.observe(titleEl, { childList: true });
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        const swap =
          locale === "ar" ? HIDDEN_TITLE.ar : HIDDEN_TITLE.en;
        document.title = swap;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      titleObserver.disconnect();
    };
  }, [locale]);

  return null;
}
