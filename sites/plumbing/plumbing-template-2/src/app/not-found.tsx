import Link from "next/link";
import { Button } from "@/components/ui/Buttons";
import { business, telHref } from "@/config/business";
import { services } from "@/content/services";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="dark grid-lines bg-charcoal text-white">
      <div className="shell py-20 sm:py-28">
        <p className="t-label text-lime">404</p>
        <h1 className="t-mega mt-4 max-w-4xl">This page has gone down the drain.</h1>
        <p className="t-lead mt-6 max-w-xl text-gray">The link may be out of date. Try one of these, or call {business.phone.display}.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href={telHref} variant="line-light" icon="phone">
            Call us
          </Button>
        </div>
        <ul className="mt-14 grid gap-x-8 border-t border-rule-dark sm:grid-cols-2">
          {services.slice(0, 6).map((s) => (
            <li key={s.slug} className="border-b border-rule-dark">
              <Link href={`/services/${s.slug}/`} className="flex min-h-14 items-center font-display text-lg font-semibold hover:text-lime">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
