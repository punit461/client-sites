"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { FLOW } from "@/components/motion/Motion";
import type { Faq } from "@/content/types";

/**
 * WAI-ARIA accordion: a <button aria-expanded> inside a heading per question.
 * Several can be open at once. Closed answers stay in the HTML, collapsed and
 * inert — hidden from sight, keyboard and screen readers, but present for
 * search engines and find-in-page (and so for the FAQ structured data).
 */
export function Accordion({ items, level = 3, tone = "white" }: { items: Faq[]; level?: 3 | 4; tone?: "white" | "sand" }) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const id = useId();
  const still = useReducedMotion();
  const H = level === 4 ? "h4" : "h3";

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div
            key={item.q}
            className={`rounded-[var(--radius-card)] border transition-colors duration-200 ${
              isOpen ? "border-teal/30 bg-white" : tone === "sand" ? "border-line bg-white/70" : "border-line-cool bg-white"
            }`}
          >
            <H className="text-base">
              <button
                id={`${id}-b${i}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-p${i}`}
                onClick={() => toggle(i)}
                className="group flex w-full items-center justify-between gap-5 px-5 py-4 text-left font-display text-[1.04rem] font-semibold text-teal sm:px-6 sm:py-5 sm:text-lg"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-200 ${
                    isOpen ? "bg-teal text-white" : "bg-sage text-teal group-hover:bg-sage-deep"
                  }`}
                >
                  <span className="absolute h-[1.5px] w-3.5 rounded bg-current" />
                  <span className={`absolute h-3.5 w-[1.5px] rounded bg-current transition-transform duration-300 ${isOpen ? "rotate-90 opacity-0" : ""}`} />
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
              transition={{ duration: still ? 0 : 0.32, ease: FLOW }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl px-5 pb-5 text-stone sm:px-6 sm:pb-6">{item.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
