"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, Navigation, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { clinic, contact, evidence } from "@/data/clinic";
import { appointmentSlots } from "@/data/content";
import { cliniciansFor, team } from "@/data/team";
import { treatments } from "@/data/treatments";
import { Icon } from "@/components/ui/primitives";
import { useBooking } from "./BookingProvider";

const STEPS = ["Treatment", "Clinician", "Date", "Time", "Your details", "Confirm"] as const;

interface Draft {
  treatment: string;
  clinician: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const EMPTY: Draft = {
  treatment: "",
  clinician: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

/** The next fortnight, excluding Sundays — the practice is closed. */
function upcomingDays(count = 12) {
  const out: { value: string; weekday: string; day: string; month: string; label: string }[] = [];
  const d = new Date();
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue;
    out.push({
      value: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("en-IN", { weekday: "short" }),
      day: String(d.getDate()),
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      label: d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }),
    });
  }
  return out;
}

export default function BookingDialog() {
  const { isOpen, close, seed } = useBooking();
  const still = useReducedMotion();
  const titleId = useId();
  const descId = useId();

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [done, setDone] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusTo = useRef<Element | null>(null);
  const days = useMemo(() => upcomingDays(), []);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  useEffect(() => {
    if (!isOpen) return;
    returnFocusTo.current = document.activeElement;
    setDone(false);
    setDraft({ ...EMPTY, treatment: seed.treatment ?? "", clinician: seed.clinician ?? "" });
    setStep(seed.clinician ? 2 : seed.treatment ? 1 : 0);
  }, [isOpen, seed]);

  // Escape closes; the page behind must not scroll while the dialog is up.
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => panelRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [isOpen, close]);

  // Focus belongs back where it came from, or a keyboard user loses their place.
  useEffect(() => {
    if (isOpen) return;
    const el = returnFocusTo.current;
    if (el instanceof HTMLElement) el.focus();
  }, [isOpen]);

  const chosenTreatment = treatments.find((t) => t.slug === draft.treatment);
  const available = draft.treatment ? cliniciansFor(draft.treatment) : team;
  const chosenClinician = team.find((c) => c.slug === draft.clinician);
  const chosenDay = days.find((d) => d.value === draft.date);

  const emailOk = draft.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email);
  const ready = [
    Boolean(draft.treatment),
    Boolean(draft.clinician),
    Boolean(draft.date),
    Boolean(draft.time),
    draft.name.trim().length > 1 && /^[\d\s+\-()]{10,}$/.test(draft.phone) && emailOk,
    true,
  ][step];

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem] text-ink outline-none transition placeholder:text-ink-faint focus:border-sage-deep";
  const optionBase =
    "group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200";
  const optionOn = "border-sage-deep bg-sage-wash";
  const optionOff = "border-line bg-surface hover:border-sage hover:bg-surface-2";

  /** A Google Calendar draft — no file download, works on every device. */
  const calendarUrl = () => {
    if (!chosenDay) return "#";
    const start = `${draft.date.replace(/-/g, "")}T090000`;
    const text = encodeURIComponent(`${chosenTreatment?.name ?? "Dental appointment"} · ${clinic.fullName}`);
    const details = encodeURIComponent(
      `Requested with ${chosenClinician?.name ?? "the practice"} at ${draft.time}. This is a request — the practice will confirm the final time.`,
    );
    const location = encodeURIComponent(
      `${contact.address.line1}, ${contact.address.line2}, ${contact.address.city} ${contact.address.postcode}`,
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${start}&details=${details}&location=${location}`;
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center">
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
            aria-describedby={descId}
            className="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-ivory shadow-2xl outline-none sm:max-w-xl sm:rounded-3xl"
            initial={still ? false : { opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ---------------------------------------------------- header */}
            <div className="flex items-start justify-between gap-4 border-b border-line bg-surface px-5 py-4 sm:px-7">
              <div>
                <h2 id={titleId} className="font-sans text-lg font-bold tracking-tight text-ink">
                  {done
                    ? "Request received"
                    : evidence.liveScheduling
                      ? "Book an appointment"
                      : "Request an appointment"}
                </h2>
                <p id={descId} className="mt-0.5 text-xs text-ink-faint">
                  {done
                    ? "The practice will be in touch to confirm."
                    : `Step ${step + 1} of ${STEPS.length} · ${STEPS[step]}`}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="-mr-1 rounded-full p-2 text-ink-soft transition hover:bg-surface-2 hover:text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!done ? (
              <div className="h-1 w-full bg-surface-2" aria-hidden>
                <motion.div
                  className="h-full bg-sage-deep"
                  initial={false}
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: still ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ) : null}

            {/* ------------------------------------------------------ body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
              {done ? (
                <div className="py-4 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-wash text-sage-deep">
                    <Check className="h-7 w-7" strokeWidth={2.4} />
                  </div>
                  <h3 className="display-md mt-5 text-ink">Thank you, {draft.name.split(" ")[0]}.</h3>

                  <dl className="mx-auto mt-6 max-w-sm divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface text-left">
                    {[
                      ["Treatment", chosenTreatment?.name ?? "—"],
                      ["Clinician", chosenClinician?.name ?? "—"],
                      ["Preferred date", chosenDay?.label ?? "—"],
                      ["Preferred time", draft.time],
                      ["Clinic", `${contact.address.line1}, ${contact.address.city}`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-4 px-4 py-3">
                        <dt className="w-32 flex-none text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
                          {k}
                        </dt>
                        <dd className="min-w-0 flex-1 text-sm text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mx-auto mt-4 max-w-sm text-[0.8rem] leading-relaxed text-ink-soft">
                    This is a request, not a confirmed appointment. A member of the team will call
                    you on {draft.phone} to confirm a time.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                    <a
                      href={calendarUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[0.85rem] font-semibold text-ink transition hover:border-ink/25"
                    >
                      <CalendarPlus className="h-4 w-4" /> Add to calendar
                    </a>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[0.85rem] font-semibold text-ink transition hover:border-ink/25"
                    >
                      <Navigation className="h-4 w-4" /> Get directions
                    </a>
                    <button
                      type="button"
                      onClick={close}
                      className="rounded-full bg-terracotta px-6 py-3 text-[0.85rem] font-semibold text-white transition hover:bg-terracotta-deep"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={still ? false : { opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={still ? { opacity: 0 } : { opacity: 0, x: -14 }}
                    transition={{ duration: 0.22 }}
                  >
                    {/* 1 — treatment */}
                    {step === 0 ? (
                      <fieldset className="space-y-2.5">
                        <legend className="sr-only">How can we help?</legend>
                        {treatments.map((t) => (
                          <button
                            key={t.slug}
                            type="button"
                            onClick={() => {
                              set("treatment", t.slug);
                              // A clinician chosen earlier may not offer this treatment.
                              if (draft.clinician && !cliniciansFor(t.slug).some((c) => c.slug === draft.clinician)) {
                                set("clinician", "");
                              }
                            }}
                            aria-pressed={draft.treatment === t.slug}
                            className={`${optionBase} ${draft.treatment === t.slug ? optionOn : optionOff}`}
                          >
                            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-sage-wash text-sage-deep">
                              <Icon name={t.icon} className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-ink">{t.name}</span>
                              <span className="block truncate text-xs text-ink-faint">{t.summary}</span>
                            </span>
                          </button>
                        ))}
                      </fieldset>
                    ) : null}

                    {/* 2 — clinician */}
                    {step === 1 ? (
                      <fieldset className="space-y-2.5">
                        <legend className="sr-only">Choose a clinician</legend>
                        {available.map((c) => (
                          <button
                            key={c.slug}
                            type="button"
                            onClick={() => set("clinician", c.slug)}
                            aria-pressed={draft.clinician === c.slug}
                            className={`${optionBase} ${draft.clinician === c.slug ? optionOn : optionOff}`}
                          >
                            <Image
                              src={c.portrait}
                              alt=""
                              width={44}
                              height={44}
                              className="h-11 w-11 flex-none rounded-full object-cover"
                            />
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-ink">{c.name}</span>
                              <span className="block truncate text-xs text-ink-faint">{c.role}</span>
                            </span>
                          </button>
                        ))}
                        <p className="pt-1 text-xs text-ink-faint">
                          No preference? Pick whoever is listed — the team will match you to the
                          right clinician when they confirm.
                        </p>
                      </fieldset>
                    ) : null}

                    {/* 3 — date */}
                    {step === 2 ? (
                      <fieldset>
                        <legend className="sr-only">Preferred date</legend>
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
                              <span className="block text-[0.66rem] font-semibold uppercase tracking-wide text-ink-faint">
                                {d.weekday}
                              </span>
                              <span className="mt-0.5 block text-lg font-bold text-ink">{d.day}</span>
                              <span className="block text-[0.66rem] text-ink-faint">{d.month}</span>
                            </button>
                          ))}
                        </div>
                        <p className="mt-3 text-xs text-ink-faint">The practice is closed on Sundays.</p>
                      </fieldset>
                    ) : null}

                    {/* 4 — time */}
                    {step === 3 ? (
                      <fieldset>
                        <legend className="sr-only">Preferred time</legend>
                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                          {appointmentSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => set("time", slot)}
                              aria-pressed={draft.time === slot}
                              className={`rounded-xl border px-3 py-3.5 text-sm font-medium transition-all duration-200 ${
                                draft.time === slot ? `${optionOn} text-ink` : `${optionOff} text-ink`
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                        {/* Being honest about what these times are. */}
                        <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                          {evidence.liveScheduling
                            ? "These times are live availability."
                            : "These are preferred times, not live availability. The practice will confirm the actual appointment when they call you back."}
                        </p>
                      </fieldset>
                    ) : null}

                    {/* 5 — details */}
                    {step === 4 ? (
                      <div className="space-y-4">
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-ink">Full name</span>
                          <input
                            className={field}
                            autoComplete="name"
                            placeholder="Aparna Rao"
                            value={draft.name}
                            onChange={(e) => set("name", e.target.value)}
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-ink">Phone number</span>
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
                            Email <span className="font-normal text-ink-faint">(optional)</span>
                          </span>
                          <input
                            className={field}
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={draft.email}
                            onChange={(e) => set("email", e.target.value)}
                            aria-invalid={!emailOk}
                          />
                          {!emailOk ? (
                            <span role="alert" className="mt-1.5 block text-xs text-terracotta-deep">
                              Please check the email address.
                            </span>
                          ) : null}
                        </label>
                        {/* Deliberately not a medical history field: this form
                            should not collect clinical detail before a consultation. */}
                        <label className="block">
                          <span className="mb-1.5 block text-sm font-medium text-ink">
                            Anything the team should know?{" "}
                            <span className="font-normal text-ink-faint">(optional)</span>
                          </span>
                          <input
                            className={field}
                            placeholder="Preferred language, access needs, best time to call"
                            value={draft.notes}
                            onChange={(e) => set("notes", e.target.value)}
                          />
                        </label>
                      </div>
                    ) : null}

                    {/* 6 — confirm */}
                    {step === 5 ? (
                      <div>
                        <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
                          {[
                            ["Treatment", chosenTreatment?.name ?? "—"],
                            ["Clinician", chosenClinician?.name ?? "—"],
                            ["Preferred date", chosenDay?.label ?? "—"],
                            ["Preferred time", draft.time || "—"],
                            ["Name", draft.name],
                            ["Phone", draft.phone],
                            ...(draft.email ? ([["Email", draft.email]] as [string, string][]) : []),
                            ...(draft.notes ? ([["Notes", draft.notes]] as [string, string][]) : []),
                          ].map(([k, v]) => (
                            <div key={k} className="flex gap-4 px-4 py-3">
                              <dt className="w-32 flex-none text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
                                {k}
                              </dt>
                              <dd className="min-w-0 flex-1 break-words text-sm text-ink">{v}</dd>
                            </div>
                          ))}
                        </dl>
                        <p className="mt-4 text-xs leading-relaxed text-ink-faint">
                          Submitting sends a request to the practice. Nothing is charged, and the
                          appointment is confirmed only once a member of the team has spoken to you.
                        </p>
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* ---------------------------------------------------- footer */}
            {!done ? (
              <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-5 py-4 sm:px-7">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition hover:text-ink disabled:pointer-events-none disabled:opacity-0"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  disabled={!ready}
                  onClick={() => (step === STEPS.length - 1 ? setDone(true) : setStep((s) => s + 1))}
                  className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition hover:bg-terracotta-deep disabled:cursor-not-allowed disabled:bg-ink-faint"
                >
                  {step === STEPS.length - 1 ? "Send request" : "Continue"}
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
