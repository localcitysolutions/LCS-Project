import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, CATEGORIES } from "@/data/blog-posts";

type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string; q?: string; page?: string }>;
}

const CONTENT = {
  en: {
    meta: {
      title: "Digital Marketing Blog — LCS Agency Riyadh",
      description: "Practical guides on SEO, Google Ads, social media, and digital marketing for Riyadh and Saudi businesses.",
    },
    label: "Our Blog",
    h1: "Digital Marketing Insights for Saudi Businesses",
    sub: "Practical guides, strategies, and tips from Riyadh's digital marketing specialists.",
    allCats: "All Posts",
    searchPlaceholder: "Search articles...",
    readMore: "Read Article →",
    minRead: "min read",
    noResults: "No articles found.",
    prev: "← Previous",
    next: "Next →",
    pageOf: (p: number, t: number) => `Page ${p} of ${t}`,
  },
  ar: {
    meta: {
      title: "مدونة التسويق الرقمي — لوكال سيتي سولوشنز الرياض",
      description: "أدلة عملية حول تحسين محركات البحث وإعلانات قوقل والسوشيال ميديا والتسويق الرقمي للأعمال في الرياض والسعودية.",
    },
    label: "مدونتنا",
    h1: "رؤى التسويق الرقمي للأعمال السعودية",
    sub: "أدلة واستراتيجيات ونصائح عملية من متخصصي التسويق الرقمي في الرياض.",
    allCats: "كل المقالات",
    searchPlaceholder: "ابحث في المقالات...",
    readMore: "اقرأ المقال ←",
    minRead: "دقيقة قراءة",
    noResults: "ما في مقالات مطابقة.",
    prev: "→ السابق",
    next: "← التالي",
    pageOf: (p: number, t: number) => `صفحة ${p} من ${t}`,
  },
};

const PER_PAGE = 9;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const isAr = locale === "ar";
  const c = CONTENT[locale] || CONTENT.en;

  const activeCat = sp.category || "";
  const query = sp.q || "";
  const page = Math.max(1, parseInt(sp.page || "1", 10));

  let posts = [...BLOG_POSTS];
  if (activeCat) posts = posts.filter((p) => p.category === activeCat);
  if (query) {
    const q = query.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.en.toLowerCase().includes(q) ||
        p.title.ar.includes(q) ||
        p.excerpt.en.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = posts.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  function buildUrl(overrides: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const category = "category" in overrides ? overrides.category : activeCat;
    const q = "q" in overrides ? overrides.q : query;
    const pg = "page" in overrides ? overrides.page : undefined;
    if (category) params.set("category", category);
    if (q) params.set("q", q);
    if (pg && pg !== "1") params.set("page", pg);
    const qs = params.toString();
    return qs ? `?${qs}` : `/${locale}/blog`;
  }

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.07) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-4">{c.label}</span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{c.h1}</h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">{c.sub}</p>
        </div>
      </section>

      {/* Filter + Search bar */}
      <section className="bg-[#080E1A] border-b border-white/5 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildUrl({ category: "", page: "1" })}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                !activeCat
                  ? "bg-[#F5C518] text-[#080E1A]"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {c.allCats}
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={buildUrl({ category: cat.slug, page: "1" })}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCat === cat.slug
                    ? "bg-[#F5C518] text-[#080E1A]"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {isAr ? cat.label.ar : cat.label.en}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form method="GET" action={`/${locale}/blog`} className="flex items-center gap-2">
            {activeCat && <input type="hidden" name="category" value={activeCat} />}
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder={c.searchPlaceholder}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#F5C518]/50 w-48"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-lg text-[#F5C518] text-xs font-semibold hover:bg-[#F5C518]/20 transition-all"
            >
              {isAr ? "بحث" : "Search"}
            </button>
          </form>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {paginated.length === 0 ? (
            <p className="text-white/40 text-center py-20">{c.noResults}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginated.map((post, i) => (
                <article
                  key={post.slug}
                  className={`reveal delay-${(i % 3) + 1} bg-[#0E1A2E] border border-white/5 rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all group flex flex-col`}
                >
                  {/* Color accent top bar */}
                  <div className="h-1.5 bg-gradient-to-r from-[#F5C518]/40 to-transparent" />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Category badge */}
                    <span className="inline-block px-2.5 py-1 rounded-full bg-[#F5C518]/10 text-[#F5C518] text-[10px] font-bold uppercase tracking-widest mb-3 self-start">
                      {isAr ? post.categoryLabel.ar : post.categoryLabel.en}
                    </span>

                    {/* Title */}
                    <h2 className={`text-white font-bold text-sm md:text-base mb-3 leading-snug group-hover:text-[#F5C518] transition-colors flex-1 ${isAr ? "text-right" : ""}`}>
                      {isAr ? post.title.ar : post.title.en}
                    </h2>

                    {/* Excerpt */}
                    <p className={`text-white/50 text-xs leading-relaxed mb-4 line-clamp-3 ${isAr ? "text-right" : ""}`}>
                      {isAr ? post.excerpt.ar : post.excerpt.en}
                    </p>

                    {/* Meta row */}
                    <div className={`flex items-center justify-between text-white/30 text-[10px] mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                      <span>{post.publishDate}</span>
                      <span>{post.readingTime} {c.minRead}</span>
                    </div>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-1 mb-4 ${isAr ? "flex-row-reverse" : ""}`}>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] text-white/25 border border-white/10 rounded px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read link */}
                    <div className="mt-auto pt-4 border-t border-white/5">
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="text-[#F5C518] text-xs font-semibold hover:underline"
                      >
                        {c.readMore}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={`flex items-center justify-center gap-3 mt-12 ${isAr ? "flex-row-reverse" : ""}`}>
              {currentPage > 1 && (
                <Link
                  href={buildUrl({ page: String(currentPage - 1) })}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs hover:bg-white/10 hover:text-white transition-all"
                >
                  {c.prev}
                </Link>
              )}
              <span className="text-white/30 text-xs">{c.pageOf(currentPage, totalPages)}</span>
              {currentPage < totalPages && (
                <Link
                  href={buildUrl({ page: String(currentPage + 1) })}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs hover:bg-white/10 hover:text-white transition-all"
                >
                  {c.next}
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
