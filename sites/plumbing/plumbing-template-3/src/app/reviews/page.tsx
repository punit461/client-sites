import { FinalCta } from "@/components/sections/FinalCta";
import { Reviews } from "@/components/sections/Reviews";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { business } from "@/config/business";
import { reviews } from "@/content/reviews";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: reviews.length ? "Customer Reviews" : "What To Expect",
  description: reviews.length
    ? `What customers say about ${business.name}, linked to the original reviews.`
    : `What happens when you contact ${business.name} — from your first request to a tidy finish.`,
  path: "/reviews/",
  photo: "bathroomWarm",
});

export default function ReviewsPage() {
  return (
    <>
      <div className="bg-sand pt-6">
        <div className="shell">
          <Breadcrumbs crumbs={[{ name: "Reviews", href: "/reviews/" }]} />
        </div>
      </div>
      <Reviews headingLevel="h1" />
      {!reviews.length ? (
        <section className="bg-sand pb-20">
          <div className="shell">
            <div className="max-w-2xl rounded-[var(--radius-card)] border-l-[3px] border-terracotta bg-white p-6">
              <h2 className="t-h3">Why aren&apos;t there reviews here yet?</h2>
              <p className="mt-2 text-muted">
                We only publish reviews customers have posted publicly, word for word, with a link to the original. They&apos;ll
                appear here as they come in. We never show invented testimonials or ratings.
              </p>
            </div>
          </div>
        </section>
      ) : null}
      <FinalCta />
    </>
  );
}
