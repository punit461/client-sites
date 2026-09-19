"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Reveal, WordReveal } from "@/components/motion";
import { Container, Eyebrow, Icon } from "@/components/ui/primitives";
import { services } from "@/data/content";

/**
 * Five services as one strip of panels.
 *
 * From `lg` up the strip is horizontal and only the open panel shows its copy;
 * the rest stand as vertical spines. Below `lg` that reads as nothing at all on
 * a 375px screen, so the same list becomes ordinary stacked cards with
 * everything visible — the interaction is what is responsive here, not just
 * the layout.
 *
 * Each panel holds two controls rather than one: a stretched button that opens
 * it (keyboard-reachable, `aria-expanded`, hover as a shortcut) and, above it,
 * the booking button. Nesting the second inside the first would be invalid
 * HTML and would put the CTA out of reach of the keyboard.
 */
export default function ServiceAccordion() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Eyebrow>What we do</Eyebrow>
            <WordReveal
              text="Five ways a garment comes back better."
              className="display-lg mt-5 font-semibold text-mist"
            />
          </div>
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-mist-soft">
            Everything below is included in a membership or can be booked on its own. Which one a
            garment gets is decided by its care label, not by what you ticked at checkout.
          </p>
        </div>

        {/* ------------------------------------------------------- the strip */}
        <Reveal className="mt-12">
          <div className="flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
            {services.map((service, index) => {
              const isOpen = index === active;
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActive(index)}
                  className={`group relative isolate overflow-hidden rounded-panel border transition-[flex-grow,border-color] duration-500 ease-out lg:h-full ${
                    isOpen
                      ? "border-ice/35 lg:flex-[3.4]"
                      : "border-line hover:border-white/20 lg:flex-[1]"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt=""
                    aria-hidden
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className={`-z-10 object-cover transition-all duration-700 ${
                      isOpen ? "scale-100 opacity-70" : "scale-105 opacity-35 lg:grayscale"
                    }`}
                  />
                  <div
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/80 to-night/35"
                    aria-hidden
                  />

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="absolute inset-0 z-10 cursor-pointer rounded-panel"
                  >
                    <span className="sr-only">{service.name} — show details</span>
                  </button>

                  {/* Collapsed: a vertical spine. Desktop only — it needs the height. */}
                  <span
                    className={`pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-full items-end justify-center pb-8 transition-opacity duration-300 lg:flex ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                    aria-hidden
                  >
                    <span className="flex flex-col items-center gap-5">
                      <span className="font-display text-[1.05rem] font-medium tracking-tight text-mist [text-orientation:mixed] [writing-mode:vertical-rl]">
                        {service.short}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-mist">
                        <Icon name={service.icon} className="h-4 w-4" />
                      </span>
                    </span>
                  </span>

                  {/* Expanded on desktop, always on mobile. */}
                  <div
                    className={`pointer-events-none relative z-20 flex h-full flex-col justify-end p-6 transition-opacity duration-300 sm:p-7 ${
                      isOpen ? "lg:opacity-100" : "lg:opacity-0"
                    }`}
                  >
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-ice/15 text-ice lg:hidden">
                      <Icon name={service.icon} className="h-5 w-5" />
                    </span>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="display-md font-semibold text-mist">{service.name}</h3>
                      <span className="mt-1 flex-none rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.72rem] font-semibold text-gold">
                        {service.from}
                      </span>
                    </div>

                    <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-mist-soft">
                      {service.copy}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {service.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-center gap-2 text-[0.82rem] text-mist-soft"
                        >
                          <Check className="h-3.5 w-3.5 flex-none text-ice" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.button
                          type="button"
                          onClick={() => open()}
                          className="pointer-events-auto mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-mist px-5 py-2.5 text-[0.84rem] font-semibold text-night transition hover:bg-white"
                          initial={still ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={still ? { opacity: 0 } : { opacity: 0, y: 8 }}
                          transition={{ duration: 0.25 }}
                        >
                          Book {service.short.toLowerCase()}
                          <ArrowUpRight className="h-4 w-4" aria-hidden />
                        </motion.button>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
