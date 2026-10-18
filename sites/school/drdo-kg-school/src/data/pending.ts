/**
 * Copy the school has not confirmed yet.
 *
 * A data field holds either finished text or `pending("what to ask for")`.
 * The page renders a pending value as a highlighted note (see `<Copy>`), so a
 * gap is visible in review instead of being papered over with invented facts.
 * Before handover, search `src/data/` for `pending(` — there should be none.
 */
export type Pending = { pending: string };
export type Text = string | Pending;

export const pending = (what: string): Pending => ({ pending: what });

export const isPending = (value: Text): value is Pending => typeof value !== "string";
