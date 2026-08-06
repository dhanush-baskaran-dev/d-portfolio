"use client";

import { Container } from "@/components/ui/Container";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { errors } from "@/data/errors";

import "./globals.css";

/**
 * Replaces the root layout entirely when the shell itself throws, so it has to
 * supply its own document and cannot rely on the fonts the layout loads.
 */
export default function GlobalError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Container className="py-40">
          <ErrorFallback
            copy={errors.global}
            onRetry={reset}
            detail={
              process.env.NODE_ENV === "production" ? undefined : error.message
            }
            className="max-w-prose"
          />
        </Container>
      </body>
    </html>
  );
}
