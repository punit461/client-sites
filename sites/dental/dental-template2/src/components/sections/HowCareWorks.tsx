"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { careSteps } from "@/data/care";

/** The connecting line fills as the section passes — the only motion here. */
export default function HowCareWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 65%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-mint/45 py-16 sm:py-24">
      <Container wide>
        <SectionHeading label="How it works" title="Four steps, start to finish" align="center" />

        <div ref={ref} className="relative mt-14">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-forest/15 lg:block" aria-hidden />
          <motion.div
            className="absolute left-0 top-6 hidden h-px bg-forest lg:block"
            style={still ? { width: "100%" } : { width: fill }}
            aria-hidden
          />

          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {careSteps.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 0.09}>
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-[#eef6f2] bg-forest font-display text-[0.92rem] font-bold text-paper">
                  {step.n}
                </span>
                <h3 className="mt-5 font-display text-[1.25rem] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-soft">{step.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
