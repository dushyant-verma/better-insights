"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export function ContactHero() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const scrollToForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const target =
      document.getElementById("contact-form-section") ||
      document.getElementById("contact-form");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = target.querySelector<HTMLInputElement>(
        "input#name, input[name='name']"
      );
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 600);
      }
    }
  };

  return (
    <>
      <section
        id="contact-hero"
        className="w-full bg-[#0E0F10] text-white pt-24 pb-8 sm:pt-32 sm:pb-12 lg:pt-36 lg:pb-14 xl:pt-20 xl:pb-0 overflow-hidden"
        aria-label="Contact Better Insights"
      >
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-[1720px] mx-auto">
          {/* Main Hero Container with Bottom Divider */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-solid border-white/10 pb-10 sm:pb-12 lg:pb-14 gap-8 lg:gap-8">
            {/* Left & Center: Section Indicator + Two-Line Headline */}
            <div className="relative w-full lg:w-[78%] xl:w-[80%] min-w-0">
              {/* Left Section Indicator: • Contact */}
              <div className="inline-flex items-center space-x-2 relative mb-3 lg:absolute lg:top-4 xl:top-5 lg:left-0 z-20">
                <span
                  className="bg-white w-1.5 h-1.5 rounded-full inline-block"
                  aria-hidden="true"
                />
                <span className="font-normal text-sm lg:text-base text-white/80 tracking-normal">
                  Contact
                </span>
              </div>

              {/* Main Headline with First-Line Indent matching MadeByShape */}
              <h1 className="text-[12vw] sm:text-[10vw] md:text-[9.5vw] lg:text-[8.5vw] xl:text-[135px] 2xl:text-[160px] font-normal tracking-tight text-white leading-[0.9] text-left lg:indent-32 xl:indent-48 select-none">
                It&apos;s nice to <br />
                meet ya{" "}
                {/* Circular Arrow Button (Matches MadeByShape exact geometry & interaction) */}
                <a
                  href="#contact-form-section"
                  onClick={scrollToForm}
                  className="relative top-2 sm:top-2.5 lg:top-3 inline-flex items-center justify-center w-11 h-11 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[5.8vw] lg:h-[5.8vw] lg:max-w-[88px] lg:max-h-[88px] xl:w-[88px] xl:h-[88px] rounded-full bg-[#CBFC6B] text-[#0E0F10] hover:rotate-45 hover:scale-90 active:scale-90 transition-all duration-300 cursor-pointer flex-shrink-0 align-baseline"
                  aria-label="Scroll to contact form"
                >
                  <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                    <svg
                      className="fill-current text-[#0E0F10] w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8"
                      width="12"
                      height="16"
                      viewBox="0 0 384 512"
                      aria-hidden="true"
                    >
                      <path d="M344 416h8V160h-16v228.7L53.7 106.3l-5.7-5.6L36.7 112l5.7 5.7L324.7 400H96v16h248z" />
                    </svg>
                  </div>
                </a>
              </h1>
            </div>

            {/* Right: BI Founder Card (Aspect 9:14) with Play Button */}
            <div className="w-[180px] sm:w-[220px] md:w-[240px] lg:w-[18%] xl:w-[16%] max-w-[280px] flex-shrink-0 self-start lg:self-center">
              <div className="w-full relative rounded-2xl lg:rounded-3xl bg-[#18191D] aspect-[9/14] overflow-hidden group shadow-2xl border border-white/10">
                {/* BI Founder Image Asset */}
                <img
                  src="/images/contact-founder-hero.webp"
                  alt="Gautam Koli — Founder & Director, Better Insights"
                  className="w-full h-full absolute inset-0 z-10 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20" />

                {/* Overlapping Bottom-Right Circular Play Button */}
                <div className="absolute inset-0 flex items-end justify-end p-3 sm:p-4 lg:p-5 z-30 pointer-events-none">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(true)}
                    className="pointer-events-auto flex-shrink-0 rounded-full bg-[#CBFC6B] text-[#0E0F10] flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shadow-2xl cursor-pointer"
                    aria-label="Play Better Insights Showreel Video"
                  >
                    <svg
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 fill-current text-[#0E0F10] ml-0.5"
                      width="12"
                      height="16"
                      viewBox="0 0 384 512"
                      aria-hidden="true"
                    >
                      <path d="M384 256L0 32v448l384-224z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showreel Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setShowVideoModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel video player"
        >
          <div
            className="relative w-full max-w-4xl bg-[#141416] border border-white/15 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-[#161619]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CBFC6B]" />
                <h3 className="text-sm font-semibold text-white">Better Insights Showreel</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <video
                src="/videos/Banner-Video01.mp4"
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
