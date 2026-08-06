import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
    
      <Achievements />
      <Testimonials />
      <Contact />
    </>
  );
}
