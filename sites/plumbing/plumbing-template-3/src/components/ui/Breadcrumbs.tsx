import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...crumbs];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-stone">
          {all.map((c, i) =>
            i === all.length - 1 ? (
              <li key={c.href} aria-current="page" className="font-medium text-teal">
                {c.name}
              </li>
            ) : (
              <li key={c.href} className="flex items-center gap-2">
                <Link href={c.href} className="underline-draw inline-flex min-h-8 items-center hover:text-teal">
                  {c.name}
                </Link>
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
              </li>
            ),
          )}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
