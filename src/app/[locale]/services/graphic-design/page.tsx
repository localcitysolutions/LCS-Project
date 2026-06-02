import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";
import TrackableLink from "@/components/TrackableLink";
import Breadcrumbs from "@/components/Breadcrumbs";

type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{ locale: Locale }>;
}

// All page copy lives here so the route file stays a single source of truth.
// The structure mirrors the spec section-by-section.
const COPY = {
  en: {
    meta: {
      title: "Graphic Design Services in Riyadh | Brand & Logo Design",
      description:
        "Professional graphic design in Riyadh: logos, brand identity & social media visuals for Saudi businesses. Local City Solutions delivers bilingual, on-brand design. Get a free quote.",
    },
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Graphic Design",
    badge: "Our Services",
    h1: "Graphic Design Services in Riyadh That Make Your Brand Impossible to Ignore",
    tagline:
      "Logos, identity, social, print — every visual touchpoint, on-brand in Arabic and English.",
    heroDesc:
      "From your logo to your last Instagram post, we design every visual touchpoint so your Riyadh business looks as professional as it actually is — in both Arabic and English.",
    ctaPrimary: "Get a Free Design Quote",
    ctaSecondary: "See How Your Brand Stacks Up",
    intro: {
      label: "Intro",
      p1: "Local City Solutions is a bilingual graphic design company based in Riyadh, Saudi Arabia. We create logos, brand identities, social media graphics, and marketing materials for businesses across the Kingdom — designed to work in Arabic and English, and built to convert, not just decorate.",
      p2html:
        'Your visuals are the first thing a customer judges. In a market where <a class="text-[#F5C518] underline decoration-[#F5C518]/40 hover:decoration-[#F5C518] underline-offset-4" href="https://datareportal.com/reports/digital-2026-saudi-arabia" target="_blank" rel="noopener noreferrer">99% of the population is online</a>, a weak logo or inconsistent feed quietly costs you trust before a single word is read. We fix that.',
    },
    services: {
      label: "What We Offer",
      heading: "What We Design",
      sub: "Every visual your business needs to look credible and stay consistent.",
      items: [
        {
          icon: "🎨",
          title: "Logo Design",
          desc: "A distinctive, scalable logo with full file formats (vector, PNG, favicon) and clear-space rules so it looks sharp from a business card to a billboard.",
        },
        {
          icon: "🧭",
          title: "Brand Identity Systems",
          desc: "Color palette, typography (Arabic + Latin pairing), iconography, and a brand guidelines document your whole team can follow.",
        },
        {
          icon: "📱",
          title: "Social Media Graphics",
          desc: "Post templates, story/reel covers, and carousels for Instagram, X, Snapchat, TikTok, and LinkedIn — sized and styled per platform.",
        },
        {
          icon: "🖨️",
          title: "Marketing & Print Collateral",
          desc: "Flyers, brochures, roll-up banners, menus, business cards, and event signage, print-ready in CMYK.",
        },
        {
          icon: "📦",
          title: "Packaging & Label Design",
          desc: "Retail-ready packaging that holds up on a shelf and in a phone photo.",
        },
        {
          icon: "📈",
          title: "Presentation & Pitch Decks",
          desc: "Investor and sales decks that look as serious as your numbers.",
        },
        {
          icon: "🎯",
          title: "Ad Creative",
          desc: "On-brand visuals for your Google Ads and Meta Ads campaigns, built to stop the scroll.",
        },
      ],
      footnoteHtml:
        'Need motion, not just stills? Pair this with our <a class="text-[#F5C518] hover:underline" href="/en/services/social-media">Social Media service</a>.',
    },
    why: {
      label: "Why Us",
      heading: "Why Riyadh Businesses Choose LCS",
      items: [
        {
          icon: "🇸🇦",
          title: "Truly bilingual design",
          desc: "We design natively in Arabic and English — correct type, correct direction (RTL), correct cultural fit. Not a translated afterthought.",
        },
        {
          icon: "🎯",
          title: "Built for the Saudi market",
          descHtml:
            'Aesthetics that resonate locally and align with the modern, ambitious tone of <a class="text-[#F5C518] hover:underline" href="https://www.vision2030.gov.sa/" target="_blank" rel="noopener noreferrer">Vision 2030</a>, without falling back on tired stock-photo clichés.',
        },
        {
          icon: "📈",
          title: "Conversion-first design",
          desc: "Every design choice serves a goal: more clicks, more trust, more sales. Pretty for pretty's sake doesn't ship.",
        },
        {
          icon: "🔗",
          title: "One team, whole funnel",
          descHtml:
            'Design connects directly to our <a class="text-[#F5C518] hover:underline" href="/en/services/web-design">web design</a>, <a class="text-[#F5C518] hover:underline" href="/en/services/seo">SEO</a>, and content services — your brand stays consistent everywhere.',
        },
        {
          icon: "💰",
          title: "Consistency that pays",
          desc: "Marq's State of Brand Consistency research links consistent brand presentation to revenue increases up to 23%. We keep you consistent on purpose.",
        },
      ],
    },
    process: {
      label: "Our Process",
      heading: "How We Work",
      steps: [
        {
          num: "01",
          title: "Discovery",
          desc: "We learn your business, audience, and goals, and review any existing brand assets.",
        },
        {
          num: "02",
          title: "Direction",
          desc: "We present visual directions (moodboards, concepts) so you choose the path before we build.",
        },
        {
          num: "03",
          title: "Design",
          desc: "We craft the final assets in Arabic and English, refined through structured revision rounds.",
        },
        {
          num: "04",
          title: "Delivery",
          desc: "You receive organized, ready-to-use files plus brand guidelines, with the source files handed over.",
        },
      ],
      footnote:
        "Timelines are scoped to each project and shared with you after the discovery step.",
    },
    industries: {
      label: "Industries",
      heading: "Industries We Design For",
      sub: "We adapt the visual language to your sector.",
      items: [
        {
          slug: "restaurants",
          name: "Restaurants & Cafés",
          desc: "Menus, delivery-app creative, food photography styling.",
        },
        {
          slug: "real-estate",
          name: "Real Estate",
          desc: "Listing graphics, brochures, project branding.",
        },
        {
          slug: "clinics",
          name: "Healthcare & Clinics",
          desc: "Clean, trust-building patient-facing design.",
        },
        {
          slug: "retail",
          name: "Retail & E-commerce",
          desc: "Product graphics, banners, packaging.",
        },
      ],
      viewAll: "See all industries →",
    },
    matters: {
      label: "Why It Matters",
      heading: "Why Professional Graphic Design Matters for Saudi Businesses",
      p1html:
        'Saudi Arabia is one of the most digitally connected countries on earth — <a class="text-[#F5C518] underline decoration-[#F5C518]/40 hover:decoration-[#F5C518] underline-offset-4" href="https://datareportal.com/reports/digital-2026-saudi-arabia" target="_blank" rel="noopener noreferrer">38.6 million social media identities and 99% internet penetration</a>. Your customers form an opinion of your business from a thumbnail before they ever reach your website.',
      p2: "Strong, consistent design does three things: it builds instant trust, it makes you memorable in a crowded feed, and it lets you charge what you're worth instead of competing on price alone. Inconsistent or amateur visuals do the opposite — they leak credibility every single day.",
      p3html:
        'That\'s the gap professional design closes. Want to see where your current brand is losing ground online? <a class="text-[#F5C518] hover:underline" href="/en/free-audit">Run a free audit</a>.',
    },
    packages: {
      label: "Packages",
      heading: "Graphic Design Packages",
      sub: "Bilingual delivery and source files included on every package.",
      items: [
        {
          name: "Logo & Essentials",
          best: "New businesses needing a logo + basics",
          from: "SAR 1,200",
          cta: "Get a quote",
        },
        {
          name: "Full Brand Identity",
          best: "A complete, documented visual system",
          from: "SAR 3,500",
          cta: "Get a quote",
          featured: true,
        },
        {
          name: "Monthly Design Retainer",
          best: "Ongoing social + marketing design",
          from: "SAR 1,800 / month",
          cta: "Talk to us",
        },
      ],
      note: "Not sure which fits? Talk to us — we'll recommend based on your goals, not your budget ceiling.",
    },
    faq: {
      label: "FAQ",
      heading: "Frequently Asked Questions",
      items: [
        {
          q: "How much does graphic design cost in Riyadh?",
          a: "Graphic design in Riyadh typically ranges from a few hundred riyals for a single piece to several thousand for a complete brand identity. At Local City Solutions, logo-and-essentials packages start from SAR 1,200 and full brand identities from SAR 3,500. Exact pricing depends on scope, which we confirm in a free quote.",
        },
        {
          q: "What graphic design services does Local City Solutions offer?",
          a: "We offer logo design, full brand identity systems, social media graphics, print and marketing collateral, packaging, presentation decks, and ad creative — all available in Arabic and English.",
        },
        {
          q: "Do you provide bilingual (Arabic and English) designs?",
          a: "Yes. Every project is designed natively in both Arabic and English, with correct right-to-left layout, proper Arabic typography, and culturally appropriate visuals for the Saudi market.",
        },
        {
          q: "Can you match our existing brand guidelines?",
          a: "Yes. If you already have a logo or brand guidelines, we design within them to keep everything consistent. If you don't, we can build the guidelines for you.",
        },
        {
          q: "Do you design for print as well as digital?",
          a: "Yes. We deliver print-ready CMYK files for flyers, brochures, banners, menus, and packaging, alongside web-optimized assets for digital channels.",
        },
        {
          q: "Do you offer ongoing or monthly design support?",
          a: "Yes. Our monthly design retainer covers regular social media and marketing design, ideal for businesses that publish frequently and need to stay on-brand.",
        },
        {
          q: "Why is professional graphic design important for a business in Saudi Arabia?",
          a: "With nearly the entire Saudi population online, your visuals are often a customer's first impression. Professional, consistent design builds trust, improves recognition, and supports higher revenue — research links consistent branding to revenue increases of up to 23%.",
        },
      ],
    },
    cta: {
      heading: "Let's make your brand look the part.",
      sub: "Whether you need a single logo or a full visual identity, our Riyadh design team is ready.",
    },
  },
  ar: {
    meta: {
      title: "خدمات تصميم الجرافيك في الرياض | شعارات وهوية بصرية",
      description:
        "تصميم جرافيك احترافي في الرياض: شعارات وهوية بصرية وتصاميم سوشيال ميديا للأنشطة السعودية. Local City Solutions تقدّم تصاميم ثنائية اللغة ومتناسقة مع علامتك. اطلب عرض سعر مجاني.",
    },
    breadcrumbHome: "الرئيسية",
    breadcrumbServices: "خدماتنا",
    breadcrumbCurrent: "تصميم الجرافيك",
    badge: "خدماتنا",
    h1: "خدمات تصميم الجرافيك في الرياض التي تجعل علامتك التجارية تلفت الأنظار",
    tagline: "شعارات وهوية وسوشيال ومطبوعات — كل عنصر بصري، بالعربية والإنجليزية.",
    heroDesc:
      "من الشعار إلى آخر منشور على إنستغرام، نُصمّم كل عنصر بصري لنشاطك في الرياض ليبدو احترافياً كما هو فعلاً — باللغتين العربية والإنجليزية.",
    ctaPrimary: "احصل على عرض سعر مجاني",
    ctaSecondary: "اكتشف مستوى علامتك التجارية",
    intro: {
      label: "تعريف",
      p1: "Local City Solutions هي شركة تصميم جرافيك ثنائية اللغة مقرّها الرياض في المملكة العربية السعودية. نُصمّم الشعارات والهويات البصرية وتصاميم وسائل التواصل الاجتماعي والمواد التسويقية للأنشطة في جميع أنحاء المملكة — تصاميم تعمل بالعربية والإنجليزية، ومصمّمة لتحقيق النتائج لا للزينة فقط.",
      p2html:
        'تُعدّ العناصر البصرية أول ما يحكم عليه العميل. وفي سوق <a class="text-[#F5C518] underline decoration-[#F5C518]/40 hover:decoration-[#F5C518] underline-offset-4" href="https://datareportal.com/reports/digital-2026-saudi-arabia" target="_blank" rel="noopener noreferrer">يستخدم فيه 99% من السكان الإنترنت</a>، فإنّ شعاراً ضعيفاً أو حساباً غير متناسق يُفقدك الثقة بهدوء قبل أن يقرأ العميل كلمة واحدة. نحن نُصلح ذلك.',
    },
    services: {
      label: "ماذا نقدم",
      heading: "ماذا نُصمّم",
      sub: "كل ما يحتاجه نشاطك ليبدو موثوقاً ومتناسقاً.",
      items: [
        {
          icon: "🎨",
          title: "تصميم الشعارات",
          desc: "شعار مميّز وقابل للتحجيم مع جميع صيغ الملفات (فيكتور، PNG، أيقونة الموقع) وقواعد المساحة لاستخدامه على أي وسيط.",
        },
        {
          icon: "🧭",
          title: "أنظمة الهوية البصرية",
          desc: "لوحة ألوان، خطوط (تنسيق عربي ولاتيني)، أيقونات، ودليل هوية يلتزم به فريقك بالكامل.",
        },
        {
          icon: "📱",
          title: "تصاميم وسائل التواصل",
          desc: "قوالب منشورات، أغلفة قصص وريلز، وكاروسيل لإنستغرام وإكس وسناب شات وتيك توك ولينكدإن.",
        },
        {
          icon: "🖨️",
          title: "المواد التسويقية والمطبوعات",
          desc: "فلايرز، بروشورات، رول أب، قوائم طعام، بطاقات عمل، ولوحات فعاليات جاهزة للطباعة.",
        },
        {
          icon: "📦",
          title: "تصميم العبوات والتغليف",
          desc: "تصاميم جاهزة للأرفف وللتصوير.",
        },
        {
          icon: "📈",
          title: "العروض التقديمية",
          desc: "عروض للمستثمرين والمبيعات بمستوى احترافي.",
        },
        {
          icon: "🎯",
          title: "التصاميم الإعلانية",
          desc: "عناصر بصرية متناسقة لحملات إعلانات قوقل وميتا، مصمّمة لتوقف التمرير.",
        },
      ],
      footnoteHtml:
        'تحتاج فيديو لا صوراً ثابتة فقط؟ اجمعها مع <a class="text-[#F5C518] hover:underline" href="/ar/services/social-media">خدمة السوشيال ميديا</a>.',
    },
    why: {
      label: "ليش نحن",
      heading: "لماذا تختار الأنشطة في الرياض شركة LCS",
      items: [
        {
          icon: "🇸🇦",
          title: "تصميم ثنائي اللغة فعلاً",
          desc: "نُصمّم بالعربية والإنجليزية بشكل أصيل — خط صحيح، اتجاه صحيح (RTL)، وملاءمة ثقافية. وليس مجرد ترجمة لاحقة.",
        },
        {
          icon: "🎯",
          title: "مصمّم للسوق السعودي",
          descHtml:
            'جماليات تلامس الذوق المحلي وتتماشى مع روح <a class="text-[#F5C518] hover:underline" href="https://www.vision2030.gov.sa/" target="_blank" rel="noopener noreferrer">رؤية 2030</a> الطموحة، بعيداً عن الصور النمطية المستهلكة.',
        },
        {
          icon: "📈",
          title: "الأولوية للتحويل",
          desc: "كل قرار تصميمي يخدم هدفاً: نقرات أكثر، ثقة أكبر، ومبيعات أعلى. الشكل من غير نتيجة ما يكفي.",
        },
        {
          icon: "🔗",
          title: "فريق واحد لكامل مسارك",
          descHtml:
            'يرتبط التصميم مباشرةً بخدمات <a class="text-[#F5C518] hover:underline" href="/ar/services/web-design">تصميم المواقع</a> و<a class="text-[#F5C518] hover:underline" href="/ar/services/seo">تحسين محركات البحث</a> — لتبقى علامتك متناسقة في كل مكان.',
        },
        {
          icon: "💰",
          title: "تناسق يُحقّق أرباحاً",
          desc: "وفقاً لأبحاث Marq (سابقاً Lucidpress)، فإنّ تقديم علامتك بشكل متناسق قد يزيد الإيرادات بنسبة تصل إلى 23%.",
        },
      ],
    },
    process: {
      label: "طريقة شغلنا",
      heading: "مراحل عملنا",
      steps: [
        {
          num: "٠١",
          title: "الاكتشاف",
          desc: "نتعرّف على نشاطك وجمهورك وأهدافك ونراجع أي عناصر علامة حالية.",
        },
        {
          num: "٠٢",
          title: "التوجيه",
          desc: "نعرض اتجاهات بصرية (مودبورد ومفاهيم) لتختار المسار قبل التنفيذ.",
        },
        {
          num: "٠٣",
          title: "التصميم",
          desc: "نُنفّذ التصاميم النهائية بالعربية والإنجليزية عبر جولات مراجعة منظّمة.",
        },
        {
          num: "٠٤",
          title: "التسليم",
          desc: "تستلم ملفات منظّمة وجاهزة للاستخدام مع دليل الهوية والملفات المصدرية.",
        },
      ],
      footnote: "تُحدَّد المدد الزمنية حسب كل مشروع وتُشارك معك بعد مرحلة الاكتشاف.",
    },
    industries: {
      label: "القطاعات",
      heading: "القطاعات التي نُصمّم لها",
      sub: "نُكيّف اللغة البصرية حسب قطاعك.",
      items: [
        {
          slug: "restaurants",
          name: "المطاعم والمقاهي",
          desc: "قوائم طعام، تصاميم تطبيقات التوصيل، وتنسيق التصوير.",
        },
        {
          slug: "real-estate",
          name: "العقارات",
          desc: "تصاميم القوائم، البروشورات، هويات المشاريع.",
        },
        {
          slug: "clinics",
          name: "العيادات والرعاية الصحية",
          desc: "تصاميم نظيفة تبني الثقة وتلائم المرضى.",
        },
        {
          slug: "retail",
          name: "التجزئة والتجارة الإلكترونية",
          desc: "تصاميم المنتجات، البنرات، والتغليف.",
        },
      ],
      viewAll: "عرض جميع القطاعات ←",
    },
    matters: {
      label: "ليش يهم",
      heading: "لماذا يهمّ التصميم الاحترافي للأنشطة السعودية",
      p1html:
        'تُعدّ المملكة من أكثر دول العالم اتصالاً رقمياً — <a class="text-[#F5C518] underline decoration-[#F5C518]/40 hover:decoration-[#F5C518] underline-offset-4" href="https://datareportal.com/reports/digital-2026-saudi-arabia" target="_blank" rel="noopener noreferrer">38.6 مليون هوية على وسائل التواصل ونسبة استخدام إنترنت تبلغ 99%</a>. يُكوّن عملاؤك انطباعاً عن نشاطك من صورة مصغّرة قبل أن يصلوا إلى موقعك.',
      p2: "التصميم القوي والمتناسق يبني الثقة فوراً، ويجعلك لا تُنسى وسط الزحام، ويتيح لك تسعير خدماتك بقيمتها بدل المنافسة على السعر فقط. أما التصاميم غير المتناسقة فتفعل العكس وتُفقدك مصداقيتك يومياً.",
      p3html:
        'هل تريد معرفة أين تخسر علامتك التجارية حضورها؟ <a class="text-[#F5C518] hover:underline" href="/ar/free-audit">اطلب تدقيقاً مجانياً</a>.',
    },
    packages: {
      label: "الباقات",
      heading: "باقات تصميم الجرافيك",
      sub: "كل باقة ثنائية اللغة وتشمل الملفات المصدرية.",
      items: [
        {
          name: "الشعار والأساسيات",
          best: "الأنشطة الجديدة التي تحتاج شعاراً + أساسيات",
          from: "1,200 ريال",
          cta: "اطلب عرض سعر",
        },
        {
          name: "الهوية البصرية الكاملة",
          best: "نظام بصري موثّق ومتكامل",
          from: "3,500 ريال",
          cta: "اطلب عرض سعر",
          featured: true,
        },
        {
          name: "باقة التصميم الشهرية",
          best: "تصميم سوشيال وتسويق مستمر",
          from: "1,800 ريال / شهرياً",
          cta: "تواصل معنا",
        },
      ],
      note: "غير متأكد أيها يناسبك؟ تواصل معنا — سنوصي بناءً على أهدافك لا على ميزانيتك.",
    },
    faq: {
      label: "FAQ",
      heading: "الأسئلة الشائعة",
      items: [
        {
          q: "كم تكلفة تصميم الجرافيك في الرياض؟",
          a: "تتراوح تكلفة تصميم الجرافيك في الرياض من بضع مئات من الريالات لعمل واحد إلى عدة آلاف لهوية بصرية كاملة. في Local City Solutions تبدأ باقة الشعار والأساسيات من 1,200 ريال، والهوية البصرية الكاملة من 3,500 ريال، ويُحدَّد السعر النهائي حسب نطاق العمل في عرض سعر مجاني.",
        },
        {
          q: "ما خدمات تصميم الجرافيك التي تقدّمها Local City Solutions؟",
          a: "نقدّم تصميم الشعارات والهويات البصرية وتصاميم وسائل التواصل والمطبوعات والمواد التسويقية والتغليف والعروض التقديمية والتصاميم الإعلانية — جميعها بالعربية والإنجليزية.",
        },
        {
          q: "هل تقدّمون تصاميم ثنائية اللغة (عربي وإنجليزي)؟",
          a: "نعم. نُصمّم كل مشروع بشكل أصيل بالعربية والإنجليزية مع اتجاه صحيح من اليمين لليسار وخطوط عربية سليمة وعناصر بصرية مناسبة للسوق السعودي.",
        },
        {
          q: "هل يمكنكم الالتزام بدليل هويتنا الحالي؟",
          a: "نعم. إن كان لديك شعار أو دليل هوية فنُصمّم ضمنه للحفاظ على التناسق، وإن لم يكن فبإمكاننا بناؤه لك.",
        },
        {
          q: "هل تُصمّمون للطباعة كما للديجيتال؟",
          a: "نعم. نُسلّم ملفات CMYK جاهزة للطباعة إلى جانب ملفات محسّنة للقنوات الرقمية.",
        },
        {
          q: "هل تقدّمون دعم تصميم شهري مستمر؟",
          a: "نعم. تغطّي باقتنا الشهرية تصميم السوشيال والتسويق بانتظام، وهي مثالية للأنشطة التي تنشر بكثرة.",
        },
        {
          q: "لماذا يُعدّ التصميم الاحترافي مهماً لنشاط في السعودية؟",
          a: "مع اتصال شبه كامل للسكان بالإنترنت، تكون عناصرك البصرية غالباً أول انطباع. التصميم الاحترافي المتناسق يبني الثقة ويرفع التميّز ويدعم نمو الإيرادات — إذ تربط الأبحاث التناسق بزيادة إيرادات تصل إلى 23%.",
        },
      ],
    },
    cta: {
      heading: "لنجعل علامتك التجارية تليق بك.",
      sub: "سواء أردت شعاراً واحداً أو هوية بصرية كاملة، فريق التصميم لدينا في الرياض جاهز.",
    },
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const c = COPY[locale] || COPY.en;
  const isAr = locale === "ar";
  return {
    title: c.meta.title,
    description: c.meta.description,
    alternates: {
      canonical: `https://localcitysolutions.com/${locale}/services/graphic-design`,
      languages: {
        en: "https://localcitysolutions.com/en/services/graphic-design",
        ar: "https://localcitysolutions.com/ar/services/graphic-design",
        "x-default": "https://localcitysolutions.com/en/services/graphic-design",
      },
    },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url: `https://localcitysolutions.com/${locale}/services/graphic-design`,
      locale: isAr ? "ar_SA" : "en_SA",
      images: [
        {
          url: "https://localcitysolutions.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: c.meta.title,
        },
      ],
    },
  };
}

