import type { Metadata } from "next";
import ProjectBrowser from "@/components/ProjectBrowser";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "All projects",
  description: "Every client site in the repo, searchable across categories.",
};

/** The flat view: useful once there are more categories than fit on one screen. */
export default function ProjectsPage() {
  return (
    <section className="wrap section" style={{ paddingTop: "clamp(2rem, 5vw, 3rem)" }}>
      <div className="section-head">
        <h2>All projects</h2>
        <span className="aside">Across every category</span>
      </div>

      {projects.length === 0 ? (
        <div className="notice">
          <strong>No projects yet.</strong>
          <pre>
            <code>npm run new -- &lt;category&gt;/&lt;project&gt; --from &lt;existing&gt;</code>
          </pre>
        </div>
      ) : (
        <ProjectBrowser projects={projects} />
      )}
    </section>
  );
}
