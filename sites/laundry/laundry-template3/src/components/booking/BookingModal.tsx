"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { frequencies, pickupWindows } from "@/data/site";
import { plans } from "@/data/plans";
import { useBooking } from "./BookingProvider";

const STEPS = ["Schedule", "Address", "Details", "Review"] as const;

interface Draft {
  frequency: string;
  day: string;
  window: string;
  address: string;
  pincode: string;
  name: string;
  phone: string;
  notes: string;
}

const EMPTY: Draft = {
  frequency: "weekly",
  day: "",
  window: "",
  address: "",
  pincode: "",
  name: "",
  phone: "",
  notes: "",
};

/** The next week of dates, labelled the way a person would say them. */
function nextDays(count = 7) {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      value: date.toISOString().slice(0, 10),
      short:
        i === 0
          ? "Today"
          : i === 1
            ? "Tomorrow"
            : date.toLocaleDateString("en-IN", { weekday: "short" }),
      day: String(date.getDate()),
      month: date.toLocaleDateString("en-IN", { month: "short" }),
      label: date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
    };
  });
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * A four-step drawer: schedule, address, details, review. It submits nowhere —
 * wire the confirm handler to a real endpoint before launch.
 */
export default function BookingModal() {
  const { isOpen, close, seed } = useBooking();
  const still = useReducedMotion();
  const titleId = useId();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [done, setDone] = useState(false);
  const [reference, setReference] = useState("");
  const [wasOpen, setWasOpen] = useState(false);

  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<Element | null>(null);
  const days = useMemo(() => nextDays(), []);
  const plan = plans.find((p) => p.id === seed.plan);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  // Reset on the open transition, during render rather than in an effect: an
  // effect would paint the previous booking for a frame before clearing it.
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setDone(false);
      setDraft({
        ...EMPTY,
        frequency: seed.frequency ?? EMPTY.frequency,
        day: seed.day ?? "",
        window: seed.window ?? "",
      });
      // Skip the first step when the caller already answered it.
      setStep(seed.day && seed.window ? 1 : 0);
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    returnTo.current = document.activeElement;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      // Keep Tab inside the drawer: the page behind it is inert to the eye,
      // and a focus ring that wanders off it has nowhere visible to be.
      if (event.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => panel.current?.focus(), 30);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) return;
    const element = returnTo.current;
    if (element instanceof HTMLElement) element.focus();
  }, [isOpen]);

  const ready = [
    Boolean(draft.frequency && draft.day && draft.window),
    draft.address.trim().length > 6 && /^\d{6}$/.test(draft.pincode),
    draft.name.trim().length > 1 && /^[\d\s+\-()]{10,}$/.test(draft.phone),
    true,
  ][step];

  const chosenDay = days.find((d) => d.value === draft.day);
  const chosenFrequency = frequencies.find((f) => f.id === draft.frequency);

  const field =
    "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-[0.95rem] text-mist outline-none transition placeholder:text-mist-faint focus:border-ice/70";
  const chip = "rounded-2xl border px-3 py-3 text-center transition-all duration-200";
  const on = "border-ice bg-ice text-night";
  const off = "border-line bg-surface text-mist hover:border-ice/45";

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[120] flex items-end justify-end sm:items-stretch">
          <motion.div
            className="absolute inset-0 bg-night/75 backdrop-blur-sm"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden
          />

          {/* A bottom sheet on a phone, a right-hand drawer from `sm` up. */}
          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[28px] border border-line bg-deep outline-none sm:max-h-none sm:w-[30rem] sm:rounded-none sm:rounded-l-[28px] sm:border-y-0 sm:border-r-0"
            initial={still ? false : { opacity: 0, y: 40, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 pb-5 pt-6">
              <div>
                <h2 id={titleId} className="display-md text-mist">
                  {done ? "You are booked" : "Book a collection"}
                </h2>
                {!done ? (
                  <p className="eyebrow mt-2 text-mist-faint">
                    Step {step + 1} of {STEPS.length} · {STEPS[step]}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={close}
                className="-mr-1 rounded-full border border-line p-2 text-mist transition hover:border-ice/60 hover:text-ice"
                aria-label="Close booking"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!done ? (
              <div className="h-[3px] w-full bg-line" aria-hidden>
                <motion.div
                  className="h-full bg-gradient-to-r from-ice to-gold"
                  initial={false}
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: still ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ) : null}

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {plan && !done ? (
                <p className="mb-5 rounded-2xl border border-gold/25 bg-gold/8 px-4 py-3 text-[0.82rem] text-mist-soft">
                  Starting a <strong className="font-semibold text-gold">{plan.name}</strong>{" "}
                  membership — {plan.bags} bags a month, {plan.turnaround} turnaround.
                </p>
              ) : null}

              {done ? (
                <div className="py-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ice text-night">
                    <Check className="h-8 w-8" strokeWidth={2.5} />
                  </div>
                  <p className="mt-6 text-[1.05rem] leading-relaxed text-mist">
                    A driver is booked for{" "}
                    <strong>{chosenDay?.label ?? "your chosen day"}</strong>, {draft.window}.
                  </p>
                  <p className="mt-2 text-sm text-mist-soft">
                    {chosenFrequency?.id === "once"
                      ? "A one-off collection — no membership starts."
                      : `Repeating ${chosenFrequency?.label.toLowerCase()}, and you can move or skip any collection.`}
                  </p>
                  <p className="eyebrow mt-6 inline-block rounded-full border border-line px-4 py-2 text-ice">
                    {reference}
                  </p>
                  <p className="mt-4 text-[0.78rem] text-mist-faint">
                    Confirmation on its way to {draft.phone}.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-7 w-full rounded-full bg-ice px-6 py-4 text-[0.95rem] font-semibold text-night transition hover:bg-ice-deep"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={still ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={still ? { opacity: 0 } : { opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                  >
                    {step === 0 ? (
                      <div className="space-y-6">
                        <fieldset>
                          <legend className="eyebrow mb-3 text-mist-faint">How often</legend>
                          <div className="grid grid-cols-3 gap-2.5">
                            {frequencies.map((option) => (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => set("frequency", option.id)}
                                aria-pressed={draft.frequency === option.id}
                                className={`${chip} ${draft.frequency === option.id ? on : off}`}
                              >
                                <span className="block text-[0.82rem] font-semibold">
                                  {option.label}
                                </span>
                                <span className="mt-0.5 block text-[0.62rem] opacity-70">
                                  {option.note}
                                </span>
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className="eyebrow mb-3 text-mist-faint">First collection</legend>
                          <div className="grid grid-cols-4 gap-2">
                            {days.map((date) => (
                              <button
                                key={date.value}
                                type="button"
                                onClick={() => set("day", date.value)}
                                aria-pressed={draft.day === date.value}
                                aria-label={date.label}
                                className={`${chip} px-1 ${draft.day === date.value ? on : off}`}
                              >
                                <span className="block text-[0.6rem] font-bold uppercase tracking-wider opacity-70">
                                  {date.short}
                                </span>
                                <span className="mt-0.5 block text-lg font-bold">{date.day}</span>
                                <span className="block text-[0.6rem] opacity-70">{date.month}</span>
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className="eyebrow mb-3 text-mist-faint">Window</legend>
                          <div className="grid grid-cols-2 gap-2.5">
                            {pickupWindows.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => set("window", slot)}
                                aria-pressed={draft.window === slot}
                                className={`${chip} text-[0.85rem] font-semibold ${draft.window === slot ? on : off}`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ) : null}

                    {step === 1 ? (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="eyebrow mb-2 block text-mist-faint">
                            Collection address
                          </span>
                          <textarea
                            rows={3}
                            className={`${field} resize-none`}
                            placeholder="Flat, building, street, landmark"
                            value={draft.address}
                            onChange={(event) => set("address", event.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="eyebrow mb-2 block text-mist-faint">PIN code</span>
                          <input
                            className={field}
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="560025"
                            value={draft.pincode}
                            onChange={(event) =>
                              set("pincode", event.target.value.replace(/\D/g, ""))
                            }
                          />
                        </label>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="eyebrow mb-2 block text-mist-faint">Your name</span>
                          <input
                            className={field}
                            autoComplete="name"
                            placeholder="Nikhil Rao"
                            value={draft.name}
                            onChange={(event) => set("name", event.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="eyebrow mb-2 block text-mist-faint">Mobile number</span>
                          <input
                            className={field}
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+91 90000 12345"
                            value={draft.phone}
                            onChange={(event) => set("phone", event.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="eyebrow mb-2 block text-mist-faint">
                            Anything we should know
                          </span>
                          <textarea
                            rows={3}
                            className={`${field} resize-none`}
                            placeholder="Gate code, a garment that needs care, a stain to look at"
                            value={draft.notes}
                            onChange={(event) => set("notes", event.target.value)}
                          />
                        </label>
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <div>
                        <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
                          {[
                            ["Plan", plan ? plan.name : "Pay as you go"],
                            ["Repeats", chosenFrequency?.label ?? "—"],
                            ["First", `${chosenDay?.label ?? "—"}, ${draft.window}`],
                            ["Where", `${draft.address}, ${draft.pincode}`],
                            ["Who", `${draft.name} · ${draft.phone}`],
                            ...(draft.notes.trim() ? [["Notes", draft.notes.trim()]] : []),
                          ].map(([term, value]) => (
                            <div key={term} className="flex gap-4 px-4 py-3.5">
                              <dt className="eyebrow w-20 flex-none pt-0.5 text-mist-faint">
                                {term}
                              </dt>
                              <dd className="min-w-0 flex-1 break-words text-[0.9rem] text-mist">
                                {value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-4 text-[0.8rem] leading-relaxed text-mist-soft">
                          Nothing is charged now. Items are counted and weighed under camera at the
                          wash house, and you can cancel free up to two hours before the window
                          opens.
                        </p>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {!done ? (
              <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-mist-soft transition hover:text-mist disabled:pointer-events-none disabled:opacity-0"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => {
                    if (step < STEPS.length - 1) {
                      setStep((s) => s + 1);
                      return;
                    }
                    // Stands in for whatever the booking endpoint returns.
                    setReference(`CRISP-${Math.floor(Math.random() * 9000) + 1000}`);
                    setDone(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-ice px-7 py-3.5 text-sm font-semibold text-night transition hover:bg-ice-deep disabled:cursor-not-allowed disabled:bg-line disabled:text-mist-faint"
                >
                  {step === STEPS.length - 1 ? "Confirm collection" : "Continue"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
