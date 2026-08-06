"use client";

import { Card } from "@/components/ui/Card";
import { useCountUp } from "@/hooks/useCountUp";
import { icons } from "@/lib/icons";
import type { GlyphTone, Stat } from "@/types";
import { cn } from "@/utils/cn";
import { formatStat } from "@/utils/format";

/**
 * Tone → utility. Tailwind only ships classes it can see as literals, so the
 * mapping has to be a static record rather than an interpolated class name.
 */
const TONE: Readonly<Record<GlyphTone, string>> = {
  sky: "text-glyph-sky",
  violet: "text-glyph-violet",
  teal: "text-glyph-teal",
  amber: "text-glyph-amber",
};

export interface StatCardProps {
  readonly stat: Stat;
  /** Counting starts when the grid enters the viewport, not per card. */
  readonly active: boolean;
}

export function StatCard({ stat, active }: StatCardProps) {
  const value = useCountUp(stat.value, { active });
  const Icon = icons[stat.icon];

  return (
    /*
     * `as="dl"`: this card *is* the description list — one term, one value.
     * See the note in `StatGrid` for why the list is per-card rather than one
     * list around the whole grid.
     *
     * A `<dl>` accepts only `<dt>`/`<dd>` groups (or `<div>` wrappers), so
     * neither the icon nor the hover rule may sit here as a sibling. Both live
     * inside the `<dd>` instead; the rule still positions against the card,
     * which is the nearest positioned ancestor either way.
     */
    <Card
      as="dl"
      interactive
      padding="sm"
      className="group flex flex-col-reverse gap-1"
    >
      {/* `tracking-wide` stands in for the letter-spacing that came free with
          the `text-eyebrow` token, which is a step larger than this card wants. */}
      <dt className="font-mono text-xs uppercase tracking-wide text-tertiary">
        {stat.label}
      </dt>

      {/* The reversed column puts this row above the label while keeping the
          `<dt>`/`<dd>` pair in source order. */}
      <dd className="flex items-center gap-2 text-2xl font-semibold leading-tight tabular-nums text-primary">
        <Icon
          aria-hidden="true"
          className={cn("size-5 shrink-0", TONE[stat.tone])}
        />
        <span>{formatStat(value, stat.suffix)}</span>

        {/*
         * Inset by the card's own 16px corner radius, which is exactly where
         * the bottom edge stops curving — at full width the rule ran straight
         * past the rounded corners and poked out either side. `bottom-0.5`
         * lifts it off the border so it reads as a rule inside the card, not a
         * second edge.
         */}
        <span
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0.5 h-px origin-left scale-x-0 rounded-full bg-accent transition-transform duration-standard ease-state can-hover:group-hover:scale-x-100"
        />
      </dd>
    </Card>
  );
}
