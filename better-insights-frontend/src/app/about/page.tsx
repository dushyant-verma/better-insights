"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { AboutHeroGallery } from "@/components/about/AboutHeroGallery";
import { TeamModal, TeamMemberData } from "@/components/about/TeamModal";
import { TeamSlider } from "@/components/about/TeamSlider";
import { AboutCultureSection } from "@/components/about/AboutCultureSection";
import { StackingCapabilitiesCards } from "@/components/about/StackingCapabilitiesCards";
import { WhoWeAreRedesign } from "@/components/about/WhoWeAreRedesign";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";
import "@/styles/about.css";

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
    originalPhoto: "/team/photos/gautam-koli-photo.jpg",
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
    originalPhoto: "/team/photos/dinkey-lekhwani-photo.png",
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
    originalPhoto: "/team/photos/kanika-sohal-photo.png",
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
    originalPhoto: "/team/photos/jasika-saini-photo.png",
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
    image: "/team/dushyant-verma-v2.webp",
    originalPhoto: "/team/photos/dushyant-verma-photo-v2.webp",
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
    originalPhoto: "/team/photos/priyanka-raghuvanshi-photo.png",
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
    originalPhoto: "/team/photos/riya-balyan-photo.png",
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
    originalPhoto: "/team/photos/dhruv-bisht-photo.webp",
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
    originalPhoto: "/team/photos/rishabh-panjwani-photo.png",
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
      {/* SECTION 1: ANIMATED IMAGE GALLERY HERO (MadeByShape Editorial Style)     */}
      {/* ========================================================================= */}
      <AboutHeroGallery />

      {/* ========================================================================= */}
      {/* SECTION 2: WHO WE ARE (REDESIGNED EDITORIAL CULTURE EXPERIENCE)            */}
      {/* Target element id="423758" & Preceding Statement                          */}
      {/* ========================================================================= */}
      <WhoWeAreRedesign />

      {/* ========================================================================= */}
      {/* SECTION 3: CORE CAPABILITIES MATRIX (Interactive Stacking Cards Deck)     */}
      {/* ========================================================================= */}
      <StackingCapabilitiesCards capabilities={CAPABILITIES} />

      {/* ========================================================================= */}
      {/* SECTION 4: HOW WE WORK (METHODOLOGY)                                      */}
      {/* ========================================================================= */}
      <section
        id="methodology"
        className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none"
        aria-label="How We Work"
      >
        <div className="bi-container">
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

      {/* Target element id="424532" (MadeByShape reference anchor) */}
      <div id="424532" />

      {/* Recreated MadeByShape "Feel the atmosphere" Animated Culture Section */}
      <AboutCultureSection />

      {/* ========================================================================= */}
      {/* SECTION 5: EXECUTIVE LEADERSHIP & INTERACTIVE TEAM DIRECTORY               */}
      {/* ========================================================================= */}
      <TeamSlider
        members={TEAM_MEMBERS}
        onSelectMember={(member) => setSelectedMember(member)}
      />

      {/* ========================================================================= */}
      {/* SECTION 6: CLOSING CTA (Clean Floating Card Architecture)                */}
      {/* ========================================================================= */}
      <section
        className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/8 select-none relative overflow-hidden"
        aria-label="Call to Action"
      >
        <div className="bi-container relative z-10">
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
