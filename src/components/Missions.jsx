// Missões da semana (segunda a domingo, horário de Brasília) e medalhas de
// "semana perfeita". Tudo é calculado a partir das atividades do próprio aluno.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../lib/auth.jsx';
import { Icon } from './ui.jsx';

export const MISSIONS = [
  { id: 'lesson', label: 'Conclua 5 lições', goal: 5, kinds: ['lesson'], to: '/aprender', icon: 'home' },
  { id: 'review', label: 'Revise seus erros 2 vezes', goal: 2, kinds: ['review', 'treino'], to: '/revisao', icon: 'review' },
  { id: 'conversa', label: 'Converse 2 vezes com um personagem', goal: 2, kinds: ['conversa'], to: '/conversar', icon: 'chat' },
  { id: 'fone', label: 'Faça 1 sessão no modo fone', goal: 1, kinds: ['fone'], to: '/fone', icon: 'headphones' },
  { id: 'xp', label: 'Ganhe 150 XP', goal: 150, xp: true, to: '/aprender', icon: 'bolt' },
];

const fmt = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(d);
// segunda-feira da semana de uma data (yyyy-mm-dd)
function mondayOf(dayStr) {
  const d = new Date(dayStr + 'T12:00:00');
  const wd = (d.getDay() + 6) % 7; // 0 = segunda
  d.setDate(d.getDate() - wd);
  return fmt(d);
}
export const weekStart = () => mondayOf(fmt(new Date()));

function progressFor(rows, xpRows, week) {
  const counts = {};
  for (const r of rows) if (mondayOf(fmt(new Date(r.created_at))) === week) counts[r.kind] = (counts[r.kind] || 0) + 1;
  const xp = xpRows.filter(r => mondayOf(r.day) === week).reduce((n, r) => n + r.xp, 0);
  return MISSIONS.map(m => {
    const v = m.xp ? xp : m.kinds.reduce((n, k) => n + (counts[k] || 0), 0);
    return { ...m, value: Math.min(v, m.goal), done: v >= m.goal };
  });
}

export function useMissions() {
  const { user } = useAuth();
  const [st, setSt] = useState({ loading: true, list: progressFor([], [], weekStart()), perfectWeeks: 0, missing: false });
  useEffect(() => {
    if (!user) return;
    let alive = true;
    const since = new Date(Date.now() - 8 * 7 * 864e5).toISOString();
    Promise.all([
      supabase.from('activity').select('kind,created_at').gte('created_at', since).limit(2000),
      supabase.from('daily_xp').select('day,xp').gte('day', since.slice(0, 10)),
    ]).then(([a, x]) => {
      if (!alive) return;
      const rows = a.data || [], xpRows = x.data || [];
      const week = weekStart();
      // semanas anteriores completas (até 8 semanas)
      let perfect = 0;
      const weeks = new Set([...rows.map(r => mondayOf(fmt(new Date(r.created_at)))), ...xpRows.map(r => mondayOf(r.day))]);
      for (const w of weeks) if (w !== week && progressFor(rows, xpRows, w).every(m => m.done)) perfect++;
      const list = progressFor(rows, xpRows, week);
      if (list.every(m => m.done)) perfect++;
      setSt({ loading: false, list, perfectWeeks: perfect, missing: !!a.error });
    });
    return () => { alive = false; };
  }, [user?.id]);
  return st;
}

// Dias que faltam para a semana acabar (domingo)
const daysLeft = () => { const d = new Date(fmt(new Date()) + 'T12:00:00'); return 7 - ((d.getDay() + 6) % 7); };

export function Missions({ compact = false }) {
  const { loading, list, perfectWeeks, missing } = useMissions();
  if (missing) return null; // tabela ainda não criada (005_turmas_missoes.sql)
  const done = list.filter(m => m.done).length;
  const all = done === list.length;
  const left = daysLeft();
  return (
    <div className={'card missions' + (compact ? ' compact' : '')} aria-busy={loading}>
      <div className="ms-head">
        <b><Icon name="target" size={18} />Missões da semana</b>
        <span className="muted">{done}/{list.length} · {left === 1 ? 'último dia' : `faltam ${left} dias`}</span>
      </div>
      {all && <div className="ms-perfect"><Icon name="medal" size={20} />Semana perfeita! Volte segunda para novas missões.</div>}
      <ul className="ms-list">
        {list.map(m => (
          <li key={m.id} className={m.done ? 'done' : ''}>
            <Link to={m.to} className="ms-row">
              <span className="ms-ic">{m.done ? <Icon name="check" size={16} stroke={3} color="#fff" /> : <Icon name={m.icon} size={16} />}</span>
              <span className="ms-txt">
                <span>{m.label}</span>
                <span className="track ms-track"><span className="fill" style={{ width: `${(m.value / m.goal) * 100}%` }} /></span>
              </span>
              <span className="ms-n">{m.value}/{m.goal}</span>
            </Link>
          </li>
        ))}
      </ul>
      {!compact && (
        <div className="ms-medals">
          <Icon name="medal" size={22} color={perfectWeeks ? 'var(--fire)' : 'var(--line2)'} />
          {perfectWeeks ? <span><b>{perfectWeeks}</b> {perfectWeeks === 1 ? 'semana perfeita' : 'semanas perfeitas'} nas últimas 8 semanas.</span>
            : <span className="muted">Complete todas as missões para ganhar a medalha de semana perfeita.</span>}
        </div>
      )}
    </div>
  );
}
