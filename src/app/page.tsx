import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { FooterArea } from "@/components/layout/FooterArea";

export default function Home() {
  return (
    <div className="w-full relative">
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Contact />
      <FooterArea />
    </div>
  );
}
