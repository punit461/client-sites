"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import StaySearch from "@/components/booking/StaySearch";
import { Container, EASE } from "@/components/ui";
import { property } from "@/data/stay";
import { img } from "@/lib/images";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const rise = (delay: number) =>
    still
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <motion.div className="absolute inset-0 -z-20" style={still ? undefined : { y: imageY }}>
        <Image
          src={img.hero}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </motion.div>
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/55 via-charcoal/25 to-charcoal/80"
        aria-hidden
      />

      <Container wide className="relative pb-10 pt-28 sm:pb-14">
        <motion.div
          className="max-w-2xl"
          style={still ? undefined : { y: copyY, opacity: fade }}
        >
          <motion.p className="label text-beige" {...rise(0.15)}>
            {property.tagline}
          </motion.p>

          <motion.h1 className="display-xl mt-6 text-ivory" {...rise(0.3)}>
            {property.headline}
          </motion.h1>

          <motion.p
            className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-ivory/75"
            {...rise(0.45)}
          >
            {property.intro}
          </motion.p>

          <motion.div className="mt-9 flex flex-wrap items-center gap-3" {...rise(0.58)}>
            <Link
              href="/rooms"
              className="rounded-full bg-ivory px-8 py-4 text-[0.9rem] font-medium tracking-wide text-charcoal transition hover:bg-white"
            >
              Explore rooms
            </Link>
            <Link
              href="/booking"
              className="rounded-full border border-ivory/35 px-8 py-4 text-[0.9rem] font-medium tracking-wide text-ivory transition hover:bg-ivory hover:text-charcoal"
            >
              Book your stay
            </Link>
          </motion.div>
        </motion.div>

        {/* floating search card */}
        <motion.div
          className="mt-10 sm:mt-14"
          initial={still ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
        >
          <StaySearch />
        </motion.div>
      </Container>
    </section>
  );
}
