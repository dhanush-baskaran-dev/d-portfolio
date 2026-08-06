import { AchievementCard } from "@/components/sections/AchievementCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, achievementsIntro } from "@/data/achievements";

const HEADING_ID = "achievements-heading";

export function Achievements() {
  return (
    <Section id="achievements" labelledBy={HEADING_ID}>
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeading
            id={HEADING_ID}
            eyebrow={achievementsIntro.eyebrow}
            heading={achievementsIntro.heading}
            align="center"
          />
        </Reveal>

        <RevealGroup
          as="ul"
          count={achievements.length}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {achievements.map((achievement) => (
            <RevealItem as="li" key={achievement.id}>
              <AchievementCard achievement={achievement} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
