import Image from "next/image";
import { Stagger } from "@/components/ui/Reveal";
import { Container, Copy, Icon, SectionHeading } from "@/components/ui/primitives";
import { features, highlights } from "@/data/content";
import StaggerItem from "@/components/ui/StaggerItem";

export default function Facilities() {
  return (
    <section id="facilities" className="bg-surface-2 py-20 sm:py-24">
      <Container>
        <SectionHeading align="center" eyebrow="Why parents choose us" title="Everything a young child needs" />

        <Stagger className="mt-12 grid gap-7 md:grid-cols-3">
          {highlights.map((item) => (
            <StaggerItem
              key={item.title}
              className="overflow-hidden rounded-[var(--radius-card)] bg-surface shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 768px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-[1.4rem] text-teal-dark">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{item.copy}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <ul className="mt-10 flex flex-wrap justify-center gap-3" aria-label="Other facilities">
          {features.map((feature, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-semibold"
            >
              <Icon name={feature.icon} className="h-4 w-4 text-teal" />
              <Copy value={feature.label} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
