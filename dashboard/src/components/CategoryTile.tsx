import type { Category } from "@/lib/projects";

/**
 * The coloured square that identifies a category. An emoji if category.json
 * sets one, otherwise a monogram — so a new category looks deliberate without
 * anyone having to pick an icon or a colour.
 *
 * The hue travels as a CSS custom property; globals.css does the rest, which
 * keeps the light and dark treatments beside each other in the stylesheet.
 */
export default function CategoryTile({ category }: { category: Category }) {
  return (
    <span
      className={category.icon ? "tile emoji" : "tile"}
      style={{ ["--hue" as string]: category.hue }}
      aria-hidden
    >
      {category.icon || category.monogram}
    </span>
  );
}
