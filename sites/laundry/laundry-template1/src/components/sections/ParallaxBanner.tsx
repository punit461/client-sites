"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Container } from "@/components/ui/primitives";
import { EASE } from "@/components/ui/Reveal";
import { img } from "@/lib/images";

/**
 * A scroll-driven parallax rather than `background-attachment: fixed`, which
 * iOS Safari has never supported and which forces a repaint on every frame.
 */
export default function ParallaxBanner() {
  const { open } = useBooking();
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.12]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={still ? undefined : { y, scale }}>
        <Image
          src={img.banner}
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="scale-110 object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-ink/72" aria-hidden />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent"
        aria-hidden
      />

      <Container wide>
        <div className="flex min-h-[26rem] max-w-xl flex-col justify-center py-24 sm:min-h-[32rem] sm:py-32">
          <motion.h2
            className="display-lg text-white"
            initial={still ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            Less laundry.
            <br />
            More life.
          </motion.h2>

          <motion.p
            className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-white/75"
            initial={still ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.75, delay: 0.12, ease: EASE }}
          >
            Let us take care of the clothes while you take care of what matters.
          </motion.p>

          <motion.div
            className="mt-9"
            initial={still ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
          >
            <button
              type="button"
              onClick={() => open()}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-[0.95rem] font-semibold text-ink transition hover:bg-accent hover:text-white"
            >
              Book a pickup
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
