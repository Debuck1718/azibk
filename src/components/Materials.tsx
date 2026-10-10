"use client";

import { useState } from "react";
import Image from "next/image";
import { Section } from "./ui/Section";
import { useReveal } from "@/lib/useReveal";
import { skillGroups, type Item, type Tier } from "@/lib/site";

const TIER_LABEL: Record<Tier, string> = {
  house: "House",
  premium: "Premium",
  select: "Select",
};

const TIER_STYLE: Record<Tier, string> = {
  house: "border-ink-line text-bone-dim bg-white/5",
  premium: "border-[rgb(var(--accent))]/60 text-[rgb(var(--accent))] bg-[rgb(var(--accent))]/10",
  select: "border-bone-dim/50 text-bone bg-white/[0.06]",
};

/**
 * Materials & craft.
 *
 * This section has to be *convincing* to someone about to spend money, so it is
 * built as an inspectable specification rather than a wall of adjectives.
 *
 * - Every material carries a note about what it actually does ("a sealed foil
 *   layer so damp moves around the frame"). A materials list claims a catalogue;
 *   a note claims understanding, and the customer can check it.
 * - Tiers are honest: House, Premium, Select. Naming a house tier openly is what
 *   makes the premium tiers credible. A list where everything is "best" is a
 *   list that has told you nothing.
 * - The bar is decorative depth, so it is aria-hidden; the tier badge carries
 *   the real meaning for screen readers.
 */
export function Materials() {
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const groups =
    activeGroup === "all"
      ? skillGroups
      : skillGroups.filter((g) => g.id === activeGroup);

  const listRef = useReveal<HTMLDivElement>({ stagger: true, threshold: 0.05 });

  return (
    <Section
      id="materials"
      index="02"
      title="Materials & craft"
      lead="What we frame with, and why it costs what it costs. Anything listed as House is what we use as standard — we would rather tell you the honest tiers than pretend everything is the top one."
    >
      {/* Filter rail */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        <FilterChip
          label="Everything"
          active={activeGroup === "all"}
          onClick={() => setActiveGroup("all")}
        />
        {skillGroups.map((group) => (
          <FilterChip
            key={group.id}
            label={group.title}
            active={activeGroup === group.id}
            onClick={() => setActiveGroup(group.id)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {(Object.keys(TIER_LABEL) as Tier[]).map((tier) => (
          <span
            key={tier}
            className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-bone-faint"
          >
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${tier === "premium" ? "bg-[rgb(var(--accent))]" : tier === "select" ? "bg-bone" : "bg-bone-faint"}`}
            />
            {TIER_LABEL[tier]}
          </span>
        ))}
      </div>

      <div ref={listRef} className="grid gap-x-14 gap-y-16 lg:grid-cols-2">
        {groups.map((group) => (
          <div key={group.id} data-reveal className="will-reveal">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h3 className="font-display text-fluid-lg tracking-display">
                {group.title}
              </h3>
              <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-bone-faint">
                {group.items.length} options
              </span>
            </div>
            <p className="mb-7 max-w-md text-sm text-bone-faint">
              {group.caption}
            </p>

            <ul className="divide-y divide-ink-line border-y border-ink-line">
              {group.items.map((item) => (
                <ItemRow
                  key={item.name}
                  item={item}
                  open={openItem === item.name}
                  onToggle={() =>
                    setOpenItem(openItem === item.name ? null : item.name)
                  }
                />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* The numbers that back the grid */}
      <div className="mt-20 border-t border-ink-line pt-10">
        <p className="max-w-2xl text-sm text-bone-faint">
          Depth is measured by what has survived production, not by courses.
          Where an option is listed as{" "}
          <em className="not-italic text-bone-dim">House</em>, it means it is
          what we fit as standard — not a downgrade we are hoping you will not
          project with it tomorrow.
        </p>
      </div>
    </Section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] transition-all duration-500 ease-expo ${
        active
          ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))]/12 text-[rgb(var(--accent))]"
          : "border-ink-line text-bone-faint hover:border-bone-faint hover:text-bone-dim"
      }`}
    >
      {label}
    </button>
  );
}

function ItemRow({
  item,
  open,
  onToggle,
}: {
  item: Item;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center gap-4 py-4 text-left"
      >
        {/* Logo mark. Monochrome and dimmed at rest, full colour on hover — a
            logo wall in full colour competes with the content, but greyscale on
            rest keeps recognition without the noise. Falls back to a tier dot
            when no mark is supplied for a tool. */}
        <span className="relative grid h-9 w-9 shrink-0 place-items-center">
          {item.icon ? (
            <Image
              src={item.icon}
              alt=""
              width={22}
              height={22}
              className="opacity-55 grayscale transition-all duration-500 ease-expo group-hover:opacity-100 group-hover:grayscale-0"
            />
          ) : (
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                item.tier === "premium"
                  ? "bg-[rgb(var(--accent))]"
                  : "bg-ink-line group-hover:bg-bone-faint"
              }`}
            />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-baseline justify-between gap-4">
            <span className="truncate text-fluid-base transition-colors duration-300 group-hover:text-bone">
              {item.name}
            </span>
            <span
              className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.56rem] uppercase tracking-[0.14em] ${TIER_STYLE[item.tier]}`}
            >
              {TIER_LABEL[item.tier]}
            </span>
          </span>

          {/* Depth bar — decorative, the tier badge above carries the meaning. */}
          <span
            aria-hidden="true"
            className="mt-2.5 block h-px w-full bg-ink-line"
          >
            <span
              className="block h-px bg-[rgb(var(--accent))] transition-[width] duration-1000 ease-expo"
              style={{
                width: open
                  ? `${item.depth}%`
                  : `${Math.round(item.depth * 0.94)}%`,
              }}
            />
          </span>
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={`h-2.5 w-2.5 shrink-0 text-bone-faint transition-transform duration-500 ease-expo ${
            open ? "rotate-90 text-[rgb(var(--accent))]" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M4 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Detail panel — grid-rows trick animates to intrinsic height. */}
      <div
        className="grid transition-all duration-500 ease-expo"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pl-[1.375rem] text-sm leading-relaxed text-bone-dim">
            {item.note}
          </p>
        </div>
      </div>
    </li>
  );
}
