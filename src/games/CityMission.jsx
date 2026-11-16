// Missão na cidade: uma sequência de situações reais em que você escolhe o que responder.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.js';
import { fx, speak, canSpeak } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { Spinner, Icon } from '../components/ui.jsx';
import { Stage } from './art.jsx';
import { MISSIONS, cast, unitDone, played, finishGame } from './lib.js';
import { GameTop, Finish, Line, Choices, Why } from './common.jsx';

export default function CityMission() {
  const { id } = useParams();
  const m = MISSIONS.find(x => x.id === id);
  const prog = useProgress();
  if (!m) return <Navigate to="/jogos" replace />;
  if (prog.loading) return <Spinner />;
  if (!unitDone(prog.done, m.unlock)) return <Navigate to="/jogos" replace />;
  return <Mission m={m} first={!played(prog.scores, m.id)} />;
}

function Mission({ m, first }) {
  const { user, setProfile } = useAuth();
  const [i, setI] = useState(-1);
  const [picked, setPicked] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const okFirst = useRef(0);
  const s = m.steps[i];
  const opts = useMemo(() => (s ? shuffle(s.options) : []), [s]);
  const npc = cast[m.npc];

  useEffect(() => { if (s && canSpeak()) { const t = setTimeout(() => speak(s.en), 250); return () => clearTimeout(t); } }, [s]);

  function answer(label) {
    const ok = label === s.answer;
    if (!picked.length && ok) okFirst.current++;
    setPicked(p => [...p, label]);
    fx.play(ok ? 'correct' : 'wrong');
    if (ok) speak(label);
    setFeedback({ ok, text: ok ? s.why : 'Essa resposta não combina com a situação. Tente outra.' });
  }

  async function next() {
    setPicked([]); setFeedback(null);
    if (i + 1 < m.steps.length) { setI(i + 1); return; }
    const score = (okFirst.current / m.steps.length) * 100;
    const xp = first ? 10 : 5;
    fx.play('complete');
    const r = await finishGame({ user, setProfile, id: m.id, score, xp });
    setResult({ xp, streak: r.streak });
  }

  if (result) {
    return <Finish title="Missão cumprida!" xp={result.xp} streak={result.streak}
      stats={[['Respostas certas de primeira', `${okFirst.current}/${m.steps.length}`]]}
      message="Essas são frases que você vai usar de verdade numa viagem. Repita em voz alta para fixar." />;
  }

  if (i < 0) {
    return (
      <div className="lesson">
        <GameTop progress={0} label={m.title} />
        <main className="lesson-main g-main">
          <span className="g-kicker">Missão na cidade · {m.level}</span>
          <h1 className="g-title">{m.title}</h1>
          <Stage place={m.place} cast={[m.npc]} looks={cast} height={230} />
          <div className="g-case-q"><Icon name="target" size={20} />Sua missão: {m.goal}</div>
          <p className="muted" style={{ fontSize: 14 }}>Você é quem responde. Escolha o que diria em cada situação.</p>
        </main>
        <footer className="bar"><div className="bar-in"><span /><button className="btn btn-violet btn-3d btn-lg cta" onClick={() => setI(0)} autoFocus>Começar</button></div></footer>
      </div>
    );
  }

  return (
    <div className="lesson">
      <GameTop progress={(i / m.steps.length) * 100} label={m.title} right={<span style={{ fontWeight: 700, color: 'var(--violet-dd)', fontSize: 15 }}>{i + 1}/{m.steps.length}</span>} />
      <main className="lesson-main g-main" key={i}>
        <Stage place={m.place} cast={[m.npc]} looks={cast} speaking={feedback?.ok ? null : m.npc} height={200} />
        <Line who={npc.name} en={s.en} pt={s.pt} big />
        <p className="q-label" style={{ marginTop: 14 }}>O que você responde?</p>
        <Choices options={opts} answer={s.answer} english picked={picked} locked={feedback?.ok} onAnswer={answer} />
        {feedback && <Why ok={feedback.ok} text={feedback.text} />}
      </main>
      <footer className={'bar' + (feedback?.ok ? ' ok' : '')}>
        <div className="bar-in"><span className="muted" style={{ fontSize: 15 }}>{m.goal}</span>
          <button className="btn btn-violet btn-3d btn-lg cta" disabled={!feedback?.ok} onClick={next} autoFocus>Continuar</button></div>
      </footer>
    </div>
  );
}
