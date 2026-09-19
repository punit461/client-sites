"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Magnetic, TextReveal, EASE } from "@/components/animations";
import { Container } from "@/components/ui/primitives";
import { img } from "@/lib/images";

export default function FinalCta() {
  const { open } = useBooking();
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.06, 1.14]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-0 -z-20" style={still ? undefined : { y, scale }}>
        <Image
          src={img.finalCta}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-ink/72" aria-hidden />

      <Container wide className="py-24 text-center">
        <TextReveal text="Get your time back." className="type-mega mx-auto max-w-[11ch] text-paper" />

        <motion.p
          className="mx-auto mt-8 max-w-md text-[1.05rem] leading-relaxed text-paper/65"
          initial={still ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          Your laundry can wait. Your life shouldn&rsquo;t.
        </motion.p>

        <motion.div
          className="mt-11 flex flex-wrap items-center justify-center gap-3"
          initial={still ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, delay: 0.38, ease: EASE }}
        >
          <Magnetic>
            <button
              type="button"
              onClick={() => open()}
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-9 py-4.5 text-[0.98rem] font-semibold text-ink transition hover:bg-lime-deep"
            >
              Schedule your pickup
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Magnetic>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-9 py-4.5 text-[0.98rem] font-semibold text-paper transition hover:bg-paper hover:text-ink"
          >
            Explore services
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
