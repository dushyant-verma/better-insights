"use client";

import React, { useState, useId, useCallback } from "react";
import Link from "next/link";
import { PullCordLamp } from "@/components/ui/pull-cord-lamp";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";
import { 
  Cpu, 
  TrendingUp, 
  Globe, 
  Workflow, 
  CheckCircle2, 
  AlertCircle
} from "lucide-react";

interface StageData {
  percent: number;
  label: string;
  badge: string;
  heading: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    status: "challenge" | "opportunity" | "connected";
    tag?: string;
  }>;
}

const STAGES: StageData[] = [
  {
    percent: 0,
    label: "Untapped Potential",
    badge: "0% — Current State",
    heading: "Your business has untapped potential.",
    description: "Every growing business faces operational friction when channels, data, and workflows evolve in silos without a unified architecture.",
    items: [
      {
        title: "Disconnected marketing channels",
        description: "Efforts spread across multiple platforms without unified attribution or strategy.",
        status: "challenge",
        tag: "Fragmentation"
      },
      {
        title: "Manual and repetitive workflows",
        description: "Valuable hours spent copying data, sending follow-ups, and managing basic tasks.",
        status: "challenge",
        tag: "Inefficiency"
      },
      {
        title: "Limited visibility into performance",
        description: "Difficult to track which campaigns, channels, or touchpoints drive real business value.",
        status: "challenge",
        tag: "Opaque Data"
      },
      {
        title: "Disconnected customer and lead management",
        description: "Leads slip through cracks due to fragmented tracking and manual handoffs.",
        status: "challenge",
        tag: "Lost Leads"
      },
      {
        title: "Digital experiences that could convert better",
        description: "Websites and landing pages that attract visitors but miss key conversion opportunities.",
        status: "challenge",
        tag: "Under-converting"
      }
    ]
  },
  {
    percent: 25,
    label: "Clarity",
    badge: "25% — Clarity",
    heading: "Understand what needs to change.",
    description: "Auditing data touchpoints and operational bottlenecks brings high-impact growth opportunities into focus.",
    items: [
      {
        title: "Clearer growth priorities",
        description: "Identify high-leverage initiatives rather than spreading resources too thin.",
        status: "opportunity",
        tag: "Strategic Focus"
      },
      {
        title: "Better visibility into marketing performance",
        description: "Consolidated analytics reveal where attention and investment generate meaningful returns.",
        status: "opportunity",
        tag: "Transparent ROI"
      },
      {
        title: "Identification of repetitive tasks",
        description: "Mapping day-to-day operations highlights exactly where automation will save time.",
        status: "opportunity",
        tag: "Process Audit"
      },
      {
        title: "A stronger digital foundation",
        description: "Pinpointing design, speed, and UX gaps to prepare digital properties for scale.",
        status: "opportunity",
        tag: "Modern UX"
      }
    ]
  },
  {
    percent: 50,
    label: "Connected Systems",
    badge: "50% — Connected Systems",
    heading: "Bring your growth systems together.",
    description: "Connecting your digital presence with backend workflows ensures data flows seamlessly across customer touchpoints.",
    items: [
      {
        title: "Better-connected CRM and lead management",
        description: "Inbound leads flow directly into centralized pipelines with automated qualification.",
        status: "opportunity",
        tag: "CRM Pipeline"
      },
      {
        title: "Integrated website and marketing workflows",
        description: "Forms, tracking, and campaign destinations stay synchronized without manual entry.",
        status: "opportunity",
        tag: "Unified Flow"
      },
      {
        title: "More consistent lead capture",
        description: "High-intent touchpoints across pages convert prospect interest into structured enquiries.",
        status: "opportunity",
        tag: "Conversion"
      },
      {
        title: "Improved reporting and measurement",
        description: "Cross-system dashboards give leadership timely insights for informed decisions.",
        status: "opportunity",
        tag: "Live Reporting"
      }
    ]
  },
  {
    percent: 75,
    label: "Intelligent Growth",
    badge: "75% — Intelligent Growth",
    heading: "Make your systems work smarter.",
    description: "Layering practical artificial intelligence and automated orchestration allows your business to do more with existing resources.",
    items: [
      {
        title: "Practical AI integrations",
        description: "Intelligent agents, content assistants, and predictive lead scoring tailored to your operations.",
        status: "opportunity",
        tag: "Applied AI"
      },
      {
        title: "Automated repetitive workflows",
        description: "Routine notifications, client onboarding steps, and status updates trigger automatically.",
        status: "opportunity",
        tag: "Zero-Touch Ops"
      },
      {
        title: "More relevant marketing insights",
        description: "AI-enhanced audience segmentation and behavioral insights refine outreach precision.",
        status: "opportunity",
        tag: "Adaptive Strategy"
      },
      {
        title: "Better coordination across business tools",
        description: "Messaging, sales tools, marketing suites, and analytics converse via reliable APIs.",
        status: "opportunity",
        tag: "Interoperability"
      }
    ]
  },
  {
    percent: 100,
    label: "Growth Potential",
    badge: "100% — Growth Potential",
    heading: "Turn disconnected efforts into a connected growth engine.",
    description: "When AI, marketing, digital experience, and automation function as one unified ecosystem, your business unlocks its next tier of sustainable growth.",
    items: [
      {
        title: "AI and intelligent workflows",
        description: "Applied artificial intelligence embedded directly into daily operations and customer touchpoints.",
        status: "connected",
        tag: "Intelligence"
      },
      {
        title: "Marketing and lead generation",
        description: "Data-driven organic search, targeted campaigns, and conversion funnels operating in sync.",
        status: "connected",
        tag: "Acquisition"
      },
      {
        title: "High-performing digital experiences",
        description: "Fast, bespoke websites and application interfaces that communicate clearly and convert reliably.",
        status: "connected",
        tag: "Digital Assets"
      },
      {
        title: "CRM and business automation",
        description: "Robust lead routing, customer pipelines, and continuous integration connecting all operations.",
        status: "connected",
        tag: "Scale"
      }
    ]
  }
];

