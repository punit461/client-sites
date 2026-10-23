import Link from "next/link";
import type { ReactNode } from "react";
import { business, hoursLine, mailHref, telHref } from "@/config/business";
import { companyNav, legalNav, serviceNav } from "@/config/navigation";
import { areas } from "@/content/areas";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-navy text-ivory/75">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo dark />
          <p className="mt-6 max-w-sm text-[0.95rem]">{business.description}</p>
          <dl className="mt-8 space-y-4 text-[0.95rem]">
            <div>
              <dt className="t-eyebrow text-ivory/50">Phone</dt>
              <dd className="mt-1">
                <a href={telHref} className="link-underline font-semibold text-ivory">
                  {business.phone.display}
                </a>
              </dd>
            </div>
            {mailHref ? (
              <div>
                <dt className="t-eyebrow text-ivory/50">Email</dt>
                <dd className="mt-1">
                  <a href={mailHref} className="link-underline break-all text-ivory">
                    {business.email}
                  </a>
                </dd>
              </div>
            ) : null}
            {business.address ? (
              <div>
                <dt className="t-eyebrow text-ivory/50">Address</dt>
                <dd className="mt-1">
                  {business.address.street}, {business.address.locality}, {business.address.region}{" "}
                  {business.address.postalCode}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <FooterColumn title="Services" className="lg:col-span-3">
          {serviceNav.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Company" className="lg:col-span-2">
          {companyNav.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <div className="lg:col-span-3">
          <FooterColumn title="Service areas">
            {areas.map((a) => (
              <FooterLink key={a.slug} href={`/service-areas/${a.slug}/`}>
                {a.name}
              </FooterLink>
            ))}
          </FooterColumn>
          <h2 className="t-eyebrow mt-10 text-ivory/50">Opening hours</h2>
          <ul className="mt-4 space-y-1.5 text-[0.95rem]">
            {business.hours.map((h) => (
              <li key={h.label} className="flex flex-wrap justify-between gap-x-4">
                <span>{h.label}</span>
                <span className="whitespace-nowrap text-ivory">{hoursLine(h)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-ivory/60">{business.hoursNote}</p>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="shell flex flex-col gap-4 py-6 text-sm text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {business.name.replace(/\.$/, "")}. All rights reserved.
          </p>
          {business.socials.length ? (
            <ul className="flex flex-wrap gap-5">
              {business.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="link-underline" rel="me noopener" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <ul className="flex gap-5">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {business.demo ? (
          <p className="shell pb-6 text-xs text-ivory/55">
            Template preview: the business details on this site are placeholders. Photographs not taken by the company
            are licensed stock images, not its own projects.
          </p>
        ) : null}
      </div>
    </footer>
  );
}

function FooterColumn({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="t-eyebrow text-ivory/50">{title}</h2>
      <ul className="mt-4 space-y-1">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-underline inline-flex min-h-9 items-center text-[0.95rem] text-ivory/80 hover:text-ivory">
        {children}
      </Link>
    </li>
  );
}
