"use client";

import { Section } from "./ui/Section";
import { useReveal } from "@/lib/useReveal";
import { profile, stats } from "@/lib/site";

/**
 * About — the closing argument.
 *
 * Laid out as an asymmetric two-column: a sticky portrait/identity rail on the
 * left, prose and stats on the right. The sticky rail is what stops a long
 * scroll of text from feeling like a wall.
 */
export function About() {
  const ref = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.05 });

  return (
    <Section id="about" index="04" title="About">
      <div ref={ref} className="grid gap-14 lg:grid-cols-[20rem_1fr] lg:gap-20">
        {/* Identity rail */}
        <div
          data-reveal
          className="will-reveal lg:sticky lg:top-28 lg:self-start"
        >
          {/* Monogram plate */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[--radius] border border-ink-line">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-90"
              style={{
                background:
                  "radial-gradient(120% 90% at 30% 15%, rgb(var(--accent) / 0.42) 0%, transparent 55%), radial-gradient(90% 80% at 80% 90%, rgb(var(--accent-glow) / 0.28) 0%, transparent 60%)",
              }}
            />
            {/* Faint scanline sweeping the plate, purely for texture. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px animate-scan-line bg-bone/25" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-bone/80">
                {profile.role}
              </span>
              <span className="font-display text-[4.5rem] leading-none tracking-tightest text-bone/95">
                {profile.initials}
              </span>
            </div>
          </div>

          <dl className="mt-8 space-y-3 font-mono text-[0.66rem] uppercase tracking-[0.16em]">
            <div className="flex justify-between gap-4 border-b border-ink-line pb-3">
              <dt className="text-bone-faint">Based</dt>
              <dd className="text-right">{profile.location}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-ink-line pb-3">
              <dt className="text-bone-faint">Focus</dt>
              <dd className="text-right">Frameworks & tooling</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-ink-line pb-3">
              <dt className="text-bone-faint">Status</dt>
              <dd className="flex items-center justify-end gap-2 text-right">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))] animate-pulse-soft" />
                Available
              </dd>
            </div>
          </dl>
        </div>

        {/* Prose + stats */}
        <div className="space-y-14">
          <div data-reveal className="will-reveal space-y-6">
            <p className="max-w-2xl text-balance font-display text-fluid-xl leading-[1.25] tracking-display">
              {profile.about}
            </p>
            <div className="hairline" />
            <div className="grid max-w-2xl gap-6 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-bone-dim">
                I care about the parts of an interface that are invisible when
                they work: the focus order, the loading state, the error
                boundary, the build step that catches a regression before a
                customer does.
              </p>
              <p className="text-sm leading-relaxed text-bone-dim">
                My favourite outcome on a project is being able to leave it. A
                framework that a team can extend without me is worth more than
                one that only I understand.
              </p>
            </div>
          </div>

          {/* Stats */}
          <dl
            data-reveal
            className="will-reveal grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="border-t border-ink-line pt-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-fluid-2xl leading-none tracking-tightest">
                    {stat.value}
                  </span>
                  <span className="mt-3 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone-dim">
                    {stat.label}
                  </span>
                  {stat.note ? (
                    <span className="mt-1.5 block text-xs text-bone-faint">
                      {stat.note}
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          {/* Toolbelt — the honest short list */}
          <div data-reveal className="will-reveal">
            <h3 className="eyebrow mb-5">Currently reaching for</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                "Next.js App Router",
                "React Server Components",
                "Drizzle",
                "Vitest",
                "WebGPU",
                "Turborepo",
              ].map((tool) => (
                <li
                  key={tool}
                  className="flex items-center gap-3 text-fluid-base text-bone-dim"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[rgb(var(--accent))]"
                  />
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
