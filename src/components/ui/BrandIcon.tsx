import { brandColors } from "@/lib/brand-colors";
import { resolveBrandGlyph } from "@/lib/brand-icons";
import type { BrandSlug } from "@/types";
import { cn } from "@/utils/cn";

export type BrandIconSize = "sm" | "md" | "lg";

interface BrandIconBaseProps {
  /** Simple Icons slug, always sourced from `data/` — never a literal here. */
  readonly slug: BrandSlug;
  readonly size?: BrandIconSize;
  readonly className?: string;
}

/** A mark that carries its own accessible name. */
type BrandIconLabelled = BrandIconBaseProps & {
  readonly label: string;
  readonly decorative?: false;
};

/**
 * A mark whose meaning is already carried by adjacent text — the chip's own
 * label, the social row's handle. Hidden from assistive technology so the brand
 * is not announced twice, and a label would be meaningless, so it is forbidden.
 */
type BrandIconDecorative = BrandIconBaseProps & {
  readonly decorative: true;
  readonly label?: never;
};

export type BrandIconProps = BrandIconLabelled | BrandIconDecorative;

const SIZE: Readonly<Record<BrandIconSize, string>> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
};

/**
 * Every tech logo and social mark in the site, painted in its official brand
 * colour. Brands whose colour is unreadable on the dark surface fall back to
 * `currentColor` — see `lib/brand-colors.ts`.
 */
export function BrandIcon(props: BrandIconProps) {
  const { slug, size = "sm", className } = props;
  const Glyph = resolveBrandGlyph(slug);

  const semantics =
    props.decorative === true
      ? ({ "aria-hidden": true } as const)
      : ({ role: "img", "aria-label": props.label } as const);

  return (
    <Glyph
      {...semantics}
      color={brandColors[slug]}
      className={cn("shrink-0", SIZE[size], className)}
    />
  );
}
