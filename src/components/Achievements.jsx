import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { evaluate, seenSet, markSeen } from '../lib/achievements.js';
import { ShareButton } from './ShareCard.jsx';

const card = (a) => ({ kicker: 'CONQUISTA', emoji: a.icon, big: '', title: a.title, sub: a.desc });

// Grade de medalhas (Meu progresso)
export function Achievements({ prog }) {
  const { profile, user } = useAuth();
  const list = useMemo(() => evaluate({ profile, done: prog.done, scores: prog.scores }), [profile, prog.done, prog.scores]);
  const [fresh] = useState(() => { const seen = seenSet(user?.id); return new Set(list.filter(a => a.done && !seen.has(a.id)).map(a => a.id)); });
  useEffect(() => { markSeen(user?.id, list.filter(a => a.done).map(a => a.id)); }, [list]);
  useEffect(() => { if (location.hash === '#conquistas') setTimeout(() => document.getElementById('conquistas')?.scrollIntoView({ behavior: 'smooth' }), 200); }, []);
  const got = list.filter(a => a.done).length;
  const [open, setOpen] = useState(null);
  useEffect(() => { if (open) setTimeout(() => document.querySelector('.ach-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50); }, [open]);
  return (
    <div className="card" id="conquistas">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <h2 style={{ fontSize: 22, margin: 0 }}>🏅 Conquistas</h2>
        <span className="muted" style={{ fontSize: 14 }}>{got} de {list.length}</span>
      </div>
      <div className="ach-grid">
        {list.map(a => (
          <button key={a.id} type="button" className={'ach' + (a.done ? ' on' : '') + (fresh.has(a.id) ? ' new' : '') + (open === a.id ? ' open' : '')} onClick={() => setOpen(o => (o === a.id ? null : a.id))} aria-expanded={open === a.id}>
            {fresh.has(a.id) && <span className="ach-new">Nova!</span>}
            <span className="ach-ic" aria-hidden="true">{a.icon}</span>
            <b>{a.title}</b>
            {!a.done && a.goal > 1 && <span className="track ach-track"><span className="fill" style={{ width: `${(a.value / a.goal) * 100}%` }} /></span>}
            {!a.done && <span className="ach-p">{a.goal > 1 ? `${a.value.toLocaleString('pt-BR')}/${a.goal.toLocaleString('pt-BR')}` : 'Bloqueada'}</span>}
          </button>
        ))}
      </div>
      {open && (() => {
        const a = list.find(x => x.id === open);
        return (
          <div className="ach-detail">
            <span className="ach-ic big" aria-hidden="true">{a.icon}</span>
            <div style={{ flex: 1, minWidth: 180 }}>
              <b style={{ display: 'block', fontSize: 17 }}>{a.title}</b>
              <span className="muted" style={{ fontSize: 14 }}>{a.desc}</span>
            </div>
            {a.done && <ShareButton card={card(a)} name={profile?.display_name?.split(' ')[0]} label="Compartilhar" className="btn btn-violet" />}
          </div>
        );
      })()}
    </div>
  );
}

// Aviso de conquista nova (na trilha), até o aluno abrir Meu progresso
export function NewAchievement({ prog }) {
  const { profile, user } = useAuth();
  const list = useMemo(() => evaluate({ profile, done: prog.done, scores: prog.scores }), [profile, prog.done, prog.scores]);
  const seen = seenSet(user?.id);
  const fresh = list.filter(a => a.done && !seen.has(a.id));
  if (!fresh.length) return null;
  const a = fresh[fresh.length - 1];
  return (
    <Link to="/progresso#conquistas" className="card ach-toast rail-alert">
      <span className="ach-ic" aria-hidden="true">{a.icon}</span>
      <span><b>Nova conquista: {a.title}</b><span className="muted">{fresh.length > 1 ? `E mais ${fresh.length - 1}. ` : ''}Toque para ver.</span></span>
    </Link>
  );
}
