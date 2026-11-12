"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, UserCheck } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/teamData";
import { TeamMemberData } from "@/components/about/TeamModal";

interface CulturePeopleProps {
  onSelectMember: (member: TeamMemberData) => void;
}

export function CulturePeople({ onSelectMember }: CulturePeopleProps) {
  const [selectedDept, setSelectedDept] = useState<string>("All");

  const departments = [
    "All",
    "Executive Leadership",
    "Technology & Engineering",
    "Growth & Partnerships",
    "Search & Organic Growth",
    "People & Culture",
    "Marketing Operations",
    "Creative & Media Production",
  ];

  const filteredMembers =
    selectedDept === "All"
      ? TEAM_MEMBERS
      : TEAM_MEMBERS.filter((m) => m.department === selectedDept);

  return (
    <section
      id="culture-team"
      className="py-24 sm:py-32 bg-[#0D0D10] text-white select-none border-t border-white/10 relative overflow-hidden"
      aria-label="Meet the People"
    >
      {/* Background Ambient Radial Glow */}
      <div
        className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(52,204,123,0.08)_0%,transparent_70%)] blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#34CC7B] block mb-3">
              Meet the People
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light lg:font-normal tracking-[-0.03em] text-white leading-tight [font-family:'Host_Grotesk',sans-serif]">
              The minds behind the magic.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#A5A5A5] font-normal leading-relaxed">
              We are strategists, engineers, storytellers, and analysts united by high curiosity and shared
              standards. Click on any team member to explore their background, philosophy, and expertise.
            </p>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 overflow-x-auto pb-2">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                selectedDept === dept
                  ? "bg-[#34CC7B] text-[#171717] shadow-md shadow-[#34CC7B]/20"
                  : "bg-white/5 hover:bg-white/10 text-[#A5A5A5] hover:text-white border border-white/10"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => onSelectMember(member)}
              className="group p-6 rounded-[2rem] bg-[#15151A] border border-white/10 hover:border-[#34CC7B]/40 hover:bg-[#191920] transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5"
            >
              <div>
                {/* Profile Photo Box with Rounded Container */}
                <div className="relative w-full h-[260px] sm:h-[280px] rounded-2xl overflow-hidden bg-[#1C1C24] mb-6">
                  <Image
                    src={member.originalPhoto || member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15151A]/80 via-transparent to-transparent" />

                  {/* Department Badge Top Left */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#0D0D10]/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-white/90">
                    {member.department}
                  </div>

                  {/* LinkedIn Shortcut */}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-black/60 hover:bg-[#34CC7B] hover:text-[#171717] backdrop-blur-md border border-white/15 flex items-center justify-center text-white transition-colors"
                      aria-label={`${member.name}'s LinkedIn profile`}
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                </div>

                {/* Name & Role */}
                <div className="mb-3">
                  <h3 className="text-xl font-semibold text-white tracking-tight group-hover:text-[#34CC7B] transition-colors [font-family:'Host_Grotesk',sans-serif]">
                    {member.name}
                  </h3>
                  <span className="text-xs font-mono text-[#34CC7B] block mt-0.5">
                    {member.role}
                  </span>
                </div>

                {/* Bio Excerpt */}
                <p className="text-xs sm:text-sm text-[#A5A5A5] leading-relaxed line-clamp-3 font-normal mb-6">
                  {member.bio}
                </p>
              </div>

              {/* Card Footer: View Story CTA */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/80 group-hover:text-white">
                <span className="inline-flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#34CC7B]" />
                  <span>View Story &amp; Details</span>
                </span>
                <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#34CC7B] group-hover:text-[#171717] border border-white/10 flex items-center justify-center text-white transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
