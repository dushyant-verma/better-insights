"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, Loader2, ArrowUpRight, AlertCircle, Check } from "lucide-react";
import type { CareerDetail } from "@/data/careersData";
import { BlobButton } from "@/components/ui/BlobButton";

interface SingleCareerApplySectionProps {
  career: CareerDetail;
}

/**
 * Custom SVG LinkedIn icon matching MadeByShape aesthetic
 */
function LinkedInIcon({ className = "w-3.5 h-3.5 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.28a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

export function SingleCareerApplySection({ career }: SingleCareerApplySectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolioUrl: "",
    phoneNumber: "",
    salaryExpectations: "",
    howHeard: "",
    whyRightForRole: "",
    privacyConsent: false,
    honeypot: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    setErrorMsg("");
    if (!file.name.match(/\.pdf$/i) && file.type !== "application/pdf") {
      setErrorMsg("Please upload a PDF file (.pdf).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size must be 10 MB or less.");
      return;
    }

    setResumeFile(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!resumeFile) {
      setErrorMsg("Please upload your CV / Resume (PDF, max 10 MB).");
      return;
    }

    if (!formData.privacyConsent) {
      setErrorMsg("Please accept the privacy policy to submit your application.");
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("applicant_name", formData.name.trim());
      data.append("applicant_email", formData.email.trim());
      data.append("applicant_phone", formData.phoneNumber.trim() || "Not provided");
      data.append("applicant_position", career.title);
      data.append("applicant_department", career.department);
      data.append("applicant_resume", resumeFile);
      data.append(
        "applicant_cover_letter",
        `[Portfolio: ${formData.portfolioUrl.trim() || "N/A"}]\n[Salary Expectations: ${formData.salaryExpectations.trim() || "Competitive"}]\n[How heard: ${formData.howHeard || "Not specified"}]\n\nWhy Right for Role:\n${formData.whyRightForRole.trim()}`
      );
      data.append("privacy_consent", "true");
      data.append("bi_hp_career", formData.honeypot);

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();

      if (!res.ok || !resData.success) {
        throw new Error(resData.message || "Failed to submit application. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="apply" className="w-full bg-[#1A1B1E] text-white py-16 sm:py-24 lg:py-32 select-none scroll-mt-24 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================================================================= */}
        {/* Main Application Container with Organic Stepped Blob Geometry     */}
        {/* ================================================================= */}
        <div className="relative bg-[#0E0F10] rounded-2xl lg:rounded-3xl p-6 sm:p-10 md:p-12 lg:p-16 xl:p-20   border-white/[0.06] overflow-hidden">

          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(203,252,107,0.03)_0%,transparent_70%)] pointer-events-none" />

          {/* =============================================================== */}
          {/* Stepped Organic Notch Cutout at Bottom-Right (MadeByShape spec) */}
          {/* =============================================================== */}
          <div
            className="hidden lg:block absolute bottom-0 right-0 z-20 w-32 h-14 lg:w-80 lg:h-20 bg-[#1A1B1E] rounded-tl-2xl lg:rounded-tl-3xl pointer-events-none"
            aria-hidden="true"
          >
            {/* Top concave fillet SVG */}
            <svg
              className="w-10 h-10 lg:w-12 lg:h-12 text-[#1A1B1E] fill-current absolute top-px -right-px transform -translate-y-full rotate-180 pointer-events-none"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
            </svg>

            {/* Left concave fillet SVG */}
            <svg
              className="w-10 h-10 lg:w-12 lg:h-12 text-[#1A1B1E] fill-current absolute -bottom-px left-px transform -translate-x-full rotate-180 pointer-events-none"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <path d="M51.9 0v1.9c-27.6 0-50 22.4-50 50H0V0h51.9z" />
            </svg>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-14 xl:gap-20">

            {/* ============================================================= */}
            {/* Left Column: Eyebrow, Heading & 2-Column Application Form      */}
            {/* ============================================================= */}
            <div className="w-full lg:flex-1 max-w-3xl">

              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-3 text-xs sm:text-sm text-neutral-400 font-light [font-family:'Host_Grotesk',sans-serif]">
                <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" aria-hidden="true" />
                <span>Think you fit the bill?</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-sans font-semibold tracking-[-0.035em] text-white leading-[1.08] mb-8 sm:mb-12 [font-family:'Host_Grotesk',sans-serif]">
                Apply for this position
              </h2>

              {submitted ? (
                /* Success State */
                <div className="p-8 sm:p-10 rounded-2xl bg-[#1A1B1E] border border-[#CBFC6B]/30 shadow-2xl text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#CBFC6B]/15 text-[#CBFC6B] flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white [font-family:'Host_Grotesk',sans-serif]">
                    Application Submitted!
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-md mx-auto">
                    Thank you for applying for the <span className="text-[#CBFC6B] font-medium">{career.title}</span> position at Better Insights. We review every application personally and will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setResumeFile(null);
                      setFormData({
                        name: "",
                        email: "",
                        portfolioUrl: "",
                        phoneNumber: "",
                        salaryExpectations: "",
                        howHeard: "",
                        whyRightForRole: "",
                        privacyConsent: false,
                        honeypot: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors mt-2"
                  >
                    <span>Submit another application</span>
                  </button>
                </div>
              ) : (
                /* Application Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field for bot spam deterrence */}
                  <input
                    type="text"
                    name="bi_hp_career"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* 2-Column Input Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

                    {/* Row 1, Col 1: Name */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Whats your name?"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-[54px] bg-[#1A1B1E] text-white placeholder-neutral-500 rounded-xl px-5 border border-white/[0.09] focus:border-[#CBFC6B] focus:ring-1 focus:ring-[#CBFC6B] focus:outline-none transition-colors text-sm sm:text-base [font-family:'Host_Grotesk',sans-serif]"
                      />
                    </div>

                    {/* Row 1, Col 2: Email Address */}
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email address?"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-[54px] bg-[#1A1B1E] text-white placeholder-neutral-500 rounded-xl px-5 border border-white/[0.09] focus:border-[#CBFC6B] focus:ring-1 focus:ring-[#CBFC6B] focus:outline-none transition-colors text-sm sm:text-base [font-family:'Host_Grotesk',sans-serif]"
                      />
                    </div>

                    {/* Row 2, Col 1: Portfolio URL (Optional) */}
                    <div>
                      <input
                        type="url"
                        name="portfolioUrl"
                        placeholder="Your Portfolio URL (Optional)"
                        value={formData.portfolioUrl}
                        onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                        className="w-full h-[54px] bg-[#1A1B1E] text-white placeholder-neutral-500 rounded-xl px-5 border border-white/[0.09] focus:border-[#CBFC6B] focus:ring-1 focus:ring-[#CBFC6B] focus:outline-none transition-colors text-sm sm:text-base [font-family:'Host_Grotesk',sans-serif]"
                      />
                    </div>

                    {/* Row 2, Col 2: Phone Number (Optional) */}
                    <div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Your Phone Number (Optional)"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full h-[54px] bg-[#1A1B1E] text-white placeholder-neutral-500 rounded-xl px-5 border border-white/[0.09] focus:border-[#CBFC6B] focus:ring-1 focus:ring-[#CBFC6B] focus:outline-none transition-colors text-sm sm:text-base [font-family:'Host_Grotesk',sans-serif]"
                      />
                    </div>

                    {/* Row 3, Col 1: Salary Expectations */}
                    <div>
                      <input
                        type="text"
                        name="salaryExpectations"
                        placeholder="What are your salary expectations?"
                        value={formData.salaryExpectations}
                        onChange={(e) => setFormData({ ...formData, salaryExpectations: e.target.value })}
                        className="w-full h-[54px] bg-[#1A1B1E] text-white placeholder-neutral-500 rounded-xl px-5 border border-white/[0.09] focus:border-[#CBFC6B] focus:ring-1 focus:ring-[#CBFC6B] focus:outline-none transition-colors text-sm sm:text-base [font-family:'Host_Grotesk',sans-serif]"
                      />
                    </div>

                    {/* Row 3, Col 2: How did you hear about this role? */}
                    <div className="relative">
                      <select
                        name="howHeard"
                        value={formData.howHeard}
                        onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                        className={`w-full h-[54px] bg-[#1A1B1E] rounded-xl px-5 pr-10 border border-white/[0.09] focus:border-[#CBFC6B] focus:ring-1 focus:ring-[#CBFC6B] focus:outline-none transition-colors text-sm sm:text-base appearance-none cursor-pointer [font-family:'Host_Grotesk',sans-serif] ${formData.howHeard ? "text-white" : "text-neutral-500"
                          }`}
                      >
                        <option value="" disabled className="bg-[#1A1B1E] text-neutral-500">
                          How did you hear about this role?
                        </option>
                        <option value="LinkedIn" className="bg-[#1A1B1E] text-white">LinkedIn</option>
                        <option value="Indeed / Job Board" className="bg-[#1A1B1E] text-white">Indeed / Job Board</option>
                        <option value="Google Search" className="bg-[#1A1B1E] text-white">Google Search</option>
                        <option value="Word of Mouth / Referral" className="bg-[#1A1B1E] text-white">Word of Mouth / Referral</option>
                        <option value="Better Insights Website" className="bg-[#1A1B1E] text-white">Better Insights Website</option>
                        <option value="Social Media" className="bg-[#1A1B1E] text-white">Social Media</option>
                        <option value="Other" className="bg-[#1A1B1E] text-white">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>

                    {/* Row 4, Col 1: Why are you right for this role? (Textarea) */}
                    <div>
                      <textarea
                        rows={4}
                        name="whyRightForRole"
                        placeholder="Why are you right for this role?"
                        value={formData.whyRightForRole}
                        onChange={(e) => setFormData({ ...formData, whyRightForRole: e.target.value })}
                        className="w-full h-[126px] bg-[#1A1B1E] text-white placeholder-neutral-500 rounded-xl p-5 border border-white/[0.09] focus:border-[#CBFC6B] focus:ring-1 focus:ring-[#CBFC6B] focus:outline-none transition-colors text-sm sm:text-base resize-none [font-family:'Host_Grotesk',sans-serif]"
                      />
                    </div>

                    {/* Row 4, Col 2: Upload CV / Resume Box (PDF max 10 MB) */}
                    <div className="flex flex-col">
                      <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full h-[126px] bg-[#1A1B1E] rounded-xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${dragActive
                            ? "border-[#CBFC6B] bg-[#CBFC6B]/5"
                            : resumeFile
                              ? "border-[#CBFC6B]/50 bg-white/[0.02]"
                              : "border-dashed border-white/[0.12] hover:border-white/25"
                          }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                          className="hidden"
                        />

                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-white/90 text-black text-xs font-semibold shadow-sm transition-colors shrink-0">
                            <span>Choose file</span>
                          </span>

                          <span className="text-xs sm:text-sm text-neutral-400 font-light truncate max-w-[200px]">
                            {resumeFile ? resumeFile.name : "No file chosen"}
                          </span>
                        </div>

                        {resumeFile ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-[#CBFC6B] font-mono">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Ready ({(resumeFile.size / 1024 / 1024).toFixed(1)} MB)</span>
                          </span>
                        ) : (
                          <span className="text-[11px] text-neutral-500 font-light">
                            Drop PDF here or click to browse
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] sm:text-xs text-neutral-400 font-light mt-1.5 pl-1">
                        File size PDF max. 10 MB
                      </div>
                    </div>

                  </div>

                  {/* Privacy Policy Acceptance & Explanation */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-[#1A1B1E] text-[#CBFC6B] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#CBFC6B]"
                      />
                      <span className="text-xs sm:text-[13px] text-neutral-400 font-light leading-relaxed">
                        By submitting this form I accept the{" "}
                        <a href="/privacy" className="underline hover:text-white transition-colors">
                          Privacy Policy
                        </a>{" "}
                        of this site.
                      </span>
                    </label>

                    <p className="text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed max-w-2xl [font-family:'Host_Grotesk',sans-serif]">
                      Your CV and the personal details contained in it are used solely by Better Insights to help recruit the right candidate for a specific role. These details will never be shared with any third parties and will be deleted either three months after you apply for a position, or when the role is filled, whichever is sooner. If you&apos;d like us to delete your details before then, please see our privacy policy for information on how to contact us about this.
                    </p>
                  </div>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit Button (Pill-shaped with dark grey #292A2D background & gooey blob arrow) */}
                  <div className="pt-2">
                    <BlobButton
                      type="submit"
                      variant="dark"
                      size="md"
                      icon="arrow-up-right"
                      disabled={submitting}
                      loading={submitting}
                    >
                      Submit your application
                    </BlobButton>
                  </div>
                </form>
              )}
            </div>

            {/* ============================================================= */}
            {/* Right Column: Compact Team / Founder Profile Card             */}
            {/* ============================================================= */}
            <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 self-start">
              <div className="bg-[#1A1B1E] rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-white/[0.08] shadow-2xl space-y-4">

                {/* Profile Photo */}
                <div className="relative aspect-[16/11] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-inner">
                  <Image
                    src="/team/photos/gautam-koli-photo.jpg"
                    alt="Gautam Koli, Founder & Director at Better Insights"
                    fill
                    sizes="360px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Heading */}
                <div className="pt-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight [font-family:'Host_Grotesk',sans-serif]">
                    Meet the Boss
                  </h3>
                </div>

                {/* Follow on LinkedIn Blob CTA */}
                <div>
                  <BlobButton
                    href="https://www.linkedin.com/in/itsgautamkoli/"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="sm"
                    variant="primary"
                    icon="arrow-up-right"
                    ariaLabel="Follow Gautam on LinkedIn"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <span>Follow Gautam on</span>
                      <LinkedInIcon className="w-3.5 h-3.5 fill-black" />
                    </span>
                  </BlobButton>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
