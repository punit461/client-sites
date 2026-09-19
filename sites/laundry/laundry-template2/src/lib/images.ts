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

export function photo(id: string, width = 1400, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const img = {
  hero: photo("1604335398980-ededcadcc37d", 1920),

  // bento grid
  bentoLaundry: photo("1582735689369-4fe89db7114c", 1200),
  bentoDryClean: photo("1576871337622-98d48d1cf531", 900),
  bentoIron: photo("1489274495757-95c7c837b101", 800),
  bentoShoes: photo("1549298916-b41d501d3772", 800),
  bentoCurtains: photo("1600121848594-d8644e57abab", 900),
  bentoPremium: photo("1593032465175-481ac7f401a0", 1200),

  // journey rail
  journeyPickup: photo("1601584115197-04ecc0da31d7", 900),
  journeySort: photo("1601924994987-69e26d50dc26", 900),
  journeyClean: photo("1545173168-9f1947eebb7f", 900),
  journeyCare: photo("1610557892470-55d9e80c0bce", 900),
  journeyCheck: photo("1523381210434-271e8be1f52b", 900),
  journeyDeliver: photo("1602810318383-e386cc2a3ccf", 900),

  // fabric guide
  fabricCotton: photo("1521572163474-6864f9cf17ab", 1000),
  fabricSilk: photo("1594633312681-425c7b97ccd1", 1000),
  fabricWool: photo("1516762689617-e1cffcef479d", 1000),
  fabricDenim: photo("1582552938357-32b906df40cb", 1000),
  fabricLinen: photo("1591369822096-ffd140ec948f", 1000),
  fabricSuit: photo("1594938298603-c8148c4dae35", 1000),
  fabricDress: photo("1515886657613-9f3515b0c78f", 1000),

  // parallax room
  roomBack: photo("1604335398980-ededcadcc37d", 1600),
  roomMid: photo("1542060748-10c28b62716f", 1200),
  roomFront: photo("1582735689369-4fe89db7114c", 900),

  // transformation
  pile: photo("1626806787461-102c1bfaaea1", 1000),
  wardrobe: photo("1558997519-83ea9252edf8", 1000),

  // sustainability + app + cta
  eco: photo("1595246140625-573b715d11dc", 1000),
  finalCta: photo("1602810318383-e386cc2a3ccf", 1800),
} as const;

/** Editorial portraits for the customer stories. */
export const portrait = {
  rahul: photo("1507003211169-0a1dd7228f2d", 800),
  ananya: photo("1494790108377-be9c29b29330", 800),
  dev: photo("1615397587950-3cbb55f95b77", 800),
  meera: photo("1580489944761-15a19d654956", 800),
} as const;
