"use client";

import { motion } from "framer-motion";
import { Check, Clock, Droplets } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Stagger, staggerItem } from "@/components/ui/Reveal";
import { plans } from "@/data/content";

export default function Pricing() {
  const { open } = useBooking();

  return (
    <section id="pricing" className="bg-surface-2/70 py-20 sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="Pricing"
          title="Priced by the kilo, not by the guess"
          copy="Items are weighed and counted with you at pickup. Whatever the bag comes to is what you pay."
          align="center"
        />

        <Stagger className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.article
              key={plan.id}
              variants={staggerItem}
              className={`relative flex flex-col rounded-[24px] border p-7 transition-all duration-300 ${
                plan.featured
                  ? "border-accent bg-surface shadow-[var(--shadow-lift)] lg:-mt-4 lg:pb-9 lg:pt-9"
                  : "border-line bg-surface shadow-[var(--shadow-soft)] hover:border-accent/35"
              }`}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white">
                  Recommended
                </span>
              ) : null}

              <h3 className="font-display text-[1.5rem] text-ink">{plan.name}</h3>
              <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft">{plan.summary}</p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-[0.8rem] font-medium text-ink-faint">Starting</span>
                <span className="font-display text-[2.6rem] font-semibold leading-none text-ink">
                  {plan.price}
                </span>
                <span className="text-[0.84rem] text-ink-faint">{plan.unit}</span>
              </p>

              <dl className="mt-6 space-y-2.5 border-y border-line py-5 text-[0.85rem]">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 flex-none text-accent" strokeWidth={1.8} aria-hidden />
                  <dt className="sr-only">Turnaround</dt>
                  <dd className="text-ink-soft">{plan.turnaround}</dd>
                </div>
                <div className="flex items-center gap-2.5">
                  <Droplets className="h-4 w-4 flex-none text-accent" strokeWidth={1.8} aria-hidden />
                  <dt className="sr-only">Cleaning type</dt>
                  <dd className="text-ink-soft">{plan.cleaning}</dd>
                </div>
              </dl>

              <ul className="mt-5 flex-1 space-y-2.5">
                {plan.includes.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.88rem] text-ink">
                    <span className="mt-0.5 flex h-4.5 w-4.5 flex-none items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => open()}
                className={`mt-7 w-full rounded-full px-5 py-3.5 text-[0.9rem] font-semibold transition ${
                  plan.featured
                    ? "bg-accent text-white hover:bg-accent-dark"
                    : "border border-line bg-surface text-ink hover:border-ink/25 hover:bg-surface-2"
                }`}
              >
                Schedule pickup
              </button>
            </motion.article>
          ))}
        </Stagger>

        <p className="mt-9 text-center text-[0.82rem] text-ink-faint">
          Dry cleaning and premium care are charged per item — the rate card is confirmed at pickup
          before anything is taken away.
        </p>
      </Container>
    </section>
  );
}
