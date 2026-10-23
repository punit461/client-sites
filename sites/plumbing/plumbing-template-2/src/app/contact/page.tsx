import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Item, Stagger } from "@/components/motion/Motion";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { business, hoursLine, mailHref, telHref } from "@/config/business";
import { areas } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Call ${business.phone.display}${mailHref ? ", email us," : ""} or request an estimate online. Hours and service areas.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", href: "/contact/" }]}
        label="Contact"
        title="Talk to a plumber."
        lead="Urgent? Call. Everything else: an estimate request lets you describe the job and add photos, and we'll get back to you during opening hours."
      />
      <section aria-label="Ways to reach us" className="section-y bg-white">
        <Stagger as="div" className={`shell grid gap-3 ${mailHref ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          <Item as="div" className="flex flex-col rounded-[var(--radius-box)] bg-charcoal p-7 text-white">
            <Phone className="h-7 w-7 text-lime" strokeWidth={1.8} aria-hidden="true" />
            <h2 className="t-label mt-6 text-gray">Call</h2>
            <a href={telHref} className="mt-2 font-display text-3xl font-bold hover:text-lime">
              {business.phone.display}
            </a>
            <p className="mt-3 text-gray">Best for anything urgent.</p>
          </Item>
          {mailHref ? (
            <Item as="div" className="flex flex-col rounded-[var(--radius-box)] border-[1.5px] border-rule p-7">
              <Mail className="h-7 w-7 text-blue" strokeWidth={1.8} aria-hidden="true" />
              <h2 className="t-label mt-6 text-ink-soft">Email</h2>
              <a href={mailHref} className="mt-2 break-all font-display text-xl font-bold hover:text-blue">
                {business.email}
              </a>
              <p className="mt-3 text-ink-soft">Questions, documents and follow-ups.</p>
            </Item>
          ) : null}
          <Item as="div" className="flex flex-col rounded-[var(--radius-box)] bg-blue p-7 text-white">
            <h2 className="t-label text-white">Estimate</h2>
            <p className="mt-2 flex-1 font-display text-2xl font-bold">Describe the job, add photos, pick a time that suits.</p>
            <Button href="/request-a-quote/" variant="lime" className="mt-6 self-start">
              Request an Estimate
            </Button>
          </Item>
        </Stagger>
      </section>
      <section aria-label="Hours and areas" className="bg-off pb-20 pt-4 sm:pt-0">
        <div className="shell grid gap-3 pt-0 lg:grid-cols-2">
          <div className="rounded-[var(--radius-box)] border-[1.5px] border-rule bg-white p-7">
            <h2 className="t-h3">Opening hours</h2>
            <ul className="mt-4 border-t border-rule">
              {business.hours.map((h) => (
                <li key={h.label} className="flex justify-between border-b border-rule py-3">
                  <span className="text-ink-soft">{h.label}</span>
                  <span className="font-display font-semibold">{hoursLine(h)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-soft">{business.hoursNote}</p>
            {!business.verified.emergencyService ? (
              <p className="mt-3 text-sm text-ink-soft">
                No out-of-hours call-outs.{" "}
                <Link href="/emergency-plumbing/" className="font-semibold text-charcoal underline underline-offset-4">
                  What to do in an urgent situation
                </Link>
                .
              </p>
            ) : null}
          </div>
          <div className="rounded-[var(--radius-box)] border-[1.5px] border-rule bg-white p-7">
            <h2 className="t-h3 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue" strokeWidth={2} aria-hidden="true" />
              {business.address ? "Address & areas" : "We come to you"}
            </h2>
            {business.address ? (
              <address className="mt-4 not-italic">
                {business.address.street}, {business.address.locality}, {business.address.region} {business.address.postalCode}
              </address>
            ) : (
              <p className="mt-4 text-ink-soft">
                Our plumbers come to your home or business. Call or request an estimate to book a visit.
              </p>
            )}
            <ul className="mt-4 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}/`}
                    className="inline-flex min-h-10 items-center rounded-[4px] border-[1.5px] border-rule px-3 font-display text-sm font-semibold hover:border-charcoal"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {business.demo ? (
          <p className="shell mt-6 text-sm text-ink-soft">
            Template preview: the phone number and email are placeholders and don&apos;t reach a real business.
          </p>
        ) : null}
      </section>
    </>
  );
}
