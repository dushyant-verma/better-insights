import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquare, Compass } from "lucide-react";

export function PortfolioCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/10 select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B1411] text-white rounded-[1.75rem] sm:rounded-[2rem] p-8 sm:p-14 lg:p-16 relative overflow-hidden shadow-xl text-center">
          
          {/* Subtle background glow */}
          <div 
            className="absolute -top-24 -right-24 w-80 h-80 bg-[#33CC7A]/15 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#33CC7A]/10 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wide border border-white/15">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              <span>Next steps</span>
            </span>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white leading-tight [font-family:'Host_Grotesk',sans-serif]">
              Have a project in mind?
            </h2>

            <p className="text-sm sm:text-base text-white/75 font-normal leading-relaxed">
              Let's explore how the right combination of strategy, creativity, and technology can move your business forward.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#33CC7A] hover:bg-[#28a764] text-[#1B1411] text-sm font-semibold rounded-full transition-all shadow-md"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/insights"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 text-sm font-medium rounded-full transition-all"
              >
                <Compass className="w-4 h-4 text-white/70" />
                <span>Explore insights</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
