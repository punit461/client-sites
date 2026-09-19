"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { icons, type IconName } from "@/lib/icons";

export function Container({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${wide ? "max-w-[1520px]" : "max-w-[1200px]"} px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden />;
}

/** The gold all-caps marker that opens every section. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-2.5 ${className}`}>
      <span className="h-px w-7 bg-gold/60" aria-hidden />
      {children}
    </span>
  );
}

/**
 * Counts up the first time it is seen, then stops. Reduced motion gets the
 * final number immediately — the value is the information; the count is not.
 */
export function Counter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const still = useReducedMotion();
  const [counted, setCounted] = useState(0);

  useEffect(() => {
    if (still || !inView) return undefined;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCounted(value * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, still, value, duration]);

  // Derived rather than stored: the reduced-motion reader gets the final
  // number without an effect having to push it into state first.
  const shown = still ? value : counted;

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "ice" | "gold" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * Ice is the interactive colour and gold is the membership one, both as fills
 * with near-black text — neither passes contrast as text on this background.
 */
const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  ice: "bg-ice text-night hover:bg-ice-deep",
  gold: "bg-gold text-night hover:bg-gold-deep",
  ghost: "border border-white/15 text-mist hover:border-ice/60 hover:bg-white/5",
  light: "bg-mist text-night hover:bg-white",
};

export function CtaButton({
  children,
  href,
  onClick,
  variant = "ice",
  size = "md",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45 ${
    size === "lg" ? "px-8 py-4 text-[0.95rem]" : "px-5 py-2.5 text-[0.85rem]"
  } ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={base} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={base}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

/** A section heading block: eyebrow, title, and an optional lead paragraph. */
export function SectionHead({
  eyebrow,
  children,
  lead,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  children: ReactNode;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-3xl"} ${className}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mt-5">{children}</div>
      {lead ? (
        <p
          className={`mt-6 text-[1.02rem] leading-relaxed text-mist-soft ${align === "center" ? "mx-auto" : ""} max-w-xl`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
