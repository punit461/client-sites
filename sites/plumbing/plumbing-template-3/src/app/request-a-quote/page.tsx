import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { QuoteFormFromUrl } from "@/components/forms/QuoteFormFromUrl";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { afterRequest, business, compactHours, telHref } from "@/config/business";
import { serviceOptions } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Quote",
  description:
    "Describe your plumbing problem, add photos and tell us what suits you. We'll get back to you to talk it through — the price is agreed before any work.",
  path: "/request-a-quote/",
});

export default function QuotePage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Request a Quote", href: "/request-a-quote/" }]}
        eyebrow="Request a quote"
        title="Tell us what's happening."
        lead="The more you can share, the more useful our first conversation will be. It takes about three minutes."
      />
      <section className="section-y bg-white">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {/* Static HTML carries the full form; the URL-aware version takes over on hydration. */}
            <Suspense fallback={<QuoteForm serviceOptions={serviceOptions} />}>
              <QuoteFormFromUrl serviceOptions={serviceOptions} />
            </Suspense>
          </div>
          <aside aria-label="About your request" className="space-y-5 lg:col-span-4">
            <div className="rounded-[var(--radius-card)] bg-sage p-6">
              <h2 className="t-h3">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {afterRequest.map((s, i) => (
                  <li key={s} className="flex gap-3 text-stone">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="on-teal rounded-[var(--radius-card)] bg-teal p-6 text-sage">
              <h2 className="t-h3 flex items-center gap-2.5">
                <Icon name="alert" className="h-5 w-5 text-terracotta" strokeWidth={1.7} />
                Water escaping?
              </h2>
              <p className="mt-2 text-sm">
                Don&apos;t wait for a reply — close your main shutoff valve and call us. We&apos;re open {compactHours()}.
              </p>
              <a href={telHref} className="btn btn-light mt-4 w-full">
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
