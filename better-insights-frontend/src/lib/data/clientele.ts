export interface ClientRecord {
  name: string;
  industry: "Healthcare" | "Education" | "E-Commerce" | "Enterprise";
  logo: string;
  description?: string;
  caseStudySlug?: string;
  featured?: boolean;
}

export const CLIENT_INDUSTRIES = [
  "All Sectors",
  "Healthcare & Medical",
  "Education & EdTech",
  "E-Commerce & Retail",
  "Enterprise & B2B",
] as const;

export type ClientIndustryFilter = (typeof CLIENT_INDUSTRIES)[number];

export const CLIENTELE_RECORDS: ClientRecord[] = [
  // Healthcare & Medical
  { 
    name: "Pooja Hospital", 
    industry: "Healthcare", 
    logo: "/images/Pooja-Hospital.webp", 
    caseStudySlug: "pooja-hospital-telehealth",
    description: "Multispecialty hospital network modernizing patient intake, OPD telemetry, and virtual care.",
    featured: true
  },
  { 
    name: "GT Diagnostics", 
    industry: "Healthcare", 
    logo: "/images/gt-diagnostics-logo-e1747472463202.png.webp", 
    caseStudySlug: "gt-diagnostics",
    description: "Automated laboratory information telemetry and instant encrypted patient report distribution.",
    featured: true
  },
  { 
    name: "JP Hospital Solan", 
    industry: "Healthcare", 
    logo: "/images/JP-Hospital-Solan-logo.png",
    description: "Regional super-specialty hospital infrastructure and digital patient services."
  },
  { 
    name: "Dentwin", 
    industry: "Healthcare", 
    logo: "/images/Dentwin-1-e1757342321293.png.webp",
    description: "Advanced dental technology and clinical patient management systems."
  },
  { 
    name: "Dant Suraksha", 
    industry: "Healthcare", 
    logo: "/images/dant-suraksha-logo-2.png.webp",
    description: "Comprehensive oral health network with digitized appointment and consultation workflows."
  },
  { 
    name: "Dr. Pet", 
    industry: "Healthcare", 
    logo: "/images/Dr.-Pet.webp",
    description: "Veterinary medicine and outpatient pet health management clinics."
  },
  { 
    name: "Afecto", 
    industry: "Healthcare", 
    logo: "/images/afecto-logo-e1747472495525.png.webp",
    description: "Holistic healthcare network and patient consultation booking platforms."
  },
  { 
    name: "Biotopics", 
    industry: "Healthcare", 
    logo: "/images/Biotopics-Logo.png.webp",
    description: "Clinical biological research and diagnostic laboratory supply enterprise."
  },
  { 
    name: "HMH", 
    industry: "Healthcare", 
    logo: "/images/hmh-logo.png.webp",
    description: "Healthcare facility management and digital appointment coordination."
  },

  // Education & EdTech
  { 
    name: "Course Proxy", 
    industry: "Education", 
    logo: "/images/courseproxy-logo.png.webp", 
    caseStudySlug: "course-proxy",
    description: "Intelligent university discovery platform featuring AI recommendations and student guidance.",
    featured: true
  },
  { 
    name: "Veda Edu", 
    industry: "Education", 
    logo: "/images/Veda-Edu-logo.png.webp", 
    caseStudySlug: "veda-edu",
    description: "Adaptive digital learning academy deploying AI curriculum pacing and progress telemetry.",
    featured: true
  },
  { 
    name: "RK College", 
    industry: "Education", 
    logo: "/images/RK-College.webp",
    description: "Higher education campus digital portal, admissions funnels, and student services."
  },
  { 
    name: "Ashtang", 
    industry: "Education", 
    logo: "/images/ashtang-logo-e1747472538329.png",
    description: "Wellness education, instructor accreditation, and digital curriculum distribution."
  },
  { 
    name: "Deshyoga", 
    industry: "Education", 
    logo: "/images/deshyoga-logo.png.webp",
    description: "Online education and immersive virtual wellness training programs."
  },

  // E-Commerce & Retail
  { 
    name: "Sanction Store", 
    industry: "E-Commerce", 
    logo: "/images/Sanction-Store-2.png.webp", 
    caseStudySlug: "sanction-store",
    description: "High-concurrency luxury streetwear drops sustaining 25,000+ concurrent checkout surges.",
    featured: true
  },
  { 
    name: "Stylebar Ireland", 
    industry: "E-Commerce", 
    logo: "/images/stylebar-ireland.png.webp", 
    caseStudySlug: "stylebar-ireland",
    description: "Luxury salon collective and high-velocity mobile commerce platform.",
    featured: true
  },
  { 
    name: "Voyya", 
    industry: "E-Commerce", 
    logo: "/images/Voyya.webp", 
    caseStudySlug: "voyya-app-growth",
    description: "Mobile lifestyle and travel platform achieving over 500,000 active app installs.",
    featured: true
  },
  { 
    name: "Label16", 
    industry: "E-Commerce", 
    logo: "/images/Label16-Logo.png.webp",
    description: "Boutique fashion e-commerce storefront with streamlined mobile conversion funnels."
  },
  { 
    name: "Miracle Rug", 
    industry: "E-Commerce", 
    logo: "/images/miracle-rug-logo.png",
    description: "Direct-to-consumer artisanal home decor and custom rug retail platform."
  },
  { 
    name: "Almoda", 
    industry: "E-Commerce", 
    logo: "/images/almoda-logo.png.webp",
    description: "Contemporary fashion and accessory e-commerce with fast checkout integration."
  },
  { 
    name: "Bernela", 
    industry: "E-Commerce", 
    logo: "/images/Bernela.webp",
    description: "Specialized lifestyle and consumer goods digital storefront."
  },
  { 
    name: "La Maison", 
    industry: "E-Commerce", 
    logo: "/images/La-masion.png.webp",
    description: "Interior design and luxury home styling e-commerce experience."
  },
  { 
    name: "Classic Daiquiris", 
    industry: "E-Commerce", 
    logo: "/images/Classic-Daiquiris-logo-1.png",
    description: "Beverage brand digital experience and direct customer ordering channels."
  },

  // Enterprise, Legal & Professional Services
  { 
    name: "The Ly International", 
    industry: "Enterprise", 
    logo: "/images/thely-logo.png", 
    caseStudySlug: "the-ly",
    description: "Global education consultancy scaling international student inquiries across Europe and Asia.",
    featured: true
  },
  { 
    name: "Khare Legal Chambers", 
    industry: "Enterprise", 
    logo: "/images/khare-legal-chambers-logo-1.png.webp", 
    caseStudySlug: "khare-legal-chambers",
    description: "Secure litigation research platform and enterprise client document chambers.",
    featured: true
  },
  { 
    name: "Old Fort Quarter", 
    industry: "Enterprise", 
    logo: "/images/oldfortquater-logo.png.webp", 
    caseStudySlug: "old-fort-quarter",
    description: "Heritage festival destination marketing and high-velocity mobile ticketing systems.",
    featured: true
  },
  { 
    name: "2C Consulting", 
    industry: "Enterprise", 
    logo: "/images/2cconsulting-logo.png",
    description: "Management consulting practice advising corporate turnarounds and restructuring."
  },
  { 
    name: "Apki Return", 
    industry: "Enterprise", 
    logo: "/images/apki-return-logo-e1747472274482.png.webp",
    description: "FinTech automated tax filing and regulatory compliance SaaS portal."
  },
  { 
    name: "Nirmala Enterprises", 
    industry: "Enterprise", 
    logo: "/images/Nirmala-Ent.png",
    description: "Industrial equipment supply and enterprise procurement distribution."
  },
  { 
    name: "Skydec", 
    industry: "Enterprise", 
    logo: "/images/skydec-logo.png.webp",
    description: "Commercial architectural solutions and turnkey interior infrastructure."
  },
  { 
    name: "TJC", 
    industry: "Enterprise", 
    logo: "/images/tjc-logo.png.webp",
    description: "B2B commercial enterprise and supply chain technology management."
  },
  { 
    name: "Perfect Frame Studios", 
    industry: "Enterprise", 
    logo: "/images/Perfect-Frame-Studios-Logo.png.webp",
    description: "High-end commercial media production and brand storytelling agency."
  },
  { 
    name: "MPF", 
    industry: "Enterprise", 
    logo: "/images/mpf-logo.png",
    description: "Manufacturing and industrial fabrication systems management."
  },
  { 
    name: "Lieber Earth", 
    industry: "Enterprise", 
    logo: "/images/lieberearth-logo.png.webp",
    description: "Sustainable ecological products and organic supply chain distribution."
  },
  { 
    name: "LED CN", 
    industry: "Enterprise", 
    logo: "/images/ledcn-logo.png.webp",
    description: "Commercial LED display engineering and international electronics distribution."
  },
  { 
    name: "Hidup", 
    industry: "Enterprise", 
    logo: "/images/hidup-logo.png",
    description: "Lifestyle brand incubator and digital platform engineering."
  },
  { 
    name: "Baraza", 
    industry: "Enterprise", 
    logo: "/images/baraza-logo.png.webp",
    description: "Hospitality enterprise and bespoke culinary event experiences."
  },
];

export function getAllClients(): ClientRecord[] {
  return CLIENTELE_RECORDS;
}

export function getFeaturedClientStories(): ClientRecord[] {
  return CLIENTELE_RECORDS.filter((c) => c.featured && c.caseStudySlug);
}

export function getClientsByIndustry(industryFilter: ClientIndustryFilter): ClientRecord[] {
  if (industryFilter === "All Sectors") {
    return CLIENTELE_RECORDS;
  }
  const industryKeyMap: Record<string, "Healthcare" | "Education" | "E-Commerce" | "Enterprise"> = {
    "Healthcare & Medical": "Healthcare",
    "Education & EdTech": "Education",
    "E-Commerce & Retail": "E-Commerce",
    "Enterprise & B2B": "Enterprise",
  };
  const targetKey = industryKeyMap[industryFilter];
  return CLIENTELE_RECORDS.filter((c) => c.industry === targetKey);
}
