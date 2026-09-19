"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { icons, type IconName } from "@/lib/icons";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The site's one entrance animation: a slow rise and fade, once. A retreat
 * should feel unhurried, so the duration is longer than usual and nothing
 * springs. Reduced motion renders in place.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const still = useReducedMotion();
  const Tag = motion[as];
  // Hydration keeps the inline opacity:0 the export baked in, so name the
  // resting values rather than rendering a bare tag — otherwise a reader who
  // asked for less motion gets invisible text instead of static text.
  if (still)
    return (
      <Tag className={className} initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </Tag>
    );
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul";
}) {
  const still = useReducedMotion();
  const Tag = motion[as];
  if (still)
    return (
      <Tag className={className} variants={staggerParent} initial={false} animate="show">
        {children}
      </Tag>
    );
  return (
    <Tag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {children}
    </Tag>
  );
}

export function Container({
  children,
  className = "",
  wide = false,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
  narrow?: boolean;
}) {
  const width = narrow ? "max-w-[900px]" : wide ? "max-w-[1480px]" : "max-w-[1200px]";
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.3,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden />;
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`label text-olive ${className}`}>{children}</span>;
}

export function SectionHeading({
  label,
  title,
  copy,
  align = "left",
  className = "",
  light = false,
}: {
  label?: string;
  title: ReactNode;
  copy?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {label ? <Label className={light ? "text-beige" : ""}>{label}</Label> : null}
      <h2 className={`display-lg mt-5 ${light ? "text-ivory" : "text-charcoal"}`}>{title}</h2>
      {copy ? (
        <p
          className={`mt-5 text-[1.02rem] leading-relaxed ${
            light ? "text-ivory/70" : "text-charcoal-soft"
          }`}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "forest" | "outline" | "light" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  forest: "bg-forest text-ivory hover:bg-forest-deep",
  outline: "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  light: "bg-ivory text-charcoal hover:bg-white",
  ghost: "border border-ivory/35 text-ivory hover:bg-ivory hover:text-charcoal",
};

export function Cta({
  children,
  href,
  onClick,
  variant = "forest",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.88rem] font-medium tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`;

  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={base} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={base} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/** A star row that reads as "5 out of 5", not "★★★★★". */
export function Stars({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  const Star = icons.star;
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= rating ? "fill-brown text-brown" : "text-line"}`}
          strokeWidth={1.2}
          aria-hidden
        />
      ))}
    </span>
  );
}

