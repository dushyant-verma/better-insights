"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";

interface ServiceMenuItem {
  title: string;
  slug: string;
  shortDesc: string;
}

interface AboutMenuItem {
  title: string;
  slug: string;
  shortDesc: string;
}

const SERVICES_LIST: ServiceMenuItem[] = [
  {
    title: "Website Development",
    slug: "/services/website-development",
    shortDesc: "Next.js & Headless Architecture",
  },
  {
    title: "CRM & Integrations",
    slug: "/services/crm-integrations",
    shortDesc: "HubSpot, Zoho & Custom Pipelines",
  },
  {
    title: "AI & Automation",
    slug: "/services/ai-automation",
    shortDesc: "Intelligent Agents & Workflows",
  },
  {
    title: "Digital Growth",
    slug: "/services/digital-growth",
    shortDesc: "Data-Driven SEO & Performance PPC",
  },
  {
    title: "Digital Transformation",
    slug: "/services/digital-transformation",
    shortDesc: "Enterprise Systems Modernization",
  },
  {
    title: "Technology & Engineering",
    slug: "/services/technology-engineering",
    shortDesc: "Full-Stack Custom Platforms",
  },
];

const ABOUT_LIST: AboutMenuItem[] = [
  {
    title: "About Us",
    slug: "/about",
    shortDesc: "Our story, mission, ethos & executive leadership",
  },
  {
    title: "Meet the Team",
    slug: "/about#our-team",
    shortDesc: "The strategists, engineers & creators behind BI",
  },
  {
    title: "Culture & Life",
    slug: "/culture",
    shortDesc: "Team values, atmosphere & life inside BI",
  },
  {
    title: "Clientele & Testimonials",
    slug: "/clientele",
    shortDesc: "Client reviews, case stories & proven outcomes",
  },
];

