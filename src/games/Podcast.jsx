// Podcast da Ana: áudio contínuo com as vozes dos personagens, transcrição que acompanha,
// velocidade normal/lenta e perguntas no fim.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { useProgress } from '../lib/progress.js';
import { fx, speakAsync } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { Spinner, Icon } from '../components/ui.jsx';
import { Stage } from './art.jsx';
import { PODCASTS, cast, unitDone, played, finishGame } from './lib.js';
import { GameTop, Finish, Choices, Why } from './common.jsx';

let timingsCache = null;
const loadTimings = () => (timingsCache ||= fetch('/audio/podcast/index.json').then(r => (r.ok ? r.json() : {})).catch(() => ({})));
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function Podcast() {
  const { id } = useParams();
  const ep = PODCASTS.find(p => p.id === id);
  const prog = useProgress();
  const [timing, setTiming] = useState(undefined);
  useEffect(() => { loadTimings().then(t => setTiming(t[id] || null)); }, [id]);
  if (!ep) return <Navigate to="/jogos" replace />;
  if (prog.loading || timing === undefined) return <Spinner />;
  if (!unitDone(prog.done, ep.unlock)) return <Navigate to="/jogos" replace />;
  return <Player ep={ep} timing={timing} first={!played(prog.scores, ep.id)} />;
}

