"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Upload, CheckCircle2, Loader2, ArrowRight, X, FileText, AlertCircle } from "lucide-react";

interface CareersApplicationFormProps {
  selectedRole?: { id: string; title: string; department: string } | null;
  onClearSelectedRole?: () => void;
}

export function CareersApplicationForm({
  selectedRole,
  onClearSelectedRole,
}: CareersApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
    consent: false,
    honeypot: "",
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync selected role when clicked from the positions list
  useEffect(() => {
    if (selectedRole) {
      setFormData((prev) => ({
        ...prev,
        position: selectedRole.title,
        department: selectedRole.department,
      }));
    }
  }, [selectedRole]);

  // Handle drag and drop
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    // Validate file type
    const validExts = [".pdf", ".doc", ".docx"];
    const fileName = file.name.toLowerCase();
    const isValid = validExts.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setErrorMessage("Please upload a PDF, DOC, or DOCX document.");
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File exceeds the 10 MB maximum size limit.");
      return;
    }

    setErrorMessage("");
    setResumeFile(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side validations
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (!formData.position.trim()) {
      setErrorMessage("Please specify the position you are applying for.");
      return;
    }

    if (!resumeFile) {
      setErrorMessage("Please upload your resume or CV (PDF, DOC, or DOCX).");
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please confirm consent to process your application.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("bi_hp_career", formData.honeypot);
      payload.append("applicant_name", formData.name.trim());
      payload.append("applicant_email", formData.email.trim());
      payload.append("applicant_phone", formData.phone.trim());
      payload.append("applicant_department", formData.department.trim());
      payload.append("applicant_position", formData.position.trim());
      payload.append("applicant_resume", resumeFile);
      if (formData.linkedin.trim()) payload.append("applicant_linkedin", formData.linkedin.trim());
      if (formData.portfolio.trim()) payload.append("applicant_portfolio", formData.portfolio.trim());
      if (formData.coverLetter.trim()) payload.append("applicant_cover_letter", formData.coverLetter.trim());
      payload.append("privacy_consent", "1");

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: payload,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message || "Failed to submit application. Please check your inputs.");
      }
    } catch {
      setErrorMessage("An unexpected network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      linkedin: "",
      portfolio: "",
      coverLetter: "",
      consent: false,
      honeypot: "",
    });
    setResumeFile(null);
    setErrorMessage("");
    if (onClearSelectedRole) onClearSelectedRole();
  };

  return (
    <section id="apply" className="py-20 sm:py-28 bg-white border-b border-black/10 select-none scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-black/50 block mb-2">
            Submit Your Credentials
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-black leading-tight">
            Candidate Application
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-black/60 font-normal leading-relaxed">
            Fill out the form below. We review every submission with discretion and evaluate each candidate on engineering rigor, strategic depth, and craft.
          </p>
        </div>

        {/* Application Card */}
        <div className="bg-[#F3F2EF] rounded-3xl sm:rounded-[36px] border border-black/10 p-8 sm:p-12 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold uppercase tracking-tight text-black">
                Application Received
              </h3>
              <p className="text-xs sm:text-sm text-black/70 max-w-md mx-auto leading-relaxed">
                Thank you for applying to Better Insights. Our talent acquisition and engineering leads will review your profile and reach out if there is a strong alignment.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/80 transition-all careers-focus-ring"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              
              {/* Anti-spam honeypot */}
              <div style={{ display: "none" }} aria-hidden="true">
                <label htmlFor="bi_hp_career">Leave this field blank</label>
                <input
                  type="text"
                  id="bi_hp_career"
                  name="bi_hp_career"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Error Alert Banner */}
              {errorMessage && (
                <div className="p-4 bg-white rounded-2xl border border-black/20 flex items-center gap-3 text-xs text-black">
                  <AlertCircle className="w-4 h-4 text-black shrink-0" />
                  <span className="font-semibold">{errorMessage}</span>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="app-name" className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                    Full Name <span className="text-black font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="app-name"
                    required
                    placeholder="e.g. Maya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="app-email" className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                    Email Address <span className="text-black font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    id="app-email"
                    required
                    placeholder="e.g. maya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Phone & Department Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="app-phone" className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                    Phone Number <span className="text-black font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    id="app-phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="app-dept" className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                    Area of Interest / Discipline
                  </label>
                  <select
                    id="app-dept"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="">Select an area of interest</option>
                    <option value="Technology & Engineering">Technology &amp; Engineering</option>
                    <option value="AI & Automation">AI &amp; Automation</option>
                    <option value="Search & Organic Growth">Search &amp; Organic Growth</option>
                    <option value="Growth & Paid Media">Growth &amp; Paid Media</option>
                    <option value="Editorial & Brand">Editorial &amp; Brand</option>
                    <option value="Creative & Media">Creative &amp; Media</option>
                    <option value="Strategy & Leadership">Strategy &amp; Leadership</option>
                  </select>
                </div>
              </div>

              {/* Position Applied For */}
              <div>
                <label htmlFor="app-position" className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                  Position Applied For <span className="text-black font-bold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="app-position"
                    required
                    placeholder="e.g. Web Developer (WordPress & Full-Stack) or General Application"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                  />
                  {formData.position && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, position: "" })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black p-1"
                      aria-label="Clear position"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Resume Drag & Drop Zone */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                  Resume / Curriculum Vitae <span className="text-black font-bold">*</span>{" "}
                  <span className="text-black/40 normal-case font-mono font-normal">(PDF, DOC, DOCX up to 10 MB)</span>
                </label>

                {!resumeFile ? (
                  <div
                    className={`careers-dropzone ${dragActive ? "drag-active" : ""}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      aria-label="Upload resume file"
                    />
                    <div className="flex flex-col items-center justify-center pointer-events-none space-y-2">
                      <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-black/60" />
                      </div>
                      <div className="text-xs sm:text-sm text-black">
                        <span className="font-bold underline underline-offset-2">Click to browse</span> or drag &amp; drop your resume file here
                      </div>
                      <div className="text-[11px] text-black/40 font-mono">
                        Supported: PDF, DOC, DOCX (Max 10 MB)
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-2xl border border-black/15 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-black truncate max-w-xs sm:max-w-md">
                          {resumeFile.name}
                        </div>
                        <div className="text-[11px] font-mono text-black/50">
                          {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-2 text-black/50 hover:text-black rounded-lg hover:bg-black/5 transition-colors"
                      aria-label="Remove resume file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* LinkedIn & Portfolio Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="app-linkedin" className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                    LinkedIn Profile URL <span className="text-black/40 font-normal font-mono">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="app-linkedin"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="app-portfolio" className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                    Portfolio or GitHub URL <span className="text-black/40 font-normal font-mono">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    id="app-portfolio"
                    placeholder="https://github.com/... or portfolio"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Cover Letter / Note */}
              <div>
                <label htmlFor="app-cover" className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-2">
                  Cover Note / Message <span className="text-black/40 font-normal font-mono">(Optional)</span>
                </label>
                <textarea
                  id="app-cover"
                  rows={3}
                  placeholder="Share what excites you about this role, your relevant technical accomplishments, or links to projects..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-black/15 rounded-xl text-xs sm:text-sm text-black placeholder-black/30 focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="app-consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-black/20 text-black focus:ring-black cursor-pointer"
                />
                <label htmlFor="app-consent" className="text-xs text-black/70 leading-relaxed cursor-pointer">
                  I consent to Better Insights processing my application details, contact information, and resume for recruitment in accordance with the{" "}
                  <Link href="/privacy-policy" className="text-black underline font-semibold hover:opacity-80">
                    Privacy Policy
                  </Link>
                  . <span className="text-black font-bold">*</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black/85 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 careers-focus-ring"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Application...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
