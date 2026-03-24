import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTABox from "@/components/CTABox";

type Locale = "en" | "ar";
interface PageProps { params: Promise<{ locale: Locale; slug: string }> }

interface IndustryContent {
  metaTitle: string;
  metaDesc: string;
  heroTitle?: string;
  tagline: string;
  heroDesc: string;
  features: { icon: string; title: string; desc: string }[];
  process: { num: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctaHeading: string;
  ctaSubtitle: string;
}

interface RelatedLink {
  label: string;
  href: string;
}

interface Industry {
  slug: string;
  icon: string;
  name: string;
  nameAr?: string;
  en: IndustryContent;
  ar?: IndustryContent;
  relatedServices: RelatedLink[];
  relatedDistrict: RelatedLink;
  relatedServicesAr?: RelatedLink[];
  relatedDistrictAr?: RelatedLink;
}

const INDUSTRIES: Industry[] = [
  {
    slug: "restaurants",
    icon: "🍽️",
    name: "Restaurants & Cafes",
    nameAr: "المطاعم والكافيهات",
    en: {
      metaTitle: "Digital Marketing for Restaurants in Riyadh | Local City Solutions",
      metaDesc: "Specialized digital marketing for restaurants and cafes in Riyadh. Google Maps ranking, Instagram growth, delivery app integration, menu SEO, and Ramadan campaigns. Get found and get busy.",
      tagline: "Get found on Google Maps. Fill your tables. Grow your delivery orders.",
      heroDesc: "Google Maps is the #1 way Riyadh diners discover restaurants — 70% search before deciding where to eat. We help restaurants and cafes dominate local search, build a loyal social following, and grow delivery orders across HungerStation and Jahez.",
      features: [
        { icon: "📍", title: "Google Business Profile Optimization", desc: "Rank in the Maps 3-pack for 'restaurants near me', 'best café in Al Olaya', and every high-intent dining search in your area." },
        { icon: "📸", title: "Instagram & Visual Marketing", desc: "Food photography direction, Reels strategy, and content that makes people crave your dishes before they've stepped through the door." },
        { icon: "🛵", title: "Delivery App Integration", desc: "Optimize your HungerStation and Jahez listings for maximum visibility — menu photography, keyword-rich descriptions, and review management on both platforms." },
        { icon: "🔍", title: "Menu SEO & Website Optimization", desc: "Structured menu pages, schema markup, and keyword-optimized content so your restaurant appears for dish-specific searches like 'wagyu burger Riyadh'." },
        { icon: "⭐", title: "Review Management", desc: "Systematic strategies to generate a consistent stream of 5-star Google and Zomato reviews — and professional responses to every review, positive or negative." },
        { icon: "🌙", title: "Seasonal Campaigns", desc: "Ramadan iftar promotions, Eid offers, National Day campaigns — timed, targeted, and designed to pack your restaurant during every peak season." },
      ],
      process: [
        { num: "01", title: "Audit Your Presence", desc: "We assess your Google Maps ranking, delivery app visibility, social media performance, and competitor positioning in your area." },
        { num: "02", title: "Build Your Strategy", desc: "Custom plan targeting your biggest gaps — whether that's Maps ranking, social growth, delivery orders, or all three." },
        { num: "03", title: "Execute & Publish", desc: "GBP optimization, content creation, delivery listing improvements, and campaign launches — done for you, consistently." },
        { num: "04", title: "Track & Optimize", desc: "Monthly reports on foot traffic impact, Maps ranking changes, delivery order growth, and social reach." },
      ],
      faq: [
        { q: "How important is Google Maps for restaurants in Riyadh?", a: "Critically important. Google Maps is the #1 discovery channel for restaurants — more than Instagram or word of mouth for new customers. When someone searches 'restaurant near me' or 'best shawarma in Al Malqa', Google shows a 3-pack of map results above everything else. Not being in that 3-pack is equivalent to being invisible to an enormous pool of hungry, ready-to-spend customers." },
        { q: "Should I focus on Google or Instagram for my restaurant?", a: "Both, but for different purposes. Google Maps captures high-intent customers who are actively searching for somewhere to eat right now. Instagram builds brand awareness, showcases your food visually, and builds a loyal community that returns repeatedly. The most successful Riyadh restaurants invest in both — Google for discovery, Instagram for loyalty." },
        { q: "How do I get more orders on HungerStation and Jahez?", a: "Delivery app algorithms favor listings with high ratings, quality photos, keyword-rich menu descriptions, and consistent order completion rates. We optimize your listing content, manage your review profile on both platforms, and run targeted delivery campaigns to boost your visibility to app users searching in your delivery zone." },
      ],
      ctaHeading: "Fill More Tables. Grow Your Delivery Orders.",
      ctaSubtitle: "Get a free restaurant marketing audit and see exactly how your Riyadh location stacks up against competitors — and how to beat them.",
    },
    relatedServices: [
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Google Business Profile", href: "/en/services/google-business-profile" },
      { label: "Meta Ads", href: "/en/services/meta-ads" },
    ],
    relatedDistrict: { label: "Al Olaya District", href: "/en/riyadh/al-olaya" },
    relatedServicesAr: [
      { label: "خدمات SEO", href: "/ar/services/seo" },
      { label: "ملف النشاط التجاري", href: "/ar/services/google-business-profile" },
      { label: "إعلانات ميتا", href: "/ar/services/meta-ads" },
    ],
    relatedDistrictAr: { label: "حي العليا", href: "/ar/riyadh/al-olaya" },
    ar: {
      heroTitle: "تسويق رقمي للمطاعم والكافيهات في الرياض",
      metaTitle: "تسويق رقمي للمطاعم والكافيهات في الرياض | لوكال سيتي سولوشنز",
      metaDesc: "نساعد المطاعم والكافيهات في الرياض يجيبون عملاء أكثر من قوقل ماب وسوشل ميديا.",
      tagline: "تصدّر قوقل ماب. امتلأت طاولاتك. زادت طلبات التوصيل.",
      heroDesc: "قوقل ماب هو المكان اللي يدور فيه أهل الرياض على المطاعم والكافيهات — ٧٠٪ يبحثون قبل ما يقرروا وين يأكلون. نساعدك تتصدر نتائج البحث المحلي، تبني متابعين على السوشل ميديا، وتزيد طلبات التوصيل على هنقرستيشن وجاهز.",
      features: [
        { icon: "📍", title: "تحسين ملف النشاط التجاري", desc: "تتصدر الثلاثة الأوائل في قوقل ماب لكل بحث عن مطعم قريب منك أو أفضل كافيه في العليا وكل البحثات ذات النية العالية في منطقتك." },
        { icon: "📸", title: "إنستقرام والتسويق البصري", desc: "تصوير أكل احترافي، استراتيجية ريلز، ومحتوى يخلي الناس تشتهي أكلك قبل ما يدخلون الباب." },
        { icon: "🛵", title: "تطبيقات التوصيل", desc: "نحسّن قوائمك على هنقرستيشن وجاهز — تصوير المنيو، وصف بكلمات صح، وإدارة التقييمات على المنصتين." },
        { icon: "🔍", title: "SEO المنيو وتحسين الموقع", desc: "صفحات منيو منظمة وكود schema وكلمات مفتاحية تخلي مطعمك يطلع لما حد يبحث عن طبق معين زي 'واغيو برغر الرياض'." },
        { icon: "⭐", title: "إدارة التقييمات", desc: "خطط منهجية تجيب تقييمات ٥ نجوم على قوقل وزوماتو باستمرار — مع ردود احترافية على كل تقييم إيجابي أو سلبي." },
        { icon: "🌙", title: "حملات المواسم", desc: "عروض إفطار رمضان، عروض العيد، اليوم الوطني — حملات مدروسة بالتوقيت الصح تملأ مطعمك في كل موسم." },
      ],
      process: [
        { num: "٠١", title: "تحليل وضعك الحالي", desc: "نراجع ترتيبك في قوقل ماب، ظهورك على تطبيقات التوصيل، أداء السوشل ميديا، وموقعك مقارنة بالمنافسين." },
        { num: "٠٢", title: "نبني استراتيجيتك", desc: "خطة مخصصة تعالج أكبر ثغراتك — سواء في ترتيب الخريطة أو نمو السوشل أو طلبات التوصيل أو الثلاثة مع بعض." },
        { num: "٠٣", title: "ننفذ ونطلق", desc: "تحسين ملف النشاط، إنتاج محتوى، تطوير قوائم التوصيل، وإطلاق الحملات — كل شيء يتنفذ بشكل منتظم." },
        { num: "٠٤", title: "نتابع ونحسّن", desc: "تقارير شهرية عن الزيارات، تغيرات الترتيب في الخريطة، نمو طلبات التوصيل، والوصول على السوشل." },
      ],
      faq: [
        { q: "قد إيش قوقل ماب مهم للمطاعم في الرياض؟", a: "بشكل جوهري. قوقل ماب هو القناة الأولى للاكتشاف للمطاعم — أكثر من إنستقرام أو التوصيات الشخصية للعملاء الجدد. لما حد يبحث عن 'مطعم قريب مني' أو 'أحسن شاورما في الملقا'، قوقل يعرض ثلاثة نتائج في الخريطة فوق كل شيء. ما تكون فيها يعني ما تنشاف لعملاء كثيرين جاهزين للصرف." },
        { q: "أركز على قوقل ولا إنستقرام لمطعمي؟", a: "الاثنين، لكن لكل واحد دوره. قوقل ماب يجيب عملاء يدورون على مكان ياكلون فيه الحين — نية شراء عالية. إنستقرام يبني الوعي بالعلامة، يعرض أكلك بصرياً، ويبني مجتمع متكرر. أنجح المطاعم في الرياض تستثمر في الاثنين — قوقل للاكتشاف، إنستقرام للولاء." },
        { q: "كيف أزيد طلباتي على هنقرستيشن وجاهز؟", a: "خوارزميات التوصيل تفضل القوائم اللي عندها تقييمات عالية وصور جودة وأوصاف منيو بكلمات صح ونسبة اكتمال طلبات ممتازة. نحسّن محتوى قائمتك، ندير ملف التقييمات على المنصتين، ونشغّل حملات توصيل مستهدفة تزيد ظهورك لمستخدمي التطبيق في منطقة توصيلك." },
      ],
      ctaHeading: "امتلأت طاولاتك وزادت طلبات التوصيل",
      ctaSubtitle: "احصل على تدقيق تسويقي مجاني لمطعمك وشوف كيف تتفوق على منافسيك في الرياض.",
    },
  },
  {
    slug: "clinics",
    icon: "🏥",
    name: "Clinics & Healthcare",
    nameAr: "العيادات والرعاية الصحية",
    en: {
      metaTitle: "Digital Marketing for Clinics & Healthcare in Riyadh | Local City Solutions",
      metaDesc: "Specialized digital marketing for clinics and healthcare providers in Riyadh. Medical SEO, doctor profiles, patient reviews, Google Ads for healthcare, and CBAHI-compliant content.",
      tagline: "More patients. Stronger reputation. Full appointment books.",
      heroDesc: "Patients in Riyadh search Google before booking any appointment. Whether they're looking for a dentist in Al Malqa or a dermatologist in Al Olaya, digital presence determines who gets the call. We help clinics and healthcare providers attract the right patients and build an unshakeable online reputation.",
      features: [
        { icon: "🔍", title: "Medical SEO", desc: "Rank on page one for high-value searches like 'dentist in Al Malqa', 'dermatologist Riyadh', and procedure-specific queries that bring in ready-to-book patients." },
        { icon: "👨‍⚕️", title: "Doctor & Specialist Profiles", desc: "Optimized profiles for individual doctors that build trust, showcase credentials, and make it easy for patients to choose your clinic over competitors." },
        { icon: "⭐", title: "Patient Review Management", desc: "Build a consistent 5-star review presence on Google and Doctorna. Respond professionally to all feedback. Reviews are the #1 factor patients use to choose a clinic." },
        { icon: "📅", title: "Appointment Booking Integration", desc: "Streamlined online booking via your website, WhatsApp Business, and Google's 'Book Online' feature — reducing no-shows and call volume simultaneously." },
        { icon: "📢", title: "Google Ads for Healthcare", desc: "Precision-targeted campaigns for specific procedures and specialties, appearing at the top of results when patients are actively searching for care." },
        { icon: "📍", title: "GBP for Clinics", desc: "Fully optimized Google Business Profile showing your specialties, doctors, hours, insurance accepted, and a steady stream of verified patient reviews." },
      ],
      process: [
        { num: "01", title: "Clinic Audit", desc: "Full review of your current search rankings, GBP quality, review profile, website speed, and competitor positioning in your specialty and area." },
        { num: "02", title: "Patient Journey Mapping", desc: "Identify how patients in your target area search for your specialty and where they convert — then optimize every touchpoint." },
        { num: "03", title: "Launch Campaigns", desc: "SEO optimization, Google Ads launch, GBP enhancement, and review generation strategy — all implemented within the first 30 days." },
        { num: "04", title: "Monthly Reporting", desc: "Clear reports on new patient inquiries, keyword rankings, review growth, and ad performance — so you know exactly what's working." },
      ],
      faq: [
        { q: "Is healthcare advertising regulated in Saudi Arabia?", a: "Yes. Saudi healthcare advertising must comply with Ministry of Health regulations and CBAHI guidelines — including restrictions on before/after images, guarantees of outcomes, and claims about treatments. All our healthcare content is created with full compliance awareness. We never run campaigns that risk your CBAHI accreditation or MOH standing." },
        { q: "Which specialties benefit most from digital marketing in Riyadh?", a: "Dental, dermatology, ophthalmology, and general practice see the strongest ROI from digital marketing because patients actively search for these services. Cosmetic procedures (laser, aesthetics), physiotherapy, and pediatrics also perform exceptionally well. Highly specialized fields rely more on GP referrals, but still benefit from strong GBP presence and doctor profiles." },
        { q: "How do I encourage patients to leave Google reviews?", a: "The most effective method is a simple, automated post-visit WhatsApp message with a direct Google review link — sent within 2 hours of the appointment while the experience is fresh. We set this up for every clinic we work with. Clinics using this system typically see 3–5x more monthly reviews within the first 60 days." },
      ],
      ctaHeading: "Grow Your Patient Base in Riyadh",
      ctaSubtitle: "Get a free clinic marketing audit and discover exactly how to attract more patients in your specialty and area.",
    },
    relatedServices: [
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Google Ads", href: "/en/services/google-ads" },
      { label: "Google Business Profile", href: "/en/services/google-business-profile" },
    ],
    relatedDistrict: { label: "Al Malqa District", href: "/en/riyadh/al-malqa" },
    relatedServicesAr: [
      { label: "خدمات SEO", href: "/ar/services/seo" },
      { label: "إعلانات قوقل", href: "/ar/services/google-ads" },
      { label: "ملف النشاط التجاري", href: "/ar/services/google-business-profile" },
    ],
    relatedDistrictAr: { label: "حي الملقا", href: "/ar/riyadh/al-malqa" },
    ar: {
      heroTitle: "تسويق رقمي للعيادات والرعاية الصحية في الرياض",
      metaTitle: "تسويق رقمي للعيادات والرعاية الصحية في الرياض | لوكال سيتي سولوشنز",
      metaDesc: "نساعد العيادات والمراكز الصحية في الرياض توصل للمرضى عبر قوقل والسوشل ميديا.",
      tagline: "مرضى أكثر. سمعة أقوى. مواعيد محجوزة على طول.",
      heroDesc: "المرضى في الرياض يبحثون في قوقل قبل ما يحجزون أي موعد. سواء كانوا يدورون على طبيب أسنان في الملقا أو طبيب جلدية في العليا، التواجد الرقمي هو اللي يحدد من يأخذ المكالمة. نساعد العيادات ومقدمي الرعاية الصحية يجذبون المرضى المناسبين ويبنون سمعة إلكترونية قوية.",
      features: [
        { icon: "🔍", title: "SEO طبي متخصص", desc: "تتصدر الصفحة الأولى لبحثات عالية القيمة زي 'طبيب أسنان الملقا' و'جلدية الرياض' وكل بحث خاص بإجراء يجيب مريض مستعد للحجز." },
        { icon: "👨‍⚕️", title: "ملفات الأطباء والمتخصصين", desc: "ملفات محسّنة للأطباء تبني الثقة وتعرض المؤهلات وتسهل على المريض اختيار عيادتك على المنافس." },
        { icon: "⭐", title: "إدارة تقييمات المرضى", desc: "ابنِ حضور ٥ نجوم ثابت على قوقل ودكتورنا. التقييمات هي العامل الأول اللي يختار على أساسه المريض عيادته." },
        { icon: "📅", title: "نظام حجز المواعيد", desc: "حجز إلكتروني سلس عبر موقعك وواتساب بيزنس وخاصية 'احجز مباشرة' في قوقل — تقلل عدم الحضور وكثرة المكالمات." },
        { icon: "📢", title: "إعلانات قوقل للرعاية الصحية", desc: "حملات مستهدفة بدقة لإجراءات وتخصصات محددة، تظهر في أعلى النتائج لما المريض يبحث نشيطاً عن رعاية." },
        { icon: "📍", title: "ملف النشاط التجاري للعيادات", desc: "ملف قوقل محسّن بالكامل يعرض تخصصاتك وأطباءك وأوقات العمل والتأمين المقبول وتدفق مستمر من تقييمات المرضى." },
      ],
      process: [
        { num: "٠١", title: "تدقيق العيادة", desc: "مراجعة شاملة لترتيبك في البحث، جودة ملف النشاط، ملف التقييمات، سرعة الموقع، وموقعك بين المنافسين في تخصصك." },
        { num: "٠٢", title: "رسم رحلة المريض", desc: "نحدد كيف يبحث المرضى في منطقتك عن تخصصك وأين يقررون الحجز — ثم نحسّن كل نقطة تماس." },
        { num: "٠٣", title: "إطلاق الحملات", desc: "تحسين SEO، إطلاق إعلانات قوقل، تطوير ملف النشاط، واستراتيجية توليد التقييمات — كل شيء ينفذ خلال أول ٣٠ يوم." },
        { num: "٠٤", title: "تقارير شهرية", desc: "تقارير واضحة عن استفسارات المرضى الجدد، ترتيب الكلمات المفتاحية، نمو التقييمات، وأداء الإعلانات." },
      ],
      faq: [
        { q: "هل الإعلانات الطبية منظمة في السعودية؟", a: "نعم. الإعلانات الصحية في السعودية لازم تلتزم بلوائح وزارة الصحة وإرشادات سباهي — وتشمل قيوداً على صور قبل وبعد وضمانات النتائج وادعاءات العلاجات. كل محتوانا الصحي يُكتب بوعي تام بمتطلبات الامتثال. ما نشغّل أي حملة تعرّض اعتماد سباهي أو وقوفك مع وزارة الصحة للخطر." },
        { q: "أي التخصصات تستفيد أكثر من التسويق الرقمي في الرياض؟", a: "طب الأسنان والجلدية وطب العيون والطب العام يشهدون أقوى عائد من التسويق الرقمي. الإجراءات التجميلية والعلاج الطبيعي وطب الأطفال تؤدي كمان أداءً ممتازاً. التخصصات الدقيقة تعتمد أكثر على إحالات الطبيب العام، لكن تستفيد دايماً من ملف نشاط قوي وملفات أطباء محسّنة." },
        { q: "كيف أشجع المرضى يكتبون تقييمات على قوقل؟", a: "الأسلوب الأفضل رسالة واتساب بسيطة وتلقائية بعد الزيارة مع رابط مباشر لتقييم قوقل — تُرسل خلال ساعتين من الموعد والتجربة لا تزال طازجة. نعدّ هذا النظام لكل عيادة نشتغل معها. العيادات اللي تطبقه تشهد عادةً من ٣ إلى ٥ أضعاف تقييمات شهرية خلال أول ٦٠ يوم." },
      ],
      ctaHeading: "زِد قاعدة مرضاك في الرياض",
      ctaSubtitle: "احصل على تدقيق تسويقي مجاني لعيادتك واكتشف بالضبط كيف تجذب مرضى أكثر في تخصصك ومنطقتك.",
    },
  },
  {
    slug: "salons",
    icon: "💇",
    name: "Salons & Beauty",
    nameAr: "الصالونات ومراكز التجميل",
    en: {
      metaTitle: "Digital Marketing for Salons & Beauty in Riyadh | Local City Solutions",
      metaDesc: "Digital marketing for salons and beauty centers in Riyadh. Instagram visual marketing, Maps ranking, booking integration, Eid and wedding campaigns — built for Saudi beauty businesses.",
      tagline: "More bookings. A bigger Instagram following. A packed calendar.",
      heroDesc: "The Saudi beauty market is booming — and competition on Google Maps and Instagram has never been fiercer. Salons that win combine strong Maps visibility with a visually stunning social presence and seamless online booking. We build exactly that for salons and beauty centers across Riyadh.",
      features: [
        { icon: "📸", title: "Instagram Visual Marketing", desc: "Before/after galleries, Reels transformations, and a curated aesthetic that stops the scroll and converts followers into bookings." },
        { icon: "📍", title: "Google Maps Ranking", desc: "Dominate local searches like 'hair salon near me', 'nail salon in Hittin', and 'best ladies salon Riyadh' — where the majority of new bookings originate." },
        { icon: "📅", title: "Booking Integration", desc: "Frictionless appointment booking via Fresha, Booksy, or WhatsApp Business — directly from your Instagram profile, Google listing, and website." },
        { icon: "⭐", title: "Review Generation", desc: "Consistent 5-star reviews on Google and Treatwell, with professional responses that show new clients how much you care about every experience." },
        { icon: "🌙", title: "Seasonal Campaigns", desc: "Eid beauty packages, wedding season campaigns, Ramadan offers, and National Day promotions — designed and executed at exactly the right moment." },
        { icon: "🤳", title: "Influencer Marketing", desc: "Collaborate with Riyadh beauty influencers for authentic before/after content that reaches tens of thousands of your ideal clients." },
      ],
      process: [
        { num: "01", title: "Beauty Audit", desc: "Assess your Maps ranking, Instagram performance, booking system, review profile, and competitor positioning in your neighborhood." },
        { num: "02", title: "Visual Brand Strategy", desc: "Define your aesthetic, content pillars, and brand voice — the foundation that makes your salon instantly recognizable on social media." },
        { num: "03", title: "Execute & Grow", desc: "Content creation, posting schedule, GBP optimization, booking setup, and review campaigns — all handled for you." },
        { num: "04", title: "Scale & Report", desc: "Monthly reporting on new bookings sourced from digital, follower growth, Maps ranking movement, and campaign performance." },
      ],
      faq: [
        { q: "Is Instagram or Google Maps more important for salons in Riyadh?", a: "Both are essential but serve different roles. Google Maps captures high-intent searches — someone actively looking for a salon near them right now. Instagram builds brand desire and community — someone follows you, sees beautiful transformations repeatedly, and books when they're ready. The salons with the most packed calendars in Riyadh invest seriously in both channels simultaneously." },
        { q: "How can I get more 5-star Google reviews for my salon?", a: "The most effective trigger is timing. Send a WhatsApp message with your Google review link within 1–2 hours after a client's appointment — while they're still glowing from their treatment. Include their name and a photo of their finished look if you can. Salons using this approach consistently see review velocity increase 4–6x within 90 days." },
        { q: "What booking platforms work best for Riyadh salons?", a: "Fresha is the most popular globally and works well for Riyadh salons serving international clientele. For a majority-Saudi clientele, WhatsApp Business with a clear booking message flow often converts better because it's the communication channel they're most comfortable with. We set up and optimize whichever system fits your client profile." },
      ],
      ctaHeading: "Fill Your Appointment Book in Riyadh",
      ctaSubtitle: "Get a free salon marketing audit and discover exactly how to grow your bookings and social following in your area.",
    },
    relatedServices: [
      { label: "Meta Ads", href: "/en/services/meta-ads" },
      { label: "Google Business Profile", href: "/en/services/google-business-profile" },
      { label: "Social Media Marketing", href: "/en/services/social-media" },
    ],
    relatedDistrict: { label: "Hittin District", href: "/en/riyadh/hittin" },
    relatedServicesAr: [
      { label: "إعلانات ميتا", href: "/ar/services/meta-ads" },
      { label: "ملف النشاط التجاري", href: "/ar/services/google-business-profile" },
      { label: "تسويق السوشل ميديا", href: "/ar/services/social-media" },
    ],
    relatedDistrictAr: { label: "حي حطين", href: "/ar/riyadh/hittin" },
    ar: {
      heroTitle: "تسويق رقمي للصالونات ومراكز التجميل في الرياض",
      metaTitle: "تسويق رقمي للصالونات ومراكز التجميل في الرياض | لوكال سيتي سولوشنز",
      metaDesc: "نساعد الصالونات ومراكز التجميل في الرياض تجيب حجوزات أكثر من قوقل وإنستقرام.",
      tagline: "حجوزات أكثر. متابعين أكثر على إنستقرام. تقويم ممتلئ.",
      heroDesc: "سوق التجميل في السعودية في نمو مستمر — والمنافسة على قوقل ماب وإنستقرام ما كانت يوم أشد من الحين. الصالونات اللي تكسب تجمع بين ظهور قوي في الخريطة وحضور بصري مميز على السوشل وحجز مواعيد سلس. هذا بالضبط اللي نبنيه للصالونات ومراكز التجميل في الرياض.",
      features: [
        { icon: "📸", title: "إنستقرام والتسويق البصري", desc: "معارض قبل وبعد، تحولات ريلز، ومحتوى يوقف التمرير ويحوّل المتابعين لحجوزات." },
        { icon: "📍", title: "الترتيب في قوقل ماب", desc: "تسيطر على البحثات المحلية زي 'صالون قريب مني' و'صالون نساء في حطين' و'أفضل صالون في الرياض' — حيث تأتي غالبية الحجوزات الجديدة." },
        { icon: "📅", title: "نظام الحجز الإلكتروني", desc: "حجز مواعيد سلس عبر فريشا أو بوكسي أو واتساب بيزنس — مباشرة من ملفك على إنستقرام وقوقل وموقعك." },
        { icon: "⭐", title: "توليد التقييمات", desc: "تقييمات ٥ نجوم ثابتة على قوقل وتريتويل، مع ردود احترافية تُظهر لعملاء جدد مدى اهتمامك بكل تجربة." },
        { icon: "🌙", title: "حملات المواسم", desc: "باقات تجميل للعيد، حملات موسم الأعراس، عروض رمضان، وإطلالات اليوم الوطني — مصممة ومنفذة في التوقيت المثالي." },
        { icon: "🤳", title: "التسويق عبر المؤثرين", desc: "تعاون مع مؤثرين تجميل في الرياض لمحتوى قبل وبعد أصيل يصل لعشرات الآلاف من عملاءك المثاليين." },
      ],
      process: [
        { num: "٠١", title: "تدقيق الصالون", desc: "نقيّم ترتيبك في الخريطة، أداء إنستقرام، نظام الحجز، ملف التقييمات، وموقعك بين المنافسين في حيّك." },
        { num: "٠٢", title: "استراتيجية الهوية البصرية", desc: "نحدد جماليّات المحتوى ومحاور النشر وصوت العلامة — الأساس اللي يخلي صالونك يُعرف فوراً على السوشل." },
        { num: "٠٣", title: "ننفذ ونكبر", desc: "إنتاج محتوى، جدول نشر، تحسين ملف النشاط، إعداد الحجز، وحملات تقييمات — كل شيء يتكفل به فريقنا." },
        { num: "٠٤", title: "نوسّع ونراجع", desc: "تقارير شهرية عن الحجوزات الجديدة القادمة من الرقمي، نمو المتابعين، تحرك ترتيب الخريطة، وأداء الحملات." },
      ],
      faq: [
        { q: "الأهم للصالونات في الرياض: إنستقرام ولا قوقل ماب؟", a: "الاثنين ضروريين ولكل واحد دوره. قوقل ماب يجيب بحثات عالية النية — حد يدور على صالون قريبه الحين. إنستقرام يبني رغبة العلامة والمجتمع — حد يتابعك، يشوف تحولات حلوة مرات، ويحجز لما يكون مستعد. الصالونات اللي تقويمها ممتلئ باستمرار في الرياض تستثمر جدياً في القناتين مع بعض." },
        { q: "كيف أجيب تقييمات ٥ نجوم أكثر على قوقل لصالوني؟", a: "السر في التوقيت. أرسل رسالة واتساب مع رابط تقييمك على قوقل خلال ١ إلى ٢ ساعة بعد موعد العميل — وهو لا يزال متحمساً. اذكر اسمه وأرفق صورة إطلالته النهائية إن أمكن. الصالونات اللي تطبق هذا النهج تشهد زيادة في التقييمات من ٤ إلى ٦ أضعاف خلال ٩٠ يوماً." },
        { q: "أي منصات الحجز الأنسب للصالونات في الرياض؟", a: "فريشا هو الأشهر عالمياً ويشتغل زين للصالونات اللي تخدم عملاء دوليين. بالنسبة للعملاء السعوديين بشكل رئيسي، واتساب بيزنس مع رسالة حجز واضحة غالباً يحوّل أفضل لأنه القناة اللي هم أكثر ارتياحاً معها. نعدّ ونحسّن أي نظام يناسب شريحة عملاءك." },
      ],
      ctaHeading: "امتلأ تقويمك في الرياض",
      ctaSubtitle: "احصل على تدقيق تسويقي مجاني لصالونك واكتشف بالضبط كيف تنمّي حجوزاتك ومتابعيك في منطقتك.",
    },
  },
  {
    slug: "real-estate",
    icon: "🏠",
    name: "Real Estate",
    nameAr: "شركات العقارات",
    en: {
      metaTitle: "Digital Marketing for Real Estate in Riyadh | Local City Solutions",
      metaDesc: "Digital marketing for real estate companies in Riyadh. Property listing SEO, Google Ads for developers, virtual tours, Aqar.fm optimization, and lead generation under Vision 2030.",
      tagline: "More leads. More listings. More closings in Riyadh's booming market.",
      heroDesc: "Riyadh's real estate market is expanding at historic rates under Vision 2030 — new developments, rising demand, and an increasingly sophisticated buyer. We help real estate companies, developers, and agents capture buyers and investors at every stage of the search journey, from first Google search to signed contract.",
      features: [
        { icon: "🔍", title: "Property Listing SEO", desc: "Optimize property listings and development pages to rank for high-intent searches like 'apartments for sale in KAFD', 'villas in Al Narjis', and 'off-plan projects Riyadh'." },
        { icon: "📢", title: "Google Ads for Real Estate", desc: "Precision lead generation campaigns targeting serious buyers and investors searching for properties in specific Riyadh districts and price brackets." },
        { icon: "🎬", title: "Virtual Tours & Video Marketing", desc: "360° virtual tours, drone footage, and project showcase videos that sell the lifestyle before buyers visit in person." },
        { icon: "🏢", title: "Developer Project Launches", desc: "Full-funnel digital campaigns for new development launches — from awareness and interest generation to qualified lead capture and handover to sales teams." },
        { icon: "🔑", title: "Aqar.fm & Portal Optimization", desc: "Optimized listings on Aqar.fm, Bayut, and other Saudi property portals to maximize visibility and lead volume from portal traffic." },
        { icon: "📍", title: "GBP for Real Estate Offices", desc: "Google Business Profile optimization for agency offices and developer showrooms to capture walk-in and call traffic from local searches." },
      ],
      process: [
        { num: "01", title: "Market Analysis", desc: "Assess the competitive landscape for your property types, districts, and price points — identifying the highest-ROI digital channels for your inventory." },
        { num: "02", title: "Lead Generation Setup", desc: "Build landing pages, configure Google Ads campaigns, and create lead capture flows designed specifically for property buyers." },
        { num: "03", title: "Launch & Qualify", desc: "Go live across all channels with lead qualification criteria built in — so your sales team only speaks to serious buyers and investors." },
        { num: "04", title: "Optimize for Cost Per Lead", desc: "Continuous campaign optimization to reduce cost per qualified lead and increase the volume of sales-ready prospects." },
      ],
      faq: [
        { q: "What digital channels work best for real estate lead generation in Riyadh?", a: "Google Ads is the highest-intent channel — buyers actively searching for property right now. Meta Ads (Instagram/Facebook) works exceptionally well for off-plan and luxury projects where you're selling lifestyle and aspiration. For residential resale, strong Aqar.fm listings combined with GBP for your office consistently deliver high-quality local leads. The best results come from running all three simultaneously." },
        { q: "How do I market a new development launch in Riyadh?", a: "A successful launch requires a phased approach: 6–8 weeks pre-launch to build awareness and interest (Instagram content, teaser ads, landing page), a launch week push (Google Ads, Meta Ads, email/WhatsApp to captured leads), then sustained post-launch campaigns to keep the pipeline full. We manage this entire cycle for developer clients and consistently deliver oversubscribed launches." },
        { q: "Is Aqar.fm or Google Ads better for property leads in Saudi Arabia?", a: "They serve different intent levels. Aqar.fm attracts buyers already deep in their property search — high intent, close to decision. Google Ads captures buyers earlier in the journey and allows much more precise targeting by district, property type, and budget range. Meta Ads works best for building brand awareness and capturing early-stage interest. For maximum lead volume, use all three and let data tell you which channel delivers the best cost per qualified lead for your specific property type." },
      ],
      ctaHeading: "Capture More Real Estate Leads in Riyadh",
      ctaSubtitle: "Get a free real estate marketing audit and discover the fastest path to more qualified buyers for your properties.",
    },
    relatedServices: [
      { label: "Google Ads", href: "/en/services/google-ads" },
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Web Design", href: "/en/services/web-design" },
    ],
    relatedDistrict: { label: "KAFD District", href: "/en/riyadh/kafd" },
    relatedServicesAr: [
      { label: "إعلانات قوقل", href: "/ar/services/google-ads" },
      { label: "خدمات SEO", href: "/ar/services/seo" },
      { label: "تصميم مواقع", href: "/ar/services/web-design" },
    ],
    relatedDistrictAr: { label: "حي كافد", href: "/ar/riyadh/kafd" },
    ar: {
      heroTitle: "تسويق رقمي لشركات العقارات في الرياض",
      metaTitle: "تسويق رقمي للعقارات في الرياض | لوكال سيتي سولوشنز",
      metaDesc: "نساعد شركات العقارات والمطورين في الرياض يجيبون عملاء من قوقل وإعلانات رقمية.",
      tagline: "عملاء أكثر. قوائم أكثر. صفقات أكثر في سوق الرياض المتنامي.",
      heroDesc: "سوق العقارات في الرياض ينمو بمعدلات تاريخية في ظل رؤية ٢٠٣٠ — مشاريع جديدة، طلب متصاعد، ومشترٍ أكثر وعياً من أي وقت مضى. نساعد شركات العقارات والمطورين والوسطاء يلتقطون المشترين والمستثمرين في كل مرحلة من رحلة البحث، من أول بحث على قوقل وحتى توقيع العقد.",
      features: [
        { icon: "🔍", title: "SEO قوائم العقارات", desc: "نحسّن صفحات المشاريع والقوائم العقارية لتتصدر بحثات عالية النية زي 'شقق للبيع في كافد' و'فلل في النرجس' و'مشاريع على الخارطة الرياض'." },
        { icon: "📢", title: "إعلانات قوقل للعقارات", desc: "حملات توليد عملاء دقيقة تستهدف مشترين ومستثمرين جادين يبحثون عن عقارات في أحياء الرياض وشرائح الأسعار المحددة." },
        { icon: "🎬", title: "جولات افتراضية وتسويق فيديو", desc: "جولات ٣٦٠°، لقطات درون، وفيديوهات عرض مشاريع تبيع أسلوب الحياة قبل أن يزور المشتري بنفسه." },
        { icon: "🏢", title: "إطلاق مشاريع المطورين", desc: "حملات رقمية كاملة لإطلاق مشاريع جديدة — من بناء الوعي وتوليد الاهتمام وحتى التقاط العملاء المؤهلين وتسليمهم لفريق المبيعات." },
        { icon: "🔑", title: "تحسين عقار.fm والمنصات العقارية", desc: "قوائم محسّنة على عقار.fm وبيوت وغيرها من المنصات السعودية لتعظيم الظهور وحجم العملاء من زيارات المنصات." },
        { icon: "📍", title: "ملف النشاط لمكاتب العقارات", desc: "تحسين ملف قوقل للنشاط التجاري لكل مكتب ومعرض لالتقاط المكالمات والزيارات من البحثات المحلية." },
      ],
      process: [
        { num: "٠١", title: "تحليل السوق", desc: "نقيّم المشهد التنافسي لأنواع عقاراتك وأحياءها وشرائح أسعارها — ونحدد القنوات الرقمية الأعلى عائداً لمخزونك." },
        { num: "٠٢", title: "إعداد منظومة العملاء", desc: "نبني صفحات هبوط، نجهّز حملات إعلانات قوقل، وننشئ مسارات التقاط عملاء مصممة خصيصاً لمشتري العقارات." },
        { num: "٠٣", title: "نطلق ونؤهّل", desc: "نطلق على كل القنوات مع معايير تأهيل العملاء مبنية بداخلها — حتى يتحدث فريق مبيعاتك مع مشترين ومستثمرين جادين فقط." },
        { num: "٠٤", title: "نحسّن تكلفة العميل", desc: "تحسين مستمر للحملات لخفض تكلفة العميل المؤهل وزيادة حجم العملاء الجاهزين للبيع." },
      ],
      faq: [
        { q: "أي القنوات الرقمية الأفضل لتوليد عملاء العقارات في الرياض؟", a: "إعلانات قوقل هي القناة الأعلى نية — مشترون يبحثون نشيطاً عن عقار الآن. إعلانات ميتا تشتغل ممتاز لمشاريع على الخارطة والفاخرة حيث تبيع أسلوب حياة وطموح. للإسكان التجاري، قوائم عقار.fm القوية مع ملف النشاط لمكتبك تجلب باستمرار عملاء محليين عالي الجودة. أفضل النتائج تأتي من تشغيل الثلاثة في آن واحد." },
        { q: "كيف أسوّق مشروعاً عقارياً جديداً في الرياض؟", a: "إطلاق ناجح يحتاج نهجاً متدرجاً: ٦ إلى ٨ أسابيع قبل الإطلاق لبناء الوعي والاهتمام (محتوى إنستقرام، إعلانات تشويقية، صفحة هبوط)، ثم دفعة أسبوع الإطلاق (إعلانات قوقل وميتا، إيميل وواتساب للعملاء الملتقطين)، ثم حملات مستدامة بعد الإطلاق لإبقاء خط الأنابيب ممتلئاً. ندير هذه الدورة كاملة لعملاء المطورين." },
        { q: "عقار.fm أفضل ولا إعلانات قوقل لعملاء العقارات في السعودية؟", a: "كل واحد يخدم مستوى نية مختلفاً. عقار.fm يجذب مشترين في عمق رحلة البحث العقاري — نية عالية وقرب من القرار. إعلانات قوقل تلتقط مشترين في مرحلة أبكر وتتيح استهدافاً أدق جداً بالحي ونوع العقار وشريحة الميزانية. إعلانات ميتا تشتغل أفضل لبناء الوعي والتقاط الاهتمام المبكر. للحصول على أقصى حجم عملاء، استخدم الثلاثة ودع البيانات تخبرك أي قناة تعطيك أفضل تكلفة عميل مؤهل لنوع عقارك." },
      ],
      ctaHeading: "التقط عملاء عقارات أكثر في الرياض",
      ctaSubtitle: "احصل على تدقيق تسويقي مجاني واكتشف أسرع طريق لمشترين أكثر لعقاراتك في الرياض.",
    },
  },
  {
    slug: "retail",
    icon: "🛍️",
    name: "Retail & E-Commerce",
    nameAr: "التجزئة والتجارة الإلكترونية",
    en: {
      metaTitle: "Digital Marketing for Retail & E-Commerce in Riyadh | Local City Solutions",
      metaDesc: "Digital marketing for retail stores and e-commerce businesses in Riyadh. Product SEO, Google Shopping, Salla and Zid optimization, Meta Ads, and marketplace growth strategies.",
      tagline: "More traffic. More sales. Lower cost per acquisition.",
      heroDesc: "Saudi e-commerce is growing at one of the fastest rates globally — but competition on Google, Instagram, and marketplaces is intensifying just as fast. We help retail stores and online shops cut through the noise, drive qualified traffic, and convert browsers into buyers at scale.",
      features: [
        { icon: "🔍", title: "Product & Category SEO", desc: "Rank on page one for high-commercial-intent searches — from 'buy running shoes Riyadh' to broad category terms driving thousands of monthly searches." },
        { icon: "🛒", title: "Google Shopping Campaigns", desc: "Product listing ads that appear at the top of search results with your price, photo, and store name — capturing buyers at the exact moment of purchase intent." },
        { icon: "🏪", title: "Salla & Zid Optimization", desc: "Full store optimization on Saudi-native platforms including product descriptions, category structure, conversion rate improvements, and SEO configuration." },
        { icon: "📢", title: "Meta Ads for Retail", desc: "Product catalogue ads, retargeting campaigns, and lookalike audiences on Instagram and Facebook to bring back visitors who didn't buy and find new ones who will." },
        { icon: "📦", title: "Marketplace Growth", desc: "Optimization and advertising strategies for Amazon.sa, Noon, and other Saudi marketplaces to maximize product visibility and sales velocity." },
        { icon: "📊", title: "Conversion Rate Optimization", desc: "Data-driven improvements to product pages, checkout flow, and site speed to convert more of your existing traffic without increasing ad spend." },
      ],
      process: [
        { num: "01", title: "Store Audit", desc: "Assess your current SEO, ad performance, store conversion rate, and competitor positioning across search, social, and marketplaces." },
        { num: "02", title: "Channel Strategy", desc: "Identify your highest-ROI channels based on your product category, average order value, and target customer — then prioritize accordingly." },
        { num: "03", title: "Launch & Optimize", desc: "SEO implementation, ad campaigns live, marketplace listings optimized — all within the first 30 days." },
        { num: "04", title: "Scale What Works", desc: "Monthly reporting on revenue by channel, ROAS, and cost per acquisition — scaling budget toward what drives the strongest returns." },
      ],
      faq: [
        { q: "Should I focus on SEO or paid ads for my online store?", a: "It depends on your timeline and budget. Google Ads and Meta Ads deliver traffic immediately but stop the moment you stop paying. SEO takes 3–6 months to build momentum but delivers compounding, low-cost traffic permanently. For most retail businesses, the right answer is both: paid ads fund immediate sales while SEO builds a long-term traffic asset. We help you allocate budget across both channels based on your specific product economics." },
        { q: "Is Salla or a custom website better for selling in Saudi Arabia?", a: "Salla and Zid have significant advantages for Saudi-focused sellers: Arabic-first design, local payment gateway integrations (Mada, STC Pay, Tabby), and a familiar checkout experience for Saudi shoppers. Custom websites offer more flexibility but require more investment to match that functionality. For most SME retailers, we recommend starting on Salla or Zid and migrating to a custom solution when revenue justifies it." },
        { q: "How do I compete with large retailers on Google Shopping?", a: "You don't need to out-spend large retailers — you need to out-target them. Large retailers run broad campaigns. The opportunity is in specific product searches, niche categories, and long-tail keywords where big players under-invest. We identify these gaps, build tightly structured Shopping campaigns around them, and continuously optimize your product data feed to improve quality scores and reduce cost per click." },
      ],
      ctaHeading: "Grow Your Retail Sales in Saudi Arabia",
      ctaSubtitle: "Get a free e-commerce audit and discover the fastest path to more traffic, better conversion rates, and higher revenue.",
    },
    relatedServices: [
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Google Ads", href: "/en/services/google-ads" },
      { label: "Meta Ads", href: "/en/services/meta-ads" },
    ],
    relatedDistrict: { label: "Al Sulaimaniyah District", href: "/en/riyadh/al-sulaimaniyah" },
    relatedServicesAr: [
      { label: "إعلانات قوقل", href: "/ar/services/google-ads" },
      { label: "تصميم مواقع", href: "/ar/services/web-design" },
      { label: "خدمات SEO", href: "/ar/services/seo" },
    ],
    relatedDistrictAr: { label: "حي العليا", href: "/ar/riyadh/al-olaya" },
    ar: {
      heroTitle: "تسويق رقمي لقطاع التجزئة والتجارة الإلكترونية في الرياض",
      metaTitle: "تسويق رقمي لقطاع التجزئة والتجارة الإلكترونية في الرياض | لوكال سيتي سولوشنز",
      metaDesc: "نساعد متاجر التجزئة والمتاجر الإلكترونية في الرياض تزيد مبيعاتها أونلاين.",
      tagline: "زيارات أكثر. مبيعات أكثر. تكلفة اكتساب أقل.",
      heroDesc: "التجارة الإلكترونية في السعودية تنمو بأسرع معدل في المنطقة — لكن المنافسة على قوقل وإنستقرام وسناب شات والمنصات الإلكترونية تشتد بنفس السرعة. نساعد محلات التجزئة والمتاجر الإلكترونية يخترقون الضجيج، يجذبون زيارات مؤهلة، ويحوّلون المتصفحين لمشترين بشكل منتظم.",
      features: [
        { icon: "🔍", title: "SEO المنتجات والفئات", desc: "تتصدر الصفحة الأولى لبحثات ذات نية شراء عالية — من 'اشتري حذاء رياضي الرياض' وحتى كلمات فئات عريضة تجذب آلاف الزيارات شهرياً." },
        { icon: "🛒", title: "إعلانات التسوق من قوقل", desc: "إعلانات قوائم المنتجات اللي تظهر في أعلى نتائج البحث بسعرك وصورتك واسم متجرك — تلتقط المشترين في لحظة نية الشراء بالضبط." },
        { icon: "🏪", title: "تحسين متجر سلة وزد", desc: "تحسين شامل للمتجر على المنصات السعودية الأصيلة — وصف المنتجات، هيكل الفئات، تحسين معدل التحويل، وإعداد SEO." },
        { icon: "📢", title: "إعلانات ميتا وسناب شات للتجزئة", desc: "إعلانات كتالوج المنتجات، حملات ريتارجيتينج، وجماهير مشابهة على إنستقرام وسناب شات لاسترداد من لم يشترِ وإيجاد عملاء جدد." },
        { icon: "📦", title: "النمو في الأسواق الإلكترونية", desc: "استراتيجيات تحسين وإعلان على أمازون السعودية ونون وغيرها من المنصات السعودية لتعظيم ظهور المنتج وسرعة المبيعات." },
        { icon: "📊", title: "تحسين معدل التحويل", desc: "تحسينات مبنية على البيانات لصفحات المنتجات وسير الدفع وسرعة الموقع لتحويل أكثر من زياراتك الحالية بدون رفع ميزانية الإعلانات." },
      ],
      process: [
        { num: "٠١", title: "تدقيق المتجر", desc: "نقيّم وضعك الحالي في SEO، أداء الإعلانات، معدل تحويل المتجر، وموقعك بين المنافسين عبر البحث والسوشل والمنصات." },
        { num: "٠٢", title: "استراتيجية القنوات", desc: "نحدد قنواتك الأعلى عائداً بناءً على فئة منتجك ومتوسط قيمة الطلب وشريحة عملاءك — ثم نضع الأولويات." },
        { num: "٠٣", title: "نطلق ونحسّن", desc: "تطبيق SEO، إطلاق حملات الإعلانات، تحسين قوائم المنصات — كل شيء خلال أول ٣٠ يوم." },
        { num: "٠٤", title: "نوسّع ما يشتغل", desc: "تقارير شهرية عن الإيراد بالقناة، عائد الإنفاق الإعلاني، وتكلفة الاكتساب — مع توجيه الميزانية نحو ما يعطي أفضل نتيجة." },
      ],
      faq: [
        { q: "أركز على SEO ولا الإعلانات المدفوعة لمتجري الإلكتروني؟", a: "يعتمد على جدولك الزمني وميزانيتك. إعلانات قوقل وميتا تجلب زيارات فوراً لكنها تتوقف لما تتوقف عن الدفع. SEO يحتاج ٣ إلى ٦ أشهر لبناء الزخم لكنه يجلب زيارات رخيصة ومتراكمة باستمرار. لغالبية أعمال التجزئة، الجواب الصح هو الاثنين: الإعلانات المدفوعة تموّل المبيعات الحالية بينما SEO يبني أصلاً من الزيارات على المدى البعيد." },
        { q: "سلة أفضل ولا موقع مخصص للبيع في السعودية؟", a: "سلة وزد عندهم مزايا واضحة للبائعين المركّزين على السوق السعودي: تصميم عربي أولاً، تكامل مع بوابات دفع محلية (مدى، STC Pay، تابي)، وتجربة دفع مألوفة للمتسوق السعودي. المواقع المخصصة تعطي مرونة أكبر لكنها تحتاج استثماراً أكبر لمطابقة هذه المزايا. لغالبية المتاجر الصغيرة والمتوسطة، ابدأ بسلة أو زد وانتقل لحل مخصص لما تبرر الإيرادات الخطوة." },
        { q: "كيف أنافس كبار المتاجر في إعلانات التسوق من قوقل؟", a: "ما تحتاج تصرف أكثر منهم — تحتاج تستهدف أذكى منهم. كبار المتاجر يشغّلون حملات واسعة. الفرصة في بحثات منتجات محددة وفئات متخصصة وكلمات طويلة الذيل يقل فيها استثمار اللاعبين الكبار. نحدد هذه الفجوات، نبني حملات شوبينج محكمة الهيكل حولها، ونحسّن باستمرار بيانات موجز المنتجات لرفع نقاط الجودة وتقليل تكلفة النقر." },
      ],
      ctaHeading: "زِد مبيعاتك في السوق السعودي",
      ctaSubtitle: "احصل على تدقيق مجاني لمتجرك واكتشف أسرع طريق لزيارات أكثر ومعدل تحويل أعلى وإيراد أكبر.",
    },
  },
  {
    slug: "education",
    icon: "🎓",
    name: "Education & Training",
    nameAr: "التعليم والتدريب",
    en: {
      metaTitle: "Digital Marketing for Education & Training in Riyadh | Local City Solutions",
      metaDesc: "Digital marketing for schools, training centers, and educational institutions in Riyadh. Enrollment campaigns, course marketing, LinkedIn ads, and SEO for education providers.",
      tagline: "More enrollments. Stronger reputation. A full intake every cohort.",
      heroDesc: "Saudi Arabia's education and training sector is expanding rapidly under Vision 2030's workforce development agenda. Whether you run a private school, a professional training center, or an online course platform, digital marketing is the primary driver of enrollment growth — and the gap between institutions that have cracked it and those that haven't is widening fast.",
      features: [
        { icon: "🔍", title: "Education SEO", desc: "Rank on page one for searches like 'best private school Riyadh', 'PMP training Saudi Arabia', and 'IELTS course Riyadh' — capturing prospective students actively researching options." },
        { icon: "📢", title: "Enrollment Campaigns", desc: "Targeted Google Ads and Meta Ads campaigns timed to enrollment cycles — driving applications and inquiries during the highest-intent windows of the year." },
        { icon: "💼", title: "LinkedIn Ads for Professional Training", desc: "Reach working professionals by job title, seniority, and industry — ideal for MBA programs, leadership training, certifications, and corporate upskilling courses." },
        { icon: "⭐", title: "Reputation & Reviews", desc: "Build a strong Google review presence for your institution. Parents, students, and corporate clients all research reviews before choosing an education provider." },
        { icon: "📱", title: "Social Media for Education", desc: "Showcase student success stories, faculty expertise, campus life, and course outcomes — building institutional credibility across Instagram and LinkedIn." },
        { icon: "📍", title: "Local SEO for Campuses", desc: "Google Business Profile optimization for every campus location — critical for schools and training centers capturing 'near me' search traffic." },
      ],
      process: [
        { num: "01", title: "Institution Audit", desc: "Assess your current enrollment funnel, search visibility, competitor positioning, and where prospective students drop off before applying." },
        { num: "02", title: "Enrollment Funnel Design", desc: "Map the full journey from first search to submitted application — then optimize every touchpoint to reduce friction and improve conversion." },
        { num: "03", title: "Campaign Launch", desc: "SEO implementation, ad campaigns live, social content calendar in motion — timed to your intake schedule for maximum impact." },
        { num: "04", title: "Intake Reporting", desc: "Post-intake analysis of inquiries, applications, and enrolled students by channel — so you invest more in what drives the best cohorts." },
      ],
      faq: [
        { q: "What digital channels work best for student enrollment in Saudi Arabia?", a: "Google Search Ads capture the highest-intent prospects — those actively searching for a program like yours right now. Meta Ads (Instagram/Facebook) works well for awareness and retargeting. LinkedIn is particularly powerful for professional development, executive education, and B2B courses sold to HR departments. Most education clients see the best results running Google and Meta together, adding LinkedIn when the course is clearly professional in nature." },
        { q: "When should I run enrollment campaigns?", a: "Timing is critical in education. The highest-intent windows are 6–8 weeks before each intake deadline. For schools, this means August–September for the academic year and November–December for mid-year intake. For training centers, campaigns should be running continuously with budget increases timed to intake deadlines. We build your campaign calendar around your specific intake schedule." },
        { q: "How important are Google reviews for schools and training centers?", a: "Extremely important. Parents researching schools and professionals evaluating training centers both read reviews extensively before making a decision. A 4.8-star rating with 100+ reviews vs. a 4.1-star rating with 12 reviews will determine who gets the inquiry in most cases. We implement systematic review generation programs that consistently produce authentic, positive reviews from satisfied students and parents." },
      ],
      ctaHeading: "Fill Your Next Intake in Riyadh",
      ctaSubtitle: "Get a free education marketing audit and discover the fastest path to more enrollments for your institution.",
    },
    relatedServices: [
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Google Ads", href: "/en/services/google-ads" },
      { label: "Meta Ads", href: "/en/services/meta-ads" },
    ],
    relatedDistrict: { label: "Al Yasmin District", href: "/en/riyadh/al-yasmin" },
    relatedServicesAr: [
      { label: "إعلانات قوقل", href: "/ar/services/google-ads" },
      { label: "خدمات SEO", href: "/ar/services/seo" },
      { label: "تسويق السوشل ميديا", href: "/ar/services/social-media" },
    ],
    relatedDistrictAr: { label: "حي الياسمين", href: "/ar/riyadh/al-yasmin" },
    ar: {
      heroTitle: "تسويق رقمي للمدارس ومراكز التدريب في الرياض",
      metaTitle: "تسويق رقمي للتعليم والتدريب في الرياض | لوكال سيتي سولوشنز",
      metaDesc: "نساعد المدارس ومراكز التدريب في الرياض تجيب طلاب ومتدربين أكثر عبر التسويق الرقمي.",
      tagline: "تسجيلات أكثر. سمعة أقوى. دورة مكتملة في كل دفعة.",
      heroDesc: "قطاع التعليم والتدريب في السعودية ينمو بسرعة في ظل أجندة تطوير القوى العاملة لرؤية ٢٠٣٠. سواء كنت تدير مدرسة خاصة أو مركز تدريب مهني أو منصة دورات أونلاين، التسويق الرقمي هو المحرك الرئيسي لنمو التسجيلات — والفجوة بين المؤسسات اللي أتقنته واللي لم تتقنه تتسع بسرعة.",
      features: [
        { icon: "🔍", title: "SEO للتعليم", desc: "تتصدر الصفحة الأولى لبحثات زي 'أفضل مدرسة خاصة الرياض' و'تدريب PMP السعودية' و'دورة IELTS الرياض' — تلتقط الطلاب المحتملين وهم يبحثون نشيطاً." },
        { icon: "📢", title: "حملات التسجيل", desc: "حملات إعلانات قوقل وميتا مضبوطة على دورات التسجيل — تجلب طلبات واستفسارات في أعلى نوافذ النية خلال السنة." },
        { icon: "💼", title: "إعلانات لينكدإن للتدريب المهني", desc: "تصل للمهنيين العاملين حسب المسمى الوظيفي والخبرة والصناعة — مثالي لبرامج الماجستير وتدريب القيادات والشهادات ودورات التطوير المهني." },
        { icon: "⭐", title: "السمعة والتقييمات", desc: "ابنِ حضور قوي من تقييمات قوقل لمؤسستك. أولياء الأمور والطلاب والعملاء من الشركات كلهم يبحثون في التقييمات قبل اختيار مزود التعليم." },
        { icon: "📱", title: "السوشل ميديا للتعليم", desc: "اعرض قصص نجاح الطلاب وخبرات المدرسين والحياة الجامعية ونتائج الدورات — تبني مصداقية مؤسسية عبر إنستقرام ولينكدإن." },
        { icon: "📍", title: "SEO محلي للحرم الجامعي", desc: "تحسين ملف النشاط التجاري على قوقل لكل موقع — ضروري للمدارس ومراكز التدريب اللي تريد التقاط زيارات البحث 'القريب مني'." },
      ],
      process: [
        { num: "٠١", title: "تدقيق المؤسسة", desc: "نقيّم وضع قمع التسجيل الحالي، الظهور في البحث، موقعك بين المنافسين، وأين يتراجع الطلاب المحتملون قبل التقديم." },
        { num: "٠٢", title: "تصميم مسار التسجيل", desc: "نرسم الرحلة كاملة من أول بحث حتى طلب التسجيل — ثم نحسّن كل نقطة تماس لتقليل الاحتكاك ورفع التحويل." },
        { num: "٠٣", title: "إطلاق الحملات", desc: "تطبيق SEO، إطلاق حملات الإعلانات، تقويم محتوى السوشل — مضبوط على جدول القبول لديك لأقصى أثر." },
        { num: "٠٤", title: "تقارير دورة القبول", desc: "تحليل ما بعد القبول للاستفسارات والطلبات والطلاب الملتحقين بالقناة — حتى تستثمر أكثر في ما يجلب أفضل الدفعات." },
      ],
      faq: [
        { q: "أي القنوات الرقمية الأفضل لتسجيل الطلاب في السعودية؟", a: "إعلانات البحث على قوقل تلتقط أعلى نية — من يبحث نشيطاً عن برنامج مثل برنامجك الآن. إعلانات ميتا تشتغل زين للوعي والريتارجيتينج. لينكدإن قوي بشكل خاص للتطوير المهني والتعليم التنفيذي والدورات المباعة لأقسام HR. معظم عملاء التعليم يحققون أفضل النتائج بتشغيل قوقل وميتا معاً، مضيفين لينكدإن عندما تكون الدورة مهنية الطابع بوضوح." },
        { q: "متى أشغّل حملات التسجيل؟", a: "التوقيت حاسم في التعليم. أعلى نوافذ النية هي ٦ إلى ٨ أسابيع قبل كل موعد نهائي للقبول. للمدارس، هذا يعني أغسطس وسبتمبر للعام الدراسي ونوفمبر وديسمبر للقبول منتصف العام. لمراكز التدريب، يجب أن تكون الحملات تعمل باستمرار مع زيادة الميزانية قرب مواعيد القبول. نبني تقويم حملتك حول جدول القبول الخاص بك." },
        { q: "قد إيش تقييمات قوقل مهمة للمدارس ومراكز التدريب؟", a: "مهمة جداً. أولياء الأمور اللي يبحثون عن مدارس والمهنيون اللي يقيّمون مراكز التدريب يقرؤون التقييمات بشكل مستفيض قبل اتخاذ القرار. تقييم ٤.٨ نجوم بمئة+ تقييم مقابل ٤.١ نجوم باثني عشر تقييماً سيحدد من يأخذ الاستفسار في معظم الحالات. نطبق برامج توليد تقييمات منهجية تنتج باستمرار تقييمات أصيلة وإيجابية من طلاب وأولياء أمور راضين." },
      ],
      ctaHeading: "امتلأت دفعتك القادمة في الرياض",
      ctaSubtitle: "احصل على تدقيق تسويقي مجاني لمؤسستك واكتشف أسرع طريق لتسجيلات أكثر.",
    },
  },
  {
    slug: "automotive",
    icon: "🚗",
    name: "Automotive",
    nameAr: "قطاع السيارات",
    en: {
      metaTitle: "Digital Marketing for Automotive Businesses in Riyadh | Local City Solutions",
      metaDesc: "Digital marketing for car dealerships, auto service centers, and automotive businesses in Riyadh. Google Ads, showroom traffic, used car marketplace optimization, and local SEO.",
      tagline: "More showroom visits. More service bookings. More units sold.",
      heroDesc: "Riyadh's automotive market is one of the largest in the region — and buyers do almost all their research online before setting foot in a showroom. Whether you sell new cars, pre-owned vehicles, or run a service center, your digital presence determines how many serious buyers walk through your door versus your competitor's.",
      features: [
        { icon: "📢", title: "Google Ads for Automotive", desc: "High-intent campaigns targeting buyers searching for specific makes, models, and price ranges — appearing at the top of results at the exact moment of purchase decision." },
        { icon: "🔍", title: "Showroom & Dealership SEO", desc: "Rank on page one for 'Toyota dealer Riyadh', 'used cars Al Olaya', and service-specific searches that bring in ready-to-buy customers." },
        { icon: "🚙", title: "Used Car Marketplace Optimization", desc: "Optimized listings on Syarah, Haraj, and other Saudi automotive platforms — better photos, keyword-rich descriptions, and competitive pricing insights." },
        { icon: "📍", title: "Google Business Profile for Showrooms", desc: "Fully optimized GBP for every showroom and service center location — capturing walk-in traffic and calls from local searches." },
        { icon: "🎬", title: "Vehicle Video Marketing", desc: "Walkaround videos, feature highlights, and test drive content that sell the car before the customer visits — reducing time-on-lot and accelerating decisions." },
        { icon: "⚙️", title: "Service Center Marketing", desc: "Targeted campaigns for oil changes, tyre services, periodic maintenance, and repairs — filling your service bays with the right customers at consistent volume." },
      ],
      process: [
        { num: "01", title: "Market Analysis", desc: "Assess your current search rankings, GBP quality, marketplace presence, and competitor digital spend in your make/model categories." },
        { num: "02", title: "Lead Generation Setup", desc: "Configure Google Ads campaigns, optimize GBP listings, and build landing pages designed specifically for automotive buyer psychology." },
        { num: "03", title: "Launch Campaigns", desc: "Go live across search, display, and video — with lead forms connected directly to your sales team for immediate follow-up." },
        { num: "04", title: "Optimize Cost Per Lead", desc: "Monthly optimization to reduce cost per qualified lead, improve ad quality scores, and scale the campaigns delivering the best showroom-to-sale conversion." },
      ],
      faq: [
        { q: "How do car buyers in Saudi Arabia research vehicles online?", a: "Saudi car buyers typically start with a broad Google search for makes and models, then move to YouTube for walkaround and review videos, then check Syarah or Haraj for pre-owned pricing, then visit dealership websites or Google Maps listings to find their nearest showroom. Being visible at every stage of this journey — search, video, and Maps — is what separates dealerships that dominate their market from those that rely on walk-ins alone." },
        { q: "What's more effective for a car dealership — SEO or Google Ads?", a: "For immediate traffic and test drive bookings, Google Ads is faster. For long-term, low-cost traffic at scale, SEO is essential — particularly for model-specific and 'near me' searches. Most dealerships see the best results running Google Ads immediately while building organic rankings in parallel. When SEO kicks in at months 4–6, total cost per lead drops significantly as organic traffic supplements paid." },
        { q: "Can digital marketing help fill my service center, not just sell cars?", a: "Absolutely. Service center marketing is one of the highest-ROI applications of local digital marketing. Customers searching 'oil change near me', 'tyre shop Riyadh', or 'car AC repair Al Malqa' are ready to book immediately. A well-optimized GBP listing combined with targeted Google Ads for service-specific keywords consistently delivers a full service bay schedule at low cost per booking." },
      ],
      ctaHeading: "Drive More Sales for Your Automotive Business",
      ctaSubtitle: "Get a free automotive marketing audit and discover how to bring more serious buyers to your showroom or service center.",
    },
    relatedServices: [
      { label: "Google Ads", href: "/en/services/google-ads" },
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Google Business Profile", href: "/en/services/google-business-profile" },
    ],
    relatedDistrict: { label: "Al Rawdah District", href: "/en/riyadh/al-rawdah" },
    relatedServicesAr: [
      { label: "ملف النشاط التجاري", href: "/ar/services/google-business-profile" },
      { label: "إعلانات قوقل", href: "/ar/services/google-ads" },
      { label: "خدمات SEO", href: "/ar/services/seo" },
    ],
    relatedDistrictAr: { label: "حي الشفا", href: "/ar/riyadh/al-shifa" },
    ar: {
      heroTitle: "تسويق رقمي لقطاع السيارات في الرياض",
      metaTitle: "تسويق رقمي لقطاع السيارات في الرياض | لوكال سيتي سولوشنز",
      metaDesc: "نساعد ورش السيارات والمعارض ومحلات قطع الغيار في الرياض يظهرون في قوقل ويجيبون عملاء.",
      tagline: "زيارات أكثر للمعرض. حجوزات ورشة أكثر. مبيعات أكثر.",
      heroDesc: "سوق السيارات في الرياض من الأضخم في المنطقة — والمشترون يجرون تقريباً كل أبحاثهم أونلاين قبل ما يدخلون أي معرض. سواء كنت تبيع سيارات جديدة أو مستعملة أو تدير ورشة صيانة، وجودك الرقمي هو اللي يحدد كم مشترٍ جاد يدخل معرضك بدل معرض منافسك.",
      features: [
        { icon: "📢", title: "إعلانات قوقل للسيارات", desc: "حملات عالية النية تستهدف المشترين اللي يبحثون عن ماركات وموديلات وفئات أسعار محددة — تظهر في أعلى النتائج في لحظة قرار الشراء بالضبط." },
        { icon: "🔍", title: "SEO المعارض وقطع الغيار", desc: "تتصدر الصفحة الأولى لـ'معرض تويوتا الرياض' و'سيارات مستعملة العليا' وكل بحث خاص بورشة صيانة يجيب عملاء جاهزين للشراء." },
        { icon: "🚙", title: "تحسين منصات السيارات المستعملة", desc: "قوائم محسّنة على سيارة وحراج وغيرها من منصات السيارات السعودية — صور أفضل، وصف بكلمات صح، وتحليل تنافسي للأسعار." },
        { icon: "📍", title: "ملف النشاط التجاري للمعارض", desc: "ملف قوقل محسّن بالكامل لكل معرض وورشة صيانة — يلتقط زيارات المشي والمكالمات من البحثات المحلية." },
        { icon: "🎬", title: "تسويق فيديو السيارات", desc: "فيديوهات جولة حول السيارة وأبرز المزايا ومحتوى التجربة اللي تبيع السيارة قبل ما يزور العميل — تقصّر وقت التردد وتسرّع القرار." },
        { icon: "⚙️", title: "تسويق الورش والخدمات", desc: "حملات مستهدفة لتغيير الزيت وخدمات الإطارات والصيانة الدورية والإصلاحات — تملأ ورشتك بالعملاء المناسبين بحجم ثابت." },
      ],
      process: [
        { num: "٠١", title: "تحليل السوق", desc: "نقيّم ترتيبك الحالي في البحث، جودة ملف النشاط، حضورك في المنصات، والإنفاق الرقمي للمنافسين في فئات ماركاتك وموديلاتك." },
        { num: "٠٢", title: "إعداد توليد العملاء", desc: "نجهّز حملات إعلانات قوقل، نحسّن قوائم ملف النشاط، وننشئ صفحات هبوط مصممة خصيصاً لسلوك مشتري السيارات." },
        { num: "٠٣", title: "إطلاق الحملات", desc: "نطلق على البحث والعرض والفيديو — مع نماذج عملاء مربوطة مباشرة بفريق مبيعاتك للمتابعة الفورية." },
        { num: "٠٤", title: "تحسين تكلفة العميل", desc: "تحسين شهري لتقليل تكلفة العميل المؤهل، رفع نقاط جودة الإعلانات، وتوسيع الحملات اللي تحقق أفضل تحويل من المعرض للبيعة." },
      ],
      faq: [
        { q: "كيف يبحث المشترون في السعودية عن السيارات أونلاين؟", a: "مشتري السيارات في السعودية يبدؤون عادةً ببحث عام على قوقل عن الماركات والموديلات، ثم ينتقلون ليوتيوب لمشاهدة فيديوهات الجولة والمراجعات، ثم يراجعون سيارة أو حراج لأسعار المستعملة، ثم يزورون مواقع المعارض أو قوقل ماب للعثور على أقرب معرض. التواجد في كل مرحلة من هذه الرحلة — بحث وفيديو وخريطة — هو الفرق بين المعارض اللي تسيطر على سوقها وتلك اللي تعتمد على الزيارات العشوائية فقط." },
        { q: "الأفضل للمعارض: SEO ولا إعلانات قوقل؟", a: "للحصول على زيارات وحجوزات اختبار قيادة فوراً، إعلانات قوقل أسرع. للحصول على زيارات رخيصة على المدى البعيد، SEO ضروري — خاصة لبحثات موديلات محددة و'قريب مني'. معظم المعارض تحقق أفضل النتائج بتشغيل إعلانات قوقل فوراً مع بناء الترتيبات الطبيعية بالتوازي. عندما يبدأ SEO يعطي ثماره في الشهور ٤ إلى ٦، تكلفة العميل الإجمالية تنخفض بشكل ملحوظ." },
        { q: "هل التسويق الرقمي يساعد في ملء ورشتي وليس مبيعات السيارات فقط؟", a: "بالتأكيد. تسويق ورش الصيانة هو أحد أعلى تطبيقات التسويق الرقمي المحلي عائداً. العملاء اللي يبحثون عن 'تغيير زيت قريبي' أو 'محل إطارات الرياض' أو 'إصلاح مكيف سيارة الملقا' مستعدون للحجز فوراً. ملف نشاط محسّن بشكل جيد مع إعلانات قوقل مستهدفة لكلمات خدمات محددة يحقق باستمرار جدول ورشة ممتلئ بتكلفة حجز منخفضة." },
      ],
      ctaHeading: "زِد مبيعاتك في قطاع السيارات بالرياض",
      ctaSubtitle: "احصل على تدقيق تسويقي مجاني واكتشف كيف تجذب مشترين أكثر لمعرضك أو ورشتك.",
    },
  },
  {
    slug: "hotels",
    icon: "🏨",
    name: "Hotels & Hospitality",
    nameAr: "الفنادق والضيافة",
    en: {
      metaTitle: "Digital Marketing for Hotels & Hospitality in Riyadh | Local City Solutions",
      metaDesc: "Digital marketing for hotels and hospitality businesses in Riyadh. Google Hotel Ads, OTA optimization, direct booking growth, content marketing, and reputation management.",
      tagline: "More direct bookings. Higher occupancy. Stronger TripAdvisor presence.",
      heroDesc: "Riyadh's hospitality sector is booming — driven by Vision 2030 tourism targets, expanding MICE tourism, and a growing base of business travellers. Hotels that win in this environment are those that show up first on Google, convert OTA browsers into direct bookings, and maintain a reputation that outshines competitors across every review platform.",
      features: [
        { icon: "🏨", title: "Google Hotel Ads", desc: "Appear directly in Google's hotel search interface with real-time pricing and availability — capturing guests at the highest point of booking intent, before they go to Booking.com." },
        { icon: "🌐", title: "OTA Optimization", desc: "Optimized listings on Booking.com, Expedia, Agoda, and Saudi-specific platforms — better photos, keyword-rich descriptions, and review management to improve ranking within each OTA algorithm." },
        { icon: "📈", title: "Direct Booking Growth", desc: "Reduce OTA commission dependency by driving traffic directly to your booking engine — via SEO, Google Ads, and retargeting campaigns that capture and re-engage past visitors." },
        { icon: "⭐", title: "Reputation Management", desc: "Systematic review generation on Google, TripAdvisor, and Booking.com — with professional management of all guest feedback to protect and improve your overall rating." },
        { icon: "🔍", title: "Hotel SEO", desc: "Rank for high-value searches like 'business hotel Riyadh', '5-star hotel near KAFD', and location-specific queries from corporate and leisure travellers." },
        { icon: "📸", title: "Visual Content & Social", desc: "Professional photography direction, Instagram content strategy, and influencer partnerships that showcase your property and attract aspirational bookings." },
      ],
      process: [
        { num: "01", title: "Property Audit", desc: "Review your OTA listings, GBP quality, Google Hotel Ads setup, review profile, and direct booking conversion rate across all channels." },
        { num: "02", title: "Revenue Strategy", desc: "Map out the optimal channel mix for your property type, location, and target guest segment — balancing OTA visibility with direct booking growth." },
        { num: "03", title: "Execute & Launch", desc: "OTA optimization, Google Hotel Ads live, GBP enhanced, review strategy implemented — all within the first 30 days." },
        { num: "04", title: "Monthly Optimization", desc: "Reporting on occupancy impact by channel, direct booking growth, OTA ranking movement, and review velocity — with continuous optimization." },
      ],
      faq: [
        { q: "How do I reduce my dependence on Booking.com and Expedia?", a: "The key is giving guests a compelling reason to book direct: price parity (guests shouldn't find better rates on OTAs), a frictionless booking engine, and a direct booking incentive like a room upgrade, early check-in, or F&B credit. On the digital side, Google Hotel Ads is the most powerful direct-booking tool available — it puts your rate directly in Google's interface before guests click to an OTA. We configure and manage Google Hotel Ads specifically to shift booking share toward your direct channel." },
        { q: "Does my hotel need to be active on social media?", a: "Yes — but the goal differs from other industries. For hotels, Instagram isn't primarily a booking platform; it's a credibility signal. When a potential guest Googles your hotel, they'll look at your Instagram to validate the property before booking. An active, beautiful Instagram profile with recent content increases conversion from Google search and OTA click-throughs. It also drives aspirational discovery and influencer visits that generate earned media." },
        { q: "How important are TripAdvisor rankings for hotels in Riyadh?", a: "TripAdvisor remains significant for hotels targeting international travellers and corporate bookers — particularly those coming from Western markets where TripAdvisor is still a primary research tool. For domestic Saudi travellers and GCC visitors, Google reviews and Booking.com ratings are generally more influential. We manage your review presence across all platforms simultaneously, with priority weighting based on your target guest segments." },
      ],
      ctaHeading: "Increase Occupancy for Your Riyadh Property",
      ctaSubtitle: "Get a free hospitality marketing audit and discover how to drive more direct bookings and grow your ranking across every platform.",
    },
    relatedServices: [
      { label: "Google Ads", href: "/en/services/google-ads" },
      { label: "SEO Services", href: "/en/services/seo" },
      { label: "Social Media Marketing", href: "/en/services/social-media" },
    ],
    relatedDistrict: { label: "Al Murabba District", href: "/en/riyadh/al-murabba" },
    relatedServicesAr: [
      { label: "إعلانات قوقل", href: "/ar/services/google-ads" },
      { label: "خدمات SEO", href: "/ar/services/seo" },
      { label: "ملف النشاط التجاري", href: "/ar/services/google-business-profile" },
    ],
    relatedDistrictAr: { label: "حي الدرعية", href: "/ar/riyadh/diriyah" },
    ar: {
      heroTitle: "تسويق رقمي للفنادق وقطاع الضيافة في الرياض",
      metaTitle: "تسويق رقمي للفنادق والضيافة في الرياض | لوكال سيتي سولوشنز",
      metaDesc: "نساعد الفنادق وأماكن الضيافة في الرياض تزيد حجوزاتها عبر قوقل والمنصات السياحية.",
      tagline: "حجوزات مباشرة أكثر. إشغال أعلى. حضور أقوى على منصات الضيافة.",
      heroDesc: "قطاع الضيافة في الرياض ينتعش — مدفوعاً بأهداف السياحة في رؤية ٢٠٣٠، وتمدد سياحة المؤتمرات، وقاعدة متنامية من المسافرين لأغراض الأعمال. الفنادق اللي تربح في هذا المشهد هي تلك اللي تظهر أولاً في قوقل، تحوّل متصفحي منصات الحجز لحجوزات مباشرة، وتحافظ على سمعة تتفوق على المنافسين في كل منصة تقييم.",
      features: [
        { icon: "🏨", title: "إعلانات فنادق قوقل", desc: "تظهر مباشرة في واجهة بحث الفنادق على قوقل بأسعار وتوافر حي — تلتقط الضيوف في أعلى نقطة نية حجز قبل أن يذهبوا لبوكينق." },
        { icon: "🌐", title: "تحسين منصات الحجز", desc: "قوائم محسّنة على بوكينق وإكسبيديا وأقودا والمنصات السعودية المتخصصة — صور أفضل، وصف بكلمات صح، وإدارة تقييمات لتحسين الترتيب في خوارزمية كل منصة." },
        { icon: "📈", title: "نمو الحجوزات المباشرة", desc: "قلل الاعتماد على عمولات منصات الحجز بجلب الزيارات مباشرة لمحرك حجزك — عبر SEO وإعلانات قوقل وحملات ريتارجيتينج." },
        { icon: "⭐", title: "إدارة السمعة", desc: "توليد تقييمات منهجي على قوقل وتريب أدفايزر وبوكينق — مع إدارة احترافية لكل ردود فعل الضيوف لحماية تقييمك الإجمالي وتحسينه." },
        { icon: "🔍", title: "SEO سياحي للفنادق", desc: "تتصدر البحثات القيّمة زي 'فندق أعمال الرياض' و'فندق ٥ نجوم قرب كافد' والاستفسارات الخاصة بالموقع من المسافرين للأعمال والترفيه وسياح موسم الرياض." },
        { icon: "📸", title: "محتوى بصري وسوشل ميديا", desc: "توجيه تصوير احترافي، استراتيجية إنستقرام، وشراكات مؤثرين تعرض فندقك وتجذب حجوزات طموحة من سياح دوليين ومحليين." },
      ],
      process: [
        { num: "٠١", title: "تدقيق الفندق", desc: "نراجع قوائم منصاتك، جودة ملف النشاط، إعداد إعلانات فنادق قوقل، ملف التقييمات، ومعدل تحويل الحجوزات المباشرة عبر كل القنوات." },
        { num: "٠٢", title: "استراتيجية الإيراد", desc: "نحدد مزيج القنوات الأمثل لنوع فندقك وموقعه وشريحة ضيوفك المستهدفة — موازنين ظهور المنصات مع نمو الحجوزات المباشرة." },
        { num: "٠٣", title: "ننفذ ونطلق", desc: "تحسين منصات الحجز، إطلاق إعلانات فنادق قوقل، تطوير ملف النشاط، تطبيق استراتيجية التقييمات — كل شيء خلال أول ٣٠ يوم." },
        { num: "٠٤", title: "تحسين شهري", desc: "تقارير عن أثر الإشغال بالقناة، نمو الحجوزات المباشرة، تحرك الترتيب في المنصات، ووتيرة التقييمات — مع تحسين مستمر." },
      ],
      faq: [
        { q: "كيف أقلل اعتمادي على بوكينق وإكسبيديا؟", a: "المفتاح إعطاء الضيوف سبباً مقنعاً للحجز المباشر: تكافؤ الأسعار (الضيف ما يلقى سعراً أفضل في المنصات)، محرك حجز سلس، وحافز حجز مباشر كترقية الغرفة أو تسجيل دخول مبكر أو رصيد مطاعم. رقمياً، إعلانات فنادق قوقل هو أقوى أداة حجز مباشر متاحة — يضع سعرك مباشرة في واجهة قوقل قبل أن ينقر الضيف لأي منصة. نضبط ونشغّل إعلانات فنادق قوقل تحديداً لتحويل حصة الحجز نحو قناتك المباشرة." },
        { q: "هل يحتاج فندقي يكون نشيطاً على السوشل ميديا؟", a: "نعم — لكن الهدف يختلف عن باقي القطاعات. للفنادق، إنستقرام ليس في المقام الأول منصة حجز؛ هو إشارة مصداقية. لما ضيف محتمل يبحث عن فندقك في قوقل، سيراجع إنستقرامك لتأكيد الفندق قبل الحجز. ملف إنستقرام نشيط وجميل بمحتوى حديث يزيد معدل التحويل من بحث قوقل ونقرات المنصات. كما يدفع الاكتشاف الطموح وزيارات المؤثرين اللي تولد إعلاماً مكتسباً." },
        { q: "قد إيش ترتيب تريب أدفايزر مهم للفنادق في الرياض؟", a: "تريب أدفايزر يظل مهماً للفنادق اللي تستهدف سياحاً دوليين ومسافري أعمال — خاصة القادمين من الأسواق الغربية حيث لا يزال المصدر الأساسي للبحث. للمسافرين السعوديين ودول الخليج، تقييمات قوقل وتقييمات بوكينق هي الأكثر تأثيراً عادةً. ندير حضورك في كل المنصات في آن واحد مع إعطاء أولوية بناءً على شرائح ضيوفك المستهدفة، بما فيهم سياح موسم الرياض والدرعية." },
      ],
      ctaHeading: "زِد إشغال فندقك في الرياض",
      ctaSubtitle: "احصل على تدقيق تسويقي مجاني واكتشف كيف تجذب حجوزات مباشرة أكثر وتنمو في كل منصة.",
    },
  },
];

const SLUGS = INDUSTRIES.map((ind) => ind.slug);

export async function generateStaticParams() {
  return SLUGS.flatMap((slug) => [
    { locale: "en", slug },
    { locale: "ar", slug },
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const industry = INDUSTRIES.find((ind) => ind.slug === slug);
  if (!industry) return {};
  const isAr = locale === "ar";
  const content = isAr && industry.ar ? industry.ar : industry.en;
  return {
    title: { absolute: content.metaTitle },
    description: content.metaDesc,
    alternates: {
      languages: {
        en: `https://localcitysolutions.com/en/industries/${slug}`,
        ar: `https://localcitysolutions.com/ar/industries/${slug}`,
      },
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const industry = INDUSTRIES.find((ind) => ind.slug === slug);
  if (!industry) notFound();
  const isAr = locale === "ar";
  const c = isAr && industry.ar ? industry.ar : industry.en;
  const p = `/${locale}`;

  const services = isAr && industry.relatedServicesAr ? industry.relatedServicesAr : industry.relatedServices;
  const district = isAr && industry.relatedDistrictAr ? industry.relatedDistrictAr : industry.relatedDistrict;

  const ui = isAr ? {
    badge: "خبرة قطاعية",
    h1: c.heroTitle ?? `تسويق رقمي للـ${industry.nameAr ?? industry.name} في الرياض`,
    ctaBtn: "احصل على تدقيق مجاني",
    talkBtn: "تكلم مع فريقنا",
    whatWeOffer: "خدماتنا",
    servicesH2: `خدماتنا التسويقية لـ${industry.nameAr ?? industry.name}`,
    processLabel: "طريقة الشغل",
    processH2: "كيف نشتغل معك",
    faqLabel: "أسئلة شائعة",
    faqH2: "أسئلة تهمك",
    relatedServicesLabel: "خدمات ذات صلة",
    districtLabel: "الحي الرئيسي",
    allIndustriesLabel: "جميع القطاعات",
    allIndustriesLink: "شوف كل القطاعات ←",
  } : {
    badge: "Industry Expertise",
    h1: c.heroTitle ?? `Digital Marketing for ${industry.name} in Riyadh`,
    ctaBtn: "Get Free Audit →",
    talkBtn: "Talk to Our Team →",
    whatWeOffer: "What We Offer",
    servicesH2: `Our ${industry.name} Marketing Services`,
    processLabel: "Our Process",
    processH2: "How We Work",
    faqLabel: "FAQ",
    faqH2: "Common Questions",
    relatedServicesLabel: "Related Services",
    districtLabel: "Key District",
    allIndustriesLabel: "All Industries",
    allIndustriesLink: "View All Industries →",
  };

  return (
    <div dir={isAr ? "rtl" : "ltr"}>
      {/* Hero */}
      <section className="relative bg-[#080E1A] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(245,197,24,0.08) 0%, transparent 70%)" }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F5C518]/10 border border-[#F5C518]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse" />
            <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-widest">{ui.badge}</span>
          </div>
          <div className="text-5xl mb-4">{industry.icon}</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            {ui.h1}
          </h1>
          <p className="text-[#F5C518] font-semibold text-base md:text-lg mb-4">{c.tagline}</p>
          <p className="text-white/60 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed">{c.heroDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/966564229190" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F5C518] text-[#080E1A] font-bold text-sm hover:bg-[#e6b800] transition-all shadow-xl shadow-[#F5C518]/20">
              {ui.ctaBtn}
            </a>
            <Link href={`${p}/contact`} className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 transition-all">
              {ui.talkBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#0C1424] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 reveal">
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{ui.whatWeOffer}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{ui.servicesH2}</h2>
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
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{ui.processLabel}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{ui.processH2}</h2>
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
            <span className="text-[#F5C518] text-xs font-bold uppercase tracking-[0.2em] block mb-3">{ui.faqLabel}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{ui.faqH2}</h2>
          </div>
          <div className="space-y-4 reveal delay-1">
            {c.faq.map((item, i) => (
              <details key={i} className="group bg-[#0E1A2E] border border-white/5 rounded-xl overflow-hidden hover:border-[#F5C518]/20 transition-all">
                <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none">
                  <span className="text-white font-semibold text-sm pr-4">{item.q}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5C518]/10 flex items-center justify-center text-[#F5C518] text-sm font-bold group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 border-t border-white/5">
                  <p className="text-white/60 text-sm leading-relaxed pt-4">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="bg-[#080E1A] py-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{ui.relatedServicesLabel}</p>
              <div className="flex flex-wrap gap-2">
                {services.map((link) => (
                  <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{ui.districtLabel}</p>
              <Link href={district.href} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all">
                {district.label}
              </Link>
            </div>
            <div>
              <p className="text-white/30 text-xs uppercase tracking-widest mb-3">{ui.allIndustriesLabel}</p>
              <Link href={`${p}/industries`} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-xs hover:text-white/70 hover:border-white/20 transition-all">
                {ui.allIndustriesLink}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABox heading={c.ctaHeading} subtitle={c.ctaSubtitle} locale={locale} bg="dark" />
    </div>
  );
}