// The 4 Genuine Better Insights capability areas
const CAPABILITIES = [
  {
    id: "ai",
    title: "AI & Intelligence",
    description: "AI integrations, intelligent workflows, and AI-powered business solutions.",
    href: "/ai-solutions",
    icon: Cpu,
    tag: "Intelligence",
    color: "#33cc7a",
    unlockLevel: 75
  },
  {
    id: "marketing",
    title: "Marketing & Growth",
    description: "SEO, performance marketing, social media, and lead generation.",
    href: "/digital-growth",
    icon: TrendingUp,
    tag: "Growth",
    color: "#3b82f6",
    unlockLevel: 50
  },
  {
    id: "digital",
    title: "Digital Experiences",
    description: "Website development, landing pages, e-commerce, and web applications.",
    href: "/services/website-development",
    icon: Globe,
    tag: "Experience",
    color: "#8b5cf6",
    unlockLevel: 25
  },
  {
    id: "automation",
    title: "Automation & CRM",
    description: "CRM integrations, lead management, and automated workflows.",
    href: "/crm-integrations",
    icon: Workflow,
    tag: "Operations",
    color: "#f59e0b",
    unlockLevel: 50
  }
];

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getReducedMotionServerSnapshot = () => false;

export function InteractiveGrowthSection() {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [isLampOn, setIsLampOn] = useState<boolean>(true);
  const prefersReducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const sliderId = useId();

  // Determine active stage based on slider percentage
  const getActiveStageIndex = (val: number): number => {
    if (val < 15) return 0;
    if (val < 38) return 1;
    if (val < 63) return 2;
    if (val < 88) return 3;
    return 4;
  };

  const activeIndex = getActiveStageIndex(sliderValue);
  const currentStage = STAGES[activeIndex];

  // Calculate dynamic glow and illumination factor
  const normalizedValue = sliderValue / 100;
  const illuminationFactor = isLampOn ? Math.max(0.4, normalizedValue) : (normalizedValue * 0.25);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  const setStageByIndex = (idx: number) => {
    const values = [0, 25, 50, 75, 100];
    setSliderValue(values[idx]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Home") {
      e.preventDefault();
      setSliderValue(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderValue(100);
    } else if (e.key === "PageUp") {
      e.preventDefault();
      setSliderValue(v => Math.min(100, v + 25));
    } else if (e.key === "PageDown") {
      e.preventDefault();
      setSliderValue(v => Math.max(0, v - 25));
    }
  };

  const handleLampToggle = useCallback((on: boolean) => {
    setIsLampOn(on);
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openMarketingPlanModal();
  };

  return (
    <section 
      id="growth-transformation" 
      data-8b-section="growth-strategy"
      aria-labelledby="growth-transformation-title"
    >
      {/* Dynamic Background Illumination from Lamp & Progress */}
      <div 
        className="growth__stage-ambient"
        style={{
          opacity: illuminationFactor,
          background: isLampOn 
            ? `radial-gradient(circle 850px at 85% 12%, rgba(253, 224, 71, 0.14), transparent 70%),
               radial-gradient(circle 900px at 50% 55%, rgba(51, 204, 122, ${0.04 + normalizedValue * 0.08}), transparent 80%),
               radial-gradient(circle 600px at 15% 85%, rgba(108, 60, 255, ${0.03 + normalizedValue * 0.05}), transparent 75%)`
            : `radial-gradient(circle 600px at 50% 50%, rgba(51, 204, 122, ${normalizedValue * 0.04}), transparent 80%)`
        }}
      />

      {/* ======================================================== */}
      {/* Section Header & Lamp Area                              */}
      {/* ======================================================== */}
      <div className="growth__head">
        
        {/* Left: Editorial Intro */}
        <div className="growth__intro">
          <div className="growth__eyebrow-row">
            <span className="m-badge">Growth Strategy</span>
            <div className="growth__lamp-status">
              <span className={`growth__lamp-status-dot ${isLampOn ? 'is-active' : ''}`} />
              <span>{isLampOn ? "Illuminated" : "Ambient"}</span>
            </div>
          </div>

          <h2 
            id="growth-transformation-title"
            className="m-text-3 growth__title"
            data-8b-motion="rise"
          >
            What if your business worked better?<span className="m-dot" aria-hidden="true"></span>
          </h2>

          <p className="m-text-5 growth__lead">
            Move beyond disconnected tools and manual processes. Explore how the right combination of AI, marketing, development, and automation can help your business grow.
          </p>
        </div>

        {/* Right: Architectural Lamp Fixture */}
        <div className="growth__lamp-fixture">
          <div 
            className="growth__lamp-halo"
            style={{ opacity: isLampOn ? 0.9 : 0.08 }}
          />
          <div className="growth__lamp-body">
            <PullCordLamp
              on={isLampOn}
              defaultOn={true}
              onChange={handleLampToggle}
              size="fill"
              shade="dome"
              bulb="clear"
              finish="theme"
              warmth={2700}
              sound={true}
              label="Pull cord lamp: toggles ambient business growth lighting"
              className="w-full h-full"
            />
          </div>
          <span className="growth__lamp-caption">
            💡 {isLampOn ? "Pull cord to dim" : "Pull cord to illuminate"}
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* Interactive Growth Transformation Card                  */}
      {/* ======================================================== */}
      <div className={`growth__card ${isLampOn ? 'is-illuminated' : ''}`}>
        
        {/* Stepper Header */}
        <div className="growth__stepper-head">
          <div className="growth__tag-group">
            <span className="m-badge">STAGE {activeIndex + 1} OF 5</span>
            <span style={{ fontFamily: "var(--font-1)", fontSize: "16px", fontWeight: 700, letterSpacing: "-0.01em" }}>
              {currentStage.label}
            </span>
          </div>

          <div className="growth__metric-pill">
            <span className="growth__metric-pct">{sliderValue}%</span>
            <span className="growth__metric-lbl">Transformation Progress</span>
          </div>
        </div>

        {/* Slider Boundary Markers */}
        <div className="growth__bound-row">
          <button
            type="button"
            onClick={() => setStageByIndex(0)}
            aria-label="Set slider to 0% where you are"
            className={`growth__bound-btn ${sliderValue <= 15 ? 'is-active-start' : ''}`}
          >
            WHERE YOU ARE <span style={{ opacity: 0.65, fontSize: "11px" }}>(0%)</span>
          </button>

          <span className="growth__bound-hint hidden sm:inline">
            Drag slider or select milestone below →
          </span>

          <button
            type="button"
            onClick={() => setStageByIndex(4)}
            aria-label="Set slider to 100% where you could be"
            className={`growth__bound-btn ${sliderValue >= 85 ? 'is-active-end' : ''}`}
          >
            WHERE YOU COULD BE <span style={{ opacity: 0.65, fontSize: "11px" }}>(100%)</span>
          </button>
        </div>

        {/* Custom Track & Native Range Input */}
        <div className="growth__track-wrapper">
          <label htmlFor={sliderId} className="sr-only">
            Growth transformation slider from 0% where you are to 100% where you could be
          </label>

          <div className="growth__track-bar">
            <div 
              className="growth__track-fill"
              style={{ width: `${sliderValue}%` }}
            />
          </div>

          <input
            id={sliderId}
            type="range"
            min="0"
            max="100"
            step="1"
            value={sliderValue}
            onChange={handleSliderChange}
            onKeyDown={handleKeyDown}
            aria-valuenow={sliderValue}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={`${sliderValue}% - ${currentStage.heading}`}
            className="growth__range-input"
          />

          <div 
            className="growth__thumb"
            style={{ left: `${sliderValue}%` }}
          />

          {/* 5 Milestone Step Nodes */}
          <div className="growth__milestones">
            {STAGES.map((s, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={s.percent}
                  type="button"
                  onClick={() => setStageByIndex(idx)}
                  aria-label={`Jump to stage ${s.percent}%: ${s.label}`}
                  className={`growth__milestone-btn ${isCurrent ? 'is-active' : ''}`}
                >
                  <span className="growth__milestone-dot" />
                  <span style={{ whiteSpace: "nowrap" }}>{s.percent}% {s.label.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* Active Stage Details (Headline, Narrative & Items)       */}
        {/* ======================================================== */}
        <div className="growth__stage-details">
          
          {/* Stage Headline & Narrative */}
          <div className="growth__stage-narrative">
            <div>
              <span className="m-badge" style={{ marginBottom: "12px" }}>
                {currentStage.badge}
              </span>
              <h3 className="growth__stage-heading">
                {currentStage.heading}
              </h3>
            </div>

            <p className="growth__stage-desc">
              {currentStage.description}
            </p>

            {currentStage.percent === 100 && (
              <div 
                style={{
                  marginTop: "8px",
                  padding: "16px 20px",
                  borderRadius: "var(--radius-3)",
                  background: "rgba(51, 204, 122, 0.08)",
                  border: "1px solid rgba(51, 204, 122, 0.25)",
                  color: "#33cc7a",
                  fontFamily: "var(--font-2)",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: 1.4
                }}
              >
                ✨ Your next stage of growth starts with the right connections.
              </div>
            )}
          </div>

          {/* Stage Items Grid */}
          <div className="growth__items-grid">
            {currentStage.items.map((item, idx) => {
              const isChallenge = item.status === "challenge";
              const isConnected = item.status === "connected";
              return (
                <div 
                  key={idx}
                  className={`growth__item-card ${isConnected ? 'is-connected' : ''}`}
                >
                  <div className="growth__item-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {isChallenge ? (
                        <AlertCircle style={{ width: "16px", height: "16px", color: "#f59e0b", flexShrink: 0 }} />
                      ) : (
                        <CheckCircle2 style={{ width: "16px", height: "16px", color: "#33cc7a", flexShrink: 0 }} />
                      )}
                      <h4 className="growth__item-title">
                        {item.title}
                      </h4>
                    </div>

                    {item.tag && (
                      <span className="m-badge" style={{ fontSize: "11px", minHeight: "22px", padding: "0 8px" }}>
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <p className="growth__item-desc">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ======================================================== */}
      {/* The 4 Connected Capability Pillars                       */}
      {/* ======================================================== */}
      <div style={{ marginTop: "clamp(48px, 8vh, 88px)" }}>
        <div className="growth__pillars-head">
          <div>
            <span className="m-badge" style={{ marginBottom: "12px" }}>
              Integrated Capabilities
            </span>
            <h3 className="m-text-4">
              {sliderValue >= 50 ? "Connected Growth Ecosystem" : "The Four Pillars of Modern Growth"}
              <span className="m-dot" aria-hidden="true"></span>
            </h3>
          </div>

          <p className="m-text-5 capabilities__lead">
            {sliderValue >= 75
              ? "All four areas operate as a cohesive growth engine, exchanging insights and automating execution."
              : "Explore how Better Insights builds, scales, and connects each critical dimension of modern business."}
          </p>
        </div>

        {/* Pillars Cards Deck */}
        <div className="growth__pillars-deck">
          
          {/* Animated Connecting SVG Bus */}
          {sliderValue >= 40 && (
            <div 
              style={{
                pointerEvents: "none",
                position: "absolute",
                inset: 0,
                opacity: Math.min(1, (sliderValue - 40) / 40),
                transition: "opacity 0.6s ease",
                zIndex: 0
              }}
              className="hidden lg:block"
            >
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none">
                <path 
                  d="M 12.5 50 H 87.5" 
                  stroke="url(#circuit-grad)" 
                  strokeWidth="1.5" 
                  strokeDasharray={prefersReducedMotion ? "none" : "4 4"}
                  className={prefersReducedMotion ? "" : "animate-pulse"}
                />
                <circle cx="12.5" cy="50" r="3" fill="#33cc7a" fillOpacity="0.8" />
                <circle cx="37.5" cy="50" r="3" fill="#3b82f6" fillOpacity="0.8" />
                <circle cx="62.5" cy="50" r="3" fill="#8b5cf6" fillOpacity="0.8" />
                <circle cx="87.5" cy="50" r="3" fill="#f59e0b" fillOpacity="0.8" />

                <defs>
                  <linearGradient id="circuit-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#33cc7a" stopOpacity="0.5" />
                    <stop offset="33%" stopColor="#3b82f6" stopOpacity="0.7" />
                    <stop offset="66%" stopColor="#8b5cf6" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            const isUnlocked = sliderValue >= cap.unlockLevel;

            return (
              <Link
                key={cap.id}
                href={cap.href}
                className={`growth__pillar-card ${isUnlocked ? 'is-unlocked' : ''}`}
                style={{ textDecoration: "none" }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <div 
                      className="growth__pillar-icon"
                      style={{ 
                        backgroundColor: isUnlocked ? "rgba(51, 204, 122, 0.12)" : "rgba(255, 255, 255, 0.05)",
                        color: isUnlocked ? "#33cc7a" : "var(--color-2)"
                      }}
                    >
                      <Icon style={{ width: "22px", height: "22px" }} />
                    </div>
                    <span className="m-badge" style={{ fontSize: "11px", minHeight: "22px" }}>
                      {cap.tag}
                    </span>
                  </div>

                  <h4 className="growth__pillar-title">
                    {cap.title}
                  </h4>

                  <p className="growth__pillar-desc">
                    {cap.description}
                  </p>
                </div>

                <div className="growth__pillar-footer">
                  <span className="m-link m-text-6">
                    <span className="m-link__label">Explore Service</span>
                    <svg className="m-link__arrow" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M2 8h11M9 3.5 13.5 8 9 12.5"/>
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* Consultation Call to Action                              */}
      {/* ======================================================== */}
      <div className="growth__cta-box">
        <div className="growth__cta-inner">
          <h3 className="growth__cta-title">
            Ready to move from potential to progress?<span className="m-dot" aria-hidden="true"></span>
          </h3>

          <p className="growth__cta-lead">
            Let&apos;s identify the opportunities that matter most to your business and build a practical plan for sustainable growth.
          </p>

          <button
            type="button"
            data-magnetic
            onClick={handleCtaClick}
            aria-label="Open consultation modal: Let's build your growth plan"
            className="m-btn"
          >
            <span className="m-btn__label">LET&apos;S BUILD YOUR GROWTH PLAN ↗</span>
            <span className="m-btn__wave" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
        </div>
      </div>

    </section>
  );
}

export default InteractiveGrowthSection;
