"use client";

import { useEffect, useState } from "react";
import { HeroCanvas } from "./HeroCanvas";
import { Marquee } from "./ui/Marquee";
import { MagneticButton } from "./ui/MagneticButton";
import { profile } from "@/lib/site";

/**
 * The hero.
 *
 * Three things are happening here that most portfolio heroes do not do:
 *
 * 1. The rotating word is set in a *reserved-width* container measured from the
 *    longest word, so the line never reflows as words swap. Layout thrash on a
 *    loop is the single most common flaw in this pattern.
 * 2. The headline is split into lines that slide up out of an overflow-hidden
 *    mask on mount — a real entrance rather than a fade.
 * 3. The canvas underneath is interactive, not decorative: it reads the live
 *    accent variable so it also reacts to project-card hovers further down.
 */
export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % profile.rotating.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const longest = profile.rotating.reduce(
    (a, b) => (b.length > a.length ? b : a),
    "",
  );

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Interactivity hint for assistive tech, since the canvas is decorative. */}
      <p className="sr-only">Interactive particle field. Move the pointer to disturb it.</p>

      {/* Interactive particle field */}
      <HeroCanvas />

      {/* Accent bloom behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[62vmax] w-[62vmax] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px] transition-colors duration-700 ease-expo"
        style={{
          background:
            "radial-gradient(circle, rgb(var(--accent)) 0%, rgb(var(--accent-glow)) 38%, transparent 70%)",
        }}
      />

      {/* Bottom fade into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="shell relative flex min-h-[100svh] flex-col justify-between pb-8 pt-32 md:pt-40">
        <div className="flex flex-1 flex-col justify-center">
          {/* Status pill */}
          <div className="mb-10 flex flex-wrap items-center gap-4">
            <span className="glass inline-flex items-center gap-3 rounded-full border border-ink-line px-4 py-2 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-bone-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--accent))] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent))]" />
              </span>
              {profile.availability}
            </span>
            <span className="hidden font-mono text-[0.66rem] uppercase tracking-[0.2em] text-bone-faint sm:block">
              {profile.location}
            </span>
          </div>

          {/* Headline — each line rises out of its own mask */}
          <h1 className="font-display text-fluid-3xl font-medium leading-[0.92] tracking-tightest">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="block animate-[hero-rise_1s_cubic-bezier(0.16,1,0.3,1)_both]">
                I engineer
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="flex flex-wrap items-baseline gap-x-4 animate-[hero-rise_1s_cubic-bezier(0.16,1,0.3,1)_0.12s_both]"
                // Reserve the width of the longest word so the line never jumps.
                style={{ minHeight: "1em" }}
              >
                <span
                  className="relative inline-block"
                  style={{ minWidth: `${longest.length}ch` }}
                >
                  {/* Only the active word is visible. The inactive ones are
                      removed from both painting and the accessibility tree, so
                      the accessible name is the single current word rather
                      than every word run together. */}
                  {profile.rotating.map((word, i) =>
                    i === wordIndex ? (
                      <span
                        key={word}
                        className="absolute inset-0 whitespace-nowrap text-[rgb(var(--accent))] transition-all duration-700 ease-expo"
                        style={{ opacity: 1, transform: 'translateY(0) rotateX(0deg)', filter: 'blur(0px)' }}
                      >
                        {word}
                      </span>
                    ) : null,
                  )}

                  {/* Reserves the box using the longest word so the heading never
                      reflows as words swap. aria-hidden because the live word
                      above already carries the text. */}
                  <span className="invisible" aria-hidden="true">
                    {longest}
                  </span>
                </span>
              </span>
            </span>
          </h1>

          <p className="mt-10 max-w-xl text-pretty text-fluid-base text-bone-dim">
            {profile.blurb}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <MagneticButton href="#work" variant="solid">
              View the work
              <Arrow />
            </MagneticButton>
            <MagneticButton href="#arsenal" variant="ghost">
              The arsenal
            </MagneticButton>
          </div>
        </div>

        {/* Footer strip of the hero */}
        <div className="mt-16">
          <div className="hairline mb-6" />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Marquee
              className="max-w-2xl flex-1"
              speed="slow"
              items={[
                "React",
                "Next.js",
                "TypeScript",
                "WebGL",
                "Node",
                "Tailwind",
                "Three.js",
                "PostgreSQL",
                "Vite",
                "Playwright",
              ]}
            />

            <a
              href="#work"
              className="group flex shrink-0 items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-bone-faint transition-colors hover:text-bone"
            >
              Scroll
              <span
                aria-hidden="true"
                className="relative block h-8 w-px bg-ink-line"
              >
                <span className="absolute inset-x-0 top-0 h-3 bg-[rgb(var(--accent))] animate-[scroll-hint_2.2s_ease-in-out_infinite]" />
              </span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(105%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scroll-hint {
          0%   { transform: translateY(0);      opacity: 1; }
          70%  { transform: translateY(20px);   opacity: 0; }
          71%  { transform: translateY(0);      opacity: 0; }
          100% { transform: translateY(0);      opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          /* Class names contain characters Tailwind escapes; target by attribute
             instead so this rule cannot drift out of sync with the markup. */
          [class*='hero-rise'] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3 transition-transform duration-500 ease-expo group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
