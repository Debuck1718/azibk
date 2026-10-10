"use client";

import { Section } from "./ui/Section";
import { useReveal } from "@/lib/useReveal";
import { processSteps } from "@/lib/site";

/**
 * StudioProcess — the four-step commission, set as a vertical rule with markers.
 *
 * The timeline line is drawn in CSS on the container and each step's marker
 * fills on hover, which is what makes it read as a sequence rather than four
 * unrelated paragraphs. A customer's real question is "what am I committing to,
 * and when do I pay?" — so each step names its deliverable explicitly.
 */
export function StudioProcess() {
  const ref = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.05 });

  return (
    <Section
      id="process"
      index="03"
      title="How a commission runs"
      lead="Four steps, and what you get at each one. Nothing goes on the bench until you have approved a written specification and a firm price."
    >
      <div ref={ref} className="relative">
        {/* The spine */}
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-[rgb(var(--accent))]/60 via-ink-line to-transparent md:block"
        />

        <ol className="space-y-14 md:space-y-20">
          {processSteps.map((step) => (
            <li
              key={step.step}
              data-reveal
              className="will-reveal group relative md:pl-16"
            >
              {/* Marker */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 hidden h-[15px] w-[15px] items-center justify-center rounded-full border border-ink-line bg-ink transition-colors duration-500 group-hover:border-[rgb(var(--accent))] md:flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-bone-faint transition-colors duration-500 group-hover:bg-[rgb(var(--accent))]" />
              </span>

              <div className="grid gap-6 lg:grid-cols-[auto_1fr_18rem] lg:items-baseline lg:gap-10">
                <span className="font-mono text-[0.68rem] tracking-[0.24em] text-bone-faint transition-colors duration-500 group-hover:text-[rgb(var(--accent))]">
                  {step.step}
                </span>

                <div className="max-w-2xl">
                  <h3 className="font-display text-fluid-lg tracking-display">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-pretty text-fluid-base leading-relaxed text-bone-dim">
                    {step.body}
                  </p>
                </div>

                <div className="lg:text-right">
                  <span className="eyebrow block">Deliverable</span>
                  <p className="mt-3 text-sm leading-relaxed text-bone-faint">
                    {step.deliverable}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
