import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ErrorMessage } from "@/types";
import { cn } from "@/utils/cn";

export interface ErrorFallbackProps {
  readonly copy: ErrorMessage;
  readonly onRetry: () => void;
  /** Surfaced in development only; production sees the copy alone. */
  readonly detail?: string;
  readonly className?: string;
}

export function ErrorFallback({
  copy,
  onRetry,
  detail,
  className,
}: ErrorFallbackProps) {
  return (
    <Card padding="lg" className={cn("flex flex-col items-start gap-4", className)}>
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-medium text-primary">{copy.title}</h3>
        <p className="max-w-prose text-sm text-secondary">{copy.description}</p>
      </div>

      {detail === undefined ? null : (
        <pre className="max-w-full overflow-x-auto rounded-lg border border-subtle bg-surface p-3 font-mono text-xs text-tertiary">
          {detail}
        </pre>
      )}

      <Button variant="secondary" size="sm" onClick={onRetry}>
        {copy.retry}
      </Button>
    </Card>
  );
}
