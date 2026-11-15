import { useEffect, useState } from "react";
import { EVENT } from "../data";

/** Animated welcome section: "You're Invited" → counting 45 → name → tagline → date. */
export default function Hero() {
  const [n, setN] = useState(0);

  // Ease-out count-up from 0 → 45 once the page loads
  useEffect(() => {
    let raf = 0;
    const startAt = performance.now() + 450;
    const duration = 2300;
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - startAt) / duration));
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // easeOutExpo
      setN(Math.round(eased * 45));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="home"
      className="hero-bg relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* slowly rotating dashed gold ring behind the number */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "min(88vmin, 640px)", height: "min(88vmin, 640px)" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" className="spin-slow h-full w-full opacity-60">
          <defs>
            <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--color-gold-300)" }} stopOpacity="0.9" />
              <stop offset="100%" style={{ stopColor: "var(--color-gold-700)" }} stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="48.5"
            fill="none"
            stroke="url(#ringGold)"
            strokeWidth="0.35"
            strokeDasharray="0.5 3.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-[6%] rounded-full border border-gold-500/10" />
      </div>

      <p
        className="hero-item pl-[0.6em] text-[11px] font-light uppercase tracking-[0.6em] text-gold-300/90 md:text-xs"
        style={{ animationDelay: "0.25s" }}
      >
        {EVENT.inviteLine}
      </p>

      <div className="hero-item relative mt-4 md:mt-6" style={{ animationDelay: "0.55s" }}>
        <span
          className="gold-text font-serif text-[clamp(9rem,30vw,17rem)] font-light leading-none"
          aria-label="45"
        >
          {n}
        </span>
      </div>

      <h1
        className="hero-item mt-6 pl-[0.22em] font-serif text-[clamp(1.45rem,5.2vw,3.4rem)] font-light uppercase tracking-[0.22em] text-cream md:mt-8"
        style={{ animationDelay: "1.25s" }}
      >
        {EVENT.celebrantDisplay}
      </h1>

      <p
        className="gold-text hero-item mt-4 font-serif text-[clamp(1.4rem,4.5vw,2.6rem)] font-light italic md:mt-5"
        style={{ animationDelay: "1.6s" }}
      >
        {EVENT.tagline}
      </p>

      <div
        className="hero-item mt-8 flex items-center gap-4 md:mt-10"
        style={{ animationDelay: "1.95s" }}
        aria-hidden="true"
      >
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/80 md:w-24" />
        <span className="block h-1.5 w-1.5 rotate-45 bg-gold-400" />
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/80 md:w-24" />
      </div>

      <div className="hero-item mt-8 space-y-2.5 md:mt-10" style={{ animationDelay: "2.25s" }}>
        <p className="pl-[0.3em] text-sm font-light uppercase tracking-[0.3em] text-cream/85 md:text-base">
          {EVENT.dateLong} · {EVENT.time}
        </p>
        <p className="pl-[0.25em] text-[11px] font-light uppercase tracking-[0.25em] text-mute md:text-xs">
          {EVENT.venue} — {EVENT.venueAddress}
        </p>
      </div>

      <a
        href="#countdown"
        className="hero-item absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-mute transition-colors hover:text-gold-300"
        style={{ animationDelay: "2.9s" }}
        aria-label="Scroll to countdown"
      >
        <span className="pl-[0.5em] text-[9px] font-light uppercase tracking-[0.5em]">Scroll</span>
        <span className="block h-12 w-px overflow-hidden bg-cream/15">
          <span className="scroll-line block h-full w-full bg-gradient-to-b from-gold-400 to-transparent" />
        </span>
      </a>
    </section>
  );
}
