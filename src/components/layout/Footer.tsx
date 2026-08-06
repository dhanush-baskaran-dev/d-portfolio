import { Container } from "@/components/ui/Container";
import { chrome } from "@/data/navigation";
import { profile } from "@/data/profile";
import { interpolate } from "@/utils/format";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-subtle">
      <Container className="py-8">
        {/*
         * One line, but a wrapping one: at the narrowest widths the colophon
         * drops beneath the copyright rather than forcing a horizontal scroll.
         * The separator is decorative, so it is hidden from assistive tech —
         * the two halves are already distinct phrases when read aloud.
         */}
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-mono text-eyebrow text-tertiary">
          <span>{interpolate(chrome.copyright, { name: profile.name, year })}</span>
          <span aria-hidden="true">·</span>
          <span>{chrome.credit}</span>
        </p>
      </Container>
    </footer>
  );
}
