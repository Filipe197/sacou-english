import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { UNITS, LEVELS, LEVEL_ORDER, LEVEL_NAMES, NEXT_LEVEL, unitsOf, lessonStates, levelPercent, currentLevel, unitComplete } from '../lib/content.js';
import { useProgress, liveStreak, todayBR, dueLessonIds, shieldCovering } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { Shell, Spinner, Icon, Fire, Bolt, Anim } from '../components/ui.jsx';
import { NewAchievement } from '../components/Achievements.jsx';
import { Missions } from '../components/Missions.jsx';
import TrailScene, { hasArt } from '../components/TrailScene.jsx';
import { dueCount } from '../lib/memory.js';

// Caminho em zigue-zague (deslocamento de cada bolinha, de -1 a 1)
const WAVE = [0, 0.6, 1, 0.6, 0, -0.6, -1, -0.6];
// Ícone de cada tipo de lição
function kindOf(l) {
  const t = l.title || '';
  if (l.hasStory || l.story || /^História/.test(t)) return { icon: 'story', label: 'História' };
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
  const total = u.lessons.length;
  const left = total - unitDone;
  const going = unlocked && !complete;
  return (
    <div className={'tr-head' + tone}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <span className="tr-kick">{complete && <Icon name="check" size={15} stroke={3} />}Nível {u.level} · Unidade {u.order}</span>
        <b className="tr-title" title={u.subtitle}>{u.title}</b>
        {going && (
          <div className="tr-prog">
            <span className="tr-bar" role="progressbar" aria-valuenow={unitDone} aria-valuemax={total} aria-label="Lições feitas nesta unidade"><span style={{ width: `${(unitDone / total) * 100}%` }} /></span>
            <span className="tr-prog-t">{unitDone} de {total} lições · faltam ~{left * 5} min</span>
          </div>
        )}
      </div>
      <div className="tr-head-bts">
        <Link className="tr-guide" to={`/guia/${u.id}`} aria-label={`Guia da unidade ${u.order}: ${u.title}`}><Icon name="book" size={18} /><span>Guia</span></Link>
        {going && <Link className="tr-guide tr-pular" to={`/prova/unidade/${u.id}`} aria-label={`Fazer o teste e pular a unidade ${u.order}`}><Icon name="bolt" size={17} /><span>Pular</span></Link>}
      </div>
    </div>
  );
}

