import { Reveal } from "@/components/motion/Motion";
import { FinalCta } from "@/components/sections/FinalCta";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Standard } from "@/components/sections/Standard";
import { PageHero } from "@/components/templates/PageHero";
import { Photo } from "@/components/ui/Photo";
import { SectionHead } from "@/components/ui/SectionHead";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: `${business.name}: practical plumbing from a team that puts clear communication first.`,
  path: "/about/",
  photo: "plumberUnderBasin",
});

export default function AboutPage() {
  const { verified, credentials } = business;
  const creds = [
    verified.licensed && { t: "Licensed", b: credentials.licenseNumber ? `License ${credentials.licenseNumber}.` : "We hold the plumbing license required where we work." },
    verified.insured && { t: "Insured", b: "Liability insurance in force for the work we do. Ask for details." },
    verified.workmanshipWarranty && { t: "Warranty", b: credentials.warrantySummary || "Written workmanship warranty terms come with your estimate." },
  ].filter(Boolean) as { t: string; b: string }[];

  return (
    <>
      <PageHero
        crumbs={[{ name: "About", href: "/about/" }]}
        label="About"
        title="Plumbing, explained. Then fixed."
        lead={`${business.name} handles plumbing repairs, installations and maintenance for homes and businesses — and we think how a job is communicated matters as much as the job itself.`}
        photo="plumberUnderBasin"
      />
      <section aria-labelledby="why-title" className="section-y bg-white">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead id="why-title" label="Why we exist" title="Because nobody likes chasing a plumber." />
            <div className="mt-6 space-y-4 text-lg text-ink-soft">
              <p>
                Most frustrations with tradespeople aren&apos;t about the work. They&apos;re about not knowing when someone
                will turn up, what the problem actually is, or what it&apos;s going to cost.
              </p>
              <p>
                So we built FlowForce around fixing that: agreed arrival windows, plain explanations, a written estimate
                before any work, and a tidy finish.
              </p>
              <p className="font-display text-xl font-semibold text-charcoal">Good plumbing, clearly communicated. That&apos;s it.</p>
            </div>
          </div>
          <Reveal x={24} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-box)] bg-charcoal-3 lg:col-span-6">
            <Photo name="flushPlateInstall" width={1000} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
        </div>
      </section>
      {creds.length ? (
        <section aria-labelledby="creds-title" className="section-y bg-off">
          <div className="shell">
            <SectionHead id="creds-title" label="Credentials" title="Accountable for our work." />
            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {creds.map((c) => (
                <div key={c.t} className="rounded-[var(--radius-box)] border-[1.5px] border-charcoal bg-white p-6">
                  <h3 className="t-h3">{c.t}</h3>
                  <p className="mt-2 text-ink-soft">{c.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <Standard />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
