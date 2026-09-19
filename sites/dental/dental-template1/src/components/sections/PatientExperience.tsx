"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { journey } from "@/data/content";

/**
 * Three stages, told as a sequence. The connecting line fills as the section
 * passes, which is the only motion here — the photography does the work.
 */
export default function PatientExperience() {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="bg-ink py-20 text-ivory sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="Patient experience"
          title={<span className="text-ivory">Designed around you.</span>}
          copy="From the first phone call to the follow-up, the same idea: tell people what is happening."
          align="center"
          className="[&_p]:text-ivory/65"
        />

        <div ref={ref} className="relative mt-16">
          {/* the connecting rail — desktop only */}
          <div className="absolute inset-x-0 top-[9.5rem] hidden h-px bg-ivory/15 lg:block" aria-hidden />
          <motion.div
            className="absolute left-0 top-[9.5rem] hidden h-px bg-sage lg:block"
            style={still ? { width: "100%" } : { width: fill }}
            aria-hidden
          />

          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {journey.map((stage, i) => (
              <Reveal as="li" key={stage.stage} delay={i * 0.1}>
                <div className="relative aspect-4/3 overflow-hidden rounded-[22px] bg-ink/40">
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 31vw"
                    className="object-cover opacity-90"
                  />
                </div>

                <span
                  className="relative z-10 mx-auto mt-[-0.6rem] hidden h-3 w-3 rounded-full border-2 border-ink bg-sage lg:block"
                  aria-hidden
                />

                <h3 className="mt-6 font-display text-[1.5rem] text-ivory lg:mt-8">{stage.stage}</h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ivory/60">{stage.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
