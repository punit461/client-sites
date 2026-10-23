import { ArrowUpRight } from "lucide-react";
import { Item, Stagger } from "@/components/motion/Motion";
import { Label } from "@/components/ui/SectionHead";
import { afterRequest, business, principles } from "@/config/business";
import { reviews } from "@/content/reviews";

/**
 * Verified reviews when there are any. Otherwise "What to expect from our
 * service" — never an invented quote, rating or review count.
 */
export function Feedback({ as: H = "h2" }: { as?: "h1" | "h2" }) {
  const profiles = business.reviewProfiles.length ? (
    <ul className="mt-8 flex flex-wrap gap-3">
      {business.reviewProfiles.map((p) => (
        <li key={p.href}>
          <a href={p.href} rel="noopener" target="_blank" className="group btn btn-line">
            Read reviews on {p.label}
            <ArrowUpRight className="nudge-up h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  ) : null;

  if (reviews.length)
    return (
      <section aria-labelledby="feedback-title" className="section-y bg-off">
        <div className="shell">
          <Label>Customer feedback</Label>
          <H id="feedback-title" className="t-h2 mt-4 max-w-3xl">
            In our customers&apos; own words.
          </H>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Item key={i} className="border-l-4 border-blue bg-white p-7 sm:p-9">
                <blockquote>
                  <p className="font-display text-xl leading-snug font-medium sm:text-2xl">&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <p className="mt-6 text-sm text-ink-soft">
                  {r.author ? <span className="font-semibold text-charcoal">{r.author} · </span> : null}
                  {r.href ? (
                    <a href={r.href} rel="noopener" target="_blank" className="underline underline-offset-4">
                      Original review on {r.source}
                    </a>
                  ) : (
                    r.source
                  )}
                </p>
              </Item>
            ))}
          </Stagger>
          {profiles}
        </div>
      </section>
    );

  return (
    <section aria-labelledby="feedback-title" className="section-y bg-off">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Label>What to expect</Label>
          <H id="feedback-title" className="t-h2 mt-4">
            What to expect from our service.
          </H>
          <p className="t-lead mt-5 text-ink-soft">
            No star ratings to wave around here — just a straight description of how a job with us goes.
          </p>
          {profiles}
        </div>
        <div className="lg:col-span-7">
          <Stagger as="ol" className="border-t-2 border-charcoal">
            {[...afterRequest, ...principles.slice(2).map((p) => p.body)].map((line, i) => (
              <Item key={line} className="flex gap-6 border-b border-rule py-6">
                <span className="font-display text-sm font-bold text-blue">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-display text-lg leading-snug font-medium sm:text-xl">{line}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
