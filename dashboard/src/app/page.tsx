import ProjectBrowser from "@/components/ProjectBrowser";
import { basePath, categories, projects, site } from "@/lib/projects";

export default function Home() {
  const live = projects.filter((project) => project.status !== "template").length;

  return (
    <>
      <div className="wrap hero">
        <h1>{site.title}</h1>
        <p>{site.tagline}</p>
        <p className="counts">
          <span>
            <b>{projects.length}</b> projects
          </span>
          <span>
            <b>{categories.length}</b> categories
          </span>
          <span>
            <b>{live}</b> for clients
          </span>
          <span>
            <b>{projects.length - live}</b> templates
          </span>
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="wrap">
          <p className="empty">
            <strong>No projects yet.</strong>
            Add one with <code>npm run new -- &lt;category&gt;/&lt;project&gt;</code>.
          </p>
        </div>
      ) : (
        <ProjectBrowser categories={categories} />
      )}

      <footer className="foot">
        <div className="wrap">
          <p>
            Every card is its own Next.js app, exported to static files and published
            under <code>{basePath || "/"}</code>.
          </p>
          <p>
            Not built yet? Run <code>npm run build</code> at the repo root, then{" "}
            <code>npm run preview</code>.
          </p>
        </div>
      </footer>
    </>
  );
}
