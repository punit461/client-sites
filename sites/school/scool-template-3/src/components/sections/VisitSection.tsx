import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import Img from "@/components/ui/Img";
import { contact, fullAddress } from "@/content/school";
import { photos } from "@/lib/images";

/** Section L — the closing invitation: campus photograph behind, the practical details in front. */
export default function VisitSection() {
  return (
    <section aria-labelledby="visit-title" className="relative isolate overflow-hidden bg-navy-deep">
      <Parallax className="absolute inset-0 -z-10" strength={12}>
        <div className="relative h-full w-full">
          <Img photo={photos.courtyard} width={1440} sizes="100vw" />
        </div>
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />

      <div className="container-x section-y grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold" aria-hidden />
            Visit the school
          </p>
          <h2 id="visit-title" className="t-h1 mt-5 text-white">
            The best way to know a school is to <em className="text-gold">walk through its gate.</em>
          </h2>
          <p className="t-lead mt-6 max-w-xl text-white/75">
            Visit on any weekday between 8 am and 3 pm to see the classrooms and play areas and collect an admission form. A quick call
            first helps the office make time for you.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact/#visit" variant="gold">
              Plan Your Visit
            </ButtonLink>
            <ButtonLink href={contact.mapsUrl} variant="outlineLight" arrow={false}>
              <Navigation className="h-4 w-4" aria-hidden /> Get directions
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <dl className="divide-y divide-line bg-white p-7 text-[0.95rem] shadow-lift sm:p-9">
            <div className="flex gap-4 pb-5">
              <dt>
                <MapPin className="mt-0.5 h-5 w-5 text-gold-ink" aria-hidden />
                <span className="sr-only">Address</span>
              </dt>
              <dd>
                <address className="not-italic text-ink">{fullAddress}</address>
              </dd>
            </div>
            <div className="flex gap-4 py-5">
              <dt>
                <Clock className="mt-0.5 h-5 w-5 text-gold-ink" aria-hidden />
                <span className="sr-only">Office hours</span>
              </dt>
              <dd className="w-full space-y-1">
                {contact.hours.map((h) => (
                  <p key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="text-right font-semibold text-ink">{h.time}</span>
                  </p>
                ))}
              </dd>
            </div>
            <div className="flex gap-4 py-5 last:pb-0">
              <dt>
                <Phone className="mt-0.5 h-5 w-5 text-gold-ink" aria-hidden />
                <span className="sr-only">Phone</span>
              </dt>
              <dd>
                <a href={contact.phoneHref} className="font-semibold text-ink hover:text-blue">
                  {contact.phone}
                </a>
              </dd>
            </div>
            {contact.email ? (
              <div className="flex gap-4 pt-5">
                <dt>
                  <Mail className="mt-0.5 h-5 w-5 text-gold-ink" aria-hidden />
                  <span className="sr-only">Email</span>
                </dt>
                <dd className="min-w-0 break-words">
                  <a href={`mailto:${contact.email}`} className="font-semibold text-ink hover:text-blue">
                    {contact.email}
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
