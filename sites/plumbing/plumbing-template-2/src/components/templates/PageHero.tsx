import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Label } from "@/components/ui/SectionHead";
import type { PhotoKey } from "@/lib/images";
import type { Crumb } from "@/lib/seo";

/** Charcoal opening for every inner page, with an optional offset photo. */
export function PageHero({
  crumbs,
  label,
  title,
  lead,
  photo,
  children,
}: {
  crumbs: Crumb[];
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  photo?: PhotoKey;
  children?: ReactNode;
}) {
  return (
    <section className="dark grid-lines bg-charcoal text-white">
      <div className={`shell grid gap-12 pt-8 pb-14 sm:pb-20 ${photo ? "lg:grid-cols-12 lg:items-end" : ""}`}>
        <div className={photo ? "lg:col-span-7" : "max-w-4xl"}>
          <div className="in">
            <Breadcrumbs crumbs={crumbs} />
          </div>
          <div className="in mt-10 sm:mt-14" style={{ animationDelay: "60ms" }}>
            {label ? <Label dark>{label}</Label> : null}
            <h1 className="t-h1 mt-4">{title}</h1>
            {lead ? <div className="t-lead mt-6 max-w-2xl text-gray">{lead}</div> : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
        </div>
        {photo ? (
          <div className="relative lg:col-span-5">
            <div aria-hidden="true" className="panel-in hatch absolute top-5 -right-2 -bottom-4 left-5 rounded-[var(--radius-box)] bg-blue sm:-right-4" />
            <div className="wipe relative aspect-[4/3] overflow-hidden rounded-[var(--radius-box)] bg-charcoal-3">
              <Photo name={photo} width={1000} priority sizes="(min-width: 1024px) 34vw, 100vw" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
