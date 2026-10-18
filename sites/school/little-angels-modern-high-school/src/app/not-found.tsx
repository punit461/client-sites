import { Container, CtaButton, Crest } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="py-28">
      <Container className="flex flex-col items-center text-center">
        <Crest className="h-20 w-20" />
        <h1 className="display-lg mt-8 text-navy">This page has wandered off</h1>
        <p className="mt-4 max-w-md text-ink-soft">The page you were looking for isn&apos;t here. Let&apos;s get you back to school.</p>
        <CtaButton href="/" className="mt-8">
          Back to the home page
        </CtaButton>
      </Container>
    </section>
  );
}
