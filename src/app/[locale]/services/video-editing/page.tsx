import type { Metadata } from "next";
import Link from "next/link";
import CTABox from "@/components/CTABox";
import TrackableLink from "@/components/TrackableLink";
import Breadcrumbs from "@/components/Breadcrumbs";

type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{ locale: Locale }>;
}

// All bilingual copy lives in one COPY object so this route stays a single
// source of truth and the EN/AR pages can never drift apart structurally.
const COPY = {
  en: {
    meta: {
      title: "Video Editing Services in Riyadh | Reels, Ads & Brand Films",
      description:
        "Professional video editing in Riyadh: reels, video ads & brand films with Arabic + English subtitles for Saudi businesses. Local City Solutions. Get a free quote.",
    },
    breadcrumbHome: "Home",
    breadcrumbServices: "Services",
    breadcrumbCurrent: "Video Editing",
    badge: "Our Services",
    h1: "Video Editing Services in Riyadh That Turn Views Into Customers",
    tagline:
      "Reels, ads, brand films — hook-first, bilingual, and built for how Saudi watches.",
    heroDesc:
      "Reels, ads, and brand films edited to grab attention in the first three seconds — with Arabic and English subtitles, built for how Saudi Arabia actually watches.",
    ctaPrimary: "Get a Free Quote",
    ctaSecondary: "Check Your Brand's Online Health",
    intro: {
      p1: "Local City Solutions is a bilingual video editing and production company based in Riyadh, Saudi Arabia. We edit short-form social videos, video ads, and brand films for businesses across the Kingdom — with native Arabic and English subtitles, and cut for retention, not just for looks.",
      p2html:
        'Saudi Arabia is a video-first country. It has <a class="text-[#F5C518] underline decoration-[#F5C518]/40 hover:decoration-[#F5C518] underline-offset-4" href="https://datareportal.com/reports/digital-2026-saudi-arabia" target="_blank" rel="noopener noreferrer">one of the highest YouTube usage rates in the world — around 96% of internet users</a> — and most online-video viewers here are under 30. If your business isn\'t showing up in feed with sharp, scroll-stopping video, you\'re invisible to the audience that\'s actually watching. We change that.',
    },
    services: {
      label: "What We Offer",
      heading: "What We Edit & Produce",
      sub: "Every format your business needs to show up and sell on screen.",
      items: [
        {
          icon: "📱",
          title: "Short-Form Social Video",
          desc: "Reels, TikToks, and YouTube Shorts with strong hooks, captions, pacing, and trending edit styles.",
        },
        {
          icon: "🎯",
          title: "Video Ads",
          desc: "Performance-focused ad cuts for Meta, Google/YouTube, Snapchat, and TikTok — delivered in every aspect ratio your campaign needs.",
        },
        {
          icon: "🎬",
          title: "Brand & Corporate Films",
          desc: "Founder stories, about-us videos, and facility or office tours that build credibility.",
        },
        {
          icon: "🧾",
          title: "Product Videos & Explainers",
          desc: "Clear, persuasive videos that show how your product or service works.",
        },
        {
          icon: "📸",
          title: "Event Highlight Reels",
          desc: "Tight, energetic recaps of launches, conferences, and activations.",
        },
        {
          icon: "✨",
          title: "Motion Graphics & Animation",
          desc: "Animated logos, intros/outros, lower-thirds, and kinetic-text videos.",
        },
        {
          icon: "🔤",
          title: "Bilingual Subtitles & Captions",
          desc: "Accurate Arabic and English captions with correct RTL styling — so your video works with the sound off (how most people scroll).",
        },
        {
          icon: "🎨",
          title: "Color Grading & Sound Design",
          desc: "Professional finishing that makes raw footage look and sound premium.",
        },
      ],
      footnoteHtml:
        'Need the on-screen graphics and thumbnails too? Pair this with our <a class="text-[#F5C518] hover:underline" href="/en/services/graphic-design">Graphic Design service</a>.',
    },
    why: {
      label: "Why Us",
      heading: "Why Riyadh Businesses Choose LCS for Video",
      items: [
        {
          icon: "🇸🇦",
          title: "Built for how KSA watches",
          desc: "Mobile-first, vertical-first, and tuned for the platforms Saudis live on — YouTube, Snapchat, TikTok, and Instagram.",
        },
        {
          icon: "🔤",
          title: "Truly bilingual",
          desc: "Native Arabic and English subtitles with correct RTL lower-thirds — not auto-generated guesswork.",
        },
        {
          icon: "⚡",
          title: "Hook-first, retention-driven",
          desc: "We win the first 3 seconds and hold attention to the end, because that's what the algorithm rewards.",
        },
        {
          icon: "📐",
          title: "Platform-native delivery",
          desc: "Every video exported in the right aspect ratios, so one shoot fuels every channel.",
        },
        {
          icon: "🔗",
          title: "One team, whole funnel",
          descHtml:
            'Video connects to our <a class="text-[#F5C518] hover:underline" href="/en/services/graphic-design">graphic design</a>, <a class="text-[#F5C518] hover:underline" href="/en/services/social-media">social media</a>, and <a class="text-[#F5C518] hover:underline" href="/en/services/web-design">web design</a> — one consistent brand everywhere.',
        },
        {
          icon: "🎯",
          title: "A modern, Saudi tone",
          descHtml:
            'Aesthetics aligned with the ambitious spirit of <a class="text-[#F5C518] hover:underline" href="https://www.vision2030.gov.sa/" target="_blank" rel="noopener noreferrer">Vision 2030</a>, never tired stock-footage clichés.',
        },
      ],
    },
    formats: {
      label: "Formats",
      heading: "Formats & Aspect Ratios We Deliver",
      sub: "One project, exported for every platform.",
      headers: ["Platform", "Aspect ratio", "Typical length"],
      rows: [
        ["Instagram Reels / TikTok / YouTube Shorts", "9:16 (vertical)", "15–60s"],
        ["Instagram / Facebook feed", "1:1 or 4:5", "up to 90s"],
        ["YouTube (long-form)", "16:9", "as needed"],
        ["Snapchat", "9:16", "short"],
        ["Meta & Google video ads", "multiple cuts", "6–30s"],
        ["LinkedIn", "1:1 or 16:9", "up to 10 min"],
      ],
    },
    process: {
      label: "Our Process",
      heading: "How We Work",
      steps: [
        {
          num: "01",
          title: "Brief & Concept",
          desc: "We align on your goal, audience, and message, and shape a concept or script.",
        },
        {
          num: "02",
          title: "Footage",
          desc: "You send your footage, or we guide you on what to capture (and can arrange a shoot when needed).",
        },
        {
          num: "03",
          title: "Edit",
          desc: "We cut, add motion graphics and bilingual captions, color grade, and design sound — refined through structured revision rounds.",
        },
        {
          num: "04",
          title: "Delivery",
          desc: "You receive platform-ready exports in every aspect ratio, with the project file handed over on request.",
        },
      ],
      footnote:
        "Timelines are scoped to each project and shared with you after the brief.",
    },
    industries: {
      label: "Industries",
      heading: "Industries We Produce Video For",
      sub: "We adapt the format and tone to your sector.",
      items: [
        {
          slug: "restaurants",
          name: "Restaurants & Cafés",
          desc: "Food reels, delivery-app ads, ambience films.",
        },
        {
          slug: "real-estate",
          name: "Real Estate",
          desc: "Property tours, project launch films.",
        },
        {
          slug: "clinics",
          name: "Healthcare & Clinics",
          desc: "Patient-trust explainers, doctor intros.",
        },
        {
          slug: "retail",
          name: "Retail & E-commerce",
          desc: "Product videos, promo ads.",
        },
      ],
      viewAll: "See all industries →",
    },
    matters: {
      label: "Why It Matters",
      heading: "Why Video Matters for Saudi Businesses",
      p1html:
        'Saudi Arabia leads the world in video consumption — it has <a class="text-[#F5C518] underline decoration-[#F5C518]/40 hover:decoration-[#F5C518] underline-offset-4" href="https://datareportal.com/reports/digital-2026-saudi-arabia" target="_blank" rel="noopener noreferrer">around 96% YouTube penetration and 99% internet penetration</a>, and the majority of its online-video audience is under 30. Locally produced video consistently outperforms generic content here.',
      p2: "What that means for your business: video is no longer optional. It earns more attention than any static post, builds trust faster (people believe what they can see and hear), and is what the social algorithms push hardest. A business publishing strong, consistent video doesn't just look modern — it gets reach competitors can't buy.",
      p3html:
        'Want to see where your brand\'s online presence is falling behind? <a class="text-[#F5C518] hover:underline" href="/en/free-audit">Run a free audit</a>.',
    },
    packages: {
      label: "Packages",
      heading: "Video Packages",
      sub: "Every package is bilingual, platform-ready, and delivered in all aspect ratios you need.",
      items: [
        {
          icon: "🎯",
          name: "Social Video Pack",
          best: "Ongoing short-form video for brands that post regularly.",
          includes: [
            "Monthly batch of Reels / TikToks / Shorts",
            "Hooks + bilingual captions",
            "Trending edit styles",
            "All vertical exports",
          ],
          cta: "Request a tailored quote",
        },
        {
          icon: "🎬",
          name: "Brand Film",
          best: "A hero video that builds credibility on your website and socials.",
          includes: [
            "Founder story / about-us / facility tour",
            "Scripting support",
            "Motion graphics",
            "Color grade + sound design",
            "Multi-aspect exports",
          ],
          cta: "Request a tailored quote",
          featured: true,
        },
        {
          icon: "🚀",
          name: "Video Ad Pack",
          best: "Performance-focused ad creative for paid campaigns.",
          includes: [
            "Multiple ad cuts per concept",
            "All aspect ratios (9:16 / 1:1 / 16:9)",
            "Hook variations for A/B testing",
            "Captions in Arabic + English",
          ],
          cta: "Request a tailored quote",
        },
        {
          icon: "📸",
          name: "Event Highlights",
          best: "Tight, energetic recaps of launches and activations.",
          includes: [
            "Highlight reel",
            "Social cut-downs",
            "Bilingual captions",
            "Music + sound design",
          ],
          cta: "Request a tailored quote",
        },
      ],
      note: "Every package is tailored to your scope — not pulled off a shelf. Tell us what you're trying to do; we'll recommend the right mix.",
    },
    faq: {
      label: "FAQ",
      heading: "Frequently Asked Questions",
      items: [
        {
          q: "What video editing services does Local City Solutions offer?",
          a: "We offer short-form social video (Reels, TikToks, Shorts), video ads, brand and corporate films, product videos, event highlight reels, motion graphics, and bilingual subtitling — all in Arabic and English.",
        },
        {
          q: "Do you add Arabic and English subtitles to videos?",
          a: "Yes. We add accurate Arabic and English captions with correct right-to-left styling, so your videos work with the sound off — which is how most people scroll social media.",
        },
        {
          q: "Can you edit videos for Instagram Reels, TikTok, and YouTube?",
          a: "Yes. We edit platform-native video for Reels, TikTok, YouTube, Shorts, and Snapchat, and export every project in the correct aspect ratio for each platform.",
        },
        {
          q: "Do you provide the footage, or do we?",
          a: "You can send us your own footage, or we'll guide you on exactly what to capture. For larger projects, we can also arrange a professional shoot.",
        },
        {
          q: "Can you produce video ads for Meta and Google?",
          a: "Yes. We create performance-focused ad cuts for Meta, Google/YouTube, Snapchat, and TikTok, including multiple hook variations and aspect ratios for testing.",
        },
        {
          q: "Do you offer ongoing or monthly video editing?",
          a: "Yes. Our Social Video Pack delivers a regular batch of short-form videos each month, ideal for businesses that publish frequently and need to stay consistent.",
        },
        {
          q: "How do you price video projects?",
          a: "Video pricing depends on the type of video, its length, the number of deliverables, and revision rounds. We provide a clear, custom quote after a quick brief — just contact us.",
        },
        {
          q: "Why is video important for businesses in Saudi Arabia?",
          a: "With one of the world's highest YouTube usage rates and a largely under-30 online-video audience, video is the most effective way to reach Saudi customers. It earns more attention than static content, builds trust faster, and is prioritized by social algorithms.",
        },
      ],
    },
    cta: {
      heading: "Let's make video your unfair advantage.",
      sub: "From a single reel to a full brand film, our Riyadh video team is ready to make you impossible to scroll past.",
    },
  },
  ar: {
    meta: {
      title: "خدمات مونتاج الفيديو في الرياض | ريلز وإعلانات وأفلام تعريفية",
      description:
        "مونتاج فيديو احترافي في الرياض: ريلز وإعلانات وأفلام تعريفية مع ترجمة عربية وإنجليزية للأنشطة السعودية. Local City Solutions. اطلب عرض سعر مجاني.",
    },
    breadcrumbHome: "الرئيسية",
    breadcrumbServices: "خدماتنا",
    breadcrumbCurrent: "مونتاج الفيديو",
    badge: "خدماتنا",
    h1: "خدمات مونتاج الفيديو في الرياض التي تُحوّل المشاهدات إلى عملاء",
    tagline: "ريلز وإعلانات وأفلام تعريفية — تبدأ بمقدمة قوية وبلغتين وملائمة لذوق السوق السعودي.",
    heroDesc:
      "ريلز وإعلانات وأفلام تعريفية بمونتاج يلفت الانتباه في أول ثلاث ثوانٍ — مع ترجمة عربية وإنجليزية، ومصمّمة لطريقة مشاهدة الجمهور السعودي فعلاً.",
    ctaPrimary: "احصل على عرض سعر مجاني",
    ctaSecondary: "افحص صحة علامتك على الإنترنت",
    intro: {
      p1: "Local City Solutions هي شركة مونتاج وإنتاج فيديو ثنائية اللغة مقرّها الرياض في المملكة العربية السعودية. نُنتج مقاطع الفيديو القصيرة وإعلانات الفيديو والأفلام التعريفية للأنشطة في جميع أنحاء المملكة — مع ترجمة عربية وإنجليزية أصيلة، ومونتاج يركّز على بقاء المشاهد لا على الشكل فقط.",
      p2html:
        'المملكة سوق يعتمد على الفيديو أولاً، إذ تمتلك <a class="text-[#F5C518] underline decoration-[#F5C518]/40 hover:decoration-[#F5C518] underline-offset-4" href="https://datareportal.com/reports/digital-2026-saudi-arabia" target="_blank" rel="noopener noreferrer">واحدة من أعلى نسب استخدام يوتيوب في العالم — نحو 96% من مستخدمي الإنترنت</a>، ومعظم جمهور الفيديو هنا تحت سن الثلاثين. وإن لم يظهر نشاطك في الفيد بفيديو قوي يوقف التمرير، فأنت غائب عن الجمهور الذي يشاهد فعلاً. نحن نُغيّر ذلك.',
    },
    services: {
      label: "ماذا نقدم",
      heading: "ماذا نُونتِج ونُنتج",
      sub: "كل صيغة يحتاجها نشاطك ليظهر ويبيع على الشاشة.",
      items: [
        {
          icon: "📱",
          title: "الفيديو القصير للسوشيال",
          desc: "ريلز وتيك توك ويوتيوب شورتس بمقدمات قوية وترجمة وإيقاع وأساليب مونتاج رائجة.",
        },
        {
          icon: "🎯",
          title: "إعلانات الفيديو",
          desc: "نسخ إعلانية تركّز على الأداء لميتا وقوقل/يوتيوب وسناب شات وتيك توك — بجميع أبعاد الشاشة التي تحتاجها حملتك.",
        },
        {
          icon: "🎬",
          title: "الأفلام التعريفية والمؤسسية",
          desc: "قصص المؤسسين، وفيديوهات «من نحن»، وجولات المقرّات لبناء المصداقية.",
        },
        {
          icon: "🧾",
          title: "فيديوهات المنتجات والشرح",
          desc: "فيديوهات واضحة ومقنعة تُظهر كيف يعمل منتجك أو خدمتك.",
        },
        {
          icon: "📸",
          title: "ملخّصات الفعاليات",
          desc: "ملخّصات مكثّفة وحيوية لإطلاقات المنتجات والمؤتمرات.",
        },
        {
          icon: "✨",
          title: "الموشن جرافيك والأنيميشن",
          desc: "شعارات متحرّكة ومقدّمات وخواتيم ونصوص حركية.",
        },
        {
          icon: "🔤",
          title: "الترجمة والتعليقات النصية ثنائية اللغة",
          desc: "ترجمة عربية وإنجليزية دقيقة بتنسيق صحيح من اليمين لليسار — ليعمل الفيديو دون صوت (كما يتصفّح معظم الناس).",
        },
        {
          icon: "🎨",
          title: "تصحيح الألوان وتصميم الصوت",
          desc: "لمسة احترافية تجعل اللقطات الخام تبدو وتُسمع بمستوى عالٍ.",
        },
      ],
      footnoteHtml:
        'تحتاج الجرافيك والصور المصغّرة أيضاً؟ اجمعها مع <a class="text-[#F5C518] hover:underline" href="/ar/services/graphic-design">خدمة تصميم الجرافيك</a>.',
    },
    why: {
      label: "ليش نحن",
      heading: "لماذا تختار الأنشطة في الرياض شركة LCS للفيديو",
      items: [
        {
          icon: "🇸🇦",
          title: "مصمّم لطريقة مشاهدة السعودية",
          desc: "يركّز على الجوال والفيديو العمودي والمنصّات التي يعيش عليها السعوديون — يوتيوب وسناب شات وتيك توك وإنستغرام.",
        },
        {
          icon: "🔤",
          title: "ثنائي اللغة فعلاً",
          desc: "ترجمة عربية وإنجليزية أصيلة بتنسيق صحيح — وليست ترجمة آلية تخمينية.",
        },
        {
          icon: "⚡",
          title: "يبدأ بالمقدمة ويُبقي الانتباه",
          desc: "نكسب أول ثلاث ثوانٍ ونُبقي المشاهد حتى النهاية، لأن هذا ما تكافئه الخوارزمية.",
        },
        {
          icon: "📐",
          title: "تسليم متوافق مع كل منصّة",
          desc: "كل فيديو بأبعاد الشاشة الصحيحة، فتصوير واحد يغذّي كل القنوات.",
        },
        {
          icon: "🔗",
          title: "فريق واحد لكامل مسارك",
          descHtml:
            'يرتبط الفيديو بخدمات <a class="text-[#F5C518] hover:underline" href="/ar/services/graphic-design">تصميم الجرافيك</a> و<a class="text-[#F5C518] hover:underline" href="/ar/services/social-media">السوشيال ميديا</a> و<a class="text-[#F5C518] hover:underline" href="/ar/services/web-design">تصميم المواقع</a>.',
        },
        {
          icon: "🎯",
          title: "روح سعودية حديثة",
          descHtml:
            'جماليات تتماشى مع طموح <a class="text-[#F5C518] hover:underline" href="https://www.vision2030.gov.sa/" target="_blank" rel="noopener noreferrer">رؤية 2030</a> بعيداً عن اللقطات النمطية المستهلكة.',
        },
      ],
    },
    formats: {
      label: "الصيغ",
      heading: "الصيغ وأبعاد الشاشة التي نُسلّمها",
      sub: "مشروع واحد، مُصدّر لكل منصّة.",
      headers: ["المنصّة", "أبعاد الشاشة", "المدّة المعتادة"],
      rows: [
        ["ريلز / تيك توك / يوتيوب شورتس", "9:16 (عمودي)", "15–60 ثانية"],
        ["فيد إنستغرام / فيسبوك", "1:1 أو 4:5", "حتى 90 ثانية"],
        ["يوتيوب (طويل)", "16:9", "حسب الحاجة"],
        ["سناب شات", "9:16", "قصير"],
        ["إعلانات ميتا وقوقل", "نسخ متعدّدة", "6–30 ثانية"],
        ["لينكدإن", "1:1 أو 16:9", "حتى 10 دقائق"],
      ],
    },
    process: {
      label: "طريقة شغلنا",
      heading: "مراحل عملنا في الفيديو",
      steps: [
        {
          num: "٠١",
          title: "الموجز والفكرة",
          desc: "نتفق على الهدف والجمهور والرسالة، ونصيغ الفكرة أو النص.",
        },
        {
          num: "٠٢",
          title: "اللقطات",
          desc: "ترسل لقطاتك، أو نُرشدك لما يجب تصويره (ويمكننا ترتيب تصوير عند الحاجة).",
        },
        {
          num: "٠٣",
          title: "المونتاج",
          desc: "نُقطّع ونضيف الموشن جرافيك والترجمة ثنائية اللغة ونُصحّح الألوان ونُصمّم الصوت عبر جولات مراجعة منظّمة.",
        },
        {
          num: "٠٤",
          title: "التسليم",
          desc: "تستلم نسخاً جاهزة لكل منصّة بجميع الأبعاد، مع تسليم ملف المشروع عند الطلب.",
        },
      ],
      footnote: "تُحدَّد المدد الزمنية حسب كل مشروع وتُشارك معك بعد الموجز.",
    },
    industries: {
      label: "القطاعات",
      heading: "القطاعات التي نُنتج لها الفيديو",
      sub: "نُكيّف الصيغة والنبرة حسب قطاعك.",
      items: [
        {
          slug: "restaurants",
          name: "المطاعم والمقاهي",
          desc: "ريلز الأكل، إعلانات تطبيقات التوصيل، أفلام الأجواء.",
        },
        {
          slug: "real-estate",
          name: "العقارات",
          desc: "جولات العقارات، أفلام إطلاق المشاريع.",
        },
        {
          slug: "clinics",
          name: "العيادات والرعاية الصحية",
          desc: "فيديوهات شرح تبني ثقة المرضى وتعريف الأطباء.",
        },
        {
          slug: "retail",
          name: "التجزئة والتجارة الإلكترونية",
          desc: "فيديوهات منتجات وإعلانات ترويجية.",
        },
      ],
      viewAll: "عرض جميع القطاعات ←",
    },
    matters: {
      label: "ليش يهم",
      heading: "لماذا يهمّ الفيديو للأنشطة السعودية",
      p1html:
        'تتصدّر المملكة العالم في استهلاك الفيديو، إذ تمتلك <a class="text-[#F5C518] underline decoration-[#F5C518]/40 hover:decoration-[#F5C518] underline-offset-4" href="https://datareportal.com/reports/digital-2026-saudi-arabia" target="_blank" rel="noopener noreferrer">نحو 96% نسبة استخدام يوتيوب و99% نسبة استخدام إنترنت</a>، وغالبية جمهور الفيديو فيها تحت الثلاثين. كما يتفوّق المحتوى المنتَج محلياً باستمرار على المحتوى العام.',
      p2: "ماذا يعني ذلك لنشاطك؟ الفيديو لم يعد خياراً. فهو يجذب انتباهاً أكثر من أي منشور ثابت، ويبني الثقة أسرع (الناس يصدّقون ما يرونه ويسمعونه)، وهو الأكثر دفعاً من خوارزميات السوشيال. النشاط الذي ينشر فيديو قوياً ومتناسقاً لا يبدو حديثاً فحسب، بل يحصل على وصول لا يستطيع المنافسون شراءه.",
      p3html:
        'هل تريد معرفة أين يتأخّر حضور علامتك على الإنترنت؟ <a class="text-[#F5C518] hover:underline" href="/ar/free-audit">اطلب تدقيقاً مجانياً</a>.',
    },
    packages: {
      label: "الباقات",
      heading: "باقات الفيديو",
      sub: "كل باقة ثنائية اللغة، جاهزة لكل منصّة، ومُسلّمة بجميع الأبعاد التي تحتاجها.",
      items: [
        {
          icon: "🎯",
          name: "باقة الفيديو الاجتماعي",
          best: "فيديو قصير مستمر للأنشطة التي تنشر بانتظام.",
          includes: [
            "دفعة شهرية من الريلز / التيك توك / الشورتس",
            "مقدمات وترجمة ثنائية اللغة",
            "أساليب مونتاج رائجة",
            "جميع النسخ العمودية",
          ],
          cta: "اطلب عرض سعر مخصّص",
        },
        {
          icon: "🎬",
          name: "الفيلم التعريفي",
          best: "فيديو رئيسي يبني المصداقية على موقعك وحساباتك.",
          includes: [
            "قصة المؤسس / من نحن / جولة المقر",
            "دعم كتابة النص",
            "موشن جرافيك",
            "تصحيح ألوان وتصميم صوت",
            "نسخ بأبعاد متعدّدة",
          ],
          cta: "اطلب عرض سعر مخصّص",
          featured: true,
        },
        {
          icon: "🚀",
          name: "باقة إعلانات الفيديو",
          best: "محتوى إعلاني يركّز على الأداء للحملات المدفوعة.",
          includes: [
            "نسخ إعلانية متعدّدة لكل فكرة",
            "جميع الأبعاد (9:16 / 1:1 / 16:9)",
            "مقدمات متنوّعة لاختبار A/B",
            "ترجمة عربية وإنجليزية",
          ],
          cta: "اطلب عرض سعر مخصّص",
        },
        {
          icon: "📸",
          name: "ملخّصات الفعاليات",
          best: "ملخّصات مكثّفة وحيوية للإطلاقات والفعاليات.",
          includes: [
            "فيديو ملخّص",
            "نسخ للسوشيال",
            "ترجمة ثنائية اللغة",
            "موسيقى وتصميم صوت",
          ],
          cta: "اطلب عرض سعر مخصّص",
        },
      ],
      note: "كل باقة مُفصّلة حسب نطاقك — لا قائمة سعر جاهزة. أخبرنا بما تحاول تحقيقه وسنوصي بالمزيج الصح.",
    },
    faq: {
      label: "FAQ",
      heading: "الأسئلة الشائعة",
      items: [
        {
          q: "ما خدمات مونتاج الفيديو التي تقدّمها Local City Solutions؟",
          a: "نقدّم الفيديو القصير للسوشيال (ريلز وتيك توك وشورتس) وإعلانات الفيديو والأفلام التعريفية والمؤسسية وفيديوهات المنتجات وملخّصات الفعاليات والموشن جرافيك والترجمة ثنائية اللغة — جميعها بالعربية والإنجليزية.",
        },
        {
          q: "هل تضيفون ترجمة عربية وإنجليزية للفيديو؟",
          a: "نعم. نضيف ترجمة عربية وإنجليزية دقيقة بتنسيق صحيح من اليمين لليسار، ليعمل الفيديو دون صوت — وهي الطريقة التي يتصفّح بها معظم الناس السوشيال.",
        },
        {
          q: "هل تُونتِجون فيديو لريلز وتيك توك ويوتيوب؟",
          a: "نعم. نُونتِج فيديو متوافقاً مع كل منصّة لريلز وتيك توك ويوتيوب وشورتس وسناب شات، ونُصدّر كل مشروع بالأبعاد الصحيحة لكل منصّة.",
        },
        {
          q: "هل توفّرون اللقطات أم نوفّرها نحن؟",
          a: "يمكنك إرسال لقطاتك الخاصة، أو نُرشدك بدقة لما يجب تصويره. وللمشاريع الأكبر يمكننا ترتيب تصوير احترافي.",
        },
        {
          q: "هل تُنتجون إعلانات فيديو لميتا وقوقل؟",
          a: "نعم. نُنشئ نسخاً إعلانية تركّز على الأداء لميتا وقوقل/يوتيوب وسناب شات وتيك توك، بمقدمات وأبعاد متعدّدة للاختبار.",
        },
        {
          q: "هل تقدّمون مونتاج فيديو شهرياً مستمراً؟",
          a: "نعم. تُسلّم باقة الفيديو الاجتماعي دفعة منتظمة من الفيديوهات القصيرة شهرياً، وهي مثالية للأنشطة التي تنشر بكثرة.",
        },
        {
          q: "كيف تُسعّرون مشاريع الفيديو؟",
          a: "يعتمد سعر الفيديو على نوعه ومدّته وعدد المخرجات وجولات المراجعة. نقدّم عرض سعر واضحاً ومخصّصاً بعد موجز سريع — فقط تواصل معنا.",
        },
        {
          q: "لماذا يُعدّ الفيديو مهماً للأنشطة في السعودية؟",
          a: "مع امتلاك المملكة واحدة من أعلى نسب استخدام يوتيوب في العالم وجمهور فيديو غالبيته تحت الثلاثين، يُعدّ الفيديو أكثر الطرق فعاليةً للوصول للعملاء السعوديين. فهو يجذب انتباهاً أكثر من المحتوى الثابت، ويبني الثقة أسرع، وتُعطيه خوارزميات السوشيال الأولوية.",
        },
      ],
    },
    cta: {
      heading: "لنجعل الفيديو ميزتك التنافسية.",
      sub: "من ريل واحد إلى فيلم تعريفي كامل، فريق الفيديو لدينا في الرياض جاهز ليجعلك مستحيل التجاوز.",
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
      canonical: `https://localcitysolutions.com/${locale}/services/video-editing`,
      languages: {
        en: "https://localcitysolutions.com/en/services/video-editing",
        ar: "https://localcitysolutions.com/ar/services/video-editing",
        "x-default": "https://localcitysolutions.com/en/services/video-editing",
      },
    },
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      url: `https://localcitysolutions.com/${locale}/services/video-editing`,
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

export default async function VideoEditingPage({ params }: PageProps) {
  const { locale } = await params;
  const c = COPY[locale] || COPY.en;
  const isAr = locale === "ar";
  const p = `/${locale}`;
  const pageUrl = `https://localcitysolutions.com/${locale}/services/video-editing`;

  // JSON-LD: Service + BreadcrumbList + FAQPage in a single @graph payload.
  //
  // VideoObject (showreel) is intentionally OMITTED until a real showreel is
  // hosted — schema.org's VideoObject requires a working contentUrl/embedUrl,
  // and Google Search Console flags broken video schema as a structured-data
  // violation. To wire it back in: add a node like the example below to
  // @graph with real values for contentUrl/embedUrl/thumbnailUrl/duration.
  //
  //   {
  //     "@type": "VideoObject",
  //     "name": "Local City Solutions — Video Editing Showreel",
  //     "description": "Bilingual video editing showreel for Saudi businesses.",
  //     "thumbnailUrl": "https://localcitysolutions.com/images/services/video-showreel-thumb.jpg",
  //     "uploadDate": "2026-06-01",
  //     "contentUrl": "https://localcitysolutions.com/videos/showreel.mp4",
  //     "embedUrl": "https://www.youtube.com/embed/REAL_VIDEO_ID",
  //     "duration": "PT1M20S"
  //   }
  const ldJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Video Editing & Production",
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

      {/* Intro paragraphs */}
      <section className="bg-[#0C1424] py-12 md:py-16">
        <div className={`max-w-3xl mx-auto px-4 sm:px-6 space-y-5 ${isAr ? "text-right" : ""}`}>
          <p className="text-white/75 text-base md:text-lg leading-relaxed">{c.intro.p1}</p>
          <p
            className="text-white/75 text-base md:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: c.intro.p2html }}
          />
        </div>
      </section>

      {/* What we edit & produce */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.services.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.services.heading}</h2>
            <p className="text-white/55 text-sm md:text-base max-w-2xl mx-auto">{c.services.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal delay-1">
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

      {/* Formats / aspect-ratio table */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.formats.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.formats.heading}</h2>
            <p className="text-white/55 text-sm md:text-base">{c.formats.sub}</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/10 reveal delay-1">
            <table className={`w-full text-sm md:text-base ${isAr ? "text-right" : "text-left"}`}>
              <thead>
                <tr className="bg-[#F5C518]/15">
                  {c.formats.headers.map((h, i) => (
                    <th key={i} className="p-4 font-bold text-white">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.formats.rows.map((row, ri) => (
                  <tr key={ri} className="border-t border-white/10 hover:bg-white/5">
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-4 text-white/75">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0C1424] py-16 md:py-24">
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
      <section className="bg-[#080E1A] py-16 md:py-24">
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

      {/* Why it matters */}
      <section className="bg-[#0C1424] py-16 md:py-24">
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

      {/* Packages — 4-bundle grid */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{c.packages.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{c.packages.heading}</h2>
            <p className="text-white/55 text-sm md:text-base">{c.packages.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal delay-1">
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
                  <div className="text-3xl mb-3">{pkg.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{pkg.name}</h3>
                  <p className="text-white/55 text-xs mb-4 leading-relaxed">{pkg.best}</p>
                  <ul className={`text-white/70 text-xs leading-relaxed space-y-1.5 mb-6 ${isAr ? "text-right" : ""}`}>
                    {pkg.includes.map((line, j) => (
                      <li key={j} className={`flex gap-2 items-start ${isAr ? "flex-row-reverse" : ""}`}>
                        <span className="text-[#F5C518] mt-0.5 shrink-0">✓</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
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
      <section className="bg-[#0C1424] py-16 md:py-24">
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
