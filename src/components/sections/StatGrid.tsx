"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

import { StatCard } from "@/components/sections/StatCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { stats } from "@/data/stats";
import { REVEAL_MARGIN } from "@/lib/constants";

/**
 * The wrapper keeps the `useInView` ref that starts the count-up, so the
 * numbers still begin counting for the grid as a whole rather than per card.
 *
 * Each card is its own `<dl>` rather than the grid being one shared list.
 * `<dl>` accepts *at most one* `<div>` between itself and a `<dt>`/`<dd>` pair,
 * and the cascade needs a wrapper element per item — a shared list would have
 * put two (the reveal wrapper and the card surface) and made the markup
 * invalid. One term and one description per card is exactly what a `<dl>`
 * describes anyway.
 */
export function StatGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: REVEAL_MARGIN });

  return (
    <div ref={ref}>
      <RevealGroup
        count={stats.length}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <RevealItem key={stat.id}>
            <StatCard stat={stat} active={inView} />
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
