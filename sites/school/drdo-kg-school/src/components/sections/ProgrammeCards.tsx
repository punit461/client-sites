import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Img from "@/components/ui/Img";
import { programmes } from "@/content/programmes";

/**
 * The learning stages as an asymmetric grid: three across, then two wider —
 * so five stages never look like a row of identical tiles. Works for any
 * count; extra stages simply continue the pattern.
 */
const spans = ["lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-3", "lg:col-span-3"];

export default function ProgrammeCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <Stagger as="ul" className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
      {programmes.map((p, i) => (
        <StaggerItem as="li" key={p.slug} className={`${spans[i % spans.length]} ${i === programmes.length - 1 && programmes.length % 2 ? "sm:col-span-2" : ""}`}>
          <Link
            href={`/academics/${p.slug}/`}
            className="group block h-full transition-transform duration-500 ease-out hover:-translate-y-1"
          >
            <div className={`relative overflow-hidden rounded-xs bg-navy ${i > 2 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
              <Img
                photo={p.photo}
                width={i > 2 ? 640 : 440}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute left-0 top-0 bg-ivory px-3 py-1.5 font-display text-sm text-navy">0{i + 1}</span>
            </div>
            <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-line pb-4">
              <H className="t-h3">{p.name}</H>
              <span className="shrink-0 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-gold-ink">{p.range.split(" · ")[0]}</span>
            </div>
            <p className="mt-4 text-[0.97rem]">{p.summary}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
              <span className="border-b border-gold-ink/40 pb-0.5 transition-colors group-hover:border-navy">
                View class<span className="sr-only">: {p.name}</span>
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
