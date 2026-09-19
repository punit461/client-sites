"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { icons, type IconName } from "@/lib/icons";

/** The page's one horizontal rhythm — every section is laid out inside this. */
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
      className={`mx-auto w-full ${wide ? "max-w-[1440px]" : "max-w-[1200px]"} px-5 sm:px-8 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow inline-flex items-center gap-2">
      <span className="h-px w-6 bg-accent/50" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <div className={centered ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="display-lg mt-4 text-ink">{title}</h2>
      {copy ? <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{copy}</p> : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-dark shadow-[0_10px_30px_-12px_rgba(14,159,110,0.7)]",
  ghost: "border border-line bg-surface text-ink hover:border-ink/30 hover:bg-surface-2",
  light: "bg-white/95 text-ink hover:bg-white",
};

/**
 * Buttons and links share one look. A `href` renders an anchor so in-page
 * navigation stays real navigation; everything else is a real <button>.
 */
export function CtaButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
    size === "lg" ? "px-7 py-3.5 text-[0.95rem]" : "px-5 py-2.5 text-sm"
  } ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={base} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={base} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/**
 * Counts up when it first scrolls into view, then stops. Reduced motion gets
 * the final number immediately — the value is the information, the count is
 * the decoration.
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
  const [shown, setShown] = useState(still ? value : 0);

  useEffect(() => {
    if (!inView || still) {
      if (still) setShown(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out cubic: fast at first, settling into the final number.
      setShown(value * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, still, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/** A star row that reads as "4 out of 5" to a screen reader, not "★★★★☆". */
export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  const Star = icons.star;
  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= rating ? "fill-gold text-gold" : "text-line"}`}
          strokeWidth={1.5}
          aria-hidden
        />
      ))}
    </div>
  );
}

/** Small motion wrapper used for floating hero cards. */
export function Float({
  children,
  className = "",
  distance = 10,
  duration = 6,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
}) {
  const still = useReducedMotion();
  if (still) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{ y: [-distance / 2, distance / 2, -distance / 2] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
