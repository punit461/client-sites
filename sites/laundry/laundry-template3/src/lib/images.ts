/**
 * Every photograph the site uses, in one place.
 *
 * Remote on purpose: `output: "export"` ships no image optimiser, and a local
 * `/photo.jpg` would need the base path prefixed by hand at every call site
 * (see the repo's CLAUDE.md). Swapping in a client's own photography means
 * editing this file and nothing else.
 *
 * Any new hostname must also be added to `images.remotePatterns` in
 * next.config.ts, or next/image refuses to render it.
 */
const UNSPLASH = "https://images.unsplash.com/photo-";

/** Unsplash serves a resized, modern-format file straight from the URL. */
export function photo(id: string, width = 1400, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const img = {
  // hero — two plates, the larger one first
  heroRail: photo("1594938298603-c8148c4dae35", 1200),
  heroPress: photo("1489274495757-95c7c837b101", 800),

  // service accordion
  serviceLaundry: photo("1582735689369-4fe89db7114c", 1200),
  serviceDryClean: photo("1576871337622-98d48d1cf531", 1200),
  servicePress: photo("1523381210434-271e8be1f52b", 1200),
  serviceCouture: photo("1593032465175-481ac7f401a0", 1200),
  serviceHome: photo("1600121848594-d8644e57abab", 1200),

  // the standard — one plate per commitment, swapped as you move down the list
  standardInspect: photo("1545173168-9f1947eebb7f", 1100),
  standardSort: photo("1601924994987-69e26d50dc26", 1100),
  standardClean: photo("1610557892470-55d9e80c0bce", 1100),
  standardFinish: photo("1521572163474-6864f9cf17ab", 1100),
  standardReturn: photo("1601584115197-04ecc0da31d7", 1100),

  // wash house gallery
  houseFloor: photo("1626806787461-102c1bfaaea1", 900),
  houseSteam: photo("1558769132-cb1aea458c5e", 900),
  houseRack: photo("1558997519-83ea9252edf8", 900),
  houseDetail: photo("1591369822096-ffd140ec948f", 900),
  houseVan: photo("1602810318383-e386cc2a3ccf", 900),
  houseWardrobe: photo("1567401893414-76b7b1e5a7a5", 900),

  // full-bleed plates
  membership: photo("1516762689617-e1cffcef479d", 1600),
  finalCta: photo("1604335398980-ededcadcc37d", 1900),
} as const;

/** Deterministic stand-in portraits — replaced by real photos at handover. */
export const avatar = (seed: string, size = 160) =>
  `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
