"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Siren } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { contact } from "@/data/group";
import { img } from "@/lib/images";

/**
 * Urgent contact: strong but calm, and deliberately not a triage widget. The
 * site routes people to a human and names the case that should bypass the
 * clinic entirely.
 */
export function UrgentContact() {
  return (
    <section id="urgent" className="py-8 sm:py-12">
      <Container wide>
        <Reveal>
          <div className="grid gap-8 rounded-[24px] border border-coral/30 bg-coral/[0.07] p-7 sm:p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-coral/15 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-coral-deep">
                <Siren className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                Urgent
              </span>
              <h2 className="display-md mt-4 text-ink">Need urgent help?</h2>
              <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">
                For urgent or emergency concerns, contact the clinic directly or use the
                appropriate local emergency service.
              </p>
              <p className="mt-3 max-w-xl text-[0.85rem] leading-relaxed text-ink-soft">
                This website cannot assess symptoms or decide how urgent something is. If you think
                it is an emergency, treat it as one.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href={`tel:${contact.phoneDial}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-coral-deep"
              >
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden />
                Call the clinic
              </a>
              <Link
                href="/locations"
                className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-surface px-6 py-4 text-[0.95rem] font-semibold text-ink transition hover:border-ink/30"
              >
                Find your nearest clinic
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <motion.div className="absolute inset-0 -z-20" style={still ? undefined : { y }}>
        <Image
          src={img.finalCta}
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-forest/88" aria-hidden />

      <Container wide className="py-24 text-center sm:py-32">
        <Reveal>
          <h2 className="display-lg mx-auto max-w-2xl text-paper">Your care starts here.</h2>
          <p className="mx-auto mt-5 max-w-md text-[1.02rem] text-paper/70">
            Book with the right clinician, at the clinic that suits you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2 rounded-full bg-coral px-8 py-4 text-[0.95rem] font-semibold text-white transition hover:bg-coral-deep"
            >
              Book appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-8 py-4 text-[0.95rem] font-semibold text-paper transition hover:bg-paper hover:text-ink"
            >
              Find a doctor
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-8 py-4 text-[0.95rem] font-semibold text-paper transition hover:bg-paper hover:text-ink"
            >
              Find a clinic
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
