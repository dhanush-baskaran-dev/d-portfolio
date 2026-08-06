import type {
  AboutContent,
  ContactConfig,
  ContactContent,
  HeroContent,
  Profile,
} from "@/types";

/**
 * Identity. Swapping the persona is an edit to this file — no component knows
 * any of these strings.
 */
export const profile = {
  name: "Dhanush Baskaran",
  monogram: "DB",
  role: "Full-Stack Developer",
  location: "India · Remote-friendly",
  email: "dhanush@example.com",
  phone: "+91 00000 00000",
  phoneTel: "+910000000000",
  tagline:
    "Full-stack developer building web products with the MERN stack and modern TypeScript.",
  // TODO(dhanush): drop the PDF into /public under this exact name.
  resumeHref: "/dhanush-baskaran-resume.pdf",
} satisfies Profile;

export const hero = {
  eyebrow: "Open to new roles",
  availability: "Currently available for new work",
  headline: "Dhanush Baskaran",
  /* The tagline. Sized to wrap to two lines inside the hero's 52ch measure —
     around 60-70 characters. Much longer and it takes a third line. */
  headlineAccent: "MERN Full-stack developer",
  /* Roughly three lines at the hero's 52ch measure — about 230 characters. */
  description:
    "Around four years building web applications end to end — React and TypeScript on the front, Node and Express behind it, MongoDB and SQL underneath. Lately I have been writing services in Effect.js and moving relational work onto Prisma.",
  primaryCta: { label: "Resume", href: profile.resumeHref, download: true },
  secondaryCta: { label: "Contact Me", href: "#contact" },
  socialsLabel: "Find me elsewhere",
  editor: {
    fileName: "engineer.ts",
    ariaLabel:
      "A source file describing Dhanush Baskaran as a typed object: four years, focused on the MERN stack, TypeScript, and API work.",
    lines: [
      {
        id: "l01",
        tokens: [
          { text: "interface", kind: "keyword" },
          { text: " ", kind: "plain" },
          { text: "Engineer", kind: "type" },
          { text: " {", kind: "punctuation" },
        ],
      },
      {
        id: "l02",
        tokens: [
          { text: "  ", kind: "plain" },
          { text: "name", kind: "property" },
          { text: ": ", kind: "punctuation" },
          { text: "string", kind: "type" },
          { text: ";", kind: "punctuation" },
        ],
      },
      {
        id: "l03",
        tokens: [
          { text: "  ", kind: "plain" },
          { text: "focus", kind: "property" },
          { text: ": ", kind: "punctuation" },
          { text: "string", kind: "type" },
          { text: "[];", kind: "punctuation" },
        ],
      },
      {
        id: "l04",
        tokens: [
          { text: "  ", kind: "plain" },
          { text: "years", kind: "property" },
          { text: ": ", kind: "punctuation" },
          { text: "number", kind: "type" },
          { text: ";", kind: "punctuation" },
        ],
      },
      {
        id: "l05",
        tokens: [
          { text: "  ", kind: "plain" },
          { text: "shipping", kind: "property" },
          { text: ": ", kind: "punctuation" },
          { text: "boolean", kind: "type" },
          { text: ";", kind: "punctuation" },
        ],
      },
      {
        id: "l06",
        tokens: [{ text: "}", kind: "punctuation" }],
      },
      {
        id: "l07",
        tokens: [{ text: "", kind: "plain" }],
      },
      {
        id: "l08",
        tokens: [
          { text: "const", kind: "keyword" },
          { text: " ", kind: "plain" },
          { text: "dhanush", kind: "property" },
          { text: ": ", kind: "punctuation" },
          { text: "Engineer", kind: "type" },
          { text: " = {", kind: "punctuation" },
        ],
      },
      {
        id: "l09",
        tokens: [
          { text: "  ", kind: "plain" },
          { text: "name", kind: "property" },
          { text: ": ", kind: "punctuation" },
          { text: '"Dhanush Baskaran"', kind: "string" },
          { text: ",", kind: "punctuation" },
        ],
      },
      {
        id: "l10",
        tokens: [
          { text: "  ", kind: "plain" },
          { text: "focus", kind: "property" },
          { text: ": [", kind: "punctuation" },
          { text: '"mern"', kind: "string" },
          { text: ", ", kind: "punctuation" },
          { text: '"typescript"', kind: "string" },
          { text: ", ", kind: "punctuation" },
          { text: '"apis"', kind: "string" },
          { text: "],", kind: "punctuation" },
        ],
      },
      {
        id: "l11",
        tokens: [
          { text: "  ", kind: "plain" },
          { text: "years", kind: "property" },
          { text: ": ", kind: "punctuation" },
          { text: "4", kind: "number" },
          { text: ",", kind: "punctuation" },
        ],
      },
      {
        id: "l12",
        tokens: [
          { text: "  ", kind: "plain" },
          { text: "shipping", kind: "property" },
          { text: ": ", kind: "punctuation" },
          { text: "true", kind: "boolean" },
          { text: ",", kind: "punctuation" },
        ],
      },
      {
        id: "l13",
        tokens: [{ text: "};", kind: "punctuation" }],
      },
      {
        id: "l14",
        tokens: [{ text: "", kind: "plain" }],
      },
      {
        id: "l15",
        typed: true,
        tokens: [
          { text: "// currently: typed APIs with Effect", kind: "comment" },
        ],
      },
    ],
  },
} satisfies HeroContent;

