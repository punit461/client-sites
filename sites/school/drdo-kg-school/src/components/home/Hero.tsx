"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/components/motion/Reveal";
import Sculpture from "@/components/three/Sculpture";
import { ButtonLink } from "@/components/ui/Button";
import Img from "@/components/ui/Img";
import { school } from "@/content/school";
import { photos } from "@/lib/images";

const lines = [
  { text: "A happy", className: "" },
  { text: "first step", className: "pl-[0.9em] sm:pl-[1.6em]" },
  { text: "into school.", className: "italic text-gold" },
];

/**
 * One composition, no carousel: an editorial headline on the left, the
 * school entrance on the right drifting slower than the page, and the
 * armillary sphere where the two meet.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const sculptureY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  // Lines rise out of their own masks, one after another. At rest when motion is reduced.
  const rise = (i: number) =>
    still
      ? { initial: false as const, animate: { y: "0%" } }
      : { initial: { y: "105%" }, animate: { y: "0%" }, transition: { duration: 1.05, delay: 0.15 + i * 0.12, ease: EASE } };
  const fade = (delay: number) =>
    still
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } };

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy text-white" aria-labelledby="hero-title">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px)",
          backgroundSize: "calc(100% / 12) 100%",
        }}
      />

      <div className="container-x grid min-h-[100svh] items-center gap-12 pb-24 pt-32 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-36">
        <div className="relative z-10 lg:col-span-7">
          <motion.p {...fade(0.05)} className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2 text-gold">
            <span className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" aria-hidden />
              Kindergarten · {school.classes}
            </span>
            <span className="rounded-xs border border-gold/40 px-2 py-1 tracking-[0.14em]">C V Raman Nagar, Bengaluru</span>
          </motion.p>

          <h1 id="hero-title" className="t-display mt-8 text-white">
            {lines.map((l, i) => (
              <span key={l.text} className="block overflow-hidden pb-[0.08em]">
                <motion.span {...rise(i)} className={`block ${l.className}`}>
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p {...fade(0.6)} className="t-lead mt-8 max-w-xl text-white/75">
            For more than twenty years, families in C V Raman Nagar have trusted us with their children&apos;s first years at school: caring
            teachers, bright classrooms and one of the best play areas in the neighbourhood.
          </motion.p>

          <motion.div {...fade(0.75)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/admissions/" variant="gold">
              Explore Admissions
            </ButtonLink>
            <ButtonLink href="/about/" variant="outlineLight">
              About the School
            </ButtonLink>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5 lg:self-stretch">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-xs sm:aspect-[5/4] sm:max-w-none lg:absolute lg:inset-y-0 lg:left-0 lg:aspect-auto lg:w-[calc(100%+max(0px,(100vw-82rem)/2)+2.5rem)] lg:max-w-none lg:rounded-none">
            <motion.div
              className="absolute inset-x-0 -bottom-[8%] top-0"
              style={still ? undefined : { y: imageY }}
              initial={still ? false : { scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: EASE }}
            >
              <Img photo={photos.entrance} width={900} sizes="(min-width: 1024px) 45vw, 100vw" className="object-[62%_50%]" preload />
            </motion.div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/20 lg:bg-gradient-to-r lg:from-navy lg:via-navy/10 lg:to-transparent" />
          </div>

          <motion.div
            style={still ? undefined : { y: sculptureY }}
            className="pointer-events-none absolute -bottom-10 -left-4 h-40 w-40 sm:h-52 sm:w-52 lg:-left-28 lg:bottom-[12%] lg:h-72 lg:w-72"
          >
            <Sculpture className="h-full w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]" />
          </motion.div>
        </div>
      </div>

      <a
        href="#credibility"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white/60 transition hover:text-white lg:flex"
      >
        Scroll
        <span className="scroll-cue relative block h-12 w-px overflow-hidden bg-white/20" aria-hidden />
      </a>
    </section>
  );
}
