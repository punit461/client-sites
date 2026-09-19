"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal, WordReveal } from "@/components/motion";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { stories } from "@/data/content";

const DWELL = 7000;

/**
 * One story at a time, advancing on its own.
 *
 * Autoplay is a courtesy, not a feature: it stops on hover, on focus anywhere
 * inside the region, and entirely under `prefers-reduced-motion`. The controls
 * are real buttons, and the live region announces each story once it settles —
 * `polite`, so it waits for a screen reader to finish what it was saying.
 */
export default function Stories() {
  const still = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + stories.length) % stories.length),
    [],
  );

  useEffect(() => {
    if (paused || still) return undefined;
    const timer = window.setTimeout(() => go(1), DWELL);
    return () => window.clearTimeout(timer);
  }, [index, paused, still, go]);

  const story = stories[index];

  return (
    <section id="stories" className="relative overflow-hidden bg-deep py-24 sm:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Eyebrow>Members</Eyebrow>
            <WordReveal
              text="What people say once they stop noticing us."
              className="display-lg mt-5 font-semibold text-mist"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous story"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-mist transition hover:border-ice/60 hover:text-ice"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next story"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-mist transition hover:border-ice/60 hover:text-ice"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Reveal className="mt-12">
          <div
            className="panel relative overflow-hidden rounded-panel p-7 sm:p-10"
            role="group"
            aria-roledescription="carousel"
            aria-label="Member stories"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <Quote
              className="pointer-events-none absolute -right-4 -top-6 h-40 w-40 text-white/[0.03]"
              aria-hidden
            />

            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={story.id}
                  initial={still ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={still ? { opacity: 0 } : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <p className="flex gap-1 text-gold" aria-label={`${story.rating} out of 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < story.rating ? "fill-current" : "opacity-25"}`}
                        aria-hidden
                      />
                    ))}
                  </p>

                  <p className="mt-6 font-display text-[1.3rem] font-medium leading-snug tracking-tight text-mist sm:text-[1.75rem]">
                    &ldquo;{story.quote}&rdquo;
                  </p>

                  <footer className="mt-8 flex items-center gap-4">
                    <Image
                      src={story.photo}
                      alt=""
                      aria-hidden
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-full border border-white/10 object-cover"
                    />
                    <div>
                      <p className="text-[0.95rem] font-semibold text-mist">{story.name}</p>
                      <p className="text-[0.82rem] text-mist-soft">
                        {story.role} · {story.area}
                      </p>
                    </div>
                    <span className="ml-auto rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.72rem] font-semibold text-gold">
                      {story.plan}
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Dots double as the progress indicator; each one is a control. */}
            <div className="mt-9 flex items-center gap-2">
              {stories.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Story ${i + 1} of ${stories.length}, ${item.name}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-10 bg-ice" : "w-4 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
              <span className="ml-auto text-[0.76rem] tabular-nums text-mist-faint">
                {String(index + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
