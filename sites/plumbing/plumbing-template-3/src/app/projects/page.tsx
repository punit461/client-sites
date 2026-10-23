import { FinalCta } from "@/components/sections/FinalCta";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { PageHero } from "@/components/templates/PageHero";
import { projectCategories, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Residential repairs, bathroom installations, water heaters, pipe replacement and commercial plumbing.",
  path: "/projects/",
  photo: "roughIn",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Projects", href: "/projects/" }]}
        eyebrow="Featured work"
        title="A closer look at the work."
        lead="Filter by type of work. Each project explains what that kind of job involves and links to the service behind it."
      />
      <section aria-labelledby="grid-title" className="section-y bg-white">
        <div className="shell">
          <h2 id="grid-title" className="sr-only">
            Projects
          </h2>
          <ProjectGallery projects={projects} categories={projectCategories} />
          {projects.some((p) => !p.caseStudy) ? (
            <p className="mt-10 max-w-2xl text-sm text-muted">
              Photography shows representative plumbing work, not specific customer projects. Case studies are published
              only for real jobs, with the customer&apos;s agreement.
            </p>
          ) : null}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
