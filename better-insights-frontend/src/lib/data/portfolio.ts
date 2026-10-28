export interface PortfolioMetric {
  value: string;
  label: string;
}

export interface PortfolioProject {
  id: number;
  slug: string;
  title: string;
  clientName: string;
  clientLogo?: string;
  category: "Website Development" | "CRM & Integrations" | "AI & Automation" | "Digital Growth" | "Digital Transformation" | "Technology & Engineering";
  tags: string[];
  services: string[];
  image: string;
  metrics: PortfolioMetric[];
  cardOverview: string;
  clientOverview: string;
  challenge: string;
  objectives: string[];
  approach: string;
  solution: string;
  featured?: boolean;
  liveUrl?: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 236,
    slug: "the-ly",
    title: "The Ly: High-Volume International Search Engine Marketing & Conversion Scaling",
    clientName: "The Ly International",
    clientLogo: "/images/thely-logo.png",
    category: "Digital Growth",
    tags: ["SEM / PPC", "Growth Marketing", "Conversion Architecture", "International Scaling"],
    services: ["Digital Growth", "Search Engine Marketing", "Conversion Optimization"],
    image: "/images/thely-banner.jpg",
    featured: true,
    cardOverview: "Engineered multi-market PPC and performance search infrastructure, driving a 340% increase in qualified international leads.",
    clientOverview: "The Ly International is a global education consultancy connecting students with premier academic institutions across Europe, the UK, and North America.",
    challenge: "The client needed to expand their student acquisition funnels into competitive European and Asian markets without inflating customer acquisition cost (CAC). Legacy ad campaigns suffered from low intent traffic and high bounce rates on unlocalized landing pages.",
    objectives: [
      "Scale international student acquisition across key regional corridors",
      "Lower blended cost per qualified inquiry through algorithmic bidding",
      "Automate lead qualification and routing directly into admissions counselor workflows",
      "Establish transparent attribution models to track lifetime student placement value"
    ],
    approach: "We deployed hyper-targeted international search architecture, mapping high-intent academic search queries to multilingual, localized landing experiences tailored to student intent.",
    solution: "Designed and rolled out 14 conversion-focused regional landing funnels, integrated real-time webhook telemetry connecting Google Ads with their admissions CRM, and implemented continuous A/B test cadences across ad copy and page hooks.",
    metrics: [
      { value: "+340%", label: "Qualified International Leads" },
      { value: "3.2x", label: "Return on Ad Spend (ROAS)" },
      { value: "-28%", label: "Blended Cost per Lead" }
    ],
  },
  {
    id: 235,
    slug: "course-proxy",
    title: "Course Proxy: Advanced Educational Course Research & Expert Counseling Platform",
    clientName: "Course Proxy",
    clientLogo: "/images/courseproxy-logo.png.webp",
    category: "AI & Automation",
    tags: ["EdTech", "AI Recommendation Engine", "Web Platform", "Automated Counseling"],
    services: ["AI & Automation", "Website Development", "Platform Engineering"],
    image: "/images/courseproxy-banner.jpg",
    featured: true,
    cardOverview: "Built an intelligent course discovery portal with personalized recommendation models and automated student counseling workflows.",
    clientOverview: "Course Proxy is an educational intelligence platform that helps students discover, evaluate, and enroll in certified programs matching their exact career ambitions.",
    challenge: "Navigating thousands of university courses and degree programs overwhelmed prospective applicants. High drop-off rates on legacy discovery tools delayed student decision-making.",
    objectives: [
      "Eliminate decision fatigue by delivering intelligent, personalized program matches",
      "Deliver instant counseling guidance via automated qualification workflows",
      "Provide seamless side-by-side comparison for curriculum, tuition, and career pathways",
      "Reduce application cycle time from initial discovery to submission"
    ],
    approach: "We structured an intuitive digital portal combining lightning-fast search indexing with personalized recommendation algorithms based on student background and aspirations.",
    solution: "Engineered a high-performance web platform utilizing faceted full-text search, automated WhatsApp guidance bots for common admissions queries, and counselor collaboration portals.",
    metrics: [
      { value: "2.8x", label: "Student Engagement Lift" },
      { value: "60%", label: "Faster Course Match Time" },
      { value: "+52%", label: "Counseling Completion Rate" }
    ],
  },
  {
    id: 180,
    slug: "pooja-hospital-telehealth",
    title: "Pooja Hospital: Unified Patient Care Ecosystem & Integrated OPD Telehealth",
    clientName: "Pooja Hospital",
    clientLogo: "/images/Pooja-Hospital.webp",
    category: "Digital Transformation",
    tags: ["HealthTech", "Digital Transformation", "Telehealth", "OPD Queue Management"],
    services: ["Digital Transformation", "Technology & Engineering", "CRM & Integrations"],
    image: "/images/Pooja-Hospital.webp",
    featured: true,
    cardOverview: "Digitized hospital OPD queues, telemetry scheduling, and online consultations, drastically reducing patient wait times.",
    clientOverview: "Pooja Hospital is a premier multispecialty healthcare institution delivering comprehensive critical care, surgical, and outpatient services to over 200,000 patients annually.",
    challenge: "Overcrowded physical OPD waiting areas, fragmented paper record keeping, and phone-based appointment booking caused severe scheduling friction for both doctors and patients.",
    objectives: [
      "Cut outpatient waiting times through digital queue management",
      "Deploy a secure, compliant telehealth consultation portal for remote patients",
      "Provide real-time doctor availability and department scheduling transparency",
      "Automate appointment reminders and digital billing confirmation"
    ],
    approach: "We architected an end-to-end digital hospital ecosystem connecting appointment booking, physician availability rosters, and virtual consultations into one unified interface.",
    solution: "Built a responsive patient portal with SMS/WhatsApp appointment alerts, live OPD token tracking, integrated digital payment gateways, and encrypted video telemedicine rooms.",
    metrics: [
      { value: "-65%", label: "OPD Waiting Time" },
      { value: "10,000+", label: "Completed Digital Consultations" },
      { value: "98%", label: "Patient Satisfaction Score" }
    ],
  },
  {
    id: 179,
    slug: "voyya-app-growth",
    title: "Voyya: Accelerating App Adoption & Brand Growth Across Global Markets",
    clientName: "Voyya",
    clientLogo: "/images/Voyya.webp",
    category: "Digital Growth",
    tags: ["Mobile Growth", "App Store Optimization", "Performance Marketing", "Viral Loops"],
    services: ["Digital Growth", "Performance Funnels", "App Acquisition"],
    image: "/images/Voyya.webp",
    featured: false,
    cardOverview: "Architected a performance acquisition funnel spanning paid search, referral mechanics, and conversion-optimized landing funnels.",
    clientOverview: "Voyya is a dynamic mobile application designed to simplify travel coordination, shared itineraries, and on-the-go group experiences.",
    challenge: "Escalating user acquisition costs across app store ad networks and heavy competitive saturation demanded an ultra-efficient growth engine prioritizing active monthly retention.",
    objectives: [
      "Drive sustainable, high-intent app install volume across target geographies",
      "Optimize in-app onboarding to maximize Day-30 retention milestones",
      "Engineer organic viral loops incentivizing user-to-user trip sharing",
      "Establish unified cross-platform attribution modeling"
    ],
    approach: "We created a multi-layered growth architecture linking interactive web-to-app onboarding previews with targeted app store acquisition campaigns.",
    solution: "Rolled out interactive web teasers, localized App Store Optimization (ASO) metadata, smart deep links, and automated re-engagement notifications.",
    metrics: [
      { value: "500K+", label: "Active App Installs" },
      { value: "+180%", label: "30-Day User Retention" },
      { value: "-35%", label: "Blended Cost per Install" }
    ],
  },
  {
    id: 178,
    slug: "veda-edu",
    title: "Veda Edu: AI-Driven Adaptive Learning Workflows & Student Guidance",
    clientName: "Veda Edu",
    clientLogo: "/images/Veda-Edu-logo.png.webp",
    category: "AI & Automation",
    tags: ["AI & Automation", "Adaptive Learning", "EdTech", "Curriculum Telemetry"],
    services: ["AI & Automation", "Technology & Engineering"],
    image: "/images/Veda-Edu-logo.png.webp",
    featured: false,
    cardOverview: "Integrated intelligent LLM assessment tools and progress telemetry to personalize student curriculum pacing.",
    clientOverview: "Veda Edu is an advanced online learning academy delivering STEM courses and competitive exam prep to high-school and university candidates.",
    challenge: "Traditional static course modules failed to address varied student learning speeds, leading to student frustration on difficult topics and high course drop-off rates.",
    objectives: [
      "Personalize study modules dynamically according to individual comprehension speed",
      "Deliver immediate diagnostic feedback and contextual hints on practice quizzes",
      "Provide instructors with real-time analytics flagging struggling students",
      "Increase overall course completion rates and assessment scores"
    ],
    approach: "We designed an adaptive diagnostic layer utilizing AI prompts and telemetry to detect comprehension bottlenecks and calibrate quiz difficulty in real time.",
    solution: "Deployed generative knowledge checks, automated contextual explanations, and a live progress dashboard highlighting learning milestones.",
    metrics: [
      { value: "+48%", label: "Course Completion Rate" },
      { value: "+35%", label: "Average Test Score Lift" },
      { value: "4.2x", label: "Daily Problem Attempts" }
    ],
  },
  {
    id: 177,
    slug: "sanction-store",
    title: "Sanction Store: High-Volume Sneaker & Streetwear Drop Architecture",
    clientName: "Sanction Store",
    clientLogo: "/images/Sanction-Store-2.png.webp",
    category: "Website Development",
    tags: ["E-Commerce", "High Concurrency", "Headless Commerce", "Next.js"],
    services: ["Website Development", "Technology & Engineering", "E-Commerce"],
    image: "/images/Sanction-Store-2.png.webp",
    featured: true,
    cardOverview: "Engineered resilient e-commerce infrastructure capable of sustaining 25,000 concurrent checkout requests during limited product drops.",
    clientOverview: "Sanction Store is a premier luxury streetwear and rare sneaker marketplace catering to passionate fashion collectors across Europe and the Middle East.",
    challenge: "Limited-edition product releases generated sudden traffic spikes exceeding 25,000 concurrent users within seconds, regularly crashing their previous e-commerce setup and costing sales.",
    objectives: [
      "Guarantee 100% storefront uptime during viral flash drops",
      "Mitigate scalper bots and duplicate automated checkout attempts",
      "Achieve sub-second page transitions and ultra-fast mobile checkout",
      "Synchronize inventory across regional warehouse facilities in real time"
    ],
    approach: "We re-architected the e-commerce platform using an edge-rendered headless Next.js frontend, redis queue buffering, and serverless payment processing.",
    solution: "Built a customized headless checkout pipeline featuring queue tokenization, automated bot detection heuristics, and instant Apple Pay and Google Pay integration.",
    metrics: [
      { value: "99.99%", label: "Drop Uptime Reliability" },
      { value: "25,000+", label: "Concurrent Checkout Surge" },
      { value: "0.8s", label: "Average Mobile Page Load" }
    ],
  },
  {
    id: 176,
    slug: "gt-diagnostics",
    title: "GT Diagnostics: Automated Laboratory Telemetry & Real-Time Patient Reporting",
    clientName: "GT Diagnostics",
    clientLogo: "/images/gt-diagnostics-logo-e1747472463202.png.webp",
    category: "CRM & Integrations",
    tags: ["CRM & Integrations", "Healthcare Automation", "WhatsApp Business API", "Telemetry"],
    services: ["CRM & Integrations", "AI & Automation", "Technology & Engineering"],
    image: "/images/gt-diagnostics-logo-e1747472463202.png.webp",
    featured: false,
    cardOverview: "Automated laboratory test report distribution via WhatsApp and SMS gateways, synchronizing directly with lab analyzer equipment.",
    clientOverview: "GT Diagnostics operates a network of pathology and radiology testing centers serving healthcare providers and outpatient communities.",
    challenge: "Patients waited hours for printed diagnostic test reports or called center reception desks repeatedly, tying up staff and slowing clinic operations.",
    objectives: [
      "Deliver verified test results instantly to patient mobile devices upon lab sign-off",
      "Eliminate reception desk call congestion inquiring about test readiness",
      "Maintain strict healthcare data compliance, end-to-end encryption, and patient privacy",
      "Provide zero-disruption integration with existing Laboratory Information Systems (LIS)"
    ],
    approach: "We engineered an automated webhook listener interfacing directly with their LIS database to trigger encrypted, verified result packets.",
    solution: "Integrated WhatsApp Business API and secure SMS gateways to dispatch password-protected PDF reports directly to patients the moment pathologists sign off.",
    metrics: [
      { value: "< 2 min", label: "Automated Report Dispatch" },
      { value: "-70%", label: "Reception Phone Bottlenecks" },
      { value: "100%", label: "Zero Disruption Rollout" }
    ],
  },
  {
    id: 175,
    slug: "khare-legal-chambers",
    title: "Khare Legal Chambers: Secure Enterprise Portal & Legal Intelligence Platform",
    clientName: "Khare Legal Chambers",
    clientLogo: "/images/khare-legal-chambers-logo-1.png.webp",
    category: "Technology & Engineering",
    tags: ["Enterprise Software", "LegalTech", "Document Intelligence", "Security & RBAC"],
    services: ["Technology & Engineering", "Website Development"],
    image: "/images/khare-legal-chambers-logo-1.png.webp",
    featured: false,
    cardOverview: "Created a centralized client document repository with role-based access control and AI document search.",
    clientOverview: "Khare Legal Chambers is a prestigious corporate and litigation law firm advising multinational enterprises, institutions, and family offices.",
    challenge: "Associates spent hours manually retrieving historical court briefs, contracts, and precedent case law stored across siloed internal drives and paper vaults.",
    objectives: [
      "Accelerate case law and brief retrieval across decades of litigation records",
      "Implement rigorous bank-grade role-based access control and audit trails",
      "Provide enterprise clients with a dedicated secure chamber for case status review",
      "Modernize the firm's brand presence for international corporate clients"
    ],
    approach: "We engineered a private enterprise portal featuring full-text semantic document indexing, strict privilege segmentation, and an editorial digital identity.",
    solution: "Deployed a secure cloud repository with automated PDF optical character recognition (OCR), encrypted client workspaces, and comprehensive audit telemetry.",
    metrics: [
      { value: "-50%", label: "Document Research Time" },
      { value: "100%", label: "Encrypted Audit Compliance" },
      { value: "3.5x", label: "Client Inquiry Velocity" }
    ],
  },
  {
    id: 174,
    slug: "old-fort-quarter",
    title: "Old Fort Quarter: Modernizing Digital Destination Marketing & Guest Journeys",
    clientName: "Old Fort Quarter",
    clientLogo: "/images/oldfortquater-logo.png.webp",
    category: "Digital Growth",
    tags: ["Destination Marketing", "Ticketing Funnels", "Social Growth", "Event Tech"],
    services: ["Digital Growth", "Website Development"],
    image: "/images/oldfortquater-logo.png.webp",
    featured: false,
    cardOverview: "Modernized hospitality festival ticketing, brand storytelling, and localized social engagement funnels.",
    clientOverview: "Old Fort Quarter is an annual heritage, music, and culinary festival celebrating regional history and arts in Ireland.",
    challenge: "The festival relied on legacy physical ticketing and fragmented social updates, limiting ticket sales velocity and early guest commitments.",
    objectives: [
      "Accelerate early-bird ticket bookings through high-converting digital funnels",
      "Captivate regional tourism audiences with an energetic, visual narrative",
      "Provide a frictionless mobile-first schedule and artist lineup guide",
      "Track marketing spend attribution accurately across digital channels"
    ],
    approach: "We transformed the festival's digital presence into a cinematic visual journey with integrated tiered ticketing and real-time social proof.",
    solution: "Launched a responsive interactive festival guide, localized performance advertising across Instagram and TikTok, and dynamic ticket countdowns.",
    metrics: [
      { value: "+120%", label: "Early-Bird Ticket Velocity" },
      { value: "4.5x", label: "Social Media Engagement" },
      { value: "72%", label: "Mobile Ticket Purchases" }
    ],
  },
  {
    id: 173,
    slug: "stylebar-ireland",
    title: "Stylebar Ireland: High-Velocity E-Commerce Experience & Conversion Scaling",
    clientName: "Stylebar Ireland",
    clientLogo: "/images/stylebar-ireland.png.webp",
    category: "Website Development",
    tags: ["E-Commerce", "Checkout Optimization", "Luxury Beauty", "Mobile First"],
    services: ["Website Development", "Digital Growth"],
    image: "/images/stylebar-ireland.png.webp",
    featured: false,
    cardOverview: "Overhauled online store checkout UX and mobile speed, cutting cart abandonment by 32%.",
    clientOverview: "Stylebar Ireland is a premium salon collective and boutique online retailer supplying luxury haircare and beauty products.",
    challenge: "A sluggish mobile checkout with repetitive form fields caused high checkout abandonment among mobile shoppers seeking quick beauty purchases.",
    objectives: [
      "Dramatically reduce mobile checkout friction and cart abandonment",
      "Enhance site performance to achieve instantaneous product browsing",
      "Elevate the brand aesthetic to mirror their luxury salon experience",
      "Increase average order value (AOV) through intelligent cart recommendations"
    ],
    approach: "We audited customer purchase funnels, re-engineering the checkout architecture for one-tap payments and mobile-first speed.",
    solution: "Delivered a refined responsive storefront with streamlined single-step checkout, personalized product bundling, and instant Apple Pay and Google Pay.",
    metrics: [
      { value: "-32%", label: "Cart Abandonment Rate" },
      { value: "+44%", label: "Mobile Conversion Rate" },
      { value: "+26%", label: "Average Order Value (AOV)" }
    ],
  },
];

export const PORTFOLIO_CATEGORIES = [
  "All Work",
  "Website Development",
  "CRM & Integrations",
  "AI & Automation",
  "Digital Growth",
  "Digital Transformation",
  "Technology & Engineering",
] as const;

export type PortfolioCategory = (typeof PORTFOLIO_CATEGORIES)[number];

export function getAllProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS;
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.featured);
}

export function getRelatedProjects(currentSlug: string, limit = 2): PortfolioProject[] {
  const current = getProjectBySlug(currentSlug);
  const others = PORTFOLIO_PROJECTS.filter((p) => p.slug !== currentSlug);
  
  if (!current) return others.slice(0, limit);

  // Prioritize same category first
  const sameCategory = others.filter((p) => p.category === current.category);
  const differentCategory = others.filter((p) => p.category !== current.category);

  return [...sameCategory, ...differentCategory].slice(0, limit);
}
