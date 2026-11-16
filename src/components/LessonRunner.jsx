import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Anim, Bolt } from './ui.jsx';
import { fx, speak, canSpeak } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { supabase } from '../lib/supabase.js';
import Hinted from './Hinted.jsx';
import { getNewWords } from '../lib/hints.js';
import { LessonCtx, SaveItemButton } from './LessonNotes.jsx';
const NotebookDrawer = lazy(() => import('./NotebookDrawer.jsx'));

const PRAISE = ['Mandou bem!', 'Isso mesmo!', 'Perfeito!', 'Sacou!', 'Muito bom!'];
const norm = (s) => String(s).toLowerCase().replace(/[’]/g, "'").replace(/[.,!?;:"]/g, '').replace(/\s+/g, ' ').trim();
const CONTR = { "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is', "we're": 'we are', "they're": 'they are',
  "that's": 'that is', "what's": 'what is', "where's": 'where is', "who's": 'who is', "there's": 'there is', "name's": 'name is',
  "isn't": 'is not', "aren't": 'are not', "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "wasn't": 'was not', "weren't": 'were not',
  "can't": 'cannot', "won't": 'will not', "i'd": 'i would', "you'd": 'you would', "i'll": 'i will', "you'll": 'you will', "we'll": 'we will',
  "she'll": 'she will', "he'll": 'he will', "they'll": 'they will', colour: 'color', ok: 'okay' };
// Normaliza para comparar respostas digitadas: ignora maiúsculas, pontuação e contrações (I'm = I am)
const normFull = (s) => norm(s).split(' ').flatMap(w => (CONTR[w] || w).split(' ')).join(' ');
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
// 'ok' = certo, 'typo' = certo com 1 letra trocada (frases maiores), null = errado
export function matchTyped(typed, answers) {
  const t = normFull(typed);
  if (!t) return null;
  const cands = answers.map(normFull);
  if (cands.includes(t)) return 'ok';
  if (cands.some(c => c.length > 6 && lev(t, c) <= 1)) return 'typo';
  return null;
}
// Fala: quantas palavras do alvo apareceram no que foi reconhecido
function speechScore(heard, target) {
  const h = new Set(normFull(heard).split(' '));
  const t = normFull(target).split(' ');
  return t.filter(w => h.has(w)).length / t.length;
}

// ---------- tipos de exercício ----------
function Options({ options, value, onPick, locked, answer, english }) {
  return (
    <div className="options" role="radiogroup">
      {options.map((o, i) => {
        let cls = 'option';
        if (locked) { if (o === answer) cls += ' ok'; else if (o === value) cls += ' bad'; }
        else if (o === value) cls += ' sel';
        return (
          <button key={o} type="button" role="radio" aria-checked={o === value} className={cls} disabled={locked}
            onClick={() => { onPick(o); if (english) speak(o); }} lang={english ? 'en' : undefined}>
            <span className="k" aria-hidden="true">{i + 1}</span>{o}
          </button>
        );
      })}
    </div>
  );
}

function Choice({ item, value, setValue, locked, newKeys }) {
  const opts = useMemo(() => shuffle(item.options), [item.id]);
  const [before, after] = item.en.split('___');
  return (
    <>
      <p className="q-label">{item.prompt || 'Complete a frase'}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {canSpeak() && <button type="button" className="audio-btn" aria-label="Ouvir a frase" onClick={() => speak(item.en.replace('___', value || item.answer))}><Icon name="sound" size={26} color="#fff" stroke={2.2} /></button>}
        <h1 className="q" lang="en"><Hinted text={before} newKeys={newKeys} /><span className="blank">{value || ' '}</span><Hinted text={after} newKeys={newKeys} /></h1>
      </div>
      <Options options={opts} value={value} onPick={setValue} locked={locked} answer={item.answer} english />
    </>
  );
}

function Meaning({ item, value, setValue, locked, listen, newKeys }) {
  const opts = useMemo(() => shuffle(item.options), [item.id]);
  useEffect(() => { const t = setTimeout(() => speak(item.en), 350); return () => clearTimeout(t); }, [item.id]);
  return (
    <>
      <p className="q-label">{listen ? 'Ouça e escolha o significado' : 'O que significa?'}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {canSpeak() && <button type="button" className={'audio-btn' + (listen ? ' big' : '')} aria-label="Ouvir de novo" onClick={() => speak(item.en)}><Icon name="sound" size={listen ? 40 : 26} color="#fff" stroke={2.2} /></button>}
        {listen && canSpeak() && <button type="button" className="audio-btn slow" aria-label="Ouvir devagar" onClick={() => speak(item.en, { slow: true })}><Icon name="turtle" size={22} color="var(--violet)" /></button>}
        {(!listen || locked || !canSpeak()) && <h1 className="q" lang="en">{listen ? item.en : <Hinted text={item.en} newKeys={newKeys} />}</h1>}
      </div>
      <Options options={opts} value={value} onPick={setValue} locked={locked} answer={item.answer} />
    </>
  );
}

function Build({ item, value, setValue, locked, newKeys }) {
  const tiles = useMemo(() => shuffle([...item.answer.split(' '), ...(item.extra || [])].map((w, i) => ({ w, i }))), [item.id]);
  const chosen = value || [];
  const used = new Set(chosen.map(t => t.i));
  return (
    <>
      <p className="q-label">Monte a frase em inglês</p>
      <h1 className="q"><Hinted text={item.pt} lang="pt" newKeys={newKeys} /></h1>
      <div className="build-line" aria-label="Sua resposta" aria-live="polite">
        {chosen.map(t => (
          <button key={t.i} type="button" className="tile" disabled={locked} lang="en"
            onClick={() => setValue(chosen.filter(c => c.i !== t.i))}>{t.w}</button>
        ))}
      </div>
      <div className="bank" aria-label="Palavras disponíveis">
        {tiles.map(t => (
          <button key={t.i} type="button" className={'tile' + (used.has(t.i) ? ' used' : '')} disabled={locked || used.has(t.i)} lang="en"
            aria-hidden={used.has(t.i)} onClick={() => { setValue([...chosen, t]); speak(t.w); fx.play('click'); }}>{t.w}</button>
        ))}
      </div>
    </>
  );
}

function Match({ item, onDone, locked }) {
  const left = useMemo(() => shuffle(item.pairs.map(p => p[0])), [item.id]);
  const right = useMemo(() => shuffle(item.pairs.map(p => p[1])), [item.id]);
  const pairOf = useMemo(() => Object.fromEntries(item.pairs), [item.id]);
  const [selL, setSelL] = useState(null);
  const [selR, setSelR] = useState(null);
  const [done, setDone] = useState(new Set());
  const [bad, setBad] = useState(null);
  const misses = useRef(0);

  useEffect(() => {
    if (!selL || !selR) return;
    if (pairOf[selL] === selR) {
      const n = new Set(done); n.add(selL); setDone(n); fx.play('click');
      if (n.size === item.pairs.length) onDone(misses.current);
    } else {
      misses.current += 1; setBad([selL, selR]); fx.play('wrong');
      setTimeout(() => setBad(null), 450);
    }
    setSelL(null); setSelR(null);
  }, [selL, selR]);

  const doneR = new Set([...done].map(l => pairOf[l]));
  return (
    <>
      <p className="q-label">Toque nos pares que combinam</p>
      <h1 className="q" style={{ fontSize: 28 }}>Ligue o inglês ao português</h1>
      <div className="match">
        <div className="match-col">
          {left.map(w => (
            <button key={w} type="button" lang="en" disabled={locked || done.has(w)}
              className={'mbtn' + (done.has(w) ? ' ok' : selL === w ? ' sel' : bad?.[0] === w ? ' bad' : '')}
              onClick={() => { setSelL(w); speak(w); }}>{w}</button>
          ))}
        </div>
        <div className="match-col">
          {right.map(w => (
            <button key={w} type="button" disabled={locked || doneR.has(w)}
              className={'mbtn' + (doneR.has(w) ? ' ok' : selR === w ? ' sel' : bad?.[1] === w ? ' bad' : '')}
              onClick={() => setSelR(w)}>{w}</button>
          ))}
        </div>
      </div>
    </>
  );
}

function TypeIn({ item, value, setValue, locked, dictation, newKeys }) {
  useEffect(() => { if (dictation) { const t = setTimeout(() => speak(item.en), 350); return () => clearTimeout(t); } }, [item.id]);
  return (
    <>
      <p className="q-label">{dictation ? 'Ouça e escreva em inglês' : 'Escreva em inglês'}</p>
      {dictation ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button type="button" className="audio-btn big" aria-label="Ouvir de novo" onClick={() => speak(item.en)}><Icon name="sound" size={40} color="#fff" stroke={2.2} /></button>
          <button type="button" className="audio-btn slow" aria-label="Ouvir devagar" onClick={() => speak(item.en, { slow: true })}><Icon name="turtle" size={22} color="var(--violet)" /></button>
          {locked && <h1 className="q" lang="en">{item.en}</h1>}
        </div>
      ) : <h1 className="q"><Hinted text={item.pt} lang="pt" newKeys={newKeys} /></h1>}
      <input className="type-in" lang="en" value={value || ''} disabled={locked} autoFocus autoComplete="off" autoCapitalize="off" spellCheck={false}
        aria-label="Sua resposta em inglês" placeholder="Digite aqui em inglês" onChange={e => setValue(e.target.value)} />
      <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>Não precisa se preocupar com maiúsculas e pontuação. Contrações como I'm ou I am valem igual.</p>
    </>
  );
}

function Dialogue({ item, value, setValue, locked, newKeys }) {
  const opts = useMemo(() => shuffle(item.options), [item.id]);
  return (
    <>
      <p className="q-label">Complete a conversa</p>
      {item.prompt && <p className="muted" style={{ margin: '0 0 12px', fontSize: 16 }}>{item.prompt}</p>}
      <div className="chat">
        {item.lines.map(([who, text], i) => {
          const gap = text === '___';
          const shown = gap ? (locked ? item.answer : value) : text;
          return (
            <div key={i} className={'bubble ' + (who === 'B' ? 'me' : 'other') + (gap ? ' gap' : '')}>
              <span className="who">{who === 'B' ? 'Você' : 'Pessoa'}</span>
              <span lang="en">{gap ? (shown || '...') : <Hinted text={text} newKeys={newKeys} />}</span>
              {!gap && canSpeak() && <button type="button" className="icon-btn" style={{ width: 32, height: 32 }} aria-label="Ouvir" onClick={() => speak(text)}><Icon name="sound" size={16} /></button>}
            </div>
          );
        })}
      </div>
      <Options options={opts} value={value} onPick={setValue} locked={locked} answer={item.answer} english />
    </>
  );
}

function Speak({ item, locked, onDone, newKeys }) {
  const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState('');
  const [msg, setMsg] = useState('');
  const tries = useRef(0);
  const rec = useRef(null);
  useEffect(() => () => rec.current?.abort?.(), []);
  function start() {
    if (!SR || locked) return;
    setMsg(''); setHeard('');
    const r = new SR(); rec.current = r;
    r.lang = 'en-US'; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = (e) => {
      const alts = [...e.results[0]].map(a => a.transcript);
      setHeard(alts[0]);
      const best = Math.max(...alts.map(a => speechScore(a, item.en)));
      tries.current += 1;
      if (best >= 0.75) onDone(true);
      else if (tries.current >= 3) onDone(false, alts[0]);
      else setMsg('Quase! Ouça o áudio de novo e tente mais uma vez.');
    };
    r.onerror = (e) => setMsg(e.error === 'not-allowed' ? 'Permita o uso do microfone no navegador para praticar a fala.' : 'Não consegui ouvir. Toque no microfone e fale de novo.');
    r.onend = () => setListening(false);
    r.start(); setListening(true);
  }
  return (
    <>
      <p className="q-label">Fale em inglês</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {canSpeak() && <button type="button" className="audio-btn" aria-label="Ouvir como se fala" onClick={() => speak(item.en)}><Icon name="sound" size={26} color="#fff" stroke={2.2} /></button>}
        <h1 className="q" lang="en"><Hinted text={item.en} newKeys={newKeys} /></h1>
      </div>
      <p className="muted" style={{ margin: '10px 0 0', fontSize: 16 }}>{item.pt}</p>
      {SR ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 32 }}>
          <button type="button" className={'mic' + (listening ? ' on' : '')} disabled={locked || listening} onClick={start} aria-label="Falar">
            <Icon name="mic" size={40} color="#fff" stroke={2.2} />
          </button>
          <span className="muted" style={{ fontSize: 15 }}>{listening ? 'Ouvindo... fale agora' : 'Toque no microfone e leia a frase em voz alta'}</span>
          {heard && <span style={{ fontSize: 15 }}>Ouvi: <b lang="en">“{heard}”</b></span>}
          {msg && <span className="alert" role="status">{msg}</span>}
        </div>
      ) : <div className="note" style={{ marginTop: 24 }}>Seu navegador não reconhece fala. No computador, use Chrome ou Edge para praticar a pronúncia.</div>}
      {!locked && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <button type="button" className="btn btn-out" onClick={() => onDone(true, null, true)}>Não posso falar agora — pular</button>
        </div>
      )}
    </>
  );
}

