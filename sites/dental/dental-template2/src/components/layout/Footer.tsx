import { Mail, Phone, Siren } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { contact, footerColumns, group } from "@/data/group";
import { locations } from "@/data/locations";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-forest text-paper/70">
      <Container wide>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[1.5rem] font-bold tracking-tight text-paper">
                {group.name}
              </span>
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-paper/50">
                {group.suffix}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[0.92rem] leading-relaxed">{group.tagline}</p>

            <div className="mt-7 space-y-2.5 text-[0.88rem]">
              <a href={`tel:${contact.phoneDial}`} className="flex items-center gap-3 hover:text-paper">
                <Phone className="h-4 w-4 flex-none text-mint" strokeWidth={1.8} aria-hidden />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-paper">
                <Mail className="h-4 w-4 flex-none text-mint" strokeWidth={1.8} aria-hidden />
                {contact.email}
              </a>
            </div>

            {/* ---------------------------------------- urgent contact */}
            <div className="mt-7 rounded-2xl border border-coral/35 bg-coral/10 p-4">
              <h2 className="flex items-center gap-2 text-[0.82rem] font-bold text-paper">
                <Siren className="h-4 w-4 text-coral" strokeWidth={1.9} aria-hidden />
                Urgent or emergency
              </h2>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed">
                For urgent concerns, call the clinic. For an emergency, use your local emergency
                service rather than this website.
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-4">
            {footerColumns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-paper">
                  {column.heading}
                </h2>
                <ul className="mt-4 space-y-2.5 text-[0.88rem]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-colors hover:text-paper">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="Clinics">
              <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-paper">
                Clinics
              </h2>
              <ul className="mt-4 space-y-3 text-[0.88rem]">
                {locations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="transition-colors hover:text-paper"
                    >
                      {location.name}
                      <span className="block text-[0.78rem] text-paper/45">{location.area}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-paper/12 py-6 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {group.fullName}. All rights reserved.
          </p>
          <p className="text-paper/40">
            Clinical content requires professional review before publication.
          </p>
        </div>
      </Container>
    </footer>
  );
}
