"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Play, X, ChevronDown, Sun } from "lucide-react";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";
import "@/styles/shape-header.css";

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
    shortDesc: "Intelligent Agents & Predictive Workflows",
  },
  {
    title: "Digital Growth",
    slug: "/services/digital-growth",
    shortDesc: "Data-Driven SEO & Performance PPC",
  },
  {
    title: "Digital Transformation",
    slug: "/services/digital-transformation",
    shortDesc: "Enterprise Modernization & Systems",
  },
  {
    title: "Technology & Engineering",
    slug: "/services/technology-engineering",
    shortDesc: "Custom Scalable Platforms & High-Scale APIs",
  },
];

const ABOUT_LIST: AboutMenuItem[] = [
  {
    title: "About us",
    slug: "/about",
    shortDesc: "Engineering digital transformation & sustainable enterprise growth",
  },
  {
    title: "Meet the Team",
    slug: "/about#our-team",
    shortDesc: "The strategists, engineers & creators behind Better Insights",
  },
  {
    title: "Culture",
    slug: "/culture",
    shortDesc: "Our core values, creative atmosphere & life inside BI",
  },
  {
    title: "Testimonials",
    slug: "/clientele",
    shortDesc: "Real client outcomes, partnerships & verified impact",
  },
];

export function MergedHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dropdown states for desktop
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const isAnyMegaMenuOpen = servicesOpen || aboutOpen;

  // Showreel Video Modal state
  const [showreelOpen, setShowreelOpen] = useState(false);

  // Accordion states for mobile drawer
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  // Hover timeout refs to prevent dropdown flicker
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const isHomeActive = pathname === "/" || pathname === "/home-2" || pathname === "/home-redesign-1";
  const isServicesActive = pathname?.startsWith("/services");
  const isWorkActive = pathname?.startsWith("/work");
  const isAboutActive =
    pathname === "/about" ||
    pathname === "/culture" ||
    pathname === "/team" ||
    pathname === "/clientele" ||
    pathname === "/our-clientele";
  const isBlogActive = pathname?.startsWith("/insights") || pathname?.startsWith("/blog");
  const isContactActive = pathname === "/contact";

  // Single active item logic to ensure only one active underline at a time
  const currentActiveItem = servicesOpen
    ? "services"
    : aboutOpen
      ? "about"
      : isServicesActive
        ? "services"
        : isWorkActive
          ? "work"
          : isAboutActive
            ? "about"
            : isBlogActive
              ? "blog"
              : isContactActive
                ? "contact"
                : null;

  // Scroll detection with requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 24);
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
    setShowreelOpen(false);
    document.body.classList.remove("mega-menu-open");
  }, [pathname]);

  // Synchronize body.mega-menu-open class when desktop mega menus open
  useEffect(() => {
    if (isAnyMegaMenuOpen) {
      document.body.classList.add("mega-menu-open");
    } else {
      document.body.classList.remove("mega-menu-open");
    }
    return () => {
      document.body.classList.remove("mega-menu-open");
    };
  }, [isAnyMegaMenuOpen]);

  // Synchronize Lenis scroll locking with mobile menu and video modal open state
  useEffect(() => {
    if (mobileMenuOpen || showreelOpen) {
      (window as any).lenis?.stop();
    } else {
      (window as any).lenis?.start();
    }
  }, [mobileMenuOpen, showreelOpen]);

  // Keyboard navigation: Escape closes dropdowns and modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAboutOpen(false);
        setServicesOpen(false);
        setMobileMenuOpen(false);
        setShowreelOpen(false);
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

  // Hover handlers for Services
  const handleServicesEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setAboutOpen(false);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 220);
  };

  // Hover handlers for About
  const handleAboutEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setServicesOpen(false);
    setAboutOpen(true);
  };

  const handleAboutLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setAboutOpen(false);
    }, 220);
  };

  const closeAllMenus = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setServicesOpen(false);
    setAboutOpen(false);
    document.body.classList.remove("mega-menu-open");
  };

  return (
    <>
      {/* SVG Gooey Filter for Start a Project Button */}
      <svg width="0" height="0" className="absolute hidden pointer-events-none" colorInterpolationFilters="sRGB">
        <defs>
          <filter id="biButtonFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Invisible Click Catcher to dismiss mega menu on outside click */}
      {isAnyMegaMenuOpen && (
        <div
          className="shape-blur-backdrop"
          onClick={closeAllMenus}
          aria-hidden="true"
        />
      )}

      {/* Main Header Container */}
      <header
        ref={headerRef}
        id="nav"
        className={`shape-header ${isScrolled ? "is-scrolled" : ""}`}
        data-8b-section="navigation"
      >
        <nav
          className="shape-nav__bar relative"
          aria-label="Main Navigation"
        >
          {/* Brand Logo - Left (Original Better Insights Brand Logo with CSS White Filter) */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 transition-opacity hover:opacity-90"
            aria-label="Better Insights Homepage"
            onClick={closeAllMenus}
          >
            <img
              src="/logos/better-insights-logo-6.png"
              alt="Better Insights"
              className={`shape-logo-white w-auto object-contain transition-all duration-300 ${isScrolled ? "h-[40px] sm:h-[40px]" : "h-[40px] sm:h-[33px]"
                }`}
            />
          </Link>

          {/* Desktop Navigation Links - Centered */}
          <ul
            className="hidden lg:flex items-center justify-center gap-7 xl:gap-8 list-none m-0 p-0 text-[14.5px]"
            role="menubar"
          >
            {/* 1. Services with Mega Menu Dropdown */}
            <li
              className="relative !static"
              role="none"
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <div className="relative inline-flex items-center">
                <Link
                  href="/services"
                  className={`shape-nav__link ${currentActiveItem === "services" ? "is-active" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-label="Services menu"
                >
                  <span>Services</span>
                </Link>
                {/* 6 Core Services Count Badge */}
                <span className="shape-services-badge" aria-hidden="true">
                  6
                </span>
              </div>

              {/* Desktop Services Mega Menu Panel */}
              {servicesOpen && (
                <div
                  role="menu"
                  aria-label="All Services"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                  className="shape-mega-menu dark:bg-grayDark-500 w-[840px] max-w-[calc(100vw-2rem)]"
                >
                  {/* Pointer arrow pointing to Services */}
                  <div className="shape-menu-pointer left-[26.6%]" aria-hidden="true" />

                  <div className="grid grid-cols-12 gap-6 items-stretch">
                    {/* Left Column: 6 Services List */}
                    <div className="col-span-7 flex flex-col justify-between pr-2">
                      <div className="space-y-1">
                        {SERVICES_LIST.map((srv) => {
                          const isActive = pathname === srv.slug;
                          return (
                            <Link
                              key={srv.slug}
                              href={srv.slug}
                              role="menuitem"
                              onClick={closeAllMenus}
                              className={`shape-menu-item group/srv ${isActive ? "is-item-active" : ""}`}
                            >
                              <div className="flex flex-col pr-3">
                                <span className="text-[14px] font-medium text-white transition-colors group-hover/srv:text-[#CBFC6B]">
                                  {srv.title}
                                </span>
                                <span className="text-[12px] text-white/55 leading-snug mt-0.5">
                                  {srv.shortDesc}
                                </span>
                              </div>
                              <ArrowUpRight className="shape-item-arrow w-4 h-4 flex-shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Featured Services Card (Pure Black #000000 Background) */}
                    <div className="col-span-5">
                      <Link
                        href="/services"
                        onClick={closeAllMenus}
                        className="shape-promo-card group/promo block"
                        aria-label="View all Services"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <h4 className="text-[15px] font-semibold text-white group-hover/promo:text-[#CBFC6B] transition-colors">
                              View all Services
                            </h4>
                            <ArrowUpRight className="w-4 h-4 text-white/60 group-hover/promo:text-[#CBFC6B] transition-colors" />
                          </div>
                          <p className="text-[12px] text-white/60 leading-relaxed mb-4">
                            We don&apos;t stop there, check out all the digital engineering and AI services we offer at Better Insights.
                          </p>
                        </div>

                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mt-auto">
                          <img
                            src="/images/culture/photo-1531403009284-440f080d1e12.jpg"
                            alt="Better Insights Services & Engineering"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/promo:scale-105"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* 2. Work */}
            <li role="none">
              <Link
                href="/work"
                className={`shape-nav__link ${currentActiveItem === "work" ? "is-active" : ""}`}
                onClick={closeAllMenus}
              >
                <span>Work</span>
              </Link>
            </li>

            {/* 3. About with Mega Menu Dropdown */}
            <li
              className="relative !static"
              role="none"
              onMouseEnter={handleAboutEnter}
              onMouseLeave={handleAboutLeave}
            >
              <Link
                href="/about"
                className={`shape-nav__link ${currentActiveItem === "about" ? "is-active" : ""}`}
                aria-haspopup="true"
                aria-expanded={aboutOpen}
                aria-label="About menu"
              >
                <span>About</span>
              </Link>

              {/* Desktop About Mega Menu Panel */}
              {aboutOpen && (
                <div
                  role="menu"
                  aria-label="About Better Insights"
                  onMouseEnter={handleAboutEnter}
                  onMouseLeave={handleAboutLeave}
                  className="shape-mega-menu dark:bg-grayDark-500 w-[800px] max-w-[calc(100vw-2rem)]"
                >
                  {/* Pointer arrow pointing to About */}
                  <div className="shape-menu-pointer left-[44%]" aria-hidden="true" />

                  <div className="grid grid-cols-12 gap-6 items-stretch">
                    {/* Left Column: Navigation Links */}
                    <div className="col-span-7 flex flex-col justify-between pr-2">
                      <div className="space-y-1.5">
                        {ABOUT_LIST.map((item) => {
                          const isItemActive = pathname === item.slug;
                          return (
                            <Link
                              key={item.slug}
                              href={item.slug}
                              role="menuitem"
                              onClick={closeAllMenus}
                              className={`shape-menu-item group/abt ${isItemActive ? "is-item-active" : ""}`}
                            >
                              <div className="flex flex-col pr-3">
                                <span className="text-[14px] font-medium text-white transition-colors group-hover/abt:text-[#CBFC6B]">
                                  {item.title}
                                </span>
                                <span className="text-[12px] text-white/55 leading-snug mt-0.5">
                                  {item.shortDesc}
                                </span>
                              </div>
                              <ArrowUpRight className="shape-item-arrow w-4 h-4 flex-shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: Featured Video Showreel Card (Pure Black #000000 Background) */}
                    <div className="col-span-5">
                      <div
                        onClick={() => setShowreelOpen(true)}
                        className="shape-promo-card group/showreel cursor-pointer"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") setShowreelOpen(true);
                        }}
                        aria-label="Watch our Showreel video"
                      >
                        <div>
                          <h4 className="text-[15px] font-semibold text-white group-hover/showreel:text-[#CBFC6B] transition-colors mb-1.5">
                            Watch our Showreel
                          </h4>
                          <p className="text-[12px] text-white/60 leading-relaxed mb-4">
                            Want a snippet of our work and culture in under a minute? We&apos;ve got just the thing for ya...
                          </p>
                        </div>

                        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mt-auto">
                          <img
                            src="/images/culture/hero-marketing-team.jpg"
                            alt="Better Insights Showreel"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/showreel:scale-105"
                          />
                          {/* Lime Green Circular Play Button */}
                          <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-[#CBFC6B] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover/showreel:scale-110">
                            <Play className="w-3.5 h-3.5 fill-[#111113] text-[#111113] ml-0.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* 4. Blog (Insights) */}
            <li role="none">
              <Link
                href="/insights"
                className={`shape-nav__link ${currentActiveItem === "blog" ? "is-active" : ""}`}
                onClick={closeAllMenus}
              >
                <span>Blog</span>
              </Link>
            </li>

            {/* 5. Contact */}
            <li role="none">
              <Link
                href="/contact"
                className={`shape-nav__link ${currentActiveItem === "contact" ? "is-active" : ""}`}
                onClick={closeAllMenus}
              >
                <span>Contact</span>
              </Link>
            </li>
          </ul>

          {/* Right Header Section: Sun Toggle & Start a Project CTA Button */}
          <div className="hidden lg:flex items-center gap-3.5 xl:gap-4">
            {/* Theme Toggle Sun Icon (Matches MadeByShape Reference) */}
            <button
              type="button"
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
              aria-label="Toggle theme mode"
              title="Theme mode"
            >
              <Sun className="w-4 h-4 stroke-[1.8]" />
            </button>

            {/* Start a Project Animated Button with Liquid Notch & Detaching Circle */}
            <button
              type="button"
              onClick={() => {
                closeAllMenus();
                openMarketingPlanModal();
              }}
              className="shape-cta-btn"
              aria-label="Start a project"
            >
              {/* Filtered Container for Gooey Connection */}
              <div
                className="shape-cta-filter-wrap"
                style={{ filter: "url(#biButtonFilter)" }}
              >
                <div className="shape-cta-pill">
                  <span>Start a project</span>
                </div>
                <div className="shape-cta-blob" />
              </div>

              {/* Arrow Icon Positioned Crisp & Sharp over Circle */}
              <div className="shape-cta-arrow-wrap">
                <ArrowUpRight className="shape-cta-arrow-icon stroke-[2.5]" />
              </div>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors ml-auto cursor-pointer"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="menu"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-2" aria-hidden="true">
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
            className="m-icon-btn menu__close cursor-pointer"
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
                className={`w-full flex items-center justify-between text-left m-link-2 py-1 font-inherit ${isHomeActive ? "text-[#CBFC6B] font-semibold" : ""
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Home</span>
              </Link>
            </li>

            {/* 2. Mobile Services Accordion */}
            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between text-left m-link-2 py-1 bg-transparent border-0 font-inherit cursor-pointer"
                onClick={() => setMobileServicesExpanded((prev) => !prev)}
                aria-expanded={mobileServicesExpanded}
              >
                <span className={isServicesActive ? "text-[#CBFC6B] font-semibold" : ""}>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileServicesExpanded ? "rotate-180 text-[#CBFC6B]" : ""
                    }`}
                />
              </button>
              {mobileServicesExpanded && (
                <ul className="pl-4 mt-2 space-y-2 border-l border-white/20 text-sm">
                  <li>
                    <Link
                      href="/services"
                      className="block py-1 font-semibold text-[#CBFC6B]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Services Overview →
                    </Link>
                  </li>
                  {SERVICES_LIST.map((srv) => (
                    <li key={srv.slug}>
                      <Link
                        href={srv.slug}
                        className={`block py-1 ${pathname === srv.slug ? "text-[#CBFC6B] font-semibold" : "text-white/80"
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

            {/* 3. Mobile Work Link */}
            <li>
              <Link
                href="/work"
                className={`m-link-2 ${isWorkActive ? "text-[#CBFC6B] font-semibold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Work
              </Link>
            </li>

            {/* 4. Mobile About Accordion */}
            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between text-left m-link-2 py-1 bg-transparent border-0 font-inherit cursor-pointer"
                onClick={() => setMobileAboutExpanded((prev) => !prev)}
                aria-expanded={mobileAboutExpanded}
              >
                <span className={isAboutActive ? "text-[#CBFC6B] font-semibold" : ""}>About</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${mobileAboutExpanded ? "rotate-180 text-[#CBFC6B]" : ""
                    }`}
                />
              </button>
              {mobileAboutExpanded && (
                <ul className="pl-4 mt-2 space-y-2 border-l border-white/20 text-sm">
                  {ABOUT_LIST.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.slug}
                        className={`block py-1 ${pathname === item.slug ? "text-[#CBFC6B] font-semibold" : "text-white/80"
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

            {/* 5. Mobile Blog Link */}
            <li>
              <Link
                href="/insights"
                className={`m-link-2 ${isBlogActive ? "text-[#CBFC6B] font-semibold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </li>

            {/* 6. Mobile Contact Link */}
            <li>
              <Link
                href="/contact"
                className={`m-link-2 ${isContactActive ? "text-[#CBFC6B] font-semibold" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div style={{ marginTop: "auto", paddingTop: "2rem", display: "grid", gap: "1rem" }}>
            <button
              type="button"
              className="shape-cta-btn cursor-pointer justify-center"
              onClick={() => {
                setMobileMenuOpen(false);
                openMarketingPlanModal();
              }}
              style={{ width: "100%" }}
              aria-haspopup="dialog"
              aria-label="Start a project"
            >
              <div
                className="shape-cta-filter-wrap"
                style={{ filter: "url(#biButtonFilter)" }}
              >
                <div className="shape-cta-pill" style={{ flex: 1, justifyContent: "center" }}>
                  <span>Start a project</span>
                </div>
                <div className="shape-cta-blob" />
              </div>
              <div className="shape-cta-arrow-wrap">
                <ArrowUpRight className="shape-cta-arrow-icon stroke-[2.5]" />
              </div>
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

      {/* Video Showreel Modal */}
      {showreelOpen && (
        <div
          className="shape-video-modal-backdrop"
          onClick={() => setShowreelOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel video player"
        >
          <div
            className="shape-video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-[#161619]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CBFC6B]" />
                <h3 className="text-sm font-semibold text-white">Better Insights Showreel</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowreelOpen(false)}
                className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
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

export default MergedHeader;
