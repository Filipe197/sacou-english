import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { UNITS, LEVELS, LEVEL_ORDER, LEVEL_NAMES, NEXT_LEVEL, unitsOf, lessonStates, levelPercent, currentLevel } from '../lib/content.js';
import { useProgress, liveStreak, todayBR, dueLessonIds, shieldCovering } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { Shell, Spinner, Icon, Fire, Bolt, Anim } from '../components/ui.jsx';
import { NewAchievement } from '../components/Achievements.jsx';
import { Missions } from '../components/Missions.jsx';
import TrailScene from '../components/TrailScene.jsx';

// Caminho em zigue-zague (deslocamento de cada bolinha, de -1 a 1)
const WAVE = [0, 0.6, 1, 0.6, 0, -0.6, -1, -0.6];
// Ícone de cada tipo de lição
function kindOf(l) {
  const t = l.title || '';
  if (l.story || /^História/.test(t)) return { icon: 'story', label: 'História' };
  if (/^Escrevendo/.test(t)) return { icon: 'edit', label: 'Escrita' };
  if (/^Conversa/.test(t)) return { icon: 'chat', label: 'Conversa' };
  if (/^Desafio/.test(t)) return { icon: 'trophy', label: 'Desafio' };
  return { icon: 'star', label: 'Lição' };
}

