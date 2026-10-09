import type { ReactNode } from "react";

/**
 * Every top-level band on the page uses this wrapper, which is what keeps the
 * rhythm consistent: a numbered eyebrow, a rule, an optional lead paragraph,
 * then whatever the section wants to render.
 */
export function Section({
  id,
  index,
  title,
  lead,
  children,
  className = "",
}: {
  id: string;
  index: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 ${className}`}>
      <div className="shell py-24 md:py-32 lg:py-40">
        <header className="mb-14 md:mb-20">
          <div className="mb-6 flex items-start justify-between gap-6">
            <span className="eyebrow">
              <span className="text-[rgb(var(--accent))]">{index}</span>
              <span className="mx-3 text-ink-line">/</span>
              {title}
            </span>
            <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.28em] text-bone-faint md:block">
              {`§ ${index}`}
            </span>
          </div>

          <div className="hairline mb-10" />

          {lead ? (
            <p className="max-w-3xl text-balance text-fluid-lg text-bone-dim">
              {lead}
            </p>
          ) : null}
        </header>

        {children}
      </div>
    </section>
  );
}
