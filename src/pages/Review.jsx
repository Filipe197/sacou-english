import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LessonRunner from '../components/LessonRunner.jsx';
import { getItem, getUnit, getLesson } from '../lib/content.js';
import { askAI } from '../lib/ai.js';
import { useProgress } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { rpcOrQueue } from '../lib/offline.js';
import { finishSession } from '../lib/finish-session.js';
import { Shell, Spinner, Icon, Anim } from '../components/ui.jsx';

export default function Review() {
  const prog = useProgress();
  const { user, setProfile } = useAuth();
  const [started, setStarted] = useState(false);
  const [ai, setAi] = useState(null); // treino gerado pela IA
  const [aiBusy, setAiBusy] = useState(false);
  const [aiErr, setAiErr] = useState('');
  const [aiRun, setAiRun] = useState(0);
  const itemResults = useRef([]);

  // "Voltar" no fim do treino abre /revisao de novo: sai do treino
  const loc = useLocation();
  useEffect(() => { setAi(null); setStarted(false); itemResults.current = []; }, [loc.key]);

  async function startAI() {
    setAiBusy(true); setAiErr('');
    try {
      const r = await askAI('treino', {});
      const list = r.items.map(it => ({ item: it, lessonId: it.lessonId, unit: getUnit(it.unitId), story: getLesson(it.lessonId)?.story })).filter(e => e.unit);
      if (!list.length) throw new Error('Não consegui montar o treino agora. Tente de novo.');
      setAi(list); setAiRun(n => n + 1);
    } catch (e) { setAiErr(e.message); }
    setAiBusy(false);
  }

  const entries = useMemo(() => prog.mistakes
    .map(m => { const f = getItem(m.item_id); return f && f.item.type !== 'story' && { item: f.item, lessonId: f.lesson.id, unit: f.lesson.unit, story: f.lesson.story, times: m.times }; })
    .filter(Boolean).slice(0, 10), [prog.mistakes]);

  if (prog.loading) return <Spinner />;

  if (ai) {
    return (
      <LessonRunner
        key={aiRun}
        introduceWords={false}
        entries={ai}
        title="Treino infinito"
        exitTo="/revisao"
        retryWrong
        finishCta="Voltar"
        onFinish={async ({ score, attemptId }) => {
          const saved = await finishSession({ uid: user?.id, attemptId, lessonId: 'treino-ia', score, xp: 5, activity: 'treino', setProfile });
          return { title: 'Treino concluído!', message: 'Exercícios novos, feitos sob medida para os seus erros. Quer mais? Gere outro treino quando quiser.', to: '/revisao', ...saved };
        }}
      />
    );
  }

  if (started && entries.length) {
    return (
      <LessonRunner
        introduceWords={false}
        entries={entries}
        title="Revisão dos seus erros"
        exitTo="/revisao"
        retryWrong={false}
        finishCta="Voltar"
        onItemResult={(e, ok) => { itemResults.current.push(rpcOrQueue(user?.id, ok ? 'resolve_mistake' : 'record_mistake', ok ? { p_item_id: e.item.id } : { p_item_id: e.item.id, p_lesson_id: e.lessonId })); }}
        onFinish={async ({ score, attemptId }) => {
          const saved = await finishSession({ uid: user?.id, attemptId, lessonId: 'review', score, xp: 5, activity: 'review', itemResults: itemResults.current, setProfile });
          return { title: 'Revisão concluída!', message: 'O que você acertou saiu da lista. O que errou de novo continua aqui para a próxima revisão.', to: '/aprender', ...saved };
        }}
      />
    );
  }

  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, margin: '0 0 8px' }}>Revisar erros</h1>
        <p className="muted" style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 28px' }}>
          Toda vez que você erra um exercício, ele vem para cá. Acertou na revisão? Ele sai da lista. É assim que o que é difícil vira fácil.
        </p>
        {prog.error && <div className="alert" role="alert">{prog.error}</div>}
        {!entries.length ? (
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Anim name="all-clear" size={140} loop /></div>
            <Icon name="check" size={40} color="var(--ok)" stroke={2.5} />
            <h2 style={{ margin: '12px 0 8px' }}>Nada para revisar agora</h2>
            <p className="muted" style={{ margin: '0 0 20px' }}>Você não tem erros pendentes. Continue a trilha!</p>
            <Link to="/aprender" className="btn btn-violet">Voltar para a trilha</Link>
          </div>
        ) : (
          <>
            <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>
              <div>
                <b style={{ fontSize: 20 }}>{prog.mistakes.length} {prog.mistakes.length === 1 ? 'exercício' : 'exercícios'} para revisar</b>
                <p style={{ margin: '4px 0 0', color: 'var(--on-dark)' }}>Uma sessão tem até 10 exercícios e leva uns 3 minutos.</p>
              </div>
              <button className="btn btn-lime btn-lg" onClick={() => setStarted(true)}>Começar revisão</button>
            </div>
            <div className="card ai-train">
              <div>
                <span className="ai-tag"><Icon name="sparkle" size={14} />Treino infinito</span>
                <b style={{ display: 'block', fontSize: 19, margin: '8px 0 4px' }}>Exercícios novos sobre os seus erros</b>
                <p className="muted" style={{ margin: 0, fontSize: 15, lineHeight: 1.5 }}>O professor cria frases diferentes treinando as mesmas regras em que você tropeçou. Cada treino é único, e todas as palavras são conferidas na lista oficial do seu nível.</p>
                {aiErr && <div className="alert" role="alert" style={{ marginTop: 10 }}>{aiErr}</div>}
              </div>
              <button className="btn btn-violet btn-lg" onClick={startAI} disabled={aiBusy}><Icon name="sparkle" size={18} color="#fff" />{aiBusy ? 'Criando seu treino…' : 'Gerar treino'}</button>
            </div>
            <h2 style={{ fontSize: 20, margin: '32px 0 12px' }}>O que você vai revisar</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {entries.map(e => (
                <div key={e.item.id} className="card" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <span lang="en" style={{ fontWeight: 600 }}>{e.item.en || e.item.lines?.map(l => l[1]).join(' / ') || e.item.pt || e.item.pairs?.map(p => p[0]).join(', ')}</span>
                  <span className="muted" style={{ fontSize: 14, whiteSpace: 'nowrap' }}>{e.unit.title} · errou {e.times}x</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}