function Player({ ep, timing, first }) {
  const { user, setProfile } = useAuth();
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [slow, setSlow] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showPt, setShowPt] = useState(false);
  const [heard, setHeard] = useState(false);
  const [phase, setPhase] = useState('listen'); // listen | quiz | done
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const okFirst = useRef(0);
  const lineRefs = useRef([]);
  const fallback = !timing; // sem MP3 gerado: lê fala por fala com a voz do aparelho
  const fbIdx = useRef(-1);
  const [fbLine, setFbLine] = useState(-1);
  const hosts = useMemo(() => [...new Set(ep.lines.map(l => l.who))], [ep]);
  const duration = timing?.duration || 0;

  const cur = fallback ? fbLine : (timing.times.findIndex(([a, b], i) => time >= a && time < (timing.times[i + 1]?.[0] ?? b + 1)));
  const speaking = playing && cur >= 0 ? ep.lines[cur]?.who : null;

  useEffect(() => { if (audio.current) audio.current.playbackRate = slow ? 0.8 : 1; }, [slow]);
  useEffect(() => { if (showText && cur >= 0) lineRefs.current[cur]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [cur, showText]);
  useEffect(() => () => { audio.current?.pause(); fbIdx.current = -2; }, []);

  async function playFallback() {
    setPlaying(true);
    for (let i = Math.max(0, fbIdx.current); i < ep.lines.length; i++) {
      if (fbIdx.current === -2) return;
      fbIdx.current = i; setFbLine(i);
      await speakAsync(ep.lines[i].en, { who: ep.lines[i].who, slow });
      if (fbIdx.current === -3) { fbIdx.current = i + 1; setPlaying(false); return; } // pausado
    }
    fbIdx.current = 0; setPlaying(false); setHeard(true);
  }
  function toggle() {
    if (fallback) { if (playing) fbIdx.current = -3; else playFallback(); return; }
    const a = audio.current;
    if (a.paused) a.play().catch(() => {}); else a.pause();
  }
  function seekLine(i) {
    if (fallback) { fbIdx.current = i; if (!playing) playFallback(); return; }
    const a = audio.current; a.currentTime = timing.times[i][0]; a.play().catch(() => {});
  }
  function seekBar(e) {
    if (fallback || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    audio.current.currentTime = ((e.clientX - r.left) / r.width) * duration;
  }

  const q = ep.questions[qi];
  const opts = useMemo(() => (q ? shuffle(q.options) : []), [q]);
  function answer(label) {
    const ok = label === q.answer;
    if (!picked.length && ok) okFirst.current++;
    setPicked(p => [...p, label]);
    fx.play(ok ? 'correct' : 'wrong');
    setFeedback({ ok, text: ok ? q.why : 'Não foi isso. Se quiser, volte e ouça de novo.' });
  }
  async function nextQ() {
    setPicked([]); setFeedback(null);
    if (qi + 1 < ep.questions.length) { setQi(qi + 1); return; }
    fx.play('complete');
    const xp = first ? 10 : 5;
    const r = await finishGame({ user, setProfile, id: ep.id, score: (okFirst.current / ep.questions.length) * 100, xp });
    setResult({ xp, streak: r.streak }); setPhase('done');
  }

  if (phase === 'done' && result) {
    return <Finish title="Episódio concluído!" xp={result.xp} streak={result.streak}
      stats={[['Perguntas certas de primeira', `${okFirst.current}/${ep.questions.length}`]]}
      message="Dica: ouça de novo amanhã sem a transcrição. Entender sem ler é o que treina o ouvido de verdade." />;
  }

  const n = PODCASTS.indexOf(ep) + 1;
  return (
    <div className="lesson">
      <GameTop progress={phase === 'quiz' ? 70 + (qi / ep.questions.length) * 30 : duration ? Math.min(70, (time / duration) * 70) : 0} label={ep.title} />
      <main className="lesson-main g-main">
        {phase === 'listen' ? (<>
          <span className="g-kicker">Podcast da Ana · Episódio {n} · {ep.level}</span>
          <h1 className="g-title">{ep.title}</h1>
          <p className="g-intro" style={{ fontSize: 16 }}>{ep.intro}</p>
          <div className="pc-stage">
            <Stage place="office" cast={hosts} looks={cast} speaking={speaking} height={190} />
            <span className="pc-onair" aria-hidden="true"><span />{playing ? 'NO AR' : 'PODCAST'}</span>
          </div>
          {!fallback && <audio ref={audio} src={`/audio/podcast/${ep.id}.mp3`} preload="metadata"
            onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => { setTime(e.currentTarget.currentTime); if (e.currentTarget.currentTime > duration * 0.85) setHeard(true); }}
            onEnded={() => { setPlaying(false); setHeard(true); }} />}
          <div className="pc-player">
            <button type="button" className="pc-play" onClick={toggle} aria-label={playing ? 'Pausar' : 'Ouvir'}>
              {playing ? <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                : <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>}
            </button>
            <div className="pc-mid">
              {fallback ? <span className="muted" style={{ fontSize: 13 }}>Fala {Math.max(1, fbLine + 1)} de {ep.lines.length}</span> : (<>
                <div className="pc-bar" onClick={seekBar} role="slider" aria-label="Posição do áudio" aria-valuemin={0} aria-valuemax={Math.round(duration)} aria-valuenow={Math.round(time)} tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'ArrowRight') audio.current.currentTime += 5; if (e.key === 'ArrowLeft') audio.current.currentTime -= 5; }}>
                  <span className="pc-fill" style={{ width: `${duration ? (time / duration) * 100 : 0}%` }} />
                </div>
                <span className="pc-time">{fmt(time)} / {fmt(duration)}</span>
              </>)}
            </div>
            <button type="button" className={'pc-speed' + (slow ? ' on' : '')} onClick={() => setSlow(s => !s)} aria-pressed={slow} title="Velocidade">
              <Icon name="turtle" size={18} />{slow ? '0,8x' : '1x'}
            </button>
          </div>
          <div className="pc-toggles">
            <button type="button" className={'chip' + (showText ? ' on' : '')} onClick={() => setShowText(v => !v)} aria-pressed={showText}>{showText ? 'Esconder transcrição' : 'Mostrar transcrição'}</button>
            {showText && <button type="button" className={'chip' + (showPt ? ' on' : '')} onClick={() => setShowPt(v => !v)} aria-pressed={showPt}>{showPt ? 'Esconder tradução' : 'Mostrar tradução'}</button>}
          </div>
          {!showText && <p className="muted" style={{ fontSize: 14, margin: 0 }}>Desafio: ouça a primeira vez sem ler. Se travar, abra a transcrição.</p>}
          {showText && (
            <div className="pc-script">
              {ep.lines.map((l, i) => (
                <button key={i} ref={el => (lineRefs.current[i] = el)} type="button" className={'pc-line' + (i === cur ? ' on' : '')} onClick={() => seekLine(i)}>
                  <b>{cast[l.who]?.name || l.who}</b>
                  <span lang="en">{l.en}</span>
                  {showPt && <span className="pc-pt">{l.pt}</span>}
                </button>
              ))}
            </div>
          )}
        </>) : (<>
          <span className="g-kicker">Pergunta {qi + 1} de {ep.questions.length}</span>
          <h1 className="g-title" style={{ fontSize: 26 }}>{q.q}</h1>
          <Choices options={opts} answer={q.answer} picked={picked} locked={feedback?.ok} onAnswer={answer} />
          {feedback && <Why ok={feedback.ok} text={feedback.text} />}
          {!feedback?.ok && <button type="button" className="link-btn" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('listen')}>Ouvir de novo</button>}
        </>)}
      </main>
      <footer className={'bar' + (feedback?.ok ? ' ok' : '')}>
        <div className="bar-in">
          <span className="muted" style={{ fontSize: 15 }}>{phase === 'listen' ? (heard ? 'Ouviu tudo? Responda as perguntas.' : 'Ouça o episódio até o fim.') : ''}</span>
          {phase === 'listen'
            ? <button className="btn btn-violet btn-3d btn-lg cta" disabled={!heard} onClick={() => { audio.current?.pause(); fbIdx.current = -3; setPhase('quiz'); }}>Responder perguntas</button>
            : <button className="btn btn-violet btn-3d btn-lg cta" disabled={!feedback?.ok} onClick={nextQ} autoFocus>Continuar</button>}
        </div>
      </footer>
    </div>
  );
}
