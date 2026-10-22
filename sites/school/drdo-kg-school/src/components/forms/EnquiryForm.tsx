"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { z } from "zod";
import { buttonStyles } from "@/components/ui/Button";
import { gradeOptions } from "@/content/admissions";
import { contact, school } from "@/content/school";

/**
 * Admission and general enquiries. The site is a static export, so it posts
 * JSON to whatever form backend NEXT_PUBLIC_ENQUIRY_ENDPOINT names (see the
 * README) and shows success only when that service answers 2xx. With no
 * endpoint configured it says so plainly and offers phone (and email, when the
 * school has an address) instead.
 *
 * Only what the office needs to reply is collected: no dates of birth, no
 * addresses, no documents.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT || "";
const ACCESS_KEY = process.env.NEXT_PUBLIC_ENQUIRY_ACCESS_KEY || "";
/** Bots fill a form in milliseconds; people take longer than this. */
const MIN_FILL_MS = 3000;

const base = {
  parentName: z.string().trim().min(2, "Please enter your name.").max(80, "Please keep your name under 80 characters."),
  email: z.email("Please enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a phone number we can call, e.g. +91 98765 43210."),
  consent: z.boolean().refine((v) => v, "Please agree so we can contact you about your enquiry."),
  website: z.string().max(0).optional(), // honeypot
};

const admissionSchema = z.object({
  ...base,
  grade: z.enum(gradeOptions, { error: "Please choose the class you are applying for." }),
  message: z.string().trim().max(1000, "Please keep your message under 1,000 characters.").optional(),
});

const generalSchema = z.object({
  ...base,
  grade: z.string().optional(),
  message: z.string().trim().min(10, "Please tell us a little about your question.").max(1000, "Please keep your message under 1,000 characters."),
});

type Values = z.infer<typeof generalSchema>;
type Status = "idle" | "sending" | "sent" | "error" | "offline";

