"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useRef } from "react";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { steps } from "@/data/services";

/**
 * A horizontal timeline on desktop, a vertical one on phones. Both are drawn
 * from the same data; only the rail's direction changes, so the bag that
 * travels along it follows whichever rail is on screen.
 */
export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.5 });
  const railWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const bagLeft = useTransform(progress, [0, 1], ["0%", "100%"]);
  const bagTilt = useTransform(progress, [0, 0.25, 0.5, 0.75, 1], [-6, 5, -5, 6, 0]);

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="How it works"
          title="Four steps, about a minute of your time"
          copy="The only part you do is the first one."
          align="center"
        />

        <div ref={ref} className="relative mt-16 lg:mt-24">
          {/* ------------------------------------------- desktop rail */}
          <div className="relative hidden lg:block">
            <div className="absolute left-0 right-0 top-[3.25rem] h-0.5 rounded-full bg-line" aria-hidden />
            <motion.div
              className="absolute left-0 top-[3.25rem] h-0.5 rounded-full bg-accent"
              style={still ? { width: "100%" } : { width: railWidth }}
              aria-hidden
            />

            {/* the bag travelling the rail */}
            {!still ? (
              <motion.div
                className="absolute top-[3.25rem] z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: bagLeft }}
                aria-hidden
              >
                <motion.span
                  className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-bg bg-accent text-white shadow-lg"
                  style={{ rotate: bagTilt }}
                >
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.9} />
                </motion.span>
              </motion.div>
            ) : null}

            <ol className="grid grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <Reveal as="li" key={step.index} delay={i * 0.1}>
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-sm font-bold text-accent">{step.index}</span>
                    <span
                      className="relative z-[5] mt-3 flex h-[1.65rem] w-[1.65rem] items-center justify-center rounded-full border-4 border-bg bg-line"
                      aria-hidden
                    />
                    <span className="mt-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon name={step.icon} className="h-[1.35rem] w-[1.35rem]" />
                    </span>
                    <h3 className="mt-5 font-display text-[1.35rem] text-ink">{step.title}</h3>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">{step.copy}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* -------------------------------------------- mobile rail */}
          <ol className="relative space-y-10 lg:hidden">
            <div className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 rounded-full bg-line" aria-hidden />
            {steps.map((step, i) => (
              <Reveal as="li" key={step.index} delay={i * 0.08}>
                <div className="relative flex gap-5">
                  <span className="relative z-[5] flex h-11 w-11 flex-none items-center justify-center rounded-full border-4 border-bg bg-accent-soft text-accent">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <div className="pt-1">
                    <span className="font-mono text-xs font-bold text-accent">{step.index}</span>
                    <h3 className="mt-1 font-display text-[1.28rem] text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-ink-soft">{step.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
