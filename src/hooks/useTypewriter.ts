"use client";

import { useEffect, useState } from "react";

import { TYPING_INTERVAL, TYPING_START_DELAY } from "@/lib/constants";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

export interface Typewriter {
  readonly text: string;
  readonly typing: boolean;
}

/**
 * Reveals `full` one character at a time after the page-load sequence has
 * finished. Under reduced motion the complete string is returned immediately
 * and `typing` is never true, so no caret renders either.
 */
export function useTypewriter(full: string): Typewriter {
  const reduced = useReducedMotionSafe();
  const [count, setCount] = useState(reduced ? full.length : 0);
  const [started, setStarted] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setCount(full.length);
      setStarted(true);
      return;
    }

    const timer = window.setTimeout(() => setStarted(true), TYPING_START_DELAY);
    return () => window.clearTimeout(timer);
  }, [full.length, reduced]);

  useEffect(() => {
    if (!started || reduced || count >= full.length) {
      return;
    }

    const timer = window.setTimeout(() => setCount((n) => n + 1), TYPING_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [started, reduced, count, full.length]);

  return {
    text: full.slice(0, count),
    typing: started && !reduced && count < full.length,
  };
}
