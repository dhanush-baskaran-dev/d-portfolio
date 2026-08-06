"use client";

import { useEffect } from "react";

import { Container } from "@/components/ui/Container";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { errors } from "@/data/errors";

export default function RouteError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    console.error("Route failed to render", error);
  }, [error]);

  return (
    <Container className="py-40">
      <ErrorFallback
        copy={errors.route}
        onRetry={reset}
        detail={process.env.NODE_ENV === "production" ? undefined : error.message}
        className="max-w-prose"
      />
    </Container>
  );
}