export const about = {
  eyebrow: "About",
  heading: "I build web applications end to end.",
  /* Two or three short paragraphs. Swap the wording freely — nothing reads
     these but the About section. */
  paragraphs: [
    "I am a full-stack developer with about four years across the MERN stack. Most of that time has gone into React and TypeScript interfaces and the Node and Express services behind them, with MongoDB and SQL underneath.",
    "More recently I have been writing services in Effect.js and moving relational work onto Prisma, which has changed how I think about error handling and schema design. I like the parts of the job that outlast the first release — the data model, the API contract, the code someone else has to read.",
  ],
  portrait: {
    src: "/about.jpg",
    alt: "Portrait of Dhanush Baskaran",
    // TODO(dhanush): confirm the caption location.
    caption: "India",
  },
} satisfies AboutContent;

export const contact = {
  eyebrow: "Contact",
  heading: "Let's talk about what you're building.",
  invitation: "I read every message and usually reply within two days.",
  emailLabel: "Email",
  phoneLabel: "Phone",
  socialsLabel: "Elsewhere",
  formTitle: "Send a message",
  fields: [
    {
      id: "email",
      name: "email",
      label: "Email",
      placeholder: "priya@company.com",
      autoComplete: "email",
      type: "email",
      required: true,
      maxLength: 160,
      requiredError: "Please add an email so I can reply.",
      invalidError: "That email address does not look right.",
    },
    {
      id: "message",
      name: "message",
      label: "Message",
      placeholder: "A sentence or two about the team and the problem.",
      multiline: true,
      required: true,
      maxLength: 2000,
      requiredError: "Please write a message.",
      invalidError: "Please write at least twenty characters.",
    },
  ],
  honeypot: {
    name: "botcheck",
    label: "Leave this field empty",
  },
  submit: {
    idle: "Send message",
    loading: "Sending",
    success: "Message sent",
    error: "Try again",
  },
  status: {
    success:
      "Thanks — your message is through. I usually reply within two days.",
    error: "Something went wrong on my end. Email me directly instead.",
    notConfigured:
      "The form isn't connected to a mailbox yet. Email me directly and it will reach me just as fast.",
  },
} satisfies ContactContent;

/**
 * Web3Forms access keys are public by design — they identify a mailbox, they do
 * not authorise anything — which is why this is a `NEXT_PUBLIC_` value and why
 * the site is happy to build without it.
 */
export const contactConfig = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
} satisfies ContactConfig;
