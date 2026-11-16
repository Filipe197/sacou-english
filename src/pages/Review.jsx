import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LessonRunner from '../components/LessonRunner.jsx';
import { getItem } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { supabase } from '../lib/supabase.js';
import { Shell, Spinner, Icon } from '../components/ui.jsx';

export default function Review() {
  const prog = useProgress();
  const { setProfile } = useAuth();
  const [started, setStarted] = useState(false);

  const entries = useMemo(() => prog.mistakes
    .map(m => { const f = getItem(m.item_id); return f && { item: f.item, lessonId: f.lesson.id, unit: f.lesson.unit, times: m.times }; })
    .filter(Boolean).slice(0, 10), [prog.mistakes]);

  if (prog.loading) return <Spinner />;

  if (started && entries.length) {
    return (
      <LessonRunner
        entries={entries}
        title="Revisão dos seus erros"
        exitTo="/revisao"
        retryWrong={false}
        finishCta="Voltar"
        onItemResult={(e, ok) => { supabase.rpc(ok ? 'resolve_mistake' : 'record_mistake', ok ? { p_item_id: e.item.id } : { p_item_id: e.item.id, p_lesson_id: e.lessonId }).then(({ error }) => error && console.error(error)); }}
        onFinish={async ({ score }) => {
          const { data } = await supabase.rpc('complete_lesson', { p_lesson_id: 'review', p_score: score, p_xp: 5 });
          if (data) setProfile(data);
          return { xp: 5, streak: data?.streak, title: 'Revisão concluída!', message: 'O que você acertou saiu da lista. O que errou de novo continua aqui para a próxima revisão.', to: '/aprender' };
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
            <h2 style={{ fontSize: 20, margin: '32px 0 12px' }}>O que você vai revisar</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {entries.map(e => (
                <div key={e.item.id} className="card" style={{ padding: 16, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <span lang="en" style={{ fontWeight: 600 }}>{e.item.en || e.item.pt || e.item.pairs?.map(p => p[0]).join(', ')}</span>
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
