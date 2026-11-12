"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getGSAP } from "@/lib/gsap";

export function CultureEthos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap } = getGSAP();
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Subtle scroll entrance reveal
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          opacity: 0,
          y: 35,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          opacity: 0,
          y: 40,
          duration: 1.1,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture-ethos"
      className="py-20 sm:py-28 lg:py-32 bg-[#0d0e10] text-white border-t border-white/8 relative overflow-hidden select-none"
      aria-label="Our Culture and Ethos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 xl:gap-20">
          
          {/* ================================================================= */}
          {/* Left Column – Large Portrait-Oriented Editorial Photograph (~52%) */}
          {/* ================================================================= */}
          <div ref={leftColRef} className="w-full lg:w-[52%] shrink-0">
            <div className="relative w-full aspect-[0.95/1] rounded-[24px] overflow-hidden bg-[#16161D] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)] group">
              <Image
                src="/images/culture/hero-marketing-team.jpg"
                alt="Better Insights team collaborating in studio on digital strategy"
                fill
                priority
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 52vw"
              />
            </div>
          </div>

          {/* ================================================================= */}
          {/* Right Column – Content Area (~48%)                                */}
          {/* ================================================================= */}
          <div ref={rightColRef} className="w-full lg:w-[48%] flex flex-col justify-center">
            
            {/* Small White Bullet + 'Our Culture' Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
              <span className="text-sm font-light text-white/90 tracking-wide [font-family:'Host_Grotesk',sans-serif]">
                Our Culture
              </span>
            </div>

            {/* Editorial Heading (3-4 Lines on Desktop) */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[40px] font-normal tracking-[-0.03em] text-white leading-[1.14] text-balance mb-6 [font-family:'Host_Grotesk',sans-serif]">
              We&apos;ve created an environment where everyone feels comfortable, valued, and open to innovate
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-sm sm:text-base text-[#A5A5A5] leading-relaxed font-normal mb-8">
              We produce good work for good people, with the conviction that both our team and our partners will feel energized throughout the full process. This mutual respect in return generates extraordinary digital solutions and lasting trust.
            </p>

            {/* =============================================================== */}
            {/* Prominent Bright Lime-Green Testimonial Card (#CBFC6B)            */}
            {/* =============================================================== */}
            <div className="relative bg-[#CBFC6B] text-[#101112] rounded-[20px] p-7 sm:p-8 lg:p-9 shadow-[0_20px_50px_rgba(203,252,107,0.2)] overflow-hidden">
              
              {/* Quote Icon & Text */}
              <div className="flex items-start gap-3.5 mb-6">
                <svg
                  className="w-5 h-5 text-[#101112] fill-current shrink-0 mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 17 11"
                  aria-hidden="true"
                >
                  <path d="M0 6.646C0 3.107 2.531 1.002 4.11.032c.2-.123.416.133.262.312A8.202 8.202 0 002.92 2.777 4.023 4.023 0 110 6.647zm8.955 0c0-3.539 2.531-5.644 4.11-6.613.2-.123.416.132.263.31a8.202 8.202 0 00-1.454 2.434 4.023 4.023 0 11-2.92 3.87z" />
                </svg>
                <p className="text-lg sm:text-xl lg:text-[21px] font-semibold tracking-[-0.015em] text-[#101112] leading-snug [font-family:'Host_Grotesk',sans-serif]">
                  &ldquo;Our vision has always been to look after the partners we collaborate with, but to look after the craftspeople and minds building the work just as much. That respect will always generate the finest results for everyone.&rdquo;
                </p>
              </div>

              {/* Author Row (Avatar + Name + Title) & LinkedIn Notch Button */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
                {/* Author Info */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#101112]/20 shrink-0 bg-[#101112]/10">
                    <Image
                      src="/team/gautam-koli.png"
                      alt="Gautam Koli - Founder & Director, Better Insights"
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#101112] leading-tight [font-family:'Host_Grotesk',sans-serif]">
                      Gautam Koli
                    </h4>
                    <p className="text-xs text-[#101112]/80 font-normal mt-0.5">
                      Founder &amp; Director, Better Insights
                    </p>
                  </div>
                </div>

                {/* Dark Pill-Shaped LinkedIn Button */}
                {/* Desktop: Positioned inside curved lower-right notch */}
                {/* Mobile: Inline rounded pill */}
                <div className="lg:absolute lg:bottom-0 lg:right-0 bg-[#0d0e10] lg:pl-3.5 lg:pt-3.5 lg:rounded-tl-2xl lg:rounded-tl-3xl inline-flex items-center">
                  {/* Top-Right Inverted Corner Fillet */}
                  <svg
                    className="w-8 h-8 text-[#0d0e10] fill-current absolute top-px -right-px transform -translate-y-full rotate-180 pointer-events-none hidden lg:block"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                  </svg>

                  {/* Bottom-Left Inverted Corner Fillet */}
                  <svg
                    className="w-8 h-8 text-[#0d0e10] fill-current absolute -bottom-px left-px transform -translate-x-full rotate-180 pointer-events-none hidden lg:block"
                    viewBox="0 0 100 100"
                    aria-hidden="true"
                  >
                    <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
                  </svg>

                  <a
                    href="https://www.linkedin.com/company/better-insights-bi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#18191E] hover:bg-[#25262C] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-md group hover:scale-105"
                    aria-label="Connect with Gautam Koli on LinkedIn"
                  >
                    <span>Follow on</span>
                    <svg
                      className="w-3.5 h-3.5 fill-current text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      aria-hidden="true"
                    >
                      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                    </svg>
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default CultureEthos;