function Chest({ open, fresh }) {
  // gold: baú liberado; gray: ainda bloqueado
  const k = open
    ? { top: '#FFD45C', body: '#F5A623', dark: '#C46F0A', band: '#B5610A', plate: '#FFF3C4', deep: '#8A4508' }
    : { top: '#E9EAF2', body: '#D3D5E3', dark: '#AEB1C6', band: '#A3A6BD', plate: '#F6F7FB', deep: '#7F8299' };
  const id = open ? 'cg' : 'cl';
  return (
    <svg width="84" height="78" viewBox="0 0 100 92" aria-hidden="true">
      <defs>
        <linearGradient id={id + 'b'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={k.body} /><stop offset="1" stopColor={k.dark} /></linearGradient>
        <linearGradient id={id + 't'} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={k.top} /><stop offset="1" stopColor={k.body} /></linearGradient>
        <radialGradient id={id + 'g'} cx="50%" cy="100%" r="70%"><stop offset="0" stopColor="#FFF6C2" stopOpacity=".95" /><stop offset="1" stopColor="#FFE27A" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="50" cy="86" rx="36" ry="5" fill="rgba(11,13,26,.14)" />
      {open ? (
        <>
          {fresh && <path d="M50 44 L26 0 H74 Z" fill={`url(#${id}g)`} />}
          <path d="M14 40 L20 14 Q21 10 25 10 H75 Q79 10 80 14 L86 40 Z" fill={k.dark} />
          <path d="M20 16 Q21 13 25 13 H75 Q79 13 80 16 L84 36 H16 Z" fill={`url(#${id}t)`} />
          <rect x="16" y="34" width="68" height="10" rx="3" fill={k.deep} />
          <circle cx="36" cy="38" r="5" fill="#FFE27A" /><circle cx="50" cy="36" r="6" fill="#FFD23F" /><circle cx="63" cy="38" r="5" fill="#FFE27A" />
        </>
      ) : (
        <>
          <path d="M12 44 V30 Q12 14 30 14 H70 Q88 14 88 30 V44 Z" fill={`url(#${id}t)`} />
          <path d="M20 22 Q24 18 32 18 H52" stroke="#fff" strokeOpacity=".55" strokeWidth="4" strokeLinecap="round" fill="none" />
          <rect x="24" y="14" width="9" height="30" fill={k.band} opacity=".55" />
          <rect x="67" y="14" width="9" height="30" fill={k.band} opacity=".55" />
        </>
      )}
      <rect x="12" y="42" width="76" height="40" rx="8" fill={`url(#${id}b)`} />
      <rect x="12" y="42" width="76" height="6" fill={k.deep} opacity=".35" />
      <rect x="24" y="42" width="9" height="40" fill={k.band} opacity=".6" />
      <rect x="67" y="42" width="9" height="40" fill={k.band} opacity=".6" />
      <rect x="12" y="74" width="76" height="8" rx="4" fill={k.deep} opacity=".35" />
      <rect x="40" y={open ? 44 : 36} width="20" height="22" rx="6" fill={k.plate} />
      <circle cx="50" cy={open ? 53 : 45} r="3.2" fill={k.deep} />
      <rect x="48.6" y={open ? 54 : 46} width="2.8" height="6" rx="1.4" fill={k.deep} />
      {open && fresh && <g fill="#FFD23F"><path d="M14 8 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" /><path d="M86 4 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5z" /></g>}
    </svg>
  );
}

// Barra fixa no topo com a unidade que está na tela (como no Duolingo)
function UnitHead({ u, unitDone, complete, unlocked, tone }) {
  return (
    <div className={'tr-head' + tone}>
      <div style={{ minWidth: 0 }}>
        <span className="tr-kick">{complete && <Icon name="check" size={15} stroke={3} />}Nível {u.level} · Unidade {u.order}{unlocked && !complete ? ` · ${unitDone} de ${u.lessons.length}` : ''}</span>
        <b className="tr-title" title={u.subtitle}>{u.title}</b>
      </div>
      <Link className="tr-guide" to={`/guia/${u.id}`} aria-label={`Guia da unidade ${u.order}: ${u.title}`}><Icon name="book" size={18} /><span>Guia</span></Link>
    </div>
  );
}

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
        <div className="card" style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', gap: 10 }}><Fire size={26} /><div><b style={{ display: 'block', fontSize: 20, fontFamily: 'var(--head)' }}>{streak}</b><span style={{ fontSize: 12, color: 'var(--text3)' }}>{streak === 1 ? 'dia seguido' : 'dias seguidos'}</span>{profile?.streak_freezes > 0 && <span className="shield-pill" title="Escudos: protegem a sequência num dia sem estudo">🛡️ {profile.streak_freezes} {profile.streak_freezes === 1 ? 'escudo' : 'escudos'}</span>}</div></div>
        <div className="card" style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', gap: 10 }}><Bolt size={26} /><div><b style={{ display: 'block', fontSize: 20, fontFamily: 'var(--head)' }}>{(profile?.xp_total || 0).toLocaleString('pt-BR')}</b><span style={{ fontSize: 12, color: 'var(--text3)' }}>XP total</span></div></div>
      </div>
      {profile?.freeze_used_on === todayBR() ? (
        <div className="card shield-card rail-alert"><b>🛡️ Seu escudo salvou a sequência!</b><span>Você ficou um dia sem estudar, mas seus {streak} dias seguidos continuam.</span></div>
      ) : shieldCovering(profile) > 0 && (
        <div className="card shield-card rail-alert"><b>🛡️ Sua sequência está protegida</b><span>Um escudo cobre o dia que você perdeu. Faça uma lição hoje para manter os {streak} dias.</span></div>
      )}
      <NewAchievement prog={prog} />
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}><b>Meta de hoje</b><span style={{ fontSize: 14, color: 'var(--text3)' }}>{Math.min(todayXp, goal)} / {goal} XP</span></div>
        <div className="track" style={{ height: 14 }}><div className="fill" style={{ width: Math.min(100, (todayXp / goal) * 100) + '%' }} /></div>
        <p className="muted" style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.5 }}>
          {todayXp >= goal ? 'Meta batida! Sua sequência de hoje está garantida.' : todayXp > 0 ? `Faltam ${goal - todayXp} XP para bater a meta. Cada lição nova vale 10 a 15 XP.` : 'Faça uma lição hoje para manter sua sequência de dias.'}
        </p>
      </div>
      <div className="card rail-opt">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}><b>Seu nível</b><span style={{ fontSize: 14, fontWeight: 700, color: 'var(--violet)' }}>{level} · {pct}%</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 6 }}>
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l, i) => <span key={l} style={{ height: 10, borderRadius: 99, background: i < li ? 'var(--violet)' : i === li ? `linear-gradient(90deg,var(--violet) ${pct}%,var(--track) ${pct}%)` : 'var(--track)' }} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,minmax(0,1fr))', gap: 6, marginTop: 6, fontSize: 12, fontWeight: 600, color: 'var(--text3)', textAlign: 'center' }}>{['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l => <span key={l}>{l}</span>)}</div>
      </div>
      <Missions compact />
      {prog.mistakes.length > 0 && (
        <div className="card rail-alert" style={{ background: 'var(--ink)', borderColor: 'var(--ink)', color: '#fff' }}>
          <b style={{ display: 'block', marginBottom: 6 }}>{prog.mistakes.length} {prog.mistakes.length === 1 ? 'erro' : 'erros'} para revisar</b>
          <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.5, color: 'var(--on-dark)' }}>Revisar o que você errou ajuda a fixar mais rápido. Leva uns 3 minutos.</p>
          <Link className="btn btn-lime btn-block" to="/revisao">Revisar agora</Link>
        </div>
      )}
      {dueLessonIds(prog.scores).length > 0 && (
        <div className="card rail-alert" style={{ borderColor: 'var(--violet-ring)' }}>
          <b style={{ display: 'block', marginBottom: 6 }}>Hora de relembrar</b>
          <p className="muted" style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.5 }}>{dueLessonIds(prog.scores).length} {dueLessonIds(prog.scores).length === 1 ? 'lição chegou' : 'lições chegaram'} no dia certo de revisar. Um treino rápido fixa na memória.</p>
          <Link className="btn btn-violet btn-block" to="/praticar">Fazer o treino</Link>
        </div>
      )}
    </>
  );
}

