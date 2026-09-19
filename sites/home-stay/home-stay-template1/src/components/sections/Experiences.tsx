"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Container, Icon, Label, Reveal } from "@/components/ui";
import { experiences, type Experience } from "@/data/stay";

/** Alternating split-screens, with the photography drifting as you pass it. */
function Row({ experience, index }: { experience: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const flipped = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        flipped ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-[26px] bg-ivory-2 lg:aspect-4/5">
        <motion.div className="absolute inset-0" style={still ? undefined : { y }}>
          <Image
            src={experience.image}
            alt={experience.alt}
            fill
            sizes="(max-width: 1024px) 92vw, 46vw"
            className="scale-110 object-cover"
          />
        </motion.div>
      </div>

      <Reveal>
        <span className="font-display text-[1.1rem] text-olive">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="display-md mt-3 text-charcoal">{experience.name}</h3>
        <p className="mt-4 max-w-md text-[1.02rem] leading-relaxed text-charcoal-soft">
          {experience.detail}
        </p>

        <dl className="mt-7 flex flex-wrap gap-x-9 gap-y-3 border-t border-line pt-6 text-[0.86rem]">
          <div>
            <dt className="label text-charcoal-faint">Duration</dt>
            <dd className="mt-1 text-charcoal">{experience.duration}</dd>
          </div>
          <div>
            <dt className="label text-charcoal-faint">When</dt>
            <dd className="mt-1 text-charcoal">{experience.when}</dd>
          </div>
          <div>
            <dt className="label text-charcoal-faint">Cost</dt>
            <dd className="mt-1 text-charcoal">
              {experience.included ? "Included in your stay" : "Charged separately"}
            </dd>
          </div>
        </dl>
      </Reveal>
    </div>
  );
}

export default function Experiences({ limit }: { limit?: number }) {
  const shown = limit ? experiences.slice(0, limit) : experiences;

  return (
    <section id="experiences" className="border-t border-line bg-ivory-2/50 py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Label>Experiences</Label>
            <h2 className="display-lg mt-5 text-charcoal">
              Things to do, and permission to do none of them.
            </h2>
          </div>
          {limit ? (
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 text-[0.88rem] tracking-wide text-charcoal-soft underline-offset-8 transition hover:text-charcoal hover:underline"
            >
              All experiences
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>

        <div className="mt-16 space-y-20 sm:space-y-28">
          {shown.map((experience, i) => (
            <Row key={experience.slug} experience={experience} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

/** A compact card list, used on the experiences index page. */
export function ExperienceCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [&>*]:min-w-0">
      {experiences.map((experience, i) => (
        <Reveal key={experience.slug} delay={i * 0.06}>
          <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-line bg-surface">
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src={experience.image}
                alt={experience.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 31vw"
                className="object-cover transition-transform duration-[1100ms] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-[1.4rem] text-charcoal">{experience.name}</h3>
              <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-charcoal-soft">
                {experience.blurb}
              </p>
              <p className="mt-5 flex items-center gap-4 text-[0.8rem] text-charcoal-faint">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  {experience.duration}
                </span>
                {experience.included ? (
                  <span className="rounded-full bg-olive-soft px-2.5 py-1 text-olive">Included</span>
                ) : null}
              </p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