// Texto completo da história (para reler nas perguntas): lacunas já preenchidas, sem as perguntas
function StoryText({ story, compact }) {
  const [open, setOpen] = useState({});
  const lines = story.lines.filter(ln => !ln.ask);
  return (
    <div className="story">
      {lines.map((ln, i) => {
        const en = ln.gap ? ln.en.replace('___', ln.gap.answer) : ln.en;
        return (
          <div key={i} className="story-line">
            {canSpeak() && <button type="button" className="icon-btn" style={{ width: 36, height: 36, flex: 'none' }} aria-label={`Ouvir: ${en}`} onClick={() => speak(en)}><Icon name="sound" size={18} /></button>}
            <button type="button" className="story-text" onClick={() => setOpen(o => ({ ...o, [i]: !o[i] }))} aria-expanded={!!open[i]}>
              {ln.who && <b className="story-who">{ln.who}</b>}<span lang="en">{en}</span>
              {open[i] && <span className="story-pt">{ln.pt}</span>}
            </button>
          </div>
        );
      })}
      {!compact && <p className="muted" style={{ fontSize: 13, margin: '8px 0 0' }}>Toque numa frase para ver a tradução.</p>}
    </div>
  );
}

// História no estilo Duolingo: as falas aparecem uma a uma, com áudio;
// em alguns momentos o aluno completa a frase ou responde uma pergunta para seguir.
function Story({ story, locked, onDone, onProgress, newKeys }) {
  const steps = story.lines;
  const [pos, setPos] = useState(0);
  const [solved, setSolved] = useState({});
  const [bad, setBad] = useState(null);
  const [showPt, setShowPt] = useState({});
  const missed = useRef(new Set());
  const endRef = useRef(null);
  const cur = steps[pos];
  const interactive = !!(cur && (cur.ask || cur.gap));
  const done = !interactive || solved[pos];
  const opts = useMemo(() => cur?.ask ? shuffle(cur.options) : cur?.gap ? shuffle(cur.gap.options) : [], [pos]);
  const lineText = (ln, i) => ln.gap ? ln.en.replace('___', solved[i] ? ln.gap.answer : '_____') : ln.en;

  useEffect(() => {
    onProgress?.(pos / steps.length);
    if (cur && !cur.ask && !cur.gap) speak(cur.en);
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60);
  }, [pos]);

  function pick(o) {
    const right = cur.ask ? cur.answer : cur.gap.answer;
    if (o === right) {
      setSolved(x => ({ ...x, [pos]: true })); fx.play('correct');
      if (cur.gap) speak(cur.en.replace('___', right));
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 60);
    } else {
      missed.current.add(pos); setBad(o); fx.play('wrong');
      setTimeout(() => setBad(null), 600);
    }
  }
  function next() {
    if (pos < steps.length - 1) { setPos(pos + 1); return; }
    const total = steps.filter(x => x.ask || x.gap).length;
    onProgress?.(1);
    onDone(total - missed.current.size, total);
  }

  return (
    <>
      <p className="q-label">História</p>
      <h1 className="q" style={{ marginBottom: 16 }}>{story.title}</h1>
      <div className="story">
        {steps.slice(0, pos + 1).map((ln, i) => ln.ask ? (
          <div key={i} className={'story-ask' + (solved[i] ? ' ok' : '')}>
            <b>{ln.ask}</b>
            {solved[i] && <span>✓ {ln.answer} — {ln.why}</span>}
          </div>
        ) : (
          <div key={i} className={'story-line' + (i === pos ? ' current' : '')}>
            {canSpeak() && <button type="button" className="icon-btn" style={{ width: 36, height: 36, flex: 'none' }} aria-label="Ouvir esta fala" onClick={() => speak(ln.gap && !solved[i] ? ln.en.replace('___', '') : lineText(ln, i))}><Icon name="sound" size={18} /></button>}
            <button type="button" className="story-text" onClick={() => setShowPt(o => ({ ...o, [i]: !o[i] }))} aria-expanded={!!showPt[i]}>
              {ln.who && <b className="story-who">{ln.who}</b>}
              <span lang="en">{ln.gap && !solved[i] ? lineText(ln, i) : <Hinted text={lineText(ln, i)} newKeys={newKeys} />}</span>
              {showPt[i] && (!ln.gap || solved[i]) && <span className="story-pt">{ln.pt}</span>}
            </button>
          </div>
        ))}
      </div>

      {!locked && interactive && !solved[pos] && (
        <div style={{ marginTop: 18 }}>
          <p className="muted" style={{ margin: '0 0 4px', fontSize: 15 }}>{cur.ask ? 'Responda para continuar a história:' : 'Complete a fala:'}</p>
          <div className="options" style={{ marginTop: 8 }} role="group">
            {opts.map(o => (
              <button key={o} type="button" className={'option' + (bad === o ? ' bad' : '')} lang={cur.gap ? 'en' : undefined} onClick={() => pick(o)}>{o}</button>
            ))}
          </div>
        </div>
      )}

      {!locked && done && (
        <button type="button" className="btn btn-violet btn-lg btn-3d" style={{ marginTop: 20 }} onClick={next} autoFocus>
          {pos < steps.length - 1 ? 'Continuar' : 'Terminar a história'}
        </button>
      )}
      <div ref={endRef} />
      <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>Dica: toque numa fala para ver a tradução.</p>
    </>
  );
}

