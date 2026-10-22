import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import JsonLd from "./JsonLd";

/** Visible trail plus BreadcrumbList structured data. The last crumb is the current page. */
export default function Breadcrumbs({ crumbs, tone = "light" }: { crumbs: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ name: "Home", href: "/" }, ...crumbs];
  const muted = tone === "light" ? "text-white/60 hover:text-white" : "text-slate hover:text-navy";
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8rem] font-medium">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className={tone === "light" ? "text-gold" : "text-gold-ink"}>
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className={`transition-colors ${muted}`}>
                    {c.name}
                  </Link>
                  <ChevronRight className={`h-3.5 w-3.5 ${tone === "light" ? "text-white/35" : "text-slate/50"}`} aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </nav>
  );
}
