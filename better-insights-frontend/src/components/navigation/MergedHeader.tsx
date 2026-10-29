"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";

interface ServiceMenuItem {
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

export function MergedHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dropdown states for desktop
  const [homeOpen, setHomeOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Accordion states for mobile drawer
  const [mobileHomeExpanded, setMobileHomeExpanded] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);

  // Hover timeout refs to prevent dropdown flicker
  const homeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const servicesTimerRef = useRef<NodeJS.Timeout | null>(null);

  const homeItemRef = useRef<HTMLLIElement | null>(null);
  const servicesItemRef = useRef<HTMLLIElement | null>(null);

  const isHomeActive =
    pathname === "/" || pathname === "/home-2" || pathname === "/home-redesign-1";
  const isServicesActive = pathname?.startsWith("/services");

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setHomeOpen(false);
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
        setHomeOpen(false);
        setServicesOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Click outside to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (homeItemRef.current && !homeItemRef.current.contains(target)) {
        setHomeOpen(false);
      }
      if (servicesItemRef.current && !servicesItemRef.current.contains(target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hover handlers for Home
  const handleHomeMouseEnter = () => {
    if (homeTimerRef.current) clearTimeout(homeTimerRef.current);
    setServicesOpen(false);
    setHomeOpen(true);
  };
  const handleHomeMouseLeave = () => {
    homeTimerRef.current = setTimeout(() => {
      setHomeOpen(false);
    }, 150);
  };

  // Hover handlers for Services
  const handleServicesMouseEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setHomeOpen(false);
    setServicesOpen(true);
  };
  const handleServicesMouseLeave = () => {
    servicesTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150);
  };