function Quiz({ item, story, value, setValue, locked }) {
  const opts = useMemo(() => shuffle(item.options), [item.id]);
  const [show, setShow] = useState(false);
  return (
    <>
      <p className="q-label">Sobre a história{story ? `: ${story.title}` : ''}</p>
      <h1 className="q" style={{ fontSize: 'clamp(24px,3vw,32px)' }}>{item.q}</h1>
      {story && <button type="button" className="link-btn" onClick={() => setShow(v => !v)} aria-expanded={show}>{show ? 'Esconder a história' : 'Reler a história'}</button>}
      {show && story && <StoryText story={story} compact />}
      <Options options={opts} value={value} onPick={setValue} locked={locked} answer={item.answer} />
    </>
  );
}

function ReportBox({ itemId, onClose }) {
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);
  async function send() {
    if (msg.trim().length < 3) return;
    const { data } = await supabase.auth.getUser();
    await supabase.from('content_reports').insert({ item_id: itemId, message: msg.trim(), user_id: data.user?.id });
    setSent(true); setTimeout(onClose, 1200);
  }
  return (
    <div className="card" style={{ marginTop: 12 }}>
      {sent ? <p style={{ margin: 0 }}>Obrigado! Vamos revisar esse exercício.</p> : <>
        <div className="field"><label htmlFor="rep">O que parece errado neste exercício?</label>
          <textarea id="rep" rows={3} value={msg} onChange={e => setMsg(e.target.value)} placeholder="Ex.: a tradução não está natural" /></div>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button className="btn btn-violet" onClick={send}>Enviar</button>
          <button className="btn btn-out" onClick={onClose}>Cancelar</button>
        </div>
      </>}
    </div>
  );
}

