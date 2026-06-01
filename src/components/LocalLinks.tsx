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
    <section className="bg-[#F7F9F8] py-12 border-t border-[#E2EAE7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6 reveal">
        {filtered.map((group, gi) => (
          <div key={gi}>
            <p className="text-[#8A9B96] text-xs uppercase tracking-widest mb-3">
              {isAr ? group.labelAr : group.labelEn}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full border border-[#D8E4DF] text-[#748781] text-xs hover:text-[#3D514D] hover:border-[#C6D5D0] transition-all"
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
