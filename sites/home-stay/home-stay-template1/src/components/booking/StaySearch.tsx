"use client";

import { ArrowRight, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Icon } from "@/components/ui";

/** Tomorrow and the day after, as sensible defaults. */
function defaultDates() {
  const inDate = new Date();
  inDate.setDate(inDate.getDate() + 1);
  const outDate = new Date();
  outDate.setDate(outDate.getDate() + 3);
  return { from: inDate.toISOString().slice(0, 10), to: outDate.toISOString().slice(0, 10) };
}

const today = () => new Date().toISOString().slice(0, 10);

/**
 * The availability search. It does not claim to know availability — it
 * collects dates and party size and hands them to the enquiry form, which is
 * what actually happens at a six-room property.
 */
export default function StaySearch({ variant = "floating" }: { variant?: "floating" | "inline" }) {
  const router = useRouter();
  const ids = useId();
  const [dates] = useState(defaultDates);
  const [from, setFrom] = useState(dates.from);
  const [to, setTo] = useState(dates.to);
  const [guests, setGuests] = useState(2);

  const nights = Math.max(
    0,
    Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86_400_000),
  );
  const valid = nights > 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    router.push(`/booking?from=${from}&to=${to}&guests=${guests}`);
  };

  const field =
    "w-full rounded-xl border border-line bg-ivory px-3.5 py-3 text-[0.9rem] text-charcoal outline-none transition focus:border-forest";

  return (
    <form
      onSubmit={submit}
      className={
        variant === "floating"
          ? "rounded-[22px] border border-white/60 bg-ivory/92 p-4 shadow-[var(--shadow-lift)] backdrop-blur-xl sm:p-5"
          : "rounded-[22px] border border-line bg-surface p-5 shadow-[var(--shadow-soft)]"
      }
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
        <label className="block">
          <span className="label mb-1.5 block text-charcoal-faint">Check-in</span>
          <input
            id={`${ids}-from`}
            type="date"
            value={from}
            min={today()}
            onChange={(e) => setFrom(e.target.value)}
            className={field}
          />
        </label>

        <label className="block">
          <span className="label mb-1.5 block text-charcoal-faint">Check-out</span>
          <input
            id={`${ids}-to`}
            type="date"
            value={to}
            min={from}
            onChange={(e) => setTo(e.target.value)}
            className={field}
            aria-describedby={`${ids}-nights`}
          />
        </label>

        <div>
          <span className="label mb-1.5 block text-charcoal-faint" id={`${ids}-guests-label`}>
            Guests
          </span>
          <div
            className="flex items-center gap-1 rounded-xl border border-line bg-ivory p-1"
            role="group"
            aria-labelledby={`${ids}-guests-label`}
          >
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              aria-label="One fewer guest"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal transition hover:bg-forest hover:text-ivory disabled:pointer-events-none disabled:opacity-30"
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
            <span className="w-8 text-center text-[0.92rem] font-medium tabular-nums" aria-live="polite">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(8, g + 1))}
              disabled={guests >= 8}
              aria-label="One more guest"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-charcoal transition hover:bg-forest hover:text-ivory disabled:pointer-events-none disabled:opacity-30"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!valid}
          className="inline-flex h-[2.85rem] items-center justify-center gap-2 rounded-xl bg-forest px-6 text-[0.88rem] font-medium text-ivory transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-45"
        >
          Check availability
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <p id={`${ids}-nights`} className="mt-3 flex items-center gap-2 text-[0.78rem] text-charcoal-faint">
        <Icon name="moon" className="h-3.5 w-3.5" />
        {valid
          ? `${nights} ${nights === 1 ? "night" : "nights"} · we reply to every enquiry within a day`
          : "Check-out needs to be after check-in."}
      </p>
    </form>
  );
}
