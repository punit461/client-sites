import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { business, compactHours, telHref } from "@/config/business";

export const urgentExamples = ["Burst or split pipes", "Active leaks through ceilings or walls", "Overflowing toilets", "Severe drain blockages and backups"];

export const shutOffSteps = [
  "Turn off the water at the main shutoff valve — often under the kitchen sink, in a utility area, or where the supply enters the building.",
  "Keep away from water near electrical outlets or fixtures. Only switch off power at the breaker panel if you can reach it safely with dry hands.",
  "Open a cold faucet at the lowest point to drain the remaining water from the pipes.",
  "Move valuables away from the water and take photos for your insurer.",
];

/**
 * With verified emergency cover this is an emergency callout. Without it,
 * it becomes priority help during published hours — never an implied 24/7
 * service the company does not run.
 */
export function UrgentCallout() {
  const emergency = business.verified.emergencyService;

  return (
    <section aria-labelledby="urgent-title" className="on-dark blueprint relative overflow-hidden bg-navy text-ivory">
      <div className="shell section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow dark>{emergency ? "Emergency plumbing" : "Urgent problems"}</Eyebrow>
          <h2 id="urgent-title" className="t-h2 mt-4">
            {emergency ? "Water where it shouldn't be? Call us now." : "Something urgent during opening hours? Call first."}
          </h2>
          <p className="t-lead mt-5 text-ivory/75">
            {emergency
              ? "For problems that cannot wait, phone us directly — a form is too slow when water is escaping."
              : `We prioritize urgent problems during our opening hours (${compactHours()}). Phone rather than using the form so we can talk you through it straight away.`}
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {urgentExamples.map((e) => (
              <li key={e} className="flex items-start gap-3 text-ivory/85">
                <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-copper-soft" />
                {e}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={telHref} icon="phone">
              Call {business.phone.display}
            </ButtonLink>
            <ButtonLink href="/emergency-plumbing/" variant="outline-light">
              What to do right now
            </ButtonLink>
          </div>
          {!emergency ? (
            <p className="mt-6 max-w-lg text-sm text-ivory/60">
              We do not offer an out-of-hours emergency service. Outside our hours, isolate the water and contact your water
              utility or emergency services for anything dangerous.
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-6">
          <div className="rounded-2xl border border-ivory/15 bg-navy-2/80 p-6 sm:p-8">
            <h3 className="t-h3 flex items-center gap-3 text-ivory">
              <Icon name="droplets" className="h-6 w-6 text-copper-soft" />
              If water is escaping, while you call:
            </h3>
            <ol className="mt-6 space-y-5">
              {shutOffSteps.map((step, i) => (
                <li key={step} className="flex gap-4 text-[0.95rem] text-ivory/80">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-copper font-display text-sm font-bold text-navy">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-ivory/10 pt-5 text-sm text-ivory/60">
              Smell gas? Leave the building without using switches and call your gas utility&apos;s emergency line from
              outside.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
