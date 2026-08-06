import { SkillCard } from "@/components/sections/SkillCard";
import {
  SkillsPanel,
  type SkillPanelData,
} from "@/components/sections/SkillsPanel";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories, skillsIntro } from "@/data/skills";
import type { Skill } from "@/types";

const HEADING_ID = "skills-heading";

function toCards(skills: readonly Skill[]) {
  return skills.map((skill) => ({
    id: skill.id,
    card: <SkillCard skill={skill} />,
  }));
}

/** One panel per category, in data order. The first is active by default. */
const panels: readonly SkillPanelData[] = skillCategories.map((category) => ({
  id: category.id,
  label: category.label,
  count: category.skills.length,
  cards: toCards(category.skills),
}));

export function Skills() {
  return (
    <Section id="skills" labelledBy={HEADING_ID}>
      <div className="flex flex-col gap-8">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            eyebrow={skillsIntro.eyebrow}
            heading={skillsIntro.heading}
            description={skillsIntro.description}
            align="center"
          />
        </Reveal>

        <Reveal index={1}>
          <ErrorBoundary>
            <SkillsPanel panels={panels} />
          </ErrorBoundary>
        </Reveal>
      </div>
    </Section>
  );
}
