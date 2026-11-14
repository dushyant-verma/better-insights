"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, ArrowRight, Loader2 } from "lucide-react";
import "@/styles/blob-button.css";

export interface BlobButtonProps {
  children?: React.ReactNode;
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "sm" | "md" | "lg";
  icon?: "arrow-up-right" | "arrow-down" | "arrow-right" | "none" | React.ReactNode;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  id?: string;
  style?: React.CSSProperties;
}

export const BlobButton = React.forwardRef<HTMLElement, BlobButtonProps>(
  (
    {
      children,
      label,
      href,
      onClick,
      type = "button",
      className = "",
      size = "md",
      icon = "arrow-up-right",
      variant = "primary",
      fullWidth = false,
      disabled = false,
      loading = false,
      target,
      rel,
      ariaLabel,
      id,
      style,
      ...restProps
    },
    ref
  ) => {
    const isArrowDown = icon === "arrow-down";
    const isArrowRight = icon === "arrow-right";
    const hasArrow = icon !== "none";
    const isDisabled = disabled || loading;

    const dataArrow = isArrowDown ? "down" : isArrowRight ? "right" : "up-right";

    const combinedClassName = [
      "bi-blob-btn",
      `bi-blob-btn--${size}`,
      `bi-blob-btn--${variant}`,
      fullWidth ? "bi-blob-btn--full" : "",
      loading ? "is-loading" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const renderIcon = () => {
      if (!hasArrow) return null;
      if (loading) {
        return <Loader2 className="bi-blob-btn-arrow-icon animate-spin" />;
      }
      if (React.isValidElement(icon)) {
        return icon;
      }
      if (isArrowDown) {
        return <ArrowDown className="bi-blob-btn-arrow-icon stroke-[2.5]" />;
      }
      if (isArrowRight) {
        return <ArrowRight className="bi-blob-btn-arrow-icon stroke-[2.5]" />;
      }
      return <ArrowUpRight className="bi-blob-btn-arrow-icon stroke-[2.5]" />;
    };

    const displayText = label || children;

    const content = (
      <>
        {/* Gooey filter container: fuses the text pill with the resting circle blob */}
        <div className="bi-blob-btn-filter" style={{ filter: "url(#biButtonFilter)" }}>
          <div className="bi-blob-btn-pill">
            <span>{displayText}</span>
          </div>
          {hasArrow && <div className="bi-blob-btn-blob" />}
        </div>

        {/* Sharp icon wrapper positioned over the circular blob */}
        {hasArrow && (
          <div className="bi-blob-btn-arrow-wrap" aria-hidden="true">
            {renderIcon()}
          </div>
        )}
      </>
    );

    if (href && !isDisabled) {
      const isInternal =
        href.startsWith("/") && !href.startsWith("//") && !href.includes("mailto:") && !href.includes("tel:");

      if (isInternal) {
        return (
          <Link
            href={href}
            ref={ref as React.Ref<HTMLAnchorElement>}
            className={combinedClassName}
            aria-label={ariaLabel || (typeof displayText === "string" ? displayText : undefined)}
            id={id}
            style={style}
            data-arrow={dataArrow}
            {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </Link>
        );
      }

      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClassName}
          target={target}
          rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
          aria-label={ariaLabel || (typeof displayText === "string" ? displayText : undefined)}
          id={id}
          style={style}
          data-arrow={dataArrow}
          {...(restProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        className={combinedClassName}
        aria-label={ariaLabel || (typeof displayText === "string" ? displayText : undefined)}
        aria-disabled={isDisabled}
        aria-busy={loading ? "true" : undefined}
        id={id}
        style={style}
        data-arrow={dataArrow}
        {...(restProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

BlobButton.displayName = "BlobButton";

// Export GlobalCTAButton as an alias
export const GlobalCTAButton = BlobButton;
export type GlobalCTAButtonProps = BlobButtonProps;
