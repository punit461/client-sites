import { Reveal } from "@/components/motion/Motion";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHead";
import { business, compactHours, hoursLine, telHref } from "@/config/business";

export const urgentExamples = ["Burst pipes", "Active water leaks", "Overflowing toilets", "Severe drain blockages"];

export const safetySteps = [
  "Close the main shutoff valve — often under the kitchen sink, in a utility area, or where the supply enters the building.",
  "Keep clear of water near outlets and light fittings. Switch off power at the breaker panel only if you can reach it safely and dry-handed.",
  "Open a low cold faucet to drain the water left in the pipes.",
  "Move valuables away from the water and take photos for your insurer.",
];

/**
 * Emergency plumbing information. With verified out-of-hours cover it promotes
 * the phone line; without it, it gives the same safety advice, the real
 * opening hours, and a normal service request — never an implied 24/7 service.
 */
export function UrgentHelp() {
  const emergency = business.verified.emergencyService;
  return (
    <section aria-labelledby="urgent-title" className="on-teal relative overflow-hidden bg-teal-deep text-sage">
      <svg aria-hidden="true" viewBox="0 0 600 200" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-24 w-full text-teal opacity-60">
        <path fill="currentColor" d="M0 0h600v90c-90 40-160-30-260 0S110 140 0 90Z" />
      </svg>
      <div className="shell section-y relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow light>{emergency ? "Emergency plumbing" : "When it's urgent"}</Eyebrow>
          <h2 id="urgent-title" className="t-h2 mt-4">
            {emergency ? "Water where it shouldn't be? Call us now." : "Something urgent? Here's what to do first."}
          </h2>
          <p className="t-lead mt-5">
            {emergency
              ? `For problems that can't wait, phone ${business.phone.display} — a call is always faster than a form.`
              : `We don't offer an out-of-hours emergency service. During opening hours we prioritize urgent problems, so please call rather than using the form.`}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {urgentExamples.map((e) => (
              <li key={e} className="flex items-center gap-3 text-white">
                <Icon name="droplets" className="h-5 w-5 shrink-0 text-terracotta" strokeWidth={1.7} />
                {e}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={telHref} variant="light" icon="phone">
              Call {business.phone.display}
            </Button>
            {emergency ? null : (
              <Button href="/request-a-quote/" variant="outline-light">
                Request service
              </Button>
            )}
          </div>
          {!emergency ? (
            <div className="mt-8 max-w-md text-sm">
              <dl className="grid gap-1">
                {business.hours.map((h) => (
                  <div key={h.label} className="flex justify-between gap-6 border-b border-white/10 py-2">
                    <dt>{h.label}</dt>
                    <dd className="font-semibold text-white">{hoursLine(h)}</dd>
                  </div>
                ))}
              </dl>
              <p className="pt-3">
                {business.hoursNote} Outside these hours, make it safe and contact your water utility or emergency services if
                anyone is at risk.
              </p>
            </div>
          ) : (
            <p className="mt-6 text-sm">Office hours: {compactHours()}.</p>
          )}
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-6">
          <div className="rounded-[var(--radius-photo)] bg-teal p-7 sm:p-9">
            <h3 className="t-h3 flex items-center gap-3">
              <Icon name="alert" className="h-6 w-6 text-terracotta" strokeWidth={1.7} />
              If water is escaping
            </h3>
            <ol className="mt-6 space-y-5">
              {safetySteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sand font-display text-sm font-bold text-teal">{i + 1}</span>
                  <span className="pt-1">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-white/15 pt-5 text-sm">
              Smell gas? Leave the building without using switches, then call your gas utility&apos;s emergency line from outside.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
