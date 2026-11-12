"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutCultureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const collageWrapRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mobile / Tablet manual scroll handlers
  const handleScroll = () => {
    if (!collageWrapRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = collageWrapRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (!collageWrapRef.current) return;
    const distance = (typeof window !== "undefined" ? window.innerWidth : 800) * 0.75;
    collageWrapRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  // GSAP ScrollTrigger Scroll-Driven Horizontal Scrub & Pinning
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const collage = collageRef.current;
    if (!section || !collage) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Heading and intro entrance animation
      gsap.fromTo(
        section.querySelectorAll(
          ".bi-culture-intro__eyebrow, .bi-culture-intro__title, .bi-culture-intro__desc"
        ),
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      // 2. Desktop: Horizontal scroll-driven animation with ScrollTrigger pin
      // Converts vertical scroll progress into horizontal movement (no idle auto-scroll)
      mm.add("(min-width: 1024px)", () => {
        const getScrollAmount = () => {
          const collageWidth = collage.scrollWidth;
          const viewportWidth = window.innerWidth;
          return -(collageWidth - viewportWidth + 80);
        };

        const getPinDistance = () => {
          return Math.max(collage.scrollWidth - window.innerWidth + 80, 1400);
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getPinDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Horizontal translation driven by user vertical scroll
        tl.to(
          collage,
          {
            x: getScrollAmount,
            ease: "none",
          },
          0
        );

        // Parallax and subtle tilt shifts per collage item during horizontal movement
        const items = section.querySelectorAll(".bi-culture-item");
        items.forEach((item, index) => {
          const isOdd = index % 2 === 1;
          tl.to(
            item,
            {
              y: isOdd ? -30 : 30,
              rotate: isOdd ? 2 : -2,
              ease: "none",
            },
            0
          );
        });

        return () => {
          tl.kill();
        };
      });

      // 3. Mobile / Tablet: Smooth staggered entrance without pinning
      mm.add("(max-width: 1023px)", () => {
        const items = section.querySelectorAll(".bi-culture-item");
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            {
              opacity: 0,
              scale: 0.92,
              y: 20,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.7,
              delay: (index % 3) * 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
      });
    }, section);

    // Staggered ScrollTrigger refresh to ensure calculations after fonts/images render
    const t1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    const t2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
    const t3 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
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
      className="bi-culture-section"
      aria-labelledby="bi-culture-title"
    >
      <div className="bi-culture-container">
        {/* Section Header (.bi-culture-intro) */}
        <header className="bi-culture-intro">
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

            {/* Touch Navigation Controls for Mobile/Tablet */}
            <div className="bi-culture-controls" aria-label="Culture Gallery Controls">
              <button
                type="button"
                onClick={() => scrollByAmount("left")}
                disabled={!canScrollLeft}
                className="bi-culture-nav-btn bi-culture-nav-btn--prev"
                aria-label="Previous images"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount("right")}
                disabled={!canScrollRight}
                className="bi-culture-nav-btn bi-culture-nav-btn--next"
                aria-label="Next images"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Scrapbook Collage Track (.bi-culture-collage) */}
      <div
        ref={collageWrapRef}
        onScroll={handleScroll}
        className="bi-culture-collage-wrap"
        tabIndex={0}
        role="region"
        aria-label="Team Atmosphere Photo Collage"
      >
        <div ref={collageRef} className="bi-culture-collage">
          {/* Cluster 1: Ideas & Design */}
          <div className="bi-culture-cluster bi-culture-cluster--1">
            {/* Item 1: Ideas in motion */}
            <div className="bi-culture-item bi-culture-item--1">
              <div className="bi-culture-caption bi-culture-caption--top-left">
                <span className="bi-culture-caption__emoji" role="img" aria-label="Finger pointing up">
                  ☝️
                </span>
                <span className="bi-culture-caption__badge">Ideas in motion</span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/hero-marketing-team.jpg"
                  alt="Better Insights team collaborating on digital strategy"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 62vw, 380px"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Item 2: Design meets technology */}
            <div className="bi-culture-item bi-culture-item--2">
              <div className="bi-culture-caption bi-culture-caption--bottom-right">
                <span className="bi-culture-caption__badge">Design meets technology</span>
                <span className="bi-culture-caption__emoji" role="img" aria-label="Finger pointing down">
                  👇
                </span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/photo-1531403009284-440f080d1e12.jpg"
                  alt="User experience design and wireframe mapping"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 48vw, 320px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Cluster 2: Collaboration & Focus */}
          <div className="bi-culture-cluster bi-culture-cluster--2">
            {/* Item 3: Built together */}
            <div className="bi-culture-item bi-culture-item--3">
              <div className="bi-culture-caption bi-culture-caption--top-right">
                <span className="bi-culture-caption__emoji" role="img" aria-label="Sparkles">
                  ✨
                </span>
                <span className="bi-culture-caption__badge">Built together</span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/photo-1556761175-4b46a572b786.jpg"
                  alt="Cross-functional engineering and design sprint"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 58vw, 380px"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Item 4: Creative minds at work */}
            <div className="bi-culture-item bi-culture-item--4">
              <div className="bi-culture-caption bi-culture-caption--bottom-left">
                <span className="bi-culture-caption__badge">Creative minds at work</span>
                <span className="bi-culture-caption__emoji" role="img" aria-label="Finger pointing up">
                  ☝️
                </span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/photo-1551836022-d5d88e9218df.jpg"
                  alt="Creative specialist developing brand concepts"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 50vw, 340px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Cluster 3: Innovation & Brainstorming */}
          <div className="bi-culture-cluster bi-culture-cluster--3">
            {/* Item 5: Brainstorming something big */}
            <div className="bi-culture-item bi-culture-item--5">
              <div className="bi-culture-caption bi-culture-caption--bottom-right">
                <span className="bi-culture-caption__badge">Brainstorming something big</span>
                <span className="bi-culture-caption__emoji" role="img" aria-label="Finger pointing down">
                  👇
                </span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/photo-1552664730-d307ca884978.jpg"
                  alt="Strategic whiteboard planning workshop"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 62vw, 400px"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Item 6: Behind the pixels */}
            <div className="bi-culture-item bi-culture-item--6">
              <div className="bi-culture-caption bi-culture-caption--top-left">
                <span className="bi-culture-caption__emoji" role="img" aria-label="Finger pointing up">
                  ☝️
                </span>
                <span className="bi-culture-caption__badge">Behind the pixels</span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/photo-1553877522-43269d4ea984.jpg"
                  alt="Deep focus engineering and interface precision"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 48vw, 320px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Cluster 4: Culture & Team Spirit */}
          <div className="bi-culture-cluster bi-culture-cluster--4">
            {/* Item 7: Team moments */}
            <div className="bi-culture-item bi-culture-item--7">
              <div className="bi-culture-caption bi-culture-caption--bottom-right">
                <span className="bi-culture-caption__badge">Team moments</span>
                <span className="bi-culture-caption__emoji" role="img" aria-label="Finger pointing down">
                  👇
                </span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/photo-1515187029135-18ee286d815b.jpg"
                  alt="Celebrating team milestones and camaraderie"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 58vw, 360px"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Item 8: Always exploring */}
            <div className="bi-culture-item bi-culture-item--8">
              <div className="bi-culture-caption bi-culture-caption--top-right">
                <span className="bi-culture-caption__emoji" role="img" aria-label="Finger pointing up">
                  ☝️
                </span>
                <span className="bi-culture-caption__badge">Always exploring</span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/photo-1559136555-9303baea8ebd.jpg"
                  alt="Researching emerging technology patterns"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 50vw, 340px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Cluster 5: Impact & Reality */}
          <div className="bi-culture-cluster bi-culture-cluster--5">
            {/* Item 9: Turning ideas into reality */}
            <div className="bi-culture-item bi-culture-item--9">
              <div className="bi-culture-caption bi-culture-caption--top-left">
                <span className="bi-culture-caption__emoji" role="img" aria-label="Rocket">
                  🚀
                </span>
                <span className="bi-culture-caption__badge">Turning ideas into reality</span>
              </div>
              <div className="bi-culture-item__media-box">
                <Image
                  src="/images/culture/photo-1573164713988-8665fc963095.jpg"
                  alt="Delivering business impact and measurable client ROI"
                  fill
                  className="bi-culture-item__img"
                  sizes="(max-width: 768px) 65vw, 420px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
