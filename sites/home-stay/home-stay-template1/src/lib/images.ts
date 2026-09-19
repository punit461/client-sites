/**
 * Every photograph the site uses, in one place.
 *
 * Remote on purpose: `output: "export"` ships no image optimiser, and a local
 * `/photo.jpg` would need the base path prefixed by hand at every call site.
 *
 * IN PRODUCTION replace these with the property's own photography. A stay is
 * sold on its rooms and its view — stock imagery here sets an expectation the
 * property may not meet.
 */
const UNSPLASH = "https://images.unsplash.com/photo-";

export function photo(id: string, width = 1500, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const img = {
  hero: photo("1518602164578-cd0074062767", 1920),

  // introduction
  introMain: photo("1449158743715-0a90ebb6d2d8", 1100),
  introInset: photo("1470071459604-3b5ec3a7fe05", 700),

  // rooms
  roomValley: photo("1590490360182-c33d57733427", 1100),
  roomGarden: photo("1540518614846-7eded433c457", 1100),
  roomLoft: photo("1505691938895-1758d7feb511", 1100),
  roomCottage: photo("1522708323590-d24dbb6b0267", 1100),

  // experiences
  plantation: photo("1524350876685-274059332603", 1100),
  sunrise: photo("1506905925346-21bda4d32df4", 1100),
  campfire: photo("1478131143081-80f7f84ca84d", 1100),
  localFood: photo("1567620905732-2d1ec7ab7445", 1100),
  natureWalk: photo("1441974231531-c6227db76b6e", 1100),
  stargazing: photo("1517824806704-9040b037703b", 1100),

  // gallery + lifestyle
  property: photo("1600585154340-be6161a56a0c", 1200),
  dining: photo("1414235077428-338989a2e8c0", 1000),
  coffee: photo("1447933601403-0c6688de566e", 1000),
  valley: photo("1493246507139-91e8fad9978e", 1400),
  tent: photo("1504280390367-361c6d9f38f4", 1000),
  meadow: photo("1470252649378-9c29740c9fa8", 1200),
  interior: photo("1600607687939-ce8a6c25118c", 1000),
  terrace: photo("1571896349842-33c89424de2d", 1200),
  hiker: photo("1526772662000-3f88f10405ff", 1000),

  finalCta: photo("1501785888041-af3ef285b470", 1800),
} as const;

/** Guest avatars — deterministic stand-ins, replaced at handover. */
export const avatar = (seed: string, size = 128) =>
  `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
