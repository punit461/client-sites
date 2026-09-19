/**
 * Every photograph the site uses, in one place.
 *
 * They are remote on purpose: `output: "export"` ships no image optimiser, and
 * a local `/photo.jpg` would need the base path prefixed by hand at every call
 * site (see the repo's CLAUDE.md). Swapping in a client's own photography means
 * editing this file and nothing else.
 *
 * Add any new hostname to `images.remotePatterns` in next.config.ts, or
 * next/image refuses to render it.
 */
const UNSPLASH = "https://images.unsplash.com/photo-";

/** Unsplash serves a resized, modern-format file straight from the URL. */
export function photo(id: string, width = 1400, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const img = {
  heroPortrait: photo("1517677208171-0bc6725a3e60", 1200),
  heroFolded: photo("1602810318383-e386cc2a3ccf", 700),
  heroMachine: photo("1626806787461-102c1bfaaea1", 700),

  washFold: photo("1582735689369-4fe89db7114c", 1000),
  dryClean: photo("1576871337622-98d48d1cf531", 1000),
  ironing: photo("1489274495757-95c7c837b101", 1000),
  premiumCare: photo("1594938298603-c8148c4dae35", 1000),

  showcaseWash: photo("1545173168-9f1947eebb7f", 1100),
  showcaseDryClean: photo("1558769132-cb1aea458c5e", 1100),
  showcaseIron: photo("1523381210434-271e8be1f52b", 1100),
  showcaseShoes: photo("1595950653106-6c9ebd614d3a", 1100),
  showcasePremium: photo("1593032465175-481ac7f401a0", 1100),

  beforeWrinkled: photo("1582735689369-4fe89db7114c", 1100),
  afterPressed: photo("1602810318383-e386cc2a3ccf", 1100),

  banner: photo("1604335398980-ededcadcc37d", 1900),
  facility: photo("1610557892470-55d9e80c0bce", 1200),
  wardrobe: photo("1567401893414-76b7b1e5a7a5", 1200),
  finalCta: photo("1516762689617-e1cffcef479d", 1600),
} as const;

/** Deterministic stand-in portraits — replaced by real photos at handover. */
export const avatar = (seed: string, size = 128) =>
  `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
