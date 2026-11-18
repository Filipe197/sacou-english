// Retrospectiva do mês (em Meu progresso): XP, dias estudados num calendário,
// lições, palavras salvas e melhor dia, com card para o story.
// Nos primeiros dias do mês abre no mês que acabou de terminar.
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase.js';
import { useNotebook } from '../lib/notebook.js';
import { ShareButton } from './ShareCard.jsx';

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const WEEK = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const todayBR = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
const pad = (n) => String(n).padStart(2, '0');

export const monthCard = ({ month, xp, days, lessons }) => ({
  kicker: `MEU ${month.toUpperCase()}`, big: String(days),
  title: `${days} ${days === 1 ? 'dia' : 'dias'} estudando inglês em ${month}`,
  sub: `${xp.toLocaleString('pt-BR')} XP · ${lessons} ${lessons === 1 ? 'lição concluída' : 'lições concluídas'}`, fire: days >= 7,
});

export default function MonthRecap({ prog, name }) {
  const { notes } = useNotebook();
  const today = todayBR();
  const [y, m, d] = today.split('-').map(Number);
  const prev = m === 1 ? [y - 1, 12] : [y, m - 1];
  const [which, setWhich] = useState(d <= 7 ? 'prev' : 'cur'); // começo do mês: mostra o mês passado
  const [yy, mm] = which === 'cur' ? [y, m] : prev;
  const from = `${yy}-${pad(mm)}-01`;
  const lastDay = new Date(yy, mm, 0).getDate();
  const to = `${yy}-${pad(mm)}-${pad(lastDay)}`;
  const [xpDays, setXpDays] = useState(null); // { 'YYYY-MM-DD': xp }

  useEffect(() => {
    let alive = true;
    setXpDays(null);
    supabase.from('daily_xp').select('day,xp').gte('day', from).lte('day', to)
      .then(({ data }) => { if (alive) setXpDays(Object.fromEntries((data || []).map(r => [r.day, r.xp]))); }, () => alive && setXpDays({}));
    return () => { alive = false; };
  }, [from, to]);

  const stats = useMemo(() => {
    const vals = Object.entries(xpDays || {}).filter(([, xp]) => xp > 0);
    const inMonth = (iso) => { const s = iso ? new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date(iso)) : ''; return s >= from && s <= to; };
    const best = vals.reduce((b, cur) => (cur[1] > (b?.[1] || 0) ? cur : b), null);
    return {
      xp: vals.reduce((s, [, xp]) => s + xp, 0),
      days: vals.length,
      lessons: Object.values(prog.scores || {}).filter(r => inMonth(r.completed_at)).length,
      words: notes.filter(n => n.kind === 'word' && inMonth(n.created_at)).length,
      best: best ? { day: Number(best[0].slice(8)), xp: best[1] } : null,
    };
  }, [xpDays, prog.scores, notes, from, to]);

  const monthName = MONTHS[mm - 1];
  const firstWeekday = new Date(yy, mm - 1, 1).getDay();
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: lastDay }, (_, i) => i + 1)];

  return (
    <section className="card mr" aria-labelledby="mr-title">
      <div className="mr-top">
        <div>
          <span className="eyebrow" style={{ margin: 0 }}>Retrospectiva</span>
          <h2 id="mr-title">Seu {monthName}{which === 'cur' ? ' até agora' : ''}</h2>
        </div>
        <div className="mr-switch" role="tablist" aria-label="Escolher mês">
          <button type="button" role="tab" aria-selected={which === 'prev'} className={which === 'prev' ? 'on' : ''} onClick={() => setWhich('prev')}>{MONTHS[prev[1] - 1]}</button>
          <button type="button" role="tab" aria-selected={which === 'cur'} className={which === 'cur' ? 'on' : ''} onClick={() => setWhich('cur')}>{MONTHS[m - 1]}</button>
        </div>
      </div>

      {xpDays === null ? <p className="muted">Carregando…</p> : <>
        <div className="mr-stats">
          <div><b>{stats.days}</b><span>{stats.days === 1 ? 'dia estudado' : 'dias estudados'}</span></div>
          <div><b>{stats.xp.toLocaleString('pt-BR')}</b><span>XP no mês</span></div>
          <div><b>{stats.lessons}</b><span>{stats.lessons === 1 ? 'lição concluída' : 'lições concluídas'}</span></div>
          <div><b>{stats.words}</b><span>{stats.words === 1 ? 'palavra salva' : 'palavras salvas'}</span></div>
        </div>

        <div className="mr-cal" aria-label={`Dias estudados em ${monthName}`}>
          {WEEK.map((w, i) => <span key={'w' + i} className="mr-wd" aria-hidden="true">{w}</span>)}
          {cells.map((day, i) => {
            if (!day) return <span key={'e' + i} />;
            const iso = `${yy}-${pad(mm)}-${pad(day)}`;
            const xp = xpDays[iso] || 0;
            const future = iso > today;
            return <span key={iso} className={'mr-day' + (xp > 0 ? ' on' : '') + (iso === today ? ' today' : '') + (future ? ' future' : '')}
              title={xp > 0 ? `${day} de ${monthName}: ${xp} XP` : `${day} de ${monthName}`}>{day}</span>;
          })}
        </div>

        <p className="mr-line">
          {stats.days === 0
            ? (which === 'cur' ? 'Ainda não teve estudo este mês. Que tal começar hoje?' : `Nenhum dia de estudo em ${monthName}.`)
            : <>Seu melhor dia foi <b>{stats.best.day} de {monthName}</b>, com <b>{stats.best.xp} XP</b>.{stats.days >= 20 ? ' Que constância!' : stats.days >= 10 ? ' Belo ritmo!' : ''}</>}
        </p>
        {stats.days > 0 && <ShareButton card={monthCard({ month: monthName, xp: stats.xp, days: stats.days, lessons: stats.lessons })} name={name} label={`Compartilhar meu ${monthName}`} className="btn btn-out" />}
      </>}
    </section>
  );
}
