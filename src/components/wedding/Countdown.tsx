import { useEffect, useState } from "react";

const target = new Date("2026-08-09T12:00:00+05:30").getTime();

function diff() {
  const d = Math.max(0, target - Date.now());
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "DAYS", value: t.days },
    { label: "HRS", value: t.hours },
    { label: "MIN", value: t.minutes },
    { label: "SEC", value: t.seconds },
  ];

  return (
    <div className="flex justify-center gap-2 sm:gap-4">
      {items.map((it) => (
        <div key={it.label} className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-gold/40 bg-black/5 backdrop-blur-sm shadow-sm">
          <div className="font-serif-display text-2xl font-normal text-gold tabular-nums sm:text-3xl leading-none">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[7px] tracking-widest text-gold/70 uppercase sm:text-[9px]">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
