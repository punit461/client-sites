"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { pickupWindows } from "@/data/site";
import { useBooking } from "./BookingProvider";

const STEPS = ["When", "Where", "Who", "Confirm"] as const;

interface Draft {
  day: string;
  window: string;
  address: string;
  pincode: string;
  name: string;
  phone: string;
}

const EMPTY: Draft = { day: "", window: "", address: "", pincode: "", name: "", phone: "" };

function nextDays(count = 6) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      value: d.toISOString().slice(0, 10),
      short: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" }),
      day: String(d.getDate()),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      label: d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
    };
  });
}

export default function BookingModal() {
  const { isOpen, close, seed } = useBooking();
  const still = useReducedMotion();
  const titleId = useId();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [done, setDone] = useState(false);

  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<Element | null>(null);
  const days = useMemo(() => nextDays(), []);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  useEffect(() => {
    if (!isOpen) return;
    returnTo.current = document.activeElement;
    setDone(false);
    setDraft({ ...EMPTY, day: seed.day ?? "", window: seed.window ?? "" });
    // Skip straight past "when" if the hero card already answered it.
    setStep(seed.day && seed.window ? 1 : 0);
  }, [isOpen, seed]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => panel.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (isOpen) return;
    const el = returnTo.current;
    if (el instanceof HTMLElement) el.focus();
  }, [isOpen]);

  const ready = [
    Boolean(draft.day && draft.window),
    draft.address.trim().length > 6 && /^\d{6}$/.test(draft.pincode),
    draft.name.trim().length > 1 && /^[\d\s+\-()]{10,}$/.test(draft.phone),
    true,
  ][step];

  const chosenDay = days.find((d) => d.value === draft.day);
  const field =
    "w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-[0.95rem] text-ink outline-none transition placeholder:text-ink-faint focus:border-ink";
  const chip = "rounded-2xl border px-3 py-3 text-center transition-all duration-200";
  const on = "border-ink bg-ink text-paper";
  const off = "border-line bg-paper hover:border-ink/45";

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center">
          <motion.div
            className="absolute inset-0 bg-ink/55 backdrop-blur-sm"
            initial={still ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden
          />

          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-[28px] bg-paper outline-none sm:max-w-lg sm:rounded-[28px]"
            initial={still ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4 px-6 pb-4 pt-6">
              <div>
                <h2 id={titleId} className="type-lg text-ink">
                  {done ? "Booked" : "Book a pickup"}
                </h2>
                {!done ? (
                  <p className="label mt-2 text-ink-faint">
                    {step + 1} / {STEPS.length} · {STEPS[step]}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={close}
                className="-mr-1 rounded-full border border-line p-2 text-ink transition hover:bg-ink hover:text-paper"
                aria-label="Close booking"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!done ? (
              <div className="mx-6 h-1 overflow-hidden rounded-full bg-line" aria-hidden>
                <motion.div
                  className="h-full rounded-full bg-lime-deep"
                  initial={false}
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: still ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ) : null}

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {done ? (
                <div className="py-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-ink">
                    <Check className="h-8 w-8" strokeWidth={2.5} />
                  </div>
                  <p className="mt-6 text-[1.05rem] leading-relaxed text-ink">
                    A driver is booked for{" "}
                    <strong>{chosenDay?.label ?? "your chosen day"}</strong>, {draft.window}.
                  </p>
                  <p className="mt-2 text-sm text-ink-soft">
                    A confirmation is on its way to {draft.phone}.
                  </p>
                  <p className="label mt-6 inline-block rounded-full border border-line px-4 py-2 text-ink">
                    LOOP-{String(Math.floor(Math.random() * 90000) + 10000)}
                  </p>
                  <div className="mt-7">
                    <button
                      type="button"
                      onClick={close}
                      className="w-full rounded-full bg-ink px-6 py-4 text-[0.95rem] font-semibold text-paper transition hover:bg-night"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={still ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={still ? { opacity: 0 } : { opacity: 0, x: -18 }}
                    transition={{ duration: 0.22 }}
                  >
                    {step === 0 ? (
                      <div className="space-y-6">
                        <fieldset>
                          <legend className="label mb-3 text-ink">Pickup day</legend>
                          <div className="grid grid-cols-3 gap-2.5">
                            {days.map((d) => (
                              <button
                                key={d.value}
                                type="button"
                                onClick={() => set("day", d.value)}
                                aria-pressed={draft.day === d.value}
                                aria-label={d.label}
                                className={`${chip} ${draft.day === d.value ? on : off}`}
                              >
                                <span className="block text-[0.65rem] font-bold uppercase tracking-wider opacity-70">
                                  {d.short}
                                </span>
                                <span className="mt-0.5 block text-xl font-bold">{d.day}</span>
                                <span className="block text-[0.65rem] opacity-70">{d.month}</span>
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <fieldset>
                          <legend className="label mb-3 text-ink">Pickup window</legend>
                          <div className="grid grid-cols-2 gap-2.5">
                            {pickupWindows.map((w) => (
                              <button
                                key={w}
                                type="button"
                                onClick={() => set("window", w)}
                                aria-pressed={draft.window === w}
                                className={`${chip} text-[0.85rem] font-semibold ${draft.window === w ? on : off}`}
                              >
                                {w}
                              </button>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                    ) : null}

                    {step === 1 ? (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="label mb-2 block text-ink">Pickup address</span>
                          <textarea
                            rows={3}
                            className={`${field} resize-none`}
                            placeholder="Flat, building, street, landmark"
                            value={draft.address}
                            onChange={(e) => set("address", e.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="label mb-2 block text-ink">PIN code</span>
                          <input
                            className={field}
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="560001"
                            value={draft.pincode}
                            onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))}
                          />
                        </label>
                      </div>
                    ) : null}

                    {step === 2 ? (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="label mb-2 block text-ink">Your name</span>
                          <input
                            className={field}
                            autoComplete="name"
                            placeholder="Rahul Menon"
                            value={draft.name}
                            onChange={(e) => set("name", e.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="label mb-2 block text-ink">Mobile number</span>
                          <input
                            className={field}
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="+91 90000 12345"
                            value={draft.phone}
                            onChange={(e) => set("phone", e.target.value)}
                          />
                        </label>
                      </div>
                    ) : null}

                    {step === 3 ? (
                      <div>
                        <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
                          {[
                            ["When", `${chosenDay?.label ?? "—"}, ${draft.window}`],
                            ["Where", `${draft.address}, ${draft.pincode}`],
                            ["Who", `${draft.name} · ${draft.phone}`],
                          ].map(([k, v]) => (
                            <div key={k} className="flex gap-4 px-4 py-3.5">
                              <dt className="label w-16 flex-none pt-0.5 text-ink-faint">{k}</dt>
                              <dd className="min-w-0 flex-1 break-words text-[0.9rem] text-ink">{v}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-soft">
                          Nothing is charged now. Items are counted and priced with you at pickup,
                          and you can cancel free up to two hours before the window opens.
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
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-ink-soft transition hover:text-ink disabled:pointer-events-none disabled:opacity-0"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  disabled={!ready}
                  onClick={() =>
                    step === STEPS.length - 1 ? setDone(true) : setStep((s) => s + 1)
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper transition hover:bg-night disabled:cursor-not-allowed disabled:bg-ink-faint"
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
