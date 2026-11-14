"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, MessageSquareCode, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";
import { BlobButton } from "@/components/ui/BlobButton";

interface ServicesCTAProps {
  headline?: string;
  supportingText?: string;
  ctaLabel?: string;
  contactHref?: string;
  serviceName?: string;
}

export function ServicesCTA({
  headline = "Let's find the right solution for your business.",
  supportingText = "Whether you need to modernize legacy systems, automate complex customer pipelines, or scale acquisition, our strategists and engineers are ready to help.",
  ctaLabel = "Discuss Your Project",
  contactHref = "/contact",
  serviceName,
}: ServicesCTAProps) {
  const finalHref = serviceName
    ? `/contact?service=${encodeURIComponent(serviceName)}`
    : contactHref;

  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-t border-black/8 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[linear-gradient(145deg,#0C091A_0%,#180F33_45%,#0F0A24_80%,#090714_100%)] text-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl text-center border border-white/10">
          {/* Ambient Radial Gradient Accents */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#CBFC6B]/25 via-[#CBFC6B]/15 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white/10 text-white border border-white/15">
                <span className="w-2 h-2 rounded-full bg-[#CBFC6B] animate-pulse" />
                Strategic Next Steps
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold sm:font-bold tracking-[-0.035em] text-white leading-[1.05] mb-6 max-w-3xl mx-auto [font-family:'Host_Grotesk',sans-serif]">
              {headline}
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/75 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
              {supportingText}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <BlobButton
                onClick={() => openMarketingPlanModal()}
                size="lg"
                icon="arrow-up-right"
              >
                {ctaLabel}
              </BlobButton>

              <Link
                href="/work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm backdrop-blur-md border border-white/15 transition-all duration-300 hover:scale-[1.03]"
              >
                <MessageSquareCode className="w-4 h-4 text-white/70" />
                <span>Explore Case Studies</span>
              </Link>
            </div>

            {/* Reassurance Badges */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CBFC6B]" />
                Direct Lead Partner Consultation
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CBFC6B]" />
                Zero Obligation Roadmap Review
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#CBFC6B]" />
                Enterprise Security &amp; NDA Protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
