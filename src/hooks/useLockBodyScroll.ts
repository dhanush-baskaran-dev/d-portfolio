"use client";

import { useEffect } from "react";

/**
 * Locks background scrolling while an overlay is open.
 *
 * The scrollbar's width is replaced with padding so the page behind the overlay
 * does not shift sideways when it disappears — a CLS bug that is easy to miss
 * because it only shows on pointer devices.
 */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [locked]);
}
