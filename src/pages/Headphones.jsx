// Modo fone de ouvido (shadowing): o app fala a frase, o aluno repete em voz alta
// e ouve na hora se acertou. Dá para fazer andando, sem olhar a tela.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LESSONS, shuffle } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { finishSession } from '../lib/finish-session.js';
import DailyCelebration, { BoostTimer } from '../components/DailyCelebration.jsx';
import { speakAsync, fx, canSpeak } from '../lib/fx.js';
import { alignSpeech } from '../lib/pronounce.js';
import { useListen, getSR, PronWords } from '../components/Pronounce.jsx';
import { Shell, Spinner, Icon } from '../components/ui.jsx';

const SESSION = 10;
const wait = (ms) => new Promise(r => setTimeout(r, ms));

// Frases das lições já feitas, com tradução, de 2 a 9 palavras
function phrasePool(done) {
  const ls = LESSONS.filter(l => done.has(l.id));
  const src = ls.length ? ls : LESSONS.slice(0, 7);
  const seen = new Set(); const out = [];
  for (const l of src) for (const it of l.items) {
    let en = null, pt = null;
    if (it.type === 'speak') { en = it.en; pt = it.pt; }
    else if ((it.type === 'meaning' || it.type === 'listen') && it.en) { en = it.en; pt = it.answer; }
    else if (it.type === 'build' || it.type === 'type') { en = it.display || it.answer; pt = it.pt; }
    if (!en || !pt) continue;
    const n = en.split(/\s+/).length;
    const key = en.toLowerCase();
    if (n < 2 || n > 9 || seen.has(key)) continue;
    seen.add(key); out.push({ en, pt, recent: ls.indexOf(l) });
  }
  // as das lições mais recentes aparecem mais
  return shuffle(out.sort((a, b) => b.recent - a.recent).slice(0, 40));
}

export default function Headphones() {
  const prog = useProgress();
  const [on, setOn] = useState(false);
  const pool = useMemo(() => phrasePool(prog.done), [prog.done]);
  if (prog.loading) return <Spinner />;
  if (on) return <Session pool={pool} onExit={() => setOn(false)} />;
  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, margin: '0 0 8px' }}>Modo fone</h1>
        <p className="muted" style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 24px' }}>
          Coloque o fone e pratique sem olhar a tela: o app fala uma frase em inglês, você repete em voz alta e ouve na hora se acertou.
          É a técnica do <b>shadowing</b>, uma das mais eficientes para destravar a pronúncia e o ouvido.
        </p>
        <div className="card hp-card">
          <span className="hp-ic"><Icon name="headphones" size={40} color="#fff" /></span>
          <div style={{ flex: 1, minWidth: 220 }}>
            <b style={{ fontSize: 20 }}>{SESSION} frases · uns 4 minutos</b>
            <p className="muted" style={{ margin: '4px 0 0', fontSize: 15 }}>Frases das lições que você já fez. Pode andar, lavar a louça ou estar no ônibus.</p>
          </div>
          <button className="btn btn-lime btn-lg btn-3d" onClick={() => setOn(true)} disabled={!pool.length || !canSpeak()}>Começar</button>
        </div>
        <ul className="hp-tips">
          <li>Deixe a tela ligada (o app tenta manter acesa sozinho).</li>
          <li>Repita logo depois do sinal, no mesmo ritmo e entonação.</li>
          <li>Errou? Ele repete a frase devagar e você tenta de novo.</li>
        </ul>
        {!getSR() && <p className="note">Seu navegador não reconhece fala, então o modo fone vai só falar as frases e esperar você repetir, sem correção. Para a correção, use o Chrome.</p>}
      </div>
    </Shell>
  );
}

