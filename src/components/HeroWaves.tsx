// components/HeroWaves.tsx
"use client"

export default function HeroWaves() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="size-full text-slate-900 dark:text-slate-100"
        viewBox="0 0 1200 600"
        aria-hidden
      >
        <defs>
          <linearGradient id="grad" x1="0" x2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={Array.from({ length: 24 })
              .map((_, x) => {
                const px = (x / 23) * 1200
                const py =
                  300 +
                  Math.sin((x / 23) * Math.PI * 2 + i * 0.6) * 30 +
                  i * 18
                return `${x === 0 ? 'M' : 'L'} ${px} ${py}`
              })
              .join(' ')}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.25 - i * 0.06}
            strokeWidth={1.2}
          />
        ))}

        <rect x="0" y="0" width="1200" height="600" fill="url(#grad)" />
      </svg>
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          svg path {
            animation: drift 40s linear infinite;
          }
          svg path:nth-child(1) { animation-duration: 52s; }
          svg path:nth-child(2) { animation-duration: 46s; }
          svg path:nth-child(3) { animation-duration: 40s; }
          @keyframes drift {
            from { transform: translateX(-1%); }
            to   { transform: translateX(1%); }
          }
        }
      `}</style>
    </div>
  )
}
