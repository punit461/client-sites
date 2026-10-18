"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal, { Stagger, staggerItem } from "@/components/motion/Reveal";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { achievements } from "@/data/content";
import { achievementImage, asset } from "@/lib/assets";

export default function AchievementsGrid({ limit, heading = true }: { limit?: number; heading?: boolean }) {
  const items = limit ? achievements.slice(0, limit) : achievements;

  return (
    <section id="achievements" className="py-20 sm:py-28">
      <Container wide>
        {heading ? (
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Achievements"
                title="Recognition for the school, and for the students who earn it."
              />
              {limit ? (
                <Link
                  href="/achievements"
                  className="group inline-flex flex-none items-center gap-2 text-[0.9rem] font-semibold text-coral-deep hover:text-ink"
                >
                  All achievements
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              ) : null}
            </div>
          </Reveal>
        ) : null}

        <Stagger as="ul" className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${heading ? "mt-12" : ""}`}>
          {items.map((a) => {
            const picture = achievementImage(a.image);
            return (
              <motion.li key={a.slug} variants={staggerItem} id={a.slug} className="card group flex flex-col overflow-hidden">
                {picture ? (
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                    <Image
                      src={asset(picture.src)}
                      alt={a.title}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-ink">{a.title}</h3>
                  <p className={`mt-3 text-[0.9rem] leading-relaxed text-ink-soft ${limit ? "line-clamp-4" : ""}`}>
                    {a.copy}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
