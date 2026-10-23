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
  description: `${business.name} is a family-owned, 5th-generation plumbing company in Houston, TX — ${business.yearsExperience} years' experience, licensed and insured. Service with a Smile.`,
  path: "/about/",
  photo: "teamAndVans",
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
        title="Five generations of plumbing. One Houston family."
        lead={`${business.name} is a family-owned and operated plumbing company serving homes and businesses across Houston, with ${business.yearsExperience} years of experience behind every job.`}
        photo="teamAndVans"
      />
      <section aria-labelledby="why-title" className="section-y bg-white">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead id="why-title" label="Who we are" title="Plumbing is part of our family history." />
            <div className="mt-6 space-y-4 text-lg text-ink-soft">
              <p>
                We&apos;re a 5th-generation plumbing company, fully licensed and insured, working from our office in Spring
                Branch. Our {business.yearsExperience} years of experience let us diagnose problems quickly and fix them
                properly — from drain cleaning to hydro-jetting, sewer lines to water heaters.
              </p>
              <p>
                You may know us by our earlier name, {business.formerName}. The name on the vans changed; the licence
                number on them didn&apos;t. Our office picks up from 5am, seven days a week, and
                every job is priced at fair, competitive rates.
              </p>
              <p className="font-display text-xl font-semibold text-charcoal">{business.tagline} — every job, every time.</p>
            </div>
          </div>
          <Reveal x={24} className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-box)] bg-charcoal-3 lg:col-span-6">
            <Photo name="officeDispatch" width={1000} sizes="(min-width: 1024px) 45vw, 100vw" />
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
