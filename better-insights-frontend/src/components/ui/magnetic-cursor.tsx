"use client";

import React, { useRef, useEffect, FC, ReactNode, useState, useCallback } from 'react';
import gsap from 'gsap';
import { vec2, Vector2 as Vec2 } from 'vecteur';
import { usePathname } from 'next/navigation';

export interface MagneticCursorProps {
  children: ReactNode;
  magneticFactor?: number;
  lerpAmount?: number;
  hoverPadding?: number;
  hoverAttribute?: string;
  cursorSize?: number;
  cursorColor?: string;
  blendMode?: 'difference' | 'exclusion' | 'normal' | 'screen' | 'overlay';
  cursorClassName?: string;
  shape?: 'circle' | 'square' | 'rounded-square';
  disableOnTouch?: boolean;
  speedMultiplier?: number;
  maxScaleX?: number;
  maxScaleY?: number;
  contrastBoost?: number;
}

interface CursorState {
  el: HTMLDivElement | null;
  pos: {
    current: Vec2;
    target: Vec2;
    previous: Vec2;
  };
  hover: { isHovered: boolean };
  isDetaching: boolean;
  isInitialized: boolean;
}

export const MagneticCursor: FC<MagneticCursorProps> = ({
  children,
  lerpAmount = 0.14,
  magneticFactor = 0.25,
  hoverPadding = 12,
  hoverAttribute = 'data-magnetic',
  cursorSize = 36, // Morgana Studios style organic blob stationary diameter
  cursorColor = '#ffffff', // Solid white fill
  blendMode = 'difference', // Clean inversion over both dark and light sections
  cursorClassName = '',
  shape = 'circle',
  disableOnTouch = true,
  speedMultiplier = 0.022,
  maxScaleX = 0.85, // Movement stretching up to ~1.85x
  maxScaleY = 0.35, // Perpendicular contraction down to ~0.65x
  contrastBoost = 1,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lensIconRef = useRef<SVGSVGElement>(null);
  const cursorStateRef = useRef<CursorState | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const pathname = usePathname();

  const boundElements = useRef<WeakSet<Element>>(new WeakSet());
  const cleanupsRef = useRef<(() => void)[]>([]);
  const isMagnifyingRef = useRef(false);

  // Active tracking of the currently hovered magnetic element & latest pointer position
  const currentHoveredElRef = useRef<HTMLElement | null>(null);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: -100, y: -100 });

  const configRef = useRef({
    magneticFactor,
    speedMultiplier,
    maxScaleX,
    maxScaleY,
    cursorSize,
    lerpAmount,
    hoverPadding,
  });

  useEffect(() => {
    configRef.current = {
      magneticFactor,
      speedMultiplier,
      maxScaleX,
      maxScaleY,
      cursorSize,
      lerpAmount,
      hoverPadding,
    };
  }, [magneticFactor, speedMultiplier, maxScaleX, maxScaleY, cursorSize, lerpAmount, hoverPadding]);

  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  // Quick setters for smooth 60fps transform updates
  const quickSettersRef = useRef<{
    setX: Function;
    setY: Function;
    setRotate: Function;
    setScaleX: Function;
    setScaleY: Function;
  } | null>(null);

  // Recovery function: instantly restores normal cursor tracking if a popup closes or element unmounts
  const recoverFromHover = useCallback((clientX?: number, clientY?: number) => {
    const state = cursorStateRef.current;
    const cursorEl = cursorRef.current;
    if (!state || !cursorEl) return;

    // 1. Reset hover flags
    state.hover.isHovered = false;
    state.isDetaching = false;

    // 2. Kill only obsolete cursor tweens
    gsap.killTweensOf(cursorEl);

    // 3. Reset previously hovered element if still present in DOM
    if (currentHoveredElRef.current) {
      gsap.killTweensOf(currentHoveredElRef.current);
      gsap.set(currentHoveredElRef.current, { x: 0, y: 0 });
      currentHoveredElRef.current = null;
    }

    // 4. Synchronize cursor position with latest pointer coordinates
    const targetX = clientX ?? lastPointerPos.current.x;
    const targetY = clientY ?? lastPointerPos.current.y;

    if (targetX >= 0 && targetY >= 0) {
      state.pos.current.set(targetX, targetY);
      state.pos.target.set(targetX, targetY);
      state.pos.previous.set(targetX, targetY);

      if (quickSettersRef.current) {
        quickSettersRef.current.setX(targetX);
        quickSettersRef.current.setY(targetY);
        quickSettersRef.current.setRotate(0);
        quickSettersRef.current.setScaleX(1);
        quickSettersRef.current.setScaleY(1);
      }
    }

    // 5. Restore normal cursor dimensions, shape, and color
    const { cursorSize } = configRef.current;
    gsap.to(cursorEl, {
      width: cursorSize,
      height: cursorSize,
      borderRadius: '53% 47% 52% 48% / 48% 53% 47% 52%',
      backgroundColor: cursorColor,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      opacity: 1,
      duration: 0.25,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    if (lensIconRef.current) {
      gsap.to(lensIconRef.current, { opacity: 0, scale: 0.7, duration: 0.2 });
    }
  }, [cursorColor]);

  // Main Cursor Physics, Velocity-based Stretching & Organic Silhouette
  useEffect(() => {
    if (disableOnTouch && isTouchDevice) return;
    const cursorEl = cursorRef.current;
    const lensIcon = lensIconRef.current;
    if (!cursorEl) return;

    gsap.set(cursorEl, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%',
      opacity: 0,
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const detachDuration = prefersReducedMotion ? 0.1 : 0.35;

    if (!cursorStateRef.current) {
      cursorStateRef.current = {
        el: cursorEl,
        pos: {
          current: vec2(-500, -500),
          target: vec2(-500, -500),
          previous: vec2(-500, -500),
        },
        hover: { isHovered: false },
        isDetaching: false,
        isInitialized: false,
      };
    }

    // High performance quickSetters
    const setX = gsap.quickSetter(cursorEl, 'x', 'px');
    const setY = gsap.quickSetter(cursorEl, 'y', 'px');
    const setRotate = gsap.quickSetter(cursorEl, 'rotate', 'deg');
    const setScaleX = gsap.quickSetter(cursorEl, 'scaleX');
    const setScaleY = gsap.quickSetter(cursorEl, 'scaleY');

    quickSettersRef.current = { setX, setY, setRotate, setScaleX, setScaleY };

    let currentAngle = 0;
    let currentScaleX = 1;
    let currentScaleY = 1;
    let time = 0;

    const update = () => {
      const state = cursorStateRef.current;
      if (!state || !state.isInitialized) return;

      // Fail-safe: if hover was marked true but the element was unmounted (e.g. popup closed)
      if (state.hover.isHovered) {
        const hoveredEl = currentHoveredElRef.current;
        if (!hoveredEl || !hoveredEl.isConnected || !document.contains(hoveredEl)) {
          recoverFromHover();
        }
        return;
      }

      const { speedMultiplier, maxScaleX, maxScaleY, lerpAmount } = configRef.current;
      const effectiveLerp = prefersReducedMotion ? 1 : lerpAmount;

      state.pos.current.lerp(state.pos.target, effectiveLerp);
      const delta = state.pos.current.clone().sub(state.pos.previous);
      state.pos.previous.copy(state.pos.current);

      setX(state.pos.current.x);
      setY(state.pos.current.y);

      // Organic fluid breathing when stationary (Morgana Studios organic liquid silhouette)
      time += 0.04;
      const rawSpeed = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
      const speed = rawSpeed * speedMultiplier;

      if (!isMagnifyingRef.current) {
        if (rawSpeed < 1.5) {
          // Subtle organic liquid deformation
          const r1 = 51 + Math.sin(time * 1.5) * 2.5;
          const r2 = 49 - Math.sin(time * 1.8) * 2.5;
          const r3 = 52 + Math.cos(time * 1.6) * 2;
          const r4 = 48 - Math.cos(time * 1.4) * 2;
          cursorEl.style.borderRadius = `${r1}% ${r2}% ${r3}% ${r4}% / ${r2}% ${r3}% ${r4}% ${r1}%`;
        } else {
          cursorEl.style.borderRadius = '50%';
        }
      }

      if (state.isDetaching) {
        currentScaleX += (1 - currentScaleX) * 0.22;
        currentScaleY += (1 - currentScaleY) * 0.22;
        setRotate(currentAngle);
        setScaleX(currentScaleX);
        setScaleY(currentScaleY);
      } else if (isMagnifyingRef.current) {
        currentScaleX += (1 - currentScaleX) * 0.25;
        currentScaleY += (1 - currentScaleY) * 0.25;
        setRotate(0);
        setScaleX(1);
        setScaleY(1);
      } else {
        // Direction angle interpolation with shortest angular distance
        if (rawSpeed > 0.6) {
          const targetAngle = Math.atan2(delta.y, delta.x) * (180 / Math.PI);
          const angleDiff = ((targetAngle - currentAngle + 540) % 360) - 180;
          currentAngle += angleDiff * 0.35;
        }

        // Fluid stretching along movement axis
        const targetScaleX = 1 + Math.min(speed, maxScaleX);
        // Perpendicular narrowing (constant volume fluid deformation)
        const targetScaleY = Math.max(0.42, 1 - Math.min(speed * 0.6, maxScaleY));

        // Subtle elastic easing & deformation
        currentScaleX += (targetScaleX - currentScaleX) * 0.22;
        currentScaleY += (targetScaleY - currentScaleY) * 0.22;

        setRotate(currentAngle);
        setScaleX(currentScaleX);
        setScaleY(currentScaleY);
      }
    };

    const initializePosition = (event: PointerEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;

      const x = event.clientX;
      const y = event.clientY;

      lastPointerPos.current = { x, y };
      state.pos.current.set(x, y);
      state.pos.target.set(x, y);
      state.pos.previous.set(x, y);
      state.isInitialized = true;

      setX(x);
      setY(y);
      gsap.to(cursorEl, { opacity: 1, duration: 0.25, overwrite: 'auto' });
    };

    const onPointerMove = (event: PointerEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;

      if (!state.isInitialized) {
        initializePosition(event);
      }

      // Always update global target coordinates
      lastPointerPos.current = { x: event.clientX, y: event.clientY };
      state.pos.target.set(event.clientX, event.clientY);

      // Fail-safe: If currently in hover mode, verify the hovered element is still attached and nearby
      if (state.hover.isHovered) {
        const hoveredEl = currentHoveredElRef.current;
        if (!hoveredEl || !hoveredEl.isConnected || !document.contains(hoveredEl)) {
          recoverFromHover(event.clientX, event.clientY);
        } else {
          // If mouse moved far beyond element bounds (e.g. popup closed or missed pointerleave)
          const rect = hoveredEl.getBoundingClientRect();
          const pad = configRef.current.hoverPadding * 2 + 25;
          if (
            event.clientX < rect.left - pad ||
            event.clientX > rect.right + pad ||
            event.clientY < rect.top - pad ||
            event.clientY > rect.bottom + pad
          ) {
            recoverFromHover(event.clientX, event.clientY);
          }
        }
      }

      const isInViewport =
        event.clientX >= 0 &&
        event.clientX <= window.innerWidth &&
        event.clientY >= 0 &&
        event.clientY <= window.innerHeight;

      gsap.to(cursorEl, { opacity: isInViewport ? 1 : 0, duration: 0.2, overwrite: 'auto' });

      // Check for magnifying glass targets (images, portfolio cards, media)
      const target = event.target as HTMLElement | null;
      if (target) {
        const isMagnifyTarget = target.closest(
          'img, picture, [data-magnify], [data-cursor="magnify"], [data-cursor="view"], .journal__thumb, .work-card, .case-study-thumb'
        );

        if (isMagnifyTarget && !isMagnifyingRef.current && !state.hover.isHovered) {
          isMagnifyingRef.current = true;
          gsap.to(cursorEl, {
            width: 68,
            height: 68,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            border: '1.5px solid rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(3px) contrast(1.2)',
            duration: 0.3,
            ease: 'power3.out',
            overwrite: 'auto',
          });
          if (lensIcon) {
            gsap.to(lensIcon, { opacity: 1, scale: 1, duration: 0.25, overwrite: 'auto' });
          }
        } else if (!isMagnifyTarget && isMagnifyingRef.current && !state.hover.isHovered) {
          isMagnifyingRef.current = false;
          const { cursorSize } = configRef.current;
          gsap.to(cursorEl, {
            width: cursorSize,
            height: cursorSize,
            backgroundColor: cursorColor,
            border: '0px solid transparent',
            backdropFilter: 'none',
            duration: 0.3,
            ease: 'power3.out',
            overwrite: 'auto',
          });
          if (lensIcon) {
            gsap.to(lensIcon, { opacity: 0, scale: 0.7, duration: 0.2, overwrite: 'auto' });
          }
        }

        // Subtle caret elongation over text
        const isTextContent =
          ['P', 'SPAN', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName) ||
          window.getComputedStyle(target).cursor === 'text';

        if (isTextContent && !state.hover.isHovered && !state.isDetaching && !isMagnifyingRef.current) {
          gsap.to(cursorEl, { scaleX: 0.45, scaleY: 1.4, duration: 0.25, overwrite: 'auto' });
        }
      }
    };

    const handleMouseLeave = () => gsap.to(cursorEl, { opacity: 0, duration: 0.25 });
    const handleMouseEnter = () => gsap.to(cursorEl, { opacity: 1, duration: 0.25 });

    // Handle global modal closure, tab blur, or Escape key
    const handleGlobalReset = () => {
      recoverFromHover();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        recoverFromHover();
      }
    };

    gsap.ticker.add(update);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('bi:cursor-reset', handleGlobalReset);
    window.addEventListener('bi:close-modal', handleGlobalReset);
    window.addEventListener('blur', handleGlobalReset);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('bi:cursor-reset', handleGlobalReset);
      window.removeEventListener('bi:close-modal', handleGlobalReset);
      window.removeEventListener('blur', handleGlobalReset);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('keydown', handleKeyDown);
      quickSettersRef.current = null;
    };
  }, [disableOnTouch, isTouchDevice, cursorColor, recoverFromHover]);

  // Magnetic Hover Attachment for elements marked with data-magnetic
  const bindMagneticElements = useCallback(() => {
    if (disableOnTouch && isTouchDevice) return;
    const cursorEl = cursorRef.current;
    const lensIcon = lensIconRef.current;
    if (!cursorEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const detachDuration = prefersReducedMotion ? 0.1 : 0.35;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(`[${hoverAttribute}]`));

    elements.forEach((el) => {
      if (boundElements.current.has(el)) return;
      boundElements.current.add(el);

      const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.3)' });

      let initialCenterX = 0;
      let initialCenterY = 0;

      const handlePointerEnter = () => {
        const state = cursorStateRef.current;
        if (!state) return;
        const { magneticFactor, hoverPadding } = configRef.current;

        currentHoveredElRef.current = el;
        state.hover.isHovered = true;
        state.isDetaching = false;

        const bounds = el.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el);
        const magneticColor = el.getAttribute('data-magnetic-color') || cursorColor;
        const dynamicPadding = hoverPadding * (1 + magneticFactor);

        initialCenterX = bounds.left + bounds.width / 2;
        initialCenterY = bounds.top + bounds.height / 2;

        if (lensIcon) {
          gsap.to(lensIcon, { opacity: 0, duration: 0.15 });
        }

        gsap.killTweensOf(cursorEl);
        gsap.to(cursorEl, {
          x: initialCenterX,
          y: initialCenterY,
          width: bounds.width + dynamicPadding * 2,
          height: bounds.height + dynamicPadding * 2,
          borderRadius: computedStyle.borderRadius || '50%',
          backgroundColor: magneticColor,
          border: '0px solid transparent',
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      const handlePointerLeave = () => {
        const state = cursorStateRef.current;
        if (!state) return;

        if (currentHoveredElRef.current === el) {
          currentHoveredElRef.current = null;
        }

        xTo(0);
        yTo(0);

        const currentX = (gsap.getProperty(cursorEl, 'x') as number) || initialCenterX;
        const currentY = (gsap.getProperty(cursorEl, 'y') as number) || initialCenterY;

        state.pos.current.set(currentX, currentY);
        state.pos.previous.set(currentX, currentY);

        state.hover.isHovered = false;
        state.isDetaching = true;

        const { cursorSize } = configRef.current;

        gsap.killTweensOf(cursorEl);
        gsap.to(cursorEl, {
          width: cursorSize,
          height: cursorSize,
          borderRadius: '53% 47% 52% 48% / 48% 53% 47% 52%',
          backgroundColor: cursorColor,
          scaleX: 1,
          scaleY: 1,
          rotate: 0,
          duration: detachDuration,
          ease: 'power3.out',
          overwrite: 'auto',
          onComplete: () => {
            if (state) state.isDetaching = false;
          },
        });

        // Safety fallback timer to prevent detaching state lock
        setTimeout(() => {
          if (state) state.isDetaching = false;
        }, (detachDuration + 0.1) * 1000);
      };

      let rafId: number | null = null;
      const handlePointerMove = (event: PointerEvent) => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const { magneticFactor } = configRef.current;
          const offsetX = (event.clientX - initialCenterX) * magneticFactor;
          const offsetY = (event.clientY - initialCenterY) * magneticFactor;
          xTo(offsetX);
          yTo(offsetY);
          rafId = null;
        });
      };

      el.addEventListener('pointerenter', handlePointerEnter);
      el.addEventListener('pointerleave', handlePointerLeave);
      el.addEventListener('pointermove', handlePointerMove);

      cleanupsRef.current.push(() => {
        el.removeEventListener('pointerenter', handlePointerEnter);
        el.removeEventListener('pointerleave', handlePointerLeave);
        el.removeEventListener('pointermove', handlePointerMove);
      });
    });
  }, [disableOnTouch, isTouchDevice, hoverAttribute, cursorColor]);

  // Bind on route changes & dynamic DOM mutations
  useEffect(() => {
    bindMagneticElements();

    const observer = new MutationObserver(() => {
      // If hovered element was removed in DOM mutation, recover instantly
      const state = cursorStateRef.current;
      if (state && state.hover.isHovered && currentHoveredElRef.current) {
        if (!currentHoveredElRef.current.isConnected || !document.contains(currentHoveredElRef.current)) {
          recoverFromHover();
        }
      }
      bindMagneticElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanupsRef.current.forEach((fn) => fn());
      cleanupsRef.current = [];
    };
  }, [pathname, bindMagneticElements, recoverFromHover]);

  if (disableOnTouch && isTouchDevice) return <>{children}</>;

  const styles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999999,
    pointerEvents: 'none',
    willChange: 'transform, width, height, border-radius',
    backgroundColor: cursorColor,
    mixBlendMode: blendMode as any,
    width: cursorSize,
    height: cursorSize,
    borderRadius: '53% 47% 52% 48% / 48% 53% 47% 52%', // Organic water droplet silhouette
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.25s ease, border 0.25s ease',
  };

  return (
    <>
      <div ref={cursorRef} className={`magnetic-cursor ${cursorClassName}`} style={styles}>
        {/* Magnifying glass icon: fades in over images & project media */}
        <svg
          ref={lensIconRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            width: 22,
            height: 22,
            opacity: 0,
            transform: 'scale(0.7)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7.5" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
      </div>
      {children}
    </>
  );
};

export default MagneticCursor;
