/**
 * Every photograph the site uses, in one place.
 *
 * Remote on purpose: `output: "export"` ships no image optimiser, and a local
 * `/photo.jpg` would need the base path prefixed by hand at every call site
 * (see the repo's CLAUDE.md).
 *
 * IN PRODUCTION these must be replaced with the practice's own photography.
 * Stock clinical imagery should never be presented as this clinic's rooms,
 * equipment or team.
 */
const UNSPLASH = "https://images.unsplash.com/photo-";

export function photo(id: string, width = 1400, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const img = {
  hero: photo("1612277795421-9bc7706a4a34", 1300),

  // treatments
  general: photo("1629909613654-28e377c37b09", 900),
  implants: photo("1588776814546-1ffcf47267a5", 900),
  rootCanal: photo("1629909615184-74f495363b67", 900),
  braces: photo("1598256989800-fe5f95da9787", 900),
  whitening: photo("1573497019940-1c28c88b4f3e", 900),
  cosmetic: photo("1544005313-94ddf0286df2", 900),
  crowns: photo("1666214280557-f1b5022eb634", 900),
  paediatric: photo("1631217868264-e5b90bb7e133", 900),

  featured: photo("1517245386807-bb43f82c33c4", 1200),

  // patient journey
  before: photo("1517245386807-bb43f82c33c4", 1000),
  during: photo("1581056771107-24ca5f033842", 1000),
  after: photo("1576091160399-112ba8d25d1d", 1000),

  // clinic tour
  reception: photo("1519494026892-80bbd2d6fd0d", 1200),
  treatmentRoom: photo("1629909615184-74f495363b67", 800),
  waiting: photo("1497366216548-37526070297c", 800),
  sterilisation: photo("1579684385127-1ef15d508118", 800),
  technology: photo("1638202993928-7267aad84c31", 800),
  teamArea: photo("1666214280557-f1b5022eb634", 800),

  finalCta: photo("1573497019940-1c28c88b4f3e", 1600),
} as const;

/**
 * Clinician portraits. Deliberately generic stock: the names, roles and
 * qualifications in data/team.ts are placeholders, and pairing them with a real
 * person's photograph would misrepresent that person.
 */
export const portrait = {
  aparna: photo("1559839734-2b71ea197ec2", 800),
  daniel: photo("1537368910025-700350fe46c7", 800),
  mira: photo("1582750433449-648ed127bb54", 800),
  samuel: photo("1622253692010-333f2da6031d", 800),
} as const;
