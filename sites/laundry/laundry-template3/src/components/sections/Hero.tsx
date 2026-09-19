"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Aurora, EASE, Magnetic, WordReveal, usePointerGlow } from "@/components/motion";
import { Container } from "@/components/ui/primitives";
import { stories } from "@/data/content";
import { brand } from "@/data/site";
import { img } from "@/lib/images";

/** The two photographic plates, each drifting at its own rate as the hero leaves. */
const PLATES = [
  { src: img.heroRail, alt: "A rail of pressed shirts hanging in breathable covers" },
  { src: img.heroPress, alt: "A shirt collar being finished on a press" },
] as const;

export default function Hero() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const glow = usePointerGlow(section);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const plateA = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const plateB = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      id="top"
      ref={section}
      className="relative isolate min-h-[100svh] overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32"
    >
      <Aurora />

      {/* The pointer glow sits under the content and above the aurora. */}
      {glow.enabled ? (
        <motion.div
          className="pointer-events-none absolute -z-10 h-[34rem] w-[34rem] rounded-full bg-ice/10 blur-[110px]"
          style={{ left: glow.x, top: glow.y, x: "-50%", y: "-50%", opacity: glow.opacity }}
          aria-hidden
        />
      ) : null}

      <Container wide className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_minmax(0,1fr)] lg:gap-16">
          {/* ------------------------------------------------------- copy */}
          <motion.div style={still ? undefined : { y: copyY, opacity: fade }}>
            <motion.p
              className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[0.76rem] font-medium tracking-wide text-mist-soft"
              initial={still ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ice opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ice" />
              </span>
              {brand.announcement}
            </motion.p>

            <WordReveal
              as="h1"
              text="Your wardrobe, handled."
              className="display-xl mt-7 max-w-[12ch] font-semibold text-mist"
              delay={0.14}
            />

            <motion.p
              className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-mist-soft sm:text-[1.12rem]"
              initial={still ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.46, ease: EASE }}
            >
              A members&rsquo; laundry and dry-cleaning service. We collect on a schedule you set,
              treat every garment by its own care label, and bring it back hung, pressed and
              tracked.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={still ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={() => open()}
                  className="group inline-flex items-center gap-2 rounded-full bg-ice px-8 py-4 text-[0.95rem] font-semibold text-night transition hover:bg-ice-deep"
                >
                  Book a collection
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Magnetic>
              <a
                href="#standard"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-[0.95rem] font-semibold text-mist transition hover:border-ice/60 hover:bg-white/5"
              >
                <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
                See the standard
              </a>
            </motion.div>

            {/* ------------------------------------------------ social proof */}
            <motion.div
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4"
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <ul className="flex -space-x-3">
                {stories.map((story) => (
                  <li key={story.id}>
                    <Image
                      src={story.photo}
                      alt=""
                      aria-hidden
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full border-2 border-night object-cover"
                    />
                  </li>
                ))}
              </ul>
              <div>
                <p className="flex items-center gap-1 text-gold" aria-hidden>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </p>
                <p className="mt-1 text-[0.82rem] text-mist-soft">
                  <span className="font-semibold text-mist">4.9 out of 5</span> from 1,240 members
                  in Bengaluru
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ------------------------------------------------------ plates */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <motion.div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] border border-white/10"
              style={still ? undefined : { y: plateA }}
              initial={still ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            >
              <Image
                src={PLATES[0].src}
                alt={PLATES[0].alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-night via-night/10 to-transparent"
                aria-hidden
              />
            </motion.div>

            <motion.div
              className="absolute -left-4 bottom-14 hidden w-40 overflow-hidden rounded-[22px] border border-white/10 sm:block lg:-left-14 lg:w-48"
              style={still ? undefined : { y: plateB }}
              initial={still ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            >
              <div className="relative aspect-square">
                <Image
                  src={PLATES[1].src}
                  alt={PLATES[1].alt}
                  fill
                  sizes="12rem"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* A live-looking status card, which is what the tracker section shows in full. */}
            <motion.div
              className="panel absolute -right-2 top-8 w-52 rounded-[22px] p-4 lg:-right-10"
              initial={still ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.68, ease: EASE }}
            >
              <p className="eyebrow text-mist-faint">Next collection</p>
              <p className="mt-2 font-display text-[1.15rem] font-semibold leading-tight text-mist">
                Tonight, 6 – 8 PM
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden>
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-ice to-gold"
                  initial={still ? false : { width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1.4, delay: 1, ease: EASE }}
                />
              </div>
              <p className="mt-2.5 text-[0.74rem] text-mist-soft">
                22 garments · pressing &amp; checks
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
