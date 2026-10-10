import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Materials } from "@/components/Materials";
import { StudioProcess } from "@/components/StudioProcess";
import { About } from "@/components/About";
import { ParentBand } from "@/components/ParentBand";
import { Order } from "@/components/Order";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Section order is an argument, not a list:
 *
 *   Hero      — what the studio is, in one line.
 *   Gallery   — proof. Finished pieces first, before any claim about craft.
 *   Materials — the specification detail, now that the work has earned attention.
 *   Process   — how a commission actually runs, which is what a buyer tests.
 *   About     — the studio's stance, and the people behind it.
 *   Parent    — Evantra De-Buckman Ventures, and the link to anything technical.
 *   Order     — the form. One action.
 *   Contact   — phone, email, socials, for people who will not fill in a form.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Gallery />
      <Materials />
      <StudioProcess />
      <About />
      <ParentBand />
      <Order />
      <Contact />
      <Footer />
    </>
  );
}
