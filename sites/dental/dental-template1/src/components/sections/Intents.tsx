"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/motion/Reveal";
import { intents } from "@/data/treatments";
import type { IconName } from "@/lib/icons";

/**
 * The patient-intent entry point. People arrive knowing what is wrong, not
 * which treatment they need — so the first thing offered is their own words,
 * mapped onto the right page.
 */
export default function Intents() {
  return (
    <section className="py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="Start here"
          title="How can we help you?"
          copy="Tell us what brought you here and we will take you to the right place."
        />

        <Stagger className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {intents.map((intent) => (
            <motion.div key={intent.label} variants={staggerItem}>
              <Link
                href={intent.href}
                className="group flex h-full items-center gap-4 rounded-[18px] border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-sage hover:shadow-[var(--shadow-soft)]"
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-sage-wash text-sage-deep transition-colors group-hover:bg-sage-deep group-hover:text-white">
                  <Icon name={intent.icon as IconName} className="h-5 w-5" />
                </span>
                <span className="flex-1 text-[0.98rem] font-medium text-ink">{intent.label}</span>
                <ArrowRight
                  className="h-4 w-4 flex-none text-ink-faint transition-all group-hover:translate-x-1 group-hover:text-terracotta"
                  aria-hidden
                />
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
