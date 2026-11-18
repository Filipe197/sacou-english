// Episódios ilustrados: cena + falas com áudio, perguntas no meio e escolhas que mudam a história.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.js';
import { fx, speakAsync, canSpeak } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { Spinner } from '../components/ui.jsx';
import { Stage } from './art.jsx';
import { EPISODES, cast, unitDone, played, finishGame } from './lib.js';
import { GameTop, Finish, Line, Choices, Why } from './common.jsx';

export default function Episode() {
  const { id } = useParams();
  const ep = EPISODES.find(e => e.id === id);
  const prog = useProgress();
  if (!ep) return <Navigate to="/jogos" replace />;
  if (prog.loading) return <Spinner />;
  if (!unitDone(prog.done, ep.unlock)) return <Navigate to="/jogos" replace />;
  return <Player ep={ep} first={!played(prog.scores, ep.id)} />;
}

const isLine = (s) => !s.ask && !s.pick && !s.branch;

function Player({ ep, first }) {
  const { user, setProfile } = useAuth();
  const [sceneIdx, setSceneIdx] = useState(-1); // -1 = abertura
  const [queue, setQueue] = useState([]);
  const [pos, setPos] = useState(0);
  const [log, setLog] = useState([]); // falas já mostradas na cena
  const [picked, setPicked] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const attemptId = useRef(null);
  if (!attemptId.current) attemptId.current = crypto.randomUUID();
  const stats = useRef({ total: 0, first: 0 });
  const logEnd = useRef(null);

  const scene = ep.scenes[sceneIdx];
  const step = queue[pos];
  const totalSteps = useMemo(() => ep.scenes.reduce((n, s) => n + s.steps.length, 0), [ep]);
  const doneSteps = ep.scenes.slice(0, Math.max(0, sceneIdx)).reduce((n, s) => n + s.steps.length, 0) + Math.min(pos, scene?.steps.length || 0);

  function startScene(i) {
    setSceneIdx(i); setQueue(ep.scenes[i].steps); setPos(0); setLog([]); setPicked([]); setFeedback(null);
  }

  // fala a linha atual
  const lastSaid = useRef(null);
  useEffect(() => {
    if (step && isLine(step) && lastSaid.current !== step) {
      lastSaid.current = step;
      setLog(l => [...l, step]);
      if (canSpeak()) speakAsync(step.en, { who: step.who });
    }
  }, [step]);
  useEffect(() => { logEnd.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [log.length, feedback]);

  const options = useMemo(() => (step?.options ? (step.branch ? step.options : shuffle(step.options)) : []), [step]);

  function next() {
    setPicked([]); setFeedback(null);
    if (pos + 1 < queue.length) { setPos(p => p + 1); return; }
    if (sceneIdx + 1 < ep.scenes.length) startScene(sceneIdx + 1);
    else finish();
  }

  function answer(label, o) {
    if (feedback?.ok) return;
    if (step.branch) {
      stats.current.total++; stats.current.first++;
      fx.play('click');
      // a fala escolhida entra no lugar da escolha, seguida do que acontece depois
      setQueue(q => [...q.slice(0, pos), { who: step.who, en: o.en, pt: o.pt }, ...(o.then || []), ...q.slice(pos + 1)]);
      return;
    }
    const ok = label === step.answer;
    if (!picked.length) { stats.current.total++; if (ok) stats.current.first++; }
    setPicked(p => [...p, label]);
    fx.play(ok ? 'correct' : 'wrong');
    setFeedback({ ok, text: ok ? step.why : 'Leia de novo e tente outra opção.' });
    if (ok && step.pick) {
      const line = { who: step.who, en: step.answer, pt: step.pt };
      setLog(l => [...l, line]);
      if (canSpeak()) speakAsync(step.answer, { who: step.who });
    }
  }

  async function finish() {
    const { total, first: f } = stats.current;
    const score = total ? (f / total) * 100 : 100;
    const xp = first ? 15 : 5;
    fx.play('complete');
    const r = await finishGame({ user, setProfile, attemptId: attemptId.current, id: ep.id, score, xp });
    setResult({ score: Math.round(score), ...r });
  }

  if (result) {
    const nextEp = EPISODES[EPISODES.indexOf(ep) + 1];
    return (
      <Finish outcome={result} title={`Fim do episódio: ${ep.title}`} xp={result.xp} streak={result.streak}
        stats={[['Acertos de primeira', `${result.score}%`]]}
        message={nextEp ? `O próximo episódio, "${nextEp.title}", libera quando você terminar a unidade indicada na página de jogos.` : 'Você chegou ao fim da temporada! Novos episódios vão chegar junto com os próximos níveis.'} />
    );
  }

  const looks = cast;
  // abertura
  if (sceneIdx < 0) {
    return (
      <div className="lesson">
        <GameTop progress={0} label={ep.title} />
        <main className="lesson-main g-main">
          <span className="g-kicker">Ana em Londres · Episódio {EPISODES.indexOf(ep) + 1} · {ep.level}</span>
          <h1 className="g-title">{ep.title}</h1>
          <Stage place={ep.scenes[0].place} cast={ep.scenes[0].cast} looks={looks} height={240} />
          <p className="g-intro">{ep.intro}</p>
          <p className="muted" style={{ fontSize: 14 }}>Toque no alto-falante para ouvir de novo e em "Ver tradução" se travar. As escolhas mudam o que acontece.</p>
        </main>
        <footer className="bar"><div className="bar-in"><span /><button className="btn btn-violet btn-3d btn-lg cta" onClick={() => startScene(0)} autoFocus>Começar</button></div></footer>
      </div>
    );
  }

  const speaking = step && isLine(step) ? step.who : step?.pick || step?.branch ? step.who : null;
  const waiting = step && !isLine(step) && !feedback?.ok;
  return (
    <div className="lesson">
      <GameTop progress={(doneSteps / totalSteps) * 100} label={ep.title} />
      <main className="lesson-main g-main">
        <Stage place={scene.place} cast={scene.cast} looks={looks} speaking={speaking} height={220} />
        <div className="g-log" aria-live="polite">
          {log.map((l, i) => <Line key={i} en={l.en} pt={l.pt} who={looks[l.who]?.name} voice={l.who} big={i === log.length - 1} />)}
          {step?.ask && <p className="q-label" style={{ marginTop: 8 }}>Pergunta: {step.ask}</p>}
          {step?.pick && <p className="q-label" style={{ marginTop: 8 }}>{step.pick} <span className="muted">({looks[step.who]?.name} fala)</span></p>}
          {step?.branch && <p className="q-label" style={{ marginTop: 8 }}>{step.branch} <span className="muted">Você decide!</span></p>}
          {step && !isLine(step) && <Choices options={options} answer={step.branch ? null : step.answer} english={!step.ask} picked={picked} locked={feedback?.ok} onAnswer={answer} />}
          {feedback && <Why ok={feedback.ok} text={feedback.text} />}
          <div ref={logEnd} />
        </div>
      </main>
      <footer className={'bar' + (feedback?.ok ? ' ok' : '')}>
        <div className="bar-in">
          <span className="muted" style={{ fontSize: 15 }}>{waiting ? 'Escolha uma opção.' : `Cena ${sceneIdx + 1} de ${ep.scenes.length}`}</span>
          <button className="btn btn-violet btn-3d btn-lg cta" disabled={waiting} onClick={next} autoFocus>Continuar</button>
        </div>
      </footer>
    </div>
  );
}
