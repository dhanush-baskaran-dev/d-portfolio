import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export interface ContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * The only place the site's max width and horizontal padding are declared.
 *
 * Ultrawide viewports never stretch content past this — backgrounds may bleed,
 * content may not (SPEC §2).
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)}>
      {children}
    </div>
  );
}
