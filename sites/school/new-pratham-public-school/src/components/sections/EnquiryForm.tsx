"use client";

import { Mail, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { contact, whatsappLink } from "@/data/school";

const CLASSES = [
  "Nursery", "LKG", "UKG",
  "Class I", "Class II", "Class III", "Class IV", "Class V",
  "Class VI", "Class VII", "Class VIII", "Class IX", "Class X",
];

/**
 * The enquiry form. This is a static site with no server, so submitting opens
 * WhatsApp (which the school already answers) with the message filled in, and
 * offers email as the alternative. Nothing is stored here.
 */
export default function EnquiryForm({ subject = "Admission enquiry" }: { subject?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);

  const body = () =>
    [
      `${subject} from the website`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      grade ? `Class: ${grade}` : "",
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(whatsappLink(body()), "_blank", "noopener");
    setSent("whatsapp");
  };

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body())}`;

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8" aria-labelledby="enquiry-heading">
      <h3 id="enquiry-heading" className="font-display text-[1.4rem] font-semibold text-ink">
        Request a call back
      </h3>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-soft">
        Fill in the form and send it to the school office on WhatsApp — or by email if you prefer. The office
        replies during school hours.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft">Your name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-line bg-cream px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint focus:border-ink/40"
            placeholder="Parent or guardian"
          />
        </label>
        <label className="block">
          <span className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft">Phone</span>
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            inputMode="tel"
            className="mt-1.5 w-full rounded-xl border border-line bg-cream px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint focus:border-ink/40"
            placeholder="So the office can call you back"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft">Class applying for</span>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-line bg-cream px-4 py-3 text-[0.95rem] text-ink focus:border-ink/40"
          >
            <option value="">Not sure yet</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[0.78rem] font-bold uppercase tracking-[0.12em] text-ink-soft">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-1.5 w-full rounded-xl border border-line bg-cream px-4 py-3 text-[0.95rem] text-ink placeholder:text-ink-faint focus:border-ink/40"
            placeholder="Anything the office should know before calling"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-leaf px-6 py-3.5 text-[0.9rem] font-semibold text-white transition hover:bg-leaf-deep"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.9} aria-hidden />
          Send on WhatsApp
        </button>
        <a
          href={mailto}
          onClick={() => setSent("email")}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-[0.9rem] font-semibold text-ink transition hover:border-ink/25 hover:bg-surface-2"
        >
          <Mail className="h-4 w-4" strokeWidth={1.9} aria-hidden />
          Send by email instead
        </a>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[0.78rem] leading-relaxed text-ink-faint" aria-live="polite">
        <Send className="mt-0.5 h-3.5 w-3.5 flex-none" strokeWidth={1.8} aria-hidden />
        {sent === "whatsapp"
          ? "WhatsApp should have opened with your message ready to send. If it did not, use the email option."
          : sent === "email"
            ? "Your email app should have opened with the message ready to send."
            : "Your details go straight to the school and are not stored on this website."}
      </p>
    </form>
  );
}
