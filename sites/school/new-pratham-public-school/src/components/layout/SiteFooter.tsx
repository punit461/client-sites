import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Wordmark from "@/components/layout/Wordmark";
import { Container } from "@/components/ui/primitives";
import { contact, footerLinks, hours, nav, school, socials } from "@/data/school";

/** Brand marks are not in Lucide, so the three we need are drawn here. */
const SOCIAL_PATHS: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.7 6.7 0 0 0 12 5.3Zm0 11a4.3 4.3 0 1 1 4.3-4.3 4.3 4.3 0 0 1-4.3 4.3Zm6.9-11.3a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6Z",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.75-1.6 1.5V12h2.8l-.45 2.9h-2.35v7A10 10 0 0 0 22 12Z",
  whatsapp:
    "M17.5 14.4c-.3-.15-1.8-.9-2-1-.3-.1-.5-.15-.7.15-.2.3-.8 1-.95 1.2-.2.2-.35.2-.65.1-.3-.15-1.25-.45-2.4-1.5-.9-.8-1.5-1.75-1.65-2.05-.2-.3 0-.45.1-.6.15-.15.3-.35.45-.5.15-.2.2-.3.3-.5.1-.2.05-.4 0-.55-.1-.15-.7-1.65-.95-2.25-.25-.6-.5-.5-.7-.5h-.6c-.2 0-.55.1-.8.4-.3.3-1.05 1-1.05 2.5s1.1 2.9 1.25 3.1c.15.2 2.1 3.2 5.1 4.5.7.3 1.25.5 1.7.65.7.2 1.35.2 1.85.1.55-.1 1.75-.7 2-1.4.25-.7.25-1.3.15-1.4-.05-.1-.25-.2-.55-.35ZM12.05 21.8a9.9 9.9 0 0 1-5-1.4l-.35-.2-3.7 1 1-3.6-.25-.35a9.85 9.85 0 1 1 8.3 4.55ZM12.05 2A10 10 0 0 0 3.5 17.15L2 22l5-1.3A10 10 0 1 0 12.05 2Z",
};

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-cream/70">
      <Container wide>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.15fr_2fr] lg:gap-20">
          {/* ------------------------------------------- brand column */}
          <div>
            <Wordmark light />
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed">
              {school.tagline}. {school.classes}, managed by the {school.trust}, {school.city}.
            </p>

            <address className="mt-7 space-y-3 text-[0.88rem] not-italic">
              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-saffron" strokeWidth={1.8} aria-hidden />
                <span>
                  {contact.address.line1}, {contact.address.line2}
                  <span className="block">
                    {contact.address.city}, {contact.address.state} {contact.address.postcode}
                  </span>
                </span>
              </span>
              <a href={`tel:${contact.phoneDial}`} className="flex items-start gap-3 hover:text-cream">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-saffron" strokeWidth={1.8} aria-hidden />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-start gap-3 hover:text-cream">
                <Mail className="mt-0.5 h-4 w-4 flex-none text-saffron" strokeWidth={1.8} aria-hidden />
                {contact.email}
              </a>
            </address>

            <ul className="mt-7 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 transition hover:border-saffron hover:bg-saffron hover:text-ink"
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
          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Pages">
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream">Explore</h2>
              <ul className="mt-4 space-y-2.5 text-[0.88rem]">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-cream">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Resources">
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream">Resources</h2>
              <ul className="mt-4 space-y-2.5 text-[0.88rem]">
                {footerLinks.map((item) =>
                  item.href.startsWith("http") ? (
                    <li key={item.href}>
                      <a href={item.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-cream">
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.href}>
                      <Link href={item.href} className="transition-colors hover:text-cream">
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
                <li>
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-cream"
                  >
                    Find us on Google Maps
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream">School hours</h2>
              <dl className="mt-4 space-y-2 text-[0.88rem]">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-3">
                    <dt className="inline-flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-saffron" strokeWidth={1.9} aria-hidden />
                      {h.days}
                    </dt>
                    <dd className="whitespace-nowrap text-cream/50">{h.time}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 rounded-2xl border border-saffron/30 bg-saffron/10 p-4">
                <h3 className="text-[0.82rem] font-bold text-cream">{school.affiliation}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed">
                  Affiliation No. {school.affiliationNumber}. Nursery to Class X, established {school.established}.
                </p>
                <Link
                  href="/mandatory-disclosure"
                  className="mt-3 inline-block text-[0.82rem] font-semibold text-saffron hover:text-cream"
                >
                  Mandatory public disclosure
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/10 py-6 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
          <p className="text-cream/50">{school.nameKannada}</p>
        </div>
      </Container>
    </footer>
  );
}
