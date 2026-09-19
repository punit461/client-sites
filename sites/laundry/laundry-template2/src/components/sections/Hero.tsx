"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Magnetic, TextReveal, EASE } from "@/components/animations";
import { Container } from "@/components/ui/primitives";
import { pickupWindows } from "@/data/site";
import { img } from "@/lib/images";

const DAY_CHOICES = ["Today", "Tomorrow", "Choose date"] as const;

export default function Hero() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const [day, setDay] = useState<string>("Tomorrow");
  const [window_, setWindow] = useState<string>(pickupWindows[0]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink">
      {/* ------------------------------------------------- cinematic plate */}
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
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/65 to-ink/92"
        aria-hidden
      />

      <Container wide className="relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 sm:pb-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_minmax(0,22rem)] lg:gap-16">
          {/* ------------------------------------------------------ copy */}
          <motion.div style={still ? undefined : { y: copyY, opacity: fade }}>
            <motion.p
              className="label text-lime"
              initial={still ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              Pickup · Clean · Iron · Deliver
            </motion.p>

            <TextReveal
              as="h1"
              text="Laundry without the chore."
              className="type-mega mt-6 max-w-[14ch] text-paper"
              delay={0.18}
            />

            <motion.p
              className="mt-8 max-w-lg text-[1.05rem] leading-relaxed text-paper/70 sm:text-lg"
              initial={still ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            >
              Pickup. Clean. Iron. Deliver. Your wardrobe stays fresh while you get your time back.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              initial={still ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={() => open()}
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-[0.95rem] font-semibold text-ink transition hover:bg-lime-deep"
                >
                  Book a pickup
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Magnetic>
              <a
                href="#journey"
                className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-8 py-4 text-[0.95rem] font-semibold text-paper transition hover:bg-paper hover:text-ink"
              >
                See how it works
              </a>
            </motion.div>
          </motion.div>

          {/* --------------------------------------------- booking card */}
          <motion.div
            className="w-full lg:mb-4"
            initial={still ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: EASE }}
          >
            <div className="rounded-[28px] bg-paper p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-2 text-ink">
                <CalendarDays className="h-4 w-4" strokeWidth={2} aria-hidden />
                <h2 className="text-[0.95rem] font-bold tracking-tight">
                  When should we pick up?
                </h2>
              </div>

              <fieldset className="mt-5">
                <legend className="label mb-2.5 text-ink-faint">Day</legend>
                <div className="grid grid-cols-3 gap-2">
                  {DAY_CHOICES.map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => setDay(choice)}
                      aria-pressed={day === choice}
                      className={`rounded-xl px-2 py-2.5 text-[0.78rem] font-semibold transition-all duration-200 ${
                        day === choice
                          ? "bg-ink text-paper"
                          : "border border-line bg-paper text-ink hover:border-ink/45"
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-5">
                <legend className="label mb-2.5 text-ink-faint">Pickup time</legend>
                <div className="grid grid-cols-2 gap-2">
                  {pickupWindows.slice(0, 4).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWindow(w)}
                      aria-pressed={window_ === w}
                      className={`rounded-xl px-2 py-2.5 text-[0.78rem] font-semibold transition-all duration-200 ${
                        window_ === w
                          ? "bg-ink text-paper"
                          : "border border-line bg-paper text-ink hover:border-ink/45"
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="button"
                onClick={() => {
                  // Hand the choices to the modal so it can skip its first step.
                  const iso = new Date();
                  if (day === "Tomorrow") iso.setDate(iso.getDate() + 1);
                  open(
                    day === "Choose date"
                      ? { window: window_ }
                      : { day: iso.toISOString().slice(0, 10), window: window_ },
                  );
                }}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-[0.92rem] font-semibold text-paper transition hover:bg-night"
              >
                Continue
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <p className="mt-3 text-center text-[0.72rem] text-ink-faint">
                Free pickup on orders above ₹499
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
