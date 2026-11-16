"use client";

import React, { useRef, useEffect, FC, ReactNode, useState, useCallback } from 'react';
import gsap from 'gsap';
import { vec2, Vector2 as Vec2 } from 'vecteur';

export interface MagneticCursorProps {
  children?: ReactNode;
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
  isInitialized: boolean;
}

export const MagneticCursor: FC<MagneticCursorProps> = ({
  children = null,
  cursorClassName = '',
  disableOnTouch = true,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);
  const cursorStateRef = useRef<CursorState | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isImageCursorRef = useRef(false);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: -200, y: -200 });

  // Quick setters for smooth 60fps transform updates
  const quickSettersRef = useRef<{
    setX: Function;
    setY: Function;
  } | null>(null);

  useEffect(() => {
    const checkTouch = () => {
      return (
        window.matchMedia('(hover: none)').matches ||
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth <= 1024
      );
    };

    setIsTouchDevice(checkTouch());

    const handleResize = () => {
      setIsTouchDevice(checkTouch());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if target is a clickable image, image link, or media card
  const isImageTarget = useCallback((target: HTMLElement | null): boolean => {
    if (!target || typeof target.closest !== 'function') return false;

    // Never show custom cursor on header, nav, footer, or explicit inputs
    if (
      target.closest(
        'header, nav, .site-header, [data-cursor="default"], [data-cursor="none"], [data-cursor="auto"], input, textarea, select'
      )
    ) {
      return false;
    }

    // Explicit image cursor triggers
    if (
      target.closest(
        '[data-cursor-image], [data-cursor="arrow"], [data-cursor="view"], .blog-slider-thumb, .work-card, .portfolio-card, .case-study-thumb, .journal__thumb, .js-cursor-trigger-drag'
      )
    ) {
      return true;
    }

    // Clickable parent: links, buttons, role="button", or elements with onClick
    const clickableParent = target.closest('a[href], button:not([disabled]), [role="button"]');
    if (clickableParent) {
      // If target itself is an image or image wrapper
      if (
        target.tagName === 'IMG' ||
        target.tagName === 'PICTURE' ||
        Boolean(target.closest('img, picture, [data-card-image]'))
      ) {
        return true;
      }
      // If clickable parent contains an image
      if (clickableParent.querySelector('img, picture')) {
        return true;
      }
    }

    return false;
  }, []);

  // Main Cursor physics & smooth tracking
  useEffect(() => {
    if (disableOnTouch && isTouchDevice) return;
    const cursorEl = cursorRef.current;
    const arrowIcon = arrowIconRef.current;
    if (!cursorEl) return;

    gsap.set(cursorEl, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: '50% 50%',
      opacity: 0,
      scale: 0.4,
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!cursorStateRef.current) {
      cursorStateRef.current = {
        el: cursorEl,
        pos: {
          current: vec2(-500, -500),
          target: vec2(-500, -500),
          previous: vec2(-500, -500),
        },
        isInitialized: false,
      };
    }

    const setX = gsap.quickSetter(cursorEl, 'x', 'px');
    const setY = gsap.quickSetter(cursorEl, 'y', 'px');
    quickSettersRef.current = { setX, setY };

    const update = () => {
      const state = cursorStateRef.current;
      if (!state || !state.isInitialized) return;

      const effectiveLerp = prefersReducedMotion ? 1 : 0.2;
      state.pos.current.lerp(state.pos.target, effectiveLerp);
      state.pos.previous.copy(state.pos.current);

      setX(state.pos.current.x);
      setY(state.pos.current.y);
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
    };

    const onPointerMove = (event: PointerEvent) => {
      const state = cursorStateRef.current;
      if (!state) return;

      if (!state.isInitialized) {
        initializePosition(event);
      }

      lastPointerPos.current = { x: event.clientX, y: event.clientY };
      state.pos.target.set(event.clientX, event.clientY);

      const target = event.target as HTMLElement | null;
      const isEligible = isImageTarget(target);

      if (isEligible) {
        if (!isImageCursorRef.current) {
          isImageCursorRef.current = true;
          gsap.killTweensOf(cursorEl);
          gsap.to(cursorEl, {
            opacity: 1,
            scale: 1,
            width: 96,
            height: 96,
            borderRadius: '50%',
            backgroundColor: '#C8FF66',
            boxShadow: '0 10px 30px rgba(200, 255, 102, 0.42)',
            duration: 0.25,
            ease: 'power3.out',
            overwrite: 'auto',
          });
          if (arrowIcon) {
            gsap.killTweensOf(arrowIcon);
            gsap.to(arrowIcon, {
              opacity: 1,
              scale: 1,
              duration: 0.22,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          }
        }
      } else {
        if (isImageCursorRef.current) {
          isImageCursorRef.current = false;
          gsap.killTweensOf(cursorEl);
          gsap.to(cursorEl, {
            opacity: 0,
            scale: 0.4,
            duration: 0.2,
            ease: 'power2.in',
            overwrite: 'auto',
          });
          if (arrowIcon) {
            gsap.killTweensOf(arrowIcon);
            gsap.to(arrowIcon, {
              opacity: 0,
              scale: 0.5,
              duration: 0.16,
              ease: 'power2.in',
              overwrite: 'auto',
            });
          }
        }
      }
    };

    const handleMouseLeave = () => {
      isImageCursorRef.current = false;
      gsap.killTweensOf(cursorEl);
      gsap.to(cursorEl, { opacity: 0, scale: 0.4, duration: 0.2, overwrite: 'auto' });
      if (arrowIcon) {
        gsap.killTweensOf(arrowIcon);
        gsap.to(arrowIcon, { opacity: 0, scale: 0.5, duration: 0.16, overwrite: 'auto' });
      }
    };

    const handleGlobalReset = () => {
      isImageCursorRef.current = false;
      gsap.killTweensOf(cursorEl);
      gsap.to(cursorEl, { opacity: 0, scale: 0.4, duration: 0.2, overwrite: 'auto' });
      if (arrowIcon) {
        gsap.killTweensOf(arrowIcon);
        gsap.to(arrowIcon, { opacity: 0, scale: 0.5, duration: 0.16, overwrite: 'auto' });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleGlobalReset();
      }
    };

    gsap.ticker.add(update);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('bi:cursor-reset', handleGlobalReset);
    window.addEventListener('bi:close-modal', handleGlobalReset);
    window.addEventListener('blur', handleGlobalReset);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('bi:cursor-reset', handleGlobalReset);
      window.removeEventListener('bi:close-modal', handleGlobalReset);
      window.removeEventListener('blur', handleGlobalReset);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
      quickSettersRef.current = null;
      if (cursorEl) {
        gsap.killTweensOf(cursorEl);
      }
    };
  }, [disableOnTouch, isTouchDevice, isImageTarget]);

  if (disableOnTouch && isTouchDevice) return children ? <>{children}</> : null;

  const styles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999999,
    pointerEvents: 'none',
    willChange: 'transform, opacity',
    backgroundColor: '#C8FF66',
    width: 96,
    height: 96,
    borderRadius: '50%',
    display: isTouchDevice ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  };

  return (
    <>
      <div ref={cursorRef} key="bi-magnetic-cursor-el" className={`magnetic-cursor ${cursorClassName}`} style={styles}>
        {/* MadeByShape Custom Northeast Arrow Icon: centered black arrow over #C8FF66 circle */}
        <svg
          ref={arrowIconRef}
          viewBox="0 0 384 512"
          className="fill-black"
          style={{
            width: 38,
            height: 38,
            opacity: 0,
            transform: 'scale(0.6)',
            pointerEvents: 'none',
            display: 'block',
          }}
          aria-hidden="true"
        >
          <path d="M344 96c4.4 0 8 3.6 8 8v240c0 4.4-3.6 8-8 8s-8-3.6-8-8V123.3L45.7 413.7c-3.1 3.1-8.2 3.1-11.3 0s-3.1-8.2 0-11.3L324.7 112H104c-4.4 0-8-3.6-8-8s3.6-8 8-8h240z" />
        </svg>
      </div>
      {children}
    </>
  );
};

export default MagneticCursor;
