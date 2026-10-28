export interface ServiceChallenge {
  id: string;
  title: string;
  problem: string;
  consequence: string;
  solution: string;
}

export interface ServiceCapability {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  tag: string;
}

export interface ServiceProcessStep {
  step: string;
  phase: string;
  name: string;
  headline: string;
  details: string;
  deliverables: string[];
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceSynergy {
  serviceSlug: string;
  serviceName: string;
  connection: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  aliases: string[];
  title: string;
  shortTitle: string;
  eyebrow: string;
  heroHeadline: string;
  heroDescription: string;
  heroVideo?: string;
  heroPoster: string;
  cardImage: string;
  shortDesc: string;
  categoryTag: string;
  contactServiceValue: string;
  overview: {
    badge: string;
    headline: string;
    subheadline: string;
    description: string;
    targetAudience: string[];
    coreOutcomes: string[];
  };
  challenges: ServiceChallenge[];
  capabilities: ServiceCapability[];
  process: ServiceProcessStep[];
  synergies: ServiceSynergy[];
  projectSlugs: string[];
  relatedSlugs: string[];
  faqs: ServiceFaq[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "service-website-development",
    slug: "website-development",
    aliases: ["web-development", "wordpress-development"],
    title: "Website Development",
    shortTitle: "Web Development",
    eyebrow: "Digital Experiences",
    heroHeadline: "Digital experiences designed to move your business forward.",
    heroDescription:
      "From high-performance headless Next.js platforms to conversion-focused custom e-commerce, we combine architectural speed, intuitive UX, and enterprise CMS foundations.",
    heroVideo: "/videos/2.mp4",
    heroPoster: "/images/Digital-Experiences-Built-to-Perform.webp",
    cardImage: "/images/Digital-Experiences-Built-to-Perform.webp",
    shortDesc:
      "Fast, scalable digital experiences designed for growth. Headless WordPress, Next.js, and high-converting storefronts engineered for maximum performance.",
    categoryTag: "Platform Engineering",
    contactServiceValue: "Website Development",
    overview: {
      badge: "Architecture & Experience",
      headline: "High-Performance Web. Flawless Brand Experience.",
      subheadline:
        "We craft enterprise web platforms that combine sub-second page rendering, conversion-focused user interfaces, and robust headless CMS architectures.",
      description:
        "Modern customers expect instantaneous interactions and seamless mobile responsiveness. Traditional monolithic websites often suffer from bloated code, sluggish database queries, and vulnerable plugin ecosystems. We engineer decoupled web architectures using Next.js and TypeScript on the frontend, paired with familiar WordPress editorial workflows on the backend. This gives your marketing team creative freedom while guaranteeing 90+ Core Web Vitals, enterprise-grade security, and unlimited scalability.",
      targetAudience: [
        "Fast-scaling direct-to-consumer and B2B brands",
        "E-commerce merchants experiencing traffic spikes during product drops",
        "Enterprises seeking to decouple content authoring from frontend presentation",
        "Organizations needing strict WCAG 2.1 AA accessibility and sub-second load times",
      ],
      coreOutcomes: [
        "90+ Google PageSpeed and Lighthouse scores across mobile and desktop",
        "Sub-second Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS)",
        "Zero frontend exposure to common CMS security vulnerabilities",
        "Intuitive Gutenberg/WordPress block workflows for marketing authors",
      ],
    },
    challenges: [
      {
        id: "web-c1",
        title: "Sluggish Page Speed & Poor Core Web Vitals",
        problem: "Heavy legacy themes and redundant JavaScript libraries drag load times well above 3 seconds.",
        consequence: "High bounce rates, depressed Google search rankings, and wasted ad spend on paid acquisition funnels.",
        solution: "We build with Next.js App Router, edge-rendered HTML, optimized WebP/AVIF images, and zero unnecessary client JS.",
      },
      {
        id: "web-c2",
        title: "Monolithic CMS Rigidity & Plugin Bloat",
        problem: "Content updates frequently break page layouts or conflict with third-party database plugins.",
        consequence: "Marketing velocity grinds to a halt while engineering spends hours resolving minor plugin regressions.",
        solution: "Decoupled headless architecture isolates content schemas via GraphQL and REST APIs, preserving complete design integrity.",
      },
      {
        id: "web-c3",
        title: "Checkout Bottlenecks & Concurrency Crashes",
        problem: "Standard e-commerce engines lock database tables during high-volume flash sales or product releases.",
        consequence: "Cart timeouts, lost transactions, and frustrated customers during peak revenue windows.",
        solution: "Edge-cached catalog data, serverless queue tokenization, and one-click headless checkout flows.",
      },
      {
        id: "web-c4",
        title: "Inaccessible Interfaces & Responsive Breakage",
        problem: "Designs fail on varied viewports (from 360px mobile to 4K displays) and lack keyboard focus states.",
        consequence: "Legal compliance risks under ADA/WCAG guidelines and alienating up to 20% of assistive tech users.",
        solution: "Built strictly to WCAG 2.1 AA standards with fluid typography, semantic HTML5, and full keyboard navigation.",
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Headless WordPress & Next.js Platforms",
        description:
          "Decoupled web architecture giving content editors an intuitive WordPress dashboard while delivering ultra-fast React server rendering.",
        deliverables: [
          "App Router & Server-Side Rendering (SSR)",
          "Incremental Static Regeneration (ISR)",
          "Restricted Private API Security",
        ],
        tag: "Decoupled CMS",
      },
      {
        number: "02",
        title: "Core Web Vitals & Speed Engineering",
        description:
          "Systematic code and asset optimization guaranteeing near-instant page transitions, 90+ Lighthouse metrics, and minimal network payloads.",
        deliverables: [
          "Modern WebP/AVIF Image Pipelines",
          "Zero-JS Below-the-Fold Hydration",
          "Global Edge CDN Caching",
        ],
        tag: "Performance",
      },
      {
        number: "03",
        title: "Custom E-Commerce & Drop Architecture",
        description:
          "High-converting storefronts engineered for high concurrency, frictionless one-page checkout UX, and real-time inventory sync.",
        deliverables: [
          "Frictionless 1-Click Checkout UX",
          "Queue Tokenization for Flash Drops",
          "Inventory & Accounting API Sync",
        ],
        tag: "E-Commerce",
      },
      {
        number: "04",
        title: "Accessible & Responsive UI/UX Systems",
        description:
          "Custom design systems engineered and tested from 360px mobile up to ultra-wide desktop displays with full assistive technology support.",
        deliverables: [
          "Fluid Typography & Spacing Tokens",
          "Full Keyboard & Screen Reader Support",
          "Micro-Interactions & Hover Polish",
        ],
        tag: "Accessibility",
      },
      {
        number: "05",
        title: "API Middleware & Microservices Connectors",
        description:
          "Secure middleware bridges linking your website seamlessly with ERP, CRM, marketing automation, and proprietary internal databases.",
        deliverables: [
          "RESTful & GraphQL API Endpoints",
          "Webhook Listeners & Queue Buffering",
          "End-to-End Payload Encryption",
        ],
        tag: "Integration",
      },
      {
        number: "06",
        title: "SEO Architecture & Migration Guardrails",
        description:
          "Flawless technical search structure with structured JSON-LD data, automated XML sitemaps, and zero-loss redirect engineering.",
        deliverables: [
          "Automated Schema Markup (JSON-LD)",
          "Legacy URL 301 Redirect Mapping",
          "Dynamic OpenGraph & Social Metadata",
        ],
        tag: "Search Architecture",
      },
    ],
    process: [
      {
        step: "01",
        phase: "Phase 1",
        name: "Discover",
        headline: "Stack Audit & Audience Mapping",
        details:
          "We analyze your current site performance, traffic bottlenecks, content authoring pain points, and technical requirements before writing a single line of code.",
        deliverables: ["Performance & SEO Audit", "Content Schema Modeling", "Technical Architecture Blueprint"],
      },
      {
        step: "02",
        phase: "Phase 2",
        name: "Strategize",
        headline: "Wireframes, Design Tokens & Tech Stack",
        details:
          "We build responsive UI components, establish design tokens, plan headless API endpoints, and establish a clear development milestone roadmap.",
        deliverables: ["High-Fidelity Figma Wireframes", "Design System & Tokens", "API Mapping Document"],
      },
      {
        step: "03",
        phase: "Phase 3",
        name: "Build",
        headline: "Edge-Rendered Next.js Development",
        details:
          "Our engineering team develops the frontend using Next.js, connects headless CMS fields, implements micro-interactions, and integrates checkout pipelines.",
        deliverables: ["Staging Environment Access", "Decoupled CMS Integration", "Cross-Browser & Device QA"],
      },
      {
        step: "04",
        phase: "Phase 4",
        name: "Optimize",
        headline: "Lighthouse Verification & Zero-Downtime Launch",
        details:
          "We execute load tests, verify Core Web Vitals, implement 301 redirect mappings, switch DNS with zero downtime, and train your team on content authoring.",
        deliverables: ["90+ Lighthouse Verification", "301 Redirect Execution", "Editor Training & Documentation"],
      },
    ],
    synergies: [
      {
        serviceSlug: "digital-growth",
        serviceName: "Digital Growth",
        connection: "Conversion & Search Foundations",
        description:
          "A sub-second website provides the essential landing experience needed for high-converting paid search campaigns and top organic SEO rankings.",
      },
      {
        serviceSlug: "crm-integrations",
        serviceName: "CRM & Integrations",
        connection: "Frictionless Lead Capture",
        description:
          "Every website form, demo booking, and e-commerce transaction syncs immediately into your CRM without manual data entry or dropped inquiries.",
      },
      {
        serviceSlug: "technology-engineering",
        serviceName: "Technology & Engineering",
        connection: "Scalable Cloud Infrastructure",
        description:
          "Backed by enterprise cloud architectures, edge computing networks, and resilient database caching for 99.99% operational uptime.",
      },
    ],
    projectSlugs: ["sanction-store", "stylebar-ireland"],
    relatedSlugs: ["digital-growth", "crm-integrations", "technology-engineering"],
    faqs: [
      {
        question: "Why choose Headless WordPress over standard PHP WordPress themes?",
        answer:
          "Headless WordPress decouples the backend content management from the frontend presentation layer. This delivers dramatic speed improvements (sub-second page loads), immunity to common WordPress frontend security exploits, and unlimited flexibility to build bespoke React animations and components.",
      },
      {
        question: "Can our marketing team still edit text, images, and blogs easily?",
        answer:
          "Yes, completely. Your team continues to use the familiar WordPress Gutenberg editor or custom block dashboard. When changes are published, Next.js revalidates the specific page incrementally via ISR (Incremental Static Regeneration) within seconds without requiring a full site rebuild.",
      },
      {
        question: "How do you guarantee Core Web Vitals scores above 90?",
        answer:
          "We engineer performance into the core architecture: server-side rendering with edge caching, automated WebP/AVIF image generation, strict font display swapping, elimination of render-blocking stylesheets, and deferring non-critical scripts until after the page has visually rendered.",
      },
      {
        question: "How do you handle migrations from existing websites without losing SEO rankings?",
        answer:
          "We preserve complete SEO equity by auditing all existing URLs, creating a comprehensive 1-to-1 301 redirect map, retaining critical meta tags, migrating structured data schemas, and monitoring Google Search Console throughout and after deployment.",
      },
    ],
  },
  {
    id: "service-crm-integrations",
    slug: "crm-integrations",
    aliases: ["crm-development"],
    title: "CRM & Integrations",
    shortTitle: "CRM & Integrations",
    eyebrow: "Commercial Connectivity",
    heroHeadline: "Connected data pipelines that eliminate operational friction.",
    heroDescription:
      "Unify customer touchpoints, automate commercial handoffs, and synchronize enterprise tools into a single, real-time source of truth.",
    heroVideo: "/videos/2.mp4",
    heroPoster: "/images/CRM-INTEGRATIONS.webp",
    cardImage: "/images/CRM-INTEGRATIONS.webp",
    shortDesc:
      "Connect sales, marketing, and customer operations seamlessly. Custom API connectors, automated lead routing, and bidirectional data synchronization.",
    categoryTag: "Enterprise Systems",
    contactServiceValue: "CRM & Integrations",
    overview: {
      badge: "Pipeline Architecture",
      headline: "Data and Connection. Accelerate Revenue Pipelines.",
      subheadline:
        "Synchronize commercial workflows, unify customer intelligence, and eliminate data silos with high-speed bidirectional integration architecture.",
      description:
        "When customer data is scattered across fragmented tools—CRMs, marketing automation, accounting software, and support helpdesks—sales teams lose momentum and customer experiences degrade. We engineer bidirectional data integration pipelines and custom webhook middleware that keep your commercial tools in sync. Whether integrating HubSpot, Salesforce, Zoho, WhatsApp Business API, or bespoke internal databases, we build secure, fault-tolerant infrastructure that routes leads instantly, tracks customer lifecycles, and delivers single-pane reporting.",
      targetAudience: [
        "Enterprises struggling with disjointed customer data across multiple SaaS platforms",
        "Healthcare and clinic networks requiring instant, compliant diagnostic telemetry delivery",
        "High-volume sales organizations losing qualified leads due to slow manual routing",
        "Finance and operational teams needing automated billing and ERP synchronization",
      ],
      coreOutcomes: [
        "100% elimination of manual double-entry between CRM, billing, and support tools",
        "Sub-2-minute automated lead dispatch and customer notification velocity",
        "Unified 360-degree customer intelligence dashboards for executive visibility",
        "Encrypted, bank-grade webhook listeners with zero transaction drop guarantees",
      ],
    },
    challenges: [
      {
        id: "crm-c1",
        title: "Data Silos & Fragmented Customer Context",
        problem: "Sales, marketing, and customer success use disconnected platforms with out-of-sync contact records.",
        consequence: "Reps contact clients with stale information, duplicate accounts proliferate, and customer trust erodes.",
        solution: "We build real-time bidirectional sync architectures that reconcile data schemas automatically with zero duplicates.",
      },
      {
        id: "crm-c2",
        title: "Slow Lead Response Times & Dropped Inquiries",
        problem: "Website inquiries sit in an inbox or basic spreadsheet before someone manually copies them into a CRM.",
        consequence: "Prospective clients lose interest or buy from competitors who respond within minutes.",
        solution: "Instant webhook routing with automated lead scoring, immediate WhatsApp/SMS acknowledgments, and rep alerts.",
      },
      {
        id: "crm-c3",
        title: "Fragile Third-Party Connectors & Silent Sync Failures",
        problem: "Off-the-shelf no-code connectors break quietly when API schemas change or rate limits are exceeded.",
        consequence: "Orders, invoices, or customer appointments go missing without triggering any alerts.",
        solution: "Custom enterprise middleware engineered with dead-letter queue buffering, automatic retry logic, and error telemetry.",
      },
      {
        id: "crm-c4",
        title: "Lack of Commercial Attribution & Funnel Visibility",
        problem: "Marketing cannot prove which ad campaigns generated closed-won revenue because data stops at form submission.",
        consequence: "Budgets are allocated based on vanity metrics rather than actual pipeline ROI.",
        solution: "Closed-loop CRM attribution linking ad campaign IDs, offline deal values, and customer lifetime value.",
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Enterprise CRM Implementation & Customization",
        description:
          "Tailoring Salesforce, HubSpot, or Zoho around your exact commercial pipeline, deal stages, and custom entity relationships.",
        deliverables: [
          "Salesforce, HubSpot & Zoho Setup",
          "Custom Pipeline & Stage Architecture",
          "Automated Deal Stage Transitions",
        ],
        tag: "CRM Setup",
      },
      {
        number: "02",
        title: "Bidirectional Real-Time Data Synchronization",
        description:
          "Keeping critical commercial and operational records continuously synchronized across billing, support, and marketing tools.",
        deliverables: [
          "Real-Time Webhook Middleware",
          "Conflict Resolution & Deduplication Logic",
          "Zero Data Loss Guarantee",
        ],
        tag: "Data Sync",
      },
      {
        number: "03",
        title: "Omnichannel Telemetry & Messaging Automation",
        description:
          "Direct integration with WhatsApp Business API, SMS gateways, and transactional email to deliver instant notifications and reports.",
        deliverables: [
          "Official WhatsApp Business API Integration",
          "Automated PDF Document Generation",
          "Encrypted Patient & Customer Dispatch",
        ],
        tag: "Messaging",
      },
      {
        number: "04",
        title: "Intelligent Lead Scoring & Dynamic Routing",
        description:
          "Algorithmic lead qualification based on company size, engagement triggers, and geography, automatically assigned to the right account executive.",
        deliverables: [
          "Custom Lead Scoring Rubrics",
          "Round-Robin & Territory-Based Routing",
          "Instant Slack & Mobile Notifications",
        ],
        tag: "Lead Routing",
      },
      {
        number: "05",
        title: "ERP & Accounting Integration Pipelines",
        description:
          "Connecting CRM won deals with QuickBooks, Stripe, Xero, or SAP to automate invoicing, revenue recognition, and payment status updates.",
        deliverables: [
          "Automated Invoice Generation",
          "Stripe & Payment Gateway Reconciliations",
          "Credit & Subscription Status Sync",
        ],
        tag: "ERP Integration",
      },
      {
        number: "06",
        title: "Comprehensive Pipeline & Attribution Reporting",
        description:
          "Unified executive dashboards detailing pipeline velocity, conversion rates by source, rep productivity, and customer lifetime value.",
        deliverables: [
          "Closed-Loop Revenue Attribution",
          "Executive KPI Dashboards",
          "Automated Weekly Performance Reports",
        ],
        tag: "Analytics",
      },
    ],
    process: [
      {
        step: "01",
        phase: "Phase 1",
        name: "Discover",
        headline: "Data Audit & Workflow Mapping",
        details:
          "We audit all active SaaS platforms, API rate limits, customer data fields, and manual handoffs to understand exact integration requirements.",
        deliverables: ["Current State Architecture Map", "Data Dictionary & Field Mapping", "Security & Compliance Review"],
      },
      {
        step: "02",
        phase: "Phase 2",
        name: "Strategize",
        headline: "Integration Topology & Middleware Design",
        details:
          "We design the middleware architecture, event schemas, webhook authentication, error-recovery mechanisms, and data transformation rules.",
        deliverables: ["Integration Architecture Specification", "API Payload Contracts", "Failover & Retry Blueprint"],
      },
      {
        step: "03",
        phase: "Phase 3",
        name: "Build",
        headline: "Middleware Engineering & Pipeline Testing",
        details:
          "We build serverless webhook endpoints, configure CRM automations, test edge cases with mock data, and verify bidirectional synchronization.",
        deliverables: ["Custom API Middleware Deployment", "Sandbox End-to-End Testing", "Telemetry & Error Logging Queue"],
      },
      {
        step: "04",
        phase: "Phase 4",
        name: "Optimize",
        headline: "Production Cutover & Observability",
        details:
          "We execute production sync cutover, monitor latency metrics, conduct staff training on updated CRM workflows, and establish alerting thresholds.",
        deliverables: ["Production Verification", "Staff Onboarding & Video Guides", "Ongoing Health Monitoring"],
      },
    ],
    synergies: [
      {
        serviceSlug: "ai-automation",
        serviceName: "AI & Automation",
        connection: "Autonomous Customer Processing",
        description:
          "Combine unified CRM records with autonomous AI agents to auto-qualify inquiries, summarize customer histories, and draft personalized follow-ups.",
      },
      {
        serviceSlug: "digital-growth",
        serviceName: "Digital Growth",
        connection: "Closed-Loop Attribution",
        description:
          "Feed offline sales data back to advertising platforms so algorithmic bidding targets high-value buyers rather than low-quality clicks.",
      },
      {
        serviceSlug: "digital-transformation",
        serviceName: "Digital Transformation",
        connection: "Connected Enterprise Operations",
        description:
          "Eliminate operational silos across clinical, commercial, and operational divisions by synchronizing data across modern cloud tools.",
      },
    ],
    projectSlugs: ["gt-diagnostics"],
    relatedSlugs: ["ai-automation", "digital-transformation", "website-development"],
    faqs: [
      {
        question: "Which CRM platforms do you specialize in integrating?",
        answer:
          "We have deep implementation experience with HubSpot, Salesforce, Zoho CRM, Pipedrive, and custom internal relational databases (PostgreSQL, MySQL, MongoDB). We also connect specialized industry systems such as Laboratory Information Systems (LIS) and healthcare management tools.",
      },
      {
        question: "What happens if a third-party API goes down or changes its rate limit?",
        answer:
          "Our integration middleware includes resilient message queues (Redis/SQS) and dead-letter queues. If an endpoint temporarily fails or returns a rate limit error, the event is safely buffered and automatically retried using exponential backoff without any data loss.",
      },
      {
        question: "Can you automate WhatsApp messages when a customer status changes?",
        answer:
          "Yes. Through the official WhatsApp Business Cloud API, we build automated triggers that dispatch template messages, appointment reminders, password-protected PDF reports, or customer service follow-ups whenever a record updates in your CRM.",
      },
      {
        question: "How long does a typical CRM integration project take?",
        answer:
          "Straightforward integrations (such as website forms syncing to HubSpot with lead scoring) typically deploy in 1 to 2 weeks. Comprehensive multi-system bidirectional syncs involving ERPs, custom databases, and legacy platforms typically span 3 to 6 weeks.",
      },
    ],
  },
  {
    id: "service-ai-automation",
    slug: "ai-automation",
    aliases: ["ai-solutions"],
    title: "AI & Automation",
    shortTitle: "AI & Automation",
    eyebrow: "Cognitive Systems",
    heroHeadline: "Practical intelligence engineered for measurable operational velocity.",
    heroDescription:
      "Deploy context-aware AI agents, autonomous workflow automation, and proprietary LLM integrations that liberate teams from manual repetition.",
    heroVideo: "/videos/2.mp4",
    heroPoster: "/images/AI-AUTOMATION.webp",
    cardImage: "/images/AI-AUTOMATION.webp",
    shortDesc:
      "Practical intelligence that drives measurable operational velocity. Autonomous multi-agent workflows, intelligent document parsing, and predictive AI models.",
    categoryTag: "Applied Intelligence",
    contactServiceValue: "AI & Automation",
    overview: {
      badge: "Cognitive Engineering",
      headline: "People and AI. Deliver More Together.",
      subheadline:
        "We combine human expertise, creative thinking, and intelligent technology to help businesses solve complex challenges, accelerate delivery, and create measurable impact.",
      description:
        "Real transformation happens when artificial intelligence is woven seamlessly into everyday workflows, amplifying human judgment rather than replacing it. We build production-ready AI applications that connect directly to your proprietary enterprise knowledge base, CRM, and databases. From autonomous counseling agents and intelligent document parsing to predictive decision models, our solutions eliminate operational bottlenecks while adhering to strict privacy, governance, and audit standards.",
      targetAudience: [
        "Knowledge-intensive companies processing thousands of documents, inquiries, or contracts",
        "Educational institutions and EdTech platforms delivering personalized student guidance",
        "Enterprises seeking to deploy proprietary, private LLM agents without leaking confidential data",
        "Operational leaders looking to automate repetitive, multi-step clerical and back-office tasks",
      ],
      coreOutcomes: [
        "Up to 60% reduction in document review, query resolution, and counseling cycle time",
        "24/7 autonomous inquiry triage with natural language understanding and contextual memory",
        "100% private data isolation with enterprise-grade encryption and zero public training leakage",
        "Seamless human-in-the-loop escalation when confidence thresholds require expert review",
      ],
    },
    challenges: [
      {
        id: "ai-c1",
        title: "Manual Knowledge Retrieval & Information Bottlenecks",
        problem: "Associates spend hours hunting for policies, course details, or contract clauses across fragmented PDFs and intranet files.",
        consequence: "Slow customer answers, high labor overhead, and inconsistent recommendations that introduce compliance risk.",
        solution: "We build high-speed Retrieval-Augmented Generation (RAG) agents that query internal knowledge bases with cited sources.",
      },
      {
        id: "ai-c2",
        title: "Repetitive Inquiries Overwhelming Front-Line Teams",
        problem: "Support and admissions counselors answer identical baseline questions around the clock.",
        consequence: "Staff burnout, delayed responses for high-intent qualified buyers, and high customer drop-off.",
        solution: "Deploy conversational AI copilots capable of conducting structured intake interviews, booking appointments, and qualification.",
      },
      {
        id: "ai-c3",
        title: "Unstructured Data Trapped in Siloed Documents",
        problem: "Invoices, legal briefs, medical charts, and intake forms require tedious manual data entry.",
        consequence: "High error rates, transcription bottlenecks, and inability to analyze real-time business telemetry.",
        solution: "Automated OCR and multimodal LLM extraction pipelines that parse unstructured documents directly into structured SQL/JSON.",
      },
      {
        id: "ai-c4",
        title: "Hallucination Risk & Lack of Governance in Consumer AI",
        problem: "Generic public chatbots provide inaccurate answers and expose sensitive company information.",
        consequence: "Loss of client trust, regulatory non-compliance, and internal hesitation to adopt AI tools.",
        solution: "Strict deterministic guardrails, confidence threshold scoring, prompt insulation, and audit-logged interactions.",
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Cognitive AI Agents & Enterprise Copilots",
        description:
          "Deploying context-aware conversational agents trained on proprietary enterprise knowledge to guide customers and assist internal teams.",
        deliverables: [
          "Enterprise RAG Architecture",
          "Vector Database Indexing (Pinecone / pgvector)",
          "Real-Time Multi-Turn Memory",
        ],
        tag: "AI Agents",
      },
      {
        number: "02",
        title: "Autonomous Multi-Agent Workflow Orchestration",
        description:
          "Coordinating specialized AI agents that collaborate across tools, APIs, and databases to resolve complex multi-step operational tasks.",
        deliverables: [
          "Multi-Agent Task Decomposition",
          "Tool-Calling & API Execution Chains",
          "Human-in-the-Loop Approval Gates",
        ],
        tag: "Workflow Automation",
      },
      {
        number: "03",
        title: "Intelligent Document Processing (IDP)",
        description:
          "Transforming unstructured PDFs, contracts, and scanned forms into validated, structured commercial data using advanced NLP models.",
        deliverables: [
          "Automated Document Classification",
          "Multimodal OCR & Key-Value Extraction",
          "Direct Database Ingestion Pipelines",
        ],
        tag: "Document Intelligence",
      },
      {
        number: "04",
        title: "Predictive Analytics & Churn Modeling",
        description:
          "Building machine learning models that analyze historical customer behaviors to forecast demand, spot churn indicators, and optimize resources.",
        deliverables: [
          "Customer Churn Risk Scoring",
          "Demand Forecasting & Resource Planning",
          "Executive Telemetry Dashboards",
        ],
        tag: "Predictive ML",
      },
      {
        number: "05",
        title: "Custom LLM Fine-Tuning & Prompt Architecture",
        description:
          "Adapting open-source and proprietary foundation models with domain-specific terminology, brand voice guidelines, and structured outputs.",
        deliverables: [
          "Domain-Specific Fine-Tuning Pipelines",
          "System Prompt Engineering & Few-Shot Libraries",
          "Latency & Token Usage Optimization",
        ],
        tag: "Model Tuning",
      },
      {
        number: "06",
        title: "AI Safety, Governance & Observability",
        description:
          "Implementing continuous evaluation frameworks to monitor model accuracy, detect drift, protect privacy, and ensure zero hallucinations.",
        deliverables: [
          "PII Masking & Data Sanitization Layers",
          "Hallucination Detection & Fallback Routing",
          "Full Audit Logging & Token Cost Telemetry",
        ],
        tag: "Governance",
      },
    ],
    process: [
      {
        step: "01",
        phase: "Phase 1",
        name: "Discover",
        headline: "Use Case Feasibility & Data Readiness",
        details:
          "We evaluate your operational workflows, identify high-ROI automation targets, assess data cleanliness, and establish safety parameters.",
        deliverables: ["AI Feasibility & ROI Matrix", "Data Readiness Assessment", "Security & Governance Plan"],
      },
      {
        step: "02",
        phase: "Phase 2",
        name: "Strategize",
        headline: "Architecture, Vector Stores & Guardrails",
        details:
          "We architect the vector embedding strategy, define prompt templates, establish confidence thresholds, and design human escalation protocols.",
        deliverables: ["RAG Architecture Specification", "Prompt Engineering Framework", "Evaluation Benchmark Dataset"],
      },
      {
        step: "03",
        phase: "Phase 3",
        name: "Build",
        headline: "Agent Development & Systems Integration",
        details:
          "We develop the AI agents, build API connectors to your CRM or database, integrate guardrail filters, and run comprehensive red-teaming tests.",
        deliverables: ["Functional AI Copilot Staging", "API Connectors & Webhook Integration", "Red-Teaming & Accuracy Verification"],
      },
      {
        step: "04",
        phase: "Phase 4",
        name: "Optimize",
        headline: "Deployment, Observability & Feedback Loops",
        details:
          "We deploy the solution with real-time observability telemetry, train staff on effective prompting, and establish continuous reinforcement loops.",
        deliverables: ["Production Rollout", "Observability Dashboard Setup", "Continuous Model Evaluation Cadence"],
      },
    ],
    synergies: [
      {
        serviceSlug: "crm-integrations",
        serviceName: "CRM & Integrations",
        connection: "Intelligent Action Execution",
        description:
          "AI agents execute actions directly in your CRM—logging call notes, advancing deal stages, and dispatching personalized proposals automatically.",
      },
      {
        serviceSlug: "technology-engineering",
        serviceName: "Technology & Engineering",
        connection: "Production-Grade AI Infrastructure",
        description:
          "Backed by low-latency serverless microservices, vector databases, and resilient cloud architectures designed for high concurrency.",
      },
      {
        serviceSlug: "digital-transformation",
        serviceName: "Digital Transformation",
        connection: "Workforce Amplification",
        description:
          "Modernize legacy operational workflows by giving employees cognitive copilots that cut repetitive tasks and accelerate business velocity.",
      },
    ],
    projectSlugs: ["course-proxy", "veda-edu"],
    relatedSlugs: ["crm-integrations", "technology-engineering", "digital-transformation"],
    faqs: [
      {
        question: "Will our proprietary business data be used to train public AI models?",
        answer:
          "No. We exclusively utilize enterprise API endpoints (such as OpenAI Enterprise, Azure OpenAI, AWS Bedrock, or self-hosted open-source models) where agreements legally prohibit customer data from being used for model training. Your data remains strictly isolated and confidential.",
      },
      {
        question: "How do you prevent the AI from making up answers (hallucinations)?",
        answer:
          "We utilize strict Retrieval-Augmented Generation (RAG) architectures with confidence scoring. The agent is strictly instructed to respond only using retrieved facts from your approved documentation, cites its sources, and gracefully hands off to human staff when confidence is below threshold.",
      },
      {
        question: "What is the difference between an AI chatbot and an autonomous AI agent?",
        answer:
          "A basic chatbot simply responds to questions with text. An autonomous agent has reasoning capabilities and tool access: it can look up customer records in your CRM, trigger calendar bookings, generate custom PDF proposals, and call external APIs to complete tasks from start to finish.",
      },
      {
        question: "Can an AI solution integrate with our existing legacy database?",
        answer:
          "Yes. We build secure API middleware and read-only connectors that safely index or query your existing SQL databases, document drives, or ERP systems without disrupting active production operations.",
      },
    ],
  },
  {
    id: "service-digital-growth",
    slug: "digital-growth",
    aliases: ["performance-marketing", "seo-search-strategy"],
    title: "Digital Growth",
    shortTitle: "Digital Growth",
    eyebrow: "Performance Scaling",
    heroHeadline: "Data-driven customer acquisition engineered for sustainable ROI.",
    heroDescription:
      "Transform user attention into scalable revenue through technical search architecture, high-intent paid acquisition, and conversion rate optimization.",
    heroVideo: "/videos/2.mp4",
    heroPoster: "/images/DIGITAL-GROWTH.webp",
    cardImage: "/images/DIGITAL-GROWTH.webp",
    shortDesc:
      "Data-driven customer acquisition engineered for sustainable ROI. Technical search architecture, paid search scaling, conversion funnels, and retention loops.",
    categoryTag: "Revenue Acceleration",
    contactServiceValue: "Digital Growth",
    overview: {
      badge: "Performance Engineering",
      headline: "Strategy and Experimentation. Drive Measurable Expansion.",
      subheadline:
        "We combine empirical data analysis, precision marketing, and iterative experimentation to expand your market reach and maximize customer lifetime value.",
      description:
        "Growth is not a one-time marketing campaign—it is an ongoing discipline of behavioral analysis, technical search engine architecture, precision media buying, and conversion path refinement. We build acquisition engines that focus on pipeline revenue rather than vanity metrics. By engineering high-intent paid search funnels, localized international landing experiences, and multi-touch attribution models, we lower blended customer acquisition cost (CAC) while scaling qualified lead volume across competitive markets.",
      targetAudience: [
        "International consultancies and higher-ed organizations expanding into new regional markets",
        "E-commerce brands seeking to lower blended CAC and scale monthly recurring revenue",
        "Mobile app publishers needing to acquire high-retention users through organic ASO and paid channels",
        "B2B service providers with low website conversion rates on existing traffic",
      ],
      coreOutcomes: [
        "Significant reductions in blended Cost Per Lead (CPL) and Cost Per Acquisition (CPA)",
        "3x+ Return on Ad Spend (ROAS) via algorithmic bidding and high-intent query filtering",
        "Continuous conversion lift through weekly hypothesis-driven A/B testing",
        "Crystal-clear multi-touch attribution connecting marketing spend directly to closed deals",
      ],
    },
    challenges: [
      {
        id: "growth-c1",
        title: "Escalating Customer Acquisition Costs (CAC)",
        problem: "Rising ad auction competition drives up cost-per-click while conversion rates remain stagnant.",
        consequence: "Diminishing profit margins, unscalable paid ad funnels, and vulnerability to ad platform algorithm changes.",
        solution: "We implement negative keyword gating, high-intent query grouping, and localized landing pages that maximize Quality Scores.",
      },
      {
        id: "growth-c2",
        title: "High Bounce Rates on Generic Landing Pages",
        problem: "Ad campaigns send traffic to generic homepages that fail to match the specific search intent of the user.",
        consequence: "Visitors leave within seconds, wasting valuable ad clicks and depressing campaign return on spend.",
        solution: "We design and deploy dedicated, high-converting regional landing funnels tailored directly to specific user intents.",
      },
      {
        id: "growth-c3",
        title: "Lack of Multi-Touch Attribution Visibility",
        problem: "Analytics treat the last click as the only contributor, obscuring the impact of top-of-funnel channels.",
        consequence: "Executives cut effective brand campaigns prematurely or double down on channels that fail to close sales.",
        solution: "We configure server-side tracking (GA4, CAPI) and closed-loop CRM telemetry to map the entire customer journey.",
      },
      {
        id: "growth-c4",
        title: "Organic Search Blind Spots & Technical SEO Decay",
        problem: "Websites suffer from slow indexing, crawl budget waste, broken canonicals, and missing schema markup.",
        consequence: "Competitors capture top rankings for valuable commercial search queries, costing free organic customer volume.",
        solution: "Comprehensive technical SEO audits, site speed optimization, schema architecture, and high-authority search content.",
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "High-Intent Paid Search & PPC Architecture",
        description:
          "Structuring algorithmic Google & Bing ad campaigns focused strictly on commercial intent, tight ad grouping, and maximized ROAS.",
        deliverables: [
          "Commercial Intent Keyword Architecture",
          "Automated Smart Bidding Calibration",
          "Continuous Negative Match Cleansing",
        ],
        tag: "Paid Search",
      },
      {
        number: "02",
        title: "Technical Search Engine Architecture (SEO)",
        description:
          "Engineering your site's crawl budget, semantic JSON-LD structured data, internal linking hierarchy, and Core Web Vitals for search dominance.",
        deliverables: [
          "Complete Technical SEO & Crawl Audit",
          "Structured Data Schema Engineering",
          "International Hreflang & Multi-Region Setup",
        ],
        tag: "Technical SEO",
      },
      {
        number: "03",
        title: "Conversion Rate Optimization (CRO)",
        description:
          "Deploying iterative A/B and multivariate tests across headlines, CTA placements, form lengths, and value propositions to turn clicks into pipeline.",
        deliverables: [
          "Hypothesis-Driven Testing Roadmap",
          "Heatmap & Session Replay Diagnostics",
          "Sub-Second High-Converting Landing Funnels",
        ],
        tag: "CRO & Testing",
      },
      {
        number: "04",
        title: "International Market Scaling & Localization",
        description:
          "Expanding student and customer acquisition funnels into competitive overseas corridors with culturally tailored messaging and currency display.",
        deliverables: [
          "Cross-Border Market Opportunity Audits",
          "Localized Landing Page Funnels",
          "Regional Timezone & Language Routing",
        ],
        tag: "Global Expansion",
      },
      {
        number: "05",
        title: "App Store Optimization (ASO) & Mobile Growth",
        description:
          "Scaling mobile app install volume through keyword optimization, visual asset testing, smart deep links, and organic referral loops.",
        deliverables: [
          "iOS App Store & Google Play ASO",
          "Smart Web-to-App Onboarding Funnels",
          "Viral Referral & Sharing Loops",
        ],
        tag: "Mobile Growth",
      },
      {
        number: "06",
        title: "Server-Side Tracking & Multi-Touch Attribution",
        description:
          "Implementing privacy-compliant server-side tracking (Meta Conversions API, Google Ads Enhanced Conversions) that bypasses ad blockers.",
        deliverables: [
          "Server-Side Google Tag Manager (sGTM)",
          "Meta CAPI & Enhanced Conversions Sync",
          "Closed-Loop Revenue Dashboard",
        ],
        tag: "Attribution",
      },
    ],
    process: [
      {
        step: "01",
        phase: "Phase 1",
        name: "Discover",
        headline: "Funnel Forensics & Market Audit",
        details:
          "We analyze past campaign data, identify leakages across your conversion funnel, benchmark competitor ad footprints, and review tracking accuracy.",
        deliverables: ["Full Conversion Funnel Audit", "Competitor Keyword & Ad Analysis", "Tracking & Attribution Verification"],
      },
      {
        step: "02",
        phase: "Phase 2",
        name: "Strategize",
        headline: "Targeting Matrix & Landing Page Blueprints",
        details:
          "We structure targeted audience personas, map search queries to dedicated landing experiences, and create an aggressive testing hypothesis roadmap.",
        deliverables: ["Paid Media Account Blueprint", "High-Converting Wireframes", "90-Day Experimentation Roadmap"],
      },
      {
        step: "03",
        phase: "Phase 3",
        name: "Build",
        headline: "Campaign Deployment & Landing Funnels",
        details:
          "We engineer conversion-optimized landing pages, configure server-side conversion tags, write compelling ad copy, and launch initial test sprints.",
        deliverables: ["Live Dedicated Landing Pages", "Server-Side Tracking Activation", "Campaign Launch Verification"],
      },
      {
        step: "04",
        phase: "Phase 4",
        name: "Optimize",
        headline: "Algorithmic Scaling & Weekly A/B Cadence",
        details:
          "We review conversion performance weekly, reallocate budget to top-performing segments, run split tests on landing page elements, and scale profitably.",
        deliverables: ["Weekly Attribution & ROAS Reports", "Bi-Weekly A/B Test Releases", "Continuous Bidding Optimization"],
      },
    ],
    synergies: [
      {
        serviceSlug: "website-development",
        serviceName: "Website Development",
        connection: "Conversion Engine Synergy",
        description:
          "A modern, ultra-fast website converts traffic at double the rate of a slow legacy site, immediately improving your paid marketing return on investment.",
      },
      {
        serviceSlug: "crm-integrations",
        serviceName: "CRM & Integrations",
        connection: "Closed-Loop Revenue Reporting",
        description:
          "Sync ad click IDs into your CRM so marketing campaigns can be evaluated and optimized based on closed revenue rather than shallow form fills.",
      },
      {
        serviceSlug: "ai-automation",
        serviceName: "AI & Automation",
        connection: "Automated Lead Qualification",
        description:
          "Direct incoming ad traffic into intelligent AI counseling funnels that engage leads instantly, answer questions, and schedule qualified consultations.",
      },
    ],
    projectSlugs: ["the-ly", "voyya-app-growth", "old-fort-quarter"],
    relatedSlugs: ["website-development", "crm-integrations", "ai-automation"],
    faqs: [
      {
        question: "How do you measure success in digital growth engagements?",
        answer:
          "We measure success strictly on business revenue outcomes: qualified leads generated, cost per acquisition (CPA), return on ad spend (ROAS), and pipeline contribution—not vanity metrics like raw impressions or unqualified traffic clicks.",
      },
      {
        question: "What is your approach to conversion rate optimization (CRO)?",
        answer:
          "We use a scientific, hypothesis-driven methodology. We analyze heatmaps, session recordings, and analytics drop-off points to formulate specific test hypotheses, then run statistically valid A/B split tests on copy, layout, and user flows to systematically lift conversion.",
      },
      {
        question: "How do you bypass recent ad tracking limitations like iOS 14.5 and ad blockers?",
        answer:
          "We implement server-side tracking using Server-Side Google Tag Manager (sGTM) and direct Conversions APIs (Meta CAPI, Google Enhanced Conversions). Data is processed on your own first-party cloud domain, ensuring near 100% data fidelity and accurate conversion attribution.",
      },
      {
        question: "How quickly can we expect to see results from a digital growth campaign?",
        answer:
          "Paid search and conversion optimization improvements typically yield measurable lead volume and CPA gains within the first 14 to 30 days. Technical SEO improvements and organic authority compound sustainably over 60 to 120 days.",
      },
    ],
  },
  {
    id: "service-digital-transformation",
    slug: "digital-transformation",
    aliases: [],
    title: "Digital Transformation",
    shortTitle: "Digital Transformation",
    eyebrow: "Enterprise Modernization",
    heroHeadline: "Connecting legacy enterprise silos with modern digital agility.",
    heroDescription:
      "Modernize customer journeys, deconstruct legacy bottlenecks, and align organizational operations around scalable digital foundations.",
    heroVideo: "/videos/2.mp4",
    heroPoster: "/images/DIGITAL-TRANSFORMATION.webp",
    cardImage: "/images/DIGITAL-TRANSFORMATION.webp",
    shortDesc:
      "Connecting legacy enterprise silos with modern digital agility. Holistic modernization roadmaps, decoupled cloud platforms, and paperless operational ecosystems.",
    categoryTag: "Enterprise Evolution",
    contactServiceValue: "Digital Transformation",
    overview: {
      badge: "Modernization Roadmap",
      headline: "Vision and Velocity. Transform with Purpose.",
      subheadline:
        "Modernizing legacy infrastructure, empowering agile teams, and orchestrating digital ecosystems built for sustainable long-term competitive advantage.",
      description:
        "Digital transformation succeeds only when technology investments directly empower people and eliminate real operational friction. Too many organizations attempt digital modernization through disruptive rip-and-replace software purchases that overwhelm staff and fail to deliver ROI. We take an iterative, domain-driven approach: analyzing user bottlenecks, decoupling legacy monolithic systems into agile cloud services, and designing intuitive self-service portals. From digitizing hospital OPD queues and telehealth to paperless billing, we deliver transformations that make an immediate, tangible impact.",
      targetAudience: [
        "Healthcare systems and hospital networks burdened by paper queues and phone scheduling",
        "Legacy enterprise institutions needing to modernize outdated customer-facing interfaces",
        "Organizations experiencing inter-departmental data silos that impede operational velocity",
        "Institutions seeking to introduce digital self-service capabilities without disrupting operations",
      ],
      coreOutcomes: [
        "60%+ reduction in customer or patient waiting times through digital self-service",
        "Elimination of manual paper record keeping and fragmented physical folders",
        "Zero-disruption phased migration away from brittle on-premise legacy systems",
        "High user adoption rates backed by intuitive UX and thorough change management",
      ],
    },
    challenges: [
      {
        id: "trans-c1",
        title: "Overcrowded In-Person Waiting Queues & Manual Scheduling",
        problem: "Customers or patients queue for hours or jam phone lines just to book an appointment or check status.",
        consequence: "Frustrated clients, overwhelmed front-desk staff, lost revenue, and poor operational throughput.",
        solution: "We build intuitive digital queue management systems with live SMS/WhatsApp status tracking and self-booking.",
      },
      {
        id: "trans-c2",
        title: "Monolithic Legacy Systems That Inhibit Innovation",
        problem: "Core operational data is trapped in decades-old on-premise software with no open APIs.",
        consequence: "Inability to launch mobile portals, modern digital services, or connect with modern SaaS tools.",
        solution: "We engineer decoupled API adapter layers around legacy cores, enabling modern digital experiences without risky system replacements.",
      },
      {
        id: "trans-c3",
        title: "Fragmented Department Silos & Duplicate Effort",
        problem: "Different teams operate isolated software systems that cannot communicate with one another.",
        consequence: "Employees spend hours copying data manually between tools, resulting in severe data entry errors.",
        solution: "We design unified cross-department data workflows that synchronize records and status updates in real time.",
      },
      {
        id: "trans-c4",
        title: "Staff Resistance & Low Adoption of New Tools",
        problem: "New enterprise software is rolled out without involving front-line staff in user testing.",
        consequence: "Staff revert to paper or offline spreadsheets, causing expensive software investments to fail.",
        solution: "We design human-centered interfaces, run participatory workshops, and provide hands-on role-specific training.",
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Holistic Enterprise Architecture & Modernization Roadmaps",
        description:
          "Developing clear digital transformation roadmaps that align executive leadership, legacy infrastructure, and operational teams toward measurable outcomes.",
        deliverables: [
          "Enterprise Digital Maturity Assessment",
          "Phased Modernization Architecture Blueprint",
          "Risk Mitigation & Phasing Strategy",
        ],
        tag: "Strategy",
      },
      {
        number: "02",
        title: "Digital Queue Management & Telehealth Platforms",
        description:
          "Transforming physical queues into seamless digital experiences with live token tracking, mobile appointment booking, and video consultations.",
        deliverables: [
          "Self-Service Patient/Customer Booking Portals",
          "Real-Time OPD Token Telemetry",
          "Encrypted Telehealth Consultation Rooms",
        ],
        tag: "HealthTech & Queue",
      },
      {
        number: "03",
        title: "Legacy System Decoupling & Cloud Migration",
        description:
          "Safely modernizing on-premise legacy software by architecting modern cloud-native API facades and microservices around existing databases.",
        deliverables: [
          "Legacy Core API Wrapping",
          "Cloud Infrastructure Migration (AWS / GCP)",
          "Zero-Downtime Data Re-Platforming",
        ],
        tag: "Cloud Migration",
      },
      {
        number: "04",
        title: "Paperless Operational Workflows & Digital Billing",
        description:
          "Eliminating paper forms, physical billing queues, and manual filing cabinets with secure digital intake and payment collection.",
        deliverables: [
          "Digital Document Sign-Off & Verification",
          "Automated Invoicing & Payment Gateways",
          "Compliance-Ready Digital Archives",
        ],
        tag: "Paperless Ops",
      },
      {
        number: "05",
        title: "Unified Customer & Patient Portals",
        description:
          "Designing responsive self-service web portals where customers can access records, update information, and track requests 24/7.",
        deliverables: [
          "Secure Self-Service Web & Mobile Portals",
          "Role-Based Authentication (RBAC)",
          "Real-Time Status Tracking Feeds",
        ],
        tag: "Self-Service",
      },
      {
        number: "06",
        title: "Change Enablement & Digital Culture Training",
        description:
          "Empowering internal staff with the training, documentation, and operational cadences required to embrace digital tools enthusiastically.",
        deliverables: [
          "Role-Specific Staff Video Guides",
          "Hands-On Interactive Workshops",
          "Ongoing Post-Launch Adoption Audits",
        ],
        tag: "Change Enablement",
      },
    ],
    process: [
      {
        step: "01",
        phase: "Phase 1",
        name: "Discover",
        headline: "Journey Mapping & Legacy Constraints",
        details:
          "We observe operational workflows in action, interview department leads, map customer journey bottlenecks, and audit technical constraints.",
        deliverables: ["Current-State Journey Maps", "Legacy Software Dependency Matrix", "Transformation Business Case"],
      },
      {
        step: "02",
        phase: "Phase 2",
        name: "Strategize",
        headline: "Phased Roadmap & Target Architecture",
        details:
          "We architect the target digital ecosystem, establish quick-win milestones, plan API middleware adapters, and define compliance boundaries.",
        deliverables: ["Target System Architecture", "Phase-by-Phase Rollout Schedule", "Regulatory & Security Compliance Plan"],
      },
      {
        step: "03",
        phase: "Phase 3",
        name: "Build",
        headline: "Iterative Engineering & Pilot Deployment",
        details:
          "We develop self-service portals, build API adapters to legacy systems, test with a focused pilot user group, and refine based on feedback.",
        deliverables: ["Pilot Environment Deployment", "Legacy API Integration Handlers", "Pilot User Feedback Synthesis"],
      },
      {
        step: "04",
        phase: "Phase 4",
        name: "Optimize",
        headline: "Organization-Wide Rollout & Adoption Tracking",
        details:
          "We roll out the platform across all departments, deliver comprehensive staff training, monitor queue and response times, and optimize continuously.",
        deliverables: ["Full Production Rollout", "Staff Training Completion", "Operational Efficiency KPIs Tracking"],
      },
    ],
    synergies: [
      {
        serviceSlug: "crm-integrations",
        serviceName: "CRM & Integrations",
        connection: "Unified Commercial Operations",
        description:
          "Connect newly modernized self-service portals directly with your core CRM and billing engines for immediate data synchronization.",
      },
      {
        serviceSlug: "technology-engineering",
        serviceName: "Technology & Engineering",
        connection: "Resilient Cloud Infrastructure",
        description:
          "Deploy modernization initiatives on secure, auto-scaling cloud architectures built for 99.99% reliability and enterprise compliance.",
      },
      {
        serviceSlug: "ai-automation",
        serviceName: "AI & Automation",
        connection: "Cognitive Workflow Assistance",
        description:
          "Augment digitized operational workflows with AI models that triage requests, extract document data, and provide proactive decision support.",
      },
    ],
    projectSlugs: ["pooja-hospital-telehealth"],
    relatedSlugs: ["technology-engineering", "crm-integrations", "ai-automation"],
    faqs: [
      {
        question: "Does digital transformation mean we have to replace all our existing software?",
        answer:
          "No. Replacing all core systems simultaneously is expensive, high-risk, and disruptive. We use a modular modernization approach, wrapping API facades and modern digital interfaces around your proven legacy systems to deliver immediate value without operational chaos.",
      },
      {
        question: "How do you ensure our staff actually adopts the new digital systems?",
        answer:
          "We design interfaces with direct input from front-line staff, ensuring software solves their everyday pain points rather than creating extra steps. We also conduct interactive training sessions and provide concise, role-specific video guides.",
      },
      {
        question: "How do you handle sensitive patient or financial data security during modernization?",
        answer:
          "Security is architected from day one: end-to-end data encryption in transit and at rest, strict role-based access control (RBAC), multi-factor authentication, comprehensive audit logging, and compliance with healthcare (HIPAA/DISHA) and data privacy standards.",
      },
      {
        question: "What is the typical timeline for an initial digital transformation milestone?",
        answer:
          "We prioritize high-impact 'quick wins.' An initial digital queue management system, customer portal, or paperless workflow is typically delivered and piloted within 4 to 8 weeks, with broader phased rollouts following sequentially.",
      },
    ],
  },
  {
    id: "service-technology-engineering",
    slug: "technology-engineering",
    aliases: ["software-engineering"],
    title: "Technology & Engineering",
    shortTitle: "Technology & Engineering",
    eyebrow: "Software Engineering",
    heroHeadline: "Resilient digital architectures built to perform under extreme demands.",
    heroDescription:
      "Full-stack software engineering, secure enterprise portals, cloud-native platforms, and mission-critical API infrastructure designed for scale, security, and uptime.",
    heroVideo: "/videos/2.mp4",
    heroPoster: "/images/TECHNOLOGY-ENGINEERING.webp",
    cardImage: "/images/TECHNOLOGY-ENGINEERING.webp",
    shortDesc:
      "Enterprise architecture, cloud solutions, and full-stack development. High-concurrency platforms, secure legal & enterprise portals, and robust microservices.",
    categoryTag: "Core Engineering",
    contactServiceValue: "Technology & Engineering",
    overview: {
      badge: "Full-Stack Excellence",
      headline: "Engineering Excellence. Built for Peak Performance.",
      subheadline:
        "We architect and build resilient digital products, scalable cloud platforms, and mission-critical software solutions tailored to ambitious business goals.",
      description:
        "Modern digital business requires software architectures that can withstand massive user concurrency, resist sophisticated security threats, and evolve smoothly as business models pivot. We build resilient full-stack web and mobile systems, secure private enterprise portals with role-based access control (RBAC), and cloud-native microservices. By applying disciplined engineering standards, automated CI/CD pipelines, and proactive observability, we build technology that delivers consistent, sub-second speed and 99.99% uptime.",
      targetAudience: [
        "Law firms, corporate practices, and institutions requiring secure private portals and RBAC",
        "E-commerce enterprises requiring scalable high-concurrency drop infrastructure",
        "High-growth startups needing full-stack architecture built to scale to millions of users",
        "Enterprises seeking to deconstruct legacy monoliths into cloud-native microservices",
      ],
      coreOutcomes: [
        "99.99% platform availability under extreme concurrency surges",
        "Bank-grade security with granular role-based access control and full audit trails",
        "Sub-second API response times through intelligent edge caching and database indexing",
        "Automated CI/CD deployment pipelines ensuring zero-downtime releases",
      ],
    },
    challenges: [
      {
        id: "eng-c1",
        title: "Monolithic Systems Crashing Under Concurrency Spikes",
        problem: "Traffic spikes during product releases or corporate announcements overwhelm single-server databases.",
        consequence: "System outages, failed transactions, severe brand damage, and emergency engineering fire drills.",
        solution: "We architect edge-rendered frontend stacks with Redis caching, serverless compute, and database read replicas.",
      },
      {
        id: "eng-c2",
        title: "Confidentiality Vulnerabilities & Inadequate Access Controls",
        problem: "Internal document stores lack granular permissions, exposing sensitive client files to unauthorized eyes.",
        consequence: "Severe compliance liabilities, regulatory fines, and loss of institutional trust with high-value clients.",
        solution: "We implement rigorous role-based access control (RBAC), encrypted storage at rest, and tamper-proof audit telemetry.",
      },
      {
        id: "eng-c3",
        title: "Technical Debt Paralyzing Product Velocity",
        problem: "Unstructured legacy codebases make adding minor features risky and excruciatingly slow.",
        consequence: "Competitors out-innovate your product while development costs skyrocket.",
        solution: "We refactor architectures into modular microservices with type-safe TypeScript contracts and automated test coverage.",
      },
      {
        id: "eng-c4",
        title: "Fragmented Infrastructure Without Proactive Observability",
        problem: "Engineering only discovers system failures when angry customers contact support.",
        consequence: "Extended downtime, high mean-time-to-recovery (MTTR), and loss of operational confidence.",
        solution: "We deploy comprehensive telemetry (OpenTelemetry, Prometheus, Datadog) with automated anomaly alerting.",
      },
    ],
    capabilities: [
      {
        number: "01",
        title: "Digital Product & Full-Stack Web Engineering",
        description:
          "End-to-end software development using Next.js, React, Node.js, and TypeScript, engineered for speed, type safety, and scalability.",
        deliverables: [
          "Next.js App Router Architecture",
          "Full-Stack TypeScript Development",
          "REST & GraphQL API Endpoints",
        ],
        tag: "Full-Stack",
      },
      {
        number: "02",
        title: "Secure Enterprise Portals & RBAC Systems",
        description:
          "Engineering private, confidential client chambers with strict role-based access controls, multi-factor authentication, and document search.",
        deliverables: [
          "Granular Role-Based Access Control (RBAC)",
          "Encrypted Document Repositories",
          "Tamper-Proof Audit Logging",
        ],
        tag: "Enterprise Security",
      },
      {
        number: "03",
        title: "Cloud Infrastructure & Edge Deployments",
        description:
          "Architecting elastic, auto-scaling cloud foundations on AWS, Google Cloud, and Cloudflare with global CDN caching and containerization.",
        deliverables: [
          "Infrastructure as Code (Terraform)",
          "Docker & Kubernetes Containerization",
          "Global Edge CDN & DNS Engineering",
        ],
        tag: "Cloud Architecture",
      },
      {
        number: "04",
        title: "High-Throughput API Middleware & Microservices",
        description:
          "Building fault-tolerant API gateways that route millions of transactions smoothly between disparate internal and third-party systems.",
        deliverables: [
          "Microservices Deconstruction",
          "Message Queue Buffering (Redis / SQS)",
          "Sub-100ms API Response Optimization",
        ],
        tag: "Microservices",
      },
      {
        number: "05",
        title: "Automated CI/CD Pipelines & Testing Suites",
        description:
          "Implementing automated build, lint, unit test, and end-to-end testing pipelines that allow continuous deployment with zero downtime.",
        deliverables: [
          "GitHub Actions CI/CD Workflows",
          "Jest, Playwright & Cypress Automation",
          "Zero-Downtime Blue/Green Deployments",
        ],
        tag: "DevOps",
      },
      {
        number: "06",
        title: "24/7 Platform Telemetry & Observability",
        description:
          "Equipping software platforms with real-time health metrics, synthetic monitoring, and instant automated incident alerting.",
        deliverables: [
          "OpenTelemetry & Log Aggregation",
          "Synthetic Health Check Pings",
          "Automated Pager & Slack Escalations",
        ],
        tag: "Observability",
      },
    ],
    process: [
      {
        step: "01",
        phase: "Phase 1",
        name: "Discover",
        headline: "Architecture Audit & Scalability Modeling",
        details:
          "We review system architecture, analyze database query performance, map security attack surfaces, and model concurrency requirements.",
        deliverables: ["Technical Debt & Code Audit", "Security & RBAC Specification", "Scalability & Concurrency Model"],
      },
      {
        step: "02",
        phase: "Phase 2",
        name: "Strategize",
        headline: "Schema Design, API Contracts & Tech Blueprint",
        details:
          "We define database schemas, document API contracts, select cloud infrastructure components, and establish coding standards.",
        deliverables: ["Database Entity Relationship Diagram", "OpenAPI / Swagger Contract Specs", "Infrastructure Architecture Diagram"],
      },
      {
        step: "03",
        phase: "Phase 3",
        name: "Build",
        headline: "Agile Sprints & Automated Test Coverage",
        details:
          "Our senior engineering team develops the platform in 2-week agile sprints, accompanied by automated unit, integration, and end-to-end tests.",
        deliverables: ["Sprint Demo Deployments", "Automated CI/CD Integration", "Comprehensive Test Coverage Suite"],
      },
      {
        step: "04",
        phase: "Phase 4",
        name: "Optimize",
        headline: "Penetration Testing, Load Testing & Launch",
        details:
          "We conduct security penetration tests, simulate concurrency load surges, verify zero-downtime cutover, and establish 24/7 telemetry monitoring.",
        deliverables: ["Penetration & Load Test Reports", "Zero-Downtime Production Cutover", "Post-Launch Observability Setup"],
      },
    ],
    synergies: [
      {
        serviceSlug: "website-development",
        serviceName: "Website Development",
        connection: "Architectural Speed & Reliability",
        description:
          "Engineering rigor powers high-converting web storefronts and marketing platforms with sub-second page rendering and resilient edge caching.",
      },
      {
        serviceSlug: "ai-automation",
        serviceName: "AI & Automation",
        connection: "Scalable Vector & Model Deployments",
        description:
          "Provides the robust, low-latency API infrastructure and secure data pipelines required to deploy enterprise AI agents at scale.",
      },
      {
        serviceSlug: "digital-transformation",
        serviceName: "Digital Transformation",
        connection: "Modern Cloud Foundations",
        description:
          "Deconstructs legacy monoliths into cloud-native microservices, providing the technological backbone for digital enterprise modernization.",
      },
    ],
    projectSlugs: ["khare-legal-chambers", "sanction-store"],
    relatedSlugs: ["website-development", "ai-automation", "digital-transformation"],
    faqs: [
      {
        question: "How do you ensure enterprise software security and data protection?",
        answer:
          "We follow a defense-in-depth security philosophy: TLS 1.3 encryption in transit, AES-256 encryption at rest, strict Principle of Least Privilege role-based access controls (RBAC), parameterized SQL queries to prevent injection, and automated vulnerability scanning in our CI/CD pipelines.",
      },
      {
        question: "Can you take over and modernize an existing codebase that was poorly built?",
        answer:
          "Yes. We conduct an initial Technical Debt & Architecture Audit, identify security vulnerabilities and performance bottlenecks, wrap unstable components in automated tests, and refactor code modularly without disrupting your live production users.",
      },
      {
        question: "What technology stack do you primarily recommend for modern web applications?",
        answer:
          "We specialize in modern, high-performance stacks: Next.js and TypeScript on the frontend, Node.js or Python microservices on the backend, PostgreSQL/MongoDB for transactional persistence, Redis for caching and message queuing, and AWS/Cloudflare for global edge delivery.",
      },
      {
        question: "How do you ensure zero downtime during production updates?",
        answer:
          "We use containerized Blue/Green or Canary deployment strategies managed via automated CI/CD pipelines. New software versions are fully spun up and health-checked in parallel before traffic is switched over atomically, guaranteeing 100% uninterrupted user sessions.",
      },
    ],
  },
];

// Helper functions
export function getAllServices(): ServiceItem[] {
  return SERVICES_DATA;
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const normalized = slug.toLowerCase().trim();
  return SERVICES_DATA.find(
    (s) => s.slug === normalized || s.aliases.includes(normalized)
  );
}

export function getRelatedServices(slug: string): ServiceItem[] {
  const current = getServiceBySlug(slug);
  if (!current) return SERVICES_DATA.slice(0, 3);
  return SERVICES_DATA.filter((s) => current.relatedSlugs.includes(s.slug)).slice(0, 3);
}
