import { Phone } from "lucide-react";
import { Suspense } from "react";
import { EstimateForm } from "@/components/forms/EstimateForm";
import { EstimateFormFromUrl } from "@/components/forms/EstimateFormFromUrl";
import { Label } from "@/components/ui/SectionHead";
import { afterRequest, business, compactHours, telHref } from "@/config/business";
import { serviceOptions } from "@/content/services";

/**
 * The estimate form with its context: what happens next, and the phone
 * number for anything urgent. Used on the homepage and /request-a-quote.
 */
export function EstimateSection({ headingLevel = "h2", readUrl = false }: { headingLevel?: "h1" | "h2"; readUrl?: boolean }) {
  const H = headingLevel;
  return (
    <section id="estimate" aria-labelledby="estimate-title" className="section-y bg-white">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Label>Get an estimate</Label>
            <H id="estimate-title" className="t-h2 mt-4">
              Tell us what&apos;s going on.
            </H>
            <p className="t-lead mt-5 text-ink-soft">Takes about three minutes. Photos help us give you a better answer.</p>

            <h3 className="t-label mt-10 text-charcoal">What happens next</h3>
            <ol className="mt-4 space-y-3">
              {afterRequest.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[4px] bg-charcoal font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>

            <div className="dark mt-10 rounded-[var(--radius-box)] bg-charcoal p-6 text-white">
              <p className="font-display text-lg font-semibold">Water escaping right now?</p>
              <p className="mt-2 text-sm text-gray">Don&apos;t wait for a reply. Call us — we&apos;re open {compactHours()}.</p>
              <a href={telHref} className="btn btn-lime mt-4 w-full">
                <Phone className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                {business.phone.display}
              </a>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          {readUrl ? (
            // Static HTML carries the full form; the URL-aware version takes over on hydration.
            <Suspense fallback={<EstimateForm serviceOptions={serviceOptions} />}>
              <EstimateFormFromUrl serviceOptions={serviceOptions} />
            </Suspense>
          ) : (
            <EstimateForm serviceOptions={serviceOptions} />
          )}
        </div>
      </div>
    </section>
  );
}