export default function EnquiryForm({ kind = "admission" }: { kind?: "admission" | "general" }) {
  const schema = kind === "admission" ? admissionSchema : generalSchema;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema as unknown as typeof generalSchema),
    defaultValues: { parentName: "", email: "", phone: "", grade: "", message: "", consent: false, website: "" },
  });
  const [status, setStatus] = useState<Status>("idle");
  const [problem, setProblem] = useState("");
  const startedAt = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);

  // Timed from when the form appears, not first focus: autofill-then-send is a real person too.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const show = (s: Status, msg = "") => {
    setStatus(s);
    setProblem(msg);
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  async function onSubmit(values: Values) {
    if (values.website) return show("error", "Your enquiry could not be sent.");
    if (!startedAt.current || Date.now() - startedAt.current < MIN_FILL_MS)
      return show("error", "That was quick! Please check your details and press send again.");
    if (!ENDPOINT) return show("offline");

    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}),
          subject: `${kind === "admission" ? "Admission" : "General"} enquiry — ${school.name}`,
          type: kind,
          name: values.parentName,
          email: values.email,
          phone: values.phone,
          grade: values.grade || undefined,
          message: values.message || undefined,
          academicYear: kind === "admission" ? school.academicYear : undefined,
          page: window.location.pathname,
        }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`The enquiry service answered ${res.status}.`);
      reset();
      startedAt.current = Date.now();
      show("sent");
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      show("error", aborted ? "The connection timed out." : "We could not reach the enquiry service.");
    } finally {
      clearTimeout(timeout);
    }
  }

  if (status === "sent")
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-sm border border-success/30 bg-white p-8 outline-none">
        <CheckCircle2 className="h-9 w-9 text-success" aria-hidden />
        <h3 className="t-h3 mt-5">Thank you — your enquiry has been received.</h3>
        <p className="mt-3">
          The school office will get back to you. If your question is urgent, please call{" "}
          <a className="font-semibold text-navy underline underline-offset-4" href={contact.phoneHref}>
            {contact.phone}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className={`${buttonStyles.base} ${buttonStyles.outline} mt-7`}>
          Send another enquiry
        </button>
      </div>
    );

  const mailto = () => {
    const v = getValues();
    const to = contact.email;
    if (!to) return null;
    const body = [
      `Name: ${v.parentName}`,
      `Phone: ${v.phone}`,
      `Email: ${v.email}`,
      v.grade ? `Class: ${v.grade} (${school.academicYear})` : "",
      v.message ? `\n${v.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${to}?subject=${encodeURIComponent(`${kind === "admission" ? "Admission" : "General"} enquiry`)}&body=${encodeURIComponent(body)}`;
  };

  const mailtoHref = status === "offline" ? mailto() : null;
  const sending = status === "sending";

  return (
    <form onSubmit={(e) => handleSubmit(onSubmit)(e)} noValidate className="relative grid gap-5 sm:grid-cols-2" aria-busy={sending}>
      <Field label="Your name" error={errors.parentName} id="parentName">
        <input id="parentName" autoComplete="name" {...register("parentName")} {...aria("parentName", errors.parentName)} className={inputCls} />
      </Field>
      <Field label="Phone" error={errors.phone} id="phone">
        <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" {...register("phone")} {...aria("phone", errors.phone)} className={inputCls} />
      </Field>
      <Field label="Email" error={errors.email} id="email" className={kind === "admission" ? "" : "sm:col-span-2"}>
        <input id="email" type="email" autoComplete="email" {...register("email")} {...aria("email", errors.email)} className={inputCls} />
      </Field>
      {kind === "admission" ? (
        <Field label={`Class for ${school.academicYear}`} error={errors.grade} id="grade">
          <select id="grade" {...register("grade")} {...aria("grade", errors.grade)} className={inputCls}>
            <option value="">Choose a class</option>
            {gradeOptions.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </Field>
      ) : null}
      <Field
        label={kind === "admission" ? "Anything you would like us to know" : "Your message"}
        optional={kind === "admission"}
        error={errors.message}
        id="message"
        className="sm:col-span-2"
      >
        <textarea id="message" rows={4} {...register("message")} {...aria("message", errors.message)} className={`${inputCls} resize-y`} />
      </Field>

      {/* Honeypot: hidden from people and assistive technology, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.9rem] leading-relaxed">
          <input
            type="checkbox"
            {...register("consent")}
            {...aria("consent", errors.consent)}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-navy"
          />
          <span>
            I agree to {school.shortName} contacting me about this enquiry. We use these details only to reply — see our{" "}
            <Link href="/privacy-policy/" className="font-semibold text-navy underline underline-offset-4">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent ? <ErrorText id="consent-error">{errors.consent.message}</ErrorText> : null}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none sm:col-span-2 empty:hidden">
        {status === "error" ? (
          <div role="alert" className="flex gap-3 rounded-sm border border-danger/30 bg-white p-5 text-[0.92rem]">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden />
            <div>
              <p className="font-semibold text-ink">Your enquiry has not been sent. {problem}</p>
              <p className="mt-1">
                Please try again in a moment, or contact us directly on{" "}
                <a className="font-semibold text-navy underline underline-offset-4" href={contact.phoneHref}>
                  {contact.phone}
                </a>
                .
              </p>
            </div>
          </div>
        ) : null}
        {status === "offline" ? (
          <div role="alert" className="rounded-sm border border-gold/60 bg-gold-soft p-5 text-[0.92rem] text-ink">
            <p className="font-semibold">Online enquiries are not connected yet, so nothing has been sent.</p>
            <p className="mt-1 text-slate">
              {mailtoHref ? "You can send the same details by email in one click, or call the office." : "Please call the school office, open Monday to Friday, 8 am to 3 pm."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {mailtoHref ? (
                <a href={mailtoHref} className={`${buttonStyles.base} ${buttonStyles.primary}`}>
                  <Mail className="h-4 w-4" aria-hidden /> Email this enquiry
                </a>
              ) : null}
              <a href={contact.phoneHref} className={`${buttonStyles.base} ${buttonStyles.outline}`}>
                <Phone className="h-4 w-4" aria-hidden /> {contact.phone}
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <div className="sm:col-span-2">
        <button type="submit" disabled={sending} className={`${buttonStyles.base} ${buttonStyles.primary} w-full sm:w-auto`}>
          {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
          {sending ? "Sending…" : kind === "admission" ? "Send admission enquiry" : "Send message"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "mt-2 block min-h-12 w-full rounded-sm border border-line bg-white px-4 py-3 text-[0.97rem] text-ink transition placeholder:text-slate/60 hover:border-navy/40 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15 aria-[invalid=true]:border-danger";

function aria(id: string, error?: FieldError) {
  return { "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-error` : undefined } as const;
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[0.84rem] font-medium text-danger">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {children}
    </p>
  );
}

function Field({
  label,
  id,
  error,
  optional,
  className = "",
  children,
}: {
  label: string;
  id: string;
  error?: FieldError;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[0.86rem] font-semibold text-ink">
        {label} {optional ? <span className="font-normal text-slate">(optional)</span> : <span className="sr-only">(required)</span>}
      </label>
      {children}
      {error?.message ? <ErrorText id={`${id}-error`}>{error.message}</ErrorText> : null}
    </div>
  );
}
