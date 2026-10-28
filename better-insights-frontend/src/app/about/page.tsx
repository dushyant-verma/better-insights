"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  Compass,
  Code2,
  Network,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";
import { AboutHeroSlider } from "@/components/about/AboutHeroSlider";
import { TeamModal, TeamMemberData } from "@/components/about/TeamModal";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";
import "@/styles/about.css";

const METRICS = [
  {
    number: "36",
    symbol: "+",
    label: "Clients & Brands Served",
    desc: "Enterprise & high-growth businesses",
  },
  {
    number: "8",
    symbol: "+",
    label: "Technology Platforms",
    desc: "Cloud, CRM & AI partner integrations",
  },
  {
    number: "6",
    symbol: "",
    label: "Core Digital Capabilities",
    desc: "Strategy, creative & engineering",
  },
  {
    number: "100",
    symbol: "%",
    label: "Outcome-Driven Focus",
    desc: "Accountable, measurable ROI delivery",
  },
];

const PHILOSOPHY_PRINCIPLES = [
  {
    number: "01",
    title: "Strategy Before Tactics",
    desc: "We interrogate assumptions, analyze customer behavior, and engineer solutions rooted in commercial reality before writing a line of code or launching a campaign.",
    tag: "Clarity & Intent",
  },
  {
    number: "02",
    title: "Creativity With Purpose",
    desc: "Visual design and storytelling crafted to elevate brand authority, command attention, and drive meaningful customer action—never superficial decoration.",
    tag: "Brand Authority",
  },
  {
    number: "03",
    title: "Technology That Works",
    desc: "Practical, scalable systems engineered with AI and cloud architecture that eliminate operational bottlenecks without unnecessary complexity.",
    tag: "Pragmatic Engineering",
  },
  {
    number: "04",
    title: "Growth You Can Measure",
    desc: "Transparent attribution, verified performance metrics, and continuous optimization designed to deliver compounding business value and sustained ROI.",
    tag: "Compound ROI",
  },
];

const CAPABILITIES = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    desc: "High-performance digital experiences, custom headless architectures, and conversion-engineered web applications built for speed, SEO, and scale.",
    href: "/services/website-development",
    image: "/images/TECHNOLOGY-ENGINEERING.webp",
    badges: ["Next.js & Headless", "Enterprise Speed", "Conversion UX"],
  },
  {
    id: "crm-integrations",
    number: "02",
    title: "CRM & Integrations",
    desc: "Unifying commercial databases, HubSpot/Zoho pipelines, and bidirectional API synchronization to eliminate data silos and accelerate sales velocity.",
    href: "/services/crm-integrations",
    image: "/images/CRM-INTEGRATIONS.webp",
    badges: ["HubSpot & Zoho", "Bidirectional Sync", "Real-Time Telemetry"],
  },
  {
    id: "ai-automation",
    number: "03",
    title: "AI & Automation",
    desc: "Production-grade generative AI, intelligent autonomous agents, and automated operational pipelines designed to eliminate manual cognitive friction.",
    href: "/services/ai-automation",
    image: "/images/AI-AUTOMATION.webp",
    badges: ["Agentic Workflows", "Custom LLMs", "Process Automation"],
  },
  {
    id: "digital-growth",
    number: "04",
    title: "Digital Growth",
    desc: "Data-driven performance marketing, technical SEO architecture, and conversion rate optimization designed to systematically lower CPR and accelerate pipeline.",
    href: "/services/digital-growth",
    image: "/images/DIGITAL-GROWTH.webp",
    badges: ["Technical SEO", "Paid Media (CPR)", "Conversion Funnels"],
  },
  {
    id: "digital-transformation",
    number: "05",
    title: "Digital Transformation",
    desc: "Full-lifecycle modernization uniting legacy enterprise architectures, cloud infrastructure, and organizational change into scalable commercial advantages.",
    href: "/services/digital-transformation",
    image: "/images/DIGITAL-TRANSFORMATION.webp",
    badges: ["Cloud Infrastructure", "Enterprise Modernization", "Change Management"],
  },
];

