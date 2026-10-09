/**
 * An infinite horizontal ticker.
 *
 * Implementation detail that matters: the track contains the item list **twice**
 * and translates by exactly -50%. That means the seam is always mid-content, so
 * there is no visible jump at the wrap point — the usual failure of CSS
 * marquees. It is pure CSS, so it runs off the main thread and never blocks a
 * scroll.
 */
export function Marquee({
  items,
  speed = 'normal',
  reverse = false,
  className = '',
}: {
  items: string[];
  speed?: 'fast' | 'normal' | 'slow';
  reverse?: boolean;
  className?: string;
}) {
  const animation =
    speed === "fast"
      ? "animate-marquee-fast"
      : speed === "slow"
        ? "animate-marquee-slow"
        : "animate-marquee";

  const lane = [...items, ...items];

  return (
    <div
      className={`edge-fade group relative flex overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className={`flex w-max shrink-0 items-center ${animation} group-hover:[animation-play-state:paused]`}
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {lane.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center">
            <span className="whitespace-nowrap px-6 font-display text-fluid-lg tracking-display text-bone-dim transition-colors duration-500 hover:text-bone">
              {item}
            </span>
            <span
              className="h-1 w-1 shrink-0 rounded-full bg-[rgb(var(--accent))] opacity-70"
              aria-hidden="true"
            />
          </span>
        ))}
      </div>
    </div>
  );
}
