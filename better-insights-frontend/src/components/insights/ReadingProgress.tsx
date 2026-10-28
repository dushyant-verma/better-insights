"use client";

import React, { useEffect, useState } from "react";

export function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const currentProgress = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setCompletion(Math.min(100, Math.max(0, Number((currentProgress / scrollHeight).toFixed(2)) * 100)));
      }
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="bi-reading-progress-bar"
      style={{ width: `${completion}%` }}
      aria-hidden="true"
    />
  );
}
