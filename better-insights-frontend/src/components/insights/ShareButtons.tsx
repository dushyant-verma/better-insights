"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] font-mono text-black/50 uppercase tracking-wider mr-1 hidden sm:inline">
        Share:
      </span>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-8 h-8 rounded-full border border-black/10 hover:border-black/40 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 transition-all bi-focus-ring"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      </a>

      {/* X / Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="w-8 h-8 rounded-full border border-black/10 hover:border-black/40 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 transition-all bi-focus-ring"
      >
        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>

      {/* Copy link */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy article link"
        className="relative w-8 h-8 rounded-full border border-black/10 hover:border-black/40 flex items-center justify-center text-black/70 hover:text-black hover:bg-black/5 transition-all bi-focus-ring"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-black font-bold" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}

        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black text-white text-[10px] font-mono rounded shadow">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}
