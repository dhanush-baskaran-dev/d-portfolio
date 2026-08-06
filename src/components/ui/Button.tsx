import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { cn } from "@/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  /** Stretches the button to its container, for stacked mobile CTAs. */
  readonly block?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    readonly href?: undefined;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    readonly href: string;
    /** Adds `target="_blank"` and the matching `rel` (SPEC §4.6). */
    readonly external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

// Tailwind v4's preflight dropped `button { cursor: pointer }`, so every
// button-shaped control has to opt back in. Declared here once.
const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border font-medium " +
  "whitespace-nowrap select-none hover-glow-sm " +
  "transition-[color,background-color,border-color,transform] duration-standard ease-state " +
  "disabled:pointer-events-none disabled:opacity-55 " +
  "motion-safe:can-hover:hover:-translate-y-px motion-safe:active:translate-y-0";

const VARIANT: Readonly<Record<ButtonVariant, string>> = {
  primary:
    "border-transparent bg-accent text-accent-contrast can-hover:hover:bg-accent-hover",
  secondary:
    "border-strong bg-raised text-primary can-hover:hover:border-accent-edge can-hover:hover:bg-overlay",
  ghost:
    "border-transparent bg-transparent text-secondary can-hover:hover:bg-glass can-hover:hover:text-primary",
};

/** Every size clears the 44px touch target minimum (SPEC §8). */
const SIZE: Readonly<Record<ButtonSize, string>> = {
  sm: "h-11 px-4 text-sm",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  block: boolean,
  className: string | undefined,
): string {
  return cn(BASE, VARIANT[variant], SIZE[size], block && "w-full", className);
}

/**
 * Every clickable call to action in the site. There is no one-off button markup
 * anywhere — variation is a prop (SPEC reusability contract §1).
 *
 * Passing `href` renders a real `<a>`; omitting it renders a `<button>`. The two
 * branches are discriminated on `href`, so an anchor can never receive `type`
 * and a button can never receive `target`.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      variant = "primary",
      size = "md",
      block = false,
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
        className={buttonClasses(variant, size, block, className)}
        {...(external === true
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
      </a>
    );
  }

  const {
    variant = "primary",
    size = "md",
    block = false,
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      className={buttonClasses(variant, size, block, className)}
    >
      {children}
    </button>
  );
}
