"use client";

import { useMemo, useState } from "react";
import {
  type Category,
  type Project,
  type Status,
  STATUS_LABEL,
  STATUS_ORDER,
  urlFor,
} from "@/lib/projects";

/**
 * Search and status filtering happen in the browser. The whole project list is
 * baked into the page at build time, so there is nothing to fetch and no
 * server involved — which is what lets this run on GitHub Pages.
 */
export default function ProjectBrowser({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");

  const present = useMemo(() => {
    const found = new Set(categories.flatMap((c) => c.projects.map((p) => p.status)));
    return STATUS_ORDER.filter((s) => found.has(s));
  }, [categories]);

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = (project: Project) => {
      if (status !== "all" && project.status !== status) return false;
      if (!needle) return true;
      return [project.title, project.name, project.client, project.description, ...project.tags]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    };

    return categories
      .map((category) => ({ ...category, projects: category.projects.filter(matches) }))
      .filter((category) => category.projects.length > 0);
  }, [categories, query, status]);

  const shown = groups.reduce((n, group) => n + group.projects.length, 0);

  return (
    <>
      <div className="wrap controls">
        <input
          className="search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search projects, clients, tags..."
          aria-label="Search projects"
        />
        <div className="chips">
          <button
            type="button"
            className="chip"
            aria-pressed={status === "all"}
            onClick={() => setStatus("all")}
          >
            All
          </button>
          {present.map((value) => (
            <button
              key={value}
              type="button"
              className="chip"
              aria-pressed={status === value}
              onClick={() => setStatus(value)}
            >
              {STATUS_LABEL[value]}
            </button>
          ))}
        </div>
      </div>

      {groups.map((category) => (
        <section className="wrap group" key={category.id}>
          <div className="group-head">
            <h2>{category.name}</h2>
            <span className="n">
              {category.projects.length}{" "}
              {category.projects.length === 1 ? "project" : "projects"}
            </span>
          </div>
          {category.description ? <p className="note">{category.description}</p> : null}

          <div className="grid">
            {category.projects.map((project) => (
              <article className="card" key={project.id}>
                <div className="card-head">
                  <div>
                    <h3>{project.title}</h3>
                    {project.client ? <p className="client">{project.client}</p> : null}
                  </div>
                  <span className={`badge ${project.status}`}>
                    {STATUS_LABEL[project.status]}
                  </span>
                </div>

                <p className="desc">{project.description}</p>

                {project.tags.length > 0 ? (
                  <ul className="tags">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                ) : null}

                <div className="card-foot">
                  <code className="path" title={project.relDir}>
                    {project.relDir}
                  </code>
                  {/* A separate app, so a real page load — not a client-side route. */}
                  <a className="open" href={urlFor(project)} target="_blank" rel="noreferrer">
                    Open site
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {shown === 0 ? (
        <div className="wrap">
          <p className="empty">
            <strong>Nothing matches that.</strong>
            Clear the search, or pick a different status.
          </p>
        </div>
      ) : null}
    </>
  );
}
