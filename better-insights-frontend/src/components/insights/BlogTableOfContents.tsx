"use client";

import React, { useEffect, useState } from "react";
import { Clock, ChevronDown } from "lucide-react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface BlogTableOfContentsProps {
  items: TOCItem[];
  readTime?: number | string;
}

export function BlogTableOfContents({ items, readTime = 4 }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Default to first item
    if (!activeId && items[0]) {
      setActiveId(items[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible headings
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Sort by top position to pick the topmost visible heading
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-90px 0% -60% 0%",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, activeId]);

  if (!items || items.length === 0) return null;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 110;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
      setMobileOpen(false);
    }
  };

  return (
    <div className="w-full">
      {/* Mobile / Tablet Accordion (< lg) */}
      <div className="block lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          type="button"
          className="w-full flex items-center justify-between px-5 py-3.5 bg-[#141518] border border-white/10 rounded-2xl text-left text-sm font-medium text-white transition-colors"
          aria-expanded={mobileOpen}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CBFC6B]" />
            <span>Table of Contents ({items.length})</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
              mobileOpen ? "rotate-180 text-white" : ""
            }`}
          />
        </button>

        {mobileOpen && (
          <div className="mt-2 p-5 bg-[#141518] border border-white/10 rounded-2xl animate-bi-fade-in-up">
            <ul className="space-y-3 text-xs sm:text-sm">
              {items.map((item, idx) => {
                const isActive = activeId === item.id;
                const displayText = /^\d+\./.test(item.text)
                  ? item.text
                  : `${idx + 1}. ${item.text}`;

                return (
                  <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleScrollTo(e, item.id)}
                      className={`block py-1 transition-colors leading-snug ${
                        isActive
                          ? "text-[#CBFC6B] font-semibold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {displayText}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar (lg and up) */}
      <div className="hidden lg:block space-y-4">
        {/* Main Card */}
        <div className="w-full bg-[#141518] border border-white/10 rounded-[20px] p-6 shadow-xl">
          <div className="text-xs font-medium text-neutral-400 mb-4 tracking-wide uppercase font-mono">
            Contents
          </div>

          <nav aria-label="Table of contents">
            <ul className="space-y-3.5">
              {items.map((item, idx) => {
                const isActive = activeId === item.id;
                // Add numbering if not present in original heading text
                const displayText = /^\d+\./.test(item.text)
                  ? item.text
                  : `${idx + 1}. ${item.text}`;

                return (
                  <li key={item.id} className={item.level === 3 ? "pl-2" : ""}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleScrollTo(e, item.id)}
                      className={`block text-xs xl:text-sm leading-snug transition-all duration-200 ${
                        isActive
                          ? "border-l-2 border-white pl-3 text-white font-medium"
                          : "border-l-2 border-transparent pl-3 text-neutral-400 hover:text-neutral-200 hover:border-neutral-600"
                      }`}
                    >
                      {displayText}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Horizontal Divider & Reading Time Row Below Card */}
        <div className="pt-2">
          <div className="w-full h-px bg-white/10 mb-3" />
          <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 font-light">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
