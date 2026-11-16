import { Link } from 'react-router-dom';
import { UNITS, LESSONS, levelPercent } from '../lib/content.js';
import { useProgress, lastSevenDays, liveStreak } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { Shell, Spinner, Icon, Fire, Bolt } from '../components/ui.jsx';

export default function Progress() {
  const prog = useProgress();
  const { profile, user } = useAuth();
  if (prog.loading) return <Spinner />;

  const days = lastSevenDays(prog.week);
  const goal = profile?.daily_goal_xp || 30;
  const max = Math.max(goal, ...days.map(d => d.xp), 1);
  const hit = days.filter(d => d.xp >= goal).length;
  const lessonsDone = LESSONS.filter(l => prog.done.has(l.id)).length;
  const wordsLearned = UNITS.filter(u => u.lessons.every(l => prog.done.has(l.id))).reduce((n, u) => n + u.words.length, 0);
  const pct = levelPercent(prog.done);
  const initials = (profile?.display_name || user?.email || '?').split(/\s+/).map(s => s[0]).join('').slice(0, 2).toUpperCase();
  const since = user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }) : '';

  const stats = [
    [<Fire size={28} />, liveStreak(profile), 'dias seguidos'],
    [<Bolt size={28} />, (profile?.xp_total || 0).toLocaleString('pt-BR'), 'XP total'],
    [<Icon name="check" size={28} color="var(--ok)" stroke={2.6} />, lessonsDone, 'lições concluídas'],
    [<Icon name="book" size={28} />, wordsLearned, 'palavras de unidades concluídas'],
  ];

  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card" style={{ background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', padding: 28 }}>
          <span style={{ width: 80, height: 80, borderRadius: 24, background: 'var(--violet)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--head)', fontSize: 32, fontWeight: 700, color: 'var(--lime)' }}>{initials}</span>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h1 style={{ margin: '0 0 4px', fontSize: 32 }}>{profile?.display_name || 'Meu progresso'}</h1>
            <p style={{ margin: 0, color: 'var(--on-dark)' }}>Estudando desde {since} · Meta diária: {goal} XP</p>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--on-dark)' }}><Icon name="cloud" color="var(--lime)" />Progresso salvo na nuvem</span>
        </div>

        <div className="stats4">
          {stats.map(([ic, v, l]) => (
            <div key={l} className="card">{ic}<b style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 32, margin: '10px 0 2px' }}>{v}</b><span className="muted" style={{ fontSize: 14 }}>{l}</span></div>
          ))}
        </div>

        <div className="two">
          <div className="card">
            <h2 style={{ margin: '0 0 6px', fontSize: 22 }}>Últimos 7 dias</h2>
            <p className="muted" style={{ margin: '0 0 20px', fontSize: 14 }}>Você bateu a meta em {hit} de 7 dias.</p>
            <div className="bars" role="img" aria-label={`XP por dia: ${days.map(d => `${d.label} ${d.xp}`).join(', ')}`}>
              {days.map(d => (
                <div key={d.day} className="col">
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#3A3E5A' }}>{d.xp}</span>
                  <div className={'b' + (d.xp < goal ? ' low' : '')} style={{ height: `${(d.xp / max) * 75}%` }} />
                  <span style={{ fontSize: 13, color: d.label === 'Hoje' ? 'var(--ink)' : 'var(--text3)', fontWeight: d.label === 'Hoje' ? 700 : 400 }}>{d.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 16, fontSize: 13, color: 'var(--text2)', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: 'var(--violet)' }} />Meta batida</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 4, background: '#C9C0FB' }} />Abaixo da meta</span>
            </div>
          </div>

          <div className="card">
            <h2 style={{ margin: '0 0 6px', fontSize: 22 }}>Unidades do A1</h2>
            <p className="muted" style={{ margin: '0 0 20px', fontSize: 14 }}>Quanto de cada unidade você já concluiu.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {UNITS.map(u => {
                const d = u.lessons.filter(l => prog.done.has(l.id)).length;
                const p = Math.round((d / u.lessons.length) * 100);
                return (
                  <div key={u.id} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 120px 44px', gap: 12, alignItems: 'center', fontSize: 15 }}>
                    <span>{u.title}</span><div className="track"><div className="fill" style={{ width: p + '%' }} /></div><b style={{ textAlign: 'right' }}>{p}%</b>
                  </div>
                );
              })}
            </div>
            {prog.mistakes.length > 0 && <div className="note" style={{ marginTop: 20 }}><b>Sugestão:</b> você tem {prog.mistakes.length} {prog.mistakes.length === 1 ? 'exercício' : 'exercícios'} na revisão. <Link to="/revisao">Revisar agora</Link></div>}
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 22 }}>Caminho até a fluência</h2>
            <span className="muted" style={{ fontSize: 14 }}>Você está no A1 · {pct}% do conteúdo disponível</span>
          </div>
          <div className="grid6">
            {[['A1', 'Iniciante'], ['A2', 'Básico'], ['B1', 'Intermediário'], ['B2', 'Independente'], ['C1', 'Avançado'], ['C2', 'Fluente']].map(([c, n], i) => (
              <div key={c} style={{ borderRadius: 16, padding: 16, background: i === 0 ? 'var(--violet)' : 'var(--bg)', color: i === 0 ? '#fff' : '#3A3E5A' }}>
                <b style={{ fontFamily: 'var(--head)', fontSize: 24, display: 'block' }}>{c}</b>
                <span style={{ fontSize: 13 }}>{n}{i === 0 ? ' · em curso' : ' · em breve'}</span>
                {i === 0 && <div style={{ height: 6, background: 'var(--violet-dd)', borderRadius: 99, marginTop: 12, overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', background: 'var(--lime)' }} /></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
