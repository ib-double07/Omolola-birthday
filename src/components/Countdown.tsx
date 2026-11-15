import { useEffect, useState } from "react";
import { EVENT } from "../data";
import SectionHeading from "./SectionHeading";

const TARGET = new Date(EVENT.startISO).getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function calc(): TimeLeft {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
    done: false,
  };
}

const pad = (v: number) => String(v).padStart(2, "0");

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 md:gap-4">
      {/* key={value} retriggers the tick animation on every change */}
      <span
        key={value}
        className="gold-text tick font-serif text-6xl font-light leading-none tabular-nums sm:text-7xl md:text-8xl"
      >
        {pad(value)}
      </span>
      <span className="pl-[0.45em] text-[10px] font-light uppercase tracking-[0.45em] text-mute md:text-xs">
        {label}
      </span>
    </div>
  );
}

/** Live days / hours / minutes / seconds countdown to the event. */
export default function Countdown() {
  const [t, setT] = useState<TimeLeft>(calc);

  useEffect(() => {
    const id = window.setInterval(() => setT(calc()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section id="countdown" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="Countdown"
          title={
            <>
              Until <em className="gold-text italic">the celebration</em>
            </>
          }
        />
        <div
          data-reveal
          className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-12 md:mt-20 md:grid-cols-4 md:divide-x md:divide-gold-500/10"
        >
          <Cell value={t.days} label="Days" />
          <Cell value={t.hours} label="Hours" />
          <Cell value={t.minutes} label="Minutes" />
          <Cell value={t.seconds} label="Seconds" />
        </div>
        {t.done && (
          <p className="mt-12 text-center font-serif text-2xl italic text-gold-300 md:text-3xl">
            The celebration has begun — we can't wait to see you!
          </p>
        )}
      </div>
    </section>
  );
}
