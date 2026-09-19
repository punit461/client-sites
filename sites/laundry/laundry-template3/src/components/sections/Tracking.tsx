"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Search } from "lucide-react";
import { useId, useState } from "react";
import { Reveal, WordReveal } from "@/components/motion";
import { Container, Eyebrow, Icon } from "@/components/ui/primitives";
import { demoOrders, trackStages } from "@/data/content";

type Result =
  | { kind: "idle" }
  | { kind: "missing"; id: string }
  | { kind: "found"; id: string; order: (typeof demoOrders)[string] };

const SAMPLE_IDS = Object.keys(demoOrders);

/**
 * The tracker, as a console.
 *
 * The lookup is local because the site is a static export with nothing behind
 * it — `demoOrders` in the data file stands in for the API. Swap this handler
 * for a fetch and the rest of the section is unchanged.
 */
export default function Tracking() {
  const still = useReducedMotion();
  const inputId = useId();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const lookup = (raw: string) => {
    const id = raw.trim().toUpperCase();
    if (!id) return;
    const order = demoOrders[id];
    setResult(order ? { kind: "found", id, order } : { kind: "missing", id });
  };

  return (
    <section id="track" className="relative overflow-hidden bg-deep py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>Track</Eyebrow>
            <WordReveal
              text="Where your clothes are, right now."
              className="display-lg mt-5 font-semibold text-mist"
            />
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-mist-soft">
              Every collection gets a reference the moment the driver seals the bag. Members see the
              same thing in the app, with a photograph at each stage.
            </p>

            <form
              className="mt-8 flex flex-col gap-2.5 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                lookup(value);
              }}
            >
              <label htmlFor={inputId} className="sr-only">
                Collection reference
              </label>
              <input
                id={inputId}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="CRISP-4821"
                autoComplete="off"
                spellCheck={false}
                className="min-w-0 flex-1 rounded-full border border-line bg-surface px-5 py-3.5 text-[0.95rem] uppercase tracking-wider text-mist outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-mist-faint focus:border-ice/70"
              />
              <button
                type="submit"
                className="inline-flex flex-none items-center justify-center gap-2 rounded-full bg-ice px-6 py-3.5 text-[0.9rem] font-semibold text-night transition hover:bg-ice-deep"
              >
                <Search className="h-4 w-4" aria-hidden />
                Track it
              </button>
            </form>

            <p className="mt-4 flex flex-wrap items-center gap-2 text-[0.78rem] text-mist-faint">
              Try one:
              {SAMPLE_IDS.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setValue(id);
                    lookup(id);
                  }}
                  className="rounded-full border border-line px-3 py-1 font-medium text-mist-soft transition hover:border-ice/60 hover:text-ice"
                >
                  {id}
                </button>
              ))}
            </p>
          </div>

          {/* ------------------------------------------------- the console */}
          <Reveal>
            <div className="panel rounded-panel p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {result.kind === "found" ? (
                  <motion.div
                    key={result.id}
                    initial={still ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={still ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
                      <div>
                        <p className="eyebrow text-mist-faint">{result.id}</p>
                        <p className="mt-2 font-display text-[1.35rem] font-semibold tracking-tight text-mist">
                          {result.order.items} garments
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="eyebrow text-mist-faint">Back with you</p>
                        <p className="mt-2 text-[0.95rem] font-semibold text-ice">
                          {result.order.eta}
                        </p>
                        <p className="mt-1 text-[0.74rem] text-gold">
                          {result.order.plan} membership
                        </p>
                      </div>
                    </div>

                    <ol className="mt-6 space-y-0">
                      {trackStages.map((stage, index) => {
                        const done = index < result.order.stage;
                        const current = index === result.order.stage;
                        const last = index === trackStages.length - 1;

                        return (
                          <li key={stage.id} className="relative flex gap-4 pb-6 last:pb-0">
                            {!last ? (
                              <span
                                className={`absolute left-[1.05rem] top-9 h-full w-px ${
                                  done ? "bg-ice/60" : "bg-line"
                                }`}
                                aria-hidden
                              />
                            ) : null}

                            <span
                              className={`relative z-10 flex h-[2.1rem] w-[2.1rem] flex-none items-center justify-center rounded-full border transition-colors ${
                                done
                                  ? "border-ice bg-ice text-night"
                                  : current
                                    ? "border-ice bg-night text-ice"
                                    : "border-line bg-night text-mist-faint"
                              }`}
                            >
                              {done ? (
                                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                              ) : (
                                <Icon name={stage.icon} className="h-4 w-4" />
                              )}
                              {current && !still ? (
                                <span className="absolute inset-0 animate-ping rounded-full border border-ice/60" />
                              ) : null}
                            </span>

                            <span className="min-w-0 flex-1 pt-1">
                              <span
                                className={`block text-[0.95rem] font-semibold ${
                                  done || current ? "text-mist" : "text-mist-faint"
                                }`}
                              >
                                {stage.label}
                                {current ? (
                                  <span className="ml-2 rounded-full bg-ice/15 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-ice">
                                    Now
                                  </span>
                                ) : null}
                              </span>
                              <span className="mt-0.5 block text-[0.82rem] text-mist-soft">
                                {stage.detail}
                              </span>
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </motion.div>
                ) : result.kind === "missing" ? (
                  <motion.div
                    key="missing"
                    className="py-10 text-center"
                    initial={still ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="font-display text-[1.2rem] font-medium text-mist">
                      No collection under {result.id}
                    </p>
                    <p className="mx-auto mt-2 max-w-sm text-[0.9rem] leading-relaxed text-mist-soft">
                      References look like <span className="text-ice">CRISP-4821</span> and arrive
                      by text the moment the driver seals your bag. Still stuck? The concierge can
                      find it from your phone number.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    className="py-10 text-center"
                    initial={still ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <span
                      className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line text-mist-faint"
                      aria-hidden
                    >
                      <Search className="h-6 w-6" />
                    </span>
                    <p className="mt-5 font-display text-[1.2rem] font-medium text-mist">
                      Enter a reference
                    </p>
                    <p className="mx-auto mt-2 max-w-xs text-[0.9rem] leading-relaxed text-mist-soft">
                      Six stages, from booked to back at your door.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
