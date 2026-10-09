"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectImage } from "@/lib/site";

/**
 * ProjectMedia — one screenshot inside a case study.
 *
 * Why a dedicated component instead of a bare <Image>:
 *
 * 1. **Aspect ratio is reserved.** Every image sits in a fixed-ratio box, so the
 *    page never shifts as images load. Layout shift is the fastest way to make
 *    a portfolio feel amateur, and it is entirely avoidable.
 * 2. **Hybrid loading.** The first image in a set is eager (it is the one that
 *    sells); the rest are lazy. Loading six screenshots eagerly would wreck LCP.
 * 3. **The hover state is a real affordance.** It lifts, brightens and shows a
 *    "view" chip, so the lightbox is discoverable rather than a hidden trick.
 * 4. **`kind` drives framing.** A `screen` is contained (UI must not be cropped);
 *    a `scene` is covered (renders and visuals fill the frame).
 * 5. **It degrades honestly.** If a path is missing, a labelled placeholder is
 *    drawn instead of a broken-image icon — which matters because the user will
 *    drop their real files in later.
 */
export function ProjectMedia({
  image,
  accent,
  priority = false,
  onOpen,
  className = "",
  ratio = "16 / 10",
  showCaption = true,
}: {
  image: ProjectImage;
  accent: string;
  priority?: boolean;
  onOpen?: (image: ProjectImage) => void;
  className?: string;
  ratio?: string;
  /** Off for small thumbnails, where a caption wraps into an unreadable block. */
  showCaption?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const contain = image.kind === "screen";

  return (
    <figure className={`group/media relative ${className}`}>
      <button
        type="button"
        onClick={() => onOpen?.(image)}
        aria-label={`Enlarge image: ${image.alt}`}
        className="relative block w-full overflow-hidden rounded-[--radius] border border-ink-line bg-ink-soft transition-all duration-700 ease-expo hover:border-[rgb(var(--accent))]/60"
        style={{ aspectRatio: ratio }}
      >
        {!failed ? (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              // `screen` shots must never be cropped; scenes may fill the frame.
              className={`transition-all duration-[900ms] ease-expo group-hover/media:scale-[1.03] ${
                contain ? "object-contain p-3" : "object-cover"
              } ${loaded ? "opacity-100" : "opacity-0"}`}
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />

            {/* Loading shimmer — shown until the bitmap decodes. */}
            {!loaded ? (
              <span
                aria-hidden="true"
                className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] to-white/[0.01]"
              />
            ) : null}
          </>
        ) : (
          // Placeholder: names the file so the owner knows exactly what to drop in.
          <span className="absolute inset-0 grid place-items-center bg-[rgb(var(--accent))]/[0.06] p-6 text-center">
            <span className="font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.16em] text-bone-faint">
              {image.alt}
              <br />
              <span className="text-[rgb(var(--accent))]">{image.src}</span>
            </span>
          </span>
        )}

        {/* Hover veil + affordance */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/85 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 ease-expo group-hover/media:opacity-100"
        >
          <span className="rounded-full border border-bone/25 px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-bone">
            View
          </span>
          <span
            className="h-6 w-6 shrink-0 rounded-full border border-bone/25"
            style={{ background: `rgb(${accent})`, opacity: 0.9 }}
          />
        </span>

        {/* Accent corner tick — a small detail that ties the image to its project. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l border-t opacity-0 transition-opacity duration-500 group-hover/media:opacity-100"
          style={{ borderColor: `rgb(${accent})` }}
        />
      </button>

      {image.caption && showCaption ? (
        <figcaption className="mt-3 line-clamp-2 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-bone-faint">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
