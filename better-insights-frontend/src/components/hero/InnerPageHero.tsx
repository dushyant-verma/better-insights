"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InnerPageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: "dark" | "light" | "warm";
  breadcrumb?: Array<{ label: string; href?: string }>;
  cta?: {
    label: string;
    href: string;
  };
  children?: React.ReactNode;
}

export function InnerPageHero({
  eyebrow,
  title,
  description,
  variant = "warm",
  breadcrumb,
  cta,
  children,
}: InnerPageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={cn(
        "relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden select-none border-b",
        isDark
          ? "bg-[linear-gradient(140deg,#0C091A_0%,#180F33_42%,#0F0A24_80%,#080612_100%)] text-[#FAF5F0] border-white/10"
          : "bg-[linear-gradient(135deg,#FAF8F5_0%,#F5EFFB_45%,#FAF5F0_80%,#F0E9F8_100%)] text-[#1B1411] border-black/8"
      )}
    >
      {/* Subtle Ambient Glow Behind Content */}
      <div
        className={cn(
          "absolute -top-32 left-1/3 -translate-x-1/2 w-[700px] h-[450px] blur-[120px] rounded-full pointer-events-none",
          isDark
            ? "bg-[radial-gradient(circle,rgba(139,92,246,0.14)_0%,rgba(99,102,241,0.06)_50%,transparent_75%)]"
            : "bg-[radial-gradient(circle,rgba(168,85,247,0.06)_0%,rgba(139,92,246,0.03)_50%,transparent_75%)]"
        )}
        aria-hidden="true"
      />

      {/* Organic Blobs in Bottom-Right Corner (Overlapping, soft-edged, cropped) */}
      <div
        className={cn(
          "absolute -bottom-24 -right-16 sm:-bottom-32 sm:-right-20 w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] rounded-full blur-[50px] sm:blur-[70px] pointer-events-none",
          isDark
            ? "bg-[radial-gradient(circle_at_40%_40%,rgba(168,85,247,0.16)_0%,rgba(124,58,237,0.08)_45%,transparent_75%)]"
            : "bg-[radial-gradient(circle_at_40%_40%,rgba(192,132,252,0.18)_0%,rgba(168,85,247,0.09)_45%,rgba(147,51,234,0.02)_70%,transparent_85%)]"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "absolute -bottom-8 right-24 sm:-bottom-12 sm:right-40 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full blur-[40px] sm:blur-[60px] pointer-events-none",
          isDark
            ? "bg-[radial-gradient(circle_at_45%_45%,rgba(99,102,241,0.12)_0%,rgba(139,92,246,0.05)_50%,transparent_75%)]"
            : "bg-[radial-gradient(circle_at_45%_45%,rgba(147,51,234,0.11)_0%,rgba(167,139,250,0.05)_50%,transparent_75%)]"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "absolute -bottom-16 right-6 sm:-bottom-20 sm:right-10 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] rounded-full blur-[45px] sm:blur-[65px] pointer-events-none",
          isDark
            ? "bg-[radial-gradient(circle_at_50%_50%,rgba(51,204,122,0.08)_0%,rgba(51,204,122,0.02)_45%,transparent_70%)]"
            : "bg-[radial-gradient(circle_at_50%_50%,rgba(51,204,122,0.07)_0%,rgba(51,204,122,0.02)_45%,transparent_70%)]"
        )}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-medium text-current opacity-60">
              <li>
                <Link href="/" className="hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              {breadcrumb.map((crumb) => (
                <React.Fragment key={crumb.label}>
                  <li aria-hidden="true" className="opacity-40">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </li>
                  <li>
                    {crumb.href ? (
                      <Link
                        href={crumb.href}
                        className="hover:opacity-100 transition-opacity"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="opacity-100 font-semibold" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </nav>
        )}

        {/* Eyebrow Pill Tag */}
        {eyebrow && (
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEE5DC] text-[#1B1411] border border-black/5 w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-[#33CC7A] animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Headline */}
        <h1
          className={cn(
            "text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl",
            isDark ? "text-[#FAF5F0]" : "text-[#1B1411]"
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Supporting Narrative */}
        {description && (
          <p
            className={cn(
              "mt-6 text-base sm:text-lg lg:text-xl max-w-2xl font-normal leading-relaxed",
              isDark ? "text-[#B8ABA3]" : "text-[#66574F]"
            )}
          >
            {description}
          </p>
        )}

        {/* Optional Primary CTA */}
        {cta && (
          <div className="mt-8">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#33CC7A] text-[#1B1411] text-xs font-bold uppercase tracking-wider hover:bg-[#2BB86D] transition-all duration-300 hover:scale-[1.03] shadow-md shadow-[#33CC7A]/20"
            >
              <span>{cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
