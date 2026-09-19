"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { icons, type IconName } from "@/lib/icons";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
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
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
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

/**
 * A card that drifts gently, for the hero's floating labels. Pointer-agnostic:
 * it is a loop rather than a hover effect, so touch users see it too.
 */
export function Float({
  children,
  className = "",
  distance = 8,
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
  const width = narrow ? "max-w-[880px]" : wide ? "max-w-[1460px]" : "max-w-[1180px]";
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
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

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`label inline-flex items-center gap-2 text-terracotta ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {children}
    </span>
  );
}

export function Stars({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  const Star = icons.star;
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-3.5 w-3.5 ${n <= rating ? "fill-yellow text-yellow" : "text-line"}`}
          strokeWidth={1.2}
          aria-hidden
        />
      ))}
    </span>
  );
}

