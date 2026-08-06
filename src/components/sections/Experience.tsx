import { Timeline } from "@/components/sections/Timeline";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experienceIntro } from "@/data/experience";

const HEADING_ID = "experience-heading";

export function Experience() {
  return (
    <Section id="experience" labelledBy={HEADING_ID}>
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            eyebrow={experienceIntro.eyebrow}
            heading={experienceIntro.heading}
            description={experienceIntro.description}
            align="center"
          />
        </Reveal>

        <ErrorBoundary>
          <Timeline />
        </ErrorBoundary>
      </div>
    </Section>
  );
}
