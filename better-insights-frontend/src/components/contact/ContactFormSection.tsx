"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  HelpCircle,
  FileCheck2,
  Newspaper,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type EnquiryCategory = "services" | "general" | "employment" | "press";

const ENQUIRY_CATEGORIES: Array<{
  id: EnquiryCategory;
  label: string;
  badge: string;
  desc: string;
  icon: React.ElementType;
}> = [
  {
    id: "services",
    label: "Services & Partnerships",
    badge: "CLIENT ENGAGEMENT",
    desc: "Partner with Better Insights to engineer AI systems, headless websites, CRM automations, or scale growth.",
    icon: Briefcase,
  },
  {
    id: "general",
    label: "General Enquiry",
    badge: "DIRECT ASSISTANCE",
    desc: "Ask general questions about our agency, advisory capabilities, methodologies, or capabilities.",
    icon: HelpCircle,
  },
  {
    id: "employment",
    label: "Employment Verification",
    badge: "HR & COMPLIANCE",
    desc: "Official background checks and employment verification for current or former team members.",
    icon: FileCheck2,
  },
  {
    id: "press",
    label: "Media & Press",
    badge: "COMMUNICATIONS",
    desc: "Press inquiries, thought leadership interviews, event keynote speaking, and media features.",
    icon: Newspaper,
  },
];

const SERVICES_OPTIONS = [
  "Website Development",
  "CRM & Integrations",
  "AI & Automation",
  "Digital Growth",
  "Digital Transformation",
  "Technology & Engineering",
  "Other / Custom Advisory",
];

const BUDGET_OPTIONS = [
  "Under $10,000 / ₹8,00,000",
  "$10,000 - $25,000 / ₹8L - ₹20L",
  "$25,000 - $50,000 / ₹20L - ₹40L",
  "$50,000+ / ₹40L+",
  "Flexible / To be determined",
];

