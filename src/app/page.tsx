import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";

export default function Home() {
  return (
    <main id="main" className="relative z-[1]">
      <Hero />
      <Work />
      <About />
      <Contact />
    </main>
  );
}
