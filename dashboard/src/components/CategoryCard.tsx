import Link from "next/link";
import CategoryTile from "@/components/CategoryTile";
import { type Category, categoryPath, summarize } from "@/lib/projects";

/** One card on the dashboard. The whole card is the link into the category. */
export default function CategoryCard({ category }: { category: Category }) {
  const empty = category.projects.length === 0;

  return (
    <Link
      href={categoryPath(category)}
      className={empty ? "cat is-empty" : "cat"}
      style={{ ["--hue" as string]: category.hue }}
    >
      <CategoryTile category={category} />

      <div className="cat-body">
        <h3>{category.name}</h3>
        {category.description ? <p>{category.description}</p> : null}
      </div>

      <div className="cat-foot">
        <span className={empty ? undefined : "count"}>{summarize(category)}</span>
        <span className="go" aria-hidden>
          Open →
        </span>
      </div>
    </Link>
  );
}
