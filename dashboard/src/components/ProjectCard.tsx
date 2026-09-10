import { type Project, STATUS_LABEL, siteUrl } from "@/lib/projects";

/** One project inside a category, or in the flat list on /projects. */
export default function ProjectCard({
  project,
  showNotes = true,
}: {
  project: Project;
  showNotes?: boolean;
}) {
  return (
    <article className="proj">
      <div className="proj-head">
        <div>
          <h3>{project.title}</h3>
          {project.client ? <p className="client">{project.client}</p> : null}
        </div>
        <span className={`pill ${project.status}`}>{STATUS_LABEL[project.status]}</span>
      </div>

      <p className="desc">{project.description}</p>

      {showNotes && project.notes ? <p className="notes">{project.notes}</p> : null}

      {project.tags.length > 0 ? (
        <ul className="tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}

      <div className="proj-foot">
        <code className="path" title={project.relDir}>
          {project.relDir}
        </code>
        {/* A separate app on the same origin: a real navigation, not a route change. */}
        <a
          className="btn primary"
          href={siteUrl(project)}
          target="_blank"
          rel="noreferrer"
        >
          Open site ↗
        </a>
      </div>
    </article>
  );
}
