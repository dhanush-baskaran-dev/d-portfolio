import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export type BadgeVariant = "default" | "accent" | "outline";
export type BadgeSize = "sm" | "md";

export interface BadgeProps {
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
  readonly className?: string;
  readonly children: ReactNode;
}

// `w-fit` because `inline-flex` still stretches inside a flex-column parent,
// which would let a badge span the whole card.
const BASE =
  "inline-flex w-fit items-center gap-1.5 rounded-lg border font-medium " +
  "whitespace-nowrap align-middle";

const VARIANT: Readonly<Record<BadgeVariant, string>> = {
  default: "border-subtle bg-overlay text-secondary",
  accent: "border-transparent bg-accent-subtle text-accent",
  outline: "border-strong bg-transparent text-tertiary",
};

const SIZE: Readonly<Record<BadgeSize, string>> = {
  sm: "px-2 py-1 text-xs",
  md: "px-2.5 py-1.5 text-sm",
};

/**
 * The one pill surface: tech badges, the "Present" marker, category labels.
 * `Chip` composes this rather than redrawing the border and radius.
 */
export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
}: BadgeProps) {
  return (
    <span className={cn(BASE, VARIANT[variant], SIZE[size], className)}>
      {children}
    </span>
  );
}
