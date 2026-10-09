import type { Config } from 'tailwindcss';

/**
 * The whole visual language lives here.
 *
 * The palette is intentionally tiny (one accent, one near-black, one off-white)
 * so that the *layout* and the motion carry the personality, not colour soup.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0B',
          soft: '#101012',
          raised: '#141417',
          line: '#1F1F23',
        },
        bone: {
          DEFAULT: '#EDEAE4',
          dim: '#A8A5A0',
          faint: '#6E6B67',
        },
        // The single accent. Swappable per-project via CSS variables.
        accent: {
          DEFAULT: '#5B8CFF',
          glow: '#8FB0FF',
          deep: '#2A4CC7',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Fluid type scale — no media queries needed for headings.
        'fluid-sm': 'clamp(0.8rem, 0.75rem + 0.25vw, 0.95rem)',
        'fluid-base': 'clamp(0.95rem, 0.9rem + 0.3vw, 1.1rem)',
        'fluid-lg': 'clamp(1.1rem, 1rem + 0.6vw, 1.5rem)',
        'fluid-xl': 'clamp(1.5rem, 1.2rem + 1.6vw, 2.6rem)',
        'fluid-2xl': 'clamp(2rem, 1.4rem + 3.2vw, 4.25rem)',
        'fluid-3xl': 'clamp(2.75rem, 1.5rem + 6vw, 8rem)',
        'fluid-4xl': 'clamp(3.5rem, 1rem + 11vw, 13rem)',
      },
      letterSpacing: {
        tightest: '-0.045em',
        display: '-0.03em',
      },
      transitionTimingFunction: {
        // One shared easing gives the whole site a recognisable "feel".
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        back: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        'marquee-slow': 'marquee 90s linear infinite',
        'marquee-fast': 'marquee 22s linear infinite',
        'spin-slow': 'spin 14s linear infinite',
        'pulse-soft': 'pulse-soft 3.4s ease-in-out infinite',
        float: 'float 7s ease-in-out infinite',
        'caret-blink': 'caret-blink 1.05s step-end infinite',
        'scan-line': 'scan-line 6s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'caret-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(2000%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
