import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Arsenal } from "@/components/Arsenal";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Section order is an argument, not a list:
 *
 *   Hero     — who, and what kind of engineer.
 *   Work     — proof. First, before any claim about skills.
 *   Arsenal  — the framework detail, now that the work has earned attention.
 *   Process  — how the work gets made, which is what a hiring manager tests.
 *   About    — the human close.
 *   Contact  — one action.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <Arsenal />
      <Process />
      <About />
      <Contact />
      <Footer />
    </>
  );
}
