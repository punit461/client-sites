"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Reveal, WordReveal } from "@/components/motion";
import { Container, Eyebrow } from "@/components/ui/primitives";
import {
  YEARLY_MONTHS_FREE,
  plans,
  priceFor,
  recommendFor,
  rupees,
  type Cycle,
} from "@/data/plans";

const MAX_BAGS = 16;

/**
 * Three plans, a billing switch, and a slider that answers the only question
 * anyone actually has: which one is mine?
 *
 * The recommendation and every price come from `data/plans.ts`, so a rate
 * change is one edit and the cards, the slider and the drawer cannot drift
 * apart from each other.
 */
export default function Membership() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const sliderId = useId();

  const [cycle, setCycle] = useState<Cycle>("monthly");
  const [bags, setBags] = useState(6);

  const recommended = useMemo(() => recommendFor(bags), [bags]);
  const overLargest = bags > plans[plans.length - 1].bags;

  return (
    <section id="membership" className="relative overflow-hidden bg-deep py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Eyebrow>Membership</Eyebrow>
            <WordReveal
              text="Pay once a month. Stop thinking about it."
              className="display-lg mt-5 font-semibold text-mist"
            />
          </div>

          {/* ---------------------------------------------- billing switch */}
          <div
            className="inline-flex rounded-full border border-line bg-surface p-1"
            role="group"
            aria-label="Billing period"
          >
            {(["monthly", "yearly"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCycle(option)}
                aria-pressed={cycle === option}
                className={`rounded-full px-5 py-2.5 text-[0.84rem] font-semibold capitalize transition-colors ${
                  cycle === option ? "bg-ice text-night" : "text-mist-soft hover:text-mist"
                }`}
              >
                {option}
                {option === "yearly" ? (
                  <span
                    className={`ml-2 text-[0.72rem] font-medium ${
                      cycle === "yearly" ? "text-night/70" : "text-gold"
                    }`}
                  >
                    {YEARLY_MONTHS_FREE} months free
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------- the recommender */}
        <Reveal className="mt-12">
          <div className="panel rounded-panel p-6 sm:p-8">
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="min-w-0">
                <label
                  htmlFor={sliderId}
                  className="font-display text-[1.15rem] font-medium tracking-tight text-mist"
                >
                  How much laundry leaves your home in a month?
                </label>
                <p className="mt-2 text-[0.88rem] text-mist-soft">
                  One bag is about six kilograms — a week of clothes for one person.
                </p>

                <input
                  id={sliderId}
                  type="range"
                  min={1}
                  max={MAX_BAGS}
                  step={1}
                  value={bags}
                  onChange={(event) => setBags(Number(event.target.value))}
                  aria-valuetext={`${bags} bags a month`}
                  className="mt-7 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-ice"
                />

                <div
                  className="mt-3 flex justify-between text-[0.72rem] text-mist-faint"
                  aria-hidden
                >
                  <span>1 bag</span>
                  <span>{MAX_BAGS}+ bags</span>
                </div>
              </div>

              <div className="rounded-[20px] border border-line bg-night/50 p-6">
                <p className="eyebrow text-mist-faint">
                  {bags} {bags === 1 ? "bag" : "bags"} a month
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={recommended.id}
                    className="mt-2 font-display text-[1.9rem] font-semibold leading-none tracking-tight text-mist"
                    initial={still ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={still ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    {recommended.name}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-mist-soft" aria-live="polite">
                  {overLargest
                    ? `Past ${plans[plans.length - 1].bags} bags we price it with you — talk to the concierge and we will build the round around your household.`
                    : `${recommended.name} covers ${recommended.bags} bags a month at ${rupees(priceFor(recommended, cycle).perMonth)} a month.`}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------------- the plans */}
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const price = priceFor(plan, cycle);
            const isRecommended = plan.id === recommended.id && !overLargest;

            return (
              <Reveal key={plan.id} delay={index * 0.06}>
                <div
                  className={`relative flex h-full flex-col rounded-panel border p-7 transition-colors duration-300 ${
                    isRecommended
                      ? "border-ice/45 bg-surface"
                      : plan.featured
                        ? "border-gold/25 bg-surface/60"
                        : "border-line bg-surface/40"
                  }`}
                >
                  {isRecommended ? (
                    <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-ice px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-night">
                      <Sparkles className="h-3 w-3" aria-hidden />
                      Your match
                    </span>
                  ) : plan.featured ? (
                    <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-night">
                      Most chosen
                    </span>
                  ) : null}

                  <h3 className="font-display text-[1.45rem] font-semibold tracking-tight text-mist">
                    {plan.name}
                  </h3>
                  <p className="mt-2 min-h-[2.8rem] text-[0.9rem] leading-relaxed text-mist-soft">
                    {plan.summary}
                  </p>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="font-display text-[2.6rem] font-semibold leading-none tracking-tight text-mist">
                      {rupees(price.perMonth)}
                    </span>
                    <span className="pb-1 text-[0.85rem] text-mist-faint">/ month</span>
                  </div>
                  <p className="mt-2 min-h-[1.2rem] text-[0.78rem] text-gold">
                    {cycle === "yearly"
                      ? `${rupees(price.amount)} billed yearly · saves ${rupees(price.saved)}`
                      : `${plan.turnaround} turnaround · cancel any month`}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.88rem] text-mist-soft">
                        <Check className="mt-0.5 h-4 w-4 flex-none text-ice" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => open({ plan: plan.id, frequency: "weekly" })}
                    className={`group mt-7 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[0.9rem] font-semibold transition ${
                      isRecommended
                        ? "bg-ice text-night hover:bg-ice-deep"
                        : "border border-white/15 text-mist hover:border-ice/60 hover:bg-white/5"
                    }`}
                  >
                    Start {plan.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[0.82rem] text-mist-faint">
          Every plan includes collection, return and door-to-door cover. Unused bags roll into the
          following month. No joining fee, and you can pause for up to eight weeks a year.
        </p>
      </Container>
    </section>
  );
}
