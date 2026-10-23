import { FinalCta } from "@/components/sections/FinalCta";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { business } from "@/config/business";
import { reviews } from "@/content/reviews";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: reviews.length ? "Customer Reviews" : "What To Expect",
  description: reviews.length
    ? `What customers say about ${business.name}, with links to the original reviews.`
    : `The service standards ${business.name} holds every visit to — from written estimates to a clean finish.`,
  path: "/reviews/",
  photo: "bathroomWhite",
});

export default function ReviewsPage() {
  return (
    <>
      <div className="shell pt-8 sm:pt-10">
        <Breadcrumbs crumbs={[{ name: "Reviews", href: "/reviews/" }]} />
      </div>
      <ReviewsSection headingLevel="h1" />
      {!reviews.length ? (
        <section className="pb-16">
          <div className="shell">
            <div className="max-w-2xl rounded-2xl border border-line bg-white p-7">
              <h2 className="t-h3 text-navy">Where are the reviews?</h2>
              <p className="mt-3 text-slate">
                We only publish reviews that customers have posted publicly, word for word, with a link to the original. As
                they come in, they will appear here. We will never show invented testimonials or ratings.
              </p>
            </div>
          </div>
        </section>
      ) : null}
      <FinalCta />
    </>
  );
}
