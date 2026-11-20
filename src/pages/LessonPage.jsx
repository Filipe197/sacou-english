import { Navigate, useParams } from 'react-router-dom';
import { useRef } from 'react';
import LessonRunner, { savedEntries } from '../components/LessonRunner.jsx';
import { boxOf, MASTERED } from '../lib/memory.js';
import { getLesson, lessonStates, LESSONS } from '../lib/content.js';
import { useProgress } from '../lib/progress.js';
import { useAuth } from '../lib/auth.jsx';
import { rpcOrQueue } from '../lib/offline.js';
import { finishSession } from '../lib/finish-session.js';
import { shareMoments } from '../components/ShareCard.jsx';
import { Spinner } from '../components/ui.jsx';

export default function LessonPage() {
  const { id } = useParams();
  const itemResults = useRef([]);
  const lesson = getLesson(id);
  const prog = useProgress();
  const { user, profile, setProfile } = useAuth();

  const saveKey = `${user?.id || 'anon'}:${lesson?.id}`;
  // Lista montada uma vez por lição aberta. Ao refazer uma lição, os exercícios que o aluno
  // já domina (acertou de primeira várias vezes seguidas) ficam de fora: o treino vai direto no que falta.
  const plan = useRef(null);
  if (lesson && !prog.loading && plan.current?.id !== lesson.id) {
    const st0 = lessonStates(prog.done).find(s => s.lesson.id === lesson.id)?.state;
    const again = st0 === 'done' && prog.scores[lesson.id]?.times_done > 0;
    const all = lesson.items.map(item => ({ item, lessonId: lesson.id, unit: lesson.unit, story: lesson.story }));
    const saved = savedEntries(saveKey);
    let list = saved || all, notice = null;
    if (!saved && again) {
      const weak = all.filter(e => e.item.type === 'story' || boxOf(user?.id, e.item.id) < MASTERED);
      const cut = all.length - weak.length;
      if (cut > 0 && weak.filter(e => e.item.type !== 'story').length >= 4) {
        list = weak;
        notice = `🎯 Você já domina ${cut} ${cut === 1 ? 'exercício' : 'exercícios'} desta lição, então eles ficaram de fora. Vamos no que falta!`;
      }
    }
    plan.current = { id: lesson.id, entries: list, notice };
  }
  const entries = plan.current?.entries || [];

  if (!lesson) return <Navigate to="/aprender" replace />;
  if (prog.loading) return <Spinner />;
  const st = lessonStates(prog.done).find(s => s.lesson.id === id)?.state;
  if (st === 'locked') return <Navigate to="/aprender" replace />;
  const repeat = st === 'done' && prog.scores[id]?.times_done > 0; // pulada no teste conta como nova

  return (
    <LessonRunner
      key={lesson.id}
      entries={entries}
      notice={plan.current?.notice}
      saveKey={saveKey}
      track={lesson.id}
      title={`${lesson.unit.title} — ${lesson.title}`}
      onItemResult={(e, ok) => { if (!ok) itemResults.current.push(rpcOrQueue(user?.id, 'record_mistake', { p_item_id: e.item.id, p_lesson_id: e.lessonId })); }}
      onFinish={async ({ score, attemptId }) => {
        const xp = repeat ? 5 : 10 + (score >= 90 ? 5 : 0);
        const saved = await finishSession({ uid: user?.id, lessonId: lesson.id, score, xp, attemptId,
          activity: 'lesson', itemResults: itemResults.current, setProfile });
        const next = LESSONS[LESSONS.findIndex(l => l.id === lesson.id) + 1];
        if (saved.error) return saved;
        const card = !repeat && !saved.queued && shareMoments({ lesson, next, streak: saved.streak, streakUp: saved.showStreak });
        return {
          next: next && !repeat ? next : undefined,
          share: card ? { card, name: profile?.display_name?.split(' ')[0] } : undefined,
          title: repeat ? 'Treino concluído!' : 'Lição concluída!',
          ...saved,
        };
      }}
    />
  );
}
