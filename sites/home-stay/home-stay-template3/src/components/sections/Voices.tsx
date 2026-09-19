"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Container, Icon, Marker, Stars } from "@/components/ui";
import { property, voices } from "@/data/stay";
import { numeral } from "@/lib/format";

/**
 * One review at a time, large. Four small cards say nothing; one long quote
 * that a guest actually wrote does the work — which is also why the line under
 * it admits that these particular ones are written examples.
 */
export default function Voices({ index = numeral(6) }: { index?: string }) {
  const still = useReducedMotion();
  const [at, setAt] = useState(0);
  const current = voices[at];

  const step = (dir: 1 | -1) => setAt((i) => (i + dir + voices.length) % voices.length);

  return (
    <section className="border-y border-line bg-ink-2 py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Marker index={index}>Guests</Marker>
            <p className="mono mt-6 text-[0.86rem] text-bone-soft">
              <span className="text-brass">{property.rating.score}</span> out of 5 ·{" "}
              {property.rating.count} {property.rating.source}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="mono mr-2 text-[0.76rem] text-bone-faint">
              {numeral(at + 1)} / {numeral(voices.length)}
            </span>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous review"
              className="rounded-sm border border-line p-3 text-bone transition-colors hover:border-brass hover:text-brass"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next review"
              className="rounded-sm border border-line p-3 text-bone transition-colors hover:border-brass hover:text-brass"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16 [&>*]:min-w-0">
          <Icon name="quote" className="hidden h-12 w-12 text-brass/40 lg:block" strokeWidth={1} />

          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={current.name}
                initial={still ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="font-display text-[1.5rem] leading-snug text-bone sm:text-[2rem]">
                  “{current.quote}”
                </blockquote>

                <figcaption className="mt-8 flex flex-wrap items-center gap-4">
                  <span className="relative h-12 w-12 flex-none overflow-hidden rounded-full bg-ink">
                    {/* Stand-in avatars; replaced at handover along with the reviews. */}
                    <Image src={current.avatar} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] text-bone">{current.name}</span>
                    <span className="mono block text-[0.74rem] text-bone-faint">
                      {current.from} · {current.stay} · {current.date}
                    </span>
                  </span>
                  <Stars rating={current.rating} className="sm:ml-4" />
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <ul className="mt-10 flex flex-wrap gap-2">
              {voices.map((voice, i) => (
                <li key={voice.name}>
                  <button
                    type="button"
                    onClick={() => setAt(i)}
                    aria-label={`Read the review from ${voice.name}`}
                    aria-current={i === at}
                    className={`rounded-sm border px-4 py-2 text-[0.8rem] transition-colors ${
                      i === at
                        ? "border-brass text-brass"
                        : "border-line text-bone-faint hover:border-brass/50 hover:text-bone"
                    }`}
                  >
                    {voice.name}
                  </button>
                </li>
              ))}
            </ul>

            <p className="mono mt-8 text-[0.72rem] text-bone-faint">
              Illustrative reviews — replace them with ones the property has actually received before
              launch.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
