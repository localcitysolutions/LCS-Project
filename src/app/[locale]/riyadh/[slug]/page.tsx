import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTABox from "@/components/CTABox";
import TrackableLink from "@/components/TrackableLink";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

interface ArContent {
  heroDesc: string;
  about: string[];
  industries: string[];
  services: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaSubtitle: string;
}

interface District {
  slug: string;
  name: string;
  nameAr: string;
  zone: string;
  tagline: string;
  heroDesc: string;
  about: string[];
  industries: { name: string; icon: string }[];
  services: { title: string; desc: string }[];
  nearby: { name: string; slug: string }[];
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaSubtitle: string;
  arContent?: ArContent;
}

const ZONE_AR: Record<string, string> = {
  "Central Riyadh": "وسط الرياض",
  "North Riyadh": "شمال الرياض",
  "East Riyadh": "شرق الرياض",
  "West Riyadh": "غرب الرياض",
  "South Riyadh": "جنوب الرياض",
};

const DISTRICTS: District[] = [
  {
    slug: "al-olaya",
    name: "Al Olaya",
    nameAr: "العليا",
    zone: "Central Riyadh",
    tagline: "Digital Marketing in Riyadh's Premier Business District",
    heroDesc:
      "Al Olaya is the beating heart of Riyadh's commercial life — home to Fortune 500 offices, luxury towers, and the Kingdom's top retail brands. We help businesses here compete at the highest level.",
    about: [
      "Al Olaya (العليا) stands as Riyadh's most prestigious business address. Olaya Street runs north-to-south as a spine of commerce lined with five-star hotels, corporate headquarters, and flagship retail. Every major bank, consulting firm, and luxury brand maintains a presence here — meaning competition for local visibility is fierce.",
      "The district attracts a high-income demographic including Saudi executives, expatriate professionals, and international business travelers. Google searches in Al Olaya skew heavily toward premium services: luxury hospitality, corporate catering, high-end clinics, and business services. Ranking here requires precision keyword targeting and a strong brand trust signal.",
      "Local City Solutions has worked extensively in Al Olaya, running Google Ads and SEO campaigns for professional services firms, medical clinics, and upscale restaurants. We understand what it takes to cut through the noise in the Kingdom's most competitive postal code.",
    ],
    industries: [
      { name: "Corporate Services", icon: "🏢" },
      { name: "Luxury Retail", icon: "💎" },
      { name: "Medical Clinics", icon: "🏥" },
      { name: "Fine Dining", icon: "🍽️" },
      { name: "Financial Services", icon: "📈" },
      { name: "Real Estate", icon: "🏙️" },
    ],
    services: [
      { title: "Hyperlocal SEO for Al Olaya", desc: "Rank on Google Maps and organic results for high-intent searches in Al Olaya and surrounding towers." },
      { title: "Google Ads Management", desc: "Precision ad campaigns targeting decision-makers and high-income residents in the Olaya corridor." },
      { title: "LinkedIn & Meta Ads", desc: "B2B and luxury consumer campaigns targeting the professional demographic concentrated in Al Olaya." },
      { title: "Google Business Profile", desc: "Optimize your GBP listing to dominate the local 3-pack for searches in Al Olaya and Olaya Street." },
      { title: "Website Design", desc: "Premium-positioned websites that match the quality expectations of Al Olaya's discerning clientele." },
      { title: "Reputation Management", desc: "Build and protect your online reputation in a district where trust and prestige drive purchase decisions." },
    ],
    nearby: [
      { name: "Al Sulaimaniyah", slug: "al-sulaimaniyah" },
      { name: "Al Rawdah", slug: "al-rawdah" },
      { name: "KAFD", slug: "kafd" },
      { name: "King Fahd District", slug: "king-fahd-district" },
    ],
    faq: [
      { q: "How competitive is digital marketing in Al Olaya compared to other Riyadh districts?", a: "Al Olaya is the most competitive district in Riyadh. CPCs for Google Ads can run 3–5× higher than in suburban districts. Success requires tight audience targeting, strong Quality Scores, and SEO authority built over months — not quick fixes." },
      { q: "What industries see the best ROI from digital marketing in Al Olaya?", a: "Medical clinics, legal firms, corporate catering, luxury retail, and real estate consistently see the strongest returns. These sectors have high average transaction values that justify premium ad spend." },
      { q: "Can a small business compete in Al Olaya digitally?", a: "Yes — by owning a very specific niche. A boutique physiotherapy clinic or specialty café can dominate a narrow search category even against larger competitors. Hyperlocal SEO and a strong Google Business Profile are your best tools." },
    ],
    ctaHeading: "Win in Al Olaya's Competitive Market",
    ctaSubtitle: "We know Al Olaya inside out. Get a free audit and a tailored strategy to grow your visibility in Riyadh's prime business district.",
    arContent: {
      heroDesc: "العليا هي قلب الرياض التجاري النابض — موطن مكاتب الشركات العالمية والأبراج الفاخرة وأبرز ماركات التجزئة في المملكة. نساعد الأعمال هنا على المنافسة في أعلى المستويات.",
      about: [
        "العليا (Al Olaya) أرقى عنوان تجاري في الرياض. شارع العليا يمتد من الجنوب للشمال كعمود فقري تجاري مُبطّن بالفنادق الخمسة نجوم والمقرات الرئيسية للشركات والعلامات التجارية الفاخرة. كل مصرف كبير وشركة استشارات وماركة راقية لها حضور هنا — مما يجعل المنافسة على الظهور المحلي شرسة بأعلى درجاتها.",
        "يستقطب الحي جمهوراً ذا دخل مرتفع يشمل مديرين تنفيذيين سعوديين ومحترفين أجانب ورجال أعمال دوليين. البحث في العليا يتمحور حول الخدمات الراقية: الضيافة الفاخرة، التموين الرسمي، العيادات المتخصصة، وخدمات الأعمال. الوصول هنا يتطلب استهدافاً دقيقاً للكلمات المفتاحية وإشارات قوية لمصداقية العلامة التجارية.",
        "لوكال سيتي سولوشنز تعمل بكثافة في العليا، حيث أدرنا حملات قوقل وSEO لشركات الخدمات المهنية والعيادات الطبية والمطاعم الراقية. نفهم ما يتطلبه التميز في أكثر رمز بريدي تنافسية في المملكة.",
      ],
      industries: ["خدمات الشركات", "تجزئة فاخرة", "عيادات طبية", "مطاعم راقية", "خدمات مالية", "عقارات"],
      services: [
        { title: "SEO محلي مكثّف في العليا", desc: "تصدّر نتائج خرائط قوقل والبحث الطبيعي لاستفسارات ذات نية مرتفعة في العليا والأبراج المحيطة." },
        { title: "إدارة إعلانات قوقل", desc: "حملات دقيقة تستهدف صناع القرار والمقيمين ذوي الدخل المرتفع في محور العليا." },
        { title: "إعلانات لينكدإن وميتا", desc: "حملات B2B وراقية للمستهلكين تستهدف الشريحة المهنية المتركزة في العليا." },
        { title: "ملف النشاط في قوقل", desc: "تحسين قائمة ملفك التجاري لتتصدر نتائج الخريطة الثلاثية لعمليات البحث في العليا وشارع العليا." },
        { title: "تصميم مواقع", desc: "مواقع بمكانة متميزة تتناسب مع توقعات عملاء العليا الراقيين." },
        { title: "إدارة السمعة", desc: "بناء وحماية سمعتك الإلكترونية في حي تقود فيه الثقة والهيبة قرارات الشراء." },
      ],
      faq: [
        { q: "ما مدى تنافسية التسويق الرقمي في العليا مقارنة بأحياء الرياض الأخرى؟", a: "العليا هي الأكثر تنافسية في الرياض. تكاليف النقر على إعلانات قوقل قد تكون أعلى ٣–٥ أضعاف مقارنة بالأحياء الطرفية. النجاح يتطلب استهداف دقيق للجمهور ونقاط جودة قوية وسلطة SEO مبنية على مدى أشهر — لا حلول سريعة." },
        { q: "ما القطاعات التي تحقق أفضل عائد من التسويق الرقمي في العليا؟", a: "العيادات الطبية وشركات المحاماة وشركات التموين للشركات والتجزئة الفاخرة والعقارات تحقق باستمرار أقوى عوائد. هذه القطاعات لها قيمة معاملة مرتفعة تبرر الإنفاق الإعلاني المرتفع." },
        { q: "هل يمكن لمشروع صغير المنافسة رقمياً في العليا؟", a: "نعم — بامتلاك مكانة متخصصة جداً. عيادة علاج طبيعي متخصصة أو كافيه مميز يمكنه السيطرة على فئة بحث ضيقة حتى أمام منافسين أكبر. SEO المحلي المكثّف وملف النشاط القوي في قوقل هما أفضل أدواتك." },
      ],
      ctaHeading: "تفوّق في سوق العليا التنافسي",
      ctaSubtitle: "نعرف العليا من الداخل. احصل على تدقيق مجاني واستراتيجية مخصصة لتنمية ظهورك في أبرز حي تجاري في الرياض.",
    },
  },
  {
    slug: "al-sulaimaniyah",
    name: "Al Sulaimaniyah",
    nameAr: "السليمانية",
    zone: "Central Riyadh",
    tagline: "Digital Marketing for Al Sulaimaniyah's Upscale Business Community",
    heroDesc:
      "Al Sulaimaniyah is one of central Riyadh's most prestigious residential and commercial addresses, blending upscale villas, embassies, and high-end dining. We help businesses here stand out to an affluent local audience.",
    about: [
      "Al Sulaimaniyah (السليمانية) occupies a prime slice of central Riyadh, wedged between Al Olaya to the west and Al Rawdah to the east. The district is known for wide, tree-lined streets, luxury villas housing diplomats and senior executives, and a cluster of some of Riyadh's most celebrated restaurants and boutique services.",
      "The audience here is distinctly high-net-worth. Residents include Saudi royals, senior government officials, and expatriate professionals. They search for premium experiences — private dining, medical specialists, interior design, and exclusive retail. Reaching this demographic requires sophistication in messaging, not just budget.",
      "We have helped restaurants, dermatology clinics, and event planners in Al Sulaimaniyah grow their booking rates through a combination of Google Maps optimization, high-intent SEO, and targeted social media campaigns that resonate with the area's lifestyle expectations.",
    ],
    industries: [
      { name: "Fine Dining & Cafés", icon: "🍽️" },
      { name: "Private Medical", icon: "⚕️" },
      { name: "Interior Design", icon: "🛋️" },
      { name: "Luxury Services", icon: "✨" },
      { name: "Embassy & Diplomatic", icon: "🏛️" },
      { name: "Boutique Retail", icon: "🛍️" },
    ],
    services: [
      { title: "Local SEO & Maps Ranking", desc: "Dominate Google Maps results for premium service searches in Al Sulaimaniyah and nearby central districts." },
      { title: "Instagram & Meta Advertising", desc: "Lifestyle-driven social campaigns that appeal to the aesthetic sensibilities of Al Sulaimaniyah's affluent residents." },
      { title: "Google Ads for Premium Services", desc: "High-intent search campaigns targeting affluent Riyadh residents searching for top-tier services." },
      { title: "Google Business Profile Optimization", desc: "Ensure your business shines in local searches with polished listings, photos, and managed reviews." },
      { title: "Content Marketing", desc: "Arabic and English content that builds authority and trust with the discerning Al Sulaimaniyah audience." },
      { title: "Website Design", desc: "Elegant, fast-loading websites designed to convert high-value visitors from central Riyadh." },
    ],
    nearby: [
      { name: "Al Olaya", slug: "al-olaya" },
      { name: "Al Rawdah", slug: "al-rawdah" },
      { name: "King Fahd District", slug: "king-fahd-district" },
      { name: "Al Murabba", slug: "al-murabba" },
    ],
    faq: [
      { q: "What types of businesses thrive with digital marketing in Al Sulaimaniyah?", a: "Restaurants, private clinics, boutique service providers, and interior design firms see the strongest results. The district's demographics mean customers research heavily online before committing to premium services." },
      { q: "Is Arabic or English more important for targeting Al Sulaimaniyah customers?", a: "Both matter. Saudi nationals prefer Arabic content, but the significant expat and diplomatic community responds well to English. We run bilingual campaigns for maximum coverage." },
      { q: "How long before we see results from SEO in Al Sulaimaniyah?", a: "Typically 3–5 months for measurable organic ranking improvements. Google Ads can drive qualified traffic within days of launch. We recommend a combined approach for quick wins plus long-term growth." },
    ],
    ctaHeading: "Reach Al Sulaimaniyah's Elite Audience",
    ctaSubtitle: "Sophisticated digital marketing for one of Riyadh's most prestigious addresses. Let's build your visibility together.",
    arContent: {
      heroDesc: "السليمانية من أرقى العناوين السكنية والتجارية في وسط الرياض، تجمع بين الفيلات الفاخرة والسفارات والمطاعم الراقية. نساعد الأعمال هنا على التميز أمام جمهور ثري محلي.",
      about: [
        "السليمانية (Al Sulaimaniyah) تحتل شريحة مميزة في قلب الرياض، تقع بين العليا غرباً والروضة شرقاً. يتميز الحي بشوارع واسعة مظللة بالأشجار وفيلات فاخرة تسكنها شخصيات دبلوماسية ومديرون تنفيذيون كبار، إلى جانب تجمع من أبرز مطاعم الرياض وخدماتها المتخصصة.",
        "الجمهور هنا ذو ثروات مرتفعة بشكل لافت. يشمل السكان أفراداً من الأسرة المالكة وكبار المسؤولين الحكوميين ومحترفين أجانب. يبحثون عن تجارب متميزة — مطاعم خاصة وأطباء متخصصون وتصميم داخلي وتجزئة حصرية. الوصول لهذه الشريحة يتطلب رقياً في الرسالة وليس فقط ميزانية.",
        "ساعدنا مطاعم وعيادات جلدية ومنظمي فعاليات في السليمانية على رفع معدلات الحجز من خلال تحسين خرائط قوقل وSEO عالي النية وحملات سوشيال ميديا تتناسب مع تطلعات المنطقة.",
      ],
      industries: ["مطاعم راقية وكافيهات", "طب خاص", "تصميم داخلي", "خدمات فاخرة", "سفارات ودبلوماسية", "تجزئة متخصصة"],
      services: [
        { title: "SEO محلي وتصدر الخرائط", desc: "احتل نتائج خرائط قوقل لعمليات البحث عن الخدمات الراقية في السليمانية والأحياء المركزية المجاورة." },
        { title: "إعلانات إنستغرام وميتا", desc: "حملات اجتماعية ذات نمط حياة رفيع تستهدف الذوق الرفيع لسكان السليمانية الميسورين." },
        { title: "إعلانات قوقل للخدمات المتميزة", desc: "حملات بحث عالية النية تستهدف أبناء الرياض الميسورين الباحثين عن خدمات من الدرجة الأولى." },
        { title: "تحسين ملف النشاط في قوقل", desc: "تأكد من تألق نشاطك في البحث المحلي بقوائم منقحة وصور ومراجعات مُدارة." },
        { title: "تسويق بالمحتوى", desc: "محتوى عربي وإنجليزي يبني الثقة والسلطة مع جمهور السليمانية المتطلب." },
        { title: "تصميم مواقع", desc: "مواقع أنيقة سريعة التحميل مصممة لتحويل الزوار ذوي القيمة من وسط الرياض." },
      ],
      faq: [
        { q: "ما أنواع الأعمال التي تزدهر بالتسويق الرقمي في السليمانية؟", a: "المطاعم والعيادات الخاصة ومزودو الخدمات المتخصصة وشركات التصميم الداخلي تحقق أقوى نتائج. ديموغرافية الحي تعني أن العملاء يبحثون بعمق عبر الإنترنت قبل الالتزام بأي خدمة متميزة." },
        { q: "هل العربية أم الإنجليزية أهم لاستهداف عملاء السليمانية؟", a: "كلاهما مهم. السعوديون يفضلون المحتوى العربي، لكن المجتمع الأجنبي والدبلوماسي يستجيب جيداً للإنجليزية. نشغّل حملات ثنائية اللغة لأقصى تغطية." },
        { q: "كم يستغرق ظهور نتائج SEO في السليمانية؟", a: "عادةً ٣–٥ أشهر لتحسينات ترتيب عضوية ملموسة. إعلانات قوقل تجلب زياراً مؤهلاً خلال أيام من الإطلاق. نوصي بالجمع بين الاثنين للمكاسب السريعة والنمو طويل الأمد." },
      ],
      ctaHeading: "تواصل مع جمهور السليمانية الرفيع",
      ctaSubtitle: "تسويق رقمي راقٍ لأحد أبرز عناوين الرياض. لنبنِ ظهورك معاً.",
    },
  },
  {
    slug: "al-rawdah",
    name: "Al Rawdah",
    nameAr: "الروضة",
    zone: "Central Riyadh",
    tagline: "Digital Marketing in Al Rawdah — Riyadh's Established Family Hub",
    heroDesc:
      "Al Rawdah is an established central Riyadh district beloved for its mature trees, family-run businesses, and strong community character. We help local businesses connect with this loyal, tight-knit neighborhood audience.",
    about: [
      "Al Rawdah (الروضة) is one of Riyadh's older and more characterful neighborhoods — known for its canopy of mature trees, wide residential streets, and a strong sense of community identity. Unlike the glass-and-steel of Al Olaya nearby, Al Rawdah retains a more intimate, neighborhood-commercial feel.",
      "Businesses in Al Rawdah serve a mix of long-term Saudi families, young professionals, and a growing café culture scene. The district has seen significant renewal over the last decade, with trendy cafés, specialty clinics, and independent retail shops opening alongside established family businesses that have been there for generations.",
      "For digital marketing, Al Rawdah rewards businesses that invest in Google Maps prominence and community reputation. Residents here rely heavily on word-of-mouth amplified by social media — a positive Instagram presence or a well-managed Google Business Profile can drive foot traffic for months.",
    ],
    industries: [
      { name: "Specialty Cafés", icon: "☕" },
      { name: "Family Clinics", icon: "👨‍👩‍👧" },
      { name: "Independent Retail", icon: "🏪" },
      { name: "Educational Services", icon: "📚" },
      { name: "Home Services", icon: "🔧" },
      { name: "Bakeries & Food", icon: "🍰" },
    ],
    services: [
      { title: "Google Maps & Local SEO", desc: "Get found by Al Rawdah residents searching for services near them on Google and Google Maps." },
      { title: "Instagram Growth & Ads", desc: "Build a community following and drive local foot traffic through targeted Instagram campaigns." },
      { title: "Google Business Profile Management", desc: "Optimized GBP listings with regular posts, review responses, and photo updates to boost your local ranking." },
      { title: "Snapchat & TikTok Ads", desc: "Reach younger Al Rawdah residents through the social platforms they use daily." },
      { title: "Website Design for SMEs", desc: "Affordable, professional websites that help small businesses in Al Rawdah build credibility online." },
      { title: "Review & Reputation Management", desc: "Build a 5-star reputation that makes you the obvious choice for Al Rawdah's community searchers." },
    ],
    nearby: [
      { name: "Al Sulaimaniyah", slug: "al-sulaimaniyah" },
      { name: "Al Olaya", slug: "al-olaya" },
      { name: "Al Murabba", slug: "al-murabba" },
      { name: "Al Naseem", slug: "al-naseem" },
    ],
    faq: [
      { q: "What is the best digital channel for a small business in Al Rawdah?", a: "Google Business Profile is your highest-ROI starting point. Al Rawdah residents frequently search 'near me' on mobile. A well-optimized GBP listing puts you at the top of those results with zero ad spend." },
      { q: "How do I compete against established businesses in Al Rawdah?", a: "Focus on what's unique about your business. Fresh Google reviews, active social media, and a consistent posting schedule make newer businesses look more dynamic than long-established competitors who have neglected their digital presence." },
      { q: "Does Al Rawdah have a specific customer profile I should target?", a: "The core demographic is Saudi families aged 25–55 with moderate to high income. They value quality, trust, and community connection. Marketing that feels genuine and locally rooted performs better than polished corporate messaging." },
    ],
    ctaHeading: "Grow Your Business in Al Rawdah",
    ctaSubtitle: "Connect with Al Rawdah's loyal community audience. We'll build you a local digital presence that drives real foot traffic.",
    arContent: {
      heroDesc: "الروضة حي راسخ في وسط الرياض يُحبّه أهله لأشجاره الوارفة وأعماله العائلية وروحه المجتمعية المتماسكة. نساعد الأعمال المحلية على التواصل مع هذا الجمهور الوفي والمتراص.",
      about: [
        "الروضة (Al Rawdah) من أعرق أحياء الرياض وأكثرها تميزاً — مشهورة بظلال أشجارها الشامخة وشوارعها السكنية الواسعة وهويتها المجتمعية الراسخة. بخلاف أبراج الزجاج في العليا المجاورة، تحتفظ الروضة بطابع حيّ تجاري حميم.",
        "تخدم الأعمال في الروضة خليطاً من الأسر السعودية المستقرة والمهنيين الشباب ومشهد كافيهات متنامٍ. شهد الحي تجديداً ملحوظاً في العقد الماضي مع افتتاح مقاهٍ عصرية وعيادات متخصصة ومحلات تجارية مستقلة بجانب أعمال عائلية راسخة منذ أجيال.",
        "للتسويق الرقمي، تكافئ الروضة الأعمال التي تستثمر في الظهور على خرائط قوقل وسمعتها المجتمعية. يعتمد السكان هنا بشكل كبير على التوصيات الشفهية المُعززة بالسوشيال ميديا — حضور إنستغرام إيجابي أو ملف نشاط قوقل مُدار بشكل جيد يمكنه توليد حركة زبائن لأشهر.",
      ],
      industries: ["كافيهات متخصصة", "عيادات عائلية", "تجزئة مستقلة", "خدمات تعليمية", "خدمات منزلية", "مخابز وأغذية"],
      services: [
        { title: "خرائط قوقل وSEO المحلي", desc: "احضر أمام سكان الروضة الباحثين عن خدمات قريبة على قوقل وخرائط قوقل." },
        { title: "نمو إنستغرام وإعلاناته", desc: "ابنِ متابعة مجتمعية واستقطب حركة زبائن محلية عبر حملات إنستغرام مستهدفة." },
        { title: "إدارة ملف النشاط في قوقل", desc: "قوائم GBP محسّنة بمنشورات منتظمة وردود على المراجعات وتحديثات صور لتعزيز ترتيبك المحلي." },
        { title: "إعلانات سناب وتيك توك", desc: "تواصل مع الشريحة الشبابية في الروضة عبر منصاتهم الاجتماعية المفضلة." },
        { title: "تصميم مواقع للمشاريع الصغيرة", desc: "مواقع احترافية بأسعار مناسبة تساعد الأعمال الصغيرة في الروضة على بناء مصداقية رقمية." },
        { title: "إدارة المراجعات والسمعة", desc: "ابنِ سمعة خمس نجوم تجعلك الخيار الأوضح لباحثي مجتمع الروضة." },
      ],
      faq: [
        { q: "ما أفضل قناة رقمية لمشروع صغير في الروضة؟", a: "ملف النشاط في قوقل هو نقطة بدايتك الأعلى عائداً. سكان الروضة يبحثون كثيراً بـ'بالقرب مني' على الجوال. ملف GBP محسّن يضعك في صدارة تلك النتائج دون أي إنفاق إعلاني." },
        { q: "كيف أنافس الأعمال الراسخة في الروضة؟", a: "ركّز على ما يميز نشاطك. مراجعات قوقل حديثة وسوشيال ميديا نشطة وجدول نشر منتظم تجعل الأعمال الجديدة تبدو أكثر حيوية من المنافسين القدامى الذين أهملوا حضورهم الرقمي." },
        { q: "هل في الروضة ملف محدد للعميل ينبغي استهدافه؟", a: "الشريحة الأساسية هي الأسر السعودية بعمر ٢٥–٥٥ بدخل متوسط إلى مرتفع. يقدّرون الجودة والثقة والانتماء المجتمعي. التسويق الصادق ذو الطابع المحلي يتفوق على الرسائل الرسمية المصقولة." },
      ],
      ctaHeading: "نمّي نشاطك في الروضة",
      ctaSubtitle: "تواصل مع جمهور الروضة الوفي. سنبني لك حضوراً رقمياً محلياً يجلب حركة زبائن حقيقية.",
    },
  },
  {
    slug: "al-murabba",
    name: "Al Murabba",
    nameAr: "المربع",
    zone: "Central Riyadh",
    tagline: "Digital Marketing in Al Murabba — Heritage Meets Modern Commerce",
    heroDesc:
      "Al Murabba is where Riyadh's history lives. Home to the iconic Murabba Palace and the National Museum, this historic district blends cultural tourism with a thriving commercial scene that rewards smart local marketing.",
    about: [
      "Al Murabba (المربع) holds a unique place in Riyadh's story — it was once the heart of the old city, home to the Murabba Palace where King Abdulaziz established his court. Today it sits adjacent to the National Museum and DIRIYAH Gate's cultural corridor, drawing both Saudi heritage visitors and a busy local commercial population.",
      "The district has a dense mix of government offices, traditional souqs, mid-range retail, and a growing café and restaurant scene catering to the museum crowd and nearby residential areas. Businesses here serve a broad demographic: government employees, heritage tourists, local families, and students from nearby institutions.",
      "Digital marketing in Al Murabba rewards a dual strategy: SEO and Google Maps to capture nearby searches, and social media content that ties your brand to the district's unique cultural identity. A restaurant or café that markets itself authentically as part of Al Murabba's heritage story commands remarkable loyalty.",
    ],
    industries: [
      { name: "Tourism & Heritage", icon: "🏰" },
      { name: "Traditional Retail", icon: "🛒" },
      { name: "Government Services", icon: "🏛️" },
      { name: "Restaurants & Cafés", icon: "☕" },
      { name: "Cultural Events", icon: "🎭" },
      { name: "Education", icon: "🎓" },
    ],
    services: [
      { title: "Heritage & Cultural SEO", desc: "Rank for searches tied to Al Murabba's unique identity — museums, historic sites, and cultural experiences." },
      { title: "Google Maps Optimization", desc: "Capture foot traffic from museum visitors and government workers searching for nearby services." },
      { title: "Social Media for Local Businesses", desc: "Content strategy that authentically ties your brand to Al Murabba's rich cultural narrative." },
      { title: "Arabic SEO Content", desc: "High-quality Arabic blog and landing page content targeting local and tourism-related search queries." },
      { title: "Google Ads for Local Discovery", desc: "Targeted campaigns reaching both Al Murabba residents and visitors to the National Museum and palace area." },
      { title: "Website Design", desc: "Bilingual websites designed to convert both local customers and cultural tourism traffic." },
    ],
    nearby: [
      { name: "Al Rawdah", slug: "al-rawdah" },
      { name: "Al Olaya", slug: "al-olaya" },
      { name: "King Fahd District", slug: "king-fahd-district" },
      { name: "Al Naseem", slug: "al-naseem" },
    ],
    faq: [
      { q: "Can tourism-adjacent businesses in Al Murabba benefit from digital marketing?", a: "Absolutely. Restaurants, souvenir shops, and cultural experience providers near the National Museum and Murabba Palace can capture significant organic traffic from both Saudi visitors and international tourists searching for things to do in historic Riyadh." },
      { q: "What social media platforms work best for Al Murabba businesses?", a: "Instagram and Snapchat are primary for consumer-facing businesses. LinkedIn works well for professional services targeting government office workers in the area. TikTok is increasingly effective for restaurants and cultural experiences." },
      { q: "Is Al Murabba a good area for e-commerce businesses to target?", a: "Yes — particularly for traditional crafts, Arabic perfumes, and heritage-themed products. Customers in and around Al Murabba have strong cultural purchase intent that translates well to e-commerce." },
    ],
    ctaHeading: "Build Your Presence in Historic Al Murabba",
    ctaSubtitle: "Blend Riyadh's heritage with modern digital marketing. Let's create a strategy that connects your business to Al Murabba's unique identity.",
    arContent: {
      heroDesc: "المربع هو ذاكرة الرياض. موطن قصر المربع الأيقوني والمتحف الوطني، يمزج هذا الحي التاريخي بين السياحة الثقافية ومشهد تجاري نابض يكافئ التسويق المحلي الذكي.",
      about: [
        "المربع (Al Murabba) له مكانة استثنائية في تاريخ الرياض — كان في يوم ما قلب المدينة القديمة، حيث أسس الملك عبدالعزيز حكمه في قصر المربع. اليوم يقع بجوار المتحف الوطني وممر بوابة الدرعية الثقافي، ويستقطب زوار التراث السعودي إلى جانب سكانه التجاريين النشطين.",
        "يتميز الحي بمزيج كثيف من المكاتب الحكومية والأسواق التقليدية والتجزئة المتوسطة ومشهد كافيهات ومطاعم متنامٍ يستقطب زوار المتحف والمناطق السكنية المجاورة. تخدم أعماله شريحة واسعة: موظفو الحكومة وزوار التراث والأسر المحلية والطلاب.",
        "يكافئ التسويق الرقمي في المربع من يتبنى استراتيجية مزدوجة: SEO وخرائط قوقل لاقتناص عمليات البحث القريبة، ومحتوى سوشيال ميديا يربط علامتك التجارية بهوية المنطقة الثقافية الفريدة. مطعم أو كافيه يُسوّق لنفسه بصدق كجزء من موروث المربع يكسب ولاءً مذهلاً.",
      ],
      industries: ["سياحة وتراث", "تجزئة تقليدية", "خدمات حكومية", "مطاعم وكافيهات", "فعاليات ثقافية", "تعليم"],
      services: [
        { title: "SEO التراثي والثقافي", desc: "تصدّر عمليات البحث المرتبطة بهوية المربع الفريدة — متاحف ومواقع تاريخية وتجارب ثقافية." },
        { title: "تحسين خرائط قوقل", desc: "اقتنص حركة زوار المتحف والموظفين الحكوميين الباحثين عن خدمات قريبة." },
        { title: "سوشيال ميديا للأعمال المحلية", desc: "استراتيجية محتوى تربط علامتك التجارية بصدق بالموروث الثقافي الغني للمربع." },
        { title: "محتوى SEO عربي", desc: "مدونات وصفحات هبوط عربية عالية الجودة تستهدف استعلامات البحث المحلية والسياحية." },
        { title: "إعلانات قوقل للاكتشاف المحلي", desc: "حملات مستهدفة تصل لسكان المربع والزوار القادمين للمتحف الوطني ومنطقة القصر." },
        { title: "تصميم مواقع", desc: "مواقع ثنائية اللغة مصممة لتحويل زبائن محليين وحركة سياحة ثقافية." },
      ],
      faq: [
        { q: "هل تستفيد الأعمال المجاورة للسياحة في المربع من التسويق الرقمي؟", a: "بالتأكيد. المطاعم ومحلات التذكارات ومزودو التجارب الثقافية بالقرب من المتحف الوطني وقصر المربع يمكنهم اقتناص حركة عضوية كبيرة من الزوار السعوديين والسياح الدوليين الباحثين عن أشياء يفعلونها في الرياض التاريخية." },
        { q: "ما منصات السوشيال ميديا الأنسب لأعمال المربع؟", a: "إنستغرام وسناب شات أساسيان للأعمال الموجهة للمستهلك. لينكدإن يناسب الخدمات المهنية التي تستهدف موظفي المكاتب الحكومية. تيك توك يزداد فاعلية للمطاعم والتجارب الثقافية." },
        { q: "هل المربع منطقة مناسبة لأعمال التجارة الإلكترونية؟", a: "نعم — خاصة للحرف التقليدية والعطور العربية والمنتجات ذات الطابع التراثي. للعملاء في المربع وحوله نية شراء ثقافية عالية تتحول جيداً إلى تجارة إلكترونية." },
      ],
      ctaHeading: "ابنِ حضورك في المربع التاريخي",
      ctaSubtitle: "امزج تراث الرياض مع تسويق رقمي حديث. لنصنع استراتيجية تربط نشاطك بهوية المربع الفريدة.",
    },
  },
  {
    slug: "kafd",
    name: "KAFD",
    nameAr: "مركز الملك عبدالله المالي",
    zone: "Central Riyadh",
    tagline: "Digital Marketing in KAFD — Saudi Arabia's Financial Powerhouse",
    heroDesc:
      "KAFD (King Abdullah Financial District) is Saudi Arabia's most ambitious urban development — a forest of skyscrapers housing the region's top financial institutions, tech firms, and professional services. Competing here demands elite-level digital marketing.",
    about: [
      "KAFD (King Abdullah Financial District — مركز الملك عبدالله المالي) is unlike any other district in Riyadh. Conceived as Saudi Arabia's answer to Dubai's DIFC, KAFD houses major banks, investment firms, global consulting agencies, and the Saudi Tadawul stock exchange in a purpose-built cluster of futuristic towers north of central Riyadh.",
      "The district is home to a highly educated, internationally experienced workforce — many of whom spent years abroad before returning to Saudi under Vision 2030. They expect the same digital sophistication from local service providers that they encountered in London, New York, or Singapore. A half-finished website or a poorly managed Google Ads account will not cut it here.",
      "Businesses serving KAFD's workforce — corporate caterers, executive fitness centers, premium co-working spaces, and business service providers — need digital marketing that speaks directly to a fast-moving, results-oriented audience. We build campaigns that earn attention and convert at the speed KAFD professionals operate.",
    ],
    industries: [
      { name: "Financial Services", icon: "💹" },
      { name: "Tech & SaaS", icon: "💻" },
      { name: "Corporate F&B", icon: "🥗" },
      { name: "Consulting", icon: "📊" },
      { name: "Premium Fitness", icon: "🏋️" },
      { name: "Business Services", icon: "🤝" },
    ],
    services: [
      { title: "B2B Digital Marketing", desc: "Lead generation campaigns targeting KAFD's financial and professional services firms on LinkedIn and Google." },
      { title: "LinkedIn Advertising", desc: "Precision B2B campaigns reaching KAFD executives, directors, and senior professionals by job title and company." },
      { title: "Corporate SEO", desc: "Rank for high-value B2B service searches in KAFD and the wider Riyadh financial district area." },
      { title: "Google Ads for Professional Services", desc: "High-budget, high-ROI search campaigns targeting KAFD's decision-makers at the moment of highest intent." },
      { title: "Corporate Website Design", desc: "World-class websites that match the international standards KAFD's sophisticated audience expects." },
      { title: "Brand Identity & Content", desc: "Thought leadership content and brand positioning that builds authority with KAFD's discerning professionals." },
    ],
    nearby: [
      { name: "Al Olaya", slug: "al-olaya" },
      { name: "King Fahd District", slug: "king-fahd-district" },
      { name: "Al Malqa", slug: "al-malqa" },
      { name: "Hittin", slug: "hittin" },
    ],
    faq: [
      { q: "What digital channels work best for B2B businesses targeting KAFD companies?", a: "LinkedIn is the primary channel for reaching KAFD decision-makers by company, role, and seniority. Google Search Ads capture high-intent procurement searches. Together they create a complete pipeline for enterprise B2B leads." },
      { q: "How do we position against global agencies when marketing to KAFD clients?", a: "Combine local market knowledge with international execution standards. KAFD clients want agencies that understand the Saudi regulatory environment, Arabic language nuance, and Vision 2030 business context — while delivering at the quality level of a London or New York agency." },
      { q: "Is e-commerce relevant for KAFD-area businesses?", a: "Yes, particularly for corporate gifting, office supply, premium food delivery, and business service subscriptions. KAFD professionals are heavy online shoppers with corporate expense accounts — a well-designed e-commerce experience can capture significant recurring revenue." },
    ],
    ctaHeading: "Market to Saudi Arabia's Financial Elite",
    ctaSubtitle: "KAFD demands world-class digital marketing. Let's build you a strategy that earns the respect of the Kingdom's most sophisticated business audience.",
    arContent: {
      heroDesc: "مركز الملك عبدالله المالي (KAFD) هو أطموح مشاريع التطوير الحضري في المملكة — غابة من ناطحات السحاب تحتضن كبرى المؤسسات المالية وشركات التقنية والخدمات المهنية. المنافسة هنا تستوجب تسويقاً رقمياً من الدرجة الأولى.",
      about: [
        "مركز الملك عبدالله المالي (KAFD) حي لا مثيل له في الرياض. صُمّم ليكون نظير المملكة لـ DIFC في دبي، ويضم بنوكاً كبرى وشركات استثمار ووكالات استشارية عالمية وبورصة تداول السعودية في تجمع من الأبراج المستقبلية شمال وسط الرياض.",
        "يستضيف الحي قوى عاملة مؤهلة تأهيلاً عالياً وذات خبرة دولية — كثيرون منهم عادوا للمملكة في إطار رؤية 2030. يتوقعون من مزودي الخدمات المحليين نفس التطور الرقمي الذي اعتادوه في لندن ونيويورك وسنغافورة. موقع نصف منجز أو حساب إعلانات مُهمَل لن يصمد هنا.",
        "الأعمال التي تخدم قوى عمل KAFD — شركات التموين الرسمي ومراكز اللياقة التنفيذية وفضاءات العمل المشترك الراقية ومزودو خدمات الأعمال — تحتاج تسويقاً رقمياً يخاطب مباشرة جمهوراً سريع الحركة موجهاً للنتائج. نبني حملات تكسب الانتباه وتحوّل بسرعة محترفي KAFD.",
      ],
      industries: ["خدمات مالية", "تقنية وSaaS", "تموين شركات", "استشارات", "لياقة بدنية راقية", "خدمات أعمال"],
      services: [
        { title: "تسويق رقمي B2B", desc: "حملات جذب عملاء تستهدف شركات الخدمات المالية والمهنية في KAFD عبر لينكدإن وقوقل." },
        { title: "إعلانات لينكدإن", desc: "حملات B2B دقيقة تصل لمديرين ومسؤولين تنفيذيين في KAFD حسب المسمى الوظيفي والشركة." },
        { title: "SEO للشركات", desc: "تصدّر عمليات البحث عالية القيمة لخدمات B2B في KAFD ومنطقة الأعمال المالية في الرياض." },
        { title: "إعلانات قوقل للخدمات المهنية", desc: "حملات بحث بميزانيات مرتفعة وعائد مرتفع تستهدف صناع القرار في KAFD لحظة النية القصوى." },
        { title: "تصميم مواقع للشركات", desc: "مواقع عالمية المستوى ترقى لتوقعات جمهور KAFD الدولي المتطور." },
        { title: "هوية العلامة والمحتوى", desc: "محتوى قيادة فكرية وتموضع للعلامة التجارية يبني سلطتك مع محترفي KAFD الصعبي الإقناع." },
      ],
      faq: [
        { q: "ما القنوات الرقمية الأنسب للأعمال B2B التي تستهدف شركات KAFD؟", a: "لينكدإن هو القناة الأساسية للوصول لصناع القرار في KAFD حسب الشركة والدور والأقدمية. إعلانات بحث قوقل تقتنص عمليات الشراء عالية النية. معاً يصنعان خط أنابيب متكاملاً لعملاء B2B المؤسسيين." },
        { q: "كيف نتموضع أمام وكالات عالمية عند التسويق لعملاء KAFD؟", a: "ادمج معرفة السوق المحلي مع معايير تنفيذ دولية. عملاء KAFD يريدون وكالات تفهم البيئة التنظيمية السعودية ودقائق اللغة العربية وسياق رؤية 2030 — مع تقديم جودة على مستوى وكالة لندن أو نيويورك." },
        { q: "هل التجارة الإلكترونية ذات صلة لأعمال منطقة KAFD؟", a: "نعم، خاصة للهدايا المؤسسية واللوازم المكتبية وتوصيل الطعام الراقي واشتراكات خدمات الأعمال. محترفو KAFD متسوقون مكثفون عبر الإنترنت بحسابات مصروفيات مؤسسية — تجربة تجارة إلكترونية مصممة بشكل جيد تقتنص عائداً متكرراً كبيراً." },
      ],
      ctaHeading: "سوّق لنخبة الأعمال في المملكة",
      ctaSubtitle: "KAFD يستوجب تسويقاً رقمياً عالمي المستوى. لنبنِ لك استراتيجية تكسب احترام أكثر جمهور أعمال تطوراً في المملكة.",
    },
  },
  {
    slug: "king-fahd-district",
    name: "King Fahd District",
    nameAr: "حي الملك فهد",
    zone: "Central Riyadh",
    tagline: "Digital Marketing in King Fahd District — Riyadh's Diplomatic & Commercial Core",
    heroDesc:
      "King Fahd District anchors Riyadh's central corridor with government ministries, major hotel chains, and landmark towers. Businesses operating here need digital marketing calibrated for a prestige, high-footfall environment.",
    about: [
      "King Fahd District (حي الملك فهد) is named after King Fahd Road — one of Riyadh's principal north-south arteries. The district is home to several government ministries, major five-star hotel chains (Four Seasons, Ritz-Carlton vicinity), and a concentration of corporate offices that define Riyadh's central business identity alongside Al Olaya.",
      "The district sees enormous daily throughput: government employees, corporate visitors, hotel guests, and transit commuters. This creates a rich micro-market for hospitality, food & beverage, retail, and professional services. Unlike purely residential areas, King Fahd District customers often have immediate intent — they need services now, nearby.",
      "Google Maps is king here. A business with a polished GBP listing and strong local reviews will capture walk-in and drive-by customers that competitors with poor online presence simply miss. We specialize in maximizing this high-intent local search traffic for businesses in the King Fahd corridor.",
    ],
    industries: [
      { name: "Hotels & Hospitality", icon: "🏨" },
      { name: "Government Services", icon: "🏛️" },
      { name: "Corporate Offices", icon: "🏢" },
      { name: "Fine Dining", icon: "🍽️" },
      { name: "Travel & Tourism", icon: "✈️" },
      { name: "Luxury Retail", icon: "👜" },
    ],
    services: [
      { title: "High-Intent Local SEO", desc: "Capture government, hotel, and corporate visitors searching for services along King Fahd Road." },
      { title: "Google Business Profile", desc: "Dominant GBP listings that win the local 3-pack for searches in the King Fahd corridor." },
      { title: "Google Ads for Hospitality", desc: "Hotel, restaurant, and entertainment campaigns targeting visitors and business travelers in the district." },
      { title: "Multilingual Digital Marketing", desc: "Arabic and English campaigns covering Saudi nationals, GCC visitors, and international business travelers." },
      { title: "Corporate Website Design", desc: "Prestige websites aligned with the five-star expectations of King Fahd District's clientele." },
      { title: "Influencer & Content Marketing", desc: "Leverage Riyadh's food and lifestyle influencer community to reach the district's upscale dining audience." },
    ],
    nearby: [
      { name: "Al Olaya", slug: "al-olaya" },
      { name: "Al Sulaimaniyah", slug: "al-sulaimaniyah" },
      { name: "KAFD", slug: "kafd" },
      { name: "Al Murabba", slug: "al-murabba" },
    ],
    faq: [
      { q: "How important is Google Maps for businesses on King Fahd Road?", a: "Critical. A very high percentage of King Fahd District customers are in-transit decision-makers searching on their phones. A business that doesn't appear prominently on Google Maps is effectively invisible to this enormous segment." },
      { q: "Should I market in Arabic only, or also in English?", a: "Both. King Fahd District has one of Riyadh's highest concentrations of international business visitors. A bilingual digital presence — Arabic for local searches, English for international and expat searches — maximizes your total addressable audience." },
      { q: "What is the best way to market a restaurant in King Fahd District?", a: "Combine a strong GBP listing (with regular photo updates and responded reviews), Instagram presence featuring your best dishes, and targeted Google Ads for 'restaurants near King Fahd Road'. This three-channel approach consistently generates bookings." },
    ],
    ctaHeading: "Capture King Fahd District's High-Intent Traffic",
    ctaSubtitle: "Riyadh's central corridor is full of customers ready to buy. Let's make sure they find you first.",
    arContent: {
      heroDesc: "حي الملك فهد يُثبّت محور الرياض المركزي بالوزارات الحكومية وكبرى سلاسل الفنادق والأبراج الشاهقة. الأعمال هنا تحتاج تسويقاً رقمياً مُعايَراً لبيئة فاخرة عالية الحركة.",
      about: [
        "حي الملك فهد (King Fahd District) يأخذ اسمه من طريق الملك فهد — أحد أبرز الشرايين الرئيسية الشمالية-الجنوبية في الرياض. يضم الحي عدة وزارات حكومية وكبرى سلاسل الفنادق الخمس نجوم وتجمعاً من المكاتب الشركاتية التي ترسّخ الهوية التجارية لوسط الرياض بجانب العليا.",
        "يشهد الحي حركة يومية هائلة: موظفو حكومة وزوار شركات وضيوف فنادق وركاب عابرون. هذا يصنع سوقاً دقيقة غنية للضيافة والمطاعم والتجزئة والخدمات المهنية. بخلاف الأحياء السكنية البحتة، عملاء الحي غالباً لديهم نية فورية — يحتاجون الخدمة الآن وبالقرب منهم.",
        "خرائط قوقل هي الملك هنا. نشاط بملف GBP منقح ومراجعات محلية قوية سيقتنص عملاء المشاة والسيارات العابرة الذي يفوّتهم المنافسون ذوو الحضور الرقمي الضعيف. نتخصص في تعظيم هذه الحركة البحثية عالية النية للأعمال في محور الملك فهد.",
      ],
      industries: ["فنادق وضيافة", "خدمات حكومية", "مكاتب شركات", "مطاعم راقية", "سياحة وسفر", "تجزئة فاخرة"],
      services: [
        { title: "SEO محلي عالي النية", desc: "اقتنص الزوار الحكوميين وضيوف الفنادق والموظفين الشركاتيين الباحثين عن خدمات على طريق الملك فهد." },
        { title: "ملف النشاط في قوقل", desc: "قوائم GBP مهيمنة تفوز بالنتائج الثلاثة الأولى على الخريطة لعمليات البحث في محور الملك فهد." },
        { title: "إعلانات قوقل للضيافة", desc: "حملات فندقية ومطعمية وترفيهية تستهدف الزوار ورجال الأعمال المسافرين في الحي." },
        { title: "تسويق رقمي متعدد اللغات", desc: "حملات عربية وإنجليزية تغطي المواطنين السعوديين وزوار دول الخليج والمسافرين الدوليين." },
        { title: "تصميم مواقع للشركات", desc: "مواقع فاخرة تتوافق مع توقعات عملاء الدرجة الخمس نجوم في حي الملك فهد." },
        { title: "التسويق بالمؤثرين والمحتوى", desc: "استغل مجتمع المؤثرين في الطعام والنمط الحياة في الرياض للوصول لجمهور المطاعم الراقية في الحي." },
      ],
      faq: [
        { q: "ما أهمية خرائط قوقل للأعمال على طريق الملك فهد؟", a: "بالغة الأهمية. نسبة عالية جداً من عملاء الحي هم صانعو قرار في حالة تنقل يبحثون على هواتفهم. نشاط لا يظهر بارزاً على خرائط قوقل غير مرئي فعلياً لهذه الشريحة الضخمة." },
        { q: "هل أسوّق بالعربية فقط أم بالإنجليزية أيضاً؟", a: "كلاهما. حي الملك فهد يمتلك من أعلى تركيزات الزوار التجاريين الدوليين في الرياض. حضور رقمي ثنائي اللغة — العربية للبحث المحلي والإنجليزية للبحث الدولي والأجنبي — يُعظّم جمهورك الكلي المستهدف." },
        { q: "ما أفضل طريقة للتسويق لمطعم في حي الملك فهد؟", a: "ادمج ملف GBP قوي (بتحديثات صور منتظمة ومراجعات مُرد عليها) وحضور إنستغرام يعرض أفضل أطباقك وإعلانات قوقل مستهدفة لـ'مطاعم بالقرب من طريق الملك فهد'. هذا المنهج الثلاثي يولد الحجوزات باستمرار." },
      ],
      ctaHeading: "اقتنص حركة حي الملك فهد عالية النية",
      ctaSubtitle: "محور الرياض المركزي مليء بعملاء مستعدين للشراء. لنتأكد من أنهم يجدونك أنت أولاً.",
    },
  },
  {
    slug: "al-malqa",
    name: "Al Malqa",
    nameAr: "الملقا",
    zone: "North Riyadh",
    tagline: "Digital Marketing in Al Malqa — North Riyadh's Upscale Destination",
    heroDesc:
      "Al Malqa is one of North Riyadh's most sought-after addresses — affluent, family-oriented, and increasingly home to Riyadh's finest dining and lifestyle destinations. We help businesses capture this premium northern audience.",
    about: [
      "Al Malqa (الملقا) has emerged as one of the defining addresses of prosperous North Riyadh. Once primarily a residential enclave for high-income Saudi families, it has evolved into a lifestyle destination featuring upscale restaurants, luxury car showrooms, private medical centers, and premium retail anchored around Al Malqa Avenue and nearby commercial strips.",
      "The demographic profile is skewed toward affluent Saudi families: dual-income households, young professionals, and established businesspeople aged 25–50. They are digitally sophisticated, actively use Instagram and Snapchat to discover new restaurants and services, and rely on Google to validate choices before spending.",
      "We have run campaigns for clinics, restaurants, and service businesses throughout Al Malqa. The insight consistently is that Instagram and Google Maps in combination drive the most powerful results — discovery through social, validation through search.",
    ],
    industries: [
      { name: "Upscale Restaurants", icon: "🍽️" },
      { name: "Private Medical", icon: "🏥" },
      { name: "Luxury Automotive", icon: "🚗" },
      { name: "Premium Retail", icon: "🛍️" },
      { name: "Family Entertainment", icon: "🎡" },
      { name: "Fitness & Wellness", icon: "💪" },
    ],
    services: [
      { title: "Instagram & Snapchat Ads", desc: "Visually stunning campaigns targeting Al Malqa's affluent, social-media-active residents." },
      { title: "Google Maps & Local SEO", desc: "Dominate local search results for dining, medical, and lifestyle services in Al Malqa." },
      { title: "Google Ads Management", desc: "High-converting search campaigns reaching North Riyadh's premium consumer base at peak intent." },
      { title: "Google Business Profile", desc: "Polished GBP listings that build trust and drive foot traffic from Al Malqa's active local searchers." },
      { title: "Influencer Marketing", desc: "Partnerships with Riyadh-based food and lifestyle influencers to amplify your brand in Al Malqa." },
      { title: "E-Commerce & Delivery", desc: "Online ordering and delivery marketing for restaurants and retail serving North Riyadh's time-pressed families." },
    ],
    nearby: [
      { name: "Al Nakheel", slug: "al-nakheel" },
      { name: "Al Narjis", slug: "al-narjis" },
      { name: "Hittin", slug: "hittin" },
      { name: "Al Arid", slug: "al-arid" },
    ],
    faq: [
      { q: "What makes Al Malqa different from other North Riyadh districts for marketing?", a: "Al Malqa has a higher concentration of high-income residents and a more developed dining and lifestyle scene than most North Riyadh neighborhoods. Marketing here is less about awareness and more about positioning — customers already know they want these services, you need to be the obvious premium choice." },
      { q: "Which social platforms matter most in Al Malqa?", a: "Instagram is primary for restaurants, cafés, and lifestyle brands. Snapchat reaches the 18–35 Saudi female demographic very effectively. TikTok is growing fast for food and entertainment. For medical and professional services, Google Search dominates." },
      { q: "How much should a restaurant in Al Malqa budget for digital marketing?", a: "A meaningful starting budget for a restaurant in Al Malqa is SAR 3,000–5,000/month across Google Ads and Meta/Snap. This level consistently generates measurable reservations and delivery orders when campaigns are optimized correctly." },
    ],
    ctaHeading: "Win Al Malqa's Premium Audience",
    ctaSubtitle: "North Riyadh's most affluent district is ready to discover your business. Let's build the digital presence that makes you the obvious choice.",
    arContent: {
      heroDesc: "الملقا من أكثر العناوين طلباً في شمال الرياض — راقٍ وعائلي ويزداد استضافةً لأفخر مطاعم الرياض ووجهات النمط الحياة. نساعد الأعمال على اقتناص هذا الجمهور الشمالي المتميز.",
      about: [
        "الملقا (Al Malqa) برزت كأحد العناوين المميزة لشمال الرياض المزدهر. كانت في الأصل واحة سكنية للأسر السعودية ذات الدخل المرتفع، وتطورت لتصبح وجهة نمط حياة تضم مطاعم راقية ومعارض سيارات فاخرة ومراكز طبية خاصة وتجزئة متميزة على شارع الملقا والمحاور التجارية المجاورة.",
        "الملف الديموغرافي يميل نحو الأسر السعودية الميسورة: أسر ذات دخلين ومهنيون شباب ورجال أعمال راسخون بعمر ٢٥–٥٠. متطورون رقمياً ويستخدمون إنستغرام وسناب شات بنشاط لاكتشاف مطاعم وخدمات جديدة، ويعتمدون على قوقل للتحقق من خياراتهم قبل الإنفاق.",
        "أدرنا حملات لعيادات ومطاعم وأعمال خدمية في الملقا. الاستنتاج المتكرر هو أن إنستغرام وخرائط قوقل معاً يحققان أقوى النتائج — الاكتشاف عبر السوشيال والتحقق عبر البحث.",
      ],
      industries: ["مطاعم راقية", "طب خاص", "سيارات فاخرة", "تجزئة متميزة", "ترفيه عائلي", "لياقة وصحة"],
      services: [
        { title: "إعلانات إنستغرام وسناب شات", desc: "حملات بصرية مذهلة تستهدف سكان الملقا الميسورين النشطين على السوشيال ميديا." },
        { title: "خرائط قوقل وSEO المحلي", desc: "تسيّد نتائج البحث المحلي للمطاعم والخدمات الطبية وخدمات النمط الحياة في الملقا." },
        { title: "إدارة إعلانات قوقل", desc: "حملات بحث عالية التحويل تصل للمستهلك المتميز في شمال الرياض عند أعلى نية شراء." },
        { title: "ملف النشاط في قوقل", desc: "قوائم GBP منقحة تبني الثقة وتحرك حركة الزبائن من المبحوثين النشطين في الملقا." },
        { title: "التسويق بالمؤثرين", desc: "شراكات مع مؤثري الطعام والنمط الحياة في الرياض لتضخيم علامتك في الملقا." },
        { title: "التجارة الإلكترونية والتوصيل", desc: "تسويق الطلب الإلكتروني والتوصيل للمطاعم والتجزئة التي تخدم أسر شمال الرياض الحريصة على وقتها." },
      ],
      faq: [
        { q: "ما الذي يميز الملقا عن أحياء شمال الرياض الأخرى تسويقياً؟", a: "الملقا بها تركيز أعلى من السكان ذوي الدخل المرتفع ومشهد مطاعم ونمط حياة أكثر تطوراً من معظم أحياء شمال الرياض. التسويق هنا أقل تركيزاً على التوعية وأكثر على التموضع — العملاء يعرفون مسبقاً أنهم يريدون هذه الخدمات، تحتاج أن تكون الخيار المتميز الواضح." },
        { q: "ما منصات السوشيال الأهم في الملقا؟", a: "إنستغرام أساسي للمطاعم والكافيهات والعلامات الحياتية. سناب شات يصل للشريحة العمرية ١٨–٣٥ من السعوديات بفاعلية عالية. تيك توك ينمو بسرعة للطعام والترفيه. للخدمات الطبية والمهنية يهيمن بحث قوقل." },
        { q: "كم ينبغي لمطعم في الملقا أن يخصص لميزانية التسويق الرقمي؟", a: "ميزانية بداية معقولة لمطعم في الملقا هي ٣٬٠٠٠–٥٬٠٠٠ ريال شهرياً موزعة على إعلانات قوقل وميتا/سناب. هذا المستوى يولد باستمرار حجوزات ومشتريات توصيل ملموسة عند تحسين الحملات بشكل صحيح." },
      ],
      ctaHeading: "افز بجمهور الملقا المتميز",
      ctaSubtitle: "أكثر حي ميسور في شمال الرياض جاهز لاكتشاف نشاطك. لنبنِ الحضور الرقمي الذي يجعلك الخيار الواضح.",
    },
  },
  {
    slug: "al-nakheel",
    name: "Al Nakheel",
    nameAr: "النخيل",
    zone: "North Riyadh",
    tagline: "Digital Marketing in Al Nakheel — Family-First North Riyadh",
    heroDesc:
      "Al Nakheel is a beloved North Riyadh neighborhood defined by family living, community commerce, and the iconic Nakheel Mall. Businesses here thrive when they connect authentically with the district's close-knit family audience.",
    about: [
      "Al Nakheel (النخيل) takes its name from the palm trees that once defined its landscape. Today it is one of North Riyadh's most established and family-oriented neighborhoods, known for its proximity to Nakheel Mall, large family villas, and a strong community identity that has survived Riyadh's rapid northward development.",
      "Nakheel Mall serves as the district's commercial and social hub, drawing residents from Al Nakheel and neighboring districts for shopping, dining, and entertainment. Businesses within walking or driving distance of the mall benefit from this foot traffic, while those further inside the residential streets serve a hyper-local community audience.",
      "Marketing in Al Nakheel rewards community investment. Businesses that sponsor local events, maintain strong Google reviews, and create social content that resonates with family life in North Riyadh develop deep loyalty that paid advertising alone cannot buy.",
    ],
    industries: [
      { name: "Family Dining", icon: "👨‍👩‍👧‍👦" },
      { name: "Children's Activities", icon: "🧸" },
      { name: "Grocery & Retail", icon: "🛒" },
      { name: "Health Clinics", icon: "🏥" },
      { name: "Home Services", icon: "🏠" },
      { name: "Education & Tutoring", icon: "📖" },
    ],
    services: [
      { title: "Local SEO & Near Me Ranking", desc: "Be the first result when Al Nakheel families search for services near them on Google." },
      { title: "Google Business Profile", desc: "Optimized GBP listings capturing foot traffic from Nakheel Mall visitors and neighborhood searchers." },
      { title: "Family-Focused Meta Ads", desc: "Facebook and Instagram campaigns targeting Al Nakheel's core demographic of Saudi family households." },
      { title: "Snapchat Advertising", desc: "Reach Al Nakheel's younger residents and families through Saudi Arabia's most-used social platform." },
      { title: "Community Content Marketing", desc: "Locally-rooted Arabic content that builds brand affinity with the Al Nakheel community." },
      { title: "Website Design for SMEs", desc: "Professional, mobile-first websites for small and medium businesses serving Al Nakheel families." },
    ],
    nearby: [
      { name: "Al Malqa", slug: "al-malqa" },
      { name: "Al Yasmin", slug: "al-yasmin" },
      { name: "Al Worood", slug: "al-worood" },
      { name: "Al Narjis", slug: "al-narjis" },
    ],
    faq: [
      { q: "How does proximity to Nakheel Mall affect digital marketing strategy?", a: "Significantly. Google Maps searches spike around Nakheel Mall — 'restaurants near Nakheel Mall', 'clinics near Al Nakheel', 'cafés near me'. A strong GBP listing optimized for these searches can drive substantial walk-in traffic from mall visitors." },
      { q: "What kind of content performs best in Al Nakheel?", a: "Family-oriented content in Arabic performs best. Before/after home service photos, family meal deals, children's activity promotions, and community-relevant content consistently outperform generic promotional posts in this neighborhood." },
      { q: "Is it worth running ads specifically targeting Al Nakheel?", a: "Yes — Nakheel Mall's catchment extends to several surrounding neighborhoods. We use geo-targeting in Google Ads and Meta Ads to reach Al Nakheel residents plus adjacent neighborhoods like Al Yasmin and Al Worood for maximum local coverage." },
    ],
    ctaHeading: "Connect with Al Nakheel's Family Audience",
    ctaSubtitle: "Al Nakheel's families are searching for businesses like yours. Let's make sure they find you — not your competitors.",
    arContent: {
      heroDesc: "النخيل حي محبوب في شمال الرياض يُميّزه الحياة العائلية والتجارة المجتمعية ومول النخيل الشهير. الأعمال هنا تزدهر حين تتواصل بصدق مع الجمهور العائلي المتماسك في الحي.",
      about: [
        "النخيل (Al Nakheel) يستمد اسمه من أشجار النخيل التي كانت تُميّز طبيعته. اليوم هو من أكثر أحياء شمال الرياض رسوخاً وتوجهاً عائلياً، معروف بقربه من مول النخيل وفيلاته العائلية الكبيرة وهويته المجتمعية الراسخة التي صمدت أمام التطور الشمالي السريع للرياض.",
        "يُعدّ مول النخيل المركز التجاري والاجتماعي للحي، يستقطب السكان من النخيل والأحياء المجاورة للتسوق والمطاعم والترفيه. الأعمال القريبة من المول تستفيد من هذه الحركة، بينما تلك داخل الشوارع السكنية تخدم جمهوراً مجتمعياً محلياً بالغ الخصوصية.",
        "التسويق في النخيل يكافئ الاستثمار المجتمعي. الأعمال التي تحافظ على مراجعات قوقل قوية وتصنع محتوى سوشيال يلامس الحياة العائلية في شمال الرياض تنمو ولاءً عميقاً لا تستطيع الإعلانات المدفوعة وحدها شراءه.",
      ],
      industries: ["مطاعم عائلية", "أنشطة أطفال", "بقالة وتجزئة", "عيادات صحية", "خدمات منزلية", "تعليم وتدريس"],
      services: [
        { title: "SEO محلي وتصدر نتائج القرب", desc: "كن أول نتيجة حين تبحث عائلات النخيل عن خدمات قريبة منهم على قوقل." },
        { title: "ملف النشاط في قوقل", desc: "قوائم GBP محسّنة تقتنص حركة زوار مول النخيل والباحثين من السكان." },
        { title: "إعلانات ميتا الموجهة للعائلات", desc: "حملات فيسبوك وإنستغرام تستهدف الشريحة الأساسية من الأسر السعودية في النخيل." },
        { title: "إعلانات سناب شات", desc: "تواصل مع الشباب والأسر في النخيل عبر أكثر منصة اجتماعية استخداماً في المملكة." },
        { title: "تسويق بالمحتوى المجتمعي", desc: "محتوى عربي متجذر محلياً يبني انتماءً للعلامة التجارية مع مجتمع النخيل." },
        { title: "تصميم مواقع للمشاريع المتوسطة", desc: "مواقع احترافية محسّنة للجوال للأعمال الصغيرة والمتوسطة التي تخدم عائلات النخيل." },
      ],
      faq: [
        { q: "كيف يؤثر القرب من مول النخيل على استراتيجية التسويق الرقمي؟", a: "تأثير بالغ. عمليات البحث على خرائط قوقل تتصاعد حول مول النخيل — 'مطاعم بالقرب من مول النخيل' و'عيادات قرب النخيل' و'كافيه بالقرب مني'. ملف GBP قوي محسّن لهذه الاستفسارات يمكنه توليد حركة دخول كبيرة من زوار المول." },
        { q: "ما نوع المحتوى الأفضل أداءً في النخيل؟", a: "المحتوى العائلي بالعربية يتصدر. صور الخدمات المنزلية قبل وبعد، عروض الوجبات العائلية، عروض أنشطة الأطفال، والمحتوى المتصل بالمجتمع يتفوق باستمرار على المنشورات الترويجية العامة في هذا الحي." },
        { q: "هل يستحق تشغيل إعلانات تستهدف النخيل تحديداً؟", a: "نعم — نطاق مول النخيل يمتد لعدة أحياء مجاورة. نستخدم الاستهداف الجغرافي في إعلانات قوقل وميتا للوصول لسكان النخيل والأحياء المجاورة كالياسمين والورود لأقصى تغطية محلية." },
      ],
      ctaHeading: "تواصل مع الجمهور العائلي في النخيل",
      ctaSubtitle: "عائلات النخيل تبحث عن أعمال مثل نشاطك. لنتأكد من أنهم يجدونك — لا منافسيك.",
    },
  },
  {
    slug: "al-yasmin",
    name: "Al Yasmin",
    nameAr: "الياسمين",
    zone: "North Riyadh",
    tagline: "Digital Marketing in Al Yasmin — A Thriving North Riyadh Community",
    heroDesc:
      "Al Yasmin is a rapidly growing North Riyadh neighborhood with a young, digitally-engaged population and a booming local commercial scene. The opportunity for well-marketed businesses here is enormous.",
    about: [
      "Al Yasmin (الياسمين) — named for the jasmine flower — is one of North Riyadh's fastest-growing residential districts. Over the past decade, it has transformed from a quieter suburban neighborhood into a thriving community with a growing commercial strip, multiple malls, restaurants, and services catering to its expanding population.",
      "The resident profile skews younger and more dynamic than some older central Riyadh districts. Young Saudi families, newly married couples, and young professionals constitute a significant part of Al Yasmin's population. This means high smartphone usage, heavy social media consumption, and a preference for discovering new businesses through Instagram, TikTok, and Snapchat before validating on Google.",
      "For businesses in Al Yasmin, organic social media growth and paid social campaigns often deliver faster initial returns than SEO, given the younger demographic's discovery habits. That said, local SEO becomes the sustainable long-term traffic engine as the neighborhood continues to densify.",
    ],
    industries: [
      { name: "Cafés & Restaurants", icon: "☕" },
      { name: "Beauty & Grooming", icon: "💅" },
      { name: "Fitness Centers", icon: "🏃" },
      { name: "Children's Play Areas", icon: "🎠" },
      { name: "Tutoring & Education", icon: "✏️" },
      { name: "Home Décor", icon: "🏡" },
    ],
    services: [
      { title: "TikTok & Instagram Marketing", desc: "Short-form video and lifestyle content targeting Al Yasmin's young, social-media-driven audience." },
      { title: "Snapchat Advertising", desc: "Geo-targeted Snap Ads reaching young residents in Al Yasmin and neighboring North Riyadh districts." },
      { title: "Google Maps & Local SEO", desc: "Rank for high-intent local searches as Al Yasmin's commercial scene continues to grow." },
      { title: "Meta Ads for Family Businesses", desc: "Facebook and Instagram campaigns targeting the young family households that define Al Yasmin." },
      { title: "Brand Building & Content", desc: "Consistent brand storytelling that builds recognition and loyalty in a competitive and growing market." },
      { title: "Google Business Profile", desc: "Optimized local listings that capture the surge of new residents searching for services in Al Yasmin." },
    ],
    nearby: [
      { name: "Al Nakheel", slug: "al-nakheel" },
      { name: "Hittin", slug: "hittin" },
      { name: "Al Narjis", slug: "al-narjis" },
      { name: "Al Worood", slug: "al-worood" },
    ],
    faq: [
      { q: "Is Al Yasmin a good area to launch a new food or café concept?", a: "It is one of Riyadh's better areas for this. The population is young, food-curious, and willing to try new concepts. A strong Instagram launch, influencer partnerships, and a well-optimized GBP listing can generate significant buzz for a new opening." },
      { q: "How quickly can digital marketing generate results for a new business in Al Yasmin?", a: "With paid social (Instagram/Snapchat) and Google Ads running simultaneously, a new business can start seeing qualified traffic within a week of launch. Combine this with SEO for sustainable long-term growth." },
      { q: "Do Al Yasmin customers prefer Arabic or English marketing content?", a: "Arabic strongly dominates. Al Yasmin's population is overwhelmingly Saudi national, so Arabic-language content — especially in a warm, conversational Gulf dialect tone — consistently outperforms English-heavy marketing." },
    ],
    ctaHeading: "Launch Strong in Al Yasmin",
    ctaSubtitle: "Al Yasmin's growing community is looking for great businesses. Let's make sure they find yours first.",
    arContent: {
      heroDesc: "الياسمين حي سريع النمو في شمال الرياض بسكان شباب منخرطين رقمياً ومشهد تجاري محلي متفجر. الفرصة للأعمال المُسوّقة جيداً هنا ضخمة.",
      about: [
        "الياسمين (Al Yasmin) — تيمناً بزهرة الياسمين — من أسرع أحياء شمال الرياض نمواً. في العقد الماضي تحوّل من حي ضاحوي هادئ إلى مجتمع متفجر بشريط تجاري متنامٍ وعدة مراكز تسوق ومطاعم وخدمات تلبّي سكانه المتوسّعين.",
        "ملف السكان أصغر سناً وأكثر حيوية من بعض أحياء وسط الرياض الأعرق. الأسر السعودية الشابة والمتزوجون الجدد والمهنيون الشباب يشكّلون شريحة بارزة. هذا يعني استخداماً مكثفاً للهاتف الذكي واستهلاكاً ثقيلاً للسوشيال ميديا وتفضيلاً لاكتشاف الأعمال الجديدة عبر إنستغرام وتيك توك وسناب شات قبل التحقق على قوقل.",
        "للأعمال في الياسمين، السوشيال ميديا العضوية والحملات المدفوعة غالباً تُقدّم عوائد أولية أسرع من SEO نظراً لعادات اكتشاف هذه الشريحة الشبابية. مع ذلك، يصبح SEO المحلي هو المحرك المستدام لحركة الزوار على المدى البعيد مع استمرار تكاثف الحي.",
      ],
      industries: ["كافيهات ومطاعم", "تجميل وعناية", "مراكز لياقة", "مناطق لعب للأطفال", "تدريس وتعليم", "ديكور منزلي"],
      services: [
        { title: "تيك توك وإنستغرام", desc: "محتوى فيديو قصير وأسلوب حياة يستهدف الجمهور الشباب المدفوع بالسوشيال في الياسمين." },
        { title: "إعلانات سناب شات", desc: "إعلانات سناب جغرافية تصل لشباب الياسمين والأحياء المجاورة في شمال الرياض." },
        { title: "خرائط قوقل وSEO المحلي", desc: "تصدّر عمليات البحث المحلية عالية النية مع استمرار نمو المشهد التجاري في الياسمين." },
        { title: "إعلانات ميتا للأعمال العائلية", desc: "حملات فيسبوك وإنستغرام تستهدف الأسر الشبابية المحورية في الياسمين." },
        { title: "بناء العلامة والمحتوى", desc: "رواية علامة تجارية متسقة تبني التعرف والولاء في سوق تنافسية ومتنامية." },
        { title: "ملف النشاط في قوقل", desc: "قوائم محلية محسّنة تقتنص موجة السكان الجدد الباحثين عن خدمات في الياسمين." },
      ],
      faq: [
        { q: "هل الياسمين منطقة جيدة لإطلاق مفهوم طعام أو كافيه جديد؟", a: "هي من أفضل مناطق الرياض لذلك. السكان شباب ومتشوقون للطعام ومستعدون لتجربة مفاهيم جديدة. إطلاق إنستغرام قوي وشراكات مؤثرين وملف GBP محسّن يمكنه توليد ضجة كبيرة لافتتاح جديد." },
        { q: "كم يستغرق التسويق الرقمي لتوليد نتائج لنشاط جديد في الياسمين؟", a: "مع تشغيل سوشيال مدفوع (إنستغرام/سناب) وإعلانات قوقل في وقت واحد، يمكن لنشاط جديد البدء في رؤية حركة زوار مؤهلة خلال أسبوع من الإطلاق. أضف SEO للنمو المستدام طويل الأمد." },
        { q: "هل يفضل عملاء الياسمين محتوى التسويق بالعربية أم الإنجليزية؟", a: "العربية تهيمن بقوة. سكان الياسمين سعوديون في معظمهم، لذا المحتوى العربي — خاصة بنبرة خليجية دافئة ومحادِثة — يتفوق باستمرار على التسويق الإنجليزي الغالب." },
      ],
      ctaHeading: "انطلق بقوة في الياسمين",
      ctaSubtitle: "مجتمع الياسمين المتنامي يبحث عن أعمال رائعة. لنتأكد من أنهم يجدون نشاطك أولاً.",
    },
  },
  {
    slug: "hittin",
    name: "Hittin",
    nameAr: "حطين",
    zone: "North Riyadh",
    tagline: "Digital Marketing in Hittin — North Riyadh's High-Income Enclave",
    heroDesc:
      "Hittin is synonymous with prosperity in North Riyadh — a district of grand villas, elite schools, and exclusive private clubs. Businesses targeting Hittin's residents need a marketing approach worthy of the Kingdom's most discerning consumers.",
    about: [
      "Hittin (حطين) is consistently ranked among Riyadh's most affluent neighborhoods. Located in North Riyadh, it is home to some of the city's largest private residences, multiple elite international schools, and a commercial scene dominated by premium services. The district also hosts several private clubs and sports facilities catering to its wealthy resident population.",
      "The consumer profile in Hittin represents Riyadh's upper tier: high-net-worth Saudi business families, senior government figures, and prosperous professionals. They have high expectations for service quality, are brand-conscious, and make purchasing decisions based heavily on reputation and peer recommendation amplified through social media.",
      "Digital marketing in Hittin is less about volume and more about precision and prestige. A campaign that positions your brand as the preferred choice among Hittin's social circles — through strategic influencer partnerships, polished visual content, and impeccable reputation management — yields extraordinary lifetime customer value.",
    ],
    industries: [
      { name: "Private Medical", icon: "🩺" },
      { name: "Elite Education", icon: "🎓" },
      { name: "Luxury Home Services", icon: "🏡" },
      { name: "Premium F&B", icon: "🥂" },
      { name: "Sports & Wellness", icon: "⛳" },
      { name: "Private Events", icon: "🎊" },
    ],
    services: [
      { title: "Premium Brand Positioning", desc: "Position your business as the prestige choice for Hittin's high-net-worth households." },
      { title: "Influencer & PR Marketing", desc: "Strategic partnerships with Riyadh's lifestyle and family influencers to reach Hittin's social circles." },
      { title: "Google Maps for High-Value Services", desc: "Dominate local search results for premium services in Hittin and elite North Riyadh neighborhoods." },
      { title: "Instagram & YouTube Marketing", desc: "High-production visual content that communicates luxury and quality to Hittin's discerning audience." },
      { title: "Luxury Website Design", desc: "World-class website design that matches the premium expectations of Hittin clientele." },
      { title: "Reputation Management", desc: "Protect and cultivate your brand's reputation — the single most important asset with Hittin's high-trust audience." },
    ],
    nearby: [
      { name: "Al Malqa", slug: "al-malqa" },
      { name: "Al Yasmin", slug: "al-yasmin" },
      { name: "Al Narjis", slug: "al-narjis" },
      { name: "KAFD", slug: "kafd" },
    ],
    faq: [
      { q: "What is the right marketing tone for targeting Hittin's wealthy residents?", a: "Understated excellence. Hittin's audience responds to quality, expertise, and social proof — not aggressive promotional messaging. Content that demonstrates mastery, showcases beautiful results, and features genuine client testimonials performs far better than discount-led advertising." },
      { q: "How important are reviews for businesses in Hittin?", a: "Exceptionally important. High-net-worth consumers in Hittin extensively research businesses online before engaging. A business with 50+ five-star Google reviews and regular positive feedback has an enormous trust advantage over competitors with sparse or mixed reviews." },
      { q: "Which digital channels are most effective for reaching Hittin residents?", a: "Instagram (aspirational content), Google (search intent), and word-of-mouth amplified through WhatsApp groups and community influencers. Hittin has strong social networks — one satisfied high-profile customer can generate multiple referrals." },
    ],
    ctaHeading: "Win Hittin's Elite Clientele",
    ctaSubtitle: "Riyadh's most affluent neighborhood deserves sophisticated marketing. Let's build you a premium digital presence that attracts Hittin's best customers.",
    arContent: {
      heroDesc: "حطين مرادف للرقي في شمال الرياض — حي الفيلات الشامخة والمدارس النخبوية والأندية الخاصة الحصرية. الأعمال التي تستهدف سكان حطين تحتاج نهجاً تسويقياً يليق بأكثر المستهلكين تطلباً في المملكة.",
      about: [
        "حطين (Hittin) تُصنَّف باستمرار بين أكثر أحياء الرياض ثراءً. في شمال الرياض، تستضيف بعض أكبر المنازل الخاصة في المدينة وعدة مدارس دولية نخبوية ومشهداً تجارياً تهيمن عليه الخدمات المتميزة. يضم الحي أيضاً عدة أندية خاصة ومرافق رياضية تخدم سكانه الأثرياء.",
        "ملف المستهلك في حطين يمثل الطبقة العليا في الرياض: أسر أعمال سعودية ذات ثروات ضخمة وكبار مسؤولين حكوميين ومهنيون ناجحون. لديهم توقعات عالية لجودة الخدمة، واعون بالعلامات التجارية، ويتخذون قرارات الشراء بناءً بشكل كبير على السمعة والتوصيات من الأقران المُضخَّمة بالسوشيال ميديا.",
        "التسويق الرقمي في حطين أقل تركيزاً على الحجم وأكثر على الدقة والهيبة. حملة تُموضع علامتك كالخيار المفضل ضمن الدوائر الاجتماعية في حطين — عبر شراكات استراتيجية مع المؤثرين ومحتوى بصري راقٍ وإدارة سمعة لا تشوبها شائبة — تُولّد قيمة عمرية استثنائية للعميل.",
      ],
      industries: ["طب خاص", "تعليم نخبوي", "خدمات منزلية فاخرة", "مطاعم وضيافة راقية", "رياضة وصحة", "فعاليات خاصة"],
      services: [
        { title: "تموضع العلامة الراقية", desc: "موضع نشاطك كالخيار الفاخر للأسر عالية الثروة في حطين." },
        { title: "المؤثرون والعلاقات العامة", desc: "شراكات استراتيجية مع مؤثري النمط الحياة والعائلة في الرياض للوصول للدوائر الاجتماعية في حطين." },
        { title: "خرائط قوقل للخدمات عالية القيمة", desc: "تسيّد نتائج البحث المحلي للخدمات المتميزة في حطين وأحياء شمال الرياض الراقية." },
        { title: "إنستغرام ويوتيوب", desc: "محتوى بصري عالي الإنتاج يوصل الرقي والجودة لجمهور حطين المتطلب." },
        { title: "تصميم مواقع فاخرة", desc: "تصميم مواقع عالمي المستوى يلبي التوقعات المتميزة لعملاء حطين." },
        { title: "إدارة السمعة", desc: "احمِ سمعة علامتك وعزّزها — الأصل الأهم بالنسبة لجمهور حطين عالي الثقة." },
      ],
      faq: [
        { q: "ما النبرة التسويقية الصحيحة لاستهداف سكان حطين الأثرياء؟", a: "التميز المتحفظ. جمهور حطين يستجيب للجودة والخبرة والدليل الاجتماعي — لا للرسائل الترويجية الهجومية. المحتوى الذي يُظهر الإتقان ويعرض نتائج جميلة ويضم شهادات عملاء حقيقية يتفوق بكثير على الإعلانات القائمة على الخصومات." },
        { q: "ما أهمية المراجعات للأعمال في حطين؟", a: "أهمية استثنائية. المستهلكون ذوو الثروات الضخمة في حطين يبحثون بعمق عن الأعمال قبل التعامل معها. نشاط لديه ٥٠+ مراجعة خمس نجوم على قوقل وتعليقات إيجابية منتظمة له ميزة ثقة ضخمة أمام المنافسين ذوي الحضور الهزيل أو المختلط." },
        { q: "ما القنوات الرقمية الأكثر فاعلية للوصول لسكان حطين؟", a: "إنستغرام (المحتوى الطموح)، قوقل (نية البحث)، والتوصيات الشفهية المُضخَّمة عبر مجموعات واتساب والمؤثرين المجتمعيين. حطين لديها شبكات اجتماعية قوية — عميل رفيع المستوى واحد راضٍ يمكنه توليد إحالات متعددة." },
      ],
      ctaHeading: "افز بعملاء حطين النخبوية",
      ctaSubtitle: "أكثر أحياء الرياض ثراءً يستحق تسويقاً متطوراً. لنبنِ لك حضوراً رقمياً متميزاً يستقطب أفضل عملاء حطين.",
    },
  },
  {
    slug: "al-sahafah",
    name: "Al Sahafah",
    nameAr: "الصحافة",
    zone: "West Riyadh",
    tagline: "Digital Marketing in Al Sahafah — Riyadh's Creative Quarter",
    heroDesc:
      "Al Sahafah — literally 'the press' — has long been associated with Riyadh's media and creative industries. Today it's a dynamic western district with a diverse commercial mix and strong community character. We help businesses here build digital presence that reflects their unique identity.",
    about: [
      "Al Sahafah (الصحافة) derives its name from its historical association with Saudi Arabia's press and media sector — several major newspapers and broadcasting operations were headquartered here. While the media landscape has evolved, the district retains a creative, independent character distinct from Riyadh's corporate north or historic center.",
      "The district hosts a diverse commercial mix: independent restaurants and cafés, creative services businesses, medical clinics, educational centers, and a thriving home services sector. It occupies a middle-income residential zone in western Riyadh that is well-served by major roads including King Fahd and Prince Mohammed bin Abdulaziz Roads.",
      "Al Sahafah's businesses are often independently owned and operate without the marketing budgets of larger brands. This is precisely where smart digital marketing provides the greatest competitive advantage — a well-optimized Google Business Profile and targeted social ads can make a small business punch far above its weight class.",
    ],
    industries: [
      { name: "Media & Creative", icon: "🎬" },
      { name: "Independent Restaurants", icon: "🍛" },
      { name: "Healthcare", icon: "💊" },
      { name: "Educational Services", icon: "📚" },
      { name: "Home Services", icon: "🔩" },
      { name: "Specialty Retail", icon: "🏪" },
    ],
    services: [
      { title: "Local SEO for Independent Businesses", desc: "Get found by Al Sahafah residents searching for your services before they find your competitors." },
      { title: "Google Business Profile Optimization", desc: "Maximize your visibility in Al Sahafah's local search results with a fully optimized GBP listing." },
      { title: "Social Media for Creative Businesses", desc: "Authentic social media content that reflects Al Sahafah's independent, creative business culture." },
      { title: "Affordable Google Ads", desc: "Cost-effective search campaigns designed for small business budgets in Al Sahafah." },
      { title: "Website Design for SMEs", desc: "Professional websites at accessible price points for Al Sahafah's independent business community." },
      { title: "Arabic Content Marketing", desc: "Quality Arabic blog content that builds organic traffic and positions you as a local authority." },
    ],
    nearby: [
      { name: "Al Worood", slug: "al-worood" },
      { name: "Tuwaiq", slug: "tuwaiq" },
      { name: "Diriyah", slug: "diriyah" },
      { name: "Al Nakheel", slug: "al-nakheel" },
    ],
    faq: [
      { q: "What's the single most impactful thing a small business in Al Sahafah can do online?", a: "Claim and fully optimize your Google Business Profile. It's free, it directly affects your Maps ranking, and Al Sahafah's residents rely heavily on Google Maps to discover local services. A 15-minute investment in photos, hours, and description can drive customers for years." },
      { q: "How does Al Sahafah's character affect the right marketing tone?", a: "Al Sahafah has an authentic, independent character. Marketing that feels genuine — real photos, honest messaging, staff stories — resonates far better than polished corporate communications. Lean into your business's human story." },
      { q: "Is digital advertising cost-effective for small businesses in Al Sahafah?", a: "Yes — especially compared to central Riyadh districts where CPCs are much higher. Al Sahafah's less contested ad market means smaller budgets can still generate meaningful results. SAR 1,000–2,000/month can be enough to start seeing real ROI." },
    ],
    ctaHeading: "Grow Your Business in Al Sahafah",
    ctaSubtitle: "Al Sahafah's independent spirit deserves digital marketing that works just as hard as you do. Let's build your local presence.",
    arContent: {
      heroDesc: "الصحافة — التي تعني حرفياً 'الصحافة' — ارتبطت تاريخياً بقطاع الإعلام الإبداعي في الرياض. اليوم هي حي غربي ديناميكي بمزيج تجاري متنوع وطابع مجتمعي متميز. نساعد الأعمال هنا على بناء حضور رقمي يعكس هويتها الفريدة.",
      about: [
        "الصحافة (Al Sahafah) تستمد اسمها من ارتباطها التاريخي بقطاع الصحافة والإعلام في المملكة — إذ كانت عدة صحف كبرى ومنظمات بث مقرّها هنا. ورغم تطور المشهد الإعلامي، احتفظ الحي بطابعه الإبداعي المستقل المميز عن شمال الرياض الشركاتي أو مركزه التاريخي.",
        "يضم الحي مزيجاً تجارياً متنوعاً: مطاعم وكافيهات مستقلة وأعمال خدمات إبداعية وعيادات طبية ومراكز تعليمية وقطاع خدمات منزلية نشط يخدم المجتمع السكني المتوسط في غرب الرياض على الطرق الرئيسية كطريق الملك فهد وطريق الأمير محمد بن عبدالعزيز.",
        "كثير من أعمال الصحافة مملوكة ومُدارة بشكل مستقل وتعمل بدون ميزانيات التسويق للعلامات الكبرى. وهنا بالضبط يُقدّم التسويق الرقمي الذكي أكبر ميزة تنافسية — ملف نشاط قوقل محسّن بشكل جيد وإعلانات سوشيال مستهدفة يمكنهما تمكين مشروع صغير من التفوق بكثير على حجمه.",
      ],
      industries: ["خدمات إبداعية", "مطاعم مستقلة", "رعاية صحية", "خدمات تعليمية", "خدمات منزلية", "تجزئة متخصصة"],
      services: [
        { title: "SEO محلي للأعمال المستقلة", desc: "اجعل سكان الصحافة يجدونك حين يبحثون عن خدماتك قبل أن يجدوا منافسيك." },
        { title: "تحسين ملف النشاط في قوقل", desc: "عظّم ظهورك في نتائج البحث المحلي بالصحافة بقائمة GBP محسّنة بالكامل." },
        { title: "سوشيال ميديا للأعمال الإبداعية", desc: "محتوى سوشيال أصيل يعكس الثقافة التجارية الإبداعية المستقلة في الصحافة." },
        { title: "إعلانات قوقل بأسعار معقولة", desc: "حملات بحث فعّالة من حيث التكلفة مصممة لميزانيات المشاريع الصغيرة في الصحافة." },
        { title: "تصميم مواقع للمشاريع المتوسطة", desc: "مواقع احترافية بأسعار في متناول الجميع للمجتمع التجاري المستقل في الصحافة." },
        { title: "تسويق بالمحتوى العربي", desc: "محتوى مدوّنات عربي جيد يبني الحركة العضوية ويجعلك مرجعاً محلياً." },
      ],
      faq: [
        { q: "ما أكثر شيء مؤثر يمكن لمشروع صغير في الصحافة فعله عبر الإنترنت؟", a: "استحق وحسّن ملف نشاطك في قوقل. مجاني تماماً، يؤثر مباشرة على ترتيبك في الخرائط، وسكان الصحافة يعتمدون بشكل كبير على خرائط قوقل لاكتشاف الخدمات المحلية. استثمار ١٥ دقيقة في الصور وساعات العمل والوصف يمكنه جلب عملاء لسنوات." },
        { q: "كيف يؤثر طابع الصحافة على النبرة التسويقية الصحيحة؟", a: "الصحافة لها طابع أصيل ومستقل. التسويق الصادق — صور حقيقية ورسائل صريحة وقصص موظفين — يلقى صدى أفضل بكثير من التواصل الشركاتي المصقول. اعتمد على القصة الإنسانية لنشاطك." },
        { q: "هل الإعلان الرقمي فعّال من حيث التكلفة للمشاريع الصغيرة في الصحافة؟", a: "نعم — خاصة مقارنة بأحياء وسط الرياض التي تكون تكاليف النقر فيها أعلى بكثير. سوق الإعلانات الأقل تنافسية في الصحافة يعني ميزانيات أصغر لا تزال قادرة على تحقيق نتائج ملموسة. ١٬٠٠٠–٢٬٠٠٠ ريال شهرياً قد تكفي لبدء رؤية عائد حقيقي." },
      ],
      ctaHeading: "نمّي نشاطك في الصحافة",
      ctaSubtitle: "الروح المستقلة للصحافة تستحق تسويقاً رقمياً يعمل بنفس جِدّك. لنبنِ حضورك المحلي.",
    },
  },
  {
    slug: "al-worood",
    name: "Al Worood",
    nameAr: "الورود",
    zone: "North Riyadh",
    tagline: "Digital Marketing in Al Worood — Where North Riyadh Begins",
    heroDesc:
      "Al Worood sits at the interface between central and North Riyadh — a well-established residential and commercial district with a loyal community and growing commercial scene. We help businesses here build lasting digital presence.",
    about: [
      "Al Worood (الورود — 'the flowers') is an established residential district that occupies a strategic position between central Riyadh and the northern expansion. Its commercial strip along Al Urouba Road and side streets features a practical mix of family dining, clinics, educational centers, and service businesses serving the district's long-term resident community.",
      "The neighborhood has a stable, multigenerational character. Many Al Worood families have lived in the district for decades, creating strong community loyalty and word-of-mouth networks that amplify the effects of digital marketing. A business that earns the community's trust here benefits from organic referrals that paid ads alone cannot generate.",
      "Al Worood's commercial density has increased significantly as adjacent northern districts grew. Businesses that established strong Google Maps and SEO presence early have maintained competitive advantages that newer entrants struggle to overcome — making digital investment in Al Worood particularly strategic.",
    ],
    industries: [
      { name: "Family Dining", icon: "🍽️" },
      { name: "Clinics & Pharmacy", icon: "💊" },
      { name: "Tutoring Centers", icon: "📐" },
      { name: "Supermarkets", icon: "🛒" },
      { name: "Auto Services", icon: "🚗" },
      { name: "Home Services", icon: "🔑" },
    ],
    services: [
      { title: "Community-Focused Local SEO", desc: "Build lasting organic rankings for service searches across Al Worood and nearby North Riyadh areas." },
      { title: "Google Business Profile", desc: "Optimized GBP listings that capture the high volume of 'near me' searches from Al Worood residents." },
      { title: "WhatsApp Marketing", desc: "Community broadcast campaigns that reach Al Worood's well-networked, WhatsApp-active households." },
      { title: "Meta Ads for Local Services", desc: "Facebook and Instagram targeting for family-oriented services in Al Worood." },
      { title: "Review Generation", desc: "Systematic review-building that leverages Al Worood's community trust networks." },
      { title: "Local Content Marketing", desc: "Arabic content that resonates with Al Worood's established community character." },
    ],
    nearby: [
      { name: "Al Nakheel", slug: "al-nakheel" },
      { name: "Al Sahafah", slug: "al-sahafah" },
      { name: "Al Yasmin", slug: "al-yasmin" },
      { name: "Al Malqa", slug: "al-malqa" },
    ],
    faq: [
      { q: "How does community trust affect marketing in Al Worood?", a: "Strongly. Al Worood's multigenerational community means word-of-mouth travels fast, especially through WhatsApp family and neighborhood groups. Businesses that earn genuine community trust — through quality service and consistent engagement — see their digital marketing amplified significantly by organic referrals." },
      { q: "What are the key commercial zones in Al Worood to target?", a: "Al Urouba Road is the main commercial spine. Businesses on or near this road benefit from high vehicular and pedestrian traffic. Google Maps and road-level outdoor signage combined with digital advertising create the strongest awareness." },
      { q: "Is the competition strong in Al Worood?", a: "Moderate. Established businesses have local reputations, but many have under-invested in digital. A new or newer business with a strong Google Business Profile and active social presence can overtake older competitors who haven't kept up with digital trends." },
    ],
    ctaHeading: "Build Your Roots in Al Worood",
    ctaSubtitle: "Al Worood's community loyalty is there to be earned. Let's build you a digital presence that grows with the neighborhood.",
    arContent: {
      heroDesc: "الورود يقع عند تقاطع وسط الرياض وشمالها — حي سكني وتجاري راسخ بمجتمع وفي ومشهد تجاري متنامٍ. نساعد الأعمال هنا على بناء حضور رقمي دائم.",
      about: [
        "الورود (Al Worood — 'الزهور') حي سكني راسخ يحتل موقعاً استراتيجياً بين وسط الرياض والتوسع الشمالي. شريطه التجاري على طريق العروبة والشوارع الجانبية يضم مزيجاً عملياً من مطاعم عائلية وعيادات ومراكز تعليمية وأعمال خدمية تخدم المجتمع السكني الراسخ في الحي.",
        "للحي طابع مستقر متعدد الأجيال. كثير من عائلات الورود مقيمة في الحي منذ عقود، مما ينشئ ولاءً مجتمعياً قوياً وشبكات توصيات شفهية تُضخّم تأثير التسويق الرقمي. نشاط يكسب ثقة المجتمع هنا يستفيد من إحالات عضوية لا تستطيع الإعلانات المدفوعة وحدها توليدها.",
        "تكثّفت الكثافة التجارية في الورود بشكل ملحوظ مع نمو الأحياء الشمالية المجاورة. الأعمال التي أسّست حضوراً مبكراً على خرائط قوقل وSEO حافظت على مزايا تنافسية يصعب على الداخلين الجدد تجاوزها — مما يجعل الاستثمار الرقمي في الورود استراتيجياً بشكل خاص.",
      ],
      industries: ["مطاعم عائلية", "عيادات وصيدليات", "مراكز دراسة", "سوبرماركت", "خدمات السيارات", "خدمات منزلية"],
      services: [
        { title: "SEO محلي موجه للمجتمع", desc: "ابنِ ترتيبات عضوية دائمة لعمليات البحث عن الخدمات في الورود والمناطق المجاورة بشمال الرياض." },
        { title: "ملف النشاط في قوقل", desc: "قوائم GBP محسّنة تقتنص الحجم الكبير من عمليات 'بالقرب مني' من سكان الورود." },
        { title: "تسويق عبر واتساب", desc: "حملات بث مجتمعية تصل لمنازل الورود النشطة على واتساب." },
        { title: "إعلانات ميتا للخدمات المحلية", desc: "استهداف فيسبوك وإنستغرام للخدمات الموجهة للعائلات في الورود." },
        { title: "بناء المراجعات", desc: "بناء منهجي للمراجعات يستثمر شبكات الثقة المجتمعية في الورود." },
        { title: "تسويق بالمحتوى المحلي", desc: "محتوى عربي يتناغم مع الطابع المجتمعي الراسخ للورود." },
      ],
      faq: [
        { q: "كيف تؤثر الثقة المجتمعية على التسويق في الورود؟", a: "تأثيراً قوياً. مجتمع الورود متعدد الأجيال يعني انتشار الكلام الشفهي بسرعة، خاصة عبر مجموعات واتساب العائلية ومجموعات الحي. الأعمال التي تكسب الثقة المجتمعية الحقيقية — من خلال خدمة جيدة وتفاعل متسق — ترى تسويقها الرقمي يتضاعف بإحالات عضوية." },
        { q: "ما المناطق التجارية الرئيسية في الورود المناسبة للاستهداف؟", a: "طريق العروبة هو العمود التجاري الرئيسي. الأعمال على هذا الطريق أو بالقرب منه تستفيد من حركة المركبات والمشاة العالية. خرائط قوقل مدمجة مع الإعلانات الرقمية تصنع أقوى وعي بالعلامة." },
        { q: "هل المنافسة قوية في الورود؟", a: "متوسطة. للأعمال الراسخة سمعات محلية، لكن كثيراً منها استثمر بشكل غير كافٍ رقمياً. نشاط جديد أو حديث بملف GBP قوي وحضور سوشيال نشط يمكنه تجاوز المنافسين القدامى الذين لم يواكبوا التطورات الرقمية." },
      ],
      ctaHeading: "ارسّخ جذورك في الورود",
      ctaSubtitle: "ولاء مجتمع الورود يُكتسب. لنبنِ لك حضوراً رقمياً ينمو مع الحي.",
    },
  },
  {
    slug: "al-shifa",
    name: "Al Shifa",
    nameAr: "الشفا",
    zone: "South Riyadh",
    tagline: "Digital Marketing in Al Shifa — South Riyadh's Healthcare Hub",
    heroDesc:
      "Al Shifa's name means 'healing' in Arabic — and the district lives up to it with one of Riyadh's highest concentrations of hospitals, clinics, and medical facilities. Digital marketing here requires understanding a unique healthcare-dominant commercial environment.",
    about: [
      "Al Shifa (الشفا — 'healing') is aptly named. The district in South Riyadh hosts a remarkable density of healthcare infrastructure including major hospitals, specialist clinics, pharmacies, and medical supply businesses. Al Shifa's commercial identity is inextricably linked to healthcare in a way unlike any other Riyadh district.",
      "This healthcare focus creates distinct marketing dynamics. Patients travel from across Riyadh and the wider region to seek specific medical services in Al Shifa, meaning the geographic catchment for healthcare marketing here is much larger than the immediate neighborhood. Simultaneously, the residential community around the medical facilities supports a robust local economy of support services.",
      "Healthcare digital marketing in Al Shifa requires careful attention to regulatory guidelines for medical advertising in Saudi Arabia, while maximizing visibility for the specific specializations and procedures that drive patient inquiries. We have the expertise to navigate this landscape compliantly and effectively.",
    ],
    industries: [
      { name: "Hospitals & Clinics", icon: "🏥" },
      { name: "Pharmacies", icon: "💊" },
      { name: "Medical Supplies", icon: "🩻" },
      { name: "Rehabilitation", icon: "🦽" },
      { name: "Dental Clinics", icon: "🦷" },
      { name: "Optical Centers", icon: "👓" },
    ],
    services: [
      { title: "Medical SEO", desc: "Rank for specific medical procedure, specialist, and condition searches that drive patient inquiries." },
      { title: "Google Maps for Healthcare", desc: "Dominate Maps results for medical searches from patients across Riyadh looking for Al Shifa facilities." },
      { title: "Compliant Healthcare Advertising", desc: "Google and Meta ad campaigns that comply with Saudi healthcare advertising guidelines while maximizing reach." },
      { title: "Patient Review Management", desc: "Build a strong patient review profile that drives appointment bookings and builds healthcare credibility." },
      { title: "Medical Website Design", desc: "Professional, HIPAA-aligned medical websites with appointment booking and service pages for each specialty." },
      { title: "Arabic Health Content", desc: "Educational Arabic content on conditions and treatments that builds organic traffic and patient trust." },
    ],
    nearby: [
      { name: "Tuwaiq", slug: "tuwaiq" },
      { name: "Al Aziziyah", slug: "al-aziziyah" },
      { name: "Al Naseem", slug: "al-naseem" },
      { name: "Diriyah", slug: "diriyah" },
    ],
    faq: [
      { q: "What makes healthcare digital marketing in Al Shifa unique?", a: "The geographic catchment is unusually large — patients come from all over Riyadh for specific specialties. This means SEO and Google Ads campaigns should target city-wide or region-wide rather than just nearby neighborhoods, especially for specialty procedures." },
      { q: "Are there specific restrictions on medical advertising in Saudi Arabia?", a: "Yes. SFDA (Saudi Food and Drug Authority) guidelines govern healthcare advertising. We ensure all campaigns comply with restrictions on before/after images, outcome claims, and promotional language for medical services in the Kingdom." },
      { q: "How important is Google Maps for a clinic in Al Shifa?", a: "Critical. Patients typically search for 'orthopedic surgeon Riyadh' or 'dental clinic near Al Shifa' on Google Maps before booking. A clinic with 100+ reviews and an optimized GBP listing has an enormous advantage over competitors with thin online presence." },
    ],
    ctaHeading: "Grow Your Practice in Al Shifa",
    ctaSubtitle: "Al Shifa's patients are searching for the best healthcare providers. Let's make sure they find your clinic first.",
    arContent: {
      heroDesc: "اسم الشفا يعني الشفاء بالعربية — والحي يستحق هذا الاسم بأعلى تركيز للمستشفيات والعيادات والمرافق الطبية في الرياض. التسويق الرقمي هنا يستوجب فهم بيئة تجارية فريدة يهيمن عليها الطابع الصحي.",
      about: [
        "الشفا (Al Shifa — 'الشفاء') اسم في محله. يستضيف الحي في جنوب الرياض كثافة استثنائية من البنية التحتية الصحية تشمل مستشفيات كبرى وعيادات متخصصة وصيدليات وأعمال المستلزمات الطبية. الهوية التجارية للشفا مرتبطة ارتباطاً لا ينفصم بالرعاية الصحية بطريقة لا مثيل لها في أي حي آخر بالرياض.",
        "هذا التركيز الصحي يُنشئ ديناميكيات تسويقية مميزة. يقدم المرضى من مختلف أنحاء الرياض والمنطقة الأوسع لطلب خدمات طبية محددة في الشفا، مما يعني أن النطاق الجغرافي لتسويق الرعاية الصحية هنا أكبر بكثير من الحي المجاور مباشرة. في الوقت ذاته، يدعم المجتمع السكني حول المرافق الطبية اقتصاداً محلياً قوياً للخدمات المساندة.",
        "يستوجب التسويق الرقمي للرعاية الصحية في الشفا الانتباه الدقيق للوائح الإعلان الطبي في المملكة، مع تعظيم الظهور للتخصصات والإجراءات المحددة التي تحرك استفسارات المرضى. لدينا الخبرة للتنقل في هذا المشهد باحتراف وفاعلية.",
      ],
      industries: ["مستشفيات وعيادات", "صيدليات", "مستلزمات طبية", "تأهيل وعلاج طبيعي", "عيادات أسنان", "مراكز بصريات"],
      services: [
        { title: "SEO طبي", desc: "تصدّر عمليات البحث المتعلقة بإجراءات طبية محددة وتخصصات وأمراض تحرك استفسارات المرضى." },
        { title: "خرائط قوقل للرعاية الصحية", desc: "تسيّد نتائج الخرائط للبحث الطبي من مرضى في مختلف أنحاء الرياض الباحثين عن مرافق الشفا." },
        { title: "إعلانات رعاية صحية متوافقة", desc: "حملات قوقل وميتا تتوافق مع إرشادات الإعلان الطبي السعودية مع تعظيم الوصول." },
        { title: "إدارة مراجعات المرضى", desc: "ابنِ ملف مراجعات مريض قوي يحرك حجوزات المواعيد ويعزز مصداقية الرعاية الصحية." },
        { title: "تصميم مواقع طبية", desc: "مواقع طبية احترافية مع نظام حجز مواعيد وصفحات خدمات لكل تخصص." },
        { title: "محتوى صحي عربي", desc: "محتوى عربي تعليمي عن الحالات والعلاجات يبني حركة عضوية وثقة المرضى." },
      ],
      faq: [
        { q: "ما الذي يجعل التسويق الرقمي للرعاية الصحية في الشفا فريداً؟", a: "النطاق الجغرافي كبير بشكل غير معتاد — يقدم المرضى من مختلف أنحاء الرياض لتخصصات بعينها. هذا يعني أن حملات SEO وقوقل يجب أن تستهدف نطاق المدينة أو المنطقة لا الأحياء القريبة فحسب، خاصة للإجراءات المتخصصة." },
        { q: "هل ثمة قيود على الإعلان الطبي في المملكة؟", a: "نعم. لوائح هيئة الغذاء والدواء السعودية (SFDA) تحكم الإعلان الصحي. نضمن أن جميع حملاتنا تمتثل للقيود على الصور قبل/بعد وادعاءات النتائج ولغة الترويج للخدمات الطبية في المملكة." },
        { q: "ما أهمية خرائط قوقل لعيادة في الشفا؟", a: "بالغة الأهمية. المرضى عادةً يبحثون عن 'جراح عظام الرياض' أو 'عيادة أسنان بالقرب من الشفا' على خرائط قوقل قبل الحجز. عيادة لديها ١٠٠+ مراجعة وملف GBP محسّن تتمتع بميزة ثقة ضخمة أمام المنافسين ذوي الحضور الرقمي الضعيف." },
      ],
      ctaHeading: "طوّر ممارستك الطبية في الشفا",
      ctaSubtitle: "مرضى الشفا يبحثون عن أفضل مزودي الرعاية الصحية. لنتأكد من أنهم يجدون عيادتك أولاً.",
    },
  },
  {
    slug: "al-naseem",
    name: "Al Naseem",
    nameAr: "النسيم",
    zone: "East Riyadh",
    tagline: "Digital Marketing in Al Naseem — East Riyadh's Vibrant Commercial District",
    heroDesc:
      "Al Naseem is one of East Riyadh's most commercially active districts — a diverse, high-energy neighborhood with a large and growing consumer base. Businesses here have access to one of Riyadh's most underserved digital marketing opportunities.",
    about: [
      "Al Naseem (النسيم — 'the breeze') is a major district in East Riyadh with a large, diverse population and significant commercial infrastructure. The area is home to large residential communities, busy commercial strips, supermarkets, clinics, and educational facilities serving both Saudi families and a significant expatriate population.",
      "East Riyadh has historically been less saturated with digital marketing activity than the city's affluent north and upscale center. This means competition for top Google rankings and Map positions is lower, and advertising CPCs are more affordable. For businesses willing to invest now, Al Naseem offers an exceptional opportunity to build dominant digital presence before the market becomes more competitive.",
      "The district's diverse demographic — spanning different income levels, nationalities, and professional backgrounds — requires segmented marketing approaches. Arabic-language content for Saudi families, accessible pricing-focused messaging for value-conscious shoppers, and quality-led communications for the middle-class consumer segment all have roles to play.",
    ],
    industries: [
      { name: "Supermarkets & Retail", icon: "🏬" },
      { name: "Clinics & Medical", icon: "🏥" },
      { name: "Restaurants", icon: "🍔" },
      { name: "Educational Centers", icon: "🎒" },
      { name: "Auto Services", icon: "🚘" },
      { name: "Logistics & Warehousing", icon: "📦" },
    ],
    services: [
      { title: "Affordable Local SEO", desc: "Build lasting Google rankings in East Riyadh's less-contested digital market at accessible investment levels." },
      { title: "Google Maps Optimization", desc: "Dominate local search in Al Naseem before larger brands wake up to the East Riyadh opportunity." },
      { title: "Cost-Effective Google Ads", desc: "Lower CPCs in East Riyadh mean your ad budget goes further — generating more leads per riyal." },
      { title: "Meta Ads for Diverse Demographics", desc: "Multi-segment Facebook and Instagram campaigns reaching Al Naseem's varied consumer base." },
      { title: "E-Commerce Development", desc: "Online stores and delivery capabilities for retail and F&B businesses serving East Riyadh." },
      { title: "Google Business Profile", desc: "Strong GBP presence that captures the growing volume of mobile searches in East Riyadh." },
    ],
    nearby: [
      { name: "Al Aziziyah", slug: "al-aziziyah" },
      { name: "Ishbiliyah", slug: "ishbiliyah" },
      { name: "Al Rawdah", slug: "al-rawdah" },
      { name: "Al Murabba", slug: "al-murabba" },
    ],
    faq: [
      { q: "Is East Riyadh a good market for digital marketing investment?", a: "Excellent — and underrated. East Riyadh has a large, growing population and significantly lower digital marketing competition than the north or center. First-mover advantage in local SEO is easier to achieve and harder for competitors to displace." },
      { q: "How diverse is the Al Naseem customer base?", a: "Very. Al Naseem has Saudi families, Egyptian and Levantine expats, South Asian professionals, and other GCC nationals. Successful marketing here often needs Arabic as the primary language but should consider the broader cultural mix in messaging and imagery." },
      { q: "What is the most effective digital channel for a new business in Al Naseem?", a: "Google Business Profile plus basic local SEO for immediate organic visibility, combined with targeted Snapchat and Instagram ads to build brand awareness with the under-35 majority. This combination provides both immediate and compounding returns." },
    ],
    ctaHeading: "Seize the Al Naseem Opportunity",
    ctaSubtitle: "East Riyadh's growing market is waiting. Get ahead of the competition with a strong digital presence in Al Naseem today.",
    arContent: {
      heroDesc: "النسيم من أكثر أحياء شرق الرياض نشاطاً تجارياً — حي متنوع عالي الطاقة بقاعدة مستهلكين كبيرة ومتنامية. الأعمال هنا تصل إلى إحدى الفرص التسويقية الرقمية الأقل استغلالاً في الرياض.",
      about: [
        "النسيم (Al Naseem — 'النسيم') حي كبير في شرق الرياض بسكان متنوعين وكثيرين وبنية تحتية تجارية قوية. تضم المنطقة مجمعات سكنية كبيرة وشوارع تجارية مزدحمة وسوبرماركتات وعيادات ومرافق تعليمية تخدم الأسر السعودية والجالية الأجنبية الكبيرة.",
        "تاريخياً، كان شرق الرياض أقل تشبعاً بنشاط التسويق الرقمي من الشمال الثري والمركز الراقي. هذا يعني منافسة أقل على قمة ترتيبات قوقل ومواقع الخرائط، وتكاليف نقر إعلانية أكثر اتساعاً. للأعمال المستعدة للاستثمار الآن، يقدم النسيم فرصة استثنائية لبناء حضور رقمي مهيمن قبل تصاعد التنافسية.",
        "الديموغرافية المتنوعة للحي — التي تمتد عبر مستويات دخل وجنسيات وخلفيات مهنية مختلفة — تستوجب مناهج تسويقية متعددة الشرائح. محتوى عربي للأسر السعودية ورسائل تركز على السعر المناسب للمتسوق الباحث عن القيمة واتصالات تقودها الجودة لشريحة المستهلك المتوسطة — كلها لها دور.",
      ],
      industries: ["سوبرماركت وتجزئة", "عيادات وطب", "مطاعم", "مراكز تعليمية", "خدمات سيارات", "لوجستيك ومستودعات"],
      services: [
        { title: "SEO محلي بأسعار معقولة", desc: "ابنِ ترتيبات قوقل دائمة في السوق الرقمية الأقل تنافسية بشرق الرياض." },
        { title: "تحسين خرائط قوقل", desc: "تسيّد البحث المحلي في النسيم قبل أن تنتبه العلامات الكبرى لفرصة شرق الرياض." },
        { title: "إعلانات قوقل فعّالة التكلفة", desc: "تكاليف النقر الأقل في شرق الرياض تعني ميزانيتك تذهب أبعد — عملاء أكثر بكل ريال." },
        { title: "إعلانات ميتا للشرائح المتنوعة", desc: "حملات فيسبوك وإنستغرام متعددة الشرائح تصل لقاعدة المستهلكين المتنوعة في النسيم." },
        { title: "تطوير التجارة الإلكترونية", desc: "متاجر إلكترونية وقدرات توصيل للأعمال والمطاعم التي تخدم شرق الرياض." },
        { title: "ملف النشاط في قوقل", desc: "حضور GBP قوي يقتنص الحجم المتزايد من عمليات البحث على الجوال في شرق الرياض." },
      ],
      faq: [
        { q: "هل شرق الرياض سوق جيد للاستثمار التسويقي الرقمي؟", a: "ممتاز — ومُقلَّل التقدير. شرق الرياض له سكان كثيرون ومتنامون ومنافسة تسويقية رقمية أقل بكثير من الشمال أو المركز. ميزة السبق في SEO المحلي أسهل تحقيقاً وأصعب على المنافسين إزاحتها." },
        { q: "ما مدى تنوع قاعدة عملاء النسيم؟", a: "متنوعة جداً. في النسيم أسر سعودية ومصريون وشاميون وأجانب من جنوب آسيا وعرب خليجيون. التسويق الناجح هنا يحتاج العربية كلغة أساسية لكن ينبغي مراعاة المزيج الثقافي الأوسع في الرسائل والصور." },
        { q: "ما أكثر قناة رقمية فاعلية لنشاط جديد في النسيم؟", a: "ملف النشاط في قوقل مع SEO محلي أساسي للظهور العضوي الفوري، مدمجاً مع إعلانات سناب وإنستغرام المستهدفة لبناء وعي العلامة لدى الأغلبية دون ٣٥. هذا التركيب يُقدّم عوائد فورية ومتراكمة." },
      ],
      ctaHeading: "اقتنص فرصة النسيم",
      ctaSubtitle: "السوق المتنامي في شرق الرياض في انتظارك. تقدم على المنافسة ببناء حضور رقمي قوي في النسيم اليوم.",
    },
  },
  {
    slug: "al-aziziyah",
    name: "Al Aziziyah",
    nameAr: "العزيزية",
    zone: "East Riyadh",
    tagline: "Digital Marketing in Al Aziziyah — East Riyadh's Commercial Backbone",
    heroDesc:
      "Al Aziziyah is one of East Riyadh's most commercially active corridors — dense with retail, food, and service businesses serving a large local population. Smart digital marketing here delivers fast, measurable results.",
    about: [
      "Al Aziziyah (العزيزية) is a major commercial district in East Riyadh, known for its busy retail streets, large supermarkets, diverse restaurant scene, and significant industrial and warehousing activity in its outer zones. It serves as a commercial anchor for the broader East Riyadh area.",
      "The district's commercial character means that businesses here compete for a high volume of local, in-the-moment customers. 'Near me' searches and Google Maps lookups are the primary discovery mechanism for Al Aziziyah's consumer businesses. Visibility on these platforms directly translates to foot traffic and phone calls.",
      "Al Aziziyah's diverse population — which includes large South Asian, Southeast Asian, and Arab expatriate communities alongside Saudi families — creates a multi-cultural consumer market unlike the more homogeneous districts of North Riyadh. Marketing that acknowledges this diversity, while leading in Arabic, captures a broader share of the district's spending.",
    ],
    industries: [
      { name: "Retail & Supermarkets", icon: "🛒" },
      { name: "F&B", icon: "🍽️" },
      { name: "Industrial Services", icon: "⚙️" },
      { name: "Automotive", icon: "🔧" },
      { name: "Clinics", icon: "🏥" },
      { name: "Logistics", icon: "🚛" },
    ],
    services: [
      { title: "Local Maps Domination", desc: "Own the Google Maps 3-pack for commercial searches across Al Aziziyah and East Riyadh." },
      { title: "Google Ads for Local Commerce", desc: "High-volume, cost-efficient search campaigns capturing East Riyadh's large daily commercial search traffic." },
      { title: "Multilingual Social Media", desc: "Content and ads in Arabic and English reaching Al Aziziyah's diverse multicultural consumer base." },
      { title: "E-Commerce & Delivery Marketing", desc: "Online ordering and delivery marketing for Al Aziziyah's active food and retail market." },
      { title: "B2B Lead Generation", desc: "Digital campaigns for industrial and logistics businesses serving East Riyadh's commercial sector." },
      { title: "Google Business Profile", desc: "Optimized GBP listings that capture every local search opportunity in the Al Aziziyah commercial zone." },
    ],
    nearby: [
      { name: "Al Naseem", slug: "al-naseem" },
      { name: "Ishbiliyah", slug: "ishbiliyah" },
      { name: "Al Shifa", slug: "al-shifa" },
      { name: "Al Murabba", slug: "al-murabba" },
    ],
    faq: [
      { q: "How does Al Aziziyah's mix of nationalities affect digital marketing strategy?", a: "It means a broader channel mix matters. Arabic content dominates for Saudi customers. Urdu/Hindi social media content can reach South Asian communities. English covers the professional expat segment. The highest-ROI approach for most businesses is Arabic-first with English supplementation." },
      { q: "Is industrial business digital marketing relevant in Al Aziziyah?", a: "Very much so. B2B companies — maintenance contractors, equipment suppliers, logistics firms — benefit enormously from Google Ads and LinkedIn campaigns targeting procurement managers and operations directors who search online for suppliers." },
      { q: "What are the best platforms for a restaurant in Al Aziziyah?", a: "Google Maps (for immediate local discovery), Instagram (for food photography and offers), and food delivery apps like HungerStation and Jahez. A presence on delivery platforms combined with Google Maps optimization typically drives the highest order volume." },
    ],
    ctaHeading: "Dominate Al Aziziyah's Commercial Market",
    ctaSubtitle: "East Riyadh's commercial heartland is ready for smart digital marketing. Let's build your visibility and drive real results.",
    arContent: {
      heroDesc: "العزيزية أحد أكثر محاور شرق الرياض نشاطاً تجارياً — كثيف بالتجزئة والمطاعم وأعمال الخدمات التي تخدم سكاناً كثيرين. التسويق الرقمي الذكي هنا يُحقق نتائج سريعة وقابلة للقياس.",
      about: [
        "العزيزية (Al Aziziyah) حي تجاري كبير في شرق الرياض، معروف بشوارع تجزئته المزدحمة وسوبرماركتاته الكبيرة ومشهده المتنوع من المطاعم ونشاطه الصناعي والتخزيني المهم في مناطقه الخارجية. يخدم كمرساة تجارية لمنطقة شرق الرياض الأوسع.",
        "الطابع التجاري للحي يعني أن الأعمال هنا تتنافس على حجم كبير من العملاء المحليين في اللحظة الراهنة. البحث بـ'بالقرب مني' والبحث على خرائط قوقل هما الآلية الرئيسية للاكتشاف لأعمال المستهلكين في العزيزية. الظهور على هذه المنصات يتحول مباشرة إلى حركة زبائن ومكالمات هاتفية.",
        "يتميز مجتمع العزيزية المتنوع — الذي يضم جاليات كبيرة من جنوب آسيا وجنوب شرق آسيا والعرب الأجانب بجانب الأسر السعودية — بسوق استهلاكي متعدد الثقافات لا مثيل له في أحياء شمال الرياض الأكثر تجانساً. التسويق الذي يعترف بهذا التنوع مع الإبقاء على العربية في الصدارة يقتنص حصة أكبر من الإنفاق.",
      ],
      industries: ["تجزئة وسوبرماركت", "مطاعم وأغذية", "خدمات صناعية", "سيارات وخدماتها", "عيادات", "لوجستيك"],
      services: [
        { title: "تسيّد الخرائط المحلية", desc: "امتلك النتائج الثلاث الأولى على خرائط قوقل لعمليات البحث التجاري في العزيزية وشرق الرياض." },
        { title: "إعلانات قوقل للتجارة المحلية", desc: "حملات بحث عالية الحجم وفعّالة التكلفة تقتنص حركة البحث التجارية اليومية الكبيرة في شرق الرياض." },
        { title: "سوشيال ميديا متعدد اللغات", desc: "محتوى وإعلانات بالعربية والإنجليزية تصل لقاعدة المستهلكين المتنوعة متعددة الثقافات في العزيزية." },
        { title: "تسويق التجارة الإلكترونية والتوصيل", desc: "تسويق الطلب الإلكتروني والتوصيل لسوق الطعام والتجزئة النشط في العزيزية." },
        { title: "توليد عملاء B2B", desc: "حملات رقمية للأعمال الصناعية واللوجستية التي تخدم القطاع التجاري في شرق الرياض." },
        { title: "ملف النشاط في قوقل", desc: "قوائم GBP محسّنة تقتنص كل فرصة بحث محلية في المنطقة التجارية للعزيزية." },
      ],
      faq: [
        { q: "كيف يؤثر مزيج الجنسيات في العزيزية على استراتيجية التسويق الرقمي؟", a: "يعني أن مزيج قنوات أوسع مهم. المحتوى العربي يهيمن للعملاء السعوديين. محتوى سوشيال بالأردية والهندية يصل للجاليات جنوب آسيوية. الإنجليزية تغطي شريحة الأجانب المهنيين. النهج الأعلى عائداً لمعظم الأعمال هو العربية أولاً مع تكملة إنجليزية." },
        { q: "هل التسويق الرقمي للأعمال الصناعية ذو صلة في العزيزية؟", a: "بالتأكيد. شركات B2B — مقاولو الصيانة وموردو المعدات وشركات اللوجستيك — تستفيد استفادة كبيرة من إعلانات قوقل وحملات لينكدإن التي تستهدف مديري المشتريات ومديري العمليات الذين يبحثون عن موردين عبر الإنترنت." },
        { q: "ما أفضل المنصات لمطعم في العزيزية؟", a: "خرائط قوقل (للاكتشاف المحلي الفوري) وإنستغرام (لتصوير الطعام والعروض) وتطبيقات التوصيل مثل هنقرستيشن وجاهز. الحضور على منصات التوصيل مدمجاً مع تحسين خرائط قوقل يحقق عادةً أعلى حجم طلبات." },
      ],
      ctaHeading: "تسيّد السوق التجاري في العزيزية",
      ctaSubtitle: "قلب شرق الرياض التجاري جاهز لتسويق رقمي ذكي. لنبنِ ظهورك ونحقق نتائج حقيقية.",
    },
  },
  {
    slug: "ishbiliyah",
    name: "Ishbiliyah",
    nameAr: "إشبيلية",
    zone: "East Riyadh",
    tagline: "Digital Marketing in Ishbiliyah — East Riyadh's Rising Residential District",
    heroDesc:
      "Ishbiliyah is a fast-growing residential neighborhood in East Riyadh with a young population and an expanding local commercial scene. Businesses here are uniquely positioned to build early digital dominance in an underserved market.",
    about: [
      "Ishbiliyah (إشبيلية) — named for the Spanish city of Seville — is a relatively newer residential district in East Riyadh that has grown significantly over the past decade. It is home to a young, family-oriented population with a strong demand for local services: dining, education, healthcare, and home services.",
      "Because the district developed later than central Riyadh neighborhoods, its digital marketing landscape is less mature. Many businesses in Ishbiliyah have basic or no digital presence, leaving Google Maps rankings and local search unclaimed. This represents a rare opportunity: a new business with even moderate digital investment can establish top-of-market visibility quickly.",
      "The growing commercial strip along Ishbiliyah's main roads is seeing new restaurant and café openings, private clinics, and service businesses. Consumers in the district are young (median age 25–35) and mobile-first — they discover, research, and decide via smartphone before visiting in person.",
    ],
    industries: [
      { name: "Cafés & Restaurants", icon: "☕" },
      { name: "Family Clinics", icon: "👨‍👩‍👦" },
      { name: "Supermarkets", icon: "🛒" },
      { name: "Schools & Tutoring", icon: "📚" },
      { name: "Salons & Beauty", icon: "💇" },
      { name: "Home Services", icon: "🔨" },
    ],
    services: [
      { title: "First-Mover Local SEO", desc: "Claim top Google rankings in Ishbiliyah's underdeveloped search landscape before competitors do." },
      { title: "Google Business Profile Setup", desc: "Build the strongest GBP presence in Ishbiliyah and capture the district's growing search volume." },
      { title: "Social Media Launch Campaigns", desc: "High-energy launch campaigns on Instagram and Snapchat that build immediate awareness in Ishbiliyah." },
      { title: "Google Ads for New Businesses", desc: "Affordable local search campaigns that drive qualified customers from Day 1 of your business launch." },
      { title: "Mobile-First Website Design", desc: "Fast, mobile-optimized websites for Ishbiliyah's smartphone-first young population." },
      { title: "Delivery Platform Marketing", desc: "Optimize your presence on HungerStation, Jahez, and other delivery apps serving East Riyadh." },
    ],
    nearby: [
      { name: "Al Naseem", slug: "al-naseem" },
      { name: "Al Aziziyah", slug: "al-aziziyah" },
      { name: "Al Narjis", slug: "al-narjis" },
      { name: "Al Arid", slug: "al-arid" },
    ],
    faq: [
      { q: "Is Ishbiliyah a good location to launch a new business?", a: "The growing population and relatively low commercial saturation make it an attractive launch location. The key is combining physical quality with an immediate digital presence so you capture early organic rankings before competition increases." },
      { q: "How young is Ishbiliyah's population and does it affect my marketing?", a: "The median resident is younger than older central districts — a significant portion are families with children under 18 and young couples. This means mobile-first content, short-form video (TikTok, Reels), and Snapchat advertising are particularly effective." },
      { q: "Can I start digital marketing for a very small business in Ishbiliyah?", a: "Absolutely. Google Business Profile is free. Basic local SEO requires time more than budget. Small Google Ads campaigns starting at SAR 500/month can generate meaningful traffic. Ishbiliyah is one of the most accessible markets in Riyadh for small business digital marketing." },
    ],
    ctaHeading: "Get Ahead in Ishbiliyah",
    ctaSubtitle: "First-mover advantage in East Riyadh's growing district is still available. Let's claim your digital territory in Ishbiliyah today.",
    arContent: {
      heroDesc: "إشبيلية حي سكني سريع النمو في شرق الرياض بسكان شباب ومشهد تجاري محلي متوسّع. الأعمال هنا في وضع فريد لبناء هيمنة رقمية مبكرة في سوق لم يُستغل بعد.",
      about: [
        "إشبيلية (Ishbiliyah) — تيمناً بمدينة إشبيلية الإسبانية — حي سكني جديد نسبياً في شرق الرياض نما بشكل ملحوظ في العقد الماضي. يسكنه سكان شباب ذوو توجه عائلي مع طلب قوي على الخدمات المحلية: المطاعم والتعليم والرعاية الصحية والخدمات المنزلية.",
        "لأن الحي تطور في مرحلة متأخرة مقارنة بأحياء وسط الرياض، فإن مشهده التسويقي الرقمي أقل نضجاً. كثير من الأعمال في إشبيلية لديها حضور رقمي محدود أو معدوم، تاركةً ترتيبات خرائط قوقل والبحث المحلي شاغرة. هذه فرصة نادرة: نشاط جديد باستثمار رقمي معتدل يمكنه تأسيس رؤية في قمة السوق بسرعة.",
        "الشريط التجاري المتنامي على الشوارع الرئيسية لإشبيلية يشهد افتتاح مطاعم وكافيهات جديدة وعيادات خاصة وأعمال خدمية. المستهلكون في الحي شباب (متوسط العمر ٢٥–٣٥) ويعتمدون الجوال أولاً — يكتشفون ويبحثون ويقررون عبر الهاتف الذكي قبل الزيارة الشخصية.",
      ],
      industries: ["كافيهات ومطاعم", "عيادات عائلية", "سوبرماركت", "مدارس وتدريس", "صالونات وتجميل", "خدمات منزلية"],
      services: [
        { title: "SEO ميزة السبق", desc: "استحوذ على ترتيبات قوقل الأولى في المشهد الرقمي غير المطور لإشبيلية قبل أن يفعل المنافسون." },
        { title: "إعداد ملف النشاط في قوقل", desc: "ابنِ أقوى حضور GBP في إشبيلية واقتنص حجم البحث المتزايد في الحي." },
        { title: "حملات إطلاق على السوشيال ميديا", desc: "حملات إطلاق عالية الطاقة على إنستغرام وسناب شات تبني وعياً فورياً في إشبيلية." },
        { title: "إعلانات قوقل للأعمال الجديدة", desc: "حملات بحث محلية بأسعار معقولة تجلب عملاء مؤهلين من اليوم الأول لإطلاق نشاطك." },
        { title: "تصميم مواقع محسّن للجوال", desc: "مواقع سريعة محسّنة للجوال لسكان إشبيلية الذين يعتمدون الهاتف أولاً." },
        { title: "تسويق منصات التوصيل", desc: "حسّن حضورك على هنقرستيشن وجاهز وتطبيقات التوصيل الأخرى التي تخدم شرق الرياض." },
      ],
      faq: [
        { q: "هل إشبيلية موقع جيد لإطلاق نشاط تجاري جديد؟", a: "السكان المتزايدون والتشبع التجاري المحدود نسبياً يجعلانها موقع إطلاق جذاب. المفتاح هو الجمع بين الجودة الحقيقية وحضور رقمي فوري لاقتناص الترتيبات العضوية المبكرة قبل ارتفاع التنافسية." },
        { q: "ما مدى شباب سكان إشبيلية وكيف يؤثر ذلك على تسويقي؟", a: "متوسط السكان أصغر من الأحياء المركزية الأعرق — شريحة كبيرة هم أسر بأطفال دون ١٨ وأزواج شباب. هذا يعني المحتوى المحسّن للجوال والفيديو القصير (تيك توك وريلز) وإعلانات سناب شات هي الأكثر فاعلية." },
        { q: "هل يمكنني بدء التسويق الرقمي لمشروع صغير جداً في إشبيلية؟", a: "بالتأكيد. ملف النشاط في قوقل مجاني. SEO المحلي الأساسي يحتاج وقتاً أكثر من ميزانية. حملات قوقل صغيرة تبدأ من ٥٠٠ ريال شهرياً يمكنها توليد حركة ملموسة. إشبيلية من أكثر أسواق الرياض سهولةً للتسويق الرقمي للمشاريع الصغيرة." },
      ],
      ctaHeading: "تقدم في إشبيلية",
      ctaSubtitle: "ميزة السبق في حي شرق الرياض المتنامي لا تزال متاحة. لنستحوذ على أرضك الرقمية في إشبيلية اليوم.",
    },
  },
  {
    slug: "al-narjis",
    name: "Al Narjis",
    nameAr: "النرجس",
    zone: "North Riyadh",
    tagline: "Digital Marketing in Al Narjis — North Riyadh's Newest Growth Frontier",
    heroDesc:
      "Al Narjis is one of North Riyadh's fastest-developing districts — a new urban community with a growing population of young professionals and families. The digital opportunity here is fresh and wide open.",
    about: [
      "Al Narjis (النرجس — 'the narcissus flower') is one of the newer residential districts in North Riyadh, developed as part of the city's continued northward expansion. It sits between more established northern neighborhoods and features a mix of modern villas, apartment complexes, and emerging commercial activity.",
      "The population is predominantly young — recent graduates, newly married couples, and growing young families who chose North Riyadh for its newer infrastructure and proximity to the city's premium commercial zones. They are digitally native: they discover businesses on Instagram, research on Google, and order on delivery apps without thinking twice.",
      "Commercial development in Al Narjis is still maturing, meaning many service categories have zero or very few established digital presences. A business that invests in local SEO and Google Business Profile today can achieve rankings that would require months of effort in older, more contested districts.",
    ],
    industries: [
      { name: "New Cafés & Dining", icon: "🧋" },
      { name: "Children's Services", icon: "🧒" },
      { name: "Delivery & Convenience", icon: "🛵" },
      { name: "Health & Wellness", icon: "🧘" },
      { name: "Home Improvement", icon: "🏗️" },
      { name: "Pet Services", icon: "🐾" },
    ],
    services: [
      { title: "Early Mover SEO Strategy", desc: "Establish dominant Google rankings in Al Narjis before the market becomes competitive." },
      { title: "Google Business Profile Setup", desc: "Complete GBP setup and optimization to capture Al Narjis's rapidly growing local search volume." },
      { title: "Instagram & TikTok Growth", desc: "Organic and paid social growth targeting Al Narjis's digitally-native young resident population." },
      { title: "Snapchat Launch Campaigns", desc: "Reach Al Narjis's young residents on Snapchat with geo-targeted awareness and promotional campaigns." },
      { title: "Mobile-First Web Design", desc: "Fast, beautifully designed websites built for the mobile-first habits of Al Narjis residents." },
      { title: "Community Building", desc: "WhatsApp and social community strategies that embed your brand in Al Narjis's forming social networks." },
    ],
    nearby: [
      { name: "Al Malqa", slug: "al-malqa" },
      { name: "Al Yasmin", slug: "al-yasmin" },
      { name: "Hittin", slug: "hittin" },
      { name: "Al Arid", slug: "al-arid" },
    ],
    faq: [
      { q: "How underdeveloped is the digital marketing scene in Al Narjis?", a: "Quite underdeveloped compared to central Riyadh. Many service categories — from dental clinics to cafés to home services — have few or no businesses with optimized digital presence. This means establishing even a basic GBP listing and local SEO can put you at the top of the local pack quickly." },
      { q: "Is Al Narjis a good location for a food and beverage business?", a: "Strongly yes. The district has a young, food-curious population with high discretionary spending and a shortage of good local options. New concepts with strong Instagram presence and Google Maps visibility can build a loyal following quickly." },
      { q: "What is the best way to build a brand presence in a new district like Al Narjis?", a: "Start with Google Business Profile and local SEO for discoverability, run launch promotions on Instagram and Snapchat to build initial awareness, then invest in community engagement through local WhatsApp groups and neighborhood social accounts. Physical-digital integration is key in new developments." },
    ],
    ctaHeading: "Plant Your Flag in Al Narjis",
    ctaSubtitle: "North Riyadh's newest district is forming its commercial identity. Be one of the brands that shapes it.",
    arContent: {
      heroDesc: "النرجس من أسرع أحياء شمال الرياض نمواً — مجتمع حضري جديد بسكان متزايدين من الشباب والأسر. الفرصة الرقمية هنا طازجة ومفتوحة على مصراعيها.",
      about: [
        "النرجس (Al Narjis — 'زهرة النرجس') أحد الأحياء السكنية الأحدث في شمال الرياض، طُوّر كجزء من التوسع الشمالي المستمر للمدينة. يقع بين أحياء شمالية أكثر رسوخاً ويتميز بمزيج من الفيلات الحديثة والمجمعات السكنية والنشاط التجاري الناشئ.",
        "السكان في معظمهم شباب — خريجون جدد وأزواج مؤخراً والأسر الشبابية الناشئة التي اختارت شمال الرياض لبنيته التحتية الأحدث وقربه من المناطق التجارية الراقية في المدينة. هم متحضرون رقمياً بالفطرة: يكتشفون الأعمال على إنستغرام، ويبحثون على قوقل، ويطلبون على تطبيقات التوصيل دون تردد.",
        "التطور التجاري في النرجس لا يزال في مراحله الأولى، مما يعني أن كثيراً من الفئات الخدمية لديها حضور رقمي صفري أو ضعيف جداً. نشاط يستثمر في SEO المحلي وملف قوقل اليوم يمكنه تحقيق ترتيبات تتطلب أشهراً من الجهد في الأحياء الأعرق والأكثر تنافسية.",
      ],
      industries: ["كافيهات ومطاعم جديدة", "خدمات أطفال", "توصيل وخدمات سريعة", "صحة وعافية", "تحسين المنزل", "خدمات الحيوانات الأليفة"],
      services: [
        { title: "استراتيجية SEO ميزة السبق", desc: "أسّس ترتيبات قوقل مهيمنة في النرجس قبل أن يتحول السوق تنافسياً." },
        { title: "إعداد ملف النشاط في قوقل", desc: "إعداد وتحسين GBP كامل لاقتناص حجم البحث المحلي المتنامي بسرعة في النرجس." },
        { title: "نمو إنستغرام وتيك توك", desc: "نمو سوشيال عضوي ومدفوع يستهدف السكان الشباب متحضري الرقمية في النرجس." },
        { title: "حملات إطلاق على سناب شات", desc: "تواصل مع شباب النرجس على سناب شات بحملات توعية وعروض مستهدفة جغرافياً." },
        { title: "تصميم مواقع محسّن للجوال", desc: "مواقع سريعة وجميلة التصميم مبنية لعادات سكان النرجس الذين يعتمدون الجوال أولاً." },
        { title: "بناء المجتمع", desc: "استراتيجيات مجتمع واتساب وسوشيال تُرسّخ علامتك في الشبكات الاجتماعية المتشكلة في النرجس." },
      ],
      faq: [
        { q: "ما مدى ضعف المشهد التسويقي الرقمي في النرجس؟", a: "ضعيف جداً مقارنة بوسط الرياض. كثير من الفئات الخدمية — من عيادات الأسنان للكافيهات لخدمات المنازل — ليس فيها أعمال بحضور رقمي محسّن. هذا يعني تأسيس حتى قائمة GBP أساسية وSEO محلي يمكنه وضعك في صدارة نتائج المنطقة بسرعة." },
        { q: "هل النرجس موقع جيد لنشاط طعام ومشروبات؟", a: "نعم بقوة. الحي بسكانه الشباب المتشوقين للطعام وإنفاقهم التقديري المرتفع وشُح الخيارات المحلية الجيدة. مفاهيم جديدة بحضور إنستغرام قوي ورؤية على خرائط قوقل يمكنها بناء متابعة وفية بسرعة." },
        { q: "ما أفضل طريقة لبناء حضور علامة تجارية في حي جديد مثل النرجس؟", a: "ابدأ بملف النشاط في قوقل وSEO المحلي للظهور، ثم حملات إطلاق على إنستغرام وسناب شات لبناء وعي أولي، ثم استثمر في التفاعل المجتمعي عبر مجموعات واتساب المحلية. التكامل الرقمي-المادي مفتاح في التطورات الجديدة." },
      ],
      ctaHeading: "ارزع علمك في النرجس",
      ctaSubtitle: "أحدث أحياء شمال الرياض يبني هويته التجارية. كن أحد العلامات التي تصنعها.",
    },
  },
  {
    slug: "tuwaiq",
    name: "Tuwaiq",
    nameAr: "طويق",
    zone: "West Riyadh",
    tagline: "Digital Marketing in Tuwaiq — West Riyadh's Emerging Commercial District",
    heroDesc:
      "Tuwaiq is a large, evolving district in West Riyadh with a mix of government housing, private residential areas, and a growing commercial strip. Its underserved digital market offers significant opportunity for well-positioned businesses.",
    about: [
      "Tuwaiq (طويق) is named for the famous Tuwaiq Mountain escarpment that defines much of Riyadh's western skyline. The district is large, encompassing a mix of government employee housing complexes, private residential zones, and a growing commercial infrastructure serving the area's substantial population.",
      "Because Tuwaiq developed partly as a government housing district, it has a somewhat different demographic from the premium north — residents include a mix of Saudi government employees, military families, and private sector workers. This creates a large middle-income consumer market with practical, value-conscious spending priorities.",
      "Digital marketing in Tuwaiq rewards businesses that emphasize value, trust, and accessibility. Google Maps and local SEO are particularly effective given the district's large residential footprint, while WhatsApp marketing — leveraging Tuwaiq's strong community group networks — is a distinctly high-ROI channel in this area.",
    ],
    industries: [
      { name: "Government Services", icon: "🏛️" },
      { name: "Value Dining", icon: "🍛" },
      { name: "Auto Services", icon: "🔧" },
      { name: "Home Services", icon: "🏠" },
      { name: "Clinics", icon: "⚕️" },
      { name: "Retail", icon: "🛍️" },
    ],
    services: [
      { title: "Value-Led Local SEO", desc: "Build strong Google rankings for practical, high-demand services serving Tuwaiq's large population." },
      { title: "Google Business Profile", desc: "Strong GBP listings capturing the high volume of local searches from Tuwaiq's residential population." },
      { title: "WhatsApp Community Marketing", desc: "Community broadcast campaigns that leverage Tuwaiq's active neighborhood WhatsApp groups." },
      { title: "Affordable Google Ads", desc: "Cost-efficient search campaigns reaching Tuwaiq's practical, intent-driven consumer base." },
      { title: "SME Website Design", desc: "Professional, affordable websites for small businesses serving the Tuwaiq community." },
      { title: "Meta Ads for Local Businesses", desc: "Facebook and Instagram targeting for services and dining in Tuwaiq and West Riyadh." },
    ],
    nearby: [
      { name: "Al Shifa", slug: "al-shifa" },
      { name: "Al Sahafah", slug: "al-sahafah" },
      { name: "Diriyah", slug: "diriyah" },
      { name: "Al Aziziyah", slug: "al-aziziyah" },
    ],
    faq: [
      { q: "Is Tuwaiq's government housing demographic good for digital marketing?", a: "Yes — government employees are stable-income consumers with reliable purchase patterns. They use Google extensively for service discovery, and businesses with strong local SEO and GBP presence consistently capture their demand for clinics, home services, dining, and auto services." },
      { q: "What marketing tone works best in Tuwaiq?", a: "Straightforward, value-focused, trustworthy. Tuwaiq's community responds to honest messaging that emphasizes quality, reliability, and fair pricing over flashy branding. Arabic-language content in a clear, direct tone consistently outperforms polished marketing speak." },
      { q: "Are delivery apps important for businesses in Tuwaiq?", a: "Yes. Tuwaiq residents actively use HungerStation, Jahez, and similar platforms. For restaurants and retail, having a well-managed delivery app presence alongside Google Maps visibility is a significant revenue driver." },
    ],
    ctaHeading: "Serve Tuwaiq's Growing Community",
    ctaSubtitle: "West Riyadh's large, loyal consumer base is searching for quality businesses. Let's make sure yours is the one they find.",
    arContent: {
      heroDesc: "طويق حي كبير متطور في غرب الرياض بمزيج من الإسكان الحكومي والمناطق السكنية الخاصة وشريط تجاري متنامٍ. سوقه الرقمي غير المستغل يُقدّم فرصة ضخمة للأعمال ذات التموضع الجيد.",
      about: [
        "طويق (Tuwaiq) مسمّى بجبل طويق الشهير الذي يُعرّف كثيراً من الأفق الغربي للرياض. الحي كبير يضم مزيجاً من مجمعات الإسكان الحكومي والمناطق السكنية الخاصة والبنية التحتية التجارية المتنامية التي تخدم سكانه الكثيرين.",
        "لأن طويق تطور جزئياً كحي إسكان حكومي، فله ديموغرافية مختلفة عن الشمال الراقي — يشمل السكان موظفين حكوميين سعوديين وأسراً عسكرية وعاملين في القطاع الخاص. هذا يُنشئ سوق مستهلكين متوسط الدخل ضخماً بأولويات إنفاق عملية تركز على القيمة.",
        "يكافئ التسويق الرقمي في طويق الأعمال التي تُركّز على القيمة والثقة وسهولة الوصول. خرائط قوقل وSEO المحلي فعّالان بشكل خاص نظراً للبصمة السكنية الكبيرة للحي، بينما تسويق واتساب — المستفيد من شبكات مجموعات المجتمع القوية في طويق — قناة عالية العائد بشكل مميز في هذه المنطقة.",
      ],
      industries: ["خدمات حكومية", "مطاعم اقتصادية", "خدمات سيارات", "خدمات منزلية", "عيادات", "تجزئة"],
      services: [
        { title: "SEO محلي قائم على القيمة", desc: "ابنِ ترتيبات قوقل قوية للخدمات العملية عالية الطلب التي تخدم سكان طويق الكثيرين." },
        { title: "ملف النشاط في قوقل", desc: "قوائم GBP قوية تقتنص الحجم الكبير من عمليات البحث المحلية من السكان في طويق." },
        { title: "تسويق مجتمعي عبر واتساب", desc: "حملات بث مجتمعية تستثمر مجموعات واتساب الحيّة النشطة في الحي." },
        { title: "إعلانات قوقل بأسعار معقولة", desc: "حملات بحث فعّالة التكلفة تصل لقاعدة المستهلكين ذوي النية الواضحة في طويق." },
        { title: "تصميم مواقع للمشاريع الصغيرة", desc: "مواقع احترافية بأسعار مناسبة للأعمال الصغيرة التي تخدم مجتمع طويق." },
        { title: "إعلانات ميتا للأعمال المحلية", desc: "استهداف فيسبوك وإنستغرام للخدمات والمطاعم في طويق وغرب الرياض." },
      ],
      faq: [
        { q: "هل ديموغرافية الإسكان الحكومي في طويق جيدة للتسويق الرقمي؟", a: "نعم — الموظفون الحكوميون مستهلكون بدخل مستقر وأنماط شراء منتظمة. يستخدمون قوقل بشكل واسع لاكتشاف الخدمات، والأعمال ذات SEO محلي قوي وحضور GBP تقتنص طلبهم باستمرار على العيادات والخدمات المنزلية والمطاعم وخدمات السيارات." },
        { q: "ما نبرة التسويق الأنسب في طويق؟", a: "واضحة ومركّزة على القيمة وموثوقة. مجتمع طويق يستجيب للرسائل الصريحة التي تُركّز على الجودة والموثوقية والسعر العادل فوق الصور المبهرة. المحتوى العربي بنبرة واضحة ومباشرة يتفوق باستمرار على لغة التسويق المصقولة." },
        { q: "هل تطبيقات التوصيل مهمة للأعمال في طويق؟", a: "نعم. سكان طويق يستخدمون هنقرستيشن وجاهز والمنصات المماثلة بنشاط. للمطاعم والتجزئة، الحضور المُدار جيداً على تطبيقات التوصيل بجانب رؤية خرائط قوقل يُعدّ محرك إيرادات مهماً." },
      ],
      ctaHeading: "اخدم مجتمع طويق المتنامي",
      ctaSubtitle: "قاعدة المستهلكين الكبيرة الوفية في غرب الرياض تبحث عن أعمال جيدة. لنتأكد من أن نشاطك هو الذي يجدونه.",
    },
  },
  {
    slug: "diriyah",
    name: "Diriyah",
    nameAr: "الدرعية",
    zone: "West Riyadh",
    tagline: "Digital Marketing in Diriyah — Where Saudi Heritage Meets Vision 2030",
    heroDesc:
      "Diriyah is one of the most strategically important locations in all of Saudi Arabia — birthplace of the Kingdom, now being transformed into a global heritage tourism destination. The digital marketing opportunity here is unprecedented.",
    about: [
      "Diriyah (الدرعية) is the ancestral home of the Saudi royal family and the birthplace of the First Saudi State. It sits just northwest of central Riyadh along Wadi Hanifah and is undergoing one of the world's most ambitious heritage restoration projects, transforming its UNESCO-listed At-Turaif District into a world-class cultural tourism destination expected to attract millions of visitors.",
      "The Diriyah Gate Development Authority (DGDA) is investing hundreds of billions of riyals to create a mixed-use cultural district — restaurants, luxury hotels, retail, galleries, and experiences set against the iconic mud-brick architecture of At-Turaif. The first phases are already open and drawing Saudi and international visitors in significant numbers.",
      "For businesses in and around Diriyah, this transformation creates a marketing opportunity unlike anywhere else in Riyadh. Tourism-adjacent businesses, heritage experience providers, upscale dining, and cultural retail can position themselves to capture international visitor traffic that simply didn't exist five years ago — and is growing exponentially.",
    ],
    industries: [
      { name: "Tourism & Hospitality", icon: "🏰" },
      { name: "Heritage Retail", icon: "🧺" },
      { name: "Luxury Dining", icon: "🍽️" },
      { name: "Cultural Experiences", icon: "🎭" },
      { name: "Hotels & Resorts", icon: "🏨" },
      { name: "Events & Venues", icon: "🎪" },
    ],
    services: [
      { title: "Tourism SEO", desc: "Rank for international and domestic visitor searches — things to do in Diriyah, Diriyah experiences, Saudi heritage tourism." },
      { title: "International Google Ads", desc: "Multilingual (Arabic, English, French) Google Ads campaigns targeting Diriyah's growing international visitor base." },
      { title: "Instagram & YouTube Tourism Content", desc: "Compelling visual storytelling content that showcases Diriyah experiences to a global audience." },
      { title: "Google Business Profile for Tourism", desc: "Optimized GBP listings capturing tourist searches for experiences, dining, and retail in Diriyah." },
      { title: "TripAdvisor & Tourism Platform Marketing", desc: "Presence and review management on global tourism platforms that international visitors use to plan trips." },
      { title: "Luxury Website Design", desc: "World-class multilingual websites that match the premium positioning of Diriyah's heritage brand." },
    ],
    nearby: [
      { name: "Tuwaiq", slug: "tuwaiq" },
      { name: "Al Sahafah", slug: "al-sahafah" },
      { name: "Al Murabba", slug: "al-murabba" },
      { name: "Al Shifa", slug: "al-shifa" },
    ],
    faq: [
      { q: "How does Diriyah's tourism development affect digital marketing strategy?", a: "Profoundly. Diriyah's visitor profile extends globally — Saudi visitors, GCC tourists, and now international cultural tourists from Europe, Asia, and beyond. This means multilingual SEO, Google Ads targeting foreign-language searchers, and presence on international tourism platforms like Google Travel, TripAdvisor, and Booking.com matter enormously." },
      { q: "Is now a good time to invest in digital marketing for a Diriyah-based business?", a: "Absolutely — this is the optimal time. The Diriyah destination is still building organic tourism SEO authority. Businesses that invest in SEO and content marketing now will have a significant head start as visitor numbers compound over the next 5–10 years." },
      { q: "What languages should Diriyah businesses optimize for?", a: "Arabic is primary for Saudi visitors. English is essential for all international tourism. French, Mandarin, and German are worth considering as Diriyah's Vision 2030 tourism strategy targets specific international source markets. We advise a phased approach: Arabic + English first, then expanding to priority languages." },
    ],
    ctaHeading: "Capture Diriyah's Global Tourism Opportunity",
    ctaSubtitle: "One of the world's most exciting new tourism destinations is taking shape. Let's position your business to capture its global audience.",
    arContent: {
      heroDesc: "الدرعية من أكثر المواقع أهمية استراتيجياً في المملكة كلها — مهد الدولة السعودية، تتحول الآن إلى وجهة سياحية تراثية عالمية. الفرصة التسويقية الرقمية هنا لا مثيل لها.",
      about: [
        "الدرعية (Diriyah) هي الوطن الأصيل للأسرة المالكة السعودية ومهد الدولة السعودية الأولى. تقع شمال غرب وسط الرياض على وادي حنيفة وتخضع لأحد أطموح مشاريع الترميم التراثي في العالم، يحوّل حي الطريف المدرج على قائمة اليونسكو إلى وجهة سياحية ثقافية عالمية يُتوقع أن تستقطب ملايين الزوار.",
        "تستثمر هيئة تطوير بوابة الدرعية مئات المليارات من الريالات لإنشاء حي ثقافي متكامل الاستخدامات — مطاعم وفنادق فاخرة وتجزئة وصالات عرض وتجارب ضمن عمارة الطين الأيقونية لحي الطريف. المراحل الأولى مفتوحة بالفعل وتستقطب أعداداً كبيرة من الزوار السعوديين والدوليين.",
        "للأعمال في الدرعية وحولها، يُنشئ هذا التحول فرصة تسويقية لا مثيل لها في أي مكان آخر بالرياض. الأعمال المجاورة للسياحة ومقدمو التجارب التراثية والمطاعم الراقية والتجزئة الثقافية يمكنهم التموضع لاقتناص حركة الزوار الدوليين التي لم تكن موجودة قبل خمس سنوات — وتنمو بشكل متسارع.",
      ],
      industries: ["سياحة وضيافة", "تجزئة تراثية", "مطاعم فاخرة", "تجارب ثقافية", "فنادق ومنتجعات", "فعاليات وقاعات"],
      services: [
        { title: "SEO السياحة", desc: "تصدّر عمليات البحث للزوار الدوليين والمحليين — أشياء تفعلها في الدرعية وتجارب الدرعية والسياحة التراثية السعودية." },
        { title: "إعلانات قوقل الدولية", desc: "حملات قوقل متعددة اللغات (العربية والإنجليزية والفرنسية) تستهدف قاعدة الزوار الدوليين المتنامية في الدرعية." },
        { title: "محتوى سياحي على إنستغرام ويوتيوب", desc: "محتوى بصري سرد مقنع يعرض تجارب الدرعية لجمهور عالمي." },
        { title: "ملف النشاط في قوقل للسياحة", desc: "قوائم GBP محسّنة تقتنص عمليات البحث السياحية عن التجارب والمطاعم والتجزئة في الدرعية." },
        { title: "تسويق على منصات السفر", desc: "الحضور وإدارة المراجعات على المنصات السياحية العالمية التي يستخدمها الزوار الدوليون لتخطيط رحلاتهم." },
        { title: "تصميم مواقع فاخرة", desc: "مواقع متعددة اللغات عالمية المستوى تتوافق مع تموضع العلامة التراثية الراقية للدرعية." },
      ],
      faq: [
        { q: "كيف يؤثر تطوير السياحة في الدرعية على استراتيجية التسويق الرقمي؟", a: "تأثيراً عميقاً. ملف الزوار في الدرعية يمتد عالمياً — زوار سعوديون وسياح خليجيون والآن سياح ثقافيون دوليون من أوروبا وآسيا وما وراءها. هذا يعني SEO متعدد اللغات وإعلانات قوقل تستهدف الباحثين بلغات أجنبية والحضور على منصات السفر الدولية مهم للغاية." },
        { q: "هل الوقت الحالي مناسب للاستثمار في التسويق الرقمي لنشاط في الدرعية؟", a: "تماماً — هذا هو الوقت الأمثل. وجهة الدرعية لا تزال تبني سلطة SEO السياحية العضوية. الأعمال التي تستثمر في SEO والمحتوى التسويقي الآن ستمتلك تقدماً كبيراً مع تضاعف أعداد الزوار خلال ٥–١٠ سنوات القادمة." },
        { q: "ما اللغات التي ينبغي للأعمال في الدرعية التحسين لها؟", a: "العربية أساسية للزوار السعوديين. الإنجليزية ضرورية لجميع السياحة الدولية. الفرنسية والصينية والألمانية تستحق الاعتبار مع استهداف رؤية 2030 لأسواق دولية محددة. نوصي بنهج متدرج: العربية والإنجليزية أولاً ثم التوسع للغات ذات الأولوية." },
      ],
      ctaHeading: "اقتنص الفرصة السياحية العالمية في الدرعية",
      ctaSubtitle: "إحدى أكثر وجهات السياحة الجديدة إثارة في العالم تتشكّل. لنُموضع نشاطك لاقتناص جمهورها العالمي.",
    },
  },
  {
    slug: "al-arid",
    name: "Al Arid",
    nameAr: "العارض",
    zone: "North Riyadh",
    tagline: "Digital Marketing in Al Arid — North Riyadh's Suburban Growth Zone",
    heroDesc:
      "Al Arid is one of North Riyadh's rapidly developing suburban neighborhoods — growing fast, relatively underserved digitally, and home to a young, aspirational population. The opportunity for early digital movers here is exceptional.",
    about: [
      "Al Arid (العارض) occupies the northern reaches of Riyadh's expanding urban footprint, developed as the city's growth extended far north along King Khalid Road. It is characterized by newer residential compounds, villas, and an evolving commercial strip that is still establishing its identity.",
      "The population is younger and less affluent on average than premier North Riyadh neighborhoods like Hittin or Al Malqa, but aspirational in outlook. Young Saudi families who moved north for affordable housing and good infrastructure — but who work in the city's commercial centers — make up a significant portion of Al Arid's residents.",
      "Digital marketing in Al Arid operates in a virtuous environment for early investors: low competition, high growth in search volume as the population expands, and consumers who rely heavily on digital channels because physical word-of-mouth networks in newer neighborhoods are still forming. A business that builds Google Maps dominance here today is creating a durable asset.",
    ],
    industries: [
      { name: "Family Services", icon: "👪" },
      { name: "Convenience Retail", icon: "🏪" },
      { name: "Cafés", icon: "☕" },
      { name: "Kids Education", icon: "🎒" },
      { name: "Home Maintenance", icon: "🔨" },
      { name: "Clinics", icon: "💊" },
    ],
    services: [
      { title: "First-Mover Local SEO", desc: "Build ranking authority in Al Arid's underdeveloped search landscape while the cost to compete is low." },
      { title: "Google Business Profile", desc: "Complete GBP setup and optimization to capture Al Arid's rapidly growing mobile search traffic." },
      { title: "Social Media Growth", desc: "Organic and paid social campaigns connecting with Al Arid's young, online-first community." },
      { title: "Snapchat & Instagram Ads", desc: "Geo-targeted social ads reaching Al Arid's young residents and surrounding North Riyadh communities." },
      { title: "Affordable Starter Websites", desc: "Professional websites at competitive prices for Al Arid's growing small business community." },
      { title: "Google Ads for New Businesses", desc: "Lower CPCs in Al Arid make Google Ads especially cost-effective — more conversions per riyal spent." },
    ],
    nearby: [
      { name: "Al Narjis", slug: "al-narjis" },
      { name: "Al Malqa", slug: "al-malqa" },
      { name: "Hittin", slug: "hittin" },
      { name: "Ishbiliyah", slug: "ishbiliyah" },
    ],
    faq: [
      { q: "Is Al Arid too far north to attract Riyadh's mainstream consumer market?", a: "Not at all. Al Arid's population is large and growing. Its residents have good purchasing power and high digital usage. While the absolute visitor numbers from other parts of Riyadh may be lower than central districts, the local captive market is very valuable — and growing every year." },
      { q: "What types of businesses perform well in Al Arid?", a: "Daily-use services — cafés, clinics, pharmacies, children's education, home maintenance, and convenience retail — consistently perform well because residents value proximity and convenience above all. Businesses that solve everyday needs with quality and reliability build extraordinary local loyalty." },
      { q: "Should I advertise beyond Al Arid in my campaigns?", a: "Depends on your service. Very local services (clinics, cafés, home services) should geo-target tightly. Services with a regional draw (specialist clinics, unique dining concepts) can expand targeting to all of North Riyadh to maximize reach." },
    ],
    ctaHeading: "Build Your Future in Al Arid",
    ctaSubtitle: "North Riyadh's growth story is still being written. Be one of the businesses that defines Al Arid's commercial future.",
    arContent: {
      heroDesc: "العارض من أسرع الأحياء الضاحوية نمواً في شمال الرياض — ينمو بسرعة، وخدمته الرقمية محدودة نسبياً، وفيه سكان شباب طموحون. الفرصة للمبادرين الرقميين هنا استثنائية.",
      about: [
        "العارض (Al Arid) يحتل أقصى الشمال في الامتداد العمراني المتوسّع للرياض، تطور مع امتداد نمو المدينة بعيداً شمالاً على طريق الملك خالد. يتميز بمجمعات سكنية أحدث وفيلات وشريط تجاري متطور لا يزال يُرسّخ هويته.",
        "السكان أصغر سناً وأقل ثراءً في المتوسط مقارنة بأحياء شمال الرياض الراقية كحطين أو الملقا، لكنهم طموحون في توجهاتهم. الأسر السعودية الشابة التي انتقلت شمالاً بحثاً عن إسكان ميسور وبنية تحتية جيدة — لكنها تعمل في المراكز التجارية للمدينة — تُشكّل شريحة كبيرة من سكان العارض.",
        "يعمل التسويق الرقمي في العارض في بيئة مثمرة للمستثمرين المبادرين: منافسة منخفضة وحجم بحث في نمو عالٍ مع توسّع السكان ومستهلكون يعتمدون بشكل كبير على القنوات الرقمية لأن شبكات التوصيات الشخصية في الأحياء الأحدث لا تزال في طور التشكّل. نشاط يبني هيمنة على خرائط قوقل هنا اليوم يُنشئ أصلاً رقمياً دائماً.",
      ],
      industries: ["خدمات عائلية", "تجزئة سريعة", "كافيهات", "تعليم أطفال", "صيانة منزلية", "عيادات"],
      services: [
        { title: "SEO ميزة السبق المحلي", desc: "ابنِ سلطة الترتيب في المشهد البحثي غير المطور للعارض بينما تكلفة المنافسة لا تزال منخفضة." },
        { title: "ملف النشاط في قوقل", desc: "إعداد وتحسين GBP كامل لاقتناص حركة البحث على الجوال المتنامية بسرعة في العارض." },
        { title: "نمو السوشيال ميديا", desc: "حملات سوشيال عضوية ومدفوعة تتواصل مع مجتمع العارض الشباب الرقمي." },
        { title: "إعلانات سناب وإنستغرام", desc: "إعلانات سوشيال جغرافية تصل لشباب العارض والمجتمعات المجاورة في شمال الرياض." },
        { title: "مواقع مبتدئة بأسعار مناسبة", desc: "مواقع احترافية بأسعار تنافسية لمجتمع الأعمال الصغيرة المتنامي في العارض." },
        { title: "إعلانات قوقل للأعمال الجديدة", desc: "تكاليف النقر الأقل في العارض تجعل إعلانات قوقل فعّالة التكلفة بشكل خاص — تحويلات أكثر بكل ريال." },
      ],
      faq: [
        { q: "هل العارض بعيدة شمالاً لدرجة تمنعها من استقطاب السوق الاستهلاكي الرئيسي في الرياض؟", a: "لا على الإطلاق. سكان العارض كثيرون ومتنامون. قدرتهم الشرائية جيدة واستخدامهم الرقمي مرتفع. رغم أن أعداد الزوار من مناطق أخرى قد تكون أقل من الأحياء المركزية، إلا أن السوق المحلي المقيم بمفرده قيّم جداً — ويتنامى كل عام." },
        { q: "ما أنواع الأعمال التي تحقق أداءً جيداً في العارض؟", a: "الخدمات اليومية — الكافيهات والعيادات والصيدليات وتعليم الأطفال والصيانة المنزلية والتجزئة السريعة — تحقق باستمرار أداءً جيداً لأن السكان يُقدّرون القرب والراحة فوق كل شيء. الأعمال التي تحل الاحتياجات اليومية بجودة وموثوقية تبني ولاءً محلياً استثنائياً." },
        { q: "هل ينبغي لي الإعلان خارج نطاق العارض في حملاتي؟", a: "يعتمد على خدمتك. الخدمات المحلية جداً (العيادات والكافيهات وخدمات المنازل) ينبغي أن تستهدف جغرافياً بضيق. الخدمات ذات الجذب الإقليمي (العيادات المتخصصة والمفاهيم المميزة) يمكنها توسيع الاستهداف لشمال الرياض بأكمله لتعظيم الوصول." },
      ],
      ctaHeading: "ابنِ مستقبلك في العارض",
      ctaSubtitle: "قصة نمو شمال الرياض لا تزال تُكتب. كن أحد الأعمال التي تُعرّف مستقبل العارض التجاري.",
    },
  },
];

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "ar"];
  return DISTRICTS.flatMap((d) =>
    locales.map((locale) => ({ locale, slug: d.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const d = DISTRICTS.find((x) => x.slug === slug);
  if (!d) return {};
  const isAr = locale === "ar";
  const base = "https://localcitysolutions.com";
  const title = isAr
    ? `تسويق رقمي في حي ${d.nameAr}، الرياض | لوكال سيتي سولوشنز`
    : `${d.name} Digital Marketing Agency | Local City Solutions Riyadh`;
  const description = isAr
    ? `خدمات تسويق رقمي متخصصة لأعمال حي ${d.nameAr} بالرياض. SEO، إعلانات قوقل، تصميم مواقع، وملف نشاط تجاري. تواصل معنا الحين.`
    : `Local City Solutions provides SEO, Google Ads, and digital marketing in ${d.name} (${d.nameAr}), ${d.zone}. Hyperlocal campaigns built for the Riyadh market.`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${base}/${locale}/riyadh/${slug}`,
      languages: {
        en: `${base}/en/riyadh/${slug}`,
        ar: `${base}/ar/riyadh/${slug}`,
        "x-default": `${base}/en/riyadh/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${base}/${locale}/riyadh/${slug}`,
      locale: isAr ? "ar_SA" : "en_US",
      images: [{ url: `${base}/og-image.jpg`, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function DistrictPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const d = DISTRICTS.find((x) => x.slug === slug);
  if (!d) notFound();

  const isAr = locale === "ar";
  const p = `/${locale}`;
  const ar = isAr ? d.arContent : undefined;

  const ui = {
    zone: isAr ? `${ZONE_AR[d.zone] ?? d.zone} · الرياض` : `${d.zone} · Riyadh`,
    aboutLabel: isAr ? `عن حي ${d.nameAr}` : `About ${d.name}`,
    aboutH2: isAr ? `حي ${d.nameAr} (${d.name})` : `Understanding ${d.name} (${d.nameAr})`,
    industriesLabel: isAr ? "القطاعات الرئيسية" : "Key Industries",
    industriesH2: isAr ? `القطاعات التي نخدمها في ${d.nameAr}` : `Industries We Serve in ${d.name}`,
    servicesLabel: isAr ? "خدماتنا" : "Our Services",
    servicesH2: isAr ? `خدمات التسويق الرقمي في ${d.nameAr}` : `Digital Marketing Services in ${d.name}`,
    servicesSub: isAr
      ? `كل خدمة مصممة بناءً على ديناميكيات المنافسة والجمهور المحدد في حي ${d.nameAr}.`
      : `Every service is adapted to the specific competitive landscape and audience dynamics of ${d.name}.`,
    nearbyLabel: isAr ? "الأحياء المجاورة" : "Nearby Districts",
    nearbyH2: isAr ? `نخدم أيضاً هذه الأحياء بالقرب من ${d.nameAr}` : `We Also Serve These Districts Near ${d.name}`,
    allDistricts: isAr ? "كل الأحياء ←" : "View All Districts →",
    faqLabel: "FAQ",
    faqH2: isAr
      ? `التسويق الرقمي في ${d.nameAr} — أسئلة وأجوبة`
      : `Digital Marketing in ${d.name} — Questions & Answers`,
    exploreLabel: isAr ? "استكشف خدماتنا" : "Explore Our Services",
    ctaWa: isAr ? `احصل على تدقيق مجاني لحي ${d.nameAr}` : `Get Free Audit for ${d.name}`,
    ctaTalk: isAr ? "تحدث مع فريقنا ←" : "Talk to Our Team →",
    serviceLinks: isAr
      ? [
          { label: "SEO في الرياض", href: `${p}/services/seo` },
          { label: "إعلانات قوقل", href: `${p}/services/google-ads` },
          { label: "إعلانات ميتا", href: `${p}/services/meta-ads` },
          { label: "تصميم المواقع", href: `${p}/services/web-design` },
          { label: "السوشيال ميديا", href: `${p}/services/social-media` },
          { label: "ملف النشاط في قوقل", href: `${p}/services/google-business-profile` },
          { label: "كل الخدمات", href: `${p}/services` },
          { label: "عن لوكال سيتي", href: `${p}/about` },
          { label: "تدقيق مجاني", href: `${p}/free-audit` },
        ]
      : [
          { label: "SEO in Riyadh", href: `${p}/services/seo` },
          { label: "Google Ads", href: `${p}/services/google-ads` },
          { label: "Meta Ads", href: `${p}/services/meta-ads` },
          { label: "Web Design", href: `${p}/services/web-design` },
          { label: "Social Media", href: `${p}/services/social-media` },
          { label: "Google Business Profile", href: `${p}/services/google-business-profile` },
          { label: "All Services", href: `${p}/services` },
          { label: "About LCS", href: `${p}/about` },
          { label: "Free Audit", href: `${p}/free-audit` },
        ],
  };

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.08) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse" />
            <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-widest">{ui.zone}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            {isAr ? `تسويق رقمي في حي ${d.nameAr}، الرياض` : d.tagline}
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {ar?.heroDesc ?? d.heroDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <TrackableLink
              href={`${p}/free-audit`}
              track="free-audit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#e6b800] transition-all shadow-xl shadow-[#F5C518]/20"
            >
              {ui.ctaWa}
            </TrackableLink>
            <Link
              href={`${p}/contact`}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-all"
            >
              {ui.ctaTalk}
            </Link>
          </div>
        </div>
      </section>

      {/* About This District */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 reveal">
          <div className={`flex items-center gap-3 mb-8 ${isAr ? "flex-row-reverse" : ""}`}>
            <span className="w-8 h-px bg-[#F5C518]" />
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em]">{ui.aboutLabel}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">{ui.aboutH2}</h2>
          <div className="space-y-5">
            {(ar?.about ?? d.about).map((para, i) => (
              <p key={i} className="text-white/60 leading-relaxed text-sm md:text-base">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Key Industries */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{ui.industriesLabel}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{ui.industriesH2}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 reveal delay-1">
            {d.industries.map((ind, i) => (
              <div
                key={ind.name}
                className="bg-[#0E1A2E] border border-white/5 rounded-xl p-4 text-center hover:border-[#F5C518]/20 transition-all"
              >
                <div className="text-2xl mb-2">{ind.icon}</div>
                <p className="text-white/70 text-xs font-medium leading-snug">{ar?.industries[i] ?? ind.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services in District */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{ui.servicesLabel}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{ui.servicesH2}</h2>
            <p className="text-white/50 mt-3 text-sm max-w-xl mx-auto">{ui.servicesSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal delay-1">
            {d.services.map((svc, i) => (
              <div
                key={i}
                className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 hover:border-[#F5C518]/20 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F5C518]/10 flex items-center justify-center mb-4 group-hover:bg-[#F5C518]/20 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-[#F5C518]" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{ar?.services[i]?.title ?? svc.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{ar?.services[i]?.desc ?? svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Districts */}
      <section className="bg-[#080E1A] py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 reveal">
          <div className={`flex items-center gap-3 mb-6 ${isAr ? "flex-row-reverse" : ""}`}>
            <span className="w-8 h-px bg-[#F5C518]" />
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em]">{ui.nearbyLabel}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">{ui.nearbyH2}</h2>
          <div className="flex flex-wrap gap-3">
            {d.nearby.map((n) => (
              <Link
                key={n.slug}
                href={`${p}/riyadh/${n.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/70 text-sm font-medium hover:border-[#F5C518]/40 hover:text-[#F5C518] transition-all"
              >
                {isAr ? DISTRICTS.find(x => x.slug === n.slug)?.nameAr ?? n.name : n.name}
                <span className="text-white/30">{isAr ? "←" : "→"}</span>
              </Link>
            ))}
            <Link
              href={`${p}/riyadh`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5C518]/10 border border-[#F5C518]/20 text-[#F5C518] text-sm font-medium hover:bg-[#F5C518]/20 transition-all"
            >
              {ui.allDistricts}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{ui.faqLabel}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{ui.faqH2}</h2>
          </div>
          <div className="space-y-4 reveal delay-1">
            {d.faq.map((item, i) => (
              <details
                key={i}
                className="group bg-[#0E1A2E] border border-white/5 rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all"
              >
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-white font-semibold text-sm pr-4">{ar?.faq[i]?.q ?? item.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518] text-sm font-bold group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 border-t border-white/5">
                  <p className="text-white/60 text-sm leading-relaxed pt-4">{ar?.faq[i]?.a ?? item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-[#080E1A] py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 reveal">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-4">{ui.exploreLabel}</p>
          <div className="flex flex-wrap gap-2">
            {ui.serviceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABox heading={ar?.ctaHeading ?? d.ctaHeading} subtitle={ar?.ctaSubtitle ?? d.ctaSubtitle} locale={locale} bg="dark" />
    </>
  );
}
