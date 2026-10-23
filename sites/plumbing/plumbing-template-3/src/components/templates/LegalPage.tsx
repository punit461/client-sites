import type { ReactNode } from "react";
import { business } from "@/config/business";
import { PageHero } from "./PageHero";

/** A readable single column for policy text. */
export function LegalPage({ title, path, updated, children }: { title: string; path: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, href: path }]} title={title} lead={`Last updated ${updated}.`} />
      <section className="section-y bg-white">
        <div className="shell">
          {business.demo ? (
            <p className="mb-10 max-w-3xl rounded-[var(--radius-card)] border-l-[3px] border-terracotta bg-sand p-5 text-sm text-stone">
              Template text: a plain-language starting point, not legal advice. Have it reviewed for the company&apos;s location
              and practices before launch.
            </p>
          ) : null}
          <div className="max-w-3xl space-y-5 text-muted [&_a]:font-semibold [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-4 [&_h2]:t-h3 [&_h2]:pt-6 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
