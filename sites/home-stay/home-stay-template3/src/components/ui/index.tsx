"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { icons, type IconName } from "@/lib/icons";

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The site's one entrance animation: a slow rise and fade, once.
 *
 * Reduced motion does not render a bare tag. The export bakes the entrance
 * `opacity: 0` into the HTML, so the resting values have to be named or a
 * reader who asked for less motion is left looking at invisible text.
 */
export function Reveal({
  children,
  delay = 0,
  y = 20,
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
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
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
  const width = narrow ? "max-w-[860px]" : wide ? "max-w-[1500px]" : "max-w-[1180px]";
  return <div className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-14 ${className}`}>{children}</div>;
}

export function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.4,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden />;
}

/**
 * The section marker: a mono numeral, a brass hairline, then the label. Every
 * major section carries one, which is what holds this layout together.
 */
export function Marker({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`flex items-center gap-3.5 ${className}`}>
      {index ? <span className="mono text-[0.72rem] text-brass">{index}</span> : null}
      <span className="rule w-10 flex-none" aria-hidden />
      <span className="label text-bone-faint">{children}</span>
    </p>
  );
}

export function SectionHead({
  index,
  marker,
  title,
  copy,
  className = "",
  align = "left",
}: {
  index?: string;
  marker: string;
  title: ReactNode;
  copy?: string;
  className?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      <Marker index={index} className={centered ? "justify-center" : ""}>
        {marker}
      </Marker>
      <h2 className="display-lg mt-6 text-bone">{title}</h2>
      {copy ? <p className="mt-5 text-[1.02rem] leading-relaxed text-bone-soft">{copy}</p> : null}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "brass" | "outline" | "bone" | "quiet";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  brass: "bg-brass text-ink hover:bg-brass-deep",
  outline: "border border-bone/25 text-bone hover:border-brass hover:text-brass",
  bone: "bg-bone text-ink hover:bg-white",
  quiet: "border border-line bg-ink-2 text-bone hover:border-brass/60",
};

/** Square-ish corners rather than pills — the one shape decision that dates a site. */
export function Cta({
  children,
  href,
  onClick,
  variant = "brass",
  className = "",
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2.5 rounded-sm px-7 py-3.5 text-[0.85rem] font-medium tracking-wide transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant]} ${className}`;

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
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= rating ? "fill-brass text-brass" : "text-line"}`}
          strokeWidth={1.2}
          aria-hidden
        />
      ))}
    </span>
  );
}
