import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Item, Stagger } from "@/components/motion/Motion";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectCard } from "@/components/sections/ProjectGrid";
import { PageHero } from "@/components/templates/PageHero";
import { ArrowLink, Button } from "@/components/ui/Buttons";
import { SectionHead } from "@/components/ui/SectionHead";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: `${p.summary} ${p.category}.`, path: `/projects/${p.slug}/`, photo: p.photo });
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const service = getService(project.service);
  const more = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);
  const fill = projects.filter((p) => p.slug !== project.slug && !more.includes(p)).slice(0, 3 - more.length);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Projects", href: "/projects/" },
          { name: project.title, href: `/projects/${project.slug}/` },
        ]}
        label={project.category}
        title={project.title}
        lead={project.summary}
        photo={project.photo}
      >
        {project.caseStudy ? null : project.stock ? (
          <p className="text-sm text-gray">Representative photograph — not a specific customer&apos;s job.</p>
        ) : (
          <p className="text-sm text-gray">Photo from our Google Business Profile.</p>
        )}
      </PageHero>

      {project.caseStudy ? (
        <section aria-labelledby="case-title" className="section-y bg-white">
          <div className="shell">
            <SectionHead id="case-title" label="Case study" title="The job." />
            <dl className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-box)] bg-rule md:grid-cols-3">
              {(
                [
                  ["The problem", project.caseStudy.problem],
                  ["The work", project.caseStudy.work],
                  ["The outcome", project.caseStudy.outcome],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="bg-white p-6">
                  <dt className="t-label text-blue">{k}</dt>
                  <dd className="mt-3">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="involves-title" className="section-y bg-off">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <SectionHead
            id="involves-title"
            label="What it involves"
            title="What this kind of job involves."
            lead="A general outline — every job is assessed on site before we give you a price."
            className="lg:col-span-5"
          />
          <Stagger as="ol" className="border-t-2 border-charcoal lg:col-span-7">
            {project.involves.map((step, i) => (
              <Item key={step} className="flex items-center gap-5 border-b border-rule py-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[4px] bg-charcoal font-display font-bold text-white">
                  {i + 1}
                </span>
                <span className="font-display text-lg font-medium">{step}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {service ? (
        <section aria-labelledby="svc-title" className="dark bg-blue text-white">
          <div className="shell flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="t-label text-white">Related service</p>
              <h2 id="svc-title" className="t-h2 mt-2">
                {service.name}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`/request-a-quote/?service=${service.slug}`} variant="lime">
                Get an estimate
              </Button>
              <Button href={`/services/${service.slug}/`} variant="line-light">
                About this service
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="more-title" className="section-y bg-white">
        <div className="shell">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead id="more-title" label="More projects" title="Keep looking." />
            <ArrowLink href="/projects/">All projects</ArrowLink>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...more, ...fill].map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
