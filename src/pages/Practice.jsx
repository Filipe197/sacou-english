import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import LessonRunner from '../components/LessonRunner.jsx';
import { LESSONS, shuffle } from '../lib/content.js';
import { useProgress, dueLessonIds } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { supabase } from '../lib/supabase.js';
import { logActivity } from '../lib/offline.js';
import { Shell, Spinner, Icon } from '../components/ui.jsx';

// Treino livre: 12 exercícios sorteados das lições que o aluno já concluiu.
// As lições recentes pesam mais, para fixar o que acabou de aprender.
export default function Practice() {
  const prog = useProgress();
  const { user, setProfile } = useAuth();
  const [started, setStarted] = useState(0);

  const done = LESSONS.filter(l => prog.done.has(l.id));
  const dueIds = new Set(dueLessonIds(prog.scores));
  const due = done.filter(l => dueIds.has(l.id));
  const entries = useMemo(() => {
    if (!done.length) return [];
    // lições "na hora de revisar" entram 3 vezes no sorteio; as recentes, 2 vezes
    const recent = done.slice(-6);
    const pool = [...done, ...recent, ...due, ...due].flatMap(l => l.items.filter(i => i.type !== 'story').map(item => ({ item, lessonId: l.id, unit: l.unit, story: l.story })));
    const seen = new Set();
    return shuffle(pool).filter(e => !seen.has(e.item.id) && seen.add(e.item.id)).slice(0, 12);
  }, [prog.done, started]);

  if (prog.loading) return <Spinner />;

  if (started && entries.length) {
    return (
      <LessonRunner
        introduceWords={false}
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
          logActivity(user?.id, 'practice');
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
          Um treino com 12 exercícios sorteados de tudo o que você já estudou. Ele usa <b>revisão espaçada</b>: cada lição volta 1, 3, 7, 14 e 30 dias depois de feita, que é quando a memória mais precisa de um reforço. Cada treino é diferente.
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
              {due.length > 0 && <p style={{ margin: '8px 0 0', color: 'var(--lime)', fontWeight: 600 }}>{due.length} {due.length === 1 ? 'lição está' : 'lições estão'} no dia de relembrar: {due.slice(0, 3).map(l => l.title).join(', ')}{due.length > 3 ? '...' : ''}</p>}
            </div>
            <button className="btn btn-lime btn-lg" onClick={() => setStarted(n => n + 1)}><Icon name="review" size={18} />Começar treino</button>
          </div>
        )}

        <h2 style={{ fontSize: 20, margin: '32px 0 12px' }}>Mais formas de praticar</h2>
        <div className="pr-grid">
          <Link to="/revisao" className="pr-card">
            <span className="pr-ic" style={{ background: 'var(--bad-bg)', color: 'var(--bad)' }}><Icon name="review" size={24} /></span>
            <span><b>Revisar erros</b><span className="muted">{prog.mistakes.length ? `${prog.mistakes.length} ${prog.mistakes.length === 1 ? 'exercício' : 'exercícios'} para refazer, e treino infinito com IA.` : 'Nenhum erro pendente. Mandou bem!'}</span></span>
            {prog.mistakes.length > 0 && <span className="pr-badge">{prog.mistakes.length > 9 ? '9+' : prog.mistakes.length}</span>}
          </Link>
          <Link to="/fone" className="pr-card">
            <span className="pr-ic" style={{ background: '#E0F2FE', color: '#0369A1' }}><Icon name="headphones" size={24} /></span>
            <span><b>Modo fone</b><span className="muted">Ouça e repita frases sem olhar a tela. Ótimo no ônibus ou caminhando.</span></span>
          </Link>
          <Link to="/jogos" className="pr-card">
            <span className="pr-ic" style={{ background: 'var(--violet-l)', color: 'var(--violet)' }}><Icon name="game" size={24} /></span>
            <span><b>Jogos e podcast</b><span className="muted">Palavra Relâmpago, histórias da Ana, detetive e o podcast.</span></span>
          </Link>
        </div>
      </div>
    </Shell>
  );
}
