"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/animations";
import { specialties, type Specialty } from "@/data/care";

/** Footprints chosen so the rows fill exactly at lg: 3+2+1, 1+2, 2+1+... */
const SPANS: Record<Specialty["span"], string> = {
  lg: "lg:col-span-3 lg:row-span-2",
  md: "lg:col-span-2",
  sm: "lg:col-span-1",
};

const HEIGHTS: Record<Specialty["span"], string> = {
  lg: "min-h-[21rem] lg:min-h-[28rem]",
  md: "min-h-[15rem] lg:min-h-[13.5rem]",
  sm: "min-h-[14rem] lg:min-h-[13.5rem]",
};

export default function SpecialtiesBento() {
  return (
    <section id="specialties" className="py-16 sm:py-24">
      <Container wide>
        <SectionHeading
          label="Specialties"
          title="Care across every stage of life"
          copy="Eight specialties across three clinics, with the same approach in each."
        />

        <Stagger className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {specialties.map((s) => (
            <motion.article
              key={s.slug}
              variants={staggerItem}
              className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-[22px] bg-forest ${SPANS[s.span]} ${HEIGHTS[s.span]}`}
            >
              <Link href={`/specialties/${s.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">Explore {s.name}</span>
              </Link>

              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 40vw"
                className="-z-20 object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-forest via-forest/55 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-96"
                aria-hidden
              />

              <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-paper/15 text-paper backdrop-blur transition-all duration-300 group-hover:bg-coral group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
              <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl bg-paper/15 text-paper backdrop-blur">
                <Icon name={s.icon} className="h-4.5 w-4.5" />
              </span>

              <div className="p-5 transition-transform duration-500 group-hover:-translate-y-1">
                <h3
                  className={`font-display font-semibold tracking-tight text-paper ${
                    s.span === "lg" ? "text-[1.7rem]" : "text-[1.15rem]"
                  }`}
                >
                  {s.name}
                </h3>
                <p className="mt-1.5 max-w-sm text-[0.85rem] leading-relaxed text-paper/70">
                  {s.blurb}
                </p>

                {s.span === "lg" ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {s.popular.map((p) => (
                      <li
                        key={p}
                        className="rounded-full bg-paper/12 px-2.5 py-1 text-[0.72rem] text-paper/80"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </motion.article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
