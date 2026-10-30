"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
  onOpenLeadModal?: () => void;
}

export function Footer({ onOpenLeadModal }: FooterProps) {
  const handleBackToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="footer on-dark"
      id="footer"
      data-8b-section="footer"
      aria-labelledby="footer-title"
    >
      <div className="footer__sheet m-band-4" aria-hidden="true"></div>
      <div className="footer__inner l-wrap">
        <div className="footer__top">
          <div className="footer__pitch">
            <h2 className="m-text-5" id="footer-title">
              Better Marketing, Better ROI.
            </h2>
            <p className="m-text-4">
              We help brands do better, look better. Where do you want your
              brand to go? We&apos;re ready to help you get there.
            </p>
            <a
              data-magnetic
              className="m-link m-text-6"
              href="#top"
              onClick={handleBackToTop}
            >
              Back to the top
            </a>
          </div>
          <div className="footer__cols m-text-6">
            <div className="footer__col">
              <h2 className="m-text-6">Services</h2>
              <ul>
                <li>
                  <Link
                    className="m-link-2"
                    href="/services/website-development"
                  >
                    Website Development
                  </Link>
                </li>
                <li>
                  <Link
                    className="m-link-2"
                    href="/services/crm-integrations"
                  >
                    CRM &amp; Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    className="m-link-2"
                    href="/services/ai-automation"
                  >
                    AI &amp; Automation
                  </Link>
                </li>
                <li>
                  <Link
                    className="m-link-2"
                    href="/services/digital-growth"
                  >
                    Digital Growth
                  </Link>
                </li>
                <li>
                  <Link
                    className="m-link-2"
                    href="/services/digital-transformation"
                  >
                    Digital Transformation
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__col">
              <h2 className="m-text-6">Resources</h2>
              <ul>
                <li>
                  <Link className="m-link-2" href="/insights">
                    Insights &amp; Articles
                  </Link>
                </li>
                <li>
                  <Link className="m-link-2" href="/work">
                    Client Success Stories
                  </Link>
                </li>
                <li>
                  <Link className="m-link-2" href="/our-clientele">
                    Our Clientele
                  </Link>
                </li>
                <li>
                  <Link className="m-link-2" href="/cpr-tool">
                    CPR Calculator Tool
                  </Link>
                </li>
                <li>
                  <Link className="m-link-2" href="/careers">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer__col">
              <h2 className="m-text-6">Contact</h2>
              <ul>
                <li>
                  <a
                    className="m-link-2"
                    href="mailto:contact@betterinsights.in"
                  >
                    contact@betterinsights.in
                  </a>
                </li>
                <li>
                  <a className="m-link-2" href="tel:+919509996730">
                    +91 950 999 6730
                  </a>
                </li>
                <li>
                  <Link className="m-link-2" href="/contact">
                    Pune, India
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__brand" aria-hidden="true">
          <p
            className="footer__word m-text-2"
            style={{ "--len": 16 } as React.CSSProperties}
          >
            Better Insights<span className="footer__dot text-[#33CC7A]">.</span>
          </p>
        </div>
        <div className="footer__legal m-text-7">
          <p>© 2026 Better Insights. All rights reserved.</p>
          <ul>
            <li>
              <Link className="m-link" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="m-link" href="/terms-and-conditions">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link className="m-link" href="/write-for-us">
                Write for Us
              </Link>
            </li>
            <li>
              <Link className="m-link" href="/sitemap">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <p className="footer__note m-text-7">
          Better Insights is a premier digital marketing and consulting agency
          based in Pune, India. We deliver measurable business growth and high
          ROI through search engine optimization, paid advertising, web design,
          and digital consulting.
        </p>
      </div>
    </footer>
  );
}
