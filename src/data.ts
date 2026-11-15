import { PHOTOS } from "./assets";

/** ── Event details — edit everything here ─────────────────── */
export const EVENT = {
  inviteLine: "You're Invited",
  celebrant: "Dr. Mercy Omolola Jacob",
  celebrantDisplay: "DR. MERCY OMOLOLA JACOB",
  tagline: "45 Years of Grace",
  /** Event start. Abuja, Nigeria = UTC+1 (WAT, no daylight saving). */
  startISO: "2027-01-13T20:00:00+01:00",
  dateLong: "Wednesday, January 13, 2027",
  time: "8:00 PM",
  venue: "Jonnywood Hotel by Bolton",
  venueAddress: "Wuse Zone 5, Abuja, Nigeria",
  mapsQuery: "Jonnywood Hotel by Bolton, Wuse Zone 5, Abuja, Nigeria",
  /** WhatsApp number in international format, no + or spaces */
  whatsapp: "2347026444185",
  whatsappMessage:
    "Hello, I would like to confirm my attendance at Dr. Mercy Omolola Jacob's 45th birthday celebration.",
  closing:
    "Your presence will make this celebration even more special. We look forward to celebrating with you!",
};

/** Google Maps directions link (opens in a new tab) */
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(EVENT.mapsQuery);

/** WhatsApp RSVP link with the pre-filled message */
export const WHATSAPP_URL =
  `https://wa.me/${EVENT.whatsapp}?text=` + encodeURIComponent(EVENT.whatsappMessage);

export interface GalleryItem {
  src: string;
  caption: string;
  alt: string;
  /** CSS object-position — keeps the subject's face in frame when the photo is cropped */
  position: string;
}

/** Five gallery photos with short captions (order = display order) */
export const GALLERY: GalleryItem[] = [
  { src: PHOTOS[0], caption: "Laughter & Light", alt: "Joyful portrait with a bright smile and gold hoop earrings against a dark backdrop", position: "50% 12%" },
  { src: PHOTOS[1], caption: "Cheers to 45", alt: "Hand holding a crystal champagne coupe, with candlelight glowing in the background", position: "50% 50%" },
  { src: PHOTOS[2], caption: "Grace in Every Detail", alt: "Elegant side profile with a pearl drop earring, lit in warm gold against black", position: "50% 22%" },
  { src: PHOTOS[3], caption: "The Celebrant", alt: "Seated portrait in a gold blazer and black satin outfit in a softly lit lounge", position: "50% 6%" },
  { src: PHOTOS[4], caption: "Where the Evening Unfolds", alt: "Looking back over the shoulder in a black open-back gown in a candlelit ballroom", position: "50% 14%" },
];
