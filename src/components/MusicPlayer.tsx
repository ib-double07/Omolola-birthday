import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { MUSIC_TRACK } from "../assets";
import { cn } from "../utils/cn";

const VOLUME = 0.65;

/**
 * Afrobeat background music.
 *  - Tries to autoplay on load. Browsers usually block sound until the visitor
 *    interacts, so if blocked it starts on the first tap / click / key press.
 *  - Pauses automatically when the page is hidden (minimized, tab switched,
 *    phone locked, app switched) and resumes when the visitor comes back —
 *    unless they paused it themselves with the button.
 *  - The floating button always lets the visitor play / pause manually.
 * Swap the audio file in src/assets/music/ to change the song.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [touched, setTouched] = useState(false);

  /** true when the visitor paused with the button — we must not auto-resume then */
  const userPausedRef = useRef(false);
  /** true when we paused because the page was hidden — resume on return */
  const pausedByHideRef = useRef(false);

  const tryPlay = async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.volume = VOLUME;
      await audio.play();
      return true;
    } catch {
      return false; // blocked by the browser's autoplay policy
    }
  };

  // 1) Autoplay on load, falling back to the first user interaction
  useEffect(() => {
    const events = ["pointerdown", "touchend", "click", "keydown"] as const;

    const detach = () => events.forEach((e) => window.removeEventListener(e, onGesture));

    function onGesture(e: Event) {
      // A tap on the music button is handled by the button itself
      if (wrapRef.current?.contains(e.target as Node)) {
        detach();
        return;
      }
      if (userPausedRef.current || document.hidden) return;
      void tryPlay().then((ok) => {
        if (ok) detach();
      });
    }

    void tryPlay().then((ok) => {
      if (!ok) events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }));
    });

    return detach;
  }, []);

  // 2) Stop when the visitor minimizes / leaves; resume when they return
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const hide = () => {
      if (!audio.paused) {
        pausedByHideRef.current = true;
        audio.pause();
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        hide();
      } else if (pausedByHideRef.current && !userPausedRef.current) {
        pausedByHideRef.current = false;
        void tryPlay();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", hide); // iOS Safari / page unload
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", hide);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setTouched(true);
    if (audio.paused) {
      userPausedRef.current = false;
      void tryPlay().then((ok) => {
        if (!ok) setPlaying(false);
      });
    } else {
      userPausedRef.current = true;
      pausedByHideRef.current = false;
      audio.pause();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_TRACK}
        loop
        preload="auto"
        onPlay={() => {
          setPlaying(true);
          setTouched(true); // hide the "Tap for music" hint once music is on
        }}
        onPause={() => setPlaying(false)}
      />
      <div
        ref={wrapRef}
        className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 md:bottom-8 md:right-8"
      >
        {!touched && (
          <span className="fade-in hidden rounded-full border border-gold-500/30 bg-ink/80 px-4 py-2 text-[10px] font-light uppercase tracking-[0.3em] text-gold-300/90 backdrop-blur sm:block">
            Tap for music
          </span>
        )}
        <button
          onClick={toggle}
          aria-label={playing ? "Pause background music" : "Play background music"}
          aria-pressed={playing}
          title={playing ? "Pause music" : "Play afrobeat music"}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95",
            playing
              ? "border-gold-300/70 bg-gold-500/15 text-gold-200 shadow-[0_0_35px_rgba(212,175,106,0.35)]"
              : "border-gold-500/35 bg-ink/70 text-gold-300 hover:border-gold-300/60"
          )}
        >
          {playing ? (
            <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
              <span className="eq-bar h-full w-[3px] rounded-full bg-gold-300" />
              <span className="eq-bar h-full w-[3px] rounded-full bg-gold-300" />
              <span className="eq-bar h-full w-[3px] rounded-full bg-gold-300" />
            </span>
          ) : (
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" strokeWidth={0} />
          )}
        </button>
      </div>
    </>
  );
}
