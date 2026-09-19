import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container, Icon } from "@/components/ui";
import { contact, fromRate, nav, property } from "@/data/stay";
import { rupees } from "@/lib/format";

/**
 * A server component — nothing here needs the browser. Inline SVG paths rather
 * than an icon package for the social marks, so no third party decides what
 * the Instagram glyph looks like on a client's site.
 */
const SOCIAL: Record<string, string> = {
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 3.1A6.7 6.7 0 1 0 18.7 12 6.7 6.7 0 0 0 12 5.3Zm0 11a4.3 4.3 0 1 1 4.3-4.3 4.3 4.3 0 0 1-4.3 4.3Zm6.9-11.3a1.6 1.6 0 1 1-1.6-1.6 1.6 1.6 0 0 1 1.6 1.6Z",
  whatsapp:
    "M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.38a9.87 9.87 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.05c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-2-1.23a7.4 7.4 0 0 1-1.37-1.71c-.15-.25-.02-.38.1-.51.12-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.05-.31-.01-.43-.07-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42l-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.16 1.77 2.71 4.3 3.8.6.26 1.07.41 1.44.53.6.2 1.16.17 1.6.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z",
};

export default function Footer() {
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

  return (
    <footer className="border-t border-line bg-ink-2 pt-20">
      <Container wide>
        <div className="grid gap-14 pb-16 lg:grid-cols-[1.25fr_2fr] lg:gap-24">
          <div>
            <p className="font-display text-[2.6rem] leading-none text-bone">
              {property.name} <span className="text-brass">{property.suffix}</span>
            </p>
            <p className="mt-6 max-w-sm text-[0.96rem] leading-relaxed text-bone-soft">{property.intro}</p>
            <p className="mono mt-6 text-[0.78rem] text-bone-faint">
              From {rupees(fromRate)} a night · all meals included
            </p>

            <ul className="mt-8 flex gap-2.5">
              {(["instagram", "whatsapp"] as const).map((key) => (
                <li key={key}>
                  <a
                    href={key === "whatsapp" ? `https://wa.me/${contact.whatsapp}` : "#"}
                    aria-label={key[0].toUpperCase() + key.slice(1)}
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-line text-bone-soft transition-colors hover:border-brass hover:text-brass"
                  >
                    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden>
                      <path d={SOCIAL[key]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Pages">
              <h2 className="label text-brass">The house</h2>
              <ul className="mt-6 space-y-3 text-[0.9rem] text-bone-soft">
                {nav.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition-colors hover:text-bone">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/booking" className="transition-colors hover:text-bone">
                    Check dates
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className="label text-brass">Find us</h2>
              <address className="mt-6 space-y-2.5 text-[0.9rem] not-italic text-bone-soft">
                {contact.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  href={directions}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 pt-2 text-brass transition-colors hover:text-bone"
                >
                  Open in Maps
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </address>
            </div>

            <div>
              <h2 className="label text-brass">Talk to us</h2>
              <ul className="mt-6 space-y-3 text-[0.9rem] text-bone-soft">
                <li>
                  <a href={`tel:${contact.phoneDial}`} className="inline-flex items-center gap-2 transition-colors hover:text-bone">
                    <Icon name="phone" className="h-4 w-4 text-bone-faint" />
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 break-all transition-colors hover:text-bone">
                    <Icon name="mail" className="h-4 w-4 flex-none text-bone-faint" />
                    {contact.email}
                  </a>
                </li>
                <li className="pt-1 text-[0.84rem] text-bone-faint">{contact.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The extra bottom padding clears the sticky phone-only reserve bar. */}
        <div className="flex flex-col gap-3 border-t border-line pb-24 pt-7 text-[0.8rem] text-bone-faint sm:flex-row sm:items-center sm:justify-between sm:pb-7">
          <p>
            © {new Date().getFullYear()} {property.fullName}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/contact" className="transition-colors hover:text-bone">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-bone">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
