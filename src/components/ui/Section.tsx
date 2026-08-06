import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";

/** `default` is the site's vertical rhythm; `hero` opens the page under the navbar. */
export type SectionRhythm = "default" | "hero";

export interface SectionProps {
  /** Anchor target and scroll-spy id. */
  readonly id: string;
  /** Id of the heading that names this landmark. */
  readonly labelledBy?: string;
  readonly rhythm?: SectionRhythm;
  readonly className?: string;
  readonly containerClassName?: string;
  readonly children: ReactNode;
}

const RHYTHM: Readonly<Record<SectionRhythm, string>> = {
  default: "py-10 md:py-14 lg:py-16",
  // Top padding clears the fixed h-16 navbar and then leaves a deliberate gap,
  // so the eyebrow starts well clear of it rather than tucked underneath.
  // Bottom gives some of that back — the hero has to stay near one screen, and
  // an asymmetric pair reads as intentional where a symmetric one reads as
  // slack at the bottom.
  // The hero is `min-h-svh` with its content centred, so this pair does two
  // jobs: the top value clears the fixed navbar, and the gap between top and
  // bottom is what pushes the centred block below the optical middle.
  hero: "pt-32 pb-10 md:pt-40 md:pb-14 lg:pt-44 lg:pb-16",
};


export function Section({
  id,
  labelledBy,
  rhythm = "default",
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative scroll-mt-20", RHYTHM[rhythm], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
