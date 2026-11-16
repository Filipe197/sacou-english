import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';

const DotLottieReact = lazy(() => import('@lottiefiles/dotlottie-react').then(m => ({ default: m.DotLottieReact })));
import { useAuth } from '../lib/auth.jsx';
import { useInstall } from '../lib/install.js';

// Ícones em traço (sem emoji)
const P = {
  arrow: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
  back: <path d="M15 6l-6 6 6 6" />,
  check: <path d="M5 12l5 5 9-10" />,
  x: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
  home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>,
  review: <><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v5h5" /></>,
  book: <><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14" /><path d="M12 17.5v.5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6" /><path d="M12 7.5v.5" /></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  sound: <><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" /></>,
  mute: <><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M17 9l5 5" /><path d="M22 9l-5 5" /></>,
  turtle: <><path d="M4 15c0-4 3.5-7 8-7s8 3 8 7z" /><path d="M20 15h2" /><path d="M6 15v3" /><path d="M18 15v3" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" /></>,
  logout: <><path d="M15 4h4v16h-4" /><path d="M10 8l-4 4 4 4" /><path d="M6 12h10" /></>,
  cloud: <path d="M7 18a5 5 0 0 1-.5-10 6 6 0 0 1 11.5 2 4 4 0 0 1 0 8z" />,
  trophy: <><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0z" /><path d="M17 5h3v2a3 3 0 0 1-3 3" /><path d="M7 5H4v2a3 3 0 0 0 3 3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  download: <><path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M5 20h14" /></>,
  chart: <><path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" /></>,
  notebook: <><path d="M6 3h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6z" /><path d="M9 3v18" /><path d="M3 7h3" /><path d="M3 12h3" /><path d="M3 17h3" /><path d="M12 8h4" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  pin: <><path d="M9 4h6l-1 6 4 4H6l4-4z" /><path d="M12 14v7" /></>,
  trash: <><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.2" /></>,
  cards: <><rect x="3" y="6" width="14" height="14" rx="2" /><path d="M7 3h12a2 2 0 0 1 2 2v12" /></>,
  list: <><path d="M9 6h12" /><path d="M9 12h12" /><path d="M9 18h12" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></>,
  olist: <><path d="M10 6h11" /><path d="M10 12h11" /><path d="M10 18h11" /><path d="M4 4v4" /><path d="M3 16h3l-3 4h3" /></>,
  checklist: <><rect x="3" y="4" width="6" height="6" rx="1" /><path d="M4.5 7l1 1 2-2" /><rect x="3" y="14" width="6" height="6" rx="1" /><path d="M12 7h9" /><path d="M12 17h9" /></>,
  quote: <><path d="M5 18c2-1 3-3 3-6H5V6h5v6c0 4-2 7-5 8" /><path d="M14 18c2-1 3-3 3-6h-3V6h5v6c0 4-2 7-5 8" /></>,
  marker: <><path d="M15 4l5 5-9 9H6v-5z" /><path d="M4 21h16" /></>,
  undo: <><path d="M9 14L4 9l5-5" /><path d="M4 9h11a5 5 0 0 1 0 10h-3" /></>,
  redo: <><path d="M15 14l5-5-5-5" /><path d="M20 9H9a5 5 0 0 0 0 10h3" /></>,
  rule: <path d="M3 12h18" />,
  edit: <><path d="M4 20h4L20 8l-4-4L4 16z" /><path d="M14 6l4 4" /></>,
  expand: <><path d="M14 4h6v6" /><path d="M10 20H4v-6" /><path d="M20 4l-7 7" /><path d="M4 20l7-7" /></>,
  sparkle: <><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" /></>,
  flip: <><path d="M4 12a8 8 0 0 1 14-5" /><path d="M18 3v4h-4" /><path d="M20 12a8 8 0 0 1-14 5" /><path d="M6 21v-4h4" /></>,
  share: <><path d="M12 15V3" /><path d="M7 8l5-5 5 5" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /></>,
  headphones: <><path d="M4 15v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="14" width="5" height="7" rx="2" /><rect x="16" y="14" width="5" height="7" rx="2" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7" /><path d="M18 14a6.5 6.5 0 0 1 3.5 6" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" /><path d="M10 21h4" /></>,
  medal: <><circle cx="12" cy="15" r="6" /><path d="M8.5 10L6 3h4l2 4 2-4h4l-2.5 7" /></>,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9h8" /><path d="M8 12h5" /></>,
  game: <><path d="M6 8h12a4 4 0 0 1 4 4v1a4 4 0 0 1-7 2.6L14 14h-4l-1 1.6A4 4 0 0 1 2 13v-1a4 4 0 0 1 4-4z" /><path d="M7 11v3" /><path d="M5.5 12.5h3" /><circle cx="16" cy="11.5" r=".6" /><circle cx="18" cy="13.5" r=".6" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>,
  heart: <><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></>,
};
// Tartaruga colorida do botão "ouvir devagar"
function TurtleArt({ size, label }) {
  return (
    <svg width={size + 6} height={size + 6} viewBox="0 0 32 32" aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
      <defs><linearGradient id="tt-shell" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4ADE80" /><stop offset="1" stopColor="#15803D" /></linearGradient></defs>
      <path d="M5.2 20.6 L1.6 22.4 L5.6 22.9 Z" fill="#86C96B" />
      <rect x="7.4" y="20" width="4.2" height="6.2" rx="2.1" fill="#86C96B" />
      <rect x="18.6" y="20" width="4.2" height="6.2" rx="2.1" fill="#86C96B" />
      <ellipse cx="23.6" cy="18.4" rx="3.4" ry="2.6" fill="#86C96B" />
      <circle cx="26.4" cy="15.6" r="4.4" fill="#9BD67F" />
      <circle cx="27.7" cy="14.8" r="1" fill="#1B1E35" /><circle cx="28" cy="14.5" r=".35" fill="#fff" />
      <path d="M26.6 17.6 q1.1 .9 2.3 .1" fill="none" stroke="#1B1E35" strokeWidth=".8" strokeLinecap="round" />
      <path d="M4 21 C4 12.5 8.8 8 15 8 C21.2 8 25.6 12.5 25.6 21 Z" fill="url(#tt-shell)" />
      <path d="M11.6 11.6 H18.2 L20.4 15.6 L18.2 19.4 H11.6 L9.4 15.6 Z" fill="#BBF7D0" opacity=".55" />
      <path d="M9.4 15.6 H5.4 M20.4 15.6 H24.6 M11.6 11.6 L9.6 9.4 M18.2 11.6 L20.4 9.6" stroke="#BBF7D0" strokeWidth=".9" opacity=".55" strokeLinecap="round" />
      <rect x="3" y="19.6" width="23.6" height="2.8" rx="1.4" fill="#166534" />
    </svg>
  );
}
export function Icon({ name, size = 20, color = 'currentColor', stroke = 2, label }) {
  if (name === 'turtle') return <TurtleArt size={size} label={label} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden={label ? undefined : true} role={label ? 'img' : undefined} aria-label={label}>
      {P[name]}
    </svg>
  );
}
export const Fire = ({ size = 24, color = 'var(--fire)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-4-1-6 1-9z" /></svg>
);
export const Bolt = ({ size = 24, color = 'var(--violet)' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg>
);

export function Logo({ dark = false, to = '/' }) {
  return (
    <Link to={to} className="logo" style={{ color: dark ? '#fff' : 'var(--ink)' }} aria-label="Sacou English — início">
      <span className="logo-mark">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4FF3A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 17 L10 11 L14 15 L20 7" /><path d="M15 7 H20 V12" /></svg>
      </span>
      <span className="logo-text">Sacou <span style={{ color: dark ? 'var(--lime)' : 'var(--violet)' }}>English</span></span>
    </Link>
  );
}

export function Spinner() {
  return <div className="center-page" role="status" aria-label="Carregando"><div className="spinner" /></div>;
}

// Animação pronta em /public/animations: tenta <nome>.lottie e depois <nome>.gif.
// Se nenhum arquivo existir, não mostra nada (o site funciona igual).
const found = {};
async function probe(url) {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    return r.ok && !(r.headers.get('content-type') || '').includes('text/html');
  } catch { return false; }
}
export function Anim({ name, size = 180, loop = false }) {
  const [src, setSrc] = useState(found[name]);
  useEffect(() => {
    if (found[name] !== undefined) return;
    (async () => {
      for (const ext of ['lottie', 'gif']) {
        const url = `/animations/${name}.${ext}`;
        if (await probe(url)) { found[name] = url; setSrc(url); return; }
      }
      found[name] = null; setSrc(null);
    })();
  }, [name]);
  if (!src) return null;
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (src.endsWith('.gif')) return reduce ? null : <img src={src} width={size} height={size} alt="" style={{ objectFit: 'contain' }} />;
  return <div style={{ width: size, height: size }} aria-hidden="true"><Suspense fallback={null}><DotLottieReact src={src} autoplay={!reduce} loop={loop} /></Suspense></div>;
}

// Layout da área do aluno: menu lateral no computador; no celular, barra de
// abas no rodapé (5 itens, como nos apps) e uma gaveta "Mais" com o resto.
export function Shell({ children, rail, mistakesCount = 0 }) {
  const { signOut, profile, updateProfile, isAdmin } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const inst = useInstall();
  const [iosTip, setIosTip] = useState(false);
  const [more, setMore] = useState(false);
  const items = [
    ['/aprender', 'home', 'Aprender'],
    ['/praticar', 'bolt', 'Praticar'],
    ['/conversar', 'chat', 'Conversar'],
    ['/jogos', 'game', 'Jogos e histórias', 0, 'Jogos'],
    ['/revisao', 'review', 'Revisar erros', mistakesCount],
    ['/fone', 'headphones', 'Modo fone'],
    ['/caderno', 'notebook', 'Caderno'],
    ['/guia', 'book', 'Guia de gramática'],
    ['/progresso', 'user', 'Meu progresso'],
    ['/turmas', 'users', 'Turmas'],
    ...(isAdmin ? [['/admin', 'chart', 'Administração']] : []),
  ];
  const TABS = ['/aprender', '/praticar', '/jogos', '/conversar'];
  const IN_PRACTICE = ['/revisao', '/fone']; // no celular ficam dentro de Praticar
  const tabs = TABS.map(t => items.find(i => i[0] === t)).filter(Boolean);
  const rest = items.filter(i => !TABS.includes(i[0]) && !IN_PRACTICE.includes(i[0]));
  const inRest = rest.some(([to]) => loc.pathname.startsWith(to));
  const inPractice = IN_PRACTICE.some(t => loc.pathname.startsWith(t));

  useEffect(() => { setMore(false); }, [loc.pathname]);
  useEffect(() => {
    if (!more) return;
    const onKey = (e) => { if (e.key === 'Escape') setMore(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [more]);

  const extras = (
    <>
      {inst.canInstall && (
        <button className="nav-a nav-install" onClick={inst.install}><Icon name="download" />Instalar app</button>
      )}
      {!inst.canInstall && inst.iosHint && (
        <button className="nav-a nav-plain" onClick={() => setIosTip(v => !v)} aria-expanded={iosTip}><Icon name="download" />Instalar no iPhone</button>
      )}
      {iosTip && <p className="note" style={{ margin: 0, fontSize: 13 }}>No Safari, toque em <b>Compartilhar</b> e depois em <b>Adicionar à Tela de Início</b>.</p>}
      <button className="nav-a nav-plain" onClick={() => updateProfile({ sound_on: !profile?.sound_on })} aria-pressed={!!profile?.sound_on}>
        <Icon name={profile?.sound_on ? 'sound' : 'mute'} />{profile?.sound_on ? 'Som ligado' : 'Som desligado'}
      </button>
      <button className="nav-a nav-plain" onClick={async () => { await signOut(); nav('/'); }}>
        <Icon name="logout" />Sair
      </button>
    </>
  );

  return (
    <div className="shell">
      <nav className="side" aria-label="Menu do aluno">
        <div style={{ padding: '0 8px 20px' }}><Logo to="/aprender" /></div>
        {items.map(([to, ic, label, badge]) => (
          <NavLink key={to} to={to} className={({ isActive }) => 'nav-a' + (isActive ? ' active' : '')}>
            <Icon name={ic} />{label}{badge > 0 && <span className="badge" aria-label={`${badge} pendentes`}>{badge}</span>}
          </NavLink>
        ))}
        <div className="side-foot">{extras}</div>
      </nav>

      <main className="content">{children}</main>
      {rail && <aside className="rail">{rail}</aside>}

      {/* celular */}
      <nav className="tabbar" aria-label="Menu principal">
        {tabs.map(([to, ic, label, , short]) => (
          <NavLink key={to} to={to} className={({ isActive }) => 'tab' + ((isActive || (to === '/praticar' && inPractice)) && !more ? ' active' : '')}>
            <span className="tab-ic"><Icon name={ic} size={22} />{to === '/praticar' && mistakesCount > 0 && <span className="tab-dot" aria-label={`${mistakesCount} erros para revisar`}>{mistakesCount > 9 ? '9+' : mistakesCount}</span>}</span><span className="tab-l">{short || label}</span>
          </NavLink>
        ))}
        <button type="button" className={'tab' + (more || inRest ? ' active' : '')} aria-expanded={more} aria-controls="more-sheet" onClick={() => setMore(v => !v)}>
          <span className="tab-ic"><Icon name="grid" size={22} /></span>
          <span className="tab-l">Mais</span>
        </button>
      </nav>
      {more && <div className="sheet-bg" onClick={() => setMore(false)} aria-hidden="true" />}
      <div id="more-sheet" className={'sheet' + (more ? ' open' : '')} role="dialog" aria-label="Mais opções" aria-hidden={!more} inert={more ? undefined : ''}>
        <div className="sheet-grip" aria-hidden="true" />
        <div className="sheet-grid">
          {rest.map(([to, ic, label, badge]) => (
            <NavLink key={to} to={to} className={({ isActive }) => 'sheet-a' + (isActive ? ' active' : '')}>
              <span className="sheet-ic"><Icon name={ic} size={24} />{badge > 0 && <span className="tab-dot">{badge > 9 ? '9+' : badge}</span>}</span>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="sheet-list">{extras}</div>
      </div>
    </div>
  );
}
