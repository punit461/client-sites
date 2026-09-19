"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { quickLinks } from "@/data/group";
import { specialties, treatments } from "@/data/care";
import { doctors } from "@/data/doctors";

interface Hit {
  label: string;
  kind: "Specialty" | "Treatment" | "Doctor";
  href: string;
}

/**
 * A real search over the site's own content — specialties, treatments and
 * clinicians. It is not a symptom checker: matching a symptom word to a
 * specialty page is signposting, and the page it lands on says so.
 */
export default function QuickSearch() {
  const [query, setQuery] = useState("");

  const index = useMemo<Hit[]>(
    () => [
      ...specialties.map((s) => ({ label: s.name, kind: "Specialty" as const, href: `/specialties/${s.slug}` })),
      ...treatments.map((t) => ({ label: t.name, kind: "Treatment" as const, href: `/treatments/${t.slug}` })),
      ...doctors.map((d) => ({ label: `${d.name} · ${d.specialtyName}`, kind: "Doctor" as const, href: `/doctors/${d.slug}` })),
    ],
    [],
  );

  const q = query.trim().toLowerCase();
  const hits = q ? index.filter((h) => h.label.toLowerCase().includes(q)).slice(0, 6) : [];

  return (
    <section className="pb-16 pt-10 sm:pb-24">
      <Container>
        <Reveal>
          <div className="rounded-[26px] border border-line bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-9">
            <h2 className="display-md text-center text-ink">What are you looking for?</h2>

            <div className="relative mx-auto mt-6 max-w-2xl">
              <label className="relative block">
                <span className="sr-only">Search treatments, specialties or doctors</span>
                <Search
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint"
                  strokeWidth={1.8}
                  aria-hidden
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search treatments, specialties or doctors"
                  aria-describedby="search-help"
                  className="w-full rounded-full border border-line bg-paper py-4 pl-13 pr-5 text-[0.98rem] text-ink outline-none transition placeholder:text-ink-faint focus:border-forest"
                  style={{ paddingLeft: "3.25rem" }}
                />
              </label>

              {hits.length ? (
                <ul
                  className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-line bg-surface shadow-[var(--shadow-lift)]"
                  role="listbox"
                  aria-label="Search results"
                >
                  {hits.map((hit) => (
                    <li key={hit.href} role="option" aria-selected={false}>
                      <Link
                        href={hit.href}
                        className="flex items-center gap-3 border-b border-line px-5 py-3 text-[0.92rem] text-ink last:border-b-0 hover:bg-mint"
                      >
                        <span className="label flex-none text-ink-faint">{hit.kind}</span>
                        <span className="min-w-0 flex-1 truncate">{hit.label}</span>
                        <ArrowRight className="h-4 w-4 flex-none text-ink-faint" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}

              {q && !hits.length ? (
                <p className="mt-3 text-center text-[0.88rem] text-ink-soft" role="status">
                  Nothing matched &ldquo;{query}&rdquo;. Try a specialty name, or{" "}
                  <Link href="/doctors" className="font-semibold text-forest underline underline-offset-4">
                    browse all doctors
                  </Link>
                  .
                </p>
              ) : null}
            </div>

            <p id="search-help" className="mt-4 text-center text-[0.8rem] text-ink-faint">
              This searches our specialties, treatments and clinicians. It is not a symptom checker
              and does not give medical advice.
            </p>

            <ul className="mt-7 flex flex-wrap justify-center gap-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-full border border-line bg-paper px-4 py-2.5 text-[0.86rem] font-medium text-ink transition hover:border-forest/40 hover:bg-mint"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
