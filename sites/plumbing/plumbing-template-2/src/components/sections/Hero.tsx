import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { Label } from "@/components/ui/SectionHead";
import { business } from "@/config/business";
import { areas, listNames } from "@/content/areas";

/**
 * Split-screen hero that fills exactly one screen (.hero-screen in
 * globals.css). On wide screens the photo's height follows the viewport; on
 * phones and tablets the text sits on top and the photo takes the height
 * that's left.
 *
 * The entrance is CSS (.mask / .in / .wipe / .panel-in), so it plays as soon
 * as the HTML paints — the calls to action are usable from the first frame.
 */
export function Hero() {
  const covered = areas.filter((a) => a.coverage === "covered").map((a) => a.name);

  return (
    <section aria-labelledby="hero-title" className="hero-screen dark grid-lines relative flex flex-col overflow-hidden bg-charcoal text-white">
      <div className="shell flex min-h-0 flex-1 flex-col gap-6 pt-[clamp(1rem,3vh,2.5rem)] pb-5 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-8 lg:py-[clamp(1.5rem,5vh,3.5rem)]">
        <div className="shrink-0 lg:col-span-7 lg:self-center">
          <div className="in">
            <Label dark>Houston plumbers · Licensed {business.credentials.licenseNumber}</Label>
          </div>
          <h1 id="hero-title" className="t-mega hero-title mt-[clamp(0.75rem,2.5vh,1.5rem)]">
            <span className="mask">
              <span style={{ animationDelay: "60ms" }}>Plumbing problems?</span>
            </span>
            <span className="mask">
              <span style={{ animationDelay: "150ms" }}>
                Let&apos;s get them{" "}
                <span className="relative isolate whitespace-nowrap">
                  flowing
                  <span aria-hidden="true" className="absolute inset-x-0 -bottom-[0.1em] -z-10 h-[0.12em] bg-lime" />
                </span>{" "}
                again.
              </span>
            </span>
          </h1>
          <p className="in mt-[clamp(0.75rem,2.5vh,2rem)] max-w-xl text-[1rem] leading-relaxed text-gray sm:text-[1.1rem]" style={{ animationDelay: "240ms" }}>
            Drain cleaning and hydro-jetting, sewer and water lines, water heaters and gas lines
            <span className="sm:hidden">.</span>
            <span className="hidden sm:inline">
              {" "}
              — from a family-owned, {business.yearsExperience}-year Houston team. Service with a Smile.
            </span>
          </p>
          <div className="in mt-[clamp(1rem,3vh,2.25rem)] grid gap-3 min-[360px]:grid-cols-2 sm:flex" style={{ animationDelay: "300ms" }}>
            <Button href="/request-a-quote/" className="px-3 sm:px-5">
              <span className="sm:hidden">Get an Estimate</span>
              <span className="hidden sm:inline">Request an Estimate</span>
            </Button>
            <Button href="/services/" variant="line-light" className="px-3 sm:px-5">
              Our Services
            </Button>
          </div>
          <div
            className="in mt-[clamp(1rem,3vh,2.5rem)] hidden gap-4 border-t border-rule-dark pt-[clamp(0.75rem,2vh,1.5rem)] text-sm sm:grid sm:grid-cols-2"
            style={{ animationDelay: "360ms" }}
          >
            <p className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lime" strokeWidth={2} aria-hidden="true" />
              <span className="text-gray">
                Serving <span className="text-white">{listNames(covered)}</span>
              </span>
            </p>
            <p className="flex items-start gap-2.5 text-gray">
              <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 bg-lime" />
              <span>
                {business.rating
                  ? `Rated ${business.rating.value}/5 from ${business.rating.count} ${business.rating.source} reviews. `
                  : null}
                <span className="text-white">Free estimates — you approve the price first.</span>
              </span>
            </p>
          </div>
        </div>

        {/* min-h-0 + flex-1 lets the photo shrink to the space that's left. */}
        <div className="hero-photo relative mr-3 min-h-[7rem] flex-1 sm:mr-6 lg:col-span-5 lg:mr-8 lg:mb-6 lg:min-h-0">
          <div
            aria-hidden="true"
            className="panel-in hatch absolute top-4 -right-3 -bottom-3 left-4 rounded-[var(--radius-box)] bg-blue sm:-right-6 lg:top-8 lg:-right-8 lg:-bottom-6 lg:left-8"
            style={{ animationDelay: "200ms" }}
          />
          <div className="wipe absolute inset-0 overflow-hidden rounded-[var(--radius-box)] bg-charcoal-3" style={{ animationDelay: "80ms" }}>
            <Photo name="teamAndVans" width={1100} priority sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover object-[50%_60%]" />
          </div>
          <div aria-hidden="true" className="panel-in absolute -top-2 -left-2 h-5 w-5 bg-lime lg:-top-3 lg:-left-3 lg:h-6 lg:w-6" style={{ animationDelay: "420ms" }} />
        </div>
      </div>
    </section>
  );
}
