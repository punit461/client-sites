"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Icon } from "@/components/ui";
import { rooms } from "@/data/stay";

const today = () => new Date().toISOString().slice(0, 10);

function defaults() {
  const from = new Date();
  from.setDate(from.getDate() + 1);
  const to = new Date();
  to.setDate(to.getDate() + 3);
  return { from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10) };
}

/**
 * The compact search card that overlaps the hero. It collects dates, party and
 * an optional room, then hands them to the enquiry form — a four-room house has
 * no live inventory to check, and the form says so rather than pretending.
 */
export default function BookingWidget() {
  const router = useRouter();
  const ids = useId();
  const [seed] = useState(defaults);
  const [from, setFrom] = useState(seed.from);
  const [to, setTo] = useState(seed.to);
  const [guests, setGuests] = useState(2);
  const [room, setRoom] = useState("");

  const nights = Math.max(
    0,
    Math.round((new Date(to).getTime() - new Date(from).getTime()) / 86_400_000),
  );

  const field =
    "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-[0.9rem] text-brown outline-none transition focus:border-terracotta";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (nights > 0) {
          router.push(`/booking?from=${from}&to=${to}&guests=${guests}${room ? `&room=${room}` : ""}`);
        }
      }}
      className="rounded-[28px] border border-line bg-surface p-5 shadow-[var(--shadow-lift)] sm:p-6"
    >
      <p className="hand text-[1.3rem] text-terracotta">Find your stay</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
        <label className="block">
          <span className="label mb-1.5 block text-brown-faint">Check-in</span>
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
          <span className="label mb-1.5 block text-brown-faint">Check-out</span>
          <input
            id={`${ids}-to`}
            type="date"
            value={to}
            min={from}
            onChange={(e) => setTo(e.target.value)}
            className={field}
          />
        </label>

        <label className="block">
          <span className="label mb-1.5 block text-brown-faint">Guests</span>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={field}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="label mb-1.5 block text-brown-faint">Room</span>
          <select value={room} onChange={(e) => setRoom(e.target.value)} className={field}>
            <option value="">Any room</option>
            {rooms.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.name}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={nights <= 0}
          className="inline-flex h-[2.95rem] items-center justify-center gap-2 rounded-2xl bg-terracotta px-6 text-[0.9rem] font-semibold text-cream transition hover:bg-terracotta-deep disabled:cursor-not-allowed disabled:opacity-45"
        >
          Search
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 flex items-center gap-2 text-[0.78rem] text-brown-faint">
        <Icon name="moon" className="h-3.5 w-3.5" />
        {nights > 0
          ? `${nights} ${nights === 1 ? "night" : "nights"} · a real person replies within a day`
          : "Check-out needs to be after check-in."}
      </p>
    </form>
  );
}
