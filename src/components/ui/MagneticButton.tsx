"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/lib/useMagnetic";

type Props = {
  children: ReactNode;
  href: string;
  variant?: "solid" | "ghost";
  className?: string;
  /** Renders an aria-label independently of the visible text. */
  label?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-4 font-mono text-[0.72rem] uppercase tracking-[0.2em] transition-colors duration-500 ease-expo";

/**
 * A pill button that leans toward the cursor.
 *
 * The fill effect is a circle scaling up from the centre on hover; because it
 * is a pseudo-element transform rather than a background-colour transition, it
 * never triggers a repaint of the label text on top of it.
 */
export function MagneticButton({
  children,
  href,
  variant = "solid",
  className = "",
  label,
}: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(0.22);

  const styles =
    variant === "solid"
      ? "border border-transparent bg-bone text-ink hover:text-bone"
      : "border border-ink-line text-bone hover:border-transparent hover:text-ink";

  const fill =
    variant === "solid" ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--accent))]";

  return (
    <a
      ref={ref}
      href={href}
      aria-label={label}
      className={`${base} ${styles} ${className}`}
      data-magnetic
    >
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-[1px] w-[1px] -translate-x-1/2 -translate-y-1/2 rounded-full ${fill} transition-transform duration-[650ms] ease-expo group-hover:scale-[280]`}
      />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </a>
  );
}
