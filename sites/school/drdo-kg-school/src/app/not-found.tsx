import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

const helpful = [
  { label: "Admissions", href: "/admissions/" },
  { label: "Classes: Nursery, LKG, UKG", href: "/academics/" },
  { label: "Our campus", href: "/facilities/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact the school", href: "/contact/" },
];

export default function NotFound() {
  return (
    <section className="bg-navy text-white">
      <div className="container-x grid min-h-[80svh] gap-12 pb-20 pt-40 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow text-gold">Error 404</p>
          <h1 className="t-h1 mt-5 text-white">This page has moved, or never existed.</h1>
          <p className="t-lead mt-6 max-w-xl text-white/75">
            The link may be out of date. These are the pages families look for most — or start again from the home page.
          </p>
          <div className="mt-10">
            <ButtonLink href="/" variant="gold">
              Back to the home page
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Popular pages" className="lg:col-span-4 lg:col-start-9">
          <ul className="divide-y divide-white/15 border-y border-white/15">
            {helpful.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex min-h-14 items-center justify-between font-display text-xl transition hover:text-gold">
                  {l.label} <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
