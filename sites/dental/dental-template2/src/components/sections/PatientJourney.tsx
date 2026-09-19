"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { patientJourney } from "@/data/content";

/**
 * A sticky rail on desktop: the stage list stays while the photography moves.
 * On phones it collapses to a plain vertical sequence.
 */
export default function PatientJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section className="bg-forest py-16 text-paper sm:py-24">
      <Container wide>
        <SectionHeading
          label="Patient experience"
          title={<span className="text-paper">From first click to follow-up.</span>}
          copy="The same shape every time, so you always know what happens next."
          className="[&_.label]:text-mint [&_p]:text-paper/65"
        />

        <div ref={ref} className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <ol className="space-y-1 lg:sticky lg:top-28 lg:self-start">
            {patientJourney.map((stage, i) => (
              <li
                key={stage.stage}
                className="flex gap-5 border-b border-paper/12 py-5 last:border-b-0"
              >
                <span className="font-display text-[0.95rem] font-bold text-mint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[1.3rem] font-semibold text-paper">
                    {stage.stage}
                  </h3>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-paper/60">{stage.copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="grid grid-cols-2 gap-3">
            {patientJourney.slice(0, 4).map((stage, i) => (
              <motion.div
                key={stage.stage}
                className={`relative overflow-hidden rounded-[20px] bg-forest-deep ${
                  i % 3 === 0 ? "aspect-4/5" : "aspect-square"
                } ${i === 1 ? "mt-8" : ""}`}
                style={still || i % 2 === 0 ? undefined : { y }}
              >
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  fill
                  sizes="(max-width: 1024px) 46vw, 26vw"
                  className="object-cover opacity-85"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
