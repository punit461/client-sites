"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * ClearFlow's one motion language: a gentle fade-and-rise, like water
 * settling. Short travel, soft easing, nothing springy.
 *
 * Reduced motion renders everything in place. The static export bakes
 * `opacity: 0` into the HTML, so that branch names the resting values
 * explicitly, and a <noscript> rule in the root layout shows everything when
 * JavaScript is off.
 */
export const FLOW = [0.25, 1, 0.35, 1] as const;

type Tag = "div" | "section" | "li" | "ul" | "ol" | "article";

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.45, delay, ease: FLOW }}
    >
      {children}
    </M>
  );
}

const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const child: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: FLOW } },
};

/** A list whose children arrive one after another. */
export function Stagger({ children, className, as = "ul" }: { children: ReactNode; className?: string; as?: Tag }) {
  const still = useReducedMotion();
  const M = motion[as];
  return (
    <M
      data-reveal
      className={className}
      variants={parent}
      initial={still ? false : "hidden"}
      animate={still ? "show" : undefined}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </M>
  );
}

export function Item({ children, className, as = "li" }: { children: ReactNode; className?: string; as?: Tag }) {
  const M = motion[as];
  return (
    <M data-reveal className={className} variants={child}>
      {children}
    </M>
  );
}
