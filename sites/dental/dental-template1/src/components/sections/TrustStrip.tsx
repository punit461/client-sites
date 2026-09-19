import { trust } from "@/data/clinic";
import { Container, Icon } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import type { IconName } from "@/lib/icons";

/**
 * Descriptions of how the practice works, not numbers. "20,000 patients" or a
 * success rate would be a claim the practice has to be able to evidence.
 */
export default function TrustStrip() {
  return (
    <section aria-label="How this practice works" className="border-y border-line bg-surface">
      <Container wide>
        <ul className="grid gap-x-8 gap-y-8 py-11 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.07}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-wash text-sage-deep">
                <Icon name={item.icon as IconName} className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <h3 className="mt-3.5 font-sans text-[0.98rem] font-bold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-1 text-[0.86rem] leading-relaxed text-ink-soft">{item.copy}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
