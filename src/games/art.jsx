// Ilustrações próprias do Sacou English (desenhadas em SVG, sem arquivos de fora):
// personagens montáveis e cenários. Mesmo traço em todos os jogos.

const SKIN = { a: '#F6D3B8', b: '#E7B48F', c: '#C98B62', d: '#9A6142', e: '#6E4430' };

// ---------- personagem ----------
// look: { skin: a-e, hair: short|long|curly|bun|ponytail|bald|spiky, hairColor, shirt, extra: glasses|apron|cap|beard|bow|tie }
export function Person({ look = {}, mood = 'happy', talking = false, size = 120, flip = false, title }) {
  const skin = SKIN[look.skin] || look.skin || SKIN.b;
  const hc = look.hairColor || '#2B1D16';
  const shirt = look.shirt || '#5B3DF5';
  const ex = new Set([].concat(look.extra || []));
  const mouth = talking ? 'talk' : mood;
  return (
    <svg viewBox="0 0 120 150" width={size} height={size * 1.25} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, overflow: 'visible', display: 'block' }}>
      {/* cabelo de trás */}
      {look.hair === 'long' && <path d="M28 52 C26 20 94 20 92 52 L96 112 C80 120 40 120 24 112 Z" fill={hc} />}
      {look.hair === 'curly' && <g fill={hc}>{[[34, 40], [44, 28], [60, 24], [76, 28], [86, 40], [90, 56], [30, 56], [28, 72], [92, 72], [34, 86], [86, 86]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="14" />)}</g>}
      {look.hair === 'ponytail' && <path d="M84 40 C104 44 104 80 92 96 C90 80 88 62 80 50 Z" fill={hc} />}
      {/* corpo */}
      <path d="M14 150 C14 112 34 98 60 98 C86 98 106 112 106 150 Z" fill={shirt} />
      {ex.has('apron') && <path d="M40 104 L80 104 L84 150 L36 150 Z" fill="#fff" opacity=".92" />}
      {ex.has('tie') && <path d="M57 100 L63 100 L66 130 L60 138 L54 130 Z" fill="#B42318" />}
      {ex.has('bow') && <path d="M50 101 L60 106 L70 101 L70 111 L60 106 L50 111 Z" fill="#E11D74" />}
      <rect x="51" y="80" width="18" height="22" rx="6" fill={skin} />
      {/* cabeça */}
      <ellipse cx="60" cy="56" rx="28" ry="31" fill={skin} />
      <ellipse cx="32" cy="60" rx="5" ry="7" fill={skin} /><ellipse cx="88" cy="60" rx="5" ry="7" fill={skin} />
      {ex.has('beard') && <path d="M34 62 C36 92 84 92 86 62 C80 76 40 76 34 62 Z" fill={hc} />}
      {/* cabelo da frente */}
      {look.hair === 'short' && <path d="M31 50 C30 22 90 18 90 48 C80 36 60 32 40 40 C36 42 33 46 31 50 Z" fill={hc} />}
      {look.hair === 'spiky' && <path d="M30 50 L34 26 L44 34 L50 18 L58 30 L66 16 L72 30 L82 22 L84 36 L92 34 L90 52 C76 38 46 36 30 50 Z" fill={hc} />}
      {(look.hair === 'long' || look.hair === 'ponytail') && <path d="M30 54 C28 22 92 20 90 54 C82 38 70 32 60 32 C50 32 38 38 30 54 Z" fill={hc} />}
      {look.hair === 'curly' && <g fill={hc}>{[[40, 36], [52, 30], [66, 30], [78, 36]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="11" />)}</g>}
      {look.hair === 'bun' && <><circle cx="60" cy="18" r="13" fill={hc} /><path d="M31 52 C30 22 90 22 89 52 C80 36 40 36 31 52 Z" fill={hc} /></>}
      {ex.has('cap') && <><path d="M30 44 C30 18 90 18 90 44 Z" fill="#1E3A8A" /><rect x="26" y="40" width="68" height="8" rx="4" fill="#172554" /><circle cx="60" cy="31" r="5" fill="#FACC15" /></>}
      {/* rosto */}
      <ellipse cx="48" cy="58" rx="3.6" ry={mood === 'surprised' ? 5 : 4.2} fill="#1B1E35" />
      <ellipse cx="72" cy="58" rx="3.6" ry={mood === 'surprised' ? 5 : 4.2} fill="#1B1E35" />
      <circle cx="49.2" cy="56.6" r="1.2" fill="#fff" /><circle cx="73.2" cy="56.6" r="1.2" fill="#fff" />
      {mood === 'sad' && <><path d="M41 49 L54 52" stroke="#1B1E35" strokeWidth="2.4" strokeLinecap="round" /><path d="M79 49 L66 52" stroke="#1B1E35" strokeWidth="2.4" strokeLinecap="round" /></>}
      {mood === 'angry' && <><path d="M41 51 L54 48" stroke="#1B1E35" strokeWidth="2.6" strokeLinecap="round" /><path d="M79 51 L66 48" stroke="#1B1E35" strokeWidth="2.6" strokeLinecap="round" /></>}
      <ellipse cx="42" cy="68" rx="5" ry="3" fill="#F43F5E" opacity=".16" /><ellipse cx="78" cy="68" rx="5" ry="3" fill="#F43F5E" opacity=".16" />
      {ex.has('glasses') && <g fill="none" stroke="#1B1E35" strokeWidth="2.2"><circle cx="48" cy="58" r="8.5" /><circle cx="72" cy="58" r="8.5" /><path d="M56.5 58 L63.5 58" /></g>}
      {mouth === 'happy' && <path d="M50 71 Q60 80 70 71" fill="none" stroke="#7A2E2E" strokeWidth="3" strokeLinecap="round" />}
      {mouth === 'neutral' && <path d="M52 73 L68 73" stroke="#7A2E2E" strokeWidth="3" strokeLinecap="round" />}
      {mouth === 'sad' && <path d="M51 76 Q60 69 69 76" fill="none" stroke="#7A2E2E" strokeWidth="3" strokeLinecap="round" />}
      {mouth === 'angry' && <path d="M51 75 Q60 70 69 75" fill="none" stroke="#7A2E2E" strokeWidth="3" strokeLinecap="round" />}
      {mouth === 'surprised' && <ellipse cx="60" cy="74" rx="4.5" ry="6" fill="#7A2E2E" />}
      {mouth === 'talk' && <ellipse className="pp-talk" cx="60" cy="73" rx="7" ry="4.5" fill="#7A2E2E" />}
    </svg>
  );
}

