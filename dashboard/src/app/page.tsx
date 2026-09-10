import CategoryCard from "@/components/CategoryCard";
import { categories, counts, site } from "@/lib/projects";

/** The dashboard: one card per category, which opens the projects inside it. */
export default function Home() {
  return (
    <>
      <section className="wrap hero">
        <p className="eyebrow">
          <span className="dot" aria-hidden />
          <b>{counts.projects}</b> projects across <b>{counts.categories}</b> categories
        </p>
        <h1>{site.title}</h1>
        <p className="lede">{site.tagline}</p>

        <div className="stats">
          <div className="stat">
            <span className="v">{counts.categories}</span>
            <span className="k">Categories</span>
          </div>
          <div className="stat">
            <span className="v">{counts.projects}</span>
            <span className="k">Projects</span>
          </div>
          <div className="stat">
            <span className="v">{counts.templates}</span>
            <span className="k">Templates</span>
          </div>
          <div className="stat">
            <span className="v">{counts.forClients}</span>
            <span className="k">For clients</span>
          </div>
          <div className="stat">
            <span className="v">{counts.delivered}</span>
            <span className="k">Delivered</span>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>Browse by category</h2>
          <span className="aside">Open a category to see its sites</span>
        </div>

        {categories.length === 0 ? (
          <div className="notice">
            <strong>No categories yet.</strong>
            <span>A category is a folder under <code>sites/</code>. Create one and its first project together:</span>
            <pre>
              <code>npm run new -- car-wash/first-site --from &lt;existing&gt;</code>
            </pre>
          </div>
        ) : (
          <div className="cards">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
