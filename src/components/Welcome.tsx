import { useEffect } from "react";
import { EVENT } from "../data";
import { cn } from "../utils/cn";

/**
 * Full-screen "Open Invitation" cover.
 * Browsers only allow sound after the visitor interacts with the page, so this
 * tap is what lets the music start straight away. It also holds the hero
 * animation until the invitation is opened.
 */
export default function Welcome({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  // Lock scrolling behind the cover; jump to the top when it opens
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={cn(
        "hero-bg fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink px-6 text-center transition-opacity duration-700 ease-out",
        open ? "pointer-events-none opacity-0" : "opacity-100"
      )}
      style={{ backgroundColor: "var(--color-ink)" }}
      aria-hidden={open}
      inert={open}
    >
      <p className="pl-[0.6em] text-[11px] font-light uppercase tracking-[0.6em] text-gold-300/90 md:text-xs">
        {EVENT.inviteLine}
      </p>

      <h1 className="mt-6 pl-[0.22em] font-serif text-[clamp(1.6rem,6vw,3.6rem)] font-light uppercase tracking-[0.22em] text-cream">
        {EVENT.celebrantDisplay}
      </h1>

      <p className="gold-text mt-4 font-serif text-[clamp(1.3rem,4.2vw,2.4rem)] font-light italic">
        {EVENT.tagline}
      </p>

      <div className="mt-10 flex items-center gap-4" aria-hidden="true">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-500/80" />
        <span className="block h-1.5 w-1.5 rotate-45 bg-gold-400" />
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-500/80" />
      </div>

      <button onClick={onOpen} className="btn-gold mt-10">
        Open Invitation
      </button>

      <p className="mt-6 pl-[0.3em] text-[10px] font-light uppercase tracking-[0.3em] text-mute">
        Best with sound on
      </p>
    </div>
  );
}
