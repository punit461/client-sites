"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Package, Truck } from "lucide-react";
import { useRef } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { trackedOrder, trackProgress, trackStages } from "@/data/content";

/** A mock of the order screen in the app — the progress line draws itself in. */
export default function OrderTracking() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const still = useReducedMotion();

  const done = (i: number) => i < trackProgress;
  const current = (i: number) => i === trackProgress;

  return (
    <section id="tracking" className="py-20 sm:py-28">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
          <SectionHeading
            eyebrow="Tracking"
            title="Know exactly where your bag is"
            copy="Six stages, updated as they happen. No calling to ask whether it will arrive today."
          />

          <Reveal>
            <div ref={ref} className="overflow-hidden rounded-[26px] border border-line bg-surface shadow-[var(--shadow-lift)]">
              {/* ---------------------------------------------- header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-surface-2/60 px-6 py-5">
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                    Order
                  </p>
                  <p className="mt-1 font-display text-[1.45rem] text-ink">#{trackedOrder.id}</p>
                  <p className="mt-0.5 text-[0.8rem] text-ink-soft">{trackedOrder.items}</p>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[0.72rem] font-bold uppercase tracking-wide text-accent-dark">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      animate={still ? undefined : { opacity: [1, 0.25, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      aria-hidden
                    />
                    In progress
                  </span>
                  <p className="mt-2 text-[0.8rem] text-ink-soft">
                    Expected <strong className="text-ink">{trackedOrder.eta}</strong>
                  </p>
                </div>
              </div>

              {/* ---------------------------------------------- stages */}
              <ol className="relative px-6 py-7">
                {/* the rail behind the dots */}
                <div
                  className="absolute bottom-[3.2rem] left-[2.05rem] top-[2.6rem] w-0.5 rounded-full bg-line"
                  aria-hidden
                />
                <motion.div
                  className="absolute left-[2.05rem] top-[2.6rem] w-0.5 origin-top rounded-full bg-accent"
                  style={{ bottom: "3.2rem" }}
                  initial={still ? false : { scaleY: 0 }}
                  animate={inView ? { scaleY: (trackProgress - 0.5) / (trackStages.length - 1) } : undefined}
                  transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  aria-hidden
                />

                {trackStages.map((stage, i) => (
                  <motion.li
                    key={stage.label}
                    className="relative flex gap-4 py-2.5"
                    initial={still ? false : { opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : undefined}
                    transition={{ duration: 0.45, delay: 0.25 + i * 0.12 }}
                  >
                    <span
                      className={`relative z-[2] flex h-8 w-8 flex-none items-center justify-center rounded-full border-4 border-surface transition-colors ${
                        done(i)
                          ? "bg-accent text-white"
                          : current(i)
                            ? "bg-accent-soft text-accent"
                            : "bg-surface-2 text-ink-faint"
                      }`}
                    >
                      {done(i) ? (
                        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                      ) : current(i) ? (
                        <motion.span
                          className="h-2 w-2 rounded-full bg-accent"
                          animate={still ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                          aria-hidden
                        />
                      ) : i === trackStages.length - 1 ? (
                        <Package className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      ) : i === trackStages.length - 2 ? (
                        <Truck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                      )}
                    </span>

                    <span className="pt-0.5">
                      <span
                        className={`block text-[0.92rem] font-semibold ${
                          done(i) || current(i) ? "text-ink" : "text-ink-faint"
                        }`}
                      >
                        {stage.label}
                        {done(i) ? <span className="sr-only"> — complete</span> : null}
                        {current(i) ? <span className="sr-only"> — in progress</span> : null}
                      </span>
                      <span
                        className={`mt-0.5 block text-[0.8rem] ${
                          done(i) || current(i) ? "text-ink-soft" : "text-ink-faint/70"
                        }`}
                      >
                        {stage.detail}
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
