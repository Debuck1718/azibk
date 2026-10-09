"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A two-part custom cursor: a hard dot that tracks the pointer exactly, and a
 * lagging ring that eases toward it and inflates over interactive elements.
 *
 * Design notes
 * ------------
 * - The dot uses `transform` only and is never lerped, so it stays truthful
 *   under the pointer even at high velocity.
 * - The ring is lerped, which is where the sense of weight comes from.
 * - Everything is hidden on touch devices and when reduced motion is requested.
 * - `mix-blend-mode: difference` means the cursor inverts whatever it passes
 *   over, so it stays legible on both the near-black background and the light
 *   sections without any per-section styling.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let raf = 0;

    const INTERACTIVE =
      'a, button, [role="button"], input, textarea, select, [data-cursor-grow]';

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        // Snap the ring on first sight so it does not fly in from (0,0).
        ringX = pointerX;
        ringY = pointerY;
      }

      const target = event.target as Element | null;
      const interactive = target?.closest?.(INTERACTIVE);
      targetScale = interactive ? 2.6 : 1;
    };

    const onDown = () => {
      targetScale = 0.72;
    };
    const onUp = () => {
      targetScale = 1;
    };
    const onLeaveWindow = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      scale += (targetScale - scale) * 0.16;

      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeaveWindow);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[10000] mix-blend-difference"
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-[6px] w-[6px] rounded-full bg-white opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-white/70 opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
