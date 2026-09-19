"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The one entrance animation on the site: a short rise and fade as an element
 * scrolls in, once. Healthcare pages should feel calm, so the distance is small
 * and the easing is soft — nothing springs or bounces.
 *
 * With `prefers-reduced-motion` the element is simply rendered in place, not
 * hidden: a patient who asked for less motion still has to be able to read it.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

export default function Reveal({
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
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
