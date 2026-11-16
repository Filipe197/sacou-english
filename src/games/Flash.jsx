// Palavra Relâmpago: ligar inglês e português contra o relógio, com combo.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.js';
import { fx, speak } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { Spinner, Icon } from '../components/ui.jsx';
import { wordPairs, getBest, setBest, finishGame } from './lib.js';
import { GameTop, Finish } from './common.jsx';

const TIME = 60, SLOTS = 5;

export default function Flash() {
  const prog = useProgress();
  const [round, setRound] = useState(0);
  if (prog.loading) return <Spinner />;
  return <Game key={round} done={prog.done} onAgain={() => setRound(r => r + 1)} />;
}

function Game({ done, onAgain }) {
  const { user, setProfile } = useAuth();
  const pool = useMemo(() => wordPairs(done), [done]);
  const next = useRef(SLOTS);
  const [left, setLeft] = useState(() => pool.slice(0, SLOTS).map((p, i) => ({ ...p, k: i })));
  const [right, setRight] = useState(() => shuffle(pool.slice(0, SLOTS).map((p, i) => ({ ...p, k: i }))));
  const [sel, setSel] = useState(null); // { side, k }
  const [flash, setFlash] = useState(null); // { k, ok }
  const [state, setState] = useState('ready'); // ready | play | end
  const [time, setTime] = useState(TIME);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [matches, setMatches] = useState(0);
  const [miss, setMiss] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (state !== 'play') return;
    const t = setInterval(() => setTime(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [state]);
  useEffect(() => { if (state === 'play' && time <= 0) end(); }, [time, state]);

  function refill(k) {
    const p = pool[next.current % pool.length]; next.current++;
    const nk = next.current + 1000;
    const item = { ...p, k: nk };
    setLeft(l => l.map(x => (x.k === k ? item : x)));
    setRight(r => r.map(x => (x.k === k ? item : x)));
  }

  function tap(side, k, en) {
    if (state !== 'play') return;
    if (side === 'en') speak(en);
    if (!sel || sel.side === side) { setSel({ side, k }); return; }
    if (sel.k === k) {
      const c = Math.min(combo + 1, 5);
      setCombo(c); setScore(s => s + 10 * c); setMatches(m => m + 1);
      fx.play('correct'); setFlash({ k, ok: true });
      setTimeout(() => { refill(k); setFlash(null); }, 260);
    } else {
      setCombo(0); setMiss(m => m + 1); fx.play('wrong');
      setFlash({ ok: false, [sel.side]: sel.k, [side]: k }); setTimeout(() => setFlash(null), 380);
    }
    setSel(null);
  }

  async function end() {
    setState('end');
    fx.play('complete');
    const record = setBest(user?.id, 'relampago', score);
    const xp = Math.min(10, 5 + Math.floor(matches / 5));
    const acc = matches + miss ? (matches / (matches + miss)) * 100 : 0;
    const r = await finishGame({ user, setProfile, id: 'relampago', score: acc, xp });
    setResult({ xp, streak: r.streak, record });
  }

  if (pool.length < SLOTS) return <div className="center-page"><p>Faça algumas lições para liberar este jogo.</p><Link to="/jogos" className="btn btn-violet">Voltar</Link></div>;

  if (state === 'end') {
    if (!result) return <Spinner />;
    return <Finish title="Tempo esgotado!" xp={result.xp} streak={result.streak} record={result.record} onAgain={onAgain}
      stats={[['Pontos', score], ['Pares', matches], ['Recorde', Math.max(score, getBest(user?.id, 'relampago'))]]}
      message={miss ? `Você trocou ${miss} ${miss === 1 ? 'par' : 'pares'}. Errar faz parte: o combo volta rapidinho.` : 'Nenhum par trocado. Impressionante!'} />;
  }

  const cls = (side, x) => {
    let c = 'fl-card';
    if (sel?.side === side && sel.k === x.k) c += ' sel';
    if (flash?.ok && flash.k === x.k) c += ' ok';
    if (flash && !flash.ok && flash[side] === x.k) c += ' bad';
    return c;
  };

  return (
    <div className="lesson">
      <GameTop progress={((TIME - time) / TIME) * 100} label="Tempo"
        right={<span className={'fl-time' + (time <= 10 ? ' low' : '')}><Icon name="clock" size={18} />{Math.max(0, time)}s</span>} />
      <main className="lesson-main g-main">
        <div className="fl-head">
          <div><span className="muted">Pontos</span><b>{score}</b></div>
          <div className={'fl-combo' + (combo > 1 ? ' on' : '')}><span className="muted">Combo</span><b>x{Math.max(1, combo)}</b></div>
          <div><span className="muted">Recorde</span><b>{getBest(user?.id, 'relampago')}</b></div>
        </div>
        {state === 'ready' ? (
          <div className="g-ready">
            <h1 className="g-title">Palavra Relâmpago</h1>
            <p className="g-intro">Ligue cada palavra em inglês à tradução. São {TIME} segundos. Acertos seguidos aumentam o combo e valem mais pontos.</p>
            <button className="btn btn-violet btn-3d btn-lg" onClick={() => setState('play')} autoFocus>Valendo!</button>
          </div>
        ) : (
          <div className="fl-board">
            <div className="fl-col">{left.map(x => <button key={x.k} type="button" lang="en" className={cls('en', x)} onClick={() => tap('en', x.k, x.en)}>{x.en}</button>)}</div>
            <div className="fl-col">{right.map(x => <button key={x.k} type="button" className={cls('pt', x)} onClick={() => tap('pt', x.k)}>{x.pt}</button>)}</div>
          </div>
        )}
      </main>
    </div>
  );
}
