import { Container, Icon, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { technology } from "@/data/content";

/**
 * Deliberately describes what each tool does, never what it achieves.
 * Equipment does not guarantee an outcome, and copy here must not imply it.
 */
export default function Technology() {
  return (
    <section className="bg-ink py-20 text-ivory sm:py-28">
      <Container wide>
        <SectionHeading
          eyebrow="Equipment"
          title={<span className="text-ivory">Modern tools. Thoughtful care.</span>}
          copy="What the equipment does, and how it is used in a conversation with you."
          className="[&_p]:text-ivory/65"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {technology.map((tool, i) => (
            <Reveal as="li" key={tool.name} delay={i * 0.06}>
              <div className="h-full rounded-[20px] border border-ivory/12 bg-ivory/[0.04] p-6 transition-colors duration-300 hover:border-sage/50">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage/15 text-sage">
                  <Icon name={tool.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[1.3rem] text-ivory">{tool.name}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-ivory/60">{tool.copy}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
