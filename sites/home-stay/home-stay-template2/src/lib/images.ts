/**
 * Every photograph the site uses, in one place.
 *
 * Remote on purpose: `output: "export"` ships no image optimiser, and a local
 * `/photo.jpg` would need the base path prefixed by hand at every call site.
 *
 * IN PRODUCTION replace these with the property's own photography — a stay is
 * sold on its rooms and its view, and stock imagery sets an expectation the
 * property may not meet.
 */
const UNSPLASH = "https://images.unsplash.com/photo-";

export function photo(id: string, width = 1400, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const img = {
  hero: photo("1449158743715-0a90ebb6d2d8", 1100),

  // story
  storyMain: photo("1600585154340-be6161a56a0c", 1100),
  storyInset: photo("1447933601403-0c6688de566e", 600),

  // rooms
  roomLoft: photo("1590490360182-c33d57733427", 1200),
  roomPine: photo("1540518614846-7eded433c457", 1200),
  roomGarden: photo("1505691938895-1758d7feb511", 1200),
  roomCabin: photo("1522708323590-d24dbb6b0267", 1200),

  // experiences (bento)
  trek: photo("1506905925346-21bda4d32df4", 1200),
  plantation: photo("1524350876685-274059332603", 900),
  campfire: photo("1478131143081-80f7f84ca84d", 1100),
  cooking: photo("1567620905732-2d1ec7ab7445", 900),
  waterfall: photo("1493246507139-91e8fad9978e", 1100),
  village: photo("1526772662000-3f88f10405ff", 900),

  // explore
  viewpoint: photo("1470071459604-3b5ec3a7fe05", 900),
  estate: photo("1441974231531-c6227db76b6e", 900),
  lake: photo("1501785888041-af3ef285b470", 900),
  meadow: photo("1470252649378-9c29740c9fa8", 900),

  // food
  breakfast: photo("1567620905732-2d1ec7ab7445", 1100),
  dinner: photo("1414235077428-338989a2e8c0", 900),
  coffee: photo("1447933601403-0c6688de566e", 900),

  // journal + seasons
  stars: photo("1517824806704-9040b037703b", 1000),
  terrace: photo("1571896349842-33c89424de2d", 1000),
  interior: photo("1600607687939-ce8a6c25118c", 1000),
  tent: photo("1504280390367-361c6d9f38f4", 1000),

  finalCta: photo("1470252649378-9c29740c9fa8", 1800),
} as const;

export const avatar = (seed: string, size = 128) =>
  `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
