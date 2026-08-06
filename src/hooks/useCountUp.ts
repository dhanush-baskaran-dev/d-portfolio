"use client";

import { animate } from "framer-motion";
import { useEffect, useState } from "react";

import { DURATION, EASE } from "@/lib/motion";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

interface CountUpOptions {
  /** Counting starts the first time this is true and never restarts. */
  readonly active: boolean;
  readonly duration?: number;
}

/**
 * Counts from zero to `target` once (SPEC §4.3).
 *
 * Under reduced motion the final value is returned immediately — there is no
 * animation to shorten, the count simply does not happen.
 */
export function useCountUp(
  target: number,
  { active, duration = DURATION.hero * 2 }: CountUpOptions,
): number {
  const reduced = useReducedMotionSafe();
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (!active) {
      return;
    }

    if (reduced) {
      setValue(target);
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: EASE.entrance,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [active, duration, reduced, target]);

  return value;
}
