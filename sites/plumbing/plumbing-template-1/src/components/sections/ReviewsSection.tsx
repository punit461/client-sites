import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, standards } from "@/config/business";
import { reviews } from "@/content/reviews";

/**
 * Verified reviews when there are any; otherwise the company's service
 * standards. It never shows a rating, a count or a quote it cannot source.
 */
export function ReviewsSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  if (reviews.length) {
    return (
      <section aria-labelledby="reviews-title" className="section-y">
        <div className="shell">
          <SectionHeading as={headingLevel} id="reviews-title" eyebrow="Customer reviews" title="In our customers' words." />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <StaggerItem key={i} className="flex flex-col rounded-2xl border border-line bg-white p-7">
                <blockquote className="flex-1">
                  <p className="text-[1.02rem] leading-relaxed text-navy">&ldquo;{r.text}&rdquo;</p>
                </blockquote>
                <p className="mt-6 text-sm text-slate">
                  {r.author ? <span className="font-semibold text-navy">{r.author}</span> : null}
                  {r.author ? " · " : null}
                  {r.href ? (
                    <a href={r.href} className="link-underline" rel="noopener" target="_blank">
                      Read on {r.source}
                    </a>
                  ) : (
                    r.source
                  )}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
          <ReviewProfileLinks />
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="reviews-title" className="section-y">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            as={headingLevel}
            id="reviews-title"
            eyebrow="What to expect"
            title="Judge us by how the job is run."
            lead="We would rather show you how we work than ask you to take our word for it. These are the standards every visit is held to."
          />
          <ReviewProfileLinks />
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {standards.slice(0, 4).map((s) => (
            <StaggerItem key={s.title} className="rounded-2xl border border-line bg-white p-6">
              <Icon name="check" className="h-6 w-6 text-copper-ink" />
              <h3 className="t-h3 mt-4 text-navy">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] text-slate">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function ReviewProfileLinks() {
  if (!business.reviewProfiles.length) return null;
  return (
    <Reveal className="mt-8 flex flex-wrap gap-3">
      {business.reviewProfiles.map((p) => (
        <a key={p.href} href={p.href} rel="noopener" target="_blank" className="btn btn-outline">
          Read our reviews on {p.label}
          <Icon name="arrowUpRight" className="h-4 w-4" strokeWidth={1.8} />
        </a>
      ))}
    </Reveal>
  );
}
