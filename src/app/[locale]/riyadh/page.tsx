import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "التسويق الرقمي في أحياء الرياض | لوكال سيتي سولوشنز"
      : "Digital Marketing Across All Riyadh Districts | Local City Solutions",
    description: isAr
      ? "لوكال سيتي سولوشنز تخدم جميع أحياء الرياض الـ٢٠+. SEO محلي، إعلانات قوقل، وتسويق رقمي متخصص لكل حي في العاصمة."
      : "Local City Solutions serves all 20+ Riyadh districts. Hyperlocal SEO, Google Ads, and digital marketing for every neighbourhood in the capital.",
    alternates: {
      languages: {
        en: "https://localcitysolutions.com/en/riyadh",
        ar: "https://localcitysolutions.com/ar/riyadh",
      },
    },
  };
}

const zones = {
  en: [
    {
      name: "North Riyadh",
      color: "from-[#F5C518]/10 to-transparent",
      districts: [
        { name: "Al Malqa", nameAr: "الملقا", slug: "al-malqa" },
        { name: "Al Nakheel", nameAr: "النخيل", slug: "al-nakheel" },
        { name: "Al Yasmin", nameAr: "الياسمين", slug: "al-yasmin" },
        { name: "Hittin", nameAr: "حطين", slug: "hittin" },
        { name: "Al Narjis", nameAr: "النرجس", slug: "al-narjis" },
        { name: "Al Arid", nameAr: "العارض", slug: "al-arid" },
        { name: "Al Worood", nameAr: "الورود", slug: "al-worood" },
      ],
    },
    {
      name: "Central Riyadh",
      color: "from-blue-500/10 to-transparent",
      districts: [
        { name: "Al Olaya", nameAr: "العليا", slug: "al-olaya" },
        { name: "Al Sulaimaniyah", nameAr: "السليمانية", slug: "al-sulaimaniyah" },
        { name: "Al Murabba", nameAr: "المربع", slug: "al-murabba" },
        { name: "Al Rawdah", nameAr: "الروضة", slug: "al-rawdah" },
        { name: "KAFD", nameAr: "مركز الملك عبدالله المالي", slug: "kafd" },
        { name: "King Fahd District", nameAr: "حي الملك فهد", slug: "king-fahd-district" },
      ],
    },
    {
      name: "East Riyadh",
      color: "from-green-500/10 to-transparent",
      districts: [
        { name: "Al Naseem", nameAr: "النسيم", slug: "al-naseem" },
        { name: "Ishbiliyah", nameAr: "إشبيلية", slug: "ishbiliyah" },
        { name: "Al Aziziyah", nameAr: "العزيزية", slug: "al-aziziyah" },
      ],
    },
    {
      name: "West & South Riyadh",
      color: "from-purple-500/10 to-transparent",
      districts: [
        { name: "Al Sahafah", nameAr: "الصحافة", slug: "al-sahafah" },
        { name: "Al Shifa", nameAr: "الشفا", slug: "al-shifa" },
        { name: "Tuwaiq", nameAr: "طويق", slug: "tuwaiq" },
        { name: "Diriyah", nameAr: "الدرعية", slug: "diriyah" },
      ],
    },
  ],
};

// Arabic zone names
const zoneNamesAr: Record<string, string> = {
  "North Riyadh": "شمال الرياض",
  "Central Riyadh": "وسط الرياض",
  "East Riyadh": "شرق الرياض",
  "West & South Riyadh": "غرب وجنوب الرياض",
};

