"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import DateBar from "@/components/booking/DateBar";
import { Container, EASE, Icon } from "@/components/ui";
import { facts, fromRate, property } from "@/data/stay";
import { rupees } from "@/lib/format";
import { img } from "@/lib/images";

/**
 * A full-height plate with the type sitting on the floor of it, a fact rail
 * across the bottom edge and the date bar straddling the boundary into the
 * next section. The photograph drifts up as you scroll; nothing else moves.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const rise = (delay: number) =>
    still
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.95, delay, ease: EASE },
        };

  return (
    <section ref={ref} className="relative">
      <div className="relative flex min-h-[94svh] flex-col justify-end overflow-hidden">
        <motion.div className="absolute inset-0 -z-10" style={still ? undefined : { y: plateY }}>
          <Image
            src={img.hero}
            alt="The lake at dawn, from the veranda"
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover"
          />
          {/* Two scrims: one for the type at the bottom, one to keep the bar legible. */}
          <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/35" aria-hidden />
          <span className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" aria-hidden />
        </motion.div>

        <Container wide className="pb-14 pt-36 sm:pb-16">
          <motion.p className="label text-brass" {...rise(0.15)}>
            {property.eyebrow}
          </motion.p>

          <motion.h1 className="display-xl mt-7 max-w-[13ch] text-bone" {...rise(0.25)}>
            {property.headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" {...rise(0.4)}>
            <p className="max-w-md text-[1.02rem] leading-relaxed text-bone-soft">{property.intro}</p>
          </motion.div>

          <motion.div className="mt-9 flex flex-wrap items-center gap-4" {...rise(0.5)}>
            <Link
              href="/suites"
              className="inline-flex items-center gap-2.5 rounded-sm bg-bone px-7 py-4 text-[0.86rem] font-medium tracking-wide text-ink transition-colors hover:bg-white"
            >
              See the five rooms
            </Link>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2.5 text-[0.86rem] tracking-wide text-bone transition-colors hover:text-brass"
            >
              <span className="rule w-8 transition-all group-hover:w-12" aria-hidden />
              About the house
            </Link>
            <span className="mono ml-auto hidden text-[0.78rem] text-bone-soft lg:block">
              From {rupees(fromRate)} / night, all meals in
            </span>
          </motion.div>
        </Container>

        {/* --------------------------------------------------- fact rail */}
        <motion.div className="border-t border-bone/12 bg-ink/45 backdrop-blur-md" {...rise(0.65)}>
          <Container wide>
            <ul className="grid grid-cols-2 divide-bone/10 lg:grid-cols-4 lg:divide-x">
              {facts.map((fact, i) => (
                <li
                  key={fact.value}
                  className={`flex items-center gap-3.5 py-5 lg:px-7 ${i === 0 ? "lg:pl-0" : ""}`}
                >
                  <Icon name={fact.icon} className="h-5 w-5 flex-none text-brass" />
                  <span className="min-w-0">
                    <span className="block truncate text-[0.92rem] text-bone">{fact.value}</span>
                    <span className="mono block truncate text-[0.72rem] text-bone-faint">{fact.label}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Container>
        </motion.div>

        <motion.span
          className="pointer-events-none absolute bottom-28 right-6 hidden items-center gap-3 lg:flex"
          style={still ? undefined : { opacity: fade }}
          aria-hidden
        >
          <span className="label text-bone-faint [writing-mode:vertical-rl]">Scroll</span>
          <motion.span
            className="h-14 w-px bg-gradient-to-b from-brass to-transparent"
            animate={still ? undefined : { scaleY: [0.4, 1, 0.4] }}
            style={{ transformOrigin: "top" }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.span>
      </div>

      {/* The bar straddles the hero and what follows. */}
      <Container wide className="relative z-10 -mt-8">
        <DateBar />
      </Container>
    </section>
  );
}
