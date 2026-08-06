import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export type CardPadding = "none" | "sm" | "md" | "lg";

/**
 * A closed list of host tags rather than `ElementType`.
 *
 * `ElementType` admits component types whose `children` prop is `never`, which
 * makes the union's `children` resolve to `never` and rejects every child at
 * the call site. Naming the intrinsic tags keeps this polymorphic and typed.
 */
export type CardElement = "div" | "article" | "li" | "section" | "aside" | "dl";

export interface CardProps {
  /** Lets a card become an `<article>` or `<li>` without losing the surface. */
  readonly as?: CardElement;
  /** Adds the shared hover lift, only on devices that can hover (SPEC §4.6). */
  readonly interactive?: boolean;
  readonly padding?: CardPadding;
  readonly className?: string;
  readonly children: ReactNode;
}

const PADDING: Readonly<Record<CardPadding, string>> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

/**
 * The shared raised surface. Project, article, achievement and stat cards
 * compose this — none of them redraws a border, a radius or an elevation.
 *
 * The hover state moves `transform`, `border-color` and the shared `hover-glow`
 * opacity only; nothing that triggers layout (SPEC §4.6).
 */
export function Card({
  as: Component = "div",
  interactive = false,
  padding = "md",
  className,
  children,
}: CardProps) {
  return (
    <Component
      className={cn(
        "relative rounded-2xl border border-subtle bg-raised shadow-ambient",
        PADDING[padding],
        interactive && [
          "hover-glow",
          "transition-[border-color,transform] duration-standard ease-state",
          "can-hover:hover:border-accent-edge",
          "motion-safe:can-hover:hover:-translate-y-1",
        ],
        className,
      )}
    >
      {children}
    </Component>
  );
}
