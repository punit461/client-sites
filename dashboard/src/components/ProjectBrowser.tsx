"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import {
  type Project,
  type Status,
  STATUS_LABEL,
  STATUS_ORDER,
} from "@/lib/projects";

/**
 * Search and status filtering run in the browser: the whole project list is
 * baked into the page at build time, so there is nothing to fetch and no
 * server involved — which is what lets this work on GitHub Pages.
 */
export default function ProjectBrowser({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status | "all">("all");

  const present = useMemo(() => {
    const found = new Set(projects.map((project) => project.status));
    return STATUS_ORDER.filter((value) => found.has(value));
  }, [projects]);

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (status !== "all" && project.status !== status) return false;
      if (!needle) return true;
      return [
        project.title,
        project.name,
        project.client,
        project.category,
        project.description,
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [projects, query, status]);

  return (
    <>
      <div className="controls">
        <input
          className="search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by name, client, category or tag..."
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

      <p className="aside" aria-live="polite" style={{ margin: "0 0 1rem", fontSize: "0.85rem" }}>
        {shown.length} of {projects.length} shown
      </p>

      {shown.length === 0 ? (
        <div className="notice">
          <strong>Nothing matches that.</strong>
          <span>Clear the search, or pick a different status.</span>
        </div>
      ) : (
        <div className="cards">
          {shown.map((project) => (
            <ProjectCard key={project.id} project={project} showNotes={false} />
          ))}
        </div>
      )}
    </>
  );
}
