import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Results } from "@/components/sections/Results";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <Hero />
      <Process />
      <Results />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
