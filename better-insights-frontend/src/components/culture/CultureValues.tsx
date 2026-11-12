"use client";

import React from "react";
import Image from "next/image";
import { Users, Lightbulb, GraduationCap, Handshake } from "lucide-react";

const VALUES = [
  {
    number: "01",
    title: "Our People",
    tagline: "People come first, always.",
    description:
      "We invest in human potential, celebrate individual strengths, and cultivate a supportive, inclusive space where everyone can do their best work without fear of failure.",
    image: "/images/culture/photo-1515187029135-18ee286d815b.jpg",
    icon: Users,
  },
  {
    number: "02",
    title: "Creative Thinking",
    tagline: "Challenging conventions with fresh perspectives.",
    description:
      "We reject standard, cookie-cutter templates. We question assumptions and craft original, intentional solutions that elevate our clients far beyond the competition.",
    image: "/images/culture/photo-1551836022-d5d88e9218df.jpg",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Continuous Learning",
    tagline: "Committed to doing it better and better.",
    description:
      "Technology and digital landscapes evolve relentlessly. We actively invest in training, test emerging AI models, and share knowledge across departments every week.",
    image: "/images/culture/photo-1559136555-9303baea8ebd.jpg",
    icon: GraduationCap,
  },
  {
    number: "04",
    title: "Better Together",
    tagline: "Collaboration over silos, clarity over noise.",
    description:
      "The greatest digital outcomes happen at the intersection of disciplines. Designers, engineers, and marketers work as one cohesive squad with our client partners.",
    image: "/images/culture/photo-1556761175-4b46a572b786.jpg",
    icon: Handshake,
  },
];

export function CultureValues() {
  return (
    <section
      id="culture-values"
      className="py-24 sm:py-32 bg-[#F7F4F1] text-[#171717] select-none border-t border-black/8 relative overflow-hidden"
      aria-label="What Matters to Us"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
            Core Principles
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light lg:font-normal tracking-[-0.03em] text-[#171717] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            What matters to us.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#66574F] font-normal leading-relaxed">
            Four guiding values that shape how we hire, how we treat our team members, and how we deliver
            transformative work for our partners.
          </p>
        </div>

        {/* 4 Editorial Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.number}
                className="bi-value-card flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container */}
                  <div className="bi-value-card__media">
                    <Image
                      src={val.image}
                      alt={val.title}
                      fill
                      className="bi-value-card__img"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Index Number Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#171717]/85 backdrop-blur-md text-xs font-mono font-bold text-white border border-white/10">
                      {val.number}
                    </div>

                    {/* Icon Bottom Right */}
                    <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#CBFC6B] text-[#171717] flex items-center justify-center shadow-lg">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-semibold tracking-tight text-[#171717] mb-1.5 [font-family:'Host_Grotesk',sans-serif]">
                      {val.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#CBFC6B] block mb-3">
                      {val.tagline}
                    </span>
                    <p className="text-xs sm:text-sm text-[#66574F] leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-black/5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#66574F]/70">
                      Better Insights Value
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

