"use client";

import { useEffect, useRef, useState } from "react";

import { ACTIVE_SECTION_ROOT_MARGIN } from "@/lib/constants";

/** Slack for fractional scroll offsets and browser rounding. */
const EDGE_TOLERANCE = 2;

/**
 * Scroll-spy driven by `IntersectionObserver`, never by scroll math (SPEC §4.1).
 *
 * The root margin collapses the viewport to a band across its middle; whichever
 * section occupies that band is active. When several qualify — short sections
 * stacked together — the one furthest down the document wins, which matches the
 * direction a reader is travelling.
 *
 * Both ends of the document are special-cased, because the band alone gets them
 * wrong. A section shorter than the distance from the top of the page to the
 * band never intersects it, so at rest at the top the pill would sit on the
 * *second* section; and once the footer fills the band no section intersects it
 * at all, so the pill would stick wherever it was. The scroll listener only
 * resolves these two cases — the middle of the document stays observer-driven.
 */
export function useActiveSection(ids: readonly string[]): string | undefined {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0]);
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const resolve = () => {
      if (window.scrollY <= EDGE_TOLERANCE) {
        setActiveId(ids[0]);
        return;
      }

      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - EDGE_TOLERANCE;

      if (reachedBottom) {
        setActiveId(ids[ids.length - 1]);
        return;
      }

      for (let index = ids.length - 1; index >= 0; index -= 1) {
        const id = ids[index];

        if (id !== undefined && visible.current.has(id)) {
          setActiveId(id);
          return;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.current.add(entry.target.id);
          } else {
            visible.current.delete(entry.target.id);
          }
        }

        resolve();
      },
      { rootMargin: ACTIVE_SECTION_ROOT_MARGIN, threshold: 0 },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    // Setting the same id is a no-op in React, so a scroll costs no render
    // unless the active section actually changed.
    window.addEventListener("scroll", resolve, { passive: true });
    window.addEventListener("resize", resolve);
    resolve();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", resolve);
      window.removeEventListener("resize", resolve);
    };
  }, [ids]);

  return activeId;
}
