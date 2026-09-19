"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Reveal, WordReveal } from "@/components/motion";
import { Container, Eyebrow, Icon } from "@/components/ui/primitives";
import { standards } from "@/data/content";

/**
 * Five commitments, with one sticky plate that changes as you move down them.
 *
 * The plate is decorative — every commitment is fully readable from its own
 * text — so below `lg`, where there is no room for a sticky column, it is
 * dropped rather than stacked. The list is the content; the photograph is
 * scenery.
 */
export default function Standard() {
  const still = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = standards[active];

  return (
    <section id="standard" className="relative overflow-hidden bg-deep py-24 sm:py-32">
      <Container wide>
        <div className="max-w-3xl">
          <Eyebrow>The standard</Eyebrow>
          <WordReveal
            text="Five things that never bend."
            className="display-lg mt-5 font-semibold text-mist"
          />
          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-mist-soft">
            Most laundries are judged on the day they go wrong. These are the five places where we
            have decided in advance what happens, so nobody has to improvise.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          {/* ---------------------------------------------------- the list */}
          <ol className="relative">
            {standards.map((standard, index) => {
              const isActive = index === active;
              return (
                <li key={standard.id} className="border-t border-line last:border-b">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-current={isActive}
                    className="group flex w-full items-start gap-5 py-7 text-left"
                  >
                    <span
                      className={`mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border transition-colors duration-300 ${
                        isActive
                          ? "border-ice/50 bg-ice/15 text-ice"
                          : "border-line text-mist-faint group-hover:text-mist-soft"
                      }`}
                    >
                      <Icon name={standard.icon} className="h-[18px] w-[18px]" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-3">
                        <span className="font-display text-[0.8rem] font-semibold tabular-nums text-gold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-display text-[1.15rem] font-medium leading-snug tracking-tight transition-colors duration-300 sm:text-[1.3rem] ${
                            isActive ? "text-mist" : "text-mist-soft"
                          }`}
                        >
                          {standard.title}
                        </span>
                      </span>

                      {/**
                       * `grid-template-rows` from 0fr to 1fr is the one way to
                       * animate to a height nobody has measured. No JS, and the
                       * text stays in the document for search and selection.
                       */}
                      <span
                        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                          isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-lg pt-3 text-[0.93rem] leading-relaxed text-mist-soft">
                            {standard.copy}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* --------------------------------------------------- the plate */}
          <Reveal className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-panel border border-line">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    className="absolute inset-0"
                    initial={still ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={still ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={current.image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div
                  className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent"
                  aria-hidden
                />

                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="eyebrow text-gold">
                    {String(active + 1).padStart(2, "0")} / {String(standards.length).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-display text-[1.25rem] font-medium leading-snug tracking-tight text-mist">
                    {current.title}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
