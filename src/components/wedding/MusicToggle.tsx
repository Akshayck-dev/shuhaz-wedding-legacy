import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";

const SRC =
  "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc7a8b3.mp3?filename=relaxing-piano-music-116084.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="glass fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full text-gold transition hover:scale-110 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
    >
      {playing ? <Music2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
    </button>
  );
}
