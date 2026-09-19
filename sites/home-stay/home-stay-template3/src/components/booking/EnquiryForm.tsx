"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Container, Icon, Marker } from "@/components/ui";
import { contact, faqs, findRoom, maxGuests, rooms } from "@/data/stay";
import { numeral, rupees } from "@/lib/format";

const today = () => new Date().toISOString().slice(0, 10);

const STEPS = ["Dates", "Room", "You"] as const;

/**
 * An enquiry, not a booking. Five rooms means the calendar is checked by a
 * person, so the form collects dates and a party and says someone will reply
 * within a day — it never claims live availability.
 *
 * Three steps rather than one long column: on a phone the whole thing is
 * otherwise a scroll with no sense of progress, and the date fields are the
 * part people abandon.
 */
export default function EnquiryForm() {
  const params = useSearchParams();
  const still = useReducedMotion();

  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    from: params.get("from") ?? "",
    to: params.get("to") ?? "",
    guests: Number(params.get("guests") ?? 2),
    room: findRoom(params.get("room") ?? "")?.slug ?? "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const nights =
    form.from && form.to
      ? Math.max(
          0,
          Math.round((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86_400_000),
        )
      : 0;

  const chosen = findRoom(form.room);
  const estimate = chosen && nights > 0 ? chosen.rate * nights : 0;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const phoneOk = /^[\d\s+\-()]{10,}$/.test(form.phone);
  const datesOk = nights > 0;
  const detailsOk = form.name.trim().length > 1 && emailOk && phoneOk;
  const stepOk = [datesOk, true, detailsOk][step];

  const field =
    "w-full rounded-sm border border-line bg-ink px-4 py-3 text-[0.95rem] text-bone outline-none transition-colors placeholder:text-bone-faint focus:border-brass";

  /** ------------------------------------------------------------ sent */
  if (sent) {
    return (
      <Container narrow className="py-28 sm:py-36">
        <div className="rounded-sm border border-line bg-ink-2 p-8 text-center sm:p-14">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brass text-ink">
            <Check className="h-8 w-8" strokeWidth={2} />
          </div>
          <h1 className="display-lg mt-8 text-bone">Thank you, {form.name.split(" ")[0]}.</h1>
          <p className="mx-auto mt-5 max-w-md text-[1rem] leading-relaxed text-bone-soft">
            Your enquiry is with Thomas and Elsy. You will hear back at {form.email} within a day —
            usually the same evening.
          </p>

          <dl className="mx-auto mt-10 max-w-sm border-t border-line text-left">
            {[
              ["Arriving", form.from],
              ["Leaving", form.to],
              ["Nights", String(nights)],
              ["Guests", String(form.guests)],
              ["Room", chosen?.name ?? "Any room"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 border-b border-line py-3">
                <dt className="mono w-24 flex-none text-[0.72rem] uppercase tracking-wide text-bone-faint">
                  {k}
                </dt>
                <dd className="mono min-w-0 flex-1 text-[0.86rem] text-bone">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              className="rounded-sm border border-line px-6 py-3.5 text-[0.86rem] text-bone transition-colors hover:border-brass hover:text-brass"
            >
              Message on WhatsApp
            </a>
            <Link
              href="/"
              className="rounded-sm bg-brass px-6 py-3.5 text-[0.86rem] font-medium text-ink transition-colors hover:bg-brass-deep"
            >
              Back to the house
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  /** ------------------------------------------------------------ form */
  return (
    <Container className="py-28 sm:py-36">
      <Marker index={numeral(1)}>Enquire</Marker>
      <h1 className="display-xl mt-6 max-w-2xl text-bone">Tell us when.</h1>
      <p className="mt-6 max-w-2xl text-[1.04rem] leading-relaxed text-bone-soft">
        Five rooms means the calendar is checked by a person rather than a system. Send your dates and
        one of us writes back — usually the same evening, always within a day.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16 [&>*]:min-w-0">
        <div>
          {/* ---------------------------------------------- step indicator */}
          <ol className="flex flex-wrap gap-2" aria-label="Enquiry steps">
            {STEPS.map((name, i) => {
              const done = i < step;
              const here = i === step;
              return (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => (i < step ? setStep(i) : undefined)}
                    disabled={i > step}
                    aria-current={here ? "step" : undefined}
                    className={`flex items-center gap-2.5 rounded-sm border px-4 py-2.5 text-[0.82rem] transition-colors ${
                      here
                        ? "border-brass text-brass"
                        : done
                          ? "border-line text-bone hover:border-brass/60"
                          : "border-line-soft text-bone-faint"
                    } ${i > step ? "cursor-default" : ""}`}
                  >
                    <span className="mono text-[0.7rem]">{numeral(i + 1)}</span>
                    {name}
                    {done ? <Check className="h-3.5 w-3.5" /> : null}
                  </button>
                </li>
              );
            })}
          </ol>

          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (step < STEPS.length - 1) {
                if (stepOk) setStep(step + 1);
                return;
              }
              if (datesOk && detailsOk) setSent(true);
            }}
            noValidate
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={still ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={still ? { opacity: 0 } : { opacity: 0, x: -18 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 ? (
                  <fieldset className="grid gap-5 sm:grid-cols-3">
                    <legend className="label mb-4 text-bone-faint">When, and how many</legend>
                    <label className="block">
                      <span className="mb-2 block text-[0.85rem] text-bone">Check-in</span>
                      <input
                        type="date"
                        min={today()}
                        value={form.from}
                        onChange={(e) => set("from", e.target.value)}
                        className={field}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.85rem] text-bone">Check-out</span>
                      <input
                        type="date"
                        min={form.from || today()}
                        value={form.to}
                        onChange={(e) => set("to", e.target.value)}
                        className={field}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.85rem] text-bone">Guests</span>
                      <select
                        value={form.guests}
                        onChange={(e) => set("guests", Number(e.target.value))}
                        className={field}
                      >
                        {Array.from({ length: maxGuests + 2 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                    </label>
                    {form.from && form.to && nights <= 0 ? (
                      <p role="alert" className="text-[0.82rem] text-brass sm:col-span-3">
                        Check-out needs to be at least a night after check-in.
                      </p>
                    ) : null}
                  </fieldset>
                ) : null}

                {step === 1 ? (
                  <fieldset>
                    <legend className="label mb-4 text-bone-faint">
                      Which room — or leave it to us
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <RoomChoice
                        checked={form.room === ""}
                        onChange={() => set("room", "")}
                        name="Any room"
                        detail="Tell us the party and we will suggest one"
                      />
                      {rooms.map((room) => (
                        <RoomChoice
                          key={room.slug}
                          checked={form.room === room.slug}
                          onChange={() => set("room", room.slug)}
                          name={room.name}
                          detail={`${rupees(room.rate)} / night · sleeps ${room.guests}`}
                          image={room.images[0].src}
                          warn={room.guests < form.guests ? `Takes ${room.guests}` : undefined}
                        />
                      ))}
                    </div>
                  </fieldset>
                ) : null}

                {step === 2 ? (
                  <div className="space-y-5">
                    <fieldset className="grid gap-5 sm:grid-cols-2">
                      <legend className="label mb-4 text-bone-faint">How to reach you</legend>
                      <label className="block sm:col-span-2">
                        <span className="mb-2 block text-[0.85rem] text-bone">Name</span>
                        <input
                          className={field}
                          autoComplete="name"
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Ananya Menon"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[0.85rem] text-bone">Email</span>
                        <input
                          className={field}
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="you@example.com"
                          aria-invalid={form.email !== "" && !emailOk}
                        />
                        {form.email !== "" && !emailOk ? (
                          <span role="alert" className="mt-2 block text-[0.78rem] text-brass">
                            Please check the email address.
                          </span>
                        ) : null}
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-[0.85rem] text-bone">Phone</span>
                        <input
                          className={field}
                          inputMode="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          placeholder={contact.phone}
                          aria-invalid={form.phone !== "" && !phoneOk}
                        />
                      </label>
                    </fieldset>

                    <label className="block">
                      <span className="mb-2 block text-[0.85rem] text-bone">
                        Anything we should know?{" "}
                        <span className="text-bone-faint">(optional)</span>
                      </span>
                      <textarea
                        rows={4}
                        className={`${field} resize-none`}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Food you do not eat, what time your train gets in, whether a dog is coming"
                      />
                    </label>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>

            {/* ---------------------------------------------------- controls */}
            <div className="mt-9 flex flex-wrap items-center gap-4 border-t border-line pt-7">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-2 rounded-sm border border-line px-5 py-3.5 text-[0.86rem] text-bone transition-colors hover:border-brass hover:text-brass"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : null}

              <button
                type="submit"
                disabled={!stepOk}
                className="inline-flex items-center gap-2.5 rounded-sm bg-brass px-8 py-4 text-[0.9rem] font-medium tracking-wide text-ink transition-colors hover:bg-brass-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step < STEPS.length - 1 ? "Continue" : "Send enquiry"}
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mono text-[0.72rem] text-bone-faint">
                {step < STEPS.length - 1
                  ? `Step ${numeral(step + 1)} of ${numeral(STEPS.length)}`
                  : "No card details are taken on this form."}
              </p>
            </div>
          </form>
        </div>

        {/* ------------------------------------------------------- summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-sm border border-line bg-ink-2 p-6">
            <p className="label text-brass">Your enquiry</p>

            <dl className="mono mt-5 space-y-3 text-[0.84rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-bone-faint">Arriving</dt>
                <dd className="text-bone">{form.from || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-bone-faint">Nights</dt>
                <dd className="text-bone">{nights || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-bone-faint">Guests</dt>
                <dd className="text-bone">{form.guests}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-bone-faint">Room</dt>
                <dd className="text-right text-bone">{chosen?.name ?? "Any room"}</dd>
              </div>
            </dl>

            <AnimatePresence mode="wait">
              {estimate > 0 ? (
                <motion.div
                  key={estimate}
                  className="mt-6 border-t border-line pt-5"
                  initial={still ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="flex items-baseline justify-between gap-4">
                    <span className="text-[0.85rem] text-bone-soft">Indicative total</span>
                    <span className="font-display text-[1.8rem] text-bone">{rupees(estimate)}</span>
                  </p>
                  <p className="mt-2.5 text-[0.78rem] leading-relaxed text-bone-faint">
                    {chosen?.name} × {nights} {nights === 1 ? "night" : "nights"}, all meals included.
                    Indicative only — confirmed in writing before anything is owed.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <ul className="mt-6 space-y-3 border-t border-line pt-5 text-[0.84rem] text-bone-soft">
              {[
                ["utensils", "Breakfast, lunch and dinner included"],
                ["car", "Airport car arranged at a fixed fare"],
                ["clock", "Free cancellation up to 7 days before"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-3">
                  <Icon name={icon as "utensils"} className="h-4 w-4 flex-none text-brass" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-sm border border-line bg-ink-2 p-6">
            <p className="label text-bone-faint">Asked often</p>
            <ul className="mt-5 space-y-4">
              {faqs.slice(0, 2).map((faq) => (
                <li key={faq.q}>
                  <p className="text-[0.88rem] text-bone">{faq.q}</p>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-bone-soft">{faq.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}

/** A radio dressed as a card, so the whole thing is a hit target. */
function RoomChoice({
  checked,
  onChange,
  name,
  detail,
  image,
  warn,
}: {
  checked: boolean;
  onChange: () => void;
  name: string;
  detail: string;
  image?: string;
  warn?: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-4 rounded-sm border p-3.5 transition-colors ${
        checked ? "border-brass bg-ink-3" : "border-line hover:border-brass/50"
      }`}
    >
      <input
        type="radio"
        name="room"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-sm ${
          image ? "" : "border border-line"
        }`}
      >
        {image ? (
          <Image src={image} alt="" width={40} height={40} className="h-10 w-10 object-cover" />
        ) : (
          <Icon name="sparkles" className="h-4 w-4 text-brass" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.9rem] text-bone">{name}</span>
        <span className="mono block truncate text-[0.72rem] text-bone-faint">{detail}</span>
      </span>
      {warn ? <span className="mono flex-none text-[0.68rem] text-brass">{warn}</span> : null}
      <span
        className={`h-4 w-4 flex-none rounded-full border ${
          checked ? "border-brass bg-brass" : "border-line"
        }`}
        aria-hidden
      />
    </label>
  );
}
