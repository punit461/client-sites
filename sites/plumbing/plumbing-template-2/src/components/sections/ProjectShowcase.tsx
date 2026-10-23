import { ArrowLink } from "@/components/ui/Buttons";
import { SectionHead } from "@/components/ui/SectionHead";
import { projectCategories, projects } from "@/content/projects";
import { ProjectGrid } from "./ProjectGrid";

export function ProjectShowcase() {
  return (
    <section aria-labelledby="projects-title" className="section-y bg-white">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead id="projects-title" label="Project showcase" title="The work, up close." />
          <ArrowLink href="/projects/" className="shrink-0">
            All projects
          </ArrowLink>
        </div>
        <div className="mt-10">
          <ProjectGrid projects={projects} categories={projectCategories} limit={6} />
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          {projects.some((p) => p.stock)
            ? "Some photography shows representative plumbing work, not specific customer projects."
            : "Photos of our own team and work, from our Google Business Profile."}
        </p>
      </div>
    </section>
  );
}
