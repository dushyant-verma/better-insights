"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ArrowUpRight, GraduationCap, Heart, Briefcase, Award } from "lucide-react";

export interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  originalPhoto?: string;
  bio: string;
  experience?: string;
  expertise?: string[];
  education?: string;
  interests?: string[];
  linkedin: string;
}

interface TeamModalProps {
  member: TeamMemberData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TeamModal({ member, isOpen, onClose }: TeamModalProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    } else {
      document.body.style.overflow = "";
      if (triggerRef.current && typeof triggerRef.current.focus === "function") {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  // Split bio by double newlines into distinct paragraphs
  const paragraphs = member.bio.split("\n\n").filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bi-team-modal-name"
      aria-describedby="bi-team-modal-role"
    >
      {/* Clickable Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-[#FAF5F0] rounded-[2rem] shadow-2xl border border-black/15 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Floating Close Button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-black/60 hover:text-black rounded-full bg-white/80 hover:bg-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#33CC7A]"
          aria-label="Close team member profile"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Header Grid: Photo + Name/Role */}
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 pb-6 border-b border-black/10">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 bg-white border border-black/10 shadow-sm">
              <Image
                src={member.originalPhoto || member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 112px, 144px"
              />
            </div>

            <div className="flex-1">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#33CC7A]/15 text-[#1B1411] border border-[#33CC7A]/30 mb-2">
                {member.department}
              </span>
              <h2 id="bi-team-modal-name" className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1B1411]">
                {member.name}
              </h2>
              <p id="bi-team-modal-role" className="text-sm sm:text-base font-medium text-[#66574F] mt-1">
                {member.role}
              </p>

              {/* LinkedIn Connect Button */}
              <div className="mt-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1B1411] text-white hover:bg-black text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Connect on LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#33CC7A]" />
                </a>
              </div>
            </div>
          </div>

          {/* Experience Highlight (if available) */}
          {member.experience && (
            <div className="p-4 rounded-xl bg-white border border-black/8 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#33CC7A]/15 text-[#1B1411] flex items-center justify-center shrink-0 mt-0.5">
                <Briefcase className="w-4 h-4 text-[#33CC7A]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block">
                  Professional Experience
                </span>
                <p className="text-xs sm:text-sm text-[#1B1411] font-medium leading-relaxed mt-0.5">
                  {member.experience}
                </p>
              </div>
            </div>
          )}

          {/* Full Biography */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1B1411] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#33CC7A]" />
              <span>About &amp; Background</span>
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#1B1411]/85 leading-relaxed font-normal">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Expertise Badges */}
          {member.expertise && member.expertise.length > 0 && (
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block mb-2.5">
                Core Specializations
              </span>
              <div className="flex flex-wrap gap-2">
                {member.expertise.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-black/10 text-[#1B1411] shadow-2xs"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education & Personal Interests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-black/10">
            {member.education && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-black/10 flex items-center justify-center shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4 text-[#66574F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block">
                    Education
                  </span>
                  <span className="text-xs font-semibold text-[#1B1411] leading-relaxed">
                    {member.education}
                  </span>
                </div>
              </div>
            )}

            {member.interests && member.interests.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-black/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-4 h-4 text-[#66574F]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block">
                    Outside of Work
                  </span>
                  <span className="text-xs font-semibold text-[#1B1411] leading-relaxed">
                    {member.interests.join(" • ")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
