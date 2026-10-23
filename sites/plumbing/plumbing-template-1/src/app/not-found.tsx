import Link from "next/link";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { business, telHref } from "@/config/business";
import { services } from "@/content/services";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="shell max-w-3xl">
        <p className="t-eyebrow text-copper-ink">404</p>
        <h1 className="t-h1 mt-4 text-navy">We couldn&apos;t find that page.</h1>
        <p className="t-lead mt-5 text-slate">
          The link may be out of date. Try one of these instead, or call us on {business.phone.display}.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href={telHref} variant="outline" icon="phone">
            Call us
          </ButtonLink>
        </div>
        <h2 className="t-h3 mt-14 text-navy">Popular services</h2>
        <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
          {services.slice(0, 6).map((s) => (
            <li key={s.slug} className="border-b border-line">
              <Link href={`/services/${s.slug}/`} className="link-underline inline-flex min-h-12 items-center font-semibold text-navy">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
