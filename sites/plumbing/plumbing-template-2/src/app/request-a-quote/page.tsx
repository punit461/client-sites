import { EstimateSection } from "@/components/sections/EstimateSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request an Estimate",
  description:
    "Describe your plumbing problem, add photos and pick a time that suits. We'll get back to you to talk it through — with a clear estimate before any work.",
  path: "/request-a-quote/",
});

export default function EstimatePage() {
  return (
    <>
      <div className="dark bg-charcoal py-6">
        <div className="shell">
          <Breadcrumbs crumbs={[{ name: "Request an Estimate", href: "/request-a-quote/" }]} />
        </div>
      </div>
      <EstimateSection headingLevel="h1" readUrl />
    </>
  );
}
