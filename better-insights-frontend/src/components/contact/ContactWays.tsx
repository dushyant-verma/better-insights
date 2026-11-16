"use client";

import React from "react";
import { Phone, Mail, MapPin, MessageSquare, Clock, Globe } from "lucide-react";

export function ContactWays() {
  return (
    <section
      id="contact-ways"
      className="py-20 sm:py-28 bg-[#0E0F10] border-t border-white/10 select-none text-white scroll-mt-28"
      aria-label="Direct Communication and Contact Information"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CBFC6B]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#CBFC6B]">
              Direct Communication
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-white leading-tight [font-family:'Host_Grotesk',sans-serif]">
            Connect with our leadership
          </h2>
          <p className="mt-4 text-base text-neutral-400 font-light leading-relaxed">
            Reach out directly across any of our primary channels. We ensure prompt, thoughtful responses to all business inquiries and technical partnership proposals.
          </p>
        </div>

        {/* Primary Contact Ways Grid Card */}
        <div
          id="leadership-contact-card"
          className="bg-[#141518] rounded-[1.75rem] p-8 sm:p-12 lg:p-14 border border-white/10 shadow-xl mb-8"
        >
          <ul className="contact__ways !text-white">

            {/* Call / Phone Line */}
            <li>
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-[#CBFC6B] shrink-0" />
                <p className="contact__way-label !text-neutral-300">Call / Phone Line</p>
              </div>
              <a
                href="tel:+919509996730"
                className="contact__way-value !text-white hover:!text-[#CBFC6B] transition-colors"
                style={{ color: "#FFFFFF" }}
              >
                +91 950 999 6730
              </a>
              <span className="text-xs text-neutral-400 font-mono">Mon – Fri, 9:30 AM – 6:30 PM IST</span>
            </li>

            {/* Email Inquiries */}
            <li>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-[#CBFC6B] shrink-0" />
                <p className="contact__way-label !text-neutral-300">Email Inquiries</p>
              </div>
              <a
                href="mailto:contact@betterinsights.in"
                className="contact__way-value !text-white hover:!text-[#CBFC6B] transition-colors"
                style={{ color: "#FFFFFF" }}
              >
                contact@betterinsights.in
              </a>
              <span className="text-xs text-neutral-400 font-mono">Direct routing to practice leads</span>
            </li>

            {/* Corporate Office */}
            <li>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#CBFC6B] shrink-0" />
                <p className="contact__way-label !text-neutral-300">Corporate Office</p>
              </div>
              <address className="contact__way-value not-italic !text-white" style={{ color: "#FFFFFF" }}>
                Pune, Maharashtra, India
              </address>
              <span className="text-xs text-neutral-400 font-mono">Clover Hills Plaza, Kondhwa</span>
            </li>

          </ul>
        </div>

        {/* Quick Connection Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* WhatsApp Direct */}
          <a
            href="https://api.whatsapp.com/send?phone=919509996730"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card p-6 bg-[#141518] rounded-[1.75rem] border border-white/10 flex items-center justify-between group shadow-sm hover:border-[#CBFC6B]/40 hover:bg-[#18191D] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#CBFC6B]/15 text-[#CBFC6B] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-[#CBFC6B]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">Instant Chat</span>
                <span className="text-sm font-semibold text-white group-hover:text-[#CBFC6B] transition-colors">WhatsApp Us Directly</span>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-400 group-hover:text-[#CBFC6B] group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>

          {/* Full Registered Address Details */}
          <div className="p-6 bg-[#141518] rounded-[1.75rem] border border-white/10 flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#CBFC6B] flex items-center justify-center shrink-0 mt-0.5">
              <Globe className="w-5 h-5 text-[#CBFC6B]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">Registered Address</span>
              <p className="text-xs text-neutral-300 leading-relaxed mt-1 font-light">
                Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa, Pune - 411048
              </p>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="p-6 bg-[#141518] rounded-[1.75rem] border border-white/10 flex items-start gap-4 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#CBFC6B] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5 text-[#CBFC6B]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">Operational Hours</span>
              <p className="text-xs text-neutral-300 leading-relaxed mt-1 font-light">
                Monday through Friday<br />
                9:30 AM to 6:30 PM (IST / UTC +5:30)
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
