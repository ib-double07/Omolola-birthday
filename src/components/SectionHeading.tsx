import type { ReactNode } from "react";

interface SectionHeadingProps {
  label: string;
  title: ReactNode;
  className?: string;
}

/** Reusable centered heading: small gold label + large serif title + divider. */
export default function SectionHeading({ label, title, className = "" }: SectionHeadingProps) {
  return (
    <div data-reveal className={`text-center ${className}`}>
      <p className="pl-[0.55em] text-[11px] font-light uppercase tracking-[0.55em] text-gold-400/90 md:text-xs">
        {label}
      </p>
      <h2 className="mt-5 font-serif text-4xl font-light leading-tight text-cream md:text-6xl">
        {title}
      </h2>
      <div className="mt-7 flex items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-500/70" />
        <span className="block h-1.5 w-1.5 rotate-45 bg-gold-400/90" />
        <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-500/70" />
      </div>
    </div>
  );
}
