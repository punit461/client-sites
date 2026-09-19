"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { Reveal, TextReveal } from "@/components/animations";
import { Container, Label } from "@/components/ui/primitives";
import {
  BULK_DISCOUNT,
  FREE_PICKUP_OVER,
  garments,
  quote,
  rupees,
} from "@/data/pricing";

/** Per-garment pricing, added up live. The arithmetic lives in data/pricing.ts. */
export default function PricingCalculator() {
  const { open } = useBooking();
  const still = useReducedMotion();
  const [counts, setCounts] = useState<Record<string, number>>({ shirt: 2 });

  const bill = useMemo(() => quote(counts), [counts]);

  const bump = (id: string, delta: number) =>
    setCounts((c) => {
      const next = Math.max(0, Math.min(99, (c[id] ?? 0) + delta));
      const copy = { ...c };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });

  const rows: [string, string, string][] = [
    ["Subtotal", rupees(bill.subtotal), "text-ink"],
    ...(bill.discount
      ? ([[`Discount (${BULK_DISCOUNT.percent}%)`, `− ${rupees(bill.discount)}`, "text-lime-deep"]] as [
          string,
          string,
          string,
        ][])
      : []),
    ["Pickup fee", bill.pickupFee === 0 ? "Free" : rupees(bill.pickupFee), "text-ink-soft"],
  ];

  return (
    <section id="pricing" className="bg-paper py-24 sm:py-32">
      <Container wide>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label>Pricing</Label>
            <TextReveal text="Pay per garment." className="type-xl mt-5 max-w-[10ch] text-ink" />
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
            No packages to outgrow. Count what you are actually sending and the total is the total —
            confirmed with you again at pickup.
          </p>
        </div>

        <Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
            {/* ------------------------------------------------ rate card */}
            <ul className="divide-y divide-line overflow-hidden rounded-[28px] border border-line">
              {garments.map((g) => {
                const count = counts[g.id] ?? 0;
                return (
                  <li
                    key={g.id}
                    className={`flex items-center gap-4 px-5 py-4 transition-colors sm:px-6 ${
                      count > 0 ? "bg-lime/12" : "bg-paper"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[1.02rem] font-bold tracking-tight text-ink">{g.name}</p>
                      <p className="text-[0.78rem] text-ink-faint">{g.note}</p>
                    </div>

                    <p className="w-16 flex-none text-right text-[0.95rem] font-semibold text-ink">
                      {rupees(g.price)}
                    </p>

                    <div className="flex flex-none items-center gap-1 rounded-full border border-line bg-paper p-1">
                      <button
                        type="button"
                        onClick={() => bump(g.id, -1)}
                        disabled={count === 0}
                        aria-label={`One fewer ${g.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-30"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </button>

                      <span
                        className="w-7 text-center text-[0.95rem] font-bold tabular-nums text-ink"
                        aria-live="polite"
                        aria-label={`${count} ${g.name}`}
                      >
                        {count}
                      </span>

                      <button
                        type="button"
                        onClick={() => bump(g.id, 1)}
                        aria-label={`One more ${g.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition hover:bg-ink hover:text-paper"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* -------------------------------------------------- summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[28px] bg-ink p-6 text-paper sm:p-7">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-[1.4rem] font-bold uppercase tracking-tight">
                    Your bag
                  </h3>
                  <span className="label text-paper/50">
                    {bill.items} {bill.items === 1 ? "item" : "items"}
                  </span>
                </div>

                <dl className="mt-6 space-y-3 border-t border-paper/12 pt-5 text-[0.92rem]">
                  {rows.map(([term, value]) => (
                    <div key={term} className="flex items-center justify-between gap-4">
                      <dt className="text-paper/60">{term}</dt>
                      <dd
                        className={`font-semibold tabular-nums ${
                          term.startsWith("Discount") ? "text-lime" : "text-paper"
                        }`}
                      >
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 flex items-end justify-between gap-4 border-t border-paper/12 pt-5">
                  <span className="label text-paper/50">Total</span>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={bill.total}
                      className="font-display text-[2.4rem] font-bold leading-none tabular-nums tracking-tight text-lime"
                      initial={still ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={still ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.22 }}
                    >
                      {rupees(bill.total)}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={() => open()}
                  disabled={bill.items === 0}
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 text-[0.95rem] font-semibold text-ink transition hover:bg-lime-deep disabled:cursor-not-allowed disabled:bg-paper/15 disabled:text-paper/40"
                >
                  Schedule pickup
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="mt-4 text-[0.76rem] leading-relaxed text-paper/45">
                  {bill.subtotal > 0 && bill.subtotal < FREE_PICKUP_OVER
                    ? `Add ${rupees(FREE_PICKUP_OVER - bill.subtotal)} more for free pickup.`
                    : bill.subtotal >= BULK_DISCOUNT.over
                      ? `${BULK_DISCOUNT.percent}% off applied — orders over ${rupees(BULK_DISCOUNT.over)}.`
                      : `Free pickup over ${rupees(FREE_PICKUP_OVER)}.`}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
