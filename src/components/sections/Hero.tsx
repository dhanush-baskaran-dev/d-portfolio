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
    
      <div className="grid items-center gap-10 lg:grid-cols-[1.618fr_1fr] lg:gap-14">
        <HeroCopy headingId={HEADING_ID} socialRow={socialRow} />

        <ErrorBoundary>
          {/* <HeroEditor /> */}
          <HeroCube />
        </ErrorBoundary>
      </div>
    </Section>
  );
}
