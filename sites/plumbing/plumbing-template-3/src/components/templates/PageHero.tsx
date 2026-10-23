import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHead";
import type { PhotoKey } from "@/lib/images";
import type { Crumb } from "@/lib/seo";

/** Sand opening for every inner page, with an optional arched photo. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  photo,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  photo?: PhotoKey;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-sand">
      <div className={`shell grid gap-10 pt-6 pb-14 sm:pb-20 ${photo ? "lg:grid-cols-12 lg:items-end" : ""}`}>
        <div className={photo ? "lg:col-span-7" : "max-w-3xl"}>
          <div className="enter">
            <Breadcrumbs crumbs={crumbs} />
          </div>
          <div className="enter mt-10 sm:mt-12" style={{ animationDelay: "60ms" }}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="t-h1 mt-4">{title}</h1>
            {lead ? <div className="t-lead mt-6 max-w-2xl text-stone">{lead}</div> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
        </div>
        {photo ? (
          <div className="relative lg:col-span-5">
            <svg aria-hidden="true" viewBox="0 0 200 200" className="drift absolute -right-8 -bottom-10 hidden h-56 text-sage-deep lg:block">
              <path fill="currentColor" d="M156 40c22 25 26 66 7 95s-60 47-93 37-58-48-50-82 40-63 74-69 40-6 62 19Z" />
            </svg>
            <div className="unveil relative aspect-[4/3] overflow-hidden rounded-[var(--radius-photo)] bg-sand-deep lg:aspect-[4/5] lg:rounded-t-[999px]">
              <Photo name={photo} width={1000} priority sizes="(min-width: 1024px) 34vw, 100vw" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
