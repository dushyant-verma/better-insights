"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getGSAP } from "@/lib/gsap";

interface StackedCardItem {
  id: string;
  badge: string;
  quote: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
  image: string;
  alt: string;
}

const STACKED_CARDS: StackedCardItem[] = [
  {
    id: "people",
    badge: "Our People",
    quote: {
      prefix: "We invest in human potential, cultivate mutual trust, and champion ",
      highlight: "Our People",
      suffix: " to do their most impactful, fearless work without fear of failure.",
    },
    image: "/images/culture/photo-1515187029135-18ee286d815b.jpg",
    alt: "Better Insights team members collaborating and laughing in an open studio",
  },
  {
    id: "creative",
    badge: "Creative Thinking",
    quote: {
      prefix: "We reject cookie-cutter templates and challenge convention through ",
      highlight: "Creative Thinking",
      suffix: " that solves real business problems with distinctive, intentional design.",
    },
    image: "/images/culture/photo-1551836022-d5d88e9218df.jpg",
    alt: "Creative strategy sprint and design exploration session at Better Insights",
  },
  {
    id: "learning",
    badge: "Continuous Learning",
    quote: {
      prefix: "Digital landscapes move fast. We stay ahead through curiosity, ",
      highlight: "Continuous Learning",
      suffix: ", and daily experimentation with modern AI and engineering stacks.",
    },
    image: "/images/culture/photo-1559136555-9303baea8ebd.jpg",
    alt: "Engineers and designers collaborating on technological experiments",
  },
  {
    id: "together",
    badge: "Better Together",
    quote: {
      prefix: "Meaningful digital products are born when designers, engineers, and partners collaborate ",
      highlight: "Better Together",
      suffix: " with total transparency, radical honesty, and shared pride.",
    },
    image: "/images/culture/photo-1556761175-4b46a572b786.jpg",
    alt: "Cross-disciplinary squad working around conference table with client partners",
  },
];

export function CultureStackedCards() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap, ScrollTrigger } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =======================================================================
      // Desktop Layout (>= 1024px): Pinned Stage with Scrubbed Card Stacking
      // =======================================================================
      mm.add("(min-width: 1024px)", () => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length < 2 || !sectionRef.current) return;

        // Ensure initial positions for stacked cards
        cards.forEach((card, index) => {
          if (index === 0) {
            gsap.set(card, { yPercent: 0, opacity: 1, scale: 1 });
          } else {
            gsap.set(card, { yPercent: 120, opacity: 0.8, scale: 1 });
          }
        });

        // Scrubbed Timeline with ScrollTrigger pin
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${cards.length * 90}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate each subsequent card sliding up from below over the previous
        for (let i = 1; i < cards.length; i++) {
          const currentCard = cards[i];
          const prevCard = cards[i - 1];

          // Incoming card slides into position
          tl.to(
            currentCard,
            {
              yPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            `step-${i}`
          );

          // Previous card slightly scales down for realistic physical depth
          tl.to(
            prevCard,
            {
              scale: 0.97,
              opacity: 0.7,
              duration: 0.8,
              ease: "power2.out",
            },
            `step-${i}`
          );
        }

        return () => {
          tl.kill();
          gsap.set(cards, { clearProps: "all" });
        };
      });

      // =======================================================================
      // Mobile / Tablet (< 1024px): Standard Vertical Flow with Entrance Fade
      // =======================================================================
      mm.add("(max-width: 1023px)", () => {
        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        // Clear any desktop inline transforms or opacity
        gsap.set(cards, { clearProps: "all" });

        cards.forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

        return () => {
          gsap.set(cards, { clearProps: "all" });
        };
      });
    }, sectionRef.current);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture-stacked-cards"
      className="py-20 sm:py-28 lg:py-32 bg-[#0B0B0D] text-white border-t border-white/8 relative select-none"
      aria-label="What's Important to Us"
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(52,204,123,0.05)_0%,rgba(43,184,109,0.015)_50%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-start"
        >
          {/* ================================================================= */}
          {/* 1. Left Content Column: Sticky Header + CTA                       */}
          {/* ================================================================= */}
          <div
            ref={leftColRef}
            className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28 xl:top-36 pt-2"
          >
            {/* Small Eyebrow Label with Brand Green Dot */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34CC7B]" />
              <span className="text-xs sm:text-sm font-medium tracking-normal text-[#A5A5A5]">
                What&apos;s important to us
              </span>
            </div>

            {/* Editorial Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[42px] xl:text-[50px] font-light lg:font-normal tracking-[-0.035em] text-white leading-[1.1] text-balance max-w-md mb-8 lg:mb-10 [font-family:'Host_Grotesk',sans-serif]">
              We&apos;re proud of the culture we&apos;ve created
            </h2>

            {/* CTA Button: 'I like the sound of it' */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/8 hover:bg-white/12 text-white border border-white/12 hover:border-[#34CC7B]/40 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 group shadow-lg hover:scale-105"
            >
              <span>I like the sound of it</span>
              <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#34CC7B] flex items-center justify-center transition-colors duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-[#101112] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          </div>

          {/* ================================================================= */}
          {/* 2. Right Content Column: Stacked Cards                           */}
          {/* Desktop uses fixed height stage for GSAP absolute card stacking   */}
          {/* Mobile falls back to normal vertical card layout                 */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 relative w-full lg:h-[620px] xl:h-[660px]">
            {STACKED_CARDS.map((card, idx) => {
              // Top stacking offset on desktop (e.g. 0px, 20px, 40px, 60px)
              const topOffset = idx * 20;
              const zIndex = 10 + idx * 10;

              return (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardsRef.current[idx] = el;
                  }}
                  style={
                    {
                      zIndex,
                      "--card-top": `${topOffset}px`,
                    } as React.CSSProperties
                  }
                  className={`
                    w-full rounded-2xl sm:rounded-3xl lg:rounded-[2rem] 
                    bg-[#16171C] border border-white/10 
                    p-6 sm:p-8 lg:p-9 xl:p-10 
                    shadow-[0_20px_50px_rgba(0,0,0,0.65)]
                    mb-8 lg:mb-0
                    lg:absolute lg:left-0 lg:[top:var(--card-top)]
                  `}
                >

                  {/* Top Statement with Editorial First-Line Indent */}
                  <div className="text-base sm:text-lg lg:text-xl xl:text-[22px] font-light leading-snug tracking-[-0.02em] text-[#CCCCCC] mb-6 sm:mb-8 indent-8 sm:indent-16 lg:indent-20 [font-family:'Host_Grotesk',sans-serif]">
                    <p>
                      {card.quote.prefix}
                      <span className="font-semibold text-white">
                        {card.quote.highlight}
                      </span>
                      {card.quote.suffix}
                    </p>
                  </div>

                  {/* High Quality Photography Container with Centered Pill Badge */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl sm:rounded-2xl lg:rounded-[1.35rem] overflow-hidden bg-[#1D1E24]">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
                    />

                    {/* Subtle Base Dark Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Centered Bottom Pill Badge Button */}
                    <div className="absolute bottom-4 sm:bottom-5 left-0 w-full flex justify-center z-20 pointer-events-auto">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#34CC7B] hover:bg-[#2BB86D] text-[#101112] text-xs sm:text-sm font-bold tracking-tight shadow-xl shadow-[#34CC7B]/25 transition-transform duration-300 hover:scale-105"
                      >
                        <span>{card.badge}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default CultureStackedCards;
