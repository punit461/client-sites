"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Clock, PackageCheck, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Container, Float } from "@/components/ui/primitives";
import { EASE } from "@/components/ui/Reveal";
import { img } from "@/lib/images";

export default function Hero() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);

  /** Scroll parallax: each layer leaves at its own speed. */
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /** Pointer parallax: the floating cards lean towards the cursor. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 90, damping: 18, mass: 0.4 });
  const leanX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const leanY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const leanXSoft = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const leanYSoft = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (still) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const rise = (delay: number) =>
    still
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <section
      id="top"
      ref={section}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative isolate overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14 lg:min-h-[90vh] lg:pb-28 lg:pt-16"
    >
      {/* Soft brand wash behind everything. */}
      <motion.div
        aria-hidden
        style={still ? undefined : { y: bgY }}
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[46rem]"
      >
        <div className="absolute left-1/2 top-0 h-[38rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,159,110,0.14),transparent_62%)]" />
        <div className="absolute right-[6%] top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(192,138,62,0.13),transparent_65%)]" />
      </motion.div>

      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-8">
          {/* --------------------------------------------------- copy */}
          <motion.div style={still ? undefined : { y: copyY, opacity: fade }} className="max-w-xl">
            <motion.p className="eyebrow" {...rise(0.05)}>
              Laundry, simplified
            </motion.p>

            <motion.h1 className="display-xl mt-5 text-ink" {...rise(0.14)}>
              Your clothes deserve
              <br className="hidden sm:block" /> a{" "}
              <span className="relative inline-block">
                better routine.
                <svg
                  className="absolute -bottom-1 left-0 h-3 w-full text-accent/35"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 9C60 3 120 2 180 5s90 4 118 1"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft sm:text-lg"
              {...rise(0.24)}
            >
              Professional laundry, dry cleaning and ironing delivered straight to your doorstep.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...rise(0.32)}>
              <button
                type="button"
                onClick={() => open()}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[0.95rem] font-semibold text-white shadow-[0_18px_40px_-18px_rgba(14,159,110,0.95)] transition hover:bg-accent-dark"
              >
                Schedule a pickup
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-7 py-4 text-[0.95rem] font-semibold text-ink transition hover:border-ink/25 hover:bg-surface-2"
              >
                Explore services
              </a>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ink-soft"
              {...rise(0.42)}
            >
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold text-gold" strokeWidth={1.5} aria-hidden />
                4.9 from 2,400+ reviews
              </span>
              <span className="inline-flex items-center gap-2">
                <PackageCheck className="h-4 w-4 text-accent" strokeWidth={1.7} aria-hidden />
                Free pickup above ₹499
              </span>
            </motion.div>
          </motion.div>

          {/* ------------------------------------------------ composition */}
          <motion.div
            className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
            style={still ? undefined : { y: midY }}
            initial={still ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.16, ease: EASE }}
          >
            {/* main plate */}
            <div className="relative aspect-4/5 overflow-hidden rounded-[28px] bg-surface-2 shadow-[0_40px_90px_-40px_rgba(12,27,42,0.45)] sm:aspect-square lg:aspect-4/5">
              <Image
                src={img.heroPortrait}
                alt="A person carrying a stack of freshly cleaned, folded clothes"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 46vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
            </div>

            {/* floating: turnaround badge */}
            <motion.div
              className="absolute -left-3 top-6 sm:left-2 sm:top-10"
              style={still ? undefined : { x: leanX, y: leanY }}
            >
              <Float distance={8} duration={7}>
                <div className="glass flex items-center gap-2.5 rounded-2xl px-4 py-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/12 text-accent">
                    <Clock className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-bold leading-none text-ink">
                      24–48 hr
                    </span>
                    <span className="mt-1 block text-[0.7rem] text-ink-soft">turnaround</span>
                  </span>
                </div>
              </Float>
            </motion.div>

            {/* floating: folded shirt card */}
            <motion.div
              className="absolute -right-2 top-1/3 w-36 sm:-right-6 sm:w-44"
              style={still ? undefined : { x: leanXSoft, y: leanYSoft }}
            >
              <Float distance={11} duration={8} delay={0.6}>
                <div className="overflow-hidden rounded-2xl border border-white/80 bg-surface p-2 shadow-[0_24px_50px_-24px_rgba(12,27,42,0.5)]">
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl">
                    <Image
                      src={img.heroFolded}
                      alt="Shirts folded and stacked after pressing"
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                  </div>
                  <p className="px-1 pb-0.5 pt-2 text-[0.7rem] font-semibold text-ink">
                    Folded, not crumpled
                  </p>
                </div>
              </Float>
            </motion.div>

            {/* floating: delivery status */}
            <motion.div
              className="absolute -bottom-5 left-2 w-[15.5rem] sm:left-6 sm:w-64"
              style={still ? undefined : { x: leanX, y: cardY }}
            >
              <Float distance={9} duration={6.5} delay={1.1}>
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-faint">
                      Order FL-2048
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-accent-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      On the way
                    </span>
                  </div>

                  <p className="mt-2.5 text-[0.9rem] font-semibold text-ink">
                    Out for delivery
                  </p>
                  <p className="text-[0.72rem] text-ink-soft">12 items · arriving by 7:30 PM</p>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/8">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={still ? false : { width: "12%" }}
                      animate={{ width: "82%" }}
                      transition={{ duration: 1.8, delay: 0.9, ease: EASE }}
                    />
                  </div>
                </div>
              </Float>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
