/**
 * Local files in public/ do not get basePath applied by next/image, so every
 * photo goes through this. Without it the site works on `npm run dev` and
 * loses every image the moment it is published under the dashboard.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string) {
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Every photograph the site uses, by subject. Files live in public/images/. */
export const img = {
  logo: "/images/logo.jpg",
  campusBus: "/images/campus-bus.jpg",
  schoolGate: "/images/school-gate.jpg",

  montessori: "/images/montessori-class.jpg",
  activityHall: "/images/activity-hall.jpg",
  newsInEducation: "/images/news-in-education.jpg",
  projectExhibition: "/images/project-exhibition.jpg",
  scienceFair: "/images/science-fair.jpg",
  artExhibition: "/images/art-exhibition.jpg",

  bharatanatyam: "/images/bharatanatyam.jpg",
  culturalProgramme: "/images/cultural-programme.jpg",
  houseMarch: "/images/house-march.jpg",
  christmas: "/images/christmas.jpg",

  interactTeam: "/images/interact-club-team.jpg",
  interactShowcase: "/images/interact-club-showcase.jpg",
  interactStall: "/images/interact-club-stall.jpg",
  environmentOath: "/images/environment-oath.jpg",
  communityOath: "/images/community-oath.jpg",

  grandparentsDay: "/images/grandparents-day.jpg",
  independenceDay: "/images/independence-day.jpg",
  investiture: "/images/investiture.jpg",
  yogaDay: "/images/yoga-day.jpg",
  environmentDay: "/images/environment-day.jpg",

  alumniMarchPast: "/images/alumni-march-past.jpg",
  alumniThenNow: "/images/alumni-then-now.jpg",
  alumniMemories: "/images/alumni-memories.jpg",
} as const;
