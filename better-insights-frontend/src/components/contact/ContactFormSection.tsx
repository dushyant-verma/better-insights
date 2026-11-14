"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlobButton } from "@/components/ui/BlobButton";
import { openMarketingPlanModal } from "@/components/forms/LeadModal";
import {
  ChevronDown,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const SERVICES_LIST = [
  "Website Development",
  "CRM & Integrations",
  "AI & Automation",
  "Digital Growth",
  "Digital Transformation",
  "Technology & Engineering",
  "Other",
];

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    newsletter: false,
    honeypot: "",
    bi_hp_contact: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return undefined;
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return undefined;
      case "phone":
        if (value.trim() && !/^[+0-9\s\-()]{7,25}$/.test(value.trim())) {
          return "Please enter a valid phone number.";
        }
        return undefined;
      case "message":
        if (!value.trim()) return "Please tell us about your project.";
        if (value.trim().length < 10) return "Message must be at least 10 characters.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData] as string);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (apiError) setApiError("");

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all required as touched
    const newTouched = { name: true, email: true, phone: true, message: true };
    setTouched(newTouched);

    const nameErr = validateField("name", formData.name);
    const emailErr = validateField("email", formData.email);
    const phoneErr = validateField("phone", formData.phone);
    const messageErr = validateField("message", formData.message);

    const newErrors: FormErrors = {
      ...(nameErr ? { name: nameErr } : {}),
      ...(emailErr ? { email: emailErr } : {}),
      ...(phoneErr ? { phone: phoneErr } : {}),
      ...(messageErr ? { message: messageErr } : {}),
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setApiError("");

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        services: formData.service || "General Enquiry",
        message: formData.message.trim(),
        newsletter: formData.newsletter,
        tab: "contact-page",
        honeypot: formData.honeypot,
        bi_hp_contact: formData.bi_hp_contact,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setApiError(
          data.message || "Failed to submit enquiry. Please try again or email us directly."
        );
      }
    } catch (err) {
      setApiError(
        "Network error. Please check your connection or email contact@betterinsights.in."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact-form-section"
      className="relative bg-[#0D0D0F] text-white overflow-hidden pb-24 sm:pb-32 lg:pb-40"
      aria-label="Contact Information and Direct Enquiry Form"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Subtle Horizontal Divider below Hero */}
        <div className="w-full  border-white/10 mb-14 sm:mb-20 lg:mb-24" aria-hidden="true" />

        {/* Two-Column Grid: Left Column Copy, Right Column Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: CONTACT INFORMATION & CTA                                    */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:space-y-10">
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-md">
                For general enquiries, please fill out the form to get in touch. Alternatively, if you know your project details — head over to our project planner for a more refined step-by-step process.
              </p>
              <p className="text-sm sm:text-base text-white/55 leading-relaxed max-w-md">
                Whether you&apos;re planning a new website, looking to scale your digital presence, exploring AI automation, or need a technology partner, we&apos;d love to hear from you.
              </p>
            </div>

            {/* Shared BI CTA Button: Start a project */}
            <div>
              <BlobButton
                onClick={() => openMarketingPlanModal()}
                icon="arrow-up-right"
                size="md"
                ariaLabel="Go to Project Planner"
              >
                Go to Project Planner
              </BlobButton>
            </div>

            {/* Prefer Email Direct Contact */}
            <div className="pt-2 text-sm sm:text-base text-white/60">
              <span>Hate contact forms? </span>
              <a
                href="mailto:contact@betterinsights.in"
                className="text-white hover:text-[#CBFC6B] underline underline-offset-4 transition-colors font-medium"
              >
                contact@betterinsights.in
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: CONTACT FORM (EXACT MADEBYSHAPE REPRODUCTION)               */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-5"
              noValidate
            >
              {/* Anti-spam honeypot inputs */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <input
                type="text"
                name="bi_hp_contact"
                value={formData.bi_hp_contact}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Row 1: Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    placeholder="Name"
                    required
                    className={`w-full px-5 py-4 rounded-xl bg-[#1B1C1F] border ${errors.name
                        ? "border-red-500/80 ring-1 ring-red-500/50"
                        : "border-white/10 hover:border-white/20 focus:border-[#CBFC6B]"
                      } text-white placeholder-white/40 text-sm sm:text-base outline-none transition-colors duration-200`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="Email Address"
                    required
                    className={`w-full px-5 py-4 rounded-xl bg-[#1B1C1F] border ${errors.email
                        ? "border-red-500/80 ring-1 ring-red-500/50"
                        : "border-white/10 hover:border-white/20 focus:border-[#CBFC6B]"
                      } text-white placeholder-white/40 text-sm sm:text-base outline-none transition-colors duration-200`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone (Optional) & What service are you interested in? Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur("phone")}
                    placeholder="Phone (Optional)"
                    className={`w-full px-5 py-4 rounded-xl bg-[#1B1C1F] border ${errors.phone
                        ? "border-red-500/80 ring-1 ring-red-500/50"
                        : "border-white/10 hover:border-white/20 focus:border-[#CBFC6B]"
                      } text-white placeholder-white/40 text-sm sm:text-base outline-none transition-colors duration-200`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.phone}</p>
                  )}
                </div>

                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 rounded-xl bg-[#1B1C1F] border border-white/10 hover:border-white/20 focus:border-[#CBFC6B] ${formData.service ? "text-white" : "text-white/40"
                      } text-sm sm:text-base outline-none appearance-none transition-colors duration-200 cursor-pointer pr-10`}
                  >
                    <option value="" disabled className="bg-[#1B1C1F] text-white/50">
                      What service are you interested in?
                    </option>
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv} value={srv} className="bg-[#1B1C1F] text-white">
                        {srv}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-white/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Row 3: Tell us about your project */}
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  placeholder="Tell us about your project"
                  required
                  className={`w-full px-5 py-4 rounded-xl bg-[#1B1C1F] border ${errors.message
                      ? "border-red-500/80 ring-1 ring-red-500/50"
                      : "border-white/10 hover:border-white/20 focus:border-[#CBFC6B]"
                    } text-white placeholder-white/40 text-sm sm:text-base outline-none transition-colors duration-200 resize-y min-h-[160px]`}
                />
                {touched.message && errors.message && (
                  <p className="text-red-400 text-xs mt-1.5 pl-1">{errors.message}</p>
                )}
              </div>

              {/* Newsletter Subscription Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, newsletter: e.target.checked }))
                    }
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#1B1C1F] text-[#CBFC6B] focus:ring-[#CBFC6B] focus:ring-offset-0 cursor-pointer accent-[#CBFC6B]"
                  />
                  <span className="text-xs sm:text-sm text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
                    Subscribe to our newsletter for all the latest insights, strategy &amp; tech trends!
                  </span>
                </label>
              </div>

              {/* Privacy Consent Notice */}
              <div className="text-xs text-white/45">
                By submitting this form I accept the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-white/70 hover:text-[#CBFC6B] underline underline-offset-2 transition-colors"
                >
                  Privacy Policy
                </Link>{" "}
                of this site.
              </div>

              {/* API Feedback Alerts */}
              {apiError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{apiError}</span>
                </div>
              )}

              {submitted && (
                <div className="p-4 rounded-xl bg-[#CBFC6B]/10 border border-[#CBFC6B]/30 text-[#CBFC6B] text-sm flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you! Your message has been sent. Our team will get back to you shortly.</span>
                </div>
              )}

              {/* Submit Button: Send Message (Matches Header CTA Style) */}
              <div className="pt-2">
                <BlobButton
                  type="submit"
                  disabled={submitting}
                  loading={submitting}
                  size="md"
                  icon="arrow-up-right"
                  ariaLabel={submitting ? "Sending message..." : "Send Message"}
                >
                  {submitting ? "Sending message..." : "Send Message"}
                </BlobButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
