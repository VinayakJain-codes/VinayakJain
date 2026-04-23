import Hero from "@/components/Hero";
import About from "@/components/About";
import Works from "@/components/Works";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Vicinix from "@/components/Vicinix";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import RevealSection from "@/components/RevealSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col scroll-smooth">
        <Hero />
        <RevealSection><About /></RevealSection>
        <RevealSection><Works /></RevealSection>
        <RevealSection><Timeline /></RevealSection>
        <RevealSection><Skills /></RevealSection>
        <RevealSection><Resume /></RevealSection>
        <RevealSection><Vicinix /></RevealSection>
        <RevealSection><Contact /></RevealSection>
      </main>
    </>
  );
}
