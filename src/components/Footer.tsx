import { Marquee } from "./ui/Marquee";
import { profile, parent } from "@/lib/site";

export function Footer() {
  // Built from the real strings rather than hard-coded, so it cannot drift.
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-line">
      {/* Oversized wordmark — the last thing you see, deliberately too big. */}
      <div className="overflow-hidden py-10" aria-hidden="true">
        <Marquee
          speed="slow"
          items={[
            profile.name.toUpperCase(),
            "BESPOKE FRAMING",
            "CONSERVATION",
            "MUSEUM GLASS",
          ]}
          className="[&_span.font-display]:text-[15vw] [&_span.font-display]:leading-[0.85] [&_span.font-display]:text-ink-line"
        />
      </div>

      <div className="shell flex flex-col gap-6 border-t border-ink-line py-8 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone-faint">
          © {year} {profile.name} · {profile.role}
        </p>

        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone-faint">
          A venture of{" "}
          <a
            href={parent.url}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline text-bone-dim hover:text-[rgb(var(--accent))]"
          >
            {parent.name}
          </a>{" "}
          ↗
        </p>

        <a
          href="#top"          className="group flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-bone-faint transition-colors hover:text-bone"
        >
          Back to top
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-expo group-hover:-translate-y-1"
          >
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
