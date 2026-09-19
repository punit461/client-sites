import { Car, Mail, MapPin, Navigation, Phone, TrainFront } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/primitives";
import Reveal from "@/components/motion/Reveal";
import { contact, hours } from "@/data/clinic";

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contact.mapsQuery)}`;

export default function LocationSection() {
  return (
    <section id="location" className="py-20 sm:py-28">
      <Container wide>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 [&>*]:min-w-0">
          <div>
            <SectionHeading eyebrow="Find us" title="Visiting the practice" />

            <dl className="mt-9 space-y-6">
              <div className="flex gap-4">
                <dt className="flex-none">
                  <MapPin className="h-5 w-5 text-sage-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">Address</span>
                </dt>
                <dd className="text-[0.98rem] leading-relaxed text-ink">
                  {contact.address.line1}
                  <span className="block">{contact.address.line2}</span>
                  <span className="block">
                    {contact.address.city} {contact.address.postcode}
                  </span>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-none">
                  <Phone className="h-5 w-5 text-sage-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">Phone</span>
                </dt>
                <dd>
                  <a href={`tel:${contact.phoneDial}`} className="text-[0.98rem] text-ink hover:text-terracotta">
                    {contact.phone}
                  </a>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-none">
                  <Mail className="h-5 w-5 text-sage-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">Email</span>
                </dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="text-[0.98rem] text-ink hover:text-terracotta">
                    {contact.email}
                  </a>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-none">
                  <Car className="h-5 w-5 text-sage-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">Parking</span>
                </dt>
                <dd className="text-[0.95rem] leading-relaxed text-ink-soft">{contact.parking}</dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-none">
                  <TrainFront className="h-5 w-5 text-sage-deep" strokeWidth={1.7} aria-hidden />
                  <span className="sr-only">Public transport</span>
                </dt>
                <dd className="text-[0.95rem] leading-relaxed text-ink-soft">{contact.transport}</dd>
              </div>
            </dl>

            <div className="mt-9 rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-sage-deep">
                Opening hours
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
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-[0.92rem] font-semibold text-ivory transition hover:bg-ink/90"
            >
              <Navigation className="h-4 w-4" strokeWidth={1.9} aria-hidden />
              Get directions
            </a>
          </div>

          {/* A drawn map placeholder rather than an embedded provider: no API
              key to expire, no third-party cookies set before consent. */}
          <Reveal>
            <div className="relative aspect-4/3 overflow-hidden rounded-[24px] border border-line bg-surface-2 lg:aspect-auto lg:h-full lg:min-h-[30rem]">
              <div
                className="absolute inset-0 opacity-[0.5]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #e3e0d6 1px, transparent 1px), linear-gradient(to bottom, #e3e0d6 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
                aria-hidden
              />
              <div className="absolute left-[18%] top-[30%] h-1.5 w-[54%] -rotate-12 rounded-full bg-line" aria-hidden />
              <div className="absolute left-[8%] top-[62%] h-1.5 w-[74%] rotate-6 rounded-full bg-line" aria-hidden />

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-terracotta text-white shadow-lg">
                  <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="mt-3 rounded-full bg-surface px-4 py-2 text-[0.82rem] font-semibold text-ink shadow-[var(--shadow-soft)]">
                  {contact.address.line1}
                </span>
              </div>

              <p className="absolute inset-x-0 bottom-4 text-center text-[0.75rem] text-ink-faint">
                Illustrative map — connect a map provider before launch.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
