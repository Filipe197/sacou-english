import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Anim, Bolt } from './ui.jsx';
import { fx, speak, canSpeak } from '../lib/fx.js';
import { shuffle } from '../lib/content.js';
import { supabase } from '../lib/supabase.js';

const PRAISE = ['Mandou bem!', 'Isso mesmo!', 'Perfeito!', 'Sacou!', 'Muito bom!'];
const norm = (s) => String(s).toLowerCase().replace(/[’]/g, "'").replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();

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

function Choice({ item, value, setValue, locked }) {
  const opts = useMemo(() => shuffle(item.options), [item.id]);
  const [before, after] = item.en.split('___');
  return (
    <>
      <p className="q-label">{item.prompt || 'Complete a frase'}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {canSpeak() && <button type="button" className="audio-btn" aria-label="Ouvir a frase" onClick={() => speak(item.en.replace('___', value || item.answer))}><Icon name="sound" size={26} color="#fff" stroke={2.2} /></button>}
        <h1 className="q" lang="en">{before}<span className="blank">{value || ' '}</span>{after}</h1>
      </div>
      <Options options={opts} value={value} onPick={setValue} locked={locked} answer={item.answer} english />
    </>
  );
}

function Meaning({ item, value, setValue, locked, listen }) {
  const opts = useMemo(() => shuffle(item.options), [item.id]);
  useEffect(() => { const t = setTimeout(() => speak(item.en), 350); return () => clearTimeout(t); }, [item.id]);
  return (
    <>
      <p className="q-label">{listen ? 'Ouça e escolha o significado' : 'O que significa?'}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        {canSpeak() && <button type="button" className={'audio-btn' + (listen ? ' big' : '')} aria-label="Ouvir de novo" onClick={() => speak(item.en)}><Icon name="sound" size={listen ? 40 : 26} color="#fff" stroke={2.2} /></button>}
        {listen && canSpeak() && <button type="button" className="audio-btn slow" aria-label="Ouvir devagar" onClick={() => speak(item.en, { slow: true })}><Icon name="turtle" size={22} color="var(--violet)" /></button>}
        {(!listen || locked || !canSpeak()) && <h1 className="q" lang="en">{item.en}</h1>}
      </div>
      <Options options={opts} value={value} onPick={setValue} locked={locked} answer={item.answer} />
    </>
  );
}