// Coluna da direita da trilha: um resumo, UM próximo passo e as missões que faltam.
// (Antes eram seis cartões pedindo coisas ao mesmo tempo; a lição precisa ser o foco.)
export function Rail({ prog }) {
  const { profile } = useAuth();
  const todayXp = prog.week.find(w => w.day === todayBR())?.xp || 0;
  const goal = profile?.daily_goal_xp || 30;
  const level = currentLevel(prog.done);
  const pct = levelPercent(prog.done, level);
  const streak = liveStreak(profile);
  const errs = prog.mistakes.length;
  const dueWords = dueCount(profile?.id);
  const dueLessons = dueLessonIds(prog.scores).length;
  const goalOk = todayXp >= goal;
  // o próximo passo mais importante (só um): erros primeiro, depois o que está para esquecer
  const step = errs > 0
    ? { t: `Revise ${errs === 1 ? 'o erro' : `os ${errs} erros`} de antes`, d: 'Uns 3 minutos fixam o que você errou e contam para a missão da semana.', to: '/revisao', cta: 'Revisar agora' }
    : dueWords > 0 || dueLessons > 0
      ? { t: 'Hora de relembrar', d: dueWords > 0 ? `${dueWords} ${dueWords === 1 ? 'palavra ou frase chegou' : 'palavras e frases chegaram'} no dia certo de revisar.` : `${dueLessons} ${dueLessons === 1 ? 'lição chegou' : 'lições chegaram'} no dia certo de revisar.`, to: '/praticar', cta: 'Fazer o treino' }
      : null;
  const alsoDue = errs > 0 && (dueWords > 0 || dueLessons > 0);
  return (
    <>
      <div className="card rail-sum">
        <div className="rs-top">
          <span className="rs-stat" title={streak === 1 ? 'dia seguido' : 'dias seguidos'}><Fire size={22} /><b>{streak}</b><small>{streak === 1 ? 'dia' : 'dias'}</small></span>
          <span className="rs-stat" title="XP total"><Bolt size={22} /><b>{(profile?.xp_total || 0).toLocaleString('pt-BR')}</b><small>XP</small></span>
          <Link className="rs-level" to="/progresso" title="Seu nível (ver Meu progresso)">{level} · {pct}%</Link>
        </div>
        {profile?.streak_freezes > 0 && <span className="shield-pill" title="Escudos: protegem a sequência num dia sem estudo">🛡️ {profile.streak_freezes} {profile.streak_freezes === 1 ? 'escudo' : 'escudos'}</span>}
        <div className="rs-goal">
          <span className="rs-goal-t"><b>Meta de hoje</b><span>{goalOk ? 'batida ✓' : `${todayXp} / ${goal} XP`}</span></span>
          <div className="track" style={{ height: 10 }}><div className="fill" style={{ width: Math.min(100, (todayXp / goal) * 100) + '%' }} /></div>
        </div>
      </div>
      {profile?.freeze_used_on === todayBR() ? (
        <div className="card shield-card rail-alert"><b>🛡️ Seu escudo salvou a sequência!</b><span>Você ficou um dia sem estudar, mas seus {streak} dias seguidos continuam.</span></div>
      ) : shieldCovering(profile) > 0 && (
        <div className="card shield-card rail-alert"><b>🛡️ Sua sequência está protegida</b><span>Um escudo cobre o dia que você perdeu. Faça uma lição hoje para manter os {streak} dias.</span></div>
      )}
      {step && (
        <div className="card rail-step">
          <span className="rst-k">Próximo passo</span>
          <b>{step.t}</b>
          <p>{step.d}</p>
          <Link className="btn btn-violet btn-block" to={step.to}>{step.cta}</Link>
          {alsoDue && <Link className="rst-also" to="/praticar">Também: {dueWords > 0 ? `${dueWords} ${dueWords === 1 ? 'palavra' : 'palavras'}` : `${dueLessons} ${dueLessons === 1 ? 'lição' : 'lições'}`} para relembrar →</Link>}
        </div>
      )}
      <NewAchievement prog={prog} />
      <Missions compact />
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
  // trilha enxuta: unidades concluídas e bloqueadas ficam recolhidas numa linha (toque para abrir),
  // e níveis inteiros concluídos ou ainda fechados viram uma linha só. Só a unidade atual fica aberta.
  const [unfold, setUnfold] = useState(() => new Set());
  const openUp = (id) => setUnfold(s => new Set(s).add(id));
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
  // Barra única no topo: mostra a unidade que está no meio da tela
  useEffect(() => {
    if (prog.loading) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      let id = null;
      const limit = Math.max((document.querySelector('.tr-stick')?.getBoundingClientRect().bottom || 90) + 8, window.innerHeight * 0.45);
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
    podcastOf: (unitId) => games.g.PODCASTS.find(x => x.unlock === unitId),
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
    const complete = unitComplete(u.lessons, prog.done);
    const unlocked = unitStates.some(x => x !== 'locked');
    return { u, unitDone, complete, unlocked, tone: complete ? ' complete' : unlocked ? '' : ' locked' };
  };
  const stuckUnit = stuck && UNITS.find(x => x.id === stuck);
  const curUnit = current && UNITS.find(x => x.lessons.some(l => l.id === current.id))?.id;
  // unidade com lição nova (opcional) continua aberta, para a novidade aparecer
  const unitFolded = (u, info) => !unfold.has(u.id) && u.id !== curUnit && (info.complete || !info.unlocked) && !u.lessons.some(l => stateOf[l.id] === 'extra');
  const levelState = (lv) => {
    const us = unitsOf(lv).map(infoOf);
    const fresh = unitsOf(lv).some(u => u.lessons.some(l => stateOf[l.id] === 'extra'));
    return fresh ? 'open' : us.every(i => i.complete) ? 'done' : us.every(i => !i.unlocked) ? 'locked' : 'open';
  };

  return (
    <Shell mistakesCount={prog.mistakes.length} rail={<Rail prog={prog} />}>
      <div className="trail">
        <div className="tr-stick">{stuckUnit && <UnitHead {...infoOf(stuckUnit)} />}</div>
        {prog.error && <div className="alert" role="alert" style={{ marginBottom: 16 }}>{prog.error}</div>}

        {LEVELS.map(lv => {
          const lvState = levelState(lv);
          const lvFolded = lvState !== 'open' && !unfold.has('lv-' + lv);
          return (
          <div key={lv}>
            <div className="tr-level"><span>Nível {lv} · {LEVEL_NAMES[lv]}</span></div>
            {lvFolded && (
              <button type="button" className={'tr-fold tr-fold-lv' + (lvState === 'done' ? ' complete' : ' locked')} onClick={() => openUp('lv-' + lv)}>
                <span className="tr-fold-ic" aria-hidden="true"><Icon name={lvState === 'done' ? 'check' : 'lock'} size={18} stroke={lvState === 'done' ? 3 : 2} /></span>
                <span className="tr-fold-t"><b>{lvState === 'done' ? `Nível ${lv} concluído` : `${unitsOf(lv).length} unidades`}</b><small>{lvState === 'done' ? 'Toque para ver as unidades e treinar de novo' : 'Libera ao terminar o nível anterior · toque para ver'}</small></span>
                <Icon name="chevron" size={18} />
              </button>
            )}
            {!lvFolded && unitsOf(lv).map((u) => {
              const info = infoOf(u);
              const { unitDone, complete, unlocked, tone } = info;
              if (unitFolded(u, info)) return (
                <section key={u.id} aria-labelledby={u.id} className={'tr-unit tr-unit-fold' + tone} data-u={u.id}>
                  <button type="button" className={'tr-fold' + tone} onClick={() => openUp(u.id)}>
                    <span className="tr-fold-ic" aria-hidden="true"><Icon name={complete ? 'check' : 'lock'} size={18} stroke={complete ? 3 : 2} /></span>
                    <span className="tr-fold-t"><b id={u.id}>Unidade {u.order} · {u.title}</b><small>{complete ? 'Concluída · toque para treinar de novo' : 'Libera ao terminar a anterior'}</small></span>
                    <Icon name="chevron" size={18} />
                  </button>
                </section>
              );
              const rewards = extras ? extras.rewardsOf(u.id) : [];
              const left = u.order % 2 === 1;
              // cena ilustrada: à esquerda das bolinhas 0 a 3 (que vão para a direita) ou à direita das 4 a 8
              const art = hasArt(u.id);
              const artSide = left || u.lessons.length < 7 ? 'left' : 'right';
              const artAt = artSide === 'left' ? 1 : 5;
              return (
                <section key={u.id} aria-labelledby={u.id} className={'tr-unit' + tone} data-u={u.id}>
                  <div className={'tr-div' + tone + (u.id === UNITS[0].id ? ' sr-only' : '')}>
                    <h2 id={u.id} title={u.subtitle}>{complete && <Icon name="check" size={16} stroke={3} />}Unidade {u.order} · {u.title}</h2>
                  </div>
                  <div className="tr-path">
                    {!art && <TrailScene unitId={u.id} side={left ? 'left' : 'right'} off={!unlocked} top={left ? 150 : 446} />}
                    {u.lessons.map((l, i) => {
                      const st = stateOf[l.id];
                      const skipped = st === 'done' && isSkipped(l.id);
                      const key = l.id;
                      const status = skipped ? 'Pulada pelo teste de nível' : st === 'done' ? 'Concluída' : st === 'current' ? 'Próxima lição' : st === 'extra' ? 'nova, opcional' : 'Bloqueada';
                      return (
                        <div key={key} className={'tr-slot' + (st === 'current' ? ' cur' : '') + (open === key ? ' is-open' : '')} style={{ '--x': WAVE[i % WAVE.length] }}>
                          {st === 'current' && open !== key && (
                            <Link className="tr-bubble tr-bubble-l" to={`/licao/${l.id}`} onClick={e => e.stopPropagation()}>
                              <span className="tr-bubble-k">{kindOf(l).label} {i + 1} · {(l.items?.length || l.size) ? `${l.items?.length || l.size} exercícios` : 'uns 5 min'}</span>
                              <b>{l.title}</b>
                              <span className="tr-bubble-go">Começar · até +15 XP</span>
                            </Link>
                          )}
                          {art && i === artAt && <TrailScene unitId={u.id} side={artSide} off={!unlocked} />}
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
                                : <Link className="btn btn-3d tr-pop-go" to={`/licao/${l.id}`}>{st === 'current' ? 'Começar · até +15 XP' : st === 'extra' ? 'Fazer a lição nova · +10 XP' : skipped ? 'Fazer a lição' : 'Treinar de novo'}</Link>}
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
                  {unlocked && (
                    <div className="tr-close">
                      <Link to={`/desafio/${u.id}`} className={'tr-close-a' + (complete ? '' : ' off')} aria-label={complete ? `Desafio escrito da unidade ${u.order}` : `Desafio escrito da unidade ${u.order}: libera ao terminar a unidade`}>
                        <span className="tr-close-ic" aria-hidden="true">🎯</span>
                        <span><b>Desafio escrito</b><small>{prog.scores[`desafio-${u.id}`] ? `Sua nota: ${prog.scores[`desafio-${u.id}`].best_score} · tente melhorar` : complete ? 'Escreva sobre o tema e a IA corrige' : 'Libera ao terminar a unidade'}</small></span>
                        <Icon name={complete ? 'arrow' : 'lock'} size={18} />
                      </Link>
                      {extras && extras.podcastOf(u.id) && (
                        <Link to={complete ? `/jogos/podcast/${extras.podcastOf(u.id).id}` : '#'} onClick={e => { if (!complete) e.preventDefault(); }} className={'tr-close-a' + (complete ? '' : ' off')} aria-disabled={!complete}>
                          <span className="tr-close-ic" aria-hidden="true">🎧</span>
                          <span><b>Escuta da unidade</b><small>{complete ? `Diálogo com vozes naturais: ${extras.podcastOf(u.id).title}` : 'Libera ao terminar a unidade'}</small></span>
                          <Icon name={complete ? 'arrow' : 'lock'} size={18} />
                        </Link>
                      )}
                    </div>
                  )}
                </section>
              );
            })}
            <Link to={`/prova/nivel/${lv}`} className="exam-cta">
              <span className="exam-cta-ic" aria-hidden="true">🎓</span>
              <span>
                <b>Prova do nível {lv}</b>
                <small>{unitsOf(lv).every(u => unitComplete(u.lessons, prog.done)) ? 'Teste tudo o que aprendeu e ganhe um card de aprovado.' : `Já sabe o ${lv}? Passe na prova e pule o que falta.`}</small>
              </span>
              <Icon name="arrow" size={18} />
            </Link>
          </div>
          );
        })}

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
