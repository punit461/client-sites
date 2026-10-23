import { Accordion } from "@/components/ui/Accordion";
import { TextLink } from "@/components/ui/Buttons";
import { SectionHead } from "@/components/ui/SectionHead";
import type { Faq } from "@/content/types";

export function FaqSection({
  items,
  title = "Questions, answered clearly.",
  eyebrow = "FAQ",
  more = true,
  tone = "white",
}: {
  items: Faq[];
  title?: string;
  eyebrow?: string;
  more?: boolean;
  tone?: "white" | "sand";
}) {
  return (
    <section aria-labelledby="faq-title" className={`section-y ${tone === "sand" ? "bg-sand" : "bg-white"}`}>
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead id="faq-title" eyebrow={eyebrow} title={title} />
          {more ? <TextLink href="/faq/" className="mt-6">All questions</TextLink> : null}
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} tone={tone} />
        </div>
      </div>
    </section>
  );
}
