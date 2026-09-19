/**
 * Every photograph the site uses, in one place.
 *
 * Remote on purpose: `output: "export"` ships no image optimiser, and a local
 * `/photo.jpg` would need the base path prefixed by hand at every call site.
 *
 * IN PRODUCTION replace these with the property's own photography. This
 * template is sold on water, teak and evening light — stock imagery here sets
 * an expectation a real house may not meet.
 */
const UNSPLASH = "https://images.unsplash.com/photo-";

export function photo(id: string, width = 1400, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const img = {
  hero: photo("1439066615861-d1af74d74000", 2000),

  // the house
  houseMain: photo("1582719508461-905c673771fd", 1200),
  houseInset: photo("1600607687939-ce8a6c25118c", 700),
  veranda: photo("1571896349842-33c89424de2d", 1200),
  courtyard: photo("1600585154340-be6161a56a0c", 1100),

  // rooms
  roomVeranda: photo("1590490360182-c33d57733427", 1200),
  roomTeak: photo("1618773928121-c32242e63f39", 1200),
  roomBoathouse: photo("1611892440504-42a792e24d32", 1200),
  roomPaddy: photo("1540518614846-7eded433c457", 1200),
  roomCottage: photo("1522708323590-d24dbb6b0267", 1200),

  // experiences
  canoe: photo("1502680390469-be75c86b636f", 1300),
  toddy: photo("1414235077428-338989a2e8c0", 1000),
  kitchen: photo("1567620905732-2d1ec7ab7445", 1100),
  coir: photo("1524492412937-b28074a5d7da", 1000),
  kathakali: photo("1516450360452-9312f5e86fc7", 1000),
  houseboat: photo("1593693411515-c20261bcad6e", 1300),

  // the table
  breakfast: photo("1533089860892-a7c6f0a88666", 1100),
  lunch: photo("1585937421612-70a008356fbe", 1100),
  tea: photo("1447933601403-0c6688de566e", 900),
  dinner: photo("1504674900247-0877df9cc836", 1100),

  // gallery + lifestyle
  water: photo("1493246507139-91e8fad9978e", 1300),
  jetty: photo("1544551763-46a013bb70d5", 1200),
  lanterns: photo("1478131143081-80f7f84ca84d", 1000),
  paddy: photo("1470252649378-9c29740c9fa8", 1200),
  detail: photo("1505691938895-1758d7feb511", 1000),
  dusk: photo("1501785888041-af3ef285b470", 1400),
  boatman: photo("1526772662000-3f88f10405ff", 1000),

  finalCta: photo("1439066615861-d1af74d74000", 1900),
} as const;

/** Guest avatars — deterministic stand-ins, replaced at handover. */
export const avatar = (seed: string, size = 128) =>
  `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
