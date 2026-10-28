"use client";

import React from "react";
import Image from "next/image";
import { CLIENTELE_RECORDS } from "@/lib/data/clientele";

export function ClienteleMarquee() {
  // Use a curated set of logos for the marquee strip
  const marqueeLogos = CLIENTELE_RECORDS.slice(0, 16);

  return (
    <section className="py-10 bg-[#FAF5F0] border-b border-black/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1B1411]/50 text-center">
          Partnered with innovative organizations worldwide
        </p>
      </div>

      {/* Marquee Track with gradient fade masks on sides */}
      <div className="clientele-marquee-wrapper relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FAF5F0] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FAF5F0] to-transparent z-10 pointer-events-none" />

        <div className="clientele-marquee-track flex items-center gap-12 sm:gap-16 py-2">
          {/* Double track for seamless infinite scroll */}
          {[...marqueeLogos, ...marqueeLogos].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center justify-center shrink-0 w-32 h-14 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              title={client.name}
            >
              <Image
                src={client.logo}
                alt={`${client.name} Logo`}
                fill
                className="object-contain"
                sizes="130px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
