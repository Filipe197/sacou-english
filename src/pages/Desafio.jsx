// Desafio final da unidade: o aluno escreve (ou fala) de 3 a 5 frases sobre o tema, sem
// pistas, e o professor de IA corrige: nota, o que ele já consegue fazer (objetivo do CEFR
// da unidade), correções e uma versão melhorada. O rascunho fica salvo se a página recarregar.
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Shell, Icon, Spinner } from '../components/ui.jsx';
import { useListen, getSR } from '../components/Pronounce.jsx';
import { getUnit } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { askAI } from '../lib/ai.js';
import { finishSession } from '../lib/finish-session.js';
import { speak, canSpeak, fx } from '../lib/fx.js';
import { keepRead, keepWrite, keepClear } from '../lib/keep.js';

const MAX = 900;
export const challengeId = (unitId) => `desafio-${unitId}`;

export default function Desafio() {
  const { unitId } = useParams();
  const unit = getUnit(unitId);
  const prog = useProgress();
  const { user, setProfile } = useAuth();
  const key = `${user?.id || 'anon'}:desafio:${unitId}`;
  const [text, setText] = useState(() => keepRead(key, 7 * 864e5)?.text || '');
  const [result, setResult] = useState(() => keepRead(key, 7 * 864e5)?.result || null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [idea, setIdea] = useState(false);
  const [saved, setSaved] = useState(null);
  const { listening, listen, stop } = useListen();

  useEffect(() => { if (text || result) keepWrite(key, { text, result }); }, [text, result]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!unit) return <Navigate to="/aprender" replace />;
  if (prog.loading) return <Spinner />;
  const complete = unit.lessons.every(l => prog.done.has(l.id));
  const best = prog.scores[challengeId(unit.id)]?.best_score;
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  function mic() {
    if (listening) { stop(); return; }
    setErr('');
    const base = text.trim();
    listen({
      interim: (t) => setText(`${base}${base ? ' ' : ''}${t}`.slice(0, MAX)),
      onResult: (alts) => setText(`${base}${base ? ' ' : ''}${alts[0] || ''}`.trim().slice(0, MAX)),
      onError: setErr,
    });
  }

  async function send() {
    if (busy) return;
    if (words < 6) { setErr('Escreva pelo menos uma ou duas frases completas em inglês.'); return; }
    setBusy(true); setErr('');
    try {
      const r = await askAI('desafio', { unitId: unit.id, answer: text });
      setResult(r);
      fx.play(r.nota >= 50 ? 'complete' : 'wrong');
      const s = await finishSession({ uid: user?.id, lessonId: challengeId(unit.id), score: r.nota, xp: r.nota >= 50 ? 15 : 5, activity: 'treino', setProfile });
      setSaved(s);
    } catch (e) { setErr(e.message); }
    setBusy(false);
  }

  function again() { setResult(null); setSaved(null); setErr(''); }

  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div className="dz">
        <Link to="/aprender" className="dz-back"><Icon name="back" size={18} />Trilha</Link>
        <div className="dz-head">
          <span className="eyebrow">Desafio escrito · Nível {unit.level} · Unidade {unit.order}</span>
          <h1>{unit.title}</h1>
          {unit.can_do?.text && <p className="dz-goal"><Icon name="target" size={18} /><span><b>Objetivo:</b> {unit.can_do.text}</span></p>}
          {best != null && !result && <p className="muted" style={{ margin: '6px 0 0' }}>Sua melhor nota até agora: <b>{best}</b></p>}
        </div>

        {!complete && !result ? (
          <div className="card dz-lock">
            <Icon name="lock" size={28} />
            <div><b>Termine as lições da unidade para liberar o desafio.</b><p className="muted">O desafio usa tudo o que a unidade ensina, sem pistas.</p></div>
            <Link to="/aprender" className="btn btn-violet">Ir para a trilha</Link>
          </div>
        ) : !result ? (
          <div className="card dz-task">
            <p className="dz-ask"><b>Sua tarefa:</b> escreva de 3 a 5 frases em inglês sobre “{unit.title.toLowerCase()}”, do seu jeito, usando o que aprendeu. Sem banco de palavras e sem tradução. O professor corrige e diz se você já cumpriu o objetivo.</p>
            <button type="button" className="dz-idea" onClick={() => setIdea(v => !v)} aria-expanded={idea}>💡 {idea ? 'Esconder ideias' : 'Preciso de uma ideia'}</button>
            {idea && (
              <div className="dz-ideas">
                <span className="muted">{unit.subtitle} Palavras que você pode usar:</span>
                <div className="dz-chips" lang="en">{(unit.words || []).slice(0, 12).map(w => <span key={Array.isArray(w) ? w[0] : w.en}>{Array.isArray(w) ? w[0] : w.en}</span>)}</div>
              </div>
            )}
            <textarea className="dz-in" lang="en" value={text} maxLength={MAX} rows={7} spellCheck={false} autoCapitalize="sentences"
              aria-label="Seu texto em inglês" placeholder="Write here in English…" onChange={e => setText(e.target.value)} disabled={busy} />
            <div className="dz-bar">
              <span className="muted">{words} {words === 1 ? 'palavra' : 'palavras'}</span>
              {getSR() && <button type="button" className={'btn btn-out' + (listening ? ' on' : '')} onClick={mic} disabled={busy}><Icon name="mic" size={18} />{listening ? 'Parar' : 'Falar em vez de escrever'}</button>}
              <button type="button" className="btn btn-violet btn-3d" onClick={send} disabled={busy || words < 6}>{busy ? 'Corrigindo…' : 'Enviar para correção'}</button>
            </div>
            {err && <p className="alert" role="alert" style={{ marginTop: 12 }}>{err}</p>}
          </div>
        ) : (
          <div className="dz-result">
            <div className={'card dz-score' + (result.nota >= 70 ? ' good' : result.nota >= 50 ? ' ok' : ' low')}>
              <span className="dz-ring" style={{ '--p': result.nota }}><b>{result.nota}</b><small>de 100</small></span>
              <div>
                <b className="dz-can">{result.consegue}</b>
                <p>{result.resumo}</p>
                {saved?.xp != null && <span className="dz-xp">+{saved.xp} XP</span>}
              </div>
            </div>
            {result.pontos_fortes?.length > 0 && (
              <div className="card"><b className="dz-h">👍 O que você fez bem</b><ul className="dz-list">{result.pontos_fortes.map((p, i) => <li key={i}>{p}</li>)}</ul></div>
            )}
            {result.correcoes?.length > 0 && (
              <div className="card"><b className="dz-h">✏️ Correções</b>
                <ul className="dz-fix">{result.correcoes.map((c, i) => (
                  <li key={i}><span className="dz-from" lang="en">{c.original}</span><Icon name="arrow" size={16} /><span className="dz-to" lang="en">{c.correto}</span><p>{c.explicacao}</p></li>
                ))}</ul>
              </div>
            )}
            {result.versao_melhorada && (
              <div className="card"><b className="dz-h">✨ Seu texto, melhorado</b>
                <p className="dz-better" lang="en">{result.versao_melhorada}</p>
                {canSpeak() && <button type="button" className="btn btn-out" onClick={() => speak(result.versao_melhorada)}><Icon name="sound" size={18} />Ouvir</button>}
              </div>
            )}
            {result.dica && <p className="note">💡 {result.dica}</p>}
            <div className="dz-actions">
              <button type="button" className="btn btn-out btn-lg" onClick={again}>Tentar de novo</button>
              <Link className="btn btn-violet btn-lg btn-3d" to="/aprender" onClick={() => keepClear(key)}>Voltar para a trilha</Link>
            </div>
          </div>
        )}
      </div>
    </Shell>
  );
}
