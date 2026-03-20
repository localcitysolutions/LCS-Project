import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

interface ServiceContent {
  title: string;
  tagline: string;
  heroDesc: string;
  features: { icon: string; title: string; desc: string }[];
  process: { num: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaSubtitle: string;
}

interface Service {
  slug: string;
  en: ServiceContent;
  ar: ServiceContent;
}

const SERVICES: Service[] = [
  {
    slug: "digital-marketing",
    en: {
      title: "Digital Marketing in Riyadh",
      tagline: "Full-stack digital marketing strategy built for Saudi businesses",
      heroDesc: "We build and execute complete digital marketing strategies for Riyadh businesses — combining SEO, paid ads, social media, and content to create unstoppable online growth.",
      features: [
        { icon: "🎯", title: "Brand Strategy", desc: "Define your unique market position and build a digital brand that resonates with Saudi consumers." },
        { icon: "🔍", title: "Audience Research", desc: "Deep-dive into your target customers' online behavior, search patterns, and platform preferences in the Saudi market." },
        { icon: "📊", title: "Campaign Management", desc: "End-to-end management of all paid and organic digital campaigns with transparent monthly reporting." },
        { icon: "✍️", title: "Content Marketing", desc: "Arabic and English content that builds authority, drives organic traffic, and converts visitors into leads." },
        { icon: "📈", title: "Conversion Optimization", desc: "Turn more of your existing traffic into leads and customers through data-driven CRO strategies." },
        { icon: "🔄", title: "Analytics & Reporting", desc: "Clear monthly KPI reports so you always know exactly what's working and where your budget is going." },
      ],
      process: [
        { num: "01", title: "Discovery & Audit", desc: "We analyze your current digital presence, competitors, and market position to identify the biggest opportunities." },
        { num: "02", title: "Strategy Development", desc: "We build a custom digital marketing roadmap aligned with your revenue goals and Riyadh market dynamics." },
        { num: "03", title: "Launch & Execute", desc: "We implement all campaigns, content, and technical improvements with speed and precision." },
        { num: "04", title: "Optimize & Scale", desc: "Continuous testing and optimization to maximize ROI, then scale what works." },
      ],
      faq: [
        { q: "How long does it take to see results from digital marketing?", a: "Paid ads (Google, Meta) can generate traffic within days of launch. SEO typically takes 3–6 months for significant ranking improvements. A combined strategy delivers quick wins from paid while SEO compounds over time." },
        { q: "What budget should I start with?", a: "A meaningful starting point for Riyadh businesses is typically SAR 5,000–8,000/month across all channels. This covers ad spend plus management. We'll recommend a budget allocation based on your goals and competitive landscape." },
        { q: "Do you provide bilingual (Arabic/English) campaigns?", a: "Yes — all our campaigns are fully bilingual. We have native Arabic copywriters and SEO specialists who understand Saudi search behavior, not just translators." },
      ],
      ctaHeading: "Ready to Grow Your Riyadh Business?",
      ctaSubtitle: "Get a free digital marketing audit and discover exactly where your biggest growth opportunities are.",
    },
    ar: {
      title: "التسويق الرقمي في الرياض",
      tagline: "استراتيجية تسويق رقمي متكاملة مصممة لأعمال السوق السعودي",
      heroDesc: "نبني وننفذ استراتيجيات تسويق رقمي متكاملة لأعمال الرياض — نجمع بين تحسين محركات البحث والإعلانات المدفوعة والسوشيال ميديا والمحتوى لنحقق نمواً رقمياً لا يتوقف.",
      features: [
        { icon: "🎯", title: "استراتيجية العلامة التجارية", desc: "حدّد موقعك الفريد في السوق وابنِ علامة رقمية تتردد صداها مع المستهلك السعودي." },
        { icon: "🔍", title: "أبحاث الجمهور", desc: "تعمّق في سلوك عملائك المستهدفين الإلكتروني وأنماط بحثهم وتفضيلاتهم للمنصات في السوق السعودي." },
        { icon: "📊", title: "إدارة الحملات", desc: "إدارة متكاملة لجميع الحملات الرقمية المدفوعة والعضوية مع تقارير شهرية شفافة." },
        { icon: "✍️", title: "تسويق المحتوى", desc: "محتوى بالعربية والإنجليزية يبني السلطة ويجلب الزيارات العضوية ويحوّل الزوار إلى عملاء محتملين." },
        { icon: "📈", title: "تحسين التحويل", desc: "حوّل نسبة أعلى من زياراتك الحالية إلى عملاء محتملين وعملاء فعليين من خلال استراتيجيات CRO مبنية على البيانات." },
        { icon: "🔄", title: "التحليلات والتقارير", desc: "تقارير KPI شهرية واضحة حتى تعرف دائماً ما الذي ينجح وأين تذهب ميزانيتك بالضبط." },
      ],
      process: [
        { num: "٠١", title: "الاكتشاف والتدقيق", desc: "نحلل حضورك الرقمي الحالي ومنافسيك وموقعك في السوق لتحديد أكبر الفرص." },
        { num: "٠٢", title: "بناء الاستراتيجية", desc: "نبني خارطة طريق تسويق رقمي مخصصة متوافقة مع أهداف إيراداتك وديناميكيات سوق الرياض." },
        { num: "٠٣", title: "الإطلاق والتنفيذ", desc: "ننفذ جميع الحملات والمحتوى والتحسينات التقنية بسرعة ودقة." },
        { num: "٠٤", title: "التحسين والتوسع", desc: "اختبار وتحسين مستمر لتعظيم العائد على الاستثمار، ثم توسيع ما ينجح." },
      ],
      faq: [
        { q: "كم يستغرق رؤية النتائج من التسويق الرقمي؟", a: "الإعلانات المدفوعة (قوقل وميتا) يمكنها جلب الزيارات في غضون أيام من الإطلاق. SEO يستغرق عادةً ٣-٦ أشهر لتحسينات ترتيب ملحوظة. الاستراتيجية المشتركة تحقق انتصارات سريعة من المدفوع بينما يتراكم SEO مع الوقت." },
        { q: "ما الميزانية التي يجب أن أبدأ بها؟", a: "نقطة بداية معقولة لأعمال الرياض عادةً ما بين ٥,٠٠٠ - ٨,٠٠٠ ريال شهرياً عبر جميع القنوات. يشمل هذا الإنفاق الإعلاني والإدارة. سنوصي بتخصيص الميزانية بناءً على أهدافك والمشهد التنافسي." },
        { q: "هل تقدمون حملات ثنائية اللغة (عربي/إنجليزي)؟", a: "نعم — جميع حملاتنا ثنائية اللغة بالكامل. لدينا كتّاب نسخ عربية أصليون ومتخصصو SEO يفهمون سلوك البحث السعودي، وليس مجرد مترجمين." },
      ],
      ctaHeading: "حاضر تنمي نشاطك في الرياض؟",
      ctaSubtitle: "احصل على تدقيق تسويق رقمي مجاني واكتشف أين تكمن أكبر فرص نموك بالضبط.",
    },
  },
  {
    slug: "web-design",
    en: {
      title: "Web Design in Riyadh",
      tagline: "Stunning, fast, mobile-first websites that convert visitors into customers",
      heroDesc: "We design and build high-performance websites for Riyadh businesses — beautiful, blazing fast, and engineered to turn every visitor into a paying customer.",
      features: [
        { icon: "📱", title: "Mobile-First Design", desc: "70%+ of Riyadh web traffic is mobile. Every pixel of our designs is perfected for smartphone users first." },
        { icon: "⚡", title: "Blazing Fast Performance", desc: "Sub-2-second load times, optimized Core Web Vitals, and CDN delivery for the best experience anywhere in Saudi Arabia." },
        { icon: "🎨", title: "Brand-Aligned Visual Design", desc: "Custom designs that reflect your brand identity and position you correctly in the Riyadh market." },
        { icon: "🔍", title: "SEO-Ready Architecture", desc: "Built from the ground up with proper HTML structure, schema markup, and technical SEO best practices." },
        { icon: "🌐", title: "Bilingual Arabic/English", desc: "Full RTL Arabic support alongside English — critical for reaching the full Saudi market." },
        { icon: "📊", title: "Analytics Integration", desc: "Google Analytics 4, Search Console, and conversion tracking set up from day one." },
      ],
      process: [
        { num: "01", title: "Discovery", desc: "We learn your business, audience, competitors, and goals before writing a single line of code." },
        { num: "02", title: "Design", desc: "Custom wireframes and visual designs reviewed and approved before development begins." },
        { num: "03", title: "Build", desc: "Development using modern frameworks — fast, secure, and scalable." },
        { num: "04", title: "Launch & Support", desc: "Rigorous testing, smooth launch, and ongoing support to keep your site performing." },
      ],
      faq: [
        { q: "How long does a website project take?", a: "A typical business website takes 3–5 weeks from kickoff to launch. E-commerce projects with large catalogs can take 6–8 weeks. We'll give you a precise timeline after the discovery session." },
        { q: "Do you build in Arabic and English?", a: "Yes — fully bilingual websites with proper RTL Arabic layout, Arabic fonts, and separate Arabic/English content management. Not just a translated template." },
        { q: "What platforms do you build on?", a: "We build custom sites, WordPress, and specialized platforms based on your needs. For e-commerce in Saudi Arabia we recommend Salla or Zid for local payment integration." },
      ],
      ctaHeading: "Get a Website That Actually Converts",
      ctaSubtitle: "Start with a free consultation and see how a high-performance website can transform your Riyadh business.",
    },
    ar: {
      title: "تصميم المواقع في الرياض",
      tagline: "مواقع احترافية وسريعة تحوّل الزوار إلى عملاء",
      heroDesc: "نصمم ونبني مواقع عالية الأداء لأعمال الرياض — جميلة وسريعة البرق، مصمّمة هندسياً لتحويل كل زائر إلى عميل حقيقي.",
      features: [
        { icon: "📱", title: "تصميم الجوال أولاً", desc: "أكثر من ٧٠٪ من زيارات الإنترنت في الرياض تأتي من الجوال. كل بكسل من تصاميمنا مُكمَّل أولاً لمستخدمي الهاتف الذكي." },
        { icon: "⚡", title: "أداء فائق السرعة", desc: "أوقات تحميل أقل من ثانيتين، ومؤشرات Core Web Vitals محسّنة، وتسليم CDN لأفضل تجربة في أي مكان بالسعودية." },
        { icon: "🎨", title: "تصميم بصري متوافق مع علامتك", desc: "تصاميم مخصصة تعكس هوية علامتك التجارية وتضعك في الموقع الصحيح في سوق الرياض." },
        { icon: "🔍", title: "بنية جاهزة لتحسين محركات البحث", desc: "مبنية من الأساس ببنية HTML صحيحة وترميز schema وأفضل ممارسات SEO التقني." },
        { icon: "🌐", title: "ثنائي اللغة: عربي وإنجليزي", desc: "دعم كامل للغة العربية RTL إلى جانب الإنجليزية — ضروري للوصول إلى السوق السعودي بالكامل." },
        { icon: "📊", title: "تكامل التحليلات", desc: "Google Analytics 4 وSearch Console وتتبع التحويلات مُعدَّة من اليوم الأول." },
      ],
      process: [
        { num: "٠١", title: "الاكتشاف", desc: "نتعرف على نشاطك وجمهورك ومنافسيك وأهدافك قبل كتابة سطر كود واحد." },
        { num: "٠٢", title: "التصميم", desc: "تصاميم أولية بصرية مخصصة تُراجَع وتُعتمَد قبل بدء التطوير." },
        { num: "٠٣", title: "البناء", desc: "تطوير باستخدام أطر عمل حديثة — سريع وآمن وقابل للتوسع." },
        { num: "٠٤", title: "الإطلاق والدعم", desc: "اختبار دقيق وإطلاق سلس ودعم مستمر للحفاظ على أداء موقعك." },
      ],
      faq: [
        { q: "كم يستغرق مشروع الموقع؟", a: "يستغرق موقع الأعمال النموذجي ٣-٥ أسابيع من الانطلاق حتى الإطلاق. مشاريع التجارة الإلكترونية ذات الكتالوجات الكبيرة قد تستغرق ٦-٨ أسابيع. سنعطيك جدولاً زمنياً دقيقاً بعد جلسة الاكتشاف." },
        { q: "هل تبنون بالعربية والإنجليزية؟", a: "نعم — مواقع ثنائية اللغة بالكامل مع تخطيط عربي RTL صحيح وخطوط عربية وإدارة محتوى منفصلة للعربية والإنجليزية. ليس مجرد قالب مترجم." },
        { q: "على أي منصات تبنون؟", a: "نبني مواقع مخصصة وعلى ووردبريس ومنصات متخصصة بناءً على احتياجاتك. للتجارة الإلكترونية في السعودية نوصي بسلة أو زد لتكامل المدفوعات المحلية." },
      ],
      ctaHeading: "احصل على موقع يحوّل الزوار فعلاً",
      ctaSubtitle: "ابدأ باستشارة مجانية وشوف كيف يمكن لموقع عالي الأداء تحويل نشاطك في الرياض.",
    },
  },
  {
    slug: "seo",
    en: {
      title: "SEO Services in Riyadh",
      tagline: "Rank higher on Google. Get found by customers who are ready to buy.",
      heroDesc: "Our Riyadh SEO specialists combine technical expertise, local market knowledge, and bilingual keyword strategy to help your business dominate Google search results — in Arabic and English.",
      features: [
        { icon: "📍", title: "Local SEO", desc: "Dominate Google Maps and local search results for your target keywords in Riyadh and specific districts." },
        { icon: "⚙️", title: "Technical SEO", desc: "Fix crawlability issues, improve site speed, optimize Core Web Vitals, and ensure Google can index your site correctly." },
        { icon: "🌐", title: "Bilingual Keyword Strategy", desc: "Separate Arabic and English keyword research targeting the way Saudi customers actually search." },
        { icon: "✍️", title: "SEO Content Creation", desc: "Optimized Arabic and English content that ranks and converts — written by Saudi market experts." },
        { icon: "🔗", title: "Link Building", desc: "Authoritative backlinks from Saudi and regional websites to build your domain authority." },
        { icon: "📊", title: "Monthly SEO Reporting", desc: "Clear reports showing ranking changes, traffic growth, and the business impact of every SEO action." },
      ],
      process: [
        { num: "01", title: "SEO Audit", desc: "Comprehensive technical audit to identify every issue holding your rankings back." },
        { num: "02", title: "Keyword Strategy", desc: "Bilingual keyword research targeting high-intent searches in your market segment." },
        { num: "03", title: "On-Page Optimization", desc: "Optimize every page, meta tag, heading, and content for maximum relevance and crawlability." },
        { num: "04", title: "Build & Monitor", desc: "Link building, content creation, and continuous monitoring to grow and protect your rankings." },
      ],
      faq: [
        { q: "How long does SEO take to show results in Riyadh?", a: "For competitive keywords, expect 4–6 months for meaningful ranking improvements. Less competitive keywords and local SEO can show results in 2–3 months. SEO is a long-term investment — the results compound and become more valuable over time." },
        { q: "Is Arabic SEO different from English SEO?", a: "Significantly. Arabic search behavior, keyword structures, and content expectations differ. Saudi users search differently in Arabic than they would translate an English query. We treat Arabic and English as separate, parallel SEO strategies." },
        { q: "Can you guarantee first-page rankings?", a: "No ethical SEO agency guarantees specific rankings — Google's algorithm is too complex. We guarantee that we'll follow Google's best practices, be completely transparent about our work, and have a track record of results for Riyadh businesses." },
      ],
      ctaHeading: "Start Ranking Higher in Riyadh",
      ctaSubtitle: "Get a free SEO audit and see exactly which keywords you should be ranking for — and how to get there.",
    },
    ar: {
      title: "خدمات تحسين محركات البحث في الرياض",
      tagline: "تصدّر نتائج قوقل. يلاقيك العملاء اللي جاهزين يشترون.",
      heroDesc: "متخصصو SEO لدينا في الرياض يجمعون بين الخبرة التقنية ومعرفة السوق المحلي واستراتيجية الكلمات المفتاحية ثنائية اللغة لمساعدة نشاطك على التصدر في نتائج قوقل — عربياً وإنجليزياً.",
      features: [
        { icon: "📍", title: "SEO المحلي", desc: "تصدّر قوقل ماب ونتائج البحث المحلي لكلماتك المفتاحية المستهدفة في الرياض وأحياء محددة." },
        { icon: "⚙️", title: "SEO التقني", desc: "إصلاح مشكلات الزحف، تحسين سرعة الموقع، تحسين Core Web Vitals، وضمان فهرسة قوقل لموقعك بشكل صحيح." },
        { icon: "🌐", title: "استراتيجية الكلمات المفتاحية ثنائية اللغة", desc: "بحث كلمات مفتاحية منفصل بالعربية والإنجليزية يستهدف الطريقة التي يبحث بها العملاء السعوديون فعلاً." },
        { icon: "✍️", title: "إنشاء محتوى SEO", desc: "محتوى عربي وإنجليزي مُحسَّن يتصدر ويحوّل — مكتوب من قِبَل خبراء السوق السعودي." },
        { icon: "🔗", title: "بناء الروابط", desc: "روابط خلفية موثوقة من مواقع سعودية وإقليمية لبناء سلطة نطاقك." },
        { icon: "📊", title: "تقارير SEO الشهرية", desc: "تقارير واضحة تُظهر تغييرات الترتيب ونمو الزيارات والأثر التجاري لكل إجراء SEO." },
      ],
      process: [
        { num: "٠١", title: "تدقيق SEO", desc: "تدقيق تقني شامل لتحديد كل مشكلة تعيق ترتيباتك." },
        { num: "٠٢", title: "استراتيجية الكلمات المفتاحية", desc: "بحث كلمات مفتاحية ثنائي اللغة يستهدف عمليات البحث عالية النية في قطاعك." },
        { num: "٠٣", title: "تحسين الصفحة", desc: "تحسين كل صفحة وعلامة ميتا وعنوان ومحتوى لأقصى صلة وقابلية للزحف." },
        { num: "٠٤", title: "البناء والمراقبة", desc: "بناء الروابط وإنشاء المحتوى والمراقبة المستمرة لتنمية ترتيباتك وحمايتها." },
      ],
      faq: [
        { q: "كم يستغرق SEO لإظهار النتائج في الرياض؟", a: "للكلمات المفتاحية التنافسية، توقع ٤-٦ أشهر لتحسينات ترتيب ملحوظة. الكلمات المفتاحية الأقل تنافسية وSEO المحلي يمكن أن يُظهر نتائج في ٢-٣ أشهر. SEO استثمار طويل الأمد — النتائج تتراكم وتزداد قيمةً مع الوقت." },
        { q: "هل SEO العربي مختلف عن SEO الإنجليزي؟", a: "بشكل كبير. سلوك البحث العربي وهياكل الكلمات المفتاحية وتوقعات المحتوى تختلف. المستخدمون السعوديون يبحثون بشكل مختلف بالعربية عما لو ترجموا استعلاماً إنجليزياً. نعامل العربية والإنجليزية كاستراتيجيتَي SEO منفصلتين ومتوازيتين." },
        { q: "هل تضمنون الترتيب في الصفحة الأولى؟", a: "لا توجد وكالة SEO أخلاقية تضمن ترتيبات محددة — خوارزمية قوقل معقدة جداً. نضمن اتباع أفضل ممارسات قوقل والشفافية التامة حول عملنا وسجل نتائج موثّق لأعمال الرياض." },
      ],
      ctaHeading: "ابدأ التصدر في الرياض",
      ctaSubtitle: "احصل على تدقيق SEO مجاني وشوف بالضبط أي الكلمات المفتاحية يجب أن تتصدرها — وكيف تصلها.",
    },
  },
  {
    slug: "google-ads",
    en: {
      title: "Google Ads Management in Riyadh",
      tagline: "Maximum ROI from every riyal you spend on Google",
      heroDesc: "We manage Google Search, Display, Shopping, YouTube, and Maps campaigns for Riyadh businesses — precision targeting, compelling ads, and relentless optimization for the Saudi market.",
      features: [
        { icon: "🔍", title: "Search Campaigns", desc: "Capture high-intent searches from Riyadh customers ready to buy with precisely targeted text ads." },
        { icon: "🖼️", title: "Display Advertising", desc: "Visual banner ads across Google's network to build awareness and retarget website visitors." },
        { icon: "🛒", title: "Shopping Campaigns", desc: "Product listing ads for e-commerce businesses targeting ready-to-buy shoppers in Saudi Arabia." },
        { icon: "📍", title: "Google Maps Ads", desc: "Local ads that appear at the top of Google Maps searches when customers look for businesses near them." },
        { icon: "📊", title: "Conversion Tracking", desc: "Full tracking setup for calls, form fills, and purchases so every riyal of spend is accounted for." },
        { icon: "🔄", title: "Ongoing Optimization", desc: "Continuous A/B testing, bid adjustments, and keyword refinement to reduce waste and increase ROI." },
      ],
      process: [
        { num: "01", title: "Account Audit", desc: "Full review of your existing campaigns (or clean-slate setup for new advertisers)." },
        { num: "02", title: "Strategy & Setup", desc: "Campaign structure, keyword targeting, ad copy, and bid strategy tailored for the Saudi market." },
        { num: "03", title: "Launch & Monitor", desc: "Go-live with daily monitoring in the first two weeks to catch and fix any early issues." },
        { num: "04", title: "Optimize & Report", desc: "Weekly optimizations and monthly reporting on spend, impressions, clicks, and conversions." },
      ],
      faq: [
        { q: "How much should I spend on Google Ads in Riyadh?", a: "It depends on your industry and goals. We generally recommend a minimum of SAR 3,000/month in ad spend for meaningful data. Competitive sectors like clinics and real estate in prime areas may need SAR 8,000–15,000/month to compete effectively." },
        { q: "How quickly will I see results from Google Ads?", a: "Google Ads can drive traffic from the day your campaigns go live. However, first 2–4 weeks is a learning phase where we gather data and optimize. Expect meaningful ROI within 4–6 weeks for most businesses." },
        { q: "Can you manage existing Google Ads accounts?", a: "Yes — we audit and take over existing accounts regularly. We often find significant wasted spend that we immediately cut, effectively reducing costs while maintaining or improving results." },
      ],
      ctaHeading: "Stop Wasting Your Google Ads Budget",
      ctaSubtitle: "Get a free Google Ads audit and see exactly where your spend is going and how to make every riyal work harder.",
    },
    ar: {
      title: "إدارة إعلانات قوقل في الرياض",
      tagline: "أعلى عائد من كل ريال تنفقه على قوقل",
      heroDesc: "ندير حملات البحث والشبكة الإعلانية والتسوق واليوتيوب والخرائط على قوقل لأعمال الرياض — استهداف دقيق وإعلانات مقنعة وتحسين مستمر للسوق السعودي.",
      features: [
        { icon: "🔍", title: "حملات البحث", desc: "التقط عمليات البحث عالية النية من عملاء الرياض الجاهزين للشراء بإعلانات نصية مستهدفة بدقة." },
        { icon: "🖼️", title: "الإعلانات الصورية", desc: "إعلانات بنر مرئية عبر شبكة قوقل لبناء الوعي وإعادة استهداف زوار الموقع." },
        { icon: "🛒", title: "حملات التسوق", desc: "إعلانات قوائم المنتجات للأعمال الإلكترونية التي تستهدف المتسوقين الجاهزين للشراء في السعودية." },
        { icon: "📍", title: "إعلانات قوقل ماب", desc: "إعلانات محلية تظهر في أعلى نتائج قوقل ماب عندما يبحث العملاء عن أعمال قريبة منهم." },
        { icon: "📊", title: "تتبع التحويلات", desc: "إعداد تتبع كامل للمكالمات وتعبئة النماذج والمشتريات حتى يُحسَب كل ريال منفق." },
        { icon: "🔄", title: "تحسين مستمر", desc: "اختبار A/B مستمر وتعديل العروض وتنقيح الكلمات المفتاحية لتقليل الهدر وزيادة العائد على الاستثمار." },
      ],
      process: [
        { num: "٠١", title: "تدقيق الحساب", desc: "مراجعة شاملة لحملاتك الحالية (أو إعداد جديد من الصفر للمعلنين الجدد)." },
        { num: "٠٢", title: "الاستراتيجية والإعداد", desc: "هيكل الحملة واستهداف الكلمات المفتاحية ونسخة الإعلان واستراتيجية العرض مصمَّمة للسوق السعودي." },
        { num: "٠٣", title: "الإطلاق والمراقبة", desc: "إطلاق مباشر مع مراقبة يومية في الأسبوعين الأولين لرصد المشكلات المبكرة وإصلاحها." },
        { num: "٠٤", title: "التحسين والتقارير", desc: "تحسينات أسبوعية وتقارير شهرية عن الإنفاق والظهور والنقرات والتحويلات." },
      ],
      faq: [
        { q: "كم يجب أن أنفق على إعلانات قوقل في الرياض؟", a: "يعتمد على قطاعك وأهدافك. نوصي عموماً بحد أدنى ٣,٠٠٠ ريال شهرياً في الإنفاق الإعلاني للحصول على بيانات ذات معنى. القطاعات التنافسية كالعيادات والعقارات في المناطق الرئيسية قد تحتاج ٨,٠٠٠-١٥,٠٠٠ ريال شهرياً للمنافسة الفعّالة." },
        { q: "كم يستغرق رؤية نتائج إعلانات قوقل؟", a: "إعلانات قوقل يمكنها جلب الزيارات من يوم إطلاق حملاتك. لكن أول ٢-٤ أسابيع هي مرحلة تعلّم نجمع فيها البيانات ونحسّن. توقع عائداً ذا معنى خلال ٤-٦ أسابيع لمعظم الأعمال." },
        { q: "هل يمكنكم إدارة حسابات إعلانات قوقل الموجودة؟", a: "نعم — نُدقق الحسابات الموجودة وندير عليها بشكل منتظم. غالباً نجد إنفاقاً مهدراً بشكل ملحوظ نقطعه فوراً، مما يقلل التكاليف فعلياً مع الحفاظ على النتائج أو تحسينها." },
      ],
      ctaHeading: "وقّف هدر ميزانية إعلانات قوقل",
      ctaSubtitle: "احصل على تدقيق مجاني لإعلانات قوقل وشوف أين يذهب إنفاقك وكيف تشغّل كل ريال بكفاءة أعلى.",
    },
  },
  {
    slug: "meta-ads",
    en: {
      title: "Meta Ads for Saudi Businesses",
      tagline: "Facebook and Instagram advertising that reaches the right Riyadh customers",
      heroDesc: "Saudi Arabia has one of the world's highest social media penetration rates. We build Meta ad campaigns that tap into this massive audience with precision targeting, creative strategy, and local market expertise.",
      features: [
        { icon: "🎯", title: "Precision Audience Targeting", desc: "Target Riyadh customers by location, age, interests, behaviors, and lookalike audiences built from your best customers." },
        { icon: "📸", title: "Creative Production", desc: "Eye-catching image and video ad creatives designed specifically for Saudi social media aesthetics and behavior." },
        { icon: "🛍️", title: "Catalog & Shopping Ads", desc: "Dynamic product ads for e-commerce businesses retargeting shoppers who viewed your products." },
        { icon: "📲", title: "Instagram Stories & Reels", desc: "Full-screen immersive formats that dominate attention in Saudi Arabia's most-watched social placements." },
        { icon: "🔄", title: "Retargeting Campaigns", desc: "Bring back website visitors, app users, and video viewers who showed interest but didn't convert." },
        { icon: "📊", title: "Meta Pixel & CAPI Setup", desc: "Full conversion tracking setup to measure every purchase, lead, and call generated from your Meta ads." },
      ],
      process: [
        { num: "01", title: "Audience Research", desc: "Define and build your ideal Saudi customer audiences using Meta's data and your own customer insights." },
        { num: "02", title: "Creative Strategy", desc: "Develop ad concepts and creatives that resonate with the Saudi market's cultural preferences." },
        { num: "03", title: "Launch & Test", desc: "Deploy campaigns with A/B testing of audiences and creatives to identify winners quickly." },
        { num: "04", title: "Scale Winners", desc: "Double down on the highest-performing audiences and creatives while cutting poor performers." },
      ],
      faq: [
        { q: "Which platforms are most effective in Saudi Arabia — Facebook or Instagram?", a: "Instagram consistently outperforms Facebook for most Saudi audiences, especially the 18–40 demographic. However, Facebook Ads Manager controls both, and we typically run campaigns across both platforms simultaneously to maximize reach." },
        { q: "Does Snapchat compete with Instagram in Saudi Arabia?", a: "Snapchat has an unusually strong market position in Saudi Arabia, particularly among 18–34 year olds. We recommend running Snapchat campaigns alongside Meta Ads for maximum social media coverage in the Kingdom." },
        { q: "What budget do Meta Ads require in Riyadh?", a: "A meaningful Meta Ads budget for Riyadh starts at SAR 2,000–3,000/month in ad spend. For e-commerce or highly competitive sectors, SAR 5,000–10,000/month delivers strong scale. We optimize for maximum efficiency within your budget." },
      ],
      ctaHeading: "Reach Riyadh on Social Media",
      ctaSubtitle: "Get a free Meta Ads consultation and discover exactly how to reach your ideal Saudi customers on Instagram and Facebook.",
    },
    ar: {
      title: "إعلانات ميتا للأعمال السعودية",
      tagline: "إعلانات فيسبوك وإنستقرام توصل لعملاء الرياض الصح",
      heroDesc: "السعودية من أعلى دول العالم في نسبة انتشار السوشيال ميديا. نبني حملات ميتا تستغل هذا الجمهور الضخم باستهداف دقيق واستراتيجية إبداعية وخبرة بالسوق المحلي.",
      features: [
        { icon: "🎯", title: "استهداف الجمهور بدقة", desc: "استهدف عملاء الرياض حسب الموقع والعمر والاهتمامات والسلوكيات والجماهير المشابهة المبنية على أفضل عملائك." },
        { icon: "📸", title: "إنتاج المحتوى الإبداعي", desc: "تصاميم إعلانية صور وفيديو لافتة للنظر، مصمّمة خصيصاً لجماليات ومتطلبات السوشيال ميديا السعودي." },
        { icon: "🛍️", title: "إعلانات الكتالوج والتسوق", desc: "إعلانات منتجات ديناميكية للأعمال الإلكترونية تعيد استهداف المتسوقين الذين شاهدوا منتجاتك." },
        { icon: "📲", title: "قصص وريلز إنستقرام", desc: "تنسيقات ملء الشاشة الغامرة التي تسيطر على الانتباه في أكثر المساحات الإعلانية مشاهدةً في السعودية." },
        { icon: "🔄", title: "حملات إعادة الاستهداف", desc: "استعِد زوار الموقع ومستخدمي التطبيق ومشاهدي الفيديو الذين أبدوا اهتماماً لكن لم يحوّلوا." },
        { icon: "📊", title: "إعداد Meta Pixel وCAPI", desc: "إعداد تتبع تحويلات كامل لقياس كل عملية شراء ومستخدم محتمل ومكالمة تأتي من إعلانات ميتا." },
      ],
      process: [
        { num: "٠١", title: "بحث الجمهور", desc: "تحديد وبناء جماهير عملائك المثاليين السعوديين باستخدام بيانات ميتا ورؤى عملائك الخاصة." },
        { num: "٠٢", title: "استراتيجية الإبداع", desc: "تطوير مفاهيم وإبداعات إعلانية تتردد صداها مع التفضيلات الثقافية للسوق السعودي." },
        { num: "٠٣", title: "الإطلاق والاختبار", desc: "نشر الحملات مع اختبار A/B للجماهير والإبداعات لتحديد الفائزين بسرعة." },
        { num: "٠٤", title: "توسيع الفائزين", desc: "مضاعفة الجماهير والإبداعات الأعلى أداءً مع قطع الضعيفة." },
      ],
      faq: [
        { q: "أي المنصات أكثر فاعلية في السعودية — فيسبوك أم إنستقرام؟", a: "إنستقرام يتفوق باستمرار على فيسبوك لمعظم الجماهير السعودية، خاصةً الفئة العمرية ١٨-٤٠. لكن مدير إعلانات فيسبوك يتحكم في كلتيهما، ونشغّل حملات عبر كلتا المنصتين في نفس الوقت لتعظيم الوصول." },
        { q: "هل سناب شات ينافس إنستقرام في السعودية؟", a: "سناب شات له حضور قوي بشكل غير عادي في السعودية، خاصةً بين الفئة العمرية ١٨-٣٤. نوصي بتشغيل حملات سناب إلى جانب إعلانات ميتا لأقصى تغطية على السوشيال ميديا في المملكة." },
        { q: "ما الميزانية التي تحتاجها إعلانات ميتا في الرياض؟", a: "ميزانية إعلانات ميتا الجدية في الرياض تبدأ من ٢,٠٠٠-٣,٠٠٠ ريال شهرياً. للتجارة الإلكترونية أو القطاعات الشديدة التنافسية، ٥,٠٠٠-١٠,٠٠٠ ريال شهرياً تحقق توسعاً قوياً. نحسّن لأقصى كفاءة ضمن ميزانيتك." },
      ],
      ctaHeading: "وصّل إلى الرياض عبر السوشيال ميديا",
      ctaSubtitle: "احصل على استشارة مجانية لإعلانات ميتا واكتشف كيف تصل لعملائك المثاليين السعوديين على إنستقرام وفيسبوك.",
    },
  },
  {
    slug: "google-business-profile",
    en: {
      title: "Google Business Profile Optimization",
      tagline: "Be the first business customers find when they search locally in Riyadh",
      heroDesc: "75% of customers visit a business within 24 hours of a local Google search. We optimize your Google Business Profile to dominate Maps rankings and capture this enormous pool of high-intent local traffic.",
      features: [
        { icon: "📍", title: "Maps 3-Pack Ranking", desc: "Get your business into Google's local 3-pack — the top 3 results shown on Maps for high-value searches." },
        { icon: "📸", title: "Photo & Media Optimization", desc: "Professional photo strategies that make your listing visually compelling and trustworthy." },
        { icon: "⭐", title: "Review Management", desc: "Systematic review generation strategies and professional response management for all reviews." },
        { icon: "📝", title: "Posts & Updates", desc: "Regular GBP posts, offers, and updates that keep your listing fresh and signal active engagement to Google." },
        { icon: "📊", title: "Insights & Analytics", desc: "Monthly reports on how customers find and interact with your GBP listing." },
        { icon: "🔧", title: "Full Profile Audit & Fix", desc: "Correct NAP data, categories, services, hours, and all listing attributes for maximum relevance." },
      ],
      process: [
        { num: "01", title: "GBP Audit", desc: "Full audit of your current GBP listing quality, ranking position, and competitor comparison." },
        { num: "02", title: "Optimization", desc: "Complete profile optimization: categories, description, services, attributes, photos, and Q&A." },
        { num: "03", title: "Review Strategy", desc: "Implement a review generation system to build a strong, consistent stream of 5-star reviews." },
        { num: "04", title: "Monitor & Maintain", desc: "Ongoing GBP management, post scheduling, review responses, and monthly ranking reports." },
      ],
      faq: [
        { q: "Why is Google Business Profile so important for Riyadh businesses?", a: "Saudi Arabia has extremely high smartphone adoption and 'near me' search usage. When someone searches for 'coffee shop near me' or 'clinic in Al Olaya', Google Maps results appear first. A business not in the Maps 3-pack is effectively invisible to this massive traffic source." },
        { q: "How long does it take to get into the Google Maps 3-pack?", a: "For less competitive areas and categories, we often achieve top-3 positions within 2–3 months. Highly competitive areas like Al Olaya for popular categories may take 4–6 months of sustained optimization." },
        { q: "Can I manage my own GBP after you optimize it?", a: "Yes — we train you on GBP management as part of every engagement. You'll understand how to add posts, respond to reviews, and update information. We can also continue managing it for you on an ongoing basis." },
      ],
      ctaHeading: "Dominate Google Maps in Your Area",
      ctaSubtitle: "Get a free GBP audit and see exactly how your listing ranks against competitors in your Riyadh area.",
    },
    ar: {
      title: "تحسين ملف النشاط التجاري في قوقل",
      tagline: "كن أول نشاط يجده العملاء عند البحث المحلي في الرياض",
      heroDesc: "٧٥٪ من العملاء يزورون النشاط خلال ٢٤ ساعة من البحث المحلي على قوقل. نحسّن ملف نشاطك التجاري للتصدر في قوقل ماب وجذب هذا الحجم الهائل من الزيارات المحلية عالية النية.",
      features: [
        { icon: "📍", title: "الترتيب في المجموعة الثلاثية للخرائط", desc: "أدخِل نشاطك في المجموعة المحلية الثلاثية لقوقل — أعلى ٣ نتائج تظهر في الخرائط لعمليات البحث عالية القيمة." },
        { icon: "📸", title: "تحسين الصور والوسائط", desc: "استراتيجيات صور احترافية تجعل قائمتك مرئياً جذابةً وموثوقة." },
        { icon: "⭐", title: "إدارة التقييمات", desc: "استراتيجيات منهجية لتوليد التقييمات وإدارة الردود المهنية على جميع التقييمات." },
        { icon: "📝", title: "المنشورات والتحديثات", desc: "منشورات GBP منتظمة وعروض وتحديثات تحافظ على نشاط قائمتك وتُشير لقوقل بالتفاعل النشط." },
        { icon: "📊", title: "الرؤى والتحليلات", desc: "تقارير شهرية عن كيفية إيجاد العملاء لقائمتك والتفاعل معها." },
        { icon: "🔧", title: "تدقيق وإصلاح شامل", desc: "تصحيح بيانات NAP والفئات والخدمات والساعات وجميع سمات القائمة لأقصى صلة." },
      ],
      process: [
        { num: "٠١", title: "تدقيق GBP", desc: "تدقيق شامل لجودة قائمتك الحالية وموضع ترتيبها ومقارنة المنافسين." },
        { num: "٠٢", title: "التحسين", desc: "تحسين ملف كامل: الفئات والوصف والخدمات والسمات والصور وأسئلة وأجوبة." },
        { num: "٠٣", title: "استراتيجية التقييمات", desc: "تطبيق نظام توليد تقييمات لبناء تدفق قوي ومتسق من تقييمات ٥ نجوم." },
        { num: "٠٤", title: "المراقبة والصيانة", desc: "إدارة GBP مستمرة وجدولة المنشورات والردود على التقييمات وتقارير الترتيب الشهرية." },
      ],
      faq: [
        { q: "لماذا يُعدّ ملف النشاط في قوقل مهماً جداً لأعمال الرياض؟", a: "السعودية لديها معدل اعتماد استثنائي على الهاتف الذكي واستخدام عمليات البحث 'بالقرب مني'. عندما يبحث أحدهم عن 'مقهى بالقرب مني' أو 'عيادة في العليا'، تظهر نتائج قوقل ماب أولاً. نشاط ليس في المجموعة الثلاثية يكون فعلياً غير مرئي لهذا المصدر الضخم من الزيارات." },
        { q: "كم يستغرق الدخول في المجموعة الثلاثية لقوقل ماب؟", a: "للمناطق والفئات الأقل تنافسية، غالباً نحقق مراكز أعلى ٣ في غضون ٢-٣ أشهر. المناطق الشديدة التنافسية كالعليا للفئات الشائعة قد تستغرق ٤-٦ أشهر من التحسين المستدام." },
        { q: "هل يمكنني إدارة GBP الخاص بي بعد تحسينكم له؟", a: "نعم — ندربك على إدارة GBP كجزء من كل تعامل. ستفهم كيفية إضافة المنشورات والرد على التقييمات وتحديث المعلومات. يمكننا أيضاً الاستمرار في إدارته نيابةً عنك." },
      ],
      ctaHeading: "تصدّر قوقل ماب في منطقتك",
      ctaSubtitle: "احصل على تدقيق GBP مجاني وشوف كيف تنافس قائمتك في منطقتك بالرياض.",
    },
  },
  {
    slug: "social-media",
    en: {
      title: "Social Media Marketing in Riyadh",
      tagline: "Build a loyal Saudi audience that buys from you again and again",
      heroDesc: "Saudi Arabia leads the region in social media usage. We manage your full social presence — Instagram, Snapchat, TikTok, X, and LinkedIn — with content strategy and community management built for the Saudi audience.",
      features: [
        { icon: "📸", title: "Instagram Marketing", desc: "Feed posts, Stories, and Reels strategy tailored for Riyadh's most visual-driven audience." },
        { icon: "👻", title: "Snapchat Marketing", desc: "Saudi Arabia's unique Snapchat dominance makes it essential — we create content that converts on this platform." },
        { icon: "🎬", title: "TikTok Strategy", desc: "Short-form video strategy for Saudi Arabia's fast-growing TikTok audience." },
        { icon: "🐦", title: "X (Twitter) Management", desc: "Saudi Twitter is a major consumer conversation platform — we help you participate and influence it." },
        { icon: "💼", title: "LinkedIn B2B Marketing", desc: "Professional content and targeted campaigns reaching Saudi business decision-makers." },
        { icon: "✍️", title: "Arabic Content Creation", desc: "Native Arabic content written in the voice of your brand — not translated, truly written for the Saudi market." },
      ],
      process: [
        { num: "01", title: "Social Audit", desc: "Review your current profiles, content, followers, and performance across all platforms." },
        { num: "02", title: "Content Strategy", desc: "Develop a content calendar, tone of voice, and visual identity aligned with your brand and Saudi audience." },
        { num: "03", title: "Create & Publish", desc: "Regular, high-quality content production and scheduled posting across all active platforms." },
        { num: "04", title: "Engage & Grow", desc: "Community management, comment responses, and influencer collaborations to accelerate growth." },
      ],
      faq: [
        { q: "Which social media platform is most important for Saudi businesses?", a: "Instagram is the most commercially important platform for most consumer businesses. Snapchat is essential for the 18–35 demographic. TikTok is growing fastest. LinkedIn is key for B2B. We recommend being active on at least 2–3 platforms relevant to your audience." },
        { q: "How often should we post on social media?", a: "Consistency beats frequency. For most Riyadh businesses, 3–5 posts per week on Instagram with daily Stories is an effective starting cadence. Quality, relevant content always outperforms high-volume mediocre posting." },
        { q: "Do you create Arabic content or just English?", a: "We create fully native Arabic content — not translated from English. Our Saudi copywriters write in the voice that resonates with Saudi audiences, including the Gulf Arabic tone that feels natural rather than formal." },
      ],
      ctaHeading: "Build Your Social Media Presence in Saudi Arabia",
      ctaSubtitle: "Get a free social media audit and discover exactly how to grow your audience and sales on Saudi social platforms.",
    },
    ar: {
      title: "التسويق عبر السوشيال ميديا في الرياض",
      tagline: "ابنِ جمهوراً سعودياً وفياً يشتري منك مرة بعد مرة",
      heroDesc: "السعودية تقود المنطقة في استخدام السوشيال ميديا. ندير حضورك الكامل على إنستقرام وسناب وتيك توك وتويتر ولينكدإن — باستراتيجية محتوى وإدارة مجتمع مبنية للجمهور السعودي.",
      features: [
        { icon: "📸", title: "تسويق إنستقرام", desc: "استراتيجية منشورات القاعدة والقصص والريلز مصمَّمة لجمهور الرياض المدفوع بالمحتوى البصري." },
        { icon: "👻", title: "تسويق سناب شات", desc: "هيمنة سناب شات الفريدة في السعودية تجعله ضرورياً — نُنشئ محتوى يحوّل على هذه المنصة." },
        { icon: "🎬", title: "استراتيجية تيك توك", desc: "استراتيجية فيديو قصير لجمهور تيك توك السعودي سريع النمو." },
        { icon: "🐦", title: "إدارة تويتر", desc: "تويتر السعودي منصة محادثة استهلاكية رئيسية — نساعدك على المشاركة والتأثير فيها." },
        { icon: "💼", title: "تسويق لينكدإن B2B", desc: "محتوى احترافي وحملات مستهدفة تصل لصانعي قرار الأعمال السعوديين." },
        { icon: "✍️", title: "إنشاء محتوى عربي", desc: "محتوى عربي أصيل مكتوب بصوت علامتك التجارية — لا مترجم، مكتوب فعلاً للسوق السعودي." },
      ],
      process: [
        { num: "٠١", title: "تدقيق السوشيال ميديا", desc: "مراجعة ملفاتك الشخصية الحالية والمحتوى والمتابعين والأداء عبر كل المنصات." },
        { num: "٠٢", title: "استراتيجية المحتوى", desc: "تطوير تقويم محتوى وأسلوب صوت وهوية بصرية تتوافق مع علامتك والجمهور السعودي." },
        { num: "٠٣", title: "الإنشاء والنشر", desc: "إنتاج محتوى منتظم وعالي الجودة ونشر مجدوَل عبر جميع المنصات النشطة." },
        { num: "٠٤", title: "التفاعل والنمو", desc: "إدارة المجتمع والرد على التعليقات والتعاون مع المؤثرين لتسريع النمو." },
      ],
      faq: [
        { q: "أي منصة سوشيال ميديا الأهم للأعمال السعودية؟", a: "إنستقرام هو الأهم تجارياً لمعظم أعمال المستهلكين. سناب شات ضروري للفئة العمرية ١٨-٣٥. تيك توك الأسرع نمواً. لينكدإن مفتاحي لـ B2B. نوصي بالنشاط على ٢-٣ منصات على الأقل ذات صلة بجمهورك." },
        { q: "كم مرة يجب أن ننشر على السوشيال ميديا؟", a: "الاتساق يتفوق على التكرار. لمعظم أعمال الرياض، ٣-٥ منشورات أسبوعياً على إنستقرام مع قصص يومية وتيرة بداية فعّالة. المحتوى الجيد والذو الصلة يتفوق دائماً على النشر الكثير لكن المتوسط الجودة." },
        { q: "هل تُنشئون محتوى عربياً أم إنجليزياً فقط؟", a: "نُنشئ محتوى عربياً أصيلاً تماماً — لا مترجم من الإنجليزية. كتّاب النسخ السعوديون لدينا يكتبون بالصوت الذي يتردد صداه مع الجمهور السعودي، بما يشمل اللهجة الخليجية التي تبدو طبيعية لا رسمية." },
      ],
      ctaHeading: "ابنِ حضورك على السوشيال ميديا في السعودية",
      ctaSubtitle: "احصل على تدقيق مجاني للسوشيال ميديا واكتشف كيف تنمي جمهورك ومبيعاتك على المنصات السعودية.",
    },
  },
  {
    slug: "ecommerce",
    en: {
      title: "E-Commerce Marketing in Saudi Arabia",
      tagline: "Grow your online store in one of the world's fastest-growing e-commerce markets",
      heroDesc: "Saudi e-commerce is growing at 30%+ annually. We help Riyadh businesses launch, optimize, and scale online stores on Salla, Zid, WooCommerce, and Shopify — with full Arabic support and Saudi payment integration.",
      features: [
        { icon: "🛒", title: "Salla & Zid Optimization", desc: "Saudi-specific platform expertise for the Kingdom's two leading e-commerce platforms — including Mada, STC Pay, and Apple Pay integration." },
        { icon: "📦", title: "Product SEO", desc: "Arabic and English product titles, descriptions, and category pages optimized for high-converting product searches." },
        { icon: "📢", title: "Google Shopping Campaigns", desc: "Product listing ads that put your products in front of Saudi shoppers at the moment of purchase intent." },
        { icon: "🔄", title: "Cart Abandonment Recovery", desc: "WhatsApp and email retargeting sequences to recover abandoned carts and increase purchase completion." },
        { icon: "💳", title: "Saudi Payment Integration", desc: "Mada, STC Pay, Apple Pay, and BNPL integration to maximize checkout conversion in the Saudi market." },
        { icon: "📊", title: "E-Commerce Analytics", desc: "Full funnel tracking — from first visit to purchase — with monthly revenue reporting and growth insights." },
      ],
      process: [
        { num: "01", title: "Store Audit", desc: "Review your current store performance, conversion rates, and technical issues across all devices." },
        { num: "02", title: "Optimization Plan", desc: "Identify and prioritize the changes that will have the biggest impact on revenue." },
        { num: "03", title: "Implement", desc: "Execute SEO, paid campaigns, UX improvements, and technical fixes." },
        { num: "04", title: "Grow & Scale", desc: "Ongoing campaign optimization, new channel testing, and seasonal campaign strategy." },
      ],
      faq: [
        { q: "Which e-commerce platform is best for Saudi Arabia — Salla or Zid?", a: "Both are excellent Saudi-made platforms with Mada and local payment support. Salla is generally better for beginners with its simpler interface. Zid offers more customization for growing stores. We'll recommend based on your specific product range, team size, and growth plans." },
        { q: "How do I compete with Amazon.sa and large retailers?", a: "Niche down and go deeper. Most Saudi shoppers buy from Amazon for convenience. They buy from specialty stores for unique products, better service, and community connection. A focused specialty e-commerce store with strong Instagram presence and genuine Arabic customer service consistently wins in its niche." },
        { q: "Do Saudi customers prefer WhatsApp checkout or website checkout?", a: "Saudi shoppers are heavy WhatsApp users and many prefer direct communication for purchases, especially for higher-value items. We recommend a hybrid approach: polished website checkout plus WhatsApp order support — you'll capture both behavior patterns." },
      ],
      ctaHeading: "Grow Your Saudi E-Commerce Store",
      ctaSubtitle: "Get a free e-commerce audit and discover the biggest opportunities to increase your online store revenue in Saudi Arabia.",
    },
    ar: {
      title: "التسويق للتجارة الإلكترونية في السعودية",
      tagline: "نمِّ متجرك الإلكتروني في واحد من أسرع أسواق التجارة الإلكترونية نمواً",
      heroDesc: "التجارة الإلكترونية في السعودية تنمو بأكثر من ٣٠٪ سنوياً. نساعد أعمال الرياض على إطلاق وتحسين وتوسيع متاجرها الإلكترونية على سلة وزد وووكومرس وشوبيفاي — مع دعم كامل للعربية وتكامل المدفوعات السعودية.",
      features: [
        { icon: "🛒", title: "تحسين سلة وزد", desc: "خبرة بمنصات خاصة بالسوق السعودي لأبرز منصتين للتجارة الإلكترونية في المملكة — بما يشمل تكامل مدى وSTC Pay وApple Pay." },
        { icon: "📦", title: "SEO المنتجات", desc: "عناوين منتجات عربية وإنجليزية وأوصاف وصفحات فئات محسّنة لعمليات البحث عن المنتجات عالية التحويل." },
        { icon: "📢", title: "حملات قوقل شوبينج", desc: "إعلانات قوائم المنتجات التي تضع منتجاتك أمام المتسوقين السعوديين في لحظة نية الشراء." },
        { icon: "🔄", title: "استعادة سلة التسوق المهجورة", desc: "تسلسلات إعادة استهداف واتساب وبريد إلكتروني لاستعادة السلال المهجورة وزيادة اكتمال الشراء." },
        { icon: "💳", title: "تكامل المدفوعات السعودية", desc: "تكامل مدى وSTC Pay وApple Pay وخدمات BNPL لتعظيم تحويل عملية الدفع في السوق السعودي." },
        { icon: "📊", title: "تحليلات التجارة الإلكترونية", desc: "تتبع مسار كامل — من أول زيارة حتى الشراء — مع تقارير إيرادات شهرية ورؤى النمو." },
      ],
      process: [
        { num: "٠١", title: "تدقيق المتجر", desc: "مراجعة أداء متجرك الحالي ومعدلات التحويل والمشكلات التقنية عبر جميع الأجهزة." },
        { num: "٠٢", title: "خطة التحسين", desc: "تحديد وتحديد أولويات التغييرات التي ستُحدث أكبر أثر على الإيرادات." },
        { num: "٠٣", title: "التطبيق", desc: "تنفيذ SEO والحملات المدفوعة وتحسينات تجربة المستخدم والإصلاحات التقنية." },
        { num: "٠٤", title: "النمو والتوسع", desc: "تحسين حملات مستمر واختبار قنوات جديدة واستراتيجية حملات موسمية." },
      ],
      faq: [
        { q: "أي منصة تجارة إلكترونية الأفضل للسعودية — سلة أم زد؟", a: "كلتاهما منصتان سعوديتان ممتازتان مع دعم مدى والمدفوعات المحلية. سلة عموماً أفضل للمبتدئين بواجهتها الأبسط. زد تقدم مزيداً من التخصيص للمتاجر المتنامية. سنوصي بناءً على مجموعة منتجاتك وحجم فريقك وخطط نموك." },
        { q: "كيف أنافس Amazon.sa والبائعين الكبار؟", a: "ضيِّق تخصصك وتعمّق فيه. معظم المتسوقين السعوديين يشترون من أمازون للراحة. يشترون من المتاجر المتخصصة للمنتجات الفريدة والخدمة الأفضل وانتماء المجتمع. متجر تجارة إلكترونية متخصص وموجّه مع حضور قوي على إنستقرام وخدمة عملاء عربية حقيقية يفوز باستمرار في نيشه." },
        { q: "هل يفضّل العملاء السعوديون الدفع عبر واتساب أم موقع الويب؟", a: "المتسوقون السعوديون من أكثر مستخدمي واتساب وكثيرون منهم يفضلون التواصل المباشر للمشتريات، خاصةً ذات القيمة الأعلى. نوصي بنهج هجين: دفع موقع ويب مصقول + دعم طلبات واتساب — ستلتقط كلا نمطي السلوك." },
      ],
      ctaHeading: "نمِّ متجرك الإلكتروني السعودي",
      ctaSubtitle: "احصل على تدقيق تجارة إلكترونية مجاني واكتشف أكبر الفرص لزيادة إيرادات متجرك الإلكتروني في السعودية.",
    },
  },
];

const SLUGS = SERVICES.map((s) => s.slug);

export async function generateStaticParams() {
  return (["en", "ar"] as Locale[]).flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  const c = service[locale] || service.en;
  const isAr = locale === "ar";
  return {
    title: `${c.title} | Local City Solutions`,
    description: c.heroDesc.substring(0, 155),
    alternates: {
      languages: {
        en: `https://localcitysolutions.com/services/${slug}`,
        ar: `https://localcitysolutions.com/ar/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  const isAr = locale === "ar";
  const c = service[locale] || service.en;
  const p = isAr ? "/ar" : "";

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.08) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse" />
            <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-widest">
              {isAr ? "خدماتنا" : "Our Services"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">{c.title}</h1>
          <p className="text-[#F5C518] font-semibold text-base md:text-lg mb-4">{c.tagline}</p>
          <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">{c.heroDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#e6b800] transition-all shadow-xl shadow-[#F5C518]/20">
              {isAr ? "احصل على تدقيق مجاني ←" : "Get Free Audit →"}
            </a>
            <Link href={`${p}/contact`} className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-all">
              {isAr ? "تكلم فريقنا ←" : "Talk to Our Team →"}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{isAr ? "ما نقدمه" : "What We Offer"}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{isAr ? `خدمات ${c.title}` : `Our ${c.title} Services`}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal delay-1">
            {c.features.map((f, i) => (
              <div key={i} className="bg-[#0E1A2E] border border-white/5 rounded-xl p-6 hover:border-[#F5C518]/20 transition-all">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#080E1A] py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{isAr ? "طريقة شغلنا" : "Our Process"}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{isAr ? "كيف نشتغل" : "How We Work"}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal delay-1">
            {c.process.map((step, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl border border-[#F5C518]/25 bg-[#F5C518]/[0.07] text-[#F5C518] font-black text-base md:text-xl mb-3 md:mb-4 mx-auto">{step.num}</div>
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">FAQ</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{isAr ? "أسئلة شائعة" : "Common Questions"}</h2>
          </div>
          <div className="space-y-4 reveal delay-1">
            {c.faq.map((item, i) => (
              <details key={i} className="group bg-[#0E1A2E] border border-white/5 rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className={`text-white font-semibold text-sm pr-4 ${isAr ? "text-right" : ""}`}>{item.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518] text-sm font-bold group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 border-t border-white/5">
                  <p className={`text-white/60 text-sm leading-relaxed pt-4 ${isAr ? "text-right" : ""}`}>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-[#080E1A] py-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{isAr ? "استكشف خدماتنا" : "Explore Our Services"}</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.filter((s) => s.slug !== slug).map((s) => (
              <Link key={s.slug} href={`${p}/services/${s.slug}`} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all">
                {isAr ? s.ar.title : s.en.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABox heading={c.ctaHeading} subtitle={c.ctaSubtitle} locale={locale} bg="dark" />
    </>
  );
}
