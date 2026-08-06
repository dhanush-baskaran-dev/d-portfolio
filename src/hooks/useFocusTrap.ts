"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableWithin(container: HTMLElement): HTMLElement[] {
  return [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
    (element) => element.offsetParent !== null || element === document.activeElement,
  );
}

/**
 * Confines Tab and Shift+Tab to `container` while `active`, then returns focus
 * to whatever was focused before — which is the control that opened the overlay,
 * so the user lands back where they were (SPEC §4.1, §8).
 *
 * Extracted rather than inlined so the trap is testable on its own and so the
 * next overlay the site grows does not copy the key handling.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const container = containerRef.current;

    if (!active || container === null) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    focusableWithin(container)[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusable = focusableWithin(container);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (first === undefined || last === undefined) {
        event.preventDefault();
        return;
      }

      // Focus can escape the overlay entirely — a browser chrome round-trip,
      // a programmatic blur — so re-entry is handled as its own case.
      if (!container.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [active, containerRef]);
}
