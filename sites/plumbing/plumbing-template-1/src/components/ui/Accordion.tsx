"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Faq } from "@/content/types";
import { EASE } from "@/components/motion/Reveal";

/**
 * An accessible disclosure list: each question is a real <button> with
 * aria-expanded/aria-controls inside a heading, per the WAI-ARIA accordion
 * pattern. Several can be open at once — nobody should lose an answer they
 * were reading because they opened another.
 */
export function Accordion({ items, headingLevel = 3 }: { items: Faq[]; headingLevel?: 2 | 3 }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const id = useId();
  const still = useReducedMotion();
  const H = `h${headingLevel}` as "h2" | "h3";

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btn = `${id}-q${i}`;
        const panel = `${id}-a${i}`;
        return (
          <div key={item.q}>
            <H className="m-0">
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => toggle(i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left font-display text-[1.05rem] font-semibold leading-snug text-navy sm:text-lg"
              >
                <span className="link-underline">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-200 ${
                    isOpen ? "border-navy bg-navy text-ivory" : "border-line text-navy group-hover:border-navy"
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" strokeWidth={1.6} /> : <Plus className="h-4 w-4" strokeWidth={1.6} />}
                </span>
              </button>
            </H>
            {/* Answers stay in the HTML (for search engines and find-in-page);
                closed ones are collapsed and inert, so they are neither seen,
                focused nor read out. */}
            <motion.div
              id={panel}
              role="region"
              aria-labelledby={btn}
              inert={!isOpen}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: still ? 0 : 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl pr-12 pb-6 text-slate">{item.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