export function ContactFormSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState<EnquiryCategory>("services");

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    serviceRequired: "Website Development",
    budget: "$10,000 - $25,000 / ₹8L - ₹20L",
    projectDetails: "",
    employeeName: "",
    verificationDetails: "",
    mediaOrg: "",
    pressSubject: "",
    pressMessage: "",
    generalMessage: "",
    country: "",
    honeypot: "",
  });

  const [stepError, setStepError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Pre-select service from URL parameter (e.g. /contact?service=Website+Development)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        const normalized = serviceParam.toLowerCase().replace(/[-_]/g, " ").trim();
        const match = SERVICES_OPTIONS.find((opt) => {
          const optLower = opt.toLowerCase();
          return (
            optLower === normalized ||
            optLower.includes(normalized) ||
            normalized.includes(optLower.split(" ")[0])
          );
        });
        if (match) {
          setCategory("services");
          setFormData((prev) => ({ ...prev, serviceRequired: match }));
        }
      }
    }
  }, []);

  const validateStep = (step: number): boolean => {
    setStepError("");

    if (step === 1) {
      if (!category) {
        setStepError("Please select an enquiry category.");
        return false;
      }
      return true;
    }

    if (step === 2) {
      if (!formData.firstName.trim()) {
        setStepError("Please provide your first name.");
        return false;
      }
      if (!formData.lastName.trim()) {
        setStepError("Please provide your last name.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        setStepError("Please provide a valid business email address.");
        return false;
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 6) {
        setStepError("Please provide a contact phone number.");
        return false;
      }
      return true;
    }

    if (step === 3) {
      if (category === "services") {
        if (!formData.projectDetails.trim() || formData.projectDetails.trim().length < 10) {
          setStepError("Please share at least 10 characters describing your project parameters or challenges.");
          return false;
        }
      } else if (category === "employment") {
        if (!formData.employeeName.trim()) {
          setStepError("Please provide the candidate / employee full name.");
          return false;
        }
        if (!formData.verificationDetails.trim() || formData.verificationDetails.trim().length < 10) {
          setStepError("Please describe the verification details needed.");
          return false;
        }
      } else if (category === "press") {
        if (!formData.mediaOrg.trim()) {
          setStepError("Please enter your publication or media organization name.");
          return false;
        }
        if (!formData.pressSubject.trim()) {
          setStepError("Please provide the topic or subject of your inquiry.");
          return false;
        }
        if (!formData.pressMessage.trim() || formData.pressMessage.trim().length < 10) {
          setStepError("Please describe your press inquiry and timeline/deadline.");
          return false;
        }
      } else {
        // general
        if (!formData.generalMessage.trim() || formData.generalMessage.trim().length < 10) {
          setStepError("Please share your message or strategic questions (at least 10 characters).");
          return false;
        }
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(4, prev + 1));
      // Smoothly scroll form into view if scrolled far
      const formEl = document.getElementById("contact-form-section");
      if (formEl) {
        const top = formEl.getBoundingClientRect().top + window.pageYOffset - 100;
        if (window.pageYOffset > top) {
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  const handleBack = () => {
    setStepError("");
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    setSubmitting(true);
    setStepError("");

    // Prepare unified payload matching backend API requirements
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    let messageBody = "";

    if (category === "services") {
      messageBody = `[Services Enquiry]\nService: ${formData.serviceRequired}\nBudget: ${formData.budget}\nCompany: ${formData.company || "Not provided"}\n\nProject Scope:\n${formData.projectDetails}`;
    } else if (category === "employment") {
      messageBody = `[Employment Verification Request]\nEmployee Name: ${formData.employeeName}\nRequester Organization: ${formData.company || "Not provided"}\n\nVerification Details:\n${formData.verificationDetails}`;
    } else if (category === "press") {
      messageBody = `[Press Inquiry]\nMedia Organization: ${formData.mediaOrg}\nSubject: ${formData.pressSubject}\n\nInquiry Details:\n${formData.pressMessage}`;
    } else {
      messageBody = `[General Enquiry]\nService Interest: ${formData.serviceRequired}\nCountry/Region: ${formData.country || "Not provided"}\nCompany: ${formData.company || "Not provided"}\n\nMessage:\n${formData.generalMessage}`;
    }

    const payload = {
      name: fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || formData.mediaOrg || "",
      services: formData.serviceRequired,
      budget: formData.budget,
      message: messageBody,
      tab: category,
      honeypot: formData.honeypot,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setStepError(result.message || "Failed to submit enquiry. Please check your entries.");
      }
    } catch {
      setStepError("An unexpected network error occurred. Please try again or reach out directly via phone or WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setCurrentStep(1);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      serviceRequired: "Website Development",
      budget: "$10,000 - $25,000 / ₹8L - ₹20L",
      projectDetails: "",
      employeeName: "",
      verificationDetails: "",
      mediaOrg: "",
      pressSubject: "",
      pressMessage: "",
      generalMessage: "",
      country: "",
      honeypot: "",
    });
  };

  return (
    <section
      id="contact-form-section"
      className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none scroll-mt-24"
      aria-label="Interactive Contact & Enquiry Wizard"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-white border border-black/10 text-[#1B1411]">
              <span className="w-2 h-2 rounded-full bg-[#33CC7A]" />
              Structured Enquiry Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
            How can we collaborate?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#66574F] font-normal leading-relaxed">
            Follow the 4 simple steps below. Our specialists review every submission and deliver actionable next steps within 24 hours.
          </p>
        </div>

        {/* Wizard Container Card */}
        <div className="bg-white rounded-[2rem] border border-black/10 shadow-lg p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          {submitted ? (
            /* Success Confirmation Screen */
            <div className="text-center py-12 sm:py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#33CC7A]/15 text-[#33CC7A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1B1411] tracking-tight">
                Enquiry Successfully Transmitted!
              </h3>
              <p className="text-sm sm:text-base text-[#66574F] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to Better Insights. Our leadership and engineering specialists are reviewing your parameters and will respond within 24 business hours.
              </p>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3.5 rounded-full bg-[#1B1411] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Progress Steps Header */}
              <div className="mb-8 pb-6 border-b border-black/8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#33CC7A]">
                    Step {currentStep} of 4
                  </span>
                  <span className="text-xs font-mono text-[#66574F]">
                    {currentStep === 1 && "Select Category"}
                    {currentStep === 2 && "Contact Details"}
                    {currentStep === 3 && "Project Parameters"}
                    {currentStep === 4 && "Review & Submit"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-[#FAF5F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#33CC7A] transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Error Notice */}
              {stepError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <span>{stepError}</span>
                </div>
              )}

              {/* STEP 1: CATEGORY SELECTION */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1B1411] tracking-tight mb-1">
                      Choose Your Enquiry Category
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66574F]">
                      Select the option that best reflects your requirements to route your request directly to the appropriate team.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ENQUIRY_CATEGORIES.map((cat) => {
                      const IconComp = cat.icon;
                      const isSelected = category === cat.id;

                      return (
                        <div
                          key={cat.id}
                          onClick={() => setCategory(cat.id)}
                          className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "border-[#33CC7A] bg-[#33CC7A]/[0.06] shadow-sm ring-2 ring-[#33CC7A]"
                              : "border-black/10 hover:border-black/25 bg-[#FAF5F0]"
                          }`}
                          role="radio"
                          aria-checked={isSelected}
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setCategory(cat.id);
                            }
                          }}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#33CC7A]">
                                {cat.badge}
                              </span>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  isSelected ? "bg-[#33CC7A] text-white" : "bg-white text-[#66574F] border border-black/10"
                                }`}
                              >
                                <IconComp className="w-4 h-4" />
                              </div>
                            </div>
                            <h4 className="text-base font-semibold text-[#1B1411] mb-2">{cat.label}</h4>
                            <p className="text-xs text-[#66574F] leading-relaxed font-normal">{cat.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: CONTACT DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1B1411] tracking-tight mb-1">
                      Your Contact Information
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66574F]">
                      Tell us who we are speaking with so our specialists can address you directly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                        First Name <span className="text-[#33CC7A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gautam"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                        Last Name <span className="text-[#33CC7A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Koli"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                        Work Email Address <span className="text-[#33CC7A]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                        Phone Number <span className="text-[#33CC7A]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 950 999 6730"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp or Institutional Partner"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A] focus:ring-1 focus:ring-[#33CC7A]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: PARAMETERS & REQUIREMENTS */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1B1411] tracking-tight mb-1">
                      Project Parameters &amp; Objectives
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66574F]">
                      Provide specific context so our engineering and strategic leads can prepare actionable responses.
                    </p>
                  </div>

                  {category === "services" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                            Primary Capability Required <span className="text-[#33CC7A]">*</span>
                          </label>
                          <select
                            value={formData.serviceRequired}
                            onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                          >
                            {SERVICES_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                            Expected Project Budget
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                          >
                            {BUDGET_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                          Project Scope &amp; Commercial Challenges <span className="text-[#33CC7A]">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Tell us about your conversion bottlenecks, tech stack re-architecture, AI automation goals, or timeline..."
                          value={formData.projectDetails}
                          onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                        />
                      </div>
                    </>
                  )}

                  {category === "employment" && (
                    <>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                          Candidate / Employee Name <span className="text-[#33CC7A]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Full name of employee / past team member"
                          value={formData.employeeName}
                          onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                          Verification Details &amp; Specific Inquiries <span className="text-[#33CC7A]">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Provide the employment dates, designation, and specific verification requirements needed..."
                          value={formData.verificationDetails}
                          onChange={(e) => setFormData({ ...formData, verificationDetails: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                        />
                      </div>
                    </>
                  )}

                  {category === "press" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                            Publication / Outlet <span className="text-[#33CC7A]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Forbes, TechCrunch, Economic Times"
                            value={formData.mediaOrg}
                            onChange={(e) => setFormData({ ...formData, mediaOrg: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                            Subject / Topic <span className="text-[#33CC7A]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. AI Agency Trends Interview"
                            value={formData.pressSubject}
                            onChange={(e) => setFormData({ ...formData, pressSubject: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                          Inquiry Overview &amp; Editorial Deadlines <span className="text-[#33CC7A]">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Describe the article, interview questions, and required deadline..."
                          value={formData.pressMessage}
                          onChange={(e) => setFormData({ ...formData, pressMessage: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                        />
                      </div>
                    </>
                  )}

                  {category === "general" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                            Service Area of Interest
                          </label>
                          <select
                            value={formData.serviceRequired}
                            onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                          >
                            {SERVICES_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                            Country / City
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. India, United States, United Kingdom"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1411]/80 mb-1.5">
                          How Can We Help You? <span className="text-[#33CC7A]">*</span>
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Tell us about your brand questions, advisory requirements, or ideas..."
                          value={formData.generalMessage}
                          onChange={(e) => setFormData({ ...formData, generalMessage: e.target.value })}
                          className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/10 rounded-xl text-sm text-[#1B1411] focus:outline-none focus:border-[#33CC7A]"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STEP 4: REVIEW & SUBMIT */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#1B1411] tracking-tight mb-1">
                      Review Your Submission
                    </h3>
                    <p className="text-xs sm:text-sm text-[#66574F]">
                      Verify the details below before transmitting. You can click 'Back' to adjust any parameters.
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="p-6 rounded-2xl bg-[#FAF5F0] border border-black/10 space-y-4 text-xs sm:text-sm">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-black/10">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block">
                          Category
                        </span>
                        <span className="font-semibold text-[#1B1411] capitalize">{category}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block">
                          Name
                        </span>
                        <span className="font-semibold text-[#1B1411]">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-black/10">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block">
                          Work Email
                        </span>
                        <span className="font-semibold text-[#1B1411] break-all">{formData.email}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block">
                          Phone
                        </span>
                        <span className="font-semibold text-[#1B1411]">{formData.phone}</span>
                      </div>
                    </div>

                    {formData.company && (
                      <div className="pb-4 border-b border-black/10">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block">
                          Organization
                        </span>
                        <span className="font-semibold text-[#1B1411]">{formData.company}</span>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#66574F] block mb-1">
                        Requirements / Scope Summary
                      </span>
                      <p className="text-[#1B1411]/80 leading-relaxed font-normal bg-white p-3.5 rounded-xl border border-black/5 whitespace-pre-wrap">
                        {category === "services" && formData.projectDetails}
                        {category === "employment" && `Candidate: ${formData.employeeName}\n\n${formData.verificationDetails}`}
                        {category === "press" && `Outlet: ${formData.mediaOrg}\nTopic: ${formData.pressSubject}\n\n${formData.pressMessage}`}
                        {category === "general" && formData.generalMessage}
                      </p>
                    </div>
                  </div>

                  {/* Privacy / Security Notice */}
                  <div className="flex items-center gap-2.5 text-xs text-[#66574F]">
                    <ShieldCheck className="w-4 h-4 text-[#33CC7A] shrink-0" />
                    <span>Your information is strictly protected and never shared with third parties.</span>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-black/8 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-black/15 text-[#1B1411] text-xs font-bold uppercase tracking-wider hover:bg-black/5 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1B1411] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4 text-[#33CC7A]" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#33CC7A] hover:bg-[#2BB86D] text-[#1B1411] text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 shadow-md shadow-[#33CC7A]/20 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Final Enquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
