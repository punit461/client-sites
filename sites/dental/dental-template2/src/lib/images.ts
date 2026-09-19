/**
 * Every photograph the site uses, in one place.
 *
 * Remote on purpose: `output: "export"` ships no image optimiser, and a local
 * `/photo.jpg` would need the base path prefixed by hand at every call site.
 *
 * IN PRODUCTION these must be replaced with the group's own photography.
 * Stock clinical imagery must never be presented as these clinics, rooms,
 * equipment or clinicians.
 */
const UNSPLASH = "https://images.unsplash.com/photo-";

export function photo(id: string, width = 1400, quality = 80) {
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

export const img = {
  hero: photo("1576765608535-5f04d1e3f289", 1300),

  // specialties
  dental: photo("1629909613654-28e377c37b09", 900),
  dermatology: photo("1573497019940-1c28c88b4f3e", 900),
  physiotherapy: photo("1584515933487-779824d29309", 900),
  orthopedics: photo("1551601651-2a8555f1a136", 900),
  ent: photo("1576091160550-2173dba999ef", 900),
  generalMedicine: photo("1517245386807-bb43f82c33c4", 900),
  pediatrics: photo("1612277795421-9bc7706a4a34", 900),
  womensHealth: photo("1559839734-2b71ea197ec2", 900),

  // treatments
  implants: photo("1588776814546-1ffcf47267a5", 900),
  aligners: photo("1598256989800-fe5f95da9787", 900),
  skin: photo("1544005313-94ddf0286df2", 900),
  physio: photo("1516574187841-cb9cc2ca948b", 900),
  preventive: photo("1581594693702-fbdc51b2763b", 900),
  paediatric: photo("1517245386807-bb43f82c33c4", 900),

  // journey + facilities
  discover: photo("1576091160399-112ba8d25d1d", 1000),
  reception: photo("1519494026892-80bbd2d6fd0d", 1200),
  corridor: photo("1497366216548-37526070297c", 900),
  consultRoom: photo("1629909615184-74f495363b67", 900),
  diagnostics: photo("1666214280557-f1b5022eb634", 900),
  lab: photo("1579684385127-1ef15d508118", 900),
  waiting: photo("1518495973542-4542c06a5843", 900),

  finalCta: photo("1584515933487-779824d29309", 1700),
} as const;

/**
 * Clinician portraits. Generic stock, deliberately: the names, specialties and
 * qualifications in data/doctors.ts are placeholders, and pairing them with a
 * real person's photograph would misrepresent that person.
 */
export const portrait = {
  nikhil: photo("1612349317150-e413f6a5b16d", 700),
  sara: photo("1594824476967-48c8b964273f", 700),
  arun: photo("1622253692010-333f2da6031d", 700),
  leena: photo("1559839734-2b71ea197ec2", 700),
  imran: photo("1582750433449-648ed127bb54", 700),
  divya: photo("1544005313-94ddf0286df2", 700),
} as const;
