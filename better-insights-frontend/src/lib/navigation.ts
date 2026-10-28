export interface NavItem {
  title: string;
  url: string;
  megaKey?: "what-we-do" | "insights" | "about" | "contact";
  isAi?: boolean;
  children?: Array<{
    title: string;
    url: string;
    desc?: string;
  }>;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    title: "Services",
    url: "/services",
    megaKey: "what-we-do",
  },
  {
    title: "Our Work",
    url: "/work",
  },
  {
    title: "Insights",
    url: "/insights",
    megaKey: "insights",
  },
  {
    title: "About",
    url: "/about",
    megaKey: "about",
  },
  {
    title: "Contact Us",
    url: "/contact",
    megaKey: "contact",
  },
];

export const WHAT_WE_DO_SERVICES = [
  {
    title: "Website Development",
    url: "/services/website-development",
    desc: "Fast, scalable digital experiences designed for growth.",
  },
  {
    title: "CRM & Integrations",
    url: "/services/crm-integrations",
    desc: "Connect sales, marketing, and customer operations seamlessly.",
  },
  {
    title: "AI Solutions",
    url: "/services/ai-automation",
    desc: "Practical AI tools and intelligent automation to boost productivity.",
  },
  {
    title: "Digital Growth",
    url: "/services/digital-growth",
    desc: "SEO, performance marketing, and conversion optimization to scale revenue.",
  },
  {
    title: "Technology & Engineering",
    url: "/services/technology-engineering",
    desc: "Enterprise architecture, cloud solutions, and full-stack development.",
  },
  {
    title: "Digital Transformation",
    url: "/services/digital-transformation",
    desc: "End-to-end digital solutions connecting strategy, tech, and marketing.",
  },
  {
    title: "CPR Calculator Tool",
    url: "/cpr-tool",
    desc: "Calculate your customer acquisition cost, conversion rate, and marketing ROI.",
  },
];

export const ABOUT_SUBMENU = [
  {
    title: "About Better Insights",
    url: "/about",
    desc: "Our story, mission, and technology-first culture.",
  },
  {
    title: "Who We Are",
    url: "/about#who-we-are",
    desc: "Meet the leadership and business principles driving our work.",
  },
  {
    title: "Our Team",
    url: "/about#our-team",
    desc: "The strategists, engineers, and digital innovators behind Better Insights.",
  },
  {
    title: "Our Clientele",
    url: "/our-clientele",
    desc: "Enterprises and high-growth brands we have partnered with.",
  },
  {
    title: "Careers",
    url: "/careers",
    desc: "Join our rapidly growing engineering and digital marketing teams.",
  },
];
