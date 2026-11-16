import { Link, NavLink, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';

const DotLottieReact = lazy(() => import('@lottiefiles/dotlottie-react').then(m => ({ default: m.DotLottieReact })));
import { useAuth } from '../lib/auth.jsx';

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
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /></>,
};
export function Icon({ name, size = 20, color = 'currentColor', stroke = 2, label }) {
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

// Layout da área do aluno (menu lateral)
export function Shell({ children, rail, mistakesCount = 0 }) {
  const { signOut, profile, updateProfile } = useAuth();
  const nav = useNavigate();
  const items = [
    ['/aprender', 'home', 'Aprender'],
    ['/revisao', 'review', 'Revisar erros', mistakesCount],
    ['/guia', 'book', 'Guia de gramática'],
    ['/progresso', 'user', 'Meu progresso'],
  ];
  return (
    <div className="shell">
      <nav className="side" aria-label="Menu do aluno">
        <div style={{ padding: '0 8px 20px' }}><Logo to="/aprender" /></div>
        {items.map(([to, ic, label, badge]) => (
          <NavLink key={to} to={to} className={({ isActive }) => 'nav-a' + (isActive ? ' active' : '')}>
            <Icon name={ic} />{label}{badge > 0 && <span className="badge" aria-label={`${badge} pendentes`}>{badge}</span>}
          </NavLink>
        ))}
        <div className="side-foot">
          <button className="nav-a" style={{ background: 'none', border: 0, cursor: 'pointer' }}
            onClick={() => updateProfile({ sound_on: !profile?.sound_on })} aria-pressed={!!profile?.sound_on}>
            <Icon name={profile?.sound_on ? 'sound' : 'mute'} />{profile?.sound_on ? 'Som ligado' : 'Som desligado'}
          </button>
          <button className="nav-a" style={{ background: 'none', border: 0, cursor: 'pointer' }}
            onClick={async () => { await signOut(); nav('/'); }}>
            <Icon name="logout" />Sair
          </button>
        </div>
      </nav>
      <main className="content">{children}</main>
      {rail && <aside className="rail">{rail}</aside>}
    </div>
  );
}
