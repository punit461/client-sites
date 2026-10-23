import { TriangleAlert } from "lucide-react";
import { Reveal } from "@/components/motion/Motion";
import { Button } from "@/components/ui/Buttons";
import { business, compactHours, mailHref, telHref } from "@/config/business";

export const urgentSituations = ["Burst pipes", "Active leaks", "Overflowing fixtures", "Serious drain backups"];

export const safetySteps = [
  "Turn off the main shutoff valve — often under the kitchen sink or where the supply enters the building.",
  "Keep clear of water near outlets and light fittings.",
  "Open a low cold faucet to drain what's left in the pipes.",
  "Move valuables out of the way and take photos for your insurer.",
];

/**
 * With verified emergency cover: an emergency banner with the phone number.
 * Without it: an urgent-help-during-opening-hours banner that never implies
 * out-of-hours service.
 */
export function EmergencyBanner() {
  const emergency = business.verified.emergencyService;
  return (
    <section aria-labelledby="urgent-title" className="dark relative overflow-hidden bg-blue text-white">
      <div aria-hidden="true" className="hatch absolute inset-y-0 right-0 hidden w-[38%] lg:block" />
      <div className="shell relative grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="t-label flex items-center gap-2 text-white">
            <TriangleAlert className="h-4 w-4 text-lime" strokeWidth={2.2} aria-hidden="true" />
            {emergency ? "Emergency plumbing" : "Urgent problem?"}
          </p>
          <h2 id="urgent-title" className="t-h2 mt-4">
            {emergency ? "Water where it shouldn't be? Call now." : "Need help fast? Call us during opening hours."}
          </h2>
          <p className="t-lead mt-5 max-w-2xl text-white">
            {emergency
              ? `${urgentSituations.join(", ")} — call ${business.phone.display}. A phone call is faster than any form.`
              : `${urgentSituations.join(", ")}: we prioritize urgent jobs during opening hours (${compactHours()}). Call rather than using the form so we can talk you through it.`}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={telHref} variant="lime" icon="phone">
              Call {business.phone.display}
            </Button>
            {emergency || !mailHref ? null : (
              <Button href={mailHref} variant="line-light" icon={null}>
                Email us
              </Button>
            )}
          </div>
          {!emergency ? (
            <p className="mt-5 max-w-xl text-sm text-white">
              We don&apos;t offer out-of-hours emergency call-outs. Outside our hours, make it safe and contact your water
              utility or emergency services if anyone is at risk.
            </p>
          ) : null}
        </Reveal>
        <Reveal x={24} delay={0.06} className="lg:col-span-5">
          <div className="rounded-[var(--radius-box)] bg-charcoal p-6 sm:p-8">
            <h3 className="t-label text-lime">While you wait: make it safe</h3>
            <ol className="mt-5 space-y-4">
              {safetySteps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="font-display text-2xl font-bold leading-none text-white">{i + 1}</span>
                  <span className="text-gray">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-rule-dark pt-4 text-sm text-gray">
              Smell gas? Leave the building without using switches, then call your gas utility&apos;s emergency line from
              outside.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
