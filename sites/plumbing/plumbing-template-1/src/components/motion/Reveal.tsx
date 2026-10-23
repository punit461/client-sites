"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered fade-and-rise. Short travel, no spring: the brand is calm.
 *
 * Under prefers-reduced-motion elements render in place. The static export
 * bakes `opacity: 0` into the HTML, so the reduced-motion branch names the
 * resting values explicitly rather than rendering a bare tag, and the
 * <noscript> rule in the root layout shows everything when JS is off.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "section" | "li" | "article" | "ul" | "ol";

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
  as?: Tag;
}) {
  const still = useReducedMotion();
  const M = motion[as];
  if (still)
    return (
      <M data-reveal className={className} initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </M>
    );
  return (
    <M
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

const parent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const child: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};

/** A list whose items enter one after another. */
export function Stagger({ children, className, as = "ul" }: { children: ReactNode; className?: string; as?: Tag }) {
  const still = useReducedMotion();
  const M = motion[as];
  return (
    <M
      data-reveal
      className={className}
      variants={parent}
      initial={still ? false : "hidden"}
      whileInView="show"
      animate={still ? "show" : undefined}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "li" }: { children: ReactNode; className?: string; as?: Tag }) {
  const M = motion[as];
  return (
    <M data-reveal className={className} variants={child}>
      {children}
    </M>
  );
}
