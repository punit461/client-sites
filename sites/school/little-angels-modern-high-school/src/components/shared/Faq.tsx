import { Plus } from "lucide-react";
import { faq } from "@/data/content";

/** Native <details>, so it opens without JavaScript and works with every screen reader. */
export default function Faq() {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
      {faq.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-display text-lg font-semibold text-ink sm:px-7 [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-45" aria-hidden />
          </summary>
          <p className="px-5 pb-6 text-[0.98rem] leading-relaxed text-ink-soft sm:px-7">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