// ---------- executor ----------
// entries: [{ item, lessonId, unit }]
export default function LessonRunner({ entries, title, exitTo = '/aprender', retryWrong = true, onItemResult, onFinish, finishCta = 'Continuar', introduceWords = true }) {
  const [queue, setQueue] = useState(entries);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState('answering'); // answering | correct | wrong
  const [matchMisses, setMatchMisses] = useState(0);
  const [note, setNote] = useState(null);
  const [confirmExit, setConfirmExit] = useState(false);
  const [storyFrac, setStoryFrac] = useState(0); // observação extra no feedback (grafia, fala pulada...)
  const [help, setHelp] = useState(false);
  const [report, setReport] = useState(false);
  const [result, setResult] = useState(null);
  const [notesOpen, setNotesOpen] = useState(false);
  const firstTry = useRef(new Map()); // itemId -> correct na 1ª tentativa
  const ctaRef = useRef(null);

  const cur = queue[idx];
  const item = cur?.item;
  const locked = status !== 'answering';
  const total = entries.length;
  const progress = Math.round(((firstTry.current.size + (item?.type === 'story' && status === 'answering' ? storyFrac : 0)) / total) * 100);

  const isCorrect = useCallback(() => {
    if (!item) return false;
    if (item.type === 'build') return norm((value || []).map(t => t.w).join(' ')) === norm(item.answer);
    if (item.type === 'type' || item.type === 'dictation') {
      const m = matchTyped(value || '', [item.type === 'type' ? item.answer : item.en, ...(item.accept || [])]);
      if (m === 'typo') setNote(`Quase perfeito! Atenção à grafia: “${item.type === 'type' ? item.answer : item.en}”.`);
      return !!m;
    }
    return value === item.answer;
  }, [item, value]);

  const settle = useCallback((ok) => {
    setStatus(ok ? 'correct' : 'wrong');
    fx.play(ok ? 'correct' : 'wrong');
    if (!firstTry.current.has(item.id)) firstTry.current.set(item.id, ok);
    onItemResult?.(cur, ok);
    if (!ok && retryWrong && !['match', 'speak', 'story'].includes(item.type)) setQueue(q => [...q, cur]);
    if (item.type === 'build' || item.type === 'type') speak(item.answer);
    else if (item.type === 'choice') speak(item.en.replace('___', item.answer));
    else if (item.type === 'dialogue') speak(item.answer);
    setTimeout(() => ctaRef.current?.focus(), 50);
  }, [item, cur, onItemResult, retryWrong]);

  const check = () => { if (!locked && hasAnswer()) settle(isCorrect()); };
  const hasAnswer = () => item?.type === 'build' ? (value || []).length > 0 : typeof value === 'string' ? value.trim().length > 0 : value != null;

  const next = async () => {
    if (idx + 1 >= queue.length) {
      const vals = [...firstTry.current.values()];
      const score = Math.round((vals.filter(Boolean).length / Math.max(1, vals.length)) * 100);
      const res = await onFinish?.({ score, firstTry: firstTry.current });
      fx.play(res?.anim === 'streak' ? 'streak' : 'complete');
      setResult({ score, ...(res || {}) });
      return;
    }
    setIdx(i => i + 1); setValue(null); setStatus('answering'); setHelp(false); setReport(false); setMatchMisses(0); setNote(null);
  };

  // teclado: Enter verifica/continua, 1-4 escolhem opções
  useEffect(() => {
    const onKey = (e) => {
      if (result || notesOpen || e.target.tagName === 'TEXTAREA' || e.target.closest?.('[contenteditable="true"],.nb-drawer,.nb-modal')) return;
      if (e.key === 'Enter') { e.preventDefault(); locked ? next() : check(); }
      else if (!locked && /^[1-5]$/.test(e.key) && item?.options && item.type !== 'build') {
        const btns = document.querySelectorAll('.options .option');
        btns[Number(e.key) - 1]?.click();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (result) {
    const great = result.score >= 80;
    return (
      <div className="finish">
        <Anim name={result.anim || (result.score >= 80 ? 'celebrate' : 'keep-going')} size={200} />
        <h1 style={{ fontSize: 'clamp(32px,5vw,44px)', margin: '8px 0 0' }}>{result.title || (great ? 'Lição concluída!' : 'Concluída — e com aprendizado!')}</h1>
        <p className="muted" style={{ fontSize: 17, maxWidth: 520, lineHeight: 1.6 }}>
          {result.message || (great ? 'Você acertou quase tudo de primeira. Continue assim!' : 'As frases que você errou foram para a sua revisão. Praticar de novo ajuda a fixar.')}
        </p>
        <div className="finish-stats">
          <div className="fstat"><span className="muted" style={{ fontSize: 13 }}>Acertos de primeira</span><b>{result.score}%</b></div>
          {result.xp != null && <div className="fstat"><span className="muted" style={{ fontSize: 13 }}>XP ganho</span><b style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}><Bolt size={22} />+{result.xp}</b></div>}
          {result.streak != null && <div className="fstat"><span className="muted" style={{ fontSize: 13 }}>Sequência</span><b>{result.streak} {result.streak === 1 ? 'dia' : 'dias'}</b></div>}
        </div>
        {result.error && <div className="alert" role="alert" style={{ maxWidth: 480 }}>{result.error}</div>}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {result.next && <Link className="btn btn-violet btn-lg btn-3d" to={`/licao/${result.next.id}`} autoFocus>Próxima lição: {result.next.title}</Link>}
          <Link className={'btn btn-lg ' + (result.next ? 'btn-out' : 'btn-violet btn-3d')} to={result.to || exitTo} autoFocus={!result.next}>{result.next ? 'Voltar para a trilha' : finishCta}</Link>
        </div>
      </div>
    );
  }
  if (!item) return null;

  const guide = cur.unit?.guide;
  const newWords = introduceWords && idx < entries.length ? getNewWords(item.id) : [];
  const newKeys = new Set(newWords.map(w => w.key));
  const ok = status === 'correct';
  const wrongNote = status === 'wrong' && item.wrong?.[value];
  const display = item.display || (item.type === 'choice' ? item.en.replace('___', item.answer) : item.type === 'dictation' || item.type === 'speak' ? item.en : item.answer);

  const noteCtx = { lessonId: cur.lessonId, unitId: cur.unit?.id || null, itemId: item.id };
  return (
    <LessonCtx.Provider value={noteCtx}>
    <div className="lesson">
      <header className="lesson-top">
        <button type="button" className="icon-btn" aria-label="Sair da lição" onClick={() => setConfirmExit(true)}><Icon name="x" size={24} stroke={2.4} /></button>
        <div className="track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={title}><div className="fill" style={{ width: progress + '%' }} /></div>
        <span style={{ fontWeight: 700, color: 'var(--violet-dd)', fontSize: 15 }}>{Math.min(firstTry.current.size + (locked ? 0 : 1), total)}/{total}</span>
        <button type="button" className={'icon-btn nb-open' + (notesOpen ? ' on' : '')} aria-label="Abrir caderno" title="Caderno: anotar sem sair da lição" aria-expanded={notesOpen} onClick={() => setNotesOpen(v => !v)}><Icon name="notebook" size={24} /></button>
      </header>
      {notesOpen && <Suspense fallback={null}><NotebookDrawer lessonId={cur.lessonId} unit={cur.unit} onClose={() => setNotesOpen(false)} /></Suspense>}

      {confirmExit && (
        <div className="exit-box" role="alertdialog" aria-label="Sair da lição">
          <div>
            <b style={{ display: 'block', marginBottom: 4 }}>Sair da lição?</b>
            <span className="muted" style={{ fontSize: 15 }}>A lição só fica salva quando você chega até o final. Se sair agora, vai precisar começar de novo.</span>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-violet" onClick={() => setConfirmExit(false)} autoFocus>Continuar a lição</button>
            <Link to={exitTo} className="btn btn-out">Sair</Link>
          </div>
        </div>
      )}
      <main className="lesson-main" key={idx}>
        {newWords.length > 0 && (
          <div className="new-words" aria-label="Palavras novas neste exercício">
            <span className="nw-tag">{newWords.length > 1 ? 'Palavras novas' : 'Palavra nova'}</span>
            {newWords.map(w => (
              <button key={w.key} type="button" className="nw" onClick={() => speak(w.en)} aria-label={`Ouvir ${w.en}: ${w.pt}`}>
                <b lang="en">{w.en}</b><span> = {w.pt}</span><Icon name="sound" size={16} />
              </button>
            ))}
          </div>
        )}
        {item.type === 'choice' && <Choice item={item} value={value} setValue={setValue} locked={locked} newKeys={newKeys} />}
        {item.type === 'meaning' && <Meaning item={item} value={value} setValue={setValue} locked={locked} newKeys={newKeys} />}
        {item.type === 'listen' && <Meaning item={item} value={value} setValue={setValue} locked={locked} listen />}
        {item.type === 'build' && <Build item={item} value={value} setValue={setValue} locked={locked} newKeys={newKeys} />}
        {item.type === 'match' && <Match item={item} locked={locked} onDone={(m) => { setMatchMisses(m); settle(m === 0); }} />}
        {item.type === 'type' && <TypeIn item={item} value={value} setValue={setValue} locked={locked} newKeys={newKeys} />}
        {item.type === 'dictation' && <TypeIn item={item} value={value} setValue={setValue} locked={locked} dictation />}
        {item.type === 'dialogue' && <Dialogue item={item} value={value} setValue={setValue} locked={locked} newKeys={newKeys} />}
        {item.type === 'story' && cur.story && <Story story={cur.story} locked={locked} newKeys={newKeys} onProgress={setStoryFrac} onDone={(ok, total) => {
          setNote(`Você acertou ${ok} de ${total} interações da história de primeira.`); settle(true);
        }} />}
        {item.type === 'quiz' && <Quiz item={item} story={cur.story} value={value} setValue={setValue} locked={locked} />}
        {item.type === 'speak' && <Speak item={item} locked={locked} newKeys={newKeys} onDone={(ok, heard, skipped) => {
          setNote(skipped ? 'Sem problema! Quando puder, pratique a fala em voz alta — é o que mais destrava a conversa.' : heard ? `Ouvi: “${heard}”.` : null);
          settle(ok);
        }} />}

        {guide && !locked && item.type !== 'story' && (
          <div style={{ marginTop: 24 }}>
            <button type="button" className="btn btn-out" style={{ minHeight: 44, fontSize: 15 }} onClick={() => setHelp(h => !h)} aria-expanded={help}>
              <Icon name="help" size={18} />{help ? 'Esconder explicação' : 'Não entendi, me explique'}
            </button>
            {help && (
              <div className="help-box">
                <b style={{ display: 'block', color: 'var(--violet-dd)', marginBottom: 8 }}>{guide.title}</b>
                <p style={{ margin: '0 0 12px', fontSize: 15, lineHeight: 1.6, color: '#2E2A55' }}>{guide.intro}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {guide.points.map(p => (
                    <div key={p.en} style={{ background: '#fff', borderRadius: 12, padding: '10px 14px', fontSize: 14, lineHeight: 1.5 }}>
                      <b lang="en">{p.en}</b> — {p.pt}<br /><span className="muted">{p.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {report && <ReportBox itemId={item.id} onClose={() => setReport(false)} />}
      </main>

      <footer className={'bar' + (status === 'correct' ? ' ok' : status === 'wrong' ? ' bad' : '')}>
        <div className="bar-in" aria-live="polite">
          {status === 'answering' && <>
            <span className="muted" style={{ fontSize: 15 }}>{item.type === 'story' ? 'Ouça, leia e toque em Continuar para seguir a história.' : item.type === 'match' ? 'Combine todos os pares para continuar.' : item.type === 'build' ? 'Toque nas palavras na ordem certa.' : item.type === 'speak' ? 'Fale a frase para continuar.' : item.type === 'type' || item.type === 'dictation' ? 'Escreva e aperte Enter ou Verificar.' : 'Escolha uma opção e toque em Verificar.'}</span>
            {item.type !== 'match' && item.type !== 'speak' && item.type !== 'story' && <button className="btn btn-violet btn-3d btn-lg cta" disabled={!hasAnswer()} onClick={check}>Verificar</button>}
          </>}
          {status !== 'answering' && <>
            <div className="fb">
              <span className="fb-ic" style={{ background: ok ? 'var(--ok)' : 'var(--bad)' }}><Icon name={ok ? 'check' : 'x'} size={28} color="#fff" stroke={3} /></span>
              <div>
                <h3 style={{ color: ok ? 'var(--ok-d)' : 'var(--bad-d)' }}>
                  {ok ? PRAISE[idx % PRAISE.length] : item.type === 'match' ? `Quase! Você trocou ${matchMisses} ${matchMisses === 1 ? 'par' : 'pares'}.` : <>Quase! Resposta certa: <span lang="en">“{display}”</span></>}
                </h3>
                <p style={{ color: ok ? '#234238' : '#4A2A1C' }}>
                  {note && <>{note} </>}{wrongNote && <>{wrongNote} </>}<b>Por quê?</b> {item.why}
                </p>
                {!ok && retryWrong && item.type !== 'match' && item.type !== 'speak' && <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Ela vai aparecer de novo no fim da lição e também na sua revisão.</p>}
                <span style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  <SaveItemButton item={item} />
                  <button type="button" className="link-btn" style={{ fontSize: 13, color: 'var(--text3)' }} onClick={() => setReport(true)}><Icon name="flag" size={14} /> Reportar erro neste exercício</button>
                </span>
              </div>
            </div>
            <button ref={ctaRef} className="btn btn-3d btn-lg cta" style={{ background: ok ? 'var(--ok)' : 'var(--bad)', color: '#fff' }} onClick={next}>
              {ok ? 'Continuar' : 'Entendi'}
            </button>
          </>}
        </div>
      </footer>
    </div>
    </LessonCtx.Provider>
  );
}
