import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale }> }

const CONTENT = {
  en: {
    meta: { title: "About Local City Solutions — Riyadh's Digital Marketing Agency", description: "Meet the team behind Local City Solutions. Riyadh-based digital marketing experts serving Saudi businesses since 2018." },
    hero: { label: "About Us", h1: "We Built This Agency for the Saudi Market", sub: "Local City Solutions was founded with a single mission: help Riyadh businesses grow online the right way — with local expertise, bilingual execution, and results that actually move the needle." },
    story: {
      label: "Our Story",
      h2: "From Riyadh, For Riyadh",
      paras: [
        "Local City Solutions was born from a frustration with the status quo. Riyadh businesses were being served by generic international agencies with zero understanding of Saudi consumer behavior, Arabic search intent, or the cultural nuances that make the difference between a campaign that converts and one that falls flat.",
        "We started in 2018 as a small team of Saudi market specialists — digital marketers who had grown up in the Kingdom, understood the local landscape, and could execute flawlessly in both Arabic and English. Our first clients were small restaurants and clinics in Al Olaya who needed real results, not polished presentations.",
        "Today, we serve 150+ Riyadh businesses across every major sector — from luxury hospitality to e-commerce startups to professional services firms. Our team has grown, our capabilities have expanded, and our commitment to the Saudi market has only deepened.",
      ],
    },
    values: {
      label: "Our Values",
      h2: "What We Stand For",
      items: [
        { icon: "🎯", title: "Results Over Reports", desc: "We measure success by your growth, not the thickness of our monthly report. Every strategy is built backward from the outcome you need." },
        { icon: "🤝", title: "Transparency Always", desc: "You will always know exactly where your budget is going, what is working, and what we are doing about what isn't. No black boxes." },
        { icon: "🏡", title: "Local Expertise", desc: "We live and work in Riyadh. We understand the seasons, the culture, the platforms, and the purchasing patterns of the Saudi consumer better than any remote agency can." },
        { icon: "📈", title: "Long-Term Thinking", desc: "We build sustainable digital presence, not quick-win tactics that disappear next month. Our clients stay with us because we make them genuinely stronger over time." },
      ],
    },
    team: {
      label: "The Team",
      h2: "Who You Work With",
      members: [
        { name: "Muhammad Farhan", title: "Founder & CEO", bio: "Digital marketing veteran with 10+ years in the Saudi market. Built campaigns for brands across hospitality, healthcare, retail, and professional services in Riyadh." },
      ],
    },
    vs: {
      label: "The LCS Difference",
      h2: "LCS vs. Generic Agencies",
      us: [
        "Deep Saudi market expertise",
        "Bilingual Arabic + English execution",
        "Dedicated team that knows your business",
        "Transparent budget reporting",
        "Riyadh-specific strategy",
        "Cultural nuance in every campaign",
      ],
      them: [
        "Generic global playbook",
        "English-only or poor translation",
        "Account managers rotating constantly",
        "Opaque fee structures",
        "One-size-fits-all approach",
        "No understanding of Saudi consumer",
      ],
    },
    cta: { heading: "Let's Grow Your Riyadh Business", subtitle: "Ready to work with an agency that actually understands your market? Let's start with a free audit." },
  },
  ar: {
    meta: { title: "عن لوكال سيتي سولوشنز — وكالة التسويق الرقمي في الرياض", description: "تعرف على الفريق خلف لوكال سيتي سولوشنز. متخصصون في التسويق الرقمي بالرياض يخدمون الأعمال السعودية منذ 2018." },
    hero: { label: "عنّا", h1: "بنينا هذه الوكالة للسوق السعودي", sub: "تأسست لوكال سيتي سولوشنز بمهمة واحدة: مساعدة أعمال الرياض على النمو رقمياً بالطريقة الصحيحة — بخبرة محلية، وتنفيذ ثنائي اللغة، ونتائج تُحرك المؤشرات فعلاً." },
    story: {
      label: "قصتنا",
      h2: "من الرياض، للرياض",
      paras: [
        "وُلدت لوكال سيتي سولوشنز من الإحباط من الوضع القائم. أعمال الرياض كانت تُخدَّم من وكالات دولية عامة لا تفهم شيئاً عن سلوك المستهلك السعودي أو نية البحث بالعربية أو الفروق الثقافية الدقيقة التي تصنع الفرق بين حملة تحوّل وأخرى لا تؤتي ثمارها.",
        "بدأنا عام ٢٠١٨ كفريق صغير من متخصصي السوق السعودي — مسوقون رقميون نشأوا في المملكة، يفهمون المشهد المحلي، ويستطيعون التنفيذ بإتقان بالعربية والإنجليزية. كان أول عملائنا مطاعم وعيادات صغيرة في العليا تحتاج إلى نتائج حقيقية لا عروض تقديمية مصقولة.",
        "اليوم، نخدم أكثر من ١٥٠ نشاطاً تجارياً في الرياض عبر كل القطاعات الرئيسية — من الضيافة الفاخرة إلى شركات التجارة الإلكترونية الناشئة إلى شركات الخدمات المهنية. نما فريقنا واتسعت قدراتنا وتعمّق التزامنا بالسوق السعودي.",
      ],
    },
    values: {
      label: "قيمنا",
      h2: "ما نؤمن به",
      items: [
        { icon: "🎯", title: "النتائج فوق التقارير", desc: "نقيس النجاح بنموّك لا بسُمك تقريرنا الشهري. كل استراتيجية مبنية من الخلف انطلاقاً من النتيجة التي تحتاجها." },
        { icon: "🤝", title: "الشفافية دائماً", desc: "ستعرف دائماً أين يذهب ميزانيتك وما الذي ينجح وما الذي نفعله حيال ما لا ينجح. لا صناديق سوداء عندنا." },
        { icon: "🏡", title: "الخبرة المحلية", desc: "نعيش ونعمل في الرياض. نفهم المواسم والثقافة والمنصات وأنماط الشراء لدى المستهلك السعودي أفضل من أي وكالة عن بُعد." },
        { icon: "📈", title: "التفكير البعيد المدى", desc: "نبني حضوراً رقمياً مستداماً لا تكتيكات انتصارات سريعة تختفي الشهر القادم. عملاؤنا يبقون معنا لأننا نجعلهم أقوى فعلياً مع مرور الوقت." },
      ],
    },
    team: {
      label: "الفريق",
      h2: "من تعمل معه",
      members: [
        { name: "محمد فرحان", title: "المؤسس والرئيس التنفيذي", bio: "خبير تسويق رقمي بأكثر من ١٠ سنوات في السوق السعودي. بنى حملات لعلامات تجارية في قطاعات الضيافة والرعاية الصحية والتجزئة والخدمات المهنية في الرياض." },
      ],
    },
    vs: {
      label: "الفارق",
      h2: "لوكال سيتي مقابل الوكالات العامة",
      us: [
        "خبرة عميقة بالسوق السعودي",
        "تنفيذ ثنائي اللغة: عربي وإنجليزي",
        "فريق متفرغ يعرف نشاطك",
        "تقارير ميزانية شفافة",
        "استراتيجية مصممة للرياض",
        "فهم الفروق الثقافية في كل حملة",
      ],
      them: [
        "دليل لعب عالمي عام",
        "إنجليزي فقط أو ترجمة رديئة",
        "مديرو حسابات يتغيرون باستمرار",
        "هياكل رسوم غامضة",
        "مقاس واحد يناسب الجميع",
        "لا فهم للمستهلك السعودي",
      ],
    },
    cta: { heading: "لنحقق نمو نشاطك في الرياض", subtitle: "حاضر تشتغل مع وكالة تفهم سوقك فعلاً؟ ابدأ بتدقيق مجاني." },
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = CONTENT[locale] || CONTENT.en;
  return { title: c.meta.title, description: c.meta.description };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const c = CONTENT[locale] || CONTENT.en;
  const p = isAr ? "/ar" : "";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.07) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] mb-4">{c.hero.label}</span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-5 leading-tight">{c.hero.h1}</h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">{c.hero.sub}</p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 reveal">
          <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.story.label}</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{c.story.h2}</h2>
          <div className="space-y-5">
            {c.story.paras.map((p2, i) => <p key={i} className="text-white/60 leading-relaxed">{p2}</p>)}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.values.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.values.h2}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal delay-1">
            {c.values.items.map((v) => (
              <div key={v.title} className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 hover:border-[#F5C518]/20 transition-all">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.team.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.team.h2}</h2>
          </div>
          <div className="flex flex-col items-center reveal delay-1">
            {c.team.members.map((m) => (
              <div key={m.name} className="bg-[#0E1A2E] border border-white/5 rounded-2xl p-8 max-w-sm w-full text-center hover:border-[#F5C518]/20 transition-all">
                <div className="w-20 h-20 rounded-full bg-[#F5C518]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{m.name}</h3>
                <p className="text-[#F5C518] text-xs font-semibold uppercase tracking-widest mb-3">{m.title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LCS vs Generic */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.vs.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.vs.h2}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 reveal delay-1">
            <div className="bg-[#0E1A2E] border border-[#F5C518]/20 rounded-xl p-6">
              <h3 className="text-[#F5C518] font-bold text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#F5C518]/20 flex items-center justify-center text-[#F5C518] text-xs">✓</span>
                {isAr ? "لوكال سيتي سولوشنز" : "Local City Solutions"}
              </h3>
              <ul className="space-y-2">
                {c.vs.us.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-[#F5C518] mt-0.5 shrink-0">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6">
              <h3 className="text-white/40 font-bold text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-white/30 text-xs">✗</span>
                {isAr ? "الوكالات العامة" : "Generic Agencies"}
              </h3>
              <ul className="space-y-2">
                {c.vs.them.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-white/30 text-sm">
                    <span className="text-white/20 mt-0.5 shrink-0">✗</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABox heading={c.cta.heading} subtitle={c.cta.subtitle} locale={locale} bg="dark" />
    </>
  );
}
