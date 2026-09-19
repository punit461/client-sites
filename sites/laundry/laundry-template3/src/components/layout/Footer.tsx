"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/primitives";
import { brand, contact, footerColumns, serviceAreas, socials } from "@/data/site";

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
  return (
    <footer className="relative border-t border-line bg-deep pt-20 text-mist-soft">
      <Container wide>
        <div className="grid gap-14 pb-14 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <p className="font-display text-[clamp(2.6rem,5vw,4rem)] font-semibold leading-none tracking-tight text-mist">
              {brand.name}
              <span className="text-gold">.</span>
            </p>
            <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed">{brand.description}</p>

            <address className="mt-8 space-y-3 text-[0.88rem] not-italic">
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-mist"
              >
                <Phone className="h-4 w-4 flex-none text-gold" aria-hidden />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition-colors hover:text-mist"
              >
                <Mail className="h-4 w-4 flex-none text-gold" aria-hidden />
                {contact.email}
              </a>
              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold" aria-hidden />
                {contact.address}
              </span>
              <span className="flex items-center gap-3">
                <Clock className="h-4 w-4 flex-none text-gold" aria-hidden />
                {contact.hours}
              </span>
            </address>

            <ul className="mt-8 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 transition hover:border-ice hover:bg-ice hover:text-night"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-[17px] w-[17px]"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d={SOCIAL_PATHS[social.icon]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {footerColumns.map((column) => (
                <nav key={column.heading} aria-label={column.heading}>
                  <h2 className="eyebrow text-mist">{column.heading}</h2>
                  <ul className="mt-4 space-y-2.5 text-[0.88rem]">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a href={link.href} className="transition-colors hover:text-mist">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>

            {/**
             * The coverage list is the whole claim — the page never suggests we
             * collect anywhere that is not named here.
             */}
            <div className="mt-12 rounded-panel border border-line p-6">
              <h2 className="eyebrow text-mist">Where we collect</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {serviceAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.8rem] text-mist-soft"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.8rem] text-mist-faint">
                Just outside one of these? Ask the concierge — we often already pass your street on
                an existing round.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-7 text-[0.8rem] text-mist-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.fullName}. All rights reserved.
          </p>
          <p>{brand.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
