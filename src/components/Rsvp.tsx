import { MessageCircle } from "lucide-react";
import { EVENT, WHATSAPP_URL } from "../data";
import SectionHeading from "./SectionHeading";

/** WhatsApp RSVP — opens chat with a pre-filled confirmation message. */
export default function Rsvp() {
  return (
    <section id="rsvp" className="relative border-t border-gold-500/10 bg-coal/40 py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading
          label="R.S.V.P."
          title={
            <>
              Kindly <em className="gold-text italic">confirm your attendance</em>
            </>
          }
        />
        <p
          data-reveal
          className="mx-auto mt-10 max-w-xl text-base font-light leading-relaxed text-cream/70 md:text-lg"
        >
          Tap the button below and WhatsApp will open with a pre-filled message — just press send.
        </p>
        <div data-reveal className="mt-10" style={{ transitionDelay: "120ms" }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            aria-label="RSVP on WhatsApp with a pre-filled message"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            RSVP on WhatsApp
          </a>
          <p className="mt-5 pl-[0.25em] text-[11px] font-light uppercase tracking-[0.25em] text-mute">
            +234 702 644 4185 · message pre-filled
          </p>
        </div>
        <p data-reveal className="sr-only">
          {EVENT.whatsappMessage}
        </p>
      </div>
    </section>
  );
}
