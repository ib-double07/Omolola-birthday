import { CalendarDays, Clock, MapPin, Navigation, type LucideIcon } from "lucide-react";
import { EVENT, MAPS_URL } from "../data";
import SectionHeading from "./SectionHeading";

interface DetailItem {
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
}

const ITEMS: DetailItem[] = [
  { icon: CalendarDays, label: "Date", value: EVENT.dateLong, sub: "Save the date" },
  { icon: Clock, label: "Time", value: EVENT.time, sub: "West Africa Time (UTC+1)" },
  { icon: MapPin, label: "Venue", value: EVENT.venue, sub: EVENT.venueAddress },
];

/** Clean event details + Google Maps directions button. */
export default function Details() {
  return (
    <section id="details" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="The Details"
          title={
            <>
              An evening <em className="gold-text italic">to remember</em>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
          {ITEMS.map((item, i) => (
            // wrapper handles the scroll-reveal; the card itself handles hover transitions
            <div key={item.label} data-reveal style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="group h-full border border-gold-500/15 bg-cream/[0.03] p-8 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/40 hover:bg-cream/[0.05] md:p-10">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/30 text-gold-300 transition-colors duration-500 group-hover:border-gold-300 group-hover:text-gold-200">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="mt-6 pl-[0.45em] text-[10px] font-light uppercase tracking-[0.45em] text-gold-400/80">
                  {item.label}
                </p>
                <p className="mt-3 font-serif text-2xl font-light leading-snug text-cream md:text-[1.7rem]">
                  {item.value}
                </p>
                <p className="mt-2.5 pl-[0.2em] text-[11px] font-light uppercase tracking-[0.2em] text-mute">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-12 text-center md:mt-16">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            aria-label={`Get directions to ${EVENT.venue} on Google Maps`}
          >
            <Navigation className="h-4 w-4" strokeWidth={1.75} />
            Get Directions
          </a>
          <p className="mt-5 pl-[0.2em] text-[11px] font-light uppercase tracking-[0.2em] text-mute">
            {EVENT.venue} · {EVENT.venueAddress}
          </p>
        </div>
      </div>
    </section>
  );
}
