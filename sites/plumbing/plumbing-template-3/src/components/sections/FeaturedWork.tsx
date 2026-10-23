import { TextLink } from "@/components/ui/Buttons";
import { SectionHead } from "@/components/ui/SectionHead";
import { projectCategories, projects } from "@/content/projects";
import { ProjectGallery } from "./ProjectGallery";

export function FeaturedWork() {
  return (
    <section aria-labelledby="work-title" className="section-y bg-sand">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            id="work-title"
            eyebrow="Featured work"
            title="A closer look at the work."
            lead="From a single faucet to a full bathroom rough-in — each project explains what that kind of job involves."
          />
          <TextLink href="/projects/" className="shrink-0">
            All projects
          </TextLink>
        </div>
        <div className="mt-12">
          <ProjectGallery projects={projects} categories={projectCategories} limit={6} />
        </div>
        {projects.some((p) => !p.caseStudy) ? (
          <p className="mt-8 text-sm text-stone">Photography shows representative plumbing work, not specific customer projects.</p>
        ) : null}
      </div>
    </section>
  );
}