// ---------- cenários ----------
const Win = ({ x, y, w = 18, h = 22, c = '#FDE68A' }) => <rect x={x} y={y} width={w} height={h} rx="2" fill={c} />;
const sky = (id, a, b) => <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>;

const PLACES = {
  airport: () => (<>
    {sky('sk-air', '#93C5FD', '#DBEAFE')}
    <rect width="400" height="220" fill="#E2E8F0" />
    <rect x="20" y="20" width="360" height="120" rx="6" fill="url(#sk-air)" stroke="#94A3B8" strokeWidth="4" />
    {[110, 200, 290].map(x => <rect key={x} x={x} y="20" width="4" height="120" fill="#94A3B8" />)}
    <g transform="translate(230 62) rotate(-8)" fill="#fff"><path d="M0 10 L90 6 C100 6 104 12 96 15 L0 18 Z" /><path d="M40 10 L60 -14 L70 -14 L60 10 Z" /><path d="M44 16 L62 36 L72 36 L60 15 Z" /><path d="M2 12 L-8 -4 L2 -4 L12 10 Z" /></g>
    <rect x="34" y="34" width="70" height="40" rx="4" fill="#0F172A" />
    {[0, 1, 2].map(i => <rect key={i} x="40" y={41 + i * 11} width={44 - i * 8} height="5" rx="2" fill="#FACC15" />)}
    <rect y="140" width="400" height="80" fill="#CBD5E1" /><rect y="140" width="400" height="5" fill="#94A3B8" />
  </>),
  cafe: () => (<>
    <rect width="400" height="220" fill="#F5E6D3" />
    <rect x="0" y="0" width="400" height="18" fill="#7C4A2D" />
    {[70, 200, 330].map(x => <g key={x}><rect x={x} y="18" width="2" height="26" fill="#3F2A1D" /><path d={`M${x - 14} 58 L${x + 16} 58 L${x + 8} 44 L${x - 6} 44 Z`} fill="#3F2A1D" /><circle cx={x + 1} cy="60" r="4" fill="#FDE68A" /></g>)}
    <rect x="250" y="66" width="120" height="68" rx="6" fill="#1F2937" />
    {[0, 1, 2, 3].map(i => <rect key={i} x="262" y={78 + i * 13} width={70 - (i % 2) * 22} height="5" rx="2" fill="#F8FAFC" opacity=".85" />)}
    <rect x="30" y="80" width="150" height="6" fill="#7C4A2D" />
    {[44, 72, 100, 128, 156].map((x, i) => <path key={x} d={`M${x} 80 L${x + 14} 80 L${x + 12} 66 L${x + 2} 66 Z`} fill={['#5B3DF5', '#F97316', '#10B981', '#E11D74', '#0EA5E9'][i]} />)}
    <rect y="150" width="400" height="70" fill="#8B5A3C" /><rect y="150" width="400" height="10" fill="#A0694A" />
  </>),
  street: () => (<>
    {sky('sk-st', '#7DD3FC', '#E0F2FE')}
    <rect width="400" height="220" fill="url(#sk-st)" />
    <circle cx="340" cy="40" r="18" fill="#FDE047" />
    <rect x="10" y="50" width="90" height="120" fill="#F97316" /><rect x="110" y="30" width="80" height="140" fill="#5B3DF5" /><rect x="200" y="60" width="100" height="110" fill="#0EA5E9" /><rect x="310" y="80" width="80" height="90" fill="#10B981" />
    {[[22, 62], [56, 62], [22, 96], [56, 96], [122, 44], [152, 44], [122, 78], [152, 78], [122, 112], [152, 112], [214, 74], [250, 74], [214, 108], [250, 108], [324, 94], [354, 94]].map(([x, y], i) => <Win key={i} x={x} y={y} />)}
    <rect y="170" width="400" height="50" fill="#94A3B8" /><rect y="166" width="400" height="8" fill="#CBD5E1" />
  </>),
  home: () => (<>
    <rect width="400" height="220" fill="#FDF2F8" />
    <rect x="40" y="30" width="90" height="80" rx="4" fill="#BAE6FD" stroke="#fff" strokeWidth="6" /><rect x="83" y="30" width="4" height="80" fill="#fff" />
    <rect x="250" y="36" width="60" height="44" rx="3" fill="#FDE68A" stroke="#A16207" strokeWidth="4" /><circle cx="270" cy="56" r="7" fill="#F97316" /><path d="M256 76 L276 60 L304 76 Z" fill="#16A34A" />
    <rect x="160" y="96" width="170" height="44" rx="14" fill="#5B3DF5" /><rect x="150" y="110" width="190" height="34" rx="12" fill="#4328D9" />
    <rect x="356" y="60" width="4" height="84" fill="#334155" /><path d="M342 60 L374 60 L366 40 L350 40 Z" fill="#FDE68A" />
    <rect y="150" width="400" height="70" fill="#E7D3C1" />
  </>),
  hotel: () => (<>
    <rect width="400" height="220" fill="#EDE9FE" />
    <rect x="0" y="0" width="400" height="14" fill="#7C3AED" />
    <rect x="240" y="40" width="120" height="70" rx="6" fill="#4C1D95" />
    {[0, 1, 2].map(r => [0, 1, 2, 3].map(c => <circle key={`${r}${c}`} cx={258 + c * 28} cy={58 + r * 20} r="4" fill="#FACC15" />))}
    <path d="M40 150 L50 90 L70 90 L80 150 Z" fill="#166534" /><circle cx="60" cy="84" r="22" fill="#22C55E" /><circle cx="46" cy="96" r="14" fill="#16A34A" />
    <rect x="100" y="104" width="300" height="46" fill="#7C2D12" /><rect x="100" y="100" width="300" height="8" fill="#9A3412" />
    <rect x="300" y="88" width="10" height="14" fill="#E5E7EB" /><circle cx="305" cy="86" r="4" fill="#FACC15" />
    <rect y="150" width="400" height="70" fill="#DDD6FE" />
  </>),
  shop: () => (<>
    <rect width="400" height="220" fill="#ECFDF5" />
    {[30, 70, 110].map((y, r) => <g key={y}><rect x="20" y={y + 22} width="360" height="5" fill="#94A3B8" />
      {Array.from({ length: 12 }, (_, i) => <rect key={i} x={28 + i * 29} y={y + (i % 3) * 3} width="22" height={22 - (i % 3) * 3} rx="3" fill={['#F97316', '#5B3DF5', '#10B981', '#E11D74', '#0EA5E9', '#FACC15'][(i + r) % 6]} />)}</g>)}
    <rect x="230" y="140" width="170" height="40" fill="#0F766E" />
    <rect y="160" width="400" height="60" fill="#D1FAE5" />
  </>),
  park: () => (<>
    {sky('sk-pk', '#7DD3FC', '#F0F9FF')}
    <rect width="400" height="220" fill="url(#sk-pk)" />
    <circle cx="60" cy="40" r="20" fill="#FDE047" />
    <ellipse cx="300" cy="44" rx="34" ry="12" fill="#fff" /><ellipse cx="160" cy="30" rx="26" ry="9" fill="#fff" />
    {[[40, 120], [350, 110], [250, 128]].map(([x, y]) => <g key={x}><rect x={x - 5} y={y} width="10" height="40" fill="#92400E" /><circle cx={x} cy={y - 10} r="26" fill="#22C55E" /><circle cx={x - 14} cy={y} r="16" fill="#16A34A" /></g>)}
    <rect x="130" y="138" width="80" height="8" rx="3" fill="#B45309" /><rect x="134" y="146" width="6" height="16" fill="#78350F" /><rect x="200" y="146" width="6" height="16" fill="#78350F" />
    <rect y="156" width="400" height="64" fill="#86EFAC" />
  </>),
  office: () => (<>
    <rect width="400" height="220" fill="#F1F5F9" />
    <rect x="30" y="24" width="120" height="90" fill="#BFDBFE" />{[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x="30" y={30 + i * 15} width="120" height="6" fill="#E2E8F0" />)}
    <rect x="200" y="70" width="70" height="46" rx="4" fill="#1E293B" /><rect x="205" y="75" width="60" height="34" fill="#38BDF8" /><rect x="230" y="116" width="10" height="14" fill="#334155" />
    <rect x="170" y="128" width="200" height="10" fill="#A16207" />
    <rect x="320" y="40" width="44" height="54" rx="3" fill="#fff" stroke="#CBD5E1" strokeWidth="3" />
    <rect y="150" width="400" height="70" fill="#CBD5E1" />
  </>),
  kitchen: () => (<>
    <rect width="400" height="220" fill="#FEF9C3" />
    {[20, 90, 160, 230, 300].map(x => <rect key={x} x={x} y="20" width="62" height="50" rx="4" fill="#fff" stroke="#E5E7EB" strokeWidth="3" />)}
    <rect x="20" y="100" width="360" height="12" fill="#A3A3A3" /><rect x="20" y="112" width="360" height="40" fill="#fff" />
    <rect x="300" y="78" width="40" height="22" rx="4" fill="#64748B" />
    <rect y="152" width="400" height="68" fill="#FDE68A" />
  </>),
  museum: () => (<>
    <rect width="400" height="220" fill="#F5F5F4" />
    {[[40, 40, '#5B3DF5'], [160, 30, '#F97316'], [290, 44, '#10B981']].map(([x, y, c]) => <g key={x}><rect x={x} y={y} width="80" height="60" fill="#A16207" /><rect x={x + 7} y={y + 7} width="66" height="46" fill={c} opacity=".85" /><circle cx={x + 30} cy={y + 26} r="9" fill="#FDE68A" /></g>)}
    <rect x="178" y="112" width="44" height="40" fill="#E7E5E4" stroke="#A8A29E" strokeWidth="3" />
    <rect y="152" width="400" height="68" fill="#D6D3D1" />
  </>),
  school: () => (<>
    <rect width="400" height="220" fill="#FFF7ED" />
    <rect x="60" y="26" width="280" height="96" rx="4" fill="#14532D" stroke="#92400E" strokeWidth="6" />
    <path d="M90 60 L150 60 M90 80 L200 80 M220 54 L300 54" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" opacity=".8" />
    <rect y="150" width="400" height="70" fill="#FED7AA" />
  </>),
  station: () => (<>
    {sky('sk-ts', '#FDBA74', '#FEF3C7')}
    <rect width="400" height="220" fill="url(#sk-ts)" />
    <rect x="0" y="70" width="400" height="80" fill="#64748B" />{[30, 110, 190, 270, 350].map(x => <Win key={x} x={x} y="90" w="40" h="30" c="#FDE68A" />)}
    <g transform="translate(240 120)"><rect x="0" y="10" width="120" height="30" rx="10" fill="#FACC15" /><path d="M20 10 L36 -10 L84 -10 L100 10 Z" fill="#FACC15" /><rect x="40" y="-6" width="40" height="14" fill="#BAE6FD" /><circle cx="26" cy="42" r="10" fill="#1F2937" /><circle cx="94" cy="42" r="10" fill="#1F2937" /><rect x="48" y="-18" width="24" height="8" rx="2" fill="#1F2937" /></g>
    <rect y="160" width="400" height="60" fill="#475569" />
  </>),
};
export const PLACE_NAMES = Object.keys(PLACES);

export function Backdrop({ place = 'street' }) {
  const P = PLACES[place] || PLACES.street;
  return <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}><P /></svg>;
}

// Cena: cenário + personagens. speaking = id de quem está falando.
export function Stage({ place, cast = [], looks = {}, speaking, moods = {}, height = 260, children }) {
  return (
    <div className="stage" style={{ height }}>
      <Backdrop place={place} />
      <div className="stage-cast">
        {cast.map((id, i) => {
          const c = looks[id] || {};
          const on = speaking === id;
          return (
            <div key={id} className={'stage-p' + (on ? ' on' : speaking ? ' off' : '')}>
              <Person look={c.look} mood={moods[id] || c.mood || 'happy'} talking={on} size={Math.min(130, height * 0.46)} flip={i > 0 && i === cast.length - 1 && cast.length > 1} />
              <span className="stage-name">{c.name || id}</span>
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
}
