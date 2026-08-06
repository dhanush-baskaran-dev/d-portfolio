"use client";

import { m, useScroll } from "framer-motion";
import { useRef } from "react";

import { ExperienceItem } from "@/components/sections/ExperienceItem";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { experience, experienceLabels } from "@/data/experience";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { cn } from "@/utils/cn";

/**
 * The rail. One declaration, shared by the resting track and the scroll-linked
 * accent fill drawn over it, so the two can never sit a pixel apart.
 *
 * Below `lg` it hugs the left edge; from `lg` it runs down the centre and the
 * entries alternate around it.
 */
const RAIL = "absolute top-2 bottom-2 w-px left-1.5 lg:left-1/2 lg:-translate-x-1/2";

export function Timeline() {
  /*
   * The scroll target is the wrapper rather than the `<ol>`, because the list
   * is now a `RevealGroup` and owns its own element. The wrapper spans exactly
   * the same box, so the fill progress is unchanged.
   */
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <div
      ref={ref}
      /*
       * `lg:max-w-5xl` is the ultrawide cap: two half-width columns need more
       * room than the single stacked rail, but letting them take the full
       * container would strand each card far from the rail it belongs to.
       */
      className="relative mx-auto w-full max-w-3xl lg:max-w-5xl"
    >
      <span aria-hidden="true" className={cn(RAIL, "bg-subtle")} />

      <m.span
        aria-hidden="true"
        style={reduced ? undefined : { scaleY: scrollYProgress }}
        className={cn(RAIL, "origin-top bg-accent")}
      />

      <RevealGroup as="ol" count={experience.length} label={experienceLabels.timeline}>
        {experience.map((entry, index) => {
          /* Entry 1 right, entry 2 left, entry 3 right — from `lg` only. */
          const side = index % 2 === 0 ? "right" : "left";

          return (
            <RevealItem
              as="li"
              key={entry.id}
              className={cn(
                /*
                 * Narrow screens: one left rail, every entry stacked to its
                 * right. No alternating, so nothing is ever half-width.
                 */
                "relative pb-14 pl-10 last:pb-0",
                "lg:w-1/2 lg:pb-16",
                side === "right"
                  ? "lg:ml-auto lg:pl-12"
                  : "lg:mr-auto lg:pr-12 lg:pl-0",
              )}
            >
              <ExperienceItem entry={entry} side={side} />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
