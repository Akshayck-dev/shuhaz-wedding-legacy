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
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-6">
      {items.map((it) => (
        <div key={it.label} className="glass rounded-2xl px-2 py-5 text-center sm:px-6 sm:py-8">
          <div className="font-serif-display text-3xl font-light text-ink tabular-nums sm:text-6xl">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[9px] tracking-luxury text-muted-foreground uppercase sm:text-xs">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
