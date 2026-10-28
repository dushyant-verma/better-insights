"use client";

import React from "react";
import Image from "next/image";

interface ClientLogo {
  name: string;
  image: string;
}

const ALL_LOGOS: ClientLogo[] = [
  // Row 1
  { name: "Voyya", image: "/images/Voyya.webp" },
  { name: "Veda Edu", image: "/images/Veda-Edu-logo.png.webp" },
  { name: "TJC", image: "/images/tjc-logo.png.webp" },
  { name: "Stylebar Ireland", image: "/images/stylebar-ireland.png.webp" },
  { name: "Skydec", image: "/images/skydec-logo.png.webp" },
  { name: "Sanction Store", image: "/images/Sanction-Store-2.png.webp" },
  { name: "RK College", image: "/images/RK-College.webp" },
  { name: "Pooja Hospital", image: "/images/Pooja-Hospital.webp" },
  { name: "Perfect Frame Studios", image: "/images/Perfect-Frame-Studios-Logo.png.webp" },
  { name: "Old Fort Quarter", image: "/images/oldfortquater-logo.png.webp" },
  { name: "Nirmala Enterprises", image: "/images/Nirmala-Ent.png" },
  { name: "MPF", image: "/images/mpf-logo.png" },
  { name: "Miracle Rug", image: "/images/miracle-rug-logo.png" },
  { name: "Lieber Earth", image: "/images/lieberearth-logo.png.webp" },
  { name: "LED CN", image: "/images/ledcn-logo.png.webp" },
  { name: "Label16", image: "/images/Label16-Logo.png.webp" },
  { name: "La Maison", image: "/images/La-masion.png.webp" },
  { name: "Khare Legal Chambers", image: "/images/khare-legal-chambers-logo-1.png.webp" },

  // Row 2
  { name: "JP Hospital Solan", image: "/images/JP-Hospital-Solan-logo.png" },
  { name: "HMH", image: "/images/hmh-logo.png.webp" },
  { name: "Hidup", image: "/images/hidup-logo.png" },
  { name: "GT Diagnostics", image: "/images/gt-diagnostics-logo-e1747472463202.png.webp" },
  { name: "Dr. Pet", image: "/images/Dr.-Pet.webp" },
  { name: "Deshyoga", image: "/images/deshyoga-logo.png.webp" },
  { name: "Dentwin", image: "/images/Dentwin-1-e1757342321293.png.webp" },
  { name: "Dant Suraksha", image: "/images/dant-suraksha-logo-2.png.webp" },
  { name: "Course Proxy", image: "/images/courseproxy-logo.png.webp" },
  { name: "Classic Daiquiris", image: "/images/Classic-Daiquiris-logo-1.png" },
  { name: "Biotopics", image: "/images/Biotopics-Logo.png.webp" },
  { name: "Bernela", image: "/images/Bernela.webp" },
  { name: "Baraza", image: "/images/baraza-logo.png.webp" },
  { name: "Ashtang", image: "/images/ashtang-logo-e1747472538329.png" },
  { name: "Apki Return", image: "/images/apki-return-logo-e1747472274482.png.webp" },
  { name: "Almoda", image: "/images/almoda-logo.png.webp" },
  { name: "Afecto", image: "/images/afecto-logo-e1747472495525.png.webp" },
  { name: "2C Consulting", image: "/images/2cconsulting-logo.png" },
];

const ROW_1 = ALL_LOGOS.slice(0, 18);
const ROW_2 = ALL_LOGOS.slice(18, 36);

export function ClientLogoWall() {
  return (
    <section className="py-20 sm:py-24 bg-[#F3F2EF] overflow-hidden border-b border-black/10 select-none" aria-label="Trusted Clients & Partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-2">
          Trusted by Businesses That Move Forward
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-black leading-tight">
          Building Digital Experiences<br />
          <span className="text-black/50">That Create Impact.</span>
        </h2>
      </div>

      {/* Row 1 - Moves Left */}
      <div className="relative w-full overflow-hidden mb-5">
        <div className="flex gap-6 w-max animate-marquee">
          {[...ROW_1, ...ROW_1].map((logo, idx) => (
            <div
              key={`${logo.name}-r1-${idx}`}
              className="w-44 h-24 sm:w-52 sm:h-28 bg-white rounded-2xl border border-black/10 flex items-center justify-center p-6 shadow-sm hover:shadow-md hover:border-black/30 transition-all shrink-0 group"
            >
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Moves Right */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 w-max animate-marquee-reverse">
          {[...ROW_2, ...ROW_2].map((logo, idx) => (
            <div
              key={`${logo.name}-r2-${idx}`}
              className="w-44 h-24 sm:w-52 sm:h-28 bg-white rounded-2xl border border-black/10 flex items-center justify-center p-6 shadow-sm hover:shadow-md hover:border-black/30 transition-all shrink-0 group"
            >
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100">
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .animate-marquee-reverse {
          animation: marqueeReverse 45s linear infinite;
        }
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
