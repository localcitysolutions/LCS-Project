import Link from "next/link";

export interface LocalLinkGroup {
  labelEn: string;
  labelAr: string;
  links: { labelEn: string; labelAr: string; href: string }[];
}

interface LocalLinksProps {
  locale: "en" | "ar";
  groups: LocalLinkGroup[];
}

export default function LocalLinks({ locale, groups }: LocalLinksProps) {
  const isAr = locale === "ar";
  const filtered = groups.filter((g) => g.links.length > 0);
  if (filtered.length === 0) return null;

  return (
    <section className="bg-[#080E1A] py-12 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 reveal">
        {filtered.map((group, gi) => (
          <div key={gi}>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3">
              {isAr ? group.labelAr : group.labelEn}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all"
                >
                  {isAr ? link.labelAr : link.labelEn}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
