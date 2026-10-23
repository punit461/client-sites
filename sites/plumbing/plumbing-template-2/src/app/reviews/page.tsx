import { Feedback } from "@/components/sections/Feedback";
import { FinalCta } from "@/components/sections/FinalCta";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { business } from "@/config/business";
import { reviews } from "@/content/reviews";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: reviews.length ? "Reviews" : "What To Expect",
  description: reviews.length
    ? `What customers say about ${business.name}, linked to the original reviews.`
    : `How a job with ${business.name} works — from your first request to a tidy finish.`,
  path: "/reviews/",
});

export default function ReviewsPage() {
  return (
    <>
      <div className="dark bg-charcoal py-6">
        <div className="shell">
          <Breadcrumbs crumbs={[{ name: "Reviews", href: "/reviews/" }]} />
        </div>
      </div>
      <Feedback as="h1" />
      {!reviews.length ? (
        <section className="bg-off pb-20">
          <div className="shell">
            <div className="max-w-2xl border-l-4 border-blue bg-white p-7">
              <h2 className="t-h3">Why no reviews here yet?</h2>
              <p className="mt-3 text-ink-soft">
                We only publish reviews customers have posted publicly, word for word, with a link to the original. They
                will appear here as they come in. We never show invented testimonials or ratings.
              </p>
            </div>
          </div>
        </section>
      ) : null}
      <FinalCta />
    </>
  );
}
