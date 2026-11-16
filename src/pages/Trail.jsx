import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { UNITS, LEVELS, LEVEL_ORDER, LEVEL_NAMES, NEXT_LEVEL, unitsOf, lessonStates, levelPercent, currentLevel } from '../lib/content.js';
import { useProgress, liveStreak, todayBR } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { Shell, Spinner, Icon, Fire, Bolt, Anim } from '../components/ui.jsx';

export function Rail({ prog }) {
  const { profile } = useAuth();
  const todayXp = prog.week.find(w => w.day === todayBR())?.xp || 0;
  const goal = profile?.daily_goal_xp || 30;
  const level = currentLevel(prog.done);
  const pct = levelPercent(prog.done, level);
  const li = LEVEL_ORDER.indexOf(level);
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}><b>Seu nível</b><span style={{ fontSize: 14, fontWeight: 700, color: 'var(--violet)' }}>{level} · {pct}%</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 6 }}>
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l, i) => <span key={l} style={{ height: 10, borderRadius: 99, background: i < li ? 'var(--violet)' : i === li ? `linear-gradient(90deg,var(--violet) ${pct}%,var(--track) ${pct}%)` : 'var(--track)' }} />)}
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
  const curRef = useRef(null);
  // Leva a tela até a lição atual (onde o aluno parou)
  useEffect(() => {
    if (!prog.loading) setTimeout(() => curRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  }, [prog.loading]);
  if (prog.loading) return <Spinner />;
  const states = lessonStates(prog.done);
  const stateOf = Object.fromEntries(states.map(s => [s.lesson.id, s.state]));
  const current = states.find(s => s.state === 'current')?.lesson;
  const isSkipped = (id) => prog.scores[id]?.times_done === 0; // marcada pelo teste de nível
  const doneCount = states.filter(s => s.state === 'done').length;
  const skippedCount = states.filter(s => s.state === 'done' && isSkipped(s.lesson.id)).length;
  const allDone = states.every(s => s.state === 'done');

  return (
    <Shell mistakesCount={prog.mistakes.length} rail={<Rail prog={prog} />}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {profile?.display_name && <p className="muted" style={{ margin: '0 0 16px', fontSize: 16 }}>Olá, <b style={{ color: 'var(--ink)' }}>{profile.display_name.split(' ')[0]}</b>!</p>}
        {current && (
          <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24, borderColor: 'var(--violet-ring)' }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--violet)', letterSpacing: 1, textTransform: 'uppercase' }}>Você parou aqui</span>
              <b style={{ display: 'block', fontSize: 19, margin: '4px 0 2px' }}>{current.title}</b>
              <span className="muted" style={{ fontSize: 14 }}>Nível {current.unit.level} · Unidade {current.unit.order}: {current.unit.title} · lição {current.index + 1} de {current.unit.lessons.length}</span>
            </div>
            <Link className="btn btn-violet" to={`/licao/${current.id}`}>Continuar <Icon name="arrow" size={18} stroke={2.5} /></Link>
          </div>
        )}
        {doneCount > 0 && (
          <p className="muted" style={{ fontSize: 13, margin: '0 0 16px', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 14, height: 14, borderRadius: 99, background: 'var(--violet)' }} />Lição feita por você</span>
            {skippedCount > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 14, height: 14, borderRadius: 99, background: 'var(--violet-ring)' }} />Pulada pelo teste de nível</span>}
          </p>
        )}
        {prog.error && <div className="alert" role="alert" style={{ marginBottom: 16 }}>{prog.error}</div>}

        {LEVELS.map(lv => (
          <div key={lv}>
            <h2 style={{ fontSize: 15, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text3)', margin: '8px 0 12px', fontFamily: 'Inter, sans-serif' }}>Nível {lv} · {LEVEL_NAMES[lv]}</h2>
        {unitsOf(lv).map((u) => {
          const unitStates = u.lessons.map(l => stateOf[l.id]);
          const unlocked = unitStates.some(s => s !== 'locked');
          return (
            <section key={u.id} aria-labelledby={u.id} style={{ marginBottom: 16 }}>
              <div className={'unit-banner' + (unlocked ? '' : ' locked')}>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: unlocked ? 'var(--lime)' : 'var(--text3)', letterSpacing: 1, textTransform: 'uppercase' }}>Nível {u.level} · Unidade {u.order}</p>
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
                  const skipped = st === 'done' && isSkipped(l.id);
                  const off = 'off' + ((u.order * 2 + i) % 8);
                  const label = `${l.title} — ${skipped ? 'pulada pelo teste de nível, toque para fazer' : st === 'done' ? 'concluída, toque para treinar de novo' : st === 'current' ? 'começar' : 'bloqueada: conclua a lição anterior'}`;
                  const inner = (
                    <>
                      <span className="circ">
                        {st === 'done' && <Icon name="check" size={32} color={skipped ? 'var(--violet-dd)' : '#fff'} stroke={3} />}
                        {st === 'current' && <svg width="34" height="34" viewBox="0 0 24 24" fill="#0B0D1A" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>}
                        {st === 'locked' && <Icon name="lock" size={28} color="#6A6E88" stroke={2.2} />}
                      </span>
                      {st === 'current' && <span className="start">Começar · até +15 XP</span>}
                      <span className="nlabel">{l.title}</span>
                    </>
                  );
                  return st === 'locked'
                    ? <span key={l.id} className={`node locked ${off}`} aria-label={label} role="img">{inner}</span>
                    : <Link key={l.id} ref={st === 'current' ? curRef : undefined} to={`/licao/${l.id}`} className={`node ${st}${skipped ? ' skipped' : ''} ${off}`} aria-label={label}>{inner}</Link>;
                })}
              </div>
            </section>
          );
        })}
          </div>
        ))}

        <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {allDone && <Anim name="trophy" size={90} />}
          <div>
            <b style={{ display: 'block', fontSize: 17, marginBottom: 4 }}>{allDone ? `Você concluiu o nível ${LEVELS[LEVELS.length - 1]}!` : `Depois do ${LEVELS[LEVELS.length - 1]} vem o ${NEXT_LEVEL}`}</b>
            <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>
              {`O nível ${NEXT_LEVEL} (${LEVEL_NAMES[NEXT_LEVEL]}) está sendo preparado e validado.`}{allDone && ' Enquanto isso, use a revisão e refaça lições para fixar.'}
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
