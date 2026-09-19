"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { contact } from "@/data/clinic";
import { img } from "@/lib/images";

export default function FinalCta() {
  const { open } = useBooking();
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="pb-20 sm:pb-28">
      <Container wide>
        <div className="relative isolate overflow-hidden rounded-[30px] bg-ink px-6 py-20 text-center sm:px-12 sm:py-28">
          <motion.div className="absolute inset-0 -z-10" style={still ? undefined : { y }}>
            <Image
              src={img.finalCta}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="scale-110 object-cover opacity-30"
            />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40" aria-hidden />

          <Reveal>
            <h2 className="display-lg mx-auto max-w-2xl text-ivory">
              Your smile deserves personalised care.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[1.05rem] text-ivory/70">
              Take the first step toward your next dental visit.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => open()}
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-terracotta-deep"
              >
                Book an appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href={`tel:${contact.phoneDial}`}
                className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-8 py-4 text-[0.95rem] font-semibold text-ivory transition hover:bg-ivory hover:text-ink"
              >
                <Phone className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                Call the clinic
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
