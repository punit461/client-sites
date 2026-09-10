import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/lib/projects";

/**
 * Exported as 404.html, which static hosts serve for unknown paths — including
 * paths under a project folder, so it is also what a visitor sees when a site
 * has not been built yet.
 */
export default function NotFound() {
  return (
    <>
      <section className="wrap hero">
        <h1>Page not found</h1>
        <p className="lede">
          Either that address does not exist, or the site it belongs to has not
          been published yet. The categories below are what is here.
        </p>
        <p style={{ marginTop: "1.4rem" }}>
          <Link className="btn ghost" href="/">
            Back to the dashboard
          </Link>
        </p>
      </section>

      {categories.length > 0 ? (
        <section className="wrap section">
          <div className="section-head">
            <h2>Categories</h2>
          </div>
          <div className="cards">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
