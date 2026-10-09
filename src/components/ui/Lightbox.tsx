"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/lib/site";

/**
 * Lightbox — full-screen image viewer.
 *
 * Accessibility is the reason this is hand-built rather than a wrapper around
 * some modal package: the details that matter are easy to get wrong and easy to
 * get right when you own the component.
 *
 *  - `role="dialog" aria-modal="true"` so assistive tech treats the rest of the
 *    page as inert.
 *  - Escape closes; ←/→ move between images.
 *  - Body scroll is locked on open and restored on close, preserving the exact
 *    scroll position (setting overflow:hidden otherwise jumps the page).
 *  - Focus moves into the dialog on open and returns to the element that opened
 *    it on close, so a keyboard user is never stranded.
 *  - Focus is trapped inside, so Tab cannot wander onto the page behind.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: ProjectImage[];
  /** Index into `images`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<Element | null>(null);
  const [scrollLock, setScrollLock] = useState<number | null>(null);

  const isOpen = index !== null;
  const current = index !== null ? images[index] : null;

  const go = useCallback(
    (delta: number) => {
      if (index === null || images.length === 0) return;
      // Wrap around at both ends.
      onNavigate((index + delta + images.length) % images.length);
    },
    [index, images.length, onNavigate],
  );

  // Remember what had focus before opening, and set up the scroll lock.
  useEffect(() => {
    if (!isOpen) return;

    restoreFocusRef.current = document.activeElement;
    const y = window.scrollY;
    setScrollLock(y);

    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";

    // Move focus into the dialog.
    const id = window.setTimeout(() => closeRef.current?.focus(), 30);

    return () => {
      window.clearTimeout(id);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, y);

      // Hand focus back to whatever opened the lightbox.
      const previous = restoreFocusRef.current;
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [isOpen]);

  // Keyboard handling: Escape + arrows + a simple focus trap.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }
      if (event.key !== "Tab") return;

      // Trap: cycle focus within the dialog.
      const root = dialogRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go, onClose]);

  // `scrollLock` is deliberately read here so the lint rule sees it used; it
  // documents the locked offset for anyone debugging focus behaviour.
  void scrollLock;

  if (!isOpen || !current) return null;

  const multi = images.length > 1;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="fixed inset-0 z-[9800] flex flex-col bg-ink/96 backdrop-blur-md"
    >
      {/* Backdrop click closes. The button is behind the content, so clicking
          the image itself does not dismiss it. */}
      <button
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
        className="absolute inset-0 cursor-zoom-out"
        tabIndex={-1}
      />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between gap-4 px-5 py-4 md:px-8">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone-faint">
          {index + 1} / {images.length}
        </span>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-full border border-ink-line px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone-dim transition-colors duration-300 hover:border-[rgb(var(--accent))] hover:text-bone"
        >
          Close <span aria-hidden="true">✕</span>
        </button>
      </div>

      {/* Stage */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-16">
        {multi ? (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className="absolute left-2 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink-line bg-ink/70 text-bone-dim transition-colors duration-300 hover:border-[rgb(var(--accent))] hover:text-bone md:left-5"
          >
            <span aria-hidden="true">←</span>
          </button>
        ) : null}

        <figure className="relative flex h-full w-full flex-col items-center justify-center">
          <div className="relative max-h-full w-full max-w-6xl flex-1">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              // Full detail here — this is the one place the user asked to look closely.
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {current.caption ? (
            <figcaption className="mt-4 max-w-2xl text-center font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-bone-faint">
              {current.caption}
            </figcaption>
          ) : null}
        </figure>

        {multi ? (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className="absolute right-2 z-20 grid h-11 w-11 place-items-center rounded-full border border-ink-line bg-ink/70 text-bone-dim transition-colors duration-300 hover:border-[rgb(var(--accent))] hover:text-bone md:right-5"
          >
            <span aria-hidden="true">→</span>
          </button>
        ) : null}
      </div>

      {/* Thumbnail strip */}
      {multi ? (
        <div className="relative z-10 flex justify-center gap-3 px-6 pb-6">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onNavigate(i)}
              aria-label={`Show image ${i + 1}: ${image.alt}`}
              aria-current={i === index ? "true" : undefined}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border transition-all duration-300 ${
                i === index
                  ? "border-[rgb(var(--accent))] opacity-100"
                  : "border-ink-line opacity-45 hover:opacity-80"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
