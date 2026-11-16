// Página "Jogos e histórias": episódios, detetive, missões na cidade e jogos rápidos.
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

export default function Hub() {
  const { user } = useAuth();
  const prog = useProgress();
  if (prog.loading) return <Spinner />;
  const open = (x) => unitDone(prog.done, x.unlock);

  const quick = [
    { to: '/jogos/relampago', id: 'relampago', title: 'Palavra Relâmpago', sub: 'Ligue palavras e traduções em 60 segundos. Acertos seguidos multiplicam os pontos.', pic: '⚡' },
    { to: '/jogos/ouvir', id: 'ouvir', title: 'Ouviu, tocou', sub: 'Escute a palavra e toque na figura certa. Ótimo para treinar o ouvido.', pic: '👂' },
    { to: '/jogos/frases', id: 'frases', title: 'Frase em pedaços', sub: 'Monte a frase antes que as peças cheguem ao chão.', pic: '🧩' },
  ];

  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div className="gh">
        <h1 style={{ fontSize: 36, margin: '0 0 8px' }}>Jogos e histórias</h1>
        <p className="muted" style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 28px', maxWidth: 680 }}>
          Aprenda brincando com o que você já estudou. Os episódios e casos novos liberam conforme você avança na trilha, e todo o inglês segue o nível de cada unidade. Cada jogo vale XP e conta para a sua sequência.
        </p>

        <section className="gh-sec">
          <div className="gh-sec-head"><h2>Jogos rápidos</h2><span className="muted">1 a 2 minutos</span></div>
          <div className="gh-grid quick">
            {quick.map(q => (
              <Link key={q.id} to={q.to} className="gh-quick">
                <span className="gh-quick-pic" aria-hidden="true">{q.pic}</span>
                <b>{q.title}</b>
                <span className="muted">{q.sub}</span>
                {getBest(user?.id, q.id) > 0 && <span className="gh-best"><Icon name="medal" size={15} />Recorde: {getBest(user?.id, q.id)}</span>}
              </Link>
            ))}
          </div>
        </section>

        <section className="gh-sec">
          <div className="gh-sec-head"><h2>🎙️ {PODCAST_INFO.title}</h2><span className="muted">Um episódio por unidade, cerca de 1 minuto</span></div>
          <p className="muted" style={{ margin: '-6px 0 14px' }}>{PODCAST_INFO.about}</p>
          <div className="gh-grid">
            {PODCASTS.map((p, i) => (
              <Card key={p.id} to={`/jogos/podcast/${p.id}`} locked={!open(p)} unlock={p.unlock} done={played(prog.scores, p.id)}
                kicker={`Episódio ${i + 1} · ${p.level}`} title={p.title}
                art={<Stage place="office" cast={[...new Set(p.lines.map(l => l.who))]} looks={cast} height={130} />}>
                <span className="gh-sub">{p.intro}</span>
              </Card>
            ))}
          </div>
        </section>

        <section className="gh-sec">
          <div className="gh-sec-head"><h2>{SERIES.title}</h2><span className="muted">Série em episódios</span></div>
          <p className="muted" style={{ margin: '-6px 0 14px' }}>{SERIES.about}</p>
          <div className="gh-grid">
            {EPISODES.map((e, i) => (
              <Card key={e.id} to={`/jogos/episodio/${e.id}`} locked={!open(e)} unlock={e.unlock} done={played(prog.scores, e.id)}
                kicker={`Episódio ${i + 1} · ${e.level}`} title={e.title}
                art={<Stage place={e.scenes[0].place} cast={e.scenes[0].cast} looks={cast} height={130} />}>
                <span className="gh-sub">{e.intro}</span>
              </Card>
            ))}
          </div>
        </section>

        <section className="gh-sec">
          <div className="gh-sec-head"><h2>Detetive</h2><span className="muted">Leia as pistas e descubra o culpado</span></div>
          <div className="gh-grid">
            {CASES.map(c => (
              <Card key={c.id} to={`/jogos/detetive/${c.id}`} locked={!open(c)} unlock={c.unlock} done={played(prog.scores, c.id)}
                kicker={`Caso · ${c.level}`} title={c.title}
                art={<div className="gh-suspects">{c.suspects.map(s => <Person key={s.id} look={cast[s.id].look} mood="neutral" size={64} />)}<span className="gh-q">?</span></div>}>
                <span className="gh-sub">{c.question}</span>
              </Card>
            ))}
          </div>
        </section>

        <section className="gh-sec">
          <div className="gh-sec-head"><h2>Missões na cidade</h2><span className="muted">Situações reais de viagem</span></div>
          <div className="gh-grid">
            {MISSIONS.map(m => (
              <Card key={m.id} to={`/jogos/missao/${m.id}`} locked={!open(m)} unlock={m.unlock} done={played(prog.scores, m.id)}
                kicker={`Missão · ${m.level}`} title={m.title}
                art={<Stage place={m.place} cast={[m.npc]} looks={cast} height={130} />}>
                <span className="gh-sub">{m.goal}</span>
              </Card>
            ))}
          </div>
        </section>
        <p className="muted" style={{ fontSize: 13, marginTop: 24 }}>Ilustrações feitas para o Sacou English. Figuras dos jogos rápidos: emojis do seu aparelho.</p>
      </div>
    </Shell>
  );
}
