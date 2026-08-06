import { cn } from "@/utils/cn";

export interface FieldProps {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly value: string;
  readonly onValueChange: (value: string) => void;
  readonly onBlur?: () => void;
  readonly placeholder?: string;
  readonly type?: "text" | "email";
  readonly multiline?: boolean;
  readonly rows?: number;
  readonly required?: boolean;
  readonly maxLength?: number;
  readonly autoComplete?: string;
  readonly disabled?: boolean;
  /** Present means invalid: it wires `aria-invalid` and the described-by link. */
  readonly error?: string;
  readonly className?: string;
}

const CONTROL =
  "w-full rounded-lg border bg-surface px-4 py-3 text-primary " +
  "placeholder:text-tertiary " +
  "transition-[border-color,background-color] duration-standard ease-state " +
  "disabled:cursor-not-allowed disabled:opacity-55";

/**
 * A labelled control with its error slot and ARIA wiring declared once.
 *
 * The contact form composes this for every field, so `aria-invalid`,
 * `aria-describedby` and the error region can never drift apart per field
 * (SPEC §4.10, SPEC reusability contract §1).
 */
export function Field({
  id,
  name,
  label,
  value,
  onValueChange,
  onBlur,
  placeholder,
  type = "text",
  multiline = false,
  rows = 5,
  required = false,
  maxLength,
  autoComplete,
  disabled = false,
  error,
  className,
}: FieldProps) {
  const errorId = `${id}-error`;
  const invalid = error !== undefined && error !== "";

  const controlClassName = cn(
    CONTROL,
    invalid ? "border-accent" : "border-subtle can-hover:hover:border-accent-edge",
    multiline && "resize-y min-h-36",
  );

  const shared = {
    id,
    name,
    value,
    placeholder,
    required,
    maxLength,
    autoComplete,
    disabled,
    onBlur,
    "aria-invalid": invalid,
    "aria-describedby": invalid ? errorId : undefined,
    className: controlClassName,
  } as const;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-mono text-eyebrow uppercase text-tertiary">
        {label}
      </label>

      {multiline ? (
        <textarea
          {...shared}
          rows={rows}
          onChange={(event) => onValueChange(event.target.value)}
        />
      ) : (
        <input
          {...shared}
          type={type}
          onChange={(event) => onValueChange(event.target.value)}
        />
      )}

      <p
        id={errorId}
        role={invalid ? "alert" : undefined}
        className={cn("text-sm text-accent", !invalid && "sr-only")}
      >
        {error ?? ""}
      </p>
    </div>
  );
}
