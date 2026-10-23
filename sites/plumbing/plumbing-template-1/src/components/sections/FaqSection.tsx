import { Accordion } from "@/components/ui/Accordion";
import { TextLink } from "@/components/ui/ArrowLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Faq } from "@/content/types";

export function FaqSection({
  faqs,
  title = "Questions, answered.",
  eyebrow = "FAQ",
  showAllLink = true,
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  showAllLink?: boolean;
}) {
  return (
    <section aria-labelledby="faq-title" className="section-y">
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} />
          {showAllLink ? (
            <p className="mt-6 text-slate">
              More in our <TextLink href="/faq/" className="text-navy">full FAQ</TextLink>
            </p>
          ) : null}
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
