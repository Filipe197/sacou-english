import { Navigate, useParams } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import LessonRunner from '../components/LessonRunner.jsx';
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

  const entries = useMemo(() => lesson ? lesson.items.map(item => ({ item, lessonId: lesson.id, unit: lesson.unit, story: lesson.story })) : [], [lesson]);

  if (!lesson) return <Navigate to="/aprender" replace />;
  if (prog.loading) return <Spinner />;
  const st = lessonStates(prog.done).find(s => s.lesson.id === id)?.state;
  if (st === 'locked') return <Navigate to="/aprender" replace />;
  const repeat = st === 'done' && prog.scores[id]?.times_done > 0; // pulada no teste conta como nova

  return (
    <LessonRunner
      entries={entries}
      saveKey={`${user?.id || 'anon'}:${lesson.id}`}
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
