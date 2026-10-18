import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Stagger } from "@/components/ui/Reveal";
import StaggerItem from "@/components/ui/StaggerItem";
import { Container, Icon, Photo, SectionHeading } from "@/components/ui/primitives";
import { facilities } from "@/data/content";

export default function FacilitiesPreview() {
  return (
    <section className="bg-surface-2 py-20 sm:py-28">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Our campus"
          title="Designed for curious minds"
          copy="Science and computer labs, a well-stocked library, spacious classrooms and a playground that has produced champions."
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f) => (
            <StaggerItem key={f.title}>
              <Link
                href="/facilities/"
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-6 text-white shadow-soft"
              >
                <Photo src={f.image} alt="" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" aria-hidden />
                <span className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-bright text-navy-dark">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-4 block font-display text-2xl font-semibold">{f.title}</span>
                  {f.highlight ? <span className="mt-1 block text-sm font-semibold text-gold-bright">{f.highlight}</span> : null}
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-hover:text-white">
                    Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
