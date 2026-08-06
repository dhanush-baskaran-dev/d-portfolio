import { ContactForm } from "@/components/sections/ContactForm";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { icons } from "@/lib/icons";

const HEADING_ID = "contact-heading";
const ArrowIcon = icons["arrow-up-right"];
const MailIcon = icons.mail;
const PhoneIcon = icons.phone;

const DIRECT = [
  {
    id: "email",
    label: contact.emailLabel,
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: MailIcon,
  },
  {
    id: "phone",
    label: contact.phoneLabel,
    value: profile.phone,
    href: `tel:${profile.phoneTel}`,
    Icon: PhoneIcon,
  },
] as const;

export function Contact() {
  return (
    <Section id="contact" labelledBy={HEADING_ID}>
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-5">
          <Reveal>
            <SectionHeading
              id={HEADING_ID}
              eyebrow={contact.eyebrow}
              heading={contact.heading}
              description={contact.invitation}
            />
          </Reveal>

          <Reveal index={1}>
            <ul className="flex flex-col">
              {DIRECT.map(({ id, label, value, href, Icon }) => (
                <li key={id}>
                  <a
                    href={href}
                    className="group flex min-h-11 items-center gap-3 border-b border-subtle py-2 transition-colors duration-standard ease-state can-hover:hover:text-accent"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-secondary transition-colors duration-standard ease-state can-hover:group-hover:text-accent"
                    />
                    <span className="sr-only">{label}</span>
                    <span className="font-mono text-primary transition-colors duration-standard ease-state can-hover:group-hover:text-accent">
                      {value}
                    </span>
                    <ArrowIcon
                      aria-hidden="true"
                      className="ml-auto size-4 text-secondary transition-[color,transform] duration-standard ease-state can-hover:group-hover:text-accent motion-safe:can-hover:group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={2}>
            <div className="flex flex-col gap-2">
              <h3 className="font-mono text-eyebrow uppercase text-tertiary">
                {contact.socialsLabel}
              </h3>
              <ul className="flex flex-col">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex min-h-11 items-center gap-3 border-b border-subtle text-sm transition-colors duration-standard ease-state can-hover:hover:text-primary"
                    >
                      <BrandIcon slug={social.brand} decorative />
                      <span className="text-primary transition-colors duration-standard ease-state can-hover:group-hover:text-accent">
                        {social.label}
                      </span>
                      <span className="font-mono text-eyebrow text-tertiary">
                        {social.handle}
                      </span>
                      <ArrowIcon
                        aria-hidden="true"
                        className="ml-auto size-4 text-secondary transition-[color,transform] duration-standard ease-state can-hover:group-hover:text-accent motion-safe:can-hover:group-hover:translate-x-1"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>

        <Reveal index={1}>
          <ErrorBoundary>
            <ContactForm />
          </ErrorBoundary>
        </Reveal>
      </div>
    </Section>
  );
}
