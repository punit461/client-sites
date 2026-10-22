import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import Img from "@/components/ui/Img";
import { lifeItems } from "@/content/campus";
import { icons } from "@/lib/icons";

/**
 * Student life as a photographic mosaic, broken up by coloured accent panels
 * for the items that are better told in words than in a stock photo.
 */
export default function LifeMosaic({ tone = "dark", headingLevel = "h3" }: { tone?: "dark" | "light"; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const accents = ["bg-gold text-navy-deep", "bg-blue text-white", "bg-ivory text-navy"];
  let accent = 0;
  return (
    <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {lifeItems.map((item, i) => {
        // The first item spans two columns; widen the last one too if that would leave a hole.
        const wide = i === 0 || (i === lifeItems.length - 1 && (lifeItems.length + 1) % 3 === 2);
        if (item.photo)
          return (
            <StaggerItem as="li" key={item.title} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : wide ? "lg:col-span-2" : ""}>
              <article className="group flex h-full flex-col">
                <div className={`relative overflow-hidden rounded-xs ${i === 0 ? "aspect-[16/9]" : wide ? "aspect-[4/3] lg:aspect-[21/9]" : "aspect-[4/3]"}`}>
                  <Img
                    photo={item.photo}
                    width={wide ? 820 : 420}
                    sizes={wide ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                    className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <H className={`t-h3 mt-5 ${tone === "dark" ? "text-white" : ""}`}>{item.title}</H>
                <p className={`mt-2 text-[0.95rem] ${tone === "dark" ? "text-white/70" : ""}`}>{item.text}</p>
              </article>
            </StaggerItem>
          );
        const Icon = item.icon ? icons[item.icon] : null;
        const cls = accents[accent++ % accents.length];
        return (
          <StaggerItem as="li" key={item.title} className={wide ? "lg:col-span-2" : ""}>
            <article className={`flex h-full min-h-64 flex-col justify-between rounded-xs p-7 ${cls}`}>
              {Icon ? <Icon className="h-9 w-9 opacity-80" strokeWidth={1.3} aria-hidden /> : null}
              <div className="mt-10">
                <H className="t-h3 !text-current">{item.title}</H>
                <p className="mt-2 text-[0.95rem] opacity-85">{item.text}</p>
              </div>
            </article>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
