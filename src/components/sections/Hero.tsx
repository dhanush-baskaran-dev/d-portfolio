import { HeroCopy } from "@/components/sections/HeroCopy";
import { HeroCube } from "@/components/sections/HeroCube";
// To switch back to the engineer.ts editor panel: uncomment this import and the
// <HeroEditor /> line below, then comment out <HeroCube />. The component file
// is untouched on disk.
// import { HeroEditor } from "@/components/sections/HeroEditor";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Section } from "@/components/ui/Section";
import { contact, hero, profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { icons } from "@/lib/icons";

const HEADING_ID = "hero-heading";
const MailIcon = icons.mail;

const LINK =
  "inline-flex size-11 items-center justify-center rounded-lg text-secondary " +
  "transition-colors duration-standard ease-state can-hover:hover:text-primary";

/**
 * Built here rather than inside `HeroCopy` so the brand marks render on the
 * server — `HeroCopy` is a client component.
 */
const socialRow = (
  <ul aria-label={hero.socialsLabel} className="flex items-center gap-1">
    {socials.map((social) => (
      <li key={social.id}>
        <a
          href={social.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={social.label}
          className={LINK}
        >
          <BrandIcon slug={social.brand} decorative size="md" />
        </a>
      </li>
    ))}

    <li>
      <a
        href={`mailto:${profile.email}`}
        aria-label={contact.emailLabel}
        className={LINK}
      >
        <MailIcon className="size-5" aria-hidden="true" />
      </a>
    </li>
  </ul>
);

export function Hero() {
  return (
    <Section
      id="home"
      labelledBy={HEADING_ID}
      rhythm="hero"
     
      className="flex min-h-svh items-center"
    >
    
      {/*
       * Source order is copy-then-visual, so the `h1` is the first thing in the
       * document and assistive tech meets the heading before the decoration.
       * The `order-*` pair only moves the painted boxes: below `lg` the cube
       * rises above the copy, and at `lg` both reset so the grid's own column
       * order takes over — copy left, cube right.
       *
       * The ordering lives here rather than inside the two children: position
       * within the hero grid is this component's concern, not theirs.
       */}
      <div className="grid items-center gap-10 lg:grid-cols-[1.618fr_1fr] lg:gap-14">
        <div className="order-2 lg:order-1">
          <HeroCopy headingId={HEADING_ID} socialRow={socialRow} />
        </div>

        <div className="order-1 lg:order-2">
          <ErrorBoundary>
            {/* <HeroEditor /> */}
            <HeroCube />
          </ErrorBoundary>
        </div>
      </div>
    </Section>
  );
}
