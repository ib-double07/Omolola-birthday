import { EVENT } from "../data";

/** Closing message + footer. */
export default function Closing() {
  const [first, second] = EVENT.closing.split(". ");

  return (
    <section className="relative py-24 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div data-reveal>
          <span aria-hidden="true" className="gold-text font-serif text-7xl leading-none md:text-8xl">
            &ldquo;
          </span>
          <p className="mt-6 font-serif text-3xl font-light leading-snug text-cream md:text-5xl md:leading-snug">
            {first}. <em className="gold-text italic">{second}</em>
          </p>
        </div>

        <div data-reveal className="mt-14 flex flex-col items-center gap-5" style={{ transitionDelay: "150ms" }}>
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/70" />
            <span className="block h-1.5 w-1.5 rotate-45 bg-gold-400/90" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/70" />
          </div>
          <p className="pl-[0.3em] font-serif text-lg uppercase tracking-[0.3em] text-gold-300">
            {EVENT.celebrant}
          </p>
          <p className="pl-[0.5em] text-[11px] font-light uppercase tracking-[0.5em] text-mute">
            13 · 01 · 2027 — Abuja
          </p>
        </div>
      </div>

      <footer className="mx-auto mt-20 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-cream/10 px-6 pt-8 pb-4 text-[10px] font-light uppercase tracking-[0.3em] text-mute md:mt-28 md:flex-row">
        <p>© 2027 · {EVENT.celebrant}</p>
        <p className="text-gold-400/80">{EVENT.tagline}</p>
        <p className="normal-case tracking-normal text-mute/80">
          Music: &ldquo;HappyBirthday&rdquo;Simisola
        </p>
      </footer>
    </section>
  );
}
