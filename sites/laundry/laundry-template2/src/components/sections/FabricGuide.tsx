"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Reveal, TextReveal } from "@/components/animations";
import { Container, Icon, Label } from "@/components/ui/primitives";
import { fabrics } from "@/data/content";

export default function FabricGuide() {
  const [active, setActive] = useState(0);
  const still = useReducedMotion();
  const fabric = fabrics[active];

  const specs = [
    ["Recommended cleaning", fabric.cleaning],
    ["Temperature", fabric.temperature],
    ["Drying method", fabric.drying],
    ["Ironing method", fabric.ironing],
  ] as const;

  return (
    <section id="fabrics" className="bg-paper py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>Garment care</Label>
            <TextReveal text="Every fabric has a story." className="type-xl mt-5 max-w-[12ch] text-ink" />
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
            Pick a fabric to see how it is handled. This is the same decision tree our team follows
            at intake.
          </p>
        </div>

        {/* ------------------------------------------------- fabric chips */}
        <Reveal>
          <div
            className="no-scrollbar -mx-5 mt-12 flex gap-2.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
            role="tablist"
            aria-label="Fabrics"
          >
            {fabrics.map((f, i) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                id={`fabric-tab-${f.id}`}
                aria-selected={i === active}
                aria-controls={`fabric-panel-${f.id}`}
                onClick={() => setActive(i)}
                className={`inline-flex flex-none items-center gap-2 rounded-full border px-5 py-3 text-[0.88rem] font-semibold transition-all duration-200 ${
                  i === active
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-ink hover:border-ink/45"
                }`}
              >
                <Icon name={f.icon} className="h-4 w-4" />
                {f.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ------------------------------------------------- active fabric */}
        <div
          id={`fabric-panel-${fabric.id}`}
          role="tabpanel"
          aria-labelledby={`fabric-tab-${fabric.id}`}
          className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12"
        >
          <div className="relative aspect-4/3 overflow-hidden rounded-[28px] bg-paper-2 lg:aspect-16/11">
            <AnimatePresence mode="wait">
              <motion.div
                key={fabric.id}
                className="absolute inset-0"
                initial={still ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={still ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={fabric.image}
                  alt={fabric.alt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 52vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <span className="numeral absolute bottom-5 left-6 text-[clamp(2.5rem,5vw,4.5rem)] uppercase text-paper [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              {fabric.name}
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={fabric.id}
                initial={still ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={still ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-[1.1rem] leading-relaxed text-ink sm:text-[1.25rem]">
                  {fabric.copy}
                </p>

                <dl className="mt-8 divide-y divide-line border-y border-line">
                  {specs.map(([term, value]) => (
                    <div key={term} className="flex items-baseline gap-6 py-4">
                      <dt className="label w-44 flex-none text-ink-faint">{term}</dt>
                      <dd className="text-[0.95rem] font-semibold text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
