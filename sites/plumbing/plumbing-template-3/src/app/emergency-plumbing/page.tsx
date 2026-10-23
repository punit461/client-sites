import { Item, Stagger } from "@/components/motion/Motion";
import { FinalCta } from "@/components/sections/FinalCta";
import { safetySteps, urgentExamples } from "@/components/sections/UrgentHelp";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, compactHours, hoursLine, telHref } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

const emergency = business.verified.emergencyService;

export const metadata = pageMetadata({
  title: emergency ? "Emergency Plumbing" : "Urgent Plumbing Problems: What To Do",
  description: emergency
    ? `Burst pipe or active leak? Call ${business.phone.display}. What to do while you wait.`
    : "Burst pipe, active leak or overflowing toilet? How to make it safe, and how to reach us during opening hours.",
  path: "/emergency-plumbing/",
  photo: "valveGauge",
});

const situations = [
  { title: "Burst pipe", body: "Close the main shutoff valve straight away, then open a low cold faucet to drain the pipes." },
  { title: "Leak through a ceiling", body: "Close the shutoff valve and keep clear of light fittings below. If the ceiling bulges, keep people out of the room." },
  { title: "Overflowing toilet", body: "Close the isolation valve on the tank's supply pipe — or the main valve — and stop flushing." },
  { title: "Drains backing up", body: "Stop using every faucet, shower and toilet in the building until the line is cleared." },
];

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: emergency ? "Emergency Plumbing" : "Urgent Problems", href: "/emergency-plumbing/" }]}
        eyebrow={emergency ? "Emergency plumbing" : "Urgent plumbing problems"}
        title={emergency ? "Water where it shouldn't be? Call us now." : "An urgent plumbing problem? Make it safe first."}
        lead={
          emergency
            ? `Call ${business.phone.display} — a phone call is faster than any form. Here's what to do while you wait.`
            : `We don't offer an out-of-hours emergency service. During opening hours (${compactHours()}) we prioritize urgent problems — please call. Whatever the time, these steps limit the damage.`
        }
        photo="valveGauge"
      >
        <Button href={telHref} icon="phone">
          Call {business.phone.display}
        </Button>
      </PageHero>

      <section aria-labelledby="first-title" className="section-y bg-white">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <SectionHead
            id="first-title"
            eyebrow="Right now"
            title="Stop the water, stay safe."
            lead="These steps limit damage — they aren't repairs. Please don't attempt work on pressurized pipes, gas appliances or electrics."
            className="lg:col-span-5"
          />
          <Stagger as="ol" className="space-y-3 lg:col-span-7">
            {safetySteps.map((s, i) => (
              <Item key={s} className="flex gap-5 rounded-[var(--radius-card)] bg-sage p-5 sm:p-6">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal font-display text-sm font-bold text-white">{i + 1}</span>
                <span className="pt-1 text-charcoal">{s}</span>
              </Item>
            ))}
            <li className="on-teal flex gap-4 rounded-[var(--radius-card)] bg-teal-deep p-5 text-sage sm:p-6">
              <Icon name="alert" className="mt-0.5 h-6 w-6 shrink-0 text-terracotta" strokeWidth={1.7} />
              <span>
                <strong className="text-white">Smell gas?</strong> Leave the building without using switches, and call your gas
                utility&apos;s emergency line from outside. If anyone is in danger, call emergency services.
              </span>
            </li>
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="sit-title" className="section-y bg-sand">
        <div className="shell">
          <SectionHead id="sit-title" eyebrow={urgentExamples.join(" · ")} title="Problem by problem." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {situations.map((s) => (
              <div key={s.title} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
                <h3 className="t-h3">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="hours-title" className="section-y bg-white">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <SectionHead
            id="hours-title"
            eyebrow={emergency ? "Emergency line" : "When to call"}
            title={emergency ? "Call any time." : "Call during opening hours."}
            lead={
              emergency
                ? "Tell us what happened and whether you've closed the water off. We'll tell you honestly when we can be with you."
                : "Tell us it's urgent and we'll talk you through making it safe, then arrange a visit as soon as we reasonably can."
            }
          />
          <div className="rounded-[var(--radius-photo)] bg-sage p-7 sm:p-9">
            <a href={telHref} className="font-display text-3xl font-bold text-teal hover:text-teal-soft sm:text-4xl">
              {business.phone.display}
            </a>
            <ul className="mt-6">
              {business.hours.map((h) => (
                <li key={h.label} className="flex justify-between border-b border-sage-deep py-3">
                  <span className="text-stone">{h.label}</span>
                  <span className="font-semibold text-teal">{hoursLine(h)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-stone">{business.hoursNote}</p>
          </div>
        </div>
      </section>

      <FinalCta title="Once it's safe, let's fix it properly." />
    </>
  );
}
