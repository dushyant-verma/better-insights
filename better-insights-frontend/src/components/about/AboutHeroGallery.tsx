"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";

interface ArchedCard {
  id: string;
  image: string;
  alt: string;
  tag: string;
  angle: number; // Degrees around the 360-degree arched wheel
}

// 10 authentic Better Insights studio & culture photographs
const BASE_CULTURE_CARDS = [
  {
    id: "studio-team",
    image: "/images/culture/hero-marketing-team.jpg",
    alt: "Better Insights creative studio team collaborating in open workspace",
    tag: "Studio Culture",
  },
  {
    id: "sprint-strategy",
    image: "/images/culture/photo-1552664730-d307ca884978.jpg",
    alt: "Collaborative sprint strategy workshop with cross-disciplinary pods",
    tag: "Strategy Sprint",
  },
  {
    id: "interface-design",
    image: "/images/culture/photo-1531403009284-440f080d1e12.jpg",
    alt: "Interface design & UX architecture wireframing session",
    tag: "Design Architecture",
  },
  {
    id: "ideation-sprint",
    image: "/images/culture/photo-1556761175-4b46a572b786.jpg",
    alt: "Creative ideation sprint & continuous delivery dialogue",
    tag: "Ideation Sprint",
  },
  {
    id: "engineering-pod",
    image: "/images/culture/photo-1553877522-43269d4ea984.jpg",
    alt: "Full-stack digital engineering & growth pod at Better Insights",
    tag: "Engineering Pod",
  },
  {
    id: "modern-engineering",
    image: "/images/culture/photo-1559136555-9303baea8ebd.jpg",
    alt: "Cloud architecture & headless systems review",
    tag: "Modern Engineering",
  },
  {
    id: "creative-thinking",
    image: "/images/culture/photo-1551836022-d5d88e9218df.jpg",
    alt: "First principles inquiry & creative design thinking session",
    tag: "Creative Thinking",
  },
  {
    id: "executive-strategy",
    image: "/images/culture/photo-1515187029135-18ee286d815b.jpg",
    alt: "Executive leadership & strategic agency roadmap meeting",
    tag: "Executive Strategy",
  },
  {
    id: "digital-solutions",
    image: "/images/culture/photo-1573164713988-8665fc963095.jpg",
    alt: "Enterprise digital transformation & technical planning",
    tag: "Digital Solutions",
  },
  {
    id: "ux-prototyping",
    image: "/images/culture/photo-1573496359142-b8d87734a5a2.jpg",
    alt: "Design sprint & interactive prototyping review",
    tag: "UX Prototyping",
  },
];

// 24 cards placed at balanced 15° intervals (24 * 15° = 360°)
// Displays 4 primary prominent cards across desktop with adjacent cards peeking at the edges
const TOTAL_CARDS = 24;
const ANGLE_STEP = 15;

const ARCHED_CARDS: ArchedCard[] = Array.from({ length: TOTAL_CARDS }, (_, i) => {
  const base = BASE_CULTURE_CARDS[i % BASE_CULTURE_CARDS.length];
  return {
    id: `${base.id}-${i}`,
    image: base.image,
    alt: base.alt,
    tag: base.tag,
    angle: i * ANGLE_STEP,
  };
});

