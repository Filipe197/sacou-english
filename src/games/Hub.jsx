// Página "Jogos e histórias": destaque "Para você agora", jogos rápidos, podcast, episódios,
// detetive e missões. Cada seção mostra o que está liberado + o próximo a liberar.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.js';
import { Shell, Spinner, Icon } from '../components/ui.jsx';
import { Stage, Person } from './art.jsx';
import { EPISODES, SERIES, CASES, MISSIONS, PODCASTS, PODCAST_INFO, cast, unitDone, unlockLabel, played, getBest } from './lib.js';

function Card({ to, locked, unlock, done, kicker, title, art, children }) {
  const inner = (
    <>
      <div className="gh-art">{art}{locked && <span className="gh-lock"><Icon name="lock" size={22} /></span>}{done && <span className="gh-done"><Icon name="check" size={16} stroke={3} color="#fff" />Feito</span>}</div>
      <div className="gh-body">
        <span className="gh-kicker">{kicker}</span>
        <b className="gh-title">{title}</b>
        {locked ? <span className="gh-sub">Libera ao terminar {unlockLabel(unlock)}</span> : children}
      </div>
    </>
  );
  return locked
    ? <div className="gh-card locked" aria-disabled="true">{inner}</div>
    : <Link to={to} className="gh-card">{inner}</Link>;
}

// Seção com só o que está liberado + o próximo a liberar; "Ver todos" mostra o resto
function Section({ title, sub, about, items, isOpen, render }) {
  const [all, setAll] = useState(false);
  const firstLocked = items.findIndex(x => !isOpen(x));
  const visible = all || firstLocked < 0 ? items : items.slice(0, firstLocked + 1);
  const hidden = items.length - visible.length;
  return (
    <section className="gh-sec">
      <div className="gh-sec-head"><h2>{title}</h2><span className="muted">{sub}</span></div>
      {about && <p className="muted gh-about">{about}</p>}
      <div className="gh-grid gh-row">{visible.map(render)}</div>
      {(hidden > 0 || all) && (
        <button type="button" className="link-btn gh-more" onClick={() => setAll(v => !v)}>
          {all ? 'Mostrar menos' : `Ver todos (mais ${hidden} para liberar)`}
        </button>
      )}
    </section>
  );
}

const QUICK = [
  { to: '/jogos/relampago', id: 'relampago', title: 'Palavra Relâmpago', sub: 'Ligue palavras e traduções em 60 segundos. Acertos seguidos multiplicam os pontos.', pic: '⚡' },
  { to: '/jogos/ouvir', id: 'ouvir', title: 'Ouviu, tocou', sub: 'Escute a palavra e toque na figura certa. Ótimo para treinar o ouvido.', pic: '👂' },
  { to: '/jogos/frases', id: 'frases', title: 'Frase em pedaços', sub: 'Monte a frase antes que as peças cheguem ao chão.', pic: '🧩' },
];
const hostsOf = (p) => [...new Set(p.lines.map(l => l.who))];

