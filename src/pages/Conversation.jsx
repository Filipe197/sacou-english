// Conversa por voz com personagens: o aluno fala (ou escreve), o personagem
// responde em inglês simples do nível, e erros ganham correção na hora.
// No fim, um resumo com acertos, erros e frases para virar flashcard.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shell, Icon } from '../components/ui.jsx';
import Juvenal from '../components/Juvenal.jsx';
import { useListen, getSR } from '../components/Pronounce.jsx';
import { SCENARIOS, MAX_TURNS, MAX_CHARS } from '../lib/scenarios.js';
import { speak, canSpeak, fx } from '../lib/fx.js';
import { askAI } from '../lib/ai.js';
import { useNotebook, saveWord } from '../lib/notebook.js';
import { useAuth } from '../lib/auth.jsx';
import { logActivity } from '../lib/offline.js';

export default function Conversation() {
  const [sc, setSc] = useState(null);
  const [run, setRun] = useState(0);
  if (sc) return <Chat key={run} sc={sc} onExit={() => setSc(null)} onAgain={() => setRun(n => n + 1)} />;
  return (
    <Shell>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, margin: '0 0 8px' }}>Conversar</h1>
        <p className="muted" style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 24px' }}>
          Pratique uma conversa de verdade, falando em voz alta. O personagem responde em inglês simples, do seu nível, e quando você errar,
          o professor mostra a forma certa na hora. No fim, você recebe um resumo e pode salvar as frases como flashcards.
        </p>
        <Link to="/aula" className="conv-promo">
          <Juvenal mood="grumpy" size={72} />
          <div>
            <b>Aula falada com o Professor Juvenal</b>
            <span>O professor mais ranzinza do Brasil: ele fala, você repete, e se não sair ele pede de novo, reclamando. Mas nunca desiste de você.</span>
          </div>
          <span className="btn">Começar</span>
        </Link>
        <h2 style={{ fontSize: 20, margin: '0 0 12px' }}>Situações do dia a dia</h2>
        <div className="sc-grid">
          {SCENARIOS.map(s => (
            <button key={s.id} type="button" className="sc-card" onClick={() => setSc(s)}>
              <span className="sc-top"><span className={'sc-lvl ' + s.level.toLowerCase()}>{s.level}</span><span className="muted">{s.who} · {s.role}</span></span>
              <b>{s.title}</b>
              <span className="muted">{s.mission}</span>
            </button>
          ))}
        </div>
        {!getSR() && <p className="note" style={{ marginTop: 20 }}>Seu navegador não reconhece fala, mas você pode conversar escrevendo. Para falar, use Chrome ou Edge.</p>}
      </div>
    </Shell>
  );
}

