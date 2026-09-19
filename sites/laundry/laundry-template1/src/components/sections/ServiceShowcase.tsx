"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { showcase, type ShowcaseItem } from "@/data/services";

/**
 * Each block reports when it is the one in the middle of the viewport. That is
 * what drives the sticky image, so the picture always matches the words being
 * read rather than lagging a section behind.
 */
function Block({
  item,
  index,
  onActive,
}: {
  item: ShowcaseItem;
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-48% 0px -48% 0px" });

  // In an effect, not during render — setting a parent's state mid-render is
  // exactly the case React warns about.
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      className="flex min-h-[58vh] flex-col justify-center py-10 lg:min-h-[64vh] lg:py-12"
    >
      {/* On phones the sticky rail is hidden, so each block carries its own image. */}
      <div className="relative mb-6 aspect-4/3 w-full overflow-hidden rounded-2xl lg:hidden">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="92vw"
          className="object-cover"
        />
      </div>

      <span className="font-mono text-sm font-semibold text-accent">{item.index}</span>
      <h3 className="display-md mt-3 text-ink">{item.title}</h3>
      <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{item.copy}</p>

      <ul className="mt-6 space-y-2.5">
        {item.points.map((point) => (
          <li key={point} className="flex items-center gap-2.5 text-[0.9rem] text-ink">
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent-soft text-accent">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const still = useReducedMotion();
  const current = showcase[active];

  return (
    <section className="bg-surface-2/70 py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="In detail"
          title="How each service actually works"
          copy="Not every garment wants the same treatment. Here is what happens to yours."
        />

        <div className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          {/* sticky plate — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-4/5 overflow-hidden rounded-[26px] bg-surface shadow-[var(--shadow-lift)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.image}
                    className="absolute inset-0"
                    initial={still ? false : { opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={still ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={current.image}
                      alt={current.alt}
                      fill
                      sizes="46vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 to-transparent p-6 pt-20">
                  <p className="font-display text-2xl text-white">{current.title}</p>
                </div>
              </div>

              {/* progress rail */}
              <ol className="mt-6 flex gap-2" aria-hidden>
                {showcase.map((item, i) => (
                  <li key={item.index} className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
                    <motion.span
                      className="block h-full rounded-full bg-accent"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: still ? 0 : 0.45, ease: "easeOut" }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* scrolling copy */}
          <div className="divide-y divide-line lg:divide-y-0">
            {showcase.map((item, i) => (
              <Block key={item.index} item={item} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
