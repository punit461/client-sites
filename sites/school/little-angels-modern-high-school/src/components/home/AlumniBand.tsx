import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Container, CtaButton, Eyebrow, Photo } from "@/components/ui/primitives";
import { img } from "@/lib/asset";

export default function AlumniBand() {
  return (
    <section className="py-6 sm:py-10">
      <Container wide>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-navy-dark text-white">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[18rem] lg:min-h-[28rem]">
              <Photo src={img.alumniMarchPast} alt="A march-past with house flags, from the school's 1990s photo archive" sizes="(min-width: 1024px) 50vw, 100vw" />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-dark" aria-hidden />
            </div>
            <Reveal className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <Eyebrow onDark>Museum of Little Angels</Eyebrow>
              <h2 className="display-lg mt-4">Once a Little Angel, always a Little Angel</h2>
              <p className="mt-5 leading-relaxed text-white/75 sm:text-lg">
                Our alumni gallery is filled with treasured photographs from the 1990s onwards — laughter in classrooms,
                victories on the playground and milestones shared with teachers and friends.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaButton href="/alumni/" variant="gold">
                  Visit the alumni museum <ArrowRight className="h-4 w-4" aria-hidden />
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