function Chat({ sc, onExit, onAgain }) {
  const [lines, setLines] = useState(() => [{ role: 'assistant', text: sc.opening[0], pt: sc.opening[1] }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [finished, setFinished] = useState(false);
  const [showPt, setShowPt] = useState({});
  const [summary, setSummary] = useState(null);
  const [sumBusy, setSumBusy] = useState(false);
  const { listening, listen, stop } = useListen();
  const { user } = useAuth();
  const endRef = useRef(null);
  const turns = lines.filter(l => l.role === 'user').length;
  const over = finished || turns >= MAX_TURNS;

  useEffect(() => { const t = setTimeout(() => speak(sc.opening[0]), 400); return () => clearTimeout(t); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [lines.length, busy]);

  async function send(text) {
    const t = text.trim().slice(0, MAX_CHARS);
    if (!t || busy || over) return;
    const next = [...lines, { role: 'user', text: t }];
    setLines(next); setInput(''); setErr(''); setBusy(true);
    try {
      const r = await askAI('conversa', { scenario: sc.id, messages: next.map(({ role, text }) => ({ role, text })) });
      setLines(ls => {
        const copy = [...ls];
        copy[copy.length - 1] = { ...copy[copy.length - 1], correction: r.correction?.has_error ? r.correction : null };
        return [...copy, { role: 'assistant', text: r.reply_en, pt: r.reply_pt }];
      });
      if (r.correction?.has_error) fx.play('wrong');
      speak(r.reply_en);
      if (r.finished) setFinished(true);
    } catch (e) {
      setErr(e.message);
      setLines(lines); setInput(t); // devolve a fala para tentar de novo
    }
    setBusy(false);
  }

  function mic() {
    if (listening) { stop(); return; }
    setErr('');
    listen({ interim: setInput, onResult: (alts) => send(alts[0]), onError: setErr });
  }

  async function finish() {
    setSumBusy(true); setErr('');
    try {
      setSummary(await askAI('conversa', { scenario: sc.id, mode: 'summary', messages: lines.map(({ role, text }) => ({ role, text })) }));
      logActivity(user?.id, 'conversa');
      fx.play('complete');
    } catch (e) { setErr(e.message); }
    setSumBusy(false);
  }

  if (summary) return <Summary sc={sc} s={summary} onExit={onExit} onAgain={onAgain} />;

  return (
    <div className="conv">
      <header className="lesson-top">
        <button type="button" className="icon-btn" aria-label="Sair da conversa" onClick={onExit}><Icon name="x" size={24} stroke={2.4} /></button>
        <div style={{ minWidth: 0 }}>
          <b style={{ display: 'block' }}>{sc.title}</b>
          <span className="muted" style={{ fontSize: 13 }}>Missão: {sc.mission}</span>
        </div>
        {turns > 0 && <button type="button" className="btn btn-out" style={{ marginLeft: 'auto', minHeight: 40 }} onClick={finish} disabled={sumBusy || busy}>{sumBusy ? 'Preparando…' : 'Terminar'}</button>}
      </header>

      <main className="conv-main" aria-live="polite">
        {lines.map((l, i) => l.role === 'assistant' ? (
          <div key={i} className="cv-row">
            <span className="cv-av" aria-hidden="true">{sc.who[0]}</span>
            <div className="cv-bub other">
              <span className="cv-who">{sc.who}</span>
              <span lang="en">{l.text}</span>
              {showPt[i] && l.pt && <span className="cv-pt">{l.pt}</span>}
              <span className="cv-act">
                {canSpeak() && <button type="button" className="link-btn" onClick={() => speak(l.text)}><Icon name="sound" size={14} />Ouvir</button>}
                {canSpeak() && <button type="button" className="link-btn" onClick={() => speak(l.text, { slow: true })}><Icon name="turtle" size={14} />Devagar</button>}
                {l.pt && <button type="button" className="link-btn" onClick={() => setShowPt(o => ({ ...o, [i]: !o[i] }))}>{showPt[i] ? 'Esconder tradução' : 'Tradução'}</button>}
              </span>
            </div>
          </div>
        ) : (
          <div key={i} className="cv-row me">
            <div className="cv-bub me"><span lang="en">{l.text}</span></div>
            {l.correction && (
              <div className="cv-fix">
                <span className="cv-fix-t"><Icon name="sparkle" size={14} />Mais natural:</span>
                <b lang="en">{l.correction.better}</b>
                {canSpeak() && <button type="button" className="icon-btn" style={{ width: 30, height: 30 }} aria-label={`Ouvir: ${l.correction.better}`} onClick={() => speak(l.correction.better)}><Icon name="sound" size={14} /></button>}
                <span className="cv-fix-why">{l.correction.why_pt}</span>
              </div>
            )}
          </div>
        ))}
        {busy && <div className="cv-row"><span className="cv-av" aria-hidden="true">{sc.who[0]}</span><div className="cv-bub other typing" role="status" aria-label={`${sc.who} está respondendo`}><span /><span /><span /></div></div>}
        {over && !busy && (
          <div className="cv-end">
            <b>{finished ? 'A conversa chegou ao fim!' : 'Você chegou ao limite de falas desta conversa.'}</b>
            <button type="button" className="btn btn-violet btn-3d" onClick={finish} disabled={sumBusy}>{sumBusy ? 'Preparando seu resumo…' : 'Ver meu resumo'}</button>
          </div>
        )}
        <div ref={endRef} />
      </main>

      <footer className="conv-bar">
        {err && <div className="alert" role="alert" style={{ marginBottom: 10 }}>{err}</div>}
        <form className="conv-in" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          {getSR() && (
            <button type="button" className={'mic sm' + (listening ? ' on' : '')} onClick={mic} disabled={busy || over} aria-label={listening ? 'Parar de ouvir' : 'Falar'}>
              <Icon name="mic" size={24} color="#fff" stroke={2.2} />
            </button>
          )}
          <input value={input} onChange={e => setInput(e.target.value)} maxLength={MAX_CHARS} disabled={busy || over} lang="en"
            placeholder={listening ? 'Ouvindo… fale em inglês' : getSR() ? 'Fale no microfone ou escreva em inglês' : 'Escreva em inglês'} aria-label="Sua fala em inglês" autoComplete="off" />
          <button type="submit" className="btn btn-violet" disabled={!input.trim() || busy || over} aria-label="Enviar"><Icon name="arrow" size={20} color="#fff" /></button>
        </form>
        <p className="muted conv-hint">{turns}/{MAX_TURNS} falas · Travou? Escreva em português que o personagem ajuda.</p>
      </footer>
    </div>
  );
}

export function Summary({ sc, s, onExit, onAgain, kicker = 'Resumo da conversa', againLabel = 'Conversar de novo', exitLabel = 'Outra situação' }) {
  const { notes } = useNotebook();
  const [saved, setSaved] = useState(null);
  function saveAll() {
    let n = 0;
    for (const f of s.frases) { const r = saveWord(notes, { en: f.en, pt: f.pt, plain: `Conversa: ${sc.title}` }); if (!r.existed) n++; }
    setSaved(n);
  }
  return (
    <div className="conv-sum">
      <div className="card">
        <p className="q-label" style={{ margin: 0 }}>{kicker} · {sc.title}</p>
        <h1 style={{ fontSize: 30, margin: '6px 0 10px' }}>Mandou bem por praticar!</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, margin: 0 }}>{s.resumo_pt}</p>
      </div>
      {s.acertos.length > 0 && (
        <div className="card">
          <h2 className="sum-h ok"><Icon name="check" size={20} />O que você fez bem</h2>
          <ul className="sum-list">{s.acertos.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </div>
      )}
      {s.erros.length > 0 && (
        <div className="card">
          <h2 className="sum-h bad"><Icon name="review" size={20} />Para revisar</h2>
          {s.erros.map((e, i) => (
            <div key={i} className="sum-err">
              <span className="muted">Você disse: <s lang="en">{e.voce_disse}</s></span>
              <b lang="en">{e.melhor}</b>
              <span>{e.porque}</span>
            </div>
          ))}
        </div>
      )}
      {s.frases.length > 0 && (
        <div className="card">
          <h2 className="sum-h"><Icon name="cards" size={20} />Frases para guardar</h2>
          {s.frases.map((f, i) => (
            <div key={i} className="sum-phrase">
              {canSpeak() && <button type="button" className="icon-btn" style={{ width: 34, height: 34, flex: 'none' }} aria-label={`Ouvir: ${f.en}`} onClick={() => speak(f.en)}><Icon name="sound" size={16} /></button>}
              <div><b lang="en">{f.en}</b><br /><span className="muted">{f.pt}</span></div>
            </div>
          ))}
          <button type="button" className="btn btn-violet" style={{ marginTop: 14 }} onClick={saveAll} disabled={saved != null}>
            <Icon name={saved != null ? 'check' : 'cards'} size={18} color="#fff" />
            {saved == null ? 'Salvar como flashcards no caderno' : saved ? `${saved} ${saved === 1 ? 'cartão novo salvo' : 'cartões novos salvos'}` : 'Essas frases já estavam no caderno'}
          </button>
          {saved != null && <Link to="/caderno?aba=cartoes" className="link-btn" style={{ marginLeft: 14 }}>Ir para os cartões</Link>}
        </div>
      )}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button type="button" className="btn btn-violet btn-lg btn-3d" onClick={onAgain}>{againLabel}</button>
        <button type="button" className="btn btn-out btn-lg" onClick={onExit}>{exitLabel}</button>
      </div>
    </div>
  );
}