export function MergedHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dropdown states for desktop
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Accordion states for mobile drawer
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  // Hover timeout refs to prevent dropdown flicker
  const aboutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const aboutItemRef = useRef<HTMLLIElement | null>(null);
  const servicesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const servicesItemRef = useRef<HTMLLIElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const isHomeActive = pathname === "/" || pathname === "/home-2" || pathname === "/home-redesign-1";
  const isAboutActive =
    pathname === "/about" ||
    pathname === "/culture" ||
    pathname === "/team" ||
    pathname === "/clientele";
  const isServicesActive = pathname?.startsWith("/services");
  const isWorkActive = pathname?.startsWith("/work");
  const isInsightsActive = pathname?.startsWith("/insights");
  const isContactActive = pathname === "/contact";

  // Scroll detection with requestAnimationFrame (Made by Shape smooth shrinking)
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 30);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Synchronize Lenis scroll locking with mobile menu open state
  useEffect(() => {
    if (mobileMenuOpen) {
      (window as any).lenis?.stop();
    } else {
      (window as any).lenis?.start();
    }
  }, [mobileMenuOpen]);

  // Keyboard navigation: Escape closes dropdowns and mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAboutOpen(false);
        setServicesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) {
        setAboutOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover handlers for About
  const handleAboutMouseEnter = () => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setServicesOpen(false);
    setAboutOpen(true);
  };
  const handleAboutMouseLeave = () => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    aboutTimerRef.current = setTimeout(() => {
      setAboutOpen(false);
    }, 180);
  };

  // Hover handlers for Services
  const handleServicesMouseEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    setAboutOpen(false);
    setServicesOpen(true);
  };
  const handleServicesMouseLeave = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    servicesTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 180);
  };

  return (
    <header
      ref={headerRef}
      className={`nav ${isScrolled ? "is-scrolled" : ""}`}
      id="nav"
      data-8b-section="navigation"
    >
      <nav
        className={`nav__bar relative ${isScrolled ? "is-scrolled" : ""}`}
        aria-label="Main Navigation"
      >
        {/* Brand Logo - Left */}
        <Link href="/" className="nav__brand" aria-label="Better Insights Homepage">
          <img
            src="/logos/better-insights-logo-6.png"
            alt="Better Insights"
            className="nav__logo-img"
          />
        </Link>

        {/* Desktop Navigation Links - Centered */}
        <ul className="nav__links m-text-6" role="menubar">
          {/* 1. Home Link */}
          <li className="nav__item" role="none">
            <Link
              href="/"
              className={`m-link-2 flex items-center py-1 font-inherit ${
                isHomeActive ? "is-active font-semibold text-[#1B1411]" : ""
              }`}
              aria-label="Home"
            >
              <span>Home</span>
            </Link>
          </li>

          {/* 2. About Mega Menu Dropdown */}
          <li
            ref={aboutItemRef}
            className="nav__item !static"
            role="none"
            onMouseEnter={handleAboutMouseEnter}
            onMouseLeave={handleAboutMouseLeave}
          >
            <button
              type="button"
              className={`m-link-2 flex items-center gap-1.5 cursor-pointer py-1 bg-transparent border-0 font-inherit ${
                isAboutActive ? "is-active font-semibold text-[#1B1411]" : ""
              }`}
              onClick={() => {
                setServicesOpen(false);
                setAboutOpen((prev) => !prev);
              }}
              aria-haspopup="true"
              aria-expanded={aboutOpen}
              aria-label="About menu"
            >
              <span>About</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  aboutOpen ? "rotate-180 text-[#34CC7B]" : "text-[#1B1411]/60"
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Desktop About Mega Menu */}
            {aboutOpen && (
              <div
                role="menu"
                aria-label="About Better Insights"
                onMouseEnter={handleAboutMouseEnter}
                onMouseLeave={handleAboutMouseLeave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[780px] max-w-[calc(100vw-2.5rem)] p-6 bg-white/98 backdrop-blur-2xl border border-black/8 rounded-[2rem] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.12),0_8px_20px_-6px_rgba(0,0,0,0.04)] z-[950] animate-in fade-in zoom-in-95 duration-150 before:content-[''] before:absolute before:-top-3.5 before:left-0 before:right-0 before:h-3.5"
              >
                <div className="grid grid-cols-12 gap-6 items-stretch">
                  {/* Left Column: Navigation Links */}
                  <div className="col-span-7 flex flex-col justify-between pr-4 border-r border-black/6">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#1B1411]/50">
                          Company Overview
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#1B1411]">
                        Get to know Better Insights
                      </h4>

                      <div className="grid grid-cols-2 gap-2 mt-3.5">
                        {ABOUT_LIST.map((item) => {
                          const isItemActive = pathname === item.slug;
                          return (
                            <Link
                              key={item.slug}
                              href={item.slug}
                              role="menuitem"
                              onClick={() => setAboutOpen(false)}
                              className={`p-3 rounded-2xl bg-black/[0.02] hover:bg-[#FAF8F5] transition-all duration-150 group border border-transparent hover:border-black/5 flex flex-col justify-between ${
                                isItemActive ? "bg-[#34CC7B]/10 border-[#34CC7B]/20" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-xs sm:text-[13px] font-semibold transition-colors ${
                                    isItemActive
                                      ? "text-[#34CC7B]"
                                      : "text-[#1B1411] group-hover:text-[#34CC7B]"
                                  }`}
                                >
                                  {item.title}
                                </span>
                                <ArrowUpRight
                                  className={`w-3.5 h-3.5 transition-all ${
                                    isItemActive
                                      ? "text-[#34CC7B]"
                                      : "text-black/30 group-hover:text-[#34CC7B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                  }`}
                                />
                              </div>
                              <p className="text-[11px] text-[#1B1411]/60 leading-snug mt-1 line-clamp-2">
                                {item.shortDesc}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-black/6 flex items-center justify-between">
                      <Link
                        href="/about"
                        onClick={() => setAboutOpen(false)}
                        className="text-[11.5px] font-medium text-[#1B1411]/70 hover:text-[#34CC7B] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Read our full agency story &amp; ethos</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Promotional Card */}
                  <div className="col-span-5">
                    <div className="rounded-[1.5rem] bg-[#F7F5F0] p-4 border border-black/5 flex flex-col justify-between h-full">
                      <div>
                        <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3">
                          <img
                            src="/images/culture/hero-marketing-team.jpg"
                            alt="Better Insights Team & Culture"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <span className="inline-block text-[9.5px] font-bold uppercase tracking-wider text-[#34CC7B] mb-0.5">
                          Culture &amp; People
                        </span>
                        <h5 className="font-semibold text-xs sm:text-[13px] text-[#1B1411] leading-snug">
                          Empowered Minds, Proven Craft
                        </h5>
                        <p className="text-[11px] text-[#1B1411]/65 mt-1 leading-relaxed">
                          We bring together senior engineers, marketers &amp; product minds
                          passionate about delivering undeniable impact.
                        </p>
                      </div>

                      <Link
                        href="/culture"
                        onClick={() => setAboutOpen(false)}
                        className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-full bg-[#1B1411] hover:bg-[#34CC7B] text-white hover:text-[#1B1411] text-[11.5px] font-semibold transition-all"
                      >
                        <span>Explore Our Culture</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* 3. Services Mega Menu Dropdown */}
          <li
            ref={servicesItemRef}
            className="nav__item !static"
            role="none"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button
              type="button"
              className={`m-link-2 flex items-center gap-1.5 cursor-pointer py-1 bg-transparent border-0 font-inherit ${
                isServicesActive ? "is-active font-semibold text-[#1B1411]" : ""
              }`}
              onClick={() => {
                setAboutOpen(false);
                setServicesOpen((prev) => !prev);
              }}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              aria-label="Services dropdown"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180 text-[#34CC7B]" : "text-[#1B1411]/60"
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Desktop Services Mega Menu */}
            {servicesOpen && (
              <div
                role="menu"
                aria-label="All Services"
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-[880px] max-w-[calc(100vw-2.5rem)] p-6 bg-white/98 backdrop-blur-2xl border border-black/8 rounded-[2rem] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.12),0_8px_20px_-6px_rgba(0,0,0,0.04)] z-[950] animate-in fade-in zoom-in-95 duration-150 before:content-[''] before:absolute before:-top-3.5 before:left-0 before:right-0 before:h-3.5"
              >
                <div className="grid grid-cols-12 gap-6 items-stretch">
                  {/* Left Column: 6 Services in 2 Columns */}
                  <div className="col-span-8 flex flex-col justify-between pr-4 border-r border-black/6">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#1B1411]/50">
                          Core Capabilities
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#1B1411]">
                        Scalable digital solutions engineered for growth
                      </h4>

                      <div className="grid grid-cols-2 gap-2 mt-3.5">
                        {SERVICES_LIST.map((srv) => {
                          const isActive = pathname === srv.slug;
                          return (
                            <Link
                              key={srv.slug}
                              href={srv.slug}
                              role="menuitem"
                              onClick={() => setServicesOpen(false)}
                              className={`p-3 rounded-2xl bg-black/[0.02] hover:bg-[#FAF8F5] transition-all duration-150 group border border-transparent hover:border-black/5 flex flex-col justify-between ${
                                isActive ? "bg-[#34CC7B]/10 border-[#34CC7B]/20" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className={`text-xs sm:text-[13px] font-semibold transition-colors ${
                                    isActive
                                      ? "text-[#34CC7B]"
                                      : "text-[#1B1411] group-hover:text-[#34CC7B]"
                                  }`}
                                >
                                  {srv.title}
                                </span>
                                <ArrowUpRight
                                  className={`w-3.5 h-3.5 transition-all ${
                                    isActive
                                      ? "text-[#34CC7B]"
                                      : "text-black/30 group-hover:text-[#34CC7B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                  }`}
                                />
                              </div>
                              <p className="text-[11px] text-[#1B1411]/60 leading-snug mt-1 line-clamp-2">
                                {srv.shortDesc}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-black/6 flex items-center justify-between">
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="text-[11.5px] font-medium text-[#1B1411]/70 hover:text-[#34CC7B] transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>Explore all services &amp; enterprise capabilities</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Promotional Card */}
                  <div className="col-span-4">
                    <div className="rounded-[1.5rem] bg-[#F7F5F0] p-4 border border-black/5 flex flex-col justify-between h-full">
                      <div>
                        <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3">
                          <img
                            src="/images/culture/photo-1531403009284-440f080d1e12.jpg"
                            alt="Digital Engineering & Growth"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <span className="inline-block text-[9.5px] font-bold uppercase tracking-wider text-[#34CC7B] mb-0.5">
                          Engineering &amp; Growth
                        </span>
                        <h5 className="font-semibold text-xs sm:text-[13px] text-[#1B1411] leading-snug">
                          Built to Scale Your Revenue
                        </h5>
                        <p className="text-[11px] text-[#1B1411]/65 mt-1 leading-relaxed">
                          From modern web stacks to enterprise AI workflows, we engineer digital
                          systems that deliver compounding ROI.
                        </p>
                      </div>

                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-full bg-[#1B1411] hover:bg-[#34CC7B] text-white hover:text-[#1B1411] text-[11.5px] font-semibold transition-all"
                      >
                        <span>View All Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* 4. Our Work */}
          <li className="nav__item" role="none">
            <Link
              href="/work"
              className={`m-link-2 flex items-center py-1 font-inherit ${
                isWorkActive ? "is-active font-semibold text-[#1B1411]" : ""
              }`}
            >
              <span>Our Work</span>
            </Link>
          </li>

          {/* 5. Insights */}
          <li className="nav__item" role="none">
            <Link
              href="/insights"
              className={`m-link-2 flex items-center py-1 font-inherit ${
                isInsightsActive ? "is-active font-semibold text-[#1B1411]" : ""
              }`}
            >
              <span>Insights</span>
            </Link>
          </li>

          {/* 6. Contact Us */}
          <li className="nav__item" role="none">
            <Link
              href="/contact"
              className={`m-link-2 flex items-center py-1 font-inherit ${
                isContactActive ? "is-active font-semibold text-[#1B1411]" : ""
              }`}
            >
              <span>Contact Us</span>
            </Link>
          </li>
        </ul>

        {/* Action Button - Right */}
        <button
          type="button"
          data-magnetic
          className="m-btn-3 nav__cta cursor-pointer"
          onClick={() => openMarketingPlanModal()}
          aria-haspopup="dialog"
          aria-label="Get Marketing Plan"
        >
          <span className="m-btn__label">Get Marketing Plan</span>
          <span className="m-btn__wave" aria-hidden="true">
            <i></i><i></i><i></i>
          </span>
        </button>

        {/* Mobile Toggle Button */}
        <button
          className="m-icon-btn nav__toggle"
          type="button"
          data-magnetic
          aria-expanded={mobileMenuOpen}
          aria-controls="menu"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Navigation Drawer */}
      <div
        className="menu"
        id="menu"
        data-lenis-prevent
        hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <button
          className="m-icon-btn menu__close"
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <ul className="menu__links m-text-5 space-y-2">
          {/* 1. Mobile Home Link */}
          <li>
            <Link
              href="/"
              className={`w-full flex items-center justify-between text-left m-link-2 py-1 font-inherit ${
                isHomeActive ? "text-[#34CC7B] font-semibold" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Home</span>
            </Link>
          </li>

          {/* 2. Mobile About Accordion */}
          <li>
            <button
              type="button"
              className="w-full flex items-center justify-between text-left m-link-2 py-1 bg-transparent border-0 font-inherit"
              onClick={() => setMobileAboutExpanded((prev) => !prev)}
              aria-expanded={mobileAboutExpanded}
            >
              <span className={isAboutActive ? "text-[#34CC7B] font-semibold" : ""}>About</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileAboutExpanded ? "rotate-180 text-[#34CC7B]" : ""
                }`}
              />
            </button>
            {mobileAboutExpanded && (
              <ul className="pl-4 mt-2 space-y-2 border-l border-white/20 text-sm">
                {ABOUT_LIST.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.slug}
                      className={`block py-1 ${
                        pathname === item.slug ? "text-[#34CC7B] font-semibold" : "text-white/80"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* 3. Mobile Services Accordion */}
          <li>
            <button
              type="button"
              className="w-full flex items-center justify-between text-left m-link-2 py-1 bg-transparent border-0 font-inherit"
              onClick={() => setMobileServicesExpanded((prev) => !prev)}
              aria-expanded={mobileServicesExpanded}
            >
              <span className={isServicesActive ? "text-[#34CC7B] font-semibold" : ""}>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileServicesExpanded ? "rotate-180 text-[#34CC7B]" : ""
                }`}
              />
            </button>
            {mobileServicesExpanded && (
              <ul className="pl-4 mt-2 space-y-2 border-l border-white/20 text-sm">
                <li>
                  <Link
                    href="/services"
                    className="block py-1 font-semibold text-[#34CC7B]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    All Services Overview →
                  </Link>
                </li>
                {SERVICES_LIST.map((srv) => (
                  <li key={srv.slug}>
                    <Link
                      href={srv.slug}
                      className={`block py-1 ${
                        pathname === srv.slug ? "text-[#34CC7B] font-semibold" : "text-white/80"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {srv.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* 4. Our Work */}
          <li>
            <Link
              href="/work"
              className={`m-link-2 ${isWorkActive ? "text-[#34CC7B] font-semibold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Work
            </Link>
          </li>

          {/* 5. Insights */}
          <li>
            <Link
              href="/insights"
              className={`m-link-2 ${isInsightsActive ? "text-[#34CC7B] font-semibold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Insights
            </Link>
          </li>

          {/* 6. Contact Us */}
          <li>
            <Link
              href="/contact"
              className={`m-link-2 ${isContactActive ? "text-[#34CC7B] font-semibold" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        <div style={{ marginTop: "auto", paddingTop: "2rem", display: "grid", gap: "1rem" }}>
          <button
            type="button"
            className="m-btn-3 cursor-pointer"
            onClick={() => {
              setMobileMenuOpen(false);
              openMarketingPlanModal();
            }}
            style={{ width: "100%", justifyContent: "center" }}
            aria-haspopup="dialog"
            aria-label="Get Marketing Plan"
          >
            <span className="m-btn__label">Get Marketing Plan</span>
            <span className="m-btn__wave" aria-hidden="true">
              <i></i><i></i><i></i>
            </span>
          </button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
              color: "var(--color-2)",
              opacity: 0.8,
              paddingInline: "0.5rem",
            }}
          >
            <a href="mailto:contact@betterinsights.in">contact@betterinsights.in</a>
            <a href="tel:+919509996730">+91 950 999 6730</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MergedHeader;