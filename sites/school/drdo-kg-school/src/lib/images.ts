/**
 * Every image the site uses, in one place.
 *
 * Unlike the templates, these are local: the school's own photos will live in
 * `public/images/`. `next/image` does not apply `basePath` to a string `src`
 * (see the repo's CLAUDE.md), so every path goes through `asset()`.
 *
 * Swapping in a real photo is two steps: save it as `public/images/<name>.jpg`,
 * then change that entry below from `placeholder("<name>")` to
 * `asset("/images/<name>.jpg")`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) => `${basePath}${path}`;

/** Labelled stand-ins, each naming the shot it is waiting for. */
const placeholder = (name: string) => asset(`/images/placeholders/${name}.svg`);

export const img = {
  hero: placeholder("hero"),
  about: placeholder("about"),

  teachers: placeholder("teachers"),
  playArea: placeholder("play-area"),
  classroom: placeholder("classroom"),

  gallery1: placeholder("gallery-1"),
  gallery2: placeholder("gallery-2"),
  gallery3: placeholder("gallery-3"),
  gallery4: placeholder("gallery-4"),
  gallery5: placeholder("gallery-5"),
  gallery6: placeholder("gallery-6"),
} as const;
