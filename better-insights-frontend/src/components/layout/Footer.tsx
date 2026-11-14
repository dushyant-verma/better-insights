"use client";

import React from "react";
import Link from "next/link";
import { Star, Phone, Mail, MapPin } from "lucide-react";
import { BlobButton } from "@/components/ui/BlobButton";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";
import "@/styles/shape-footer.css";

interface FooterProps {
  onOpenLeadModal?: () => void;
}

export function Footer({ onOpenLeadModal }: FooterProps) {
  const handleBackToTop = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    if (onOpenLeadModal) {
      onOpenLeadModal();
    } else {
      openMarketingPlanModal();
    }
  };

  return (
    <footer
      className="shape-footer-wrapper"
      id="footer"
      data-8b-section="footer"
      aria-labelledby="footer-pitch-heading"
    >
      <div className="shape-footer-container">
        {/* Main Footer Card */}
        <div className="shape-footer-card">
          {/* =================================================================
              TOP-LEFT SOCIAL CORNER CUTOUT (Exact MadeByShape Inset Notch)
              ================================================================= */}
          <div className="shape-corner-cutout-social" aria-label="Social media links">
            {/* Top-Right Fillet */}
            <div className="shape-fillet-tr" aria-hidden="true">
              <div className="shape-fillet-tr-inner" />
            </div>

            {/* Diagonal Inverted Fillet */}
            <div className="shape-fillet-diagonal" aria-hidden="true">
              <div className="shape-fillet-diagonal-inner" />
            </div>

            {/* Bottom-Left Fillet */}
            <div className="shape-fillet-bl" aria-hidden="true">
              <div className="shape-fillet-bl-inner" />
            </div>

            {/* 5 Social Media Badges (LinkedIn, X, GitHub, Instagram, Behance) */}
            <div className="shape-social-list">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/better-insights-bi/"
                target="_blank"
                rel="noopener noreferrer"
                className="shape-social-icon-btn"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 text-black fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/betterinsights"
                target="_blank"
                rel="noopener noreferrer"
                className="shape-social-icon-btn"
                aria-label="X (Twitter)"
              >
                <svg className="w-3 h-3 text-black fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/betterinsights"
                target="_blank"
                rel="noopener noreferrer"
                className="shape-social-icon-btn"
                aria-label="GitHub"
              >
                <svg className="w-3.5 h-3.5 text-black fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/better.insights/"
                target="_blank"
                rel="noopener noreferrer"
                className="shape-social-icon-btn"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 text-black fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Behance */}
              <a
                href="https://www.behance.net/betterinsights"
                target="_blank"
                rel="noopener noreferrer"
                className="shape-social-icon-btn"
                aria-label="Behance"
              >
                <svg className="w-3.5 h-3.5 text-black fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.659 0-6-2.545-6-6 0-3.715 2.536-6 6-6 3.654 0 5.679 2.571 5.438 6.398h-8.625c.088 1.838 1.439 3.002 3.187 3.002 1.354 0 2.261-.621 2.726-1.4l2 .002zm-6.726-4.5c.037-1.438 1.096-2.4 2.5-2.4 1.344 0 2.25.962 2.226 2.4h-4.726zm-11-7.5h-6v14h6.505c3.082 0 4.995-1.503 4.995-3.957 0-1.562-.832-2.73-2.188-3.262 1.055-.494 1.688-1.547 1.688-2.839 0-2.348-1.89-3.942-5-3.942zm-3.2 2.607h2.8c1.332 0 2.2.66 2.2 1.764 0 1.084-.868 1.776-2.2 1.776h-2.8v-3.54zm0 5.786h3.1c1.47 0 2.4.743 2.4 1.94 0 1.22-.93 1.967-2.4 1.967h-3.1v-3.907z" />
                </svg>
              </a>
            </div>
          </div>

          {/* =================================================================
              TOP-RIGHT 'SEND ME BACK UP' CORNER CUTOUT (Exact MadeByShape)
              ================================================================= */}
          <div className="shape-corner-cutout-topright">
            {/* Left Fillet */}
            <div className="shape-topright-fillet-left" aria-hidden="true">
              <div className="shape-topright-fillet-left-inner" />
            </div>

            {/* Bottom Fillet */}
            <div className="shape-topright-fillet-bottom" aria-hidden="true">
              <div className="shape-topright-fillet-bottom-inner" />
            </div>

            <button
              type="button"
              onClick={handleBackToTop}
              className="shape-back-to-top-link"
              aria-label="Scroll back to top"
            >
              <span>Sh*t I&apos;ve gone too far, send me back up</span>
              <span className="animate-bounce inline-block">👆</span>
            </button>
          </div>

          {/* =================================================================
              TOP 4-COLUMN CONTENT SECTION (Indented to clear Top-Left Cutout)
              ================================================================= */}
          <div className="shape-footer-top-section">
            <div className="shape-footer-grid">
              {/* Column 1: CTA pitch & Reviews */}
              <div className="shape-footer-pitch-col">
                <h2 id="footer-pitch-heading" className="shape-footer-pitch-title">
                  Do you like
                  <br />
                  what you see?
                </h2>

                <div className="shape-footer-cta-row">
                  <BlobButton
                    size="md"
                    icon="arrow-up-right"
                    onClick={handleCtaClick}
                    href="/contact"
                    ariaLabel="Start a project with Better Insights"
                  >
                    Start a project
                  </BlobButton>

                  <div className="shape-footer-reviews">
                    <span>5.0 from 69 reviews</span>
                    <div className="shape-footer-reviews-stars">
                      <span className="shape-google-icon">G</span>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#CBFC6B] text-[#CBFC6B]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Learn */}
              <nav className="shape-footer-nav-col" aria-label="Learn navigation">
                <h3 className="shape-footer-col-header">Learn</h3>
                <ul className="shape-footer-nav-list">
                  <li>
                    <Link href="/about" className="shape-footer-nav-link">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/culture" className="shape-footer-nav-link">
                      Culture
                    </Link>
                  </li>
                  <li>
                    <Link href="/our-clientele" className="shape-footer-nav-link">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="shape-footer-nav-link">
                      Processes
                    </Link>
                  </li>
                  <li>
                    <Link href="/services#faqs" className="shape-footer-nav-link">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="/insights" className="shape-footer-nav-link">
                      Blog
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Column 3: Explore */}
              <nav className="shape-footer-nav-col" aria-label="Explore navigation">
                <h3 className="shape-footer-col-header">Explore</h3>
                <ul className="shape-footer-nav-list">
                  <li>
                    <Link href="/" className="shape-footer-nav-link">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/work" className="shape-footer-nav-link">
                      Work
                      <span className="shape-new-badge">NEW</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="shape-footer-nav-link">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="shape-footer-nav-link">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/our-clientele" className="shape-footer-nav-link">
                      Clientele
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="shape-footer-nav-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Column 4: Get in touch */}
              <div className="shape-footer-contact-col">
                <h3 className="shape-footer-col-header">Get in touch</h3>
                <ul className="shape-footer-nav-list">
                  <li>
                    <div className="shape-contact-item">
                      <Phone className="shape-contact-icon" />
                      <a href="tel:+919509996730">+91 950 999 6730</a>
                    </div>
                  </li>
                  <li>
                    <div className="shape-contact-item">
                      <Mail className="shape-contact-icon" />
                      <a href="mailto:contact@betterinsights.in">
                        contact@betterinsights.in
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="shape-contact-item">
                      <MapPin className="shape-contact-icon" />
                      <div>
                        <p className="font-medium text-white">Better Insights</p>
                        <p className="text-white/70">Pune, Maharashtra</p>
                        <p className="text-white/70">India</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* =================================================================
              MASSIVE OVERSIZED HEADLINE (Full-width across card)
              ================================================================= */}
          <div className="shape-footer-massive-text" aria-hidden="true">
            Building What&apos;s Next
          </div>

          {/* =================================================================
              BOTTOM LEGAL BAR (Full-width across card)
              ================================================================= */}
          <div className="shape-footer-bottom-bar">
            <div className="shape-footer-brand-meta">
              <span className="shape-footer-wordmark">
                Better Insights<span>.</span>
              </span>
              <span>© Better Insights 2026</span>
              <span className="shape-footer-separator">|</span>
              <span>Digital Marketing &amp; Technology</span>
            </div>

            <div className="shape-footer-legal-links">
              <span>All Rights Reserved</span>
              <span className="shape-footer-separator">|</span>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span className="shape-footer-separator">|</span>
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
              <span className="shape-footer-separator">|</span>
              <Link href="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
