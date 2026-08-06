import { ProficiencyBadge } from "@/components/sections/ProficiencyBadge";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Card } from "@/components/ui/Card";
import { skillsLabels } from "@/data/skills";
import type { Skill } from "@/types";
import { interpolate } from "@/utils/format";

export interface SkillCardProps {
  readonly skill: Skill;
}

/**
 * A Server Component, and it has to stay one: `BrandIcon` reaches the whole
 * Simple Icons set, and rendering it on the client would pull every mark into
 * the bundle.
 */
export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Card as="div" interactive padding="sm" className="group flex h-full flex-col gap-3">
      {/* `min-w-0` + `truncate` keep the name on one line, so every card in the
          grid is the same height and no card carries slack above the meter. */}
      <div className="flex min-w-0 items-center gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-subtle bg-overlay transition-colors duration-standard ease-state can-hover:group-hover:border-accent-edge">
          <BrandIcon slug={skill.brand} decorative size="md" />
        </span>
        <span className="truncate text-sm font-medium text-primary">
          {skill.name}
        </span>
      </div>

      <ProficiencyBadge
        level={skill.proficiency}
        label={interpolate(skillsLabels.proficiencyFormat, {
          name: skill.name,
          level: skillsLabels.proficiencyLevels[skill.proficiency],
        })}
      />
    </Card>
  );
}
