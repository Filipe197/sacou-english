// Professor de IA: explica o erro específico do aluno e responde dúvidas sobre ele.
import { useEffect, useRef, useState } from 'react';
import { Icon } from './ui.jsx';
import { speak, canSpeak } from '../lib/fx.js';
import { askAI, textDoc, heading } from '../lib/ai.js';
import { notebook, useNotebook } from '../lib/notebook.js';

const QUICK = ['Me dá outro exemplo', 'Ainda não entendi', 'Quando eu uso isso?'];
const MAX_Q = 3;

export default function Tutor({ item, answer, correct, level, ctx, onClose }) {
  useNotebook(); // garante o caderno carregado para o botão "Salvar"
  const [first, setFirst] = useState(null);
  const [thread, setThread] = useState([]); // [{ q, a }]
  const [busy, setBusy] = useState(true);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [pending, setPending] = useState(''); // pergunta enviada, esperando a resposta
  const [saved, setSaved] = useState(false);
  const endRef = useRef(null);
  const payload = {
    item: { type: item.type, prompt: item.prompt || item.q || '', en: item.en || '', pt: item.pt || '', options: item.options || [], correct, why: item.why || '', level },
    answer,
  };

  async function run(question) {
    setBusy(true); setErr(''); setPending(question || '');
    try {
      const history = [];
      if (first) {
        history.push({ role: 'assistant', text: full(first) });
        for (const t of thread) { history.push({ role: 'user', text: t.q }); history.push({ role: 'assistant', text: t.a.explicacao }); }
      }
      const r = await askAI('explicar', { ...payload, history, question: question || '' });
      if (!first) setFirst(r); else setThread(t => [...t, { q: question, a: r }]);
      setQ('');
    } catch (e) { setErr(e.message); }
    setBusy(false); setPending('');
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
  }
  const started = useRef(false);
  useEffect(() => { if (!started.current) { started.current = true; run(); } }, []);

  function save() {
    const blocks = [heading('O que eu errei'), `Minha resposta: ${answer || '(em branco)'}`, `Resposta certa: ${correct}`, heading('Explicação'), first.explicacao];
    if (first.dica) blocks.push(`Dica: ${first.dica}`);
    if (first.exemplo_en) blocks.push(`Exemplo: ${first.exemplo_en} (${first.exemplo_pt})`);
    for (const t of thread) { blocks.push(heading(t.q)); blocks.push(t.a.explicacao); if (t.a.exemplo_en) blocks.push(`Exemplo: ${t.a.exemplo_en} (${t.a.exemplo_pt})`); }
    const doc = textDoc(blocks);
    notebook.create({
      title: `Professor: ${correct}`.slice(0, 120), content: doc, plain: blocks.filter(b => typeof b === 'string').join('\n'),
      color: 'violet', tags: ['professor'], lesson_id: ctx.lessonId, unit_id: ctx.unitId, item_id: ctx.itemId,
    });
    setSaved(true);
  }

  const asked = thread.length;
  return (
    <section className="tutor" aria-label="Professor de IA" aria-busy={busy}>
      <header className="tutor-h">
        <span className="tutor-ic"><Icon name="sparkle" size={18} color="#fff" /></span>
        <b>Professor Sacou</b>
        <button type="button" className="icon-btn" style={{ width: 36, height: 36, marginLeft: 'auto' }} aria-label="Fechar professor" onClick={onClose}><Icon name="x" size={18} /></button>
      </header>

      {first && <Answer r={first} />}
      {thread.map((t, i) => (
        <div key={i}>
          <p className="tutor-q">{t.q}</p>
          <Answer r={t.a} />
        </div>
      ))}
      {busy && pending && <p className="tutor-q">{pending}</p>}
      {busy && <div className="tutor-wait" role="status"><span /><span /><span />{first ? 'Pensando…' : 'Analisando a sua resposta…'}</div>}
      {err && <div className="alert" role="alert" style={{ marginTop: 10 }}>{err} {!first && <button type="button" className="link-btn" onClick={() => run()}>Tentar de novo</button>}</div>}

      {first && !busy && (
        <div className="tutor-foot">
          {asked < MAX_Q ? (
            <>
              <div className="tutor-chips">
                {QUICK.map(t => <button key={t} type="button" className="chip" onClick={() => run(t)}>{t}</button>)}
              </div>
              <form className="tutor-ask" onSubmit={(e) => { e.preventDefault(); if (q.trim()) run(q.trim()); }}>
                <input value={q} onChange={e => setQ(e.target.value)} maxLength={300} placeholder="Pergunte sobre este exercício…" aria-label="Sua pergunta para o professor" />
                <button type="submit" className="btn btn-violet" disabled={!q.trim()}>Perguntar</button>
              </form>
            </>
          ) : <p className="muted" style={{ fontSize: 14, margin: 0 }}>Ainda com dúvida? Abra o guia da unidade ou anote no caderno para revisar depois.</p>}
          <button type="button" className="link-btn" style={{ fontSize: 14 }} onClick={save} disabled={saved}>
            <Icon name={saved ? 'check' : 'notebook'} size={16} />{saved ? 'Salvo no caderno' : 'Salvar explicação no caderno'}
          </button>
        </div>
      )}
      <div ref={endRef} className="tutor-end" />
    </section>
  );
}

function Answer({ r }) {
  return (
    <div className="tutor-a">
      <p>{r.explicacao}</p>
      {r.dica && <p className="tutor-tip"><b>Dica:</b> {r.dica}</p>}
      {r.exemplo_en && (
        <div className="tutor-ex">
          {canSpeak() && <button type="button" className="icon-btn" style={{ width: 34, height: 34, flex: 'none' }} aria-label={`Ouvir: ${r.exemplo_en}`} onClick={() => speak(r.exemplo_en)}><Icon name="sound" size={16} /></button>}
          <div><b lang="en">{r.exemplo_en}</b>{r.exemplo_pt && <span className="muted"> — {r.exemplo_pt}</span>}</div>
        </div>
      )}
    </div>
  );
}

const full = (r) => [r.explicacao, r.dica && `Dica: ${r.dica}`, r.exemplo_en && `Exemplo: ${r.exemplo_en} (${r.exemplo_pt})`].filter(Boolean).join('\n');
