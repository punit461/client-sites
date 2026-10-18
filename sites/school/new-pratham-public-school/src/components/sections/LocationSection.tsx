import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import MapEmbed from "@/components/sections/MapEmbed";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { contact, hours, whatsappLink } from "@/data/school";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

export default function LocationSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="location" className={compact ? "py-20 sm:py-28" : "bg-surface py-20 sm:py-28"}>
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
          <div>
            <SectionHeading eyebrow="Find us" title="Visiting the school" copy="Dooravani Nagar, off Old Madras Road in east Bengaluru." />

            <dl className="mt-9 space-y-6">
              <div className="flex gap-4">
                <dt className="flex-none">
                  <MapPin className="h-5 w-5 text-coral-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">Address</span>
                </dt>
                <dd className="text-[0.98rem] leading-relaxed text-ink">
                  {contact.address.line1}
                  <span className="block">{contact.address.line2}</span>
                  <span className="block">
                    {contact.address.city}, {contact.address.state} {contact.address.postcode}
                  </span>
                  <span className="mt-1 block text-[0.8rem] text-ink-faint">Plus code {contact.plusCode}</span>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-none">
                  <Phone className="h-5 w-5 text-coral-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">Phone</span>
                </dt>
                <dd className="text-[0.98rem] leading-relaxed">
                  <a href={`tel:${contact.phoneDial}`} className="font-semibold text-ink hover:text-coral-deep">
                    {contact.phone}
                  </a>
                  <span className="block text-[0.85rem] text-ink-soft">
                    or{" "}
                    <a href={`tel:${contact.phoneAltDial}`} className="hover:text-coral-deep">
                      {contact.phoneAlt}
                    </a>
                  </span>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-none">
                  <MessageCircle className="h-5 w-5 text-coral-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">WhatsApp</span>
                </dt>
                <dd>
                  <a
                    href={whatsappLink("Hello New Pratham Public School, I need some information. Please reply to me.")}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.98rem] text-ink hover:text-coral-deep"
                  >
                    WhatsApp {contact.whatsapp}
                  </a>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-none">
                  <Mail className="h-5 w-5 text-coral-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">Email</span>
                </dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="text-[0.98rem] text-ink hover:text-coral-deep">
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-9 rounded-2xl border border-line bg-cream p-5">
              <h3 className="flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-coral-deep">
                <Clock className="h-4 w-4" strokeWidth={1.9} aria-hidden />
                School hours
              </h3>
              <dl className="mt-3 space-y-2 text-[0.92rem]">
                {hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4">
                    <dt className="text-ink">{h.days}</dt>
                    <dd className="text-ink-soft">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-[0.92rem] font-semibold text-cream transition hover:bg-ink/90"
            >
              <Navigation className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Get directions
            </a>
          </div>

          <Reveal>
            <MapEmbed />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
