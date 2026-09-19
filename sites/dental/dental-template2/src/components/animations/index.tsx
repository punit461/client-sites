"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One entrance animation for the whole site. Healthcare UI should feel calm,
 * so the travel is short and nothing springs. Under `prefers-reduced-motion`
 * elements render in place — a patient who asked for less motion still has to
 * be able to read the page.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 18,
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
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
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
  // The exported HTML already carries the hidden variant on every child, so
  // dropping the parent variants would leave them at opacity 0 for good.
  // Resolve straight to "show" instead: rendered in place, never animated.
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
