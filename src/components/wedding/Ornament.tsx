export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-24" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3c1.5 3 3.5 4.5 6 5.5-2.5 1-4.5 2.5-6 5.5-1.5-3-3.5-4.5-6-5.5 2.5-1 4.5-2.5 6-5.5Z"
          fill="currentColor"
          opacity="0.55"
        />
        <circle cx="12" cy="18" r="1.6" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent sm:w-24" />
    </div>
  );
}
