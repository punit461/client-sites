/** Shown during client-side navigation while the next page's data arrives. */
export default function Loading() {
  return (
    <div className="shell section-y" role="status" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true" className="animate-pulse space-y-5">
        <div className="h-3 w-32 rounded bg-sand" />
        <div className="h-12 w-3/4 max-w-2xl rounded bg-sand" />
        <div className="h-4 w-full max-w-xl rounded bg-sand" />
        <div className="h-4 w-2/3 max-w-lg rounded bg-sand" />
      </div>
    </div>
  );
}
