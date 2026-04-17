"use client";

import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/social-links";

type Channel = {
  name: string;
  nameAr: string;
  href: string;
  hoverClass: string;
  d: string;
  fill: boolean;
};

const CHANNELS: Channel[] = [
  {
    name: "WhatsApp",
    nameAr: "واتساب",
    href: SOCIAL_LINKS.whatsapp,
    hoverClass: "hover:text-[#25D366] hover:border-[#25D366]/30",
    fill: true,
    d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
  },
  {
    name: "LinkedIn",
    nameAr: "لينكدإن",
    href: SOCIAL_LINKS.linkedin,
    hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
    fill: true,
    d: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    name: "Instagram",
    nameAr: "إنستغرام",
    href: SOCIAL_LINKS.instagram,
    hoverClass: "hover:text-[#E1306C] hover:border-[#E1306C]/30",
    fill: false,
    d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
  },
  {
    name: "Facebook",
    nameAr: "فيسبوك",
    href: SOCIAL_LINKS.facebook,
    hoverClass: "hover:text-[#1877F2] hover:border-[#1877F2]/30",
    fill: false,
    d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    name: "YouTube",
    nameAr: "يوتيوب",
    href: SOCIAL_LINKS.youtube,
    hoverClass: "hover:text-[#FF0000] hover:border-[#FF0000]/30",
    fill: true,
    d: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
  {
    name: "X (Twitter)",
    nameAr: "إكس",
    href: SOCIAL_LINKS.twitter,
    hoverClass: "hover:text-white hover:border-white/30",
    fill: true,
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

type Props = {
  locale: "en" | "ar";
};

export function SocialContactGrid({ locale }: Props) {
  const isAr = locale === "ar";

  return (
    <section
      aria-labelledby="social-contact-heading"
      className="bg-[#0C1424] py-12 border-t border-white/5"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2
          id="social-contact-heading"
          className={`text-white font-bold text-xl mb-2 ${isAr ? "text-right" : ""}`}
        >
          {isAr ? "تواصل معنا مباشرة" : "Message Us Directly"}
        </h2>
        <p className={`text-white/50 text-sm mb-7 ${isAr ? "text-right" : ""}`}>
          {isAr
            ? "اختر القناة اللي تناسبك، ونرد عليك بأسرع وقت."
            : "Pick the channel that suits you. We respond fast."}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CHANNELS.map((ch) => {
            const label = isAr ? ch.nameAr : ch.name;
            return (
              <Link
                key={ch.name}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex flex-col items-center gap-2.5 p-4 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 transition-all ${ch.hoverClass}`}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill={ch.fill ? "currentColor" : "none"}
                  stroke={ch.fill ? undefined : "currentColor"}
                  strokeWidth={ch.fill ? undefined : 1.5}
                  strokeLinecap={ch.fill ? undefined : "round"}
                  strokeLinejoin={ch.fill ? undefined : "round"}
                >
                  <path d={ch.d} />
                </svg>
                <span className="text-xs font-medium text-center leading-tight">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
