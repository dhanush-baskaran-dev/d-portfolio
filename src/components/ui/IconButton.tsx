import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/utils/cn";

export type IconButtonVariant = "ghost" | "outline";
export type IconButtonSize = "md" | "lg";

interface IconButtonBaseProps {
  /**
   * Required. Becomes `aria-label`, so an icon-only control can never ship
   * without an accessible name (SPEC §8).
   */
  readonly label: string;
  readonly variant?: IconButtonVariant;
  readonly size?: IconButtonSize;
  readonly className?: string;
  readonly children: ReactNode;
}

type IconButtonAsButton = IconButtonBaseProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children" | "aria-label"
  > & { readonly href?: undefined };

type IconButtonAsAnchor = IconButtonBaseProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href" | "aria-label"
  > & {
    readonly href: string;
    readonly external?: boolean;
  };

export type IconButtonProps = IconButtonAsButton | IconButtonAsAnchor;

const BASE =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl border hover-glow-sm " +
  "transition-[color,background-color,border-color,opacity] duration-standard ease-state " +
  "disabled:pointer-events-none disabled:opacity-40";

const VARIANT: Readonly<Record<IconButtonVariant, string>> = {
  ghost:
    "border-transparent bg-transparent text-secondary can-hover:hover:bg-glass can-hover:hover:text-primary",
  outline:
    "border-subtle bg-raised text-secondary can-hover:hover:border-accent-edge can-hover:hover:text-primary",
};

/** Both sizes clear the 44px touch target minimum (SPEC §8). */
const SIZE: Readonly<Record<IconButtonSize, string>> = {
  md: "size-11",
  lg: "size-12",
};

function iconButtonClasses(
  variant: IconButtonVariant,
  size: IconButtonSize,
  className: string | undefined,
): string {
  return cn(BASE, VARIANT[variant], SIZE[size], className);
}

/**
 * Icon-only actions: carousel arrows, back-to-top, the mobile menu trigger.
 * The `label` prop makes the accessible name structurally impossible to forget.
 */
export function IconButton(props: IconButtonProps) {
  if (props.href !== undefined) {
    const {
      label,
      variant = "ghost",
      size = "md",
      className,
      children,
      href,
      external,
      ...anchorProps
    } = props;

    return (
      <a
        {...anchorProps}
        href={href}
        aria-label={label}
        className={iconButtonClasses(variant, size, className)}
        {...(external === true
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
      </a>
    );
  }

  const {
    label,
    variant = "ghost",
    size = "md",
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      aria-label={label}
      className={iconButtonClasses(variant, size, className)}
    >
      {children}
    </button>
  );
}
