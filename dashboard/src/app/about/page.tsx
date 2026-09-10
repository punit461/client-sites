import type { Metadata } from "next";
import Link from "next/link";
import { basePath } from "@/lib/projects";

export const metadata: Metadata = {
  title: "How this works",
  description: "How client projects are organised, previewed and delivered.",
};

export default function About() {
  return (
    <div className="wrap prose">
      <h1>How this works</h1>
      <p>
        One repo, one folder per client site. Every folder is a standalone Next.js
        app that exports to static files, so it can be published here alongside the
        others or lifted out and handed to a client on its own.
      </p>

      <h2>The shape</h2>
      <pre>
        <code>{`sites/
  car-wash/
    car-wash-template1/
    car-wash-template2/
  laundry/
  dental/`}</code>
      </pre>
      <p>
        Exactly two levels: a category, then a project. A new category exists the
        moment you name one — there is nothing to register.
      </p>

      <h2>Starting a project</h2>
      <pre>
        <code>npm run new -- car-wash/shine-auto-spa --from car-wash/car-wash-template1</code>
      </pre>
      <p>
        That copies a template rather than referencing it, so nothing you do to the
        new site can affect one that is already live.
      </p>

      <h2>Showing a client</h2>
      <pre>
        <code>{`npm run build      # every project into _site/
npm run preview    # serves _site/ exactly as it will be published`}</code>
      </pre>
      <p>
        The preview serves the built files, so what a client sees is what goes live.
        While actually building a page, work in the project itself with{" "}
        <code>npm run dev</code> for hot reload.
      </p>

      <h2>Delivering it</h2>
      <pre>
        <code>npm run release -- car-wash/shine-auto-spa</code>
      </pre>
      <p>
        The project is copied out, installed and rebuilt with no path prefix, so the
        result sits at a domain root. Upload the contents of the{" "}
        <code>out/</code> folder to any static host; a{" "}
        <code>HANDOVER.md</code> next to it says how.
      </p>

      <h2>Statuses</h2>
      <ul>
        <li>
          <b>Template</b> — a starting point, not for a client.
        </li>
        <li>
          <b>Draft</b> — being built.
        </li>
        <li>
          <b>With client</b> — waiting on their feedback.
        </li>
        <li>
          <b>Approved</b> — agreed, not yet handed over.
        </li>
        <li>
          <b>Delivered</b> — live on their hosting.
        </li>
      </ul>
      <p>
        A project&apos;s status, title and client name live in its{" "}
        <code>project.json</code>.
      </p>

      <p>
        This page is published under <code>{basePath || "/"}</code>/about/ — proof that
        the dashboard is a normal Next.js app: add a file, get a page.
      </p>

      <p>
        <Link href="/">Back to the projects</Link>
      </p>
    </div>
  );
}
