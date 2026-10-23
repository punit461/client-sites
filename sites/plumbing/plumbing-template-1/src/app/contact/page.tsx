import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/templates/PageHero";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { business, hoursLine, mailHref, telHref } from "@/config/business";
import { areas } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Call ${business.phone.display}${mailHref ? ", email us," : ""} or request a quote online. Opening hours and the areas we cover.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", href: "/contact/" }]}
        eyebrow="Contact"
        title="Talk to us about your plumbing."
        lead="For anything urgent, call. For everything else, a quote request lets you describe the problem and attach photos, and we will come back to you during opening hours."
      />

      <section aria-label="Ways to contact us" className="section-y">
        <div className={`shell grid gap-5 ${mailHref ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          <Reveal className="flex flex-col rounded-2xl border border-line bg-white p-7">
            <Icon name="phone" className="h-7 w-7 text-copper-ink" />
            <h2 className="t-h3 mt-5 text-navy">Call</h2>
            <p className="mt-2 flex-1 text-slate">Best for urgent problems and quick questions.</p>
            <a href={telHref} className="mt-5 font-display text-2xl font-bold text-navy link-underline self-start">
              {business.phone.display}
            </a>
          </Reveal>
          {mailHref ? (
            <Reveal delay={0.05} className="flex flex-col rounded-2xl border border-line bg-white p-7">
              <Icon name="mail" className="h-7 w-7 text-copper-ink" />
              <h2 className="t-h3 mt-5 text-navy">Email</h2>
              <p className="mt-2 flex-1 text-slate">For general questions, documents and follow-ups.</p>
              <a href={mailHref} className="mt-5 self-start break-all font-semibold text-navy link-underline">
                {business.email}
              </a>
            </Reveal>
          ) : null}
          <Reveal delay={0.1} className="on-dark flex flex-col rounded-2xl bg-navy p-7 text-ivory">
            <Icon name="file" className="h-7 w-7 text-copper-soft" />
            <h2 className="t-h3 mt-5">Request a quote</h2>
            <p className="mt-2 flex-1 text-ivory/75">Describe the job, add photos, and tell us when suits you.</p>
            <ButtonLink href="/request-a-quote/" className="mt-5 self-start">
              Start a request
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section aria-label="Hours and areas" className="pb-20 sm:pb-28">
        <div className="shell grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-7">
            <h2 className="t-h3 flex items-center gap-3 text-navy">
              <Icon name="clock" className="h-6 w-6 text-copper-ink" />
              Opening hours
            </h2>
            <ul className="mt-5 space-y-2">
              {business.hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4 border-b border-line pb-2">
                  <span className="text-slate">{h.label}</span>
                  <span className="font-semibold text-navy">{hoursLine(h)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate">{business.hoursNote}</p>
            {!business.verified.emergencyService ? (
              <p className="mt-4 text-sm text-slate">
                We don&apos;t offer an out-of-hours emergency service.{" "}
                <Link href="/emergency-plumbing/" className="font-semibold text-navy underline underline-offset-4">
                  What to do if a pipe bursts
                </Link>
                .
              </p>
            ) : null}
          </div>
          <div className="rounded-2xl border border-line bg-white p-7">
            <h2 className="t-h3 flex items-center gap-3 text-navy">
              <Icon name="pin" className="h-6 w-6 text-copper-ink" />
              {business.address ? "Address & areas" : "Where we work"}
            </h2>
            {business.address ? (
              <address className="mt-5 not-italic text-navy">
                {business.address.street}
                <br />
                {business.address.locality}, {business.address.region} {business.address.postalCode}
              </address>
            ) : (
              <p className="mt-5 text-slate">We are a mobile service — we come to you. There is no walk-in office.</p>
            )}
            <ul className="mt-5 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/service-areas/${a.slug}/`}
                    className="inline-flex min-h-10 items-center rounded-md border border-line px-3 text-sm font-semibold text-navy hover:border-navy"
                  >
                    {a.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {business.demo ? (
          <p className="shell mt-6 text-sm text-slate">
            Template preview: the phone number and email above are placeholders and do not reach a real business.
          </p>
        ) : null}
      </section>
    </>
  );
}
