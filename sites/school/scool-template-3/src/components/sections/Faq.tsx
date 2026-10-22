import { Plus } from "lucide-react";
import JsonLd from "@/components/ui/JsonLd";
import type { FaqItem } from "@/content/types";

/**
 * Accordions built on <details>/<summary>: keyboard and screen-reader support
 * come from the browser, and every answer is in the HTML (and searchable with
 * Ctrl+F) even before JavaScript loads.
 */
export default function Faq({ items, structuredData = false }: { items: FaqItem[]; structuredData?: boolean }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-5 font-display text-[1.2rem] text-ink transition hover:text-blue sm:text-[1.35rem]">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 text-gold-ink transition-transform duration-300 group-open:rotate-45" aria-hidden />
          </summary>
          <p className="max-w-3xl pb-7 pr-10">{f.a}</p>
        </details>
      ))}
      {structuredData ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      ) : null}
    </div>
  );
}
