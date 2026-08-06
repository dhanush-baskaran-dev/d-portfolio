import type { Transition, Variants } from "framer-motion";

import { REVEAL_MARGIN } from "@/lib/constants";

/**
 * The shared motion layer (SPEC §2 motion tokens).
 *
 * Components import these variants; they never re-declare a duration, an easing
 * curve or a translate distance inline. Entrances travel 16–24px, never more.
 */

export const DURATION = {
  micro: 0.15,
  standard: 0.25,
  entrance: 0.4,
  hero: 0.6,
} as const;

export const EASE = {
  /** Entrances. */
  entrance: [0.16, 1, 0.3, 1],
  /** State changes. */
  state: [0.4, 0, 0.2, 1],
} as const;

export const DISTANCE = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

/** 60ms between siblings, capped at six items (SPEC §2). */
export const STAGGER_STEP = 0.06;
export const STAGGER_CAP = 6;

/**
 * Ceiling on how long a whole group may take to finish arriving, in seconds.
 *
 * Without it a fifty-card grid at 60ms a piece would still be animating three
 * seconds after it scrolled into view. Past this, the step compresses instead
 * of the group running longer.
 */
export const STAGGER_MAX_TOTAL = 0.48;

/** Delay for the nth sibling in a staggered group, capped so late items never lag. */
export function staggerDelay(index: number, step: number = STAGGER_STEP): number {
  return Math.min(index, STAGGER_CAP - 1) * step;
}

/** The per-child step for a group of `count`, compressed to respect the cap. */
export function staggerStepFor(count: number, step: number = STAGGER_STEP): number {
  if (count <= 1) {
    return 0;
  }

  return Math.min(step, STAGGER_MAX_TOTAL / (count - 1));
}

/**
 * Container variants for a staggered group.
 *
 * The container is what owns the sequencing: it enters the viewport once, then
 * releases its children one at a time. This is the difference between a cascade
 * and what per-item `whileInView` produces — there, every card in a row crosses
 * the threshold on the same frame, so their entrances collapse onto each other
 * however much per-item delay they carry.
 */
export function staggerContainer(count: number, step?: number): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerStepFor(count, step),
        delayChildren: DURATION.micro,
      },
    },
  };
}

export const entranceTransition: Transition = {
  duration: DURATION.entrance,
  ease: EASE.entrance,
};

export const stateTransition: Transition = {
  duration: DURATION.standard,
  ease: EASE.state,
};

export const microTransition: Transition = {
  duration: DURATION.micro,
  ease: EASE.state,
};

/** The opacity-only transition used on every reduced-motion path (≤120ms). */
export const reducedTransition: Transition = {
  duration: 0.12,
  ease: "linear",
};

/** The standard scroll-entrance viewport, shared by `Reveal` and the timeline. */
export const revealViewport = {
  once: true,
  margin: REVEAL_MARGIN,
} as const;

/* -------------------------------------------------------------------------- */
/* Variants                                                                    */
/* -------------------------------------------------------------------------- */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: DISTANCE.md },
  visible: { opacity: 1, y: 0, transition: entranceTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: entranceTransition },
};

/**
 * Entrance for the LCP heading: it travels but never fades, so the text is
 * painted on the first frame. Fading it would postpone LCP by the duration of
 * the animation (SPEC §7).
 */
export const riseOnly: Variants = {
  hidden: { y: DISTANCE.sm },
  visible: { y: 0, transition: entranceTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.hero, ease: EASE.entrance },
  },
};

/** Reduced-motion twin of every entrance variant above. */
export const fadeStill: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: reducedTransition },
};

/** For elements that must not move or fade at all under reduced motion. */
export const noMotion: Variants = { hidden: {}, visible: {} };

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER_STEP, delayChildren: DURATION.micro },
  },
};

/** Direction-aware carousel slide. `custom` is `1` forward, `-1` backward. */
export const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * DISTANCE.lg,
  }),
  center: { opacity: 1, x: 0, transition: entranceTransition },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -DISTANCE.lg,
    transition: stateTransition,
  }),
};

/**
 * Picks the motion-safe variant or its opacity-only twin.
 * Every animated component routes through this instead of branching inline.
 */
export function motionVariants(reduced: boolean, variants: Variants): Variants {
  return reduced ? fadeStill : variants;
}
