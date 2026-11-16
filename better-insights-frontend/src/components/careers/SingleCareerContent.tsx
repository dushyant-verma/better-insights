"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles, Check } from "lucide-react";
import type { CareerDetail } from "@/data/careersData";

interface SingleCareerContentProps {
  career: CareerDetail;
}

export function SingleCareerContent({ career }: SingleCareerContentProps) {
  return (
    <div className="space-y-14 sm:space-y-16 lg:space-y-20">
      {/* =================================================================== */}
      {/* 01. Intro Section: Better Insights is looking for an [Title]        */}
      {/* =================================================================== */}
      <section id="about-the-role" className="scroll-mt-32">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-tight text-white mb-6 [font-family:'Host_Grotesk',sans-serif]">
          Better Insights is looking for an {career.title}.
        </h2>

        {/* Introductory Content & Paragraphs */}
        <div className="text-neutral-300 space-y-5 text-base sm:text-lg leading-relaxed font-light [font-family:'Host_Grotesk',sans-serif]">
          <p className="text-[#D4D4D8]">
            We’d like a friendly, ambitious individual to come in and look after our team in-house, and our clients (all over the world). Organisation is key, and communication skills need to be super.
          </p>
          <p className="text-[#D4D4D8]">
            We’re on our way to creating a stress-free environment, and a big part of that is exceptional organisation and communication skills. A friendly person to look after every project, and the people involved.
          </p>
          <p className="text-[#D4D4D8]">
            This position will directly support the Better Insights team, and the multiple projects we deliver for a range of clients across modern digital platforms, AI applications, and growth ecosystems.
          </p>
          {career.aboutRole && career.aboutRole.length > 0 && (
            <div className="pt-2 space-y-4">
              {career.aboutRole.map((para, idx) => (
                <p key={idx} className="text-[#D4D4D8]">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Large Supporting Studio Photograph (MadeByShape Reference Composition) */}
        <div className="relative aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden my-8 sm:my-10 shadow-2xl bg-neutral-900 border border-white/10">
          <Image
            src="/images/culture/photo-1573496359142-b8d87734a5a2.jpg"
            alt="Better Insights studio collaboration"
            fill
            sizes="(max-width: 1024px) 100vw, 860px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </section>

      {/* =================================================================== */}
      {/* 02. Main Duties & Responsibilities                                  */}
      {/* =================================================================== */}
      <section id="main-responsibilities" className="scroll-mt-32 pt-8 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-tight text-white mb-6 [font-family:'Host_Grotesk',sans-serif]">
          Main duties &amp; responsibilities include:
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base mb-6 font-light">
          Here is a breakdown of what you will own, coordinate, and drive forward on a weekly and quarterly basis:
        </p>

        <ul className="space-y-3.5">
          {career.responsibilities.map((resp, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#141518] border border-white/[0.06] hover:border-white/15 transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-[#CBFC6B]/15 text-[#CBFC6B] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed [font-family:'Host_Grotesk',sans-serif]">
                {resp}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* =================================================================== */}
      {/* 03. What We Need to See (Skills, Qualifications & Character)        */}
      {/* =================================================================== */}
      <section id="what-we-need-to-see" className="scroll-mt-32 pt-8 border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-tight text-white mb-6 [font-family:'Host_Grotesk',sans-serif]">
          What we need to see:
        </h2>

        <p className="text-neutral-400 text-sm sm:text-base mb-6 font-light">
          We believe world-class delivery comes from shared values, transparent communication, and genuine curiosity:
        </p>

        <div className="space-y-3.5">
          {career.whatWereLookingFor.map((trait, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#141518] border border-white/[0.06] hover:border-[#CBFC6B]/30 transition-all duration-300 list-none"
            >
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-[#CBFC6B] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed [font-family:'Host_Grotesk',sans-serif]">
                {trait}
              </p>
            </li>
          ))}

          {career.skillsAndExperience.map((skill, idx) => (
            <li
              key={`skill-${idx}`}
              className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#141518] border border-white/[0.06] hover:border-white/15 transition-all duration-200 list-none"
            >
              <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-medium">
                {idx + 1}
              </div>
              <p className="text-sm sm:text-base text-neutral-200 font-light leading-relaxed [font-family:'Host_Grotesk',sans-serif]">
                {skill}
              </p>
            </li>
          ))}
        </div>
      </section>
    </div>
  );
}
