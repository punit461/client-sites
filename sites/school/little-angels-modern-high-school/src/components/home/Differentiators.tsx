import { Stagger } from "@/components/ui/Reveal";
import StaggerItem from "@/components/ui/StaggerItem";
import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import { differentiators, story } from "@/data/content";

export default function Differentiators() {
  return (
    <section className="feather-bg py-20 text-white sm:py-28">
      <Container>
        <SectionHeading onDark eyebrow="What makes us different" title="A school where every child belongs" copy={story.mission} />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((d, i) => (
            <StaggerItem
              key={d.title}
              className={`rounded-[var(--radius-card)] border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm ${
                i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:bg-gold-bright lg:text-navy-dark" : ""
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  i === 0 ? "bg-white/20 text-gold-bright lg:bg-navy lg:text-gold-bright" : "bg-white/10 text-gold-bright"
                }`}
              >
                <Icon name={d.icon} className="h-6 w-6" />
              </span>
              <h3 className={`mt-6 font-display text-2xl ${i === 0 ? "lg:text-3xl" : ""}`}>{d.title}</h3>
              <p className={`mt-3 leading-relaxed ${i === 0 ? "text-white/80 lg:text-lg lg:text-navy-dark/80" : "text-white/75"}`}>
                {d.copy}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
