"use client";

import React, { useState } from "react";
import { Link2, Check } from "lucide-react";

interface BlogSocialShareProps {
  url: string;
  title: string;
  layout?: "vertical" | "horizontal";
}

/**
 * Custom SVG icons for LinkedIn, X (Twitter), Facebook
 */
function LinkedInIcon({ className = "w-4 h-4 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.28a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
    </svg>
  );
}

function XIcon({ className = "w-3.5 h-3.5 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function BlogSocialShare({ url, title, layout = "vertical" }: BlogSocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch (err) {
      console.warn("Failed to copy link:", err);
    }
  };

  const openShare = (shareUrl: string) => {
    if (typeof window !== "undefined") {
      window.open(shareUrl, "_blank", "width=600,height=500,scrollbars=yes,resizable=yes");
    }
  };

  if (layout === "horizontal") {
    return (
      <div className="flex items-center gap-2.5">
        <span className="text-xs text-neutral-400 font-light mr-1">Share</span>
        
        <button
          onClick={() => openShare(shareLinks.linkedin)}
          type="button"
          aria-label="Share on LinkedIn"
          className="w-8 h-8 rounded-full bg-[#CBFC6B] text-black flex items-center justify-center hover:scale-105 transition-transform"
        >
          <LinkedInIcon className="w-3.5 h-3.5 fill-black" />
        </button>

        <button
          onClick={() => openShare(shareLinks.x)}
          type="button"
          aria-label="Share on X"
          className="w-8 h-8 rounded-full bg-[#CBFC6B] text-black flex items-center justify-center hover:scale-105 transition-transform"
        >
          <XIcon className="w-3 h-3 fill-black" />
        </button>

        <button
          onClick={() => openShare(shareLinks.facebook)}
          type="button"
          aria-label="Share on Facebook"
          className="w-8 h-8 rounded-full bg-[#CBFC6B] text-black flex items-center justify-center hover:scale-105 transition-transform"
        >
          <FacebookIcon className="w-3.5 h-3.5 fill-black" />
        </button>

        <button
          onClick={handleCopy}
          type="button"
          aria-label="Copy article link"
          className="relative w-8 h-8 rounded-full bg-[#CBFC6B] text-black flex items-center justify-center hover:scale-105 transition-transform"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Link2 className="w-3.5 h-3.5 text-black" />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center select-none">
      <div className="text-xs text-neutral-400 font-light mb-2.5 tracking-wide">
        Share
      </div>

      <div className="flex flex-col items-center space-y-3">
        {/* LinkedIn */}
        <button
          onClick={() => openShare(shareLinks.linkedin)}
          type="button"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
          className="w-9 h-9 rounded-full bg-[#CBFC6B] text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_14px_rgba(203,252,107,0.45)] transition-all duration-200"
        >
          <LinkedInIcon className="w-4 h-4 fill-black" />
        </button>

        {/* X / Twitter */}
        <button
          onClick={() => openShare(shareLinks.x)}
          type="button"
          title="Share on X"
          aria-label="Share on X"
          className="w-9 h-9 rounded-full bg-[#CBFC6B] text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_14px_rgba(203,252,107,0.45)] transition-all duration-200"
        >
          <XIcon className="w-3.5 h-3.5 fill-black" />
        </button>

        {/* Facebook */}
        <button
          onClick={() => openShare(shareLinks.facebook)}
          type="button"
          title="Share on Facebook"
          aria-label="Share on Facebook"
          className="w-9 h-9 rounded-full bg-[#CBFC6B] text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_14px_rgba(203,252,107,0.45)] transition-all duration-200"
        >
          <FacebookIcon className="w-4 h-4 fill-black" />
        </button>

        {/* Copy Link */}
        <div className="relative">
          <button
            onClick={handleCopy}
            type="button"
            title="Copy link"
            aria-label="Copy link"
            className="w-9 h-9 rounded-full bg-[#CBFC6B] text-black flex items-center justify-center hover:scale-110 hover:shadow-[0_0_14px_rgba(203,252,107,0.45)] transition-all duration-200"
          >
            {copied ? (
              <Check className="w-4 h-4 text-black animate-scale" />
            ) : (
              <Link2 className="w-4 h-4 text-black" />
            )}
          </button>

          {/* Copied tooltip bubble */}
          {copied && (
            <div className="absolute right-full mr-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-white text-black text-[11px] font-semibold rounded-md shadow-lg whitespace-nowrap pointer-events-none animate-bi-fade-in-up">
              Copied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
