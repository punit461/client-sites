"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { useState } from "react";
import { Reveal, TextReveal } from "@/components/animations";
import { Container, Label } from "@/components/ui/primitives";

const DEMO_ID = "LOOP-20481";

const STAGES = [
  { label: "Pickup completed", detail: "Collected at 9:42 AM" },
  { label: "Cleaning", detail: "Washed at 40°C" },
  { label: "Ironing", detail: "On the press now" },
  { label: "Quality check", detail: "Item-by-item against intake photos" },
  { label: "Out for delivery", detail: "With your driver" },
  { label: "Delivered", detail: "Signed for at your door" },
];

/** How many stages are complete in the demo order. */
const COMPLETE = 2;

export default function OrderTracking() {
  const still = useReducedMotion();
  const [value, setValue] = useState("");
  const [tracked, setTracked] = useState<string | null>(null);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = value.trim().toUpperCase();
    if (!id) {
      setError("Enter an order ID to track.");
      setTracked(null);
      return;
    }
    if (!/^LOOP-\d{4,6}$/.test(id)) {
      setError(`That does not look like an order ID. They look like ${DEMO_ID}.`);
      setTracked(null);
      return;
    }
    setError("");
    setTracked(id);
  };

  return (
    <section id="track" className="bg-ink py-24 text-paper sm:py-32">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20 [&>*]:min-w-0">
          <div>
            <Label className="text-lime">Tracking</Label>
            <TextReveal text="Where's my laundry?" className="type-xl mt-5 max-w-[10ch] text-paper" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-paper/60">
              Six stages, updated as they happen. Try {DEMO_ID} to see a live order.
            </p>

            <form onSubmit={submit} className="mt-8" noValidate>
              <label htmlFor="order-id" className="label mb-2.5 block text-paper/50">
                Order ID
              </label>
              <div className="flex flex-col gap-2.5 min-[380px]:flex-row">
                <input
                  id="order-id"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError("");
                  }}
                  placeholder={DEMO_ID}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "order-error" : undefined}
                  className="min-w-0 flex-1 rounded-full border border-paper/20 bg-transparent px-5 py-3.5 font-mono text-[0.9rem] uppercase tracking-wider text-paper outline-none transition placeholder:text-paper/25 focus:border-lime"
                />
                <button
                  type="submit"
                  className="inline-flex flex-none items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-[0.88rem] font-semibold text-ink transition hover:bg-lime-deep"
                >
                  <Search className="h-4 w-4" strokeWidth={2.2} />
                  Track
                </button>
              </div>
              <p
                id="order-error"
                role="alert"
                className="mt-2.5 min-h-[1.2rem] text-[0.8rem] text-lime"
              >
                {error}
              </p>
            </form>
          </div>

          {/* ------------------------------------------------- the timeline */}
          <Reveal>
            <AnimatePresence mode="wait">
              {tracked ? (
                <motion.div
                  key={tracked}
                  className="rounded-[28px] border border-paper/12 p-6 sm:p-8"
                  initial={still ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={still ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-paper/12 pb-5">
                    <p className="font-mono text-[1.1rem] uppercase tracking-wider text-paper">
                      {tracked}
                    </p>
                    <p className="text-[0.85rem] text-paper/55">
                      Expected <strong className="text-lime">today by 7:30 PM</strong>
                    </p>
                  </div>

                  <ol className="relative mt-6 space-y-1">
                    <div
                      className="absolute bottom-6 left-[0.92rem] top-3 w-px bg-paper/15"
                      aria-hidden
                    />
                    <motion.div
                      className="absolute left-[0.92rem] top-3 w-px origin-top bg-lime"
                      style={{ bottom: "1.5rem" }}
                      initial={still ? false : { scaleY: 0 }}
                      animate={{ scaleY: (COMPLETE + 0.5) / STAGES.length }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                      aria-hidden
                    />

                    {STAGES.map((stage, i) => {
                      const done = i < COMPLETE;
                      const current = i === COMPLETE;
                      return (
                        <motion.li
                          key={stage.label}
                          className="relative flex gap-4 py-2.5"
                          initial={still ? false : { opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 + i * 0.09 }}
                        >
                          <span
                            className={`relative z-10 flex h-[1.85rem] w-[1.85rem] flex-none items-center justify-center rounded-full border-4 border-ink ${
                              done
                                ? "bg-lime text-ink"
                                : current
                                  ? "bg-lime/25 text-lime"
                                  : "bg-paper/10 text-paper/35"
                            }`}
                          >
                            {done ? (
                              <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                            ) : current ? (
                              <motion.span
                                className="h-2 w-2 rounded-full bg-lime"
                                animate={still ? undefined : { scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                                transition={{ duration: 1.7, repeat: Infinity }}
                                aria-hidden
                              />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                            )}
                          </span>

                          <span className="pt-0.5">
                            <span
                              className={`block text-[0.98rem] font-semibold ${
                                done || current ? "text-paper" : "text-paper/35"
                              }`}
                            >
                              {stage.label}
                              {done ? <span className="sr-only"> — complete</span> : null}
                              {current ? <span className="sr-only"> — in progress</span> : null}
                            </span>
                            <span
                              className={`mt-0.5 block text-[0.8rem] ${
                                done || current ? "text-paper/50" : "text-paper/25"
                              }`}
                            >
                              {stage.detail}
                            </span>
                          </span>
                        </motion.li>
                      );
                    })}
                  </ol>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="flex min-h-[20rem] items-center justify-center rounded-[28px] border border-dashed border-paper/15 p-8 text-center"
                  initial={still ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="max-w-xs text-[0.92rem] leading-relaxed text-paper/40">
                    Enter an order ID and the six stages appear here, with the current delivery
                    estimate.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
