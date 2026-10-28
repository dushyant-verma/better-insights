import React from "react";
import Link from "next/link";
import { ArrowUpRight, Send, Sparkles } from "lucide-react";

interface CareersCTAProps {
  onOpenApplication: () => void;
}

export function CareersCTA({ onOpenApplication }: CareersCTAProps) {
  return (
    <section
      className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/8 select-none relative overflow-hidden"
      aria-label="Careers Closing CTA"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#1B1411] text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl">
          {/* Ambient Depth Grid & Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#33CC7A]/15 via-[#33CC7A]/10 to-transparent rounded-full blur-[100px] pointer-events-none" 
            aria-hidden="true" 
          />
          
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold tracking-wide mb-6">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              <span>Shape what&apos;s next</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.08] mb-6 [font-family:'Host_Grotesk',sans-serif]">
              Have something valuable <br />
              <span className="text-white/70">to contribute?</span>
            </h2>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl font-normal mb-10">
              Even when a suitable position isn&apos;t listed, you can introduce yourself and share the work you&apos;d love to do. We always make room for exceptional talent.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenApplication}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#33CC7A] hover:bg-[#28a764] text-[#1B1411] text-sm font-semibold rounded-full transition-all shadow-xl"
              >
                <span>Send your application</span>
                <Send className="w-4 h-4" />
              </button>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full border border-white/15 transition-all"
              >
                <span>Learn about our culture</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
