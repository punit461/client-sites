import Link from "next/link";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...crumbs];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="t-label flex flex-wrap items-center gap-x-2 text-gray">
          {all.map((c, i) =>
            i === all.length - 1 ? (
              <li key={c.href} aria-current="page" className="text-white">
                {c.name}
              </li>
            ) : (
              <li key={c.href} className="flex items-center gap-2">
                <Link href={c.href} className="nav-line inline-flex min-h-8 items-center hover:text-white">
                  {c.name}
                </Link>
                <span aria-hidden="true">/</span>
              </li>
            ),
          )}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
