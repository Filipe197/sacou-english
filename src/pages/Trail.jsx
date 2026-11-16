import { Link } from 'react-router-dom';
import { UNITS, lessonStates, levelPercent, PLANNED_A1_UNITS } from '../lib/content.js';
import { useProgress, liveStreak, todayBR } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { Shell, Spinner, Icon, Fire, Bolt, Anim } from '../components/ui.jsx';

export function Rail({ prog }) {
  const { profile } = useAuth();
  const todayXp = prog.week.find(w => w.day === todayBR())?.xp || 0;
  const goal = profile?.daily_goal_xp || 30;
  const pct = levelPercent(prog.done);
  const streak = liveStreak(profile);
  return (
    <>
      <div style={{ display: 'flex', gap: 10 }}>
        <div className="card" style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', gap: 10 }}><Fire size={26} /><div><b style={{ display: 'block', fontSize: 20, fontFamily: 'var(--head)' }}>{streak}</b><span style={{ fontSize: 12, color: 'var(--text3)' }}>{streak === 1 ? 'dia seguido' : 'dias seguidos'}</span></div></div>
        <div className="card" style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', gap: 10 }}><Bolt size={26} /><div><b style={{ display: 'block', fontSize: 20, fontFamily: 'var(--head)' }}>{(profile?.xp_total || 0).toLocaleString('pt-BR')}</b><span style={{ fontSize: 12, color: 'var(--text3)' }}>XP total</span></div></div>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}><b>Meta de hoje</b><span style={{ fontSize: 14, color: 'var(--text3)' }}>{Math.min(todayXp, goal)} / {goal} XP</span></div>
        <div className="track" style={{ height: 14 }}><div className="fill" style={{ width: Math.min(100, (todayXp / goal) * 100) + '%' }} /></div>
        <p className="muted" style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.5 }}>
          {todayXp >= goal ? 'Meta batida! Sua sequência de hoje está garantida.' : todayXp > 0 ? `Faltam ${goal - todayXp} XP para bater a meta. Cada lição nova vale 10 a 15 XP.` : 'Faça uma lição hoje para manter sua sequência de dias.'}
        </p>
      </div>
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}><b>Seu nível</b><span style={{ fontSize: 14, fontWeight: 700, color: 'var(--violet)' }}>A1 · {pct}%</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 6 }}>
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l, i) => <span key={l} style={{ height: 10, borderRadius: 99, background: i === 0 ? `linear-gradient(90deg,var(--violet) ${pct}%,var(--track) ${pct}%)` : 'var(--track)' }} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 6, marginTop: 6, fontSize: 12, fontWeight: 600, color: 'var(--text3)', textAlign: 'center' }}>{['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => <span key={l}>{l}</span>)}</div>
      </div>
      {prog.mistakes.length > 0 && (
        <div className="card" style={{ background: 'var(--ink)', borderColor: 'var(--ink)', color: '#fff' }}>
          <b style={{ display: 'block', marginBottom: 6 }}>{prog.mistakes.length} {prog.mistakes.length === 1 ? 'erro' : 'erros'} para revisar</b>
          <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.5, color: 'var(--on-dark)' }}>Revisar o que você errou ajuda a fixar mais rápido. Leva uns 3 minutos.</p>
          <Link className="btn btn-lime btn-block" to="/revisao">Revisar agora</Link>
        </div>
      )}
    </>
  );
}

export default function Trail() {
  const prog = useProgress();
  const { profile } = useAuth();
  if (prog.loading) return <Spinner />;
  const states = lessonStates(prog.done);
  const stateOf = Object.fromEntries(states.map(s => [s.lesson.id, s.state]));
  const allDone = states.every(s => s.state === 'done');

  return (
    <Shell mistakesCount={prog.mistakes.length} rail={<Rail prog={prog} />}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {profile?.display_name && <p className="muted" style={{ margin: '0 0 16px', fontSize: 16 }}>Olá, <b style={{ color: 'var(--ink)' }}>{profile.display_name.split(' ')[0]}</b>! Toque na lição destacada para continuar.</p>}
        {prog.error && <div className="alert" role="alert" style={{ marginBottom: 16 }}>{prog.error}</div>}

        {UNITS.map((u) => {
          const unitStates = u.lessons.map(l => stateOf[l.id]);
          const unlocked = unitStates.some(s => s !== 'locked');
          return (
            <section key={u.id} aria-labelledby={u.id} style={{ marginBottom: 16 }}>
              <div className={'unit-banner' + (unlocked ? '' : ' locked')}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: unlocked ? 'var(--lime)' : 'var(--text3)', letterSpacing: 1, textTransform: 'uppercase' }}>Nível A1 · Unidade {u.order}</p>
                  <h2 id={u.id} style={{ margin: 0, fontSize: 26 }}>{u.title}</h2>
                  <p style={{ margin: '6px 0 0', fontSize: 15, color: unlocked ? 'var(--violet-ring)' : 'var(--text2)' }}>{u.subtitle}</p>
                </div>
                <Link className="btn" to={`/guia/${u.id}`} style={{ background: unlocked ? '#fff' : 'var(--violet-l)', color: 'var(--violet-dd)', minHeight: 44, fontSize: 15 }}>
                  <Icon name="book" size={18} />Ler a explicação
                </Link>
              </div>
              <div className="path">
                {u.lessons.map((l, i) => {
                  const st = stateOf[l.id];
                  const off = 'off' + ((u.order * 2 + i) % 8);
                  const label = `${l.title} — ${st === 'done' ? 'concluída, toque para treinar de novo' : st === 'current' ? 'começar' : 'bloqueada: conclua a lição anterior'}`;
                  const inner = (
                    <>
                      <span className="circ">
                        {st === 'done' && <Icon name="check" size={32} color="#fff" stroke={3} />}
                        {st === 'current' && <svg width="34" height="34" viewBox="0 0 24 24" fill="#0B0D1A" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>}
                        {st === 'locked' && <Icon name="lock" size={28} color="#6A6E88" stroke={2.2} />}
                      </span>
                      {st === 'current' && <span className="start">Começar · +15 XP</span>}
                      <span className="nlabel">{l.title}</span>
                    </>
                  );
                  return st === 'locked'
                    ? <span key={l.id} className={`node locked ${off}`} aria-label={label} role="img">{inner}</span>
                    : <Link key={l.id} to={`/licao/${l.id}`} className={`node ${st} ${off}`} aria-label={label}>{inner}</Link>;
                })}
              </div>
            </section>
          );
        })}

        <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {allDone && <Anim name="trophy" size={90} />}
          <div>
            <b style={{ display: 'block', fontSize: 17, marginBottom: 4 }}>{allDone ? 'Você concluiu todas as unidades disponíveis!' : 'Próximas unidades do A1'}</b>
            <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
              {UNITS.length} de {PLANNED_A1_UNITS} unidades do A1 já estão no ar. As próximas (família, objetos e cores, rotina, comida e lugares) estão sendo preparadas e validadas.
              {allDone && ' Enquanto isso, use a revisão e refaça lições para fixar.'}
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
