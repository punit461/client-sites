import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Container, CtaButton, Photo, SectionHeading } from "@/components/ui/primitives";
import { story } from "@/data/content";
import { img } from "@/lib/asset";

export default function StoryIntro() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-lift">
            <Photo src={img.campusBus} alt="The Little Angels school building with the yellow school bus outside" />
          </div>
          <div className="absolute -bottom-8 -right-2 hidden w-48 overflow-hidden rounded-2xl border-4 border-bg shadow-lift sm:block lg:-right-10">
            <div className="relative aspect-[4/3]">
              <Photo src={img.alumniMarchPast} alt="Students carrying house flags at a march-past in the 1990s" sizes="200px" />
            </div>
            <p className="bg-white px-3 py-2 text-xs font-semibold text-ink-soft">From our archive · 1990s</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionHeading eyebrow="About our school" title="A dream that started with one family of educators" />
          {story.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
              {p}
            </p>
          ))}
          <div className="mt-8">
            <CtaButton href="/about/" variant="ghost">
              Read our story <ArrowRight className="h-4 w-4" aria-hidden />
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
