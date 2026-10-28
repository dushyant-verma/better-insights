"use client";

import React, { useEffect, useState } from "react";
import { ListCollapse, ChevronDown } from "lucide-react";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0% -66% 0%",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) {
    return null;
  }

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
    <>
      {/* Mobile Collapsible TOC */}
      <div className="lg:hidden mb-8 bg-white border border-black/10 rounded-2xl overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full px-5 py-4 flex items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black bg-[#F3F2EF]"
        >
          <div className="flex items-center gap-2">
            <ListCollapse className="w-4 h-4 text-black/60" />
            <span>Table of Contents ({items.length})</span>
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`} />
        </button>

        {mobileOpen && (
          <nav className="p-4 bg-white border-t border-black/10 text-xs">
            <ol className="space-y-2.5">
              {items.map((item) => (
                <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className={`block py-1 transition-colors ${
                      activeId === item.id ? "text-black font-bold underline" : "text-black/60 hover:text-black"
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar TOC */}
      <aside className="hidden lg:block sticky top-28 w-64 shrink-0 pr-6" aria-label="Table of Contents">
        <div className="p-5 bg-white rounded-3xl border border-black/10 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-black/10 text-black">
            <ListCollapse className="w-4 h-4 text-black/60" />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-black">
              Contents
            </h4>
          </div>

          <nav className="text-xs">
            <ol className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} className={item.level === 3 ? "pl-3 text-[11px]" : ""}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleScrollTo(e, item.id)}
                      className={`block py-1 leading-snug rounded transition-all ${
                        isActive
                          ? "text-black font-bold border-l-2 border-black pl-2 bg-black/5"
                          : "text-black/60 hover:text-black hover:pl-1"
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </aside>
    </>
  );
}
