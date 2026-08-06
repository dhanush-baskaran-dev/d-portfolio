import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonialsIntro } from "@/data/testimonials";

const HEADING_ID = "testimonials-heading";

export function Testimonials() {
  return (
    <Section id="testimonials" labelledBy={HEADING_ID}>
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            eyebrow={testimonialsIntro.eyebrow}
            heading={testimonialsIntro.heading}
            align="center"
          />
        </Reveal>

        <ErrorBoundary>
          <TestimonialCarousel />
        </ErrorBoundary>
      </div>
    </Section>
  );
}
