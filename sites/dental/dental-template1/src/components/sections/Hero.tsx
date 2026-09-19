"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { EASE } from "@/components/motion/Reveal";
import { Container, Stars } from "@/components/ui/primitives";
import { clinic, evidence } from "@/data/clinic";
import { img } from "@/lib/images";

export default function Hero() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const rise = (delay: number) =>
    still
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section ref={section} className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
      {/* A soft sage wash behind the composition. */}
      <div
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[34rem] w-[52rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,169,154,0.2),transparent_65%)]"
        aria-hidden
      />

      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-[45fr_55fr] lg:gap-14">
          {/* --------------------------------------------------- copy */}
          <motion.div style={still ? undefined : { y: copyY }}>
            <motion.p className="eyebrow" {...rise(0.05)}>
              Modern dentistry in {clinic.city}
            </motion.p>

            <motion.h1 className="display-xl mt-6 text-ink" {...rise(0.12)}>
              Confident smiles start with comfortable care.
            </motion.h1>

            <motion.p
              className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg"
              {...rise(0.22)}
            >
              {clinic.description}
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...rise(0.3)}>
              <button
                type="button"
                onClick={() => open()}
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-terracotta-deep"
              >
                Book an appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-7 py-4 text-[0.95rem] font-semibold text-ink transition hover:border-ink/25 hover:bg-surface-2"
              >
                Explore treatments
              </Link>
            </motion.div>

            {/* Rating is configuration: with nothing verified, the site says
                only that patients are asked — never an invented score. */}
            <motion.div className="mt-9 flex items-center gap-3" {...rise(0.38)}>
              {evidence.rating ? (
                <>
                  <Stars rating={Math.round(evidence.rating.score)} />
                  <p className="text-sm text-ink-soft">
                    <strong className="font-semibold text-ink">
                      {evidence.rating.score.toFixed(1)}
                    </strong>{" "}
                    from{" "}
                    <a href={evidence.rating.url} className="underline underline-offset-4">
                      {evidence.rating.count} {evidence.rating.source} reviews
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <Stars />
                  <p className="text-sm text-ink-soft">Trusted by our patients</p>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* --------------------------------------------- composition */}
          <motion.div
            className="relative"
            initial={still ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
          >
            <motion.div
              className="relative aspect-4/5 overflow-hidden rounded-[26px] bg-surface-2 shadow-[var(--shadow-lift)] sm:aspect-16/12 lg:aspect-4/5"
              style={still ? undefined : { y: imageY }}
            >
              <Image
                src={img.hero}
                alt="A dentist talking with a patient in a bright treatment room"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="object-cover"
              />
            </motion.div>

            {/* floating appointment card */}
            <motion.div
              className="absolute -bottom-5 left-4 w-[15.5rem] sm:left-8 sm:w-64"
              initial={still ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            >
              <div className="glass rounded-2xl p-4">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Your next appointment
                </p>
                <p className="mt-2 flex items-center gap-2 font-display text-[1.25rem] text-ink">
                  <CalendarCheck className="h-4.5 w-4.5 text-sage-deep" strokeWidth={1.8} aria-hidden />
                  Tuesday · 10:30 AM
                </p>
                <p className="mt-1 text-[0.74rem] text-ink-soft">
                  Example card — replace with real scheduling.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
