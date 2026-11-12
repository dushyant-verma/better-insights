"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { getGSAP } from "@/lib/gsap";
import "@/styles/about-culture.css";

interface CollagePhoto {
  id: string;
  src: string;
  alt: string;
  wrapperClass: string;
  cardRotation: string;
  parallax: {
    desktop: { startY: number; endY: number };
    tablet: { startY: number; endY: number };
    mobile: { startY: number; endY: number };
  };
  caption?: {
    text: string;
    emoji: string;
    position: "top" | "bottom";
    align?: "left" | "center" | "right";
  };
}

// -----------------------------------------------------------------------------
// Left Cluster (3 Overlapping Photos)
// -----------------------------------------------------------------------------
const LEFT_CLUSTER_PHOTOS: CollagePhoto[] = [
  // 1. Medium-sized image positioned towards upper-left (Midground layer)
  {
    id: "left-1",
    src: "/images/culture/hero-marketing-team.jpg",
    alt: "Better Insights team collaborating on digital sprint strategy in our studio",
    wrapperClass: "w-[58%] sm:w-[56%] lg:w-[58%] aspect-[4/3] top-[8%] left-[2%] z-10",
    cardRotation: "-rotate-[4deg]",
    parallax: {
      desktop: { startY: 110, endY: -70 },
      tablet: { startY: 60, endY: -40 },
      mobile: { startY: 28, endY: -18 },
    },
    caption: {
      text: "Strategy sprints in motion",
      emoji: "👇",
      position: "top",
      align: "left",
    },
  },
  // 2. Image positioned towards upper-middle/right (Background layer)
  {
    id: "left-2",
    src: "/images/culture/photo-1531403009284-440f080d1e12.jpg",
    alt: "Wireframing and user experience architecture design",
    wrapperClass: "w-[52%] sm:w-[50%] lg:w-[52%] aspect-[4/3] top-[4%] left-[44%] z-5",
    cardRotation: "rotate-[3.5deg]",
    parallax: {
      desktop: { startY: 70, endY: -45 },
      tablet: { startY: 38, endY: -25 },
      mobile: { startY: 18, endY: -12 },
    },
    caption: {
      text: "Designing user journeys",
      emoji: "👇",
      position: "top",
      align: "right",
    },
  },
  // 3. Larger photograph positioned towards lower-middle (Foreground layer)
  {
    id: "left-3",
    src: "/images/culture/photo-1556761175-4b46a572b786.jpg",
    alt: "Cross-functional team discussing solutions around conference table",
    wrapperClass: "w-[64%] sm:w-[62%] lg:w-[64%] aspect-[16/11] top-[38%] left-[16%] z-20",
    cardRotation: "-rotate-[5deg]",
    parallax: {
      desktop: { startY: 180, endY: -120 },
      tablet: { startY: 95, endY: -65 },
      mobile: { startY: 42, endY: -26 },
    },
  },
];

// -----------------------------------------------------------------------------
// Right Cluster (4 Overlapping Photos)
// -----------------------------------------------------------------------------
const RIGHT_CLUSTER_PHOTOS: CollagePhoto[] = [
  // 1. Photograph positioned towards middle-left of right cluster (Midground layer)
  {
    id: "right-1",
    src: "/images/culture/photo-1515187029135-18ee286d815b.jpg",
    alt: "Team milestones, celebrations, and collaborative energy",
    wrapperClass: "w-[54%] sm:w-[52%] lg:w-[54%] aspect-[4/3] top-[14%] left-[2%] z-10",
    cardRotation: "-rotate-[2.5deg]",
    parallax: {
      desktop: { startY: 100, endY: -65 },
      tablet: { startY: 55, endY: -35 },
      mobile: { startY: 25, endY: -16 },
    },
    caption: {
      text: "Team milestones & summits",
      emoji: "☝️",
      position: "top",
      align: "left",
    },
  },
  // 2. Photograph positioned towards upper-right (Background layer)
  {
    id: "right-2",
    src: "/images/culture/photo-1553877522-43269d4ea984.jpg",
    alt: "Product engineers working with focused craft and precision",
    wrapperClass: "w-[48%] sm:w-[46%] lg:w-[48%] aspect-[3/4] top-[4%] left-[48%] z-5",
    cardRotation: "rotate-[5.5deg]",
    parallax: {
      desktop: { startY: 65, endY: -40 },
      tablet: { startY: 35, endY: -22 },
      mobile: { startY: 16, endY: -10 },
    },
  },
  // 3. Photograph positioned towards lower-middle (Foreground layer)
  {
    id: "right-3",
    src: "/images/culture/photo-1551836022-d5d88e9218df.jpg",
    alt: "Creative specialist focusing on visual design details",
    wrapperClass: "w-[50%] sm:w-[48%] lg:w-[50%] aspect-[3/4] top-[42%] left-[16%] z-20",
    cardRotation: "rotate-[2.5deg]",
    parallax: {
      desktop: { startY: 200, endY: -130 },
      tablet: { startY: 110, endY: -70 },
      mobile: { startY: 46, endY: -28 },
    },
    caption: {
      text: "Always crafting with focus",
      emoji: "👇",
      position: "bottom",
      align: "left",
    },
  },
  // 4. Photograph positioned towards lower-right (Mid-foreground layer)
  {
    id: "right-4",
    src: "/images/culture/photo-1559136555-9303baea8ebd.jpg",
    alt: "Team exploring new tech patterns in studio lounge",
    wrapperClass: "w-[50%] sm:w-[48%] lg:w-[50%] aspect-[3/4] top-[36%] left-[46%] z-15",
    cardRotation: "-rotate-[4.5deg]",
    parallax: {
      desktop: { startY: 135, endY: -85 },
      tablet: { startY: 70, endY: -45 },
      mobile: { startY: 30, endY: -18 },
    },
  },
];

