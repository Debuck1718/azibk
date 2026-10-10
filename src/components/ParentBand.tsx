"use client";

import { Section } from "./ui/Section";
import { useReveal } from "@/lib/useReveal";
import { parent } from "@/lib/site";

/**
 * ParentBand — the attribution strip.
 *
 * This exists for one reason: to make the relationship between the framing
 * studio and its parent company unambiguous, and to route every technical
 * visitor to evantradebuckman.com rather than answering engineering questions
 * on a framing site.
 *
 * It is deliberately its own section rather than a footer line. A footer credit
 * reads as an afterthought; a band with a link reads as a statement of who is
 * behind the work — which is exactly what a customer wants to know before
 * spending money, and what a technical visitor needs in order to be sent
 * somewhere useful.
 */
export function ParentBand() {
  const ref = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.15 });

  return (
    <Section
      id="parent"
      index="—"
      title="Who builds this"
      className="border-t border-ink-line"
    >
      <div ref={ref} className="grid gap-12 lg:grid-cols-[1fr_26rem] lg:gap-20">
        <div data-reveal className="will-reveal space-y-6">
          <p className="max-w-2xl text-balance font-display text-fluid-xl leading-[1.2] tracking-display">
            AziBK is run on a platform built and managed by{" "}
            <span className="text-[rgb(var(--accent))]">{parent.name}</span>.
          </p>

          <p className="max-w-2xl text-fluid-base leading-relaxed text-bone-dim">
            {parent.blurb}
          </p>

          {/* The explicit handoff. Anyone looking for engineering work belongs
              on the parent site, and saying so plainly is better than leaving
              them to guess. */}
          <p className="max-w-2xl text-sm leading-relaxed text-bone-faint">
            Looking for software, systems, AI or cybersecurity work? That is
            Evantra&rsquo;s own business, and it lives on their site — this one
            is only for framing.
          </p>

          <div className="pt-2">
            <a
              href={parent.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-4 rounded-full border border-ink-line px-6 py-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-bone transition-colors duration-500 ease-expo hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
            >
              <span>{parent.short}</span>
              <span className="text-ink-line">/</span>
              <span>Engineering, AI &amp; cybersecurity</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-500 ease-expo group-hover:translate-x-1 group-hover:-translate-y-0.5"
              >
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Fact card */}
        <aside data-reveal className="will-reveal">
          <div className="rounded-2xl border border-ink-line p-7">
            <span className="eyebrow">The parent company</span>

            <dl className="mt-6 space-y-4 font-mono text-[0.66rem] uppercase tracking-[0.14em]">
              <div className="border-b border-ink-line pb-4">
                <dt className="text-bone-faint">Name</dt>
                <dd className="mt-1.5 text-fluid-base normal-case tracking-normal text-bone">
                  {parent.name}
                </dd>
              </div>
              <div className="border-b border-ink-line pb-4">
                <dt className="text-bone-faint">Website</dt>
                <dd className="mt-1.5 normal-case tracking-normal">
                  <a
                    href={parent.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-[rgb(var(--accent))]"
                  >
                    evantradebuckman.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-bone-faint">What they do</dt>
                <dd className="mt-1.5 normal-case leading-relaxed tracking-normal text-bone-dim">
                  {parent.tagline}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
