// Ouviu, tocou: escuta uma palavra e toca na figura certa.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../lib/auth.jsx';
import { fx, speak, canSpeak } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { Icon } from '../components/ui.jsx';
import { PICTURES, getBest, setBest, finishGame } from './lib.js';
import { GameTop, Finish } from './common.jsx';

const ROUNDS = 10;

export default function Listen() {
  const [n, setN] = useState(0);
  return <Game key={n} onAgain={() => setN(x => x + 1)} />;
}

function Game({ onAgain }) {
  const { user, setProfile } = useAuth();
  const rounds = useMemo(() => shuffle(PICTURES).slice(0, ROUNDS).map(target => ({
    target, options: shuffle([target, ...shuffle(PICTURES.filter(p => p.en !== target.en)).slice(0, 3)]),
  })), []);
  const [i, setI] = useState(-1);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [result, setResult] = useState(null);
  const shownAt = useRef(0);
  const voice = canSpeak();
  const r = rounds[i];

  useEffect(() => {
    if (!r) return;
    shownAt.current = Date.now();
    if (voice) { const t = setTimeout(() => speak(r.target.en), 300); return () => clearTimeout(t); }
  }, [i]);

  function pick(o) {
    if (picked) return;
    const ok = o.en === r.target.en;
    setPicked(o.en);
    fx.play(ok ? 'correct' : 'wrong');
    if (ok) {
      const secs = (Date.now() - shownAt.current) / 1000;
      setScore(s => s + 10 + Math.max(0, Math.round(10 - secs * 2))); // rapidez vale bônus
      setHits(h => h + 1);
    }
    setTimeout(() => advance(), ok ? 900 : 1700);
  }

  async function advance() {
    setPicked(null);
    if (i + 1 < ROUNDS) { setI(x => x + 1); return; }
    setI(ROUNDS);
  }

  useEffect(() => {
    if (i !== ROUNDS) return;
    (async () => {
      fx.play('complete');
      const record = setBest(user?.id, 'ouvir', score);
      const xp = hits >= 9 ? 10 : hits >= 6 ? 8 : 5;
      const res = await finishGame({ user, setProfile, id: 'ouvir', score: (hits / ROUNDS) * 100, xp });
      setResult({ xp, streak: res.streak, record });
    })();
  }, [i]);

  if (i === ROUNDS) {
    if (!result) return null;
    return <Finish title={hits >= 8 ? 'Ouvido afiado!' : 'Bom treino!'} xp={result.xp} streak={result.streak} record={result.record} onAgain={onAgain}
      stats={[['Acertos', `${hits}/${ROUNDS}`], ['Pontos', score], ['Recorde', Math.max(score, getBest(user?.id, 'ouvir'))]]}
      message="Treinar o ouvido com palavras soltas ajuda a reconhecê-las depois no meio das frases." />;
  }

  if (i < 0) {
    return (
      <div className="lesson">
        <GameTop progress={0} label="Ouviu, tocou" />
        <main className="lesson-main g-main"><div className="g-ready">
          <h1 className="g-title">Ouviu, tocou</h1>
          <p className="g-intro">{voice ? 'Você vai ouvir uma palavra em inglês. Toque na figura certa. Quanto mais rápido, mais pontos.' : 'Seu navegador não tem voz, então a palavra vai aparecer escrita. Toque na figura certa.'} São {ROUNDS} rodadas.</p>
          <button className="btn btn-violet btn-3d btn-lg" onClick={() => setI(0)} autoFocus>Começar</button>
        </div></main>
      </div>
    );
  }

  return (
    <div className="lesson">
      <GameTop progress={(i / ROUNDS) * 100} label="Ouviu, tocou" right={<span style={{ fontWeight: 700, color: 'var(--violet-dd)' }}>{score} pts</span>} />
      <main className="lesson-main g-main">
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', marginBottom: 20 }}>
          {voice && <button type="button" className="audio-btn big" aria-label="Ouvir de novo" onClick={() => speak(r.target.en)}><Icon name="sound" size={40} color="#fff" stroke={2.2} /></button>}
          {voice && <button type="button" className="audio-btn slow" aria-label="Ouvir devagar" onClick={() => speak(r.target.en, { slow: true })}><Icon name="turtle" size={22} color="var(--violet)" /></button>}
          {(!voice || picked) && <h1 className="q" lang="en" style={{ margin: 0 }}>{r.target.en}</h1>}
        </div>
        <div className="ls-grid">
          {r.options.map(o => {
            const st = picked ? (o.en === r.target.en ? ' ok' : o.en === picked ? ' bad' : ' dim') : '';
            return (
              <button key={o.en} type="button" className={'ls-card' + st} onClick={() => pick(o)} aria-label={picked ? `${o.en}: ${o.pt}` : `Figura ${r.options.indexOf(o) + 1}`}>
                <span className="ls-pic" aria-hidden="true">{o.pic}</span>
                {picked && <span className="ls-cap"><b lang="en">{o.en}</b> {o.pt}</span>}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
