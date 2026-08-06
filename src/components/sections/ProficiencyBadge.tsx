import { Badge } from "@/components/ui/Badge";
import { skillsLabels } from "@/data/skills";
import type { Proficiency } from "@/types";

export interface ProficiencyBadgeProps {
  readonly level: Proficiency;
  /** Full accessible sentence, so the pill is never read without its skill. */
  readonly label: string;
}

/**
 * The proficiency pill.
 *
 * Composes `Badge`, so pill geometry and the tinted surface are declared once
 * rather than redrawn here, and reads its text from
 * `skillsLabels.proficiencyLevels` — the single level→label map, shared with
 * the accessible sentence so the two can never disagree.
 *
 * The visible label is `aria-hidden` and paired with an sr-only sentence: on
 * its own "Expert" is ambiguous, while "React — Expert" is not.
 */
export function ProficiencyBadge({ level, label }: ProficiencyBadgeProps) {
  return (
    <Badge variant="default" size="sm" className="font-mono uppercase">
      <span aria-hidden="true">{skillsLabels.proficiencyLevels[level]}</span>
      <span className="sr-only">{label}</span>
    </Badge>
  );
}
