import { Quote } from "lucide-react";
import { Container, PlaceholderNote, SectionHeading, Stars } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { reviewPlaceholders } from "@/data/content";
import { evidence } from "@/data/group";

/**
 * The layout for verified reviews, with no reviews in it. Writing plausible
 * patient quotes here would be fabricating testimonials, so the cards carry
 * literal placeholder text and the section says so. The notice disappears once
 * `evidence.reviewsAreReal` is true and real reviews are supplied.
 */
export default function Reviews() {
  return (
    <section className="py-16 sm:py-24">
      <Container wide>
        <SectionHeading
          label="Reviews"
          title="What patients say"
          align="center"
          copy="This section is ready for reviews from the group's verified profile."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviewPlaceholders.map((review, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-[20px] border border-line bg-surface p-6">
                <Quote className="h-7 w-7 text-mint-deep" strokeWidth={1.5} aria-hidden />
                <blockquote className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink-faint">
                  {review.quote}
                </blockquote>
                <Stars className="mt-5" />
                <figcaption className="mt-4 border-t border-line pt-4">
                  <span className="block text-[0.9rem] font-semibold text-ink-faint">
                    {review.name}
                  </span>
                  <span className="block text-[0.78rem] text-ink-faint/70">{review.service}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {!evidence.reviewsAreReal ? (
          <div className="mx-auto max-w-xl">
            <PlaceholderNote>
              <strong className="font-semibold text-ink">Placeholder layout.</strong> Replace these
              with reviews from the group&rsquo;s verified profile and set{" "}
              <code className="rounded bg-surface-2 px-1 py-0.5 text-[0.75rem]">
                evidence.reviewsAreReal
              </code>{" "}
              to true. Do not write example testimonials here — invented patient quotes are a
              regulatory problem, not a copywriting one.
            </PlaceholderNote>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
