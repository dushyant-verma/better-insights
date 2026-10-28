"use client";

import React, { useState } from "react";
import { InnerPageHero } from "@/components/hero/InnerPageHero";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Loader2,
  ArrowRight,
  Mail,
  Send,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

export default function WriteForUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    pitch: "",
    outline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.pitch) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `GUEST BLOGGING PITCH:\nAuthor: ${formData.name}\nEmail: ${formData.email}\nPortfolio: ${formData.portfolio}\nTopic: ${formData.pitch}\nOutline: ${formData.outline}`,
          tab: "write-for-us",
        }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.message || "Failed to submit pitch.");
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try emailing directly to editor.betterinsights@gmail.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <InnerPageHero
        eyebrow="CONTRIBUTE &amp; COLLABORATE"
        title="Looking for Guest Posting Opportunities?"
        description="Better Insights is accepting guest contributions from experienced marketers, engineers, and digital practitioners. Share your actionable insights, real-world experiments, and strategic analysis with our global executive audience."
        variant="dark"
        breadcrumb={[{ label: "Write For Us" }]}
      />

      {/* Direct Pitch Bar */}
      <section className="bg-[#1B1411] border-b border-white/10 py-5 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#33CC7A] animate-pulse" />
            <span className="text-white/80">
              Direct pitch to: <code className="bg-white/10 px-2.5 py-1 rounded-full text-white font-mono">editor.betterinsights@gmail.com</code>
            </span>
          </div>
          <a
            href="mailto:editor.betterinsights@gmail.com?subject=Guest%20Blogging%20on%20Better%20Insights"
            className="inline-flex items-center gap-2 px-5 py-2 bg-white text-[#1B1411] font-semibold text-xs rounded-full hover:bg-[#33CC7A] hover:text-[#1B1411] transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Editorial Pitch</span>
          </a>
        </div>
      </section>

      {/* Main Guidelines & Form Section */}
      <section className="py-20 sm:py-28 bg-[#FAF5F0] select-none text-[#1B1411]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* 3 Guidelines Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: What We Accept */}
            <div className="bg-white rounded-[1.75rem] border border-black/10 p-8 shadow-2xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF5F0] text-[#1B1411] border border-black/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                  <span>What We Accept</span>
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                  High-Impact Editorial Standards
                </h3>
                <ul className="space-y-3.5 text-xs text-[#1B1411]/75 leading-relaxed pt-2">
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">Original Ideas &amp; Case Evidence:</strong>
                    We only publish 100% original, plagiarism-free insights with firsthand experience or proprietary analysis.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">Core Industry Relevance:</strong>
                    Topics focused on AI solutions, SEO, conversion engineering, performance marketing, CRM, or web architecture.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">In-Depth Word Count:</strong>
                    Comprehensive articles ideally between 1,000 and 2,000 words that provide concrete, actionable value.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">Rich Supporting Media:</strong>
                    Relevant screenshots, diagrams, and data charts (with documented commercial or CC licensing rights).
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: What We Do Not Accept */}
            <div className="bg-white rounded-[1.75rem] border border-black/10 p-8 shadow-2xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF5F0] text-rose-700 border border-rose-200">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>What We Reject</span>
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                  Submissions We Will Decline
                </h3>
                <ul className="space-y-3.5 text-xs text-[#1B1411]/75 leading-relaxed pt-2">
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">Thin or Surface-Level Content:</strong>
                    Articles under 1,000 words or superficial listicles lacking technical depth.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">Sales Pitches &amp; Promo Pieces:</strong>
                    Direct promotional marketing, overt company PR, or undisclosed affiliate agendas.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">Restricted Topics &amp; Spam:</strong>
                    We strictly prohibit gambling, casinos, pay-day loans, adult content, or link-farming networks.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">Republished or Spun Content:</strong>
                    Articles published elsewhere or synthesized via repetitive, generic AI templates without human expertise.
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3: Submission Process */}
            <div className="bg-white rounded-[1.75rem] border border-black/10 p-8 shadow-2xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF5F0] text-[#1B1411] border border-black/10">
                  <Clock className="w-3.5 h-3.5 text-[#33CC7A]" />
                  <span>Submission Process</span>
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                  How to Submit Your Article
                </h3>
                <ol className="space-y-3.5 text-xs text-[#1B1411]/75 leading-relaxed pt-2">
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">1. Pitch Your Topic:</strong>
                    Send 2-3 specific article headlines and a short 3-sentence outline explaining the takeaway for readers.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">2. Email Format:</strong>
                    Send to <code className="text-[#1B1411] font-semibold">editor.betterinsights@gmail.com</code> with subject: <em>&ldquo;Guest Blogging on Better Insights&rdquo;</em>.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">3. Editorial Review:</strong>
                    Our editorial team reviews submissions within 5 business days and may suggest collaborative refinements.
                  </li>
                  <li>
                    <strong className="text-[#1B1411] block mb-0.5 font-semibold">4. Publication &amp; Attribution:</strong>
                    Approved pieces receive full author bio, social attribution, and distribution across our community channels.
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Submission Form + Ready to Share Callout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Ready to Share & Submission Guidelines */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-[1.75rem] border border-black/10 p-8 sm:p-10 shadow-2xs space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5F0] text-[#1B1411] text-[11px] font-semibold border border-black/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#33CC7A]" />
                  Editorial Collaboration
                </span>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif]">
                  Ready to share your insights?
                </h3>
                <p className="text-xs sm:text-sm text-[#1B1411]/70 leading-relaxed font-normal">
                  Ensure your submission adheres to all quality standards above before sending your draft or outline. We value deep domain expertise, concrete statistics, and actionable blueprints.
                </p>
                <div className="pt-2">
                  <a
                    href="mailto:editor.betterinsights@gmail.com?subject=Guest%20Blogging%20on%20Better%20Insights"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B1411] text-white text-xs font-semibold rounded-full hover:bg-[#33CC7A] hover:text-[#1B1411] transition-all shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Editorial Team</span>
                  </a>
                </div>
              </div>

              <div className="bg-[#1B1411] text-white rounded-[1.75rem] border border-white/10 p-8 space-y-3 relative overflow-hidden shadow-xl">
                <div 
                  className="absolute -top-24 -right-24 w-60 h-60 bg-[#33CC7A]/10 rounded-full blur-2xl pointer-events-none" 
                  aria-hidden="true" 
                />
                <div className="relative z-10 flex items-center gap-2 text-white/60 text-xs font-semibold">
                  <Sparkles className="w-4 h-4 text-[#33CC7A]" />
                  <span>Author Benefits</span>
                </div>
                <h4 className="relative z-10 text-base font-semibold tracking-tight text-white [font-family:'Host_Grotesk',sans-serif]">What You Gain as an Author</h4>
                <p className="relative z-10 text-xs text-white/70 leading-relaxed font-normal">
                  Reach our audience of enterprise leaders, CTOs, heads of growth, and software engineers. All accepted guest authors receive permanent contextual attribution, an author bio box, and social syndication.
                </p>
              </div>
            </div>

            {/* Right Column: Web Submission Form */}
            <div className="lg:col-span-7 bg-white rounded-[1.75rem] border border-black/10 p-8 sm:p-12 shadow-2xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                  <h3 className="text-2xl font-bold tracking-tight text-black">Editorial Pitch Received</h3>
                  <p className="text-xs sm:text-sm text-black/70 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in contributing to Better Insights. Our editorial team reviews submissions within 5 business days. If selected, we will reply with editorial feedback and next steps.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", portfolio: "", pitch: "", outline: "" });
                    }}
                    className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-black/90 transition-colors"
                  >
                    Submit Another Pitch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-black/10 pb-4 mb-2">
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#1B1411] [font-family:'Host_Grotesk',sans-serif] flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#33CC7A]" />
                      <span>Online Pitch Form</span>
                    </h3>
                    <p className="text-xs text-[#1B1411]/60 mt-1">
                      Prefer web submission? Fill in the details below to submit your pitch directly to our desk.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/70 mb-1">
                        Author Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Malhotra"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/15 rounded-xl text-xs text-[#1B1411] placeholder-black/30 focus:outline-none focus:border-[#33CC7A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/70 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. author@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/15 rounded-xl text-xs text-[#1B1411] placeholder-black/30 focus:outline-none focus:border-[#33CC7A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/70 mb-1">
                      Author Bio / Prior Writing Portfolio URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/... or personal blog"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/15 rounded-xl text-xs text-[#1B1411] placeholder-black/30 focus:outline-none focus:border-[#33CC7A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/70 mb-1">
                      Proposed Working Title &amp; Topic *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Architecting Autonomous Support Agents with Sub-Second Latency"
                      value={formData.pitch}
                      onChange={(e) => setFormData({ ...formData, pitch: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/15 rounded-xl text-xs text-[#1B1411] placeholder-black/30 focus:outline-none focus:border-[#33CC7A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1B1411]/70 mb-1">
                      3-Sentence Outline &amp; Key Takeaways
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the problem, the core solution/framework, and the concrete takeaway for the reader..."
                      value={formData.outline}
                      onChange={(e) => setFormData({ ...formData, outline: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF5F0] border border-black/15 rounded-xl text-xs text-[#1B1411] placeholder-black/30 focus:outline-none focus:border-[#33CC7A] resize-none"
                    />
                  </div>

                  {errorMsg && <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-[#33CC7A] text-[#1B1411] text-xs font-semibold rounded-full hover:bg-[#28a764] transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Pitch...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Editorial Pitch</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
