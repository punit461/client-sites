import { Reveal } from "@/components/motion/Motion";
import { Button } from "@/components/ui/Buttons";
import { business, telHref } from "@/config/business";

export function FinalCta({ title = "Let's Get Your Plumbing Back on Track." }: { title?: string }) {
  return (
    <section aria-labelledby="final-title" className="dark grid-lines relative overflow-hidden bg-charcoal text-white">
      <div className="shell py-20 sm:py-28">
        <Reveal>
          <h2 id="final-title" className="t-mega max-w-5xl">
            {title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 border-t border-rule-dark pt-10 lg:grid-cols-12">
          <p className="t-lead text-gray lg:col-span-6">
            Send a request and we&apos;ll review it during opening hours, then contact you to talk it through. If a visit
            is needed, we confirm the time with you — and you get a clear estimate before any work starts.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <Button href="/request-a-quote/">Request an Estimate</Button>
            <Button href={telHref} variant="line-light" icon="phone">
              {business.phone.display}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
