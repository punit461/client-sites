"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Reveal, TextReveal } from "@/components/animations";
import { Container, Counter, Label } from "@/components/ui/primitives";
import { transformStats } from "@/data/content";
import { img } from "@/lib/images";

export default function Transformation() {
  const still = useReducedMotion();

  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container wide>
        <div className="text-center">
          <Label className="justify-center">The swap</Label>
          <TextReveal
            text="From laundry pile to wardrobe ready."
            className="type-xl mx-auto mt-5 max-w-[16ch] text-ink"
          />
        </div>

        <Reveal>
          <div className="mt-14 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
            <figure className="relative aspect-4/3 overflow-hidden rounded-[28px] bg-paper-2">
              <Image
                src={img.pile}
                alt="A pile of unwashed laundry by a machine"
                fill
                sizes="(max-width: 640px) 92vw, 40vw"
                className="object-cover grayscale"
              />
              <figcaption className="label absolute bottom-4 left-5 rounded-full bg-ink/80 px-3 py-1.5 text-paper backdrop-blur">
                Friday
              </figcaption>
            </figure>

            {/* the transformation arrow */}
            <div className="flex justify-center py-2 sm:py-0">
              <motion.span
                className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink"
                animate={still ? undefined : { x: [-4, 4, -4] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              >
                <ArrowRight className="h-6 w-6 rotate-90 sm:rotate-0" strokeWidth={2.2} />
              </motion.span>
            </div>

            <figure className="relative aspect-4/3 overflow-hidden rounded-[28px] bg-paper-2">
              <Image
                src={img.wardrobe}
                alt="An organised wardrobe of cleaned clothes"
                fill
                sizes="(max-width: 640px) 92vw, 40vw"
                className="object-cover"
              />
              <figcaption className="label absolute bottom-4 left-5 rounded-full bg-lime px-3 py-1.5 text-ink">
                Sunday
              </figcaption>
            </figure>
          </div>
        </Reveal>

        <dl className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
          {transformStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="numeral block text-[clamp(2.6rem,5vw,4rem)] text-ink">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="label mt-3 block text-ink-faint">{stat.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