export default function Hub() {
  const { user } = useAuth();
  const prog = useProgress();
  if (prog.loading) return <Spinner />;
  const open = (x) => unitDone(prog.done, x.unlock);

  // "Para você agora": o próximo de cada série ainda não feito e o jogo rápido do dia
  const nextOf = (list) => list.find(x => open(x) && !played(prog.scores, x.id));
  const pod = nextOf(PODCASTS), ep = nextOf(EPISODES), cs = nextOf(CASES), mi = nextOf(MISSIONS);
  const today = QUICK[new Date().getDate() % QUICK.length];
  const picks = [
    pod && { to: `/jogos/podcast/${pod.id}`, tag: '🎙️ Podcast', title: pod.title, sub: `Episódio ${PODCASTS.indexOf(pod) + 1} · ${pod.level}`, art: <Stage place="office" cast={hostsOf(pod)} looks={cast} height={120} /> },
    ep && { to: `/jogos/episodio/${ep.id}`, tag: '📖 Ana em Londres', title: ep.title, sub: `Episódio ${EPISODES.indexOf(ep) + 1} · ${ep.level}`, art: <Stage place={ep.scenes[0].place} cast={ep.scenes[0].cast} looks={cast} height={120} /> },
    { to: today.to, tag: '⚡ Jogo do dia', title: today.title, sub: getBest(user?.id, today.id) ? `Seu recorde: ${getBest(user?.id, today.id)}` : '1 a 2 minutos', art: <span className="gh-pick-pic" aria-hidden="true">{today.pic}</span> },
    cs && { to: `/jogos/detetive/${cs.id}`, tag: '🕵️ Detetive', title: cs.title, sub: cs.level, art: <div className="gh-suspects">{cs.suspects.map(x => <Person key={x.id} look={cast[x.id].look} mood="neutral" size={52} />)}</div> },
    !cs && mi && { to: `/jogos/missao/${mi.id}`, tag: '🗺️ Missão', title: mi.title, sub: mi.level, art: <Stage place={mi.place} cast={[mi.npc]} looks={cast} height={120} /> },
  ].filter(Boolean);

  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div className="gh">
        <h1 style={{ fontSize: 34, margin: '0 0 6px' }}>Jogos e histórias</h1>
        <p className="muted" style={{ fontSize: 16, lineHeight: 1.55, margin: '0 0 22px', maxWidth: 680 }}>
          Aprenda brincando com o que você já estudou. Os episódios novos liberam conforme você avança na trilha.
        </p>

        <section className="gh-sec">
          <div className="gh-sec-head"><h2>Para você agora</h2></div>
          <div className="gh-picks gh-row">
            {picks.map(p => (
              <Link key={p.to} to={p.to} className="gh-pick">
                <div className="gh-pick-art">{p.art}</div>
                <div className="gh-pick-body"><span className="gh-pick-tag">{p.tag}</span><b>{p.title}</b><span>{p.sub}</span></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="gh-sec">
          <div className="gh-sec-head"><h2>Jogos rápidos</h2><span className="muted">1 a 2 minutos</span></div>
          <div className="gh-grid quick gh-row">
            {QUICK.map(q => (
              <Link key={q.id} to={q.to} className="gh-quick">
                <span className="gh-quick-pic" aria-hidden="true">{q.pic}</span>
                <b>{q.title}</b>
                <span className="muted">{q.sub}</span>
                {getBest(user?.id, q.id) > 0 && <span className="gh-best"><Icon name="medal" size={15} />Recorde: {getBest(user?.id, q.id)}</span>}
              </Link>
            ))}
          </div>
        </section>

        <Section title={`🎙️ ${PODCAST_INFO.title}`} sub="Um episódio por unidade" about={PODCAST_INFO.about} items={PODCASTS} isOpen={open}
          render={(p) => (
            <Card key={p.id} to={`/jogos/podcast/${p.id}`} locked={!open(p)} unlock={p.unlock} done={played(prog.scores, p.id)}
              kicker={`Episódio ${PODCASTS.indexOf(p) + 1} · ${p.level}`} title={p.title}
              art={<Stage place="office" cast={hostsOf(p)} looks={cast} height={130} />}>
              <span className="gh-sub">{p.intro}</span>
            </Card>
          )} />

        <Section title={`📖 ${SERIES.title}`} sub="Série em episódios" about={SERIES.about} items={EPISODES} isOpen={open}
          render={(e) => (
            <Card key={e.id} to={`/jogos/episodio/${e.id}`} locked={!open(e)} unlock={e.unlock} done={played(prog.scores, e.id)}
              kicker={`Episódio ${EPISODES.indexOf(e) + 1} · ${e.level}`} title={e.title}
              art={<Stage place={e.scenes[0].place} cast={e.scenes[0].cast} looks={cast} height={130} />}>
              <span className="gh-sub">{e.intro}</span>
            </Card>
          )} />

        <Section title="🕵️ Detetive" sub="Leia as pistas e descubra o culpado" items={CASES} isOpen={open}
          render={(c) => (
            <Card key={c.id} to={`/jogos/detetive/${c.id}`} locked={!open(c)} unlock={c.unlock} done={played(prog.scores, c.id)}
              kicker={`Caso · ${c.level}`} title={c.title}
              art={<div className="gh-suspects">{c.suspects.map(s => <Person key={s.id} look={cast[s.id].look} mood="neutral" size={64} />)}<span className="gh-q">?</span></div>}>
              <span className="gh-sub">{c.question}</span>
            </Card>
          )} />

        <Section title="🗺️ Missões na cidade" sub="Situações reais de viagem" items={MISSIONS} isOpen={open}
          render={(m) => (
            <Card key={m.id} to={`/jogos/missao/${m.id}`} locked={!open(m)} unlock={m.unlock} done={played(prog.scores, m.id)}
              kicker={`Missão · ${m.level}`} title={m.title}
              art={<Stage place={m.place} cast={[m.npc]} looks={cast} height={130} />}>
              <span className="gh-sub">{m.goal}</span>
            </Card>
          )} />
        <p className="muted" style={{ fontSize: 13, marginTop: 24 }}>Ilustrações feitas para o Sacou English. Figuras dos jogos rápidos: emojis do seu aparelho.</p>
      </div>
    </Shell>
  );
}
