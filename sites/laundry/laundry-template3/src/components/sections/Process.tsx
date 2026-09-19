"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, WordReveal } from "@/components/motion";
import { Container, Eyebrow, Icon } from "@/components/ui/primitives";
import { steps } from "@/data/content";

/**
 * The five stages, on a rail that fills as the section scrolls.
 *
 * The rail is a single absolutely-positioned line scaled from its top edge, so
 * it costs one transform rather than a class change per step. Under reduced
 * motion the scroll transform is dropped and the line is simply drawn full —
 * the connection between the stages is information, and losing it would leave
 * five disconnected cards.
 */
export default function Process() {
  const still = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rail,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>How it works</Eyebrow>
          <WordReveal
            text="Booked in a minute. Back in a day."
            className="display-lg mt-5 font-semibold text-mist"
          />
          <p className="mt-6 text-[1.02rem] leading-relaxed text-mist-soft">
            The whole service is five stages, and you are only involved in the first one.
          </p>
        </div>

        <div ref={rail} className="relative mt-16 pl-14 sm:pl-20">
          {/* The rail: a faint track, with the filled line scaled over it. */}
          <div className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-line sm:left-[1.7rem]" aria-hidden />
          <motion.div
            className="absolute bottom-6 left-[1.35rem] top-6 w-px origin-top bg-gradient-to-b from-ice via-ice/60 to-gold sm:left-[1.7rem]"
            style={still ? { scaleY: 1 } : { scaleY: fill }}
            aria-hidden
          />

          <ol className="space-y-12 sm:space-y-14">
            {steps.map((step, index) => (
              <Reveal as="li" key={step.id} delay={index * 0.04} className="relative">
                <span
                  className="absolute -left-14 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-deep text-ice sm:-left-20 sm:h-[3.4rem] sm:w-[3.4rem]"
                  aria-hidden
                >
                  <Icon name={step.icon} className="h-[18px] w-[18px] sm:h-5 sm:w-5" />
                </span>

                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-[1.3rem] font-medium tracking-tight text-mist sm:text-[1.6rem]">
                    <span className="mr-3 text-[0.8rem] font-semibold tabular-nums text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </h3>
                  <span className="rounded-full border border-line px-3 py-1 text-[0.72rem] font-medium text-mist-faint">
                    {step.meta}
                  </span>
                </div>

                <p className="mt-3 max-w-xl text-[0.97rem] leading-relaxed text-mist-soft">
                  {step.copy}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
