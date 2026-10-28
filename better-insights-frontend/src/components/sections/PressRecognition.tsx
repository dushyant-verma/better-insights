"use client";

import React from "react";
import Image from "next/image";

interface PressOutlet {
  name: string;
  logo: string;
}

const PRESS_OUTLETS: PressOutlet[] = [
  { name: "Business Standard", logo: "/press/Business-Standard.webp" },
  { name: "The Economic Times", logo: "/press/Economic-Times.png" },
  { name: "Entrepreneur Magazine", logo: "/press/Entrepreneur-Magazine.png" },
  { name: "Hindustan Times", logo: "/press/Hindustan-Times.png" },
  { name: "The Indian Express", logo: "/press/Indian-Express.png" },
];

export function PressRecognition() {
  return (
    <section className="py-20 sm:py-24 bg-white border-b border-black/10 select-none" aria-label="Media & Editorial Recognition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-3">
            Media &amp; Editorial Recognition
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-black leading-tight">
            We have helped brands earn trust, visibility, and media attention.
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-black/70 leading-relaxed max-w-2xl mx-auto">
            Our client transformations, digital campaigns, and executive perspectives have been featured across India&apos;s premier financial, business, and national news publications.
          </p>
        </div>

        {/* 5 Publication Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-center">
          {PRESS_OUTLETS.map((outlet) => (
            <div
              key={outlet.name}
              className="h-24 sm:h-28 p-4 bg-[#F3F2EF] rounded-2xl border border-black/10 flex items-center justify-center shadow-sm hover:border-black/30 hover:shadow-md transition-all group"
            >
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                <Image
                  src={outlet.logo}
                  alt={outlet.name}
                  fill
                  className="object-contain p-2"
                  sizes="240px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
