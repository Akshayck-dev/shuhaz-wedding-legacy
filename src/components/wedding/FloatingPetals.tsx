import { useMemo } from "react";

export function FloatingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 18 + Math.random() * 18,
        size: 8 + Math.random() * 14,
        drift: `${(Math.random() - 0.5) * 200}px`,
        opacity: 0.25 + Math.random() * 0.35,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="animate-fall absolute top-0 block rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.95 0.04 80), oklch(0.78 0.09 70) 70%, transparent)",
            animationDuration: `${p.duration}s`,
            animationDelay: `-${p.delay}s`,
            opacity: p.opacity,
            ["--drift" as never]: p.drift,
          }}
        />
      ))}
    </div>
  );
}
