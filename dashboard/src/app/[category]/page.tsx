import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryTile from "@/components/CategoryTile";
import ProjectCard from "@/components/ProjectCard";
import { categories, findCategory } from "@/lib/projects";

type Params = { category: string };

/**
 * One page per category. Required by output: "export" — a dynamic route with
 * no generateStaticParams cannot be exported.
 *
 * These pages land at _site/<category>/index.html, right beside the published
 * projects at _site/<category>/<project>/. Sibling paths, no conflict — which
 * is why a category can own its natural URL. tools/projects.mjs keeps category
 * folders from being named after one of this app's other pages.
 */
export function generateStaticParams(): Params[] {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category: id } = await params;
  const category = findCategory(id);
  if (!category) return { title: "Not found" };

  return {
    title: category.name,
    description:
      category.description ||
      `${category.projects.length} site${category.projects.length === 1 ? "" : "s"} in ${category.name}.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category: id } = await params;
  const category = findCategory(id);
  if (!category) notFound();

  const { projects } = category;

  return (
    <>
      <nav className="wrap crumbs" aria-label="Breadcrumb">
        <Link href="/">Categories</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{category.name}</span>
      </nav>

      <header className="wrap cat-hero">
        <CategoryTile category={category} />
        <div>
          <h1>{category.name}</h1>
          {category.description ? <p>{category.description}</p> : null}
        </div>
      </header>

      <section className="wrap section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2>Sites</h2>
          <span className="aside">
            {projects.length
              ? `${projects.length} in this category`
              : "Nothing here yet"}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="notice">
            <strong>No sites in {category.name} yet.</strong>
            <span>
              Start one by copying a template — the copy has no link back, so
              editing it cannot affect a site that is already live:
            </span>
            <pre>
              <code>npm run new -- {category.id}/first-site --from car-wash/car-wash-template1</code>
            </pre>
          </div>
        ) : (
          <div className="cards">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
