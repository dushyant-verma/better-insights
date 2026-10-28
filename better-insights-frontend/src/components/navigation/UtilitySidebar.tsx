"use client";

import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";

interface UtilitySidebarProps {
  onOpenSearch: () => void;
}

export function UtilitySidebar({ onOpenSearch }: UtilitySidebarProps) {
  return (
    <aside
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center bg-black/90 backdrop-blur-md text-white rounded-l-xl border-l border-t border-b border-white/10 shadow-2xl overflow-hidden transition-all duration-300 hover:bg-black"
      aria-label="Quick utility navigation"
    >
      {/* Search Trigger Button */}
      <button
        type="button"
        onClick={onOpenSearch}
        className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors border-b border-white/10"
        aria-label="Open search dialog"
        title="Search Better Insights"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Vertical Contact Us Link */}
      <Link
        href="/contact"
        className="py-6 px-3 flex items-center justify-center text-white/90 hover:text-white hover:bg-white/10 transition-colors group"
        aria-label="Contact Better Insights"
      >
        <span
          className="text-xs uppercase font-semibold tracking-widest whitespace-nowrap [writing-mode:vertical-rl] rotate-180 group-hover:tracking-[0.25em] transition-all duration-300"
        >
          Contact Us
        </span>
      </Link>
    </aside>
  );
}
