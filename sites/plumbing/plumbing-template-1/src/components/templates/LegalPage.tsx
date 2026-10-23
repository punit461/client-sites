import type { ReactNode } from "react";
import { PageHero } from "./PageHero";
import { business } from "@/config/business";

/** A readable single-column layout for policy text. */
export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero crumbs={[{ name: title, href: path }]} title={title} lead={`Last updated ${updated}.`} />
      <section className="section-y">
        <div className="shell">
          {business.demo ? (
            <p className="mb-10 max-w-3xl rounded-xl border border-copper/50 bg-white p-5 text-sm text-slate">
              Template text: this is a plain-language starting point, not legal advice. Have it reviewed for the
              company&apos;s location and practices before launch.
            </p>
          ) : null}
          <div className="max-w-3xl space-y-5 text-slate [&_h2]:t-h3 [&_h2]:pt-6 [&_h2]:text-navy [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_a]:font-semibold [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-4">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
