import Link from "next/link";
import type { ReactNode } from "react";
import { business, hoursLine, mailHref, telHref } from "@/config/business";
import { companyNav, legalNav, serviceNav } from "@/config/navigation";
import { areas } from "@/content/areas";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="dark bg-charcoal text-gray">
      <div className="shell border-b border-rule-dark py-14 lg:py-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-md">
            <Logo />
            <p className="mt-5">{business.description}</p>
          </div>
          <div className="flex flex-col gap-1 font-display sm:flex-row sm:gap-10">
            <a href={telHref} className="nav-line self-start text-2xl font-bold text-white sm:text-3xl">
              {business.phone.display}
            </a>
            {mailHref ? (
              <a href={mailHref} className="nav-line self-start break-all text-lg font-semibold text-white sm:text-xl">
                {business.email}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <Col title="Services">
          {serviceNav.map((l) => (
            <FLink key={l.href} href={l.href}>
              {l.label}
            </FLink>
          ))}
        </Col>
        <Col title="Company">
          {companyNav.map((l) => (
            <FLink key={l.href} href={l.href}>
              {l.label}
            </FLink>
          ))}
        </Col>
        <Col title="Service areas">
          {areas.map((a) => (
            <FLink key={a.slug} href={`/service-areas/${a.slug}/`}>
              {a.name}
              {a.coverage === "confirm" ? <span className="text-gray"> (by arrangement)</span> : null}
            </FLink>
          ))}
        </Col>
        <div>
          <h2 className="t-label text-white">Hours</h2>
          <ul className="mt-4 space-y-2">
            {business.hours.map((h) => (
              <li key={h.label} className="flex flex-wrap justify-between gap-x-4 border-b border-rule-dark pb-2">
                <span>{h.label}</span>
                <span className="whitespace-nowrap font-display font-semibold text-white">{hoursLine(h)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm">{business.hoursNote}</p>
          {business.socials.length ? (
            <>
              <h2 className="t-label mt-8 text-white">Follow</h2>
              <ul className="mt-3 flex flex-wrap gap-4">
                {business.socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} rel="me noopener" target="_blank" className="nav-line text-white">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>

      <div className="border-t border-rule-dark">
        <div className="shell flex flex-col gap-3 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
          <ul className="flex gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-line hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {business.demo ? (
          <p className="shell pb-6 text-xs">
            Template preview: business name, phone, email, hours and service areas are placeholders. Photographs are
            licensed stock images showing representative work.
          </p>
        ) : null}
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="t-label text-white">{title}</h2>
      <ul className="mt-4 space-y-0.5">{children}</ul>
    </div>
  );
}

function FLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-9 items-center transition-colors hover:text-white">
        <span className="nav-line">{children}</span>
      </Link>
    </li>
  );
}
