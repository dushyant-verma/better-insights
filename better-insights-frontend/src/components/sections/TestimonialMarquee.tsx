"use client";

import React from "react";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Eileen Brennan",
    role: "Managing Director",
    company: "Stylebar Ireland",
    quote: "Better Insights transformed our digital presence with exceptional agility. Their strategic clarity and engineering precision delivered measurable business growth from day one.",
  },
  {
    name: "David C. Gallagher",
    role: "Operations Director",
    company: "Old Fort Quarter",
    quote: "Working with Better Insights gave us the technological foundation we needed to scale. Their team combined deep technical insight with extraordinary execution speed.",
  },
  {
    name: "Ananya Khare",
    role: "Principal Partner",
    company: "Khare Legal Chambers",
    quote: "The AI automation workflows engineered by Better Insights eliminated our operational bottlenecks and significantly reduced document processing times across the firm.",
  },
  {
    name: "Marcus Thorne",
    role: "Head of Digital Platforms",
    company: "Voyya",
    quote: "From initial architecture through rollout, Better Insights demonstrated unmatched product engineering rigor. Our user engagement and conversion metrics increased dramatically.",
  },
  {
    name: "Dr. Rajesh Sharma",
    role: "Medical Director",
    company: "GT Diagnostics",
    quote: "A truly collaborative partner. Better Insights modernized our patient management and diagnostic reporting infrastructure with zero disruption to daily clinical operations.",
  },
  {
    name: "Liam O'Connor",
    role: "Commercial Lead",
    company: "Sanction Store",
    quote: "Their team built a high-volume drop infrastructure that effortlessly handled peak traffic spikes while keeping conversion rates at record highs.",
  },
];

export function TestimonialMarquee() {
  return (
    <section className="py-24 sm:py-32 bg-[#F3F2EF] border-b border-black/10 select-none overflow-hidden" aria-label="Client Recognition Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-2">
          Client Recognition
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-black leading-tight">
          What Leaders Say About Us.
        </h2>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 w-max animate-testimonial-marquee">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              className="w-[340px] sm:w-[420px] bg-white rounded-3xl border border-black/10 p-7 sm:p-8 flex flex-col justify-between shrink-0 shadow-sm hover:shadow-md hover:border-black/30 transition-all"
            >
              <div>
                <Quote className="w-8 h-8 text-black/20 mb-4" />
                <p className="text-xs sm:text-sm text-black/80 font-normal leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black">{t.name}</h4>
                  <p className="text-[11px] text-black/50">{t.role}, {t.company}</p>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-black/40 px-2.5 py-1 bg-[#F3F2EF] rounded-full">
                  Partner
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes testimonialMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-testimonial-marquee {
          animation: testimonialMarquee 40s linear infinite;
        }
        .animate-testimonial-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
