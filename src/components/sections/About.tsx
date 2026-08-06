import { StatGrid } from "@/components/sections/StatGrid";
import { Badge } from "@/components/ui/Badge";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, profile } from "@/data/profile";

const HEADING_ID = "about-heading";

export function About() {
  return (
    <Section id="about" labelledBy={HEADING_ID}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <Reveal className="mx-auto w-full max-w-sm lg:mx-0 lg:w-80 lg:shrink-0">
            <div className="relative">
              <Media
                src={about.portrait.src}
                alt={about.portrait.alt}
                aspect="portrait"
                radius="xl"
                seed={profile.name}
                sizes="(min-width: 1024px) 20rem, (min-width: 640px) 24rem, 100vw"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-t from-accent-subtle to-transparent"
              />
              <Badge
                variant="outline"
                size="sm"
                className="absolute bottom-4 left-4 font-mono"
              >
                {about.portrait.caption}
              </Badge>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5 lg:flex-1">
            <Reveal>
              {/* `align` omitted: left is the `SectionHeading` default. */}
              <SectionHeading
                id={HEADING_ID}
                eyebrow={about.eyebrow}
                heading={about.heading}
              />
            </Reveal>

            <Reveal index={1}>
              <div className="flex flex-col gap-4">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="max-w-prose text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* No `Reveal` wrapper: `StatGrid` is its own reveal container now, and
            fading the whole grid in first would mask the cascade inside it. */}
        <ErrorBoundary>
          <StatGrid />
        </ErrorBoundary>
      </div>
    </Section>
  );
}
