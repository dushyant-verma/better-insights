"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowDownRight } from "lucide-react";
import { BlobButton } from "@/components/ui/BlobButton";
import type { CareerDetail } from "@/data/careersData";

interface SingleCareerTOCProps {
  career: CareerDetail;
}

export function SingleCareerTOC({ career }: SingleCareerTOCProps) {
  const [activeId, setActiveId] = useState<string>("about-the-role");
  const [showCtaCard, setShowCtaCard] = useState<boolean>(true);

  const TOC_ITEMS = [
    {
      id: "about-the-role",
      label: `Better Insights is looking for an ${career.title}.`,
    },
    {
      id: "main-responsibilities",
      label: "Main duties & responsibilities include:",
    },
    {
      id: "what-we-need-to-see",
      label: "What we need to see:",
    },
    {
      id: "benefits",
      label: "Benefits of working at Better Insights",
    },
    {
      id: "apply",
      label: "How to Apply:",
    },
  ];

  useEffect(() => {
    // 1. Intersection Observer for accurate active heading detection
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0% -60% 0%",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // 2. High-precision Scroll Listener as fallback
    const handleScroll = () => {
      const headerOffset = 140;
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(TOC_ITEMS[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            setActiveId(TOC_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <aside className="w-full lg:w-[280px] xl:w-[320px] shrink-0 lg:sticky lg:top-28 lg:self-start z-10 space-y-5">
      {/* =================================================================== */}
      {/* 1. "Apply for this role" Card (MadeByShape Reference Top Sidebar)   */}
      {/* =================================================================== */}
      {showCtaCard && (
        <div className="relative bg-[#16171B] rounded-2xl border border-white/10 p-4 sm:p-5 shadow-xl overflow-hidden transition-all duration-300">
          {/* Close button at top right */}
          <button
            type="button"
            onClick={() => setShowCtaCard(false)}
            aria-label="Dismiss apply prompt"
            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3.5">
            {/* Left Thumbnail Photo */}
            <div className="w-20 h-24 sm:w-22 sm:h-26 rounded-xl overflow-hidden relative shrink-0 bg-neutral-900 border border-white/10">
              <Image
                src="/images/culture/photo-1573496359142-b8d87734a5a2.jpg"
                alt="Join Better Insights team"
                fill
                sizes="88px"
                className="object-cover object-center"
              />
            </div>

            {/* Right Information & CTA */}
            <div className="flex flex-col justify-between py-0.5 min-w-0">
              <div>
                <span className="text-[11px] text-neutral-400 font-light block mb-0.5">
                  Join us!
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-white leading-tight mb-2.5 [font-family:'Host_Grotesk',sans-serif]">
                  Tickle your<br />fancy?
                </h3>
              </div>

              <div>
                <BlobButton
                  href="#apply"
                  onClick={(e) => scrollTo("apply", e)}
                  size="sm"
                  variant="primary"
                  icon="arrow-down"
                  ariaLabel="Apply for this role"
                >
                  Apply for this role
                </BlobButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. Sticky Table of Contents Card                                    */}
      {/* =================================================================== */}
      <div className="bg-[#16171B] rounded-2xl border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="text-xs font-mono text-neutral-400 font-medium mb-4 pb-2 border-b border-white/10">
          Contents
        </div>

        <nav aria-label="Table of Contents">
          <ul className="space-y-3.5 text-xs sm:text-[13px] leading-snug [font-family:'Host_Grotesk',sans-serif]">
            {TOC_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollTo(item.id, e)}
                    className={`block transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "border-l-2 border-white pl-3 text-white font-medium underline underline-offset-4 decoration-white/40"
                        : "pl-3.5 text-white/60 hover:text-white transition-colors"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
