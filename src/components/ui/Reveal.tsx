"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import {
  fadeUp,
  motionVariants,
  noMotion,
  revealViewport,
  staggerContainer,
  staggerDelay,
} from "@/lib/motion";
import { cn } from "@/utils/cn";

export interface RevealProps {
  readonly children: ReactNode;
  /** Position in a staggered group. Capped at six steps by `staggerDelay`. */
  readonly index?: number;
  readonly className?: string;
  /** Renders a `<li>` inside mapped lists so the surrounding semantics hold. */
  readonly as?: "div" | "li";
}

/**
 * The standard scroll entrance: fade up 20px, once, with a -80px viewport
 * margin (SPEC §7). Every section's reveal goes through this — no section
 * hand-writes the same `whileInView` variant.
 *
 * For a *group* of siblings that should cascade, use `RevealGroup` and
 * `RevealItem` instead. This component watches the viewport itself, so a row of
 * them all trigger on the same frame and their entrances overlap.
 *
 * Under reduced motion the variant swaps for an opacity-only twin rather than
 * being switched off, so content still arrives rather than popping.
 */
export function Reveal({ children, index = 0, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotionSafe();
  const Component = as === "li" ? m.li : m.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={motionVariants(reduced, fadeUp)}
      transition={{ delay: reduced ? 0 : staggerDelay(index) }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

export type RevealGroupElement = "div" | "ul" | "ol" | "dl";

export interface RevealGroupProps {
  readonly children: ReactNode;
  /**
   * How many `RevealItem`s this group holds. Drives the per-child step, which
   * compresses for large groups so the cascade never outstays its welcome.
   */
  readonly count: number;
  readonly className?: string;
  readonly as?: RevealGroupElement;
  /** Becomes `aria-label`, for lists that need naming. */
  readonly label?: string;
}

const GROUP_ELEMENT = {
  div: m.div,
  ul: m.ul,
  ol: m.ol,
  dl: m.dl,
} as const;

/**
 * The container half of a staggered reveal.
 *
 * It is the only thing watching the viewport. When it enters, it releases its
 * `RevealItem` children in sequence — which is what makes a cascade rather than
 * a row of cards landing together.
 *
 * Children without variants of their own — a timeline rail, a decorative
 * span — are simply not part of the sequence, so a group can hold both.
 *
 * Under reduced motion the container carries no stagger at all and the items
 * fall back to their opacity-only twins, so everything simply appears.
 */
export function RevealGroup({
  children,
  count,
  className,
  as = "div",
  label,
}: RevealGroupProps) {
  const reduced = useReducedMotionSafe();
  const Component = GROUP_ELEMENT[as];

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={reduced ? noMotion : staggerContainer(count)}
      aria-label={label}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

export interface RevealItemProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "div" | "li";
}

/**
 * One member of a `RevealGroup`'s cascade.
 *
 * Deliberately declares no `initial`, no `whileInView` and no viewport: it
 * inherits the variant its parent group is in. Giving it its own trigger is
 * exactly the bug this pair exists to fix — it would start watching the
 * viewport independently and land with its siblings again.
 */
export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const reduced = useReducedMotionSafe();
  const Component = as === "li" ? m.li : m.div;

  return (
    <Component
      variants={motionVariants(reduced, fadeUp)}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
