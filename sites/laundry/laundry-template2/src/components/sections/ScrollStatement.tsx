"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/primitives";

const WORDS = ["WASH", "DRY", "IRON", "DELIVER"] as const;

/**
 * Scroll-linked typography: one oversized word swaps for the next as the
 * section passes through. The words are stacked in the same grid cell rather
 * than mounted and unmounted, so the layout never shifts as they change.
 *
 * Reduced motion gets the whole sequence as a readable list instead.
 */
export default function ScrollStatement() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative bg-paper py-24 sm:py-32 lg:py-40">
      <Container>
        <p className="type-lg max-w-3xl font-display uppercase leading-[0.98] text-ink">
          You have better things to do than wash clothes.
        </p>

        {still ? (
          <p className="mt-12 font-display text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase leading-none tracking-tight text-ink">
            {WORDS.join(" · ")}
          </p>
        ) : (
          <div
            className="relative mt-12 grid h-[clamp(4rem,12vw,9rem)] place-items-start"
            aria-hidden
          >
            {WORDS.map((word, i) => {
              // Each word owns a slice of the section's scroll range and fades
              // through it, so exactly one is legible at any scroll position.
              const start = 0.18 + i * 0.16;
              return (
                <Word key={word} word={word} progress={scrollYProgress} start={start} />
              );
            })}
          </div>
        )}

        {/* The same sequence, once, for anything that does not read the animation. */}
        <p className="sr-only">Wash, dry, iron, deliver.</p>
      </Container>
    </section>
  );
}

function Word({
  word,
  progress,
  start,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
}) {
  const opacity = useTransform(
    progress,
    [start - 0.1, start, start + 0.12, start + 0.2],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [start - 0.1, start + 0.2], [40, -40]);

  return (
    <motion.span
      className="col-start-1 row-start-1 block font-display text-[clamp(3rem,13vw,10rem)] font-bold uppercase leading-none tracking-tighter text-ink"
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}
