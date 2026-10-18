"use client";

import { motion } from "framer-motion";
import { Stagger, staggerItem } from "@/components/motion/Reveal";
import { Container, Icon } from "@/components/ui/primitives";
import { highlights } from "@/data/content";

/** Four facts a parent wants before reading anything else. */
export default function Highlights() {
  return (
    <section className="border-y border-line bg-surface">
      <Container wide>
        <Stagger as="ul" className="grid grid-cols-2 divide-line sm:divide-x lg:grid-cols-4">
          {highlights.map((h) => (
            <motion.li key={h.label} variants={staggerItem} className="flex items-center gap-4 px-2 py-6 sm:px-6 lg:py-8">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-saffron-wash text-saffron-deep">
                <Icon name={h.icon} className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block font-display text-[1.05rem] font-semibold leading-tight text-ink sm:text-[1.25rem]">{h.value}</span>
                <span className="mt-1.5 block text-[0.78rem] leading-snug text-ink-soft">{h.label}</span>
              </span>
            </motion.li>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
