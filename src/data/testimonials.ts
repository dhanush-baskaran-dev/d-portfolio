import type { SectionIntro, Testimonial, TestimonialLabels } from "@/types";

export const testimonialsIntro = {
  eyebrow: "References",
  heading: "People who shipped alongside me.",
} satisfies SectionIntro;

export const testimonialLabels = {
  previous: "Previous testimonial",
  next: "Next testimonial",
  carousel: "Testimonials",
  slidePosition: "Testimonial {current} of {total}",
  goToSlide: "Go to testimonial {index}",
} satisfies TestimonialLabels;

/**
 * TODO(dhanush): every quote, name and company below is invented placeholder
 * copy from the template. Replace them with real references or delete the
 * Testimonials section from `app/page.tsx` — fabricated endorsements are the
 * one kind of placeholder that does real damage if it ships.
 */
export const testimonials = [
  {
    id: "anita-desai",
    quote:
      "He took our search latency problem, disagreed with the plan I gave him, and was right. He came back with a benchmark rather than an opinion — that is the part I still bring up with other engineers.",
    name: "Anita Desai",
    role: "Director of Engineering",
    company: "Meridian Labs",
    avatar: { src: undefined, alt: "Anita Desai" },
  },
  {
    id: "tomas-lindqvist",
    quote:
      "He rewrote the collaboration layer while the product was live and I never had to explain an outage to a customer. The migration plan was better documented than most of our features.",
    name: "Tomas Lindqvist",
    role: "Co-founder",
    company: "Kestrel Systems",
    avatar: { src: undefined, alt: "Tomas Lindqvist" },
  },
  {
    id: "priya-nair",
    quote:
      "I joined as a junior on his team. He reviewed my code slowly and asked questions instead of rewriting it, and eight months later I was leading my own surface. That is not a common skill.",
    name: "Priya Nair",
    role: "Staff Engineer",
    company: "Northwind Commerce",
    avatar: { src: undefined, alt: "Priya Nair" },
  },
  {
    id: "daniel-okafor",
    quote:
      "We hired him to build an AI feature and he spent the first week telling us which parts of it should not use a model at all. The thing shipped on time and it has held up for two years.",
    name: "Daniel Okafor",
    role: "Head of Product",
    company: "Atlas Analytics",
    avatar: { src: undefined, alt: "Daniel Okafor" },
  },
] satisfies readonly Testimonial[];
