// Frase em pedaços: as peças vão descendo; monte a frase antes de chegarem ao chão.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.js';
import { fx, speak } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { Spinner, Icon } from '../components/ui.jsx';
import { sentences, getBest, setBest, finishGame } from './lib.js';
import { GameTop, Finish } from './common.jsx';

const ROUNDS = 8, LIVES = 3;
const norm = (w) => w.toLowerCase().replace(/[.,!?]/g, '');

export default function Falling() {
  const prog = useProgress();
  const [n, setN] = useState(0);
  if (prog.loading) return <Spinner />;
  return <Game key={n} done={prog.done} onAgain={() => setN(x => x + 1)} />;
}

function Game({ done, onAgain }) {
  const { user, setProfile } = useAuth();
  const list = useMemo(() => sentences(done).slice(0, ROUNDS), [done]);
  const [i, setI] = useState(-1);
  const [lives, setLives] = useState(LIVES);
  const [chosen, setChosen] = useState([]);
  const [shake, setShake] = useState(null);
  const [fall, setFall] = useState(0); // 0..1
  const [state, setState] = useState('play'); // play | won | lost
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(0);
  const [result, setResult] = useState(null);
  const s = list[i];
  const dur = Math.max(9, 24 - Math.max(0, i) * 2); // segundos para chegar ao chão
  const tiles = useMemo(() => {
    if (!s) return [];
    const words = s.answer.split(' ');
    const extras = shuffle(list.filter(x => x !== s).flatMap(x => x.answer.split(' ')).filter(w => !words.map(norm).includes(norm(w)))).slice(0, 2);
    return shuffle([...words, ...extras].map((w, k) => ({ w, k })));
  }, [s]);
  const start = useRef(0);
  const well = useRef(null), pile = useRef(null);
  const room = well.current && pile.current ? Math.max(0, well.current.clientHeight - pile.current.offsetHeight - 14) : 200;

  useEffect(() => {
    if (!s || state !== 'play') return;
    start.current = performance.now() - fall * dur * 1000;
    let raf;
    const tick = (t) => {
      const f = (t - start.current) / (dur * 1000);
      if (f >= 1) { setFall(1); lose(); return; }
      setFall(f); raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [i, state]);

  function lose() {
    fx.play('wrong'); setState('lost'); setLives(l => l - 1);
    speak(s.display);
  }

  function tap(t) {
    if (state !== 'play') return;
    const words = s.answer.split(' ');
    const want = words[chosen.length];
    if (norm(t.w) === norm(want) && !chosen.some(c => c.k === t.k)) {
      const nc = [...chosen, t];
      setChosen(nc); fx.play('click');
      if (nc.length === words.length) {
        fx.play('correct'); speak(s.display);
        setScore(x => x + 20 + Math.round((1 - fall) * 30));
        setSolved(x => x + 1);
        setState('won');
      }
    } else {
      setShake(t.k); fx.play('wrong');
      start.current -= dur * 1000 * 0.08; // errar acelera a queda
      setTimeout(() => setShake(null), 350);
    }
  }

  function next() {
    const over = lives <= 0 || i + 1 >= list.length;
    if (over) { end(); return; }
    setI(x => x + 1); setChosen([]); setFall(0); setState('play');
  }

  async function end() {
    setI(ROUNDS + 1);
    fx.play('complete');
    const record = setBest(user?.id, 'frases', score);
    const xp = solved >= 6 ? 10 : solved >= 3 ? 8 : 5;
    const r = await finishGame({ user, setProfile, id: 'frases', score: (solved / list.length) * 100, xp });
    setResult({ xp, streak: r.streak, record });
  }

  if (list.length < 3) return <div className="center-page"><p>Faça algumas lições para liberar este jogo.</p><Link to="/jogos" className="btn btn-violet">Voltar</Link></div>;

  if (i > ROUNDS) {
    if (!result) return <Spinner />;
    return <Finish title={lives > 0 ? 'Muito bem!' : 'Fim de jogo'} xp={result.xp} streak={result.streak} record={result.record} onAgain={onAgain}
      stats={[['Frases montadas', `${solved}/${list.length}`], ['Pontos', score], ['Recorde', Math.max(score, getBest(user?.id, 'frases'))]]}
      message="Montar frases rápido treina a ordem das palavras em inglês até ela virar automática." />;
  }

  if (i < 0) {
    return (
      <div className="lesson">
        <GameTop progress={0} label="Frase em pedaços" />
        <main className="lesson-main g-main"><div className="g-ready">
          <h1 className="g-title">Frase em pedaços</h1>
          <p className="g-intro">As peças da frase vão descendo. Toque nas palavras na ordem certa antes que elas cheguem ao chão. Cuidado: tem palavra sobrando, e errar acelera a queda. Você tem {LIVES} vidas.</p>
          <button className="btn btn-violet btn-3d btn-lg" onClick={() => setI(0)} autoFocus>Começar</button>
        </div></main>
      </div>
    );
  }

  return (
    <div className="lesson">
      <GameTop progress={(i / list.length) * 100} label="Frase em pedaços"
        right={<span className="fa-lives" aria-label={`${lives} vidas`}>{Array.from({ length: LIVES }, (_, k) => <svg key={k} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-7.5-10.4A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.7c0 5.8-7.5 10.4-7.5 10.4z" fill={k < lives ? '#EF4444' : 'var(--line2)'} /></svg>)}</span>} />
      <main className="lesson-main g-main">
        <p className="q-label">Monte em inglês · {score} pts</p>
        <h1 className="q" style={{ marginBottom: 12 }}>{s.pt}</h1>
        <div className="build-line" aria-live="polite">{chosen.map(t => <span key={t.k} className="tile" lang="en">{t.w}</span>)}</div>
        <div className="fa-well" ref={well}>
          <div className="fa-tiles" ref={pile} style={{ transform: `translateY(${fall * room}px)` }}>
            {tiles.map(t => {
              const used = chosen.some(c => c.k === t.k);
              return <button key={t.k} type="button" lang="en" className={'tile' + (used ? ' used' : '') + (shake === t.k ? ' fa-shake' : '')} disabled={used || state !== 'play'} onClick={() => tap(t)}>{t.w}</button>;
            })}
          </div>
          <div className="fa-floor" />
        </div>
      </main>
      {state !== 'play' && (
        <footer className={'bar ' + (state === 'won' ? 'ok' : 'bad')}>
          <div className="bar-in">
            <div className="fb"><div>
              <h3 style={{ color: state === 'won' ? 'var(--ok-d)' : 'var(--bad-d)' }}>{state === 'won' ? 'Montou!' : 'As peças chegaram ao chão.'}</h3>
              <p lang="en">{s.display}</p>
            </div></div>
            <button className="btn btn-3d btn-lg cta" style={{ background: state === 'won' ? 'var(--ok)' : 'var(--bad)', color: '#fff' }} onClick={next} autoFocus>
              {lives <= 0 || i + 1 >= list.length ? 'Ver resultado' : 'Próxima frase'}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
