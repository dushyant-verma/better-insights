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
  video?: string;
  alt: string;
  isEmojiFallback?: boolean;
}

const TEAM_TESTIMONIALS: TeamTestimonial[] = [
  {
    id: "priyanka-raghuvanshi",
    name: "Priyanka Raghuvanshi",
    role: "Marketing Operations Associate",
    quote:
      "Everyone at Better Insights works hard and produces excellent work, while staying super friendly and making you feel genuinely welcome and valued every single day.",
    avatar: "/team/priyanka-raghuvanshi.webp",
    photo: "/team/photos/priyanka-raghuvanshi-photo.png",
    video: "/BI Photos/Edited Videos reviews/Priyanka Raghuvanshi Testimonial.mp4",
    alt: "Priyanka Raghuvanshi, Marketing Operations Associate at Better Insights",
  },
  {
    id: "dinkey-lekhwani",
    name: "Dinkey Lekhwani",
    role: "Business Development Manager",
    quote:
      "We don't just build digital campaigns; we engineer growth systems that align client ambitions with scalable digital execution. Every day brings freedom, trust, and creative momentum.",
    avatar: "/team/dinkey-lekhwani.png",
    photo: "/team/photos/dinkey-lekhwani-photo.png",
    video: "/BI Photos/Edited Videos reviews/Dinkey Lekhwani.mp4",
    alt: "Dinkey Lekhwani, Business Development Manager at Better Insights",
  },
  {
    id: "jasika-saini",
    name: "Jasika Saini",
    role: "SEO Analyst",
    quote:
      "The culture here gives you the space to think deeply, experiment with technical search strategies, and see your ideas create tangible business impact.",
    avatar: "/team/jasika-saini.png",
    photo: "/team/photos/jasika-saini-photo.png",
    video: "/BI Photos/Edited Videos reviews/Jasika Saini.mp4",
    alt: "Jasika Saini, SEO Analyst at Better Insights",
  },
  {
    id: "mansi-dhawale",
    name: "Mansi Dhawale",
    role: "Social Media Strategist",
    quote:
      "The creative freedom and collaborative energy at Better Insights allow us to craft social strategies that genuinely resonate. Every campaign is backed by deep research, trust, and real team synergy.",
    avatar: "/BI Photos/BI emojis/mansi.webp",
    photo: "/BI Photos/BI emojis/mansi.webp",
    isEmojiFallback: true,
    video: "/BI Photos/Edited Videos reviews/Mansi Dhawale Testimonial.mp4",
    alt: "Mansi Dhawale, Social Media Strategist at Better Insights",
  },
  {
    id: "sakshi-morale",
    name: "Sakshi Morale",
    role: "Media & Communication Executive",
    quote:
      "Working across media and communications here is an incredible learning curve. The team trusts your perspective, encourages experimentation, and always rallies together to deliver exceptional work.",
    avatar: "/BI Photos/BI emojis/sakshi.webp",
    photo: "/BI Photos/BI emojis/sakshi.webp",
    isEmojiFallback: true,
    video: "/BI Photos/Edited Videos reviews/Sakshi Morale Testimonial.mp4",
    alt: "Sakshi Morale, Media & Communication Executive at Better Insights",
  },
  {
    id: "sourabh-gaikwad",
    name: "Sourabh Gaikwad",
    role: "DM Account Associate",
    quote:
      "At Better Insights, data and creative execution go hand in hand. Managing digital marketing accounts in an environment with high autonomy and transparency empowers you to drive measurable growth every day.",
    avatar: "/BI Photos/BI emojis/sourbh.webp",
    photo: "/BI Photos/BI emojis/sourbh.webp",
    isEmojiFallback: true,
    video: "/BI Photos/Edited Videos reviews/Sourabh Gaikwad Main Testimonial.mp4",
    alt: "Sourabh Gaikwad, DM Account Associate at Better Insights",
  },
  {
    id: "adarsh-kumar",
    name: "Adarsh Kumar Parthak",
    role: "Web Developer",
    quote:
      "Building digital experiences at Better Insights is exciting because quality and performance are never compromised. The engineering standards, teamwork, and freedom to innovate make it a great place to grow.",
    avatar: "/BI Photos/BI emojis/adarsh.webp",
    photo: "/BI Photos/BI emojis/adarsh.webp",
    isEmojiFallback: true,
    video: "/BI Photos/Edited Videos reviews/Adarsh Kumar Parthak Testimonial.mp4",
    alt: "Adarsh Kumar Parthak, Web Developer at Better Insights",
  },
  {
    id: "ramesh-kirtane",
    name: "Ramesh Kirtane",
    role: "UI/UX Designer",
    quote:
      "Designing interfaces and digital journeys here is truly rewarding. The team values thoughtful UX, user empathy, and aesthetic precision, making every design decision meaningful.",
    avatar: "/BI Photos/BI emojis/ramesh.webp",
    photo: "/BI Photos/BI emojis/ramesh.webp",
    isEmojiFallback: true,
    video: "/BI Photos/Edited Videos reviews/Ramesh Kirtane Testimonial.mp4",
    alt: "Ramesh Kirtane, UI/UX Designer at Better Insights",
  },
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
    id: "riya-balyan",
    name: "Riya Balyan",
    role: "HR & Culture Manager",
    quote:
      "We’ve built a people-first culture where empathy and high standards live together. Everyone feels supported to do their best work and grow together.",
    avatar: "/team/riya-balyan.png",
    photo: "/team/photos/riya-balyan-photo.png",
    alt: "Riya Balyan, HR & Culture Manager at Better Insights",
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

interface CultureTeamSliderProps {
  showLifeIntro?: boolean;
  className?: string;
}

export function CultureTeamSlider({
  showLifeIntro = false,
  className = "",
}: CultureTeamSliderProps = {}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progressKey, setProgressKey] = useState<number>(0);

  const activeMember = TEAM_TESTIMONIALS[activeIndex];

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Exactly 5 profiles shown at once (MadeByShape reference)
  const VISIBLE_COUNT = 5;
  const visibleIndices = Array.from(
    { length: Math.min(VISIBLE_COUNT, TEAM_TESTIMONIALS.length) },
    (_, i) => (startIndex + i) % TEAM_TESTIMONIALS.length
  );

  // Auto-advance: keeps fading and changing the profile (shifting by 1 per view)
  useEffect(() => {
    if (isPlaying || isHovered) return;

    const timer = setTimeout(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % TEAM_TESTIMONIALS.length;
        setStartIndex(next);
        return next;
      });
      setProgressKey((k) => k + 1);
    }, 6000);

    return () => clearTimeout(timer);
  }, [activeIndex, isPlaying, isHovered]);

  // Stop video when switching members
  useEffect(() => {
    setIsPlaying(false);
  }, [activeIndex]);

  // Ensure video plays smoothly when user clicks play
  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, [isPlaying]);

  // Manual selection handler
  const handleSelectMember = (idx: number) => {
    setActiveIndex(idx);
    setStartIndex(idx);
    setIsPlaying(false);
    setProgressKey((k) => k + 1);
  };

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
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation (ArrowLeft & ArrowRight) for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      const next = (activeIndex + 1) % TEAM_TESTIMONIALS.length;
      handleSelectMember(next);
    } else if (e.key === "ArrowLeft") {
      const prev = (activeIndex - 1 + TEAM_TESTIMONIALS.length) % TEAM_TESTIMONIALS.length;
      handleSelectMember(prev);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="culture-team-testimonials"
      className={`py-20 sm:py-28 lg:py-32 bg-[#0E0F10] text-white relative overflow-hidden select-none ${className}`}
      aria-label="Our Team Testimonials"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================================================================= */}
        {/* 0. Introductory Two-Column Section (When showLifeIntro is true)  */}
        {/* ================================================================= */}
        {showLifeIntro && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-20 sm:mb-24 lg:mb-28">
            {/* Left Column: Eyebrow + Large Heading */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span className="text-sm font-light text-white/90 tracking-wide [font-family:'Host_Grotesk',sans-serif]">
                  Life at Better Insights
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium tracking-[-0.03em] text-white leading-[1.08] [font-family:'Host_Grotesk',sans-serif]">
                A home away from home, a place where you can be who you want to be
              </h2>
            </div>

            {/* Right Column: Two Editorial Paragraphs */}
            <div className="lg:col-span-5 lg:pt-4 space-y-4 sm:space-y-5 text-sm sm:text-base text-white/70 leading-relaxed font-normal">
              <p>
                We want all our team members to feel comfortable with whom they work with, in the environment they work, and with the clients we collaborate with. Our staff are trusted on their capabilities, and are given freedom to be creative.
              </p>
              <p>
                Better Insights is a family of humans who are talented, trustworthy, and experienced. We give honest advice to clients, and honest feedback internally to help our quality of work reach new levels each year.
              </p>
            </div>
          </div>
        )}

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[50px] font-semibold tracking-[-0.03em] text-white leading-[1.12] [font-family:'Host_Grotesk',sans-serif] text-balance">
            Don&apos;t take our word for it, hear it from them
          </h2>
        </div>

        {/* ================================================================= */}
        {/* 2. Main Testimonial Card (Full-Width Lime-Green Container)       */}
        {/* ================================================================= */}
        <div
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full bg-[#CBFC6B] text-[#101112] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] p-6 sm:p-10 lg:p-12 xl:p-14 shadow-[0_30px_70px_rgba(203, 252, 107,0.25)] overflow-hidden ${isHovered ? "bi-carousel-paused" : ""
            }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* ------------------------------------------------------------- */}
            {/* Left Column: Interactive Testimonial Content (60-65% width)    */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between h-full min-h-[360px] sm:min-h-[400px]">
              {/* Profile Thumbnails Row: Exactly 5 at once with MadeByShape SVG progress rings */}
              <div>
                <div
                  className="flex items-center gap-2.5 sm:gap-3.5 mb-8 sm:mb-12 overflow-visible"
                  role="tablist"
                  aria-label="Team member profiles"
                >
                  {visibleIndices.map((idx) => {
                    const member = TEAM_TESTIMONIALS[idx];
                    const isActive = activeIndex === idx;
                    return (
                      <button
                        key={member.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Select testimonial from ${member.name}`}
                        onClick={() => handleSelectMember(idx)}
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-[58px] lg:h-[58px] rounded-2xl cursor-pointer transition-all duration-300 shrink-0 focus:outline-none ${isActive
                          ? "scale-105"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                          }`}
                      >
                        {/* MadeByShape Squircle Outline & Progress Ring */}
                        <svg
                          className="w-full h-full absolute inset-0 z-20 pointer-events-none"
                          viewBox="0 0 60 60"
                          fill="none"
                        >
                          {/* Inactive base stroke */}
                          <rect
                            x="1.5"
                            y="1.5"
                            width="57"
                            height="57"
                            rx="15"
                            stroke="#101112"
                            strokeWidth="2.5"
                            strokeOpacity={isActive ? "0.25" : "0.1"}
                          />
                          {/* Active animated progress indicator ring */}
                          {isActive && !isPlaying && (
                            <rect
                              key={`prog-${progressKey}`}
                              x="1.5"
                              y="1.5"
                              width="57"
                              height="57"
                              rx="15"
                              stroke="#101112"
                              strokeWidth="2.5"
                              pathLength="100"
                              strokeDasharray="100"
                              className={`bi-carousel-progress ${isHovered ? "bi-carousel-paused" : ""}`}
                            />
                          )}
                        </svg>

                        {/* Thumbnail Image Container */}
                        <div className="w-full h-full p-[3px] rounded-2xl overflow-hidden">
                          <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-black/10">
                            <Image
                              src={member.avatar}
                              alt={member.name}
                              fill
                              sizes="60px"
                              className="object-cover object-top"
                            />
                          </div>
                        </div>
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
                <h3 className="bi-member-name text-base sm:text-lg font-semibold text-[#101112] [font-family:'Host_Grotesk',sans-serif] leading-tight">
                  {activeMember.name}
                </h3>
                <p className="bi-member-role text-xs sm:text-sm text-[#101112]/75 font-normal [font-family:'Host_Grotesk',sans-serif] mt-0.5">
                  {activeMember.role}
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* Right Column: Large Team Member Portrait Photograph & Video   */}
            {/* ------------------------------------------------------------- */}
            <div className="lg:col-span-5 xl:col-span-4 flex items-center justify-center lg:justify-end">
              <div
                key={`media-${activeMember.id}`}
                className="bi-fade-in relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] max-w-[360px] sm:max-w-[400px] lg:max-w-none rounded-[20px] sm:rounded-[24px] overflow-hidden bg-black shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
              >
                {isPlaying && activeMember.video ? (
                  <div className="relative w-full h-full bg-black">
                    <video
                      ref={videoRef}
                      src={activeMember.video}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlaying(false)}
                    />
                    <button
                      type="button"
                      onClick={() => setIsPlaying(false)}
                      className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors text-xs backdrop-blur-sm cursor-pointer shadow-md"
                      aria-label="Close video and show photo"
                      title="Return to photo"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div
                    className={`relative w-full h-full ${activeMember.video ? "cursor-pointer group" : ""}`}
                    onClick={() => {
                      if (activeMember.video) setIsPlaying(true);
                    }}
                  >
                    {activeMember.isEmojiFallback ? (
                      <div className="w-full h-full bg-[white] flex items-center justify-center p-8 sm:p-10 relative">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={activeMember.photo}
                            alt={activeMember.alt}
                            fill
                            priority
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={activeMember.photo}
                        alt={activeMember.alt}
                        fill
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Circular Play Button matching MadeByShape reference */}
                    {activeMember.video && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(true);
                        }}
                        className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#CBFC6B] text-[#101112] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer z-20"
                        aria-label={`Play video review for ${activeMember.name}`}
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" viewBox="0 0 384 512">
                          <path d="M384 256L0 32v448l384-224z" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

