"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Loader2, ArrowRight, Phone, MessageSquare, ExternalLink } from "lucide-react";

interface LeadModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function openMarketingPlanModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("bi:open-lead-modal"));
  }
}

export function LeadModal({ isOpen: propIsOpen, onClose: propOnClose }: LeadModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

  const handleClose = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bi:cursor-reset"));
    }
    if (propOnClose) {
      propOnClose();
    } else {
      setInternalOpen(false);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
    honeypot: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const triggerElementRef = useRef<HTMLElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  // Global event listener for opening from anywhere
  useEffect(() => {
    const handleGlobalOpen = () => {
      triggerElementRef.current = document.activeElement as HTMLElement | null;
      if (propIsOpen === undefined) {
        setInternalOpen(true);
      }
    };

    window.addEventListener("bi:open-lead-modal", handleGlobalOpen);
    return () => window.removeEventListener("bi:open-lead-modal", handleGlobalOpen);
  }, [propIsOpen]);

  // Lock body scroll and handle focus management
  useEffect(() => {
    if (isOpen) {
      if (!triggerElementRef.current) {
        triggerElementRef.current = document.activeElement as HTMLElement | null;
      }
      document.body.style.overflow = "hidden";
      // Auto-focus first input on next frame
      requestAnimationFrame(() => {
        firstInputRef.current?.focus();
      });
    } else {
      document.body.style.overflow = "";
      setFormData({ name: "", email: "", phone: "", website: "", message: "", honeypot: "" });
      setSubmitted(false);
      setErrorMsg("");
      // Return focus to trigger
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === "function") {
        triggerElementRef.current.focus();
        triggerElementRef.current = null;
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    // Basic validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      setSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg("Please provide a valid work email address.");
      setSubmitting(false);
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 6) {
      setErrorMsg("Please enter a valid phone number.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.message || "Failed to submit marketing plan request.");
      }
    } catch {
      setErrorMsg("A network error occurred. Please try again or reach out directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bi-lead-modal-title"
    >
      {/* Clickable Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#FAF5F0] rounded-[1.75rem] shadow-2xl border border-black/15 overflow-hidden z-10 p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          data-magnetic
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-black/50 hover:text-black rounded-full hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#33CC7A]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#33CC7A]/15 text-[#33CC7A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold text-[#1B1411] tracking-tight">
              Strategic Request Received
            </h3>
            <p className="text-sm text-[#1B1411]/75 max-w-sm mx-auto leading-relaxed">
              Thank you for sharing your details. Our digital growth experts are reviewing your brand and will deliver a comprehensive, actionable strategic roadmap within 24 hours.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 px-8 py-3 bg-[#1B1411] text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#66574F]">
                Growth Strategy &amp; Audit
              </span>
            </div>
            <h2 id="bi-lead-modal-title" className="text-2xl sm:text-3xl font-semibold text-[#1B1411] tracking-tight">
              Get Your Marketing Plan
            </h2>
            <p className="text-xs sm:text-sm text-[#1B1411]/70 mt-1.5 leading-relaxed">
              Share your details below. Our digital growth experts will review your brand and prepare an actionable strategic marketing roadmap.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1">
                  Full Name <span className="text-[#33CC7A]">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-[#1B1411] placeholder-black/35 focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1">
                  Business Email <span className="text-[#33CC7A]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-[#1B1411] placeholder-black/35 focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1">
                    Phone Number <span className="text-[#33CC7A]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 950 999 6730"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-[#1B1411] placeholder-black/35 focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://company.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-[#1B1411] placeholder-black/35 focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1">
                  Primary Goals or Bottlenecks
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your target growth, website re-platforming, or automation needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-[#1B1411] placeholder-black/35 focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-600 font-medium py-1 px-2 rounded bg-red-50 border border-red-200">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                data-magnetic
                disabled={submitting}
                className="w-full mt-3 py-3.5 bg-[#1B1411] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#33CC7A]" />
                    <span>Preparing Roadmap...</span>
                  </>
                ) : (
                  <>
                    <span>Request Marketing Plan</span>
                    <ArrowRight className="w-4 h-4 text-[#33CC7A]" />
                  </>
                )}
              </button>
            </form>

            {/* Direct Contact Options (WordPress Child Theme Verified) */}
            <div className="mt-6 pt-5 border-t border-black/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#66574F] block mb-3 text-center">
                Need Immediate Assistance?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="tel:+919509996730"
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-black/10 hover:border-black/25 text-[#1B1411] text-xs font-semibold transition-all hover:bg-black/[0.02]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#33CC7A]" />
                  <span>Request a Call</span>
                </a>

                <a
                  href="https://api.whatsapp.com/send?phone=919509996730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366] text-[#1B1411] text-xs font-semibold transition-all hover:bg-[#25D366]/15"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Verified Social Media Footnote */}
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-[#66574F]">
                <a
                  href="https://www.linkedin.com/company/better-insights-bi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1B1411] transition-colors"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href="https://www.instagram.com/better.insights/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1B1411] transition-colors"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://www.behance.net/betterinsights"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1B1411] transition-colors"
                >
                  Behance
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
