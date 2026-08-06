"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { Badge } from "@/components/ui/Badge";
import { experienceLabels } from "@/data/experience";
import { TIMELINE_NODE_MARGIN } from "@/lib/constants";
import type { ExperienceEntry } from "@/types";
import { cn } from "@/utils/cn";

/** Which side of the centre rail this entry sits on, from `lg` up. */
export type ExperienceSide = "left" | "right";

export interface ExperienceItemProps {
  readonly entry: ExperienceEntry;
  /**
   * Below `lg` every entry stacks to the right of a left-hand rail, so this
   * only ever changes which edge the node and its connector attach to on
   * desktop.
   */
  readonly side?: ExperienceSide;
}

export function ExperienceItem({ entry, side = "right" }: ExperienceItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reached = useInView(ref, { once: true, margin: TIMELINE_NODE_MARGIN });

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1.5 left-0 size-3 rounded-full border-2 bg-surface",
          "transition-colors duration-standard ease-state",
          /*
           * The node straddles the rail rather than sitting beside it: the
           * entry's inner edge *is* the rail on desktop, so half the dot is
           * pulled back across it.
           */
          side === "right"
            ? "lg:-translate-x-1/2"
            : "lg:left-auto lg:right-0 lg:translate-x-1/2",
          reached ? "border-accent bg-accent-subtle" : "border-strong",
        )}
      />

      {/* Ties the node to its card. Desktop only — stacked entries sit close
          enough to the rail that a connector would just be clutter. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-3 hidden h-px w-10 lg:block",
          "transition-colors duration-standard ease-state",
          side === "right" ? "left-1.5" : "right-1.5",
          reached ? "bg-accent" : "bg-strong",
        )}
      />

      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-strong bg-raised font-mono text-xs text-secondary">
          {entry.monogram}
        </span>
        <h3 className="text-base font-medium text-primary">{entry.company}</h3>
        {entry.current ? (
          <Badge variant="accent" size="sm">
            {experienceLabels.present}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-primary">{entry.position}</p>
        <p className="font-mono text-eyebrow text-tertiary">
          {entry.duration} · {entry.location}
        </p>
      </div>

      <ul className="flex max-w-prose list-disc flex-col gap-2 pl-5 text-secondary marker:text-tertiary">
        {entry.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-2">
        {entry.technologies.map((technology) => (
          <li key={technology}>
            <Badge variant="default" size="sm">
              {technology}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
