"use client";

import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/primitives";
import { brand, contact, footerLinks, socials } from "@/data/site";

/** Brand marks are not in Lucide v1, so the three we need are drawn here. */
const SOCIAL_PATHS: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.7 6.7 0 0 0 12 5.3Zm0 11a4.3 4.3 0 1 1 4.3-4.3 4.3 4.3 0 0 1-4.3 4.3Zm6.9-11.3a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6Z",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.75-1.6 1.5V12h2.8l-.45 2.9h-2.35v7A10 10 0 0 0 22 12Z",
  linkedin:
    "M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.5h3.4V21H3.5V8.5Zm5.6 0h3.25v1.7h.05a3.56 3.56 0 0 1 3.2-1.76c3.43 0 4.06 2.26 4.06 5.2V21h-3.4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.03 0-2.34 1.58-2.34 3.21V21H9.1V8.5Z",
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  return (
    <footer id="contact" className="border-t border-line bg-ink text-white/70">
      <Container wide>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr] lg:gap-20">
          {/* ------------------------------------------- brand column */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden>
                  <path d="M4 8.5 12 4l8 4.5-8 4.5-8-4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M4 14.5 12 19l8-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-display text-[1.32rem] font-semibold tracking-tight text-white">
                {brand.name}
              </span>
            </div>

            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed">{brand.description}</p>

            <ul className="mt-7 space-y-3 text-[0.88rem]">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.8} aria-hidden />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.8} aria-hidden />
                <a href={`mailto:${contact.email}`} className="hover:text-white">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-accent" strokeWidth={1.8} aria-hidden />
                <span>
                  {contact.address}
                  <span className="mt-0.5 block text-white/45">{contact.hours}</span>
                </span>
              </li>
            </ul>

            <ul className="mt-7 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition hover:border-accent hover:bg-accent hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden>
                      <path d={SOCIAL_PATHS[social.icon]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------------------- link columns */}
          <div>
            <div className="grid gap-10 sm:grid-cols-3">
              {footerLinks.map((column) => (
                <nav key={column.heading} aria-label={column.heading}>
                  <h2 className="font-sans text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white">
                    {column.heading}
                  </h2>
                  <ul className="mt-4 space-y-2.5 text-[0.88rem]">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="transition-colors hover:text-white">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            {/* ------------------------------------------- newsletter */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="font-sans text-[0.95rem] font-bold text-white">
                Laundry tips and the occasional offer
              </h2>
              <p className="mt-1.5 text-[0.85rem]">One email a month. Unsubscribe in a click.</p>

              <form
                className="mt-4 flex flex-col gap-2.5 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (valid) setSent(true);
                }}
              >
                <label className="sr-only" htmlFor="newsletter-email">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSent(false);
                  }}
                  placeholder="you@example.com"
                  className="min-w-0 flex-1 rounded-full border border-white/12 bg-ink px-4 py-3 text-[0.88rem] text-white outline-none transition placeholder:text-white/35 focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={!valid || sent}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-[0.88rem] font-semibold text-white transition hover:bg-accent-dark disabled:opacity-55"
                >
                  {sent ? (
                    <>
                      <Check className="h-4 w-4" /> Subscribed
                    </>
                  ) : (
                    <>
                      Subscribe <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p role="status" className="mt-2 min-h-[1.1rem] text-[0.78rem] text-accent">
                {sent ? "Thanks — check your inbox to confirm." : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Privacy
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
