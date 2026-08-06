"use client";

import { useReducedMotion } from "framer-motion";

/**
 * `useReducedMotion` returns `null` until it has read the media query, which
 * makes every call site handle three states. This narrows it to a boolean and
 * errs toward "reduced" being false on the server, so the first paint is the
 * ordinary one and no animation is ever *added* after hydration.
 */
export function useReducedMotionSafe(): boolean {
  return useReducedMotion() === true;
}
