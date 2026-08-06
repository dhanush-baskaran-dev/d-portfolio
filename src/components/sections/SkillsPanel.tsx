"use client";

import { AnimatePresence, m } from "framer-motion";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { skillsLabels } from "@/data/skills";
import {
  entranceTransition,
  reducedTransition,
  revealViewport,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/utils/cn";

export interface SkillPanelCard {
  readonly id: string;
  readonly card: ReactNode;
}

export interface SkillPanelData {
  readonly id: string;
  readonly label: string;
  readonly count: number;
  /** The "All" panel: every skill at once, so it never reserves height. */
  readonly aggregate?: boolean;
  readonly cards: readonly SkillPanelCard[];
}

export interface SkillsPanelProps {
  /**
   * Cards arrive already rendered. `BrandIcon` reaches the whole Simple Icons
   * set, so importing it here would drag every mark across the client
   * boundary — only the category selection needs to be interactive.
   */
  readonly panels: readonly SkillPanelData[];
}

const FIRST_INDEX = 0;
const GRID = "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5";

function tabId(id: string): string {
  return `skills-tab-${id}`;
}

function panelId(id: string): string {
  return `skills-panel-${id}`;
}

export function SkillsPanel({ panels }: SkillsPanelProps) {
  const reduced = useReducedMotionSafe();
  const [activeIndex, setActiveIndex] = useState(FIRST_INDEX);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const lastIndex = panels.length - 1;
  const active = panels[activeIndex] ?? panels[FIRST_INDEX];

  if (active === undefined) {
    return null;
  }

  /**
   * The fullest category renders once, invisibly, in the same grid cell as the
   * live panel, so the container is always as tall as the tallest category and
   * switching cannot reflow the page — no guessed `min-h`.
   *
   * "All" is excluded from that measurement: reserving room for every skill
   * would leave a six-skill category floating in the height of fifty. Opening
   * "All" grows the section, which is what asking for everything should do.
   */
  const reservable = panels.filter((panel) => panel.aggregate !== true);
  const pool = reservable.length > 0 ? reservable : panels;
  const tallest = pool.reduce(
    (winner, panel) => (panel.cards.length > winner.cards.length ? panel : winner),
    pool[0] ?? active,
  );

  const focusTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Readonly<Record<string, number>> = {
      ArrowRight: activeIndex === lastIndex ? FIRST_INDEX : activeIndex + 1,
      ArrowDown: activeIndex === lastIndex ? FIRST_INDEX : activeIndex + 1,
      ArrowLeft: activeIndex === FIRST_INDEX ? lastIndex : activeIndex - 1,
      ArrowUp: activeIndex === FIRST_INDEX ? lastIndex : activeIndex - 1,
      Home: FIRST_INDEX,
      End: lastIndex,
    };

    const next = moves[event.key];

    if (next === undefined) {
      return;
    }

    event.preventDefault();
    focusTab(next);
  };

  const cardVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: reducedTransition } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: entranceTransition },
      };

  return (
    <div className="flex flex-col gap-8">
      <div
        role="tablist"
        aria-label={skillsLabels.railLabel}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="flex flex-wrap justify-center gap-2"
      >
        {panels.map((panel, index) => {
          const selected = index === activeIndex;

          return (
            <button
              key={panel.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={tabId(panel.id)}
              aria-selected={selected}
              aria-controls={panelId(panel.id)}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border px-4 text-sm",
                "hover-glow-sm transition-[color,background-color,border-color] duration-standard ease-state",
                selected
                  ? "border-transparent bg-accent-subtle text-accent"
                  : "border-subtle bg-raised text-secondary can-hover:hover:border-accent-edge can-hover:hover:text-primary",
              )}
            >
              {panel.label}
              <Badge variant={selected ? "accent" : "outline"} size="sm">
                {panel.count}
              </Badge>
            </button>
          );
        })}
      </div>

      <div className="grid">
        <div aria-hidden="true" className={cn(GRID, "invisible col-start-1 row-start-1")}>
          {tallest.cards.map((entry) => (
            <div key={entry.id}>{entry.card}</div>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {/*
            * `whileInView` rather than `animate`, so the cascade runs when the
            * section is scrolled to instead of silently at page load, where
            * nobody is looking. It still covers tab switches: `AnimatePresence`
            * remounts this list on every change and the fresh element is
            * already in view, so the entrance fires either way.
            */}
          <m.ul
            key={active.id}
            id={panelId(active.id)}
            role="tabpanel"
            aria-labelledby={tabId(active.id)}
            tabIndex={0}
            variants={reduced ? undefined : staggerContainer(active.cards.length)}
            initial={reduced ? { opacity: 0 } : "hidden"}
            whileInView={reduced ? { opacity: 1 } : "visible"}
            viewport={revealViewport}
            exit={{ opacity: 0 }}
            transition={reduced ? reducedTransition : undefined}
            className={cn(GRID, "col-start-1 row-start-1 content-start")}
          >
            {active.cards.map((entry) => (
              <m.li key={entry.id} variants={cardVariants}>
                {entry.card}
              </m.li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}
