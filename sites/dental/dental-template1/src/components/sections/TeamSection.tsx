"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/motion/Reveal";
import { team } from "@/data/team";

export default function TeamSection() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="Our team"
          title="Meet the people behind your care"
          copy="You will know who you are seeing before you arrive, and why."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((clinician) => (
            <motion.article key={clinician.slug} variants={staggerItem}>
              <Link
                href={`/team/${clinician.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface transition-all duration-300 hover:-translate-y-1.5 hover:border-sage hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative aspect-4/5 overflow-hidden">
                  <Image
                    src={clinician.portrait}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.3rem] text-ink">{clinician.name}</h3>
                  <p className="mt-0.5 text-[0.85rem] font-medium text-sage-deep">{clinician.role}</p>

                  <ul className="mt-3.5 flex flex-1 flex-wrap gap-1.5">
                    {clinician.areasOfPractice.slice(0, 3).map((area) => (
                      <li
                        key={area}
                        className="rounded-full bg-surface-2 px-2.5 py-1 text-[0.72rem] text-ink-soft"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-ink transition-colors group-hover:text-terracotta">
                    View profile
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
