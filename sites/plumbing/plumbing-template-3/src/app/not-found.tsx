import Link from "next/link";
import { Button } from "@/components/ui/Buttons";
import { business, telHref } from "@/config/business";
import { services } from "@/content/services";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="section-y bg-sand">
      <div className="shell max-w-3xl">
        <p className="t-label text-clay">404</p>
        <h1 className="t-h1 mt-4">This page seems to have drained away.</h1>
        <p className="t-lead mt-5 text-stone">The link may be out of date. Try one of these, or call us on {business.phone.display}.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to the homepage</Button>
          <Button href={telHref} variant="outline" icon="phone">
            Call us
          </Button>
        </div>
        <h2 className="t-h3 mt-14">Popular services</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {services.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}/`} className="flex min-h-12 items-center rounded-lg bg-white px-4 font-semibold text-teal hover:bg-sage">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
