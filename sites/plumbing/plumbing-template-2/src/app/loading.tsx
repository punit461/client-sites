/** Shown during client-side navigation while the next page loads. */
export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="bg-charcoal">
      <span className="sr-only">Loading…</span>
      <div aria-hidden="true" className="shell animate-pulse space-y-5 py-20">
        <div className="h-3 w-32 bg-charcoal-3" />
        <div className="h-14 w-3/4 max-w-3xl bg-charcoal-3" />
        <div className="h-4 w-full max-w-xl bg-charcoal-3" />
      </div>
    </div>
  );
}