  return (
    <header className="nav" id="nav" data-8b-section="navigation">
      <nav className="nav__bar" aria-label="Main Navigation">
        {/* Brand Logo */}
        <Link href="/" className="nav__brand" aria-label="Better Insights Homepage">
          <img
            src="/logos/better-insights-logo-6.png"
            alt="Better Insights"
            className="nav__logo-img"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav__links m-text-6" role="menubar">
          {/* 1. Home Dropdown */}
          <li
            ref={homeItemRef}
            className="nav__item relative"
            role="none"
            onMouseEnter={handleHomeMouseEnter}
            onMouseLeave={handleHomeMouseLeave}
          >
            <div className="flex items-center gap-1">
              <Link
                href="/"
                className={`m-link-2 flex items-center py-1 font-inherit ${
                  isHomeActive ? "is-active font-semibold text-[#1B1411]" : ""
                }`}
                aria-label="Home"
              >
                <span>Home</span>
              </Link>
              <button
                type="button"
                className="p-1 cursor-pointer bg-transparent border-0 text-[#1B1411]/60 hover:text-[#6C3CFF] transition-colors flex items-center justify-center"
                onClick={() => {
                  setHomeOpen((prev) => !prev);
                  setServicesOpen(false);
                }}
                aria-haspopup="true"
                aria-expanded={homeOpen}
                aria-label="Toggle Home dropdown"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    homeOpen ? "rotate-180 text-[#6C3CFF]" : "text-[#1B1411]/60"
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Desktop Home Dropdown Menu */}
            {homeOpen && (
              <div
                role="menu"
                aria-label="Home pages"
                className="absolute top-full left-0 mt-2 w-52 p-1.5 bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl shadow-[0_16px_36px_-6px_rgba(0,0,0,0.14)] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <Link
                  href="/"
                  role="menuitem"
                  onClick={() => setHomeOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 ${
                    pathname === "/"
                      ? "bg-[#6C3CFF]/10 text-[#6C3CFF]"
                      : "hover:bg-black/5 text-[#1B1411] hover:text-[#6C3CFF]"
                  }`}
                >
                  <span className="font-semibold text-xs sm:text-sm">Home 1</span>
                  {pathname === "/" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C3CFF] text-white font-medium">
                      Active
                    </span>
                  )}
                </Link>

                <Link
                  href="/home-2"
                  role="menuitem"
                  onClick={() => setHomeOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl mt-1 transition-all duration-150 ${
                    pathname === "/home-2"
                      ? "bg-[#6C3CFF]/10 text-[#6C3CFF]"
                      : "hover:bg-black/5 text-[#1B1411] hover:text-[#6C3CFF]"
                  }`}
                >
                  <span className="font-semibold text-xs sm:text-sm">Home 2</span>
                  {pathname === "/home-2" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C3CFF] text-white font-medium">
                      Active
                    </span>
                  )}
                </Link>
              </div>
            )}
          </li>

          {/* 2. Services Dropdown */}
          <li
            ref={servicesItemRef}
            className="nav__item relative"
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
                setServicesOpen((prev) => !prev);
                setHomeOpen(false);
              }}
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              aria-label="Services dropdown"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180 text-[#6C3CFF]" : "text-[#1B1411]/60"
                }`}
                aria-hidden="true"
              />
            </button>

            {/* Desktop Services Dropdown Menu */}
            {servicesOpen && (
              <div
                role="menu"
                aria-label="All Services"
                className="absolute top-full left-0 mt-2 w-72 p-2 bg-white/95 backdrop-blur-xl border border-black/10 rounded-2xl shadow-[0_16px_36px_-6px_rgba(0,0,0,0.14)] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {/* All Services Overview link */}
                <Link
                  href="/services"
                  role="menuitem"
                  onClick={() => setServicesOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150 ${
                    pathname === "/services"
                      ? "bg-[#6C3CFF]/10 text-[#6C3CFF]"
                      : "bg-[#FAF5F0] hover:bg-[#6C3CFF] hover:text-white text-[#1B1411]"
                  }`}
                >
                  <span>All Services Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="h-px bg-black/8 my-1.5" />

                {/* Individual Services */}
                <div className="space-y-0.5">
                  {SERVICES_LIST.map((srv) => {
                    const isActive = pathname === srv.slug;
                    return (
                      <Link
                        key={srv.slug}
                        href={srv.slug}
                        role="menuitem"
                        onClick={() => setServicesOpen(false)}
                        className={`flex flex-col px-3 py-2 rounded-xl transition-all duration-150 ${
                          isActive
                            ? "bg-[#6C3CFF]/10 text-[#6C3CFF]"
                            : "hover:bg-black/5 text-[#1B1411] hover:text-[#6C3CFF]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-xs sm:text-sm leading-tight">
                            {srv.title}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#6C3CFF]" />
                          )}
                        </div>
                        <span className="text-[11px] text-[#1B1411]/55 leading-tight mt-0.5">
                          {srv.shortDesc}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </li>

          {/* 3. Our Work */}
          <li className="nav__item" role="none">
            <Link
              href="/work"
              className={`m-link-2 ${pathname?.startsWith("/work") ? "is-active" : ""}`}
            >
              Our Work
            </Link>
          </li>

          {/* 4. Insights */}
          <li className="nav__item" role="none">
            <Link
              href="/insights"
              className={`m-link-2 ${pathname?.startsWith("/insights") ? "is-active" : ""}`}
            >
              Insights
            </Link>
          </li>

          {/* 5. About */}
          <li className="nav__item" role="none">
            <Link
              href="/about"
              className={`m-link-2 ${pathname === "/about" ? "is-active" : ""}`}
            >
              About
            </Link>
          </li>

          {/* 6. Contact Us */}
          <li className="nav__item" role="none">
            <Link
              href="/contact"
              className={`m-link-2 ${pathname === "/contact" ? "is-active" : ""}`}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Action Button */}
        <button
          type="button"
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
          {/* Mobile Home Accordion */}
          <li>
            <button
              type="button"
              className="w-full flex items-center justify-between text-left m-link-2 py-1 bg-transparent border-0 font-inherit"
              onClick={() => setMobileHomeExpanded((prev) => !prev)}
              aria-expanded={mobileHomeExpanded}
            >
              <span>Home</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileHomeExpanded ? "rotate-180 text-[#6C3CFF]" : ""
                }`}
              />
            </button>
            {mobileHomeExpanded && (
              <ul className="pl-4 mt-2 space-y-2 border-l border-white/20 text-sm">
                <li>
                  <Link
                    href="/"
                    className={`flex items-center justify-between py-1 pr-2 ${
                      pathname === "/" ? "text-[#6C3CFF] font-semibold" : "text-white/80"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Home 1</span>
                    {pathname === "/" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C3CFF] text-white font-medium">
                        Active
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/home-2"
                    className={`flex items-center justify-between py-1 pr-2 ${
                      pathname === "/home-2"
                        ? "text-[#6C3CFF] font-semibold"
                        : "text-white/80"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Home 2</span>
                    {pathname === "/home-2" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#6C3CFF] text-white font-medium">
                        Active
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Mobile Services Accordion */}
          <li>
            <button
              type="button"
              className="w-full flex items-center justify-between text-left m-link-2 py-1 bg-transparent border-0 font-inherit"
              onClick={() => setMobileServicesExpanded((prev) => !prev)}
              aria-expanded={mobileServicesExpanded}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileServicesExpanded ? "rotate-180 text-[#6C3CFF]" : ""
                }`}
              />
            </button>
            {mobileServicesExpanded && (
              <ul className="pl-4 mt-2 space-y-2 border-l border-white/20 text-sm">
                <li>
                  <Link
                    href="/services"
                    className="block py-1 font-semibold text-[#33CC7A]"
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
                        pathname === srv.slug ? "text-[#6C3CFF] font-semibold" : "text-white/80"
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

          {/* Our Work */}
          <li>
            <Link
              href="/work"
              className="m-link-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Work
            </Link>
          </li>

          {/* Insights */}
          <li>
            <Link
              href="/insights"
              className="m-link-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Insights
            </Link>
          </li>

          {/* About */}
          <li>
            <Link
              href="/about"
              className="m-link-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </li>

          {/* Contact Us */}
          <li>
            <Link
              href="/contact"
              className="m-link-2"
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
