import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "../data";
import SectionHeading from "./SectionHeading";
import { cn } from "../utils/cn";

const AUTOPLAY_MS = 6000;

/** Five-photo slideshow: crossfade + slow Ken Burns zoom, captions, arrows, thumbnails. */
export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => setIndex(((i % GALLERY.length) + GALLERY.length) % GALLERY.length),
    []
  );

  // Autoplay; the interval resets whenever the index changes (manual nav included)
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % GALLERY.length), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, index]);

  const current = GALLERY[index];

  return (
    <section id="gallery" className="relative border-y border-gold-500/10 bg-coal/40 py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Gallery"
          title={
            <>
              Moments in <em className="gold-text italic">gold</em>
            </>
          }
        />

        <div data-reveal className="mx-auto mt-14 max-w-5xl md:mt-20">
          {/* stage */}
          <div
            className="force-dark group relative aspect-[4/5] overflow-hidden border border-gold-500/20 bg-black sm:aspect-[3/2] lg:aspect-[16/9]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {GALLERY.map((p, i) => (
              <img
                key={p.src}
                src={p.src}
                alt={p.alt}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                style={{ objectPosition: p.position }}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out",
                  i === index ? "kenburns opacity-100" : "opacity-0"
                )}
              />
            ))}

            {/* legibility gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/25" />

            {/* caption */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <div key={index} className="caption-in">
                <p className="mb-2 text-[10px] font-light uppercase tracking-[0.5em] text-gold-300/90 md:text-xs">
                  {String(index + 1).padStart(2, "0")} — {String(GALLERY.length).padStart(2, "0")}
                </p>
                <p className="font-serif text-2xl font-light italic text-cream md:text-4xl">
                  {current.caption}
                </p>
              </div>
            </div>

            {/* arrows */}
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-400/30 bg-black/40 text-gold-300 opacity-70 backdrop-blur-sm transition hover:border-gold-300 hover:bg-gold-400/15 md:left-5 md:h-12 md:w-12 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gold-400/30 bg-black/40 text-gold-300 opacity-70 backdrop-blur-sm transition hover:border-gold-300 hover:bg-gold-400/15 md:right-5 md:h-12 md:w-12 md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* thumbnails */}
          <div className="mt-6 flex justify-center gap-2.5 md:gap-4">
            {GALLERY.map((p, i) => (
              <button
                key={p.src}
                onClick={() => go(i)}
                aria-label={`Show photo ${i + 1}: ${p.caption}`}
                className={cn(
                  "h-14 w-14 overflow-hidden border transition-all duration-500 md:h-20 md:w-20",
                  i === index
                    ? "scale-105 border-gold-400 opacity-100"
                    : "border-cream/15 opacity-40 hover:opacity-75"
                )}
              >
                <img src={p.src} alt="" loading="lazy" decoding="async" style={{ objectPosition: p.position }} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
