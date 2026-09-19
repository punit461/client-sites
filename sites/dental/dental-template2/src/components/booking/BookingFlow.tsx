"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarPlus, Check, ClipboardList, Navigation } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container, Icon } from "@/components/ui/primitives";
import { evidence } from "@/data/group";
import { doctors, doctorsFor } from "@/data/doctors";
import { locations } from "@/data/locations";
import { specialties } from "@/data/care";

const STEPS = ["Care", "Doctor", "Location", "Date", "Time", "Details", "Confirm"] as const;

const TIMES = ["8:30 AM", "9:45 AM", "11:00 AM", "12:15 PM", "2:30 PM", "4:00 PM", "5:15 PM", "6:30 PM"];

interface Draft {
  specialty: string;
  doctor: string;
  location: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const EMPTY: Draft = {
  specialty: "",
  doctor: "",
  location: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

/** The next fortnight, excluding Sundays — all clinics are closed. */
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

export default function BookingFlow({
  initialSpecialty = "",
  initialDoctor = "",
}: {
  initialSpecialty?: string;
  initialDoctor?: string;
}) {
  const still = useReducedMotion();
  const days = useMemo(() => upcomingDays(), []);

  const [step, setStep] = useState(initialDoctor ? 2 : initialSpecialty ? 1 : 0);
  const [draft, setDraft] = useState<Draft>({
    ...EMPTY,
    specialty: initialSpecialty,
    doctor: initialDoctor,
  });
  const [done, setDone] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const availableDoctors = draft.specialty ? doctorsFor(draft.specialty) : doctors;
  const chosenDoctor = doctors.find((d) => d.slug === draft.doctor);
  /** Only clinics this clinician actually works at. */
  const availableLocations = chosenDoctor
    ? locations.filter((l) => chosenDoctor.locations.includes(l.slug))
    : locations;
  const chosenLocation = locations.find((l) => l.slug === draft.location);
  const chosenSpecialty = specialties.find((s) => s.slug === draft.specialty);
  const chosenDay = days.find((d) => d.value === draft.date);

  const emailOk = draft.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email);
  const ready = [
    Boolean(draft.specialty),
    Boolean(draft.doctor),
    Boolean(draft.location),
    Boolean(draft.date),
    Boolean(draft.time),
    draft.name.trim().length > 1 && /^[\d\s+\-()]{10,}$/.test(draft.phone) && emailOk,
    true,
  ][step];

  const field =
    "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-[0.95rem] text-ink outline-none transition placeholder:text-ink-faint focus:border-forest";
  const cardOn = "border-forest bg-mint";
  const cardOff = "border-line bg-surface hover:border-forest/40";

  const calendarUrl = () => {
    if (!chosenDay) return "#";
    const start = `${draft.date.replace(/-/g, "")}T090000`;
    const text = encodeURIComponent(`${chosenSpecialty?.name ?? "Appointment"} · Vivera Health`);
    const details = encodeURIComponent(
      `Requested with ${chosenDoctor?.name ?? "the clinic"} at ${draft.time}. This is a request — the clinic will confirm the final time.`,
    );
    const location = encodeURIComponent(chosenLocation?.mapsQuery ?? "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${start}&details=${details}&location=${location}`;
  };

  /* ------------------------------------------------------- confirmed */
  if (done) {
    return (
      <Container narrow className="py-16 sm:py-24">
        <div className="rounded-[26px] border border-line bg-surface p-8 text-center sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint text-forest">
            <Check className="h-8 w-8" strokeWidth={2.4} />
          </div>
          <h1 className="display-lg mt-6 text-ink">
            {evidence.liveScheduling ? "You're booked." : "Request received."}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
            {evidence.liveScheduling
              ? "A confirmation is on its way to you."
              : "This is a request, not a confirmed appointment. The clinic will call you on " +
                draft.phone +
                " to confirm a time."}
          </p>

          <dl className="mx-auto mt-8 max-w-md divide-y divide-line overflow-hidden rounded-2xl border border-line text-left">
            {[
              ["Care", chosenSpecialty?.name ?? "—"],
              ["Doctor", chosenDoctor?.name ?? "—"],
              ["Clinic", chosenLocation?.name ?? "—"],
              ["Preferred date", chosenDay?.label ?? "—"],
              ["Preferred time", draft.time],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4 bg-surface px-4 py-3">
                <dt className="w-32 flex-none text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
                  {k}
                </dt>
                <dd className="min-w-0 flex-1 text-[0.92rem] text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={calendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[0.86rem] font-semibold text-ink transition hover:border-forest/40"
            >
              <CalendarPlus className="h-4 w-4" /> Add to calendar
            </a>
            {chosenLocation ? (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(chosenLocation.mapsQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-[0.86rem] font-semibold text-ink transition hover:border-forest/40"
              >
                <Navigation className="h-4 w-4" /> Get directions
              </a>
            ) : null}
            <a
              href={chosenLocation ? `tel:${chosenLocation.phoneDial}` : "#"}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-[0.86rem] font-semibold text-paper transition hover:bg-forest-deep"
            >
              Manage appointment
            </a>
          </div>

          {/* ------------------------------------- prepare checklist */}
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-line bg-paper p-5 text-left">
            <h2 className="flex items-center gap-2 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-forest">
              <ClipboardList className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Prepare for your visit
            </h2>
            <ul className="mt-3 space-y-2">
              {[
                "Photo identification",
                "A list of any medicines you take",
                "Recent reports or imaging from elsewhere",
                "Insurance details, if you are using them",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-[0.88rem] text-ink-soft">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 flex-none rounded-full bg-mint-deep" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/"
            className="mt-8 inline-block text-[0.88rem] font-semibold text-forest underline underline-offset-4"
          >
            Back to home
          </Link>
        </div>
      </Container>
    );
  }

  /* ------------------------------------------------------- the flow */
  return (
    <Container narrow className="py-10 sm:py-16">
      {/* progress */}
      <ol className="no-scrollbar mb-8 flex gap-1.5 overflow-x-auto" aria-label="Booking progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span
              className={`h-1 rounded-full transition-colors ${
                i <= step ? "bg-forest" : "bg-line"
              }`}
              aria-hidden
            />
            <span
              className={`truncate text-[0.68rem] font-semibold uppercase tracking-wide ${
                i === step ? "text-forest" : "text-ink-faint"
              }`}
            >
              {i + 1} {label}
            </span>
          </li>
        ))}
      </ol>

      <h1 className="display-md text-ink">
        {["What kind of care do you need?", "Choose your doctor", "Choose a clinic", "Choose a date", "Choose a time", "Your details", "Check and confirm"][step]}
      </h1>
      <p className="mt-2 text-[0.92rem] text-ink-soft" role="status">
        Step {step + 1} of {STEPS.length}
      </p>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={still ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={still ? { opacity: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.22 }}
          >
            {/* 1 — specialty */}
            {step === 0 ? (
              <fieldset className="grid gap-2.5 sm:grid-cols-2 [&>*]:min-w-0">
                <legend className="sr-only">Choose a specialty</legend>
                {specialties.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => {
                      set("specialty", s.slug);
                      if (draft.doctor && !doctorsFor(s.slug).some((d) => d.slug === draft.doctor)) {
                        set("doctor", "");
                        set("location", "");
                      }
                    }}
                    aria-pressed={draft.specialty === s.slug}
                    className={`flex min-w-0 items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                      draft.specialty === s.slug ? cardOn : cardOff
                    }`}
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-mint text-forest">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.95rem] font-semibold text-ink">{s.name}</span>
                      <span className="block truncate text-[0.78rem] text-ink-faint">{s.blurb}</span>
                    </span>
                  </button>
                ))}
              </fieldset>
            ) : null}

            {/* 2 — doctor */}
            {step === 1 ? (
              <fieldset className="grid gap-2.5 sm:grid-cols-2 [&>*]:min-w-0">
                <legend className="sr-only">Choose a doctor</legend>
                {availableDoctors.length ? (
                  availableDoctors.map((d) => (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => {
                        set("doctor", d.slug);
                        if (draft.location && !d.locations.includes(draft.location)) set("location", "");
                      }}
                      aria-pressed={draft.doctor === d.slug}
                      className={`flex min-w-0 items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                        draft.doctor === d.slug ? cardOn : cardOff
                      }`}
                    >
                      <Image
                        src={d.portrait}
                        alt=""
                        width={48}
                        height={48}
                        className="h-12 w-12 flex-none rounded-full object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block text-[0.95rem] font-semibold text-ink">{d.name}</span>
                        <span className="block truncate text-[0.78rem] text-ink-faint">
                          {d.specialtyName} · {d.languages.slice(0, 2).join(", ")}
                        </span>
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-[0.95rem] text-ink-soft">
                    No clinicians listed for that specialty yet. Go back and choose another, or call
                    the clinic.
                  </p>
                )}
              </fieldset>
            ) : null}

            {/* 3 — location */}
            {step === 2 ? (
              <fieldset className="grid gap-2.5">
                <legend className="sr-only">Choose a clinic</legend>
                {availableLocations.map((l) => (
                  <button
                    key={l.slug}
                    type="button"
                    onClick={() => set("location", l.slug)}
                    aria-pressed={draft.location === l.slug}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                      draft.location === l.slug ? cardOn : cardOff
                    }`}
                  >
                    <Icon name="mapPin" className="mt-0.5 h-5 w-5 flex-none text-forest" />
                    <span>
                      <span className="block text-[0.95rem] font-semibold text-ink">{l.name}</span>
                      <span className="block text-[0.82rem] text-ink-faint">{l.address.join(", ")}</span>
                    </span>
                  </button>
                ))}
              </fieldset>
            ) : null}

            {/* 4 — date */}
            {step === 3 ? (
              <fieldset>
                <legend className="sr-only">Preferred date</legend>
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
                  {days.map((d) => (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => set("date", d.value)}
                      aria-pressed={draft.date === d.value}
                      aria-label={d.label}
                      className={`rounded-2xl border py-3.5 text-center transition-all duration-200 ${
                        draft.date === d.value ? cardOn : cardOff
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
                <p className="mt-3 text-[0.82rem] text-ink-faint">Clinics are closed on Sundays.</p>
              </fieldset>
            ) : null}

            {/* 5 — time */}
            {step === 4 ? (
              <fieldset>
                <legend className="sr-only">Preferred time</legend>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => set("time", t)}
                      aria-pressed={draft.time === t}
                      className={`rounded-2xl border px-3 py-3.5 text-[0.9rem] font-medium text-ink transition-all duration-200 ${
                        draft.time === t ? cardOn : cardOff
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {/* Honest about what these times are. */}
                <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-faint">
                  {evidence.liveScheduling
                    ? "These are live availability."
                    : "These are preferred times, not live availability. The clinic confirms the actual appointment when they call you back."}
                </p>
              </fieldset>
            ) : null}

            {/* 6 — details */}
            {step === 5 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[0.88rem] font-medium text-ink">Full name</span>
                  <input
                    className={field}
                    autoComplete="name"
                    placeholder="Priya Sharma"
                    value={draft.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.88rem] font-medium text-ink">Phone number</span>
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
                  <span className="mb-1.5 block text-[0.88rem] font-medium text-ink">
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
                    <span role="alert" className="mt-1.5 block text-[0.78rem] text-coral-deep">
                      Please check the email address.
                    </span>
                  ) : null}
                </label>
                {/* Deliberately not a medical history field. */}
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-[0.88rem] font-medium text-ink">
                    Anything the clinic should know?{" "}
                    <span className="font-normal text-ink-faint">(optional)</span>
                  </span>
                  <input
                    className={field}
                    placeholder="Access needs, preferred language, best time to call"
                    value={draft.notes}
                    onChange={(e) => set("notes", e.target.value)}
                  />
                </label>
                <p className="text-[0.8rem] leading-relaxed text-ink-faint sm:col-span-2">
                  We only ask for what is needed to contact you. Please do not share medical
                  details here — that conversation belongs in the consultation.
                </p>
              </div>
            ) : null}

            {/* 7 — confirm */}
            {step === 6 ? (
              <div>
                <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
                  {[
                    ["Care", chosenSpecialty?.name ?? "—"],
                    ["Doctor", chosenDoctor?.name ?? "—"],
                    ["Clinic", chosenLocation?.name ?? "—"],
                    ["Preferred date", chosenDay?.label ?? "—"],
                    ["Preferred time", draft.time || "—"],
                    ["Name", draft.name],
                    ["Phone", draft.phone],
                    ...(draft.email ? ([["Email", draft.email]] as [string, string][]) : []),
                    ...(draft.notes ? ([["Notes", draft.notes]] as [string, string][]) : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-4 px-4 py-3.5">
                      <dt className="w-32 flex-none text-[0.7rem] font-semibold uppercase tracking-wider text-ink-faint">
                        {k}
                      </dt>
                      <dd className="min-w-0 flex-1 break-words text-[0.92rem] text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-faint">
                  Submitting sends a request to the clinic. Nothing is charged, and the appointment
                  is confirmed only once a member of the team has spoken to you.
                </p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.9rem] font-medium text-ink-soft transition hover:text-ink disabled:pointer-events-none disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          disabled={!ready}
          onClick={() => (step === STEPS.length - 1 ? setDone(true) : setStep((s) => s + 1))}
          className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-[0.9rem] font-semibold text-paper transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:bg-ink-faint"
        >
          {step === STEPS.length - 1
            ? evidence.liveScheduling
              ? "Confirm booking"
              : "Send request"
            : "Continue"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Container>
  );
}
