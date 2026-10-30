"use client";

import React from "react";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import { ArrowUpRight, Menu } from "lucide-react";

export function MagneticCursorDemo() {
  return (
    <MagneticCursor
      magneticFactor={0.55}
      blendMode="exclusion"
      cursorSize={40}
    >
      <div className="relative w-full h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary selection:text-background flex flex-col">
        
        {/* Subtle Grid Background using CSS Variables from your config */}
        <div 
            className="absolute inset-0 z-0 opacity-80 pointer-events-none" 
            style={{ 
                backgroundImage: `linear-gradient(var(--color-border, #e5e5e5) 1px, transparent 1px), linear-gradient(90deg, var(--color-border, #e5e5e5) 1px, transparent 1px)`, 
                backgroundSize: '40px 40px' 
            }} 
        />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between p-8 md:p-12">
          <div data-magnetic className="text-xl font-bold tracking-tighter mix-blend-difference cursor-pointer">
            21st.dev
          </div>
          
          <button
            type="button"
            data-magnetic
            className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-2 border-border bg-secondary backdrop-blur-sm transition-colors hover:bg-secondary cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6 stroke-1 pointer-events-none text-foreground" />
          </button>
        </header>

        {/* Main Content */}
        <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-12 p-6">
          
          {/* Typography Section */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9]">
              Fluid <br />
              <span className="text-muted-foreground opacity-60">Interaction</span>
            </h1>
          </div>

          {/* The "Killer Feature" Demo Block: High Contrast Test */}
          {/* Using bg-primary (White in dark mode) to contrast against bg-background (Black in dark mode) */}
          <div 
            data-magnetic
            className="relative flex h-32 w-full max-w-sm items-center justify-between overflow-hidden rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-8 shadow-2xl transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-widest opacity-60">
                Try Hovering
              </span>
              <span className="text-2xl font-bold tracking-tight">
                Smart Contrast
              </span>
            </div>
            {/* Inverted icon circle */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white">
               <ArrowUpRight className="h-5 w-5 pointer-events-none" />
            </div>
          </div>

          <p className="max-w-md text-center text-sm text-muted-foreground opacity-75 leading-relaxed">
            A physics-based cursor wrapper that handles velocity, magnetic snapping, and auto-contrast inversion.
          </p>

        </main>

        {/* Footer */}
        <footer className="relative z-10 flex w-full justify-between p-8 text-xs text-muted-foreground opacity-60 md:p-12 uppercase tracking-widest">
          <span>GSAP Power</span>
          <span>Vecteur Physics</span>
        </footer>
      </div>
    </MagneticCursor>
  );
}

export default MagneticCursorDemo;
