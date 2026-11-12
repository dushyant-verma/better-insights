"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { getGSAP } from "@/lib/gsap";

interface FloatingCard {
  src: string;
  alt: string;
  className: string;
  aspectClass: string;
  rotation: string;
  parallaxSpeed: number;
  priority?: boolean;
}

const FLOATING_CARDS: FloatingCard[] = [
  // 1. Top-Left: Team sprint discussion (landscape 4:3)
  {
    src: "/images/culture/photo-1556761175-4b46a572b786.jpg",
    alt: "Better Insights team sprint discussion",
    className: "top-[10%] left-[2%] xl:left-[4%] w-[190px] md:w-[220px] xl:w-[255px]",
    aspectClass: "aspect-[4/3]",
    rotation: "-rotate-3",
    parallaxSpeed: -35,
    priority: true,
  },
  // 2. Top-Right: Creative whiteboard session (portrait 3:4)
  {
    src: "/images/culture/photo-1515187029135-18ee286d815b.jpg",
    alt: "Creative strategy whiteboard session",
    className: "top-[8%] right-[2.5%] xl:right-[4.5%] w-[155px] md:w-[180px] xl:w-[205px]",
    aspectClass: "aspect-[3/4]",
    rotation: "rotate-2",
    parallaxSpeed: -50,
    priority: true,
  },
  // 3. Middle-Left: Collaboration in studio (landscape 16:10)
  {
    src: "/images/culture/hero-marketing-team.jpg",
    alt: "Better Insights team collaborating",
    className: "top-[42%] left-[1%] xl:left-[2.5%] w-[205px] md:w-[235px] xl:w-[265px] hidden md:block",
    aspectClass: "aspect-[16/10]",
    rotation: "rotate-2",
    parallaxSpeed: 25,
  },
  // 4. Middle-Right: Engineering and product sprint (landscape 4:3)
  {
    src: "/images/culture/photo-1531403009284-440f080d1e12.jpg",
    alt: "Engineering and UX design sync",
    className: "top-[38%] right-[1%] xl:right-[2.5%] w-[195px] md:w-[225px] xl:w-[250px] hidden md:block",
    aspectClass: "aspect-[4/3]",
    rotation: "-rotate-2",
    parallaxSpeed: -25,
  },
  // 5. Bottom-Left: Strategic team workshop (portrait 3:4)
  {
    src: "/images/culture/photo-1552664730-d307ca884978.jpg",
    alt: "Strategic growth workshop",
    className: "bottom-[7%] left-[4%] xl:left-[7%] w-[155px] md:w-[175px] xl:w-[200px]",
    aspectClass: "aspect-[3/4]",
    rotation: "-rotate-2",
    parallaxSpeed: -40,
  },
  // 6. Bottom-Center: Knowledge sharing presentation (landscape 4:3)
  {
    src: "/images/culture/photo-1551836022-d5d88e9218df.jpg",
    alt: "Team presentation and knowledge sharing",
    className: "bottom-[3%] left-[41%] xl:left-[43%] w-[170px] md:w-[195px] xl:w-[220px] hidden lg:block",
    aspectClass: "aspect-[4/3]",
    rotation: "rotate-1",
    parallaxSpeed: 30,
  },
  // 7. Bottom-Right: Design review & review (landscape 16:10)
  {
    src: "/images/culture/photo-1559136555-9303baea8ebd.jpg",
    alt: "Design critique and brand review",
    className: "bottom-[6%] right-[2%] xl:right-[4%] w-[205px] md:w-[240px] xl:w-[275px]",
    aspectClass: "aspect-[16/10]",
    rotation: "rotate-3",
    parallaxSpeed: -35,
  },
];

export function CultureHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleScrollToIntro = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("culture-intro");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance animation for the central content
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        });
      }

      // 2. Parallax and entrance for floating cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Entrance animation
        gsap.from(card, {
          opacity: 0,
          scale: 0.9,
          y: 30 + (index % 3) * 12,
          duration: 1.1 + index * 0.08,
          ease: "power3.out",
          delay: 0.15 + index * 0.06,
        });

        // Scroll parallax
        const cardData = FLOATING_CARDS[index];
        const shift = cardData?.parallaxSpeed ?? -30;

        gsap.to(card, {
          y: shift,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center items-center bg-[#0B0B0D] text-white pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden select-none"
      aria-label="Culture Hero"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[450px] sm:h-[600px] bg-[radial-gradient(circle,rgba(52,204,123,0.09)_0%,rgba(43,184,109,0.03)_45%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Team/Culture Photographs (Desktop & Tablet) */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        {FLOATING_CARDS.map((card, idx) => (
          <div
            key={card.src}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            className={`absolute ${card.className} ${card.rotation} pointer-events-auto group transition-transform duration-300 will-change-transform`}
          >
            <div
              className={`relative w-full ${card.aspectClass} rounded-[1.25rem] overflow-hidden border border-white/12 bg-[#16161D] shadow-[0_20px_45px_rgba(0,0,0,0.65)]`}
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                priority={card.priority}
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                sizes="(max-width: 1024px) 25vw, (max-width: 1440px) 20vw, 300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {/* Central Content Container (Always clear of floating images) */}
      <div
        ref={headingRef}
        className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center pointer-events-auto"
      >
        {/* Eyebrow Label: • Culture at Better Insights */}
        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-6 sm:mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34CC7B] animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-white/90 uppercase">
            Culture at Better Insights
          </span>
        </div>

        {/* Master Heading: A curious bunch of thinkers & makers that love what we do */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] font-light lg:font-normal tracking-[-0.035em] text-white leading-[1.04] sm:leading-[1.02] max-w-3xl lg:max-w-4xl mx-auto [font-family:'Host_Grotesk',sans-serif]">
          A curious bunch{" "}
          <br className="hidden sm:inline" />
          of thinkers &amp; makers{" "}
          <br className="hidden sm:inline" />
          that love what we do
        </h1>

        {/* Supporting Brand Subtitle for Better Insights */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#A5A5A5] font-normal max-w-2xl mx-auto leading-relaxed [font-family:'Host_Grotesk',sans-serif]">
          At Better Insights, we unite strategic clarity, creative autonomy, and engineering craft to build digital experiences that drive compounding growth.
        </p>

        {/* Rounded CTA Button: Explore Our Culture */}
        <div className="mt-8 sm:mt-10">
          <a
            href="#culture-intro"
            onClick={handleScrollToIntro}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#34CC7B] hover:bg-[#2BB86D] text-[#101112] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 hover:scale-105 shadow-[0_10px_30px_rgba(52,204,123,0.3)] cursor-pointer"
            aria-label="Explore our culture - scroll to culture details"
          >
            <span>Explore Our Culture</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile-Only Organic Asymmetric Floating Photo Cluster (Kept safely beneath CTA) */}
        <div className="md:hidden mt-12 flex items-center justify-center gap-3 px-2 w-full max-w-sm">
          <div className="relative w-[34%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/12 shadow-xl -rotate-2">
            <Image
              src="/images/culture/hero-marketing-team.jpg"
              alt="Better Insights team collaboration"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="relative w-[30%] aspect-[3/4] rounded-2xl overflow-hidden border border-white/12 shadow-xl rotate-1 -mt-3">
            <Image
              src="/images/culture/photo-1515187029135-18ee286d815b.jpg"
              alt="Team creative strategy session"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
          <div className="relative w-[34%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/12 shadow-xl rotate-2">
            <Image
              src="/images/culture/photo-1556761175-4b46a572b786.jpg"
              alt="Team discussion"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CultureHero;