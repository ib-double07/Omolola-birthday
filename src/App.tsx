import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import Details from "./components/Details";
import Rsvp from "./components/Rsvp";
import Closing from "./components/Closing";
import MusicPlayer from "./components/MusicPlayer";
import { useReveal } from "./hooks/useReveal";

export default function App() {
  useReveal();

  return (
    <div className="min-h-screen overflow-x-clip bg-ink font-sans text-cream antialiased">
      {/* subtle film grain */}
      <div className="grain" aria-hidden="true" />

      <Navbar />

      <main>
        <Hero />
        <Countdown />
        <Gallery />
        <Details />
        <Rsvp />
        <Closing />
      </main>

      <MusicPlayer />
    </div>
  );
}
