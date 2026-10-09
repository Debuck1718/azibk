import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/ui/Nav";
import { profile } from "@/lib/site";

/**
 * Three typefaces, each with a job:
 *   Space Grotesk — display. Geometric, slightly odd, not the usual portfolio face.
 *   Inter         — body. Neutral and legible at small sizes.
 *   JetBrains Mono— labels, numbers, anything that should read as "engineered".
 *
 * All three are loaded as CSS variables so Tailwind's `font-display` etc. point
 * at them, and `display: swap` means text paints immediately in the fallback.
 */
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.blurb,
  keywords: [
    "framework engineer",
    "React",
    "Next.js",
    "TypeScript",
    "WebGL",
    "design systems",
    "developer portfolio",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${profile.name} — ${profile.role}`,
    description: profile.blurb,
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.blurb,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="relative font-sans antialiased">
        {/* Keyboard users land here first. */}
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[9999] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-ink"
        >
          Skip to content
        </a>

        <Cursor />
        <Nav />

        <main className="relative z-10">{children}</main>

        {/* Structured data helps the profile surface correctly in search. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              email: `mailto:${profile.email}`,
              url: siteUrl,
              sameAs: profile.socials.map((s) => s.href),
            }),
          }}
        />
      </body>
    </html>
  );
}
