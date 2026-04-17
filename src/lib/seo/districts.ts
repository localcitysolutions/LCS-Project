export type DistrictSlug =
  | "al-olaya" | "al-sulaimaniyah" | "al-rawdah" | "al-murabba" | "kafd"
  | "king-fahd-district" | "al-malqa" | "al-nakheel" | "al-yasmin" | "hittin"
  | "al-sahafah" | "al-worood" | "al-shifa" | "al-naseem" | "al-aziziyah"
  | "ishbiliyah" | "al-narjis" | "tuwaiq" | "diriyah" | "al-arid";

export const DISTRICT_GEO: Record<
  DistrictSlug,
  { lat: number; lng: number; nameAr: string; nameEn: string }
> = {
  "al-olaya":           { lat: 24.6904, lng: 46.6869, nameAr: "العليا",         nameEn: "Al Olaya" },
  "al-sulaimaniyah":    { lat: 24.6931, lng: 46.7019, nameAr: "السليمانية",     nameEn: "Al Sulaimaniyah" },
  "al-rawdah":          { lat: 24.7580, lng: 46.7760, nameAr: "الروضة",         nameEn: "Al Rawdah" },
  "al-murabba":         { lat: 24.6536, lng: 46.7100, nameAr: "المربع",          nameEn: "Al Murabba" },
  "kafd":               { lat: 24.7636, lng: 46.6383, nameAr: "كافد",            nameEn: "KAFD" },
  "king-fahd-district": { lat: 24.7143, lng: 46.6753, nameAr: "حي الملك فهد",   nameEn: "King Fahd District" },
  "al-malqa":           { lat: 24.7983, lng: 46.6219, nameAr: "الملقا",          nameEn: "Al Malqa" },
  "al-nakheel":         { lat: 24.7725, lng: 46.6383, nameAr: "النخيل",          nameEn: "Al Nakheel" },
  "al-yasmin":          { lat: 24.8358, lng: 46.6394, nameAr: "الياسمين",       nameEn: "Al Yasmin" },
  "hittin":             { lat: 24.7544, lng: 46.6089, nameAr: "حطين",            nameEn: "Hittin" },
  "al-sahafah":         { lat: 24.8006, lng: 46.6608, nameAr: "الصحافة",        nameEn: "Al Sahafah" },
  "al-worood":          { lat: 24.7125, lng: 46.6889, nameAr: "الورود",          nameEn: "Al Worood" },
  "al-shifa":           { lat: 24.6117, lng: 46.7389, nameAr: "الشفا",            nameEn: "Al Shifa" },
  "al-naseem":          { lat: 24.7908, lng: 46.8286, nameAr: "النسيم",         nameEn: "Al Naseem" },
  "al-aziziyah":        { lat: 24.5525, lng: 46.7625, nameAr: "العزيزية",       nameEn: "Al Aziziyah" },
  "ishbiliyah":         { lat: 24.7981, lng: 46.8097, nameAr: "إشبيلية",         nameEn: "Ishbiliyah" },
  "al-narjis":          { lat: 24.8633, lng: 46.6283, nameAr: "النرجس",         nameEn: "Al Narjis" },
  "tuwaiq":             { lat: 24.7236, lng: 46.5483, nameAr: "طويق",             nameEn: "Tuwaiq" },
  "diriyah":            { lat: 24.7339, lng: 46.5744, nameAr: "الدرعية",         nameEn: "Diriyah" },
  "al-arid":            { lat: 24.8725, lng: 46.7181, nameAr: "العارض",          nameEn: "Al Arid" },
};

export function buildDistrictLocalBusinessSchema(
  slug: DistrictSlug,
  locale: "en" | "ar"
) {
  const geo = DISTRICT_GEO[slug];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://localcitysolutions.com/#business-${slug}`,
    name: "Local City Solutions",
    alternateName: "لوكال سيتي سولوشنز",
    url: `https://localcitysolutions.com/${locale}/riyadh/${slug}`,
    image: "https://localcitysolutions.com/og-image.jpg",
    telephone: "+966-56-422-9190",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh Province",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.lat,
      longitude: geo.lng,
    },
    areaServed: {
      "@type": "City",
      name: geo.nameEn,
      alternateName: geo.nameAr,
      containedInPlace: { "@type": "City", name: "Riyadh" },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Marketing Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads Management" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads Management" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management" } },
      ],
    },
  };
}
