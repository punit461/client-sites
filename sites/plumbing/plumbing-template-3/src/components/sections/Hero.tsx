import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHead";
import { compactHours } from "@/config/business";
import { coveredAreas, listNames } from "@/content/areas";

/**
 * Fills exactly one screen (.hero-screen in globals.css). On wide screens the
 * arched photo's height follows the viewport; on phones and tablets the photo
 * takes whatever height is left below the text.
 *
 * Entrance is CSS (.line / .enter / .unveil), so it plays as soon as the HTML
 * paints and never delays the calls to action.
 */
export function Hero() {
  const lines = [
    { text: "Good Plumbing.", delay: 100 },
    { text: "Clear Answers.", delay: 200, accent: true },
    { text: "Peace of Mind.", delay: 300 },
  ];
  return (
    <section aria-labelledby="hero-title" className="hero-screen relative flex flex-col overflow-hidden bg-sand">
      <div className="shell flex min-h-0 flex-1 flex-col gap-5 pt-[clamp(0.75rem,3vh,2rem)] pb-4 lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-12 lg:py-[clamp(1.5rem,5vh,3.5rem)]">
        <div className="shrink-0 lg:col-span-6 lg:self-center">
          <div className="enter">
            <Eyebrow>Residential &amp; Commercial Plumbing</Eyebrow>
          </div>
          <h1 id="hero-title" className="hero-title mt-[clamp(0.75rem,2.5vh,1.5rem)]">
            {lines.map((l) => (
              <span key={l.text} className="line">
                <span style={{ animationDelay: `${l.delay}ms` }}>
                  {l.accent ? (
                    <span className="relative inline-block">
                      {l.text}
                      {/* A hand-drawn water line under the promise that matters most. */}
                      <svg aria-hidden="true" viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-[0.02em] left-0 h-[0.16em] w-full text-terracotta">
                        <path d="M2 7c22-6 44 6 66 0s44-6 66 0 44 6 64 0" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </span>
                  ) : (
                    l.text
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p className="enter mt-[clamp(0.75rem,2.5vh,1.75rem)] max-w-xl text-[1rem] text-stone sm:text-[1.1rem]" style={{ animationDelay: "380ms" }}>
            Repairs, installations and maintenance for homes and businesses.
            <span className="hidden sm:inline">
              {" "}
              We explain what&apos;s wrong, talk through your options, and agree the price before any work begins.
            </span>
          </p>
          <div className="enter mt-[clamp(1rem,3vh,2.25rem)] grid gap-3 min-[360px]:grid-cols-2 sm:flex" style={{ animationDelay: "450ms" }}>
            <Button href="/request-a-quote/" className="px-3 sm:px-5">
              Request a Quote
            </Button>
            <Button href="/services/" variant="outline" className="px-3 sm:px-5">
              <span className="sm:hidden">Our Services</span>
              <span className="hidden sm:inline">Explore Our Services</span>
            </Button>
          </div>
          <p
            className="enter mt-[clamp(1rem,3vh,2rem)] hidden items-start gap-2.5 text-sm text-stone sm:flex"
            style={{ animationDelay: "520ms" }}
          >
            <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-clay" strokeWidth={1.7} />
            <span>
              Serving <span className="font-medium text-teal">{listNames(coveredAreas.map((a) => a.name))}</span> · {compactHours()}
            </span>
          </p>
        </div>

        {/* min-h-0 + flex-1 lets the photo shrink to the room that's left. */}
        <div className="hero-photo relative min-h-[7rem] flex-1 lg:col-span-6 lg:min-h-0">
          {/* Organic teal shape behind the frame, drifting very slowly. */}
          <svg aria-hidden="true" viewBox="0 0 400 400" className="drift absolute -bottom-[6%] -left-[2%] hidden h-[58%] text-teal lg:block">
            <path
              fill="currentColor"
              d="M321 62c41 39 60 103 46 160-15 58-62 109-121 129-58 20-128 9-173-31C27 280 6 211 26 152 46 93 105 44 170 31c64-13 110-8 151 31Z"
            />
          </svg>
          <svg aria-hidden="true" viewBox="0 0 200 200" className="drift absolute top-[6%] -left-6 hidden h-24 text-sage-deep lg:block" style={{ animationDelay: "-6s" }}>
            <path fill="currentColor" d="M156 40c22 25 26 66 7 95s-60 47-93 37-58-48-50-82 40-63 74-69 40-6 62 19Z" />
          </svg>
          <div className="unveil absolute inset-0 overflow-hidden rounded-[var(--radius-photo)] bg-sand-deep lg:left-[8%] lg:rounded-t-[999px]">
            <Photo name="plumberBathroom" width={1100} priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[55%_30%]" />
          </div>
          <div
            className="enter absolute bottom-[8%] left-0 hidden max-w-[16rem] rounded-[var(--radius-card)] border border-line bg-white p-4 shadow-[var(--shadow-lift)] lg:block"
            style={{ animationDelay: "750ms" }}
          >
            <p className="flex items-center gap-2 t-label text-clay">
              <Icon name="file" className="h-4 w-4" strokeWidth={1.8} />
              No surprises
            </p>
            <p className="mt-2 font-display text-[1.02rem] leading-snug font-semibold text-teal">
              You approve the price before any work begins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
