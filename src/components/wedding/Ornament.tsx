export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-24" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold">
        {/* Mughal-inspired geometric star/flower */}
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="currentColor"
          opacity="0.8"
        />
        <circle cx="12" cy="12" r="2" fill="var(--color-maroon)" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-24" />
    </div>
  );
}
