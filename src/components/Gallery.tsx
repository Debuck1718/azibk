"use client";

import { useState } from "react";
import { Section } from "./ui/Section";
import { ProjectMedia } from "./ui/ProjectMedia";
import { Lightbox } from "./ui/Lightbox";
import { useReveal } from "@/lib/useReveal";
import { useThemeAccent, type AccentTriplet } from "@/lib/useThemeAccent";
import { projects, type Project, type ProjectImage } from "@/lib/site";

/**
 * Gallery.
 *
 * The structure is a numbered editorial list of finished pieces, not a grid of
 * equal tiles — because equal tiles tell a visitor nothing about which piece is
 * the best example of the work, and a framing studio's whole pitch is judgement.
 *
 * Two things do the selling here:
 *
 * 1. **Every piece shows its photograph before you click.** A visitor deciding
 *    whether to spend GH₵2,000 is looking for evidence of finish quality, and
 *    most of them never expand anything. The collapsed row has to carry it.
 * 2. **Each project explains the trade-off, not just the materials.** "We used
 *    museum glass" is a spec. "Museum glass, because the wall faces a window" is
 *    a decision — and decisions are what a customer is actually buying.
 */
export function Gallery() {
  const { onEnter, onLeave } = useThemeAccent();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ images: ProjectImage[]; index: number } | null>(
    null,
  );

  const listRef = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.03 });

  return (
    <Section
      id="gallery"
      index="01"
      title="AziBK in the community"
      lead="A real UPSA SRC Annual Dinner moment, alongside clearly labelled concept examples of framing styles. We’re growing this gallery with finished AziBK commissions."
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

      {/* Independent header and image controls: the image button must not nest
          inside the expand button, so each remains independently usable. */}
      <div className="relative grid gap-4 py-7 sm:py-9 md:grid-cols-[minmax(0,1fr)_14rem] md:items-center md:gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`project-${project.slug}`}
          className="group/toggle flex min-w-0 items-start gap-4 text-left sm:gap-6 md:gap-8"
        >
        <span className="mt-1 shrink-0 font-mono text-[0.68rem] tracking-[0.2em] text-bone-faint transition-colors duration-500 group-hover/toggle:text-[rgb(var(--accent))] sm:mt-2">{project.index}</span>
        <span className="min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
              <h3 className="font-display text-fluid-xl tracking-display transition-transform duration-700 ease-expo group-hover:translate-x-2">
                {project.title}
              </h3>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone-faint">
                {project.category}
              </span>
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
        </span>
        </button>

        {/* Separate, accessible image control; visible at every breakpoint. */}
        <div className="-order-1 w-full sm:order-none md:w-auto">
          <ProjectMedia
            image={project.cover}
            accent={project.accent.join(' ')}
            ratio={project.cover.previewRatio ?? '16 / 10'}
            showCaption={false}
            onOpen={onOpenImage.bind(null, 0)}
            className="w-full"
          />
        </div>
      </div>

      {/* Case-study detail */}
      <div
        id={`project-${project.slug}`}
        className="grid transition-all duration-700 ease-expo"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          {/* Case-study gallery: cover at full width, then supporting shots.
              This is the section that does the actual selling, so it leads. */}
          <div className={`mb-8 grid gap-4 pl-0 md:pl-[3.75rem] ${project.gallery.length ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
            <ProjectMedia
              image={project.cover}
              accent={project.accent.join(' ')}
              ratio="16 / 10"
              priority={open}
              onOpen={onOpenImage.bind(null, 0)}
            />
            {project.gallery.slice(0, 1).map((image, index) => (
              <ProjectMedia
                key={image.src}
                image={image}
                accent={project.accent.join(' ')}
                ratio="16 / 10"
                onOpen={onOpenImage.bind(null, index + 1)}
              />
            ))}
          </div>

          <div className="grid gap-10 pb-12 pl-0 md:pl-[3.75rem] lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* Narrative */}
            <div className="space-y-7">
              <div>
                <h4 className="eyebrow mb-3">The brief</h4>
                <p className="text-pretty text-fluid-base leading-relaxed text-bone-dim">
                  {project.brief}
                </p>
              </div>
              <div>
                <h4 className="eyebrow mb-3">What we did</h4>
                <p className="text-pretty text-fluid-base leading-relaxed text-bone-dim">
                  {project.approach}
                </p>
              </div>
              <div>
                <h4 className="eyebrow mb-4">Decisions that mattered</h4>
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
            <div className="min-w-0 space-y-8 border-t border-ink-line pt-8 sm:border-t-0 sm:pt-0 lg:border-l lg:border-ink-line lg:pl-10">
              <div>
                <h4 className="eyebrow mb-5">Specification</h4>
                <dl className="space-y-5">
                  {project.specs.map((metric) => (
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
                  {project.role} · {project.from}
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
