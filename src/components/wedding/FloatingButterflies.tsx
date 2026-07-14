import { useMemo, useState, useEffect } from "react";

export function FloatingButterflies({ count = 10 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  const butterflies = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: ((i * 137.508) % 100), // deterministic golden-angle distribution
        delay: (i * 2.3) % 20,
        duration: 15 + ((i * 3.7) % 15),
        size: 14 + ((i * 5.1) % 14),
        drift: `${((i % 2 === 0 ? 1 : -1) * (50 + (i * 29) % 200))}px`,
        opacity: 0.3 + ((i * 0.07) % 0.4),
      })),
    [count],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden z-[1]">
      {butterflies.map((b) => (
        <span
          key={b.id}
          className="animate-fall absolute top-0 block text-white/40"
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `-${b.delay}s`,
            opacity: b.opacity,
            ["--drift" as never]: b.drift,
          }}
        >
          <svg
            width={b.size}
            height={b.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 22C12 22 10 18.5 7 18.5C3.5 18.5 2 13.5 2 13.5C2 13.5 6.5 14 9.5 12C9.5 12 3.5 10 3.5 5.5C3.5 1.5 8 2 10 5.5C11 7 11.5 9.5 12 12C12.5 9.5 13 7 14 5.5C16 2 20.5 1.5 20.5 5.5C20.5 10 14.5 12 14.5 12C17.5 14 22 13.5 22 13.5C22 13.5 20.5 18.5 17 18.5C14 18.5 12 22 12 22Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
