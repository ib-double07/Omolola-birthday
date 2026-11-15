/**
 * ─────────────────────────────────────────────────────────────
 *  REPLACEABLE ASSETS
 *
 *  Photos — drop your own images into `src/assets/gallery/` and keep
 *  the names 1.jpg … 5.jpg (or edit the imports below).
 *  Recommended: ~1400px wide, JPEG, quality ~80.
 *
 *  Music — replace `src/assets/music/afrobeat-loop.mp3` with any
 *  audio file (mp3 / ogg / wav). It loops and NEVER autoplays;
 *  playback starts only when the guest taps the music button.
 *
 *  Current track: "HappyBirthday" by Simisola,
 *  CC BY-NC-ND 3.0 — free for non-commercial use, no derivatives.
 * ─────────────────────────────────────────────────────────────
 */
import photo1 from "./assets/gallery/1.jpg";
import photo2 from "./assets/gallery/2.jpg";
import photo3 from "./assets/gallery/3.jpg";
import photo4 from "./assets/gallery/4.jpg";
import photo5 from "./assets/gallery/5.jpg";
import track from "./assets/music/afrobeat-loop.mp3";

export const PHOTOS = [photo1, photo2, photo3, photo4, photo5] as const;
export const MUSIC_TRACK = track;
