"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { errors } from "@/data/errors";
import type { ErrorMessage } from "@/types";

export interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly copy?: ErrorMessage;
  readonly className?: string;
}

interface ErrorBoundaryState {
  readonly error: Error | null;
}

/**
 * Contains a throw to the subtree it wraps, so a failure in one interactive
 * panel leaves the surrounding section's content standing.
 *
 * A class because `getDerivedStateFromError` has no hook equivalent.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  override state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Section failed to render", error, info.componentStack);
  }

  private readonly reset = (): void => {
    this.setState({ error: null });
  };

  override render(): ReactNode {
    const { error } = this.state;
    const { children, copy = errors.boundary, className } = this.props;

    if (error === null) {
      return children;
    }

    return (
      <ErrorFallback
        copy={copy}
        onRetry={this.reset}
        detail={
          process.env.NODE_ENV === "production" ? undefined : error.message
        }
        className={className}
      />
    );
  }
}
