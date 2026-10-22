import { LogIn, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Crest from "@/components/ui/Crest";
import SocialIcon from "@/components/ui/SocialIcon";
import { contact, fullAddress, school, socials } from "@/content/school";

const explore = [
  { label: "About Us", href: "/about/" },
  { label: "Classes", href: "/academics/" },
  { label: "Nursery", href: "/academics/nursery/" },
  { label: "LKG", href: "/academics/lkg/" },
  { label: "UKG", href: "/academics/ukg/" },
  { label: "Campus", href: "/facilities/" },
  { label: "Activities", href: "/student-life/" },
  { label: "Gallery", href: "/gallery/" },
];

const policies = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Admissions FAQ", href: "/admissions/#faq" },
  { label: "Contact", href: "/contact/" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-white/70">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-3 text-white">
            <Crest className="h-12 w-12" />
            <span className="leading-none">
              <span className="block font-display text-2xl">{school.shortName}</span>
              <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold">{school.descriptor}</span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-[0.93rem] leading-relaxed">{school.description}</p>
          <p className="mt-4 font-display text-lg italic text-gold">
            {school.motto} <span className="text-sm not-italic text-white/50">— the school&apos;s motto</span>
          </p>
          <p className="mt-2 text-[0.93rem] text-white/50" lang="kn">
            {school.nameKannada}
          </p>
          {socials.length ? (
            <ul className="mt-7 flex gap-2" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 text-white/80 transition hover:border-gold hover:text-gold"
                  >
                    <SocialIcon name={s.icon} />
                    <span className="sr-only">
                      {school.shortName} on {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="eyebrow text-gold">Explore</h2>
          <ul className="mt-6 space-y-2.5 text-[0.93rem]">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-gold">Admissions</h2>
          <ul className="mt-6 space-y-3 text-[0.93rem]">
            <li>
              <a href={contact.phoneHref} className="inline-flex items-center gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 text-gold" aria-hidden />
                {contact.phone}
              </a>
            </li>
            {contact.email ? (
              <li>
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 break-all transition hover:text-white">
                  <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                  {contact.email}
                </a>
              </li>
            ) : null}
            {contact.parentPortal ? (
              <li>
                <a href={contact.parentPortal} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 transition hover:text-white">
                  <LogIn className="h-4 w-4 text-gold" aria-hidden />
                  Parent portal
                </a>
              </li>
            ) : null}
          </ul>
          <p className="mt-4 max-w-xs text-[0.88rem]">{school.classes}. Children of DRDO employees are given priority.</p>
          <Link
            href="/admissions/#enquire"
            className="mt-7 inline-flex min-h-11 items-center rounded-sm bg-gold px-5 text-sm font-semibold text-navy-deep transition hover:bg-gold-hover"
          >
            Admission Enquiry
          </Link>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-gold">Visit</h2>
          <address className="mt-6 flex gap-3 text-[0.93rem] not-italic leading-relaxed">
            <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              {fullAddress}
            </a>
          </address>
          <dl className="mt-6 space-y-2 text-[0.88rem]">
            {contact.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-2">
                <dt>{h.days}</dt>
                <dd className="text-right text-white">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-7 text-[0.8rem] lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {school.name}. {school.affiliation}.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {policies.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