export default async function RiyadhPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const p = `/${locale}`;

  const copy = {
    badge: isAr ? "تغطية الرياض" : "Riyadh Coverage",
    h1a: isAr ? "نخدم كل حي" : "We Serve Every District",
    h1b: isAr ? "في الرياض" : "in Riyadh",
    hero: isAr
      ? "تسويق رقمي محلي لكل حي ومنطقة في العاصمة السعودية. من الملقا شمالاً إلى طويق غرباً — نعرف شوارع عملائك كما تعرفها."
      : "Hyperlocal digital marketing for every neighbourhood, district, and zone in the Saudi capital. From Al Malqa in the north to Tuwaiq in the west — we know your customers' streets as well as you do.",
    ctaWa: isAr ? "احصل على تدقيق مجاني ←" : "Get Free Audit →",
    ctaCall: "+966 564 229 190",
    intro1: isAr
      ? "الرياض ليست كتلة واحدة. العاصمة تمتد على أكثر من ١٥٠٠ كم² وتضم عشرات الأحياء المميزة، كل منها بشخصيته الديموغرافية وسلوكه الاستهلاكي الخاص. عيادة في النرجس تخدم شريحة مختلفة تماماً عن عيادة في الشفا. مطعم في KAFD يواجه منافسة مختلفة عن مطعم في العزيزية."
      : "Riyadh is not a monolith. The capital spans over 1,500 km² and encompasses dozens of distinct districts, each with its own character, demographics, and consumer behaviour. A clinic in Al Narjis serves a different patient profile than one in Al Shifa. A restaurant in KAFD competes differently from one in Al Aziziyah.",
    intro2a: isAr
      ? "لهذا تبني لوكال سيتي سولوشنز استراتيجيات تسويق محلية فائقة الدقة — تستهدف الأحياء التي يعيش فيها عملاؤك ويعملون وينفقون. تصفح تغطيتنا أدناه أو "
      : "That is why Local City Solutions builds hyperlocal marketing strategies — targeting the specific districts where your customers live, work, and spend. Whether you need to dominate your immediate neighbourhood or expand across multiple Riyadh zones, we have the local knowledge and the tools to make it happen. Explore our coverage below or ",
    intro2link: isAr ? "تواصل معنا" : "get in touch",
    intro2b: isAr ? " لمناقشة منطقتك." : " to discuss your specific area.",
    districtsBadge: isAr ? "تغطية الأحياء" : "District Coverage",
    districtsH2: isAr ? "الأحياء حسب المنطقة" : "Districts by Zone",
    districtsSub: isAr
      ? "اضغط على أي حي لمعرفة خدمات التسويق المحلي المتخصصة لتلك المنطقة."
      : "Click any district to learn about our hyperlocal marketing services for that area.",
    whyBadge: isAr ? "لماذا يهم" : "Why It Matters",
    whyH2: isAr ? "لماذا الاستهداف المحلي مهم في الرياض" : "Why Local Targeting Matters in Riyadh",
    whySub: isAr
      ? "الاستهداف الواسع يهدر الميزانية. الدقة المحلية تكسب العملاء."
      : "Broad targeting wastes budget. Hyperlocal precision wins customers.",
    servicesBadge: isAr ? "خدماتنا" : "Our Services",
    servicesH2: isAr ? "خدماتنا في الرياض" : "Our Riyadh Services",
    servicesSub: isAr
      ? "كل خدمة نقدمها محسّنة لأعمال الرياض وسلوك البحث السعودي."
      : "Every service we offer is optimised for Riyadh businesses and Saudi search behaviour.",
    exploreMore: isAr ? "استكشف المزيد" : "Explore More",
  };

  const reasons = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: isAr ? "العملاء يبحثون محلياً" : "Customers Search Locally",
      description: isAr
        ? "سكان الرياض يبحثون باستمرار عن مصطلحات خاصة بالحي ومصطلحات «قريب مني». الترتيب في الحي الصحيح يضع نشاطك أمام مشترين على بعد دقائق."
        : "Riyadh residents search for \"near me\" and district-specific terms constantly. Ranking in the right neighbourhood puts your business in front of buyers who are minutes away.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: isAr ? "الديموغرافيا تختلف بين الأحياء" : "Demographics Differ by District",
      description: isAr
        ? "الملقا وحطين تجذب عائلات شمال الرياض الميسورة. العليا تستهدف المهنيين في الشركات. العزيزية تخدم شريحة مختلفة تماماً. كل حي يحتاج رسالته الخاصة."
        : "Al Malqa and Hittin attract affluent North Riyadh families. Al Olaya targets corporate professionals. Al Aziziyah serves a different demographic entirely. Each district needs its own message.",
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#F5C518]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: isAr ? "إنفاق إعلاني أقل، ROI أعلى" : "Lower Ad Spend, Higher ROI",
      description: isAr
        ? "الاستهداف المحلي الفائق يقلل الانطباعات الإعلانية المهدورة ويخفض تكلفة النقر. تدفع فقط للوصول إلى العملاء في الأحياء التي تعمل فيها فعلاً."
        : "Hyperlocal targeting reduces wasted ad impressions and lowers your cost per click. You pay only to reach customers in the districts where you actually do business.",
    },
  ];

  const serviceLinks = [
    { label: isAr ? "SEO المحلي" : "Local SEO", href: `${p}/services/seo`, icon: "🔍" },
    { label: isAr ? "إعلانات قوقل" : "Google Ads", href: `${p}/services/google-ads`, icon: "📊" },
    { label: isAr ? "ملف قوقل للأعمال" : "Google Business Profile", href: `${p}/services/google-business-profile`, icon: "📍" },
    { label: isAr ? "إعلانات ميتا" : "Meta Ads", href: `${p}/services/meta-ads`, icon: "📱" },
  ];

  const internalLinks = [
    { label: isAr ? "خدماتنا" : "Our Services", href: `${p}/services` },
    { label: isAr ? "من نحن" : "About Us", href: `${p}/about` },
    { label: isAr ? "تواصل معنا" : "Contact Us", href: `${p}/contact` },
    { label: isAr ? "خدمة SEO" : "SEO Services", href: `${p}/services/seo` },
    { label: isAr ? "ملف قوقل للأعمال" : "Google Business Profile", href: `${p}/services/google-business-profile` },
  ];

  return (
    <main className="bg-[#080E1A] min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-20 bg-[#080E1A] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(245,197,24,0.06) 0%, transparent 60%)" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-3xl ${isAr ? "mr-auto" : ""}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F5C518]/25 bg-[#F5C518]/[0.08] text-[#F5C518] text-xs font-semibold mb-6 reveal">
              {copy.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 md:mb-6 reveal delay-1">
              {copy.h1a}{" "}
              <span className="text-[#F5C518]">{copy.h1b}</span>
            </h1>
            <p className="text-sm md:text-xl text-white/55 mb-8 max-w-2xl leading-relaxed reveal delay-2">
              {copy.hero}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 reveal delay-3">
              <a
                href="https://wa.me/966564229190"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#F5C518]/90 transition-all shadow-lg shadow-[#F5C518]/20"
              >
                {copy.ctaWa}
              </a>
              <a
                href="tel:+966564229190"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-all"
              >
                {copy.ctaCall}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10 md:py-16 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl reveal">
            <p className="text-white/60 text-sm md:text-base leading-relaxed">{copy.intro1}</p>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4">
              {copy.intro2a}
              <Link href={`${p}/contact`} className="text-[#F5C518] hover:underline">
                {copy.intro2link}
              </Link>
              {copy.intro2b}
            </p>
          </div>
        </div>
      </section>

      {/* Districts by Zone */}
      <section className="py-14 md:py-24 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              {copy.districtsBadge}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{copy.districtsH2}</h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">{copy.districtsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {zones.en.map((zone, zi) => (
              <div
                key={zone.name}
                className={`reveal delay-${zi + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-7 hover:border-[#F5C518]/15 transition-all duration-300`}
              >
                <div className={`inline-block bg-gradient-to-r ${zone.color} rounded-lg px-3 py-1 mb-4`}>
                  <h3 className="text-white font-bold text-sm md:text-base">
                    {isAr ? zoneNamesAr[zone.name] : zone.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {zone.districts.map((district) => (
                    <Link
                      key={district.slug}
                      href={`${p}/riyadh/${district.slug}`}
                      className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-[#F5C518]/50 hover:text-[#F5C518] transition-all"
                    >
                      {isAr ? district.nameAr : district.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Targeting Matters */}
      <section className="py-14 md:py-24 bg-[#0C1424]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-14 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              {copy.whyBadge}
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">{copy.whyH2}</h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-2xl mx-auto text-xs md:text-base">{copy.whySub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason, i) => (
              <div
                key={reason.title}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-6 md:p-7 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#F5C518]/10 flex items-center justify-center mb-5">
                  {reason.icon}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{reason.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Riyadh Services */}
      <section className="py-14 md:py-20 bg-[#080E1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12 reveal">
            <span className="inline-block text-[#F5C518] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 md:mb-4">
              {copy.servicesBadge}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white">{copy.servicesH2}</h2>
            <p className="text-white/45 mt-2 md:mt-4 max-w-xl mx-auto text-xs md:text-base">{copy.servicesSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceLinks.map((service, i) => (
              <Link
                key={service.href}
                href={service.href}
                className={`reveal delay-${i + 1} bg-[#0E1A2E] border border-white/[0.06] rounded-xl p-5 hover:border-[#F5C518]/25 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3`}
              >
                <span className="text-2xl">{service.icon}</span>
                <span className="text-white font-medium text-sm">{service.label}</span>
                <svg className={`w-4 h-4 text-[#F5C518] ${isAr ? "mr-auto" : "ml-auto"} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isAr ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10 bg-[#0C1424] border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/40 text-xs mb-4 font-semibold uppercase tracking-widest">{copy.exploreMore}</p>
          <div className="flex flex-wrap gap-3">
            {internalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full border border-white/15 text-white/60 text-sm hover:border-[#F5C518]/50 hover:text-[#F5C518] transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABox locale={locale} />
    </main>
  );
}
