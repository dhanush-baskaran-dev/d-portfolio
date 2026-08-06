import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

/** See the note on `CardElement` — `ElementType` collapses `children` to `never`. */
export type GlassElement = "div" | "figure" | "aside" | "section" | "header";

export type GlassRadius = "md" | "lg" | "xl" | "none";

/** Full-bleed surfaces show only the edge that meets content. */
export type GlassEdge = "all" | "bottom" | "none";

export interface GlassPanelProps {
  readonly as?: GlassElement;
  readonly radius?: GlassRadius;
  readonly edge?: GlassEdge;
  readonly className?: string;
  readonly children?: ReactNode;
}

const RADIUS: Readonly<Record<GlassRadius, string>> = {
  none: "",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
};

const EDGE: Readonly<Record<GlassEdge, string>> = {
  all: "border border-glass-border",
  bottom: "border-b border-glass-border",
  none: "",
};

/**
 * The single glass recipe (SPEC §2): a 3% white wash, a heavy backdrop blur, an
 * 8% border and a 1px top highlight carried by `--shadow-glass`.
 *
 * Glass is permitted in exactly three places — the scrolled navbar, the hero
 * visual panel and testimonial cards. Everything else uses `Card`.
 */
export function GlassPanel({
  as: Component = "div",
  radius = "lg",
  edge = "all",
  className,
  children,
}: GlassPanelProps) {
  return (
    <Component
      className={cn(
        "bg-glass shadow-glass backdrop-blur-xl",
        EDGE[edge],
        RADIUS[radius],
        className,
      )}
    >
      {children}
    </Component>
  );
}
