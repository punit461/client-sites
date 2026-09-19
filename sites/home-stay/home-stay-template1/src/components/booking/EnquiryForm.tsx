"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Container, Icon, Label } from "@/components/ui";
import { rupees } from "@/lib/format";
import { contact, faqs, findRoom, rooms } from "@/data/stay";

const today = () => new Date().toISOString().slice(0, 10);

/**
 * An enquiry, not a booking. At six rooms there is no live inventory to check,
 * so the form says what it is: dates and a party, answered by a person within
 * a day. Pretending otherwise would be the one dishonest thing on the site.
 */
export default function EnquiryForm() {
  const params = useSearchParams();
  const still = useReducedMotion();

  const seededRoom = findRoom(params.get("room") ?? "")?.slug ?? "";
  const [form, setForm] = useState({
    from: params.get("from") ?? "",
    to: params.get("to") ?? "",
    guests: Number(params.get("guests") ?? 2),
    room: seededRoom,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [sent, setSent] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const nights =
    form.from && form.to
      ? Math.max(0, Math.round((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86_400_000))
      : 0;

  const chosen = findRoom(form.room);
  const estimate = chosen && nights > 0 ? chosen.rate * nights : 0;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email);
  const ready =
    nights > 0 && form.name.trim().length > 1 && emailOk && /^[\d\s+\-()]{10,}$/.test(form.phone);

  const field =
    "w-full rounded-xl border border-line bg-ivory px-4 py-3 text-[0.95rem] text-charcoal outline-none transition placeholder:text-charcoal-faint focus:border-forest";

  if (sent) {
    return (
      <Container narrow className="pb-24 pt-32 sm:pt-40">
        <div className="rounded-[26px] border border-line bg-surface p-8 text-center sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-olive-soft text-forest">
            <Check className="h-8 w-8" strokeWidth={1.8} />
          </div>
          <h1 className="display-lg mt-6 text-charcoal">Thank you, {form.name.split(" ")[0]}.</h1>
          <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-charcoal-soft">
            Your enquiry is with us. Someone will reply to {form.email} within a day, usually
            sooner, to confirm whether those dates are free.
          </p>

          <dl className="mx-auto mt-8 max-w-sm divide-y divide-line overflow-hidden rounded-2xl border border-line text-left">
            {[
              ["Dates", `${form.from} to ${form.to}`],
              ["Nights", String(nights)],
              ["Guests", String(form.guests)],
              ["Room", chosen?.name ?? "No preference"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 px-4 py-3">
                <dt className="w-24 flex-none text-[0.78rem] uppercase tracking-wide text-charcoal-faint">
                  {k}
                </dt>
                <dd className="min-w-0 flex-1 text-[0.9rem] text-charcoal">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              className="rounded-full border border-line px-6 py-3 text-[0.88rem] text-charcoal transition hover:border-charcoal"
            >
              Message on WhatsApp
            </a>
            <Link
              href="/"
              className="rounded-full bg-forest px-6 py-3 text-[0.88rem] font-medium text-ivory transition hover:bg-forest-deep"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pb-24 pt-32 sm:pt-40">
      <Label>Enquire</Label>
      <h1 className="display-xl mt-5 max-w-2xl text-charcoal">Book your stay</h1>
      <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-charcoal-soft">
        We keep six rooms, so availability is checked by a person rather than a system. Send your
        dates and you will hear back within a day.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14 [&>*]:min-w-0">
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (ready) setSent(true);
          }}
          noValidate
        >
          <fieldset className="grid gap-4 sm:grid-cols-3">
            <legend className="label mb-3 text-charcoal-faint">Your dates</legend>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] text-charcoal">Check-in</span>
              <input
                type="date"
                min={today()}
                value={form.from}
                onChange={(e) => set("from", e.target.value)}
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] text-charcoal">Check-out</span>
              <input
                type="date"
                min={form.from || today()}
                value={form.to}
                onChange={(e) => set("to", e.target.value)}
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] text-charcoal">Guests</span>
              <select
                value={form.guests}
                onChange={(e) => set("guests", Number(e.target.value))}
                className={field}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-[0.86rem] text-charcoal">
              Room <span className="text-charcoal-faint">(optional)</span>
            </span>
            <select value={form.room} onChange={(e) => set("room", e.target.value)} className={field}>
              <option value="">No preference — suggest one</option>
              {rooms.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} — {rupees(r.rate)} / night, sleeps {r.guests}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="label mb-3 text-charcoal-faint">How to reach you</legend>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-[0.86rem] text-charcoal">Name</span>
              <input
                className={field}
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Anjali Rao"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] text-charcoal">Email</span>
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
                <span role="alert" className="mt-1.5 block text-[0.78rem] text-brown">
                  Please check the email address.
                </span>
              ) : null}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] text-charcoal">Phone</span>
              <input
                className={field}
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+91 98450 22110"
              />
            </label>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-[0.86rem] text-charcoal">
              Anything we should know? <span className="text-charcoal-faint">(optional)</span>
            </span>
            <textarea
              rows={4}
              className={`${field} resize-none`}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Dietary requirements, arrival time, whether you are bringing a dog"
            />
          </label>

          <button
            type="submit"
            disabled={!ready}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 text-[0.92rem] font-medium tracking-wide text-ivory transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-45"
          >
            Send enquiry
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-[0.8rem] text-charcoal-faint">
            Nothing is charged now, and no card details are taken on this form.
          </p>
        </form>

        {/* -------------------------------------------------- summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[22px] border border-line bg-surface p-6">
            <h2 className="label text-charcoal-faint">Your enquiry</h2>

            <dl className="mt-5 space-y-3 text-[0.9rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal-soft">Nights</dt>
                <dd className="text-charcoal">{nights || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal-soft">Guests</dt>
                <dd className="text-charcoal">{form.guests}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal-soft">Room</dt>
                <dd className="text-right text-charcoal">{chosen?.name ?? "No preference"}</dd>
              </div>
            </dl>

            <AnimatePresence mode="wait">
              {estimate > 0 ? (
                <motion.div
                  key={estimate}
                  className="mt-5 border-t border-line pt-5"
                  initial={still ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={still ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="flex items-baseline justify-between gap-4">
                    <span className="text-[0.86rem] text-charcoal-soft">Indicative total</span>
                    <span className="font-display text-[1.7rem] text-charcoal">{rupees(estimate)}</span>
                  </p>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-charcoal-faint">
                    {chosen?.name} × {nights} {nights === 1 ? "night" : "nights"}, all meals
                    included. Confirmed in writing before anything is owed.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-[0.84rem] text-charcoal-soft">
              {[
                ["utensils", "All three meals included"],
                ["car", "Free on-site parking"],
                ["clock", "Free cancellation up to 7 days before"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-2.5">
                  <Icon name={icon as "utensils"} className="h-4 w-4 flex-none text-olive" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-[22px] border border-line bg-surface p-6">
            <h2 className="label text-charcoal-faint">Before you book</h2>
            <ul className="mt-4 space-y-3">
              {faqs.slice(0, 3).map((faq) => (
                <li key={faq.q}>
                  <p className="text-[0.88rem] font-medium text-charcoal">{faq.q}</p>
                  <p className="mt-1 text-[0.84rem] leading-relaxed text-charcoal-soft">{faq.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
