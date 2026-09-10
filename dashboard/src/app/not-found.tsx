import Link from "next/link";

/** Exported as 404.html, which most static hosts serve for unknown paths. */
export default function NotFound() {
  return (
    <div className="wrap prose">
      <h1>Not here</h1>
      <p>
        Either that page does not exist, or the project it belongs to has not been
        built yet. A build publishes every project at once:
      </p>
      <pre>
        <code>npm run build</code>
      </pre>
      <p>
        <Link href="/">Back to the projects</Link>
      </p>
    </div>
  );
}
