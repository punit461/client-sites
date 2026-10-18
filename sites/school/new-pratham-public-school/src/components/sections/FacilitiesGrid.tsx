"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal, { Stagger, staggerItem } from "@/components/motion/Reveal";
import { Container, Icon, Pill, SectionHeading } from "@/components/ui/primitives";
import { facilities } from "@/data/content";

export default function FacilitiesGrid({
  limit,
  heading = true,
  tone = "cream",
}: {
  limit?: number;
  heading?: boolean;
  tone?: "cream" | "surface";
}) {
  const items = limit ? facilities.slice(0, limit) : facilities;

  return (
    <section id="facilities" className={`py-20 sm:py-28 ${tone === "surface" ? "bg-surface" : ""}`}>
      <Container wide>
        {heading ? (
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Facilities"
                title="Room to learn, and room to play."
                copy="Two dedicated play areas, a children's gymnasium, an indoor sports centre and well-equipped labs — a campus built for all-round development."
              />
              {limit ? (
                <Link
                  href="/facilities"
                  className="group inline-flex flex-none items-center gap-2 text-[0.9rem] font-semibold text-coral-deep hover:text-ink"
                >
                  All facilities
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        <Stagger as="ul" className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-4 ${heading ? "mt-12" : ""}`}>
          {items.map((f, i) => (
            <motion.li
              key={f.title}
              variants={staggerItem}
              className={`card group relative flex flex-col overflow-hidden p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] ${
                i < 2 && !limit ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-saffron">
                  <Icon name={f.icon} className="h-5.5 w-5.5" strokeWidth={1.7} />
                </span>
                {f.tag ? <Pill tone="leaf">{f.tag}</Pill> : null}
              </div>
              <h3 className="mt-5 font-display text-[1.25rem] font-semibold text-ink">{f.title}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ink-soft">{f.copy}</p>
            </motion.li>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
