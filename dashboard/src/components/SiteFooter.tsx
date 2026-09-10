import Link from "next/link";
import { basePath, categories, categoryPath, site } from "@/lib/projects";

export default function SiteFooter() {
  // A server component, so this is the build date — not a client clock, which
  // would differ from the prerendered HTML and break hydration.
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h4>{site.title}</h4>
            <p className="blurb">{site.tagline}</p>
          </div>

          <div>
            <h4>Categories</h4>
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={categoryPath(category)}>{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>This site</h4>
            <ul>
              <li>
                <Link href="/projects">All projects</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/terms">Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-base">
          <span>
            © {year} {site.owner}
          </span>
          <span>
            Published under <code>{basePath || "/"}</code>
          </span>
          <span>Static pages — no tracking, no cookies.</span>
        </div>
      </div>
    </footer>
  );
}
