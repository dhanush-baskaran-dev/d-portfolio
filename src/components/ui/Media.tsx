import Image, { type StaticImageData } from "next/image";

import { cn } from "@/utils/cn";
import { hashString } from "@/utils/format";

export type MediaAspect = "video" | "square" | "portrait";
export type MediaRadius = "lg" | "xl" | "full";

export interface MediaProps {
  readonly radius?: MediaRadius;
  /**
   * Omit for the placeholder. Supplying a path is the only change needed.
   * Accepts a statically imported image as well as a public path.
   */
  readonly src?: string | StaticImageData;
  readonly alt: string;
  readonly aspect?: MediaAspect;
  /** Mono label drawn on the placeholder. Ignored once `src` is present. */
  readonly label?: string;
  /** Overrides the gradient seed; defaults to `label` then `alt`. */
  readonly seed?: string;
  readonly sizes?: string;
  readonly priority?: boolean;
  readonly className?: string;
}

const ASPECT: Readonly<Record<MediaAspect, string>> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-portrait",
};

const RADIUS: Readonly<Record<MediaRadius, string>> = {
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-full",
};

/**
 * Five accent-derived washes. Each is built from theme tokens, so they follow
 * `--color-accent` like everything else and none of them is a literal colour.
 */
const GRADIENTS = [
  "bg-linear-to-br from-accent-subtle via-overlay to-raised",
  "bg-linear-to-tr from-raised via-accent-subtle to-overlay",
  "bg-linear-to-b from-overlay via-raised to-accent-subtle",
  "bg-linear-to-bl from-accent-subtle via-raised to-surface",
  "bg-linear-to-r from-raised via-overlay to-accent-subtle",
] as const;

/**
 * Every preview, cover and avatar in the site.
 *
 * With no `src` it renders a deterministic gradient plus a mono label — no
 * external placeholder service is ever requested (SPEC §9). The gradient is
 * chosen by hashing the seed so server and client agree, and the aspect ratio
 * is always explicit so nothing shifts on load.
 */
export function Media({
  src,
  alt,
  aspect = "video",
  radius = "lg",
  label,
  seed,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className,
}: MediaProps) {
  const wrapper = cn(
    "relative isolate w-full overflow-hidden border border-subtle",
    RADIUS[radius],
    ASPECT[aspect],
    className,
  );

  if (src !== undefined) {
    return (
      <div className={wrapper}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const key = seed ?? label ?? alt;
  const gradient = GRADIENTS[hashString(key) % GRADIENTS.length] ?? GRADIENTS[0];

  return (
    <div className={cn(wrapper, gradient)} role="img" aria-label={alt}>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-mono text-eyebrow uppercase text-tertiary"
      >
        {label ?? ""}
      </span>
    </div>
  );
}
