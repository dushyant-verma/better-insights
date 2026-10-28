import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Sparkles, Layers, Cpu, TrendingUp, RefreshCw, Globe } from "lucide-react";
import { getAllServices } from "@/lib/data/services";

interface ServicesOverviewProps {
  id?: string;
}

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "website-development": Globe,
  "crm-integrations": Layers,
  "ai-automation": Sparkles,
  "digital-growth": TrendingUp,
  "digital-transformation": RefreshCw,
  "technology-engineering": Cpu,
};

export function ServicesOverview({ id = "services-overview" }: ServicesOverviewProps) {
  const services = getAllServices();

  return (
    <section id={id} className="py-24 sm:py-32 bg-[#FAF5F0] border-b border-black/10 select-none scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Core capabilities
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1B1411] leading-tight [font-family:'Host_Grotesk',sans-serif]">
            Comprehensive digital capabilities built for scale.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1B1411]/70 font-normal leading-relaxed">
            Each offering is engineered to solve specific operational friction, accelerate customer acquisition,
            and build durable digital infrastructure.
          </p>
        </div>

        {/* Editorial Stacked / Alternating Grid */}
        <div className="space-y-12 sm:space-y-16">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[service.slug] || Sparkles;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                className="bg-white rounded-[1.75rem] border border-black/10 p-6 sm:p-10 lg:p-12 hover:border-[#33CC7A]/40 transition-all shadow-xs"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Column */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#FAF5F0] border border-black/10 flex items-center justify-center text-[#33CC7A] shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#1B1411]/50">
                        {service.eyebrow}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1B1411] mb-4 [font-family:'Host_Grotesk',sans-serif]">
                      <Link
                        href={`/services/${service.slug}`}
                        className="hover:text-[#33CC7A] transition-colors"
                      >
                        {service.title}
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-[#1B1411]/75 leading-relaxed font-normal mb-6 max-w-2xl">
                      {service.shortDesc}
                    </p>

                    {/* Capabilities Quick Highlights */}
                    <div className="mb-8 pt-6 border-t border-black/10">
                      <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/50 mb-3">
                        Key capabilities included:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.capabilities.slice(0, 4).map((cap) => (
                          <div key={cap.number} className="flex items-start gap-2 text-xs sm:text-sm text-[#1B1411]/80">
                            <CheckCircle2 className="w-4 h-4 text-[#33CC7A] shrink-0 mt-0.5" />
                            <span>{cap.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1B1411] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#33CC7A] hover:text-[#1B1411] transition-all group shadow-xs"
                      >
                        <span>Explore service</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>

                      <Link
                        href={`/contact?service=${encodeURIComponent(service.contactServiceValue)}`}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FAF5F0] text-[#1B1411] border border-black/10 text-xs font-semibold uppercase tracking-wider hover:bg-black/5 transition-colors"
                      >
                        <span>Request consultation</span>
                      </Link>
                    </div>
                  </div>

                  {/* Visual Asset Column */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="block group service-card-image-wrap rounded-2xl overflow-hidden border border-black/10 aspect-4/3 sm:aspect-16/10 relative shadow-sm"
                    >
                      <Image
                        src={service.cardImage}
                        alt={`${service.title} architectural visualization`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          {service.categoryTag}
                        </span>
                        <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#33CC7A] group-hover:text-[#1B1411] transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
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
