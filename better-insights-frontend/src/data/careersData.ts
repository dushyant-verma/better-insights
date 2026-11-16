export interface CareerDetail {
  slug: string;
  title: string;
  displayHeading: string;
  department: string;
  employmentType: "Full Time" | "Part Time";
  workplaceType: "Hybrid" | "Remote" | "On-site";
  location: string;
  experienceLevel: string;
  salary: string;
  heroImage: string;
  heroImageAlt: string;
  status: "open" | "filled";
  shortDescription: string;
  aboutRole: string[];
  responsibilities: string[];
  whatWereLookingFor: string[];
  skillsAndExperience: string[];
  applicationDeadline?: string;
}

export const CAREERS_LIST: CareerDetail[] = [
  {
    slug: "account-manager",
    title: "Account Manager",
    displayHeading: "We're looking for an Account Manager.",
    department: "Client Services & Growth",
    employmentType: "Full Time",
    workplaceType: "Hybrid",
    location: "London, Manchester & Remote",
    experienceLevel: "3+ years digital agency experience",
    salary: "Competitive + Performance Incentive",
    heroImage: "/images/culture/hero-marketing-team.jpg",
    heroImageAlt: "Better Insights team collaborating on digital client strategy",
    status: "open",
    shortDescription:
      "Drive transformative client relationships, bridge strategy with technical execution, and ensure high-impact delivery across digital ecosystems.",
    aboutRole: [
      "At Better Insights, we build modern digital platforms, high-performance web applications, and data-driven growth systems. As an Account Manager, you will be the trusted strategic partner for our key enterprise and high-growth clients.",
      "You will lead end-to-end client communications, align business objectives with design and engineering sprints, and identify organic expansion opportunities that drive measurable commercial ROI.",
      "This isn't about traditional hands-off account handling. You will deeply understand our technology stack, creative capabilities, and strategic frameworks, collaborating daily with strategists, engineers, and creatives.",
    ],
    responsibilities: [
      "Act as the primary strategic advisor and executive point of contact for key client accounts.",
      "Lead client discovery sessions, sprint kickoffs, quarterly business reviews (QBRs), and project roadmap alignment.",
      "Translate ambitious business objectives into clear, actionable scopes of work with technical and design teams.",
      "Manage client budgets, commercial agreements, project milestones, and resource forecasting.",
      "Monitor KPIs, analytics, and performance metrics to demonstrate tangible value and ROI to client stakeholders.",
      "Identify account growth opportunities, pitch complementary digital solutions, and retain client partnerships long-term.",
      "Champion client feedback internally to continuously raise the bar for creative and engineering quality.",
    ],
    whatWereLookingFor: [
      "An articulate, confident communicator who thrives on building genuine, high-trust professional relationships.",
      "A strategic thinker with a strong grasp of the digital agency landscape, modern web platforms, and performance marketing.",
      "High emotional intelligence with the ability to navigate complex stakeholder requirements with calm diplomacy.",
      "A proactive problem-solver who anticipates bottlenecks before they become roadblocks.",
      "A collaborative team player with zero ego, matching the Better Insights culture of transparency and craft excellence.",
    ],
    skillsAndExperience: [
      "Proven track record (3+ years) managing client accounts in a digital, web development, or creative agency.",
      "Familiarity with modern web design workflows, headless CMS architectures, Next.js/React, and digital marketing ecosystems.",
      "Experience conducting strategic presentations and high-stakes pitch meetings with C-level executives.",
      "Proficiency with modern collaboration and project management tools (Figma, Jira, Notion, Slack, HubSpot).",
      "Demonstrated ability to grow account revenues and maintain industry-leading client retention rates.",
    ],
    applicationDeadline: "Open until filled",
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    displayHeading: "We're looking for a Project Manager.",
    department: "Delivery & Operations",
    employmentType: "Full Time",
    workplaceType: "Hybrid",
    location: "Manchester & Remote",
    experienceLevel: "3-5 years agile delivery experience",
    salary: "Competitive salary based on experience",
    heroImage: "/images/culture/photo-1556761175-4b46a572b786.jpg",
    heroImageAlt: "Better Insights project management and delivery workshop",
    status: "open",
    shortDescription:
      "Orchestrate complex web development, branding, and digital transformation sprints with rigor, clarity, and precision.",
    aboutRole: [
      "Better Insights delivers award-winning web platforms and AI-driven growth systems. Our Project Managers ensure that creative vision translates into flawless, on-time technical execution.",
      "You will oversee multi-disciplinary sprint teams spanning UI/UX design, frontend engineering, backend development, and QA, maintaining seamless delivery pipelines.",
    ],
    responsibilities: [
      "Run sprint planning, daily standups, retrospectives, and backlog grooming across multiple active client workstreams.",
      "Maintain delivery velocity, mitigate risks, and manage dependencies between frontend, backend, and third-party APIs.",
      "Ensure clear scope definitions and protect sprint boundaries from scope creep while maintaining delivery agility.",
      "Coordinate QA testing, staging environments, cross-browser audits, and production release sign-offs.",
      "Communicate progress milestones and timeline updates transparently to account managers and clients.",
    ],
    whatWereLookingFor: [
      "Deep passion for modern digital delivery and technical craftsmanship.",
      "Structured thinking combined with agile flexibility.",
      "Exceptional written and verbal communication across engineering and business stakeholders.",
    ],
    skillsAndExperience: [
      "3+ years managing software or web development projects in an agency or high-growth tech environment.",
      "Certified Scrum Master (CSM) or equivalent agile delivery expertise.",
      "Hands-on experience with Jira, GitHub, linear delivery workflows, and CI/CD awareness.",
    ],
    applicationDeadline: "Open until filled",
  },
  {
    slug: "frontend-developer",
    title: "Front End Developer",
    displayHeading: "We're looking for a Front End Developer.",
    department: "Technology & Engineering",
    employmentType: "Full Time",
    workplaceType: "Remote",
    location: "Remote (UK / India)",
    experienceLevel: "3+ years modern frontend development",
    salary: "Competitive industry package",
    heroImage: "/images/culture/photo-1531403009284-440f080d1e12.jpg",
    heroImageAlt: "Front End Developer coding modern interactive UI at Better Insights",
    status: "open",
    shortDescription:
      "Craft bespoke digital interactions, micro-animations, and high-velocity web experiences using React, Next.js, and Tailwind CSS.",
    aboutRole: [
      "At Better Insights, frontend engineering is where high design meets engineering rigor. We treat every pixel, easing curve, and responsive breakpoint with meticulous attention.",
      "You will build bespoke marketing websites, interactive calculators, headless ecommerce experiences, and web applications that set industry benchmarks.",
    ],
    responsibilities: [
      "Develop responsive, pixel-perfect user interfaces in Next.js 15, React 19, TypeScript, and Tailwind CSS.",
      "Implement fluid animations, SVG morphs, and micro-interactions using Framer Motion and modern CSS.",
      "Optimize core web vitals, bundle size, caching headers, and client-side rendering performance.",
      "Integrate headless APIs, WordPress REST/GraphQL endpoints, and external CRM platforms.",
      "Participate in code reviews, component library architecture, and automated testing.",
    ],
    whatWereLookingFor: [
      "Obsessive attention to UI detail, typography, and fluid user experience.",
      "Pride in clean, maintainable, self-documenting code.",
      "Eagerness to explore modern web technologies including edge runtimes and AI integrations.",
    ],
    skillsAndExperience: [
      "3+ years building production applications with React, Next.js, TypeScript, and Tailwind CSS.",
      "Deep knowledge of HTML5 semantic structure, CSS architecture, and WCAG accessibility standards.",
      "Experience with Git, headless CMS integration, and performance benchmarking tools.",
    ],
    applicationDeadline: "Open until filled",
  },
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    displayHeading: "We're looking for a Graphic Designer.",
    department: "Brand & Creative",
    employmentType: "Part Time",
    workplaceType: "Remote",
    location: "Remote / Hybrid",
    experienceLevel: "2+ years brand & visual design",
    salary: "Competitive hourly / monthly package",
    heroImage: "/images/culture/photo-1552664730-d307ca884978.jpg",
    heroImageAlt: "Creative design session at Better Insights",
    status: "open",
    shortDescription:
      "Design distinct brand identities, editorial layouts, marketing collateral, and digital brand systems.",
    aboutRole: [
      "Help shape the visual identity of Better Insights and our enterprise clients. You will create brand systems, marketing campaigns, pitch decks, and visual design assets that resonate.",
    ],
    responsibilities: [
      "Create high-impact brand identities, typography guidelines, and design systems.",
      "Design digital campaign assets, social media creative, infographics, and editorial artwork.",
      "Collaborate with web designers and copywriters to ensure unified brand storytelling.",
    ],
    whatWereLookingFor: [
      "Strong portfolio demonstrating typography, color mastery, and conceptual thinking.",
      "Ability to articulate design rationale and receive feedback constructively.",
    ],
    skillsAndExperience: [
      "Proficiency in Figma, Adobe Creative Cloud (Illustrator, Photoshop, InDesign).",
      "Experience creating vectors, brand guidelines, and presentation decks.",
    ],
    applicationDeadline: "Open until filled",
  },
  {
    slug: "freelance-photographers",
    title: "Freelance Photographers",
    displayHeading: "We're looking for Freelance Photographers.",
    department: "Creative & Media",
    employmentType: "Part Time",
    workplaceType: "On-site",
    location: "Manchester, London & On-site",
    experienceLevel: "Professional portfolio required",
    salary: "Day rate competitive",
    heroImage: "/images/culture/photo-1559136555-9303baea8ebd.jpg",
    heroImageAlt: "Studio and on-site photography production",
    status: "open",
    shortDescription:
      "Capture team culture, client case studies, office vibes, and commercial project imagery.",
    aboutRole: [
      "Join our freelance media roster to document Better Insights culture, team events, client workplace stories, and commercial photography projects across the UK.",
    ],
    responsibilities: [
      "Shoot high-end team portraits, editorial lifestyle photography, and office atmosphere imagery.",
      "Execute on-site client commercial shoots and case study photography.",
      "Deliver color-graded, high-resolution and web-optimized asset packages.",
    ],
    whatWereLookingFor: [
      "Exceptional eye for authentic, candid storytelling without corporate clichés.",
      "Professional lighting and location camera gear.",
    ],
    skillsAndExperience: [
      "Demonstrated portfolio in editorial, lifestyle, or commercial photography.",
      "Proficiency in Lightroom and Photoshop color grading.",
    ],
    applicationDeadline: "Open until filled",
  },
];

/**
 * Retrieve a career by its slug. Defaults to the primary reference (Account Manager) if not found.
 */
export function getCareerBySlug(slug: string): CareerDetail {
  const match = CAREERS_LIST.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
  if (match) return match;

  // Fallback to Account Manager if unrecognized slug
  return CAREERS_LIST[0];
}

/**
 * Retrieve all career slugs for static generation.
 */
export function getAllCareerSlugs(): string[] {
  return CAREERS_LIST.map((c) => c.slug);
}
