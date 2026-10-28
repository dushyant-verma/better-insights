"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X, Upload, CheckCircle2, Loader2, ArrowRight, FileText, AlertCircle } from "lucide-react";

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPosition?: string;
  defaultDepartment?: string;
}

export function CareerModal({
  isOpen,
  onClose,
  defaultPosition = "",
  defaultDepartment = "",
}: CareerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: defaultPosition,
    department: defaultDepartment,
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
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultPosition) {
      setFormData((prev) => ({
        ...prev,
        position: defaultPosition,
        department: defaultDepartment || prev.department,
      }));
    }
  }, [defaultPosition, defaultDepartment]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSubmitted(false);
      setErrorMsg("");
      setResumeFile(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle Drag & Drop
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
    const validExts = [".pdf", ".doc", ".docx"];
    const fileName = file.name.toLowerCase();
    const isValid = validExts.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setErrorMsg("Please upload a PDF, DOC, or DOCX document.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg("File exceeds maximum allowed size of 10 MB.");
      return;
    }

    setErrorMsg("");
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }

    if (!formData.position.trim()) {
      setErrorMsg("Please enter the position title.");
      return;
    }

    if (!resumeFile) {
      setErrorMsg("Please upload your resume file (PDF, DOC, or DOCX).");
      return;
    }

    if (!formData.consent) {
      setErrorMsg("Please confirm consent to process your application.");
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
        setErrorMsg(result.message || "Submission failed. Please check your inputs.");
      }
    } catch {
      setErrorMsg("An unexpected network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bi-career-modal-title"
    >
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-black/15 overflow-hidden z-10 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-black/50 hover:text-black rounded-full hover:bg-black/5 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-extrabold text-black uppercase tracking-tight">Application Submitted</h3>
            <p className="text-xs sm:text-sm text-black/70 max-w-sm mx-auto leading-relaxed">
              Thank you for applying to Better Insights! Our talent acquisition and engineering leads have received your credentials and will reach out if there is a strong alignment.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black/80 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black/50 block">
              Careers at Better Insights
            </span>
            <h2 id="bi-career-modal-title" className="text-xl sm:text-2xl font-extrabold text-black uppercase tracking-tight mt-1">
              Apply for {formData.position || "Position"}
            </h2>
            <p className="text-xs text-black/60 mt-1 leading-relaxed">
              Join our team of engineers, growth strategists, and digital architects.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              
              {/* Anti-spam honeypot */}
              <div style={{ display: "none" }} aria-hidden="true">
                <input
                  type="text"
                  name="bi_hp_career"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                />
              </div>

              {errorMsg && (
                <div className="p-3 bg-[#F3F2EF] border border-black/15 rounded-xl flex items-center gap-2 text-xs text-black font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F3F2EF] border border-black/15 rounded-xl text-xs text-black placeholder-black/30 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. maya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F3F2EF] border border-black/15 rounded-xl text-xs text-black placeholder-black/30 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F3F2EF] border border-black/15 rounded-xl text-xs text-black placeholder-black/30 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-1">
                    Position Applied For *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Position title"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F3F2EF] border border-black/15 rounded-xl text-xs text-black placeholder-black/30 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-1">
                  Upload Resume / CV * <span className="font-mono text-[10px] text-black/40 font-normal">(PDF, DOC, DOCX up to 10 MB)</span>
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
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center pointer-events-none space-y-1">
                      <Upload className="w-5 h-5 text-black/50" />
                      <div className="text-xs text-black font-semibold">
                        Click to browse or drag file here
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#F3F2EF] rounded-xl border border-black/15 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-black" />
                      <span className="text-xs font-semibold text-black truncate max-w-[240px]">
                        {resumeFile.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setResumeFile(null)}
                      className="p-1 text-black/50 hover:text-black"
                      aria-label="Remove resume"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-1">
                    LinkedIn URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F3F2EF] border border-black/15 rounded-xl text-xs text-black placeholder-black/30 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-1">
                    Portfolio / GitHub (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.portfolio}
                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F3F2EF] border border-black/15 rounded-xl text-xs text-black placeholder-black/30 focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-black/70 mb-1">
                  Cover Note / Message (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Key accomplishments or brief motivation..."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F3F2EF] border border-black/15 rounded-xl text-xs text-black placeholder-black/30 focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="modal-career-consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-0.5 rounded border-black/20 text-black focus:ring-black cursor-pointer"
                />
                <label htmlFor="modal-career-consent" className="text-[11px] text-black/70 leading-tight cursor-pointer">
                  I agree that Better Insights may process and retain my application data for recruitment in accordance with the{" "}
                  <Link href="/privacy-policy" className="text-black underline font-semibold" target="_blank">
                    Privacy Policy
                  </Link>
                  . *
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
