import Link from "next/link";
import { Container, Icon, PlaceholderNote, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/animations";
import { paymentOptions } from "@/data/content";
import { evidence } from "@/data/group";

/**
 * No insurer logos. Displaying one is a claim that the group is in network
 * with that insurer, which changes over time and varies by clinic — so the
 * copy sends people to the clinic to confirm rather than listing brands.
 */
export default function Payment() {
  return (
    <section id="payment" className="bg-surface-2/70 py-16 sm:py-24">
      <Container wide>
        <SectionHeading
          label="Payments"
          title="Making care easier"
          copy="Costs are agreed before treatment starts, so nothing on the invoice is a surprise."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paymentOptions.map((option, i) => (
            <Reveal key={option.title} delay={i * 0.07}>
              <div className="h-full rounded-[20px] border border-line bg-surface p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-forest">
                  <Icon name={option.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[1.15rem] font-semibold text-ink">
                  {option.title}
                </h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-ink-soft">{option.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/#faq"
            className="inline-flex items-center rounded-full bg-forest px-6 py-3.5 text-[0.88rem] font-semibold text-paper transition hover:bg-forest-deep"
          >
            View payment information
          </Link>
        </div>

        {!evidence.insurersConfigured ? (
          <div className="max-w-2xl">
            <PlaceholderNote>
              <strong className="font-semibold text-ink">No insurer logos are shown.</strong>{" "}
              Displaying one asserts that the group is in network with that insurer — which varies
              by clinic and changes over time. Add them only when that is contractually true, and
              set{" "}
              <code className="rounded bg-surface-2 px-1 py-0.5 text-[0.75rem]">
                evidence.insurersConfigured
              </code>
              .
            </PlaceholderNote>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
