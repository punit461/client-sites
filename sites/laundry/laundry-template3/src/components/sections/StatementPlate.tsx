"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { WordReveal } from "@/components/motion";
import { Container } from "@/components/ui/primitives";
import { img } from "@/lib/images";

/**
 * A full-bleed plate between the process and the plans — somewhere for a long
 * dark page to breathe.
 *
 * The photograph is taller than its frame and drifts inside it, which is all a
 * parallax is: the overflow is the travel. `overflow-hidden` on the section
 * keeps that from ever becoming a horizontal scrollbar.
 */
export default function StatementPlate() {
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={section} className="relative isolate overflow-hidden bg-night">
      <motion.div className="absolute inset-0 -z-20 h-[124%] -top-[12%]" style={still ? undefined : { y }}>
        <Image
          src={img.membership}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-night/80" aria-hidden />

      <Container className="py-28 text-center sm:py-36">
        <WordReveal
          text="A wardrobe is not a chore. It is the first thing anyone sees."
          className="display-lg mx-auto max-w-[18ch] font-semibold text-mist"
        />
        <p className="mx-auto mt-7 max-w-xl text-[1.02rem] leading-relaxed text-mist-soft">
          Members send us roughly eleven kilograms a month and get back somewhere near four hours of
          their own time. That is the entire pitch.
        </p>
      </Container>
    </section>
  );
}
