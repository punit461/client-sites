"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import BookingWidget from "@/components/booking/BookingWidget";
import { Container, EASE, Float, Icon } from "@/components/ui";
import { heroCards, property } from "@/data/stay";
import { img } from "@/lib/images";

/**
 * A split hero rather than a centred one: type on the left, a tall plate on the
 * right with cards floating over its edges. The booking widget then straddles
 * the boundary into the next section.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const plateY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const rise = (delay: number) =>
    still
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section ref={ref} className="relative overflow-hidden pt-8 sm:pt-12">
      {/* An organic blob behind the composition. */}
      <div
        className="pointer-events-none absolute -right-40 -top-24 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(232,137,75,0.16),transparent_62%)]"
        aria-hidden
      />

      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
          <div>
            <motion.p className="label text-terracotta" {...rise(0.05)}>
              {property.eyebrow}
            </motion.p>

            <motion.h1 className="display-xl mt-6 text-brown" {...rise(0.14)}>
              {property.headline.map((line, i) => (
                <span key={line} className="block">
                  {i === 2 ? (
                    <>
                      Explore <span className="hand text-terracotta">more.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-brown-soft"
              {...rise(0.26)}
            >
              {property.intro}
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...rise(0.36)}>
              <Link
                href="/stay"
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 text-[0.92rem] font-semibold text-cream transition hover:bg-terracotta-deep"
              >
                Find your stay
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 rounded-full border-2 border-brown/15 px-7 py-4 text-[0.92rem] font-semibold text-brown transition hover:border-brown"
              >
                Explore experiences
              </Link>
            </motion.div>
          </div>

          {/* --------------------------------------------- plate */}
          <motion.div
            className="relative"
            initial={still ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
          >
            <motion.div
              className="relative aspect-4/5 overflow-hidden rounded-[36px] bg-cream-2"
              style={still ? undefined : { y: plateY }}
            >
              <Image
                src={img.hero}
                alt="The house among the trees"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
            </motion.div>

            {/* floating cards over the plate's edges */}
            <Float className="absolute -left-3 top-10 sm:-left-8" distance={9} duration={6.5}>
              <Card {...heroCards[0]} />
            </Float>
            <Float className="absolute -right-2 top-1/2 sm:-right-6" distance={11} duration={7.5} delay={0.6}>
              <Card {...heroCards[1]} />
            </Float>
            <Float className="absolute -bottom-4 left-6 sm:left-12" distance={8} duration={6} delay={1.2}>
              <Card {...heroCards[2]} />
            </Float>
          </motion.div>
        </div>

        {/* the widget straddles the hero and what follows */}
        <div className="relative z-10 mt-12 sm:mt-16">
          <BookingWidget />
        </div>
      </Container>
    </section>
  );
}

function Card({ value, label, icon }: { value: string; label: string; icon: Parameters<typeof Icon>[0]["name"] }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-[var(--shadow-card)]">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-yellow/20 text-terracotta">
        <Icon name={icon} className="h-4.5 w-4.5" />
      </span>
      <span>
        <span className="block text-[0.92rem] font-bold leading-none text-brown">{value}</span>
        <span className="mt-1 block text-[0.72rem] text-brown-faint">{label}</span>
      </span>
    </div>
  );
}
