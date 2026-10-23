import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Eyebrow } from "@/components/ui/SectionHeading";
import type { PhotoKey } from "@/lib/images";
import type { Crumb } from "@/lib/seo";

/** The opening of every inner page: breadcrumb, title, lead, optional photo. */
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
    <section className="border-b border-line">
      <div className={`shell grid gap-10 pt-8 pb-14 sm:pt-10 lg:pb-20 ${photo ? "lg:grid-cols-12 lg:items-end" : ""}`}>
        <div className={photo ? "lg:col-span-7" : "max-w-3xl"}>
          <div className="enter">
            <Breadcrumbs crumbs={crumbs} />
          </div>
          <div className="mt-10 enter" style={{ animationDelay: "60ms" }}>
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="t-h1 mt-4 text-navy">{title}</h1>
            {lead ? <div className="t-lead mt-6 max-w-2xl text-slate">{lead}</div> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
        </div>
        {photo ? (
          <div className="clip-in relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand lg:col-span-5">
            <Photo name={photo} width={1000} priority sizes="(min-width: 1024px) 30rem, 100vw" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
