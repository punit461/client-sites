import { Container } from "@/components/ui/primitives";
import { stats } from "@/data/content";

export default function StatsStrip() {
  return (
    <section aria-label="Little Angels at a glance" className="border-y border-line bg-surface">
      <Container wide>
        <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-8 text-center sm:px-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold text-navy sm:text-4xl">{s.value}</span>
                <span className="mt-2 block text-sm leading-snug text-ink-soft">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