const ALL_PHOTOS = [...LEFT_CLUSTER_PHOTOS, ...RIGHT_CLUSTER_PHOTOS];

export function CultureAtmosphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap, ScrollTrigger } = getGSAP();
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const ctx = gsap.context(() => {
      // 1. Heading and Intro Entrance Reveal
      gsap.fromTo(
        section.querySelectorAll(".bi-culture-intro__eyebrow, .bi-culture-intro__title, .bi-culture-intro__desc"),
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Responsive Scroll-Driven Layered Parallax Scrub
      const mm = gsap.matchMedia();

      // Desktop: Full layered parallax with deep vertical separation
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        ALL_PHOTOS.forEach((photo, idx) => {
          const el = photoRefs.current[idx];
          if (!el) return;

          const { startY, endY } = photo.parallax.desktop;

          // Progressive opacity reveal in the first 25% of scroll
          tl.fromTo(
            el,
            { opacity: 0.15 },
            { opacity: 1, duration: 0.25, ease: "power1.out" },
            0
          );

          // Continuous upward layered parallax drift across full scroll progress
          tl.fromTo(
            el,
            { y: startY },
            { y: endY, duration: 1, ease: "none" },
            0
          );
        });
      });

      // Tablet: Proportional parallax with preserved composition
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
            invalidateOnRefresh: true,
          },
        });

        ALL_PHOTOS.forEach((photo, idx) => {
          const el = photoRefs.current[idx];
          if (!el) return;

          const { startY, endY } = photo.parallax.tablet;

          tl.fromTo(
            el,
            { opacity: 0.2 },
            { opacity: 1, duration: 0.25, ease: "power1.out" },
            0
          );

          tl.fromTo(
            el,
            { y: startY },
            { y: endY, duration: 1, ease: "none" },
            0
          );
        });
      });

      // Mobile: Gentle parallax motion optimized for touch viewports
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        ALL_PHOTOS.forEach((photo, idx) => {
          const el = photoRefs.current[idx];
          if (!el) return;

          const { startY, endY } = photo.parallax.mobile;

          tl.fromTo(
            el,
            { opacity: 0.3 },
            { opacity: 1, duration: 0.25, ease: "power1.out" },
            0
          );

          tl.fromTo(
            el,
            { y: startY },
            { y: endY, duration: 1, ease: "none" },
            0
          );
        });
      });
    }, section);

    // Staggered ScrollTrigger refreshes to ensure calculations lock in after images and fonts settle
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="culture-atmosphere"
      className="bi-culture-section select-none relative overflow-hidden bg-[#0d0c12]"
      aria-labelledby="bi-culture-title"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] lg:w-[1100px] h-[550px] bg-[radial-gradient(circle,rgba(52,204,123,0.06)_0%,rgba(43,184,109,0.015)_50%,transparent_70%)] blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="bi-culture-container relative z-10">
        {/* ================================================================= */}
        {/* 1. Preserved Section Header                                       */}
        {/* ================================================================= */}
        <header className="bi-culture-intro mb-12 sm:mb-16 lg:mb-20">
          <div className="bi-culture-intro__heading-wrap">
            <span className="bi-culture-intro__eyebrow">Our Culture &amp; People</span>
            <h2 id="bi-culture-title" className="bi-culture-intro__title">
              Feel the atmosphere.
            </h2>
          </div>

          <div className="bi-culture-intro__desc-wrap">
            <p className="bi-culture-intro__desc">
              Behind every great digital experience is a team of curious minds, creative thinkers and problem solvers. At Better Insights, we bring strategy, design and technology together to create meaningful digital experiences and build things that make a difference.
            </p>
          </div>
        </header>

        {/* ================================================================= */}
        {/* 2. Scattered Photo Collage (Two Distinct Clusters with Parallax)  */}
        {/* ================================================================= */}
        <div
          ref={galleryRef}
          className="relative w-full min-h-[720px] lg:min-h-[760px] xl:min-h-[820px] pb-16 sm:pb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-14 xl:gap-24 items-center">
            
            {/* --------------------------------------------------------------- */}
            {/* Left Cluster: 3 Overlapping Photographs                         */}
            {/* --------------------------------------------------------------- */}
            <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[680px] xl:h-[720px]">
              {LEFT_CLUSTER_PHOTOS.map((item, idx) => {
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      photoRefs.current[idx] = el;
                    }}
                    className={`absolute overflow-visible ${item.wrapperClass}`}
                  >
                    <div
                      className={`relative w-full h-full rounded-[14px] sm:rounded-[18px] overflow-visible ${item.cardRotation} group transition-transform duration-500 hover:scale-105 hover:z-30`}
                    >
                      {/* Caption Decoration with Emoji */}
                      {item.caption && (
                        <div
                          className={`absolute z-30 pointer-events-none flex flex-col items-center ${
                            item.caption.position === "top"
                              ? "-top-12 sm:-top-14"
                              : "-bottom-14 sm:-bottom-16"
                          } ${
                            item.caption.align === "left"
                              ? "left-2 sm:left-4"
                              : item.caption.align === "right"
                              ? "right-2 sm:right-4"
                              : "left-1/2 -translate-x-1/2"
                          }`}
                        >
                          {item.caption.position === "bottom" && (
                            <span className="text-xl sm:text-2xl mb-0.5 filter drop-shadow">
                              {item.caption.emoji}
                            </span>
                          )}
                          <span className="text-xs sm:text-sm font-light text-[#CCCCCC] tracking-tight whitespace-nowrap text-center filter drop-shadow [font-family:'Host_Grotesk',sans-serif]">
                            {item.caption.text}
                          </span>
                          {item.caption.position === "top" && (
                            <span className="text-xl sm:text-2xl mt-0.5 filter drop-shadow">
                              {item.caption.emoji}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Image Container with Rounded Corners & Soft Border */}
                      <div className="relative w-full h-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#181622] border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)] group-hover:border-[#34CC7B]/40 transition-colors duration-300">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* --------------------------------------------------------------- */}
            {/* Right Cluster: 4 Overlapping Photographs                        */}
            {/* --------------------------------------------------------------- */}
            <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[680px] xl:h-[720px]">
              {RIGHT_CLUSTER_PHOTOS.map((item, idx) => {
                const globalIdx = LEFT_CLUSTER_PHOTOS.length + idx;
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      photoRefs.current[globalIdx] = el;
                    }}
                    className={`absolute overflow-visible ${item.wrapperClass}`}
                  >
                    <div
                      className={`relative w-full h-full rounded-[14px] sm:rounded-[18px] overflow-visible ${item.cardRotation} group transition-transform duration-500 hover:scale-105 hover:z-30`}
                    >
                      {/* Caption Decoration with Emoji */}
                      {item.caption && (
                        <div
                          className={`absolute z-30 pointer-events-none flex flex-col items-center ${
                            item.caption.position === "top"
                              ? "-top-12 sm:-top-14"
                              : "-bottom-14 sm:-bottom-16"
                          } ${
                            item.caption.align === "left"
                              ? "left-2 sm:left-4"
                              : item.caption.align === "right"
                              ? "right-2 sm:right-4"
                              : "left-1/2 -translate-x-1/2"
                          }`}
                        >
                          {item.caption.position === "bottom" && (
                            <span className="text-xl sm:text-2xl mb-0.5 filter drop-shadow">
                              {item.caption.emoji}
                            </span>
                          )}
                          <span className="text-xs sm:text-sm font-light text-[#CCCCCC] tracking-tight whitespace-nowrap text-center filter drop-shadow [font-family:'Host_Grotesk',sans-serif]">
                            {item.caption.text}
                          </span>
                          {item.caption.position === "top" && (
                            <span className="text-xl sm:text-2xl mt-0.5 filter drop-shadow">
                              {item.caption.emoji}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Image Container with Rounded Corners & Soft Border */}
                      <div className="relative w-full h-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-[#181622] border border-white/10 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)] group-hover:border-[#34CC7B]/40 transition-colors duration-300">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 420px"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default CultureAtmosphere;