function Session({ pool, onExit }) {
  const { user, profile, setProfile } = useAuth();
  const attemptId = useRef(null);
  if (!attemptId.current) attemptId.current = crypto.randomUUID();
  const [result, setResult] = useState(null);
  const [celebrated, setCelebrated] = useState(false);
  const nav = useNavigate();
  const list = useMemo(() => pool.slice(0, SESSION), [pool]);
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState('ready'); // ready | speak | listen | ok | miss | end
  const [words, setWords] = useState(null);
  const [hide, setHide] = useState(false);
  const [paused, setPaused] = useState(false);
  const [withPt, setWithPt] = useState(true);
  const [score, setScore] = useState({ ok: 0, total: 0 });
  const { listen, stop } = useListen();
  const alive = useRef(true);
  const pauseRef = useRef(false);
  const ptRef = useRef(true);
  useEffect(() => { pauseRef.current = paused; }, [paused]);
  useEffect(() => { ptRef.current = withPt; }, [withPt]);

  // mantém a tela acesa durante a sessão
  useEffect(() => {
    let lock = null;
    alive.current = true;
    navigator.wakeLock?.request('screen').then(l => { lock = l; }).catch(() => {});
    return () => { alive.current = false; lock?.release?.(); window.speechSynthesis?.cancel(); stop(); };
  }, []);

  const hear = () => new Promise((res) => {
    if (!getSR()) { setTimeout(() => res(null), 3500); return; }
    let got = null;
    listen({ onResult: (alts) => { got = alts; }, onError: () => {}, onEnd: () => res(got) });
  });
  const waitResume = async () => { while (pauseRef.current && alive.current) await wait(300); };

  async function run(start) {
    let ok = 0, total = 0;
    for (let k = start; k < list.length && alive.current; k++) {
      setI(k); setWords(null);
      const p = list[k];
      let hit = false;
      for (let attempt = 0; attempt < 2 && alive.current; attempt++) {
        await waitResume();
        setPhase('speak');
        if (attempt === 0 && ptRef.current) { await speakAsync(p.pt, { lang: 'pt' }); await wait(250); }
        await speakAsync(p.en, { slow: attempt > 0 });
        if (!alive.current) return;
        fx.play('click');
        setPhase('listen');
        const alts = await hear();
        if (!alive.current) return;
        if (!getSR()) { hit = true; break; } // sem reconhecimento: só pratica
        const r = alignSpeech(p.en, alts || []);
        setWords(r.words);
        if (r.score >= 0.75) { hit = true; setPhase('ok'); fx.play('correct'); await speakAsync(['Great!', 'Nice!', 'Perfect!', 'Well done!'][k % 4]); break; }
        setPhase('miss'); fx.play('wrong');
        if (attempt === 0) { await speakAsync('Again, slowly.'); }
      }
      total++; if (hit) ok++;
      setScore({ ok, total });
      await wait(500);
    }
    if (!alive.current) return;
    setPhase('end');
    fx.play('complete');
    const pct = Math.round((ok / Math.max(1, total)) * 100);
    setResult(await finishSession({ uid: user?.id, setProfile, lessonId: 'fone', score: pct, xp: 5, attemptId: attemptId.current, activity: 'fone' }));
  }

  const p = list[i];
  if (phase === 'end') {
    if (!result) return <Spinner />;
    if (!celebrated && (result.showStreak || result.showBoost)) return <DailyCelebration {...result} onContinue={() => setCelebrated(true)} />;
    return (
      <div className="hp-end">
        <span className="hp-ic big"><Icon name="headphones" size={56} color="#fff" /></span>
        <h1>{result.title || 'Sessão concluída!'}</h1>
        <p className="muted" style={{ fontSize: 18 }}>Você acertou <b>{score.ok} de {score.total}</b> frases.{result.xp != null && <> +{result.xp} XP{result.multiplier === 2 ? ' · em dobro!' : ''}</>}</p>
        {result.message && <p>{result.message}</p>}
        {result.error && <p className="alert" role="alert">{result.error}</p>}
        <BoostTimer until={profile?.xp_boost_until} />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-violet btn-lg btn-3d" onClick={onExit}>Outra sessão</button>
          <Link className="btn btn-out btn-lg" to="/aprender">Voltar para a trilha</Link>
        </div>
      </div>
    );
  }
  return (
    <div className="hp">
      <header className="lesson-top">
        <BoostTimer until={profile?.xp_boost_until} className="boost-in-lesson" />
        <button type="button" className="icon-btn" aria-label="Sair do modo fone" onClick={() => { alive.current = false; nav('/fone'); onExit(); }}><Icon name="x" size={24} stroke={2.4} /></button>
        <div className="track" role="progressbar" aria-valuenow={i} aria-valuemax={list.length}><div className="fill" style={{ width: `${(i / list.length) * 100}%` }} /></div>
        <span style={{ fontWeight: 700, color: 'var(--violet-dd)' }}>{Math.min(i + 1, list.length)}/{list.length}</span>
      </header>
      <main className="hp-main">
        {phase === 'ready' ? (
          <div className="hp-start">
            <span className="hp-ic big"><Icon name="headphones" size={56} color="#fff" /></span>
            <h1>Pronto?</h1>
            <p className="muted">Coloque o fone. Depois do sinal, repita a frase em voz alta.</p>
            <label className="hp-opt"><input type="checkbox" checked={withPt} onChange={e => setWithPt(e.target.checked)} /> Falar a tradução em português antes</label>
            <button className="btn btn-lime btn-lg btn-3d" onClick={() => run(0)}>Começar agora</button>
          </div>
        ) : (
          <>
            <div className={'hp-wave ' + phase} aria-hidden="true"><span /><span /><span /><span /><span /></div>
            <p className="hp-status" role="status">
              {phase === 'speak' ? 'Ouça…' : phase === 'listen' ? 'Sua vez: repita!' : phase === 'ok' ? 'Isso mesmo!' : 'Quase! Ouça de novo, devagar.'}
            </p>
            {!hide && p && (words ? <PronWords words={words} onPick={() => {}} /> : <h1 className="hp-en" lang="en">{p.en}</h1>)}
            {!hide && p && <p className="muted hp-pt">{p.pt}</p>}
            <div className="hp-ctl">
              <button className="btn btn-out" onClick={() => setPaused(v => !v)}><Icon name={paused ? 'bolt' : 'clock'} size={18} />{paused ? 'Continuar' : 'Pausar'}</button>
              <button className="btn btn-out" onClick={() => setHide(v => !v)}>{hide ? 'Mostrar texto' : 'Só ouvir (esconder texto)'}</button>
            </div>
            <p className="muted" style={{ fontSize: 14 }}>Acertos: {score.ok}/{score.total}</p>
          </>
        )}
      </main>
    </div>
  );
}
