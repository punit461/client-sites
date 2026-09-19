"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { img } from "@/lib/images";

const STAGES = [
  { n: "01", title: "Consultation", copy: "A conversation about what you would like to change, and what is realistic." },
  { n: "02", title: "Treatment planning", copy: "Photographs and scans used to plan stages, timing and cost in writing." },
  { n: "03", title: "Personalised care", copy: "Treatment carried out at a pace that suits you, with checkpoints along the way." },
  { n: "04", title: "Follow-up", copy: "Review appointments and written aftercare, so nothing is left to guesswork." },
];

export default function FeaturedTreatment() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-4/5 overflow-hidden rounded-[26px] bg-surface-2 sm:aspect-16/12 lg:aspect-4/5">
              <motion.div className="absolute inset-0" style={still ? undefined : { y }}>
                <Image
                  src={img.featured}
                  alt="A clinician discussing treatment options with a patient"
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="scale-110 object-cover"
                />
              </motion.div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>Smile transformation</Eyebrow>
              <h2 className="display-lg mt-5 text-ink">
                Modern cosmetic dentistry designed around your natural smile.
              </h2>
              <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft">
                Cosmetic work starts with a healthy foundation and an honest conversation. What
                follows is planned in stages, with the costs agreed before anything begins.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-6">
              {STAGES.map((stage, i) => (
                <Reveal as="li" key={stage.n} delay={i * 0.08}>
                  <div className="flex gap-5 border-t border-line pt-5">
                    <span className="font-display text-[1.1rem] text-sage-deep">{stage.n}</span>
                    <div>
                      <h3 className="font-sans text-[1rem] font-bold tracking-tight text-ink">
                        {stage.title}
                      </h3>
                      <p className="mt-1 text-[0.9rem] leading-relaxed text-ink-soft">{stage.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={0.1}>
              <Link
                href="/treatments/cosmetic-dentistry"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-[0.92rem] font-semibold text-ivory transition hover:bg-ink/90"
              >
                Explore cosmetic dentistry
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
