# Vivera Health — dental template 2

A multi-clinic healthcare platform: specialty discovery, a filterable doctor
directory, clinic pages, patient resources and a seven-step appointment
request. Deliberately a different product from `dental-template1` — that one is
a single premium practice, this one is a group with several sites.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to a
group to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build dental/dental-template2` builds it into the
shared bundle instead.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Home — search, specialties, doctors, journey, locations, resources |
| `/specialties` · `/specialties/[slug]` | Eight specialties, each pre-rendered |
| `/treatments` · `/treatments/[slug]` | Six treatments, each pre-rendered |
| `/doctors` · `/doctors/[slug]` | Filterable directory and six profiles |
| `/locations` · `/locations/[slug]` | Three clinics with facilities and teams |
| `/resources` · `/resources/[slug]` | Six patient-information articles |
| `/book` | The seven-step appointment request |

36 pages in total, all statically exported.

## Read this before launch

**Everything clinical in `src/data/` is placeholder scaffolding** and needs
review by qualified clinicians before publication.

Claims that need evidence are switched **off** in `src/data/group.ts` under
`evidence`:

| Flag | Off means | Turn on when |
| --- | --- | --- |
| `reviewsAreReal` | Review cards read "Patient review goes here." with a visible placeholder note | You have reviews from the group's verified profile |
| `liveScheduling` | Booking says **request**; the time step says slots are preferences, not availability | The flow is wired to a real scheduling system |
| `insurersConfigured` | No insurer logos; the copy sends people to the clinic to confirm | Each named insurer is contractually accepted |

Two more things deliberately do not lie:

**Doctor availability** (`nextAvailable` in `src/data/doctors.ts`) is
placeholder text, and the hero card says "Example availability" out loud.

**Patient resources** each carry `clinicianReviewed: false`, and every article
page renders a visible "Not yet clinically reviewed" panel. Do not flip that
flag until a named clinician has actually reviewed the article — presenting
unreviewed material as clinician-reviewed is precisely what the flag prevents.

**Clinician profiles** carry placeholder names, qualifications and memberships.
Published qualifications are a registrable claim: list only what can be
evidenced, and fill in `registration` where your jurisdiction requires a number.

**Photography** (`src/lib/images.ts`) is remote stock. Replace it with the
group's own clinics, rooms and clinicians.

## Where to edit

| File | What it holds |
| --- | --- |
| `src/data/group.ts` | Brand, contact, nav, quick links, the `evidence` flags |
| `src/data/care.ts` | Specialties, treatments, the four care steps |
| `src/data/doctors.ts` | Clinicians, their clinics, languages and availability |
| `src/data/locations.ts` | The three clinics, hours, facilities and access |
| `src/data/content.ts` | Resources, patient journey, payment, FAQ, review placeholders |
| `src/app/globals.css` | Colours, type scale, radii |

## Things worth knowing

**The booking flow cascades correctly.** Choosing a specialty narrows the
doctors; choosing a doctor narrows the clinics to ones they actually work at.
Changing an earlier step clears a now-invalid later one rather than leaving a
combination that cannot exist.

**The home search is a real search** over specialties, treatments and
clinicians — and it says, on the page, that it is not a symptom checker.

**The urgent panel routes to a human.** No triage widget, no chat that appears
to assess symptoms. It names the case that should bypass the clinic entirely.

**Grid items holding truncated text carry `min-w-0`.** `truncate` sets
`white-space: nowrap`, and a grid item's automatic minimum is its content's
min-content — so without `min-w-0` the untruncated string sets the width and
pushes the page sideways on a 320px phone.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the group's standalone one.

**Nothing submits anywhere.** The booking flow, search and filters are local
state. Wire the booking flow to a real endpoint before launch.
