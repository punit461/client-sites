"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The site's one entrance: a short rise and fade as an element scrolls in,
 * once. With prefers-reduced-motion the element is rendered at rest — not
 * hidden — because a reader who asked for less motion still needs the text.
 */
export const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "section" | "li" | "article" | "span" | "p" | "ul" | "ol" | "header";

export default function Reveal({
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
  as?: Tag;
}) {
  const still = useReducedMotion();
  const M = motion[as];

  // Hydration keeps the inline opacity:0 the export baked in, so name the
  // resting values rather than rendering a bare tag.
  if (still)
    return (
      <M className={className} initial={false} animate={{ opacity: 1, y: 0 }}>
        {children}
      </M>
    );

  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

const group: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.09 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** A list whose children arrive one after another. Pair with StaggerItem. */
export function Stagger({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const still = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      variants={group}
      {...(still
        ? { initial: false, animate: "shown" }
        : { initial: "hidden", whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const M = motion[as];
  return (
    <M className={className} variants={item}>
      {children}
    </M>
  );
}
