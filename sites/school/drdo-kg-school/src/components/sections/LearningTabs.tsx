"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { EASE } from "@/components/motion/Reveal";
import Img from "@/components/ui/Img";
import { learningSteps } from "@/content/campus";

/**
 * "How learning happens" as WAI-ARIA tabs: arrow keys move between tabs,
 * Home/End jump to the ends, and only the active panel is in the tab order.
 */
export default function LearningTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const still = useReducedMotion();
  const step = learningSteps[active];

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const last = learningSteps.length - 1;
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = next < 0 ? last : next > last ? 0 : next;
    setActive(i);
    tabs.current[i]?.focus();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div role="tablist" aria-label="How learning happens" aria-orientation="vertical" onKeyDown={onKey} className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-line lg:pb-0">
        {learningSteps.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`panel-${s.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group relative flex shrink-0 items-center gap-4 rounded-xs border px-4 py-3 text-left transition lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-6 ${
                on ? "border-navy bg-navy text-white lg:bg-transparent lg:text-navy" : "border-line text-slate hover:text-navy"
              }`}
            >
              <span className={`font-display text-sm lg:text-base ${on ? "text-gold lg:text-gold-ink" : ""}`}>{s.label}</span>
              <span className="font-display text-lg lg:text-[1.65rem]">{s.title}</span>
              <span
                aria-hidden
                className={`absolute bottom-[-1px] left-0 hidden h-px bg-navy transition-all duration-500 lg:block ${on ? "w-full" : "w-0 group-hover:w-10"}`}
              />
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            id={`panel-${step.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${step.id}`}
            tabIndex={0}
            initial={still ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid gap-8 md:grid-cols-2 md:items-center"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xs">
              <Img photo={step.photo} width={460} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
            </div>
            <div>
              <h3 className="t-h2">{step.title}</h3>
              <p className="t-lead mt-5">{step.text}</p>
              <div className="mt-8 border-l-2 border-gold bg-white p-6">
                <p className="eyebrow text-gold-ink">In practice</p>
                <p className="mt-2 text-[0.97rem] text-ink">{step.example}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
