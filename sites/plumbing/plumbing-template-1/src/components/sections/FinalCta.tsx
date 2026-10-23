import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ArrowLink";
import { Photo } from "@/components/ui/Photo";
import { business, telHref } from "@/config/business";

export function FinalCta({
  title = "Let's get your plumbing sorted, properly.",
  body = "Tell us what's going on and we'll come back to you to talk it through. You'll know the price before any work begins.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <div className="shell">
        <Reveal className="on-dark relative overflow-hidden rounded-[1.5rem] bg-navy text-ivory">
          <div className="grid lg:grid-cols-12">
            <div className="relative z-10 p-8 sm:p-12 lg:col-span-7 lg:p-16">
              <h2 id="cta-title" className="t-h2 max-w-xl">
                {title}
              </h2>
              <p className="t-lead mt-5 max-w-lg text-ivory/75">{body}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/request-a-quote/">Request a Quote</ButtonLink>
                <ButtonLink href={telHref} variant="outline-light" icon="phone">
                  {business.phone.display}
                </ButtonLink>
              </div>
            </div>
            <div className="relative min-h-[14rem] lg:col-span-5 lg:min-h-full">
              <Photo name="clawfootShower" width={900} sizes="(min-width: 1024px) 32rem, 100vw" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent lg:bg-gradient-to-r lg:from-navy lg:via-navy/20" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
