import { Reveal } from "@/components/motion/Motion";
import { Button } from "@/components/ui/Buttons";
import { afterRequest, business, telHref } from "@/config/business";

export function FinalCta({ title = "Let's Make Your Plumbing One Less Thing to Worry About." }: { title?: string }) {
  return (
    <section aria-labelledby="final-title" className="bg-white py-16 sm:py-20">
      <div className="shell">
        <Reveal className="on-teal relative overflow-hidden rounded-[2rem] bg-teal px-6 py-14 text-sage sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          {/* Soft organic shapes, drifting very slowly. */}
          <svg aria-hidden="true" viewBox="0 0 400 400" className="drift absolute -top-24 -right-20 h-80 text-teal-soft">
            <path fill="currentColor" d="M321 62c41 39 60 103 46 160-15 58-62 109-121 129-58 20-128 9-173-31C27 280 6 211 26 152 46 93 105 44 170 31c64-13 110-8 151 31Z" />
          </svg>
          <svg aria-hidden="true" viewBox="0 0 200 200" className="drift absolute -bottom-16 left-[40%] h-40 text-teal-deep" style={{ animationDelay: "-8s" }}>
            <path fill="currentColor" d="M156 40c22 25 26 66 7 95s-60 47-93 37-58-48-50-82 40-63 74-69 40-6 62 19Z" />
          </svg>
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <h2 id="final-title" className="t-h2 max-w-2xl">
                {title}
              </h2>
              <p className="t-lead mt-5 max-w-xl">Tell us what&apos;s happening. We&apos;ll explain it, price it, and only start when you&apos;re happy.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="/request-a-quote/" variant="light">
                  Request a Quote
                </Button>
                <Button href={telHref} variant="outline-light" icon="phone">
                  {business.phone.display}
                </Button>
              </div>
            </div>
            <div className="rounded-[var(--radius-card)] bg-teal-deep/60 p-6 lg:col-span-5">
              <p className="t-label text-white">After you send a request</p>
              <ol className="mt-4 space-y-3 text-sm">
                {afterRequest.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sand text-xs font-bold text-teal">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
