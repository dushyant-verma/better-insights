"use client";

import React from "react";
import { Phone, Mail, MapPin, MessageSquare, Clock, Globe } from "lucide-react";

export function ContactWays() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF5F0] border-b border-black/8 select-none" aria-label="Contact Information">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#66574F] block mb-3">
            Direct Communication
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1B1411] leading-tight">
            Connect with our leadership
          </h2>
          <p className="mt-4 text-base text-[#66574F] font-normal leading-relaxed">
            Reach out directly across any of our primary channels. We ensure prompt, thoughtful responses to all business inquiries and technical partnership proposals.
          </p>
        </div>

        {/* Primary Contact Ways Grid */}
        <div id="contact" className="bg-white rounded-[1.75rem] p-8 sm:p-12 lg:p-14 border border-black/8 shadow-sm mb-8">
          <ul className="contact__ways">
            
            {/* Call / WhatsApp */}
            <li>
              <div className="flex items-center gap-2 mb-1">
                <Phone className="w-4 h-4 text-[#33CC7A] shrink-0" />
                <p className="contact__way-label text-[#66574F]">Call / Phone Line</p>
              </div>
              <a href="tel:+919509996730" className="contact__way-value text-[#1B1411] hover:text-[#33CC7A] transition-colors">
                +91 950 999 6730
              </a>
              <span className="text-xs text-[#66574F]/70 font-mono">Mon – Fri, 9:30 AM – 6:30 PM IST</span>
            </li>

            {/* Email */}
            <li>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-[#33CC7A] shrink-0" />
                <p className="contact__way-label text-[#66574F]">Email Inquiries</p>
              </div>
              <a href="mailto:contact@betterinsights.in" className="contact__way-value text-[#1B1411] hover:text-[#33CC7A] transition-colors">
                contact@betterinsights.in
              </a>
              <span className="text-xs text-[#66574F]/70 font-mono">Direct routing to practice leads</span>
            </li>

            {/* Corporate Office */}
            <li>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-[#33CC7A] shrink-0" />
                <p className="contact__way-label text-[#66574F]">Corporate Office</p>
              </div>
              <address className="contact__way-value text-[#1B1411] not-italic">
                Pune, Maharashtra, India
              </address>
              <span className="text-xs text-[#66574F]/70 font-mono">Clover Hills Plaza, Kondhwa</span>
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
            className="contact-card p-6 bg-white rounded-[1.75rem] border border-black/8 flex items-center justify-between group shadow-sm hover:border-black/20 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#33CC7A]/15 text-[#1B1411] flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5 text-[#33CC7A]" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#66574F] block">Instant Chat</span>
                <span className="text-sm font-semibold text-[#1B1411] group-hover:text-[#33CC7A] transition-colors">WhatsApp Us Directly</span>
              </div>
            </div>
            <span className="text-xs font-mono text-[#66574F] group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>

          {/* Full Address Details */}
          <div className="p-6 bg-white rounded-[1.75rem] border border-black/8 flex items-start gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5F0] text-[#1B1411] flex items-center justify-center shrink-0 mt-0.5">
              <Globe className="w-5 h-5 text-[#33CC7A]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#66574F] block">Registered Address</span>
              <p className="text-xs text-[#66574F] leading-relaxed mt-1 font-normal">
                Office No. 828, Clover Hills Plaza, Undri Pisoli Rd, Kondhwa, Pune - 411048
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="p-6 bg-white rounded-[1.75rem] border border-black/8 flex items-start gap-4 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF5F0] text-[#1B1411] flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5 text-[#33CC7A]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#66574F] block">Operational Hours</span>
              <p className="text-xs text-[#66574F] leading-relaxed mt-1 font-normal">
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
