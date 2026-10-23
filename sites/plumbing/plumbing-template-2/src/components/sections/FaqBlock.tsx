import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/Buttons";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Faq } from "@/content/types";

export function FaqBlock({
  items,
  title = "Questions? Answered.",
  label = "FAQ",
  more = true,
  className = "bg-off",
}: {
  items: Faq[];
  title?: string;
  label?: string;
  more?: boolean;
  className?: string;
}) {
  return (
    <section aria-labelledby="faq-title" className={`section-y ${className}`}>
      <div className="shell grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead id="faq-title" label={label} title={title} />
          {more ? (
            <ArrowLink href="/faq/" className="mt-6">
              All questions
            </ArrowLink>
          ) : null}
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
