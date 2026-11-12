"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "Website Development",
  "AI & Automation",
  "CRM Development & Integration",
  "Digital Marketing",
  "Branding & Strategy",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under $10,000 / ₹8,00,000",
  "$10,000 - $25,000 / ₹8L - ₹20L",
  "$25,000 - $50,000 / ₹20L - ₹40L",
  "$50,000+ / ₹40L+",
  "Flexible / To be determined",
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Website Development",
    budget: "",
    message: "",
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
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return undefined;
      case "email":
        if (!value.trim()) return "Work email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid business email address.";
        }
        return undefined;
      case "phone":
        if (value.trim() && !/^[+0-9\s\-()]{7,25}$/.test(value.trim())) {
          return "Please enter a valid phone number.";
        }
        return undefined;
      case "message":
        if (!value.trim()) return "Please describe your project or enquiry.";
        if (value.trim().length < 10) return "Message must be at least 10 characters.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
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

    // Mark all as touched
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
        company: formData.company.trim(),
        services: formData.service,
        budget: formData.budget || "Not specified",
        message: formData.message.trim(),
        tab: "project",
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
          data.message || "Failed to submit enquiry. Please try again or reach out directly."
        );
      }
    } catch (err) {
      setApiError(
        "Network error. Please check your connection or contact us directly at contact@betterinsights.in."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "Website Development",
      budget: "",
      message: "",
      honeypot: "",
      bi_hp_contact: "",
    });
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setApiError("");
  };

  return (
    <section
      id="contact-form-section"
      className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 bg-[#FAF5F0] text-[#1B1411] overflow-hidden"
      aria-label="Direct Project Enquiry"
    >
      {/* Subtle ambient lighting accent */}
      <div
        className="absolute top-12 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(51,204,122,0.05)_0%,rgba(168,85,247,0.03)_45%,transparent_70%)] blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(51,204,122,0.04)_0%,transparent_65%)] blur-[100px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: HERO INFORMATION & DIRECT CONTACT CHANNELS                   */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EEE5DC] border border-black/5 text-[#1B1411] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#33CC7A] animate-pulse" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B1411]">
                  Let&apos;s Build Something Better
                </span>
              </div>

              {/* Section Heading */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light lg:font-normal tracking-[-0.035em] text-[#1B1411] leading-[1.04] mb-6 [font-family:'Host_Grotesk',sans-serif]">
                Have a project <br />
                <span className="text-[#66574F]">in mind?</span>
              </h2>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-[#66574F] font-normal leading-relaxed mb-6">
                We partner with ambitious enterprises and startups to accelerate growth through custom website development, production-grade AI automations, CRM synchronization, and technical strategy.
              </p>

              {/* Verified Response-Time Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-black/8 text-[#66574F] text-xs font-mono font-medium shadow-sm mb-10">
                <Clock className="w-3.5 h-3.5 text-[#33CC7A]" />
                <span>Fast turnaround: We review all enquiries within 24 hours.</span>
              </div>
            </div>

            {/* Direct Contact Channels Card */}
            <div className="space-y-4 pt-4 border-t border-black/8">
              {/* Phone Line */}
              <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-sm flex items-start gap-4 transition-all hover:border-black/20">
                <div className="w-10 h-10 rounded-xl bg-[#33CC7A]/15 text-[#33CC7A] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#66574F] block">
                    Call / WhatsApp Line
                  </span>
                  <a
                    href="tel:+919509996730"
                    className="text-sm font-semibold text-[#1B1411] hover:text-[#33CC7A] transition-colors"
                  >
                    +91 950 999 6730
                  </a>
                  <p className="text-xs text-[#66574F]/70 font-mono mt-0.5">
                    Mon – Fri, 9:30 AM – 6:30 PM IST
                  </p>
                </div>
              </div>

              {/* Email Line */}
              <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-sm flex items-start gap-4 transition-all hover:border-black/20">
                <div className="w-10 h-10 rounded-xl bg-[#33CC7A]/15 text-[#33CC7A] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#66574F] block">
                    Direct Email Inquiries
                  </span>
                  <a
                    href="mailto:contact@betterinsights.in"
                    className="text-sm font-semibold text-[#1B1411] hover:text-[#33CC7A] transition-colors"
                  >
                    contact@betterinsights.in
                  </a>
                  <p className="text-xs text-[#66574F]/70 font-mono mt-0.5">
                    Direct routing to practice leads
                  </p>
                </div>
              </div>

              {/* Corporate Office */}
              <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-sm flex items-start gap-4 transition-all hover:border-black/20">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5F0] text-[#1B1411] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-[#33CC7A]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#66574F] block">
                    Corporate Office
                  </span>
                  <p className="text-sm font-semibold text-[#1B1411]">
                    Pune, Maharashtra, India
                  </p>
                  <p className="text-xs text-[#66574F]/70 font-mono mt-0.5">
                    Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: DIRECT PROJECT ENQUIRY FORM                                */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] sm:rounded-[2.25rem] p-6 sm:p-10 lg:p-12 border border-black/8 shadow-xl shadow-black/[0.03] relative">
              {submitted ? (
                /* ========================================================================= */
                /* SUCCESS CONFIRMATION STATE                                               */
                /* ========================================================================= */
                <div className="py-8 sm:py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[#33CC7A]/15 text-[#33CC7A] flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#33CC7A]/15 text-[#1B1411] border border-[#33CC7A]/30 mb-3">
                    Enquiry Confirmed
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1B1411] mb-3">
                    Thank you, {formData.name}!
                  </h3>

                  <p className="text-sm sm:text-base text-[#66574F] max-w-md mx-auto leading-relaxed mb-8">
                    We have received your project details. One of our technical practice leads will review your inquiry and respond within 24 business hours.
                  </p>

                  <div className="w-full max-w-md bg-[#FAF5F0] rounded-2xl p-5 border border-black/8 text-left mb-8 space-y-2.5 text-xs">
                    <div className="flex justify-between text-[#66574F]">
                      <span className="font-mono uppercase">Service:</span>
                      <span className="font-semibold text-[#1B1411]">{formData.service}</span>
                    </div>
                    <div className="flex justify-between text-[#66574F]">
                      <span className="font-mono uppercase">Work Email:</span>
                      <span className="font-semibold text-[#1B1411]">{formData.email}</span>
                    </div>
                    {formData.phone && (
                      <div className="flex justify-between text-[#66574F]">
                        <span className="font-mono uppercase">Phone:</span>
                        <span className="font-semibold text-[#1B1411]">{formData.phone}</span>
                      </div>
                    )}
                    {formData.budget && (
                      <div className="flex justify-between text-[#66574F]">
                        <span className="font-mono uppercase">Budget:</span>
                        <span className="font-semibold text-[#1B1411]">{formData.budget}</span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FAF5F0] text-[#1B1411] hover:bg-[#EEE5DC] text-xs font-bold uppercase tracking-wider border border-black/10 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>Submit Another Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* ========================================================================= */
                /* ACTIVE DIRECT ENQUIRY FORM                                               */
                /* ========================================================================= */
                <div>
                  <div className="mb-8">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#33CC7A] block mb-1">
                      Direct Project Enquiry
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1B1411]">
                      Tell us about your project
                    </h2>
                    <p className="text-xs sm:text-sm text-[#66574F] mt-1.5 leading-relaxed">
                      Complete the form below and our team will get in touch with actionable recommendations.
                    </p>
                  </div>

                  {apiError && (
                    <div
                      className="p-4 mb-6 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Honeypot Anti-Spam Fields */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        name="bi_hp_contact"
                        value={formData.bi_hp_contact}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Row 1: Full Name & Work Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Full Name */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold text-[#1B1411] uppercase tracking-wider mb-2"
                        >
                          Full Name <span className="text-[#33CC7A]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={() => handleBlur("name")}
                          placeholder="e.g. Sarah Jenkins"
                          className={`w-full px-4 py-3.5 rounded-xl bg-[#FAF5F0] border text-sm text-[#1B1411] placeholder:text-[#66574F]/50 transition-all focus:outline-none focus:ring-2 ${
                            touched.name && errors.name
                              ? "border-red-300 focus:ring-red-400"
                              : "border-black/10 focus:border-[#33CC7A] focus:ring-[#33CC7A]/20"
                          }`}
                        />
                        {touched.name && errors.name && (
                          <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Work Email */}
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-[#1B1411] uppercase tracking-wider mb-2"
                        >
                          Work Email <span className="text-[#33CC7A]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={() => handleBlur("email")}
                          placeholder="sarah@company.com"
                          className={`w-full px-4 py-3.5 rounded-xl bg-[#FAF5F0] border text-sm text-[#1B1411] placeholder:text-[#66574F]/50 transition-all focus:outline-none focus:ring-2 ${
                            touched.email && errors.email
                              ? "border-red-300 focus:ring-red-400"
                              : "border-black/10 focus:border-[#33CC7A] focus:ring-[#33CC7A]/20"
                          }`}
                        />
                        {touched.email && errors.email && (
                          <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Phone Number & Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Phone Number */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-xs font-semibold text-[#1B1411] uppercase tracking-wider mb-2"
                        >
                          Phone Number
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={() => handleBlur("phone")}
                          placeholder="+91 98765 43210"
                          className={`w-full px-4 py-3.5 rounded-xl bg-[#FAF5F0] border text-sm text-[#1B1411] placeholder:text-[#66574F]/50 transition-all focus:outline-none focus:ring-2 ${
                            touched.phone && errors.phone
                              ? "border-red-300 focus:ring-red-400"
                              : "border-black/10 focus:border-[#33CC7A] focus:ring-[#33CC7A]/20"
                          }`}
                        />
                        {touched.phone && errors.phone && (
                          <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label
                          htmlFor="contact-company"
                          className="block text-xs font-semibold text-[#1B1411] uppercase tracking-wider mb-2"
                        >
                          Company Name <span className="text-[#66574F]/60 text-[10px] lowercase">(optional)</span>
                        </label>
                        <input
                          id="contact-company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. Acme Corporation"
                          className="w-full px-4 py-3.5 rounded-xl bg-[#FAF5F0] border border-black/10 text-sm text-[#1B1411] placeholder:text-[#66574F]/50 transition-all focus:outline-none focus:border-[#33CC7A] focus:ring-2 focus:ring-[#33CC7A]/20"
                        />
                      </div>
                    </div>

                    {/* Row 3: Service Interested In & Estimated Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Service Dropdown */}
                      <div>
                        <label
                          htmlFor="contact-service"
                          className="block text-xs font-semibold text-[#1B1411] uppercase tracking-wider mb-2"
                        >
                          Service Interested In <span className="text-[#33CC7A]">*</span>
                        </label>
                        <select
                          id="contact-service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#FAF5F0] border border-black/10 text-sm text-[#1B1411] transition-all focus:outline-none focus:border-[#33CC7A] focus:ring-2 focus:ring-[#33CC7A]/20 cursor-pointer"
                        >
                          {SERVICE_OPTIONS.map((srv) => (
                            <option key={srv} value={srv}>
                              {srv}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Estimated Budget Dropdown */}
                      <div>
                        <label
                          htmlFor="contact-budget"
                          className="block text-xs font-semibold text-[#1B1411] uppercase tracking-wider mb-2"
                        >
                          Estimated Budget <span className="text-[#66574F]/60 text-[10px] lowercase">(optional)</span>
                        </label>
                        <select
                          id="contact-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 rounded-xl bg-[#FAF5F0] border border-black/10 text-sm text-[#1B1411] transition-all focus:outline-none focus:border-[#33CC7A] focus:ring-2 focus:ring-[#33CC7A]/20 cursor-pointer"
                        >
                          <option value="">Select a budget range...</option>
                          {BUDGET_OPTIONS.map((bgt) => (
                            <option key={bgt} value={bgt}>
                              {bgt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Project Details / Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-[#1B1411] uppercase tracking-wider mb-2"
                      >
                        Project Details / Message <span className="text-[#33CC7A]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        placeholder="Tell us about your project goals, timeline, existing tech stack, or specific challenges..."
                        className={`w-full px-4 py-3.5 rounded-xl bg-[#FAF5F0] border text-sm text-[#1B1411] placeholder:text-[#66574F]/50 transition-all focus:outline-none focus:ring-2 resize-y ${
                          touched.message && errors.message
                            ? "border-red-300 focus:ring-red-400"
                            : "border-black/10 focus:border-[#33CC7A] focus:ring-[#33CC7A]/20"
                        }`}
                      />
                      {touched.message && errors.message && (
                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Row 5: Prominent Green Submission Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#33CC7A] text-[#1B1411] text-sm font-bold uppercase tracking-wider hover:bg-[#2BB86D] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-[#33CC7A]/25 disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Let&apos;s Discuss Your Project</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust & Privacy Notice */}
                    <div className="flex items-center gap-2 pt-3 text-[11px] text-[#66574F]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#33CC7A] shrink-0" />
                      <span>Your information is strictly protected. We never share your data or send spam.</span>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
