import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger } from "@/components/ui/Reveal";
import StaggerItem from "@/components/ui/StaggerItem";
import { Container, Photo, SectionHeading } from "@/components/ui/primitives";
import { stages } from "@/data/content";

export default function Stages() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Nursery to Class 10"
            title="One school for every stage of growing up"
            copy="Children can join us in Montessori and stay with the same caring community until they finish Class 10."
          />
          <Link href="/academics/" className="inline-flex shrink-0 items-center gap-2 font-semibold text-navy hover:underline">
            How we teach <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {stages.map((s, i) => (
            <StaggerItem key={s.name} className="group overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-soft">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo src={s.image} alt="" sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                  {String(i + 1).padStart(2, "0")} · {s.range}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-ink">{s.name}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