function Build({ item, value, setValue, locked }) {
  const tiles = useMemo(() => shuffle([...item.answer.split(' '), ...(item.extra || [])].map((w, i) => ({ w, i }))), [item.id]);
  const chosen = value || [];
  const used = new Set(chosen.map(t => t.i));
  return (
    <>
      <p className="q-label">Monte a frase em inglês</p>
      <h1 className="q">{item.pt}</h1>
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
export default function LessonRunner({ entries, title, exitTo = '/aprender', retryWrong = true, onItemResult, onFinish, finishCta = 'Continuar' }) {
  const [queue, setQueue] = useState(entries);
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState('answering'); // answering | correct | wrong
  const [matchMisses, setMatchMisses] = useState(0);
  const [help, setHelp] = useState(false);
  const [report, setReport] = useState(false);
  const [result, setResult] = useState(null);
  const firstTry = useRef(new Map()); // itemId -> correct na 1ª tentativa
  const ctaRef = useRef(null);

  const cur = queue[idx];
  const item = cur?.item;
  const locked = status !== 'answering';
  const total = entries.length;
  const progress = Math.round((firstTry.current.size / total) * 100);

  const isCorrect = useCallback(() => {
    if (!item) return false;
    if (item.type === 'build') return norm((value || []).map(t => t.w).join(' ')) === norm(item.answer);
    return value === item.answer;
  }, [item, value]);

  const settle = useCallback((ok) => {
    setStatus(ok ? 'correct' : 'wrong');
    fx.play(ok ? 'correct' : 'wrong');
    if (!firstTry.current.has(item.id)) firstTry.current.set(item.id, ok);
    onItemResult?.(cur, ok);
    if (!ok && retryWrong && item.type !== 'match') setQueue(q => [...q, cur]);
    if (item.type === 'build' || item.type === 'choice') speak(item.type === 'build' ? item.answer : item.en.replace('___', item.answer));
    setTimeout(() => ctaRef.current?.focus(), 50);
  }, [item, cur, onItemResult, retryWrong]);

  const check = () => { if (!locked && hasAnswer()) settle(isCorrect()); };
  const hasAnswer = () => item?.type === 'build' ? (value || []).length > 0 : value != null;

  const next = async () => {
    if (idx + 1 >= queue.length) {
      const vals = [...firstTry.current.values()];
      const score = Math.round((vals.filter(Boolean).length / Math.max(1, vals.length)) * 100);
      fx.play('complete');
      const res = await onFinish?.({ score, firstTry: firstTry.current });
      setResult({ score, ...(res || {}) });
      return;
    }
    setIdx(i => i + 1); setValue(null); setStatus('answering'); setHelp(false); setReport(false); setMatchMisses(0);
  };

  // teclado: Enter verifica/continua, 1-4 escolhem opções
  useEffect(() => {
    const onKey = (e) => {
      if (result || e.target.tagName === 'TEXTAREA') return;
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
        <Anim name="celebrate" size={200} />
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
        <Link className="btn btn-violet btn-lg btn-3d" to={result.to || exitTo} autoFocus>{finishCta}</Link>
      </div>
    );
  }
  if (!item) return null;

  const guide = cur.unit?.guide;
  const ok = status === 'correct';
  const wrongNote = status === 'wrong' && item.wrong?.[value];
  const display = item.display || (item.type === 'choice' ? item.en.replace('___', item.answer) : item.answer);

  return (
    <div className="lesson">
      <header className="lesson-top">
        <Link to={exitTo} className="icon-btn" aria-label="Sair (o progresso desta lição não é salvo)"><Icon name="x" size={24} stroke={2.4} /></Link>
        <div className="track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={title}><div className="fill" style={{ width: progress + '%' }} /></div>
        <span style={{ fontWeight: 700, color: 'var(--violet-dd)', fontSize: 15 }}>{Math.min(firstTry.current.size + (locked ? 0 : 1), total)}/{total}</span>
      </header>

      <main className="lesson-main" key={idx}>
        {item.type === 'choice' && <Choice item={item} value={value} setValue={setValue} locked={locked} />}
        {item.type === 'meaning' && <Meaning item={item} value={value} setValue={setValue} locked={locked} />}
        {item.type === 'listen' && <Meaning item={item} value={value} setValue={setValue} locked={locked} listen />}
        {item.type === 'build' && <Build item={item} value={value} setValue={setValue} locked={locked} />}
        {item.type === 'match' && <Match item={item} locked={locked} onDone={(m) => { setMatchMisses(m); settle(m === 0); }} />}

        {guide && !locked && (
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
            <span className="muted" style={{ fontSize: 15 }}>{item.type === 'match' ? 'Combine todos os pares para continuar.' : item.type === 'build' ? 'Toque nas palavras na ordem certa.' : 'Escolha uma opção e toque em Verificar.'}</span>
            {item.type !== 'match' && <button className="btn btn-violet btn-3d btn-lg cta" disabled={!hasAnswer()} onClick={check}>Verificar</button>}
          </>}
          {status !== 'answering' && <>
            <div className="fb">
              <span className="fb-ic" style={{ background: ok ? 'var(--ok)' : 'var(--bad)' }}><Icon name={ok ? 'check' : 'x'} size={28} color="#fff" stroke={3} /></span>
              <div>
                <h3 style={{ color: ok ? 'var(--ok-d)' : 'var(--bad-d)' }}>
                  {ok ? PRAISE[idx % PRAISE.length] : item.type === 'match' ? `Quase! Você trocou ${matchMisses} ${matchMisses === 1 ? 'par' : 'pares'}.` : <>Quase! Resposta certa: <span lang="en">“{display}”</span></>}
                </h3>
                <p style={{ color: ok ? '#234238' : '#4A2A1C' }}>
                  {wrongNote && <>{wrongNote} </>}<b>Por quê?</b> {item.why}
                </p>
                {!ok && retryWrong && item.type !== 'match' && <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>Ela vai aparecer de novo no fim da lição e também na sua revisão.</p>}
                <button type="button" className="link-btn" style={{ fontSize: 13, color: 'var(--text3)' }} onClick={() => setReport(true)}><Icon name="flag" size={14} /> Reportar erro neste exercício</button>
              </div>
            </div>
            <button ref={ctaRef} className="btn btn-3d btn-lg cta" style={{ background: ok ? 'var(--ok)' : 'var(--bad)', color: '#fff' }} onClick={next}>
              {ok ? 'Continuar' : 'Entendi'}
            </button>
          </>}
        </div>
      </footer>
    </div>
  );
}
