// Detetive: ouvir os suspeitos, ler as pistas (com uma pergunta de compreensão em cada) e acusar.
import { useMemo, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.js';
import { fx, speak, canSpeak } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { Spinner, Icon } from '../components/ui.jsx';
import { Stage, Person } from './art.jsx';
import { CASES, cast, unitDone, played, finishGame } from './lib.js';
import { GameTop, Finish, Line, Choices, Why } from './common.jsx';

export default function Detective() {
  const { id } = useParams();
  const c = CASES.find(x => x.id === id);
  const prog = useProgress();
  if (!c) return <Navigate to="/jogos" replace />;
  if (prog.loading) return <Spinner />;
  if (!unitDone(prog.done, c.unlock)) return <Navigate to="/jogos" replace />;
  return <Case c={c} first={!played(prog.scores, c.id)} />;
}

function Case({ c, first }) {
  const { user, setProfile } = useAuth();
  // fases: intro → suspeito 0..n → pista 0..m → acusar → fim
  const steps = useMemo(() => [{ k: 'intro' }, ...c.suspects.map((s, i) => ({ k: 'suspect', i })), ...c.clues.map((x, i) => ({ k: 'clue', i })), { k: 'accuse' }], [c]);
  const [at, setAt] = useState(0);
  const [picked, setPicked] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [solved, setSolved] = useState(false);
  const [result, setResult] = useState(null);
  const firstTry = useRef({ total: 0, ok: 0 });
  const st = steps[at];
  const opts = useMemo(() => (st.k === 'clue' ? shuffle(c.clues[st.i].check.options) : []), [st, c]);

  function next() {
    setPicked([]); setFeedback(null);
    const n = at + 1;
    setAt(n);
    const s = steps[n];
    if (s?.k === 'suspect' && canSpeak()) setTimeout(() => speak(c.suspects[s.i].en, { who: c.suspects[s.i].id }), 250);
    if (s?.k === 'clue' && canSpeak()) setTimeout(() => speak(c.clues[s.i].en), 250);
  }

  function answerClue(label) {
    const chk = c.clues[st.i].check;
    const ok = label === chk.answer;
    if (!picked.length) { firstTry.current.total++; if (ok) firstTry.current.ok++; }
    setPicked(p => [...p, label]);
    fx.play(ok ? 'correct' : 'wrong');
    setFeedback({ ok, text: ok ? chk.why : 'Leia a pista de novo. Se precisar, veja a tradução.' });
  }

  function accuse(id) {
    if (solved) return;
    if (id === c.answer) { fx.play('correct'); setSolved(true); return; }
    fx.play('wrong');
    setWrongGuesses(w => [...w, id]);
  }

  async function finish() {
    const { total, ok } = firstTry.current;
    const clueScore = total ? ok / total : 1;
    const score = Math.max(0, clueScore * 100 - wrongGuesses.length * 25);
    const xp = first ? (wrongGuesses.length ? 10 : 15) : 5;
    fx.play('complete');
    const r = await finishGame({ user, setProfile, id: c.id, score, xp });
    setResult({ xp, streak: r.streak, score: Math.round(score) });
  }

  if (result) {
    return <Finish title="Caso resolvido!" xp={result.xp} streak={result.streak}
      stats={[['Pistas entendidas de primeira', `${firstTry.current.ok}/${firstTry.current.total}`], ['Acusações erradas', wrongGuesses.length]]}
      message="Bom trabalho, detetive. Ler com atenção e comparar informações é exatamente o que as provas de inglês cobram." />;
  }

  const progress = (at / (steps.length - 1)) * 100;
  const sus = (id) => cast[id];
  let body, footer;

  if (st.k === 'intro') {
    body = (<>
      <span className="g-kicker">Detetive · {c.level}</span>
      <h1 className="g-title">{c.title}</h1>
      <Stage place={c.place} cast={c.suspects.map(s => s.id)} looks={cast} height={230} />
      <p className="g-intro">{c.intro}</p>
      <div className="g-case-q"><Icon name="search" size={20} />{c.question}</div>
    </>);
    footer = <button className="btn btn-violet btn-3d btn-lg cta" onClick={next} autoFocus>Começar a investigação</button>;
  } else if (st.k === 'suspect') {
    const s = c.suspects[st.i];
    body = (<>
      <span className="g-kicker">Suspeito {st.i + 1} de {c.suspects.length}</span>
      <div className="g-suspect">
        <Person look={sus(s.id).look} mood="neutral" size={120} title={sus(s.id).name} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <h2 style={{ margin: '0 0 8px' }}>{sus(s.id).name}</h2>
          <Line en={s.en} pt={s.pt} voice={s.id} big />
        </div>
      </div>
      <p className="muted" style={{ fontSize: 14 }}>Guarde bem o que cada um diz. Uma dessas histórias não bate com as pistas.</p>
    </>);
    footer = <button className="btn btn-violet btn-3d btn-lg cta" onClick={next} autoFocus>{st.i + 1 < c.suspects.length ? 'Próximo suspeito' : 'Ver as pistas'}</button>;
  } else if (st.k === 'clue') {
    const k = c.clues[st.i];
    body = (<>
      <span className="g-kicker">Pista {st.i + 1} de {c.clues.length}</span>
      <div className="g-clue"><Icon name="search" size={22} /><Line en={k.en} pt={k.pt} big /></div>
      <p className="q-label" style={{ marginTop: 18 }}>{k.check.q}</p>
      <Choices options={opts} answer={k.check.answer} picked={picked} locked={feedback?.ok} onAnswer={answerClue} />
      {feedback && <Why ok={feedback.ok} text={feedback.text} />}
    </>);
    footer = <button className="btn btn-violet btn-3d btn-lg cta" disabled={!feedback?.ok} onClick={next} autoFocus>Continuar</button>;
  } else {
    body = (<>
      <span className="g-kicker">Hora de acusar</span>
      <h1 className="g-title" style={{ fontSize: 28 }}>{c.question}</h1>
      <details className="g-notes">
        <summary>Rever depoimentos e pistas</summary>
        {c.suspects.map(s => <Line key={s.id} who={sus(s.id).name} voice={s.id} en={s.en} pt={s.pt} />)}
        {c.clues.map((k, i) => <Line key={i} who={`Pista ${i + 1}`} en={k.en} pt={k.pt} />)}
      </details>
      <div className="g-accuse">
        {c.suspects.map(s => {
          const wrong = wrongGuesses.includes(s.id), right = solved && s.id === c.answer;
          return (
            <button key={s.id} type="button" className={'g-acc' + (wrong ? ' bad' : '') + (right ? ' ok' : '')} disabled={wrong || solved} onClick={() => accuse(s.id)}>
              <Person look={sus(s.id).look} mood={right ? 'surprised' : wrong ? 'happy' : 'neutral'} size={80} />
              <b>{sus(s.id).name}</b>
            </button>
          );
        })}
      </div>
      {wrongGuesses.length > 0 && !solved && <Why ok={false} text={`Não foi ${sus(wrongGuesses[wrongGuesses.length - 1]).name}. Compare de novo o que cada um disse com as pistas.`} />}
      {solved && <Why ok title="Você descobriu!" text={c.solution} />}
    </>);
    footer = <button className="btn btn-violet btn-3d btn-lg cta" disabled={!solved} onClick={finish} autoFocus>Concluir o caso</button>;
  }

  return (
    <div className="lesson">
      <GameTop progress={progress} label={c.title} />
      <main className="lesson-main g-main" key={at}>{body}</main>
      <footer className={'bar' + (feedback?.ok || solved ? ' ok' : '')}><div className="bar-in"><span /> {footer}</div></footer>
    </div>
  );
}