const WORKING_STAGES = [
  {
    step: "01",
    phase: "Discovery & Diagnostics",
    title: "Commercial & Technical Audit",
    desc: "Deep-dive diagnostic into conversion telemetry, code architecture, competitive positioning, and customer friction points to define high-conviction roadmaps.",
    deliverable: "Diagnostic Blueprint & Priority Matrix",
  },
  {
    step: "02",
    phase: "Architecture & Strategy",
    title: "System Blueprinting",
    desc: "Formulating technical blueprints, brand messaging systems, conversion funnels, and data pipeline schemas before writing a single line of code.",
    deliverable: "Engineering Specs & Sprint Roadmap",
  },
  {
    step: "03",
    phase: "Execution & Build",
    title: "Agile Precision Engineering",
    desc: "Rapid sprint development utilizing modern frameworks, clean code standards, AI model integrations, and continuous deployment environments.",
    deliverable: "Production-Ready Releases & QA Signoff",
  },
  {
    step: "04",
    phase: "Telemetry & Scale",
    title: "Continuous ROI Optimization",
    desc: "Post-launch measurement, algorithmic experimentation, search dominance, and systematic iterative enhancements focused entirely on compounding ROI.",
    deliverable: "Attribution Dashboard & Growth Loops",
  },
];

const DIFFERENTIATORS = [
  {
    icon: Target,
    title: "Outcome-Driven Engineering",
    desc: "We don't build software or launch campaigns for vanity metrics. Every line of code, design decision, and media dollar is measured against customer acquisition, retention, and bottom-line margin.",
  },
  {
    icon: Cpu,
    title: "Practical AI & Automation First",
    desc: "We integrate enterprise-grade AI agents and autonomous pipeline workflows into business processes, unlocking operational leverage that traditional agencies cannot replicate.",
  },
  {
    icon: Layers,
    title: "Unified Cross-Disciplinary Squads",
    desc: "Our strategists, developers, and performance marketers collaborate inside unified delivery pods, eliminating communication lag and conflicting agency silos.",
  },
  {
    icon: BarChart3,
    title: "Radical Attribution Transparency",
    desc: "Every design pivot, campaign allocation, and architectural enhancement is validated by real user telemetry and transparent multi-touch attribution.",
  },
  {
    icon: ShieldCheck,
    title: "Long-Term Innovation Partner",
    desc: "We build enduring technology partnerships, working alongside your internal leadership as an agile innovation arm focused on sustainable growth.",
  },
];

/**
 * Real Team Members from WordPress child theme:
 * Source of truth: wp-content/themes/astra-child/template-parts/about/about-team.php
 */
const TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: "gautam-koli",
    name: "Gautam Koli",
    role: "Founder & Director",
    department: "Executive Leadership",
    image: "/team/gautam-koli.png",
    experience: "7+ years leading creative strategy, digital innovation, critical thinking, and agency leadership.",
    expertise: ["Research & Insights", "AI Automation", "Strategic Growth", "Executive Leadership"],
    bio: "As a seasoned professional with 7 years of experience, I bring a unique perspective to my work as a creative thinker. I am driven by my surroundings and inspired by life, allowing me to approach each project with an original and innovative mindset.\n\nI am highly dedicated to my work, consistently striving for excellence through critical thinking and a 'get-it-done' attitude. My progress and success are a result of overcoming obstacles and making my work a priority.\n\nClient satisfaction is of utmost importance to me and I firmly believe that the quality of my work is worth the investment. I take a proactive approach to client relations, anticipating potential challenges and providing long-term solutions tailored to their specific needs. I am committed to maintaining the trust of my clients, and I never make false promises.\n\nMy team is my greatest asset and I am proud to lead a group of highly skilled professionals who bring a unique touch to each project. By fostering an environment of trust and collaboration, we are able to achieve greater insights and make rapid progress as a unit.",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
  {
    id: "dinkey-lekhwani",
    name: "Dinkey Lekhwani",
    role: "Business Development Manager",
    department: "Growth & Partnerships",
    image: "/team/dinkey-lekhwani.png",
    experience: "Data-driven growth roles, client onboarding, full-cycle campaigns, and backend business operations.",
    expertise: ["Client Acquisition", "Shopify Stores", "Zoho CRM Automation", "Cross-Platform Integrations"],
    interests: ["Swimming", "Badminton", "Gym & Fitness"],
    bio: "Hi, I'm Dinkey Lekhwani, Business Development Manager at Better Insights. I drive 360° growth strategies by seamlessly aligning client goals with digital execution. From leading client onboarding and managing full-cycle campaigns to streamlining backend operations, I work at the core of what makes our digital agency thrive.\n\nWith hands-on expertise in Shopify, Zoho CRM automation, Meta and Google Ads, and cross-platform integrations, I ensure every project delivers results that are not only creative but conversion-focused. My role bridges the gap between client expectations and team execution—handling everything from social media calendars and business automation workflows to ad performance analytics and strategic brand positioning.\n\nMy journey began in data-driven roles, where I developed a sharp eye for optimization and systems thinking, helping teams cut inefficiencies and boost ROI. Today, that foundation empowers me to make smart, scalable decisions that fuel client success across industries like e-commerce, healthcare, tech, and professional services.\n\nWhat keeps me going? A passion for solving problems creatively, a love for marketing tools and automations, and the drive to transform ideas into tangible business impact.\n\nOutside of work, I recharge through physical activities — be it swimming, playing badminton, hitting the gym, or anything that keeps me moving and energized.",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
  {
    id: "kanika-sohal",
    name: "Kanika Sohal",
    role: "HR Manager",
    department: "People & Culture",
    image: "/team/kanika-sohal.png",
    experience: "11+ years in human resource management, policy development, payroll/HRMS, and strategic HR planning.",
    expertise: ["Talent Acquisition", "HR Operations", "Employee Relations", "Strategic HR Planning"],
    education: "Commerce Degree, Delhi University",
    interests: ["Road trips to the mountains", "Spending time with family"],
    bio: "Hi, I'm Kanika Sohal, HR Manager at Better Insights with over 11 years of experience in human resource management. I hold a commerce degree from Delhi University and specialize in HR operations, employee relations, payroll/HRMS management, policy development, employee retention, strategic HR planning, and training & development.\n\nI'm passionate about building people-first, high-trust workplace cultures where employees feel valued and empowered. At Better Insights, I work closely with leadership and teams to design HR strategies that enhance engagement, support growth, and drive long-term business success.\n\nI'm known for being a quick learner, a good listener, and highly prompt in delivering tasks within deadlines. One of my key strengths is the ability to convince others while maintaining a strong work-life balance.\n\nOutside of work, I enjoy road trips to the mountains and cherish spending quality time with my family.",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
  {
    id: "jasika-saini",
    name: "Jasika Saini",
    role: "SEO Analyst",
    department: "Search & Organic Growth",
    image: "/team/jasika-saini.png",
    experience: "SEO & organic search analysis, technical crawl auditing, and performance optimization.",
    expertise: ["SEO Architecture", "Keyword Research", "Crawl Telemetry", "Organic Growth"],
    education: "B.Sc. Mathematics | Digital Marketing, Digiperform Jaipur",
    interests: ["Visiting holy places", "Music enthusiast"],
    bio: "I'm a BSc. Mathematics student, totally out of the traditional marketing industry, but I found my calling when I saw how digital marketing was booming. I joined the Digital Marketing course at Digiperform, Jaipur, and now I'm working at Better Insights. Mentors here are very helpful and clarify every doubt.\n\nDay to day, I always strive to perform better and learn something new. Basically, I'm an introvert. I don't speak too much, but I let my work do the talking. I'm confident that my work and performance provide clients with valuable results.\n\nThe company core value of being 'Committed to Learning' is deeply beneficial for both the company and the team. It directly impacts our personal growth and performance. Outside work, I love going to holy places and exploring inspiring music.",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
  {
    id: "dushyant-verma",
    name: "Dushyant Verma",
    role: "Web Developer",
    department: "Technology & Engineering",
    image: "/team/dushyant-verma.webp",
    experience: "Full Stack Developer & Website Specialist (WordPress, Shopify, PHP, React, Next.js, APIs, AI automations).",
    expertise: ["Full Stack Development", "Next.js & React", "Headless Architecture", "Custom APIs & Integrations"],
    education: "Computer Science & Full Stack Web Development",
    interests: ["Chess", "Badminton", "Traveling", "Exploring AI Tools", "Content Creation"],
    bio: "Hey, I'm Dushyant Verma.\n\nBorn and brought up in Himachal Pradesh, I'm a Full Stack Developer and Website Development Specialist with a strong passion for building digital solutions that create real business impact.\n\nOver the years, I've worked extensively with WordPress, Shopify, PHP, React, Next.js, APIs, and custom web applications, helping businesses, startups, and entrepreneurs establish a strong online presence. From designing websites to developing custom functionalities and optimizing performance, I enjoy turning ideas into scalable digital products.\n\nMy journey started with curiosity about how websites work, and that curiosity eventually turned into a profession. Along the way, I explored web development, software testing, technical support, SEO, automation, and AI-powered solutions, which helped me develop a broader understanding of technology and business.\n\nCurrently, I focus on creating modern websites, e-commerce stores, custom software solutions, and AI-integrated applications. I love solving complex problems, improving user experiences, and finding smarter ways to automate workflows and processes.\n\nMy approach is simple: create, improve, and innovate continuously until the solution delivers real value.\n\nOutside of work, you'll find me playing chess, traveling to new places, analyzing business ideas, or experimenting with emerging AI tools.",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
  {
    id: "priyanka-raghuvanshi",
    name: "Priyanka Raghuvanshi",
    role: "Marketing Operations Associate",
    department: "Marketing Operations",
    image: "/team/priyanka-raghuvanshi.webp",
    experience: "Technical research, automation workflows (Pabbly, Notion, Zoho), brand strategy, and AI trends.",
    expertise: ["Workflow Automation", "Brand Strategist", "Market Trends Research", "AI Integrations"],
    education: "B.Sc. in Computer Science (Pune)",
    interests: ["Listening to music", "Reading", "Exploring AI tools"],
    bio: "Hey, I'm Priyanka Raghuvanshi.\n\nBorn and brought up in Pune, I completed my B.Sc. in Computer Science. During college, I explored content writing, fundraising, and technical internships to learn as much as possible.\n\nAt Better Insights, I dive into technical research, automation tools, and AI trends. I love solving real problems, finding smarter ways to do things, and experimenting with tools like Pabbly, Notion, Zoho, ChatGPT, Gemini, and agentic workflows.\n\nMy approach is pretty simple: 'Do it better and better' until it feels just right. I'm curious, focused, and always ready to learn something new. Whether it's adapting to different tools or helping the team, I genuinely enjoy stepping out of my comfort zone and trying things I haven't done before.\n\nYou'll usually find me listening to music, reading random stuff, tracking cool ideas, or playing around with the latest AI tools just to see what's possible.",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
  {
    id: "riya-balyan",
    name: "Riya Balyan",
    role: "Fractional HR Partner",
    department: "People Operations",
    image: "/team/riya-balyan.png",
    experience: "1.4+ years in HR operations, talent acquisition, grievance handling, and culture building.",
    expertise: ["HR Strategy", "Talent Management", "Culture Building", "People Operations"],
    interests: ["Dancing", "Traveling & Cultural Exploration"],
    bio: "Hi, I'm Riya!\n\nWith 1.4 years of professional experience, currently at Better Insights, I dive into the full spectrum of HR—from hiring and talent acquisition to comprehensive HR operations, including adeptly handling employee grievances.\n\nI'm deeply committed to fostering people-first, high-trust workplace cultures where every employee feels valued and empowered. My approach involves close collaboration with leadership and teams to craft HR strategies that not only boost engagement and support individual growth but also drive sustainable business success.\n\nI thrive on tackling challenges, always eager to find effective solutions, and constantly seek out new opportunities to expand my knowledge and skills. Outside of work, I love to dance, which brings rhythm to my life, and I enjoy embarking on new trips, exploring different places and cultures.",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
  {
    id: "dhruv-bisht",
    name: "Dhruv Bisht",
    role: "Video Editor Intern",
    department: "Creative & Media Production",
    image: "/team/dhruv-bisht.webp",
    experience: "Hands-on video editing, motion graphics, visual storytelling, and post-production workflows.",
    expertise: ["Video Editing", "Visual Effects", "Motion Graphics", "Cinematography"],
    education: "B.Sc. in Media Graphics and Animation",
    interests: ["Visual effects", "Cinematography", "Sound design & transitions"],
    bio: "Hey, I'm Dhruv Bisht. I completed my B.Sc. in Media Graphics and Animation. I am a passionate video editor and visual effects artist dedicated to transforming raw footage into captivating visual stories. With a keen eye for detail, seamless transitions, and cinematic effects, I craft compelling narratives that engage, inspire, and leave a lasting impact.\n\nDuring my internship at Better Insights, I've been developing hands-on experience in video editing, motion graphics, visual storytelling, social media content, and creative post-production. I enjoy experimenting with visuals, pacing, transitions, sound, and storytelling techniques to make every video more impactful.",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
  {
    id: "rishabh-panjwani",
    name: "Rishabh Panjwani",
    role: "Video Editor Intern",
    department: "Creative & Media Production",
    image: "/team/rishabh-panjwani.png",
    experience: "Freelance and agency video editing, cinematography, color grading, and sound design.",
    expertise: ["Video Editing", "Sound Design", "Color Grading", "Visual Content"],
    education: "B.Sc. in Media Graphics and Animation",
    interests: ["Gym & Fitness", "Table Tennis", "Photography", "Music"],
    bio: "Hey, I'm Rishabh Panjwani. I was born and brought up in Dubai, UAE, and I completed my B.Sc. in Media Graphics and Animation.\n\nI spent about six months freelancing and right now I'm interning at Better Insights, where I'm sharpening my skills in video editing, cinematography, color grading, and sound design. I love bringing stories to life through visuals and always look for ways to keep improving my work.\n\nI'm someone who learns best by watching and observing—once I see how something is done, I can replicate it effectively with precision and creativity. At Better Insights, I follow a simple yet powerful mindset: 'Do it better and better.' I take pride in being adaptable and open to different editing styles, blending fresh ideas into my own unique editing approach.\n\nOutside Work, I'm a gym addict who's always got music playing in the background, whether I'm lifting or just chilling. I'm great at table tennis, love capturing moments through my lens, and definitely binge-watch like a pro!",
    linkedin: "https://www.linkedin.com/company/better-insights-bi/",
  },
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  return (
    <div className="bg-[#FAF5F0] text-[#1B1411]">
      {/* ========================================================================= */}
      {/* SECTION 1: HOMEPAGE-ALIGNED EDITORIAL ABOUT HERO                          */}
      {/* ========================================================================= */}
      <section
        className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-[linear-gradient(135deg,#FAF8F5_0%,#F5EFFB_40%,#FAF5F0_75%,#F1EAF8_100%)] text-[#1B1411] overflow-hidden border-b border-black/8"
        aria-label="About Better Insights Hero"
      >
        {/* Subtle Ambient Radial Glow Behind Content */}
        <div
          className="absolute -top-32 left-1/3 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,rgba(139,92,246,0.03)_50%,transparent_75%)] blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Organic Blobs in Bottom-Right Corner (Overlapping, soft-edged, cropped) */}
        <div
          className="absolute -bottom-24 -right-16 sm:-bottom-32 sm:-right-20 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(192,132,252,0.18)_0%,rgba(168,85,247,0.09)_45%,rgba(147,51,234,0.02)_70%,transparent_85%)] blur-[50px] sm:blur-[70px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-8 right-24 sm:-bottom-12 sm:right-40 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full bg-[radial-gradient(circle_at_45%_45%,rgba(147,51,234,0.11)_0%,rgba(167,139,250,0.05)_50%,transparent_75%)] blur-[40px] sm:blur-[60px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 right-6 sm:-bottom-20 sm:right-10 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(51,204,122,0.07)_0%,rgba(51,204,122,0.02)_45%,transparent_70%)] blur-[45px] sm:blur-[65px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Editorial Headline & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEE5DC] border border-black/5 w-fit mb-6">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#1B1411]">
                  About Better Insights
                </span>
              </div>

              {/* Large Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-semibold tracking-tight text-[#1B1411] leading-[1.05]">
                We turn ambitious ideas into{" "}
                <span className="text-[#66574F] block sm:inline">meaningful growth.</span>
              </h1>

              {/* Supporting narrative */}
              <p className="mt-6 text-base sm:text-lg text-[#66574F] max-w-2xl leading-relaxed font-normal">
                Better Insights brings strategy, creativity, engineering, and artificial
                intelligence together to help businesses move forward. From high-converting digital
                platforms to autonomous operations, we turn complex challenges into scalable
                commercial impact.
              </p>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openMarketingPlanModal()}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#33CC7A] text-[#1B1411] text-xs font-bold uppercase tracking-wider hover:bg-[#2BB86D] transition-all duration-300 hover:scale-[1.03] shadow-md shadow-[#33CC7A]/20 cursor-pointer"
                >
                  <span>Get Marketing Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-transparent hover:bg-black/5 text-[#1B1411] text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-black/15"
                >
                  <span>Explore Capabilities</span>
                  <ArrowUpRight className="w-4 h-4 text-[#66574F]" />
                </a>
              </div>
            </div>

            {/* Right: Animated Capabilities Slider */}
            <div className="lg:col-span-5 relative w-full">
              <AboutHeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: OUR STORY / WHO WE ARE & BUSINESS METRICS                       */}
      {/* ========================================================================= */}
      <section
        id="who-we-are"
        className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none"
        aria-label="Our Story and Who We Are"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Asymmetrical Editorial Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 sm:mb-20">
            <div className="lg:col-span-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
                Business growth was the goal.<br />
                <span className="text-[#66574F]">Now, let’s make it measurable.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-5 text-base text-[#66574F] leading-relaxed font-normal">
              <p>
                Better Insights was established with a singular conviction: technology, creative
                design, and marketing must never operate in silos. Ambitious companies don’t need
                fragmented vendors or disconnected experiments—they need unified systems where brand
                strategy, performance engineering, and intelligent automation work in synchrony.
              </p>
              <p>
                We partner with enterprise leaders, high-growth brands, and institutional partners
                to build experiences that capture market share, streamline operational friction, and
                generate accountable, compounding ROI.
              </p>
            </div>
          </div>

          {/* 4 Verified Business Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="p-8 bg-white rounded-[1.75rem] border border-black/8 shadow-sm flex flex-col justify-between hover:border-black/20 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="text-4xl sm:text-6xl font-semibold text-[#1B1411] tracking-tight mb-2">
                    {m.number}
                    <span className="text-[#33CC7A]">{m.symbol}</span>
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight text-[#1B1411] mb-1">
                    {m.label}
                  </h3>
                  <p className="text-xs text-[#66574F] font-normal leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: CORE PHILOSOPHY & PRINCIPLES                                    */}
      {/* ========================================================================= */}
      <section
        id="philosophy"
        className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none"
        aria-label="Core Philosophy"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
              The standards that govern our craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PHILOSOPHY_PRINCIPLES.map((item) => (
              <div
                key={item.number}
                className="p-8 sm:p-10 rounded-[1.75rem] bg-white border border-black/8 shadow-sm flex flex-col justify-between hover:border-black/20 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/5">
                    <span className="text-xs font-mono font-bold text-[#66574F] group-hover:text-[#33CC7A] transition-colors">
                      {item.number}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF5F0] text-[#1B1411] border border-black/5">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-[#1B1411] mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#66574F] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: CORE CAPABILITIES MATRIX                                       */}
      {/* ========================================================================= */}
      <section
        id="capabilities"
        className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none"
        aria-label="Core Capabilities"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
                Full-Lifecycle Solutions
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
                Our strategic capabilities
              </h2>
            </div>
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B1411] hover:text-[#33CC7A] transition-colors"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="p-8 sm:p-10 rounded-[1.75rem] bg-white border border-black/8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-8 hover:border-black/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-mono font-bold text-[#66574F] group-hover:text-[#33CC7A] transition-colors">
                      {cap.number}
                    </span>
                    <span className="text-xs text-black/20">•</span>
                    <span className="text-xs uppercase font-bold tracking-wider text-[#66574F]">
                      Core Domain
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-[#1B1411] mb-3">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#66574F] leading-relaxed mb-6 font-normal">
                    {cap.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cap.badges.map((b) => (
                      <span
                        key={b}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF5F0] border border-black/5 text-[#1B1411]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <Link
                    href={cap.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1B1411] text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all hover:scale-105"
                  >
                    <span>Explore Service</span>
                    <ArrowUpRight className="w-4 h-4 text-[#33CC7A]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: HOW WE WORK (METHODOLOGY)                                      */}
      {/* ========================================================================= */}
      <section
        id="methodology"
        className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none"
        aria-label="How We Work"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
              Delivery Framework
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
              Four stages to predictable scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKING_STAGES.map((st) => (
              <div
                key={st.step}
                className="p-8 rounded-[1.75rem] bg-white border border-black/8 shadow-sm flex flex-col justify-between hover:border-black/20 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="text-3xl font-mono font-bold text-[#66574F] mb-4">
                    {st.step}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#33CC7A] block mb-2">
                    {st.phase}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-[#1B1411] mb-3">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#66574F] leading-relaxed font-normal mb-6">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#66574F] font-mono">
                    Deliverable
                  </span>
                  <span className="text-xs font-semibold text-[#1B1411]">{st.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: WHY BETTER INSIGHTS (DIFFERENTIATORS)                          */}
      {/* ========================================================================= */}
      <section
        id="why-better-insights"
        className="py-20 sm:py-28 bg-[#1B1411] text-[#FAF5F0] border-b border-white/10 select-none"
        aria-label="Why Choose Better Insights"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#33CC7A] block mb-3">
                The Better Insights Advantage
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#FAF5F0] leading-tight">
                Why forward-thinking brands choose us
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base text-[#B8ABA3] font-normal leading-relaxed">
                Strategy-first thinking, technology-driven execution, and accountable growth across
                every customer touchpoint.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map((diff) => {
              const IconComp = diff.icon;
              return (
                <div
                  key={diff.title}
                  className="p-8 rounded-[1.75rem] bg-white/[0.04] border border-white/10 flex flex-col justify-between hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center text-[#33CC7A] mb-6">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#FAF5F0] mb-3">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-[#B8ABA3] leading-relaxed font-normal">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Strategic Overview Card */}
            <div className="p-8 rounded-[1.75rem] bg-[#2E241F] border border-white/15 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#33CC7A] block mb-3">
                  COMPREHENSIVE GOVERNANCE
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-[#FAF5F0] mb-3">
                  Enterprise-Grade Standards
                </h3>
                <p className="text-sm text-[#B8ABA3] leading-relaxed font-normal">
                  All digital platforms and AI solutions are built adhering to strict data privacy
                  standards, automated continuous testing, and zero-downtime deployment pipelines.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FAF5F0] hover:text-[#33CC7A] transition-colors"
                >
                  <span>View Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: EXECUTIVE LEADERSHIP & INTERACTIVE TEAM DIRECTORY               */}
      {/* ========================================================================= */}
      <section
        id="our-team"
        className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none"
        aria-label="Executive Leadership and Team Directory"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
                Leadership &amp; Talent
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
                Meet the team behind Better Insights
              </h2>
            </div>
            <div>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1411] text-[#FAF5F0] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-all hover:scale-105"
              >
                <span>Join Our Team</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Team Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="bg-white rounded-[1.75rem] border border-black/8 overflow-hidden flex flex-col justify-between group hover:border-[#33CC7A]/60 hover:shadow-lg transition-all duration-300 p-6 sm:p-7 cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedMember(member);
                  }
                }}
                aria-haspopup="dialog"
                aria-label={`View profile of ${member.name}, ${member.role}`}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl bg-[#FAF5F0] overflow-hidden mb-5 border border-black/5">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#33CC7A] block mb-1">
                    {member.department}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-[#1B1411] group-hover:text-[#2BB86D] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-[#66574F] mb-3 font-medium">{member.role}</p>

                  <p className="text-xs text-[#66574F] leading-relaxed line-clamp-3 font-normal">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B1411] group-hover:text-[#33CC7A] transition-colors">
                    <span>View Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] font-mono text-[#66574F]/50">Pune, IN</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: CLOSING CTA (Clean Floating Card Architecture)                */}
      {/* ========================================================================= */}
      <section
        className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/8 select-none relative overflow-hidden"
        aria-label="Call to Action"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#1B1411] text-[#FAF5F0] rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-2xl text-center">
            {/* Ambient Accent Glow */}
            <div
              className="absolute -bottom-40 right-1/4 w-[600px] h-[400px] bg-[#33CC7A]/[0.12] blur-[150px] rounded-full pointer-events-none"
              aria-hidden="true"
            />

            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#33CC7A] block mb-4">
              Start Your Transformation
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#FAF5F0] max-w-3xl mx-auto leading-tight">
              Ready to build what’s next?
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#B8ABA3] max-w-2xl mx-auto leading-relaxed font-normal">
              Let’s discuss your brand, technology, and growth goals. Our specialists review every enquiry
              and deliver a tailored roadmap within 24 hours.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openMarketingPlanModal()}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#33CC7A] text-[#1B1411] text-xs font-bold uppercase tracking-wider hover:bg-[#2BB86D] transition-all hover:scale-105 shadow-lg shadow-[#33CC7A]/20 cursor-pointer"
              >
                <span>Get Marketing Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF5F0] text-xs font-bold uppercase tracking-wider transition-all border border-white/15 hover:scale-105"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight className="w-4 h-4 text-[#B8ABA3]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Details Modal Dialog */}
      <TeamModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
