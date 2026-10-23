import { Item, Stagger } from "@/components/motion/Motion";
import { safetySteps, urgentSituations } from "@/components/sections/EmergencyBanner";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/templates/PageHero";
import { Button } from "@/components/ui/Buttons";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, compactHours, hoursLine, telHref } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

const emergency = business.verified.emergencyService;

export const metadata = pageMetadata({
  title: emergency ? "Emergency Plumbing" : "Urgent Plumbing: What To Do First",
  description: emergency
    ? `Burst pipe or active leak? Call ${business.phone.display}. What to do while you wait.`
    : "Burst pipe, active leak or overflowing fixture? How to make it safe, and how to reach us during opening hours.",
  path: "/emergency-plumbing/",
  photo: "valveGauge",
});

const situations = [
  { title: "Burst pipe", body: "Shut off the main valve straight away, then open a low cold faucet to drain the pipes." },
  { title: "Leak through a ceiling", body: "Shut off the water. Keep clear of light fittings below. If the ceiling bulges, keep people out." },
  { title: "Overflowing fixture", body: "Close the isolation valve on its supply pipe (or the main valve). Stop flushing or running water." },
  { title: "Drains backing up", body: "Stop using every faucet, shower and toilet in the building until it's cleared." },
];

export default function EmergencyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: emergency ? "Emergency" : "Urgent problems", href: "/emergency-plumbing/" }]}
        label={emergency ? "Emergency plumbing" : "Urgent problems"}
        title={emergency ? "Water where it shouldn't be? Call now." : "Urgent problem? Make it safe first."}
        lead={
          emergency
            ? `Call ${business.phone.display}. A phone call is faster than any form — here's what to do while you wait.`
            : `We don't offer out-of-hours call-outs. During opening hours (${compactHours()}) urgent jobs are prioritized — call us. Whatever the time, these steps limit the damage.`
        }
        photo="valveGauge"
      >
        <Button href={telHref} icon="phone">
          Call {business.phone.display}
        </Button>
      </PageHero>

      <section aria-labelledby="steps-title" className="section-y bg-white">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <SectionHead
            id="steps-title"
            label="Right now"
            title="Four steps to limit the damage."
            lead="These make things safe — they're not repairs. Please don't attempt work on pressurized pipes, gas appliances or electrics."
            className="lg:col-span-5"
          />
          <Stagger as="ol" className="border-t-2 border-charcoal lg:col-span-7">
            {safetySteps.map((s, i) => (
              <Item key={s} className="flex gap-5 border-b border-rule py-6">
                <span className="font-display text-4xl font-bold leading-none text-blue">{i + 1}</span>
                <span className="font-display text-lg font-medium">{s}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="sit-title" className="dark section-y bg-charcoal text-white">
        <div className="shell">
          <SectionHead dark id="sit-title" label={urgentSituations.join(" · ")} title="Problem by problem." />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-box)] bg-rule-dark sm:grid-cols-2 lg:grid-cols-4">
            {situations.map((s) => (
              <div key={s.title} className="bg-charcoal p-6">
                <h3 className="t-h3 text-lime">{s.title}</h3>
                <p className="mt-3 text-gray">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-gray">
            <strong className="text-white">Smell gas?</strong> Leave the building without using switches and call your gas
            utility&apos;s emergency line from outside. If anyone is in danger, call emergency services.
          </p>
        </div>
      </section>

      <section aria-labelledby="hours-title" className="section-y bg-off">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <SectionHead
            id="hours-title"
            label={emergency ? "Emergency line" : "When to call"}
            title={emergency ? "Call any time." : "Call during opening hours."}
            lead={
              emergency
                ? "Tell us what happened and whether you've isolated the water. We'll tell you honestly when we can be there."
                : "Tell us it's urgent and we'll talk you through making it safe, then arrange a visit as soon as we reasonably can."
            }
          />
          <div className="rounded-[var(--radius-box)] border-[1.5px] border-charcoal bg-white p-7">
            <a href={telHref} className="block font-display text-3xl font-bold hover:text-blue sm:text-4xl">
              {business.phone.display}
            </a>
            <ul className="mt-6 border-t border-rule">
              {business.hours.map((h) => (
                <li key={h.label} className="flex justify-between border-b border-rule py-3">
                  <span className="text-ink-soft">{h.label}</span>
                  <span className="font-display font-semibold">{hoursLine(h)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-soft">{business.hoursNote}</p>
          </div>
        </div>
      </section>

      <FinalCta title="Once it's safe, let's fix it properly." />
    </>
  );
}
