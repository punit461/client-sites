"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/motion/Reveal";
import { treatments, type Treatment } from "@/data/treatments";

/**
 * Asymmetric on purpose: the first card in each row of three is taller, so the
 * grid reads as an editorial layout rather than a wall of equal tiles.
 */
const SPAN = (i: number) => (i % 5 === 0 ? "lg:col-span-2 lg:row-span-2" : "");
const ASPECT = (i: number) => (i % 5 === 0 ? "aspect-4/3 lg:aspect-4/5" : "aspect-4/3");

function Card({ treatment, index }: { treatment: Treatment; index: number }) {
  const big = index % 5 === 0;
  return (
    <motion.article
      variants={staggerItem}
      className={`group relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-sage hover:shadow-[var(--shadow-lift)] ${SPAN(index)}`}
    >
      <Link href={`/treatments/${treatment.slug}`} className="flex h-full flex-col">
        <div className={`relative overflow-hidden ${ASPECT(index)}`}>
          <Image
            src={treatment.image}
            alt={treatment.alt}
            fill
            sizes={big ? "(max-width: 1024px) 92vw, 46vw" : "(max-width: 1024px) 92vw, 23vw"}
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/92 text-sage-deep backdrop-blur">
            <Icon name={treatment.icon} className="h-4.5 w-4.5" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className={`font-display text-ink ${big ? "text-[1.6rem]" : "text-[1.25rem]"}`}>
            {treatment.name}
          </h3>
          <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-ink-soft">
            {treatment.summary}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-sage-deep transition-colors group-hover:text-terracotta">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function TreatmentsGrid() {
  return (
    <section id="treatments" className="bg-surface-2/60 py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="Treatments"
          title="Complete care for every stage of your smile"
          copy="From routine checkups to restorative and cosmetic work, planned around what you actually need."
        />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {treatments.map((treatment, i) => (
            <Card key={treatment.slug} treatment={treatment} index={i} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
