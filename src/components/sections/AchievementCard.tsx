import { Card } from "@/components/ui/Card";
import { icons } from "@/lib/icons";
import type { Achievement } from "@/types";

export interface AchievementCardProps {
  readonly achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const Icon = icons[achievement.icon];
  const { link } = achievement;

  return (
    <Card as="article" interactive padding="md" className="group flex h-full flex-col gap-4">
      <span className="inline-flex size-10 items-center justify-center rounded-lg border border-subtle bg-overlay transition-colors duration-standard ease-state can-hover:group-hover:border-accent-edge">
        <Icon
          aria-hidden="true"
          className="size-5 text-secondary transition-colors duration-standard ease-state can-hover:group-hover:text-accent"
        />
      </span>

      <p className="font-mono text-eyebrow uppercase text-tertiary">
        {achievement.type}
      </p>

      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium text-primary">
          {link === undefined ? (
            achievement.title
          ) : (
            <a
              href={link.href}
              className="stretched-link"
              {...(link.external === true
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              {achievement.title}
            </a>
          )}
        </h3>
        <p className="text-sm text-secondary">{achievement.issuer}</p>
      </div>

      <p className="mt-auto font-mono text-eyebrow text-tertiary">{achievement.year}</p>
    </Card>
  );
}
