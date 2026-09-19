"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Container, Icon, Label, Stagger, staggerItem } from "@/components/ui";
import { experiences, type Experience } from "@/data/stay";

/** Footprints chosen so the six cards fill the rows exactly at lg. */
const SPANS: Record<Experience["span"], string> = {
  lg: "lg:col-span-3 lg:row-span-2",
  wide: "lg:col-span-6",
  md: "lg:col-span-2",
  sm: "lg:col-span-1",
};

const HEIGHTS: Record<Experience["span"], string> = {
  lg: "min-h-[20rem] lg:min-h-[27rem]",
  wide: "min-h-[17rem] lg:min-h-[17rem]",
  md: "min-h-[15rem] lg:min-h-[13rem]",
  sm: "min-h-[14rem] lg:min-h-[13rem]",
};

export default function ExperienceBento() {
  return (
    <section id="experiences" className="py-24 sm:py-32">
      <Container wide>
        <div className="max-w-2xl">
          <Label>Experiences</Label>
          <h2 className="display-lg mt-5 text-brown">
            Make your stay <span className="hand text-terracotta">more than a stay</span>.
          </h2>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-brown-soft">
            Most of these are included. None of them are compulsory — tell us the night before if
            you fancy one.
          </p>
        </div>

        <Stagger className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {experiences.map((experience) => (
            <motion.article
              key={experience.slug}
              variants={staggerItem}
              className={`group relative isolate flex min-w-0 flex-col justify-end overflow-hidden rounded-[28px] bg-brown p-6 ${SPANS[experience.span]} ${HEIGHTS[experience.span]}`}
            >
              <Image
                src={experience.image}
                alt={experience.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 40vw"
                className="-z-20 object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 -z-10 bg-gradient-to-t from-brown via-brown/45 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-96"
                aria-hidden
              />

              <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl bg-cream/15 text-cream backdrop-blur">
                <Icon name={experience.icon} className="h-5 w-5" />
              </span>

              {experience.included ? (
                <span className="absolute right-5 top-5 rounded-full bg-yellow px-3 py-1 text-[0.7rem] font-bold text-brown">
                  Included
                </span>
              ) : (
                <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream backdrop-blur transition-colors group-hover:bg-terracotta">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              )}

              <div className="transition-transform duration-500 group-hover:-translate-y-1">
                <h3
                  className={`font-display font-bold tracking-tight text-cream ${
                    experience.span === "lg" || experience.span === "wide"
                      ? "text-[1.7rem]"
                      : "text-[1.2rem]"
                  }`}
                >
                  {experience.name}
                </h3>
                <p className="mt-2 max-w-sm text-[0.86rem] leading-relaxed text-cream/70">
                  {experience.blurb}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-[0.76rem] text-cream/55">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  {experience.duration}
                </p>
              </div>
            </motion.article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
