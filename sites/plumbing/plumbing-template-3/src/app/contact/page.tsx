import Link from "next/link";
import { Item, Stagger } from "@/components/motion/Motion";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { business, hoursLine, mailHref, telHref } from "@/config/business";
import { areas } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Call ${business.phone.display}, email us, or request a quote online. Opening hours and the areas we serve.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", href: "/contact/" }]}
        eyebrow="Contact"
        title="Talk to us about your plumbing."
        lead="For anything urgent, call. For everything else, a quote request lets you describe the job and add photos, and we'll reply during opening hours."
      />
      <section aria-label="Ways to reach us" className="section-y bg-white">
        <Stagger as="div" className="shell grid gap-4 lg:grid-cols-3">
          <Item as="div" className="on-teal flex flex-col rounded-[var(--radius-photo)] bg-teal p-7 text-sage">
            <Icon name="phone" className="h-7 w-7 text-terracotta" strokeWidth={1.6} />
            <h2 className="t-h3 mt-6">Call</h2>
            <p className="mt-1 flex-1">Best for anything urgent.</p>
            <a href={telHref} className="mt-5 font-display text-2xl font-bold text-white hover:underline">
              {business.phone.display}
            </a>
          </Item>
          <Item as="div" className="flex flex-col rounded-[var(--radius-photo)] bg-sage p-7">
            <Icon name="mail" className="h-7 w-7 text-teal" strokeWidth={1.6} />
            <h2 className="t-h3 mt-6">Email</h2>
            <p className="mt-1 flex-1 text-stone">Questions, documents and follow-ups.</p>
            <a href={mailHref} className="mt-5 font-semibold break-all text-teal underline-offset-4 hover:underline">
              {business.email}
            </a>
          </Item>
          <Item as="div" className="flex flex-col rounded-[var(--radius-photo)] border border-line bg-sand p-7">
            <Icon name="file" className="h-7 w-7 text-clay" strokeWidth={1.6} />
            <h2 className="t-h3 mt-6">Request a quote</h2>
            <p className="mt-1 flex-1 text-stone">Describe the job, add photos, and tell us what suits you.</p>
            <Button href="/request-a-quote/" className="mt-5 self-start">
              Start a request
            </Button>
          </Item>
        </Stagger>
      </section>
      <section aria-label="Hours and areas" className="bg-white pb-20">
        <div className="shell grid gap-4 lg:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-line-cool p-7">
            <h2 className="t-h3 flex items-center gap-2.5">
              <Icon name="clock" className="h-5 w-5 text-clay" />
              Opening hours
            </h2>
            <ul className="mt-4">
              {business.hours.map((h) => (
                <li key={h.label} className="flex justify-between border-b border-line-cool py-3">
                  <span className="text-muted">{h.label}</span>
                  <span className="font-semibold text-teal">{hoursLine(h)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">{business.hoursNote}</p>
            {!business.verified.emergencyService ? (
              <p className="mt-3 text-sm text-muted">
                We don&apos;t offer out-of-hours call-outs.{" "}
                <Link href="/emergency-plumbing/" className="font-semibold text-teal underline underline-offset-4">
                  What to do if a pipe bursts
                </Link>
                .
              </p>
            ) : null}
          </div>
          <div className="rounded-[var(--radius-card)] border border-line-cool p-7">
            <h2 className="t-h3 flex items-center gap-2.5">
              <Icon name="pin" className="h-5 w-5 text-clay" />
              {business.address ? "Address & areas" : "We come to you"}
            </h2>
            {business.address ? (
              <address className="mt-4 not-italic">
                {business.address.street}, {business.address.locality}, {business.address.region} {business.address.postalCode}
              </address>
            ) : (
              <p className="mt-4 text-muted">We&apos;re a mobile team with no walk-in office.</p>
            )}
            <ul className="mt-4 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link href={`/service-areas/${a.slug}/`} className="inline-flex min-h-10 items-center rounded-lg bg-sage px-3 text-sm font-semibold text-teal hover:bg-sage-deep">
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {business.demo ? (
          <p className="shell mt-6 text-sm text-muted">Template preview: the phone number and email are placeholders and don&apos;t reach a real business.</p>
        ) : null}
      </section>
    </>
  );
}
