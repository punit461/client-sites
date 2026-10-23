import { ButtonLink } from "@/components/ui/ArrowLink";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { compactHours, telHref } from "@/config/business";

/**
 * The hero fills exactly one screen (.hero-screen in globals.css): on wide
 * screens the photo's height follows the viewport; on phones and tablets the
 * text sits on top and the photo takes whatever height is left.
 *
 * The entrance is pure CSS (.line-mask / .enter / .clip-in) so the headline
 * and photo animate as soon as the HTML paints, without waiting for
 * JavaScript — and the reduced-motion rule turns it off.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-screen relative flex flex-col overflow-hidden">
      <div className="shell flex min-h-0 flex-1 flex-col gap-5 pt-[clamp(1rem,3vh,2rem)] pb-4 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-10 lg:py-[clamp(1.5rem,4vh,3rem)]">
        <div className="shrink-0 lg:col-span-6 lg:self-center">
          <div className="enter" style={{ animationDelay: "40ms" }}>
            <Eyebrow>Residential &amp; Commercial Plumbing</Eyebrow>
          </div>

          <h1 id="hero-title" className="t-display hero-title mt-[clamp(0.75rem,2.5vh,1.5rem)] text-navy">
            <span className="line-mask">
              <span style={{ animationDelay: "120ms" }}>Plumbing Done Right.</span>
            </span>
            <span className="line-mask">
              <span style={{ animationDelay: "230ms" }}>
                Peace of Mind <span className="text-copper-ink">Included.</span>
              </span>
            </span>
          </h1>

          <p className="enter mt-[clamp(0.75rem,2.5vh,1.75rem)] max-w-xl text-[1rem] leading-relaxed text-slate sm:text-[1.1rem]" style={{ animationDelay: "360ms" }}>
            Dependable repairs, installations and maintenance for homes and businesses.
            <span className="hidden sm:inline">
              {" "}
              We find the real cause, explain your options in plain language, and leave your space as clean as we found it.
            </span>
          </p>

          <div className="enter mt-[clamp(1rem,3vh,2.25rem)] grid gap-3 min-[360px]:grid-cols-2 sm:flex" style={{ animationDelay: "440ms" }}>
            <ButtonLink href="/request-a-quote/" className="px-3 sm:px-5">
              Request a Quote
            </ButtonLink>
            <ButtonLink href={telHref} variant="outline" icon="phone" className="px-3 sm:px-5">
              Call Our Team
            </ButtonLink>
          </div>

          <p
            className="enter mt-[clamp(1rem,3vh,2rem)] hidden max-w-md items-start gap-3 border-t border-line pt-[clamp(0.75rem,2vh,1.5rem)] text-[0.95rem] text-slate sm:flex"
            style={{ animationDelay: "520ms" }}
          >
            <Icon name="file" className="mt-0.5 h-5 w-5 shrink-0 text-copper-ink" />
            <span>
              Every job starts with a written estimate. <span className="text-navy">You approve the price before any work begins.</span>
            </span>
          </p>
        </div>

        {/* min-h-0 + flex-1 lets the photo shrink to the space that's left. */}
        <div className="hero-photo relative min-h-[7rem] flex-1 lg:col-span-6 lg:min-h-0">
          <div
            aria-hidden="true"
            className="enter absolute -right-3 -bottom-3 hidden h-[88%] w-[82%] rounded-[1.25rem] border border-copper/50 lg:-right-5 lg:-bottom-5 lg:block"
            style={{ animationDelay: "500ms" }}
          />
          <div className="clip-in absolute inset-0 overflow-hidden rounded-[1.25rem] bg-sand shadow-[var(--shadow-lift)] lg:left-auto lg:w-full lg:max-w-[34rem]">
            <Photo
              name="plumberUnderBasin"
              width={1100}
              priority
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover object-[62%_40%]"
            />
          </div>

          <div
            className="enter absolute bottom-6 left-0 hidden max-w-[17rem] rounded-xl border border-line bg-white/95 p-5 shadow-[var(--shadow-card)] backdrop-blur lg:block xl:-left-8"
            style={{ animationDelay: "720ms" }}
          >
            <p className="t-eyebrow text-copper-ink">Book an assessment</p>
            <p className="mt-2 font-display text-[1.05rem] leading-snug font-semibold text-navy">
              Repairs, installations &amp; planned maintenance
            </p>
            <p className="mt-3 flex items-start gap-2 text-sm text-slate">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{compactHours()}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
