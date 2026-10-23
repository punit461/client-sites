import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Item, Stagger } from "@/components/motion/Motion";
import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectCard } from "@/components/sections/ProjectGallery";
import { PageHero } from "@/components/templates/PageHero";
import { Button, TextLink } from "@/components/ui/Buttons";
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
  const same = projects.filter((p) => p.slug !== project.slug && p.category === project.category);
  const more = [...same, ...projects.filter((p) => p.slug !== project.slug && !same.includes(p))].slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Projects", href: "/projects/" },
          { name: project.title, href: `/projects/${project.slug}/` },
        ]}
        eyebrow={project.category}
        title={project.title}
        lead={project.summary}
        photo={project.photo}
      >
        {project.caseStudy ? null : <p className="text-sm text-stone">Representative photograph — not a specific customer&apos;s job.</p>}
      </PageHero>

      {project.caseStudy ? (
        <section aria-labelledby="case-title" className="section-y bg-white">
          <div className="shell">
            <SectionHead id="case-title" eyebrow="Case study" title="The job, start to finish." />
            <dl className="mt-10 grid gap-4 md:grid-cols-3">
              {(
                [
                  ["The issue", project.caseStudy.issue],
                  ["Work completed", project.caseStudy.work],
                  ["The outcome", project.caseStudy.outcome],
                ] as const
              ).map(([k, v], i) => (
                <div key={k} className={`rounded-[var(--radius-card)] p-6 ${i === 1 ? "bg-sage" : "border border-line-cool bg-white"}`}>
                  <dt className="t-label text-clay">{k}</dt>
                  <dd className="mt-3 text-charcoal">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="involves-title" className="section-y bg-white">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <SectionHead
            id="involves-title"
            eyebrow="What it involves"
            title="What this kind of job involves."
            lead="A general outline — every job is assessed before we give you a price."
            className="lg:col-span-5"
          />
          <Stagger as="ol" className="space-y-3 lg:col-span-7">
            {project.involves.map((step, i) => (
              <Item key={step} className="flex items-center gap-5 rounded-[var(--radius-card)] bg-sage p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal font-display text-sm font-bold text-white">{i + 1}</span>
                <span className="text-charcoal">{step}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {service ? (
        <section aria-labelledby="svc-title" className="bg-sand">
          <div className="shell flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="t-label text-clay">Related service</p>
              <h2 id="svc-title" className="t-h2 mt-2">
                {service.name}
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`/request-a-quote/?service=${service.slug}`}>Request a Quote</Button>
              <Button href={`/services/${service.slug}/`} variant="outline">
                About this service
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="more-title" className="section-y bg-white">
        <div className="shell">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <SectionHead id="more-title" eyebrow="More projects" title="Keep exploring." />
            <TextLink href="/projects/">All projects</TextLink>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
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
