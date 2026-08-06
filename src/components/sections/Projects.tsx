import { ProjectCard } from "@/components/sections/ProjectCard";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, projectsIntro } from "@/data/projects";

const HEADING_ID = "projects-heading";

export function Projects() {
  return (
    <Section id="projects" labelledBy={HEADING_ID}>
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            eyebrow={projectsIntro.eyebrow}
            heading={projectsIntro.heading}
            description={projectsIntro.description}
            align="center"
          />
        </Reveal>

        <ErrorBoundary>
          <RevealGroup
            as="ul"
            count={projects.length}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <RevealItem as="li" key={project.id} className="h-full">
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        </ErrorBoundary>
      </div>
    </Section>
  );
}
