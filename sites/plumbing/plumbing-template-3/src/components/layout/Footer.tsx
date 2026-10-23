import Link from "next/link";
import type { ReactNode } from "react";
import { business, hoursLine, mailHref, telHref } from "@/config/business";
import { companyNav, legalNav, serviceNav } from "@/config/navigation";
import { areas } from "@/content/areas";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-charcoal text-sage">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-5 max-w-sm text-[0.95rem]">{business.description}</p>
          <ul className="mt-8 space-y-3">
            <li>
              <a href={telHref} className="underline-draw font-display text-xl font-bold text-white">
                {business.phone.display}
              </a>
            </li>
            <li>
              <a href={mailHref} className="underline-draw break-all text-white">
                {business.email}
              </a>
            </li>
            {business.address ? (
              <li>
                {business.address.street}, {business.address.locality}, {business.address.region} {business.address.postalCode}
              </li>
            ) : null}
          </ul>
        </div>
        <Col title="Services" className="lg:col-span-3">
          {serviceNav.map((l) => (
            <FLink key={l.href} href={l.href}>
              {l.label}
            </FLink>
          ))}
        </Col>
        <Col title="Company" className="lg:col-span-2">
          {companyNav.map((l) => (
            <FLink key={l.href} href={l.href}>
              {l.label}
            </FLink>
          ))}
        </Col>
        <div className="lg:col-span-3">
          <Col title="Service areas">
            {areas.map((a) => (
              <FLink key={a.slug} href={`/service-areas/${a.slug}/`}>
                {a.name}
                {a.coverage === "confirm" ? " (by arrangement)" : ""}
              </FLink>
            ))}
          </Col>
          <h2 className="t-label mt-10 text-white">Opening hours</h2>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            {business.hours.map((h) => (
              <li key={h.label} className="flex flex-wrap justify-between gap-x-4">
                <span>{h.label}</span>
                <span className="whitespace-nowrap text-white">{hoursLine(h)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm">{business.hoursNote}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          {business.socials.length ? (
            <ul className="flex flex-wrap gap-5">
              {business.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="me noopener" target="_blank" className="underline-draw text-white">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <ul className="flex flex-wrap gap-5">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-draw hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {business.demo ? (
          <p className="shell pb-6 text-xs">
            Template preview: the business name, phone, email, hours and service areas are placeholders. Photographs are
            licensed stock images showing representative work.
          </p>
        ) : null}
      </div>
    </footer>
  );
}

function Col({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="t-label text-white">{title}</h2>
      <ul className="mt-4 space-y-0.5">{children}</ul>
    </div>
  );
}

function FLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-9 items-center text-[0.95rem] transition-colors hover:text-white">
        <span className="underline-draw">{children}</span>
      </Link>
    </li>
  );
}
