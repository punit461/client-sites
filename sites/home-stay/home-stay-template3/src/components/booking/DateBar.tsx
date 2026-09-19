"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui";
import { maxGuests, rooms } from "@/data/stay";

const DAY = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);
const today = () => iso(new Date());

/** Tomorrow, because nobody books a backwater house for tonight. */
function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return iso(d);
}

/**
 * Arrival and a number of nights rather than two dates — one fewer picker to
 * fight with on a phone, and the departure date is derived and shown back.
 *
 * It does not book anything. Five rooms means the calendar is checked by a
 * person, so this hands its values to the enquiry form and says so.
 */
export default function DateBar() {
  const router = useRouter();
  const [from, setFrom] = useState(tomorrow);
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);

  // Clearing the field leaves `from` empty, and new Date("") is an Invalid
  // Date whose toISOString() throws — so derive the departure defensively.
  const arrival = from ? new Date(from) : null;
  const to =
    arrival && !Number.isNaN(arrival.getTime())
      ? iso(new Date(arrival.getTime() + nights * DAY))
      : "";
  const valid = to !== "" && nights > 0;
  /** What could take the party, at a glance — the honest version of "available". */
  const fits = rooms.filter((r) => r.guests >= guests).length;

  const field =
    "w-full rounded-sm border border-line bg-ink px-4 py-3 text-[0.9rem] text-bone outline-none transition-colors focus:border-brass";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) router.push(`/booking?from=${from}&to=${to}&guests=${guests}`);
      }}
      className="rounded-sm border border-line bg-ink-2/95 p-5 shadow-[var(--shadow-lift)] backdrop-blur-xl sm:p-6"
      aria-label="Check dates"
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_1fr_auto] lg:items-end">
        <label className="block">
          <span className="label mb-2 block text-bone-faint">Arriving</span>
          <input
            type="date"
            value={from}
            min={today()}
            onChange={(e) => setFrom(e.target.value)}
            className={field}
          />
        </label>

        <label className="block">
          <span className="label mb-2 block text-bone-faint">Nights</span>
          <select value={nights} onChange={(e) => setNights(Number(e.target.value))} className={field}>
            {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "night" : "nights"}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label mb-2 block text-bone-faint">Guests</span>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={field}>
            {Array.from({ length: maxGuests + 2 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={!valid}
          className="inline-flex h-[2.9rem] items-center justify-center gap-2.5 rounded-sm bg-brass px-7 text-[0.86rem] font-medium tracking-wide text-ink transition-colors hover:bg-brass-deep disabled:cursor-not-allowed disabled:opacity-40"
        >
          Check dates
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <p className="mono mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[0.74rem] text-bone-faint">
        <span className="inline-flex items-center gap-2">
          <Icon name="moon" className="h-3.5 w-3.5 text-brass" />
          {nights} {nights === 1 ? "night" : "nights"} · leaving {to || "—"}
        </span>
        <span className="inline-flex items-center gap-2">
          <Icon name="bed" className="h-3.5 w-3.5 text-brass" />
          {fits > 0
            ? `${fits} of our ${rooms.length} rooms take ${guests}`
            : `${guests} guests needs two rooms — tell us and we will arrange it`}
        </span>
        <span>A person replies within a day.</span>
      </p>
    </form>
  );
}