export default function Trail() {
  const prog = useProgress();
  const { profile } = useAuth();
  const curRef = useRef(null);
  const [jump, setJump] = useState(null); // 'up' | 'down' quando a lição atual está fora da tela
  const [open, setOpen] = useState(null); // bolinha com o balão aberto
  const [stuck, setStuck] = useState(null); // unidade mostrada na barra fixa do topo
  const [games, setGames] = useState(null); // personagens e jogos (carregados à parte, não atrasam a trilha)
  useEffect(() => {
    let alive = true;
    import('../games/lib.js').then((g) => { if (alive) setGames({ g }); }).catch(() => {});
    return () => { alive = false; };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(null);
    const esc = (e) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('click', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', esc); };
  }, [open]);
  // Barra única no topo: mostra a unidade cujo cabeçalho já passou para baixo dela
  useEffect(() => {
    if (prog.loading) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      let id = null;
      const limit = (document.querySelector('.tr-stick')?.getBoundingClientRect().bottom || 90) + 8;
      for (const sec of document.querySelectorAll('.tr-unit[data-u]')) {
        if (id === null || sec.getBoundingClientRect().top < limit) id = sec.dataset.u; else break;
      }
      setStuck(id);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [prog.loading]);
  // Botão "Onde parei": aparece quando a lição atual sai da tela
  useEffect(() => {
    if (prog.loading || !curRef.current || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      setJump(e.isIntersecting ? null : e.boundingClientRect.top < 0 ? 'up' : 'down');
    }, { rootMargin: '-90px 0px -80px 0px' });
    io.observe(curRef.current);
    return () => io.disconnect();
  }, [prog.loading]);
  const goCurrent = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    curRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  };
  // Leva a tela até a lição atual (onde o aluno parou)
  useEffect(() => {
    if (prog.loading) return;
    const t = setTimeout(() => {
      const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      curRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }, 400);
    return () => clearTimeout(t);
  }, [prog.loading]);
  if (prog.loading) return <Spinner />;
  const states = lessonStates(prog.done);
  const stateOf = Object.fromEntries(states.map(s => [s.lesson.id, s.state]));
  const current = states.find(s => s.state === 'current')?.lesson;
  const isSkipped = (id) => prog.scores[id]?.times_done === 0; // marcada pelo teste de nível
  const doneCount = states.filter(s => s.state === 'done').length;
  const skippedCount = states.filter(s => s.state === 'done' && isSkipped(s.lesson.id)).length;
  const allDone = states.every(s => s.state === 'done');
  const extras = games && {
    rewardsOf: (unitId) => {
      const { g } = games;
      return [
        ...g.PODCASTS.filter(x => x.unlock === unitId).map(x => ({ to: `/jogos/podcast/${x.id}`, icon: '🎙️', kind: 'Podcast', title: x.title, played: g.played(prog.scores, x.id) })),
        ...g.EPISODES.filter(x => x.unlock === unitId).map(x => ({ to: `/jogos/episodio/${x.id}`, icon: '📖', kind: 'Episódio', title: x.title, played: g.played(prog.scores, x.id) })),
        ...g.CASES.filter(x => x.unlock === unitId).map(x => ({ to: `/jogos/detetive/${x.id}`, icon: '🕵️', kind: 'Detetive', title: x.title, played: g.played(prog.scores, x.id) })),
        ...g.MISSIONS.filter(x => x.unlock === unitId).map(x => ({ to: `/jogos/missao/${x.id}`, icon: '🗺️', kind: 'Missão', title: x.title, played: g.played(prog.scores, x.id) })),
      ];
    },
  };

  const infoOf = (u) => {
    const unitStates = u.lessons.map(l => stateOf[l.id]);
    const unitDone = unitStates.filter(x => x === 'done').length;
    const complete = unitDone === u.lessons.length;
    const unlocked = unitStates.some(x => x !== 'locked');
    return { u, unitDone, complete, unlocked, tone: complete ? ' complete' : unlocked ? '' : ' locked' };
  };
  const stuckUnit = stuck && UNITS.find(x => x.id === stuck);

  return (
    <Shell mistakesCount={prog.mistakes.length} rail={<Rail prog={prog} />}>
      <div className="trail">
        <div className="tr-stick">{stuckUnit && <UnitHead {...infoOf(stuckUnit)} />}</div>
        {prog.error && <div className="alert" role="alert" style={{ marginBottom: 16 }}>{prog.error}</div>}

        {LEVELS.map(lv => (
          <div key={lv}>
            <div className="tr-level"><span>Nível {lv} · {LEVEL_NAMES[lv]}</span></div>
            {unitsOf(lv).map((u) => {
              const info = infoOf(u);
              const { unitDone, complete, unlocked, tone } = info;
              const rewards = extras ? extras.rewardsOf(u.id) : [];
              const left = u.order % 2 === 1;
              return (
                <section key={u.id} aria-labelledby={u.id} className={'tr-unit' + tone} data-u={u.id}>
                  <div className={'tr-div' + tone + (u.id === UNITS[0].id ? ' sr-only' : '')}>
                    <h2 id={u.id} title={u.subtitle}>{complete && <Icon name="check" size={16} stroke={3} />}Unidade {u.order} · {u.title}</h2>
                  </div>
                  <div className="tr-path">
                    <TrailScene unitId={u.id} side={left ? 'left' : 'right'} off={!unlocked} top={left ? 150 : 446} />
                    {u.lessons.map((l, i) => {
                      const st = stateOf[l.id];
                      const skipped = st === 'done' && isSkipped(l.id);
                      const key = l.id;
                      const status = skipped ? 'Pulada pelo teste de nível' : st === 'done' ? 'Concluída' : st === 'current' ? 'Próxima lição' : 'Bloqueada';
                      return (
                        <div key={key} className={'tr-slot' + (st === 'current' ? ' cur' : '') + (open === key ? ' is-open' : '')} style={{ '--x': WAVE[i % WAVE.length] }}>
                          {st === 'current' && <span className="tr-bubble" aria-hidden="true">Começar</span>}
                          <button type="button" ref={st === 'current' ? curRef : undefined}
                            className={`tr-node ${st}${skipped ? ' skipped' : ''}${open === key ? ' open' : ''}`}
                            aria-expanded={open === key} aria-label={`${l.title}: ${status}`}
                            onClick={(e) => { e.stopPropagation(); setOpen(o => (o === key ? null : key)); }}>
                            <span className={'tr-face i-' + kindOf(l).icon}><Icon name={kindOf(l).icon} size={30} stroke={2.4} /></span>
                          </button>
                          {open === key && (
                            <div className="tr-pop" onClick={e => e.stopPropagation()}>
                              <span className="tr-pop-k">{kindOf(l).label} · {status}</span>
                              <b>{l.title}</b>
                              {st === 'locked'
                                ? <span className="tr-pop-t">Conclua as lições anteriores para liberar esta.</span>
                                : <Link className="btn btn-3d tr-pop-go" to={`/licao/${l.id}`}>{st === 'current' ? 'Começar · até +15 XP' : skipped ? 'Fazer a lição' : 'Treinar de novo'}</Link>}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {(() => {
                      const key = u.id + '-bau';
                      const fresh = complete && rewards.some(r => !r.played);
                      return (
                        <div className={'tr-slot' + (open === key ? ' is-open' : '')} style={{ '--x': WAVE[u.lessons.length % WAVE.length] }}>
                          <button type="button" className={'tr-chest' + (complete ? ' on' : '') + (fresh ? ' fresh' : '')}
                            aria-expanded={open === key} aria-label={complete ? 'Baú da unidade: recompensas liberadas' : 'Baú da unidade: bloqueado'}
                            onClick={(e) => { e.stopPropagation(); setOpen(o => (o === key ? null : key)); }}>
                            <Chest open={complete} fresh={fresh} />
                          </button>
                          {open === key && (
                            <div className="tr-pop" onClick={e => e.stopPropagation()}>
                              <span className="tr-pop-k">Baú da unidade</span>
                              <b>{complete ? 'Recompensas liberadas!' : 'Termine a unidade para abrir'}</b>
                              <span className="tr-pop-t">{complete ? 'Treine o que aprendeu de um jeito divertido:' : 'Dentro do baú:'}</span>
                              <div className="tr-rewards">
                                {rewards.map(r => complete
                                  ? <Link key={r.to} to={r.to} className="tr-rw">{r.icon} <span><small>{r.kind}</small>{r.title}</span>{r.played && <Icon name="check" size={16} stroke={3} />}</Link>
                                  : <span key={r.to} className="tr-rw off">{r.icon} <span><small>{r.kind}</small>{r.title}</span><Icon name="lock" size={16} /></span>)}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
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
        <div className="tr-jump-wrap">{jump && (
          <button type="button" className="tr-jump" onClick={goCurrent} aria-label="Ir para a lição onde você parou">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: jump === 'up' ? 'rotate(180deg)' : 'none' }}><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            <span>Onde parei</span>
          </button>
        )}</div>
      </div>
    </Shell>
  );
}
