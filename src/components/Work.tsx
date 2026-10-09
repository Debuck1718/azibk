"use client";

import { useState } from "react";
import { Section } from "./ui/Section";
import { ProjectMedia } from "./ui/ProjectMedia";
import { Lightbox } from "./ui/Lightbox";
import { useReveal } from "@/lib/useReveal";
import { useThemeAccent, type AccentTriplet } from "@/lib/useThemeAccent";
import { projects, type Project, type ProjectImage } from "@/lib/site";

/**
 * Work.
 *
 * The structure is a numbered editorial list, not a card grid — because a grid
 * of three equal cards tells the reader nothing about priority, and the whole
 * point of a portfolio is to say *this one matters most*.
 *
 * Two things do the persuading here:
 *
 * 1. **Evidence before claims.** Every row shows its cover image (and a peek at
 *    the second) in the collapsed state, so a reader skimming without clicking
 *    still sees what was built. Most visitors never expand anything.
 * 2. **The whole page re-tints on hover.** See useThemeAccent — the accent CSS
 *    variable is rewritten per project, which is what makes the list feel like
 *    one system rather than five unrelated entries.
 */
export function Work() {
  const { onEnter, onLeave } = useThemeAccent();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ images: ProjectImage[]; index: number } | null>(
    null,
  );

  const listRef = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.03 });

  return (
    <Section
      id="work"
      index="01"
      title="Selected work"
      lead="Five frameworks and platforms I designed, built and then handed over. Every number below was measured before I wrote it down — and you can see the interface each one produced."
    >
      <div ref={listRef} className="border-t border-ink-line">
        {projects.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            open={expanded === project.slug}
            onToggle={() =>
              setExpanded(expanded === project.slug ? null : project.slug)
            }
            onEnter={() => onEnter(project.accent as AccentTriplet)}
            onLeave={onLeave}
            onOpenImage={(index) =>
              setLightbox({ images: [project.cover, ...project.gallery], index })
            }
          />
        ))}
      </div>

      {lightbox ? (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox({ ...lightbox, index })}
        />
      ) : null}
    </Section>
  );
}

function ProjectRow({
  project,
  open,
  onToggle,
  onEnter,
  onLeave,
  onOpenImage,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
  onEnter: () => void;
  onLeave: () => void;
  onOpenImage: (index: number) => void;
}) {
  return (
    <article
      data-reveal
      className="will-reveal group relative border-b border-ink-line"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {/* Accent wash that grows from the left on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[rgb(var(--accent))]/[0.07] to-transparent transition-transform duration-700 ease-expo group-hover:scale-x-100"
      />

      {/* The clickable header. The image strip lives OUTSIDE this button so that
          clicking a screenshot opens the lightbox rather than toggling the row —
          nested interactive elements are invalid HTML and confusing to use. */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`project-${project.slug}`}
        className="relative flex w-full flex-col gap-6 py-9 text-left md:py-11"
      >
        <div className="flex items-start gap-5 md:gap-10">
          <span className="mt-1.5 shrink-0 font-mono text-[0.68rem] tracking-[0.2em] text-bone-faint transition-colors duration-500 group-hover:text-[rgb(var(--accent))] md:mt-2.5">
            {project.index}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h3 className="font-display text-fluid-xl tracking-display transition-transform duration-700 ease-expo group-hover:translate-x-2">
                {project.title}
              </h3>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone-faint">
                {project.year}
              </span>
            </div>

            <p className="mt-3 max-w-2xl text-pretty text-fluid-base text-bone-dim">
              {project.tagline}
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-bone-faint">
              <span className="text-[rgb(var(--accent))]">→ </span>
              {project.outcome}
            </p>

            {/* Stack chips */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-ink-line px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-bone-faint transition-colors duration-500 group-hover:border-[rgb(var(--accent))]/40 group-hover:text-bone-dim"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence strip — visible without expanding, which matters because
              most visitors never click. Two frames: the cover, then one detail.
              Captions are off here; at this width they wrap into an
              unreadable block, and the alt text still serves screen readers. */}
          <div className="hidden shrink-0 gap-3 lg:flex">
            <div className="w-[13rem] xl:w-[16rem]">
              <ProjectMedia
                image={project.cover}
                accent={project.accent.join(' ')}
                ratio="16 / 10"
                showCaption={false}
                onOpen={onOpenImage.bind(null, 0)}
              />
            </div>
            <div className="hidden w-[8.5rem] xl:block">
              <ProjectMedia
                image={project.gallery[0]}
                accent={project.accent.join(' ')}
                ratio="16 / 10"
                showCaption={false}
                onOpen={onOpenImage.bind(null, 1)}
              />
            </div>
          </div>

          {/* Expand affordance */}
          <span
            aria-hidden="true"
            className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-line transition-all duration-500 ease-expo group-hover:border-[rgb(var(--accent))]"
          >
            <span className="relative block h-2.5 w-2.5">
              <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-bone-dim" />
              <span
                className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-bone-dim transition-transform duration-500 ease-expo ${
                  open ? "scale-x-0" : "scale-x-100"
                }`}
              />
            </span>
          </span>
        </div>
      </button>

      {/* Case-study detail */}
      <div
        id={`project-${project.slug}`}
        className="grid transition-all duration-700 ease-expo"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          {/* Case-study gallery: cover at full width, then supporting shots.
              This is the section that does the actual selling, so it leads. */}
          <div className="mb-12 grid gap-4 pl-0 md:pl-[3.75rem] lg:grid-cols-[1.6fr_1fr]">
            <ProjectMedia
              image={project.cover}
              accent={project.accent.join(' ')}
              ratio="16 / 10"
              priority={open}
              onOpen={onOpenImage.bind(null, 0)}
            />
            <ProjectMedia
              image={project.gallery[0]}
              accent={project.accent.join(' ')}
              ratio="16 / 10"
              onOpen={onOpenImage.bind(null, 1)}
            />
          </div>

          <div className="grid gap-10 pb-12 pl-0 md:pl-[3.75rem] lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* Narrative */}
            <div className="space-y-7">
              <div>
                <h4 className="eyebrow mb-3">Problem</h4>
                <p className="text-pretty text-fluid-base leading-relaxed text-bone-dim">
                  {project.problem}
                </p>
              </div>
              <div>
                <h4 className="eyebrow mb-3">Approach</h4>
                <p className="text-pretty text-fluid-base leading-relaxed text-bone-dim">
                  {project.approach}
                </p>
              </div>
              <div>
                <h4 className="eyebrow mb-4">Engineering decisions</h4>
                <ul className="space-y-3">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-bone-dim"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.45em] h-px w-4 shrink-0 bg-[rgb(var(--accent))]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metrics + meta */}
            <div className="space-y-8 lg:border-l lg:border-ink-line lg:pl-10">
              <div>
                <h4 className="eyebrow mb-5">Measured outcome</h4>
                <dl className="space-y-5">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="sr-only">{metric.label}</dt>
                      <dd>
                        <span className="block font-display text-fluid-xl tracking-display text-[rgb(var(--accent))]">
                          {metric.value}
                        </span>
                        <span className="mt-1 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone-faint">
                          {metric.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="space-y-3 border-t border-ink-line pt-6">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-bone-faint">
                  Role · {project.role}
                </p>
                <div className="flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-underline font-mono text-[0.66rem] uppercase tracking-[0.16em] text-bone transition-colors hover:text-[rgb(var(--accent))]"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
