import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { QuoteFormFromUrl } from "@/components/forms/QuoteFormFromUrl";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { business, compactHours, telHref } from "@/config/business";
import { serviceOptions } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Describe your plumbing problem, add photos and tell us when suits you. We will get back to you to talk it through — with an upfront price before any work begins.",
  path: "/request-a-quote/",
});

const next = [
  "We read your request during opening hours and get back to you by phone or email.",
  "We talk it through, and arrange a visit if the job needs one. The time is confirmed only when we confirm it with you.",
  "You get an upfront price. Nothing starts until you approve it.",
];

export default function QuotePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Request a Quote", href: "/request-a-quote/" }]}
        eyebrow="Request a quote"
        title="Tell us what's going on."
        lead="The more you can tell us, the more useful our first conversation will be. It takes about three minutes."
      />
      <section className="section-y">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* Static HTML carries the full form; the URL-aware version takes over after hydration. */}
            <Suspense fallback={<QuoteForm serviceOptions={serviceOptions} />}>
              <QuoteFormFromUrl serviceOptions={serviceOptions} />
            </Suspense>
          </div>
          <aside className="space-y-5 lg:col-span-4" aria-label="About your request">
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="t-h3 text-navy">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {next.map((n, i) => (
                  <li key={n} className="flex gap-3 text-[0.95rem] text-slate">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ivory font-display text-sm font-bold text-navy">
                      {i + 1}
                    </span>
                    {n}
                  </li>
                ))}
              </ol>
            </div>
            <div className="on-dark rounded-2xl bg-navy p-6 text-ivory">
              <h2 className="t-h3 flex items-center gap-3">
                <Icon name="alert" className="h-5 w-5 text-copper-soft" />
                Water escaping?
              </h2>
              <p className="mt-3 text-[0.95rem] text-ivory/75">
                Don&apos;t wait for a reply — turn off your main shutoff valve and call us. We are open {compactHours()}.
              </p>
              <a href={telHref} className="btn btn-primary mt-5 w-full">
                <Icon name="phone" className="h-4 w-4" strokeWidth={1.8} />
                {business.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
