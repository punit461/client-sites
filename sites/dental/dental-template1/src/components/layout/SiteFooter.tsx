import { Mail, MapPin, Phone, Siren } from "lucide-react";
import Link from "next/link";
import { clinic, contact, hours, socials } from "@/data/clinic";
import { team } from "@/data/team";
import { treatments } from "@/data/treatments";
import { Container } from "@/components/ui/primitives";

/** Brand marks are not in Lucide v1, so the three we need are drawn here. */
const SOCIAL_PATHS: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.7 6.7 0 0 0 12 5.3Zm0 11a4.3 4.3 0 1 1 4.3-4.3 4.3 4.3 0 0 1-4.3 4.3Zm6.9-11.3a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6Z",
  facebook:
    "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.75-1.6 1.5V12h2.8l-.45 2.9h-2.35v7A10 10 0 0 0 22 12Z",
  linkedin:
    "M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.5 8.5h3.4V21H3.5V8.5Zm5.6 0h3.25v1.7h.05a3.56 3.56 0 0 1 3.2-1.76c3.43 0 4.06 2.26 4.06 5.2V21h-3.4v-6.1c0-1.45-.03-3.32-2.02-3.32-2.03 0-2.34 1.58-2.34 3.21V21H9.1V8.5Z",
};

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-ivory/70">
      <Container wide>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.1fr_2fr] lg:gap-20">
          {/* ------------------------------------------- brand column */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-[1.7rem] leading-none tracking-[0.08em] text-ivory">
                {clinic.name}
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ivory/50">
                {clinic.suffix}
              </span>
            </div>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed">{clinic.tagline}</p>

            <address className="mt-7 space-y-3 text-[0.88rem] not-italic">
              <span className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-sage" strokeWidth={1.8} aria-hidden />
                <span>
                  {contact.address.line1}, {contact.address.line2}
                  <span className="block">
                    {contact.address.city} {contact.address.postcode}
                  </span>
                </span>
              </span>
              <a href={`tel:${contact.phoneDial}`} className="flex items-start gap-3 hover:text-ivory">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-sage" strokeWidth={1.8} aria-hidden />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-start gap-3 hover:text-ivory">
                <Mail className="mt-0.5 h-4 w-4 flex-none text-sage" strokeWidth={1.8} aria-hidden />
                {contact.email}
              </a>
            </address>

            <ul className="mt-7 flex gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/15 transition hover:border-sage hover:bg-sage hover:text-ink"
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
            <nav aria-label="Treatments">
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ivory">
                Treatments
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.88rem]">
                {treatments.slice(0, 6).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/treatments/${t.slug}`} className="transition-colors hover:text-ivory">
                      {t.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/treatments" className="font-semibold text-sage hover:text-ivory">
                    All treatments
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Practice">
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ivory">
                Practice
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.88rem]">
                {team.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/team/${c.slug}`} className="transition-colors hover:text-ivory">
                      {c.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="transition-colors hover:text-ivory">
                    Contact &amp; location
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="transition-colors hover:text-ivory">
                    FAQ
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ivory">
                Opening hours
              </h2>
              <dl className="mt-4 space-y-2 text-[0.88rem]">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-3">
                    <dt>{h.days}</dt>
                    <dd className="whitespace-nowrap text-ivory/50">{h.time}</dd>
                  </div>
                ))}
              </dl>

              {/* ------------------------------------- urgent contact */}
              <div className="mt-7 rounded-2xl border border-terracotta/35 bg-terracotta/10 p-4">
                <h3 className="flex items-center gap-2 text-[0.82rem] font-bold text-ivory">
                  <Siren className="h-4 w-4 text-terracotta" strokeWidth={1.9} aria-hidden />
                  Urgent dental concern
                </h3>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed">
                  Call the practice to discuss the next step. For swelling affecting breathing,
                  swallowing or vision, use your local emergency service.
                </p>
                <a
                  href={`tel:${contact.phoneDial}`}
                  className="mt-3 inline-block text-[0.82rem] font-semibold text-terracotta hover:text-ivory"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-ivory/10 py-6 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.fullName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link href="/#" className="transition-colors hover:text-ivory">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/#" className="transition-colors hover:text-ivory">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/#" className="transition-colors hover:text-ivory">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
