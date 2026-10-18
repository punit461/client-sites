import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Container, CtaButton, SectionHeading } from "@/components/ui/primitives";
import { contact, hours, whatsappLink } from "@/data/site";

/** Address, hours, phones and a map — the same block closes the home and admissions pages. */
export default function VisitUs({ id = "visit" }: { id?: string }) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
          <Reveal>
            <SectionHeading
              eyebrow="Visit us"
              title="Come and see the campus"
              copy="We are in NGEF Layout, Sadanandanagar. Parents are welcome to visit during school hours — call ahead and we'll show you around."
            />
            <div className="mt-8 space-y-5 text-[0.98rem]">
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-ink-soft transition hover:text-ink">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <span>
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </a>
              <div className="flex gap-3 text-ink-soft">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                  {hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="font-medium text-ink">{h.days}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex gap-3 text-ink-soft">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden />
                <span>
                  <a href={contact.phoneHref} className="block font-medium text-ink hover:underline">
                    {contact.phone} <span className="font-normal text-ink-faint">· office</span>
                  </a>
                  <a href={contact.admissionsPhoneHref} className="block font-medium text-ink hover:underline">
                    {contact.admissionsPhone} <span className="font-normal text-ink-faint">· admissions</span>
                  </a>
                </span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton href={contact.mapsUrl}>
                <MapPin className="h-4 w-4" aria-hidden /> Get directions
              </CtaButton>
              <CtaButton href={whatsappLink()} variant="ghost">
                <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp us
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-h-[340px] overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface-2 shadow-soft">
            <iframe
              src={contact.mapsEmbed}
              title="Map showing Little Angels Modern High School"
              className="h-full min-h-[340px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
