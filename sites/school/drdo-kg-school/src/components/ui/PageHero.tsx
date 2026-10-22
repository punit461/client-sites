import type { ReactNode } from "react";
import type { Photo } from "@/content/types";
import type { Crumb } from "@/lib/seo";
import Breadcrumbs from "./Breadcrumbs";
import Img from "./Img";

/**
 * The opening of every interior page: a navy band with the page's single h1,
 * breadcrumbs, and an optional photograph set into the right-hand side. The
 * header floats over it, hence the generous top padding.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  photo,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: Crumb[];
  photo?: Photo;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {/* Fine architectural grid: texture without decoration. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />
      <div className="container-x relative grid gap-12 pb-16 pt-36 md:pb-20 lg:grid-cols-12 lg:items-end lg:pt-48">
        <div className={photo ? "lg:col-span-7" : "lg:col-span-10"}>
          <Breadcrumbs crumbs={crumbs} />
          <p className="eyebrow mt-10 flex items-center gap-3 text-gold">
            <span className="h-px w-8 bg-gold" aria-hidden />
            {eyebrow}
          </p>
          <h1 className="t-h1 page-enter mt-5 text-white">{title}</h1>
          {lead ? <p className="t-lead mt-6 max-w-2xl text-white/75">{lead}</p> : null}
          {children ? <div className="mt-9">{children}</div> : null}
        </div>
        {photo ? (
          <div className="relative hidden aspect-[4/5] overflow-hidden rounded-xs lg:col-span-4 lg:col-start-9 lg:block">
            <Img photo={photo} width={460} sizes="(min-width: 1024px) 30vw, 0px" preload />
          </div>
        ) : null}
      </div>
    </section>
  );
}
