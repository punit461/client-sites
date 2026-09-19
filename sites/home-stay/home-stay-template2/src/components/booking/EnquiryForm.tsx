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
 * An enquiry, not a booking. Four rooms means availability is checked by a
 * person, so the form says that rather than pretending to hold inventory.
 */
export default function EnquiryForm() {
  const params = useSearchParams();
  const still = useReducedMotion();

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
    "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-[0.95rem] text-brown outline-none transition placeholder:text-brown-faint focus:border-terracotta";

  if (sent) {
    return (
      <Container narrow className="py-20 sm:py-28">
        <div className="rounded-[30px] border border-line bg-surface p-8 text-center sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow text-brown">
            <Check className="h-8 w-8" strokeWidth={2.2} />
          </div>
          <p className="hand mt-6 text-[1.7rem] text-terracotta">see you soon</p>
          <h1 className="display-lg mt-1 text-brown">Thanks, {form.name.split(" ")[0]}.</h1>
          <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-brown-soft">
            Your enquiry is with Ravi and Latha. You will hear back at {form.email} within a day —
            usually a lot sooner.
          </p>

          <dl className="mx-auto mt-8 max-w-sm divide-y divide-line overflow-hidden rounded-2xl border border-line text-left">
            {[
              ["Dates", `${form.from} to ${form.to}`],
              ["Nights", String(nights)],
              ["Guests", String(form.guests)],
              ["Room", chosen?.name ?? "Any room"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 px-4 py-3">
                <dt className="w-24 flex-none text-[0.74rem] font-bold uppercase tracking-wide text-brown-faint">
                  {k}
                </dt>
                <dd className="min-w-0 flex-1 text-[0.9rem] text-brown">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              className="rounded-full border-2 border-brown/15 px-6 py-3 text-[0.88rem] font-semibold text-brown transition hover:border-brown"
            >
              Message on WhatsApp
            </a>
            <Link
              href="/"
              className="rounded-full bg-terracotta px-6 py-3 text-[0.88rem] font-semibold text-cream transition hover:bg-terracotta-deep"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-16 sm:py-24">
      <Label>Book</Label>
      <h1 className="display-xl mt-5 max-w-2xl text-brown">
        Tell us <span className="hand text-terracotta">when</span>.
      </h1>
      <p className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-brown-soft">
        Four rooms means we check the calendar by hand. Send your dates and a real person gets back
        to you — usually the same evening.
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
            <legend className="label mb-3 text-brown-faint">Your dates</legend>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] font-medium text-brown">Check-in</span>
              <input
                type="date"
                min={today()}
                value={form.from}
                onChange={(e) => set("from", e.target.value)}
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] font-medium text-brown">Check-out</span>
              <input
                type="date"
                min={form.from || today()}
                value={form.to}
                onChange={(e) => set("to", e.target.value)}
                className={field}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] font-medium text-brown">Guests</span>
              <select
                value={form.guests}
                onChange={(e) => set("guests", Number(e.target.value))}
                className={field}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-[0.86rem] font-medium text-brown">
              Room <span className="font-normal text-brown-faint">(optional)</span>
            </span>
            <select value={form.room} onChange={(e) => set("room", e.target.value)} className={field}>
              <option value="">Any room — suggest one</option>
              {rooms.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} — {rupees(r.rate)} / night, sleeps {r.guests}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="label mb-3 text-brown-faint">How to reach you</legend>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-[0.86rem] font-medium text-brown">Name</span>
              <input
                className={field}
                autoComplete="name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Meera Iyer"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] font-medium text-brown">Email</span>
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
                <span role="alert" className="mt-1.5 block text-[0.78rem] text-terracotta-deep">
                  Please check the email address.
                </span>
              ) : null}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.86rem] font-medium text-brown">Phone</span>
              <input
                className={field}
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+91 90080 44120"
              />
            </label>
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-[0.86rem] font-medium text-brown">
              Anything we should know? <span className="font-normal text-brown-faint">(optional)</span>
            </span>
            <textarea
              rows={4}
              className={`${field} resize-none`}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Food you do not eat, arrival time, whether a dog is coming"
            />
          </label>

          <button
            type="submit"
            disabled={!ready}
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-4 text-[0.95rem] font-semibold text-cream transition hover:bg-terracotta-deep disabled:cursor-not-allowed disabled:opacity-45"
          >
            Send enquiry
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-[0.8rem] text-brown-faint">
            Nothing is charged now, and no card details are taken on this form.
          </p>
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[26px] border border-line bg-surface p-6">
            <p className="hand text-[1.4rem] text-terracotta">your trip</p>

            <dl className="mt-4 space-y-3 text-[0.9rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-brown-soft">Nights</dt>
                <dd className="font-medium text-brown">{nights || "—"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-brown-soft">Guests</dt>
                <dd className="font-medium text-brown">{form.guests}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-brown-soft">Room</dt>
                <dd className="text-right font-medium text-brown">{chosen?.name ?? "Any room"}</dd>
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
                    <span className="text-[0.86rem] text-brown-soft">Indicative total</span>
                    <span className="font-display text-[1.8rem] font-bold text-brown">
                      {rupees(estimate)}
                    </span>
                  </p>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-brown-faint">
                    {chosen?.name} × {nights} {nights === 1 ? "night" : "nights"}, all meals in.
                    Confirmed in writing before anything is owed.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-[0.84rem] text-brown-soft">
              {[
                ["utensils", "Breakfast, lunch and dinner included"],
                ["car", "Free parking at the house"],
                ["clock", "Free cancellation up to 7 days before"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-2.5">
                  <Icon name={icon as "utensils"} className="h-4 w-4 flex-none text-terracotta" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-[26px] border border-line bg-surface p-6">
            <p className="label text-brown-faint">Before you ask</p>
            <ul className="mt-4 space-y-3">
              {faqs.slice(0, 3).map((faq) => (
                <li key={faq.q}>
                  <p className="text-[0.88rem] font-bold text-brown">{faq.q}</p>
                  <p className="mt-1 text-[0.84rem] leading-relaxed text-brown-soft">{faq.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
}
