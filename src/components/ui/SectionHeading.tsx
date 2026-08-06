import { cn } from "@/utils/cn";

export type SectionHeadingAlign = "left" | "center";

export interface SectionHeadingProps {
  /** Referenced by the parent `<Section>`'s `aria-labelledby`. */
  readonly id: string;
  readonly eyebrow: string;
  readonly heading: string;
  readonly description?: string;
  readonly align?: SectionHeadingAlign;
  readonly className?: string;
}

/**
 * The one eyebrow → heading → description rhythm. Every section header is this
 * component, so the spacing between the three parts is identical site-wide.
 */
export function SectionHeading({
  id,
  eyebrow,
  heading,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      <p className="font-mono text-eyebrow uppercase text-tertiary">{eyebrow}</p>

      <h2
        id={id}
        className="max-w-prose text-heading text-balance md:text-heading-lg"
      >
        {heading}
      </h2>

      {description ? (
        <p className={cn("max-w-prose text-secondary", centered && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
