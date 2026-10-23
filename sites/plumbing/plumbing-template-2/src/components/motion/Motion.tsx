"use client";

import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * FlowForce motion: quick and directional. Elements slide in a short distance
 * (from below, or from the side with `x`) in well under half a second.
 *
 * Reduced motion renders everything in place. The export bakes `opacity: 0`
 * into the HTML, so that branch names the resting values explicitly, and the
 * root layout's <noscript> rule shows everything when JavaScript is off.
 */
export const SNAP = [0.2, 0.9, 0.1, 1] as const;

type Tag = "div" | "section" | "li" | "ul" | "ol" | "article";

export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  as?: Tag;
}) {
  const still = useReducedMotion();
  const M = motion[as];
  if (still)
    return (
      <M data-reveal className={className} initial={false} animate={{ opacity: 1, x: 0, y: 0 }}>
        {children}
      </M>
    );
  return (
    <M
      data-reveal
      className={className}
      initial={{ opacity: 0, x, y: x ? 0 : y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.4, delay, ease: SNAP }}
    >
      {children}
    </M>
  );
}

const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const child: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: SNAP } },
};

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

/** A 3px lime bar along the bottom edge of the header showing reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-lime"
    />
  );
}
