import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import CtaBand from "@/components/sections/CtaBand";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProgramme, programmes } from "@/content/programmes";
import { school } from "@/content/school";
import { photoUrl } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

// Static export: every class page is generated at build time, and any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return programmes.map((p) => ({ programme: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/academics/[programme]">): Promise<Metadata> {
  const p = getProgramme((await params).programme);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} (${p.range.split(" · ")[0]})`,
    description: `${p.summary} ${p.name} at ${school.name}.`,
    path: `/academics/${p.slug}/`,
    image: photoUrl(p.photo, 1200),
  });
}

export default async function ProgrammePage({ params }: PageProps<"/academics/[programme]">) {
  const { programme } = await params;
  const p = getProgramme(programme);
  if (!p) notFound();

  const index = programmes.indexOf(p);
  const prev = programmes[index - 1];
  const next = programmes[index + 1];

  return (
    <>
      <PageHero
        eyebrow={p.range}
        title={p.name}
        lead={p.summary}
        crumbs={[
          { name: "Classes", href: "/academics/" },
          { name: p.name, href: `/academics/${p.slug}/` },
        ]}
        photo={p.photo}
      />

      <section aria-labelledby="overview-title" className="section-y bg-ivory">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Overview" title={<span id="overview-title">What this year is for.</span>} lead={p.intro} />
          </div>
          <Stagger as="ul" className="grid gap-px overflow-hidden rounded-xs bg-line sm:grid-cols-2 lg:col-span-7">
            {p.focus.map((f) => (
              <StaggerItem as="li" key={f.title} className="bg-white p-7 sm:p-8">
                <h3 className="t-h3">{f.title}</h3>
                <p className="mt-3 text-[0.97rem]">{f.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="day-title" className="section-y bg-white">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="A typical day" title={<span id="day-title">A day in {p.name}.</span>} />
            <Reveal as="ol" className="mt-10 border-l border-line">
              {p.dayInTheLife.map((d) => (
                <li key={d.time} className="relative pb-7 pl-8 last:pb-0">
                  <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-gold" />
                  <span className="font-display text-xl text-navy">{d.time}</span>
                  <span className="mt-1 block">{d.activity}</span>
                </li>
              ))}
            </Reveal>
          </div>
          <div className="space-y-12 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <h2 className="eyebrow text-gold-ink">What children do</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.subjects.map((s) => (
                  <li key={s} className="rounded-xs border border-line bg-ivory px-3 py-1.5 text-[0.9rem] text-ink">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="eyebrow text-gold-ink">Assessment & reporting</h2>
              <p className="mt-4">{p.assessment}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <nav aria-label="Other classes" className="border-t border-line bg-white">
        <div className="container-x grid sm:grid-cols-2">
          {prev ? (
            <Link href={`/academics/${prev.slug}/`} className="group flex items-center gap-4 py-8 sm:border-r sm:border-line sm:pr-8">
              <ArrowLeft className="h-5 w-5 text-gold-ink transition-transform group-hover:-translate-x-1" aria-hidden />
              <span>
                <span className="eyebrow block text-slate">Previous class</span>
                <span className="t-h3 mt-1 block">{prev.name}</span>
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block sm:border-r sm:border-line" />
          )}
          {next ? (
            <Link href={`/academics/${next.slug}/`} className="group flex items-center justify-end gap-4 py-8 text-right sm:pl-8">
              <span>
                <span className="eyebrow block text-slate">Next class</span>
                <span className="t-h3 mt-1 block">{next.name}</span>
              </span>
              <ArrowRight className="h-5 w-5 text-gold-ink transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          ) : null}
        </div>
      </nav>

      <CtaBand title={`Interested in ${p.name} at ${school.shortName}?`} />
    </>
  );
}