export function AboutHeroGallery() {
  const heroRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  // Rotation & Drag state
  const rotationRef = useRef(0);
  const isPausedRef = useRef(false);
  const isVisibleRef = useRef(true);
  const isInteractingRef = useRef(false);
  const isHorizontalDragRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastXRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Pause continuous animation when hero is scrolled out of viewport
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  // Continuous animation loop moving along the arch trajectory
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    // Slow, stately rotation speed (approx ~2.4 deg/sec)
    const speed = 0.04;

    const step = () => {
      if (isVisibleRef.current && !isPausedRef.current && !isDraggingRef.current) {
        rotationRef.current -= speed;

        if (rotationRef.current <= -360) {
          rotationRef.current += 360;
        }

        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
        }
      }
      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Pointer drag controls with directional thresholding
  const handlePointerDown = (e: React.PointerEvent) => {
    isInteractingRef.current = true;
    isHorizontalDragRef.current = false;
    isDraggingRef.current = false;
    startXRef.current = e.pageX;
    startYRef.current = e.pageY;
    lastXRef.current = e.pageX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isInteractingRef.current) return;
    const deltaXTotal = Math.abs(e.pageX - startXRef.current);
    const deltaYTotal = Math.abs(e.pageY - startYRef.current);

    if (!isHorizontalDragRef.current && !isDraggingRef.current) {
      if (deltaYTotal > 8 && deltaYTotal > deltaXTotal) {
        // Vertical swipe: let page scroll naturally
        isInteractingRef.current = false;
        return;
      }
      if (deltaXTotal > 8 && deltaXTotal > deltaYTotal) {
        isHorizontalDragRef.current = true;
        isDraggingRef.current = true;
      }
    }

    if (isDraggingRef.current) {
      const deltaX = e.pageX - lastXRef.current;
      lastXRef.current = e.pageX;

      // Convert horizontal pixel drag into wheel angle rotation
      rotationRef.current += deltaX * 0.06;

      if (rotationRef.current <= -360) {
        rotationRef.current += 360;
      } else if (rotationRef.current > 0) {
        rotationRef.current -= 360;
      }

      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
    }
  };

  const handlePointerUp = () => {
    isInteractingRef.current = false;
    isHorizontalDragRef.current = false;
    isDraggingRef.current = false;
  };

  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const nextSection =
      document.getElementById("who-we-are") ||
      document.getElementById("423758") ||
      document.querySelector(".who-redesign");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="about-hero"
      className="bi-about-hero-dark"
      aria-label="About Better Insights Hero"
    >
      {/* Background ambient radial illumination */}
      <div className="bi-about-hero-glow" aria-hidden="true" />

      {/* 1. Large Centered Headline (Overlaps slightly with arched carousel below) */}
      <div className="bi-about-hero-header">
        <h1 className="bi-hero-title">
          Good ideas. Great people.<br className="hidden sm:inline" /> Better outcomes.
        </h1>
      </div>

      {/* 2. Arched Image Carousel (Reference: archedImageCarouselDesktop) */}
      <div
        className="bi-arched-carousel-stage touch-pan-y"
        role="region"
        aria-label="Arched rotating gallery of Better Insights culture and craft"
        onMouseEnter={() => {
          isPausedRef.current = true;
        }}
        onMouseLeave={() => {
          isPausedRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div
          ref={wheelRef}
          className="bi-arched-wheel"
          style={{ transform: "rotate(0deg)" }}
        >
          {ARCHED_CARDS.map((card, index) => (
            <div
              key={card.id}
              className="bi-arched-spoke"
              style={
                {
                  "--spoke-angle": `${card.angle}deg`,
                } as React.CSSProperties
              }
            >
              <div className="bi-arched-card">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  priority={index === 0 || index === 1 || index === 23}
                  className="bi-arched-card__img object-cover object-center pointer-events-none"
                  sizes="(max-width: 640px) 210px, (max-width: 1024px) 290px, 380px"
                />

                {/* Subtle glassmorphic tag */}
                <div className="bi-arched-card__tag">
                  <span className="bi-arched-card__tag-dot" />
                  <span>{card.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Centered Brand CTA Button (Matches BI Header Button Identity #33CC7A) */}
      <div className="bi-hero-cta-wrap">
        <a
          href="#who-we-are"
          onClick={handleScrollDown}
          className="bi-hero-cta-btn group"
          aria-label="Learn about us - Scroll to who we are"
        >
          <span className="bi-hero-cta-btn__text">Learn about us</span>
          <span className="bi-hero-cta-arrow" aria-hidden="true">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="17" />
              <polyline points="7 17 17 17 17 7" />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}

// Backward-compatibility export
export { AboutHeroGallery as AboutHeroSlider };
