import { Stagger } from "@/components/ui/Reveal";
import StaggerItem from "@/components/ui/StaggerItem";
import { Container, Copy, Icon, SectionHeading } from "@/components/ui/primitives";
import { parentVoices } from "@/data/content";
import { rating } from "@/data/site";

export default function ParentVoices() {
  return (
    <section className="bg-surface-2 py-20 sm:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="What parents say"
          title={`Rated ${rating.value} by ${rating.count} families on ${rating.source}`}
        />

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {parentVoices.map((voice) => (
            <StaggerItem key={voice.theme} className="rounded-[var(--radius-card)] bg-surface p-7 shadow-[var(--shadow-soft)]">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sun/25 text-accent">
                <Icon name={voice.icon} />
              </span>
              <p className="mt-5 text-[1.08rem] font-semibold leading-relaxed text-ink">{voice.theme}</p>
              <p className="mt-4 text-[0.92rem] text-ink-soft">
                <Copy value={voice.quote} />
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
