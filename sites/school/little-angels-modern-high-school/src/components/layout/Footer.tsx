import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Container, Crest } from "@/components/ui/primitives";
import { contact, hours, nav, school, socials } from "@/data/site";

export default function Footer() {
  return (
    <footer className="feather-bg pb-24 text-white md:pb-0">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Crest className="h-14 w-14" />
            <div className="leading-tight">
              <p className="font-display text-xl font-semibold">Little Angels</p>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold-bright">Modern High School</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">{school.description}</p>
          <p className="mt-3 text-sm text-white/55">{school.kannadaName}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[{ label: "Home", href: "/" }, ...nav, { label: "Admissions", href: "/admissions/" }].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-white/75 transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">School hours</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {hours.map((h) => (
              <li key={h.days} className="flex gap-2.5 text-white/75">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden />
                <span>
                  <span className="block text-white">{h.days}</span>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-bright">Visit us</h2>
          <address className="mt-4 flex gap-2.5 text-sm not-italic leading-relaxed text-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden />
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              {contact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </a>
          </address>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-2.5 text-white/75 transition hover:text-white">
                <Phone className="h-4 w-4 text-white/40" aria-hidden />
                {contact.phone} <span className="text-white/45">(office)</span>
              </a>
            </li>
            <li>
              <a href={contact.admissionsPhoneHref} className="flex items-center gap-2.5 text-white/75 transition hover:text-white">
                <Phone className="h-4 w-4 text-white/40" aria-hidden />
                {contact.admissionsPhone} <span className="text-white/45">(admissions)</span>
              </a>
            </li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white/80 transition hover:border-white/50 hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {school.name}. All rights reserved.
          </p>
          <p>{school.recognition}</p>
        </Container>
      </div>
    </footer>
  );
}
