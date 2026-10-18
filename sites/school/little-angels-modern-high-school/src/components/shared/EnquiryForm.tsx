"use client";

import { MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { classOptions } from "@/data/content";
import { admissions, school, whatsappLink } from "@/data/site";

/**
 * The site is static, so there is no server to post to. Instead the form
 * writes the enquiry into a WhatsApp message to the school office: the parent
 * sees exactly what will be sent and presses send themselves. Nothing leaves
 * the browser until they do.
 */
export default function EnquiryForm() {
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (!get("parent") || !get("phone") || !get("child") || !get("grade")) {
      setError("Please fill in your name, phone number, your child's name and the class.");
      return;
    }
    setError("");

    const lines = [
      `Admission enquiry — ${school.name} (${admissions.session})`,
      `Parent: ${get("parent")}`,
      `Phone: ${get("phone")}`,
      `Child: ${get("child")}`,
      `Class sought: ${get("grade")}`,
      get("message") ? `Message: ${get("message")}` : "",
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-surface px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold text-ink">
        Parent&apos;s name
        <input name="parent" autoComplete="name" required className={field} placeholder="Your full name" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Phone number
        <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={field} placeholder="+91" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Child&apos;s name
        <input name="child" required className={field} placeholder="Your child's name" />
      </label>
      <label className="text-sm font-semibold text-ink">
        Class for {admissions.session}
        <select name="grade" required defaultValue="" className={field}>
          <option value="" disabled>
            Choose a class
          </option>
          {classOptions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="text-sm font-semibold text-ink sm:col-span-2">
        Anything you&apos;d like us to know <span className="font-normal text-ink-faint">(optional)</span>
        <textarea name="message" rows={4} className={field} placeholder="Questions about the school, a preferred visit time, support your child may need…" />
      </label>

      {error ? (
        <p role="alert" className="text-sm font-medium text-coral sm:col-span-2">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-[0.95rem] font-semibold text-white transition hover:bg-navy-dark"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Send enquiry on WhatsApp
        </button>
        <p className="text-xs leading-relaxed text-ink-soft">
          Opens WhatsApp with your enquiry filled in, ready to send to the school office.
        </p>
      </div>
    </form>
  );
}
