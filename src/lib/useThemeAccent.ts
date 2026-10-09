'use client';

import { useCallback, useEffect, useRef } from 'react';

export type AccentTriplet = [string, string, string];

const DEFAULT_ACCENT: AccentTriplet = ['91', '140', '255'];
/** How long the pointer must be off every card before the page resets. */
const RESET_DELAY = 90;

/** Lighten a triplet toward white — derives the glow colour from one input. */
function deriveGlow([r, g, b]: AccentTriplet): AccentTriplet {
  const lift = (v: string) => Math.round(Number(v) + (255 - Number(v)) * 0.42);
  return [String(lift(r)), String(lift(g)), String(lift(b))];
}

function apply(accent: AccentTriplet) {
  const root = document.documentElement;
  root.style.setProperty('--accent', accent.join(' '));
  root.style.setProperty('--accent-glow', deriveGlow(accent).join(' '));
}

/**
 * The signature interaction of the site: while a project card is hovered, the
 * whole page re-tints to that project's colour — links, focus rings, the grid
 * glow, the hero blob. One CSS variable, rewritten.
 *
 * The reset is *deferred* rather than immediate. Sweeping the cursor from one
 * card to the next fires `pointerleave` before the next `pointerenter`, so a
 * synchronous reset would flash the default blue for a frame between cards.
 * The pending timeout is cancelled by the next enter, which lets the tint move
 * continuously across the grid.
 */
export function useThemeAccent() {
  const timer = useRef<number | null>(null);

  const cancel = useCallback(() => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const onEnter = useCallback(
    (accent: AccentTriplet) => {
      cancel();
      apply(accent);
    },
    [cancel],
  );

  const onLeave = useCallback(() => {
    cancel();
    timer.current = window.setTimeout(() => apply(DEFAULT_ACCENT), RESET_DELAY);
  }, [cancel]);

  useEffect(() => {
    const reset = () => {
      cancel();
      apply(DEFAULT_ACCENT);
    };
    // A window blur or tab switch can leave us tinted with no pointerleave to undo it.
    window.addEventListener('blur', reset);
    return () => {
      window.removeEventListener('blur', reset);
      cancel();
      reset();
    };
  }, [cancel]);

  return { onEnter, onLeave, cancel };
}
