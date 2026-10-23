"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { SNAP } from "@/components/motion/Motion";
import { Photo } from "@/components/ui/Photo";
import type { Project, ProjectCategory } from "@/content/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}/`} className="group block h-full">
      <article className="draw-border flex h-full flex-col overflow-hidden rounded-[var(--radius-box)] border-[1.5px] border-rule bg-white transition-colors group-hover:border-charcoal">
        <div className="zoom relative aspect-[4/3] overflow-hidden bg-charcoal-3">
          <Photo name={project.photo} width={760} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
          <span className="t-label absolute top-3 left-3 rounded-[4px] bg-charcoal px-2.5 py-1.5 text-white">{project.category}</span>
        </div>
        <div className="flex flex-1 items-start justify-between gap-4 p-5">
          <div>
            <h3 className="t-h3">{project.title}</h3>
            <p className="mt-1.5 text-sm text-ink-soft">{project.summary}</p>
          </div>
          <ArrowUpRight aria-hidden="true" className="nudge-up mt-1 h-5 w-5 shrink-0 text-blue transition-transform duration-200" strokeWidth={2.2} />
        </div>
      </article>
    </Link>
  );
}

/**
 * Category filter: a toggle group of real buttons (aria-pressed). The count
 * is announced so screen-reader users know the list changed.
 */
export function ProjectGrid({
  projects,
  categories,
  limit,
}: {
  projects: Project[];
  categories: ProjectCategory[];
  limit?: number;
}) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const still = useReducedMotion();
  const id = useId();
  const used = categories.filter((c) => projects.some((p) => p.category === c));
  const shown = (filter === "All" ? projects : projects.filter((p) => p.category === filter)).slice(0, limit);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {(["All", ...used] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={filter === c}
            aria-controls={`${id}-list`}
            onClick={() => setFilter(c)}
            className="min-h-11 rounded-[var(--radius-box)] border-[1.5px] border-rule bg-white px-4 font-display text-sm font-semibold transition-colors hover:border-charcoal aria-pressed:border-charcoal aria-pressed:bg-charcoal aria-pressed:text-white"
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"} shown{filter === "All" ? "" : ` in ${filter}`}.
      </p>
      <motion.ul id={`${id}-list`} layout={!still} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.slug}
              layout={!still}
              initial={still ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: SNAP }}
            >
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
