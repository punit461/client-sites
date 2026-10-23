"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import { SNAP } from "@/components/motion/Motion";
import type { Faq } from "@/content/types";

/**
 * WAI-ARIA accordion: a <button aria-expanded> in a heading per question.
 * Answers stay in the HTML when closed — collapsed and inert, so they're
 * neither seen nor reached by keyboard or screen reader, but search engines
 * and find-in-page still have them.
 */
export function Accordion({ items, dark = false, level = 3 }: { items: Faq[]; dark?: boolean; level?: 3 | 4 }) {
  const H = level === 4 ? "h4" : "h3";
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  const still = useReducedMotion();

  return (
    <div className={`border-t-2 ${dark ? "border-white" : "border-charcoal"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`border-b ${dark ? "border-rule-dark" : "border-rule"}`}>
            <H>
              <button
                id={`${id}-b${i}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`group flex w-full items-center gap-5 py-5 text-left font-display text-lg font-semibold sm:text-xl ${
                  dark ? "text-white" : "text-charcoal"
                }`}
              >
                <span className={`t-label w-7 shrink-0 ${dark ? "text-gray" : "text-ink-soft"}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-[var(--radius-box)] transition-colors duration-200 ${
                    isOpen ? "bg-blue text-white" : dark ? "bg-charcoal-3 text-white" : "bg-white text-charcoal group-hover:bg-lime"
                  }`}
                >
                  <span className="absolute h-0.5 w-3.5 bg-current" />
                  <span className={`absolute h-3.5 w-0.5 bg-current transition-transform duration-200 ${isOpen ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </H>
            <motion.div
              id={`${id}-p${i}`}
              role="region"
              aria-labelledby={`${id}-b${i}`}
              inert={!isOpen}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: still ? 0 : 0.28, ease: SNAP }}
              className="overflow-hidden"
            >
              <p className={`max-w-3xl pb-6 pl-12 pr-4 ${dark ? "text-gray" : "text-ink-soft"}`}>{item.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
