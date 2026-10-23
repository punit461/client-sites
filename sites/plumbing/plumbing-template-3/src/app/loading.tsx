/** Shown during client-side navigation while the next page loads. */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="bg-sand">
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true" className="shell animate-pulse space-y-5 py-20">
        <div className="h-3 w-32 rounded bg-sand-deep" />
        <div className="h-12 w-3/4 max-w-2xl rounded bg-sand-deep" />
        <div className="h-4 w-full max-w-xl rounded bg-sand-deep" />
      </div>
    </div>
  );
}
