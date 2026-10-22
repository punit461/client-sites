import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Img from "@/components/ui/Img";
import { facilities } from "@/content/campus";
import { icons } from "@/lib/icons";

/**
 * Facilities as an editorial collage of mixed sizes. The pattern repeats
 * every eight items; a facility without a photo becomes a navy accent panel.
 * Every description is visible — nothing is hidden behind hover.
 */
const layout = [
  "lg:col-span-7 lg:row-span-2", // large
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-7",
];

export default function FacilityCollage({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <Stagger as="ul" className="grid auto-rows-[minmax(18rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[19rem]">
      {facilities.map((f, i) => {
        const span = layout[i % layout.length];
        const Icon = f.icon ? icons[f.icon] : null;
        return (
          <StaggerItem as="li" key={f.slug} className={`${span} ${i === 0 ? "sm:col-span-2 lg:col-span-7" : ""}`} >
            <article id={f.slug} className="group relative flex h-full min-h-[18rem] flex-col justify-end overflow-hidden rounded-xs bg-navy text-white">
              {f.photo ? (
                <>
                  <Img
                    photo={f.photo}
                    width={i === 0 ? 760 : 520}
                    sizes={i === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"}
                    className="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/45 to-transparent" />
                </>
              ) : (
                <div aria-hidden className="absolute right-6 top-6 text-gold/90">{Icon ? <Icon className="h-12 w-12" strokeWidth={1.2} /> : null}</div>
              )}
              <div className={`relative p-6 sm:p-7 ${i === 0 ? "lg:p-10" : ""}`}>
                <H className={`${i === 0 ? "t-h2" : "t-h3"} text-white`}>{f.name}</H>
                <p className={`mt-2 max-w-md text-white/80 ${i === 0 ? "t-lead" : "text-[0.94rem]"}`}>{f.text}</p>
              </div>
            </article>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
