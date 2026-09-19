"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/animations";
import { treatments } from "@/data/care";

export default function FeaturedTreatments() {
  return (
    <section className="py-16 sm:py-24">
      <Container wide>
        <SectionHeading
          label="Treatments"
          title="Care for what matters to you"
          copy="What each one involves, in plain English, before you book anything."
        />

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t) => (
            <motion.article key={t.slug} variants={staggerItem}>
              <Link
                href={`/treatments/${t.slug}`}
                className="group flex h-full gap-4 overflow-hidden rounded-[20px] border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-forest/40 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative aspect-square w-24 flex-none overflow-hidden rounded-2xl sm:w-28">
                  <Image
                    src={t.image}
                    alt={t.alt}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="font-display text-[1.1rem] font-semibold text-ink">{t.name}</h3>
                  <p className="mt-1.5 flex-1 text-[0.85rem] leading-relaxed text-ink-soft">
                    {t.summary}
                  </p>
                  <p className="mt-2.5 flex items-center gap-1.5 text-[0.76rem] text-ink-faint">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
                    {t.consultationType}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-forest transition-colors group-hover:text-coral-deep">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
