import { avatar, img } from "@/lib/images";
import type { IconName } from "@/lib/icons";

/**
 * Property-level content. A hand-over starts here: change the name, the rooms,
 * the rates and the water it sits on, and the whole site follows.
 */
export const property = {
  name: "Kayal",
  suffix: "House",
  fullName: "Kayal House",
  eyebrow: "On the Vembanad backwaters",
  headline: ["Wake up", "on the water"],
  intro:
    "A 1936 teak-and-laterite house at the edge of the lake in Alappuzha. Five rooms, one long veranda, and a kitchen that cooks whatever the boat brought in that morning.",
  built: 1936,
  since: 2014,
  region: "Alappuzha, Kerala",
  rating: { score: 4.9, count: 96, source: "guest reviews" },
};

export const contact = {
  phone: "+91 94470 61180",
  phoneDial: "+919447061180",
  whatsapp: "919447061180",
  email: "stay@kayalhouse.example",
  address: ["Kayal House", "Punnamada Kayal Road", "Alappuzha 688006"],
  mapsQuery: "Punnamada Kayal Road, Alappuzha 688006",
  hours: "Reception 7:00 AM – 9:00 PM · someone is awake later",
};

export const nav = [
  { label: "Suites", href: "/suites" },
  { label: "Experiences", href: "/experiences" },
  { label: "The Table", href: "/dining" },
  { label: "Gallery", href: "/gallery" },
  { label: "The House", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** The four facts on the rail under the hero. */
export const facts = [
  { value: `Est. ${property.built}`, label: "Teak and laterite", icon: "leaf" as IconName },
  { value: "Five rooms", label: "One long veranda", icon: "bed" as IconName },
  { value: "On the kayal", label: "Jetty at the gate", icon: "waves" as IconName },
  { value: "All meals in", label: "Cooked in the house", icon: "utensils" as IconName },
];

/** ------------------------------------------------------------ rooms */
export interface Room {
  slug: string;
  name: string;
  kicker: string;
  blurb: string;
  description: string[];
  guests: number;
  bed: string;
  size: string;
  view: string;
  floor: string;
  rate: number;
  amenities: string[];
  images: { src: string; alt: string }[];
}

export const rooms: Room[] = [
  {
    slug: "lake-veranda",
    name: "Lake Veranda",
    kicker: "The water at the foot of the bed",
    blurb: "Upper floor, full-width shutters, and the lake doing whatever it is doing all day.",
    description: [
      "The room the house was arranged around. Eight teak shutters run the width of it, and when they are all open the veranda and the room become one space with the lake at the end of it.",
      "A four-poster with a mosquito net that is there because it is needed, two cane chairs facing the water, and a bathroom with a window you can leave open.",
    ],
    guests: 2,
    bed: "King four-poster",
    size: "34 m²",
    view: "Vembanad lake",
    floor: "Upper floor",
    rate: 11500,
    amenities: ["Private veranda", "Lake view", "Air conditioning", "Ensuite with tub", "Tea tray", "Wi-Fi"],
    images: [
      { src: img.roomVeranda, alt: "The Lake Veranda room with its shutters open" },
      { src: img.veranda, alt: "The veranda outside the room" },
      { src: img.water, alt: "The lake at first light" },
    ],
  },
  {
    slug: "teak-room",
    name: "Teak Room",
    kicker: "Dark wood, cool floor",
    blurb: "Inward-facing and the coolest room in the house, which in Alappuzha counts for a lot.",
    description: [
      "Looks onto the inner courtyard rather than the water, which makes it two or three degrees cooler than anything on the lake side and much quieter in the afternoon.",
      "The bed, the almirah and the door frames are all from the original house. The floor is red oxide, polished by eighty years of bare feet.",
    ],
    guests: 2,
    bed: "Queen bed",
    size: "28 m²",
    view: "Inner courtyard",
    floor: "Ground floor",
    rate: 8900,
    amenities: ["Courtyard view", "Air conditioning", "Step-free entry", "Ensuite shower", "Tea tray", "Wi-Fi"],
    images: [
      { src: img.roomTeak, alt: "The Teak Room" },
      { src: img.courtyard, alt: "The inner courtyard" },
    ],
  },
  {
    slug: "boathouse-suite",
    name: "Boathouse Suite",
    kicker: "Closest to the jetty",
    blurb: "The largest room, in the old boat store, with a sitting room and a door onto the water steps.",
    description: [
      "The boat store until 2016, and still shaped like one: a long room with a high roof, now a bedroom at one end and a sitting room at the other.",
      "Its own door onto the water steps, which means you can be in a canoe forty seconds after waking up. The daybed in the sitting room makes up for a third guest.",
    ],
    guests: 3,
    bed: "King bed, plus a daybed",
    size: "46 m²",
    view: "The jetty and the lake",
    floor: "Ground floor",
    rate: 15800,
    amenities: ["Sitting room", "Door to the water steps", "Air conditioning", "Ensuite with tub", "Tea tray", "Wi-Fi"],
    images: [
      { src: img.roomBoathouse, alt: "The Boathouse Suite" },
      { src: img.jetty, alt: "The jetty and water steps" },
    ],
  },
  {
    slug: "paddy-room",
    name: "Paddy Room",
    kicker: "Fields on three sides",
    blurb: "At the back of the house looking over the paddy, which is water half the year and green the rest.",
    description: [
      "A corner room over the kitchen garden with the paddy fields beyond it. Between June and October the fields are under water and the whole view turns into sky.",
      "Twin beds that can be made up as a king — say which when you book.",
    ],
    guests: 2,
    bed: "Twin beds or king",
    size: "26 m²",
    view: "Paddy fields",
    floor: "Upper floor",
    rate: 7900,
    amenities: ["Paddy view", "Ceiling fan and AC", "Ensuite shower", "Writing desk", "Tea tray", "Wi-Fi"],
    images: [
      { src: img.roomPaddy, alt: "The Paddy Room" },
      { src: img.paddy, alt: "The paddy fields behind the house" },
    ],
  },
  {
    slug: "courtyard-cottage",
    name: "Courtyard Cottage",
    kicker: "A house of your own",
    blurb: "A separate two-bedroom cottage across the courtyard. The only place a dog can stay.",
    description: [
      "Built in 2021 in the same style out of timber reclaimed from a house being taken down two villages over. Two bedrooms, a kitchenette and a veranda of its own.",
      "The right choice for a family, or for two couples who would like to be able to shut a door. Dogs are welcome here by prior arrangement.",
    ],
    guests: 4,
    bed: "One king, one twin room",
    size: "62 m²",
    view: "Courtyard and garden",
    floor: "Separate cottage",
    rate: 19500,
    amenities: ["Two bedrooms", "Kitchenette", "Private veranda", "Dog friendly", "Air conditioning", "Wi-Fi"],
    images: [
      { src: img.roomCottage, alt: "The Courtyard Cottage" },
      { src: img.houseInset, alt: "The cottage veranda" },
    ],
  },
];

export const findRoom = (slug: string) => rooms.find((r) => r.slug === slug);
export const fromRate = Math.min(...rooms.map((r) => r.rate));
export const maxGuests = Math.max(...rooms.map((r) => r.guests));

/** ------------------------------------------------------------ the house */
export const houseNotes: { title: string; copy: string; icon: IconName }[] = [
  { title: "Water on two sides", copy: "The lake at the front, a canal along the garden wall, and a jetty you can step onto.", icon: "waves" },
  { title: "One table", copy: "Everyone eats together at eight, unless you would rather not, which is also fine.", icon: "utensils" },
  { title: "Nothing to be on time for", copy: "No schedule, no activity board, and no television in the house.", icon: "moon" },
  { title: "Run by the family", copy: "Thomas and Elsy live in the back wing. Their son Nithin runs the boats.", icon: "sparkles" },
];

/** The chronology on the About page. Dates are the property's, not the region's. */
export const chronology = [
  { year: "1936", title: "The house is built", copy: "Raised by a coir merchant on filled land at the edge of the kayal, out of laterite block and Malabar teak." },
  { year: "1978", title: "The upper floor goes on", copy: "Four rooms added above the veranda, in the same timber, by the merchant's son." },
  { year: "2009", title: "It nearly goes", copy: "Empty for six years and close to being sold for the land. Thomas buys it from a cousin instead." },
  { year: "2014", title: "First guests", copy: "Two rooms, one bathroom between them, and a visitors' book that is still on the hall table." },
  { year: "2016", title: "The boat store becomes a suite", copy: "The old store is re-roofed and opened onto the water steps." },
  { year: "2021", title: "The cottage", copy: "Built across the courtyard from the timber of a house being taken down nearby." },
];

/** ------------------------------------------------------------ experiences */
export interface Experience {
  slug: string;
  name: string;
  blurb: string;
  detail: string;
  duration: string;
  when: string;
  included: boolean;
  image: string;
  alt: string;
  icon: IconName;
}

export const experiences: Experience[] = [
  {
    slug: "sunrise-canoe",
    name: "Sunrise canoe",
    blurb: "Out through the narrow canals before the lake wakes up.",
    detail:
      "Nithin takes two people at a time in the country canoe, down the canals behind the house where the houseboats cannot go. An hour, back before breakfast, and the birds are the point of it.",
    duration: "About 1 hour",
    when: "Daily, 6:15 AM",
    included: true,
    image: img.canoe,
    alt: "A canoe on a narrow backwater canal",
    icon: "sailboat",
  },
  {
    slug: "the-kitchen",
    name: "In the kitchen with Elsy",
    blurb: "Karimeen on the coals, and what to do with a coconut.",
    detail:
      "An afternoon learning three or four dishes properly — usually a fish, a thoran and a pachadi — then eating them at the long table with everyone else.",
    duration: "About 3 hours",
    when: "Mondays and Thursdays, on request",
    included: false,
    image: img.kitchen,
    alt: "A meal being cooked in a home kitchen",
    icon: "flame",
  },
  {
    slug: "coir-village-walk",
    name: "Coir village walk",
    blurb: "Twenty minutes on foot, into what this place was built on.",
    detail:
      "The women spinning coir along the canal path have been doing it for forty years and are entirely unbothered by being watched. Ends at a tea shop where you are expected to have a second one.",
    duration: "About 2 hours",
    when: "Daily, 4:30 PM",
    included: true,
    image: img.coir,
    alt: "Coir rope being spun by hand",
    icon: "footprints",
  },
  {
    slug: "toddy-shop-lunch",
    name: "Toddy shop lunch",
    blurb: "A short boat ride to somewhere with no menu.",
    detail:
      "Fifteen minutes up the canal to a shop that serves whatever was caught that morning, hot enough to be a genuine problem. Not refined, and the best meal most guests eat here.",
    duration: "Half a day",
    when: "On request, not Sundays",
    included: false,
    image: img.toddy,
    alt: "A local lunch laid out on a table",
    icon: "fish",
  },
  {
    slug: "houseboat-afternoon",
    name: "Houseboat afternoon",
    blurb: "The big lake, slowly, from four until dark.",
    detail:
      "We use one boat and one crew we trust rather than whoever is cheapest at the jetty. Out at four, back after sunset, tea and something fried on board.",
    duration: "About 4 hours",
    when: "Daily, weather permitting",
    included: false,
    image: img.houseboat,
    alt: "A houseboat on the backwaters",
    icon: "ship",
  },
  {
    slug: "kathakali-evening",
    name: "Kathakali evening",
    blurb: "In town, starting with the make-up rather than the performance.",
    detail:
      "The hour before, watching the paint go on, explains the hour after. We book the seats and Thomas drives you in and back.",
    duration: "About 3 hours",
    when: "Tuesdays and Saturdays",
    included: false,
    image: img.kathakali,
    alt: "A Kathakali performer",
    icon: "sparkles",
  },
];

export const findExperience = (slug: string) => experiences.find((e) => e.slug === slug);

/** ------------------------------------------------------------ the table */
export interface Sitting {
  time: string;
  name: string;
  copy: string;
  items: string[];
  image: string;
  icon: IconName;
}

export const theDay: Sitting[] = [
  {
    time: "06:15",
    name: "Coffee on the veranda",
    copy: "Put out before anyone asks, because the good hour here is the first one.",
    items: ["Filter coffee", "Cardamom tea", "Whatever fruit is ripe"],
    image: img.tea,
    icon: "coffee",
  },
  {
    time: "08:30",
    name: "Breakfast",
    copy: "Cooked to order rather than laid out, so it arrives hot and you decide when.",
    items: ["Appam and stew", "Puttu with kadala", "Egg roast", "Banana fritters"],
    image: img.breakfast,
    icon: "sunrise",
  },
  {
    time: "13:00",
    name: "Lunch on the leaf",
    copy: "The full sadya on Sundays; the rest of the week a shorter version of the same idea.",
    items: ["Rice and sambar", "Two thorans", "Fish curry or avial", "Pappadam and pickle"],
    image: img.lunch,
    icon: "leaf",
  },
  {
    time: "16:30",
    name: "Tea and something fried",
    copy: "On the veranda at half past four, the one fixture of the day.",
    items: ["Chai", "Parippu vada", "Banana chips"],
    image: img.tea,
    icon: "fan",
  },
  {
    time: "20:00",
    name: "Dinner at the long table",
    copy: "Everyone together unless you would rather eat on your own veranda, which happens often enough.",
    items: ["Karimeen pollichathu", "Kappa and meen curry", "A vegetarian equivalent, always", "Something with jaggery"],
    image: img.dinner,
    icon: "utensils",
  },
];

export const kitchenNotes = [
  "All three meals are in the room rate, and so is everything on the tea tray.",
  "Vegetarian, vegan and Jain food is cooked properly rather than apologetically — tell us when you book.",
  "The fish is whatever the boat brought. If you do not eat fish, say so and nobody will be offended.",
  "Beer and wine are not sold here, but you are welcome to bring your own and we will keep it cold.",
];

/** ------------------------------------------------------------ gallery */
export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
  /** Portrait tiles, for the rhythm of the grid. */
  tall?: boolean;
}

export const gallery: GalleryImage[] = [
  { src: img.water, alt: "The lake at first light", category: "Water", tall: true },
  { src: img.roomVeranda, alt: "The Lake Veranda room", category: "Rooms" },
  { src: img.lunch, alt: "Lunch on a banana leaf", category: "The table" },
  { src: img.houseMain, alt: "The house from the garden", category: "House", tall: true },
  { src: img.canoe, alt: "A canoe in the narrow canals", category: "Water" },
  { src: img.detail, alt: "Teak shutters and a red oxide floor", category: "House" },
  { src: img.roomBoathouse, alt: "The Boathouse Suite", category: "Rooms", tall: true },
  { src: img.dinner, alt: "Dinner at the long table", category: "The table" },
  { src: img.jetty, alt: "The jetty at the gate", category: "Water" },
  { src: img.lanterns, alt: "Lanterns on the veranda after dark", category: "House" },
  { src: img.paddy, alt: "The paddy behind the house", category: "Around", tall: true },
  { src: img.boatman, alt: "On the coir village walk", category: "Around" },
];

export const galleryCategories = ["All", "House", "Rooms", "Water", "The table", "Around"] as const;

/** ------------------------------------------------------------ voices */
/**
 * PLACEHOLDER GUEST REVIEWS. These are illustrative, not real guests. Replace
 * them with reviews the property has actually received before launch.
 */
export const voices = [
  {
    name: "Ananya Menon",
    from: "Bengaluru",
    date: "December 2025",
    rating: 5,
    stay: "Lake Veranda · 3 nights",
    quote:
      "We opened the shutters on the first morning and then more or less did not leave the room for two days. The canoe at six is worth setting an alarm you are on holiday to avoid.",
    avatar: avatar("ananya-menon-kh"),
  },
  {
    name: "Peter & Hanne",
    from: "Copenhagen",
    date: "February 2026",
    rating: 5,
    stay: "Boathouse Suite · 5 nights",
    quote:
      "Elsy fed us five times a day and was visibly disappointed when we could not finish. The toddy shop lunch was the single best thing we ate in India.",
    avatar: avatar("peter-hanne-kh"),
  },
  {
    name: "Rehan Qureshi",
    from: "Mumbai",
    date: "November 2025",
    rating: 5,
    stay: "Teak Room · 2 nights",
    quote:
      "Booked the cheap room facing the courtyard expecting to regret it. It is the coolest, quietest room in the house and I would take it again over the lake side.",
    avatar: avatar("rehan-qureshi-kh"),
  },
  {
    name: "The Fernandes family",
    from: "Goa",
    date: "January 2026",
    rating: 4,
    stay: "Courtyard Cottage · 4 nights",
    quote:
      "Two adults, two children and a dog, none of whom were a problem for anybody. Mosquitoes in the evening are real — bring something, they will lend you a coil.",
    avatar: avatar("fernandes-kh"),
  },
] as const;

/** ------------------------------------------------------------ getting here */
export const journey = [
  { mode: "By air", icon: "plane" as IconName, place: "Kochi (COK)", time: "1 hr 45 by road", copy: "The straightforward arrival. We send a car for a fixed fare — ask when you book." },
  { mode: "By train", icon: "train" as IconName, place: "Alappuzha station", time: "15 min by road", copy: "Every train down the coast stops here. Tell us the number and someone will be on the platform." },
  { mode: "By road", icon: "car" as IconName, place: "From Kochi or Kumarakom", time: "1 hr 45 / 1 hr", copy: "Park at the gate. The last 300 m is a lane too narrow for a bus, so a big car is not an advantage." },
  { mode: "By water", icon: "anchor" as IconName, place: "Our jetty", time: "On request", copy: "Arriving by boat is possible and much the nicest way to do it. Give us a day's notice." },
] as const;

export const seasonNote =
  "October to March is the dry season — clear mornings, cool nights, and the lake at its calmest. June to September is monsoon: the paddy floods, the light is extraordinary, and the rain is not a light drizzle.";

/** ------------------------------------------------------------ faq */
export const faqs = [
  { q: "What time is check-in and check-out?", a: "Check-in from 1:00 PM, check-out by 11:00 AM. Arriving on an overnight train is normal here — tell us and we will hold the room from the morning at no charge if it is free." },
  { q: "Are meals included?", a: "Yes. Breakfast, lunch and dinner, plus the tea tray and the four-thirty snack, are all in the room rate. Tell us about any dietary requirements when you book and they will be cooked for properly." },
  { q: "How do we get here from the airport?", a: "Kochi airport is about an hour and three quarters by road. We arrange a car at a fixed fare, which is usually cheaper than the pre-paid counter and means someone is holding a sign with your name on it." },
  { q: "Are mosquitoes a problem?", a: "Honestly, in the evening, yes — it is a house on a lake. Every room has a net, plugs and coils, and the veranda has fans that keep them moving. Bring repellent you like the smell of." },
  { q: "Are pets allowed?", a: "Dogs are welcome in the Courtyard Cottage only, by prior arrangement. There is a house dog called Pepper who considers the garden hers." },
  { q: "Is there Wi-Fi?", a: "Yes, through the house and the cottage. It is fine for calls and email. The signal on the water is another matter, which most guests count as a feature." },
  { q: "Can children stay?", a: "Yes, and they usually have a good time. There is open water at the bottom of the garden with no fence, so children need to be watched — we say this to everyone." },
  { q: "What is the cancellation policy?", a: "Free cancellation up to seven days before arrival. Inside seven days the first night is charged. That is the policy the enquiry form applies." },
];
