"use client";

import { AlertCircle, CheckCircle2, ImagePlus, Info, LoaderCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { business, mailHref, telHref } from "@/config/business";
import { env } from "@/config/env";
import {
  ATTACHMENTS,
  LIMITS,
  TIME_WINDOWS,
  URGENCY,
  todayIso,
  validateAttachments,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
} from "@/lib/quote-rules";

/**
 * The quote request. The site is a static export, so the form POSTs to the
 * endpoint in NEXT_PUBLIC_QUOTE_ENDPOINT — the included Cloudflare Worker
 * (integrations/quote-worker), or a form service such as Formspree. Success is
 * shown only when that service answers 2xx.
 *
 * Without an endpoint the form says so plainly, sends nothing, keeps what the
 * visitor typed, and offers phone and email instead. It never pretends.
 *
 * Conditional fields: a business name appears only when the request is for a
 * business (not a home), and
 * date/time preferences are hidden for urgent jobs, where the right move is a
 * phone call rather than a calendar.
 *
 * Spam: a hidden honeypot field, a minimum fill time, and a cooldown after a
 * successful send. Real rate limiting happens server-side, in the worker.
 */

const MIN_FILL_MS = 3000;
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = "quote-sent-at";

type Status = "idle" | "sending" | "sent" | "error" | "offline";

const empty: QuoteFields = {
  name: "",
  email: "",
  phone: "",
  postalCode: "",
  address: "",
  service: "",
  description: "",
  urgency: "",
  preferredDate: "",
  timeWindow: "No preference",
  consent: false,
};

const order: (keyof QuoteErrors)[] = [
  "name",
  "email",
  "phone",
  "postalCode",
  "address",
  "service",
  "description",
  "urgency",
  "preferredDate",
  "timeWindow",
  "attachments",
  "consent",
];

export function QuoteForm({ serviceOptions, initialService = "" }: { serviceOptions: string[]; initialService?: string }) {
  const uid = useId();
  const [values, setValues] = useState<QuoteFields>({ ...empty, service: initialService });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState("");
  const [company, setCompany] = useState("");
  const [property, setProperty] = useState<"home" | "business">("home");
  const isCommercial = property === "business";
  const isUrgent = values.urgency === "urgent";

  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Timed from when the form appears: autofill-then-send is a real person too.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const id = (field: string) => `${uid}-${field}`;

  const set = <K extends keyof QuoteFields>(field: K, value: QuoteFields[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Re-validate a field the visitor has already left, so errors clear as they fix them.
    if (touched[field] || errors[field]) {
      setErrors((e) => ({ ...e, [field]: validateQuote(next, serviceOptions)[field] }));
    }
  };

  const blur = (field: keyof QuoteFields) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const fieldError = validateQuote(values, serviceOptions)[field];
    setErrors((e) => ({ ...e, [field]: fieldError }));
  };

  const onFiles = (e: ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    const next = [...files, ...picked].slice(0, ATTACHMENTS.maxFiles + 1);
    const message = validateAttachments(next);
    setErrors((er) => ({ ...er, attachments: message }));
    if (!message) setFiles(next);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    setErrors((er) => ({ ...er, attachments: validateAttachments(next) }));
    fileInput.current?.focus();
  };

  const show = (s: Status, message = "") => {
    setStatus(s);
    setProblem(message);
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found: QuoteErrors = { ...validateQuote(values, serviceOptions) };
    const fileError = validateAttachments(files);
    if (fileError) found.attachments = fileError;
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.values(found).some(Boolean)) {
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    // Bots fill hidden fields and submit instantly. Say little; keep the data.
    if (honeypot.current?.value) return show("error", "Your request could not be sent.");
    if (Date.now() - startedAt.current < MIN_FILL_MS)
      return show("error", "That was quick! Please check your details, then send again.");

    try {
      const last = Number(sessionStorage.getItem(COOLDOWN_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS)
        return show("error", "You sent a request a moment ago. Please wait a minute before sending another.");
    } catch {
      // Storage can be blocked; the server-side limit still applies.
    }

    if (!env.quoteEndpoint) return show("offline");

    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);
    const payload = {
      ...(env.quoteAccessKey ? { access_key: env.quoteAccessKey } : {}),
      subject: `Quote request: ${values.service} (${values.urgency})`,
      ...values,
      propertyType: property,
      ...(isCommercial && company.trim() ? { company: company.trim() } : {}),
      consent: values.consent ? "yes" : "no",
      page: window.location.pathname,
      website: honeypot.current?.value ?? "",
      elapsedMs: String(Date.now() - startedAt.current),
    };

    try {
      let body: BodyInit;
      const headers: Record<string, string> = { Accept: "application/json" };
      if (files.length) {
        // Photos need multipart; the endpoint must accept file uploads.
        const fd = new FormData();
        Object.entries(payload).forEach(([k, v]) => fd.append(k, String(v)));
        files.forEach((f) => fd.append("attachments", f, f.name));
        body = fd;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(payload);
      }
      const res = await fetch(env.quoteEndpoint, { method: "POST", headers, body, signal: controller.signal });
      if (res.status === 429) throw new Error("rate");
      if (!res.ok) throw new Error(String(res.status));

      try {
        sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      } catch {}
      setValues({ ...empty });
      setFiles([]);
      setCompany("");
      setProperty("home");
      setTouched({});
      startedAt.current = Date.now();
      show("sent");
    } catch (err) {
      const message =
        err instanceof DOMException && err.name === "AbortError"
          ? "The connection timed out before your request was confirmed."
          : (err as Error).message === "rate"
            ? "We have received several requests from this connection recently. Please wait a few minutes, or call us."
            : "We could not reach our request service.";
      show("error", message);
    } finally {
      clearTimeout(timeout);
    }
  }

  if (status === "sent")
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-[var(--radius-card)] border border-success/30 bg-white p-8 outline-none sm:p-10">
        <CheckCircle2 className="h-10 w-10 text-success" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="t-h3 mt-5 text-teal">Thank you, your request has been sent.</h2>
        <p className="mt-3 text-muted">
          We will be in touch during our opening hours to talk it through. This is a request, not a booked appointment —
          we confirm any visit time with you directly.
        </p>
        <p className="mt-3 text-muted">
          If water is escaping or the problem gets worse, please call{" "}
          <a href={telHref} className="font-semibold text-teal underline underline-offset-4">
            {business.phone.display}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-outline mt-8">
          Send another request
        </button>
      </div>
    );

  const errorList = order.filter((k) => errors[k]);
  const sending = status === "sending";
  const describedBy = (field: string, hint = false) =>
    [hint ? id(`${field}-hint`) : "", errors[field as keyof QuoteErrors] ? id(`${field}-error`) : ""].filter(Boolean).join(" ") ||
    undefined;
  const inv = (field: keyof QuoteErrors) => (errors[field] ? true : undefined);

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={sending} className="relative">
      {errorList.length ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 rounded-[var(--radius-card)] border border-danger/40 bg-white p-5 outline-none focus-visible:ring-2 focus-visible:ring-danger/40"
        >
          <p className="flex items-center gap-2 font-semibold text-danger">
            <AlertCircle className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            Please check {errorList.length === 1 ? "one field" : `${errorList.length} fields`}:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${id(k === "urgency" ? "urgency-urgent" : k)}`} className="text-teal underline underline-offset-2">
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === "offline" || status === "error" ? (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mb-8 rounded-[var(--radius-card)] border border-terracotta bg-white p-5 outline-none">
          {status === "offline" ? (
            <>
              <p className="flex items-center gap-2 font-semibold text-teal">
                <Info className="h-5 w-5 text-clay" strokeWidth={1.8} aria-hidden="true" />
                Online quote requests are not connected yet.
              </p>
              <p className="mt-2 text-sm text-muted">
                Your details have <strong>not</strong> been sent. Everything you typed is still here — please call{" "}
                <a href={telHref} className="font-semibold text-teal underline underline-offset-2">
                  {business.phone.display}
                </a>
                {mailHref ? (
                  <>
                    {" "}
                    or email{" "}
                    <a href={mailHref} className="font-semibold text-teal underline underline-offset-2">
                      {business.email}
                    </a>
                  </>
                ) : null}
                .
              </p>
              {process.env.NODE_ENV !== "production" ? (
                <p className="mt-2 text-xs text-muted">Developer note: set NEXT_PUBLIC_QUOTE_ENDPOINT (see README).</p>
              ) : null}
            </>
          ) : (
            <>
              <p className="flex items-center gap-2 font-semibold text-danger">
                <AlertCircle className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                Your request was not sent.
              </p>
              <p className="mt-2 text-sm text-muted">
                {problem} Your details are still in the form — try again, or call{" "}
                <a href={telHref} className="font-semibold text-teal underline underline-offset-2">
                  {business.phone.display}
                </a>
                .
              </p>
            </>
          )}
        </div>
      ) : null}

      <Fieldset legend="Your details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id("name")} label="Full name" error={errors.name}>
            <input
              id={id("name")}
              name="name"
              autoComplete="name"
              maxLength={LIMITS.name}
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => blur("name")}
              aria-invalid={inv("name")}
              aria-describedby={describedBy("name")}
              className="field"
            />
          </Field>
          <Field id={id("phone")} label="Phone" error={errors.phone}>
            <input
              id={id("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={LIMITS.phone}
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              onBlur={() => blur("phone")}
              aria-invalid={inv("phone")}
              aria-describedby={describedBy("phone")}
              className="field"
            />
          </Field>
          <Field id={id("email")} label="Email" error={errors.email} className="sm:col-span-2">
            <input
              id={id("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={LIMITS.email}
              value={values.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => blur("email")}
              aria-invalid={inv("email")}
              aria-describedby={describedBy("email")}
              className="field"
            />
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="Where is the work?">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field id={id("postalCode")} label="Postal code" error={errors.postalCode}>
            <input
              id={id("postalCode")}
              name="postalCode"
              autoComplete="postal-code"
              maxLength={LIMITS.postalCode}
              value={values.postalCode}
              onChange={(e) => set("postalCode", e.target.value)}
              onBlur={() => blur("postalCode")}
              aria-invalid={inv("postalCode")}
              aria-describedby={describedBy("postalCode")}
              className="field"
            />
          </Field>
          <Field
            id={id("address")}
            label="Street address"
            optional
            hint="Helps us plan the visit. You can share it later."
            error={errors.address}
            className="sm:col-span-2"
          >
            <input
              id={id("address")}
              name="address"
              autoComplete="street-address"
              maxLength={LIMITS.address}
              value={values.address}
              onChange={(e) => set("address", e.target.value)}
              onBlur={() => blur("address")}
              aria-invalid={inv("address")}
              aria-describedby={describedBy("address", true)}
              className="field"
            />
          </Field>
        </div>
      </Fieldset>

      <Fieldset legend="About the job">
        <div className="grid gap-5">
          <fieldset>
            <legend className="text-[0.95rem] font-semibold text-teal">Is this for a home or a business?</legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {(["home", "business"] as const).map((p) => (
                <label
                  key={p}
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[var(--radius-card)] border border-line-cool bg-white px-4 transition-colors hover:border-sage-deep has-[:checked]:border-teal has-[:checked]:bg-sage has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal/30"
                >
                  <input
                    type="radio"
                    name="propertyType"
                    value={p}
                    checked={property === p}
                    onChange={() => setProperty(p)}
                    className="h-4 w-4 shrink-0 accent-[#164E4A]"
                  />
                  <span className="font-semibold text-teal">{p === "home" ? "A home" : "A business"}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <Field id={id("service")} label="Type of plumbing work" error={errors.service}>
            <select
              id={id("service")}
              name="service"
              value={values.service}
              onChange={(e) => set("service", e.target.value)}
              onBlur={() => blur("service")}
              aria-invalid={inv("service")}
              aria-describedby={describedBy("service")}
              className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23164E4A%22 stroke-width=%221.8%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10"
            >
              <option value="">Choose one…</option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          {isCommercial ? (
            <Field id={id("company")} label="Business name" optional hint="So we know which premises the request is for.">
              <input
                id={id("company")}
                name="company"
                autoComplete="organization"
                maxLength={120}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                aria-describedby={id("company-hint")}
                className="field"
              />
            </Field>
          ) : null}

          <Field
            id={id("description")}
            label="Describe the problem"
            hint="What's happening, where in the building, and when it started."
            error={errors.description}
          >
            <textarea
              id={id("description")}
              name="description"
              rows={5}
              maxLength={LIMITS.description}
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              onBlur={() => blur("description")}
              aria-invalid={inv("description")}
              aria-describedby={describedBy("description", true)}
              className="field resize-y"
            />
          </Field>

          <fieldset aria-describedby={errors.urgency ? id("urgency-error") : undefined}>
            <legend className="text-[0.95rem] font-semibold text-teal">How urgent is it?</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {URGENCY.map((u) => (
                <label
                  key={u.value}
                  className="flex cursor-pointer gap-3 rounded-[var(--radius-card)] border border-line-cool bg-white p-4 transition-colors hover:border-sage-deep has-[:checked]:border-teal has-[:checked]:bg-sage has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal/30"
                >
                  <input
                    type="radio"
                    id={id(`urgency-${u.value}`)}
                    name="urgency"
                    value={u.value}
                    checked={values.urgency === u.value}
                    onChange={() => {
                      setValues({
                        ...values,
                        urgency: u.value,
                        ...(u.value === "urgent" ? { preferredDate: "", timeWindow: "No preference" } : {}),
                      });
                      setErrors((er) => ({ ...er, urgency: undefined, preferredDate: undefined, timeWindow: undefined }));
                    }}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#164E4A]"
                  />
                  <span>
                    <span className="block font-semibold text-teal">{u.label}</span>
                    <span className="mt-0.5 block text-sm text-muted">{u.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            <ErrorText id={id("urgency-error")} message={errors.urgency} />
            {values.urgency === "urgent" ? (
              <p className="mt-4 flex items-start gap-3 rounded-[var(--radius-card)] bg-teal p-4 text-sm text-sage">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sand" strokeWidth={1.8} aria-hidden="true" />
                <span>
                  If water is escaping, please call{" "}
                  <a href={telHref} className="font-semibold text-white underline underline-offset-2">
                    {business.phone.display}
                  </a>{" "}
                  instead — requests are read during opening hours. Turn off your main shutoff valve if you can do so safely.
                </span>
              </p>
            ) : null}
          </fieldset>

          {isUrgent ? null : (
          <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id("preferredDate")} label="Preferred date" optional error={errors.preferredDate}>
              <input
                id={id("preferredDate")}
                name="preferredDate"
                type="date"
                // Set in the browser: the export is built on a different day than it's viewed.
                ref={(el) => {
                  if (el) el.min = todayIso();
                }}
                value={values.preferredDate}
                onChange={(e) => set("preferredDate", e.target.value)}
                onBlur={() => blur("preferredDate")}
                aria-invalid={inv("preferredDate")}
                aria-describedby={describedBy("preferredDate")}
                className="field"
              />
            </Field>
            <Field id={id("timeWindow")} label="Preferred time" optional error={errors.timeWindow}>
              <select
                id={id("timeWindow")}
                name="timeWindow"
                value={values.timeWindow}
                onChange={(e) => set("timeWindow", e.target.value)}
                aria-invalid={inv("timeWindow")}
                aria-describedby={describedBy("timeWindow")}
                className="field"
              >
                {TIME_WINDOWS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>
          <p className="-mt-2 text-sm text-muted">
            Your preference helps us plan. We will confirm the actual visit time with you.
          </p>
          </>
          )}

          <div>
            <p className="text-[0.95rem] font-semibold text-teal">
              Photos <span className="font-normal text-muted">(optional)</span>
            </p>
            <p id={id("attachments-hint")} className="mt-1 text-sm text-muted">
              Up to {ATTACHMENTS.maxFiles} photos, {ATTACHMENTS.maxBytes / 1024 / 1024} MB each — JPG, PNG, WebP or HEIC.
            </p>
            <label
              htmlFor={id("attachments")}
              className="mt-3 flex min-h-24 cursor-pointer flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-dashed border-sage-deep bg-white px-4 py-6 text-center text-sm text-muted transition-colors hover:border-teal has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-teal/30"
            >
              <ImagePlus className="h-6 w-6 text-clay" strokeWidth={1.5} aria-hidden="true" />
              <span>
                <span className="font-semibold text-teal">Choose photos</span> of the problem
              </span>
              <input
                ref={fileInput}
                id={id("attachments")}
                type="file"
                multiple
                accept={ATTACHMENTS.accept}
                onChange={onFiles}
                disabled={files.length >= ATTACHMENTS.maxFiles}
                aria-describedby={[id("attachments-hint"), errors.attachments ? id("attachments-error") : ""].filter(Boolean).join(" ")}
                className="sr-only"
              />
            </label>
            <ErrorText id={id("attachments-error")} message={errors.attachments} />
            {files.length ? (
              <ul className="mt-3 space-y-2" aria-label="Attached photos">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 rounded-[var(--radius-card)] bg-white px-4 py-2 text-sm">
                    <span className="truncate">
                      {f.name} <span className="text-muted">({(f.size / 1024 / 1024).toFixed(1)} MB)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-[var(--radius-card)] hover:bg-sage"
                    >
                      <X className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                      <span className="sr-only">Remove {f.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </Fieldset>

      {/* Honeypot: invisible to people and assistive technology, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input ref={honeypot} id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem]">
          <input
            type="checkbox"
            id={id("consent")}
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={inv("consent")}
            aria-describedby={describedBy("consent")}
            className="mt-1 h-5 w-5 shrink-0 accent-[#164E4A]"
          />
          <span className="text-muted">
            I agree that {business.name} may use these details to respond to my request, as described in the{" "}
            <Link href="/privacy-policy/" className="font-semibold text-teal underline underline-offset-2">
              privacy policy
            </Link>
            . We don&apos;t add you to marketing lists.
          </span>
        </label>
        <ErrorText id={id("consent-error")} message={errors.consent} />
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={sending} className="btn btn-teal min-w-56 disabled:cursor-wait disabled:opacity-70">
          {sending ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2} aria-hidden="true" />
              Sending…
            </>
          ) : (
            "Send quote request"
          )}
        </button>
        <p className="text-sm text-muted">Sending a request does not book an appointment.</p>
      </div>
      <p className="sr-only" aria-live="polite">
        {sending ? "Sending your request" : ""}
      </p>
    </form>
  );
}

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="mb-10 border-t border-line-cool pt-6">
      <legend className="t-label -ml-px pr-3 text-clay">{legend}</legend>
      <div className="mt-2">{children}</div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  hint,
  optional = false,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-[0.95rem] font-semibold text-teal">
        {label} {optional ? <span className="font-normal text-muted">(optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      <ErrorText id={`${id}-error`} message={error} />
    </div>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      {message}
    </p>
  );
}
