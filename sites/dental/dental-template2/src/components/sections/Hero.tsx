"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EASE } from "@/components/animations";
import { Container } from "@/components/ui/primitives";
import { group } from "@/data/group";
import { doctors } from "@/data/doctors";
import { img } from "@/lib/images";

export default function Hero() {
  const still = useReducedMotion();
  const featured = doctors[0];

  const rise = (delay: number) =>
    still
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative overflow-hidden">
      {/* The only gradient on the site, and only behind the hero. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#eef6f2_0%,#fafaf7_62%)]"
        aria-hidden
      />

      <Container wide className="pb-14 pt-10 sm:pb-20 sm:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <motion.h1 className="display-xl text-ink" {...rise(0.05)}>
              Healthcare that fits your life.
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft"
              {...rise(0.15)}
            >
              {group.description}
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...rise(0.24)}>
              <Link
                href="/book"
                className="group inline-flex items-center gap-2 rounded-full bg-forest px-7 py-4 text-[0.95rem] font-semibold text-paper transition hover:bg-forest-deep"
              >
                Book an appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/doctors"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-7 py-4 text-[0.95rem] font-semibold text-ink transition hover:border-forest/40"
              >
                Find a doctor
              </Link>
            </motion.div>
          </div>

          {/* ------------------------------------------- composition */}
          <motion.div
            className="relative"
            initial={still ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
          >
            <div className="relative aspect-4/3 overflow-hidden rounded-[26px] bg-surface-2 shadow-[var(--shadow-lift)]">
              <Image
                src={img.hero}
                alt="A clinician talking with a patient in a consultation room"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover"
              />
            </div>

            {/* floating availability card — placeholder data, labelled as such */}
            <motion.div
              className="absolute -bottom-6 left-4 w-[16.5rem] rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow-lift)] sm:left-8"
              initial={still ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: EASE }}
            >
              <p className="label text-ink-faint">Next available</p>
              <p className="mt-2 flex items-center gap-2 font-display text-[1.2rem] font-semibold text-ink">
                <CalendarCheck className="h-4.5 w-4.5 text-forest" strokeWidth={1.8} aria-hidden />
                {featured.nextAvailable}
              </p>
              <p className="mt-0.5 text-[0.82rem] text-ink-soft">{featured.name}</p>
              <p className="mt-2 text-[0.72rem] text-ink-faint">
                Example availability — connect a scheduling system.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
