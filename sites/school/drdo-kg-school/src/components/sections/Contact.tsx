import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { Container, Copy, CtaButton, Icon, SectionHeading } from "@/components/ui/primitives";
import { brand, contact, hours } from "@/data/site";
import type { IconName } from "@/lib/icons";

function Row({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-surface text-teal shadow-[var(--shadow-soft)]">
        <Icon name={icon} className="h-[18px] w-[18px]" />
      </span>
      <div>
        <dt className="font-extrabold text-teal-dark">{label}</dt>
        <dd className="mt-0.5 leading-relaxed text-ink-soft">{children}</dd>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-surface-2 py-20 sm:py-24">
      <Container className="grid items-stretch gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <SectionHeading eyebrow="Contact & visit" title="Come and see us" />
          <dl className="mt-8 space-y-5">
            <Row icon="mapPin" label="Address">
              {contact.street},
              <br />
              {contact.locality}, {contact.city}, {contact.region} {contact.postalCode}
            </Row>
            <Row icon="phone" label="Phone">
              <a href={contact.phoneHref} className="font-bold text-ink underline decoration-sun decoration-2 underline-offset-4">
                {contact.phone}
              </a>
            </Row>
            <Row icon="clock" label="School hours">
              <Copy value={hours.days} />, {hours.opens} – <Copy value={hours.closes} />
            </Row>
            <Row icon="mail" label="Email">
              <Copy value={contact.email} />
            </Row>
          </dl>
          <CtaButton href={contact.directions} external className="mt-8">
            <Icon name="navigation" className="h-4 w-4" strokeWidth={2.2} />
            Get directions
          </CtaButton>
        </Reveal>

        <Reveal delay={0.1} className="min-h-[360px] overflow-hidden rounded-[var(--radius-card)] bg-line shadow-[var(--shadow-soft)]">
          <iframe
            title={`Map showing ${brand.name}`}
            src={contact.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[360px] w-full border-0"
          />
        </Reveal>
      </Container>
    </section>
  );
}
