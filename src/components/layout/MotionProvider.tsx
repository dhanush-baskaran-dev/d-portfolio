"use client";

import { domMax, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

export interface MotionProviderProps {
  readonly children: ReactNode;
}

/**
 * Loads a feature bundle through `LazyMotion` rather than pulling in the whole
 * `motion.*` runtime, and `strict` makes that enforceable rather than
 * aspirational: rendering a `motion.*` component anywhere under this provider
 * throws, so the small `m.*` variant is the only way to animate.
 *
 * SPEC §7 names `domAnimation`, but that bundle is `animations + gestures`
 * only — `layout` and `drag` ship exclusively in `domMax`. Three specified
 * features depend on them and fail *silently* under `domAnimation`: the
 * `layoutId` nav pill (§4.1), the skill chips' `layout` transition (§4.4) and
 * the carousel's drag/swipe (§4.9). `domMax` is the smallest bundle that makes
 * the spec's own sections work, and it keeps §7's intent — LazyMotion plus
 * `m.*`, never the full runtime.
 *
 * Children are passed through, so wrapping the tree here does not push any
 * section across the client boundary.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
