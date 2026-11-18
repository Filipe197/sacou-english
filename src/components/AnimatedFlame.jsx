// Fogo animado da ofensiva: três camadas de chama que tremulam em ritmos
// diferentes, brilho pulsando atrás e faíscas subindo. Só SVG + CSS (sem
// arquivo externo); com "reduzir movimento" ligado, fica parado.
export default function AnimatedFlame({ children, className = '' }) {
  return (
    <div className={'aflame ' + className} aria-hidden="true">
      <span className="aflame-glow" />
      <svg viewBox="0 0 120 150" fill="none">
        <defs>
          <linearGradient id="af-outer" x1="60" y1="0" x2="60" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FF5A1F" />
            <stop offset=".55" stopColor="#FF8A1F" />
            <stop offset="1" stopColor="#FFB23F" />
          </linearGradient>
          <linearGradient id="af-mid" x1="60" y1="40" x2="60" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFA21F" />
            <stop offset="1" stopColor="#FFD24A" />
          </linearGradient>
          <linearGradient id="af-core" x1="60" y1="80" x2="60" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFE07A" />
            <stop offset="1" stopColor="#FFF6D6" />
          </linearGradient>
        </defs>
        <g className="aflame-outer">
          <path d="M66 4c12 34-21 43-12 67 10-8 16-19 16-30 31 23 45 44 39 67-6 25-25 37-49 37-29 0-50-20-50-46 0-23 15-37 29-54-1 17 3 24 7 26C37 41 58 29 66 4Z" fill="url(#af-outer)" />
        </g>
        <g className="aflame-mid">
          <path d="M63 46c6 20-10 27-4 42 7-4 11-11 12-18 18 15 26 28 22 44-4 15-16 24-33 24-19 0-32-13-32-30 0-14 9-24 18-34 0 9 2 13 5 14-4-16 6-28 12-42Z" fill="url(#af-mid)" />
        </g>
        <g className="aflame-core">
          <path d="M61 82c10 14 21 22 21 34 0 13-9 23-22 23s-22-10-22-23c0-11 12-22 23-34Z" fill="url(#af-core)" />
        </g>
      </svg>
      <span className="aflame-sparks">{[0, 1, 2, 3, 4, 5].map(i => <i key={i} style={{ '--i': i }} />)}</span>
      {children}
    </div>
  );
}