export default async function GraphicDesignPage({ params }: PageProps) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.en;
  const isAr = locale === "ar";
  const p = `/${locale}`;
  const pageUrl = `https://localcitysolutions.com/${locale}/services/graphic-design`;

  // JSON-LD: Service + FAQPage + BreadcrumbList in a single @graph payload so
  // the head emits one consolidated script tag for Google to consume.
  const ldJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Graphic Design",
        name: c.meta.title,
        url: pageUrl,
        description: c.meta.description,
        areaServed: {
          "@type": "City",
          name: "Riyadh",
          containedInPlace: { "@type": "Country", name: "Saudi Arabia" },
        },
        provider: {
          "@type": "LocalBusiness",
          name: "Local City Solutions",
          image: "https://localcitysolutions.com/logo.png",
          url: "https://localcitysolutions.com",
          email: "hello@localcitysolutions.com",
          telephone: "+966564229190",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Riyadh",
            addressCountry: "SA",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 24.7136,
            longitude: 46.6753,
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: c.breadcrumbHome, item: `https://localcitysolutions.com/${locale}` },
          { "@type": "ListItem", position: 2, name: c.breadcrumbServices, item: `https://localcitysolutions.com/${locale}/services` },
          { "@type": "ListItem", position: 3, name: c.breadcrumbCurrent, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <Breadcrumbs
        items={[
          { label: c.breadcrumbHome, href: `/${locale}` },
          { label: c.breadcrumbServices, href: `/${locale}/services` },
          { label: c.breadcrumbCurrent },
        ]}
      />

      {/* Hero */}
      <section className="relative bg-[#080E1A] pt-6 md:pt-10 pb-16 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse" />
            <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-widest">{c.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            {c.h1}
          </h1>
          <p className="text-[#F5C518] font-semibold text-base md:text-lg mb-4">{c.tagline}</p>
          <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">{c.heroDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={`${p}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#e6b800] transition-all shadow-xl shadow-[#F5C518]/20"
            >
              {c.ctaPrimary}
            </Link>
            <TrackableLink
              href={`${p}/free-audit`}
              track="free-audit"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-all"
            >
              {c.ctaSecondary}
            </TrackableLink>
          </div>
        </div>
      </section>

      {/* Intro paragraphs (entity-rich, GEO-friendly opening) */}
      <section className="bg-[#0C1424] py-12 md:py-16">
        <div className={`max-w-3xl mx-auto px-4 sm:px-6 space-y-5 ${isAr ? "text-right" : ""}`}>
          <p className="text-white/75 text-base md:text-lg leading-relaxed">{c.intro.p1}</p>
          <p
            className="text-white/75 text-base md:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: c.intro.p2html }}
          />
        </div>
      </section>

      {/* What We Design — features grid */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.services.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.services.heading}</h2>
            <p className="text-white/55 text-sm md:text-base max-w-2xl mx-auto">{c.services.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal delay-1">
            {c.services.items.map((f, i) => (
              <div key={i} className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 hover:border-[#F5C518]/20 transition-all h-full flex flex-col">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <p
            className={`text-white/50 text-xs md:text-sm mt-8 text-center ${isAr ? "leading-relaxed" : ""}`}
            dangerouslySetInnerHTML={{ __html: c.services.footnoteHtml }}
          />
        </div>
      </section>

      {/* Why us */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.why.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.why.heading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 reveal delay-1">
            {c.why.items.map((item, i) => (
              <div key={i} className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 hover:border-[#F5C518]/20 transition-all flex gap-4 items-start">
                <div className="text-2xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-2">{item.title}</h3>
                  {"descHtml" in item ? (
                    <p
                      className="text-white/55 text-xs md:text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.descHtml }}
                    />
                  ) : (
                    <p className="text-white/55 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.process.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.process.heading}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal delay-1">
            {c.process.steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] text-[#F5C518] font-black text-base md:text-xl mb-3 md:mb-4 mx-auto">
                  {step.num}
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center italic mt-8">{c.process.footnote}</p>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.industries.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.industries.heading}</h2>
            <p className="text-white/55 text-sm md:text-base">{c.industries.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal delay-1">
            {c.industries.items.map((item) => (
              <Link
                key={item.slug}
                href={`${p}/industries/${item.slug}`}
                className="group bg-[#0E1A2E] border border-white/5 rounded-xl p-5 hover:border-[#F5C518]/30 transition-all flex items-start gap-3"
              >
                <span className="text-[#F5C518] mt-0.5 text-lg shrink-0">{isAr ? "←" : "→"}</span>
                <div>
                  <p className="text-white font-bold text-sm mb-1 group-hover:text-[#F5C518] transition-colors">{item.name}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href={`${p}/industries`} className="inline-flex items-center text-[#F5C518] text-sm font-semibold hover:underline">
              {c.industries.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* Why it matters (citable stat block) */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.matters.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.matters.heading}</h2>
          </div>
          <div className={`space-y-5 reveal delay-1 ${isAr ? "text-right" : ""}`}>
            <p
              className="text-white/75 text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: c.matters.p1html }}
            />
            <p className="text-white/75 text-base md:text-lg leading-relaxed">{c.matters.p2}</p>
            <p
              className="text-white/75 text-base md:text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: c.matters.p3html }}
            />
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.packages.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.packages.heading}</h2>
            <p className="text-white/55 text-sm md:text-base">{c.packages.sub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal delay-1">
            {c.packages.items.map((pkg, i) => {
              const featured = "featured" in pkg && pkg.featured;
              return (
                <div
                  key={i}
                  className={`relative bg-[#0E1A2E] rounded-xl p-6 flex flex-col h-full transition-all ${
                    featured
                      ? "border-2 border-[#F5C518] shadow-2xl shadow-[#F5C518]/15 md:-translate-y-1"
                      : "border border-white/5 hover:border-[#F5C518]/20"
                  }`}
                >
                  {featured ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-block px-3 py-1 bg-[#F5C518] text-[#080E1A] text-[10px] font-black uppercase tracking-wider rounded-full">
                      {isAr ? "الأكثر طلباً" : "Most popular"}
                    </span>
                  ) : null}
                  <h3 className="text-white font-bold text-lg mb-2">{pkg.name}</h3>
                  <p className="text-white/55 text-xs mb-5 leading-relaxed">{pkg.best}</p>
                  <p className="text-[#F5C518] font-black text-2xl mb-6">{pkg.from}</p>
                  <Link
                    href={`${p}/contact`}
                    className={`mt-auto inline-flex items-center justify-center w-full px-5 py-3 rounded-full text-sm font-bold transition-all ${
                      featured
                        ? "bg-[#F5C518] text-[#080E1A] hover:bg-[#e6b800]"
                        : "border border-white/15 text-white hover:border-[#F5C518]/40 hover:text-[#F5C518]"
                    }`}
                  >
                    {pkg.cta}
                  </Link>
                </div>
              );
            })}
          </div>
          <p className={`text-white/45 text-xs md:text-sm text-center mt-8 ${isAr ? "leading-relaxed" : ""}`}>{c.packages.note}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.faq.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{c.faq.heading}</h2>
          </div>
          <div className="space-y-4 reveal delay-1">
            {c.faq.items.map((item, i) => (
              <details
                key={i}
                className="group bg-[#0E1A2E] border border-white/5 rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className={`text-white font-semibold text-sm pr-4 ${isAr ? "text-right" : ""}`}>{item.q}</span>
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518] text-sm font-bold group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 border-t border-white/5">
                  <p className={`text-white/60 text-sm leading-relaxed pt-4 ${isAr ? "text-right" : ""}`}>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTABox heading={c.cta.heading} subtitle={c.cta.sub} locale={locale} bg="dark" />
    </>
  );
}
