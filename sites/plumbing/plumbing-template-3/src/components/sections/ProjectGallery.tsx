"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useId, useState } from "react";
import { FLOW } from "@/components/motion/Motion";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import type { Project, ProjectCategory } from "@/content/types";

export function ProjectCard({ project, tall = false }: { project: Project; tall?: boolean }) {
  return (
    <Link href={`/projects/${project.slug}/`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className={`zoom relative overflow-hidden rounded-[var(--radius-photo)] bg-sand-deep ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
          <Photo name={project.photo} width={800} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
          <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-teal">{project.category}</span>
        </div>
        <div className="flex items-start justify-between gap-4 px-1 pt-4">
          <div>
            <h3 className="t-h3 group-hover:text-teal-soft">{project.title}</h3>
            <p className="mt-1 text-sm text-muted">{project.summary}</p>
          </div>
          <span aria-hidden="true" className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sage text-teal transition-colors group-hover:bg-teal group-hover:text-white">
            <Icon name="arrowUpRight" className="h-4 w-4" strokeWidth={1.8} />
          </span>
        </div>
      </article>
    </Link>
  );
}

/**
 * A filterable gallery. The filter only appears when at least three
 * categories have content — two or fewer isn't worth the extra controls.
 * Buttons use aria-pressed; the result count is announced politely.
 */
export function ProjectGallery({ projects, categories, limit }: { projects: Project[]; categories: ProjectCategory[]; limit?: number }) {
  const [filter, setFilter] = useState<ProjectCategory | "All">("All");
  const still = useReducedMotion();
  const id = useId();
  const used = categories.filter((c) => projects.some((p) => p.category === c));
  const showFilter = used.length >= 3;
  const shown = (filter === "All" ? projects : projects.filter((p) => p.category === filter)).slice(0, limit);

  return (
    <div>
      {showFilter ? (
        <>
          <div
            role="group"
            aria-label="Filter projects by category"
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {(["All", ...used] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                aria-controls={`${id}-list`}
                onClick={() => setFilter(c)}
                className="min-h-11 shrink-0 rounded-xl border border-line-cool bg-white px-4 text-sm font-semibold text-teal transition-colors hover:border-teal aria-pressed:border-teal aria-pressed:bg-teal aria-pressed:text-white"
              >
                {c}
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
            {filter === "All" ? "" : ` in ${filter}`}.
          </p>
        </>
      ) : null}
      <motion.ul id={`${id}-list`} layout={!still} className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 ${showFilter ? "mt-10" : ""}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.slug}
              layout={!still}
              initial={still ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.32, ease: FLOW }}
            >
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
