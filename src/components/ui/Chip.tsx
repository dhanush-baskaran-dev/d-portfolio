import type { ReactNode } from "react";

import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { icons } from "@/lib/icons";
import type { BrandSlug, IconName } from "@/types";
import { cn } from "@/utils/cn";

export interface ChipProps {
  /** Brand mark, taken from a `brand:` slug in `data/`. Wins over `icon`. */
  readonly brand?: BrandSlug;
  /** Interface glyph, for chips whose subject has no brand mark. */
  readonly icon?: IconName;
  readonly variant?: BadgeVariant;
  /** Trailing slot — the proficiency meter in Skills, an arrow elsewhere. */
  readonly trailing?: ReactNode;
  readonly className?: string;
  readonly children: ReactNode;
}

/**
 * A badge with an optional leading mark and a trailing slot.
 *
 * It composes `Badge`, so pill geometry is declared exactly once, and it takes
 * its icon as *data* — a slug or a glyph name — so no section ever writes icon
 * JSX of its own (SPEC reusability contract §1).
 */
export function Chip({
  brand,
  icon,
  variant = "default",
  trailing,
  className,
  children,
}: ChipProps) {
  const Glyph = icon === undefined ? undefined : icons[icon];

  return (
    <Badge variant={variant} size="md" className={cn("gap-2", className)}>
      {brand !== undefined ? (
        <BrandIcon slug={brand} decorative />
      ) : Glyph !== undefined ? (
        <Glyph className="size-4 shrink-0 text-secondary" aria-hidden="true" />
      ) : null}

      <span className="truncate">{children}</span>

      {trailing}
    </Badge>
  );
}
