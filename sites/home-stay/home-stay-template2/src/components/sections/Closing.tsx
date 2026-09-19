"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Container, Icon, Label, Reveal } from "@/components/ui";
import { contact, faqs, journal } from "@/data/stay";
import { img } from "@/lib/images";

/** ---------------------------------------------------------- instagram */
export function TravelMoments() {
  const shots = journal.filter((j) => j.kind === "photo" || j.kind === "polaroid").slice(0, 6);

  return (
    <section className="pb-24 sm:pb-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Label>Travel moments</Label>
            <h2 className="display-md mt-4 text-brown">Follow our journey</h2>
          </div>
          <a
            href="#"
            className="text-[0.9rem] font-semibold text-terracotta hover:text-terracotta-deep"
          >
            @wanderandpine
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {shots.map((shot, i) => (
            <a
              key={i}
              href="#"
              className="group relative aspect-square overflow-hidden rounded-[18px] bg-cream-2"
              aria-label="Open on Instagram"
            >
              <Image
                src={"src" in shot ? shot.src : img.hero}
                alt=""
                fill
                sizes="(max-width: 1024px) 31vw, 16vw"
                className="object-cover transition-transform duration-[900ms] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-brown/0 transition-colors duration-300 group-hover:bg-brown/25" />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** ---------------------------------------------------------- faq */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const still = useReducedMotion();

  return (
    <section id="faq" className="py-24 sm:py-32">
      <Container narrow>
        <Label>Good to know</Label>
        <h2 className="display-lg mt-5 text-brown">Questions, answered.</h2>

        <Reveal>
          <ul className="mt-12 space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={faq.q}
                  className={`overflow-hidden rounded-[22px] border transition-colors ${
                    isOpen ? "border-terracotta bg-surface" : "border-line bg-surface"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-start justify-between gap-6 p-6 text-left"
                    >
                      <span className="text-[1.02rem] font-bold text-brown">{faq.q}</span>
                      <motion.span
                        className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full transition-colors ${
                          isOpen ? "bg-terracotta text-cream" : "bg-cream-2 text-brown"
                        }`}
                        animate={{ rotate: isOpen ? 135 : 0 }}
                        transition={{ duration: still ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        aria-hidden
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.2} />
                      </motion.span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-${i}`}
                        key="panel"
                        initial={still ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={still ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 pr-12 text-[0.96rem] leading-relaxed text-brown-soft">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

/** ---------------------------------------------------------- final CTA */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[78svh] items-center overflow-hidden">
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
      <div className="absolute inset-0 -z-10 bg-brown/60" aria-hidden />

      <Container wide className="py-24 text-center">
        <Reveal>
          <p className="hand text-[1.6rem] text-yellow">and then —</p>
          <h2 className="display-xl mx-auto mt-3 max-w-3xl text-cream">
            Your next story starts here.
          </h2>

          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-9 py-4 text-[0.95rem] font-semibold text-cream transition hover:bg-terracotta-deep"
            >
              Book your stay
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/35 px-9 py-4 text-[0.95rem] font-semibold text-cream transition hover:bg-cream hover:text-brown"
            >
              <Icon name="phone" className="h-4 w-4" />
              Plan your trip
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
