"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getGSAP } from "@/lib/gsap";

interface TeamTestimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  photo: string;
  alt: string;
}

const TEAM_TESTIMONIALS: TeamTestimonial[] = [
  {
    id: "gautam-koli",
    name: "Gautam Koli",
    role: "Founder & Director",
    quote:
      "Our culture thrives on genuine trust, creative autonomy, and relentless curiosity. When people feel safe to experiment and take pride in their craft, we achieve greater insights together.",
    avatar: "/team/gautam-koli.png",
    photo: "/team/photos/gautam-koli-photo.jpg",
    alt: "Gautam Koli, Founder & Director at Better Insights",
  },
  {
    id: "priyanka-raghuvanshi",
    name: "Priyanka Raghuvanshi",
    role: "Marketing Operations Associate",
    quote:
      "Everyone at Better Insights works hard and produces excellent work, while staying super friendly and making you feel genuinely welcome and valued every single day.",
    avatar: "/team/priyanka-raghuvanshi.webp",
    photo: "/team/photos/priyanka-raghuvanshi-photo.png",
    alt: "Priyanka Raghuvanshi, Marketing Operations Associate at Better Insights",
  },
  {
    id: "dushyant-verma",
    name: "Dushyant Verma",
    role: "Web Developer & Solutions Specialist",
    quote:
      "There is genuine freedom and trust here to experiment, build ambitious things, and push technical boundaries without unnecessary micromanagement or red tape.",
    avatar: "/team/dushyant-verma-v2.webp",
    photo: "/team/photos/dushyant-verma-photo-v2.webp",
    alt: "Dushyant Verma, Web Developer at Better Insights",
  },
  {
    id: "kanika-sohal",
    name: "Kanika Sohal",
    role: "HR & Culture Manager",
    quote:
      "We’ve built a people-first culture where empathy and high standards live together. Everyone feels supported to do their best work and grow together.",
    avatar: "/team/kanika-sohal.png",
    photo: "/team/photos/kanika-sohal-photo.png",
    alt: "Kanika Sohal, HR & Culture Manager at Better Insights",
  },
  {
    id: "dhruv-bisht",
    name: "Dhruv Bisht",
    role: "Creative Media & Motion Specialist",
    quote:
      "The creative energy across the team is inspiring. Everyone is always ready to collaborate, share ideas, and elevate every project together.",
    avatar: "/team/dhruv-bisht.webp",
    photo: "/team/photos/dhruv-bisht-photo.webp",
    alt: "Dhruv Bisht, Creative Media Specialist at Better Insights",
  },
  {
    id: "rishabh-panjwani",
    name: "Rishabh Panjwani",
    role: "Creative & Growth Strategist",
    quote:
      "Better Insights is a space of curious minds. You’re always learning from the people around you, and every voice genuinely matters in the room.",
    avatar: "/team/rishabh-panjwani.png",
    photo: "/team/photos/rishabh-panjwani-photo.png",
    alt: "Rishabh Panjwani, Creative & Growth Strategist at Better Insights",
  },
];

export function CultureTeamSlider() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeMember = TEAM_TESTIMONIALS[activeIndex];

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Subtle GSAP entrance animation on scroll
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.1,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation (ArrowLeft & ArrowRight) for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % TEAM_TESTIMONIALS.length);
    } else if (e.key === "ArrowLeft") {
      setActiveIndex((prev) => (prev - 1 + TEAM_TESTIMONIALS.length) % TEAM_TESTIMONIALS.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="culture-team-testimonials"
      className="py-20 sm:py-28 lg:py-32 bg-[#0B0B0D] text-white border-t border-white/8 relative overflow-hidden select-none"
      aria-label="Our Team Testimonials"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================================================================= */}
        {/* 1. Section Header (Center-Aligned)                                */}
        {/* ================================================================= */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
            <span className="text-sm font-light text-white/90 tracking-wide [font-family:'Host_Grotesk',sans-serif]">
              Our Team
            </span>
          </div>

          {/* Main Display Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-normal tracking-[-0.03em] text-white leading-[1.12] [font-family:'Host_Grotesk',sans-serif] text-balance">
            Don&apos;t take our word for it, hear it from them
          </h2>
        </div>

        {/* ================================================================= */}
        {/* 2. Main Testimonial Card (Full-Width Lime-Green Container)       */}
        {/* ================================================================= */}
        <div
          ref={cardRef}
          className="relative w-full bg-[#ffffff] text-[#101112] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] p-6 sm:p-10 lg:p-12 xl:p-14 shadow-[0_30px_70px_rgba(52,204,123,0.25)] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* ------------------------------------------------------------- */}
            {/* Left Column: Interactive Testimonial Content (60-65% width)    */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between h-full min-h-[360px] sm:min-h-[400px]">
              {/* Profile Thumbnails Row */}
              <div>
                <div
                  className="flex items-center gap-2.5 sm:gap-3.5 mb-8 sm:mb-12 overflow-x-auto pb-1 scrollbar-none"
                  role="tablist"
                  aria-label="Team member profiles"
                >
                  {TEAM_TESTIMONIALS.map((member, idx) => {
                    const isActive = activeIndex === idx;
                    return (
                      <button
                        key={member.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Select testimonial from ${member.name}`}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[58px] lg:h-[58px] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shrink-0 focus:outline-none ${isActive
                            ? "border-[2.5px] border-[#101112] shadow-sm scale-105"
                            : "border-[2.5px] border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                          }`}
                      >
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          fill
                          sizes="60px"
                          className="object-cover object-top"
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Testimonial Quote Block */}
                <div key={activeMember.id} className="bi-fade-in flex items-start gap-3.5 sm:gap-4">
                  {/* Large Double Quotation Mark SVG */}
                  <svg
                    className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#101112] fill-current shrink-0 mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 17 11"
                    aria-hidden="true"
                  >
                    <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                  </svg>

                  {/* Large Quote Typography */}
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-[30px] xl:text-[34px] font-normal tracking-[-0.02em] text-[#101112] leading-[1.24] text-balance [font-family:'Host_Grotesk',sans-serif]">
                    {activeMember.quote}
                  </p>
                </div>
              </div>

              {/* Author Attribution (Name & Designation) */}
              <div key={`author-${activeMember.id}`} className="bi-fade-in mt-8 sm:mt-12 pt-2">
                <h3 className="text-base sm:text-lg font-semibold text-[#101112] [font-family:'Host_Grotesk',sans-serif] leading-tight">
                  {activeMember.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#101112]/75 font-normal [font-family:'Host_Grotesk',sans-serif] mt-0.5">
                  {activeMember.role}
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Right Column: Large Team Member Portrait Photograph           */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center lg:justify-end">
              <div
                key={`photo-${activeMember.id}`}
                className="bi-fade-in relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-w-[360px] sm:max-w-[400px] lg:max-w-none rounded-[20px] sm:rounded-[24px] overflow-hidden bg-gradient-to-b from-[#1E2026] to-[#101114] shadow-[0_20px_45px_rgba(0,0,0,0.25)] group"
              >
                <Image
                  src={activeMember.photo}
                  alt={activeMember.alt}
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

