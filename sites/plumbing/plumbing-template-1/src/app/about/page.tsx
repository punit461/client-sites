import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { Process } from "@/components/sections/Process";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { PageHero } from "@/components/templates/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: `${business.name} is a licensed, owner-led plumber in North Fort Worth, TX — open 24 hours, with honest, upfront pricing.`,
  path: "/about/",
  photo: "serviceVan",
});

export default function AboutPage() {
  const { verified, credentials } = business;
  const creds = [
    verified.licensed && {
      title: "Licensed",
      body: credentials.licenseNumber ? `Licence number ${credentials.licenseNumber}.` : "We hold the plumbing licence required where we work.",
    },
    verified.insured && { title: "Insured", body: "We carry liability insurance for the work we do. Ask us for details." },
    verified.workmanshipWarranty && {
      title: "Workmanship warranty",
      body: credentials.warrantySummary || "Our work is covered by written warranty terms, provided with your estimate.",
    },
  ].filter(Boolean) as { title: string; body: string }[];

  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", href: "/about/" }]}
        eyebrow="About us"
        title="A plumbing company built on doing what we said we would."
        lead={`${business.name} is a licensed, owner-led plumbing company in North Fort Worth, handling repairs, remodels and emergencies for homes and businesses — 24 hours a day.`}
      />

      <section aria-labelledby="story-title" className="section-y">
        <div className="shell grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="story-title" eyebrow="Who we are" title="Plumbing is a trust business." />
            <div className="mt-6 space-y-5 text-slate">
              <p>
                We work out of Eastwedge Drive in North Fort Worth and cover the neighborhoods around it, out to Keller.
                Cameron, the owner, still comes out on jobs with the team — so the person you talk to on the phone is
                usually the person who fixes the problem.
              </p>
              <p>
                The phone is answered 24 hours a day. A frozen pipe on Christmas Eve gets the same answer as a dripping
                faucet on a Tuesday afternoon: we tell you what we found, explain every detail of the repair and the
                price, and only start once you&apos;re happy.
              </p>
              <p className="text-navy">
                That&apos;s the whole pitch. If we can help with your plumbing, we will tell you. If we can&apos;t, we
                will tell you that too.
              </p>
            </div>
          </div>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand lg:col-span-6">
            <Photo name="serviceVan" width={1000} sizes="(min-width: 1024px) 36rem, 100vw" />
          </Reveal>
        </div>
      </section>

      {creds.length ? (
        <section aria-labelledby="creds-title" className="section-y bg-white">
          <div className="shell">
            <SectionHeading
              id="creds-title"
              eyebrow="Credentials"
              title={verified.insured ? "Licensed, insured and accountable." : "Licensed and accountable."}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {creds.map((c) => (
                <div key={c.title} className="rounded-2xl border border-line bg-ivory p-6">
                  <Icon name="shield" className="h-6 w-6 text-copper-ink" />
                  <h3 className="t-h3 mt-4 text-navy">{c.title}</h3>
                  <p className="mt-2 text-slate">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <WhyChooseUs />
      <Process />
      <FinalCta />
    </>
  );
}
