"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useBooking } from "@/components/booking/BookingProvider";
import { Container } from "@/components/ui/primitives";
import Reveal from "@/components/ui/Reveal";
import { img } from "@/lib/images";

export default function FinalCta() {
  const { open } = useBooking();
  const still = useReducedMotion();

  return (
    <section className="py-20 sm:py-28">
      <Container wide>
        <div className="relative isolate overflow-hidden rounded-[32px] bg-ink px-6 py-20 text-center sm:px-12 sm:py-28">
          {/* photography, pushed right back behind a heavy tint */}
          <Image
            src={img.finalCta}
            alt=""
            fill
            aria-hidden
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="-z-10 object-cover opacity-25"
          />

          {/* two slow, opposed drifts — the "subtle animated background" */}
          {!still ? (
            <>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-24 top-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(14,159,110,0.5),transparent_66%)] blur-2xl"
                animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(192,138,62,0.4),transparent_66%)] blur-2xl"
                animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          ) : null}

          <Reveal>
            <h2 className="display-lg mx-auto max-w-2xl text-white">
              Ready to forget about laundry?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[1.05rem] text-white/70">
              Schedule your first pickup today.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => open()}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-accent-dark"
              >
                Schedule pickup
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-white/10"
              >
                View pricing
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
