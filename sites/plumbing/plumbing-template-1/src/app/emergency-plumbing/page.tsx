import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { shutOffSteps, urgentExamples } from "@/components/sections/UrgentCallout";
import { PageHero } from "@/components/templates/PageHero";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business, compactHours, hoursLine, telHref } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

const emergency = business.verified.emergencyService;

export const metadata = pageMetadata({
  title: emergency ? "Emergency Plumbing" : "Urgent Plumbing Problems: What To Do",
  description: emergency
    ? `Burst pipe, active leak or overflowing toilet? Call ${business.phone.display}. What to do while you wait, and how our emergency service works.`
    : "What to do about a burst pipe, active leak or overflowing toilet — how to isolate your water safely, and how to reach us during opening hours.",
  path: "/emergency-plumbing/",
  photo: "valveGauge",
});

const situations = [
  {
    title: "Burst or split pipe",
    body: "Water spraying or pouring from a pipe. Shut off the main valve straight away, then open a low cold faucet to drain the system.",
  },
  {
    title: "Water through a ceiling",
    body: "Shut off the water and keep away from light fittings below the leak. If the ceiling is bulging, keep people out of the room.",
  },
  {
    title: "Overflowing toilet",
    body: "Close the small isolation valve on the tank's supply pipe, or the main valve, and stop flushing.",
  },
  {
    title: "Sewage backing up",
    body: "Stop using every faucet, shower and toilet in the building. Keep children and pets away from the affected area.",
  },
];

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: emergency ? "Emergency Plumbing" : "Urgent Problems", href: "/emergency-plumbing/" }]}
        eyebrow={emergency ? "Emergency plumbing" : "Urgent plumbing problems"}
        title={emergency ? "Water where it shouldn't be? Call us now." : "Urgent plumbing problem? Here's what to do first."}
        lead={
          emergency
            ? `Phone ${business.phone.display} — for emergencies, calling is always faster than a form. Below is what to do while you wait.`
            : `We don't run an out-of-hours emergency service, but during our opening hours (${compactHours()}) urgent problems are prioritized. Whatever the time, the steps below limit the damage.`
        }
        photo="valveGauge"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={telHref} icon="phone">
            Call {business.phone.display}
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="first-title" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="first-title"
              eyebrow="Right now"
              title="Stop the water, stay safe."
              lead="These steps are about limiting damage, not repairing anything. Please don't attempt repairs on pressurized pipes, gas appliances or electrics."
            />
          </div>
          <ol className="space-y-5 lg:col-span-7">
            {shutOffSteps.map((step, i) => (
              <Reveal as="li" key={step} delay={i * 0.05} className="flex gap-5 rounded-2xl border border-line bg-white p-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-copper font-display font-bold text-navy">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-navy">{step}</span>
              </Reveal>
            ))}
            <li className="on-dark flex gap-4 rounded-2xl bg-navy p-6 text-ivory">
              <Icon name="alert" className="mt-0.5 h-6 w-6 shrink-0 text-copper-soft" />
              <span>
                <strong className="font-semibold">Smell gas?</strong> Leave the building without using light switches or
                appliances, and call your gas utility&apos;s emergency line from outside. If anyone is in danger, call
                emergency services.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section aria-labelledby="situations-title" className="section-y bg-white">
        <div className="shell">
          <SectionHeading id="situations-title" eyebrow="Common situations" title="What to do, problem by problem." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {situations.map((s) => (
              <Reveal key={s.title} className="rounded-2xl border border-line bg-ivory p-6">
                <h3 className="t-h3 text-navy">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] text-slate">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="reach-title" className="section-y">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="reach-title"
              eyebrow="Reaching us"
              title={emergency ? "How our emergency line works." : "When we can help."}
            />
            <p className="mt-6 text-slate">
              {emergency
                ? "Call the number below at any time. Tell us what has happened and whether you have been able to isolate the water; we will tell you honestly when we can be with you."
                : "Phone us during opening hours and tell us it's urgent. We will talk you through making it safe and arrange a visit as soon as we reasonably can. Outside these hours, isolate the water and call us when we open."}
            </p>
            <ul className="mt-6 space-y-2">
              {urgentExamples.map((e) => (
                <li key={e} className="flex items-center gap-3 text-navy">
                  <Icon name="droplets" className="h-5 w-5 text-copper-ink" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="rounded-2xl border border-line bg-white p-7 sm:p-9">
            <p className="t-eyebrow text-copper-ink">{emergency ? "Emergency line" : "Opening hours"}</p>
            <a href={telHref} className="mt-3 block font-display text-3xl font-bold text-navy">
              {business.phone.display}
            </a>
            <ul className="mt-6 space-y-2 border-t border-line pt-6">
              {business.hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4">
                  <span className="text-slate">{h.label}</span>
                  <span className="font-semibold text-navy">{hoursLine(h)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate">{business.hoursNote}</p>
            <p className="mt-6 text-sm text-slate">
              Not urgent?{" "}
              <Link href="/request-a-quote/" className="font-semibold text-navy underline underline-offset-4">
                Request a quote online
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCta title="Once it's safe, let's fix it properly." />
    </>
  );
}
