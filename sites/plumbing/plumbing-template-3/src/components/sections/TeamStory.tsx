import { Item, Reveal, Stagger } from "@/components/motion/Motion";
import { Button } from "@/components/ui/Buttons";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import { business, serves } from "@/config/business";
import { coveredAreas, listNames } from "@/content/areas";

/**
 * The company, in its own words. The story paragraphs come from
 * `business.story` — when it's empty, this section talks about how the company
 * works and who it serves instead of inventing a history. Credentials appear
 * only once verified in the config.
 */
export function TeamStory({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { story, verified, credentials } = business;
  const creds = [
    verified.licensed && (credentials.licenseNumber ? `Licensed plumbers · ${credentials.licenseNumber}` : "Licensed plumbers"),
    verified.insured && "Fully insured",
    verified.workmanshipWarranty && (credentials.warrantySummary || "Written workmanship warranty"),
  ].filter(Boolean) as string[];

  return (
    <section aria-labelledby="story-title" className="section-y bg-white">
      <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <SectionHead
            as={headingLevel}
            id="story-title"
            eyebrow={`About ${business.shortName}`}
            title={story.length ? "Our story." : "Plumbing, done the considerate way."}
          />
          <div className="mt-6 space-y-4 text-lg text-stone">
            {story.length ? (
              story.map((p) => <p key={p}>{p}</p>)
            ) : (
              <>
                <p>
                  Inviting a plumber into your home or business means trusting them with your space, your time and your
                  budget. We built {business.name} around earning that trust: clear explanations, prices agreed before any
                  work, and a tidy finish.
                </p>
                <p>
                  We work in {listNames(coveredAreas.map((a) => a.name))}, for homes and businesses alike — from a dripping
                  faucet to a full bathroom.
                </p>
              </>
            )}
          </div>
          <Stagger className="mt-8 flex flex-wrap gap-2">
            {serves.map((s) => (
              <Item key={s} className="rounded-full bg-sage px-4 py-2 text-sm font-medium text-teal">
                {s}
              </Item>
            ))}
          </Stagger>
          {creds.length ? (
            <ul className="mt-6 space-y-2">
              {creds.map((c) => (
                <li key={c} className="flex items-center gap-2.5 font-medium text-teal">
                  <Icon name="shield" className="h-5 w-5 text-clay" />
                  {c}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/about/" variant="outline">
              More about us
            </Button>
            <Button href="/request-a-quote/">Request a Quote</Button>
          </div>
        </div>
        <Reveal className="relative order-1 lg:order-2 lg:col-span-6">
          <div className="grid grid-cols-5 gap-4">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[var(--radius-photo)] bg-sand-deep">
              <Photo name="plumberUnderBasin" width={700} sizes="(min-width: 1024px) 28vw, 60vw" className="object-cover object-[65%_50%]" />
            </div>
            <div className="col-span-2 flex flex-col gap-4 pt-10">
              <div className="relative aspect-square overflow-hidden rounded-t-[999px] rounded-b-[var(--radius-card)] bg-sand-deep">
                <Photo name="bathroomWhite" width={500} sizes="(min-width: 1024px) 18vw, 40vw" />
              </div>
              <div className="rounded-[var(--radius-card)] bg-teal p-4 text-sage">
                <p className="font-display text-sm font-semibold text-white">Our promise</p>
                <p className="mt-1 text-sm">Clear answers before any work begins.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
