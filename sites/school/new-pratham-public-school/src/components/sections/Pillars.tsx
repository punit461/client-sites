"use client";

import { motion } from "framer-motion";
import Reveal, { Stagger, staggerItem } from "@/components/motion/Reveal";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import { pillars } from "@/data/content";

const TONES = [
  "bg-coral-wash text-coral-deep",
  "bg-leaf-wash text-leaf-deep",
  "bg-sky-wash text-sky",
  "bg-saffron-wash text-saffron-deep",
];

export default function Pillars() {
  return (
    <section id="what-we-offer" className="py-20 sm:py-28">
      <Container wide>
        <Reveal>
          <SectionHeading
            eyebrow="What we offer"
            title="Empowering students to excel academically, grow personally and lead with confidence."
            copy="Four commitments that shape every day at NPPS."
          />
        </Reveal>

        <Stagger as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.li key={p.title} variants={staggerItem} className="card flex flex-col p-6">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${TONES[i % TONES.length]}`}>
                <Icon name={p.icon} className="h-5.5 w-5.5" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 font-display text-[1.35rem] font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">{p.copy}</p>
            </motion.li>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
