import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { EVENT } from "../data";
import { cn } from "../utils/cn";

const LINKS = [
  { href: "#home", label: "Invitation" },
  { href: "#gallery", label: "Gallery" },
  { href: "#details", label: "Details" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-gold-500/10 bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
          <a href="#home" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 font-serif text-sm text-gold-300 transition-colors duration-300 group-hover:border-gold-300 group-hover:text-gold-200">
              45
            </span>
            <span className="hidden font-serif text-base uppercase tracking-[0.18em] text-cream/90 sm:block md:text-lg">
              {EVENT.celebrant}
            </span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[11px] font-light uppercase tracking-[0.35em] text-cream/60 transition-colors duration-300 hover:text-gold-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </nav>

        {/* scroll progress bar */}
        <div className="h-px w-full bg-cream/10">
          <div
            className="h-full bg-gradient-to-r from-gold-700 via-gold-400 to-gold-200 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* mobile full-screen menu */}
      {open && (
        <div className="fade-in fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-500/40 font-serif text-sm text-gold-300">
              45
            </span>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500/30 text-gold-300"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hero-item font-serif text-4xl font-light text-cream/90 transition-colors hover:text-gold-300"
                style={{ animationDelay: `${0.08 * i + 0.1}s` }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <p className="pb-10 text-center text-[10px] font-light uppercase tracking-[0.4em] text-mute">
            13 · 01 · 2027 — Abuja
          </p>
        </div>
      )}
    </>
  );
}
