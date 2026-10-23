import { Item, Stagger } from "@/components/motion/Motion";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { afterRequest, business } from "@/config/business";
import { reviews } from "@/content/reviews";

/**
 * Verified reviews when there are any. Otherwise "What to Expect When You
 * Contact Us" — never invented quotes, star ratings or review counts.
 */
export function Reviews({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const profiles = business.reviewProfiles.length ? (
    <ul className="mt-8 flex flex-wrap gap-3">
      {business.reviewProfiles.map((p) => (
        <li key={p.href}>
          <a href={p.href} rel="noopener" target="_blank" className="group btn btn-outline">
            Read our reviews on {p.label}
            <Icon name="arrowUpRight" className="h-4 w-4" strokeWidth={1.8} />
          </a>
        </li>
      ))}
    </ul>
  ) : null;

  if (reviews.length)
    return (
      <section aria-labelledby="reviews-title" className="section-y bg-sand">
        <div className="shell">
          <SectionHead as={headingLevel} id="reviews-title" eyebrow="Customer reviews" title="In our customers' own words." />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Item key={i} className="flex flex-col rounded-[var(--radius-card)] bg-white p-7 sm:p-9">
                <span aria-hidden="true" className="font-display text-6xl leading-none text-terracotta">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1">
                  <p className="font-display text-xl leading-snug font-medium text-teal sm:text-2xl">{r.text}</p>
                </blockquote>
                <p className="mt-6 text-sm text-muted">
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

  const expect = [
    { icon: "clock" as const, title: "A reply in opening hours", body: afterRequest[0] },
    { icon: "message" as const, title: "A real conversation", body: afterRequest[1] },
    { icon: "file" as const, title: "A price before any work", body: afterRequest[2] },
    { icon: "house" as const, title: "Your space respected", body: "Floors covered, tools contained, and the area left tidy when we're done." },
  ];

  return (
    <section aria-labelledby="reviews-title" className="section-y bg-sand">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            as={headingLevel}
            id="reviews-title"
            eyebrow="What to expect"
            title="What to Expect When You Contact Us."
            lead="No star ratings to wave around — just a straight description of how working with us goes."
          />
          {profiles}
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {expect.map((e, i) => (
            <Item key={e.title} className={`rounded-[var(--radius-card)] p-6 ${i % 3 === 0 ? "bg-white" : "bg-sage"}`}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-teal text-white">
                <Icon name={e.icon} className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="t-h3 mt-5">{e.title}</h3>
              <p className="mt-2 text-stone">{e.body}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
