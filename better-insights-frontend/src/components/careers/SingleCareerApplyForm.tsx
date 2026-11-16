"use client";

import React, { useState, useRef } from "react";
import { Upload, CheckCircle2, Loader2, ArrowRight, FileText, AlertCircle } from "lucide-react";
import type { CareerDetail } from "@/data/careersData";

interface SingleCareerApplyFormProps {
  career: CareerDetail;
}

export function SingleCareerApplyForm({ career }: SingleCareerApplyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    experience: "3-5 years",
    coverLetter: "",
    consent: false,
    honeypot: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelected = (file: File) => {
    setErrorMsg("");
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx)$/i)) {
      setErrorMsg("Please upload a PDF or Word document (.pdf, .doc, .docx).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File size must be 10MB or less.");
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
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in your name, email, and phone number.");
      return;
    }

    if (!resumeFile) {
      setErrorMsg("Please upload your resume or CV.");
      return;
    }

    if (!formData.consent) {
      setErrorMsg("Please agree to the privacy policy to submit your application.");
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("applicant_name", formData.name.trim());
      data.append("applicant_email", formData.email.trim());
      data.append("applicant_phone", formData.phone.trim());
      data.append("applicant_position", career.title);
      data.append("applicant_department", career.department);
      data.append("applicant_resume", resumeFile);
      data.append("applicant_linkedin", formData.linkedin.trim());
      data.append("applicant_portfolio", formData.portfolio.trim());
      data.append(
        "applicant_cover_letter",
        `[Years Experience: ${formData.experience}]\n\n${formData.coverLetter.trim()}`
      );
      data.append("privacy_consent", formData.consent ? "true" : "false");
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
    <section id="apply" className="scroll-mt-32 pt-16 sm:pt-20 border-t border-white/10">
      <div className="flex items-center gap-2 mb-4 text-[#CBFC6B] font-mono text-xs tracking-wider uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
        <span>06 / Application</span>
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold tracking-tight text-white mb-2 [font-family:'Host_Grotesk',sans-serif]">
        How to Apply:
      </h2>
      <p className="text-[#CBFC6B] text-sm font-medium mb-4">
        Position: {career.title} ({career.workplaceType})
      </p>

      <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mb-8 font-light">
        Submit your details below. We review every application personally and respond to shortlisted candidates within 3-5 business days.
      </p>

      {/* Form Container */}
      <div className="bg-[#141518] rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        {submitted ? (
          <div className="text-center py-12 sm:py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#CBFC6B]/20 text-[#CBFC6B] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-semibold text-white [font-family:'Host_Grotesk',sans-serif]">
              Application Received!
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed">
              Thank you for applying for the <strong className="text-white">{career.title}</strong> role at Better Insights. Our talent team will review your application and be in touch soon.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setResumeFile(null);
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    linkedin: "",
                    portfolio: "",
                    experience: "3-5 years",
                    coverLetter: "",
                    consent: false,
                    honeypot: "",
                  });
                }}
                className="px-6 py-2.5 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors"
              >
                Submit another application
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot anti-spam */}
            <input
              type="text"
              name="bi_hp_career"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              className="hidden"
              aria-hidden="true"
            />

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Full Name <span className="text-[#CBFC6B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1C1D21] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CBFC6B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Email Address <span className="text-[#CBFC6B]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1C1D21] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CBFC6B] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Phone & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Phone Number <span className="text-[#CBFC6B]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+44 7123 456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#1C1D21] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CBFC6B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Relevant Experience
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full bg-[#1C1D21] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CBFC6B] transition-colors"
                >
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-8 years">5-8 years</option>
                  <option value="8+ years">8+ years</option>
                </select>
              </div>
            </div>

            {/* Row 3: Resume Dropzone */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Resume / CV (PDF or Word, max 10MB) <span className="text-[#CBFC6B]">*</span>
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                  dragActive
                    ? "border-[#CBFC6B] bg-[#CBFC6B]/5"
                    : resumeFile
                    ? "border-[#CBFC6B]/40 bg-[#CBFC6B]/5"
                    : "border-white/15 bg-[#1C1D21]/60 hover:border-white/30 hover:bg-[#1C1D21]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileSelected(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {resumeFile ? (
                  <div className="flex items-center justify-center gap-3 text-sm text-white">
                    <FileText className="w-6 h-6 text-[#CBFC6B]" />
                    <span className="font-medium truncate max-w-xs">{resumeFile.name}</span>
                    <span className="text-xs text-neutral-400">
                      ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </span>
                    <span className="text-xs text-[#CBFC6B] underline ml-2">Change file</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-neutral-400 mx-auto stroke-[1.5]" />
                    <div className="text-sm text-neutral-200">
                      <span className="text-[#CBFC6B] font-medium">Click to upload</span> or drag and drop your CV
                    </div>
                    <div className="text-xs text-neutral-500">PDF, DOC, DOCX up to 10MB</div>
                  </div>
                )}
              </div>
            </div>

            {/* Row 4: LinkedIn & Portfolio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourname"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full bg-[#1C1D21] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CBFC6B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Portfolio / Website (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full bg-[#1C1D21] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CBFC6B] transition-colors"
                />
              </div>
            </div>

            {/* Row 5: Why are you suitable for this role? */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Why are you suitable for this role? <span className="text-[#CBFC6B]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share a brief overview of your background, your key achievements, and why you want to join Better Insights..."
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                className="w-full bg-[#1C1D21] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#CBFC6B] transition-colors resize-y min-h-[120px]"
              />
            </div>

            {/* Privacy Consent Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="career-consent"
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-[#1C1D21] text-[#CBFC6B] focus:ring-[#CBFC6B] accent-[#CBFC6B]"
              />
              <label htmlFor="career-consent" className="text-xs text-neutral-400 leading-normal">
                I agree to Better Insights processing my personal data in accordance with the{" "}
                <a href="/privacy-policy" target="_blank" className="text-[#CBFC6B] underline hover:text-white">
                  Privacy Policy
                </a>{" "}
                for recruitment purposes.
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#CBFC6B] text-black font-semibold text-sm hover:bg-[#bbf255] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_24px_rgba(203,252,107,0.3)]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
