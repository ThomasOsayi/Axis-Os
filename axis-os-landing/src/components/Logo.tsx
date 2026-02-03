export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <path
          d="M18 2L4 32H14L18 24L22 32H32L18 2Z"
          fill="url(#logoGradient)"
        />
        <path
          d="M18 12L13 24H23L18 12Z"
          fill="#020617"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight">
        <span className="gradient-text">AXIS</span>
        <span className="text-slate-400 ml-1">OS</span>
      </span>
    </div>
  );
}
