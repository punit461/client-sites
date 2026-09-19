"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { bookingSlots } from "@/data/content";
import { services } from "@/data/services";
import { Icon } from "@/components/ui/primitives";
import { useBooking } from "./BookingProvider";

/** The six steps the brief asks for, in order. */
const STEPS = ["Service", "Date", "Time", "Address", "Contact", "Confirm"] as const;

interface Draft {
  service: string;
  date: string;
  slot: string;
  address: string;
  pincode: string;
  name: string;
  phone: string;
  notes: string;
}

const EMPTY: Draft = {
  service: "",
  date: "",
  slot: "",
  address: "",
  pincode: "",
  name: "",
  phone: "",
  notes: "",
};

/** The next seven days, as pickable cards — no date library needed. */
function nextDays(count = 7) {
  const out: { value: string; weekday: string; day: string; month: string; label: string }[] = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push({
      value: d.toISOString().slice(0, 10),
      weekday: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" }),
      day: String(d.getDate()),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      label: d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
    });
  }
  return out;
}

export default function BookingModal() {
  const { isOpen, close, initialService } = useBooking();
  const still = useReducedMotion();
  const titleId = useId();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [done, setDone] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<Element | null>(null);
  const days = useMemo(() => nextDays(), []);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  // Reset to a clean form each time it opens, and remember what to focus after.
  useEffect(() => {
    if (!isOpen) return;
    returnFocusTo.current = document.activeElement;
    setStep(0);
    setDone(false);
    setDraft({ ...EMPTY, service: initialService ?? "" });
  }, [isOpen, initialService]);

  // Escape closes; the page behind must not scroll while the sheet is up.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    // Move focus into the dialog so the keyboard lands somewhere sensible.
    const t = window.setTimeout(() => panelRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [isOpen, close]);

  // Focus belongs back where it came from, or the page loses the user's place.
  useEffect(() => {
    if (isOpen) return;
    const el = returnFocusTo.current;
    if (el instanceof HTMLElement) el.focus();
  }, [isOpen]);

  /** Each step names its own completeness, so "Continue" can be honest. */
  const ready = [
    Boolean(draft.service),
    Boolean(draft.date),
    Boolean(draft.slot),
    draft.address.trim().length > 6 && /^\d{6}$/.test(draft.pincode),
    draft.name.trim().length > 1 && /^[\d\s+\-()]{10,}$/.test(draft.phone),
    true,
  ][step];

  const back = () => setStep((s) => Math.max(0, s - 1));
  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));

  const chosenService = services.find((s) => s.id === draft.service);
  const chosenDay = days.find((d) => d.value === draft.date);

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem] text-ink outline-none transition placeholder:text-ink-faint focus:border-accent";
  const optionBase =
    "group relative flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200";
  const optionOn = "border-accent bg-accent-soft";
  const optionOff = "border-line bg-surface hover:border-accent/50 hover:bg-surface-2";

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-surface shadow-2xl outline-none sm:max-w-xl sm:rounded-3xl"
            initial={still ? false : { opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ---------------------------------------------------- header */}
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
              <div>
                <h2 id={titleId} className="font-sans text-lg font-bold tracking-tight text-ink">
                  {done ? "Pickup scheduled" : "Schedule a pickup"}
                </h2>
                {!done ? (
                  <p className="mt-0.5 text-xs text-ink-faint">
                    Step {step + 1} of {STEPS.length} · {STEPS[step]}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={close}
                className="-mr-1 rounded-full p-2 text-ink-soft transition hover:bg-surface-2 hover:text-ink"
                aria-label="Close booking"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!done ? (
              <div className="h-1 w-full bg-surface-2" aria-hidden>
                <motion.div
                  className="h-full bg-accent"
                  initial={false}
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: still ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ) : null}

            {/* ------------------------------------------------------ body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              {done ? (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check className="h-7 w-7" strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-5 font-sans text-xl font-bold text-ink">
                    You are booked in, {draft.name.split(" ")[0]}.
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                    A driver will collect your {chosenService?.name.toLowerCase()} order on{" "}
                    <strong className="text-ink">{chosenDay?.label}</strong> between{" "}
                    <strong className="text-ink">{draft.slot}</strong>. A confirmation is on its way
                    to {draft.phone}.
                  </p>
                  <p className="mt-5 inline-block rounded-full bg-surface-2 px-4 py-2 font-mono text-xs text-ink-soft">
                    Reference FL-{String(Math.floor(Math.random() * 9000) + 1000)}
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark"
                    >
                      Done
                    </button>
                  </div>
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
                    {/* 1 — service */}
                    {step === 0 ? (
                      <fieldset className="space-y-2.5">
                        <legend className="sr-only">Choose a service</legend>
                        {services.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => set("service", s.id)}
                            aria-pressed={draft.service === s.id}
                            className={`${optionBase} ${draft.service === s.id ? optionOn : optionOff}`}
                          >
                            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-accent-soft text-accent">
                              <Icon name={s.icon} className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-ink">{s.name}</span>
                              <span className="block truncate text-xs text-ink-faint">{s.blurb}</span>
                            </span>
                            <span className="flex-none text-xs font-semibold text-accent">{s.from}</span>
                          </button>
                        ))}
                      </fieldset>
                    ) : null}

                    {/* 2 — date */}
                    {step === 1 ? (
                      <fieldset>
                        <legend className="sr-only">Choose a pickup date</legend>
                        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                          {days.map((d) => (
                            <button
                              key={d.value}
                              type="button"
                              onClick={() => set("date", d.value)}
                              aria-pressed={draft.date === d.value}
                              aria-label={d.label}
                              className={`rounded-xl border py-3 text-center transition-all duration-200 ${
                                draft.date === d.value ? optionOn : optionOff
                              }`}
                            >
                              <span className="block text-[0.68rem] font-semibold uppercase tracking-wide text-ink-faint">
                                {d.weekday}
                              </span>
                              <span className="mt-0.5 block text-lg font-bold text-ink">{d.day}</span>
                              <span className="block text-[0.68rem] text-ink-faint">{d.month}</span>
                            </button>
                          ))}
                        </div>
                      </fieldset>
                    ) : null}

                    {/* 3 — time */}
                    {step === 2 ? (
                      <fieldset>
                        <legend className="sr-only">Choose a pickup window</legend>
                        <div className="grid grid-cols-2 gap-2.5">
                          {bookingSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => set("slot", slot)}
                              aria-pressed={draft.slot === slot}
                              className={`rounded-xl border px-3 py-3.5 text-sm font-medium transition-all duration-200 ${
                                draft.slot === slot ? `${optionOn} text-accent-dark` : `${optionOff} text-ink`
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        <p className="mt-3 text-xs text-ink-faint">
                          Two-hour windows. The driver calls when they are ten minutes away.
                        </p>
                      </fieldset>
                    ) : null}

                    {/* 4 — address */}
                    {step === 3 ? (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-ink">Pickup address</span>
                          <textarea
                            rows={3}
                            className={`${field} resize-none`}
                            placeholder="Flat, building, street, landmark"
                            value={draft.address}
                            onChange={(e) => set("address", e.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-ink">PIN code</span>
                          <input
                            className={field}
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="560038"
                            value={draft.pincode}
                            onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))}
                          />
                          {draft.pincode && !/^\d{6}$/.test(draft.pincode) ? (
                            <span className="mt-1.5 block text-xs text-ink-faint">
                              A PIN code is six digits.
                            </span>
                          ) : null}
                        </label>
                      </div>
                    ) : null}

                    {/* 5 — contact */}
                    {step === 4 ? (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-ink">Your name</span>
                          <input
                            className={field}
                            placeholder="Ananya Rao"
                            autoComplete="name"
                            value={draft.name}
                            onChange={(e) => set("name", e.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-ink">Mobile number</span>
                          <input
                            className={field}
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+91 98765 43210"
                            value={draft.phone}
                            onChange={(e) => set("phone", e.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-ink">
                            Anything we should know?{" "}
                            <span className="font-normal text-ink-faint">(optional)</span>
                          </span>
                          <input
                            className={field}
                            placeholder="Separate the whites, please"
                            value={draft.notes}
                            onChange={(e) => set("notes", e.target.value)}
                          />
                        </label>
                      </div>
                    ) : null}

                    {/* 6 — confirm */}
                    {step === 5 ? (
                      <div>
                        <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
                          {[
                            ["Service", chosenService?.name ?? "—"],
                            ["Date", chosenDay?.label ?? "—"],
                            ["Pickup window", draft.slot || "—"],
                            ["Address", `${draft.address}, ${draft.pincode}`],
                            ["Contact", `${draft.name} · ${draft.phone}`],
                            ...(draft.notes ? ([["Notes", draft.notes]] as [string, string][]) : []),
                          ].map(([k, v]) => (
                            <div key={k} className="flex gap-4 bg-surface px-4 py-3">
                              <dt className="w-28 flex-none text-xs font-semibold uppercase tracking-wide text-ink-faint">
                                {k}
                              </dt>
                              <dd className="min-w-0 flex-1 break-words text-sm text-ink">{v}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-4 text-xs leading-relaxed text-ink-faint">
                          Nothing is charged now. Items are counted and priced with you at pickup, and
                          you can cancel free of charge up to two hours before the window starts.
                        </p>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* ---------------------------------------------------- footer */}
            {!done ? (
              <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-2/60 px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition hover:text-ink disabled:pointer-events-none disabled:opacity-0"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => (step === STEPS.length - 1 ? setDone(true) : next())}
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:bg-ink-faint"
                >
                  {step === STEPS.length - 1 ? "Confirm pickup" : "Continue"}
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
