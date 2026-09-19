# ORA Dental Studio — dental template 1

A calm, editorial site for a single-location dental practice. Patient-intent
entry point, treatment pages, clinician profiles and a six-step appointment
request.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide.
Statically exported, so it can be published under the dashboard or handed to a
practice to host on their own domain.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # -> out/
```

From the repo root, `npm run build dental/dental-template1` builds it into the
shared bundle instead.

## Routes

| Route | What it is |
| --- | --- |
| `/` | The full home page — 16 sections |
| `/treatments` | All treatments, grouped by category |
| `/treatments/[slug]` | One treatment, pre-rendered for all 8 |
| `/team` | The clinical team |
| `/team/[slug]` | One clinician, pre-rendered for all 4 |
| `/contact` | Location, urgent care and FAQ |

## Read this before launch

**Everything clinical in `src/data/` is placeholder scaffolding.** It is written
to be general and non-committal on purpose — no success rates, no guarantees,
no "painless". It still has to be reviewed and replaced by a qualified clinician
before the site is published.

Three things are switched **off** rather than filled with invented material,
in `src/data/clinic.ts` under `evidence`:

| Flag | Off means | Turn on when |
| --- | --- | --- |
| `rating` | The hero shows "Trusted by our patients", not a score | You have a rating from a verified review platform |
| `reviewsAreReal` | Review cards read "Patient review goes here." and a visible note says they are placeholders | You have real reviews from the practice's own profile |
| `beforeAfterEnabled` | The before/after section renders an explanation instead of a slider | You have consented clinical photography of this practice's own cases |
| `liveScheduling` | The booking flow says **request**, and the time step says the slots are preferences, not availability | The form is wired to a real scheduling system |

The placeholder notes are deliberately visible. A placeholder that looks like
real content is how invented clinical claims reach production.

**Clinician profiles** (`src/data/team.ts`) carry placeholder names,
qualifications and memberships. Published qualifications are a registrable
claim: list only what each clinician can evidence, and fill in `registration`
where your jurisdiction expects a number to be displayed.

**Photography** (`src/lib/images.ts`) is remote stock. Replace it with the
practice's own rooms, equipment and team — stock clinical imagery must not be
presented as this clinic's.

## Where to edit

| File | What it holds |
| --- | --- |
| `src/data/clinic.ts` | Name, contact, hours, nav, trust indicators, the `evidence` flags |
| `src/data/treatments.ts` | The eight treatments and the patient-intent entry points |
| `src/data/team.ts` | Clinician profiles and which treatments each can be booked for |
| `src/data/content.ts` | Patient journey, clinic tour, equipment, FAQ, review placeholders |
| `src/app/globals.css` | Colours, type scale, radii — the whole visual identity |

## Things worth knowing

**Nothing submits anywhere.** The booking dialog is local state. Wire it to a
real endpoint — and read the note about `liveScheduling` above before you
present the time step as availability.

**The booking form deliberately collects very little.** Name and phone, an
optional email, and a free-text note for access needs. It does not ask for
medical history: that conversation belongs in the consultation, not in a web
form.

**The treatment explorer is a real tablist.** Arrow keys move between
treatments and each panel is associated with its tab, so the change is
announced rather than silent.

**Never hardcode `basePath`.** It is read from `NEXT_PUBLIC_BASE_PATH` so the
same folder produces both the bundled build and the practice's standalone one.
`npm run check` at the repo root fails if that line is changed.

**Motion is opt-out.** Every animated component checks `useReducedMotion()` and
`globals.css` disables CSS animation under the same query, so the two stop
together.
