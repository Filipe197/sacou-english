import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LessonRunner from '../components/LessonRunner.jsx';
import { LESSONS, shuffle } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { supabase } from '../lib/supabase.js';
import { Shell, Spinner, Icon } from '../components/ui.jsx';

// Treino livre: 12 exercícios sorteados das lições que o aluno já concluiu.
// As lições recentes pesam mais, para fixar o que acabou de aprender.
export default function Practice() {
  const prog = useProgress();
  const { setProfile } = useAuth();
  const [started, setStarted] = useState(0);

  const done = LESSONS.filter(l => prog.done.has(l.id));
  const entries = useMemo(() => {
    if (!done.length) return [];
    const recent = done.slice(-6);
    const pool = [...done, ...recent].flatMap(l => l.items.map(item => ({ item, lessonId: l.id, unit: l.unit })));
    const seen = new Set();
    return shuffle(pool).filter(e => !seen.has(e.item.id) && seen.add(e.item.id)).slice(0, 12);
  }, [prog.done, started]);

  if (prog.loading) return <Spinner />;

  if (started && entries.length) {
    return (
      <LessonRunner
        key={started}
        entries={entries}
        title="Treino"
        exitTo="/praticar"
        retryWrong={false}
        finishCta="Voltar"
        onItemResult={(e, ok) => { if (!ok) supabase.rpc('record_mistake', { p_item_id: e.item.id, p_lesson_id: e.lessonId }).then(({ error }) => error && console.error(error)); }}
        onFinish={async ({ score }) => {
          const xp = score >= 90 ? 10 : 5;
          const { data } = await supabase.rpc('complete_lesson', { p_lesson_id: 'practice', p_score: score, p_xp: xp });
          if (data) setProfile(data);
          return { xp, streak: data?.streak, title: 'Treino concluído!', message: 'O que você errou foi para a revisão. Treinar um pouco todo dia é o que faz o inglês ficar.', to: '/praticar' };
        }}
      />
    );
  }

  return (
    <Shell mistakesCount={prog.mistakes.length}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ fontSize: 36, margin: '0 0 8px' }}>Praticar</h1>
        <p className="muted" style={{ fontSize: 17, lineHeight: 1.6, margin: '0 0 28px' }}>
          Um treino com 12 exercícios sorteados de tudo o que você já estudou — com mais peso para as lições recentes. Cada treino é diferente, então dá para fazer quantas vezes quiser.
        </p>
        {!done.length ? (
          <div className="card" style={{ textAlign: 'center', padding: 40 }}>
            <h2 style={{ margin: '0 0 8px' }}>Faça sua primeira lição</h2>
            <p className="muted" style={{ margin: '0 0 20px' }}>O treino usa as lições que você já concluiu.</p>
            <Link to="/aprender" className="btn btn-violet">Ir para a trilha</Link>
          </div>
        ) : (
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>
            <div>
              <b style={{ fontSize: 20 }}>Treino de {done.length} {done.length === 1 ? 'lição' : 'lições'}</b>
              <p style={{ margin: '4px 0 0', color: 'var(--on-dark)' }}>12 exercícios · cerca de 4 minutos · até 10 XP</p>
            </div>
            <button className="btn btn-lime btn-lg" onClick={() => setStarted(n => n + 1)}><Icon name="review" size={18} />Começar treino</button>
          </div>
        )}
      </div>
    </Shell>
  );
}
