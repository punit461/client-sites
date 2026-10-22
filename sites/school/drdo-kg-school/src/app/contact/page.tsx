import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { contact, fullAddress, school, whatsappLink } from "@/content/school";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Directions",
  description: `Address, phone, office hours and directions for ${school.name}, ${contact.address.locality}, ${contact.address.city}. Plan a visit.`,
  path: "/contact/",
});

export default function ContactPage() {
  const wa = whatsappLink("Hello, I have a question about the school.");
  const cards = [
    { icon: Phone, title: "School office", lines: [{ text: contact.phone, href: contact.phoneHref }] },
    ...(contact.email ? [{ icon: Mail, title: "Email", lines: [{ text: contact.email, href: `mailto:${contact.email}` }] }] : []),
    ...(wa ? [{ icon: MessageCircle, title: "WhatsApp", lines: [{ text: "Message the office", href: wa }] }] : []),
    { icon: Navigation, title: "Directions", lines: [{ text: contact.plusCode, href: contact.mapsUrl }] },
    { icon: Clock, title: "Office hours", lines: contact.hours.map((h) => ({ text: `${h.days}: ${h.time}`, href: "" })) },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            We would be glad <em className="text-gold">to hear from you.</em>
          </>
        }
        lead="Questions about admissions, a visit or anything else: call the school office, open Monday to Friday, 8 am to 3 pm."
        crumbs={[{ name: "Contact", href: "/contact/" }]}
      />

      <section aria-label="Ways to reach us" className="bg-ivory pt-16">
        <Stagger as="ul" className="container-x grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem as="li" key={c.title} className="bg-white p-7 shadow-soft">
              <c.icon className="h-6 w-6 text-gold-ink" aria-hidden />
              <h2 className="t-h3 mt-5">{c.title}</h2>
              <ul className="mt-3 space-y-1">
                {c.lines.map((l) => (
                  <li key={l.text}>
                    {l.href ? (
                      <a href={l.href} className="break-words font-semibold text-navy hover:text-blue" {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {l.text}
                      </a>
                    ) : (
                      <span className="font-semibold text-ink">{l.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="visit" aria-labelledby="visit-title" className="section-y scroll-mt-24 bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Plan your visit"
              title={<span id="visit-title">Finding us</span>}
              lead="Visit on any weekday between 8 am and 3 pm. A quick call first helps the office make time for you."
            />
            <Reveal className="mt-10 space-y-8">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-ink" aria-hidden />
                <address className="not-italic text-ink">{fullAddress}</address>
              </div>
              <div className="flex gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-gold-ink" aria-hidden />
                <dl className="w-full space-y-1">
                  {contact.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4">
                      <dt>{h.days}</dt>
                      <dd className="text-right font-semibold text-ink">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="eyebrow text-gold-ink">Directions</h3>
                <ol className="mt-4 list-decimal space-y-2 pl-5 marker:text-gold-ink">
                  {contact.directions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ol>
              </div>
              <ButtonLink href={contact.mapsUrl} variant="primary" arrow={false}>
                <Navigation className="h-4 w-4" aria-hidden /> Open in Google Maps
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            {contact.mapEmbed ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xs border border-line bg-ivory-2 lg:aspect-auto lg:h-full lg:min-h-[32rem]">
                <iframe
                  src={contact.mapEmbed}
                  title={`Map showing the location of ${school.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            ) : (
              <div className="flex h-full min-h-72 flex-col justify-center bg-navy p-10 text-white">
                <p className="font-display text-2xl">{fullAddress}</p>
                <ButtonLink href={contact.mapsUrl} variant="gold" className="mt-8 self-start">
                  Get directions
                </ButtonLink>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="message-title" className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Write to us"
              title={<span id="message-title">Send a message</span>}
              lead="For admissions, the admission enquiry form asks for the class you are interested in."
            />
            <Reveal className="mt-8">
              <ButtonLink href="/admissions/#enquire" variant="outline">
                Admission enquiry form
              </ButtonLink>
            </Reveal>
          </div>
          <div className="bg-ivory p-6 sm:p-10 lg:col-span-8">
            <EnquiryForm kind="general" />
          </div>
        </div>
      </section>
    </>
  );
}
