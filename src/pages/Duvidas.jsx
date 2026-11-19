// Tira-dúvidas: o aluno pergunta qualquer coisa sobre inglês e o professor de IA
// responde em português, com exemplos para ouvir e a opção de salvar no caderno.
import { useEffect, useRef, useState } from 'react';
import { Shell, Icon } from '../components/ui.jsx';
import { speak, canSpeak } from '../lib/fx.js';
import { askAI, textDoc, heading, bullets } from '../lib/ai.js';
import { notebook, useNotebook } from '../lib/notebook.js';
import { useProgress } from '../lib/progress.js';
import { currentLevel } from '../lib/content.js';
import { useAuth } from '../lib/auth.jsx';
import { keepRead, keepWrite, keepClear } from '../lib/keep.js';

const MAX_Q = 10; // perguntas por conversa (o servidor confere o mesmo número)
const MAX_CHARS = 400;
const IDEAS = [
  'Qual a diferença entre this, that, these e those?',
  'Quando eu uso do e quando uso does?',
  'Como usar in, on e at com lugares e horas?',
  'Qual a diferença entre make e do?',
  'Quando usar a e quando usar an?',
  'Como se diz "estou com fome" em inglês?',
];

export default function Duvidas() {
  useNotebook(); // caderno carregado para o botão "Salvar"
  const prog = useProgress();
  const level = prog.loading ? 'A1' : currentLevel(prog.done);
  const { user } = useAuth();
  const dk = `${user?.id || 'anon'}:duvidas`;
  // a conversa fica salva no aparelho: recarregar a página não apaga as respostas
  const [turns, setTurns] = useState(() => keepRead(dk, 24 * 3600 * 1000)?.turns || []); // [{ q, a, saved }]
  useEffect(() => { if (turns.length) keepWrite(dk, { turns }); }, [turns]); // eslint-disable-line react-hooks/exhaustive-deps
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null); // { msg, question }
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const full = turns.length >= MAX_Q;

  useEffect(() => {
    if (turns.length || busy) endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [turns.length, busy]);

  async function ask(text) {
    const question = text.trim().slice(0, MAX_CHARS);
    if (!question || busy || full) return;
    setBusy(true); setErr(null); setQ('');
    const history = turns.flatMap(t => [{ role: 'user', text: t.q }, { role: 'assistant', text: answerText(t.a) }]);
    try {
      const a = await askAI('duvidas', { question, level, history });
      setTurns(ts => [...ts, { q: question, a, saved: false }]);
    } catch (e) {
      setErr({ msg: e.message, question });
      setQ(question);
    }
    setBusy(false);
    setTimeout(() => inputRef.current?.focus(), 30);
  }

  function save(i) {
    const { q: question, a } = turns[i];
    const blocks = [heading(question), ...a.resposta.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)];
    if (a.exemplos.length) { blocks.push(heading('Exemplos', 4)); blocks.push(bullets(a.exemplos.map(e => `${e.en} — ${e.pt}`))); }
    if (a.dica) blocks.push(`Dica: ${a.dica}`);
    notebook.create({
      title: `Dúvida: ${question}`.slice(0, 120), content: textDoc(blocks), plain: answerText(a),
      color: 'violet', tags: ['dúvida'],
    });
    setTurns(ts => ts.map((t, j) => (j === i ? { ...t, saved: true } : t)));
  }

  function reset() { keepClear(dk); setTurns([]); setErr(null); setQ(''); inputRef.current?.focus(); }

  return (
    <Shell>
      <div className="dv">
        <header className="dv-head">
          <span className="tutor-ic dv-ic"><Icon name="sparkle" size={22} color="#fff" /></span>
          <div className="dv-head-text">
            <h1>Tirar dúvidas</h1>
            <p className="muted">Pergunte qualquer coisa sobre inglês. O professor explica em português, com exemplos do seu nível ({level}).</p>
            <p className="dv-note">As respostas são criadas por IA e podem ter erros. Na dúvida, confira no Guia de gramática.</p>
          </div>
          {turns.length > 0 && <button type="button" className="btn btn-out dv-new" onClick={reset}>Nova conversa</button>}
        </header>

        {!turns.length && !busy && (
          <section className="dv-ideas" aria-label="Sugestões de perguntas">
            <p className="q-label">Experimente perguntar</p>
            <div className="tutor-chips">
              {IDEAS.map(t => <button key={t} type="button" className="chip" onClick={() => ask(t)}>{t}</button>)}
            </div>
          </section>
        )}

        <div className="dv-thread" aria-live="polite">
          {turns.map((t, i) => (
            <div key={i} className="dv-turn">
              <p className="tutor-q">{t.q}</p>
              <Answer a={t.a} saved={t.saved} onSave={() => save(i)} />
            </div>
          ))}
          {busy && <div className="tutor-wait" role="status"><span /><span /><span />Pensando na resposta…</div>}
          {err && (
            <div className="alert" role="alert">
              {err.msg} <button type="button" className="link-btn" onClick={() => ask(err.question)}>Tentar de novo</button>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="dv-bar">
          {full ? (
            <div className="dv-full">
              <span className="muted">Esta conversa chegou a {MAX_Q} perguntas.</span>
              <button type="button" className="btn btn-violet btn-3d" onClick={reset}>Nova conversa</button>
            </div>
          ) : (
            <form className="tutor-ask" onSubmit={e => { e.preventDefault(); ask(q); }}>
              <input ref={inputRef} value={q} maxLength={MAX_CHARS} disabled={busy} autoComplete="off"
                onChange={e => setQ(e.target.value)} placeholder="Escreva sua dúvida…" aria-label="Sua dúvida de inglês" />
              <button type="submit" className="btn btn-violet btn-3d" disabled={busy || !q.trim()}>Perguntar</button>
            </form>
          )}
        </div>
      </div>
    </Shell>
  );
}

function Answer({ a, saved, onSave }) {
  return (
    <div className="tutor-a dv-a">
      {a.resposta.split(/\n\s*\n/).filter(p => p.trim()).map((p, i) => <p key={i}>{p.trim()}</p>)}
      {a.exemplos.map((e, i) => (
        <div key={i} className="tutor-ex">
          {canSpeak() && <button type="button" className="icon-btn" style={{ width: 34, height: 34, flex: 'none' }} aria-label={`Ouvir: ${e.en}`} onClick={() => speak(e.en)}><Icon name="sound" size={16} /></button>}
          <div><b lang="en">{e.en}</b>{e.pt && <span className="muted"> — {e.pt}</span>}</div>
        </div>
      ))}
      {a.dica && <p className="tutor-tip"><b>Dica:</b> {a.dica}</p>}
      {!a.fora_do_tema && (
        <button type="button" className="link-btn dv-save" onClick={onSave} disabled={saved}>
          <Icon name={saved ? 'check' : 'notebook'} size={16} />{saved ? 'Salvo no caderno' : 'Salvar no caderno'}
        </button>
      )}
    </div>
  );
}

const answerText = (a) => [a.resposta, ...a.exemplos.map(e => `${e.en} — ${e.pt}`), a.dica && `Dica: ${a.dica}`].filter(Boolean).join('\n');
