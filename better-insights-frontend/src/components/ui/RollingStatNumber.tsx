"use client";

import React from "react";

interface RollingDigitProps {
  targetDigit: number;
  digitIndex: number;
  cardIndex: number;
  isAnimated: boolean;
}

function RollingDigit({
  targetDigit,
  digitIndex,
  cardIndex,
  isAnimated,
}: RollingDigitProps) {
  // Mechanical odometer simulation:
  // Units (digitIndex > 0) roll 2 full cycles; higher order digits roll 1 cycle
  const cycles = digitIndex === 0 ? 1 : 2;

  // Build strip of digits: repeated 0-9 cycles, plus landing 0..targetDigit
  const strip: number[] = [];
  for (let c = 0; c < cycles; c++) {
    for (let n = 0; n <= 9; n++) {
      strip.push(n);
    }
  }
  for (let n = 0; n <= targetDigit; n++) {
    strip.push(n);
  }

  const targetIndex = strip.length - 1;

  // Stagger calculations: card delay + subtle digit offset
  const baseDelay = cardIndex * 0.14;
  const delay = baseDelay + digitIndex * 0.08;
  const duration = 2.1 + digitIndex * 0.12; // 2.1s - 2.22s smooth duration

  return (
    <span className="who-odometer-col" aria-hidden="true">
      {/* Invisible spacer reserving exact layout dimensions to prevent layout shifts */}
      <span className="who-odometer-spacer">{targetDigit}</span>

      {/* Moving vertical strip of digits */}
      <span
        className="who-odometer-strip"
        style={{
          transform: isAnimated ? `translateY(-${targetIndex}em)` : "translateY(0em)",
          transition: isAnimated
            ? `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
            : "none",
        }}
      >
        {strip.map((digit, idx) => (
          <span key={idx} className="who-odometer-digit">
            {digit}
          </span>
        ))}
      </span>
    </span>
  );
}

export interface RollingStatNumberProps {
  value: number | string;
  symbol?: string;
  isAnimated: boolean;
  cardIndex?: number;
  className?: string;
}

export function RollingStatNumber({
  value,
  symbol,
  isAnimated,
  cardIndex = 0,
  className = "",
}: RollingStatNumberProps) {
  const chars = String(value).split("");

  return (
    <div
      className={`who-stat-number flex items-baseline select-none ${className}`}
      aria-label={`${value}${symbol || ""}`}
      role="text"
    >
      <div className="inline-flex items-baseline overflow-hidden">
        {chars.map((char, cIdx) => {
          if (/\d/.test(char)) {
            return (
              <RollingDigit
                key={cIdx}
                targetDigit={parseInt(char, 10)}
                digitIndex={cIdx}
                cardIndex={cardIndex}
                isAnimated={isAnimated}
              />
            );
          }
          return (
            <span key={cIdx} className="who-odometer-char" aria-hidden="true">
              {char}
            </span>
          );
        })}
      </div>
      {symbol && (
        <span className="who-stat-symbol text-[#CBFC6B] ml-0.5 sm:ml-1" aria-hidden="true">
          {symbol}
        </span>
      )}
    </div>
  );
}

